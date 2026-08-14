// Service Cloud Consultant の学習教材。
// 英語で学び、必要な箇所だけ日本語に切り替えられるよう heading / body / points を英日併記している。
import {
  implementationStudy,
  solutionStudy,
  caseStudy,
  channelsStudy,
} from './study/coreA'
import { knowledgeStudy, consoleStudy, dataStudy, analyticsStudy } from './study/coreB'

export const studyMaterials = {
  'sc-implementation': implementationStudy,
  'sc-solution': solutionStudy,
  'sc-case': caseStudy,
  'sc-channels': channelsStudy,
  'sc-knowledge': knowledgeStudy,
  'sc-console': consoleStudy,
  'sc-data': dataStudy,
  'sc-analytics': analyticsStudy,
}
