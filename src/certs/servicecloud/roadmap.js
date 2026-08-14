// Service Cloud Consultant 合格までの学習ロードマップ。教材は英語、進め方の説明は日本語。
export const roadmap = [
  {
    id: 'scr-1',
    icon: '🧭',
    title: 'フェーズ1：英語で学ぶ準備と全体像',
    weeks: '目安：1週目',
    goal: '英語のまま読み進められる状態を作り、8単元の全体像と配点を掴む。',
    steps: [
      'サイドバーの「既定の表示言語」は English のままにする（分からない箇所だけカードごとに日本語へ切り替える）',
      '「フラッシュカード」を英語で一周し、意味が取れないカードだけ日本語で確認する',
      '各単元のインプット冒頭（intro）だけを読み、何を扱う単元かを把握する',
      '公式の試験ガイドで出題範囲・配点・合格ライン（60問・105分・67%）を確認する',
    ],
  },
  {
    id: 'scr-2',
    icon: '🏛️',
    title: 'フェーズ2：最大配点「設計と業務知識」を固める',
    weeks: '目安：2〜3週目',
    goal: '配点26%の設計単元を重点攻略し、「規模に見合った解決策を選ぶ」判断を身につける。',
    steps: [
      '単元2「Solution Design & Industry Knowledge」を通しで学習する',
      'データモデル（Product／Asset／Contract／Entitlement）の違いを説明できるようにする',
      'ライセンス選定（社内か社外か・何をするか）と共有モデル（OWD が下限）を整理する',
      'ルーティングの選択肢（割り当てルール／キュー／Omni-Channel／スキル／エスカレーション）を比較表にする',
    ],
  },
  {
    id: 'scr-3',
    icon: '⚙️',
    title: 'フェーズ3：ケース管理・導入の進め方',
    weeks: '目安：4週目',
    goal: '配点15%の2単元（合計30%）を固める。エンタイトルメントとサンドボックスが軸。',
    steps: [
      '単元1「Implementation Strategies」：サンドボックス4種、デプロイ順序、UAT、トレーニング',
      '単元3「Case Management」：エンタイトルメント／プロセス／マイルストーンの連鎖を図で描けるようにする',
      '「強制（入力規則）」と「案内（フロー画面・パス）」の違いを反射的に判断できるようにする',
      'Web-to-Case の1日5,000件上限など、静かに失敗する上限値を覚える',
    ],
  },
  {
    id: 'scr-4',
    icon: '🔌',
    title: 'フェーズ4：チャネル・ナレッジ・コンソール・連携・分析',
    weeks: '目安：5週目',
    goal: '残る5単元（合計44%）を固め、全単元をクリア状態にする。',
    steps: [
      'チャネル(10%)：顧客の出発点ごとに受付機能を対応づける（メール／Web／チャット／メッセージング／電話／ソーシャル）',
      'ナレッジ(9%)：記事のライフサイクル、データカテゴリの可視性、KCS',
      'コンソール(10%)：4つの領域の役割と、クイックテキスト／クイックアクション／マクロの違い',
      '連携とデータ(10%)：4つの連携パターン、外部ID＋upsert、インデックスと選択性',
      '分析(5%)：対象者ごとの成果物と、活動量ではなく結果を測る指標',
    ],
  },
  {
    id: 'scr-5',
    icon: '⏱️',
    title: 'フェーズ5：模試を本番形式で解く',
    weeks: '目安：6週目（直前）',
    goal: '本番と同じ条件（60問・105分・67%）で安定して合格ラインを超える。',
    steps: [
      '「模擬試験」の Set A を、105分計測で通しで解く',
      '採点後、間違えた問題の「なぜ不正解か」を英語で読み、必要な箇所だけ日本語で確認する',
      '正解した問題も、他の3択がなぜ誤りかを説明できるか確認する',
      '間違えた論点に対応する単元のインプットへ戻り、該当セクションを読み直す',
    ],
  },
]

// 参考リンク（公式 Trailhead ほか）。
export const resources = [
  {
    title: '公式：Salesforce Certified Service Cloud Consultant 資格ページ',
    url: 'https://trailhead.salesforce.com/credentials/serviceCloudConsultant',
    note: '最新の試験ガイド・受験申込はこちら（公式）。出題範囲と配点は必ずここで確認する。',
  },
  {
    title: 'Trailmix：Prepare for Your Service Cloud Consultant Credential',
    url: 'https://trailhead.salesforce.com/users/strailhead/trailmixes/prepare-for-your-salesforce-service-cloud-consultant-credential',
    note: '公式が用意する認定準備用の Trailmix。',
  },
  {
    title: 'モジュール：Service Cloud for Lightning Experience',
    url: 'https://trailhead.salesforce.com/content/learn/modules/service_basics',
    note: 'ケース管理とコンソールの基礎。単元3・6の補強に。',
  },
  {
    title: 'モジュール：Knowledge Basics / Lightning Knowledge',
    url: 'https://trailhead.salesforce.com/content/learn/modules/knowledge_management',
    note: '記事のライフサイクル、データカテゴリ、KCS。単元5の補強に。',
  },
  {
    title: 'モジュール：Omni-Channel / Service Cloud Routing',
    url: 'https://trailhead.salesforce.com/content/learn/modules/service-cloud-routing',
    note: 'キュー、Omni-Channel、スキルベースルーティング。単元2の補強に。',
  },
  {
    title: 'モジュール：Entitlements and Milestones',
    url: 'https://trailhead.salesforce.com/content/learn/modules/entitlements',
    note: 'エンタイトルメントプロセスとマイルストーン。単元3の最重要論点。',
  },
  {
    title: 'モジュール：Sandboxes / Application Lifecycle Management',
    url: 'https://trailhead.salesforce.com/content/learn/modules/application_lifecycle_management',
    note: 'サンドボックス種別とリリース管理。単元1の補強に。',
  },
]
