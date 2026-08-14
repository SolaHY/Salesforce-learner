import { useState } from 'react'
import { correctIndices, isMulti } from '../data/questionUtils'
import { useProgress } from '../hooks/useProgress'
import { useLang, pick, hasJa } from '../hooks/useLang'
import LangToggle from './LangToggle'

const Q_FIELDS = ['question', 'scenario', 'explanation', 'reference']

function setsEqual(a, b) {
  if (a.length !== b.length) return false
  const sb = new Set(b)
  return a.every((v) => sb.has(v))
}

// Fisher–Yates で配列を複製してシャッフルする。
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 各問題の選択肢の並びをランダム化する（正解の位置が毎回A固定にならないようにする）。
// correct フラグは選択肢に紐づくため、並べ替えても正解判定・解説はそのまま追従する。
function shuffleDeck(questions) {
  return questions.map((q) => ({ ...q, options: shuffle(q.options) }))
}

// 1問ずつ出題し、即時フィードバックを返す汎用クイズ。
// 全問終了後 onComplete({ score, total }) を呼ぶ。結果画面は親が描画する。
export default function QuizRunner({ questions, onComplete, nextLabel = '次へ', recordAnswers = true }) {
  const { recordAnswer } = useProgress()
  const { lang: globalLang } = useLang()
  // この設問だけの言語上書き（null = グローバル設定に従う）。次の問題に進むと解除される。
  const [langOverride, setLangOverride] = useState(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  // 採点・記録済みの問題ID（選び直しても二重採点しないため）。
  const [scored, setScored] = useState(() => new Set())
  // 選択肢をシャッフルした出題デッキ。
  const [deck, setDeck] = useState(() => shuffleDeck(questions))
  // 問題セットが変わったかは参照ではなく問題IDの並びで判定する。
  // （親が毎レンダリングで配列を作り直しても、中身が同じならリセットしない）
  const sig = questions.map((q) => q.id).join('|')
  const [deckSig, setDeckSig] = useState(sig)
  if (sig !== deckSig) {
    setDeckSig(sig)
    setDeck(shuffleDeck(questions))
    setScored(new Set())
    setIndex(0)
    setSelected([])
    setSubmitted(false)
    setScore(0)
  }

  const current = deck[index]
  if (!current) return null

  // 表示言語：この設問だけの上書き > グローバル設定
  const lang = langOverride ?? globalLang
  const bilingual =
    hasJa(current, Q_FIELDS) || current.options.some((o) => hasJa(o, ['text', 'note']))

  const answerIdx = correctIndices(current)
  const multi = isMulti(current)
  const correct = setsEqual(selected, answerIdx)

  function toggleOption(i) {
    if (submitted) return
    if (multi) {
      setSelected((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]))
    } else {
      setSelected([i])
    }
  }

  function submit() {
    if (!selected.length) return
    const ok = setsEqual(selected, answerIdx)
    setSubmitted(true)
    // 採点・進捗記録は各問「最初の回答」のみ。選び直しは学習用で成績には影響しない。
    if (!scored.has(current.id)) {
      setScored((prev) => new Set(prev).add(current.id))
      if (ok) setScore((s) => s + 1)
      if (recordAnswers) recordAnswer(current.id, ok)
    }
  }

  // 不正解のとき、同じ問題をもう一度選び直せるようにする。
  function retry() {
    setSubmitted(false)
    setSelected([])
  }

  function next() {
    if (index + 1 >= deck.length) {
      onComplete({ score, total: deck.length })
      return
    }
    setIndex((i) => i + 1)
    setSelected([])
    setSubmitted(false)
    setLangOverride(null)
  }

  const progressPct = Math.round((index / deck.length) * 100)

  return (
    <div className="quiz-card">
      <div className="quiz-progress">
        <span>
          問題 {index + 1} / {deck.length}
          {current.source === 'official' && <span className="source-pill">公式問題</span>}
          {current.source === 'similar' && <span className="source-pill alt">類似問題</span>}
        </span>
        <span className="quiz-progress-right">
          {bilingual && (
            <LangToggle
              lang={lang}
              onToggle={() => setLangOverride(lang === 'ja' ? 'en' : 'ja')}
            />
          )}
          正解 {score}
        </span>
      </div>
      <div className="battle-bar">
        <span style={{ width: `${progressPct}%` }} />
      </div>

      {current.type === 'scenario' && (
        <div className="scenario-box">
          <span className="scenario-tag">シナリオ問題</span>
          {pick(current, 'scenario', lang)}
        </div>
      )}

      <p className="quiz-question" lang={lang}>{pick(current, 'question', lang)}</p>
      {multi && (
        <p className="page-sub" style={{ marginTop: -12 }}>
          （該当するものをすべて選択）
        </p>
      )}

      <div>
        {current.options.map((opt, i) => {
          const isAnswer = answerIdx.includes(i)
          let cls = 'option'
          if (submitted) {
            if (isAnswer) cls += ' correct'
            else if (selected.includes(i)) cls += ' wrong'
          } else if (selected.includes(i)) {
            cls += ' selected'
          }
          return (
            <div key={i}>
              <button className={cls} onClick={() => toggleOption(i)} disabled={submitted}>
                <span lang={lang}>{pick(opt, 'text', lang)}</span>
                {submitted && isAnswer && <span className="mark">✓</span>}
                {submitted && selected.includes(i) && !isAnswer && <span className="mark">✗</span>}
              </button>
              {submitted && (
                <div className={`opt-note ${isAnswer ? 'ok' : 'ng'}`} lang={lang}>
                  <strong>{isAnswer ? '○ ' : '× '}</strong>
                  {pick(opt, 'note', lang)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {submitted && (
        <>
          <div className={`explanation ${correct ? 'ok' : 'ng'}`}>
            <strong>{correct ? '正解' : '不正解'}</strong>
            <p style={{ margin: '8px 0 0' }} lang={lang}>{pick(current, 'explanation', lang)}</p>
            {!correct && (
              <p style={{ margin: '8px 0 0', opacity: 0.85 }}>
                「選び直す」でこの問題にもう一度挑戦できます（成績は最初の回答で確定します）。
              </p>
            )}
          </div>
          {pick(current, 'reference', lang) && (
            <div className="reference" lang={lang}>{pick(current, 'reference', lang)}</div>
          )}
        </>
      )}

      <div className="quiz-actions" style={{ justifyContent: 'flex-end', gap: 10 }}>
        {!submitted ? (
          <button className="btn" onClick={submit} disabled={!selected.length}>
            回答する
          </button>
        ) : (
          <>
            {!correct && (
              <button className="btn" onClick={retry}>
                選び直す
              </button>
            )}
            <button className="btn gold" onClick={next}>
              {index + 1 >= deck.length ? nextLabel : '次の問題へ'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
