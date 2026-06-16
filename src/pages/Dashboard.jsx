import { Link } from 'react-router-dom'
import { domains } from '../data/domains'
import { questions } from '../data/quizzes'
import { flashcards } from '../data/flashcards'
import { useProgress } from '../hooks/useProgress'

export default function Dashboard() {
  const { progress, level } = useProgress()

  const answered = Object.keys(progress.answers).length
  const correct = Object.values(progress.answers).filter((a) => a.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0

  return (
    <div>
      <h1 className="page-title">⚔️ 冒険マップ</h1>
      <p className="page-sub">
        7つの試練（ドメイン）を踏破して「認定アドミン」を目指せ！ ノードをタップで挑戦開始。
      </p>

      <div className="stat-row">
        <div className="stat">
          <div className="num">Lv.{level.level}</div>
          <div className="label">{level.title}</div>
        </div>
        <div className="stat">
          <div className="num">{level.xp}</div>
          <div className="label">獲得 XP</div>
        </div>
        <div className="stat">
          <div className="num">{accuracy}%</div>
          <div className="label">正答率</div>
        </div>
        <div className="stat">
          <div className="num">
            {progress.badges.length}
          </div>
          <div className="label">獲得バッジ</div>
        </div>
      </div>

      <div className="toolbar">
        <Link className="btn gold" to="/quiz">
          ⚔️ 全クエストに挑む
        </Link>
        <Link className="btn secondary" to="/flashcards">
          🃏 記憶の修練場
        </Link>
        <Link className="btn secondary" to="/study">
          📖 知恵の書庫
        </Link>
      </div>

      <div className="quest-path">
        {domains.map((d, i) => {
          const dq = questions.filter((q) => q.domain === d.id)
          const answeredQ = dq.filter((q) => progress.answers[q.id])
          const correctQ = answeredQ.filter((q) => progress.answers[q.id].correct)
          const cleared = dq.length > 0 && correctQ.length === dq.length
          const pct = dq.length ? Math.round((correctQ.length / dq.length) * 100) : 0
          const isLast = i === domains.length - 1
          return (
            <Link key={d.id} to={`/quiz/${d.id}`} className="quest-node">
              <div className="quest-rail">
                <div className={`quest-dot ${cleared ? 'clear' : ''}`}>
                  {cleared ? '✓' : i + 1}
                </div>
                {!isLast && <div className="quest-line" />}
              </div>
              <div className="quest-card" style={{ borderLeftColor: d.color }}>
                <h3>
                  ステージ {i + 1}：{d.name}
                </h3>
                <p>{d.description}</p>
                <div className="meta">
                  <span className="badge">配点 {d.weight}%</span>
                  <span className="reward">⭐ 報酬 {dq.length * 10} XP</span>
                  <div className="mini-bar">
                    <span style={{ width: `${pct}%`, background: d.color }} />
                  </div>
                  <span>
                    {correctQ.length}/{dq.length} 制覇
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <p className="page-sub" style={{ marginTop: 24, textAlign: 'center' }}>
        全{questions.length}問・全{flashcards.length}カード。今日も冒険を進めて連続ログインを伸ばそう！🔥
      </p>
    </div>
  )
}
