// 同梱の練習試験「Chapter 10: Full Practice Exam — Set A」Q1〜Q30（screenshots/Service Cloud）。
// 出題文・選択肢は原文（英語）。解説は原本の Answer Explanations（Q1〜Q20）を基に日英で作成。
export const setA1Questions = [
  {
    id: 'sc-a-1',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 1,
    question:
      'A company wants to automatically create a case when a customer calls, using information collected by the IVR. Which integration pattern applies?',
    question_ja:
      'ある企業は、IVRが収集した情報を使って、顧客からの着信時に自動的にケースを作成したい。当てはまる連携パターンはどれか。',
    options: [
      { text: 'Fire and Forget', text_ja: 'Fire and Forget（送りっぱなし）', correct: false, note: 'Salesforce would be the one sending, and no response would be awaited. Here the external system initiates.', note_ja: 'Salesforce 側が送信し、応答を待たない形。ここでは外部システムが起点になっている。' },
      { text: 'Request and Reply', text_ja: 'Request and Reply（要求と応答）', correct: false, note: 'Salesforce calls out and waits for a response. Again, the direction is wrong.', note_ja: 'Salesforce が呼び出して応答を待つ形。やはり方向が逆。' },
      { text: 'Remote Call-In', text_ja: 'Remote Call-In（外部からの呼び出し）', correct: true, note: 'Correct. The IVR initiates the call into Salesforce to create the case — an external system calling in.', note_ja: '正解。IVR が Salesforce を呼び出してケースを作成する。外部システムからの呼び出し。' },
      { text: 'Batch Data Synchronization', text_ja: 'Batch Data Synchronization（バッチ同期）', correct: false, note: 'Scheduled bulk movement of data, not a real-time per-call event.', note_ja: 'スケジュールされた一括データ移動であり、通話ごとのリアルタイムイベントではない。' },
    ],
    explanation:
      'Identify who initiates. The IVR initiates the call into Salesforce to create the case, which is Remote Call-In. Fire and Forget and Request and Reply both have Salesforce as the caller; Batch Data Synchronization is scheduled bulk movement.',
    explanation_ja:
      '「どちらが起点か」で判別する。IVR が Salesforce を呼び出してケースを作成するので Remote Call-In。Fire and Forget と Request and Reply はいずれも Salesforce が呼び出す側。Batch Data Synchronization はスケジュールされた一括移動。',
    reference: '💡 Direction test: Salesforce calls out and waits → Request and Reply. Calls out and does not wait → Fire and Forget. External system calls in → Remote Call-In.',
    reference_ja: '💡 方向で判定：Salesforce が呼び出して待つ→Request and Reply。呼び出して待たない→Fire and Forget。外部から呼ばれる→Remote Call-In。',
  },
  {
    id: 'sc-a-2',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 2,
    question:
      'A contact center has Platinum, Gold, and Standard customers with different first-response commitments. Account managers must be notified before breach. What should the consultant implement?',
    question_ja:
      'あるコンタクトセンターには Platinum・Gold・Standard の顧客区分があり、初回応答のコミットメントがそれぞれ異なる。SLA違反の前にアカウントマネージャーへ通知する必要がある。コンサルタントが実装すべきものはどれか。',
    options: [
      { text: 'Three escalation rules with time-based triggers', text_ja: '時間ベースのトリガーを持つ3つのエスカレーションルール', correct: false, note: 'Only one escalation rule can be active per object, so three active rules is not possible.', note_ja: 'エスカレーションルールはオブジェクトごとに1つしか有効化できないため、3つを同時に有効にはできない。' },
      { text: 'Entitlements with three entitlement processes and milestone actions', text_ja: '3つのエンタイトルメントプロセスとマイルストーンアクションを持つエンタイトルメント', correct: true, note: 'Correct. Entitlements model differing SLA commitments per tier, and milestone actions fire warnings before breach.', note_ja: '正解。エンタイトルメントは区分ごとに異なるSLAコミットメントを表現でき、マイルストーンアクションが違反前に警告を発火できる。' },
      { text: 'Case priority fields with workflow alerts', text_ja: 'ワークフローアラートを伴うケース優先度項目', correct: false, note: 'A priority field does not track elapsed time against a commitment or warn before breach.', note_ja: '優先度項目では、コミットメントに対する経過時間の追跡も、違反前の警告もできない。' },
      { text: 'Assignment rules that route by customer tier', text_ja: '顧客区分でルーティングする割り当てルール', correct: false, note: 'Assignment decides who owns the case; it says nothing about response time commitments.', note_ja: '割り当ては担当者を決めるだけで、応答時間のコミットメントには関与しない。' },
    ],
    explanation:
      'Three tiers with different commitments require entitlements with separate entitlement processes. Milestones track elapsed time against each commitment, and milestone actions (warning / violation / success) send notifications before breach. Three active escalation rules is not possible.',
    explanation_ja:
      '異なるコミットメントを持つ3区分には、それぞれ別のエンタイトルメントプロセスを持つエンタイトルメントが必要。マイルストーンが各コミットメントに対する経過時間を追跡し、マイルストーンアクション（警告／違反／達成）が違反前に通知を送る。有効なエスカレーションルールを3つ持つことはできない。',
    reference: '💡 SLA commitments and time-to-breach warnings → entitlements + milestones. Escalation rules are for simple time-based reassignment only.',
    reference_ja: '💡 SLAのコミットメントと違反前の警告→エンタイトルメント＋マイルストーン。エスカレーションルールは単純な時間ベースの再割り当て用。',
  },
  {
    id: 'sc-a-3',
    domain: 'sc-console',
    type: 'mcq',
    source: 'official',
    examOrder: 3,
    question:
      'An agent using Service Console cannot see the softphone. Which is the most likely configuration issue?',
    question_ja:
      'サービスコンソールを使用している担当者にソフトフォンが表示されない。最も可能性の高い構成上の問題はどれか。',
    options: [
      { text: 'The softphone is not added to the utility bar', text_ja: 'ソフトフォンがユーティリティバーに追加されていない', correct: true, note: 'Correct. In Lightning the softphone lives in the utility bar; omitting it is the most common gap.', note_ja: '正解。Lightning ではソフトフォンはユーティリティバーに置く。追加漏れが最も多い構成ミス。' },
      { text: "The agent's profile blocks telephony access", text_ja: '担当者のプロファイルが電話機能へのアクセスをブロックしている', correct: false, note: 'Possible in principle, but the call centre assignment and utility bar are checked first.', note_ja: '理屈上はあり得るが、まずコールセンターの割り当てとユーティリティバーを確認する。' },
      { text: 'Open CTI is not enabled in the org', text_ja: '組織で Open CTI が有効化されていない', correct: false, note: 'Open CTI is not a feature you toggle on; the adapter is deployed as a call centre definition.', note_ja: 'Open CTI はオン／オフする機能ではなく、アダプタをコールセンター定義として配置する。' },
      { text: 'The agent is not in the telephony queue', text_ja: '担当者が電話キューに入っていない', correct: false, note: 'Queue membership affects work distribution, not whether the softphone renders.', note_ja: 'キューのメンバーシップは作業の配分に影響するもので、ソフトフォンの表示可否とは無関係。' },
    ],
    explanation:
      'The softphone must be added to the utility bar of the console app. Missing it from the utility bar is the most common configuration gap when the softphone does not appear.',
    explanation_ja:
      'ソフトフォンはコンソールアプリのユーティリティバーに追加する必要がある。ソフトフォンが表示されない場合、ユーティリティバーへの追加漏れが最も多い構成ミスである。',
    reference: '💡 Lightning console: persistent tools (softphone, history, notes) live in the utility bar.',
    reference_ja: '💡 Lightning コンソールでは、常駐ツール（ソフトフォン、履歴、メモ）はユーティリティバーに置く。',
  },
  {
    id: 'sc-a-4',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 4,
    question:
      'A company has 8 million case records. Agents report slow list view performance when filtering by a custom status field. What should the consultant recommend?',
    question_ja:
      'ある企業には800万件のケースレコードがある。カスタムのステータス項目で絞り込むとリストビューが遅いと担当者が報告している。コンサルタントが推奨すべきものはどれか。',
    options: [
      { text: 'Archive cases older than two years', text_ja: '2年以上前のケースをアーカイブする', correct: false, note: 'Reduces volume but does not solve indexing for the active records that are still being filtered.', note_ja: 'データ量は減るが、絞り込み対象として残るアクティブなレコードのインデックス問題は解決しない。' },
      { text: 'Request a custom index on the custom status field', text_ja: 'カスタムのステータス項目にカスタムインデックスを依頼する', correct: true, note: 'Correct. A custom index lets the query optimiser use the filter efficiently at this volume.', note_ja: '正解。カスタムインデックスにより、この規模でもクエリオプティマイザが絞り込みを効率的に処理できる。' },
      { text: 'Reduce the number of fields in the list view', text_ja: 'リストビューの項目数を減らす', correct: false, note: 'Marginal rendering gain; the cost is in the filtered query, not the column count.', note_ja: '描画がわずかに軽くなる程度。負荷は絞り込みクエリ側にあり、列数ではない。' },
      { text: 'Switch to Salesforce reports instead of list views', text_ja: 'リストビューの代わりに Salesforce レポートを使う', correct: false, note: 'The same unindexed filter would be just as slow in a report.', note_ja: 'インデックスのない同じ絞り込みは、レポートでも同様に遅い。' },
    ],
    explanation:
      'A custom index on the status field enables efficient queries. Archiving reduces volume but does not solve indexing for active records, and moving to reports does not change the underlying query cost.',
    explanation_ja:
      'ステータス項目へのカスタムインデックスにより効率的なクエリが可能になる。アーカイブはデータ量を減らすがアクティブレコードのインデックス問題は解決せず、レポートへの切り替えも基礎となるクエリコストを変えない。',
    reference: '💡 Custom indexes are requested through Salesforce Support. Pair them with selective filters (see Q36).',
    reference_ja: '💡 カスタムインデックスは Salesforce サポート経由で依頼する。選択性の高い絞り込みと組み合わせて使う（Q36参照）。',
  },
  {
    id: 'sc-a-5',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 5,
    question:
      'A consultant is in the design phase when a stakeholder identifies a new requirement. What is the correct first step?',
    question_ja:
      '設計フェーズの最中に、ステークホルダーが新しい要件を提示した。正しい最初の手順はどれか。',
    options: [
      { text: 'Build the requirement immediately', text_ja: 'ただちにその要件を構築する', correct: false, note: 'Bypasses governance and lets scope grow without anyone seeing the cost.', note_ja: 'ガバナンスを迂回し、コストが誰にも見えないままスコープが膨らむ。' },
      { text: 'Document the requirement and evaluate impact on scope and timeline', text_ja: '要件を文書化し、スコープとスケジュールへの影響を評価する', correct: true, note: 'Correct. Capture it, analyse the impact, then let the decision-maker choose.', note_ja: '正解。まず記録し、影響を分析し、そのうえで意思決定者に判断してもらう。' },
      { text: 'Defer to a future project without analysis', text_ja: '分析せずに将来のプロジェクトへ先送りする', correct: false, note: 'Rejecting without analysis is as ungoverned as accepting without analysis.', note_ja: '分析せずに却下するのは、分析せずに受け入れるのと同じく統制を欠く。' },
      { text: 'Restart the requirements phase', text_ja: '要件定義フェーズをやり直す', correct: false, note: 'Wildly disproportionate to a single new requirement.', note_ja: '要件1件に対してあまりに過剰な対応。' },
    ],
    explanation:
      'Document and evaluate impact. Building immediately bypasses governance, and deferring without analysis is equally uncontrolled. The consultant supplies the impact analysis; the sponsor decides.',
    explanation_ja:
      '文書化して影響を評価する。ただちに構築するのはガバナンスの迂回であり、分析せずに先送りするのも同様に統制を欠く。コンサルタントは影響分析を提供し、判断はスポンサーが行う。',
    reference: '💡 Consultant questions reward governed change: capture → analyse impact → decision-maker approves.',
    reference_ja: '💡 コンサルタント試験は統制された変更管理を評価する。記録→影響分析→意思決定者の承認。',
  },
  {
    id: 'sc-a-6',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 6,
    question:
      'A company sells hardware. When a customer calls about a defective unit, agents need to see all previous service visits for that specific unit. Which object should be linked to the case?',
    question_ja:
      'あるハードウェア販売企業では、顧客が不良品について問い合わせた際に、その特定の個体に対する過去のすべてのサービス訪問を担当者が確認できるようにしたい。ケースに関連付けるべきオブジェクトはどれか。',
    options: [
      { text: 'Product', text_ja: 'Product（商品）', correct: false, note: 'Product describes the model or SKU, not the individual unit a customer owns.', note_ja: 'Product は型番やSKUを表すもので、顧客が所有する個体そのものではない。' },
      { text: 'Contract', text_ja: 'Contract（契約）', correct: false, note: 'Contract covers commercial terms, not the service history of a physical unit.', note_ja: 'Contract は商取引条件を扱うもので、物理的な個体のサービス履歴ではない。' },
      { text: 'Asset', text_ja: 'Asset（納入品）', correct: true, note: 'Correct. An Asset represents the specific unit owned by the customer and holds its service history.', note_ja: '正解。Asset は顧客が所有する特定の個体を表し、その個体のサービス履歴を保持する。' },
      { text: 'Entitlement', text_ja: 'Entitlement（エンタイトルメント）', correct: false, note: 'Entitlement defines the support level, not the identity of the physical unit.', note_ja: 'Entitlement はサポートレベルを定義するもので、物理的な個体の識別ではない。' },
    ],
    explanation:
      'Asset represents the specific unit owned by the customer and holds service history per unit. Product is the model; Contract is commercial terms; Entitlement is the support level.',
    explanation_ja:
      'Asset は顧客が所有する特定の個体を表し、個体ごとのサービス履歴を保持する。Product は型番、Contract は商取引条件、Entitlement はサポートレベルである。',
    reference: '💡 Product = what you sell. Asset = the individual unit a customer owns. Entitlement = the support they are due.',
    reference_ja: '💡 Product＝販売する商品。Asset＝顧客が所有する個体。Entitlement＝受けられるサポート。',
  },
  {
    id: 'sc-a-7',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 7,
    question:
      'A customer submits a chat through Einstein Bot. The bot cannot resolve the issue. What happens next?',
    question_ja:
      '顧客が Einstein Bot 経由でチャットを送信した。ボットが問題を解決できない場合、次に何が起きるか。',
    options: [
      { text: 'A new chat session is created with the agent', text_ja: '担当者との新しいチャットセッションが作成される', correct: false, note: 'A new session would lose the conversation context the bot has already gathered.', note_ja: '新しいセッションでは、ボットがすでに収集した会話の文脈が失われてしまう。' },
      { text: 'The customer is redirected to Email-to-Case', text_ja: '顧客は Email-to-Case へ誘導される', correct: false, note: 'That abandons the live channel the customer chose.', note_ja: '顧客が選んだリアルタイムのチャネルを放棄することになる。' },
      { text: 'The conversation transfers to the agent within the same session', text_ja: '同一セッション内で会話が担当者へ転送される', correct: true, note: 'Correct. The bot hands off in-session so the agent sees the full transcript and context.', note_ja: '正解。ボットは同一セッション内で引き継ぐため、担当者は全トランスクリプトと文脈を確認できる。' },
      { text: 'The customer receives a case number and is contacted later', text_ja: '顧客はケース番号を受け取り、後から連絡を受ける', correct: false, note: 'Turns a live conversation into asynchronous follow-up, which is not the bot handoff behaviour.', note_ja: 'リアルタイムの会話を非同期のフォローアップに変えてしまう。ボットの引き継ぎ動作ではない。' },
    ],
    explanation:
      'Einstein Bots transfer the conversation to a live agent within the same chat session, so the agent inherits the transcript and the context the bot collected.',
    explanation_ja:
      'Einstein Bots は同一チャットセッション内で会話を有人担当者へ転送する。担当者はトランスクリプトと、ボットが収集した文脈をそのまま引き継ぐ。',
    reference: '💡 Bot design goal: collect and qualify, then hand off with context intact. Never restart the conversation.',
    reference_ja: '💡 ボット設計の狙いは「情報収集と切り分けをしてから、文脈を保ったまま引き継ぐ」こと。会話をやり直させない。',
  },
  {
    id: 'sc-a-8',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 8,
    question: 'A company uses Cisco telephony and wants screen pop functionality. Which feature applies?',
    question_ja:
      'ある企業は Cisco の電話システムを使用しており、スクリーンポップ機能を実現したい。当てはまる機能はどれか。',
    options: [
      { text: 'Service Cloud Voice', text_ja: 'Service Cloud Voice', correct: false, note: 'Service Cloud Voice is Salesforce-native telephony, used when replacing the phone system rather than integrating an existing one.', note_ja: 'Service Cloud Voice は Salesforce ネイティブの電話機能で、既存システムを統合するのではなく置き換える場合に使う。' },
      { text: 'Open CTI with Cisco adapter', text_ja: 'Cisco アダプタを用いた Open CTI', correct: true, note: 'Correct. Open CTI integrates the existing Cisco system into the console, delivering the screen pop.', note_ja: '正解。Open CTI は既存の Cisco システムをコンソールに統合し、スクリーンポップを実現する。' },
      { text: 'Lightning Dialer', text_ja: 'Lightning Dialer', correct: false, note: 'An outbound calling product, not an integration for an existing inbound telephony platform.', note_ja: 'アウトバウンド発信の製品であり、既存のインバウンド電話基盤との統合手段ではない。' },
      { text: 'Omni-Channel voice channel', text_ja: 'Omni-Channel の音声チャネル', correct: false, note: 'Omni-Channel routes work items; it does not itself integrate a third-party phone system.', note_ja: 'Omni-Channel は作業アイテムを振り分けるもので、それ自体がサードパーティの電話システムを統合するわけではない。' },
    ],
    explanation:
      'Open CTI with the Cisco adapter integrates the existing telephony system with the console. Service Cloud Voice is Salesforce-native telephony — the right answer only when replacing the phone system.',
    explanation_ja:
      'Cisco アダプタを用いた Open CTI が既存の電話システムをコンソールと統合する。Service Cloud Voice は Salesforce ネイティブの電話機能であり、電話システム自体を置き換える場合に選ぶ。',
    reference: '💡 Keep the existing phone system → Open CTI + vendor adapter. Replace it with Salesforce-native → Service Cloud Voice.',
    reference_ja: '💡 既存の電話システムを残す→Open CTI＋ベンダーアダプタ。Salesforce ネイティブに置き換える→Service Cloud Voice。',
  },
  {
    id: 'sc-a-9',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 9,
    question: 'An agent updates a published knowledge article. What happens to the currently published version?',
    question_ja:
      '担当者が公開済みのナレッジ記事を更新した。現在公開されているバージョンはどうなるか。',
    options: [
      { text: 'It is immediately unpublished', text_ja: 'ただちに非公開になる', correct: false, note: 'That would create a gap where customers and agents have no article at all.', note_ja: '顧客も担当者も記事を参照できない空白期間が生じてしまう。' },
      { text: 'It remains published while the updated version goes through draft and review', text_ja: '更新版が下書きとレビューを経る間、公開されたままになる', correct: true, note: 'Correct. Versioning keeps the live article available until the new version is published.', note_ja: '正解。バージョン管理により、新バージョンが公開されるまで既存の記事が参照可能なまま維持される。' },
      { text: 'It is archived and the draft is visible to all agents', text_ja: 'アーカイブされ、下書きが全担当者に表示される', correct: false, note: 'Archiving is a deliberate lifecycle action, not a side effect of editing.', note_ja: 'アーカイブは意図的なライフサイクル操作であり、編集の副作用ではない。' },
      { text: 'It is deleted and replaced by the draft', text_ja: '削除され、下書きに置き換えられる', correct: false, note: 'Versioning never destroys the published version.', note_ja: 'バージョン管理が公開済みバージョンを破棄することはない。' },
    ],
    explanation:
      'The published version remains live while the draft goes through review. This is the point of article versioning: the knowledge base never has a gap while an update is in progress.',
    explanation_ja:
      '公開済みバージョンは、下書きがレビューを経る間も公開されたまま維持される。これが記事バージョン管理の要点で、更新中にナレッジベースが空白になることはない。',
    reference: '💡 Q25 asks the same thing from the knowledge manager\'s side. The answer does not change.',
    reference_ja: '💡 Q25 は同じ内容をナレッジ管理者の視点で問う。答えは変わらない。',
  },
  {
    id: 'sc-a-10',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 10,
    question:
      'A B2C company wants customers to check case status and search the knowledge base without logging in. Which should the consultant recommend?',
    question_ja:
      'あるB2C企業は、顧客がログインせずにケースの状況確認とナレッジベースの検索を行えるようにしたい。コンサルタントが推奨すべきものはどれか。',
    options: [
      { text: 'Experience Cloud portal with guest user access', text_ja: 'ゲストユーザーアクセスを備えた Experience Cloud ポータル', correct: true, note: 'Correct. Guest access lets customers view public content without logging in.', note_ja: '正解。ゲストアクセスにより、顧客はログインせずに公開コンテンツを閲覧できる。' },
      { text: 'Web-to-Case with a status notification email', text_ja: 'ステータス通知メールを伴う Web-to-Case', correct: false, note: 'Creates cases and emails updates, but gives no on-demand status check or knowledge search.', note_ja: 'ケース作成とメール通知はできるが、任意のタイミングでの状況確認やナレッジ検索はできない。' },
      { text: 'Service Console accessible via a public URL', text_ja: '公開URLからアクセスできるサービスコンソール', correct: false, note: 'The console is an internal agent application and is never exposed publicly.', note_ja: 'コンソールは社内の担当者向けアプリケーションであり、公開されるものではない。' },
      { text: 'Einstein Bots on the public website', text_ja: '公開サイト上の Einstein Bots', correct: false, note: 'A conversational layer, not a self-service portal for status and article search.', note_ja: '会話のレイヤーであり、状況確認や記事検索のためのセルフサービスポータルではない。' },
    ],
    explanation:
      'An Experience Cloud portal with guest user access allows customers to view public content — including knowledge articles and case status pages — without authenticating.',
    explanation_ja:
      'ゲストユーザーアクセスを備えた Experience Cloud ポータルにより、顧客は認証なしで公開コンテンツ（ナレッジ記事やケース状況ページを含む）を閲覧できる。',
    reference: '💡 Guest access requires careful sharing design so guests cannot see other customers\' cases (see Q56).',
    reference_ja: '💡 ゲストアクセスでは、他の顧客のケースが見えないよう共有設計に注意が必要（Q56参照）。',
  },
  {
    id: 'sc-a-11',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 11,
    question:
      'A migration fails halfway through loading 500,000 cases. Without an external ID, what is the risk of restarting?',
    question_ja:
      '50万件のケースを読み込む移行が途中で失敗した。外部IDがない場合、再実行のリスクは何か。',
    options: [
      { text: 'Cases already loaded will be locked', text_ja: 'すでに読み込まれたケースがロックされる', correct: false, note: 'Record locking is a concurrency issue, not a consequence of restarting a load.', note_ja: 'レコードロックは同時実行に関する問題であり、読み込みの再実行の結果ではない。' },
      { text: 'The restart will create duplicate records for already-loaded cases', text_ja: '再実行により、すでに読み込まれたケースの重複レコードが作成される', correct: true, note: 'Correct. Without an external ID there is no key to match on, so inserts repeat.', note_ja: '正解。外部IDがなければ突合するキーがないため、挿入が繰り返される。' },
      { text: 'Salesforce will automatically detect and skip duplicates', text_ja: 'Salesforce が自動的に重複を検出してスキップする', correct: false, note: 'No automatic matching happens on Case without a configured key or duplicate rule.', note_ja: 'キーや重複ルールを設定していない限り、Case で自動的な突合は行われない。' },
      { text: 'Failed records will be quarantined for manual review', text_ja: '失敗したレコードは手動レビューのため隔離される', correct: false, note: 'Failed rows go to an error file; they are not held in a quarantine that prevents duplicates.', note_ja: '失敗行はエラーファイルに出力されるだけで、重複を防ぐ隔離領域に保持されるわけではない。' },
    ],
    explanation:
      'Without external IDs, a restart creates duplicates for already-loaded records because there is no key to match against. This is why an external ID field should be created before the migration (see Q30).',
    explanation_ja:
      '外部IDがなければ突合するキーが存在しないため、再実行によりすでに読み込まれたレコードの重複が生じる。移行前に外部ID項目を用意しておくべき理由がこれである（Q30参照）。',
    reference: '💡 External ID + upsert is the standard restartable-migration pattern. Design it before the first load, not after a failure.',
    reference_ja: '💡 外部ID＋upsert が再実行可能な移行の定石。失敗してからではなく、最初の読み込み前に設計する。',
  },
  {
    id: 'sc-a-12',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 12,
    question:
      'Which sandbox contains a complete copy of production data and is appropriate for performance testing?',
    question_ja:
      '本番データの完全なコピーを含み、パフォーマンステストに適しているサンドボックスはどれか。',
    options: [
      { text: 'Developer Sandbox', text_ja: 'Developer Sandbox', correct: false, note: 'Metadata only, with a very small data limit. Not usable for performance testing.', note_ja: 'メタデータのみで、データ容量も非常に小さい。パフォーマンステストには使えない。' },
      { text: 'Developer Pro Sandbox', text_ja: 'Developer Pro Sandbox', correct: false, note: 'Larger than Developer but still metadata-only — no production data.', note_ja: 'Developer より大きいが、依然としてメタデータのみで本番データは含まれない。' },
      { text: 'Partial Copy Sandbox', text_ja: 'Partial Copy Sandbox', correct: false, note: 'Carries a sample of production data, which is not representative enough for performance testing.', note_ja: '本番データのサンプルを含むが、パフォーマンステストに必要な代表性がない。' },
      { text: 'Full Sandbox', text_ja: 'Full Sandbox', correct: true, note: 'Correct. Only Full Sandbox is a complete production copy, so it alone gives realistic volumes.', note_ja: '正解。本番の完全コピーは Full Sandbox のみであり、現実的なデータ量を再現できるのはこれだけ。' },
    ],
    explanation:
      'Full Sandbox is a complete production copy, which is what realistic performance testing requires. Developer and Developer Pro are metadata-only; Partial Copy carries only a sample.',
    explanation_ja:
      'Full Sandbox は本番の完全コピーであり、現実的なパフォーマンステストにはこれが必要。Developer と Developer Pro はメタデータのみ、Partial Copy はサンプルのみを含む。',
    reference: '💡 Developer / Developer Pro = metadata only. Partial Copy = sample data. Full = everything (and the longest refresh interval).',
    reference_ja: '💡 Developer／Developer Pro＝メタデータのみ。Partial Copy＝サンプルデータ。Full＝すべて（更新間隔も最長）。',
  },
  {
    id: 'sc-a-13',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 13,
    question:
      'A supervisor needs real-time visibility into agent availability and queue status. Which feature provides this?',
    question_ja:
      'スーパーバイザーが、担当者の稼働状況とキューの状態をリアルタイムに把握したい。これを提供する機能はどれか。',
    options: [
      { text: 'A Salesforce dashboard filtered by queue', text_ja: 'キューで絞り込んだ Salesforce ダッシュボード', correct: false, note: 'Dashboards refresh on a schedule; they do not show live agent presence.', note_ja: 'ダッシュボードはスケジュール更新であり、担当者のリアルタイムな在席状況は表示しない。' },
      { text: 'A scheduled case report', text_ja: 'スケジュール実行のケースレポート', correct: false, note: 'By definition a point-in-time snapshot, not real time.', note_ja: '定義上、ある時点のスナップショットでありリアルタイムではない。' },
      { text: 'Omni-Channel Supervisor', text_ja: 'Omni-Channel Supervisor', correct: true, note: 'Correct. It gives live agent presence, capacity and queue backlog in one view.', note_ja: '正解。担当者の在席状況・キャパシティ・キューの滞留を1画面でリアルタイムに表示する。' },
      { text: 'A case list view by queue', text_ja: 'キュー別のケースリストビュー', correct: false, note: 'Shows records waiting, but nothing about agent availability or capacity.', note_ja: '待機中のレコードは見えるが、担当者の稼働状況やキャパシティは分からない。' },
    ],
    explanation:
      'Omni-Channel Supervisor provides real-time agent and queue visibility — presence status, current capacity and waiting work — which dashboards and reports cannot.',
    explanation_ja:
      'Omni-Channel Supervisor は、在席状況・現在のキャパシティ・待機中の作業といった担当者とキューのリアルタイムな可視性を提供する。ダッシュボードやレポートでは実現できない。',
    reference: '💡 "Real-time / live agent status" → Omni-Channel Supervisor. Historical trends → reports and dashboards.',
    reference_ja: '💡 「リアルタイム／担当者の在席状況」→Omni-Channel Supervisor。過去の傾向→レポートとダッシュボード。',
  },
  {
    id: 'sc-a-14',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 14,
    question:
      'A company must keep email data within their internal servers due to regulatory requirements. Which Email-to-Case configuration applies?',
    question_ja:
      'ある企業は規制上の要件により、メールデータを社内サーバー内に保持しなければならない。当てはまる Email-to-Case の構成はどれか。',
    options: [
      { text: 'On-Demand Email-to-Case', text_ja: 'On-Demand Email-to-Case', correct: false, note: 'Routes email through Salesforce servers, which the regulation prohibits.', note_ja: 'メールが Salesforce のサーバーを経由するため、この規制要件に反する。' },
      { text: 'On-Premises Email-to-Case', text_ja: 'On-Premises Email-to-Case', correct: true, note: 'Correct. The email agent runs on the company\'s own servers, keeping message data internal.', note_ja: '正解。メールエージェントが自社サーバー上で動作し、メッセージデータを社内に留められる。' },
      { text: 'Inbound email routing through Experience Cloud', text_ja: 'Experience Cloud 経由のインバウンドメールルーティング', correct: false, note: 'Not an Email-to-Case configuration.', note_ja: 'Email-to-Case の構成ではない。' },
      { text: 'Custom Apex email handler', text_ja: 'カスタム Apex メールハンドラ', correct: false, note: 'Still processes the message inside Salesforce, and adds custom code to maintain.', note_ja: '結局 Salesforce 内でメッセージを処理することになり、保守すべきカスタムコードも増える。' },
    ],
    explanation:
      'On-Premises Email-to-Case uses an email agent installed behind the company firewall, so message data stays on internal servers. On-Demand routes email through Salesforce servers.',
    explanation_ja:
      'On-Premises Email-to-Case は自社ファイアウォール内に導入したメールエージェントを使うため、メッセージデータは社内サーバーに留まる。On-Demand は Salesforce のサーバーを経由する。',
    reference: '💡 Regulatory "data must not leave our servers" → On-Premises. Otherwise On-Demand is simpler and needs no infrastructure.',
    reference_ja: '💡 規制上「データを社外に出せない」→On-Premises。それ以外は基盤不要でシンプルな On-Demand を選ぶ。',
  },
  {
    id: 'sc-a-15',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 15,
    question:
      'Which license is required for a customer to access a self-service portal and track their own cases?',
    question_ja:
      '顧客がセルフサービスポータルにアクセスし、自分のケースを追跡するために必要なライセンスはどれか。',
    options: [
      { text: 'Service Cloud User license', text_ja: 'Service Cloud User ライセンス', correct: false, note: 'That is for internal agents working cases, not external customers.', note_ja: 'ケースを処理する社内担当者向けであり、社外の顧客向けではない。' },
      { text: 'Salesforce Platform license', text_ja: 'Salesforce Platform ライセンス', correct: false, note: 'An internal license, and it excludes the Case object.', note_ja: '社内ユーザー向けのライセンスであり、Case オブジェクトは含まれない。' },
      { text: 'Experience Cloud Customer Community license', text_ja: 'Experience Cloud Customer Community ライセンス', correct: true, note: 'Correct. Customer Community gives external users portal access to their own cases and knowledge.', note_ja: '正解。Customer Community は社外ユーザーに、自分のケースとナレッジへのポータルアクセスを提供する。' },
      { text: 'Service Cloud Einstein add-on', text_ja: 'Service Cloud Einstein アドオン', correct: false, note: 'An AI capability add-on, not a portal access license.', note_ja: 'AI機能のアドオンであり、ポータルアクセス用のライセンスではない。' },
    ],
    explanation:
      'The Experience Cloud Customer Community license gives external users portal access. Internal licenses (Service Cloud User, Platform) are for employees.',
    explanation_ja:
      'Experience Cloud Customer Community ライセンスが社外ユーザーにポータルアクセスを提供する。社内向けライセンス（Service Cloud User、Platform）は従業員用である。',
    reference: '💡 Customer Community vs Customer Community Plus vs Partner Community — see Q52 for how volume and needs decide.',
    reference_ja: '💡 Customer Community／Customer Community Plus／Partner Community の使い分けは Q52 参照（規模と必要機能で決まる）。',
  },
  {
    id: 'sc-a-16',
    domain: 'sc-console',
    type: 'mcq',
    source: 'official',
    examOrder: 16,
    question:
      'An agent needs to send the same closing message, update case status, and log a call with one click inside Service Console. Which feature should the consultant recommend?',
    question_ja:
      'サービスコンソール内で、同じ終了メッセージの送信・ケースステータスの更新・通話記録の作成を1クリックで行いたい。コンサルタントが推奨すべき機能はどれか。',
    options: [
      { text: 'Quick Action', text_ja: 'クイックアクション', correct: false, note: 'Performs one action; it does not chain a sequence of steps.', note_ja: '単一の操作を実行するもので、複数の手順を連鎖させることはできない。' },
      { text: 'Macro', text_ja: 'マクロ', correct: true, note: 'Correct. A macro runs a multi-step sequence in the console from one trigger.', note_ja: '正解。マクロはコンソール上で複数手順の一連の操作を1回の実行でまとめて行う。' },
      { text: 'Flow triggered on status change', text_ja: 'ステータス変更で起動するフロー', correct: false, note: 'Reacts after the agent acts; it is not the one-click action the agent invokes.', note_ja: '担当者の操作後に反応するもので、担当者が実行する1クリックの操作ではない。' },
      { text: 'Quick Text', text_ja: 'クイックテキスト', correct: false, note: 'Inserts predefined text only. It cannot update fields or log a call.', note_ja: '定型文の挿入のみ。項目の更新や通話記録の作成はできない。' },
    ],
    explanation:
      'A macro runs a multi-step sequence in Service Console with one trigger. Quick Text only inserts text; a quick action performs a single operation.',
    explanation_ja:
      'マクロはサービスコンソールで複数手順の一連の操作を1回の実行でまとめて行う。クイックテキストは定型文の挿入のみ、クイックアクションは単一の操作を行う。',
    reference: '💡 Text only → Quick Text. One operation → Quick Action. A sequence of steps → Macro (irreversible ones need "bulk macro" care).',
    reference_ja: '💡 定型文だけ→クイックテキスト。単一操作→クイックアクション。手順の連鎖→マクロ（取り消せない操作は一括実行に注意）。',
  },
  {
    id: 'sc-a-17',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 17,
    question:
      'A company wants to route Spanish-speaking customers to Spanish-speaking agents only. Which Omni-Channel configuration applies?',
    question_ja:
      'ある企業は、スペイン語話者の顧客をスペイン語対応の担当者だけにルーティングしたい。当てはまる Omni-Channel の構成はどれか。',
    options: [
      { text: 'Queue-based routing with a Spanish language queue', text_ja: 'スペイン語用キューを使ったキューベースルーティング', correct: false, note: 'Workable but rigid: every attribute combination needs another queue, which does not scale.', note_ja: '動作はするが硬直的。属性の組み合わせごとにキューが必要になり、拡張性がない。' },
      { text: 'Skills-based routing with a language skill', text_ja: '言語スキルを用いたスキルベースルーティング', correct: true, note: 'Correct. Skills match work to agents by attributes such as language, and combine cleanly.', note_ja: '正解。スキルは言語などの属性で作業と担当者を突き合わせ、複数条件も無理なく組み合わせられる。' },
      { text: 'Case assignment rules with language criteria', text_ja: '言語条件を用いたケース割り当てルール', correct: false, note: 'Assignment rules set the owner at creation; they are not Omni-Channel routing.', note_ja: '割り当てルールは作成時に所有者を設定するもので、Omni-Channel のルーティングではない。' },
      { text: 'Escalation rules with language-based reassignment', text_ja: '言語に基づく再割り当てを行うエスカレーションルール', correct: false, note: 'Escalation reacts after time passes; it is not an initial routing mechanism.', note_ja: 'エスカレーションは時間経過後に反応するもので、初回のルーティング手段ではない。' },
    ],
    explanation:
      'Skills-based routing matches cases to agents based on configured skills, including language. It scales to multiple attributes where a queue-per-combination design does not.',
    explanation_ja:
      'スキルベースルーティングは、言語を含む設定済みスキルに基づいてケースと担当者を突き合わせる。組み合わせごとにキューを作る設計と違い、複数属性にも拡張できる。',
    reference: '💡 One dimension, few options → queues. Multiple attributes (language × product × tier) → skills-based routing.',
    reference_ja: '💡 単一の軸で選択肢が少ない→キュー。複数属性（言語×製品×区分）→スキルベースルーティング。',
  },
  {
    id: 'sc-a-18',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 18,
    question:
      'Which API should be used when Salesforce calls an external billing system and needs the response to continue processing?',
    question_ja:
      'Salesforce が外部の請求システムを呼び出し、処理を続けるためにその応答を必要とする場合、使用すべきAPIはどれか。',
    options: [
      { text: 'Bulk API', text_ja: 'Bulk API', correct: false, note: 'Asynchronous, for loading large data volumes into Salesforce.', note_ja: '非同期であり、Salesforce へ大量データを読み込むためのもの。' },
      { text: 'Streaming API', text_ja: 'Streaming API', correct: false, note: 'Pushes event notifications to subscribers; it does not fetch a response.', note_ja: '購読者へイベント通知を送るもので、応答を取得する仕組みではない。' },
      { text: 'SOAP API with synchronous callout', text_ja: '同期コールアウトを用いた SOAP API', correct: true, note: 'Correct. A synchronous callout blocks until the response arrives, so processing can continue with it.', note_ja: '正解。同期コールアウトは応答が返るまで待つため、その値を使って処理を続けられる。' },
      { text: 'Platform Events', text_ja: 'Platform Events', correct: false, note: 'Fire and forget by design — there is no reply to wait for.', note_ja: '設計上 fire-and-forget であり、待つべき応答がない。' },
    ],
    explanation:
      'This is Request and Reply: a synchronous callout where Salesforce waits for the response before continuing. Bulk and Streaming are asynchronous, and Platform Events are fire and forget.',
    explanation_ja:
      'これは Request and Reply のパターンで、Salesforce が応答を待ってから処理を続ける同期コールアウトである。Bulk と Streaming は非同期、Platform Events は fire-and-forget。',
    reference: '💡 "Needs the response to continue" → synchronous. "Notify and move on" → Platform Events / Fire and Forget.',
    reference_ja: '💡 「応答がないと続けられない」→同期。「通知して次へ進む」→Platform Events／Fire and Forget。',
  },
  {
    id: 'sc-a-19',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 19,
    question:
      'A company wants to measure case deflection on their Experience Cloud portal. Which metric indicates deflection?',
    question_ja:
      'ある企業は Experience Cloud ポータルでのケース回避（deflection）を測定したい。ケース回避を示す指標はどれか。',
    options: [
      { text: 'Number of cases created through the portal', text_ja: 'ポータル経由で作成されたケース数', correct: false, note: 'That counts cases that were *not* deflected — the opposite measure.', note_ja: '回避「できなかった」ケースを数えている。指標として逆。' },
      { text: 'Number of customers who viewed an article and did not create a case', text_ja: '記事を閲覧してケースを作成しなかった顧客数', correct: true, note: 'Correct. Deflection is exactly self-service resolution without a case being raised.', note_ja: '正解。ケース回避とは、ケースを起票せずにセルフサービスで解決されたことそのもの。' },
      { text: 'Average time to first response on portal cases', text_ja: 'ポータル起票ケースの初回応答までの平均時間', correct: false, note: 'A responsiveness metric for cases that already exist.', note_ja: 'すでに存在するケースに対する応答性の指標。' },
      { text: 'Number of knowledge article ratings submitted', text_ja: '提出されたナレッジ記事の評価数', correct: false, note: 'Measures engagement with articles, not whether a case was avoided.', note_ja: '記事への関与度を測るもので、ケースが回避されたかは分からない。' },
    ],
    explanation:
      'Deflection measures customers who resolved their issue without creating a case. Counting portal-created cases measures the opposite.',
    explanation_ja:
      'ケース回避は、ケースを作成せずに問題を解決した顧客を測る指標である。ポータル経由で作成されたケース数を数えるのは逆の測定になる。',
    reference: '💡 Deflection is a "did not happen" metric. Pair it with article effectiveness (Q59) to see which content is doing the work.',
    reference_ja: '💡 ケース回避は「起きなかったこと」を測る指標。記事の有効性（Q59）と併せて、どのコンテンツが効いているかを見る。',
  },
  {
    id: 'sc-a-20',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 20,
    question:
      'An integration creates 1,000 cases simultaneously. A flow fires on each and updates the parent Account. Errors occur. What is the most likely cause?',
    question_ja:
      'ある連携が1,000件のケースを同時に作成する。各ケースでフローが起動し、親の取引先を更新する。エラーが発生した。最も可能性の高い原因はどれか。',
    options: [
      { text: 'Omni-Channel does not support bulk case creation', text_ja: 'Omni-Channel は一括のケース作成をサポートしていない', correct: false, note: 'Omni-Channel is not involved in this integration path at all.', note_ja: 'この連携経路に Omni-Channel はまったく関与していない。' },
      { text: 'Multiple flows competing to update the same Account record simultaneously', text_ja: '複数のフローが同じ取引先レコードを同時に更新しようと競合している', correct: true, note: 'Correct. Concurrent updates to the same parent produce record locking errors.', note_ja: '正解。同一の親レコードへの同時更新はレコードロックエラーを引き起こす。' },
      { text: 'The flow has an infinite loop', text_ja: 'フローが無限ループしている', correct: false, note: 'A loop would fail consistently, not specifically under concurrent bulk load.', note_ja: 'ループなら常に失敗するはずで、同時一括処理のときだけ起きる症状にはならない。' },
      { text: 'The Account object has reached its storage limit', text_ja: '取引先オブジェクトがストレージ上限に達している', correct: false, note: 'Storage limits produce a different error and are unrelated to concurrency.', note_ja: 'ストレージ上限は別のエラーを出すもので、同時実行とは無関係。' },
    ],
    explanation:
      'Concurrent flow executions updating the same parent Account create record locking errors. The usual remedies are to reduce batch size, order the load by parent, or move the parent update to an asynchronous path.',
    explanation_ja:
      '同じ親の取引先を更新するフローが同時に実行されると、レコードロックエラーが発生する。一般的な対処はバッチサイズの縮小、親ごとに並べ替えて読み込む、親の更新を非同期処理に移す、など。',
    reference: '💡 Q27 is the same scenario reworded. "Simultaneous updates to one parent" is always record locking.',
    reference_ja: '💡 Q27 は同じ状況の言い換え。「1つの親への同時更新」は常にレコードロック。',
  },
  {
    id: 'sc-a-21',
    domain: 'sc-implementation',
    type: 'mcq',
    source: 'official',
    examOrder: 21,
    question:
      'A change set deployment fails. The error states that a validation rule references a field not present in the target org. What is the most likely cause?',
    question_ja:
      '変更セットのデプロイが失敗した。エラーには、入力規則が対象組織に存在しない項目を参照していると表示されている。最も可能性の高い原因はどれか。',
    options: [
      { text: 'The validation rule must be deactivated before deployment', text_ja: 'デプロイ前に入力規則を無効化する必要がある', correct: false, note: 'Deactivation is not required, and it would not create the missing field.', note_ja: '無効化は必須ではなく、そもそも不足している項目が作られるわけでもない。' },
      { text: 'The custom field must be included in the change set', text_ja: 'カスタム項目を変更セットに含める必要がある', correct: true, note: 'Correct. Change sets do not gather dependencies automatically; the referenced field must be added.', note_ja: '正解。変更セットは依存関係を自動収集しないため、参照されている項目を明示的に追加する必要がある。' },
      { text: 'The custom field must be manually created in the target org first', text_ja: 'まず対象組織でカスタム項目を手動作成する必要がある', correct: false, note: 'Possible as a workaround, but it defeats the purpose of a repeatable deployment.', note_ja: '回避策としては可能だが、再現可能なデプロイという目的を損なう。' },
      { text: 'Validation rules cannot be deployed through change sets', text_ja: '入力規則は変更セットではデプロイできない', correct: false, note: 'They can be deployed. The error is about a missing dependency, not the component type.', note_ja: 'デプロイできる。エラーは依存関係の欠落によるもので、コンポーネント種別の問題ではない。' },
    ],
    explanation:
      'Change sets do not automatically include dependencies. If a validation rule references a custom field, that field must be added to the change set (or already exist in the target org).',
    explanation_ja:
      '変更セットは依存関係を自動的には含めない。入力規則がカスタム項目を参照している場合、その項目を変更セットに追加する（または対象組織に既に存在させる）必要がある。',
    reference: '💡 Use "View/Add Dependencies" when building a change set. This links directly to deployment sequencing (Q32).',
    reference_ja: '💡 変更セット作成時は「依存関係を表示／追加」を使う。デプロイ順序（Q32）と直結する論点。',
  },
  {
    id: 'sc-a-22',
    domain: 'sc-solution',
    type: 'mcq',
    source: 'official',
    examOrder: 22,
    question:
      'A company has 10 agents and routes all cases to one queue. Cases are claimed manually. Management wants priority cases handled first. Most proportionate recommendation?',
    question_ja:
      'ある企業には担当者が10名おり、すべてのケースを1つのキューにルーティングしている。ケースは手動で引き取られる。経営層は優先度の高いケースを先に処理させたい。最も過不足のない推奨はどれか。',
    options: [
      { text: 'Implement Omni-Channel with push routing', text_ja: 'プッシュルーティングを用いた Omni-Channel を導入する', correct: false, note: 'A capable solution but heavy for 10 agents and one queue — more change than the problem warrants.', note_ja: '有効な解決策だが、担当者10名・キュー1つには重い。問題の規模に対して変更が大きすぎる。' },
      { text: 'Use a priority-sorted case list view and configure assignment rules to route to the queue', text_ja: '優先度でソートしたケースリストビューを使い、キューへルーティングする割り当てルールを設定する', correct: true, note: 'Correct. Declarative, minimal change, and it directly makes priority cases surface first.', note_ja: '正解。宣言的で変更は最小限、しかも優先度の高いケースが先頭に来るという要求を直接満たす。' },
      { text: 'Build a custom routing engine in Apex', text_ja: 'Apex でカスタムのルーティングエンジンを構築する', correct: false, note: 'Custom code for a problem solvable by sorting a list view. Never proportionate.', note_ja: 'リストビューの並べ替えで解決できる問題にカスタムコードを書くのは、まったく釣り合わない。' },
      { text: 'Enable Einstein Case Routing', text_ja: 'Einstein Case Routing を有効にする', correct: false, note: 'AI-based routing is disproportionate at this scale and needs training data.', note_ja: 'この規模ではAIベースのルーティングは過剰であり、学習データも必要になる。' },
    ],
    explanation:
      'Consultant exams reward the most proportionate solution. With 10 agents and one queue, a priority-sorted list view plus assignment rules meets the requirement with the least configuration and no code.',
    explanation_ja:
      'コンサルタント試験は「規模に見合った最小の解決策」を評価する。担当者10名・キュー1つであれば、優先度でソートしたリストビューと割り当てルールで、最小の設定・コードなしに要件を満たせる。',
    reference: '💡 Ask "is this proportionate?" before "is this possible?" Omni-Channel earns its cost at larger scale or with multiple channels.',
    reference_ja: '💡 「実現可能か」より先に「規模に見合うか」を問う。Omni-Channel は規模が大きい／複数チャネルの場合にコストに見合う。',
  },
  {
    id: 'sc-a-23',
    domain: 'sc-case',
    type: 'mcq',
    source: 'official',
    examOrder: 23,
    question:
      'A company wants a customer satisfaction survey sent automatically 24 hours after a case is closed. Which tool should the consultant use?',
    question_ja:
      'ある企業は、ケースがクローズされてから24時間後に顧客満足度アンケートを自動送信したい。コンサルタントが使うべきツールはどれか。',
    options: [
      { text: 'A Macro triggered by the agent at case close', text_ja: 'ケースクローズ時に担当者が実行するマクロ', correct: false, note: 'Requires a manual action and cannot wait 24 hours.', note_ja: '手動の操作が必要で、24時間待つこともできない。' },
      { text: 'A Flow with a scheduled path that fires 24 hours after status becomes Closed', text_ja: 'ステータスがクローズになった24時間後に実行されるスケジュールパスを持つフロー', correct: true, note: 'Correct. Scheduled paths are exactly the mechanism for "N hours after a field change".', note_ja: '正解。スケジュールパスは「項目変更のN時間後」を実現するための仕組みそのもの。' },
      { text: 'A case escalation rule that sends a survey after 24 hours', text_ja: '24時間後にアンケートを送るケースエスカレーションルール', correct: false, note: 'Escalation rules act on open cases needing attention, not closed ones.', note_ja: 'エスカレーションルールは対応が必要な未解決ケースに作用するもので、クローズ済みには使わない。' },
      { text: 'An email template configured to send after closure', text_ja: 'クローズ後に送信するよう設定したメールテンプレート', correct: false, note: 'A template is content; it has no scheduling capability of its own.', note_ja: 'テンプレートは内容であり、それ自体にスケジュール機能はない。' },
    ],
    explanation:
      'A record-triggered flow with a scheduled path fires a defined time after the triggering change. This is the standard declarative answer for time-delayed follow-up actions.',
    explanation_ja:
      'レコードトリガーフローのスケジュールパスは、トリガーとなる変更から指定した時間後に実行される。時間差のフォローアップ処理における標準的な宣言的解答。',
    reference: '💡 "N hours/days after X" → record-triggered flow with a scheduled path.',
    reference_ja: '💡 「Xの N時間／N日後」→スケジュールパス付きのレコードトリガーフロー。',
  },
  {
    id: 'sc-a-24',
    domain: 'sc-analytics',
    type: 'mcq',
    source: 'official',
    examOrder: 24,
    question:
      'A contact center executive wants a monthly view of overall CSAT trends and year-over-year case volume with no case-level detail. What should the consultant build?',
    question_ja:
      'コンタクトセンターの経営層が、CSATの傾向と前年同期比のケース件数を月次で俯瞰したいと考えている。ケース単位の詳細は不要である。コンサルタントが構築すべきものはどれか。',
    options: [
      { text: 'A real-time dashboard with live case volume and queue data', text_ja: 'ライブのケース件数とキューデータを表示するリアルタイムダッシュボード', correct: false, note: 'Operational detail for supervisors, not the monthly trend view an executive asked for.', note_ja: 'スーパーバイザー向けの運用詳細であり、経営層が求めた月次の傾向表示ではない。' },
      { text: 'A summary dashboard with monthly CSAT trends and case volume charts', text_ja: '月次CSAT傾向とケース件数のチャートを備えたサマリーダッシュボード', correct: true, note: 'Correct. Matches both the audience (executive) and the requirement (trends, no case detail).', note_ja: '正解。対象者（経営層）と要件（傾向表示・ケース詳細不要）の両方に合致する。' },
      { text: 'A detailed report showing case resolution data for all agents', text_ja: '全担当者のケース解決データを示す詳細レポート', correct: false, note: 'Case-level detail is explicitly not wanted.', note_ja: 'ケース単位の詳細は不要と明示されている。' },
      { text: 'Omni-Channel Supervisor filtered by date range', text_ja: '日付範囲で絞り込んだ Omni-Channel Supervisor', correct: false, note: 'A real-time operational tool with no historical trending.', note_ja: 'リアルタイムの運用ツールであり、過去の傾向分析はできない。' },
    ],
    explanation:
      'Match the artefact to the audience. Executives want aggregated trends over time; supervisors want real-time operational views; analysts want detailed reports.',
    explanation_ja:
      '成果物は対象者に合わせる。経営層は時系列の集計傾向、スーパーバイザーはリアルタイムの運用状況、アナリストは詳細レポートを求める。',
    reference: '💡 Executive → summary dashboard. Supervisor → Omni-Channel Supervisor. Analyst → detailed report.',
    reference_ja: '💡 経営層→サマリーダッシュボード。スーパーバイザー→Omni-Channel Supervisor。アナリスト→詳細レポート。',
  },
  {
    id: 'sc-a-25',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 25,
    question:
      'A knowledge manager needs to update a published article. What happens to the currently published version while the update is in progress?',
    question_ja:
      'ナレッジ管理者が公開済みの記事を更新する必要がある。更新中、現在公開されているバージョンはどうなるか。',
    options: [
      { text: 'It is immediately unpublished when editing begins', text_ja: '編集開始と同時にただちに非公開になる', correct: false, note: 'That would leave customers and agents without an article during the update.', note_ja: '更新中、顧客も担当者も記事を参照できなくなってしまう。' },
      { text: 'It remains published while the new version goes through draft and review', text_ja: '新バージョンが下書きとレビューを経る間、公開されたままになる', correct: true, note: 'Correct. Versioning keeps the live article available throughout the update.', note_ja: '正解。バージョン管理により、更新中も公開中の記事が参照可能なまま維持される。' },
      { text: 'It is archived automatically when the agent starts editing', text_ja: '担当者が編集を開始すると自動的にアーカイブされる', correct: false, note: 'Archiving is a deliberate lifecycle action, never an automatic side effect of editing.', note_ja: 'アーカイブは意図的なライフサイクル操作であり、編集の自動的な副作用ではない。' },
      { text: 'It is locked and no longer searchable until the new version is approved', text_ja: 'ロックされ、新バージョンが承認されるまで検索できなくなる', correct: false, note: 'The published version stays searchable; that is the point of versioning.', note_ja: '公開済みバージョンは検索可能なまま。それがバージョン管理の目的である。' },
    ],
    explanation:
      'The published version stays live while the draft is reviewed — identical behaviour to Q9, asked from the knowledge manager\'s perspective.',
    explanation_ja:
      '下書きがレビューされる間も、公開済みバージョンは公開されたまま維持される。Q9 と同じ動作を、ナレッジ管理者の視点から問うている。',
    reference:
      '⚠️ The bundled answer key marks this question C, which contradicts both Q9 and how article versioning actually works. B is correct — treat the key as an error here.',
    reference_ja:
      '⚠️ 同梱の解答キーはこの問題を C としているが、Q9 とも実際の記事バージョン管理の挙動とも矛盾する。正解は B であり、キー側の誤りとして扱う。',
  },
  {
    id: 'sc-a-26',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 26,
    question:
      'A company wants cases created when customers mention their brand directly on Twitter. Which feature should the consultant recommend?',
    question_ja:
      'ある企業は、顧客が Twitter 上で自社ブランドに直接言及した際にケースを作成したい。コンサルタントが推奨すべき機能はどれか。',
    options: [
      { text: 'Email-to-Case with a Twitter connector', text_ja: 'Twitter コネクタを用いた Email-to-Case', correct: false, note: 'No such connector; Email-to-Case handles email only.', note_ja: 'そのようなコネクタは存在せず、Email-to-Case が扱うのはメールのみ。' },
      { text: 'Social Customer Service with mention monitoring rules', text_ja: 'メンション監視ルールを用いた Social Customer Service', correct: true, note: 'Correct. Social Customer Service monitors social channels and creates cases from qualifying posts.', note_ja: '正解。Social Customer Service はソーシャルチャネルを監視し、条件に合う投稿からケースを作成する。' },
      { text: 'Web-to-Case with a social media source field', text_ja: 'ソーシャルメディアのソース項目を持つ Web-to-Case', correct: false, note: 'Web-to-Case requires a form submission; it cannot listen to Twitter.', note_ja: 'Web-to-Case はフォーム送信が前提で、Twitter を監視することはできない。' },
      { text: 'Einstein Bots with Twitter channel configuration', text_ja: 'Twitter チャネルを構成した Einstein Bots', correct: false, note: 'Bots handle conversations once they start; they do not monitor for brand mentions.', note_ja: 'ボットは開始された会話を処理するもので、ブランドへの言及を監視するものではない。' },
    ],
    explanation:
      'Social Customer Service connects social accounts and uses monitoring rules to decide which posts become cases. Which post types should create cases is a design decision (see Q40).',
    explanation_ja:
      'Social Customer Service はソーシャルアカウントを接続し、監視ルールでどの投稿をケース化するかを判断する。どの投稿種別をケースにするかは設計判断である（Q40参照）。',
    reference: '💡 Channel questions: match the customer\'s starting point (email / web form / chat / phone / social) to the matching intake feature.',
    reference_ja: '💡 チャネル系の設問は、顧客の出発点（メール／Webフォーム／チャット／電話／ソーシャル）に対応する受付機能を選ぶ。',
  },
  {
    id: 'sc-a-27',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 27,
    question:
      'An integration creates 1,000 cases simultaneously. A flow fires on each case creation and updates the parent Account record. Errors occur. What is the most likely cause?',
    question_ja:
      'ある連携が1,000件のケースを同時に作成する。ケース作成のたびにフローが起動し、親の取引先レコードを更新する。エラーが発生した。最も可能性の高い原因はどれか。',
    options: [
      { text: 'Omni-Channel does not support bulk case creation', text_ja: 'Omni-Channel は一括のケース作成をサポートしていない', correct: false, note: 'Omni-Channel plays no part in this integration path.', note_ja: 'この連携経路に Omni-Channel は関与していない。' },
      { text: 'Multiple flow executions competing to update the same Account record simultaneously', text_ja: '複数のフロー実行が同じ取引先レコードを同時に更新しようと競合している', correct: true, note: 'Correct. Concurrent writes to one parent record cause record locking errors.', note_ja: '正解。1つの親レコードへの同時書き込みがレコードロックエラーを引き起こす。' },
      { text: 'The flow has an infinite loop on the Account update', text_ja: '取引先の更新でフローが無限ループしている', correct: false, note: 'A loop would fail every time, not only under simultaneous load.', note_ja: 'ループなら常に失敗するはずで、同時実行時に限った症状にはならない。' },
      { text: 'The Account object has reached its storage limit', text_ja: '取引先オブジェクトがストレージ上限に達している', correct: false, note: 'Storage is unrelated to concurrency errors.', note_ja: 'ストレージは同時実行エラーとは無関係。' },
    ],
    explanation:
      'Same root cause as Q20: concurrent flow executions writing to the same parent Account produce record locking. Reduce batch size, sort the load by parent, or move the parent update asynchronous.',
    explanation_ja:
      'Q20 と同じ根本原因で、同じ親の取引先へ書き込むフローの同時実行によりレコードロックが発生する。バッチサイズの縮小、親ごとの並べ替え、親更新の非同期化で対処する。',
    reference: '💡 Repeated questions in a practice set are a signal: this concept is worth over-learning.',
    reference_ja: '💡 練習問題内での重複出題はシグナル。この論点は特に重点的に押さえる価値がある。',
  },
  {
    id: 'sc-a-28',
    domain: 'sc-channels',
    type: 'mcq',
    source: 'official',
    examOrder: 28,
    question:
      'A company wants customers to start a support conversation on their mobile app and continue it later from a laptop without losing the conversation history. Which feature supports this?',
    question_ja:
      'ある企業は、顧客がモバイルアプリでサポートの会話を開始し、後からノートPCで会話履歴を失わずに続けられるようにしたい。これを実現する機能はどれか。',
    options: [
      { text: 'Live Agent', text_ja: 'Live Agent', correct: false, note: 'Session-based chat: closing the window ends the conversation.', note_ja: 'セッションベースのチャットで、ウィンドウを閉じると会話が終了する。' },
      { text: 'Messaging for In-App and Web', text_ja: 'Messaging for In-App and Web', correct: true, note: 'Correct. Asynchronous messaging persists the conversation across devices and sessions.', note_ja: '正解。非同期メッセージングは、デバイスやセッションをまたいで会話を保持する。' },
      { text: 'Einstein Bots', text_ja: 'Einstein Bots', correct: false, note: 'A conversational layer that runs on top of a channel; it is not the persistence mechanism.', note_ja: 'チャネルの上で動く会話レイヤーであり、永続化の仕組みではない。' },
      { text: 'Web-to-Case with session persistence', text_ja: 'セッション永続化を伴う Web-to-Case', correct: false, note: 'Web-to-Case is a one-way form submission, not a conversation.', note_ja: 'Web-to-Case は一方向のフォーム送信であり、会話ではない。' },
    ],
    explanation:
      'Messaging for In-App and Web is asynchronous: the conversation persists so a customer can leave and return, on any device, with history intact. Chat (Live Agent) is synchronous and session-bound.',
    explanation_ja:
      'Messaging for In-App and Web は非同期であり、会話が保持されるため、顧客はどのデバイスからでも履歴を保ったまま離脱・再開できる。チャット（Live Agent）は同期かつセッションに縛られる。',
    reference: '💡 "Continue later / across devices / does not lose history" → asynchronous messaging, not chat.',
    reference_ja: '💡 「後で続ける／デバイスをまたぐ／履歴を失わない」→チャットではなく非同期メッセージング。',
  },
  {
    id: 'sc-a-29',
    domain: 'sc-knowledge',
    type: 'mcq',
    source: 'official',
    examOrder: 29,
    question:
      'Agents report that relevant knowledge articles are not appearing when they work cases. The company uses data categories to classify articles by product line. What should the consultant check first?',
    question_ja:
      '担当者から、ケース対応時に関連するナレッジ記事が表示されないと報告があった。同社はデータカテゴリで記事を製品ライン別に分類している。コンサルタントが最初に確認すべきことはどれか。',
    options: [
      { text: 'Whether the Knowledge User feature license is assigned to agents', text_ja: '担当者に Knowledge User 機能ライセンスが割り当てられているか', correct: false, note: 'Without it agents would see no Knowledge at all, not a filtered subset.', note_ja: 'これがなければナレッジ自体がまったく見えないはずで、一部だけ見えない症状にはならない。' },
      { text: 'Whether the data category visibility settings match the agent profiles', text_ja: 'データカテゴリの表示設定が担当者のプロファイルと一致しているか', correct: true, note: 'Correct. Category visibility is per role/profile and silently hides articles outside the allowed categories.', note_ja: '正解。カテゴリの表示設定はロール／プロファイル単位で、許可外カテゴリの記事を無言で隠す。' },
      { text: 'Whether the articles have been archived', text_ja: '記事がアーカイブされていないか', correct: false, note: 'Possible, but it would not correlate with the data category classification described.', note_ja: '可能性はあるが、説明されているデータカテゴリによる分類とは結びつかない。' },
      { text: 'Whether the case page layout includes a Knowledge component', text_ja: 'ケースのページレイアウトに Knowledge コンポーネントが含まれているか', correct: false, note: 'That would show no Knowledge panel at all rather than an incomplete set of results.', note_ja: 'それならナレッジのパネル自体が表示されないはずで、結果が一部欠けるという症状にはならない。' },
    ],
    explanation:
      'When the company classifies by data categories and some articles do not appear, category visibility is the first thing to check. It is configured per role or profile and silently filters results.',
    explanation_ja:
      'データカテゴリで分類しており一部の記事が表示されない場合は、まずカテゴリの表示設定を確認する。ロールまたはプロファイル単位で設定され、結果を無言で絞り込む。',
    reference: '💡 Diagnose by scope: nothing visible → licence or component. Some visible → data category visibility or article state.',
    reference_ja: '💡 範囲で切り分ける：まったく見えない→ライセンスまたはコンポーネント。一部だけ見える→データカテゴリの表示設定または記事の状態。',
  },
  {
    id: 'sc-a-30',
    domain: 'sc-data',
    type: 'mcq',
    source: 'official',
    examOrder: 30,
    question:
      'A company is migrating 500,000 cases from a legacy system. The migration fails halfway through. What should the consultant have created before running the migration to prevent duplicate records on restart?',
    question_ja:
      'ある企業がレガシーシステムから50万件のケースを移行している。移行が途中で失敗した。再実行時の重複レコードを防ぐため、移行前にコンサルタントが作成しておくべきだったものはどれか。',
    options: [
      { text: 'A formula field concatenating the legacy number with the Salesforce case number', text_ja: 'レガシー番号と Salesforce のケース番号を連結した数式項目', correct: false, note: 'Formula fields are calculated, cannot be external IDs, and the Salesforce number does not exist before insert.', note_ja: '数式項目は計算値で外部IDにできず、そもそも挿入前に Salesforce 側の番号は存在しない。' },
      { text: 'An external ID field on the Case object storing the legacy case identifier', text_ja: 'レガシーのケース識別子を格納する、Case オブジェクト上の外部ID項目', correct: true, note: 'Correct. An external ID enables upsert, so a restart updates existing rows instead of inserting duplicates.', note_ja: '正解。外部IDにより upsert が可能になり、再実行時は重複挿入ではなく既存行の更新になる。' },
      { text: 'A custom object to hold legacy identifiers linked to cases', text_ja: 'ケースに関連付けたレガシー識別子を保持するカスタムオブジェクト', correct: false, note: 'Adds a join without giving the loader a key to match on during upsert.', note_ja: '結合を増やすだけで、upsert 時にローダーが突合できるキーにはならない。' },
      { text: 'A flow that logs the legacy number in the case description', text_ja: 'レガシー番号をケースの説明欄に記録するフロー', correct: false, note: 'A free-text field is not a matching key and cannot be used for upsert.', note_ja: '自由記述の項目は突合キーにならず、upsert には使えない。' },
    ],
    explanation:
      'An external ID field on Case holding the legacy identifier makes the load idempotent: upsert matches on it, so restarting updates the already-loaded rows rather than duplicating them.',
    explanation_ja:
      'レガシー識別子を保持する Case の外部ID項目により、読み込みが冪等になる。upsert がその項目で突合するため、再実行時はすでに読み込まれた行を更新し、重複を作らない。',
    reference: '💡 Q11 describes the failure; Q30 asks for the prevention. External ID + upsert is the answer to both.',
    reference_ja: '💡 Q11 は失敗の症状、Q30 はその予防を問う。どちらも答えは「外部ID＋upsert」。',
  },
]
