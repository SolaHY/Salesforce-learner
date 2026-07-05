// Salesforce 認定アドミニストレーター試験の出題範囲（ドメイン）と配点比率
// 出典: Salesforce Certified Administrator Exam Guide（最新版・Agentforce 追加後）
// 合計 100%（設定15 / オブジェクト15 / 営業10 / サービス10 / 生産性10 / データ17 / 自動化15 / Agentforce 8）
// 配列の並び順が学習単元の表示順になる。
export const domains = [
  {
    id: 'config-setup',
    name: '設定とセットアップ (Configuration and Setup)',
    weight: 15,
    color: '#00A1E0',
    description: '組織の設定、会社情報、UI設定、ユーザー管理、セキュリティの基礎。',
  },
  {
    id: 'object-manager',
    name: 'オブジェクトマネージャと Lightning アプリケーションビルダー',
    weight: 15,
    color: '#7F56D9',
    description: '標準/カスタムオブジェクト、項目、ページレイアウト、Lightning アプリ。',
  },
  {
    id: 'sales-marketing',
    name: 'セールス・マーケティングアプリケーション',
    weight: 10,
    color: '#F2994A',
    description: 'リード、商談、価格表、キャンペーン、活動管理。',
  },
  {
    id: 'service-support',
    name: 'サービス・サポートアプリケーション',
    weight: 10,
    color: '#27AE60',
    description: 'ケース管理、エスカレーション、ナレッジ、Web/メール to Case。',
  },
  {
    id: 'productivity',
    name: '生産性向上とコラボレーション',
    weight: 10,
    color: '#EB5757',
    description: 'Chatter、モバイル、活動、レポートの共有、AppExchange。',
  },
  {
    id: 'data-analytics',
    name: 'データ管理と分析',
    weight: 17,
    color: '#2D9CDB',
    description: 'インポート/エクスポート、重複管理、レポート、ダッシュボード。最も配点の高い領域。',
  },
  {
    id: 'automation',
    name: '自動化（ワークフロー / プロセス）',
    weight: 15,
    color: '#9B51E0',
    description: 'フロー、入力規則、承認プロセス、自動化ツールの選択。',
  },
  {
    id: 'agentforce',
    name: 'Agentforce（AI・自律エージェント）',
    weight: 8,
    color: '#16B8A6',
    description: '自律型AIエージェント、Agent Builder、Prompt Builder、Einstein Trust Layer。最新のAI領域。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
