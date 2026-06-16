import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { domains, domainById } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'

function arraysEqual(a, b) {
  if (a.length !== b.length) return false
  const sa = [...a].sort()
  const sb = [...b].sort()
  return sa.every((v, i) => v === sb[i])
}

function isAnswerCorrect(question, selected) {
  if (question.multi) {
    return arraysEqual(selected, question.answer)
  }
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
  const [finished, setFinished] = useState(false)

  const current = pool[index]

  if (!pool.length) {
    return (
      <div>
        <Link className="back-link" to="/quiz">
          ← すべての問題
        </Link>
        <div className="empty">このドメインの問題はまだありません。</div>
      </div>
    )
  }

  const correct = current && isAnswerCorrect(current, selected)

  function toggleOption(i) {
    if (submitted) return
    if (current.multi) {
      setSelected((prev) =>
        prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i],
      )
    } else {
      setSelected([i])
    }
  }

  function submit() {
    if (!selected.length) return
    const ok = isAnswerCorrect(current, selected)
    setSubmitted(true)
    if (ok) setScore((s) => s + 1)
    recordAnswer(current.id, ok)
  }

  function next() {
    if (index + 1 >= pool.length) {
      recordSession({
        domainId: domainId || 'all',
        total: pool.length,
        score,
      })
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
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / pool.length) * 100)
    return (
      <div>
        <h1 className="page-title">演習結果</h1>
        <div className="quiz-card result">
          <div className="score">{pct}%</div>
          <p style={{ fontSize: 16 }}>
            {pool.length} 問中 <strong>{score}</strong> 問正解
          </p>
          <p className="page-sub">
            {pct >= 70
              ? '🎉 合格ラインの目安(約65%)を超えています！この調子で。'
              : '💪 もう少し！教材で復習してから再挑戦しましょう。'}
          </p>
          <div className="quiz-actions" style={{ justifyContent: 'center' }}>
            <button className="btn" onClick={restart}>
              もう一度
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

  return (
    <div>
      <div className="toolbar">
        <Link className={`chip ${!domainId ? 'active' : ''}`} to="/quiz">
          全ドメイン
        </Link>
        {domains.map((d) => (
          <Link
            key={d.id}
            className={`chip ${domainId === d.id ? 'active' : ''}`}
            to={`/quiz/${d.id}`}
          >
            {d.name.split(' ')[0]}
          </Link>
        ))}
      </div>

      <div className="quiz-card">
        <div className="quiz-progress">
          <span>
            問題 {index + 1} / {pool.length}
            {domain && <> ・{domain.name}</>}
          </span>
          <span>正解 {score}</span>
        </div>

        <p className="quiz-question">{current.question}</p>
        {current.multi && (
          <p className="page-sub" style={{ marginTop: -10 }}>
            （該当するものを複数選択）
          </p>
        )}

        <div>
          {current.options.map((opt, i) => {
            let cls = 'option'
            if (submitted) {
              const isAnswer = current.multi
                ? current.answer.includes(i)
                : current.answer === i
              if (isAnswer) cls += ' correct'
              else if (selected.includes(i)) cls += ' wrong'
            } else if (selected.includes(i)) {
              cls += ' selected'
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => toggleOption(i)}
                disabled={submitted}
              >
                <span>{opt}</span>
                {submitted &&
                  (current.multi ? current.answer.includes(i) : current.answer === i) && (
                    <span className="mark">✓</span>
                  )}
                {submitted &&
                  selected.includes(i) &&
                  !(current.multi
                    ? current.answer.includes(i)
                    : current.answer === i) && <span className="mark">✗</span>}
              </button>
            )
          })}
        </div>

        {submitted && (
          <div className={`explanation ${correct ? 'ok' : 'ng'}`}>
            <strong>{correct ? '正解！' : '不正解'}</strong>
            <p style={{ margin: '8px 0 0' }}>{current.explanation}</p>
          </div>
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
            <button className="btn" onClick={next}>
              {index + 1 >= pool.length ? '結果を見る' : '次の問題へ →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
