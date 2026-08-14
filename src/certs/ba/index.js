// 資格定義：Salesforce Certified Business Analyst
import { domains, domainById } from './domains'
import { questions, questionsByDomain } from './quizzes'
import { studyMaterials } from './studyMaterials'
import { flashcards, flashcardsByDomain } from './flashcards'
import { roadmap, resources } from './roadmap'
import { mockExams, PASS_PCT as MOCK_PASS_PCT } from './mockExams'
import { makeBadges } from '../../data/gamification'

// 単元クリアの判定ライン。本番の合格ラインが72%と高いため、単元テストも72%に合わせる。
const STAGE_CLEAR_PCT = 0.72

// アバターの成長段階。index = クリア済み単元数 (0〜6)。
const ranks = [
  { title: '見習い', ring: '#64748b' },
  { title: 'ジュニアアナリスト', ring: '#b08d57' },
  { title: 'ビジネスアナリスト', ring: '#21c08a' },
  { title: 'シニアアナリスト', ring: '#2b9bff' },
  { title: 'リードアナリスト', ring: '#7c8cff' },
  { title: 'プリンシパルアナリスト', ring: '#b06bff' },
  { title: '認定ビジネスアナリスト', ring: '#ffcf5a' },
]

const mockTotal = mockExams.reduce((s, mk) => s + mk.total, 0)
const scenarioTotal = questions.filter((q) => q.type === 'scenario').length

export const baCert = {
  id: 'ba',
  name: 'Salesforce 認定ビジネスアナリスト',
  short: 'ビジネスアナリスト',
  code: 'Business Analyst',
  subtitle: 'Salesforce 認定BA対策',
  accent: '#7F56D9',
  exam: {
    questions: '60問（＋採点対象外5問）',
    minutes: 105,
    passPct: 72,
    prereq: 'Salesforce 認定アドミニストレーター資格の保有が前提',
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
    intro: `全 ${mockTotal} 問（うちシナリオ ${scenarioTotal} 問）を、本番想定の約 ${mockExams[0].total} 問ずつ全 ${mockExams.length} 回分に構成しました。各回は6ドメインと出題形式（単純選択／シナリオ）をバランスよくミックスしています。合格ラインは本番と同じ ${MOCK_PASS_PCT}% です。`,
  },
  mapIntro:
    '6つの単元を、BA のプロジェクトライフサイクル順（ディスカバリー → 協働 → プロセス → 要件 → ストーリー → 受け入れ）に攻略します。各単元は「インプット → 簡単クイズ → 深堀インプット → 応用クイズ → 単元テスト」の流れで進み、単元テストで72%以上を取るとクリアになります。',
}
