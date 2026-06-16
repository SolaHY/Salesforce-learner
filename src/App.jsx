import { Routes, Route, NavLink } from 'react-router-dom'
import { ProgressProvider } from './hooks/useProgress'
import Dashboard from './pages/Dashboard'
import Quiz from './pages/Quiz'
import Flashcards from './pages/Flashcards'
import Study from './pages/Study'
import ProgressPage from './pages/ProgressPage'

const navItems = [
  { to: '/', label: 'ダッシュボード', icon: '🏠', end: true },
  { to: '/quiz', label: '問題演習', icon: '📝' },
  { to: '/flashcards', label: 'フラッシュカード', icon: '🃏' },
  { to: '/study', label: '学習教材', icon: '📚' },
  { to: '/progress', label: '進捗', icon: '📈' },
]

export default function App() {
  return (
    <ProgressProvider>
      <div className="app">
        <aside className="sidebar">
          <div className="brand">
            <img src="/cloud.svg" alt="" width="28" height="28" />
            <div>
              <strong>SF Learner</strong>
              <span>Admin 認定対策</span>
            </div>
          </div>
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
            学習データはブラウザ内 (localStorage) に保存されます。
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
      </div>
    </ProgressProvider>
  )
}
