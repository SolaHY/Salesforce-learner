// 問題集（拡張版）
// スキーマ:
//   id, domain, type: 'mcq' | 'multi' | 'scenario'
//   scenario?  : シミュレーション問題の状況設定（任意）
//   question   : 設問
//   options[]  : { text, correct, note }  note=なぜ正解/不正解か
//   explanation: 全体のまとめ解説
//   reference? : 補足情報・実務Tips
//
// 正解は options[].correct から導出する（複数 true で複数選択問題）。

import { configSetupQuestions } from './questions/configSetup'
import { objectManagerQuestions } from './questions/objectManager'
import { salesMarketingQuestions } from './questions/salesMarketing'
import { serviceSupportQuestions } from './questions/serviceSupport'
import { productivityQuestions } from './questions/productivity'
import { dataAnalyticsQuestions } from './questions/dataAnalytics'
import { automationQuestions } from './questions/automation'
import { agentforceQuestions } from './questions/agentforce'

export const questions = [
  ...configSetupQuestions,
  ...objectManagerQuestions,
  ...salesMarketingQuestions,
  ...serviceSupportQuestions,
  ...productivityQuestions,
  ...dataAnalyticsQuestions,
  ...automationQuestions,
  ...agentforceQuestions,
]

export { correctIndices, isMulti } from './questionUtils'

export const questionsByDomain = (domainId) =>
  questions.filter((q) => q.domain === domainId)
