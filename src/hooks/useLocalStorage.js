import { useState, useEffect, useCallback } from 'react'

function read(key, fallback) {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

// localStorage に同期する状態フック。
// key が変わったら（＝学習中の資格を切り替えたら）その場で新しいキーの値を読み直す。
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => ({ key, value: read(key, initialValue) }))

  // レンダリング中の派生 state 更新。key が変わった回のみ実行されるので無限ループにはならない。
  if (state.key !== key) {
    setState({ key, value: read(key, initialValue) })
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(state.key, JSON.stringify(state.value))
    } catch {
      // 保存失敗は無視（容量超過など）
    }
  }, [state.key, state.value])

  const setValue = useCallback((next) => {
    setState((s) => ({ key: s.key, value: typeof next === 'function' ? next(s.value) : next }))
  }, [])

  const reset = useCallback(() => {
    setState((s) => ({ key: s.key, value: initialValue }))
  }, [initialValue])

  const value = state.key === key ? state.value : read(key, initialValue)

  return [value, setValue, reset]
}
