// Business Analyst の模擬試験。
// 出題プールは単元別の全問題（src/certs/ba/questions/*）。
// ドメインを全体に均等分散させたうえで、本番想定の約 60 問ずつに分割する。
// 決定論的に構成するので、リロードしても同じ回は同じ問題セットになる。
import { questions } from './quizzes'
import { domains } from './domains'

export const MOCK_SIZE = 60 // 1 回あたりの問題数（本番は60問＋採点対象外5問）
export const PASS_PCT = 72 // 合格ライン（本番の目安）

// 複数のリストを、各リストの相対位置を保ったまま均等に織り込む。
// （各要素を [0,1) 区間に等間隔で配置し、その位置でソートする）
function weave(lists) {
  const spread = []
  lists.forEach((items, li) => {
    const k = items.length || 1
    items.forEach((q, j) => spread.push({ q, key: (j + 0.5) / k, tie: li }))
  })
  spread.sort((a, b) => a.key - b.key || a.tie - b.tie)
  return spread.map((s) => s.q)
}

// ドメイン別にまとめ、各ドメイン内で「単純選択」と「シナリオ」を織り込んでから、
// ドメインどうしをさらに均等分散させて並べる。
// これで、どの回もドメイン構成と出題形式の比率がほぼ同じになる。
function balancedOrder(list) {
  const buckets = new Map()
  for (const d of domains) buckets.set(d.id, [])
  for (const q of list) {
    if (!buckets.has(q.domain)) buckets.set(q.domain, [])
    buckets.get(q.domain).push(q)
  }
  const mixed = [...buckets.values()].map((items) =>
    weave([items.filter((q) => q.type !== 'scenario'), items.filter((q) => q.type === 'scenario')]),
  )
  return weave(mixed)
}

const ordered = balancedOrder(questions)

function buildMock({ id, title, items, tag }) {
  const counts = {}
  for (const q of items) counts[q.domain] = (counts[q.domain] || 0) + 1
  const composition = domains
    .filter((d) => counts[d.id])
    .map((d) => ({ id: d.id, name: d.name, color: d.color, count: counts[d.id] }))
  return {
    id,
    title,
    tag,
    questions: items,
    total: items.length,
    composition,
    scenarioCount: items.filter((q) => q.type === 'scenario').length,
    officialCount: 0,
  }
}

// 約 MOCK_SIZE 問ずつに分割する。端数だけの極端に短い回ができないよう均等に振り分ける。
function buildMocks() {
  const total = ordered.length
  const n = Math.max(1, Math.round(total / MOCK_SIZE))
  const base = Math.floor(total / n)
  const extra = total % n // 先頭 extra 回だけ 1 問多くする

  const mocks = []
  let cursor = 0
  for (let m = 0; m < n; m++) {
    const size = base + (m < extra ? 1 : 0)
    const items = ordered.slice(cursor, cursor + size)
    cursor += size
    mocks.push(buildMock({ id: m + 1, title: `模試 ${m + 1}`, items }))
  }
  return mocks
}

export const mockExams = buildMocks()
export const MOCK_COUNT = mockExams.length
export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
