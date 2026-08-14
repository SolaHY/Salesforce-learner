// Agentforce Specialist 合格までの学習ロードマップ。
// 教材が英語のため、ロードマップの本文は日本語で進め方を示す。
export const roadmap = [
  {
    id: 'af-phase-1',
    icon: '🧭',
    title: 'フェーズ1：英語で学ぶ準備と全体像',
    weeks: '目安：1週目',
    goal: '英語のまま読み進められる状態を作り、6単元の全体像と用語の対応関係を掴む。',
    steps: [
      'サイドバーの「既定の表示言語」は English のままにする（分からない箇所だけカードごとに日本語へ切り替える）',
      'まず「フラッシュカード」を英語で一周し、意味が取れないカードだけ日本語で確認する',
      '単元1〜6のインプット冒頭（intro）だけを読み、各単元が何を扱うかを把握する',
      '公式の試験ガイドで出題範囲・配点・合格ライン（60問・105分・44問正解）を確認する',
    ],
  },
  {
    id: 'af-phase-2',
    icon: '🧠',
    title: 'フェーズ2：最大配点「エージェント設計」を固める',
    weeks: '目安：2週目',
    goal: 'ハイブリッド推論（プロンプト指示と決定的指示）を、迷わず判別できる状態にする。',
    steps: [
      '単元2「Agentforce Concepts」を通しで学習する（本試験で最も比重が大きい）',
      '「always / must / guaranteed」→決定的指示、「decide / depending on」→プロンプト指示、のキーワード判定を身につける',
      'before_reasoning（判断への入力）と after_reasoning（出力への処理）の使い分けを整理する',
      '応用クイズ（シナリオ）で、説明文・利用可能条件・決定的指示の使い分けを反復する',
    ],
  },
  {
    id: 'af-phase-3',
    icon: '🗄️',
    title: 'フェーズ3：データとグラウンディングを攻略',
    weeks: '目安：3週目',
    goal: '配点22%のデータ単元を固め、検索の症状と対処を反射的に選べるようにする。',
    steps: [
      '単元3「Data 360 & Retrieval」を通しで学習する',
      'RAGの順序（取り込み→チャンク分割→埋め込み→インデックス化／検索→プロンプト→生成）を暗記する',
      '症状別の対処（主題違い→フィルター、短すぎ→チャンク拡大、境界で切れる→オーバーラップ、言い換え→ベクトル）を暗記する',
      'DLO→DMOマッピングの目的、ID解決とデータスペースの対比を整理する',
    ],
  },
  {
    id: 'af-phase-4',
    icon: '🚀',
    title: 'フェーズ4：プロンプト・信頼・運用・連携を仕上げる',
    weeks: '目安：4週目',
    goal: '残る4単元（合計55%）を固め、全単元をクリア状態にする。',
    steps: [
      'プロンプト(13%)：4つのテンプレート種別を「出力先」で暗記し、保存≠有効化を押さえる',
      '信頼(12%)：マスキングとゼロデータ保持の違い、エージェントユーザーの2パターンを整理する',
      '運用(20%)：展開後の3つの症状と原因、リリース前後のツールの時間軸を整理する',
      '連携(10%)：MCP / A2A / Agent API / アクション の4分類を「相手が誰か」で暗記する',
    ],
  },
  {
    id: 'af-phase-5',
    icon: '⏱️',
    title: 'フェーズ5：模試を本番形式で解く',
    weeks: '目安：5週目（直前）',
    goal: '本番と同じ条件（60問・105分・44問正解）で安定して合格ラインを超える。',
    steps: [
      '「模擬試験」の Mock Exam 1 を、105分計測・メモなし・中断なしで通しで解く',
      '採点後、間違えた問題の「なぜ不正解か」を英語で読み、必要な箇所だけ日本語で確認する',
      '正解した問題も、他の3択がなぜ誤りかを説明できるか確認する',
      '間違えた論点に対応する単元のインプットへ戻り、該当セクションを読み直す',
    ],
  },
]

// 参考リンク（公式 Trailhead ほか）。
export const resources = [
  {
    title: '公式：Salesforce Certified Agentforce Specialist 資格ページ',
    url: 'https://trailhead.salesforce.com/credentials/agentforce-specialist',
    note: '最新の試験ガイド・受験申込はこちら（公式）。出題範囲は必ずここで確認する。',
  },
  {
    title: 'Trail：Get Started with Agentforce',
    url: 'https://trailhead.salesforce.com/content/learn/trails/get-started-with-agentforce',
    note: 'エージェント、トピック、アクションの基礎。単元2の補強に。',
  },
  {
    title: 'モジュール：Prompt Builder Basics',
    url: 'https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics',
    note: 'プロンプトテンプレートの種類・グラウンディング・プレビュー。単元1の補強に。',
  },
  {
    title: 'モジュール：Einstein Trust Layer',
    url: 'https://trailhead.salesforce.com/content/learn/modules/einstein-trust-layer',
    note: 'マスキング、ゼロデータ保持、監査証跡。単元4の補強に。',
  },
  {
    title: 'Trail：Data Cloud / Data 360',
    url: 'https://trailhead.salesforce.com/content/learn/trails/get-started-with-data-cloud',
    note: 'DLO・DMO・ID解決・データスペース。単元3の補強に。',
  },
  {
    title: 'Model Context Protocol（MCP）公式サイト',
    url: 'https://modelcontextprotocol.io/',
    note: 'MCP の仕様と考え方。単元6で MCP と A2A を区別するための背景知識。',
  },
]
