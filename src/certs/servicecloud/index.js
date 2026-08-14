// 資格定義：Salesforce Certified Service Cloud Consultant
// 教材は英語（原文）で、設問・セクション単位で日本語へ切り替えられる（bilingual: true）。
import { domains, domainById } from './domains'
import { questions, questionsByDomain } from './quizzes'
import { studyMaterials } from './studyMaterials'
import { flashcards, flashcardsByDomain } from './flashcards'
import { roadmap, resources } from './roadmap'
import { mockExams, PASS_PCT as MOCK_PASS_PCT, PASS_COUNT, TIME_LIMIT_MIN } from './mockExams'
import { makeBadges } from '../../data/gamification'

// 単元クリアの判定ライン。本番の合格ラインに合わせて67%とする。
const STAGE_CLEAR_PCT = 0.67

// アバターの成長段階。index = クリア済み単元数 (0〜8)。
const ranks = [
  { title: 'Newcomer', ring: '#64748b' },
  { title: 'Support Agent', ring: '#b08d57' },
  { title: 'Senior Agent', ring: '#9aa6b2' },
  { title: 'Service Admin', ring: '#21c08a' },
  { title: 'Solution Designer', ring: '#2b9bff' },
  { title: 'Service Architect', ring: '#7c8cff' },
  { title: 'Lead Consultant', ring: '#b06bff' },
  { title: 'Principal Consultant', ring: '#16b8a6' },
  { title: 'Certified Service Cloud Consultant', ring: '#ffcf5a' },
]

const officialCount = questions.filter((q) => q.source === 'official').length

export const serviceCloudCert = {
  id: 'servicecloud',
  name: 'Salesforce Certified Service Cloud Consultant',
  short: 'Service Cloud',
  code: 'Service Cloud Consultant',
  subtitle: 'Service Cloud Consultant 対策（英語）',
  accent: '#F2994A',
  bilingual: true,
  exam: {
    questions: '60 questions',
    minutes: TIME_LIMIT_MIN,
    passPct: MOCK_PASS_PCT,
    prereq: `合格には約 ${PASS_COUNT} / 60 問の正解が必要`,
  },
  stageClearPct: STAGE_CLEAR_PCT,
  domains,
  domainById,
  questions,
  questionsByDomain,
  studyMaterials,
  flashcards,
  flashcardsByDomain,
  roadmap,
  resources,
  ranks,
  badges: makeBadges({ unitLabel: '単元' }),
  mocks: {
    exams: mockExams,
    passPct: MOCK_PASS_PCT,
    intro: `同梱の練習試験（screenshots/Service Cloud・Set A）と同一の ${officialCount} 問を、原本と同じ並び順で収録しています。本番と同じ条件は「60問・${TIME_LIMIT_MIN}分・約${PASS_COUNT}問正解で合格（${MOCK_PASS_PCT}%）」。解説は英語表示ですが、設問ごとの「日本語」ボタンでいつでも切り替えられます。`,
  },
  mapIntro: `8つの単元を英語のまま学習します。分からない箇所は各設問・各セクションの「日本語」ボタンでその場だけ切り替えられます（サイドバーで既定の表示言語も変更できます）。全 ${questions.length} 問はすべて同梱の練習試験 Set A と同一です。単元テストで67%以上を取るとクリアになります。配点は公式試験ガイドの比率に合わせているため、練習試験の出題分布とは一致しません。`,
}
