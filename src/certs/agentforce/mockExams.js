// Agentforce Specialist の模擬試験。
// Mock Exam 1 は同梱の模試（screenshots/Agentforce）と同一の 60 問を、原本と同じ並び順で出題する。
// 本番と同じ条件：60問・105分・44問正解（約73%）で合格。
import { officialMock1 } from './quizzes'
import { domains } from './domains'

export const PASS_PCT = 73 // 44 / 60 ≒ 73%
export const PASS_COUNT = 44
export const TIME_LIMIT_MIN = 105

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
    officialCount: items.filter((q) => q.source === 'official').length,
    scenarioCount: items.filter((q) => q.type === 'scenario').length,
  }
}

export const mockExams = [
  buildMock({
    id: 1,
    title: 'Mock Exam 1',
    items: officialMock1,
    tag: '原本と同じ並び順',
  }),
]

export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
