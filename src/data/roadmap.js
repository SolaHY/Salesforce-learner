// 学習ロードマップ。合格までの推奨ステップを段階(フェーズ)で示す。
export const roadmap = [
  {
    id: 'phase-1',
    icon: '🧭',
    title: 'フェーズ1：全体像をつかむ',
    weeks: '目安：1週目',
    goal: '試験範囲（8ドメイン）と最新の配点比率を把握し、学習計画を立てる。',
    steps: [
      '公式の試験ガイド（最新版）で出題範囲と配点を確認する',
      '本アプリの「学習マップ」で8単元の全体像を眺める',
      '各単元の「インプット」をざっと一読する',
      'Trailhead の Administrator 関連 Trailmix に登録する（下部リンク参照）',
    ],
  },
  {
    id: 'phase-2',
    icon: '🏛️',
    title: 'フェーズ2：配点の大きい領域を固める',
    weeks: '目安：2〜3週目',
    goal: '配点上位の「データと分析」「設定とセットアップ」「オブジェクト」「自動化」を重点攻略。',
    steps: [
      'データと分析(17%)：インポート/レポート/ダッシュボード/重複管理',
      '設定とセットアップ(15%)：ユーザー管理・セキュリティ階層',
      'オブジェクトマネージャ(15%)：リレーション/項目/レコードタイプ',
      '自動化(15%)：Flow・入力規則・承認プロセス',
    ],
  },
  {
    id: 'phase-3',
    icon: '🏪',
    title: 'フェーズ3：アプリ領域とAIを攻略',
    weeks: '目安：4週目',
    goal: '営業・サービス・生産性の各機能に加え、新領域 Agentforce を理解する。',
    steps: [
      '営業・マーケ(10%)：リード変換/商談/価格表',
      'サービス(10%)：ケース自動化/SLA/ナレッジ',
      '生産性(10%)：Chatter/モバイル/AppExchange',
      'Agentforce(8%)：Agent Builder/トピック・アクション/Trust Layer',
    ],
  },
  {
    id: 'phase-4',
    icon: '🃏',
    title: 'フェーズ4：反復と弱点補強',
    weeks: '目安：5週目',
    goal: '記憶を定着させ、間違いやすいポイントを潰す。',
    steps: [
      '「フラッシュカード」で用語を総ざらい',
      '「進捗・実績」で単元別の正答率を確認し、低い領域を再挑戦',
      'シナリオ問題で実務的な判断力を鍛える',
      '不正解だった問題の「なぜ不正解か」を読み込む',
    ],
  },
  {
    id: 'phase-5',
    icon: '👑',
    title: 'フェーズ5：総仕上げ・模擬試験',
    weeks: '目安：6週目（直前）',
    goal: '全範囲を通して安定して合格ラインを超える状態にする。',
    steps: [
      '「模擬試験」（100問×5回）で本番形式に慣れる',
      '全8単元を「クリア」状態にして修了試験を解放する',
      '公式模擬試験(Practice Exam)にも挑戦する',
      '受験の予約と当日の流れ（試験時間・合格ライン約65%）を確認',
    ],
  },
]

// 参考リンク（公式 Trailhead など）。学習の外部リソース集。
export const resources = [
  {
    title: 'Trailmix：TNG Engineer Team Admin Certification Challenge 2025',
    url: 'https://trailhead.salesforce.com/ja/users/exfaiu3v3etjv683qw/trailmixes/tng-engineer-team-salesforce-admin-certification-challenge-2025',
    note: 'チーム向けアドミン認定チャレンジのTrailmix。',
  },
  {
    title: 'Trailmix：ad9999（kokamoto）',
    url: 'https://trailhead.salesforce.com/ja/users/kokamoto/trailmixes/ad9999',
    note: 'アドミン試験対策のTrailmix。',
  },
  {
    title: 'モジュール：Einstein Copilot の基礎',
    url: 'https://trailhead.salesforce.com/ja/content/learn/modules/einstein-copilot-basics',
    note: 'Agentforce の前身 Einstein Copilot / 生成AIの基礎を学ぶ。',
  },
  {
    title: 'Trailhead Academy：セルフラーニング（Admin 準備）',
    url: 'https://trailheadacademy.salesforce.com/ja/self-learning?registrationId=a8bRf000003P49xIAC&learningAssetId=a90KV000000rYVkYAM',
    note: '認定準備向けのセルフラーニング教材。',
  },
  {
    title: 'Qiita：Salesforce認定アドミニストレーター 合格記・要点',
    url: 'https://qiita.com/Takaa/items/485dc2dd1e61f31f2ff9',
    note: '受験者による対策記事。出題傾向の把握に。',
  },
  {
    title: '公式：Salesforce 認定アドミニストレーター 資格ページ',
    url: 'https://trailhead.salesforce.com/credentials/administrator',
    note: '最新の試験ガイド・受験申込はこちら（公式）。',
  },
]
