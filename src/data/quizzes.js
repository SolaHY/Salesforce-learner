// サンプル問題集。各問題は domain id に紐づく。
// answer は options 配列のインデックス（0始まり）。multi=true の場合は正解インデックスの配列。
export const questions = [
  // --- 構成と設定 ---
  {
    id: 'q-cfg-1',
    domain: 'config-setup',
    question:
      'ユーザーがログインできる時間帯を制限したい。管理者が設定すべき項目はどれか。',
    options: [
      'プロファイルのログイン時間 (Login Hours)',
      '共有ルール',
      'ロール階層',
      '組織の通貨設定',
    ],
    answer: 0,
    explanation:
      'プロファイルの「ログイン時間」でユーザーがログインできる曜日・時間帯を制御できます。IPアドレス制限は「ログインIP範囲」で設定します。',
  },
  {
    id: 'q-cfg-2',
    domain: 'config-setup',
    question:
      '新しいユーザーにライセンスを割り当てる際、ユーザーレコードで必須となる項目はどれか。（2つ選択）',
    options: ['ロール', 'プロファイル', 'ユーザーライセンス', 'マネージャ'],
    answer: [1, 2],
    multi: true,
    explanation:
      'ユーザー作成にはプロファイルとユーザーライセンスが必須です。ロールやマネージャは任意項目です。',
  },
  {
    id: 'q-cfg-3',
    domain: 'config-setup',
    question:
      'パスワードポリシー（有効期限・複雑さ）を組織全体に適用する場所はどこか。',
    options: [
      '各ユーザーの個人設定',
      '[設定] > パスワードポリシー',
      '共有設定',
      'プロファイルの項目レベルセキュリティ',
    ],
    answer: 1,
    explanation:
      'パスワードポリシーは [設定] > セキュリティ > パスワードポリシーで組織全体に対して設定します。プロファイル単位で上書きすることも可能です。',
  },
  // --- オブジェクトマネージャ ---
  {
    id: 'q-obj-1',
    domain: 'object-manager',
    question:
      '親レコードを削除すると子レコードも自動的に削除される関係はどれか。',
    options: [
      '参照関係 (Lookup)',
      '主従関係 (Master-Detail)',
      '階層関係 (Hierarchical)',
      '外部参照関係 (External Lookup)',
    ],
    answer: 1,
    explanation:
      '主従関係では親（マスター）を削除すると子（ディテール）も削除されます。子は所有者や共有を親から継承します。参照関係は疎結合で、親削除時も子は残ります。',
  },
  {
    id: 'q-obj-2',
    domain: 'object-manager',
    question:
      '数式項目で、別オブジェクトの関連レコードの合計を表示したい場合に使う項目タイプはどれか。',
    options: [
      '数式 (Formula)',
      '積み上げ集計項目 (Roll-Up Summary)',
      '自動採番 (Auto Number)',
      '選択リスト (Picklist)',
    ],
    answer: 1,
    explanation:
      '積み上げ集計項目は主従関係の親オブジェクトに作成し、子レコードのCOUNT/SUM/MIN/MAXを集計できます。参照関係では使えない点に注意。',
  },
  {
    id: 'q-obj-3',
    domain: 'object-manager',
    question:
      'レコードページ上で特定のプロファイルにのみ異なるレイアウトを表示する方法として正しいものはどれか。',
    options: [
      'ページレイアウトの割り当てをプロファイルごとに設定する',
      '項目レベルセキュリティを変更する',
      '共有ルールを作成する',
      'ロール階層を変更する',
    ],
    answer: 0,
    explanation:
      'ページレイアウトはプロファイル（およびレコードタイプ）ごとに割り当てできます。Lightning ではアプリ・レコードタイプ・プロファイルでページの出し分けも可能です。',
  },
  // --- 営業・マーケティング ---
  {
    id: 'q-sales-1',
    domain: 'sales-marketing',
    question:
      'リードを取引先・取引先責任者・商談に変換する処理を何と呼ぶか。',
    options: ['リードの割り当て', 'リードの変換 (Convert)', 'リードのマージ', 'リードのエスカレーション'],
    answer: 1,
    explanation:
      'リードの変換 (Lead Conversion) で、リードは取引先・取引先責任者・（任意で）商談に変換されます。変換後のリードは編集できません。',
  },
  {
    id: 'q-sales-2',
    domain: 'sales-marketing',
    question:
      '商談ごとに異なる販売プロセス（ステージの組み合わせ）を使い分けたい。利用する機能はどれか。',
    options: ['レコードタイプ + 販売プロセス', '入力規則', 'キューイング', '価格表'],
    answer: 0,
    explanation:
      'レコードタイプに販売プロセス（Sales Process）を関連付けることで、商談タイプごとに利用可能なステージを制御できます。',
  },
  {
    id: 'q-sales-3',
    domain: 'sales-marketing',
    question: 'キャンペーンの ROI を測定するために重要な項目はどれか。',
    options: ['キャンペーンメンバーの状況と実績/予算項目', 'リードソースのみ', 'ロール階層', '商談の所有者'],
    answer: 0,
    explanation:
      'キャンペーンの予算・実績コストと、キャンペーンに紐づく商談（キャンペーンの影響）からROIを算出します。キャンペーンメンバーの状況も実績把握に重要です。',
  },
  // --- サービス・サポート ---
  {
    id: 'q-svc-1',
    domain: 'service-support',
    question:
      '一定時間内に対応されないケースを上位担当者へ自動的に転送する仕組みはどれか。',
    options: ['割り当てルール', 'エスカレーションルール', '自動応答ルール', '共有ルール'],
    answer: 1,
    explanation:
      'エスカレーションルールは経過時間などの条件でケースを再割り当て・通知します。割り当てルールは新規ケースの担当者決定、自動応答ルールは顧客への自動返信です。',
  },
  {
    id: 'q-svc-2',
    domain: 'service-support',
    question:
      '顧客からのメールを自動的にケースとして登録する機能はどれか。',
    options: ['Web-to-Lead', 'Email-to-Case', 'Web-to-Case', 'メールアラート'],
    answer: 1,
    explanation:
      'Email-to-Case は受信メールをケースに変換します。Web-to-Case はWebフォームから、Web-to-Lead はWebフォームからリードを作成します。',
  },
  // --- 生産性とコラボレーション ---
  {
    id: 'q-prod-1',
    domain: 'productivity',
    question:
      'レコードの更新を関係者に通知し、コメントでやり取りできる社内SNS的な機能はどれか。',
    options: ['Chatter', 'ToDo', 'ナレッジ', 'マクロ'],
    answer: 0,
    explanation:
      'Chatter はフィード・グループ・フォローによる社内コラボレーション機能です。レコードや項目の変更をフォローして通知を受け取れます。',
  },
  {
    id: 'q-prod-2',
    domain: 'productivity',
    question:
      'サードパーティ製のアプリやコンポーネントを入手できる Salesforce のマーケットプレイスはどれか。',
    options: ['Trailhead', 'AppExchange', 'Setup', 'Trust'],
    answer: 1,
    explanation:
      'AppExchange はアプリ・コンポーネント・コンサルティングサービスを入手できるマーケットプレイスです。',
  },
  // --- データと分析 ---
  {
    id: 'q-data-1',
    domain: 'data-analytics',
    question: '5万件を超えるレコードを一括インポートするのに適したツールはどれか。',
    options: ['データインポートウィザード', 'データローダ (Data Loader)', '手動入力', 'レポート'],
    answer: 1,
    explanation:
      'データインポートウィザードは最大5万件まで。それを超える場合や、より多くのオブジェクト・削除/更新操作にはデータローダを使います。',
  },
  {
    id: 'q-data-2',
    domain: 'data-analytics',
    question:
      'レポートで「特定の条件を満たすグループのみ」を表示するために使う機能はどれか。',
    options: ['集計項目 (Summary Formula)', 'バケット項目', 'レポート抽出条件 (Filter) / 行制限', 'ダッシュボード'],
    answer: 2,
    explanation:
      'レポートの抽出条件で表示対象を絞り込みます。TOP Nなどは行制限、グループ単位の計算は集計項目、任意分類はバケット項目を使います。',
  },
  {
    id: 'q-data-3',
    domain: 'data-analytics',
    question: 'ダッシュボードに表示されるデータは誰の権限で表示されるか（動的でない標準の場合）。',
    options: ['閲覧者本人', '実行ユーザー (Running User)', 'システム管理者固定', '所有者全員'],
    answer: 1,
    explanation:
      '標準のダッシュボードは「実行ユーザー」の権限・共有に基づいてデータを表示します。動的ダッシュボードを使うと閲覧者本人の権限で表示できます。',
  },
  // --- 自動化 ---
  {
    id: 'q-auto-1',
    domain: 'automation',
    question:
      'レコード保存時に入力値が条件を満たさない場合にエラーを表示し、保存を防ぐ機能はどれか。',
    options: ['入力規則 (Validation Rule)', 'ワークフロールール', 'フロー', '承認プロセス'],
    answer: 0,
    explanation:
      '入力規則は数式が TRUE を返したときにエラーメッセージを表示し、レコードの保存をブロックします。',
  },
  {
    id: 'q-auto-2',
    domain: 'automation',
    question:
      '現在 Salesforce が推奨する、ノーコードで複雑な自動化を構築する主要ツールはどれか。',
    options: ['ワークフロールール', 'プロセスビルダー', 'Flow (フロー)', 'Apex トリガ'],
    answer: 2,
    explanation:
      'ワークフロールールとプロセスビルダーは廃止予定（移行対象）であり、現在は Flow が推奨される標準の自動化ツールです。',
  },
  {
    id: 'q-auto-3',
    domain: 'automation',
    question:
      'レコードが特定条件を満たしたときに上長の承認を求めるプロセスを構築する機能はどれか。',
    options: ['承認プロセス (Approval Process)', '入力規則', '割り当てルール', 'エスカレーションルール'],
    answer: 0,
    explanation:
      '承認プロセスは申請・承認ステップ・承認/却下時のアクションを定義します。複数ステップや並列承認も設定できます。',
  },
]

export const questionsByDomain = (domainId) =>
  questions.filter((q) => q.domain === domainId)
