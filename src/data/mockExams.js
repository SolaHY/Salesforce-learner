// 模擬試験（本番想定）。
// 出題は実試験対策サイトの問題（mockQuestions）をそのまま使用する。
//   - japanitstudy.com（ADM-201 練習問題 1-20）
//   - jpnshiken.com（ADM-201 過去問 2024-11 / 2026-04）
// 全問題プールをドメインで均等に混ぜ、本番想定の 60 問ずつに分割して各回を構成する。
// 決定論的に構成するので、リロードしても同じ回は同じ問題セットになる。
import { mockQuestions } from './mockQuestions'
import { domains, domainById } from './domains'

export const MOCK_SIZE = 60 // 1 回あたりの問題数（本番想定）
export const PASS_PCT = 65 // 合格ライン（本番の目安）

// ドメイン別に問題をまとめ、各ドメインを全体に均等分散させて並べる。
// （単純なラウンドロビンだと少数ドメインが先に尽き、後半の回に偏りが出るため、
//   各ドメインの問題を [0,1) 区間に等間隔で配置し、その位置でソートする）
function balancedOrder(list) {
  const buckets = new Map()
  for (const d of domains) buckets.set(d.id, [])
  for (const q of list) {
    if (!buckets.has(q.domain)) buckets.set(q.domain, [])
    buckets.get(q.domain).push(q)
  }
  const order = [...buckets.keys()]
  const spread = []
  for (const [domainId, items] of buckets) {
    const k = items.length
    items.forEach((q, j) => {
      spread.push({ q, key: (j + 0.5) / k, tie: order.indexOf(domainId) })
    })
  }
  spread.sort((a, b) => a.key - b.key || a.tie - b.tie)
  return spread.map((s) => s.q)
}

const ordered = balancedOrder(mockQuestions)

// 60 問ずつに分割して模試を構成する。
function buildMocks() {
  const mocks = []
  const n = Math.ceil(ordered.length / MOCK_SIZE)
  for (let m = 0; m < n; m++) {
    const items = ordered.slice(m * MOCK_SIZE, (m + 1) * MOCK_SIZE)
    // ドメイン別の内訳（構成バー用）
    const counts = {}
    for (const q of items) counts[q.domain] = (counts[q.domain] || 0) + 1
    const composition = domains
      .filter((d) => counts[d.id])
      .map((d) => ({ id: d.id, name: d.name, color: d.color, count: counts[d.id] }))
    mocks.push({
      id: m + 1,
      title: `模試 ${m + 1}`,
      questions: items,
      total: items.length,
      composition,
    })
  }
  return mocks
}

export const mockExams = buildMocks()
export const MOCK_COUNT = mockExams.length

export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
