import { Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'

export default function Roadmap() {
  const { stagesCleared: clearedCount } = useProgress()
  const { domains, roadmap, resources, name } = useCert()
  const overallPct = Math.round((clearedCount / domains.length) * 100)

  return (
    <div>
      <h1 className="page-title">🧭 学習ロードマップ</h1>
      <p className="page-sub">
        {name}の合格までの推奨ルート。上から順に進めると、効率よく攻略できます。
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

      <h2 className="section-title" style={{ marginTop: 32 }}>参考リンク（公式 Trailhead ほか）</h2>
      <p className="page-sub" style={{ marginTop: 4 }}>
        本アプリと併用したい外部の学習リソース。最新の試験ガイドは必ず公式ページで確認してください。
      </p>
      <div className="grid" style={{ marginTop: 12 }}>
        {resources.map((r) => (
          <a
            key={r.url}
            className="card"
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: 16, textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <strong style={{ fontSize: 14 }}>{r.title} ↗</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)' }}>{r.note}</p>
          </a>
        ))}
      </div>

      <div className="toolbar" style={{ marginTop: 26, justifyContent: 'center' }}>
        <Link className="btn gold" to="/">
          学習マップで始める
        </Link>
        <Link className="btn secondary" to="/mock">
          模擬試験
        </Link>
        <Link className="btn secondary" to="/flashcards">
          フラッシュカード
        </Link>
      </div>
    </div>
  )
}
