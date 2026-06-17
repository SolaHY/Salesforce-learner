import { useProgress } from '../hooks/useProgress'

const ICONS = { xp: '✨', levelup: '⬆️', badge: '🏅', evolve: '🎉' }

export default function Toaster() {
  const { toasts } = useProgress()
  return (
    <div className="toaster">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">{t.icon || ICONS[t.type] || '✨'}</span>
          <div>
            <strong>{t.title}</strong>
            {t.desc && <div className="toast-desc">{t.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
