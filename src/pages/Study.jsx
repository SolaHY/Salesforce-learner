import { useParams, Link } from 'react-router-dom'
import { domains, domainById } from '../data/domains'
import { studyMaterials } from '../data/studyMaterials'
import { questionsByDomain } from '../data/quizzes'
import { flashcardsByDomain } from '../data/flashcards'

function DomainList() {
  return (
    <div>
      <h1 className="page-title">📖 知恵の書庫</h1>
      <p className="page-sub">古の書物で各試練の極意を学ぼう。挑戦前の予習に最適。</p>
      <div className="grid grid-2">
        {domains.map((d) => (
          <Link
            key={d.id}
            to={`/study/${d.id}`}
            className="card"
            style={{ borderLeft: `5px solid ${d.color}`, textDecoration: 'none', color: 'inherit' }}
          >
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <div className="meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>
              <span className="badge">配点 {d.weight}%</span>
              <span>{studyMaterials[d.id]?.sections.length ?? 0} 章</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Study() {
  const { domainId } = useParams()

  if (!domainId) return <DomainList />

  const domain = domainById[domainId]
  const material = studyMaterials[domainId]

  if (!domain || !material) {
    return (
      <div>
        <Link className="back-link" to="/study">
          ← 書庫へ戻る
        </Link>
        <div className="empty">教材が見つかりません。</div>
      </div>
    )
  }

  const qCount = questionsByDomain(domainId).length
  const fcCount = flashcardsByDomain(domainId).length

  return (
    <div>
      <Link className="back-link" to="/study">
        ← 書庫へ戻る
      </Link>
      <h1 className="page-title">{domain.name}</h1>
      <p className="page-sub">
        <span className="badge">配点 {domain.weight}%</span> &nbsp;{material.intro}
      </p>

      <div className="card" style={{ borderLeft: `5px solid ${domain.color}` }}>
        {material.sections.map((section) => (
          <div className="study-section" key={section.heading}>
            <h3>{section.heading}</h3>
            <ul>
              {section.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="toolbar" style={{ marginTop: 24 }}>
        <Link className="btn gold" to={`/quiz/${domainId}`}>
          ⚔️ この試練に挑む（{qCount}問）
        </Link>
        <Link className="btn secondary" to="/flashcards">
          🃏 記憶の修練場（{fcCount}枚）
        </Link>
      </div>
    </div>
  )
}
