import { Link } from 'react-router-dom'
import { roadmap } from '../data/roadmap'
import { domains } from '../data/domains'
import { useProgress } from '../hooks/useProgress'
import { isStageCleared } from '../data/gamification'

export default function Roadmap() {
  const { progress } = useProgress()
  const clearedCount = domains.filter((d) => isStageCleared(progress, d.id)).length
  const overallPct = Math.round((clearedCount / domains.length) * 100)

  return (
    <div>
      <h1 className="page-title">🧭 学習ロードマップ</h1>
      <p className="page-sub">
        合格までの推奨ルート。上から順に進めると、配点の大きい領域から効率よく攻略できます。
      </p>

      <div className="card" style={{ marginBottom: 24, borderColor: 'var(--border-glow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <strong>全体の攻略度</strong>
          <span style={{ color: 'var(--gold)' }}>
            {clearedCount}/{domains.length} 単元クリア
          </span>
        </div>
        <div className="xp-bar">
          <span style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      <div className="roadmap">
        {roadmap.map((phase, i) => (
          <div className="roadmap-phase" key={phase.id}>
            <div className="roadmap-rail">
              <div className="roadmap-dot">{i + 1}</div>
              {i < roadmap.length - 1 && <div className="roadmap-line" />}
            </div>
            <div className="card roadmap-card">
              <div className="roadmap-week">{phase.weeks}</div>
              <h3 style={{ marginBottom: 6 }}>{phase.title}</h3>
              <p style={{ marginBottom: 12 }}>🎯 {phase.goal}</p>
              <ul className="roadmap-steps">
                {phase.steps.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar" style={{ marginTop: 26, justifyContent: 'center' }}>
        <Link className="btn gold" to="/">
          学習マップで始める
        </Link>
        <Link className="btn secondary" to="/study">
          学習教材
        </Link>
      </div>
    </div>
  )
}
