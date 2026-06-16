import { Routes, Route, NavLink } from 'react-router-dom'
import { ProgressProvider, useProgress } from './hooks/useProgress'
import Toaster from './components/Toaster'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Flashcards from './pages/Flashcards'
import Study from './pages/Study'
import ProgressPage from './pages/ProgressPage'

const navItems = [
  { to: '/', label: '冒険マップ', icon: '🗺️', end: true },
  { to: '/quiz', label: 'クエスト（演習）', icon: '⚔️' },
  { to: '/flashcards', label: '記憶の修練場', icon: '🃏' },
  { to: '/study', label: '知恵の書庫', icon: '📖' },
  { to: '/progress', label: '冒険の記録', icon: '🏆' },
]

function HeroPanel() {
  const { level, progress } = useProgress()
  return (
    <div className="hero-panel">
      <div className="hero-top">
        <div className="hero-avatar">🧙</div>
        <div>
          <div className="hero-level">Lv.{level.level}</div>
          <div className="hero-title">{level.title}</div>
        </div>
      </div>
      <div className="xp-bar">
        <span style={{ width: `${level.pct}%` }} />
      </div>
      <div className="xp-meta">
        <span>{level.xp} XP</span>
        <span>次まで {level.toNext}</span>
      </div>
      {progress.streak.count > 0 && (
        <div className="streak-flame">
          🔥 {progress.streak.count}日連続（最高 {progress.streak.best}日）
        </div>
      )}
    </div>
  )
}

function Shell() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}cloud.svg`} alt="" width="28" height="28" />
          <div>
            <strong>SF QUEST</strong>
            <span>認定アドミン 冒険の書</span>
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
        <div className="sidebar-footer">
          冒険の記録はこの端末（localStorage）に保存されます。
        </div>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:domainId" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/study" element={<Study />} />
          <Route path="/study/:domainId" element={<Study />} />
          <Route path="/progress" element={<ProgressPage />} />
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
