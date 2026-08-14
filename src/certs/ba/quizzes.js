// Business Analyst 問題集。
// スキーマは Admin 版と同一：
//   id, domain, type: 'mcq' | 'multi' | 'scenario'
//   scenario?  : シミュレーション問題の状況設定（任意）
//   question   : 設問
//   options[]  : { text, correct, note }  note=なぜ正解/不正解か
//   explanation: 全体のまとめ解説
//   reference? : 補足情報・実務Tips
import { discoveryQuestions } from './questions/discovery'
import { collaborationQuestions } from './questions/collaboration'
import { processQuestions } from './questions/process'
import { requirementsQuestions } from './questions/requirements'
import { userStoryQuestions } from './questions/userStories'
import { acceptanceQuestions } from './questions/acceptance'

export const questions = [
  ...discoveryQuestions,
  ...collaborationQuestions,
  ...processQuestions,
  ...requirementsQuestions,
  ...userStoryQuestions,
  ...acceptanceQuestions,
]

export const questionsByDomain = (domainId) => questions.filter((q) => q.domain === domainId)
