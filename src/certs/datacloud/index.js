// 資格定義：Salesforce Certified Data Cloud Consultant（現 Data 360 Consultant）
// 教材は英語（原文）で、設問・セクション単位で日本語へ切り替えられる（bilingual: true）。
import { domains, domainById } from './domains'
import { questions, questionsByDomain } from './quizzes'
import { studyMaterials } from './studyMaterials'
import { flashcards, flashcardsByDomain } from './flashcards'
import { roadmap, resources } from './roadmap'
import {
  mockExams,
  MOCK_COUNT,
  PASS_PCT as MOCK_PASS_PCT,
  PASS_COUNT,
  TIME_LIMIT_MIN,
} from './mockExams'
import { makeBadges } from '../../data/gamification'

// 単元クリアの判定ライン。本番の合格ラインに合わせて70%とする。
const STAGE_CLEAR_PCT = 0.7

// アバターの成長段階。index = クリア済み単元数 (0〜6)。
const ranks = [
  { title: 'Newcomer', ring: '#64748b' },
  { title: 'Data Explorer', ring: '#b08d57' },
  { title: 'Ingestion Engineer', ring: '#21c08a' },
  { title: 'Harmonization Specialist', ring: '#2b9bff' },
  { title: 'Insights Builder', ring: '#7c8cff' },
  { title: 'Activation Strategist', ring: '#b06bff' },
  { title: 'Certified Data 360 Consultant', ring: '#ffcf5a' },
]

export const dataCloudCert = {
  id: 'datacloud',
  name: 'Salesforce Certified Data Cloud Consultant（Data 360 Consultant）',
  short: 'Data Cloud',
  code: 'Data 360 Consultant',
  subtitle: 'Data Cloud / Data 360 Consultant 対策（英語）',
  accent: '#0EA5A5',
  bilingual: true,
  exam: {
    questions: '60 questions (+5 unscored)',
    minutes: TIME_LIMIT_MIN,
    passPct: MOCK_PASS_PCT,
    prereq: `前提資格なし・約 ${PASS_COUNT} / 60 問の正解が必要`,
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
    intro: `全 ${questions.length} 問を出題プールとして、本番想定の60問ずつ ${MOCK_COUNT} 回に分割しています。各回は6単元がまんべんなく混ざるよう構成され、リロードしても同じ回は同じ問題です。本番と同じ条件は「60問（＋採点対象外5問）・${TIME_LIMIT_MIN}分・約${PASS_COUNT}問正解で合格（${MOCK_PASS_PCT}%）」。解説は英語表示ですが、設問ごとの「日本語」ボタンでいつでも切り替えられます。`,
  },
  mapIntro: `6つの単元を英語のまま学習します。分からない箇所は各設問・各セクションの「日本語」ボタンでその場だけ切り替えられます（サイドバーで既定の表示言語も変更できます）。配点は公式試験ガイドの比率どおりで、全 ${questions.length} 問はその比率に沿って配分しています。単元テストで70%以上を取るとクリアになります。※2025年の改称により、試験名は「Data Cloud Consultant」から「Data 360 Consultant」へ移行しました（同一の資格です）。`,
}
