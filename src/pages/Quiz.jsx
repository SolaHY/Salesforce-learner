import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { domains, domainById } from '../data/domains'
import { questions, correctIndices, isMulti } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { scoreRank } from '../data/gamification'
import Confetti from '../components/Confetti'

function setsEqual(a, b) {
  if (a.length !== b.length) return false
  const sb = new Set(b)
  return a.every((v) => sb.has(v))
}

export default function Quiz() {
  const { domainId } = useParams()
  const navigate = useNavigate()
  const { recordAnswer, recordSession } = useProgress()

  const pool = useMemo(
    () => (domainId ? questions.filter((q) => q.domain === domainId) : questions),
    [domainId],
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [comboPulse, setComboPulse] = useState(false)
  const [finished, setFinished] = useState(false)

  const current = pool[index]

  if (!pool.length) {
    return (
      <div>
        <Link className="back-link" to="/quiz">
          ← 単元選択へ
        </Link>
        <div className="empty">この単元の問題はまだありません。</div>
      </div>
    )
  }

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
    const newCombo = ok ? combo + 1 : 0
    setCombo(newCombo)
    if (ok) {
      setScore((s) => s + 1)
      setComboPulse(true)
      setTimeout(() => setComboPulse(false), 400)
    }
    recordAnswer(current.id, ok, newCombo)
  }

  function next() {
    if (index + 1 >= pool.length) {
      recordSession({ domainId: domainId || 'all', total: pool.length, score })
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected([])
    setSubmitted(false)
  }

  function restart() {
    setIndex(0)
    setSelected([])
    setSubmitted(false)
    setScore(0)
    setCombo(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / pool.length) * 100)
    const rank = scoreRank(pct)
    return (
      <div>
        {pct >= 65 && <Confetti />}
        <h1 className="page-title">演習結果</h1>
        <div className="quiz-card result">
          <div className="result-rank" style={{ color: rank.color }}>
            {rank.rank}
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0' }}>{rank.label}</p>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>
            {pool.length} 問中 <strong style={{ color: 'var(--gold)' }}>{score}</strong> 問正解（{pct}%）
          </p>
          {pct >= 70 && domainId && (
            <p style={{ color: 'var(--green)', fontWeight: 700 }}>
              クリア条件（70%）達成。次の単元が解放されました。
            </p>
          )}
          <div className="quiz-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
            <button className="btn gold" onClick={restart}>
              もう一度
            </button>
            <button className="btn secondary" onClick={() => navigate('/')}>
              学習マップへ
            </button>
            <button className="btn secondary" onClick={() => navigate('/progress')}>
              進捗を見る
            </button>
          </div>
        </div>
      </div>
    )
  }

  const domain = current.domain ? domainById[current.domain] : null
  const battlePct = Math.round((index / pool.length) * 100)

  return (
    <div>
      <div className="toolbar">
        <Link className={`chip ${!domainId ? 'active' : ''}`} to="/quiz">
          全範囲
        </Link>
        {domains.map((d) => (
          <Link
            key={d.id}
            className={`chip ${domainId === d.id ? 'active' : ''}`}
            to={`/quiz/${d.id}`}
          >
            {d.name.split(/[ （(]/)[0]}
          </Link>
        ))}
      </div>

      <div className="quiz-card">
        <div className="quiz-progress">
          <span>
            問題 {index + 1} / {pool.length}
            {domain && <> ・{domain.name.split(/[ （(]/)[0]}</>}
          </span>
          <span className={`combo ${comboPulse ? 'pop' : ''}`}>
            {combo >= 2 ? `連続正解 ${combo}` : `正解 ${score}`}
          </span>
        </div>
        <div className="battle-bar">
          <span style={{ width: `${battlePct}%` }} />
        </div>

        {current.type === 'scenario' && (
          <div className="scenario-box">
            <span className="scenario-tag">シナリオ問題</span>
            {current.scenario}
          </div>
        )}

        <p className="quiz-question">{current.question}</p>
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
                  <span>{opt.text}</span>
                  {submitted && isAnswer && <span className="mark">✓</span>}
                  {submitted && selected.includes(i) && !isAnswer && (
                    <span className="mark">✗</span>
                  )}
                </button>
                {submitted && (
                  <div className={`opt-note ${isAnswer ? 'ok' : 'ng'}`}>
                    <strong>{isAnswer ? '○ ' : '× '}</strong>
                    {opt.note}
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
              <p style={{ margin: '8px 0 0' }}>{current.explanation}</p>
            </div>
            {current.reference && <div className="reference">{current.reference}</div>}
          </>
        )}

        <div className="quiz-actions">
          <Link className="btn secondary" to="/quiz" onClick={restart}>
            最初から
          </Link>
          {!submitted ? (
            <button className="btn" onClick={submit} disabled={!selected.length}>
              回答する
            </button>
          ) : (
            <button className="btn gold" onClick={next}>
              {index + 1 >= pool.length ? '結果を見る' : '次へ'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
