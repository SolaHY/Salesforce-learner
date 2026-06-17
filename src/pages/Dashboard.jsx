import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { useProgress } from '../hooks/useProgress'
import { isStageCleared, allStagesCleared, avatarRank, AVATAR_RANKS } from '../data/gamification'
import Avatar from '../components/Avatar'

export default function Dashboard() {
  const { progress, stagesCleared, rank } = useProgress()

  let prevCleared = true // 最初の単元は常に挑戦可能
  const stages = domains.map((d) => {
    const cleared = isStageCleared(progress, d.id)
    const unlocked = prevCleared
    const state = cleared ? 'clear' : unlocked ? 'open' : 'locked'
    prevCleared = cleared
    return { domain: d, state }
  })

  const finalUnlocked = allStagesCleared(progress)
  const nextRank = AVATAR_RANKS[Math.min(stagesCleared + 1, AVATAR_RANKS.length - 1)]

  return (
    <div>
      <h1 className="page-title">学習マップ</h1>
      <p className="page-sub">
        7つの単元を順に攻略していきましょう。各単元で正答率70%以上を取るとクリアとなり、次の単元が解放されます。
      </p>

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
          const dotLabel = state === 'clear' ? '✓' : state === 'locked' ? '🔒' : i + 1

          const body = (
            <div className="path-node">
              <div className="path-rail">
                <div className={`path-dot ${state}`}>{dotLabel}</div>
                <div className="path-line" />
              </div>
              <div className={`path-card state-${state}`} style={{ borderLeftColor: d.color }}>
                <div className="path-head">
                  <h3>
                    単元 {i + 1}：{d.name.split(/[ （(]/)[0]}
                  </h3>
                  <span className="weight-pill">配点 {d.weight}%</span>
                </div>
                <p>{d.description}</p>
                <div className="path-meta">
                  {state === 'clear' ? (
                    <span className="status-clear">クリア済み（{correctQ}/{dq.length} 正解）</span>
                  ) : state === 'locked' ? (
                    <span className="status-locked">前の単元をクリアすると解放されます</span>
                  ) : (
                    <span className="status-open">全 {dq.length} 問・挑戦可能</span>
                  )}
                </div>
              </div>
            </div>
          )

          return state === 'locked' ? (
            <div key={d.id} className="path-link disabled">
              {body}
            </div>
          ) : (
            <Link key={d.id} to={`/quiz/${d.id}`} className="path-link">
              {body}
            </Link>
          )
        })}

        {/* 修了試験 */}
        <div className={`path-node ${finalUnlocked ? '' : 'final-locked'}`}>
          <div className="path-rail">
            <div className={`path-dot final ${finalUnlocked ? 'open' : 'locked'}`}>
              {finalUnlocked ? '★' : '🔒'}
            </div>
          </div>
          <div className="path-card final-card">
            <div className="path-head">
              <h3>修了試験（全範囲）</h3>
              <span className="weight-pill">全 {questions.length} 問</span>
            </div>
            <p>全単元の総仕上げ。全範囲を通して安定して合格ライン（約65%）を超えられるか確認しましょう。</p>
            <div className="path-meta">
              {finalUnlocked ? (
                <Link className="btn gold" to="/quiz">
                  修了試験に挑戦
                </Link>
              ) : (
                <span className="status-locked">全7単元をクリアすると解放されます</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="toolbar" style={{ marginTop: 26, justifyContent: 'center' }}>
        <Link className="btn secondary" to="/roadmap">
          学習ロードマップを見る
        </Link>
        <Link className="btn secondary" to="/study">
          学習教材
        </Link>
        <Link className="btn secondary" to="/quiz">
          全範囲を演習
        </Link>
      </div>
    </div>
  )
}
