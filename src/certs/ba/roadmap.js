// Business Analyst 合格までの学習ロードマップ。
export const roadmap = [
  {
    id: 'ba-phase-1',
    icon: '🧭',
    title: 'フェーズ1：試験の全体像と前提を押さえる',
    weeks: '目安：1週目',
    goal: '6ドメインの配点と、BA という役割の定義を掴む。受験前提（アドミニストレーター資格）も確認する。',
    steps: [
      '公式の試験ガイドで出題範囲・配点・合格ライン(72%)を確認する',
      '本アプリの「学習マップ」で6単元の全体像を眺める',
      '単元1「顧客ディスカバリー」のインプットを読み、BA・PM・アーキテクト・管理者の役割の違いを整理する',
      '受験にはアドミニストレーター認定が前提となるため、保有状況を確認する',
    ],
  },
  {
    id: 'ba-phase-2',
    icon: '🤝',
    title: 'フェーズ2：最大配点「ステークホルダーとの協働」を固める',
    weeks: '目安：2〜3週目',
    goal: '配点24%の協働ドメインを重点攻略し、状況判断問題への対応力を作る。',
    steps: [
      '協働(24%)：影響力×関心度マトリクス、RACI、ファシリテーション、変更管理',
      '「この状況で BA が最初にすべきことは？」という設問パターンに慣れる',
      '応用クイズ（シナリオ問題）を繰り返し、選択肢の切り方を身につける',
      '不正解だった選択肢の「なぜ不正解か」を必ず読む',
    ],
  },
  {
    id: 'ba-phase-3',
    icon: '🗺️',
    title: 'フェーズ3：ディスカバリー・プロセス・要件を通しで学ぶ',
    weeks: '目安：4週目',
    goal: '案件の入口から要件確定までの流れ（合計50%）を一本の線としてつなげる。',
    steps: [
      '顧客ディスカバリー(17%)：方法論、Scrum 用語、引き出し手法の使い分け',
      'プロセスマッピング(16%)：As-Is/To-Be、スイムレーン、ギャップ分析、改善の定石',
      '要件(17%)：要件の種類、良い要件の条件、MoSCoW、トレーサビリティ、変更管理',
      '用語の対比（検証と妥当性確認、制約と前提、用語集とデータ辞書）を整理する',
    ],
  },
  {
    id: 'ba-phase-4',
    icon: '📝',
    title: 'フェーズ4：ユーザーストーリーと受け入れを仕上げる',
    weeks: '目安：5週目',
    goal: '構築フェーズ以降（合計26%）を固め、全ドメインをクリア状態にする。',
    steps: [
      'ユーザーストーリー(15%)：書式、受け入れ基準、INVEST、分割と見積り',
      'ユーザー受け入れ(11%)：テストレベル、UAT の開始/終了基準、欠陥のトリアージ、定着と価値測定',
      '「フラッシュカード」で用語の対比を総ざらいする',
      '「進捗・実績」で単元別の正答率を確認し、低い領域を再挑戦する',
    ],
  },
  {
    id: 'ba-phase-5',
    icon: '👑',
    title: 'フェーズ5：総仕上げ・模擬試験',
    weeks: '目安：6週目（直前）',
    goal: '全範囲を通して安定して合格ライン(72%)を超える状態にする。',
    steps: [
      '「模擬試験」（60問前後×複数回）で本番形式に慣れる',
      '全6単元を「クリア」状態にして修了試験に挑戦する',
      '公式のプラクティステストにも挑戦する',
      '受験の予約と当日の流れ（105分・60問＋採点対象外5問・合格ライン72%）を確認する',
    ],
  },
]

// 参考リンク（公式 Trailhead など）。
export const resources = [
  {
    title: '公式：Salesforce 認定ビジネスアナリスト 資格ページ',
    url: 'https://trailhead.salesforce.com/credentials/businessanalyst',
    note: '最新の試験ガイド・受験申込はこちら（公式）。出題範囲は必ずここで確認する。',
  },
  {
    title: 'Trailmix：Prepare for Your Salesforce Business Analyst Credential',
    url: 'https://trailhead.salesforce.com/users/strailhead/trailmixes/prepare-for-your-salesforce-business-analyst-credential',
    note: '公式が用意する認定準備用の Trailmix。試験範囲に沿ったモジュールがまとまっている。',
  },
  {
    title: 'Trail：Business Analyst Career Path',
    url: 'https://trailhead.salesforce.com/content/learn/trails/get-started-as-a-salesforce-business-analyst',
    note: 'BA の役割・スキル・キャリアの基礎を学ぶトレイル。ディスカバリー領域の理解に有効。',
  },
  {
    title: 'モジュール：Business Analysis Basics / Requirements Gathering',
    url: 'https://trailhead.salesforce.com/content/learn/modules/business-analysis-basics',
    note: '要件の引き出しと文書化の基本。要件ドメインの補強に。',
  },
  {
    title: 'モジュール：Business Process Mapping',
    url: 'https://trailhead.salesforce.com/content/learn/modules/business-process-mapping',
    note: 'As-Is / To-Be プロセスとスイムレーンの実践。プロセスドメインの補強に。',
  },
  {
    title: 'モジュール：User Story Basics',
    url: 'https://trailhead.salesforce.com/content/learn/modules/user-story-basics',
    note: 'ユーザーストーリーと受け入れ基準の書き方。ストーリードメインの補強に。',
  },
  {
    title: 'Salesforce Admin 認定（受験前提）',
    url: 'https://trailhead.salesforce.com/credentials/administrator',
    note: 'ビジネスアナリスト試験の受験にはアドミニストレーター認定が前提。未取得ならこちらから。',
  },
]
