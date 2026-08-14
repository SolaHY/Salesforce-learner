// Service Cloud Consultant の模擬試験。
// Set A は同梱の練習試験（screenshots/Service Cloud）と同一の60問を、原本と同じ並び順で出題する。
// 本番と同じ条件：60問・105分・67%（約40/60問正解）で合格。
import { officialSetA } from './quizzes'
import { domains } from './domains'

export const PASS_PCT = 67
export const PASS_COUNT = 40
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
  buildMock({ id: 1, title: 'Full Practice Exam — Set A', items: officialSetA, tag: '原本と同じ並び順' }),
]

export const mockById = (id) => mockExams.find((mk) => String(mk.id) === String(id))
