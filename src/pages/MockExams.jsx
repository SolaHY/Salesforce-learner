import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { mockExams, mockById, PASS_PCT, OFFICIAL_COUNT, SIMILAR_COUNT, EXTRA_COUNT } from '../data/mockExams'
import { useProgress } from '../hooks/useProgress'
import { scoreRank } from '../data/gamification'
import QuizRunner from '../components/QuizRunner'
import Confetti from '../components/Confetti'

export default function MockExams() {
  const { mockId } = useParams()
  if (mockId) return <MockRunner mockId={mockId} />
  return <MockList />
}

function MockList() {
  const { progress } = useProgress()
  const bestByMock = {}
  for (const s of progress.sessions || []) {
    if (!s.mockId) continue
    const pct = Math.round((s.score / s.total) * 100)
    bestByMock[s.mockId] = Math.max(bestByMock[s.mockId] ?? 0, pct)
  }

  return (
    <div>
      <h1 className="page-title">模擬試験</h1>
      <p className="page-sub">
        公式プラクティステストと同一の {OFFICIAL_COUNT} 問、その類似問題 {SIMILAR_COUNT} 問、実試験対策問題（japanitstudy / jpnshiken）を合わせた全 {mockExams.reduce((s, mk) => s + mk.total, 0)} 問を、本番想定の約 {mockExams[0].total} 問ずつ全 {mockExams.length} 回分に構成しました。各回はドメインと出典をバランスよくミックスしています。最終回（模試 {mockExams.length}）は全 8 分野を通しで出題する追加セット {EXTRA_COUNT} 問です。合格ラインは {PASS_PCT}% です。
      </p>

      <div className="grid" style={{ marginTop: 16 }}>
        {mockExams.map((mk) => {
          const best = bestByMock[mk.id]
          return (
            <div className="card" key={mk.id} style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{mk.title}</h3>
                <span className="weight-pill">全 {mk.total} 問</span>
              </div>
              <div style={{ margin: '10px 0 14px', fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {best != null ? (
                  <span style={{ color: best >= PASS_PCT ? 'var(--green)' : 'var(--orange)' }}>
                    最高スコア {best}%{best >= PASS_PCT ? '（合格ライン突破）' : ''}
                  </span>
                ) : (
                  <span>未受験</span>
                )}
                {mk.officialCount > 0 && <span>公式問題 {mk.officialCount} 問</span>}
                {mk.tag && <span>{mk.tag}</span>}
              </div>
              <div className="mock-bars" style={{ display: 'flex', height: 6, borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
                {mk.composition.map((c) => (
                  <span
                    key={c.id}
                    title={`${c.name}：${c.count}問`}
                    style={{ width: `${(c.count / mk.total) * 100}%`, background: c.color }}
                  />
                ))}
              </div>
              <Link className="btn gold" to={`/mock/${mk.id}`}>
                この模試に挑戦
              </Link>
            </div>
          )
        })}
      </div>

      <div className="toolbar" style={{ marginTop: 26, justifyContent: 'center' }}>
        <Link className="btn secondary" to="/">
          学習マップへ
        </Link>
      </div>
    </div>
  )
}

function MockRunner({ mockId }) {
  const navigate = useNavigate()
  const { recordSession } = useProgress()
  const [result, setResult] = useState(null)
  const mock = mockById(mockId)

  if (!mock) {
    return (
      <div>
        <Link className="back-link" to="/mock">
          ← 模擬試験一覧へ
        </Link>
        <div className="empty">この模試は見つかりませんでした。</div>
      </div>
    )
  }

  function finish({ score, total }) {
    recordSession({ domainId: `mock-${mock.id}`, mockId: mock.id, label: mock.title, total, score })
    setResult({ score, total })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100)
    const rank = scoreRank(pct)
    const passed = pct >= PASS_PCT
    return (
      <div>
        {passed && <Confetti />}
        <h1 className="page-title">{mock.title} 結果</h1>
        <div className="quiz-card result">
          <div className="result-rank" style={{ color: rank.color }}>
            {rank.rank}
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0' }}>{rank.label}</p>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>
            {result.total} 問中 <strong style={{ color: 'var(--gold)' }}>{result.score}</strong> 問正解（{pct}%）
          </p>
          <p style={{ color: passed ? 'var(--green)' : 'var(--orange)', fontWeight: 700 }}>
            {passed ? `合格ライン（${PASS_PCT}%）を突破！` : `合格ラインは ${PASS_PCT}%。復習して再挑戦しましょう。`}
          </p>
          <div className="quiz-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
            <button className="btn secondary" onClick={() => setResult(null)}>
              もう一度
            </button>
            <button className="btn gold" onClick={() => navigate('/mock')}>
              模擬試験一覧へ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link className="back-link" to="/mock">
        ← 模擬試験一覧へ
      </Link>
      <h1 className="page-title">{mock.title}</h1>
      <p className="page-sub">
        全 {mock.total} 問・出題比率は本番準拠。合格ライン {PASS_PCT}% を目指しましょう。
      </p>
      <QuizRunner key={`mock-${mock.id}`} questions={mock.questions} nextLabel="結果を見る" onComplete={finish} />
    </div>
  )
}
