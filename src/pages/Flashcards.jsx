import { useState, useMemo } from 'react'
import { shortName } from '../data/questionUtils'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useLang, pick, hasJa } from '../hooks/useLang'
import LangToggle from '../components/LangToggle'

export default function Flashcards() {
  const { progress, toggleReviewed } = useProgress()
  const { domains, domainById, flashcards } = useCert()
  const { lang: globalLang } = useLang()
  const [langOverride, setLangOverride] = useState(null)
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = useMemo(
    () => (filter === 'all' ? flashcards : flashcards.filter((c) => c.domain === filter)),
    [filter, flashcards],
  )

  const card = deck[index % Math.max(deck.length, 1)]

  function changeFilter(f) {
    setFilter(f)
    setIndex(0)
    setFlipped(false)
  }

  function go(delta) {
    setFlipped(false)
    setLangOverride(null)
    setIndex((i) => (i + delta + deck.length) % deck.length)
  }

  if (!deck.length) {
    return <div className="empty">カードがありません。</div>
  }

  const reviewed = progress.reviewedCards.includes(card.id)
  const domain = domainById[card.domain]
  const lang = langOverride ?? globalLang
  const bilingual = hasJa(card, ['front', 'back'])

  return (
    <div>
      <h1 className="page-title">フラッシュカード</h1>
      <p className="page-sub">
        カードをタップで裏返し、覚えた用語に印を付けましょう。（{index + 1} / {deck.length}）
      </p>

      <div className="toolbar">
        <button
          className={`chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => changeFilter('all')}
        >
          すべて
        </button>
        {domains.map((d) => (
          <button
            key={d.id}
            className={`chip ${filter === d.id ? 'active' : ''}`}
            onClick={() => changeFilter(d.id)}
          >
            {shortName(d.name)}
          </button>
        ))}
      </div>

      {bilingual && (
        <div className="card-lang-row">
          <LangToggle
            lang={lang}
            size="md"
            onToggle={() => setLangOverride(lang === 'ja' ? 'en' : 'ja')}
          />
        </div>
      )}

      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <div className="tag">{domain?.name}</div>
            <div className="text" lang={lang}>{pick(card, 'front', lang)}</div>
            <div className="flashcard-hint">クリックで答えを表示</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="tag">答え</div>
            <div className="text" lang={lang}>{pick(card, 'back', lang)}</div>
          </div>
        </div>
      </div>

      <div className="deck-controls">
        <button className="btn secondary" onClick={() => go(-1)}>
          ← 前へ
        </button>
        <button
          className="btn"
          style={{ background: reviewed ? 'var(--green)' : undefined }}
          onClick={() => toggleReviewed(card.id)}
        >
          {reviewed ? '✓ 復習済み' : '復習済みにする'}
        </button>
        <button className="btn secondary" onClick={() => go(1)}>
          次へ →
        </button>
      </div>
    </div>
  )
}
