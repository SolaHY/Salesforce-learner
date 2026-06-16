import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`
}

export default function ProgressPage() {
  const { progress, reset } = useProgress()

  const answeredEntries = Object.entries(progress.answers)
  const answered = answeredEntries.length
  const correct = answeredEntries.filter(([, a]) => a.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0

  function handleReset() {
    if (window.confirm('学習データをすべて削除します。よろしいですか？')) {
      reset()
    }
  }

  return (
    <div>
      <h1 className="page-title">学習の進捗</h1>
      <p className="page-sub">ドメインごとの習熟度と演習履歴を確認できます。</p>

      <div className="stat-row">
        <div className="stat">
          <div className="num">
            {answered}/{questions.length}
          </div>
          <div className="label">回答済みの問題</div>
        </div>
        <div className="stat">
          <div className="num">{accuracy}%</div>
          <div className="label">全体の正答率</div>
        </div>
        <div className="stat">
          <div className="num">{progress.reviewedCards.length}</div>
          <div className="label">復習済みカード</div>
        </div>
      </div>

      <h2 style={{ fontSize: 18 }}>ドメイン別 習熟度</h2>
      <div className="grid" style={{ marginTop: 12, marginBottom: 28 }}>
        {domains.map((d) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const dAnswered = dq.filter((q) => progress.answers[q.id])
          const dCorrect = dAnswered.filter((q) => progress.answers[q.id].correct).length
          const pct = dq.length ? Math.round((dCorrect / dq.length) * 100) : 0
          return (
            <div className="card" key={d.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <strong style={{ fontSize: 14 }}>{d.name}</strong>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {dCorrect}/{dq.length} 正解
                </span>
              </div>
              <div className="bar">
                <span style={{ width: `${pct}%`, background: d.color }} />
              </div>
            </div>
          )
        })}
      </div>

      <h2 style={{ fontSize: 18 }}>演習履歴</h2>
      {progress.sessions.length === 0 ? (
        <div className="empty">
          まだ演習記録がありません。
          <br />
          <Link className="btn" style={{ marginTop: 16 }} to="/quiz">
            問題演習を始める
          </Link>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 12 }}>
          {progress.sessions.map((s, i) => {
            const label =
              s.domainId === 'all'
                ? '全ドメイン'
                : domains.find((d) => d.id === s.domainId)?.name ?? s.domainId
            const pct = Math.round((s.score / s.total) * 100)
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom:
                    i < progress.sessions.length - 1 ? '1px solid var(--border)' : 'none',
                  fontSize: 14,
                }}
              >
                <span>{label}</span>
                <span style={{ color: 'var(--muted)' }}>
                  {s.score}/{s.total}（{pct}%）・{formatDate(s.at)}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <button className="btn secondary" onClick={handleReset}>
          🗑 学習データをリセット
        </button>
      </div>
    </div>
  )
}
