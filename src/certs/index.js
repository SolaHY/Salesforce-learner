// 学習できる資格の一覧。ここに追加すれば新しい資格を増やせる。
// 各資格は同一のスキーマ（domains / questions / studyMaterials / flashcards /
// roadmap / mocks / ranks / badges）を提供するため、画面側は資格に依存しない。
import { adminCert } from './admin'
import { baCert } from './ba'
import { agentforceCert } from './agentforce'
import { serviceCloudCert } from './servicecloud'
import { dataCloudCert } from './datacloud'

export const CERTS = [adminCert, baCert, agentforceCert, serviceCloudCert, dataCloudCert]
export const certById = Object.fromEntries(CERTS.map((c) => [c.id, c]))
export const DEFAULT_CERT_ID = adminCert.id
