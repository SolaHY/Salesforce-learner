// Salesforce Certified Service Cloud Consultant の学習単元。
//
// weight は公式試験ガイドの出題比率に合わせている。
// （Industry Knowledge 10% は内容が重なるため Solution Design 16% に統合し 26% としている）
// 同梱の練習試験（screenshots/Service Cloud・Set A 全60問）の分布は公式比率とは一致しないため、
// 学習時間は weight を基準に配分すること。
export const domains = [
  {
    id: 'sc-implementation',
    name: 'Implementation Strategies（導入の進め方）',
    weight: 15,
    color: '#00A1E0',
    description:
      'Project phases, requirement changes in design, sandbox strategy, deployment sequencing, UAT and training.',
    description_ja:
      'プロジェクトのフェーズ、設計中の要件変更、サンドボックス戦略、デプロイ順序、UAT、トレーニング。',
  },
  {
    id: 'sc-solution',
    name: 'Solution Design & Industry Knowledge（設計と業務知識）',
    weight: 26,
    color: '#7F56D9',
    description:
      'Largest area. The service data model, licensing, sharing and visibility, routing design, entitlements and SLAs.',
    description_ja:
      '最大の比重。サービスのデータモデル、ライセンス、共有と可視性、ルーティング設計、エンタイトルメントとSLA。',
  },
  {
    id: 'sc-case',
    name: 'Case Management（ケース管理）',
    weight: 15,
    color: '#F2994A',
    description:
      'Case lifecycle automation, entitlement milestones, email threading, web and chat case creation, and case limits.',
    description_ja:
      'ケースのライフサイクル自動化、エンタイトルメントのマイルストーン、メールのスレッド化、Web/チャットからのケース作成、上限値。',
  },
  {
    id: 'sc-channels',
    name: 'Interaction Channels（対応チャネル）',
    weight: 10,
    color: '#27AE60',
    description:
      'Email-to-Case, Web-to-Case, chat and messaging, Einstein Bots, telephony/CTI, social and self-service portals.',
    description_ja:
      'Email-to-Case、Web-to-Case、チャットとメッセージング、Einstein Bots、電話/CTI、ソーシャル、セルフサービスポータル。',
  },
  {
    id: 'sc-knowledge',
    name: 'Knowledge Management（ナレッジ管理）',
    weight: 9,
    color: '#EB5757',
    description:
      'Article lifecycle and versioning, data categories and visibility, KCS, article recommendations and deflection.',
    description_ja:
      '記事のライフサイクルとバージョン管理、データカテゴリと可視性、KCS、記事レコメンデーションとケース回避。',
  },
  {
    id: 'sc-console',
    name: 'Service Console（サービスコンソール）',
    weight: 10,
    color: '#2D9CDB',
    description:
      'Console layout components, the utility bar and softphone, macros and quick text, and agent productivity.',
    description_ja:
      'コンソールのレイアウト構成、ユーティリティバーとソフトフォン、マクロとクイックテキスト、担当者の生産性。',
  },
  {
    id: 'sc-data',
    name: 'Integration & Data Management（連携とデータ管理）',
    weight: 10,
    color: '#9B51E0',
    description:
      'Integration patterns and APIs, large data volumes and custom indexes, migration, external IDs and deduplication.',
    description_ja:
      '連携パターンとAPI、大量データとカスタムインデックス、移行、外部ID、重複排除。',
  },
  {
    id: 'sc-analytics',
    name: 'Contact Center Analytics（分析とKPI）',
    weight: 5,
    color: '#16B8A6',
    description:
      'Reports and dashboards, real-time supervisor views, deflection and knowledge metrics, and where KPI data comes from.',
    description_ja:
      'レポートとダッシュボード、スーパーバイザー向けのリアルタイム表示、ケース回避とナレッジの指標、KPIデータの出所。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
