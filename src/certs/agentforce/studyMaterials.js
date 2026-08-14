// Agentforce Specialist の学習教材。英語で学び、必要な箇所だけ日本語に切り替えられるよう
// heading / body / points をすべて英日併記している（*_ja が日本語）。
import { promptStudy } from './study/prompt'
import { agentStudy } from './study/agent'
import { dataStudy } from './study/data'
import { trustStudy } from './study/trust'
import { lifecycleStudy } from './study/lifecycle'
import { integrationStudy } from './study/integration'

export const studyMaterials = {
  'af-prompt': promptStudy,
  'af-agent': agentStudy,
  'af-data': dataStudy,
  'af-trust': trustStudy,
  'af-lifecycle': lifecycleStudy,
  'af-integration': integrationStudy,
}
