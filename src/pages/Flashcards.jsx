import { useState, useMemo } from 'react'
import { domains, domainById } from '../data/domains'
import { flashcards } from '../data/flashcards'
import { useProgress } from '../hooks/useProgress'

export default function Flashcards() {
  const { progress, toggleReviewed } = useProgress()
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = useMemo(
    () => (filter === 'all' ? flashcards : flashcards.filter((c) => c.domain === filter)),
    [filter],
  )

  const card = deck[index]

  function changeFilter(f) {
    setFilter(f)
    setIndex(0)
    setFlipped(false)
  }

  function go(delta) {
    setFlipped(false)
    setIndex((i) => (i + delta + deck.length) % deck.length)
  }

  if (!deck.length) {
    return <div className="empty">カードがありません。</div>
  }

  const reviewed = progress.reviewedCards.includes(card.id)
  const domain = domainById[card.domain]

  return (
    <div>
      <h1 className="page-title">フラッシュカード</h1>
      <p className="page-sub">
        カードをクリックして裏返し、覚えた用語をチェックしましょう。（{index + 1} / {deck.length}）
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
            {d.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <div className="tag">{domain?.name}</div>
            <div className="text">{card.front}</div>
            <div className="flashcard-hint">クリックで答えを表示</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="tag">答え</div>
            <div className="text">{card.back}</div>
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
