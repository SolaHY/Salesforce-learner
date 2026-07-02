// 模擬試験（本番想定）。
// 各回は出題比率（ドメインの weight）に従って問題プールから構成する。
// 5 回それぞれ出題を変えるため、ドメインごとに開始オフセットをずらして抽出する。
// 決定論的に構成するので、リロードしても同じ回は同じ問題セットになる。
import { questions } from './quizzes'
import { domains } from './domains'

export const MOCK_COUNT = 5
export const PASS_PCT = 65 // 合格ライン（本番の目安）

// ドメイン別の問題リスト
const byDomain = Object.fromEntries(
  domains.map((d) => [d.id, questions.filter((q) => q.domain === d.id)]),
)

// list から start 位置より count 件を、末尾に達したら先頭へ回り込んで取り出す。
// count <= list.length のとき、取り出す件は互いに重複しない。
function sliceWrap(list, start, count) {
  const out = []
  const n = list.length
  if (n === 0) return out
  const c = Math.min(count, n)
  const s = ((start % n) + n) % n
  for (let i = 0; i < c; i++) out.push(list[(s + i) % n])
  return out
}

// 複数バケツをラウンドロビンで交互に並べ、ドメインが偏らないようにする。
function roundRobin(buckets) {
  const out = []
  const max = Math.max(0, ...buckets.map((b) => b.length))
  for (let i = 0; i < max; i++) {
    for (const b of buckets) if (i < b.length) out.push(b[i])
  }
  return out
}

// 1 回分の模試を構成する（m = 0..MOCK_COUNT-1）。
function buildMock(m) {
  const buckets = domains.map((d) => {
    const list = byDomain[d.id]
    const count = d.weight // weight の合計 = 100 なので 1 回 = 100 問
    const start = m * count // 回ごとに開始位置をずらす
    return sliceWrap(list, start, count)
  })
  const items = roundRobin(buckets)
  const composition = domains.map((d, i) => ({
    id: d.id,
    name: d.name,
    color: d.color,
    count: buckets[i].length,
  }))
  return {
    id: m + 1,
    title: `模試 ${m + 1}`,
    questions: items,
    total: items.length,
    composition,
  }
}

export const mockExams = Array.from({ length: MOCK_COUNT }, (_, m) => buildMock(m))

export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
