import { portalLinks } from '../data/portalLinks'

export default function LearningPortal() {
  return (
    <div>
      <h1 className="page-title">学習ポータル</h1>
      <p className="page-sub">
        関連する学習系サイトへのリンク集です。新しいタブで開きます。
      </p>

      <div className="grid grid-2">
        {portalLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card portal-card"
            style={{ borderLeft: `5px solid ${link.accent}` }}
          >
            <div className="portal-head">
              <h3>{link.title}</h3>
              <span className="portal-arrow" aria-hidden="true">↗</span>
            </div>
            <p>{link.description}</p>
            <span className="portal-host">{link.host}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
