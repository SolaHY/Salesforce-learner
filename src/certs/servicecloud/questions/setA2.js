// 同梱の練習試験「Chapter 10: Full Practice Exam — Set A」Q31〜Q60（screenshots/Service Cloud）。
export const setA2Questions = [
  {
    id: 'sc-a-31',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 31,
    question:
      'A company wants agents to see a customer account balance from an external billing system on the case record. The balance must be current at the time the agent views the case. Data must not be stored in Salesforce. Which solution applies?',
    question_ja:
      'ある企業は、外部の請求システムにある顧客の残高を、ケースレコード上で担当者に表示したい。残高は担当者がケースを閲覧した時点で最新である必要があり、データを Salesforce に保存してはならない。当てはまる解決策はどれか。',
    options: [
      { text: 'Nightly batch sync from the billing system to a custom field', text_ja: '請求システムからカスタム項目への夜間バッチ同期', correct: false, note: 'Violates both constraints: the data is stored in Salesforce and is up to a day stale.', note_ja: '2つの制約に反する。データが Salesforce に保存され、最大1日古くなる。' },
      { text: 'Salesforce Connect with an external object', text_ja: '外部オブジェクトを用いた Salesforce Connect', correct: true, note: 'Correct. External objects read live from the source at view time and store nothing in Salesforce.', note_ja: '正解。外部オブジェクトは閲覧時にソースからライブで読み取り、Salesforce には何も保存しない。' },
      { text: 'REST API callout triggered when the case page loads', text_ja: 'ケースページ読み込み時に実行される REST API コールアウト', correct: false, note: 'Technically possible but requires custom code where a declarative option exists.', note_ja: '技術的には可能だが、宣言的な選択肢があるのにカスタムコードを必要とする。' },
      { text: 'A canvas app embedded in the case layout', text_ja: 'ケースレイアウトに埋め込んだ Canvas アプリ', correct: false, note: 'Embeds an external UI rather than surfacing the data as Salesforce records.', note_ja: '外部のUIを埋め込むだけで、データを Salesforce のレコードとして扱えるようにはしない。' },
    ],
    explanation:
      'Salesforce Connect exposes external data as external objects, read live at query time. Nothing is copied into Salesforce, which satisfies both the freshness and the no-storage requirements declaratively.',
    explanation_ja:
      'Salesforce Connect は外部データを外部オブジェクトとして公開し、クエリ時にライブで読み取る。Salesforce へのコピーが発生しないため、鮮度と非保存の両方の要件を宣言的に満たせる。',
    reference: '💡 "Must be current at view time" + "must not be stored" → Salesforce Connect. Storing a copy is always the wrong answer here.',
    reference_ja: '💡 「閲覧時点で最新」＋「保存しない」→Salesforce Connect。コピーを保存する選択肢は常に誤り。',
  },
  {
    id: 'sc-a-32',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 32,
    question:
      'A consultant is preparing to deploy components with dependencies. Which deployment sequence is correct?',
    question_ja:
      'コンサルタントが依存関係のあるコンポーネントをデプロイしようとしている。正しいデプロイ順序はどれか。',
    options: [
      { text: 'Deploy all components simultaneously in a single change set', text_ja: 'すべてのコンポーネントを1つの変更セットで同時にデプロイする', correct: false, note: 'Often works, but the question asks for the correct sequencing principle when dependencies exist.', note_ja: '成功することも多いが、この設問は依存関係がある場合の正しい順序の原則を問うている。' },
      { text: 'Deploy dependent components before the components they depend on', text_ja: '依存している側のコンポーネントを、依存される側より先にデプロイする', correct: false, note: 'Backwards — the thing being referenced must exist first.', note_ja: '逆。参照される側が先に存在していなければならない。' },
      { text: 'Deploy objects and fields before the validation rules and flows that reference them', text_ja: 'オブジェクトと項目を、それらを参照する入力規則やフローより先にデプロイする', correct: true, note: 'Correct. Referenced components must exist before the components referencing them.', note_ja: '正解。参照される側のコンポーネントは、参照する側より先に存在している必要がある。' },
      { text: 'Deploy flows and validation rules first to reserve field references', text_ja: '項目参照を確保するため、フローと入力規則を先にデプロイする', correct: false, note: 'There is no such thing as reserving a reference to a field that does not exist yet.', note_ja: 'まだ存在しない項目への参照を「確保する」という仕組みは存在しない。' },
    ],
    explanation:
      'Base components first: objects and fields, then the validation rules, flows and layouts that reference them. This is the same dependency principle that causes the failure in Q21.',
    explanation_ja:
      '基盤となるコンポーネントを先に。オブジェクトと項目、次にそれらを参照する入力規則・フロー・レイアウト。Q21 の失敗を引き起こすのと同じ依存関係の原則である。',
    reference: '💡 Dependencies point backwards in time: whatever is referenced must already exist in the target org.',
    reference_ja: '💡 依存関係は時系列で後ろ向き。参照される側は、対象組織に先に存在していなければならない。',
  },
  {
    id: 'sc-a-33',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 33,
    question:
      'A company wants to ensure agents attach a knowledge article before closing a case. Which mechanism enforces this?',
    question_ja:
      'ある企業は、担当者がケースをクローズする前に必ずナレッジ記事を添付するようにしたい。これを強制する仕組みはどれか。',
    options: [
      { text: 'A required field on the case that stores the article ID', text_ja: '記事IDを格納するケース上の必須項目', correct: false, note: 'Forces a value but not a real attachment; agents can type anything to get past it.', note_ja: '値の入力は強制できるが実際の添付ではない。担当者は何を入力してでも通過できてしまう。' },
      { text: 'A validation rule that checks for at least one attached article before allowing case closure', text_ja: 'ケースのクローズ前に、記事が1件以上添付されているか確認する入力規則', correct: true, note: 'Correct. A validation rule blocks the save, which is genuine enforcement.', note_ja: '正解。入力規則は保存自体をブロックするため、本当の意味での強制になる。' },
      { text: 'A flow that prompts the agent to search Knowledge when status is set to Closed', text_ja: 'ステータスがクローズに設定されたときに、ナレッジ検索を促すフロー', correct: false, note: 'A prompt is guidance the agent can ignore; it does not prevent closure.', note_ja: '促すだけで担当者は無視でき、クローズを防げない。' },
      { text: 'A case assignment rule that routes cases back to the queue if no article is attached', text_ja: '記事が添付されていない場合にケースをキューへ戻す割り当てルール', correct: false, note: 'Assignment rules do not run on update, and this reacts after closure rather than preventing it.', note_ja: '割り当てルールは更新時には実行されず、しかもクローズを防ぐのではなく事後に反応する形になる。' },
    ],
    explanation:
      'Validation rules block the save when the condition is not met, which is the only true enforcement among these options. Prompts and post-hoc routing rely on behaviour rather than preventing the action.',
    explanation_ja:
      '入力規則は条件を満たさない場合に保存をブロックするため、選択肢の中で唯一の本当の強制手段である。プロンプトや事後のルーティングは、行為を防ぐのではなく振る舞いに依存している。',
    reference: '💡 "Enforce / must / prevent" → validation rule. "Guide / remind / suggest" → flow screen, path guidance, or an alert.',
    reference_ja: '💡 「強制する／必須／防ぐ」→入力規則。「案内する／促す／提案する」→画面フロー、パスのガイダンス、アラート。',
  },
  {
    id: 'sc-a-34',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 34,
    question:
      'An entitlement process has three milestones. Cases have been open for two days and no milestones appear. What should the consultant check?',
    question_ja:
      'エンタイトルメントプロセスに3つのマイルストーンが設定されている。ケースは2日間オープンのままだが、マイルストーンが表示されない。コンサルタントが確認すべきことはどれか。',
    options: [
      { text: 'Whether the entitlement is associated with the customer account', text_ja: 'エンタイトルメントが顧客の取引先に関連付けられているか', correct: false, note: 'Necessary for the entitlement to be findable, but the case still needs the process applied to it.', note_ja: 'エンタイトルメントを見つけるためには必要だが、ケース側にプロセスが適用されていなければ意味がない。' },
      { text: 'Whether the case was created before the entitlement was activated', text_ja: 'エンタイトルメントの有効化前にケースが作成されたか', correct: false, note: 'Timing can matter, but it is not the first thing to check.', note_ja: 'タイミングが影響することはあるが、最初に確認すべき点ではない。' },
      { text: 'Whether the entitlement process has been assigned to the case', text_ja: 'エンタイトルメントプロセスがケースに割り当てられているか', correct: true, note: 'Correct. Milestones only appear once the case actually has the entitlement process on it.', note_ja: '正解。マイルストーンは、ケースに実際にエンタイトルメントプロセスが適用されて初めて表示される。' },
      { text: 'Whether the milestone actions have the correct user for notifications', text_ja: 'マイルストーンアクションの通知先ユーザーが正しいか', correct: false, note: 'That would break notifications, not the display of milestones themselves.', note_ja: 'それは通知が届かない原因にはなるが、マイルストーンの表示自体が消えるわけではない。' },
    ],
    explanation:
      'Milestones are tracked per case only when the entitlement process is applied to that case. Check the case first, then the entitlement on the account, then the timing.',
    explanation_ja:
      'マイルストーンは、そのケースにエンタイトルメントプロセスが適用されている場合にのみ追跡される。まずケースを確認し、次に取引先側のエンタイトルメント、最後にタイミングを確認する。',
    reference: '💡 Entitlement chain: account/asset/contract holds the entitlement → the case gets the entitlement → the process applies → milestones appear.',
    reference_ja: '💡 エンタイトルメントの連鎖：取引先／納入品／契約がエンタイトルメントを保持→ケースに付与→プロセス適用→マイルストーン表示。',
  },
  {
    id: 'sc-a-35',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 35,
    question:
      'A company wants to show customers relevant knowledge articles as they type in a web case form, to deflect cases before submission. Which feature enables this?',
    question_ja:
      'ある企業は、Webのケースフォーム入力中に関連するナレッジ記事を顧客に表示し、送信前にケースを回避したい。これを実現する機能はどれか。',
    options: [
      { text: 'Web-to-Case with a Knowledge sidebar', text_ja: 'ナレッジサイドバーを備えた Web-to-Case', correct: false, note: 'Web-to-Case is a plain form post; it has no built-in article surfacing.', note_ja: 'Web-to-Case は単純なフォーム送信であり、記事を提示する機能を内蔵していない。' },
      { text: 'Experience Cloud self-service portal with Einstein Article Recommendations', text_ja: 'Einstein Article Recommendations を備えた Experience Cloud セルフサービスポータル', correct: true, note: 'Correct. The portal surfaces recommended articles as the customer describes the issue, deflecting before submission.', note_ja: '正解。顧客が問題を記述している最中に推奨記事を提示し、送信前にケースを回避する。' },
      { text: 'Einstein Bots deployed on the web form page', text_ja: 'Webフォームのページに配置した Einstein Bots', correct: false, note: 'A separate conversational channel rather than in-form deflection.', note_ja: 'フォーム内での回避ではなく、別の会話チャネルになる。' },
      { text: 'Knowledge Search widget embedded in the Web-to-Case form', text_ja: 'Web-to-Case フォームに埋め込んだナレッジ検索ウィジェット', correct: false, note: 'Requires the customer to search deliberately, rather than recommending as they type.', note_ja: '顧客が意識的に検索する必要があり、入力に応じて自動的に推奨するものではない。' },
    ],
    explanation:
      'Deflection before submission needs a portal experience that recommends articles based on what the customer is typing. Einstein Article Recommendations on an Experience Cloud self-service portal is the packaged way to do this.',
    explanation_ja:
      '送信前の回避には、顧客が入力している内容に基づいて記事を推奨するポータル体験が必要。Experience Cloud セルフサービスポータル上の Einstein Article Recommendations がそのための標準的な手段である。',
    reference: '💡 Deflection design: recommend proactively (portal + Einstein), do not wait for the customer to search.',
    reference_ja: '💡 ケース回避の設計は「先回りして推奨する」（ポータル＋Einstein）。顧客の検索を待たない。',
  },
  {
    id: 'sc-a-36',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 36,
    question:
      'A consultant has requested a custom index on Case_Category__c to improve list view performance. What additional design consideration should be raised?',
    question_ja:
      'コンサルタントがリストビューのパフォーマンス改善のため Case_Category__c にカスタムインデックスを依頼した。追加で提起すべき設計上の考慮点はどれか。',
    options: [
      { text: 'Increase the list view page size', text_ja: 'リストビューのページサイズを大きくする', correct: false, note: 'Returning more rows per page makes performance worse, not better.', note_ja: '1ページあたりの行数を増やせばパフォーマンスは悪化する。' },
      { text: 'Ensure queries filter on indexed fields and return a selective result set', text_ja: 'クエリがインデックス項目で絞り込み、選択性の高い結果セットを返すようにする', correct: true, note: 'Correct. An index is only used when the filter is selective enough; otherwise the optimiser ignores it.', note_ja: '正解。インデックスは絞り込みが十分に選択的な場合にのみ使われる。そうでなければオプティマイザは無視する。' },
      { text: 'Replace the list view with a dashboard component', text_ja: 'リストビューをダッシュボードコンポーネントに置き換える', correct: false, note: 'Changes the UI without addressing query selectivity.', note_ja: 'UIを変えるだけで、クエリの選択性の問題には触れていない。' },
      { text: 'Archive all cases older than 90 days', text_ja: '90日以上前のケースをすべてアーカイブする', correct: false, note: 'Aggressive data loss that most contact centres cannot accept, and not the design point here.', note_ja: '多くのコンタクトセンターが許容できない過度なデータ削減であり、ここでの設計上の論点でもない。' },
    ],
    explanation:
      'An index only helps if queries actually filter on the indexed field and the filter is selective — returning a small enough proportion of records. A non-selective filter causes the optimiser to skip the index entirely.',
    explanation_ja:
      'インデックスは、クエリが実際にその項目で絞り込み、かつ絞り込みが選択的（十分に少ない割合のレコードを返す）である場合にのみ効果がある。選択性が低い絞り込みでは、オプティマイザはインデックスを使わない。',
    reference: '💡 Q4 asks for the index; Q36 asks what makes it actually work. Index + selectivity must go together.',
    reference_ja: '💡 Q4 はインデックスの依頼、Q36 はそれを実際に効かせる条件を問う。インデックスと選択性はセット。',
  },
  {
    id: 'sc-a-37',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 37,
    question:
      'During UAT, agents find that the case close process does not match the approved design. What should the consultant do?',
    question_ja:
      'UAT中、担当者からケースのクローズ手順が承認済みの設計と一致していないと指摘があった。コンサルタントはどうすべきか。',
    options: [
      { text: 'Update the design documentation to match what was built', text_ja: '構築された内容に合わせて設計書を更新する', correct: false, note: 'Rewriting the approved design to match a defect is the wrong direction entirely.', note_ja: '不具合に合わせて承認済みの設計を書き換えるのは、方向がまったく逆。' },
      { text: 'Fix the configuration to match the approved design and retest', text_ja: '承認済みの設計に合わせて構成を修正し、再テストする', correct: true, note: 'Correct. UAT exists to find exactly this, and the approved design is the reference point.', note_ja: '正解。UAT はまさにこれを発見するために存在し、承認済みの設計が基準となる。' },
      { text: 'Ask agents to adapt their process to the current build', text_ja: '担当者に現状の構築内容に合わせて業務手順を変えてもらう', correct: false, note: 'Pushes the cost of a build error onto users and abandons the agreed design.', note_ja: '構築ミスのコストを利用者に押し付け、合意した設計を放棄することになる。' },
      { text: 'Escalate to the project sponsor to decide whether to proceed', text_ja: '続行するかどうかをプロジェクトスポンサーに判断してもらうためエスカレーションする', correct: false, note: 'Escalation is for genuine scope or priority decisions, not for a straightforward build defect.', note_ja: 'エスカレーションはスコープや優先順位の判断が必要な場合のもの。単純な構築上の不具合には不要。' },
    ],
    explanation:
      'The approved design is the baseline. A mismatch found in UAT is a defect: fix the build and retest. Changing documentation or asking users to adapt both abandon the agreement.',
    explanation_ja:
      '承認済みの設計が基準線である。UAT で見つかった不一致は不具合であり、構築を修正して再テストする。文書の書き換えも、利用者に合わせてもらうことも、合意の放棄にあたる。',
    reference: '💡 Distinguish a defect (does not match the agreed design → fix) from a change request (design itself needs to change → govern it, see Q5).',
    reference_ja: '💡 不具合（合意した設計と違う→修正）と変更要求（設計自体を変える必要→統制して扱う。Q5参照）を区別する。',
  },
  {
    id: 'sc-a-38',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 38,
    question:
      'A company has 10 back-office staff who need read-only access to case records for reference only. They never handle cases. Which license is most cost-effective?',
    question_ja:
      'ある企業には、参照目的でケースレコードへの読み取り専用アクセスが必要なバックオフィス職員が10名いる。ケース対応は一切行わない。最もコスト効率の良いライセンスはどれか。',
    options: [
      { text: 'Service Cloud User license', text_ja: 'Service Cloud User ライセンス', correct: false, note: 'The most expensive option, and its case-handling capability is unused.', note_ja: '最も高価であり、ケース対応の機能は使われないまま。' },
      { text: 'Salesforce Platform license', text_ja: 'Salesforce Platform ライセンス', correct: true, note: 'Correct. The cheapest internal license that still gives read access to case data for reference.', note_ja: '正解。参照目的でケースデータへの読み取りアクセスを与えられる、最も安価な社内ライセンス。' },
      { text: 'Chatter Free license', text_ja: 'Chatter Free ライセンス', correct: false, note: 'No access to standard CRM records at all.', note_ja: '標準のCRMレコードにはまったくアクセスできない。' },
      { text: 'Guest User license', text_ja: 'Guest User ライセンス', correct: false, note: 'For unauthenticated external visitors, not internal employees.', note_ja: '未認証の外部訪問者向けであり、社内の従業員向けではない。' },
    ],
    explanation:
      'License selection is a cost-versus-need judgement. Internal staff who only read case data do not need the full Service Cloud User license; the Platform license is the cost-effective choice.',
    explanation_ja:
      'ライセンス選定はコストと必要機能の判断である。ケースデータを参照するだけの社内職員に Service Cloud User ライセンスは不要で、Platform ライセンスがコスト効率の良い選択になる。',
    reference: '💡 Internal + full case handling → Service Cloud User. Internal + read/reference → Platform. External customers → Customer Community.',
    reference_ja: '💡 社内＋ケース対応あり→Service Cloud User。社内＋参照のみ→Platform。社外の顧客→Customer Community。',
  },
  {
    id: 'sc-a-39',
    domain: 'sc-console',
    type: 'mcq',
    source: 'official',
    examOrder: 39,
    question:
      'An agent needs to see a customer\'s open cases and contact history in a sidebar panel while working a case, without opening separate tabs. Which feature provides this?',
    question_ja:
      '担当者がケース対応中に、別タブを開かずにサイドバーのパネルで顧客の未解決ケースと問い合わせ履歴を確認したい。これを提供する機能はどれか。',
    options: [
      { text: 'Highlights Panel', text_ja: 'ハイライトパネル', correct: false, note: 'Shows key fields of the current record at the top; it does not list related records.', note_ja: '現在のレコードの主要項目を上部に表示するもので、関連レコードの一覧は表示しない。' },
      { text: 'Related Records component', text_ja: '関連レコードコンポーネント', correct: true, note: 'Correct. It surfaces related records such as other open cases directly in a console sidebar panel.', note_ja: '正解。他の未解決ケースなどの関連レコードを、コンソールのサイドバーパネルに直接表示する。' },
      { text: 'Utility Bar', text_ja: 'ユーティリティバー', correct: false, note: 'Hosts persistent app-level tools at the footer, not record-related sidebar content.', note_ja: 'フッターに常駐するアプリ全体のツールを配置する場所で、レコード関連のサイドバー表示ではない。' },
      { text: 'Split View', text_ja: '分割ビュー', correct: false, note: 'Shows a list of records alongside one record — helpful for working a queue, not for related context.', note_ja: 'レコード一覧と1件の詳細を並べて表示する。キュー処理には便利だが、関連する文脈の表示ではない。' },
    ],
    explanation:
      'The Related Records component displays related records within the record page or console sidebar, giving agents context without tab switching. Highlights Panel is for the current record\'s key fields.',
    explanation_ja:
      '関連レコードコンポーネントは、レコードページやコンソールのサイドバー内に関連レコードを表示し、タブを切り替えずに文脈を把握できるようにする。ハイライトパネルは現在のレコードの主要項目用。',
    reference: '💡 Console layout: Highlights Panel = key fields of this record. Related Records = other records. Utility Bar = persistent tools.',
    reference_ja: '💡 コンソールの構成：ハイライトパネル＝このレコードの主要項目。関連レコード＝他のレコード。ユーティリティバー＝常駐ツール。',
  },
  {
    id: 'sc-a-40',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 40,
    question:
      'A company has implemented Social Customer Service for Twitter. Which type of content should NOT automatically create a case?',
    question_ja:
      'ある企業が Twitter 向けに Social Customer Service を導入した。自動的にケースを作成すべきでないコンテンツはどれか。',
    options: [
      { text: 'Direct messages from customers requesting support', text_ja: 'サポートを求める顧客からのダイレクトメッセージ', correct: false, note: 'A clear support request that should become a case.', note_ja: '明確なサポート依頼であり、ケース化すべきもの。' },
      { text: 'Public mentions with a complaint', text_ja: '苦情を含む公開のメンション', correct: false, note: 'A complaint needs a response and tracking, so it should create a case.', note_ja: '苦情は対応と追跡が必要であり、ケースを作成すべき。' },
      { text: 'Retweets of the company\'s own promotional posts', text_ja: '自社の販促投稿のリツイート', correct: true, note: 'Correct. Retweets are engagement with marketing content and carry no service request.', note_ja: '正解。リツイートはマーケティングコンテンツへの反応であり、サービス上の依頼を含まない。' },
      { text: 'Replies to the company support Twitter account', text_ja: '自社サポート用 Twitter アカウントへの返信', correct: false, note: 'A direct interaction with support that warrants a case.', note_ja: 'サポートとの直接的なやり取りであり、ケース化に値する。' },
    ],
    explanation:
      'Monitoring rules should create cases only for content requiring a service response. Retweets of promotional content are marketing engagement and would flood the queue with noise.',
    explanation_ja:
      '監視ルールは、サービス対応を要するコンテンツに対してのみケースを作成すべきである。販促投稿のリツイートはマーケティング上の反応であり、ケース化すればキューがノイズで溢れる。',
    reference: '💡 Social case-creation design: is there an implied service request? If not, monitor without creating a case.',
    reference_ja: '💡 ソーシャルのケース作成設計：サービス上の依頼が含意されているか。含意がなければ、ケースを作らず監視のみ。',
  },
  {
    id: 'sc-a-41',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 41,
    question:
      'A company wants to measure whether agents are using the knowledge base to resolve cases. Which metric should be tracked?',
    question_ja:
      'ある企業は、担当者がケース解決にナレッジベースを活用しているかを測定したい。追跡すべき指標はどれか。',
    options: [
      { text: 'Number of knowledge articles published per month', text_ja: '月あたりのナレッジ記事公開数', correct: false, note: 'Measures content production, not agent usage.', note_ja: 'コンテンツの生産量を測るもので、担当者の利用状況ではない。' },
      { text: 'Percentage of closed cases with an attached knowledge article', text_ja: 'ナレッジ記事が添付されたクローズ済みケースの割合', correct: true, note: 'Correct. Article attachment on closed cases directly evidences use in resolution.', note_ja: '正解。クローズ済みケースへの記事添付は、解決過程での利用を直接示す。' },
      { text: 'Average knowledge article rating', text_ja: 'ナレッジ記事の平均評価', correct: false, note: 'Measures perceived quality, not whether articles were used.', note_ja: '記事の主観的な品質を測るもので、利用されたかどうかは分からない。' },
      { text: 'Number of searches performed in the knowledge base', text_ja: 'ナレッジベースでの検索実行回数', correct: false, note: 'Shows searching, but not whether an article actually helped resolve a case.', note_ja: '検索されたことは分かるが、記事が実際に解決に役立ったかは分からない。' },
    ],
    explanation:
      'Attachment rate on closed cases links knowledge to actual case resolution. Publication counts, ratings and search volume all measure activity around the knowledge base rather than its use in resolving cases.',
    explanation_ja:
      'クローズ済みケースへの添付率は、ナレッジと実際のケース解決を結びつける。公開数・評価・検索回数はいずれも、ナレッジベース周辺の活動量を測るもので、解決への活用度ではない。',
    reference: '💡 Q41 measures agent adoption; Q59 measures article effectiveness. Attachment rate vs attachment-without-reopen.',
    reference_ja: '💡 Q41 は担当者の定着度、Q59 は記事の有効性を測る。添付率と「添付かつ再オープンなし」の違い。',
  },
  {
    id: 'sc-a-42',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 42,
    question:
      'A company Web-to-Case form is receiving 6,000 submissions per day. What should the consultant advise the team about?',
    question_ja:
      'ある企業の Web-to-Case フォームが1日あたり6,000件の送信を受け付けている。コンサルタントがチームに助言すべき内容はどれか。',
    options: [
      { text: 'Web-to-Case supports unlimited daily submissions', text_ja: 'Web-to-Case の1日あたりの送信数は無制限である', correct: false, note: 'There is a documented daily limit.', note_ja: '1日あたりの上限は仕様として定められている。' },
      { text: 'Web-to-Case has a default limit of 5,000 cases per day and excess submissions will not create cases', text_ja: 'Web-to-Case には既定で1日5,000件の上限があり、超過分はケースを作成しない', correct: true, note: 'Correct. Above the limit, submissions do not become cases — silently losing customer requests.', note_ja: '正解。上限を超えた送信はケースにならず、顧客の依頼が気づかれないまま失われる。' },
      { text: 'Submissions above 5,000 are queued and processed the next day', text_ja: '5,000件を超える送信はキューに入り翌日処理される', correct: false, note: 'There is no overflow queue; excess submissions are simply not converted.', note_ja: '超過分を溜めるキューは存在せず、単に変換されない。' },
      { text: 'The daily limit can be increased by purchasing additional licenses', text_ja: '追加ライセンスの購入で1日あたりの上限を引き上げられる', correct: false, note: 'The limit is not license-based; an increase is requested from Salesforce.', note_ja: '上限はライセンスに連動しておらず、引き上げは Salesforce への依頼で行う。' },
    ],
    explanation:
      'Web-to-Case has a default daily limit of 5,000 cases. At 6,000 submissions per day, roughly a thousand customer requests would silently fail to create cases — a risk the consultant must raise.',
    explanation_ja:
      'Web-to-Case には既定で1日5,000件の上限がある。1日6,000件の送信では、約1,000件の顧客依頼が気づかれないままケース化されない。コンサルタントが必ず提起すべきリスクである。',
    reference: '💡 Volume-limit questions: the failure is silent. Design an alternative intake path (API, Experience Cloud) above the limit.',
    reference_ja: '💡 上限系の設問では失敗が「無言」で起きる点が要点。上限超過分は別の受付経路（API、Experience Cloud）を設計する。',
  },
  {
    id: 'sc-a-43',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 43,
    question:
      'A consultant is planning training for 200 agents going live in three weeks. Which approach should be recommended?',
    question_ja:
      'コンサルタントが、3週間後に稼働開始する200名の担当者向けのトレーニングを計画している。推奨すべきアプローチはどれか。',
    options: [
      { text: 'Train all agents immediately to maximize preparation time', text_ja: '準備期間を最大化するため、ただちに全担当者をトレーニングする', correct: false, note: 'Training three weeks early against an unfinished build means much of it will be forgotten or wrong.', note_ja: '未完成の構築に対して3週間前に実施すると、内容の多くが忘れられるか誤りになる。' },
      { text: 'Conduct train-the-trainer sessions now and deliver agent training in the week before go-live', text_ja: 'いまトレーナー育成セッションを実施し、担当者向けトレーニングは稼働直前の週に行う', correct: true, note: 'Correct. Scales to 200 people and keeps the knowledge fresh at go-live.', note_ja: '正解。200名規模に対応でき、稼働時点で知識が新鮮な状態を保てる。' },
      { text: 'Provide self-paced Trailhead modules as the only training resource', text_ja: '自習型の Trailhead モジュールのみをトレーニング資源として提供する', correct: false, note: 'Generic content cannot cover the org-specific process the agents will actually follow.', note_ja: '汎用コンテンツでは、担当者が実際に従う組織固有の業務手順をカバーできない。' },
      { text: 'Train agents on go-live day using the live production environment', text_ja: '稼働当日に本番環境を使って担当者をトレーニングする', correct: false, note: 'Training on live customer data on the busiest day is high risk.', note_ja: '最も忙しい日に実顧客データで訓練するのはリスクが高い。' },
    ],
    explanation:
      'Train-the-trainer scales to large agent populations, and delivering agent training close to go-live keeps it fresh while the build is stable. Self-paced generic content alone cannot cover org-specific process.',
    explanation_ja:
      'トレーナー育成方式は大人数に対応でき、担当者向けトレーニングを稼働直前に行えば、構築が安定した状態で知識を新鮮に保てる。汎用の自習コンテンツだけでは組織固有の手順をカバーできない。',
    reference: '💡 Large populations → train-the-trainer. Timing → close to go-live, on a stable build, in a sandbox with realistic data.',
    reference_ja: '💡 大人数→トレーナー育成方式。時期→稼働直前、構築が安定した状態で、現実的なデータのサンドボックスを使う。',
  },
  {
    id: 'sc-a-44',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 44,
    question:
      'A company wants cases created from Live Agent chat to automatically capture the chat transcript. What configuration is required?',
    question_ja:
      'ある企業は、Live Agent のチャットから作成されたケースにチャットのトランスクリプトを自動的に取り込みたい。必要な構成はどれか。',
    options: [
      { text: 'A custom flow that copies chat content to the case description', text_ja: 'チャット内容をケースの説明欄にコピーするカスタムフロー', correct: false, note: 'Unnecessary custom work — the transcript is already related to the case as a record.', note_ja: '不要なカスタム作業。トランスクリプトはすでにレコードとしてケースに関連付けられる。' },
      { text: 'This happens automatically when the chat session ends and a case is created', text_ja: 'チャットセッション終了時にケースが作成されると自動的に行われる', correct: true, note: 'Correct. The Live Chat Transcript record is created and linked to the case without extra configuration.', note_ja: '正解。Live Chat Transcript レコードが作成され、追加設定なしでケースに関連付けられる。' },
      { text: 'The agent must manually copy and paste the transcript before closing', text_ja: '担当者がクローズ前に手動でトランスクリプトをコピー＆ペーストする必要がある', correct: false, note: 'Manual, error-prone and unnecessary.', note_ja: '手作業で誤りが起きやすく、そもそも不要。' },
      { text: 'A Salesforce Connect integration with Live Agent transcript storage', text_ja: 'Live Agent のトランスクリプト保存との Salesforce Connect 連携', correct: false, note: 'Transcripts are stored natively in Salesforce; no external data connection is involved.', note_ja: 'トランスクリプトは Salesforce 内にネイティブに保存され、外部データ連携は関係ない。' },
    ],
    explanation:
      'A Live Chat Transcript record is created when the chat session ends and is related to the case automatically. Recognising which behaviour is out of the box prevents unnecessary custom build.',
    explanation_ja:
      'チャットセッション終了時に Live Chat Transcript レコードが作成され、自動的にケースへ関連付けられる。標準で提供される動作を把握しておくことが、不要なカスタム構築を防ぐ。',
    reference: '💡 Before designing custom automation, check whether the platform already does it. Consultant exams penalise unnecessary build.',
    reference_ja: '💡 カスタム自動化を設計する前に、標準で実現済みかを確認する。コンサルタント試験は不要な作り込みを減点する。',
  },
  {
    id: 'sc-a-45',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 45,
    question:
      'After deploying Email-to-Case, agents notice that customer replies are creating new cases instead of updating existing ones. What must be configured to prevent this?',
    question_ja:
      'Email-to-Case の展開後、顧客からの返信が既存ケースを更新せず新規ケースを作成してしまうと担当者が気づいた。これを防ぐために構成すべきものはどれか。',
    options: [
      { text: 'Case auto-response rules', text_ja: 'ケース自動応答ルール', correct: false, note: 'Sends acknowledgement emails; it has nothing to do with matching replies to cases.', note_ja: '受付確認メールを送る機能であり、返信をケースに紐づけることとは無関係。' },
      { text: 'Email threading through subject line or email header', text_ja: '件名またはメールヘッダーによるメールのスレッド化', correct: true, note: 'Correct. Threading tokens let Salesforce match the reply back to the originating case.', note_ja: '正解。スレッド化のトークンにより、Salesforce が返信を元のケースに突き合わせられる。' },
      { text: 'An assignment rule that routes replies to the original case owner', text_ja: '返信を元のケース所有者にルーティングする割り当てルール', correct: false, note: 'Routing decides ownership after a case exists; it does not prevent a new case being created.', note_ja: 'ルーティングはケース作成後の所有者を決めるもので、新規ケースの作成自体は防げない。' },
      { text: 'A duplicate rule on the Case object', text_ja: 'Case オブジェクトの重複ルール', correct: false, note: 'Duplicate rules compare field values; they do not thread email conversations.', note_ja: '重複ルールは項目値を比較するもので、メールの会話をスレッド化するものではない。' },
    ],
    explanation:
      'Email threading uses a token in the subject line or email headers so Salesforce can associate a reply with the original case. Without it, every reply looks like a new inbound email.',
    explanation_ja:
      'メールのスレッド化は、件名やメールヘッダー内のトークンを用いて返信を元のケースに関連付ける。これがないと、すべての返信が新しい受信メールとして扱われる。',
    reference: '💡 Header-based threading is more robust than subject-line tokens because customers often edit the subject.',
    reference_ja: '💡 顧客は件名を書き換えることが多いため、ヘッダーによるスレッド化のほうが件名トークンより堅牢。',
  },
  {
    id: 'sc-a-46',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 46,
    question:
      'A contact center manager needs to report on average handle time including phone hold time. Where must this data come from?',
    question_ja:
      'コンタクトセンターのマネージャーが、電話の保留時間を含む平均処理時間（AHT）をレポートしたい。このデータはどこから取得する必要があるか。',
    options: [
      { text: 'Salesforce case activity timeline', text_ja: 'Salesforce のケース活動タイムライン', correct: false, note: 'Records what happened on the case, not telephony timing such as hold duration.', note_ja: 'ケース上で起きたことは記録するが、保留時間などの通話時間情報は持たない。' },
      { text: 'The ACD telephony system', text_ja: 'ACD（自動着信分配）電話システム', correct: true, note: 'Correct. Hold time is measured by the telephony platform, so AHT including hold must come from there.', note_ja: '正解。保留時間は電話基盤側で計測されるため、保留を含むAHTはそこから取得する必要がある。' },
      { text: 'Omni-Channel work item logs', text_ja: 'Omni-Channel の作業アイテムログ', correct: false, note: 'Tracks routing and agent capacity in Salesforce, not call hold duration.', note_ja: 'Salesforce 内のルーティングと担当者キャパシティを追跡するもので、通話の保留時間ではない。' },
      { text: 'Entitlement milestone completion records', text_ja: 'エンタイトルメントのマイルストーン達成レコード', correct: false, note: 'Measures SLA compliance, not call handling time.', note_ja: 'SLAの遵守状況を測るもので、通話の処理時間ではない。' },
    ],
    explanation:
      'Hold time exists only in the telephony platform. Salesforce can report on what happens to the case, but call-level metrics such as hold duration must be sourced from (or integrated in from) the ACD.',
    explanation_ja:
      '保留時間は電話基盤側にしか存在しない。Salesforce はケースに起きたことをレポートできるが、保留時間のような通話レベルの指標は ACD から取得（または連携）する必要がある。',
    reference: '💡 Ask where the data is physically generated. Telephony metrics live in the phone system unless explicitly integrated.',
    reference_ja: '💡 データが物理的にどこで生成されるかを問う。電話系の指標は、明示的に連携しない限り電話システム側にある。',
  },
  {
    id: 'sc-a-47',
    domain: 'sc-console',
    type: 'mcq',
    source: 'official',
    examOrder: 47,
    question:
      'When an agent receives a call, the customer record appears automatically in Salesforce without the agent searching. Which feature enables this?',
    question_ja:
      '担当者が着信を受けると、検索することなく顧客レコードが Salesforce に自動表示される。これを実現する機能はどれか。',
    options: [
      { text: 'Omni-Channel push routing', text_ja: 'Omni-Channel のプッシュルーティング', correct: false, note: 'Pushes work items to agents; it does not open a record based on caller ID.', note_ja: '作業アイテムを担当者へ配信するもので、発信者番号からレコードを開くものではない。' },
      { text: 'CTI screen pop', text_ja: 'CTI スクリーンポップ', correct: true, note: 'Correct. Screen pop matches the caller and opens the relevant record automatically.', note_ja: '正解。スクリーンポップは発信者を突き合わせ、該当レコードを自動的に開く。' },
      { text: 'Einstein Case Classification', text_ja: 'Einstein Case Classification', correct: false, note: 'Predicts field values on cases; unrelated to telephony.', note_ja: 'ケースの項目値を予測する機能で、電話とは無関係。' },
      { text: 'Highlights Panel auto-population', text_ja: 'ハイライトパネルの自動入力', correct: false, note: 'Displays fields of a record already open; it does not open one.', note_ja: 'すでに開いているレコードの項目を表示するもので、レコードを開く機能ではない。' },
    ],
    explanation:
      'CTI screen pop uses the caller identifier to find and open the matching record when the call arrives. This is the standard benefit of telephony integration (Q8).',
    explanation_ja:
      'CTI スクリーンポップは着信時に発信者の識別情報を使って該当レコードを検索し、自動で開く。電話統合（Q8）による標準的な利点である。',
    reference: '💡 Screen pop behaviour (which record, what if no match, what if several) is a design decision worth specifying.',
    reference_ja: '💡 スクリーンポップの挙動（どのレコードを開くか、一致なしの場合、複数一致の場合）は明示すべき設計判断。',
  },
  {
    id: 'sc-a-48',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 48,
    question:
      'A company has completed Partial Copy Sandbox testing. The go-live plan requires a final performance test with realistic data volumes. Which sandbox should be used?',
    question_ja:
      'ある企業は Partial Copy Sandbox でのテストを完了した。稼働計画では、現実的なデータ量での最終パフォーマンステストが必要とされている。使用すべきサンドボックスはどれか。',
    options: [
      { text: 'The same Partial Copy Sandbox with additional data loaded', text_ja: '追加データを読み込んだ同じ Partial Copy Sandbox', correct: false, note: 'Hand-loaded data will not reproduce production volume or distribution.', note_ja: '手作業で読み込んだデータでは、本番のデータ量や分布を再現できない。' },
      { text: 'A Developer Pro Sandbox', text_ja: 'Developer Pro Sandbox', correct: false, note: 'Metadata only, with no production data at all.', note_ja: 'メタデータのみで、本番データはまったく含まれない。' },
      { text: 'A Full Sandbox', text_ja: 'Full Sandbox', correct: true, note: 'Correct. Only a Full Sandbox reproduces production data volume for meaningful performance testing.', note_ja: '正解。意味のあるパフォーマンステストに必要な本番データ量を再現できるのは Full Sandbox のみ。' },
      { text: 'A new Developer Sandbox refreshed from production', text_ja: '本番からリフレッシュした新しい Developer Sandbox', correct: false, note: 'A Developer Sandbox refresh still copies metadata only.', note_ja: 'Developer Sandbox のリフレッシュでもコピーされるのはメタデータのみ。' },
    ],
    explanation:
      'Performance testing requires production-equivalent data volume, which only a Full Sandbox provides. Same principle as Q12, applied to a go-live plan.',
    explanation_ja:
      'パフォーマンステストには本番同等のデータ量が必要で、それを提供できるのは Full Sandbox のみ。Q12 と同じ原則を稼働計画に適用した設問である。',
    reference: '💡 A typical path: Developer (build) → Partial Copy (functional/UAT) → Full (performance and final UAT with real volumes).',
    reference_ja: '💡 標準的な流れ：Developer（構築）→Partial Copy（機能テスト／UAT）→Full（パフォーマンスと実データ量での最終UAT）。',
  },
  {
    id: 'sc-a-49',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 49,
    question:
      'A company executive wants a single percentage showing cases resolved within SLA across all entitlement tiers. Which report type should the consultant use?',
    question_ja:
      'ある企業の経営層が、全エンタイトルメント区分を通じてSLA内に解決されたケースの割合を、単一の数値で把握したい。コンサルタントが使うべきレポートタイプはどれか。',
    options: [
      { text: 'Cases report grouped by entitlement', text_ja: 'エンタイトルメントでグループ化したケースレポート', correct: false, note: 'Groups cases but has no milestone completion data, so SLA compliance cannot be computed.', note_ja: 'ケースをグループ化するだけで、マイルストーンの達成データがないためSLA遵守率を算出できない。' },
      { text: 'Cases with Entitlements report showing milestone completion rates', text_ja: 'マイルストーン達成率を示す「エンタイトルメント付きケース」レポート', correct: true, note: 'Correct. This report type joins cases to entitlement milestone data, which is where SLA compliance lives.', note_ja: '正解。このレポートタイプはケースとエンタイトルメントのマイルストーンデータを結合する。SLA遵守率はそこにある。' },
      { text: 'Omni-Channel queue report filtered by resolution time', text_ja: '解決時間で絞り込んだ Omni-Channel キューレポート', correct: false, note: 'Routing data, unrelated to entitlement commitments.', note_ja: 'ルーティングのデータであり、エンタイトルメントのコミットメントとは無関係。' },
      { text: 'A matrix report of case status by priority', text_ja: '優先度別ケースステータスのマトリックスレポート', correct: false, note: 'Neither dimension relates to SLA compliance.', note_ja: 'どちらの軸もSLA遵守率とは関係しない。' },
    ],
    explanation:
      'SLA compliance is recorded as milestone completion on entitlements, so the report type must join cases with entitlements. Choosing a report type is about which objects you need joined.',
    explanation_ja:
      'SLAの遵守はエンタイトルメント上のマイルストーン達成として記録されるため、レポートタイプはケースとエンタイトルメントを結合するものでなければならない。レポートタイプの選択は「どのオブジェクトを結合する必要があるか」で決まる。',
    reference: '💡 Report type = which objects are joined and which fields are therefore available. Pick it from the data you need, not the chart you want.',
    reference_ja: '💡 レポートタイプ＝どのオブジェクトを結合し、結果としてどの項目が使えるか。欲しいグラフではなく、必要なデータから選ぶ。',
  },
  {
    id: 'sc-a-50',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 50,
    question:
      'A legacy system contains 80,000 duplicate customer records. What should the consultant recommend before migration?',
    question_ja:
      'あるレガシーシステムに8万件の重複顧客レコードが存在する。移行前にコンサルタントが推奨すべきことはどれか。',
    options: [
      { text: 'Migrate all records including duplicates and clean them post-migration', text_ja: '重複を含めて全レコードを移行し、移行後にクレンジングする', correct: false, note: 'Imports a known data-quality problem and makes cleanup far harder once relationships exist.', note_ja: '既知のデータ品質問題をそのまま持ち込むうえ、関連付けが発生した後のクレンジングは格段に難しくなる。' },
      { text: 'Deduplicate the source data before migration and define a field matching strategy', text_ja: '移行前にソースデータを重複排除し、項目の突合戦略を定義する', correct: true, note: 'Correct. Clean at the source and define matching rules so the load does not reintroduce duplicates.', note_ja: '正解。ソース側でクレンジングし、突合ルールを定義することで、読み込み時に重複が再発しないようにする。' },
      { text: 'Create a custom deduplication flow in Salesforce to run post-migration', text_ja: '移行後に実行するカスタム重複排除フローを Salesforce に作成する', correct: false, note: 'Custom cleanup after the fact, with related records already attached to the wrong parents.', note_ja: '事後のカスタムクレンジングであり、その時点で関連レコードが誤った親に紐づいている。' },
      { text: 'Use Salesforce duplicate rules to block duplicate imports during migration', text_ja: '移行中に重複インポートをブロックする Salesforce 重複ルールを使う', correct: false, note: 'Blocking mid-load causes partial failures and does not fix the source data.', note_ja: '読み込み中にブロックすると部分的な失敗が発生し、ソースデータの問題も解決しない。' },
    ],
    explanation:
      'Clean data before it enters Salesforce. Deduplicating at source and agreeing a field matching strategy prevents both the initial duplicates and their reintroduction, and avoids relationships being built on the wrong records.',
    explanation_ja:
      'データは Salesforce に入る前にクレンジングする。ソース側での重複排除と項目の突合戦略の合意により、初期の重複も再発も防げ、誤ったレコードに関連付けが構築される事態も避けられる。',
    reference: '💡 Migration order: profile → cleanse → map → define matching keys → load in dependency order → validate.',
    reference_ja: '💡 移行の順序：プロファイリング→クレンジング→マッピング→突合キーの定義→依存順に読み込み→検証。',
  },
  {
    id: 'sc-a-51',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 51,
    question:
      'A company wants cases from high-value accounts routed to senior agents automatically. Which combination of features achieves this?',
    question_ja:
      'ある企業は、優良顧客からのケースを自動的にシニア担当者へルーティングしたい。これを実現する機能の組み合わせはどれか。',
    options: [
      { text: 'Escalation rules based on account revenue field', text_ja: '取引先の売上高項目に基づくエスカレーションルール', correct: false, note: 'Escalation acts after time passes; it is not initial routing.', note_ja: 'エスカレーションは時間経過後に作用するもので、初回のルーティングではない。' },
      { text: 'Assignment rules with criteria matching account tier, routing to a senior agent queue', text_ja: '取引先の区分に一致する条件を持つ割り当てルールで、シニア担当者のキューへルーティングする', correct: true, note: 'Correct. Assignment rules evaluate criteria at case creation and set the owner — declarative and immediate.', note_ja: '正解。割り当てルールはケース作成時に条件を評価して所有者を設定する。宣言的かつ即座に効く。' },
      { text: 'Omni-Channel skills-based routing with account value as a skill', text_ja: '取引先の価値をスキルとして扱う Omni-Channel スキルベースルーティング', correct: false, note: 'Skills describe agent capabilities, not attributes of the customer record.', note_ja: 'スキルは担当者の能力を表すもので、顧客レコードの属性ではない。' },
      { text: 'Einstein Case Routing trained on account value field', text_ja: '取引先価値項目で学習させた Einstein Case Routing', correct: false, note: 'A deterministic rule already expresses this cleanly; AI adds cost and opacity.', note_ja: '決定的なルールで明確に表現できる要件であり、AIはコストと不透明さを増やすだけ。' },
    ],
    explanation:
      'Routing on a known record attribute at creation time is exactly what assignment rules do. Skills describe what an agent can do; escalation reacts to elapsed time; AI routing is disproportionate for a deterministic rule.',
    explanation_ja:
      '作成時点で既知のレコード属性に基づくルーティングは、まさに割り当てルールの役割である。スキルは担当者の能力を表し、エスカレーションは経過時間に反応する。決定的なルールで足りる要件にAIルーティングは過剰。',
    reference: '💡 Record attribute known at creation → assignment rules. Agent capability needed → skills-based routing.',
    reference_ja: '💡 作成時に判明しているレコード属性→割り当てルール。担当者の能力要件→スキルベースルーティング。',
  },
  {
    id: 'sc-a-52',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 52,
    question:
      'A B2C company expects 100,000 monthly portal users who only need to submit and track cases. Which Experience Cloud license is appropriate?',
    question_ja:
      'あるB2C企業では、ケースの起票と追跡のみを行う月間10万人のポータルユーザーを見込んでいる。適切な Experience Cloud ライセンスはどれか。',
    options: [
      { text: 'Partner Community license', text_ja: 'Partner Community ライセンス', correct: false, note: 'For channel partners needing sales objects such as leads and opportunities.', note_ja: 'リードや商談などの営業オブジェクトを必要とするチャネルパートナー向け。' },
      { text: 'Customer Community Plus license', text_ja: 'Customer Community Plus ライセンス', correct: false, note: 'Adds roles, sharing and reports — capability these users do not need, at higher cost.', note_ja: 'ロール、共有、レポートが追加されるが、このユーザーには不要な機能でありコストも高い。' },
      { text: 'Customer Community license', text_ja: 'Customer Community ライセンス', correct: true, note: 'Correct. Designed for high-volume B2C self-service: submit and track cases, read knowledge.', note_ja: '正解。大量のB2Cセルフサービス向け。ケースの起票・追跡とナレッジ閲覧ができる。' },
      { text: 'Salesforce Platform license', text_ja: 'Salesforce Platform ライセンス', correct: false, note: 'An internal license; it is not for external community users.', note_ja: '社内向けライセンスであり、外部のコミュニティユーザー向けではない。' },
    ],
    explanation:
      'Customer Community is the high-volume B2C license for self-service case submission and knowledge access. Customer Community Plus adds roles, sharing and reporting for scenarios that need them; Partner Community is for channel sales.',
    explanation_ja:
      'Customer Community は、セルフサービスでのケース起票とナレッジ閲覧向けの大量B2Cライセンスである。Customer Community Plus はロール・共有・レポートが必要な場合に、Partner Community はチャネル営業向けに使う。',
    reference: '💡 High volume + simple case/knowledge access → Customer Community. Need roles/sharing/reports → Plus. Sales objects → Partner.',
    reference_ja: '💡 大量＋ケース／ナレッジの単純な利用→Customer Community。ロール・共有・レポートが必要→Plus。営業オブジェクト→Partner。',
  },
  {
    id: 'sc-a-53',
    domain: 'sc-console',
    type: 'mcq',
    source: 'official',
    examOrder: 53,
    question:
      'A company wants agents to always see Priority, Entitlement, and Account Name at the top of every case record without scrolling. Where should these fields be configured?',
    question_ja:
      'ある企業は、担当者がスクロールせずに、すべてのケースレコードの上部で優先度・エンタイトルメント・取引先名を常に確認できるようにしたい。これらの項目はどこで構成すべきか。',
    options: [
      { text: 'As required fields in the page layout', text_ja: 'ページレイアウトの必須項目として', correct: false, note: 'Required controls data entry, not where fields appear on screen.', note_ja: '必須指定はデータ入力を制御するもので、画面上の表示位置とは無関係。' },
      { text: 'In the Highlights Panel of the case page layout', text_ja: 'ケースのページレイアウトのハイライトパネル内に', correct: true, note: 'Correct. The Highlights Panel pins key fields to the top of the record, always visible.', note_ja: '正解。ハイライトパネルは主要項目をレコード上部に固定表示し、常に見える状態にする。' },
      { text: 'As compact layout fields', text_ja: 'コンパクトレイアウトの項目として', correct: false, note: 'Compact layouts drive mobile and hover previews; the console top strip is the Highlights Panel.', note_ja: 'コンパクトレイアウトはモバイルやホバー時のプレビューを制御する。コンソール上部の帯はハイライトパネル。' },
      { text: 'As pinned fields in the related records component', text_ja: '関連レコードコンポーネントの固定項目として', correct: false, note: 'That component shows related records, not fields of the current case.', note_ja: 'そのコンポーネントは関連レコードを表示するもので、現在のケースの項目ではない。' },
    ],
    explanation:
      'The Highlights Panel is the fixed strip at the top of the record showing the fields agents need at a glance. It is configured from the page layout.',
    explanation_ja:
      'ハイライトパネルはレコード上部の固定領域で、担当者が一目で把握すべき項目を表示する。ページレイアウトから構成する。',
    reference: '💡 Highlights Panel = the console top strip. Compact layout = mobile header and hover previews. Related to each other but not the same.',
    reference_ja: '💡 ハイライトパネル＝コンソール上部の帯。コンパクトレイアウト＝モバイルのヘッダーとホバープレビュー。関連はあるが別物。',
  },
  {
    id: 'sc-a-54',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 54,
    question:
      'A nightly batch integration updates 50,000 case records. A flow triggered on each update sends an email to the case owner. The integration runs but no emails are sent. What is the most likely cause?',
    question_ja:
      '夜間のバッチ連携が5万件のケースレコードを更新する。各更新で起動するフローがケース所有者へメールを送信する。連携は実行されるがメールが送信されない。最も可能性の高い原因はどれか。',
    options: [
      { text: 'Flows do not trigger during bulk data operations', text_ja: '一括データ操作中はフローが起動しない', correct: false, note: 'Flows do run on bulk DML; this is a common misconception.', note_ja: 'フローは一括DMLでも実行される。よくある誤解。' },
      { text: 'The email sending limit was exceeded during the batch run', text_ja: 'バッチ実行中にメール送信の上限を超えた', correct: true, note: 'Correct. Daily single-email limits are easily exhausted by a 50,000-record batch, and sends fail silently.', note_ja: '正解。5万件のバッチでは1日あたりの単一メール送信上限を容易に使い切り、送信は静かに失敗する。' },
      { text: 'The flow is deactivated for system integrations', text_ja: 'システム連携向けにフローが無効化されている', correct: false, note: 'Flows cannot be selectively deactivated per integration user in this way.', note_ja: 'フローを連携ユーザーごとに選択的に無効化するような仕組みは存在しない。' },
      { text: 'Bulk operations suppress flow-triggered email alerts by default', text_ja: '一括操作では既定でフロー起動のメールアラートが抑止される', correct: false, note: 'No such default suppression exists.', note_ja: 'そのような既定の抑止動作は存在しない。' },
    ],
    explanation:
      'Salesforce enforces a daily limit on single emails sent to external addresses. A 50,000-record nightly batch will exhaust it, after which sends fail without stopping the integration.',
    explanation_ja:
      'Salesforce は外部アドレス宛の単一メール送信に1日あたりの上限を設けている。5万件の夜間バッチではこれを使い切り、以降の送信は連携を止めることなく失敗する。',
    reference: '💡 Governor limits are the usual explanation for "it ran but nothing happened" in high-volume integrations.',
    reference_ja: '💡 大量データ連携で「実行されたのに何も起きない」の原因は、たいていガバナ制限。',
  },
  {
    id: 'sc-a-55',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 55,
    question:
      'A company is implementing Knowledge-Centered Support. Which practice is most central to KCS adoption?',
    question_ja:
      'ある企業が Knowledge-Centered Support（KCS）を導入しようとしている。KCS の定着において最も中心となる実践はどれか。',
    options: [
      { text: 'Agents publish a new article for every resolved case', text_ja: '担当者が解決したケースごとに新しい記事を公開する', correct: false, note: 'Produces enormous duplication. KCS reuses and improves existing articles first.', note_ja: '膨大な重複を生む。KCS はまず既存記事の再利用と改善を行う。' },
      { text: 'Agents search Knowledge before working a case and attach or create articles as part of the resolution workflow', text_ja: '担当者はケース対応前にナレッジを検索し、解決の流れの中で記事を添付または作成する', correct: true, note: 'Correct. KCS embeds capture and reuse into the workflow rather than treating it as a separate task.', note_ja: '正解。KCS は知識の蓄積と再利用を別作業ではなく業務フローそのものに組み込む。' },
      { text: 'Agents review and archive articles not used in 30 days', text_ja: '30日間使われていない記事を担当者がレビューしてアーカイブする', correct: false, note: 'Housekeeping, and 30 days is far too aggressive for seasonal issues.', note_ja: '整理作業にすぎず、季節性のある問題を考えると30日は短すぎる。' },
      { text: 'Knowledge managers review and publish all articles within 24 hours', text_ja: 'ナレッジ管理者が24時間以内にすべての記事をレビューして公開する', correct: false, note: 'Centralising review through managers is the bottleneck KCS is designed to remove.', note_ja: '管理者にレビューを集中させるのは、KCS が解消しようとしているボトルネックそのもの。' },
    ],
    explanation:
      'KCS makes knowledge a by-product of solving cases: search first, reuse what exists, improve it, and create only when nothing fits. Centralised authoring and review is the model KCS replaces.',
    explanation_ja:
      'KCS は知識をケース解決の副産物として生み出す。まず検索し、既存を再利用し、改善し、該当がない場合にのみ新規作成する。集中的な執筆・レビュー体制は、KCS が置き換えようとしているモデルである。',
    reference: '💡 KCS in one line: capture in the workflow, reuse before creating, improve on use, and let demand drive quality.',
    reference_ja: '💡 KCS を一言で：業務フローの中で蓄積し、作る前に再利用し、使うたびに改善し、需要に品質を決めさせる。',
  },
  {
    id: 'sc-a-56',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 56,
    question:
      'An Experience Cloud portal has guest users submitting cases. The company wants to prevent guests from seeing other customers\' cases. Which mechanism controls this?',
    question_ja:
      'Experience Cloud ポータルでゲストユーザーがケースを起票している。同社は、ゲストが他の顧客のケースを閲覧できないようにしたい。これを制御する仕組みはどれか。',
    options: [
      { text: 'Profile-based sharing settings', text_ja: 'プロファイルベースの共有設定', correct: false, note: 'Profiles control object and field permissions, not record-level visibility.', note_ja: 'プロファイルはオブジェクトと項目の権限を制御するもので、レコードレベルの可視性ではない。' },
      { text: 'Org-wide default set to Private on the Case object', text_ja: 'Case オブジェクトの組織の共有設定を「非公開」にする', correct: true, note: 'Correct. OWD Private is the baseline that stops users seeing records they do not own.', note_ja: '正解。OWD を「非公開」にすることが、自分の所有でないレコードを見せない基準線になる。' },
      { text: 'A sharing rule granting guest users access to their own cases only', text_ja: 'ゲストユーザーに自分のケースのみへのアクセスを付与する共有ルール', correct: false, note: 'Sharing rules only widen access; they cannot restrict it.', note_ja: '共有ルールはアクセスを広げるだけで、制限することはできない。' },
      { text: 'A permission set restricting case visibility to self-created records', text_ja: '自分が作成したレコードのみにケースの可視性を制限する権限セット', correct: false, note: 'Permission sets grant permissions; they never restrict record visibility.', note_ja: '権限セットは権限を付与するもので、レコードの可視性を制限することはない。' },
    ],
    explanation:
      'Record visibility starts with the org-wide default. Setting Case to Private means users see only records they own or that are shared with them. Sharing rules and permission sets only ever widen access from that baseline.',
    explanation_ja:
      'レコードの可視性は組織の共有設定（OWD）から始まる。Case を「非公開」にすると、ユーザーは自分が所有するレコードと共有されたレコードのみを見る。共有ルールと権限セットは、その基準線からアクセスを広げる方向にしか働かない。',
    reference: '💡 Sharing model: OWD is the floor. Everything else (role hierarchy, sharing rules, manual sharing) opens access up, never down.',
    reference_ja: '💡 共有モデル：OWD が下限。他のすべて（ロール階層、共有ルール、手動共有）はアクセスを広げる方向にのみ働く。',
  },
  {
    id: 'sc-a-57',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 57,
    question:
      'A company is deploying Service Cloud to a team in a highly regulated industry. Which sandbox consideration is most important?',
    question_ja:
      'ある企業が、規制の厳しい業界のチームへ Service Cloud を展開しようとしている。サンドボックスに関して最も重要な考慮点はどれか。',
    options: [
      { text: 'Use a Developer Sandbox for all testing to minimize cost', text_ja: 'コストを抑えるためすべてのテストを Developer Sandbox で行う', correct: false, note: 'No production data, so compliance scenarios cannot be tested realistically.', note_ja: '本番データがないため、コンプライアンスのシナリオを現実的にテストできない。' },
      { text: 'Use a Full Sandbox for UAT to test with production-equivalent compliant data', text_ja: '本番同等のコンプライアンス要件を満たすデータで UAT を行うため Full Sandbox を使う', correct: true, note: 'Correct. Regulated environments need UAT against production-equivalent data, with masking applied as required.', note_ja: '正解。規制環境では本番同等のデータでの UAT が必要で、必要に応じてマスキングを適用する。' },
      { text: 'Skip sandboxes and deploy directly with a rollback plan', text_ja: 'サンドボックスを省略し、切り戻し計画を用意して直接デプロイする', correct: false, note: 'Unacceptable anywhere, and especially in a regulated industry.', note_ja: 'どのような環境でも許容されず、規制業界ではなおさら不可。' },
      { text: 'Use a Partial Copy Sandbox for all phases including performance testing', text_ja: 'パフォーマンステストを含むすべてのフェーズで Partial Copy Sandbox を使う', correct: false, note: 'Sample data is insufficient for performance testing (Q48).', note_ja: 'サンプルデータではパフォーマンステストに不十分（Q48）。' },
    ],
    explanation:
      'Regulated industries need UAT against production-equivalent data so compliance behaviour is genuinely exercised. A Full Sandbox provides that, with data masking applied where regulation requires it.',
    explanation_ja:
      '規制業界では、コンプライアンス上の挙動を実際に検証するため、本番同等のデータでの UAT が必要になる。Full Sandbox がそれを提供し、規制上必要な箇所にはデータマスキングを適用する。',
    reference: '💡 Full Sandbox copies real data — apply sandbox data masking so regulated data is not exposed to testers.',
    reference_ja: '💡 Full Sandbox は実データをコピーする。規制対象データがテスト担当者に露出しないよう、サンドボックスのデータマスキングを適用する。',
  },
  {
    id: 'sc-a-58',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 58,
    question:
      'A company wants relevant knowledge articles to appear automatically for agents while they work a case, without requiring manual searches. Which feature provides this?',
    question_ja:
      'ある企業は、担当者がケース対応中に、手動検索なしで関連するナレッジ記事が自動的に表示されるようにしたい。これを提供する機能はどれか。',
    options: [
      { text: 'Knowledge sidebar with manual search', text_ja: '手動検索を伴うナレッジサイドバー', correct: false, note: 'The requirement explicitly excludes manual searching.', note_ja: '要件が手動検索を明確に除外している。' },
      { text: 'Einstein Article Recommendations', text_ja: 'Einstein Article Recommendations', correct: true, note: 'Correct. It analyses case content and surfaces likely-relevant articles without the agent searching.', note_ja: '正解。ケースの内容を解析し、担当者が検索しなくても関連性の高い記事を提示する。' },
      { text: 'Data category auto-assignment based on case type', text_ja: 'ケースタイプに基づくデータカテゴリの自動割り当て', correct: false, note: 'Classifies articles for filtering; it does not recommend them per case.', note_ja: '絞り込みのために記事を分類するもので、ケースごとに推奨するわけではない。' },
      { text: 'Knowledge Promoted Search Terms', text_ja: 'ナレッジのプロモート検索語', correct: false, note: 'Boosts specific articles for specific search terms — still requires a search.', note_ja: '特定の検索語に対して特定の記事を上位に出すもので、やはり検索が前提。' },
    ],
    explanation:
      'Einstein Article Recommendations uses case content to surface relevant articles automatically. Promoted search terms and data categories both improve searching rather than removing the need for it.',
    explanation_ja:
      'Einstein Article Recommendations はケースの内容をもとに関連記事を自動的に提示する。プロモート検索語もデータカテゴリも、検索を改善するものであって検索を不要にするものではない。',
    reference: '💡 Q35 is the customer-facing version of the same feature; Q58 is the agent-facing one.',
    reference_ja: '💡 Q35 は同じ機能の顧客向け、Q58 は担当者向けの適用。',
  },
  {
    id: 'sc-a-59',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 59,
    question:
      'A company closes 200 cases per day and wants to identify which knowledge articles are most effective at resolving cases. Which metric should the consultant track?',
    question_ja:
      'ある企業は1日200件のケースをクローズしており、どのナレッジ記事がケース解決に最も効果的かを特定したい。コンサルタントが追跡すべき指標はどれか。',
    options: [
      { text: 'Article view count', text_ja: '記事の閲覧数', correct: false, note: 'Popularity, not effectiveness. A frequently viewed but unhelpful article scores well.', note_ja: '人気度であって有効性ではない。よく見られるが役に立たない記事も高く出る。' },
      { text: 'Article rating average', text_ja: '記事評価の平均', correct: false, note: 'Subjective and sparsely submitted; it does not prove the case was resolved.', note_ja: '主観的で提出数も少なく、ケースが解決したことの証明にはならない。' },
      { text: 'Percentage of closed cases where the article was attached and the case was not reopened', text_ja: '記事が添付され、かつ再オープンされなかったクローズ済みケースの割合', correct: true, note: 'Correct. Attachment plus no reopen is evidence the article genuinely resolved the issue.', note_ja: '正解。添付かつ再オープンなしは、記事が本当に問題を解決したことの証拠になる。' },
      { text: 'Number of times an article appeared in search results', text_ja: '記事が検索結果に表示された回数', correct: false, note: 'Measures retrieval, not resolution.', note_ja: '検索でヒットしたことを測るもので、解決したかは分からない。' },
    ],
    explanation:
      'Effectiveness needs an outcome, not an activity. Attachment shows the article was used; the case not being reopened shows it actually worked. Views, ratings and search appearances are all activity measures.',
    explanation_ja:
      '有効性は活動量ではなく結果で測る。添付はその記事が使われたことを示し、再オープンされていないことは実際に機能したことを示す。閲覧数・評価・検索表示回数はいずれも活動量の指標である。',
    reference: '💡 Effectiveness metrics pair a usage signal with an outcome signal. Usage alone can be high for a bad article.',
    reference_ja: '💡 有効性の指標は「利用のシグナル」と「結果のシグナル」を組み合わせる。利用量だけなら、質の低い記事でも高くなり得る。',
  },
  {
    id: 'sc-a-60',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 60,
    question:
      'A company wants all cases to automatically escalate to a manager if not resolved within 72 hours, regardless of customer tier. Which feature is most appropriate?',
    question_ja:
      'ある企業は、顧客区分にかかわらず、72時間以内に解決されないすべてのケースを自動的にマネージャーへエスカレーションしたい。最も適切な機能はどれか。',
    options: [
      { text: 'Entitlements with a 72-hour resolution milestone', text_ja: '72時間の解決マイルストーンを持つエンタイトルメント', correct: false, note: 'Entitlements exist to express *different* commitments per tier. Here the rule is uniform, so they add needless complexity.', note_ja: 'エンタイトルメントは区分ごとに「異なる」コミットメントを表現するための仕組み。ここではルールが一律なので、不要な複雑さを生む。' },
      { text: 'A case escalation rule with a 72-hour time trigger', text_ja: '72時間の時間トリガーを持つケースエスカレーションルール', correct: true, note: 'Correct. A single uniform time-based reassignment is exactly what escalation rules are for.', note_ja: '正解。一律の時間ベースでの再割り当ては、まさにエスカレーションルールの用途そのもの。' },
      { text: 'A flow with a scheduled path that fires 72 hours after case creation', text_ja: 'ケース作成の72時間後に実行されるスケジュールパスを持つフロー', correct: false, note: 'Workable, but escalation rules are the purpose-built declarative feature and handle reassignment natively.', note_ja: '実現は可能だが、エスカレーションルールが目的に合った宣言的機能で、再割り当ても標準で扱える。' },
      { text: 'An Omni-Channel routing rule that reassigns after 72 hours', text_ja: '72時間後に再割り当てを行う Omni-Channel ルーティングルール', correct: false, note: 'Omni-Channel distributes work as it arrives; it is not a time-based escalation mechanism.', note_ja: 'Omni-Channel は到着した作業を配分する仕組みで、時間ベースのエスカレーション機能ではない。' },
    ],
    explanation:
      'Uniform rule, time-based, reassign to a manager — that is a case escalation rule. Contrast with Q2, where different tiers have different commitments and warnings are needed before breach, which requires entitlements.',
    explanation_ja:
      '一律のルール、時間ベース、マネージャーへの再割り当て。これはケースエスカレーションルールである。区分ごとに異なるコミットメントがあり違反前の警告も必要な Q2 と対比すること。そちらはエンタイトルメントが必要になる。',
    reference: '💡 Same tier for everyone → escalation rule. Different commitments per tier + pre-breach warnings → entitlements + milestones.',
    reference_ja: '💡 全員同じ条件→エスカレーションルール。区分ごとに異なるコミットメント＋違反前の警告→エンタイトルメント＋マイルストーン。',
  },
]
