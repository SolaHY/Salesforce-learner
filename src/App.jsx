import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ProgressProvider, useProgress } from './hooks/useProgress'
import { CertProvider, useCert } from './hooks/useCert'
import { LangProvider, useLang } from './hooks/useLang'
import Toaster from './components/Toaster'
import Avatar from './components/Avatar'
import Dashboard from './pages/Dashboard'
import UnitFlow from './pages/UnitFlow'
import Exam from './pages/Exam'
import MockExams from './pages/MockExams'
import Flashcards from './pages/Flashcards'
import ProgressPage from './pages/ProgressPage'
import Roadmap from './pages/Roadmap'

// short は幅の狭いスマホのボトムナビ用（ラベルが折り返さない長さにしている）
const navItems = [
  { to: '/', label: '学習マップ', short: 'マップ', icon: '◈', end: true },
  { to: '/roadmap', label: 'ロードマップ', short: 'ロード', icon: '◇' },
  { to: '/mock', label: '模擬試験', short: '模試', icon: '◎' },
  { to: '/flashcards', label: 'フラッシュカード', short: 'カード', icon: '▢' },
  { to: '/progress', label: '進捗・実績', short: '進捗', icon: '▦' },
]

function CertSwitcher() {
  const { id, certs, switchCert } = useCert()
  const navigate = useNavigate()

  function handleChange(nextId) {
    if (nextId === id) return
    switchCert(nextId)
    navigate('/') // 単元IDが資格ごとに異なるため、切り替え時は学習マップへ戻す
  }

  return (
    <div className="cert-switcher">
      <span className="cert-switcher-label">学習中の資格</span>
      <div className="cert-tabs">
        {certs.map((c) => (
          <button
            key={c.id}
            className={`cert-tab ${c.id === id ? 'active' : ''}`}
            style={c.id === id ? { borderColor: c.accent, color: c.accent } : undefined}
            onClick={() => handleChange(c.id)}
            title={c.name}
          >
            {c.short}
          </button>
        ))}
      </div>
    </div>
  )
}

// 教材が日英併記の資格でのみ表示する、既定表示言語の切り替え。
// 個々の設問・セクションはここに関係なくその場で切り替えられる。
function LangSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="cert-switcher">
      <span className="cert-switcher-label">既定の表示言語</span>
      <div className="cert-tabs lang-tabs">
        <button
          className={`cert-tab ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
        <button
          className={`cert-tab ${lang === 'ja' ? 'active' : ''}`}
          onClick={() => setLang('ja')}
        >
          日本語
        </button>
      </div>
      <span className="cert-switcher-note">
        各設問・各セクションの「日本語」ボタンでその場だけ切り替えられます。
      </span>
    </div>
  )
}

function HeroPanel() {
  const { stagesCleared, rank } = useProgress()
  const { domains } = useCert()
  const total = domains.length
  const pct = Math.round((stagesCleared / total) * 100)
  return (
    <div className="hero-panel">
      <div className="hero-top">
        <Avatar stage={stagesCleared} size={56} />
        <div>
          <div className="hero-rank">{rank.title}</div>
          <div className="hero-sub">単元クリア {stagesCleared} / {total}</div>
        </div>
      </div>
      <div className="xp-bar">
        <span style={{ width: `${pct}%`, background: rank.ring }} />
      </div>
    </div>
  )
}

// スマホ用の固定ヘッダー。学習中の資格と進捗だけを出し、
// 資格・言語の切り替えはドロワー（下に開くシート）へ寄せている。
function MobileTopBar({ open, onToggle }) {
  const cert = useCert()
  const { stagesCleared } = useProgress()
  return (
    <header className="mobile-topbar">
      <img src={`${import.meta.env.BASE_URL}cloud.svg`} alt="" width="22" height="22" />
      <div className="mobile-topbar-title">
        <strong>{cert.short}</strong>
        <span>SF Learner</span>
      </div>
      <button
        type="button"
        className={`mobile-topbar-btn ${open ? 'open' : ''}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? '設定を閉じる' : '資格と言語の設定を開く'}
      >
        <Avatar stage={stagesCleared} size={26} />
        <span>
          {stagesCleared} / {cert.domains.length}
        </span>
        <span className="mobile-topbar-caret" aria-hidden="true">
          ▾
        </span>
      </button>
    </header>
  )
}

function MobileDrawer({ open, onClose }) {
  const cert = useCert()
  return (
    <>
      <div
        className={`mobile-scrim ${open ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`mobile-drawer ${open ? 'open' : ''}`} role="dialog" aria-label="学習の設定">
        <CertSwitcher />
        {cert.bilingual && <LangSwitcher />}
        <HeroPanel />
        <p className="mobile-drawer-note">
          学習データは資格ごとにこの端末（localStorage）へ保存されます。
        </p>
      </div>
    </>
  )
}

function MobileNav() {
  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.short}</span>
        </NavLink>
      ))}
    </nav>
  )
}

function Shell() {
  const cert = useCert()
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // 画面が変わったらドロワーを閉じ、ページ先頭へ戻す。
  // スマホでは前の画面のスクロール位置が残ると本文の途中から始まってしまう。
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <MobileTopBar open={drawerOpen} onToggle={() => setDrawerOpen((v) => !v)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <aside className="sidebar">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}cloud.svg`} alt="" width="26" height="26" />
          <div>
            <strong>SF Learner</strong>
            <span>{cert.subtitle}</span>
          </div>
        </div>
        <CertSwitcher />
        {cert.bilingual && <LangSwitcher />}
        <HeroPanel />
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">学習データは資格ごとにこの端末（localStorage）へ保存されます。</div>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/unit/:domainId" element={<UnitFlow />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/mock" element={<MockExams />} />
          <Route path="/mock/:mockId" element={<MockExams />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </main>
      <MobileNav />
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <CertProvider>
      <LangProvider>
        <ProgressProvider>
          <Shell />
        </ProgressProvider>
      </LangProvider>
    </CertProvider>
  )
}
