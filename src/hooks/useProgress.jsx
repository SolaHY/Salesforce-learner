import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'sf-learner-progress-v1'

const emptyProgress = {
  // questionId -> { correct: bool, attempts: number, lastAt: number }
  answers: {},
  // 完了したクイズセッションの履歴
  sessions: [],
  // 学習済みフラッシュカード id
  reviewedCards: [],
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress, reset] = useLocalStorage(STORAGE_KEY, emptyProgress)

  const recordAnswer = useCallback(
    (questionId, isCorrect) => {
      setProgress((prev) => {
        const prevEntry = prev.answers[questionId] || { attempts: 0 }
        return {
          ...prev,
          answers: {
            ...prev.answers,
            [questionId]: {
              correct: isCorrect,
              attempts: prevEntry.attempts + 1,
              lastAt: Date.now(),
            },
          },
        }
      })
    },
    [setProgress],
  )

  const recordSession = useCallback(
    (session) => {
      setProgress((prev) => ({
        ...prev,
        sessions: [{ ...session, at: Date.now() }, ...prev.sessions].slice(0, 50),
      }))
    },
    [setProgress],
  )

  const toggleReviewed = useCallback(
    (cardId) => {
      setProgress((prev) => {
        const has = prev.reviewedCards.includes(cardId)
        return {
          ...prev,
          reviewedCards: has
            ? prev.reviewedCards.filter((id) => id !== cardId)
            : [...prev.reviewedCards, cardId],
        }
      })
    },
    [setProgress],
  )

  const value = useMemo(
    () => ({ progress, recordAnswer, recordSession, toggleReviewed, reset }),
    [progress, recordAnswer, recordSession, toggleReviewed, reset],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
