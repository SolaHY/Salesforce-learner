import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

// 表示言語の設定。英語で学び、分からないときにすぐ日本語で確認するための仕組み。
//   - グローバル設定（サイドバーのトグル）… 既定でどちらの言語を表示するか
//   - 各カード/設問の「日本語」ボタン … その項目だけを一時的に切り替える（グローバル設定は変えない）
// 英日どちらのテキストも同じオブジェクトに持たせる（field と field_ja）。
const LANG_KEY = 'sf-learner-lang'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useLocalStorage(LANG_KEY, 'en')
  const toggleLang = useCallback(() => setLang((l) => (l === 'ja' ? 'en' : 'ja')), [setLang])
  const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang, setLang, toggleLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

// obj[field] / obj[field + '_ja'] から表示言語に応じた値を返す。
// 日本語訳が無い場合は英語（原文）にフォールバックする。
export function pick(obj, field, lang) {
  if (!obj) return undefined
  if (lang === 'ja') return obj[`${field}_ja`] ?? obj[field]
  return obj[field] ?? obj[`${field}_ja`]
}

// そのオブジェクトが日本語訳を持っているか（トグルを出すかどうかの判定に使う）。
export function hasJa(obj, fields) {
  return fields.some((f) => obj?.[`${f}_ja`] != null)
}
