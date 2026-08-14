import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCert } from '../hooks/useCert'
import { useProgress } from '../hooks/useProgress'
import { useLang, pick, hasJa } from '../hooks/useLang'
import { shortName } from '../data/questionUtils'
import { scoreRank } from '../data/gamification'
import QuizRunner from '../components/QuizRunner'
import Confetti from '../components/Confetti'
import Figure from '../components/Figure'
import LangToggle from '../components/LangToggle'

const STEPS = [
  { key: 'input', label: 'インプット', short: '基礎' },
  { key: 'easyQuiz', label: '簡単クイズ', short: '確認' },
  { key: 'deepInput', label: '深堀インプット', short: '応用知識' },
  { key: 'appliedQuiz', label: '応用クイズ', short: 'シナリオ' },
  { key: 'unitTest', label: '単元テスト', short: '総仕上げ' },
]

function Stepper({ current, onJump }) {
  return (
    <div className="flow-steps">
      {STEPS.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo'
        return (
          <button
            key={s.key}
            className={`flow-step ${state}`}
            onClick={() => onJump(i)}
          >
            <span className="flow-step-dot">{i < current ? '✓' : i + 1}</span>
            <span className="flow-step-text">
              <span className="flow-step-label">{s.label}</span>
              <span className="flow-step-short">{s.short}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

// セクション1つ。日本語訳を持つ教材では、右上の「日本語」ボタンでその節だけを切り替えられる。
function Section({ section }) {
  const { lang: globalLang } = useLang()
  const [override, setOverride] = useState(null)
  const lang = override ?? globalLang
  const bilingual = hasJa(section, ['heading', 'body', 'points'])
  const points = pick(section, 'points', lang) ?? []

  return (
    <div className="study-section">
      <div className="study-section-head">
        <h3 lang={lang}>{pick(section, 'heading', lang)}</h3>
        {bilingual && (
          <LangToggle lang={lang} onToggle={() => setOverride(lang === 'ja' ? 'en' : 'ja')} />
        )}
      </div>
      {pick(section, 'body', lang) && (
        <p className="study-body" lang={lang}>{pick(section, 'body', lang)}</p>
      )}
      {section.figure && <Figure name={section.figure} />}
      {points.length > 0 && (
        <ul lang={lang}>
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Sections({ sections }) {
  return (
    <>
      {sections.map((section) => (
        <Section section={section} key={section.heading} />
      ))}
    </>
  )
}

// 単元の導入文。日本語訳があればこれも個別に切り替えられる。
function Intro({ material }) {
  const { lang: globalLang } = useLang()
  const [override, setOverride] = useState(null)
  const lang = override ?? globalLang
  const bilingual = hasJa(material, ['intro'])
  return (
    <div className="flow-lead-row">
      <p className="flow-lead" lang={lang}>{pick(material, 'intro', lang)}</p>
      {bilingual && (
        <LangToggle lang={lang} onToggle={() => setOverride(lang === 'ja' ? 'en' : 'ja')} />
      )}
    </div>
  )
}

// 実務ポイント（各問題の reference）1件。
function Tip({ q, first }) {
  const { lang: globalLang } = useLang()
  const [override, setOverride] = useState(null)
  const lang = override ?? globalLang
  const bilingual = hasJa(q, ['reference'])
  return (
    <div className="reference tip-row" style={{ marginTop: first ? 0 : 10 }} lang={lang}>
      <span>{pick(q, 'reference', lang)}</span>
      {bilingual && (
        <LangToggle lang={lang} onToggle={() => setOverride(lang === 'ja' ? 'en' : 'ja')} />
      )}
    </div>
  )
}

// 用語カード（重要用語）1件。こちらも個別に日本語へ切り替えられる。
function Term({ card }) {
  const { lang: globalLang } = useLang()
  const [override, setOverride] = useState(null)
  const lang = override ?? globalLang
  const bilingual = hasJa(card, ['front', 'back'])
  return (
    <div className="term">
      <dt lang={lang}>
        {pick(card, 'front', lang)}
        {bilingual && (
          <LangToggle lang={lang} onToggle={() => setOverride(lang === 'ja' ? 'en' : 'ja')} />
        )}
      </dt>
      <dd lang={lang}>{pick(card, 'back', lang)}</dd>
    </div>
  )
}

export default function UnitFlow() {
  const { domainId } = useParams()
  const navigate = useNavigate()
  const { recordSession } = useProgress()
  const cert = useCert()
  const { domains, domainById, studyMaterials, questionsByDomain, flashcardsByDomain } = cert
  const PASS_PCT = Math.round(cert.stageClearPct * 100)

  const [step, setStep] = useState(0)
  const [testResult, setTestResult] = useState(null)

  const domain = domainById[domainId]
  const material = studyMaterials[domainId]
  const allQuestions = questionsByDomain(domainId)

  if (!domain || !material) {
    return (
      <div>
        <Link className="back-link" to="/">
          ← 学習マップへ
        </Link>
        <div className="empty">この単元は見つかりませんでした。</div>
      </div>
    )
  }

  const unitNo = domains.findIndex((d) => d.id === domainId) + 1
  const sections = material.sections
  const basicCount = Math.ceil(sections.length / 2)
  const basicSections = sections.slice(0, basicCount)
  const deepSections = sections.slice(basicCount)
  const cards = flashcardsByDomain(domainId)
  // 実務ポイントは各問題の reference から集める（日英どちらも持つ場合は個別に切り替えられる）
  const tips = allQuestions.filter((q) => q.reference || q.reference_ja)

  // 簡単クイズ / 応用クイズの振り分け。
  // シナリオ形式の問題を持つ資格はそれを応用クイズに回す。
  // すべてが状況設定型で type 'scenario' を持たない資格（Service Cloud など）は、
  // 前半を簡単クイズ・後半を応用クイズに二分し、どちらのステップも空にならないようにする。
  const scenarioQuestions = allQuestions.filter((q) => q.type === 'scenario')
  const hasScenarioType = scenarioQuestions.length > 0
  const half = Math.ceil(allQuestions.length / 2)
  const easyQuestions = hasScenarioType
    ? allQuestions.filter((q) => q.type !== 'scenario')
    : allQuestions.slice(0, half)
  const appliedQuestions = hasScenarioType ? scenarioQuestions : allQuestions.slice(half)

  function advance() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function finishTest({ score, total }) {
    recordSession({ domainId, total, score })
    setTestResult({ score, total })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stepKey = STEPS[step].key

  return (
    <div>
      <Link className="back-link" to="/">
        ← 学習マップへ
      </Link>
      <div className="flow-head">
        <h1 className="page-title" style={{ marginBottom: 2 }}>
          単元 {unitNo}：{shortName(domain.name)}
        </h1>
        <span className="weight-pill">配点 {domain.weight}%</span>
      </div>
      <p className="page-sub">
        インプットからクイズ、単元テストまでを一気通貫で進めます。最後の単元テストで{PASS_PCT}%以上を取るとクリアです。
      </p>

      <Stepper current={step} onJump={(i) => { setStep(i); setTestResult(null) }} />

      {/* ステップ1: インプット */}
      {stepKey === 'input' && (
        <div className="card" style={{ borderLeft: `5px solid ${domain.color}` }}>
          <Intro material={material} />
          <Sections sections={basicSections} />
          <div className="flow-actions">
            <button className="btn gold" onClick={advance}>
              簡単クイズに進む →
            </button>
          </div>
        </div>
      )}

      {/* ステップ2: 簡単クイズ */}
      {stepKey === 'easyQuiz' && (
        <>
          <p className="flow-lead">
            インプットした基礎を確認しましょう。全{easyQuestions.length}問・即時に解説が出ます。
          </p>
          <QuizRunner
            key="easy"
            questions={easyQuestions}
            nextLabel="深堀インプットへ →"
            onComplete={advance}
          />
        </>
      )}

      {/* ステップ3: 深堀インプット */}
      {stepKey === 'deepInput' && (
        <div className="card" style={{ borderLeft: `5px solid ${domain.color}` }}>
          <p className="flow-lead">
            一歩踏み込んだ知識と、押さえておきたい重要用語・実務ポイントです。
          </p>
          {deepSections.length > 0 && <Sections sections={deepSections} />}

          {cards.length > 0 && (
            <div className="study-section">
              <h3>重要用語</h3>
              <dl className="term-list">
                {cards.map((c) => (
                  <Term card={c} key={c.id} />
                ))}
              </dl>
            </div>
          )}

          {tips.length > 0 && (
            <div className="study-section">
              <h3>実務ポイント</h3>
              {tips.map((q, i) => (
                <Tip q={q} key={q.id} first={i === 0} />
              ))}
            </div>
          )}

          <div className="flow-actions">
            <button className="btn gold" onClick={advance}>
              応用クイズに進む →
            </button>
          </div>
        </div>
      )}

      {/* ステップ4: 応用クイズ */}
      {stepKey === 'appliedQuiz' && (
        <>
          <p className="flow-lead">
            {hasScenarioType
              ? `実際の場面を想定したシナリオ問題です。全${appliedQuestions.length}問。`
              : `実際の案件を想定した後半の${appliedQuestions.length}問です。判断の根拠まで説明できるか確認しましょう。`}
          </p>
          <QuizRunner
            key="applied"
            questions={appliedQuestions}
            nextLabel="単元テストへ →"
            onComplete={advance}
          />
        </>
      )}

      {/* ステップ5: 単元テスト */}
      {stepKey === 'unitTest' && !testResult && (
        <>
          <p className="flow-lead">
            この単元の総仕上げです。全{allQuestions.length}問・{PASS_PCT}%以上でクリアになります。
          </p>
          <QuizRunner
            key="test"
            questions={allQuestions}
            nextLabel="結果を見る"
            onComplete={finishTest}
          />
        </>
      )}

      {stepKey === 'unitTest' && testResult && (
        <TestResult
          result={testResult}
          domain={domain}
          unitNo={unitNo}
          domains={domains}
          passPct={PASS_PCT}
          onRetry={() => setTestResult(null)}
          navigate={navigate}
        />
      )}
    </div>
  )
}

function TestResult({ result, domain, unitNo, domains, passPct: PASS_PCT, onRetry, navigate }) {
  const pct = Math.round((result.score / result.total) * 100)
  const rank = scoreRank(pct, PASS_PCT)
  const passed = pct >= PASS_PCT
  const nextDomain = domains[domains.findIndex((d) => d.id === domain.id) + 1]

  return (
    <div className="quiz-card result">
      {passed && <Confetti />}
      <div className="result-rank" style={{ color: rank.color }}>
        {rank.rank}
      </div>
      <p style={{ fontSize: 18, fontWeight: 700, margin: '6px 0' }}>{rank.label}</p>
      <p style={{ fontSize: 16, color: 'var(--muted)' }}>
        {result.total} 問中 <strong style={{ color: 'var(--gold)' }}>{result.score}</strong> 問正解（{pct}%）
      </p>
      {passed ? (
        <p style={{ color: 'var(--green)', fontWeight: 700 }}>
          単元 {unitNo} クリア！{nextDomain ? '次の単元に進みましょう。' : '全単元を制覇しました。'}
        </p>
      ) : (
        <p style={{ color: 'var(--orange)', fontWeight: 700 }}>
          クリアまであと少し（{PASS_PCT}%が目標）。もう一度挑戦しましょう。
        </p>
      )}
      <div className="quiz-actions" style={{ justifyContent: 'center', marginTop: 28 }}>
        <button className="btn secondary" onClick={onRetry}>
          単元テストを再挑戦
        </button>
        {passed && nextDomain ? (
          <button className="btn gold" onClick={() => navigate(`/unit/${nextDomain.id}`)}>
            次の単元へ
          </button>
        ) : (
          <button className="btn gold" onClick={() => navigate('/')}>
            学習マップへ
          </button>
        )}
      </div>
    </div>
  )
}
