// Agentforce Specialist の問題集。
// 出題文と選択肢は英語（原文）、解説は英日併記。設問ごとに日本語へ切り替えられる。
//   source: 'official' … 同梱の模擬試験 Mock Exam 1 と同一の問題（screenshots/Agentforce）
//   type: 'scenario'   … 本教材で作成した応用（シナリオ）問題
import { mock1aQuestions } from './questions/mock1a'
import { mock1bQuestions } from './questions/mock1b'
import { appliedQuestions } from './questions/applied'

export const officialMock1 = [...mock1aQuestions, ...mock1bQuestions].sort(
  (a, b) => a.examOrder - b.examOrder,
)

export const questions = [...officialMock1, ...appliedQuestions]

export const questionsByDomain = (domainId) => questions.filter((q) => q.domain === domainId)
