import { Link } from 'react-router-dom'
import { shortName } from '../data/questionUtils'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import Avatar from '../components/Avatar'

export default function Dashboard() {
  const { progress, stagesCleared, stageCleared, rank } = useProgress()
  const cert = useCert()
  const { domains, questions, ranks } = cert

  // すべての単元を開放：前の単元のクリア状況に関わらず、常に挑戦可能
  const stages = domains.map((d) => ({ domain: d, state: stageCleared(d.id) ? 'clear' : 'open' }))

  const nextRank = ranks[Math.min(stagesCleared + 1, ranks.length - 1)]
  const passPct = Math.round(cert.stageClearPct * 100)

  return (
    <div>
      <h1 className="page-title">学習マップ</h1>
      <p className="page-sub">{cert.mapIntro}</p>

      {/* 試験の概要 */}
      <div className="exam-facts">
        <span><strong>{cert.name}</strong></span>
        <span>{cert.exam.questions}</span>
        <span>{cert.exam.minutes} 分</span>
        <span>合格ライン 約{cert.exam.passPct}%</span>
        {cert.exam.prereq && <span>{cert.exam.prereq}</span>}
      </div>

      {/* アバター成長バナー */}
      <div className="growth-card">
        <Avatar stage={stagesCleared} size={104} glow />
        <div className="growth-info">
          <div className="growth-rank">{rank.title}</div>
          <div className="growth-progress-label">
            単元クリア {stagesCleared} / {domains.length}
            {stagesCleared < domains.length && (
              <> ・あと1単元クリアで「{nextRank.title}」に成長</>
            )}
          </div>
          <div className="bar">
            <span
              style={{
                width: `${Math.round((stagesCleared / domains.length) * 100)}%`,
                background: rank.ring,
              }}
            />
          </div>
        </div>
      </div>

      <div className="path">
        {stages.map(({ domain: d, state }, i) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const correctQ = dq.filter((q) => progress.answers[q.id]?.correct).length
          const dotLabel = state === 'clear' ? '✓' : i + 1

          return (
            <Link key={d.id} to={`/unit/${d.id}`} className="path-link">
              <div className="path-node">
                <div className="path-rail">
                  <div className={`path-dot ${state}`}>{dotLabel}</div>
                  <div className="path-line" />
                </div>
                <div className={`path-card state-${state}`} style={{ borderLeftColor: d.color }}>
                  <div className="path-head">
                    <h3>
                      単元 {i + 1}：{shortName(d.name)}
                    </h3>
                    <span className="weight-pill">配点 {d.weight}%</span>
                  </div>
                  <p>{d.description}</p>
                  <div className="path-meta">
                    {state === 'clear' ? (
                      <span className="status-clear">クリア済み（{correctQ}/{dq.length} 正解）</span>
                    ) : (
                      <span className="status-open">全 {dq.length} 問・挑戦可能</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {/* 修了試験 */}
        <div className="path-node">
          <div className="path-rail">
            <div className="path-dot final open">★</div>
          </div>
          <div className="path-card final-card">
            <div className="path-head">
              <h3>修了試験（全範囲）</h3>
              <span className="weight-pill">全 {questions.length} 問</span>
            </div>
            <p>
              全単元の総仕上げ。全範囲を通して安定して合格ライン（約{cert.exam.passPct}%）を超えられるか確認しましょう。
            </p>
            <div className="path-meta">
              <Link className="btn gold" to="/exam">
                修了試験に挑戦
              </Link>
            </div>
          </div>
        </div>
      </div>

      <p className="page-sub" style={{ textAlign: 'center', marginTop: 22 }}>
        各単元テストで {passPct}% 以上を取るとクリアになります。
      </p>

      <div className="toolbar" style={{ marginTop: 10, justifyContent: 'center' }}>
        <Link className="btn secondary" to="/roadmap">
          学習ロードマップを見る
        </Link>
        <Link className="btn secondary" to="/mock">
          模擬試験に挑戦
        </Link>
        <Link className="btn secondary" to="/flashcards">
          フラッシュカード
        </Link>
      </div>
    </div>
  )
}
