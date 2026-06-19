import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { scoreRank } from '../data/gamification'
import QuizRunner from '../components/QuizRunner'
import Confetti from '../components/Confetti'

export default function Exam() {
  const navigate = useNavigate()
  const { recordSession } = useProgress()
  const [result, setResult] = useState(null)

  function finish({ score, total }) {
    recordSession({ domainId: 'all', total, score })
    setResult({ score, total })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100)
    const rank = scoreRank(pct)
    return (
      <div>
        {pct >= 65 && <Confetti />}
        <h1 className="page-title">修了試験 結果</h1>
        <div className="quiz-card result">
          <div className="result-rank" style={{ color: rank.color }}>
            {rank.rank}
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0' }}>{rank.label}</p>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>
            {result.total} 問中 <strong style={{ color: 'var(--gold)' }}>{result.score}</strong> 問正解（{pct}%）
          </p>
          <div className="quiz-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
            <button className="btn secondary" onClick={() => setResult(null)}>
              もう一度
            </button>
            <button className="btn gold" onClick={() => navigate('/')}>
              学習マップへ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link className="back-link" to="/">
        ← 学習マップへ
      </Link>
      <h1 className="page-title">修了試験（全範囲）</h1>
      <p className="page-sub">
        全単元から全{questions.length}問を通して出題します。本番想定で実力を確認しましょう。
      </p>
      <QuizRunner key="exam" questions={questions} nextLabel="結果を見る" onComplete={finish} />
    </div>
  )
}
