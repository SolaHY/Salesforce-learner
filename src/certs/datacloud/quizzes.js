// Data Cloud (Data 360) Consultant の問題集。
// 出題文と選択肢は英語（原文）、解説は英日併記。設問ごとに日本語へ切り替えられる。
// 公式の練習試験を同梱していない資格のため source は付けず、出典バッジは表示しない。
import { positioningQuestions } from './questions/positioning'
import { setupQuestions } from './questions/setup'
import { ingestionQuestions } from './questions/ingestion'
import { unificationQuestions } from './questions/unification'
import { insightsQuestions } from './questions/insights'
import { activationQuestions } from './questions/activation'
import { appliedQuestions } from './questions/applied'

export const questions = [
  ...positioningQuestions,
  ...setupQuestions,
  ...ingestionQuestions,
  ...unificationQuestions,
  ...insightsQuestions,
  ...activationQuestions,
  ...appliedQuestions,
]

export const questionsByDomain = (domainId) => questions.filter((q) => q.domain === domainId)
