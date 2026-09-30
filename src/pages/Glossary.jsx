import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import { useLang, pick } from '../hooks/useLang'
import { useLocalStorage } from '../hooks/useLocalStorage'
import LangToggle from '../components/LangToggle'

// 流れ図やリンクに出す短い名前。「Data Lake Object (DLO)」→「DLO」、
// 「Unified Individual (unified profile)」→「Unified Individual」。
function shortTerm(term) {
  const abbr = term.match(/\(([A-Z]{3,})\)/)
  if (abbr) return abbr[1]
  return term.split(' (')[0]
}

function matches(t, q) {
  if (!q) return true
  return [t.term, t.ja, t.def, t.def_ja].some((s) => s?.toLowerCase().includes(q))
}

export default function Glossary() {
  const cert = useCert()
  const { lang: globalLang } = useLang()
  const g = cert.glossary
  const [learned, setLearned] = useLocalStorage(`sf-learner-glossary-${cert.id}`, [])
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const [hideDefs, setHideDefs] = useState(false)
  const [onlyUnlearned, setOnlyUnlearned] = useState(false)
  const [revealed, setRevealed] = useState(() => new Set())
  const [langOverride, setLangOverride] = useState({})
  const [focus, setFocus] = useState(null)

  const q = query.trim().toLowerCase()
  const terms = g?.terms ?? []
  const visible = useMemo(
    () =>
      terms.filter(
        (t) =>
          (cat === 'all' || t.cat === cat) &&
          matches(t, q) &&
          (!onlyUnlearned || !learned.includes(t.id)),
      ),
    [terms, cat, q, onlyUnlearned, learned],
  )

  // 取り違えやすい用語・流れ図から飛んだ先をスクロールして一瞬強調する
  useEffect(() => {
    if (!focus) return
    const el = document.getElementById(`term-${focus}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const timer = setTimeout(() => setFocus(null), 1600)
    return () => clearTimeout(timer)
  }, [focus])

  if (!g) {
    return <div className="empty">この資格には用語集がありません。</div>
  }

  const catById = Object.fromEntries(g.categories.map((c) => [c.id, c]))
  const learnedCount = terms.filter((t) => learned.includes(t.id)).length
  const pct = Math.round((learnedCount / terms.length) * 100)

  function jumpTo(id) {
    setCat('all')
    setQuery('')
    setOnlyUnlearned(false)
    setRevealed((s) => new Set(s).add(id))
    setFocus(id)
  }

  function toggleLearned(id) {
    setLearned((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }

  function toggleReveal(id) {
    setRevealed((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function changeHide(v) {
    setHideDefs(v)
    setRevealed(new Set())
  }

  return (
    <div>
      <h1 className="page-title">用語集</h1>
      <p className="page-sub">{g.intro}</p>

      {g.flow && (
        <section className="gl-flow" aria-label="データの流れと主な用語">
          {g.flow.map((step, i) => (
            <div
              key={step.stage}
              className={`gl-flow-step ${cat === step.cat ? 'active' : ''}`}
            >
              <button
                type="button"
                className="gl-flow-head"
                onClick={() => setCat(cat === step.cat ? 'all' : step.cat)}
              >
                <span className="gl-flow-num">{i + 1}</span>
                <span>
                  <strong>{step.stage}</strong>
                  <small>{catById[step.cat]?.name}</small>
                </span>
              </button>
              <ul>
                {step.items.map((id) => (
                  <li key={id}>
                    <button type="button" onClick={() => jumpTo(id)}>
                      {shortTerm(g.byId[id].term)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <div className="gl-controls">
        <input
          type="search"
          className="gl-search"
          placeholder="用語・意味で検索（例：DLO、同意、セグメント）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="gl-progress">
          <span>
            覚えた用語 <strong>{learnedCount}</strong> / {terms.length}
          </span>
          <div className="mini-bar">
            <span style={{ width: `${pct}%`, background: 'var(--green)' }} />
          </div>
        </div>
      </div>

      <div className="toolbar gl-toolbar">
        <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
          すべて {terms.length}
        </button>
        {g.categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${cat === c.id ? 'active' : ''}`}
            onClick={() => setCat(c.id)}
            title={c.description}
          >
            {c.name} {terms.filter((t) => t.cat === c.id).length}
          </button>
        ))}
      </div>

      <div className="gl-switches">
        <label>
          <input type="checkbox" checked={hideDefs} onChange={(e) => changeHide(e.target.checked)} />
          意味を隠す（用語から意味を思い出す練習）
        </label>
        <label>
          <input
            type="checkbox"
            checked={onlyUnlearned}
            onChange={(e) => setOnlyUnlearned(e.target.checked)}
          />
          まだ覚えていない用語だけ
        </label>
      </div>

      {cat !== 'all' && <p className="gl-cat-desc">{catById[cat]?.description}</p>}

      {visible.length === 0 ? (
        <div className="empty">該当する用語がありません。</div>
      ) : (
        <div className="gl-list">
          {visible.map((t) => {
            const lang = langOverride[t.id] ?? globalLang
            const isLearned = learned.includes(t.id)
            const shown = !hideDefs || revealed.has(t.id)
            return (
              <article
                key={t.id}
                id={`term-${t.id}`}
                className={`gl-term ${isLearned ? 'learned' : ''} ${focus === t.id ? 'focus' : ''}`}
              >
                <header className="gl-term-head">
                  <div>
                    <h3 lang="en">{t.term}</h3>
                    <div className="gl-term-ja">{t.ja}</div>
                  </div>
                  <span className="gl-cat-tag">{catById[t.cat]?.name}</span>
                </header>

                {shown ? (
                  <>
                    <div className="gl-term-lang">
                      <LangToggle
                        lang={lang}
                        onToggle={() =>
                          setLangOverride((o) => ({ ...o, [t.id]: lang === 'ja' ? 'en' : 'ja' }))
                        }
                      />
                    </div>
                    <p className="gl-def" lang={lang}>
                      {pick(t, 'def', lang)}
                    </p>
                    {t.tip && (
                      <div className="gl-tip" lang={lang}>
                        <span>試験では</span>
                        {pick(t, 'tip', lang)}
                      </div>
                    )}
                    {t.vs?.length > 0 && (
                      <div className="gl-vs">
                        <span>取り違えやすい</span>
                        {t.vs.map((id) => (
                          <button key={id} type="button" onClick={() => jumpTo(id)}>
                            {shortTerm(g.byId[id].term)}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button type="button" className="gl-reveal" onClick={() => toggleReveal(t.id)}>
                    意味を表示
                  </button>
                )}

                <footer className="gl-term-foot">
                  {hideDefs && shown && (
                    <button type="button" className="gl-link" onClick={() => toggleReveal(t.id)}>
                      隠す
                    </button>
                  )}
                  <button
                    type="button"
                    className={`gl-learn ${isLearned ? 'on' : ''}`}
                    onClick={() => toggleLearned(t.id)}
                  >
                    {isLearned ? '✓ 覚えた' : '覚えた'}
                  </button>
                </footer>
              </article>
            )
          })}
        </div>
      )}

      <p className="gl-footnote">
        用語を覚えたら、<Link to="/flashcards">フラッシュカード</Link>や単元テストで使い方を確認しましょう。
      </p>
    </div>
  )
}
