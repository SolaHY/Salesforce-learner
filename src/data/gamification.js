import { domains } from './domains'

// 進捗・称号・実績の定義（ポイント制度は廃止）

// ステージ（ドメイン）クリア判定：そのドメインで正答率70%以上のセッションが1回でもあればクリア
export const STAGE_CLEAR_PCT = 0.7
export function isStageCleared(progress, domainId) {
  return (progress.sessions || []).some(
    (s) => s.domainId === domainId && s.total > 0 && s.score / s.total >= STAGE_CLEAR_PCT,
  )
}
export function allStagesCleared(progress) {
  return domains.every((d) => isStageCleared(progress, d.id))
}
// クリア済みステージ数（= アバターの成長段階 0〜7）
export function stagesClearedCount(progress) {
  return domains.filter((d) => isStageCleared(progress, d.id)).length
}

// アバターの成長段階。index = クリア済みステージ数 (0〜7)。
// 単元をクリアするたびに段階が上がり、肩書きと見た目（リング色）が変化する。
export const AVATAR_RANKS = [
  { title: '見習い', ring: '#64748b' },
  { title: 'アソシエイト', ring: '#b08d57' },
  { title: 'ジュニアアドミン', ring: '#9aa6b2' },
  { title: 'アドミニストレーター', ring: '#21c08a' },
  { title: 'シニアアドミン', ring: '#2b9bff' },
  { title: 'リードアドミン', ring: '#7c8cff' },
  { title: 'エキスパート', ring: '#b06bff' },
  { title: '認定アドミニストレーター', ring: '#ffcf5a' },
]
export function avatarRank(stagesCleared) {
  return AVATAR_RANKS[Math.max(0, Math.min(AVATAR_RANKS.length - 1, stagesCleared))]
}

// 演習スコアの評価（S/A/B/C/D）
export function scoreRank(pct) {
  if (pct === 100) return { rank: 'S', label: '満点です', color: '#ffcf5a' }
  if (pct >= 80) return { rank: 'A', label: '優秀な成績です', color: '#21c08a' }
  if (pct >= 65) return { rank: 'B', label: '合格ラインを突破', color: '#2b9bff' }
  if (pct >= 40) return { rank: 'C', label: 'もう一歩。復習しましょう', color: '#f2994a' }
  return { rank: 'D', label: '基礎から見直しましょう', color: '#eb5757' }
}

// バッジ（実績）。check(progress, derived) が true で解放。
export const BADGES = [
  {
    id: 'first-blood',
    icon: '🚩',
    name: 'はじめの一歩',
    desc: '初めて問題に回答した',
    check: (p) => Object.keys(p.answers).length >= 1,
  },
  {
    id: 'first-clear',
    icon: '🎯',
    name: '初クリア',
    desc: '単元テストを初めてクリアした',
    check: (p) => stagesClearedCount(p) >= 1,
  },
  {
    id: 'card-master',
    icon: '🧠',
    name: '用語マスター',
    desc: '全フラッシュカードを復習した',
    check: (p, d) => p.reviewedCards.length >= d.totalCards,
  },
  {
    id: 'all-rounder',
    icon: '📚',
    name: '全範囲制覇',
    desc: 'すべての問題に回答した',
    check: (p, d) => Object.keys(p.answers).length >= d.totalQuestions,
  },
  {
    id: 'sage',
    icon: '🎓',
    name: '上級者',
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
    icon: '📅',
    name: '継続は力なり',
    desc: '3日連続で学習した',
    check: (p) => (p.streak?.best || 0) >= 3,
  },
  {
    id: 'perfectionist',
    icon: '💯',
    name: '満点達成',
    desc: '演習で100%を達成した',
    check: (p) => (p.sessions || []).some((s) => s.score === s.total && s.total > 0),
  },
  {
    id: 'half-way',
    icon: '⭐',
    name: '折り返し',
    desc: '4単元をクリアした',
    check: (p) => stagesClearedCount(p) >= 4,
  },
  {
    id: 'map-conqueror',
    icon: '👑',
    name: '全単元制覇',
    desc: '全7単元をクリアした',
    check: (p) => allStagesCleared(p),
  },
]
