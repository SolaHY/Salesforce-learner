// 資格定義：Salesforce 認定アドミニストレーター（ADM-201）
// 既存の src/data/* をそのまま束ねたもの。
import { domains, domainById } from '../data/domains'
import { questions, questionsByDomain } from '../data/quizzes'
import { studyMaterials } from '../data/studyMaterials'
import { flashcards, flashcardsByDomain } from '../data/flashcards'
import { roadmap, resources } from '../data/roadmap'
import {
  mockExams,
  PASS_PCT as MOCK_PASS_PCT,
  OFFICIAL_COUNT,
  SIMILAR_COUNT,
  EXTRA_COUNT,
} from '../data/mockExams'
import { makeBadges, STAGE_CLEAR_PCT } from '../data/gamification'

// アバターの成長段階。index = クリア済み単元数 (0〜8)。
const ranks = [
  { title: '見習い', ring: '#64748b' },
  { title: 'アソシエイト', ring: '#b08d57' },
  { title: 'ジュニアアドミン', ring: '#9aa6b2' },
  { title: 'アドミニストレーター', ring: '#21c08a' },
  { title: 'シニアアドミン', ring: '#2b9bff' },
  { title: 'リードアドミン', ring: '#7c8cff' },
  { title: 'エキスパート', ring: '#b06bff' },
  { title: 'AIスペシャリスト', ring: '#16b8a6' },
  { title: '認定アドミニストレーター', ring: '#ffcf5a' },
]

const mockTotal = mockExams.reduce((s, mk) => s + mk.total, 0)

export const adminCert = {
  id: 'admin',
  name: 'Salesforce 認定アドミニストレーター',
  short: 'アドミニストレーター',
  code: 'ADM-201',
  subtitle: 'Salesforce 認定アドミン対策',
  accent: '#00A1E0',
  // 本番試験の概要
  exam: {
    questions: '60問（＋採点対象外5問）',
    minutes: 105,
    passPct: 65,
    prereq: null,
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
    intro: `公式プラクティステストと同一の ${OFFICIAL_COUNT} 問、その類似問題 ${SIMILAR_COUNT} 問、実試験対策問題（japanitstudy / jpnshiken）を合わせた全 ${mockTotal} 問を、本番想定の約 ${mockExams[0].total} 問ずつ全 ${mockExams.length} 回分に構成しました。各回はドメインと出典をバランスよくミックスしています。最終回（模試 ${mockExams.length}）は全 8 分野を通しで出題する追加セット ${EXTRA_COUNT} 問です。合格ラインは ${MOCK_PASS_PCT}% です。`,
  },
  // 学習マップの説明文
  mapIntro:
    '8つの単元を順に攻略していきましょう。各単元は「インプット → 簡単クイズ → 深堀インプット → 応用クイズ → 単元テスト」の流れで進み、単元テストで70%以上を取るとクリアになります。',
}
