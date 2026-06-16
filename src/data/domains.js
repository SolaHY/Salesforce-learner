// Salesforce 認定アドミニストレーター試験の出題範囲（ドメイン）と配点比率
// 出典: Salesforce Certified Administrator Exam Guide
export const domains = [
  {
    id: 'config-setup',
    name: '構成と設定 (Configuration and Setup)',
    weight: 20,
    color: '#00A1E0',
    description: '組織の設定、会社情報、UI設定、ユーザー管理、セキュリティの基礎。',
  },
  {
    id: 'object-manager',
    name: 'オブジェクトマネージャと Lightning アプリビルダー',
    weight: 20,
    color: '#7F56D9',
    description: '標準/カスタムオブジェクト、項目、ページレイアウト、Lightning アプリ。',
  },
  {
    id: 'sales-marketing',
    name: '営業・マーケティングアプリケーション',
    weight: 12,
    color: '#F2994A',
    description: 'リード、商談、価格表、キャンペーン、活動管理。',
  },
  {
    id: 'service-support',
    name: 'サービス・サポートアプリケーション',
    weight: 11,
    color: '#27AE60',
    description: 'ケース管理、エスカレーション、ナレッジ、Web/メール to Case。',
  },
  {
    id: 'productivity',
    name: '生産性とコラボレーション',
    weight: 7,
    color: '#EB5757',
    description: 'Chatter、モバイル、活動、レポートの共有、AppExchange。',
  },
  {
    id: 'data-analytics',
    name: 'データと分析の管理',
    weight: 14,
    color: '#2D9CDB',
    description: 'インポート/エクスポート、重複管理、レポート、ダッシュボード。',
  },
  {
    id: 'automation',
    name: 'ワークフロー / プロセスの自動化',
    weight: 16,
    color: '#9B51E0',
    description: 'フロー、入力規則、承認プロセス、自動化ツールの選択。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
