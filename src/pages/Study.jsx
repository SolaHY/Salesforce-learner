import { useParams, Link } from 'react-router-dom'
import { domains, domainById } from '../data/domains'
import { studyMaterials } from '../data/studyMaterials'
import { questionsByDomain } from '../data/quizzes'
import { flashcardsByDomain } from '../data/flashcards'

function DomainList() {
  return (
    <div>
      <h1 className="page-title">学習教材</h1>
      <p className="page-sub">ドメインを選んで要点を確認しましょう。</p>
      <div className="grid grid-2">
        {domains.map((d) => (
          <Link
            key={d.id}
            to={`/study/${d.id}`}
            className="card domain-card"
            style={{ borderLeftColor: d.color }}
          >
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <div className="domain-meta">
              <span className="badge">配点 {d.weight}%</span>
              <span>{studyMaterials[d.id]?.sections.length ?? 0} セクション</span>
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
          ← 教材一覧
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
        ← 教材一覧
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
        <Link className="btn" to={`/quiz/${domainId}`}>
          📝 このドメインの問題を解く（{qCount}問）
        </Link>
        <Link className="btn secondary" to="/flashcards">
          🃏 フラッシュカード（{fcCount}枚）
        </Link>
      </div>
    </div>
  )
}
