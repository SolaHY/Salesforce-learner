// Service Cloud Consultant の問題集。
// 出題文と選択肢は英語（原文）、解説は英日併記。設問ごとに日本語へ切り替えられる。
//   source: 'official' … 同梱の練習試験 Set A と同一の問題（screenshots/Service Cloud）
import { setA1Questions } from './questions/setA1'
import { setA2Questions } from './questions/setA2'

export const officialSetA = [...setA1Questions, ...setA2Questions].sort(
  (a, b) => a.examOrder - b.examOrder,
)

export const questions = [...officialSetA]

export const questionsByDomain = (domainId) => questions.filter((q) => q.domain === domainId)
