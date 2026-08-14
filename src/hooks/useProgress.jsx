import { createContext, useContext, useCallback, useMemo, useState, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useCert } from './useCert'
import { stagesClearedCount, avatarRank, isStageCleared } from '../data/gamification'

// 進捗は資格ごとに別のキーで保存する。
// 'sf-learner-progress-v2' はアドミニストレーターの既存データなので、そのまま引き継ぐ。
const STORAGE_KEY = 'sf-learner-progress-v2'
const storageKeyFor = (certId) => (certId === 'admin' ? STORAGE_KEY : `${STORAGE_KEY}:${certId}`)

const emptyProgress = {
  answers: {}, // questionId -> { correct, attempts, lastAt }
  sessions: [], // 演習履歴
  reviewedCards: [], // 復習済みカード id
  badges: [], // 解放済みバッジ id
  streak: { count: 0, best: 0, lastDate: null }, // 連続学習日数
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
  const cert = useCert()
  const [stored, setStored] = useLocalStorage(storageKeyFor(cert.id), emptyProgress)
  const progress = useMemo(() => normalize(stored), [stored])

  const [toasts, setToasts] = useState([])
  const toastSeq = useRef(0)

  const derived = useMemo(
    () => ({
      totalQuestions: cert.questions.length,
      totalCards: cert.flashcards.length,
      domains: cert.domains,
      clearPct: cert.stageClearPct,
    }),
    [cert],
  )

  const pushToast = useCallback((toast) => {
    const id = ++toastSeq.current
    setToasts((t) => [...t, { ...toast, id }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])

  // 共通の更新処理：ストリーク・バッジ・単元クリアを処理してトーストを出す
  const applyUpdate = useCallback(
    (mutate, { touchStreak = true } = {}) => {
      const before = normalize(stored)
      const beforeStages = stagesClearedCount(before, cert.domains, cert.stageClearPct)
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
      for (const badge of cert.badges) {
        if (!next.badges.includes(badge.id) && badge.check(next, derived)) {
          next.badges = [...next.badges, badge.id]
          newlyUnlocked.push(badge)
        }
      }

      setStored(next)

      // 演出トースト
      const afterStages = stagesClearedCount(next, cert.domains, cert.stageClearPct)
      if (afterStages > beforeStages) {
        pushToast({
          type: 'evolve',
          title: '単元クリア！キャラクターが成長しました',
          desc: `新しい称号：${avatarRank(afterStages, cert.ranks).title}`,
        })
      }
      newlyUnlocked.forEach((b) =>
        pushToast({ type: 'badge', title: `バッジ獲得：${b.name}`, desc: b.desc, icon: b.icon }),
      )

      return next
    },
    [stored, setStored, pushToast, cert, derived],
  )

  const recordAnswer = useCallback(
    (questionId, isCorrect) => {
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
        return draft
      })
    },
    [applyUpdate],
  )

  const recordSession = useCallback(
    (session) => {
      applyUpdate((draft) => {
        draft.sessions = [{ ...session, at: Date.now() }, ...draft.sessions].slice(0, 50)
        return draft
      })
    },
    [applyUpdate],
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
          }
          return draft
        },
        { touchStreak: !wasReviewed },
      )
    },
    [applyUpdate, progress.reviewedCards],
  )

  const reset = useCallback(() => setStored(emptyProgress), [setStored])

  const stagesCleared = stagesClearedCount(progress, cert.domains, cert.stageClearPct)
  // 資格ごとのクリア判定ラインを織り込んだヘルパー（各ページから使う）
  const stageCleared = useCallback(
    (domainId) => isStageCleared(progress, domainId, cert.stageClearPct),
    [progress, cert.stageClearPct],
  )

  const value = useMemo(
    () => ({
      progress,
      stagesCleared,
      stageCleared,
      rank: avatarRank(stagesCleared, cert.ranks),
      recordAnswer,
      recordSession,
      toggleReviewed,
      reset,
      toasts,
    }),
    [progress, stagesCleared, stageCleared, cert.ranks, recordAnswer, recordSession, toggleReviewed, reset, toasts],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
