// Salesforce Certified Agentforce Specialist の学習単元。
//
// 配点(weight)について：
//   本番の公式試験ガイドの出題比率ではなく、同梱の模擬試験（screenshots/Agentforce の全60問）の
//   実際の出題分布から算出した「本教材での比重」です。受験前に必ず公式の試験ガイドで
//   最新の出題範囲・比率を確認してください。
// 並び順が学習単元の表示順になる（プロンプト → エージェント → データ → 信頼 → 運用 → 連携）。
export const domains = [
  {
    id: 'af-prompt',
    name: 'Prompt Engineering（プロンプトエンジニアリング）',
    weight: 13,
    color: '#00A1E0',
    description:
      'Prompt template types, grounding with merge fields, activation and versioning, preview, and controlling hallucination.',
    description_ja:
      'プロンプトテンプレートの種類、差し込み項目によるグラウンディング、有効化とバージョン、プレビュー、ハルシネーションの抑制。',
  },
  {
    id: 'af-agent',
    name: 'Agentforce Concepts（エージェントの設計と作成）',
    weight: 23,
    color: '#7F56D9',
    description:
      'Topics and actions, the Atlas Reasoning Engine, hybrid reasoning in Agent Script, availability filters, and supervisor agents.',
    description_ja:
      '最大の比重。トピックとアクション、Atlas Reasoning Engine、Agent Script のハイブリッド推論、利用可能条件、スーパーバイザーエージェント。',
  },
  {
    id: 'af-data',
    name: 'Data 360 & Retrieval（データ基盤と検索）',
    weight: 22,
    color: '#F2994A',
    description:
      'Data lake and data model objects, identity resolution, data spaces, search indexes, chunking, retrievers, and Data Libraries.',
    description_ja:
      'データレイクオブジェクトとデータモデルオブジェクト、ID解決、データスペース、検索インデックス、チャンク分割、リトリーバー、Data Library。',
  },
  {
    id: 'af-trust',
    name: 'Trust, Security & Permissions（信頼と権限）',
    weight: 12,
    color: '#27AE60',
    description:
      'Einstein Trust Layer (masking, zero data retention, toxicity, audit trail, prompt defence), the agent user, and permission design.',
    description_ja:
      'Einstein Trust Layer（マスキング・ゼロデータ保持・毒性検出・監査証跡・プロンプト防御）、エージェントユーザー、権限設計。',
  },
  {
    id: 'af-lifecycle',
    name: 'Deployment, Testing & Monitoring（展開・テスト・監視）',
    weight: 20,
    color: '#EB5757',
    description:
      'Sandbox to production deployment, Testing Center, conversation transcripts, utterance analysis, containment rate, and release governance.',
    description_ja:
      'サンドボックスから本番への展開、Testing Center、会話トランスクリプト、発話分析、封じ込め率、リリース統制。',
  },
  {
    id: 'af-integration',
    name: 'Integrations & Channels（連携とチャネル）',
    weight: 10,
    color: '#16B8A6',
    description:
      'MCP, A2A, the Agent API, channels such as Slack and the Salesforce app, escalation, and actions over external services.',
    description_ja:
      'MCP、A2A、Agent API、Slack や Salesforce アプリなどのチャネル、エスカレーション、外部サービスを呼ぶアクション。',
  },
]

export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
