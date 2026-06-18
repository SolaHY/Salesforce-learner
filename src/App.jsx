import { Routes, Route, NavLink } from 'react-router-dom'
import { ProgressProvider, useProgress } from './hooks/useProgress'
import Toaster from './components/Toaster'
import Avatar from './components/Avatar'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Flashcards from './pages/Flashcards'
import Study from './pages/Study'
import ProgressPage from './pages/ProgressPage'
import Roadmap from './pages/Roadmap'
import LearningPortal from './pages/LearningPortal'

const navItems = [
  { to: '/', label: '学習マップ', icon: '◈', end: true },
  { to: '/roadmap', label: 'ロードマップ', icon: '◇' },
  { to: '/quiz', label: '問題演習', icon: '▤' },
  { to: '/flashcards', label: 'フラッシュカード', icon: '▢' },
  { to: '/study', label: '学習教材', icon: '▥' },
  { to: '/progress', label: '進捗・実績', icon: '▦' },
  { to: '/portal', label: '学習ポータル', icon: '◎' },
]

function HeroPanel() {
  const { level, stagesCleared, rank } = useProgress()
  return (
    <div className="hero-panel">
      <div className="hero-top">
        <Avatar stage={stagesCleared} size={56} />
        <div>
          <div className="hero-rank">{rank.title}</div>
          <div className="hero-sub">単元クリア {stagesCleared} / 7</div>
        </div>
      </div>
      <div className="xp-bar">
        <span style={{ width: `${level.pct}%` }} />
      </div>
      <div className="xp-meta">
        <span>Lv.{level.level}・{level.xp} pt</span>
        <span>次まで {level.toNext}</span>
      </div>
    </div>
  )
}

function Shell() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}cloud.svg`} alt="" width="26" height="26" />
          <div>
            <strong>SF Learner</strong>
            <span>Salesforce 認定アドミン対策</span>
          </div>
        </div>
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
        <div className="sidebar-footer">学習データはこの端末（localStorage）に保存されます。</div>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:domainId" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/study" element={<Study />} />
          <Route path="/study/:domainId" element={<Study />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/portal" element={<LearningPortal />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  )
}
