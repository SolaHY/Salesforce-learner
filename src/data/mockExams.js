// 模擬試験（本番想定）。
// 出題プールは 3 系統。
//   1. 公式プラクティステストと同一問題（officialQuestions）… screenshots/ の公式問題を日本語化
//   2. 上記の類似問題（similarQuestions）… 同じ論点を別シナリオで問う
//   3. 実試験対策サイトの問題（mockQuestions）
//        - japanitstudy.com（ADM-201 練習問題 1-20）
//        - jpnshiken.com（ADM-201 過去問 2024-11 / 2026-04）
// 3 系統を均等に織り込んだうえでドメインを均等分散させ、本番想定の約 60 問ずつに分割する。
// 決定論的に構成するので、リロードしても同じ回は同じ問題セットになる。
// さらに、出典がひとまとまりの追加模試（extraMockQuestions・全 8 分野ミックス 60 問）を
// 最終回として末尾に固定で追加する。分割対象のプールには混ぜないため、既存の回の問題構成は変わらない。
import { mockQuestions } from './mockQuestions'
import { officialQuestions, similarQuestions } from './officialQuestions'
import { extraMockQuestions } from './extraMockExam'
import { domains } from './domains'

export const MOCK_SIZE = 60 // 1 回あたりの問題数（本番想定）
export const PASS_PCT = 65 // 合格ライン（本番の目安）

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

// 公式問題と、その類似問題が同じ回に固まらないよう類似問題側は逆順で織り込む。
const pool = weave([officialQuestions, [...similarQuestions].reverse(), mockQuestions])

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
  return weave([...buckets.values()])
}

const ordered = balancedOrder(pool)

// 問題リストから 1 回分の模試オブジェクトを組み立てる（ドメイン内訳・公式問題数を付与）。
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
    // 公式問題と同一の問題が何問含まれるか（一覧のバッジ用）
    officialCount: items.filter((q) => q.source === 'official').length,
  }
}

// 約 MOCK_SIZE 問ずつに分割して模試を構成する。
// 端数だけの極端に短い回ができないよう、全回をほぼ均等な問題数に振り分ける。
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

const generatedMocks = buildMocks()

// 追加模試（全 8 分野ミックス 60 問）を最終回として末尾に固定する。
const extraMock = buildMock({
  id: generatedMocks.length + 1,
  title: `模試 ${generatedMocks.length + 1}`,
  items: extraMockQuestions,
  tag: '全分野ミックス',
})

export const mockExams = [...generatedMocks, extraMock]
export const MOCK_COUNT = mockExams.length
export const OFFICIAL_COUNT = officialQuestions.length
export const SIMILAR_COUNT = similarQuestions.length
export const EXTRA_COUNT = extraMockQuestions.length

export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
