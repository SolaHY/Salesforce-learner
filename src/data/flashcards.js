// 暗記用フラッシュカード。front=用語/質問, back=説明/答え。
export const flashcards = [
  {
    id: 'fc-1',
    domain: 'object-manager',
    front: '主従関係 (Master-Detail) の特徴は？',
    back: '子は親に依存。親削除で子も削除。子は親の所有者・共有を継承。親で積み上げ集計項目が使える。1オブジェクトに最大2つまで。',
  },
  {
    id: 'fc-2',
    domain: 'object-manager',
    front: '参照関係 (Lookup) の特徴は？',
    back: '疎結合。親を削除しても子は残る（任意で参照クリア）。子は独自の所有者・共有を持つ。積み上げ集計は不可。',
  },
  {
    id: 'fc-3',
    domain: 'config-setup',
    front: 'プロファイルとロールの違いは？',
    back: 'プロファイル=「何ができるか」(オブジェクト/項目権限、アプリ、タブ)。ロール=「何が見えるか」(レコードレベルの可視性、ロール階層による共有)。',
  },
  {
    id: 'fc-4',
    domain: 'config-setup',
    front: '組織の共有設定 (OWD) とは？',
    back: 'Organization-Wide Defaults。各オブジェクトのレコードの既定の公開範囲（非公開/参照のみ/参照・更新）を決める基準線。ここから共有ルール等で広げる。',
  },
  {
    id: 'fc-5',
    domain: 'config-setup',
    front: '権限の積み上げ（広げる順）は？',
    back: 'OWD（最も制限的な基準）→ ロール階層 → 共有ルール → 手動共有 → チーム共有。アクセスは広げる方向にのみ作用する。',
  },
  {
    id: 'fc-6',
    domain: 'automation',
    front: '入力規則 (Validation Rule) の動作は？',
    back: '数式が TRUE のときエラーを表示し保存をブロック。保存前に評価される。',
  },
  {
    id: 'fc-7',
    domain: 'automation',
    front: 'Flow の主な種類は？',
    back: '画面フロー(ユーザー操作)、レコードトリガーフロー(レコード作成/更新/削除)、スケジュールフロー(定時実行)、自動起動フロー(他から呼出)、プラットフォームイベントフロー。',
  },
  {
    id: 'fc-8',
    domain: 'data-analytics',
    front: 'データインポートウィザード vs データローダ',
    back: 'ウィザード: 最大5万件、主要オブジェクト、重複防止、ブラウザのみ。データローダ: 最大500万件、全オブジェクト、挿入/更新/upsert/削除、CSV、API利用。',
  },
  {
    id: 'fc-9',
    domain: 'data-analytics',
    front: 'レポートタイプ 4種は？',
    back: '表形式(Tabular)、サマリー(Summary, グループ化)、マトリックス(Matrix, 行列グループ化)、結合(Joined, 複数ブロック)。',
  },
  {
    id: 'fc-10',
    domain: 'service-support',
    front: 'ケース自動化の3ルール',
    back: '割り当てルール=新規ケースの担当者/キュー決定。自動応答ルール=顧客へ自動返信メール。エスカレーションルール=時間経過で再割当/通知。',
  },
  {
    id: 'fc-11',
    domain: 'sales-marketing',
    front: 'リード変換で作成されるものは？',
    back: '取引先(Account)、取引先責任者(Contact)、（任意で）商談(Opportunity)。変換後リードは編集不可。',
  },
  {
    id: 'fc-12',
    domain: 'productivity',
    front: 'AppExchange とは？',
    back: 'Salesforce の公式マーケットプレイス。サードパーティ製アプリ、Lightningコンポーネント、フロー、コンサルサービスを入手できる。',
  },
  {
    id: 'fc-13',
    domain: 'agentforce',
    front: 'Agentforce とは？',
    back: 'CRMデータと業務に根ざした自律型AIエージェントを構築・運用するSalesforceのAI基盤。Einstein Copilot から進化。Atlas Reasoning Engine が意図理解→計画→実行を推論する。',
  },
  {
    id: 'fc-14',
    domain: 'agentforce',
    front: 'トピック(Topic)とアクション(Action)の違いは？',
    back: 'トピック=エージェントが扱う業務範囲の単位（指示・スコープ）。アクション=エージェントが実行する具体的操作。アクションには標準のほか Flow・Apex・プロンプトテンプレートを利用できる。',
  },
  {
    id: 'fc-15',
    domain: 'agentforce',
    front: 'Einstein Trust Layer とは？',
    back: '生成AIを安全に使うための信頼レイヤー。データマスキング、ゼロデータ保持（外部LLMに保持させない）、監査ログ、毒性検出などを提供する。',
  },
  {
    id: 'fc-16',
    domain: 'agentforce',
    front: 'Prompt Builder とグラウンディング',
    back: 'Prompt Builder=生成AI用プロンプトテンプレート（Sales Email・項目生成・Flex等）を作成するツール。グラウンディング=レコードやData Cloud等のデータを与え回答の正確性を高める（根拠付け）。',
  },
  {
    id: 'fc-17',
    domain: 'agentforce',
    front: 'Agent / Copilot / 従来型Bot の違い',
    back: 'Agent=自律的に計画・実行するエージェント。Copilot/Assistant=対話でユーザーを補助。従来型Bot=決め打ちシナリオで応答。Agentforce は自律エージェントを構築する。',
  },
]

export const flashcardsByDomain = (domainId) =>
  flashcards.filter((f) => f.domain === domainId)
