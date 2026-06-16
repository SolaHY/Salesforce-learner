import { createContext, useContext, useCallback, useMemo, useState, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { questions } from '../data/quizzes'
import { flashcards } from '../data/flashcards'
import { BADGES, XP, levelInfo } from '../data/gamification'

const STORAGE_KEY = 'sf-learner-progress-v2'

const emptyProgress = {
  answers: {}, // questionId -> { correct, attempts, lastAt }
  sessions: [], // 演習履歴
  reviewedCards: [], // 復習済みカード id
  xp: 0,
  badges: [], // 解放済みバッジ id
  maxCombo: 0, // 最大連続正解数
  streak: { count: 0, best: 0, lastDate: null }, // 連続学習日数
}

const derived = {
  totalQuestions: questions.length,
  totalCards: flashcards.length,
}

function normalize(p) {
  return {
    ...emptyProgress,
    ...p,
    streak: { ...emptyProgress.streak, ...(p?.streak || {}) },
  }
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function dayDiff(a, b) {
  // a, b are "YYYY-M-D"
  return Math.round((new Date(b) - new Date(a)) / 86400000)
}

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [stored, setStored] = useLocalStorage(STORAGE_KEY, emptyProgress)
  const progress = useMemo(() => normalize(stored), [stored])

  const [toasts, setToasts] = useState([])
  const toastSeq = useRef(0)

  const pushToast = useCallback((toast) => {
    const id = ++toastSeq.current
    setToasts((t) => [...t, { ...toast, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  // 共通の更新処理：XP・ストリーク・バッジ・レベルアップを処理してトーストを出す
  const applyUpdate = useCallback(
    (mutate, { touchStreak = true } = {}) => {
      const before = normalize(stored)
      const beforeLevel = levelInfo(before.xp).level
      const next = mutate({ ...before })

      if (touchStreak) {
        const today = todayStr()
        const last = next.streak.lastDate
        if (!last) {
          next.streak = { count: 1, best: 1, lastDate: today }
        } else if (last !== today) {
          const diff = dayDiff(last, today)
          const count = diff === 1 ? next.streak.count + 1 : 1
          next.streak = {
            count,
            best: Math.max(next.streak.best || 0, count),
            lastDate: today,
          }
        }
      }

      // バッジ判定
      const newlyUnlocked = []
      for (const badge of BADGES) {
        if (!next.badges.includes(badge.id) && badge.check(next, derived)) {
          next.badges = [...next.badges, badge.id]
          newlyUnlocked.push(badge)
        }
      }

      setStored(next)

      // 演出トースト
      const afterLevel = levelInfo(next.xp).level
      if (afterLevel > beforeLevel) {
        pushToast({
          type: 'levelup',
          title: `レベルアップ！ Lv.${afterLevel}`,
          desc: levelInfo(next.xp).title,
        })
      }
      newlyUnlocked.forEach((b) =>
        pushToast({ type: 'badge', title: `バッジ獲得：${b.name}`, desc: b.desc, icon: b.icon }),
      )

      return next
    },
    [stored, setStored, pushToast],
  )

  const recordAnswer = useCallback(
    (questionId, isCorrect, combo = 0) => {
      const gained = isCorrect ? XP.CORRECT : XP.WRONG
      applyUpdate((draft) => {
        const prevEntry = draft.answers[questionId] || { attempts: 0 }
        draft.answers = {
          ...draft.answers,
          [questionId]: {
            correct: isCorrect,
            attempts: prevEntry.attempts + 1,
            lastAt: Date.now(),
          },
        }
        draft.xp += gained
        draft.maxCombo = Math.max(draft.maxCombo || 0, combo)
        return draft
      })
      pushToast({ type: 'xp', title: `+${gained} XP`, desc: isCorrect ? '正解！' : '挑戦XP' })
    },
    [applyUpdate, pushToast],
  )

  const recordSession = useCallback(
    (session) => {
      const bonus =
        session.score * XP.SESSION_PER_CORRECT +
        (session.total > 0 && session.score === session.total ? XP.PERFECT_BONUS : 0)
      applyUpdate((draft) => {
        draft.sessions = [{ ...session, at: Date.now() }, ...draft.sessions].slice(0, 50)
        draft.xp += bonus
        return draft
      })
      if (bonus > 0)
        pushToast({ type: 'xp', title: `クリアボーナス +${bonus} XP`, desc: 'クエスト達成！' })
    },
    [applyUpdate, pushToast],
  )

  const toggleReviewed = useCallback(
    (cardId) => {
      const wasReviewed = progress.reviewedCards.includes(cardId)
      applyUpdate(
        (draft) => {
          if (wasReviewed) {
            draft.reviewedCards = draft.reviewedCards.filter((id) => id !== cardId)
          } else {
            draft.reviewedCards = [...draft.reviewedCards, cardId]
            draft.xp += XP.CARD_REVIEW
          }
          return draft
        },
        { touchStreak: !wasReviewed },
      )
      if (!wasReviewed)
        pushToast({ type: 'xp', title: `+${XP.CARD_REVIEW} XP`, desc: 'カードを習得' })
    },
    [applyUpdate, progress.reviewedCards, pushToast],
  )

  const reset = useCallback(() => setStored(emptyProgress), [setStored])

  const value = useMemo(
    () => ({
      progress,
      level: levelInfo(progress.xp),
      recordAnswer,
      recordSession,
      toggleReviewed,
      reset,
      toasts,
    }),
    [progress, recordAnswer, recordSession, toggleReviewed, reset, toasts],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
