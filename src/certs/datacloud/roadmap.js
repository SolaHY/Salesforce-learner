// Data Cloud (Data 360) Consultant 合格までの学習ロードマップ。教材は英語、進め方の説明は日本語。
export const roadmap = [
  {
    id: 'dcr-1',
    icon: '🧭',
    title: 'フェーズ1：用語とパイプラインを掴む',
    weeks: '目安：1週目',
    goal: '「接続→調和→統合→分析→実行」の順序を暗記し、どの用語がどの段階のものか即答できる状態にする。',
    steps: [
      'サイドバーの「既定の表示言語」は English のままにする（分からない箇所だけカードごとに日本語へ切り替える）',
      '単元1「Solution Positioning」を通しで学習し、パイプラインの5段階を紙に書けるようにする',
      'DLO / DMO / データストリーム / 統合プロファイル / セグメント の関係を1枚の図に整理する',
      '「フラッシュカード」を英語で一周し、意味が取れないカードだけ日本語で確認する',
      '公式の試験ガイドで出題範囲・配点・合格ライン（60問・105分・70%）を確認する',
    ],
  },
  {
    id: 'dcr-2',
    icon: '🔌',
    title: 'フェーズ2：取り込みの具体的な事実を固める',
    weeks: '目安：2週目',
    goal: '配点18%の単元3を攻略する。暗記すべき具体的事実が最も多い単元。',
    steps: [
      '単元3「Data Source Connection and Ingestion」を通しで学習する',
      'カテゴリ3種（Profile / Engagement / Other）と判別の手がかりを反射的に言えるようにする',
      '「カテゴリは作成後に変更できない」を強く記憶する（作り直しが唯一の手段）',
      'upsert と full refresh の違いを「ソースで削除された行はどうなるか」で説明できるようにする',
      'Zero Copy の3形態（クエリ連携／ファイル連携／データ共有）と、取り込みを選ぶ条件を整理する',
      'ソース種別 → 取り込み手段の対応表を作る（Salesforce / Marketing Cloud / ファイル / 独自システム / 対応ウェアハウス）',
    ],
  },
  {
    id: 'dcr-3',
    icon: '🧩',
    title: 'フェーズ3：統合と名寄せを詰める',
    weeks: '目安：3週目',
    goal: '配点17%の単元4を攻略する。一致ルールと調整ルールの取り違えをなくす。',
    steps: [
      '単元4「Harmonization and Unification」を通しで学習する',
      '「一致＝結合するか／調整＝どの値を採るか」を口に出して言えるようにする',
      '症状から方向を判断する練習をする：1人が複数→不足一致（緩める・標準化）、別人が結合→過剰一致（厳しくする）',
      '調整3方式とシナリオ上の手がかり（最新／多数／記録システム）を対応づける',
      'Contact Point が別 DMO である理由を、同意の観点から説明できるようにする',
    ],
  },
  {
    id: 'dcr-4',
    icon: '📊',
    title: 'フェーズ4：分析と活用（最大配点の2単元）',
    weeks: '目安：4〜5週目',
    goal: '配点18%＋20%＝38%を占める単元5・6を固める。ここが合否を分ける。',
    steps: [
      '単元5「Data Enhancements, Sharing, and Analysis」：Calculated と Streaming を「遅延要件で選ぶ」と覚える',
      'Data Graph の目的（事前結合による低遅延の一括読み取り）と、その代償（更新が必要）を整理する',
      '単元6「Data Activations and Utilization」：セグメント→公開→アクティベーションの連鎖を図で描く',
      'Data Action のターゲット3種と、アクティベーションターゲットの一覧を別々に暗記する（混同が頻出）',
      '「イベントか母集団か」を最初に判断する癖をつける（Data Action か アクティベーションか の分岐点）',
      '同意は Contact Point に紐づき、絞り込みで自動的に効かせる——を原則として固定する',
    ],
  },
  {
    id: 'dcr-5',
    icon: '⚙️',
    title: 'フェーズ5：設定と管理、そして模試',
    weeks: '目安：6週目（直前）',
    goal: '残る単元2（13%）を仕上げ、本番と同じ条件（60問・105分・70%）で安定して合格ラインを超える。',
    steps: [
      '単元2「Setup and Administration」：権限セット（何をしてよいか）とデータスペース（どのデータに対してか）を分けて整理する',
      '診断ツールと問いの対応（Data Explorer / Profile Explorer / クエリエディタ / 各種実行履歴）を暗記する',
      '「模擬試験」を105分計測で通しで解く',
      '採点後、間違えた問題の「なぜ不正解か」を英語で読み、必要な箇所だけ日本語で確認する',
      '正解した問題も、他の選択肢がなぜ誤りかを説明できるか確認する',
      '間違えた論点に対応する単元のインプットへ戻り、該当セクションを読み直す',
    ],
  },
]

// 参考リンク（公式 Trailhead ほか）。
export const resources = [
  {
    title: '公式：Salesforce Certified Data 360 Consultant 試験ガイド',
    url: 'https://help.salesforce.com/s/articleView?id=005298940&type=1&language=en_US',
    note: '出題範囲・配点・合格ラインの一次情報。旧称は Data Cloud Consultant。必ずここで最新を確認する。',
  },
  {
    title: '公式：資格ページ（受験申込）',
    url: 'https://trailhead.salesforce.com/credentials/datacloudconsultant',
    note: '受験申込と最新の資格情報。60問・105分・合格ライン70%・前提資格なし。',
  },
  {
    title: 'Trailhead：Data Cloud Basics',
    url: 'https://trailhead.salesforce.com/content/learn/modules/data-cloud-basics',
    note: '用語とパイプライン全体像。単元1の補強に。',
  },
  {
    title: 'Trailhead：Data Cloud Data Ingestion and Modeling',
    url: 'https://trailhead.salesforce.com/content/learn/modules/data-cloud-data-ingestion-and-modeling',
    note: 'データストリーム、DLO、DMO、マッピング。単元3・4の中核。',
  },
  {
    title: 'Trailhead：Data and Identity in Data Cloud',
    url: 'https://trailhead.salesforce.com/content/learn/modules/data-and-identity-in-salesforce-cdp',
    note: 'ID解決のルールセット、一致ルール、調整ルール。単元4の最重要論点。',
  },
  {
    title: 'Trailhead：Data Cloud Insights',
    url: 'https://trailhead.salesforce.com/content/learn/modules/customer-data-platform-insights',
    note: 'Calculated Insights とセグメンテーションでの使い方。単元5の補強に。',
  },
  {
    title: 'Trailhead：Data Cloud Segmentation and Activation',
    url: 'https://trailhead.salesforce.com/content/learn/modules/customer-data-platform-segmentation-and-activation',
    note: 'セグメント、アクティベーションターゲット、公開。最大配点の単元6に直結。',
  },
  {
    title: 'Salesforce Help：Zero Copy（連携とデータ共有）',
    url: 'https://www.salesforce.com/data/connectivity/zero-copy/',
    note: 'クエリ連携・ファイル連携・データ共有の違い。単元3で頻出。',
  },
]
