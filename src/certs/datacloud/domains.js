// Salesforce Certified Data Cloud Consultant（現 Data 360 Consultant）の学習単元。
//
// weight は公式試験ガイドの出題比率をそのまま使っている（合計100%）。
//   Solution Positioning 14% / Setup and Administration 13% /
//   Data Source Connection and Ingestion 18% / Harmonization and Unification 17% /
//   Data Enhancements, Sharing, and Analysis 18% / Data Activations and Utilization 20%
//
// 2025年の製品改称により、試験名・製品名は「Data Cloud」から「Data 360」へ移行している。
// 教材では現行の Data 360 表記を主とし、旧称 Data Cloud を併記している。
export const domains = [
  {
    id: 'dc-positioning',
    name: 'Solution Positioning（提案と位置づけ）',
    weight: 14,
    color: '#00A1E0',
    description:
      'Terminology and business value, the foundational role of Data 360 in predictive and generative AI, initial use cases, and data ethics and governance principles.',
    description_ja:
      '用語とビジネス価値、予測AI・生成AIの土台としての役割、最初に取り組むべきユースケース、データ倫理とガバナンスの原則。',
  },
  {
    id: 'dc-setup',
    name: 'Setup and Administration（設定と管理）',
    weight: 13,
    color: '#7F56D9',
    description:
      'Provisioning, permission sets and data spaces, org-wide settings, applying governance to configuration, the development lifecycle, and troubleshooting tooling.',
    description_ja:
      'プロビジョニング、権限セットとデータスペース、組織全体の設定、ガバナンス要件の設定への落とし込み、開発ライフサイクル、トラブルシューティングのツール。',
  },
  {
    id: 'dc-ingestion',
    name: 'Data Source Connection and Ingestion（接続と取り込み）',
    weight: 18,
    color: '#27AE60',
    description:
      'Connectors and the Ingestion API, data stream categories and refresh modes, data transforms, and Zero Copy federation and sharing.',
    description_ja:
      'コネクタと Ingestion API、データストリームのカテゴリと更新モード、データ変換、Zero Copy による連携とデータ共有。',
  },
  {
    id: 'dc-unification',
    name: 'Harmonization and Unification（統合と名寄せ）',
    weight: 17,
    color: '#F2994A',
    description:
      'Mapping DLOs to the Customer 360 data model, and identity resolution — match rules, reconciliation rules and the unified profile.',
    description_ja:
      'DLO を Customer 360 データモデルへマッピングする作業と、ID解決（一致ルール・調整ルール・統合プロファイル）。',
  },
  {
    id: 'dc-insights',
    name: 'Data Enhancements, Sharing, and Analysis（拡張・共有・分析）',
    weight: 18,
    color: '#2D9CDB',
    description:
      'Calculated and streaming insights, data graphs, referencing Data 360 from CRM and other systems, reports and dashboards, and predictive and generative AI tooling.',
    description_ja:
      'Calculated Insights と Streaming Insights、Data Graph、CRM や外部システムからの参照、レポートとダッシュボード、予測AI・生成AIのツール。',
  },
  {
    id: 'dc-activation',
    name: 'Data Activations and Utilization（セグメントと活用）',
    weight: 20,
    color: '#EB5757',
    description:
      'Largest area. Segmentation concepts and management, activation targets and publishing, consent, data actions, and using Data 360 in Salesforce flows.',
    description_ja:
      '最大の比重。セグメンテーションの概念と運用、アクティベーションターゲットと公開、同意管理、Data Action、Salesforce フローでの活用。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
