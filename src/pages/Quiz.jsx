import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { domains, domainById } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { scoreRank } from '../data/gamification'
import Confetti from '../components/Confetti'

function arraysEqual(a, b) {
  if (a.length !== b.length) return false
  const sa = [...a].sort()
  const sb = [...b].sort()
  return sa.every((v, i) => v === sb[i])
}

function isAnswerCorrect(question, selected) {
  if (question.multi) return arraysEqual(selected, question.answer)
  return selected.length === 1 && selected[0] === question.answer
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
          ← クエスト選択へ
        </Link>
        <div className="empty">このステージの試練はまだ封印されています。</div>
      </div>
    )
  }

  const correct = current && isAnswerCorrect(current, selected)

  function toggleOption(i) {
    if (submitted) return
    if (current.multi) {
      setSelected((prev) => (prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i]))
    } else {
      setSelected([i])
    }
  }

  function submit() {
    if (!selected.length) return
    const ok = isAnswerCorrect(current, selected)
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
        <h1 className="page-title">🏁 クエスト結果</h1>
        <div className="quiz-card result">
          <div className="result-rank" style={{ color: rank.color }}>
            {rank.rank}
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0' }}>{rank.label}</p>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>
            {pool.length} 問中 <strong style={{ color: 'var(--gold)' }}>{score}</strong> 問正解（{pct}%）
          </p>
          <div className="quiz-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
            <button className="btn gold" onClick={restart}>
              🔁 もう一度挑む
            </button>
            <button className="btn secondary" onClick={() => navigate('/progress')}>
              🏆 冒険の記録へ
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
          全クエスト
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
            ⚔️ {index + 1} / {pool.length}
            {domain && <> ・{domain.name.split(/[ （(]/)[0]}</>}
          </span>
          <span className={`combo ${comboPulse ? 'pop' : ''}`}>
            {combo >= 2 ? `🔥 ${combo} COMBO` : `正解 ${score}`}
          </span>
        </div>
        <div className="battle-bar">
          <span style={{ width: `${battlePct}%` }} />
        </div>

        <p className="quiz-question">{current.question}</p>
        {current.multi && (
          <p className="page-sub" style={{ marginTop: -12 }}>
            （該当するものを複数選択）
          </p>
        )}

        <div>
          {current.options.map((opt, i) => {
            const isAnswer = current.multi ? current.answer.includes(i) : current.answer === i
            let cls = 'option'
            if (submitted) {
              if (isAnswer) cls += ' correct'
              else if (selected.includes(i)) cls += ' wrong'
            } else if (selected.includes(i)) {
              cls += ' selected'
            }
            return (
              <button key={i} className={cls} onClick={() => toggleOption(i)} disabled={submitted}>
                <span>{opt}</span>
                {submitted && isAnswer && <span className="mark">✓</span>}
                {submitted && selected.includes(i) && !isAnswer && (
                  <span className="mark">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {submitted && (
          <div className={`explanation ${correct ? 'ok' : 'ng'}`}>
            <strong>{correct ? '🎉 正解！' : '💥 不正解…'}</strong>
            <p style={{ margin: '8px 0 0' }}>{current.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          <Link className="btn secondary" to="/quiz" onClick={restart}>
            ↩ 最初から
          </Link>
          {!submitted ? (
            <button className="btn" onClick={submit} disabled={!selected.length}>
              ⚡ 回答する
            </button>
          ) : (
            <button className="btn gold" onClick={next}>
              {index + 1 >= pool.length ? '🏁 結果を見る' : '次へ →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
