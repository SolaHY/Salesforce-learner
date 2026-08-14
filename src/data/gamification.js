// 進捗・称号・実績の共通ロジック（資格に依存しない部分）。
// ドメイン一覧や称号は資格ごとに異なるため、すべて引数で受け取る。
// 資格ごとの定義は src/certs/<certId>/ 側に置く。

// ステージ（ドメイン）クリア判定：そのドメインで正答率が clearPct 以上のセッションが1回でもあればクリア
export const STAGE_CLEAR_PCT = 0.7

export function isStageCleared(progress, domainId, clearPct = STAGE_CLEAR_PCT) {
  return (progress.sessions || []).some(
    (s) => s.domainId === domainId && s.total > 0 && s.score / s.total >= clearPct,
  )
}

export function stagesClearedCount(progress, domains, clearPct = STAGE_CLEAR_PCT) {
  return domains.filter((d) => isStageCleared(progress, d.id, clearPct)).length
}

export function allStagesCleared(progress, domains, clearPct = STAGE_CLEAR_PCT) {
  return domains.every((d) => isStageCleared(progress, d.id, clearPct))
}

// アバターの成長段階を取得。index = クリア済みステージ数。
export function avatarRank(stagesCleared, ranks) {
  return ranks[Math.max(0, Math.min(ranks.length - 1, stagesCleared))]
}

// 演習スコアの評価（S/A/B/C/D）。合格ラインは資格ごとに異なるので引数で受ける。
export function scoreRank(pct, passPct = 65) {
  const aCut = Math.min(95, passPct + 15) // 合格ラインの15pt上を「A」の基準にする
  const cCut = Math.round(passPct * 0.6)
  if (pct === 100) return { rank: 'S', label: '満点です', color: '#ffcf5a' }
  if (pct >= aCut) return { rank: 'A', label: '優秀な成績です', color: '#21c08a' }
  if (pct >= passPct) return { rank: 'B', label: '合格ラインを突破', color: '#2b9bff' }
  if (pct >= cCut) return { rank: 'C', label: 'もう一歩。復習しましょう', color: '#f2994a' }
  return { rank: 'D', label: '基礎から見直しましょう', color: '#eb5757' }
}

// 実績バッジ。資格ごとに単元数が違うため、ドメイン数を渡して生成する。
// check(progress, derived) が true で解放。derived = { totalQuestions, totalCards, domains, clearPct }
export function makeBadges({ unitLabel = '単元' } = {}) {
  return [
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
      desc: `${unitLabel}テストを初めてクリアした`,
      check: (p, d) => stagesClearedCount(p, d.domains, d.clearPct) >= 1,
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
      desc: `${unitLabel}の半分をクリアした`,
      check: (p, d) =>
        stagesClearedCount(p, d.domains, d.clearPct) >= Math.ceil(d.domains.length / 2),
    },
    {
      id: 'map-conqueror',
      icon: '👑',
      name: `全${unitLabel}制覇`,
      desc: `すべての${unitLabel}をクリアした`,
      check: (p, d) => allStagesCleared(p, d.domains, d.clearPct),
    },
  ]
}
