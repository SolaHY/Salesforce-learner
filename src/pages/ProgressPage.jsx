import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { BADGES } from '../data/gamification'

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`
}

export default function ProgressPage() {
  const { progress, level, reset } = useProgress()

  const answeredEntries = Object.entries(progress.answers)
  const answered = answeredEntries.length
  const correct = answeredEntries.filter(([, a]) => a.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0

  function handleReset() {
    if (window.confirm('冒険の記録をすべて消去します。よろしいですか？')) reset()
  }

  return (
    <div>
      <h1 className="page-title">🏆 冒険の記録</h1>
      <p className="page-sub">これまでの歩みと獲得した称号を振り返ろう。</p>

      {/* Hero ステータス */}
      <div className="card" style={{ marginBottom: 28, borderColor: 'var(--border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div className="hero-avatar" style={{ width: 64, height: 64, fontSize: 34 }}>
            🧙
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: 'var(--head-font)', fontSize: 20, color: 'var(--gold)' }}>
              Lv.{level.level} {level.title}
            </div>
            <div className="xp-bar" style={{ marginTop: 8 }}>
              <span style={{ width: `${level.pct}%` }} />
            </div>
            <div className="xp-meta">
              <span>{level.xp} XP</span>
              <span>次のレベルまで {level.toNext} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="num">
            {answered}/{questions.length}
          </div>
          <div className="label">挑んだ問題</div>
        </div>
        <div className="stat">
          <div className="num">{accuracy}%</div>
          <div className="label">正答率</div>
        </div>
        <div className="stat">
          <div className="num">🔥 {progress.streak.best}</div>
          <div className="label">最高連続日数</div>
        </div>
        <div className="stat">
          <div className="num">⚡ {progress.maxCombo}</div>
          <div className="label">最大コンボ</div>
        </div>
      </div>

      {/* バッジコレクション */}
      <h2 style={{ fontFamily: 'var(--head-font)', fontSize: 18 }}>
        🏅 称号コレクション（{progress.badges.length}/{BADGES.length}）
      </h2>
      <div className="badge-grid" style={{ margin: '12px 0 28px' }}>
        {BADGES.map((b) => {
          const got = progress.badges.includes(b.id)
          return (
            <div key={b.id} className={`badge-cell ${got ? 'unlocked' : 'locked'}`}>
              <div className="icon">{got ? b.icon : '🔒'}</div>
              <div className="bname">{b.name}</div>
              <div className="bdesc">{b.desc}</div>
            </div>
          )
        })}
      </div>

      {/* ドメイン別 習熟度 */}
      <h2 style={{ fontFamily: 'var(--head-font)', fontSize: 18 }}>🗺️ ステージ攻略度</h2>
      <div className="grid" style={{ marginTop: 12, marginBottom: 28 }}>
        {domains.map((d) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const dCorrect = dq.filter((q) => progress.answers[q.id]?.correct).length
          const pct = dq.length ? Math.round((dCorrect / dq.length) * 100) : 0
          return (
            <div className="card" key={d.id} style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong style={{ fontSize: 14 }}>{d.name}</strong>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {dCorrect}/{dq.length} 制覇
                </span>
              </div>
              <div className="mini-bar" style={{ height: 8 }}>
                <span style={{ width: `${pct}%`, background: d.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* 演習履歴 */}
      <h2 style={{ fontFamily: 'var(--head-font)', fontSize: 18 }}>📜 戦いの記録</h2>
      {progress.sessions.length === 0 ? (
        <div className="empty">
          まだ記録がない。最初のクエストに挑もう！
          <br />
          <Link className="btn gold" style={{ marginTop: 16 }} to="/quiz">
            ⚔️ クエストを始める
          </Link>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 12 }}>
          {progress.sessions.map((s, i) => {
            const label =
              s.domainId === 'all'
                ? '全クエスト'
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
          🗑 冒険の記録をリセット
        </button>
      </div>
    </div>
  )
}
