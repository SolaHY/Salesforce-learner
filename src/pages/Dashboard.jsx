import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { flashcards } from '../data/flashcards'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const { progress } = useProgress()

  const answered = Object.keys(progress.answers).length
  const correct = Object.values(progress.answers).filter((a) => a.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0
  const reviewed = progress.reviewedCards.length

  return (
    <div>
      <h1 className="page-title">こんにちは 👋</h1>
      <p className="page-sub">
        Salesforce 認定アドミニストレーター試験の合格を目指して学習を進めましょう。
      </p>

      <div className="stat-row">
        <div className="stat">
          <div className="num">{answered}</div>
          <div className="label">回答した問題（全{questions.length}問）</div>
        </div>
        <div className="stat">
          <div className="num">{accuracy}%</div>
          <div className="label">正答率</div>
        </div>
        <div className="stat">
          <div className="num">{reviewed}</div>
          <div className="label">復習したカード（全{flashcards.length}枚）</div>
        </div>
        <div className="stat">
          <div className="num">{progress.sessions.length}</div>
          <div className="label">演習セッション数</div>
        </div>
      </div>

      <div className="toolbar">
        <Link className="btn" to="/quiz">
          📝 問題演習を始める
        </Link>
        <Link className="btn secondary" to="/flashcards">
          🃏 フラッシュカード
        </Link>
        <Link className="btn secondary" to="/study">
          📚 学習教材を読む
        </Link>
      </div>

      <h2 style={{ fontSize: 18, marginTop: 8 }}>出題範囲（ドメイン）</h2>
      <p className="page-sub">クリックすると各ドメインの教材・問題に移動します。</p>
      <div className="grid grid-2">
        {domains.map((d) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const dAnswered = dq.filter((q) => progress.answers[q.id]).length
          const pct = dq.length ? Math.round((dAnswered / dq.length) * 100) : 0
          return (
            <Link
              key={d.id}
              to={`/study/${d.id}`}
              className="card domain-card"
              style={{ borderLeftColor: d.color }}
            >
              <h3>{d.name}</h3>
              <p>{d.description}</p>
              <div className="domain-meta">
                <span className="badge">配点 {d.weight}%</span>
                <span>
                  {dAnswered}/{dq.length} 問演習済み
                </span>
              </div>
              <div className="bar" style={{ marginTop: 10 }}>
                <span style={{ width: `${pct}%`, background: d.color }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
