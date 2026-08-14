// Salesforce Certified Business Analyst 試験の出題範囲（ドメイン）と配点比率
// 出典: Salesforce Certified Business Analyst Exam Guide
// 合計 100%（顧客ディスカバリー17 / 協働24 / プロセスマッピング16 / 要件17 / ユーザーストーリー15 / ユーザー受け入れ11）
// 配列の並び順が学習単元の表示順になる（＝BA のプロジェクトライフサイクル順）。
export const domains = [
  {
    id: 'ba-discovery',
    name: '顧客ディスカバリー (Customer Discovery)',
    weight: 17,
    color: '#00A1E0',
    description:
      'BA の役割、Salesforce のビジネス価値、業界・企業・現行システムの理解、プロジェクト方法論とフェーズ。',
  },
  {
    id: 'ba-collaboration',
    name: 'ステークホルダーとの協働 (Collaboration with Stakeholders)',
    weight: 24,
    color: '#7F56D9',
    description:
      '最も配点の高い領域。ステークホルダーの特定と分析、ファシリテーション、コミュニケーション、変更管理、成果物の合意形成。',
  },
  {
    id: 'ba-process',
    name: 'ビジネスプロセスマッピング (Business Process Mapping)',
    weight: 16,
    color: '#F2994A',
    description:
      '現状(As-Is)と将来(To-Be)のプロセス図、スイムレーン、記法、ギャップ分析、改善機会の特定。',
  },
  {
    id: 'ba-requirements',
    name: '要件 (Requirements)',
    weight: 17,
    color: '#27AE60',
    description:
      '要件の引き出し・文書化・分析・優先順位付け・トレーサビリティ、要件の種類とスコープ管理。',
  },
  {
    id: 'ba-user-stories',
    name: 'ユーザーストーリー (User Stories)',
    weight: 15,
    color: '#EB5757',
    description:
      'ユーザーストーリーの書き方、受け入れ基準、INVEST、バックログの精査と見積り、アジャイル運用。',
  },
  {
    id: 'ba-acceptance',
    name: 'ユーザー受け入れ (User Acceptance)',
    weight: 11,
    color: '#16B8A6',
    description:
      'UAT の計画・テストシナリオ・実施と欠陥管理、トレーニング、リリースとハイパーケア、価値測定。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
