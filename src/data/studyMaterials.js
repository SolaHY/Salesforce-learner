// 各ドメインの学習教材（読んで理解できる詳細版）。
// スキーマ: { intro, sections: [{ heading, body, points: [] }] }
//   intro   : 領域の位置づけ・配点（インプット冒頭に表示）
//   sections: 前半 = インプット(基礎)、後半 = 深堀インプット(応用) として自動分割される
//   body    : セクションの地の文解説（任意）
//   points  : 詳細な箇条書き（各項目は完結した説明文）
// 内容量が多いためドメインごとにファイル分割している（src/data/study/*.js）。
import { dataAnalyticsStudy } from './study/dataAnalytics'
import { configSetupStudy } from './study/configSetup'
import { objectManagerStudy } from './study/objectManager'
import { automationStudy } from './study/automation'
import { salesMarketingStudy } from './study/salesMarketing'
import { serviceSupportStudy } from './study/serviceSupport'
import { productivityStudy } from './study/productivity'
import { agentforceStudy } from './study/agentforce'

export const studyMaterials = {
  'data-analytics': dataAnalyticsStudy,
  'config-setup': configSetupStudy,
  'object-manager': objectManagerStudy,
  automation: automationStudy,
  'sales-marketing': salesMarketingStudy,
  'service-support': serviceSupportStudy,
  productivity: productivityStudy,
  agentforce: agentforceStudy,
}
