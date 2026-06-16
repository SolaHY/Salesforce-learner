// ゲーミフィケーション定義：XP / レベル / 称号 / バッジ

// 各レベルに到達するのに必要な「累計XP」。cumXp(L) = 50 * (L-1) * L
export function cumXpForLevel(level) {
  return 50 * (level - 1) * level
}

// Trailblazer（冒険者）の称号
export const RANKS = [
  '見習いトレイルブレイザー',
  '駆け出しアドミン',
  'クラウド冒険者',
  '設定の魔導士',
  '自動化の錬金術師',
  'データの賢者',
  '認定マスター候補',
  '伝説のアドミン',
]

export function rankTitle(level) {
  return RANKS[Math.min(level - 1, RANKS.length - 1)]
}

// 総XPからレベル情報を算出
export function levelInfo(xp) {
  let level = 1
  while (cumXpForLevel(level + 1) <= xp) level += 1
  const curBase = cumXpForLevel(level)
  const nextBase = cumXpForLevel(level + 1)
  const intoLevel = xp - curBase
  const span = nextBase - curBase
  return {
    level,
    title: rankTitle(level),
    xp,
    intoLevel,
    span,
    toNext: nextBase - xp,
    pct: Math.min(100, Math.round((intoLevel / span) * 100)),
  }
}

// XP 報酬
export const XP = {
  CORRECT: 10,
  WRONG: 2,
  CARD_REVIEW: 5,
  SESSION_PER_CORRECT: 5,
  PERFECT_BONUS: 50,
}

// クイズスコアからランク評価（S/A/B/C/D）
export function scoreRank(pct) {
  if (pct === 100) return { rank: 'S', label: 'パーフェクト！', color: '#ffd76a' }
  if (pct >= 80) return { rank: 'A', label: '見事な戦いだ', color: '#27ae60' }
  if (pct >= 65) return { rank: 'B', label: '合格ラインを突破', color: '#00a1e0' }
  if (pct >= 40) return { rank: 'C', label: 'まだ修行が必要', color: '#f2994a' }
  return { rank: 'D', label: '出直してこい', color: '#eb5757' }
}

// バッジ（実績）。check(progress, derived) が true で解放。
export const BADGES = [
  {
    id: 'first-blood',
    icon: '⚔️',
    name: '初陣',
    desc: '初めて問題に回答した',
    check: (p) => Object.keys(p.answers).length >= 1,
  },
  {
    id: 'sharp-shooter',
    icon: '🎯',
    name: '連続正解 5',
    desc: 'クイズで5問連続正解した',
    check: (p) => (p.maxCombo || 0) >= 5,
  },
  {
    id: 'card-master',
    icon: '🧠',
    name: '記憶術師',
    desc: '全フラッシュカードを復習した',
    check: (p, d) => p.reviewedCards.length >= d.totalCards,
  },
  {
    id: 'all-rounder',
    icon: '🗺️',
    name: '全領域踏破',
    desc: 'すべての問題に回答した',
    check: (p, d) => Object.keys(p.answers).length >= d.totalQuestions,
  },
  {
    id: 'sage',
    icon: '📜',
    name: '賢者',
    desc: '全問回答かつ正答率80%以上',
    check: (p, d) => {
      const ans = Object.values(p.answers)
      if (ans.length < d.totalQuestions) return false
      const correct = ans.filter((a) => a.correct).length
      return correct / ans.length >= 0.8
    },
  },
  {
    id: 'streak-3',
    icon: '🔥',
    name: '継続は力なり',
    desc: '3日連続で学習した',
    check: (p) => (p.streak?.best || 0) >= 3,
  },
  {
    id: 'perfectionist',
    icon: '💎',
    name: '完全制覇',
    desc: 'クイズで100%を達成した',
    check: (p) => (p.sessions || []).some((s) => s.score === s.total && s.total > 0),
  },
  {
    id: 'level-5',
    icon: '🌟',
    name: 'レベル5到達',
    desc: 'レベル5に到達した',
    check: (p) => levelInfo(p.xp || 0).level >= 5,
  },
]
