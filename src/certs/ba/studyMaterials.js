// Business Analyst 各ドメインの学習教材。
// スキーマは Admin 版と同一： { intro, sections: [{ heading, body, points: [], figure? }] }
//   sections の前半 = インプット(基礎)、後半 = 深堀インプット(応用) として自動分割される。
import { discoveryStudy } from './study/discovery'
import { collaborationStudy } from './study/collaboration'
import { processStudy } from './study/process'
import { requirementsStudy } from './study/requirements'
import { userStoriesStudy } from './study/userStories'
import { acceptanceStudy } from './study/acceptance'

export const studyMaterials = {
  'ba-discovery': discoveryStudy,
  'ba-collaboration': collaborationStudy,
  'ba-process': processStudy,
  'ba-requirements': requirementsStudy,
  'ba-user-stories': userStoriesStudy,
  'ba-acceptance': acceptanceStudy,
}
