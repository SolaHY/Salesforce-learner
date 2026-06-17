import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { BADGES, AVATAR_RANKS, isStageCleared } from '../data/gamification'
import Avatar from '../components/Avatar'

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(
    d.getMinutes(),
  ).padStart(2, '0')}`
}

export default function ProgressPage() {
  const { progress, level, stagesCleared, rank, reset } = useProgress()

  const answeredEntries = Object.entries(progress.answers)
  const answered = answeredEntries.length
  const correct = answeredEntries.filter(([, a]) => a.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0

  function handleReset() {
    if (window.confirm('学習データをすべて削除します。よろしいですか？')) reset()
  }

  return (
    <div>
      <h1 className="page-title">進捗・実績</h1>
      <p className="page-sub">これまでの学習状況と、成長したキャラクターを確認できます。</p>

      {/* アバター + ステータス */}
      <div className="growth-card" style={{ marginBottom: 24 }}>
        <Avatar stage={stagesCleared} size={104} glow />
        <div className="growth-info">
          <div className="growth-rank">{rank.title}</div>
          <div className="growth-progress-label">
            Lv.{level.level}・{level.xp} pt ／ 単元クリア {stagesCleared} / {domains.length}
          </div>
          <div className="xp-bar" style={{ marginTop: 6 }}>
            <span style={{ width: `${level.pct}%` }} />
          </div>
        </div>
      </div>

      {/* 成長の記録（アバター進化ギャラリー） */}
      <h2 className="section-title">成長の記録</h2>
      <p className="page-sub" style={{ marginTop: 4 }}>
        単元をクリアするたびにキャラクターが成長します。（{stagesCleared} / 7 段階）
      </p>
      <div className="evolution-row">
        {AVATAR_RANKS.map((r, i) => {
          const reached = i <= stagesCleared
          return (
            <div key={i} className={`evo-cell ${reached ? 'reached' : 'locked'}`}>
              <Avatar stage={i} size={64} />
              <div className="evo-title">{r.title}</div>
              <div className="evo-step">{i === 0 ? 'スタート' : `${i}単元クリア`}</div>
            </div>
          )
        })}
      </div>

      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat">
          <div className="num">
            {answered}/{questions.length}
          </div>
          <div className="label">回答した問題</div>
        </div>
        <div className="stat">
          <div className="num">{accuracy}%</div>
          <div className="label">正答率</div>
        </div>
        <div className="stat">
          <div className="num">{progress.streak.best}</div>
          <div className="label">最高連続学習日数</div>
        </div>
        <div className="stat">
          <div className="num">{progress.maxCombo}</div>
          <div className="label">最大連続正解</div>
        </div>
      </div>

      {/* 実績バッジ */}
      <h2 className="section-title">
        実績バッジ（{progress.badges.length}/{BADGES.length}）
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

      {/* 単元別 習熟度 */}
      <h2 className="section-title">単元別 習熟度</h2>
      <div className="grid" style={{ marginTop: 12, marginBottom: 28 }}>
        {domains.map((d) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const dCorrect = dq.filter((q) => progress.answers[q.id]?.correct).length
          const pct = dq.length ? Math.round((dCorrect / dq.length) * 100) : 0
          const cleared = isStageCleared(progress, d.id)
          return (
            <div className="card" key={d.id} style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <strong style={{ fontSize: 14 }}>{d.name}</strong>
                <span style={{ color: cleared ? 'var(--green)' : 'var(--muted)', fontSize: 13 }}>
                  {cleared ? 'クリア済み' : `${dCorrect}/${dq.length} 正解`}
                </span>
              </div>
              <div className="bar">
                <span style={{ width: `${pct}%`, background: d.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* 演習履歴 */}
      <h2 className="section-title">演習履歴</h2>
      {progress.sessions.length === 0 ? (
        <div className="empty">
          まだ演習記録がありません。
          <br />
          <Link className="btn gold" style={{ marginTop: 16 }} to="/quiz">
            問題演習を始める
          </Link>
        </div>
      ) : (
        <div className="card" style={{ marginTop: 12 }}>
          {progress.sessions.map((s, i) => {
            const label =
              s.domainId === 'all'
                ? '全範囲'
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
          学習データをリセット
        </button>
      </div>
    </div>
  )
}
