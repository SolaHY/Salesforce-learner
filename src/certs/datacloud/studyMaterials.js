// Data Cloud (Data 360) Consultant の学習教材。
// 英語で学び、必要な箇所だけ日本語に切り替えられるよう heading / body / points を英日併記している。
import { positioningStudy, setupStudy, ingestionStudy } from './study/coreA'
import { unificationStudy, insightsStudy, activationStudy } from './study/coreB'

export const studyMaterials = {
  'dc-positioning': positioningStudy,
  'dc-setup': setupStudy,
  'dc-ingestion': ingestionStudy,
  'dc-unification': unificationStudy,
  'dc-insights': insightsStudy,
  'dc-activation': activationStudy,
}
