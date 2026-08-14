import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { CERTS, certById, DEFAULT_CERT_ID } from '../certs'

// 学習中の資格（アドミニストレーター / ビジネスアナリスト …）を保持する。
// 進捗は資格ごとに別のキーで保存されるため、切り替えても互いに影響しない。
const CERT_KEY = 'sf-learner-cert'

const CertContext = createContext(null)

export function CertProvider({ children }) {
  const [certId, setCertId] = useLocalStorage(CERT_KEY, DEFAULT_CERT_ID)
  const cert = certById[certId] || certById[DEFAULT_CERT_ID]

  const switchCert = useCallback((id) => setCertId(id), [setCertId])

  const value = useMemo(() => ({ ...cert, certs: CERTS, switchCert }), [cert, switchCert])

  return <CertContext.Provider value={value}>{children}</CertContext.Provider>
}

export function useCert() {
  const ctx = useContext(CertContext)
  if (!ctx) throw new Error('useCert must be used within CertProvider')
  return ctx
}
