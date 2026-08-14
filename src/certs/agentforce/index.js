// 資格定義：Salesforce Certified Agentforce Specialist
// 教材は英語（原文）で、設問・セクション単位で日本語へ切り替えられる（bilingual: true）。
import { domains, domainById } from './domains'
import { questions, questionsByDomain } from './quizzes'
import { studyMaterials } from './studyMaterials'
import { flashcards, flashcardsByDomain } from './flashcards'
import { roadmap, resources } from './roadmap'
import { mockExams, PASS_PCT as MOCK_PASS_PCT, PASS_COUNT, TIME_LIMIT_MIN } from './mockExams'
import { makeBadges } from '../../data/gamification'

// 単元クリアの判定ライン。本番の合格ラインが約73%と高いため、単元テストも73%に合わせる。
const STAGE_CLEAR_PCT = 0.73

// アバターの成長段階。index = クリア済み単元数 (0〜6)。
const ranks = [
  { title: 'Newcomer', ring: '#64748b' },
  { title: 'Prompt Builder', ring: '#b08d57' },
  { title: 'Agent Builder', ring: '#21c08a' },
  { title: 'Data Specialist', ring: '#2b9bff' },
  { title: 'Trust Engineer', ring: '#7c8cff' },
  { title: 'Agentforce Architect', ring: '#b06bff' },
  { title: 'Certified Agentforce Specialist', ring: '#ffcf5a' },
]

const officialCount = questions.filter((q) => q.source === 'official').length
const scenarioCount = questions.filter((q) => q.type === 'scenario').length

export const agentforceCert = {
  id: 'agentforce',
  name: 'Salesforce Certified Agentforce Specialist',
  short: 'Agentforce',
  code: 'Agentforce Specialist',
  subtitle: 'Agentforce Specialist 対策（英語）',
  accent: '#16B8A6',
  bilingual: true,
  exam: {
    questions: '60 questions',
    minutes: TIME_LIMIT_MIN,
    passPct: MOCK_PASS_PCT,
    prereq: `合格には ${PASS_COUNT} / 60 問の正解が必要`,
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
    intro: `同梱の模擬試験（screenshots/Agentforce）と同一の ${officialCount} 問を、原本と同じ並び順で収録しています。本番と同じ条件は「60問・${TIME_LIMIT_MIN}分・${PASS_COUNT}問正解で合格（約${MOCK_PASS_PCT}%）」。メモなし・タイマー停止なしで通しで解いてください。解説は英語表示ですが、設問ごとの「日本語」ボタンでいつでも切り替えられます。`,
  },
  mapIntro: `6つの単元を、英語のまま学習します。分からない箇所は各設問・各セクションの「日本語」ボタンでその場だけ切り替えられます（サイドバーで既定の表示言語も変更できます）。全 ${questions.length} 問のうち ${officialCount} 問は同梱の模擬試験と同一、${scenarioCount} 問は論点を別の状況で問い直す応用問題です。単元テストで73%以上を取るとクリアになります。`,
}
