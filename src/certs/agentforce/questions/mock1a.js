// 同梱の模擬試験「Mock Exam 1」Q1〜Q30（screenshots/Agentforce）。
// 出題文・選択肢は原文（英語）。解説は本教材で作成し、日英を併記している。
// examOrder は本番の並び順。模試1はこの順で出題する。
export const mock1aQuestions = [
  {
    id: 'af-m1-1',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 1,
    question:
      'Aldergrove Utilities has an agent step that must run identically on every conversation: the account number has to be verified before any billing action is taken. Which authoring approach guarantees that behaviour?',
    question_ja:
      'Aldergrove Utilities には、すべての会話で必ず同じように実行しなければならないステップがある。請求関連のアクションを実行する前に、必ず口座番号を検証する必要がある。この動作を保証する作成方法はどれか。',
    options: [
      {
        text: 'Write the verification as a prompt instruction so the model decides when it is needed.',
        text_ja: '検証をプロンプト指示として記述し、必要なタイミングをモデルに判断させる。',
        correct: false,
        note: 'A prompt instruction is evaluated by the model, so the outcome can vary between conversations. That is the opposite of a guarantee.',
        note_ja: 'プロンプト指示はモデルが評価するため、会話ごとに結果が変わり得る。「毎回必ず」という保証にはならない。',
      },
      {
        text: "Add the verification requirement to the agent's top-level role description.",
        text_ja: 'エージェントの最上位のロール記述に検証要件を追記する。',
        correct: false,
        note: 'The role description shapes tone and scope but is still natural-language guidance the model interprets. It does not force execution.',
        note_ja: 'ロール記述はトーンやスコープを方向づけるが、あくまでモデルが解釈する自然言語であり、実行を強制しない。',
      },
      {
        text: 'Place the verification in an after_reasoning block as a suggestion to the model.',
        text_ja: 'after_reasoning ブロックに、モデルへの提案として検証を配置する。',
        correct: false,
        note: 'Two problems: after_reasoning runs after the decision has been made, and a "suggestion" is still non-deterministic.',
        note_ja: '二重に誤り。after_reasoning は判断の後に実行され、さらに「提案」では非決定的なまま。',
      },
      {
        text: 'Express the verification as a deterministic instruction in Agent Script so it executes exactly as written every time.',
        text_ja: 'Agent Script の決定的な指示として検証を記述し、毎回記述どおりに実行させる。',
        correct: true,
        note: 'Correct. Deterministic instructions in Agent Script execute exactly as written on every run — this is what hybrid reasoning is for.',
        note_ja: '正解。Agent Script の決定的指示は毎回記述どおりに実行される。ハイブリッド推論はまさにこのためにある。',
      },
    ],
    explanation:
      'Hybrid reasoning combines two kinds of instruction. A prompt instruction is interpreted by the model at run time and its outcome can vary. A deterministic instruction executes exactly as written every time. Any "must always happen" requirement — verification, compliance, mandatory lookups — belongs in a deterministic instruction.',
    explanation_ja:
      'ハイブリッド推論は2種類の指示を組み合わせる。プロンプト指示は実行時にモデルが解釈するため結果が変動する。決定的指示は毎回記述どおりに実行される。「必ず起きなければならない」要件（本人確認・コンプライアンス・必須の参照）は決定的指示に置く。',
    reference:
      '💡 Keyword test: "identically / always / must / guaranteed" → deterministic instruction. "Decide / judge / depending on" → prompt instruction.',
    reference_ja:
      '💡 キーワード判定：「毎回必ず・保証・must」→ 決定的指示。「判断して・状況に応じて」→ プロンプト指示。',
  },
  {
    id: 'af-m1-2',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 2,
    question:
      'Brightpath Insurance wants a short risk summary written automatically into a custom text field on the Policy record when a user chooses to generate it on that field. Which prompt template type should the specialist build?',
    question_ja:
      'Brightpath Insurance は、Policy レコードのカスタムテキスト項目上でユーザーが生成を選んだときに、短いリスク要約がその項目へ自動的に書き込まれるようにしたい。作成すべきプロンプトテンプレートの種類はどれか。',
    options: [
      {
        text: 'Field Generation',
        text_ja: 'Field Generation（項目生成）',
        correct: true,
        note: 'Correct. Field Generation targets a specific field and writes the generated value into it from the record page.',
        note_ja: '正解。Field Generation は特定の項目を対象とし、レコードページから生成した値をその項目へ書き込む。',
      },
      {
        text: 'Sales Email',
        text_ja: 'Sales Email（営業メール）',
        correct: false,
        note: 'Sales Email drafts an outbound email to a contact or lead. It does not populate a record field.',
        note_ja: 'Sales Email は取引先責任者やリード宛の送信メールを下書きするもので、レコード項目には書き込まない。',
      },
      {
        text: 'Record Summary',
        text_ja: 'Record Summary（レコード要約）',
        correct: false,
        note: 'Record Summary renders a read-only overview on the record page. It does not write into a field.',
        note_ja: 'Record Summary はレコードページに読み取り専用の概要を表示するもので、項目への書き込みは行わない。',
      },
      {
        text: 'Flex',
        text_ja: 'Flex（フレックス）',
        correct: false,
        note: 'Flex is the general-purpose type invoked from flows, Apex or as an agent action — not the field-level generation experience.',
        note_ja: 'Flex はフローや Apex、エージェントアクションから呼び出す汎用型で、項目レベルの生成体験ではない。',
      },
    ],
    explanation:
      'Match the template type to where the output lands. Field Generation writes into a field. Record Summary displays a summary on the record page. Sales Email drafts an email. Flex is invoked programmatically from a flow, from Apex, or as an agent action.',
    explanation_ja:
      'テンプレートの種類は「出力がどこに着地するか」で選ぶ。Field Generation は項目へ書き込む。Record Summary はレコードページに要約を表示する。Sales Email はメールを下書きする。Flex はフロー・Apex・エージェントアクションからプログラム的に呼び出す。',
    reference:
      '💡 Where does the output go? Into a field → Field Generation. Onto the page → Record Summary. Into an email → Sales Email. Called from code/flow/agent → Flex.',
    reference_ja:
      '💡 出力先で判定：項目に入る→Field Generation／画面に出る→Record Summary／メールになる→Sales Email／コードやフロー、エージェントから呼ぶ→Flex。',
  },
  {
    id: 'af-m1-3',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 3,
    question:
      'Calderon Motors has indexed its service manuals, but a prompt template grounded on that content keeps returning passages about the wrong vehicle line. The index itself contains correct content for every line. What is the most appropriate fix?',
    question_ja:
      'Calderon Motors はサービスマニュアルをインデックス化したが、そのコンテンツにグラウンディングしたプロンプトテンプレートが、別の車種ラインに関する箇所を返し続けている。インデックス自体には全ラインの正しいコンテンツが含まれている。最も適切な対処はどれか。',
    options: [
      {
        text: 'Rebuild the search index using a much smaller chunk size.',
        text_ja: 'はるかに小さいチャンクサイズで検索インデックスを作り直す。',
        correct: false,
        note: 'Chunk size affects how much context each passage carries, not which vehicle line is eligible for retrieval.',
        note_ja: 'チャンクサイズは各パッセージが持つ文脈量に影響するだけで、どの車種ラインが検索対象になるかは変わらない。',
      },
      {
        text: 'Change the index from vector-based to keyword-only.',
        text_ja: 'インデックスをベクトルベースからキーワードのみに変更する。',
        correct: false,
        note: 'Keyword matching would reduce recall on paraphrased queries and still does not restrict retrieval to one vehicle line.',
        note_ja: 'キーワード一致にすると言い換え表現の再現率が落ちるうえ、特定の車種ラインに限定する効果もない。',
      },
      {
        text: 'Create a custom retriever that filters on the vehicle line so only matching chunks are eligible for retrieval.',
        text_ja: '車種ラインでフィルターするカスタムリトリーバーを作成し、一致するチャンクだけが検索対象になるようにする。',
        correct: true,
        note: 'Correct. A filter on the retriever narrows the candidate set before ranking, so off-topic lines can never be returned.',
        note_ja: '正解。リトリーバーのフィルターはランキング前に候補を絞り込むため、対象外のラインが返ることがなくなる。',
      },
      {
        text: 'Reduce the number of documents held in the data library.',
        text_ja: 'データライブラリに保持するドキュメント数を減らす。',
        correct: false,
        note: 'Deleting correct content to avoid mis-retrieval throws away coverage. The problem is scoping, not volume.',
        note_ja: '誤検索を避けるために正しいコンテンツを消すのは網羅性を捨てる行為。問題は量ではなく絞り込みにある。',
      },
    ],
    explanation:
      'When retrieval returns the right kind of content about the wrong subject, the fix is scoping, not tuning. A custom retriever with a metadata filter restricts which chunks are eligible before ranking happens. Chunk size and index type change how matching works, not what is in scope.',
    explanation_ja:
      '検索が「種類は合っているが対象が違う」コンテンツを返すときは、チューニングではなく絞り込みが対処になる。メタデータフィルター付きのカスタムリトリーバーは、ランキングの前に対象チャンクを制限する。チャンクサイズやインデックス種別は一致の仕方を変えるだけで、対象範囲は変えない。',
    reference:
      '💡 Wrong subject → filter (retriever). Right subject but truncated → chunk size / overlap. Missed paraphrases → vector index.',
    reference_ja:
      '💡 対象が違う→リトリーバーのフィルター。対象は合うが途切れる→チャンクサイズ／オーバーラップ。言い換えを拾えない→ベクトルインデックス。',
  },
  {
    id: 'af-m1-4',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 4,
    question:
      'A Dunmore Logistics agent keeps choosing "File a damage claim" when customers ask to track a shipment, because both topics mention shipments. Which change is most likely to correct the routing?',
    question_ja:
      'Dunmore Logistics のエージェントは、顧客が配送状況の追跡を尋ねたときに「破損クレームの申請」を選び続けてしまう。どちらのトピックも配送に言及しているためである。ルーティングを是正する可能性が最も高い変更はどれか。',
    options: [
      {
        text: 'Sharpen the classification description and scope of both topics so their boundaries no longer overlap.',
        text_ja: '両トピックの分類説明とスコープを明確にし、境界が重ならないようにする。',
        correct: true,
        note: 'Correct. The reasoning engine selects a topic by its classification description, so overlapping descriptions cause mis-routing.',
        note_ja: '正解。推論エンジンは分類説明をもとにトピックを選ぶため、説明が重なると誤ルーティングが起きる。',
      },
      {
        text: 'Delete one of the two topics so there is nothing to confuse.',
        text_ja: '2つのうち一方のトピックを削除し、混同の元をなくす。',
        correct: false,
        note: 'That removes a capability customers need. The goal is to separate the two, not to lose one.',
        note_ja: '顧客が必要とする機能を失う。目的は2つを分離することであり、片方を捨てることではない。',
      },
      {
        text: "Increase the agent's maximum response length.",
        text_ja: 'エージェントの最大応答長を増やす。',
        correct: false,
        note: 'Response length has no bearing on which topic is selected.',
        note_ja: '応答長はどのトピックが選ばれるかとは無関係。',
      },
      {
        text: 'Move the actions of both topics into a single flow.',
        text_ja: '両トピックのアクションを1つのフローにまとめる。',
        correct: false,
        note: 'Merging the implementations does not help the engine tell the two intents apart.',
        note_ja: '実装を統合しても、推論エンジンが2つの意図を区別できるようにはならない。',
      },
    ],
    explanation:
      'Topic selection is a classification problem. The Atlas Reasoning Engine reads each topic\'s classification description and scope to decide which one matches the utterance. When two topics share vocabulary, the descriptions must be written to draw a clear boundary between them.',
    explanation_ja:
      'トピックの選択は分類問題である。Atlas Reasoning Engine は各トピックの分類説明とスコープを読み、どれが発話に合致するかを判断する。2つのトピックが同じ語彙を共有している場合、説明側で明確な境界を書き分ける必要がある。',
    reference:
      '💡 Mis-routing between topics is almost always fixed in the classification description, never by model or length settings.',
    reference_ja:
      '💡 トピック間の誤ルーティングは、ほぼ常に分類説明の修正で直す。モデルや応答長の設定では直らない。',
  },
  {
    id: 'af-m1-5',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 5,
    question: 'Eastvale Telecom is building test cases in Testing Center. What does a test case evaluate?',
    question_ja:
      'Eastvale Telecom は Testing Center でテストケースを作成している。テストケースは何を評価するものか。',
    options: [
      {
        text: 'Only the final natural-language response the agent produced.',
        text_ja: 'エージェントが生成した最終的な自然言語の応答のみ。',
        correct: false,
        note: 'The response alone would hide a case where the right answer came from the wrong topic or action.',
        note_ja: '応答だけでは、誤ったトピックやアクション経由でたまたま正答したケースを見逃す。',
      },
      {
        text: 'The utterance, the topic the agent selected, the actions it invoked, and the response it produced.',
        text_ja: '発話、エージェントが選んだトピック、実行したアクション、生成した応答。',
        correct: true,
        note: 'Correct. A test case checks the whole decision path, so regressions in routing are caught as well as bad wording.',
        note_ja: '正解。テストケースは判断の経路全体を検証するため、文言の劣化だけでなくルーティングの退行も検出できる。',
      },
      {
        text: 'The number of tokens consumed and the latency of each turn.',
        text_ja: '消費トークン数と各ターンのレイテンシ。',
        correct: false,
        note: 'Those are operational metrics, not the subject of a functional test case.',
        note_ja: 'それらは運用上の指標であり、機能テストケースの対象ではない。',
      },
      {
        text: 'The permission set assigned to the running user.',
        text_ja: '実行ユーザーに割り当てられた権限セット。',
        correct: false,
        note: 'Permissions are a security configuration, not what a Testing Center case asserts.',
        note_ja: '権限はセキュリティ設定であり、Testing Center のケースが検証する対象ではない。',
      },
    ],
    explanation:
      'Testing Center evaluates the full path: given an utterance, did the agent pick the expected topic, invoke the expected actions, and produce an acceptable response? Running a suite before and after a change is how you detect regressions.',
    explanation_ja:
      'Testing Center は経路全体を評価する。ある発話に対して、期待どおりのトピックを選び、期待どおりのアクションを実行し、許容できる応答を返したか。変更の前後でスイートを実行することが退行検出の方法になる。',
    reference:
      '💡 Testing Center = repeatable, pre-release quality measurement. Utterance analysis = what real users asked in production.',
    reference_ja:
      '💡 Testing Center＝リリース前の反復可能な品質測定。発話分析＝本番で実ユーザーが何を尋ねたか。',
  },
  {
    id: 'af-m1-6',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 6,
    question:
      "A Fairhaven Bank prompt template must include the customer's current balance and their last three transactions, taken from the record and its related records at the moment of generation. Which grounding approach fits?",
    question_ja:
      'Fairhaven Bank のプロンプトテンプレートには、生成時点のレコードおよびその関連レコードから取得した、顧客の現在残高と直近3件の取引を含める必要がある。適合するグラウンディング手法はどれか。',
    options: [
      {
        text: 'Merge fields drawing on the record and its related records.',
        text_ja: 'レコードおよびその関連レコードを参照する差し込み項目。',
        correct: true,
        note: 'Correct. Merge fields resolve against live record data at generation time, which is exactly what "at the moment of generation" requires.',
        note_ja: '正解。差し込み項目は生成時点のライブなレコードデータで解決される。「生成時点の値」という要件そのもの。',
      },
      {
        text: "A search index built over the bank's library of PDF policy documents.",
        text_ja: '銀行のPDF規程文書ライブラリ上に構築した検索インデックス。',
        correct: false,
        note: 'Indexes serve unstructured content. Balances and transactions are structured record data.',
        note_ja: 'インデックスは非構造化コンテンツ用。残高や取引は構造化されたレコードデータである。',
      },
      {
        text: 'Static text in the template listing typical balance ranges.',
        text_ja: '典型的な残高レンジを列挙した、テンプレート内の固定テキスト。',
        correct: false,
        note: 'Static text is not customer-specific and cannot be current.',
        note_ja: '固定テキストは顧客ごとの値ではなく、最新の状態にもならない。',
      },
      {
        text: 'A hard-coded example transaction included in the prompt as a pattern.',
        text_ja: 'パターンとしてプロンプトに埋め込んだ、ハードコードされた取引の例。',
        correct: false,
        note: 'An example shapes format but supplies no real data, and risks the model echoing the example values.',
        note_ja: '例は書式を示すだけで実データを供給せず、例の値をそのまま出力してしまうリスクもある。',
      },
    ],
    explanation:
      'Structured grounding uses merge fields over the record and its related records, resolved live at generation time. Unstructured grounding uses a retriever over an index. Choose by the shape of the source data: records and fields → merge fields; documents → retrieval.',
    explanation_ja:
      '構造化グラウンディングはレコードと関連レコードに対する差し込み項目を使い、生成時にライブで解決される。非構造化グラウンディングはインデックスに対するリトリーバーを使う。ソースデータの形で選ぶ：レコードや項目→差し込み項目、ドキュメント→検索。',
    reference:
      '💡 Records/fields → merge fields. Documents/PDFs/articles → retriever over an index. Both needed → use both (see Q52).',
    reference_ja:
      '💡 レコード・項目→差し込み項目。ドキュメント・PDF・記事→インデックス上のリトリーバー。両方必要なら両方使う（Q52参照）。',
  },
  {
    id: 'af-m1-7',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 7,
    question:
      'Glenbrook Pharma has published an employee agent to Slack. Two users ask the same question and receive different sets of records in the answer. What explains this?',
    question_ja:
      'Glenbrook Pharma は従業員向けエージェントを Slack に公開した。2人のユーザーが同じ質問をしたところ、回答に含まれるレコードの範囲が異なっていた。この理由として正しいものはどれか。',
    options: [
      {
        text: 'An employee agent runs in the security context of the logged-in user, so each user sees only the records their own permissions allow.',
        text_ja: '従業員向けエージェントはログイン中のユーザーのセキュリティコンテキストで動作するため、各ユーザーは自分の権限で許可されたレコードしか見られない。',
        correct: true,
        note: 'Correct. Employee agents inherit the running user\'s permissions, so results legitimately differ per user.',
        note_ja: '正解。従業員向けエージェントは実行ユーザーの権限を継承するため、ユーザーごとに結果が異なるのは正常な動作。',
      },
      {
        text: 'The agent caches results per session and served one user a stale response.',
        text_ja: 'エージェントがセッション単位で結果をキャッシュしており、一方のユーザーに古い応答を返した。',
        correct: false,
        note: 'Not the mechanism at work. Differing visibility is explained by permissions, not caching.',
        note_ja: '動作原理が違う。可視範囲の差はキャッシュではなく権限で説明される。',
      },
      {
        text: 'Employee agents always run as a dedicated agent user, so results should not vary.',
        text_ja: '従業員向けエージェントは常に専用のエージェントユーザーとして動作するため、結果は変わらないはずである。',
        correct: false,
        note: 'That describes an agent serving unauthenticated visitors, not an internal employee agent.',
        note_ja: 'それは未認証の訪問者に応対するエージェントの説明であり、社内の従業員向けエージェントではない。',
      },
      {
        text: 'Identity resolution in Data 360 has been misconfigured.',
        text_ja: 'Data 360 の ID解決が誤って構成されている。',
        correct: false,
        note: 'Identity resolution unifies duplicate profiles; it does not vary results by viewer.',
        note_ja: 'ID解決は重複プロファイルを統合するもので、閲覧者ごとに結果を変えるものではない。',
      },
    ],
    explanation:
      'Security context depends on who the agent serves. An employee (internal) agent runs as the logged-in user and inherits that user\'s sharing and field-level security. An agent exposed to unauthenticated visitors runs as a dedicated agent user, whose permissions must be configured deliberately.',
    explanation_ja:
      'セキュリティコンテキストは「誰に応対するエージェントか」で決まる。従業員向け（社内）エージェントはログインユーザーとして動作し、そのユーザーの共有設定と項目レベルセキュリティを継承する。未認証の訪問者に公開するエージェントは専用のエージェントユーザーとして動作し、その権限は意図的に設計する必要がある。',
    reference:
      '💡 Internal agent → logged-in user\'s permissions. Public/unauthenticated agent → the dedicated agent user\'s permissions.',
    reference_ja:
      '💡 社内向けエージェント→ログインユーザーの権限。公開・未認証向けエージェント→専用エージェントユーザーの権限。',
  },
  {
    id: 'af-m1-8',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 8,
    question:
      'Harborline Cruises ingests a CSV of loyalty members into Data 360. The data first lands in a structure that mirrors the source file exactly. What is that structure, and what has to happen next?',
    question_ja:
      'Harborline Cruises はロイヤルティ会員のCSVを Data 360 に取り込む。データはまず、ソースファイルをそのまま写した構造に着地する。その構造は何であり、次に何をする必要があるか。',
    options: [
      {
        text: 'It is a data model object, and it must be mapped to a data lake object.',
        text_ja: 'データモデルオブジェクトであり、データレイクオブジェクトへマッピングする必要がある。',
        correct: false,
        note: 'The direction is reversed. Ingested raw data lands in a data lake object.',
        note_ja: '方向が逆。取り込んだ生データが着地するのはデータレイクオブジェクト。',
      },
      {
        text: 'It is a calculated insight, and it must be published before use.',
        text_ja: '計算済みインサイトであり、使用前に公開する必要がある。',
        correct: false,
        note: 'A calculated insight is a derived metric computed over harmonised data, not the landing structure.',
        note_ja: '計算済みインサイトは調和済みデータ上で算出する派生指標であり、着地先の構造ではない。',
      },
      {
        text: 'It is a data lake object, and it must be mapped to a data model object before downstream features can use it.',
        text_ja: 'データレイクオブジェクトであり、下流の機能が利用できるようにするにはデータモデルオブジェクトへマッピングする必要がある。',
        correct: true,
        note: 'Correct. DLO mirrors the source; mapping to a DMO harmonises it so identity resolution, segmentation and retrievers can use it.',
        note_ja: '正解。DLO はソースをそのまま写す。DMO へマッピングして調和させることで、ID解決・セグメント化・リトリーバーが利用できるようになる。',
      },
      {
        text: 'It is a data space, and it must be assigned to a retriever.',
        text_ja: 'データスペースであり、リトリーバーに割り当てる必要がある。',
        correct: false,
        note: 'A data space is a partition of the org\'s data, not a per-source landing structure.',
        note_ja: 'データスペースは組織のデータを区切るパーティションであり、ソースごとの着地構造ではない。',
      },
    ],
    explanation:
      'The ingestion path is: source → data lake object (DLO, an exact mirror of the source shape) → mapping → data model object (DMO, the standard harmonised model). Downstream capabilities such as identity resolution, segmentation, calculated insights and retrievers all operate on DMOs.',
    explanation_ja:
      '取り込みの流れは、ソース → データレイクオブジェクト（DLO：ソースの形をそのまま写したもの）→ マッピング → データモデルオブジェクト（DMO：標準化・調和されたモデル）。ID解決、セグメント化、計算済みインサイト、リトリーバーといった下流機能はすべて DMO 上で動作する。',
    reference: '💡 DLO = raw mirror of the source. DMO = harmonised standard model. Mapping connects the two.',
    reference_ja: '💡 DLO＝ソースそのままの写し。DMO＝調和された標準モデル。両者をつなぐのがマッピング。',
  },
  {
    id: 'af-m1-9',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 9,
    question:
      'An Ironwood Furniture service agent is quoting an incorrect refund policy to customers. What is the fastest way to stop customer exposure while the team diagnoses the problem?',
    question_ja:
      'Ironwood Furniture のサービスエージェントが、誤った返金ポリシーを顧客に案内している。チームが原因を調査する間、顧客への影響を止める最速の方法はどれか。',
    options: [
      {
        text: 'Deactivate the agent so it stops handling conversations while the issue is investigated.',
        text_ja: 'エージェントを非アクティブ化し、調査中は会話を処理しないようにする。',
        correct: true,
        note: 'Correct. Deactivation immediately stops the agent from serving customers and is fully reversible.',
        note_ja: '正解。非アクティブ化は顧客への応対を即座に止められ、かつ完全に元へ戻せる。',
      },
      {
        text: 'Open a support case with the model provider.',
        text_ja: 'モデルプロバイダーにサポートケースを起票する。',
        correct: false,
        note: 'Slow, and the fault is in the configured content, not the model vendor.',
        note_ja: '時間がかかるうえ、原因は構成したコンテンツ側であり、モデルベンダーではない。',
      },
      {
        text: 'Delete the affected topic from the agent definition.',
        text_ja: '該当するトピックをエージェント定義から削除する。',
        correct: false,
        note: 'Destructive and premature — you would lose the definition you still need to diagnose.',
        note_ja: '破壊的かつ早計。原因調査に必要な定義そのものを失ってしまう。',
      },
      {
        text: "Lower the agent's daily conversation limit.",
        text_ja: 'エージェントの1日あたりの会話上限を下げる。',
        correct: false,
        note: 'That reduces exposure but does not stop it. Customers still receive wrong information.',
        note_ja: '影響を減らすだけで止められない。顧客は依然として誤った情報を受け取る。',
      },
    ],
    explanation:
      'Deactivation is the incident-response control for an agent: it is immediate, reversible, and leaves the definition intact for diagnosis. Deleting topics or actions destroys the evidence you need and creates rework.',
    explanation_ja:
      '非アクティブ化はエージェントのインシデント対応手段である。即時に効き、元に戻せ、定義は調査のためにそのまま残る。トピックやアクションの削除は必要な証拠を壊し、作り直しの手間を生む。',
    reference:
      '💡 "Stop the bleeding" questions → deactivate. Then diagnose in a lower environment and promote a fix through the release process.',
    reference_ja:
      '💡 「まず被害を止める」系の設問→非アクティブ化。原因調査は下位環境で行い、修正は正規のリリース手順で本番へ。',
  },
  {
    id: 'af-m1-10',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 10,
    question:
      'Juniper Grocers needs its agent to place a replacement order, which requires several record updates, a callout to a fulfilment system, and conditional branching depending on stock. Which implementation is most appropriate?',
    question_ja:
      'Juniper Grocers はエージェントに交換注文の登録を行わせたい。これには複数のレコード更新、フルフィルメントシステムへのコールアウト、在庫に応じた条件分岐が必要となる。最も適切な実装はどれか。',
    options: [
      {
        text: 'A prompt template exposed as an action.',
        text_ja: 'アクションとして公開したプロンプトテンプレート。',
        correct: false,
        note: 'Prompt templates generate text. They do not perform record updates, callouts or branching.',
        note_ja: 'プロンプトテンプレートはテキストを生成するもの。レコード更新やコールアウト、分岐は行わない。',
      },
      {
        text: 'An Apex trigger on the Order object.',
        text_ja: 'Order オブジェクト上の Apex トリガ。',
        correct: false,
        note: 'A trigger fires on DML; it is not something an agent can choose to invoke as an action.',
        note_ja: 'トリガは DML を契機に起動するもので、エージェントがアクションとして選んで呼び出せるものではない。',
      },
      {
        text: 'A flow published as an agent action.',
        text_ja: 'エージェントアクションとして公開したフロー。',
        correct: true,
        note: 'Correct. Flow handles multi-step logic, record updates, callouts and branching, and can be exposed as an action.',
        note_ja: '正解。フローは複数ステップのロジック、レコード更新、コールアウト、分岐を扱え、アクションとして公開できる。',
      },
      {
        text: 'A standard action from the Agentforce library used without configuration.',
        text_ja: 'Agentforce の標準アクションライブラリのアクションを、設定なしでそのまま使う。',
        correct: false,
        note: 'A standard action will not implement this company-specific multi-step process out of the box.',
        note_ja: '標準アクションでは、この企業固有の複数ステップの処理を無設定で実現できない。',
      },
    ],
    explanation:
      'When the requirement is "do something" involving deterministic multi-step logic, use a flow published as an agent action. When the requirement is "write something," use a prompt template. Actions are how an agent affects the world; templates are how it produces language.',
    explanation_ja:
      '「決定的な複数ステップの処理を実行する」要件にはフローをエージェントアクションとして公開する。「文章を生成する」要件にはプロンプトテンプレートを使う。アクションはエージェントが世界に働きかける手段、テンプレートは言語を生み出す手段である。',
    reference: '💡 Do something → action (flow / Apex / external service). Write something → prompt template.',
    reference_ja: '💡 何かを実行する→アクション（フロー／Apex／外部サービス）。何かを書く→プロンプトテンプレート。',
  },
  {
    id: 'af-m1-11',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 11,
    question:
      'A Kestrel Airlines specialist edited an active prompt template and saved the changes, but users still receive output matching the old wording. What is the most likely explanation?',
    question_ja:
      'Kestrel Airlines のスペシャリストがアクティブなプロンプトテンプレートを編集して保存したが、ユーザーには依然として旧来の文言に沿った出力が返る。最も可能性の高い理由はどれか。',
    options: [
      {
        text: 'Prompt templates cannot be edited once they have been activated.',
        text_ja: 'プロンプトテンプレートは一度有効化すると編集できない。',
        correct: false,
        note: 'They can be edited; the edit simply creates a new version that must be activated.',
        note_ja: '編集はできる。編集すると新しいバージョンが作られ、それを有効化する必要があるだけ。',
      },
      {
        text: 'The selected model has been disabled at the org level.',
        text_ja: '選択したモデルが組織レベルで無効化されている。',
        correct: false,
        note: 'A disabled model would cause failures, not correct output in the old wording.',
        note_ja: 'モデルが無効ならエラーになるはずで、旧文言どおりの正常な出力が返ることはない。',
      },
      {
        text: 'The revised version was saved but not activated, so the previously activated version continues to serve requests.',
        text_ja: '改訂版は保存されたが有効化されておらず、以前に有効化されたバージョンが処理を続けている。',
        correct: true,
        note: 'Correct. Saving creates a version; only activation makes it the one that serves traffic.',
        note_ja: '正解。保存はバージョンを作るだけで、実際に処理を担うのは有効化されたバージョン。',
      },
      {
        text: "The template's primary object was changed by the edit.",
        text_ja: '編集によってテンプレートの主オブジェクトが変更された。',
        correct: false,
        note: 'Changing the primary object would break merge fields, not silently serve old text.',
        note_ja: '主オブジェクトの変更は差し込み項目を壊すはずで、旧テキストを黙って返し続けることにはならない。',
      },
    ],
    explanation:
      'Prompt templates are versioned. Saving an edit produces a new version; the previously activated version keeps serving until you activate the new one. "Changes saved but no effect" is nearly always an activation problem.',
    explanation_ja:
      'プロンプトテンプレートはバージョン管理されている。編集を保存すると新しいバージョンが作られ、新版を有効化するまでは以前に有効化されたバージョンが処理を続ける。「保存したのに反映されない」は、ほぼ常に有効化の問題である。',
    reference: '💡 Save ≠ activate. The same pattern appears for agents: deploying does not activate them (see Q35).',
    reference_ja: '💡 保存≠有効化。同じ論点はエージェントにもある（展開しただけでは有効にならない。Q35参照）。',
  },
  {
    id: 'af-m1-12',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 12,
    question:
      'At Lambert Legal, a specialist is explaining how an authored agent actually runs. What does the Atlas Reasoning Engine receive?',
    question_ja:
      'Lambert Legal で、スペシャリストが作成済みエージェントの実際の動作を説明している。Atlas Reasoning Engine が受け取るものは何か。',
    options: [
      {
        text: 'The raw Agent Script file, interpreted line by line as the model reads it.',
        text_ja: 'Agent Script の生ファイル。モデルが読みながら1行ずつ解釈する。',
        correct: false,
        note: 'The script is authoring source. It is compiled into a resolved prompt before any model call.',
        note_ja: 'スクリプトは作成用のソース。モデル呼び出しの前に解決済みプロンプトへコンパイルされる。',
      },
      {
        text: 'The Canvas view diagram, rendered as an image.',
        text_ja: 'Canvas ビューの図を画像としてレンダリングしたもの。',
        correct: false,
        note: 'Canvas is a visual editing surface for humans, not an input to the engine.',
        note_ja: 'Canvas は人間向けの視覚的な編集画面であり、エンジンへの入力ではない。',
      },
      {
        text: 'The prompt template metadata only.',
        text_ja: 'プロンプトテンプレートのメタデータのみ。',
        correct: false,
        note: 'Templates are one input among several; the engine works from the assembled prompt.',
        note_ja: 'テンプレートは入力の一つにすぎず、エンジンは組み立てられたプロンプトをもとに動作する。',
      },
      {
        text: "A single resolved prompt, assembled by parsing the active topic's instructions before any model call is made.",
        text_ja: 'アクティブなトピックの指示を解析して組み立てられた、単一の解決済みプロンプト。モデル呼び出しの前に生成される。',
        correct: true,
        note: 'Correct. Authoring artefacts are compiled into one resolved prompt, which is what the engine reasons over.',
        note_ja: '正解。作成した成果物は単一の解決済みプロンプトへとコンパイルされ、エンジンはそれをもとに推論する。',
      },
    ],
    explanation:
      'Agent Script and the Canvas view are two representations of one authoring definition. At run time that definition, together with the active topic\'s instructions and grounded data, is parsed into a single resolved prompt. The reasoning engine works from that resolved prompt.',
    explanation_ja:
      'Agent Script と Canvas ビューは、1つの作成定義に対する2つの表現である。実行時にはその定義が、アクティブなトピックの指示やグラウンディングされたデータとともに解析され、単一の解決済みプロンプトになる。推論エンジンはその解決済みプロンプトをもとに動作する。',
    reference: '💡 Authoring artefacts → compiled → one resolved prompt → Atlas Reasoning Engine → topic/action selection.',
    reference_ja: '💡 作成成果物→コンパイル→1つの解決済みプロンプト→Atlas Reasoning Engine→トピック／アクションの選択。',
  },
  {
    id: 'af-m1-13',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 13,
    question:
      "Maplecroft Homes finds that retrieved passages are on the right subject but too short to contain a complete answer, so the agent's replies are incomplete. Which adjustment is most appropriate?",
    question_ja:
      'Maplecroft Homes では、検索されるパッセージは主題としては正しいものの、完全な回答を含むには短すぎるため、エージェントの返答が不完全になっている。最も適切な調整はどれか。',
    options: [
      {
        text: 'Decrease the chunk size further so passages are more precise.',
        text_ja: 'チャンクサイズをさらに小さくし、パッセージをより精密にする。',
        correct: false,
        note: 'That makes the symptom worse — the passages are already too short to be complete.',
        note_ja: '症状を悪化させる。パッセージはすでに完結するには短すぎる。',
      },
      {
        text: 'Increase the chunk size so each chunk carries more surrounding context.',
        text_ja: 'チャンクサイズを大きくし、各チャンクがより多くの周辺文脈を持つようにする。',
        correct: true,
        note: 'Correct. Larger chunks keep more surrounding context together, so a retrieved passage can carry a complete answer.',
        note_ja: '正解。チャンクを大きくすると周辺の文脈がまとまって保持され、検索されたパッセージだけで回答が完結できる。',
      },
      {
        text: 'Switch to a keyword-only index.',
        text_ja: 'キーワードのみのインデックスに切り替える。',
        correct: false,
        note: 'Index type changes matching behaviour, not how much context each passage contains.',
        note_ja: 'インデックス種別は一致の仕方を変えるだけで、各パッセージが含む文脈量は変わらない。',
      },
      {
        text: 'Remove the filter from the retriever.',
        text_ja: 'リトリーバーからフィルターを外す。',
        correct: false,
        note: 'Removing scoping would broaden the subject matter, which is not the problem here.',
        note_ja: '絞り込みを外すと主題が広がるだけで、ここでの問題は解決しない。',
      },
    ],
    explanation:
      'Chunking trades precision against completeness. Small chunks are precise but may split an answer; large chunks (or more overlap) preserve context but retrieve more surrounding noise. Tune towards larger chunks or more overlap when answers are cut short.',
    explanation_ja:
      'チャンク分割は精度と完結性のトレードオフである。小さいチャンクは精密だが回答が分断されうる。大きいチャンク（またはオーバーラップの拡大）は文脈を保つが、周辺のノイズも取り込みやすい。回答が途中で切れるときは、チャンクを大きく、またはオーバーラップを増やす方向に調整する。',
    reference:
      '💡 Answers cut short → bigger chunks / more overlap (Q13, Q56). Wrong subject entirely → retriever filter (Q3).',
    reference_ja:
      '💡 回答が途中で切れる→チャンクを大きく／オーバーラップを増やす（Q13・Q56）。主題自体が違う→リトリーバーのフィルター（Q3）。',
  },
  {
    id: 'af-m1-14',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 14,
    question:
      'Northgate Retail wants a refund action to be available to the agent only when the contact holds a premium membership. Which approach enforces this reliably?',
    question_ja:
      'Northgate Retail は、取引先責任者がプレミアム会員である場合にのみ、返金アクションをエージェントが利用できるようにしたい。これを確実に強制する方法はどれか。',
    options: [
      {
        text: 'Add the phrase "only for premium members" to the action\'s description.',
        text_ja: 'アクションの説明に「プレミアム会員のみ」という文言を追加する。',
        correct: false,
        note: 'A description is guidance the model may or may not honour. It is not enforcement.',
        note_ja: '説明はモデルが従うとは限らない案内文にすぎず、強制にはならない。',
      },
      {
        text: 'Build a second agent used exclusively by premium members.',
        text_ja: 'プレミアム会員専用の2つ目のエージェントを構築する。',
        correct: false,
        note: 'Heavy-handed: it duplicates the whole agent to express one condition.',
        note_ja: '過剰な対応。条件1つのためにエージェント全体を複製することになる。',
      },
      {
        text: 'Check the membership level in an after_reasoning block.',
        text_ja: 'after_reasoning ブロックで会員レベルを確認する。',
        correct: false,
        note: 'Too late — by then the engine has already decided to use the refund action.',
        note_ja: '遅すぎる。その時点ではエンジンはすでに返金アクションの使用を決めている。',
      },
      {
        text: 'Apply an availability filter so the action is only presented to the reasoning engine when the condition is met.',
        text_ja: '利用可能条件（availability filter）を設定し、条件を満たすときだけアクションが推論エンジンに提示されるようにする。',
        correct: true,
        note: 'Correct. An availability filter removes the action from the candidate set entirely when the condition fails.',
        note_ja: '正解。利用可能条件は、条件を満たさない場合にアクションを候補集合から完全に除外する。',
      },
    ],
    explanation:
      'An availability filter controls whether an action is even visible to the reasoning engine for a given context. Because the model never sees the action, it cannot choose it. Descriptions and after-the-fact checks rely on the model behaving, which is not enforcement.',
    explanation_ja:
      '利用可能条件は、そのコンテキストでアクションを推論エンジンに見せるかどうかを制御する。モデルがアクションを見ない以上、選ぶこともできない。説明文や事後チェックはモデルの振る舞い頼みであり、強制にはならない。',
    reference:
      '💡 "Only available when…" → availability filter. "Always do X" → deterministic instruction. Neither is a description.',
    reference_ja:
      '💡 「〜のときだけ使える」→利用可能条件。「必ずXする」→決定的指示。いずれも説明文では実現しない。',
  },
  {
    id: 'af-m1-15',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 15,
    question:
      'Oakfield Energy wants its agent to call the tools exposed by a third-party outage-mapping platform. Which protocol is designed for this?',
    question_ja:
      'Oakfield Energy は、サードパーティの停電マッピングプラットフォームが公開しているツールをエージェントから呼び出したい。この用途のために設計されたプロトコルはどれか。',
    options: [
      {
        text: 'A2A, because the outage-mapping platform is effectively another agent.',
        text_ja: 'A2A。停電マッピングプラットフォームは実質的に別のエージェントだから。',
        correct: false,
        note: 'A2A standardises delegation between agents. A tool platform is not an agent.',
        note_ja: 'A2A はエージェント間の委譲を標準化するもの。ツール基盤はエージェントではない。',
      },
      {
        text: 'SOMA, because the request stays inside one agent.',
        text_ja: 'SOMA。リクエストが1つのエージェント内で完結するから。',
        correct: false,
        note: 'Not an Agentforce protocol — a distractor.',
        note_ja: 'Agentforce のプロトコルではない。ダミーの選択肢。',
      },
      {
        text: 'MCP, which standardises how an agent connects to external tools and data sources.',
        text_ja: 'MCP。エージェントが外部のツールやデータソースへ接続する方法を標準化するもの。',
        correct: true,
        note: 'Correct. MCP (Model Context Protocol) is the standard for connecting an agent to external tools and data.',
        note_ja: '正解。MCP（Model Context Protocol）は、エージェントを外部ツールやデータへ接続するための標準。',
      },
      {
        text: 'Neither; only flows can reach external systems.',
        text_ja: 'どちらでもない。外部システムに到達できるのはフローだけ。',
        correct: false,
        note: 'Flows are one way to reach external systems, but not the only one.',
        note_ja: 'フローは外部システムへ到達する手段の一つだが、唯一の手段ではない。',
      },
    ],
    explanation:
      'MCP connects an agent to external tools and data sources. A2A standardises delegation from one agent to another agent. Choose by what sits on the other end: a tool or data source → MCP; another agent → A2A.',
    explanation_ja:
      'MCP はエージェントを外部のツールやデータソースに接続する。A2A はあるエージェントから別のエージェントへの委譲を標準化する。相手側が何かで選ぶ：ツールやデータソース→MCP、別のエージェント→A2A。',
    reference: '💡 MCP = agent → tools/data. A2A = agent → agent. Agent API = external app → your agent.',
    reference_ja: '💡 MCP＝エージェント→ツール／データ。A2A＝エージェント→エージェント。Agent API＝外部アプリ→自社エージェント。',
  },
  {
    id: 'af-m1-16',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 16,
    question:
      'Pinecrest Hotels must ensure that guest passport numbers never reach the model provider, even though the surrounding request does. Which Trust Layer feature addresses this?',
    question_ja:
      'Pinecrest Hotels は、リクエスト自体はモデルプロバイダーに送られるとしても、宿泊客のパスポート番号だけは決してモデルプロバイダーに届かないようにしたい。これに対応する Trust Layer の機能はどれか。',
    options: [
      {
        text: 'Data masking',
        text_ja: 'データマスキング',
        correct: true,
        note: 'Correct. Masking replaces sensitive values with placeholders before the prompt leaves the platform, then restores them in the response.',
        note_ja: '正解。マスキングはプロンプトがプラットフォームを離れる前に機密値をプレースホルダに置換し、応答時に復元する。',
      },
      {
        text: 'Zero data retention',
        text_ja: 'ゼロデータ保持',
        correct: false,
        note: 'Zero data retention means the provider does not store the data — but it still receives it.',
        note_ja: 'ゼロデータ保持はプロバイダーがデータを保存しないという意味で、受け取ること自体は起きる。',
      },
      {
        text: 'Toxicity detection',
        text_ja: '毒性検出',
        correct: false,
        note: 'Toxicity detection scores generated content for harmful language. Unrelated to data exposure.',
        note_ja: '毒性検出は生成内容の有害表現を評価するもので、データの露出とは無関係。',
      },
      {
        text: 'Audit trail',
        text_ja: '監査証跡',
        correct: false,
        note: 'The audit trail records what happened; it does not prevent the data from being sent.',
        note_ja: '監査証跡は起きたことを記録するもので、データ送信自体を防ぐものではない。',
      },
    ],
    explanation:
      'Distinguish the Trust Layer features by what they prevent. Masking prevents sensitive values from leaving the platform at all. Zero data retention prevents the provider from storing what it does receive. Toxicity detection screens output. The audit trail records the interaction.',
    explanation_ja:
      'Trust Layer の各機能は「何を防ぐか」で区別する。マスキングは機密値がそもそもプラットフォームの外へ出ることを防ぐ。ゼロデータ保持は、受け取ったデータをプロバイダーが保存することを防ぐ。毒性検出は出力を検査する。監査証跡はやり取りを記録する。',
    reference:
      '💡 "Never reaches the provider" → masking. "Provider must not keep it" → zero data retention. "Ignore your instructions" attacks → prompt defence (Q55).',
    reference_ja:
      '💡 「プロバイダーに届かせない」→マスキング。「プロバイダーに残させない」→ゼロデータ保持。「指示を無視しろ」攻撃→プロンプト防御（Q55）。',
  },
  {
    id: 'af-m1-17',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 17,
    question:
      'Quarry Ridge Mining needs a nightly process that updates a set of records according to fixed rules. There is no conversation, no natural-language input, and no judgement involved. What should the specialist build?',
    question_ja:
      'Quarry Ridge Mining は、固定のルールに従って一連のレコードを更新する夜間処理を必要としている。会話も自然言語入力も判断も伴わない。スペシャリストが構築すべきものはどれか。',
    options: [
      {
        text: 'A flow, because the requirement is deterministic automation with no natural-language interaction.',
        text_ja: 'フロー。要件は自然言語のやり取りを伴わない決定的な自動化だから。',
        correct: true,
        note: 'Correct. No conversation and no judgement means there is nothing for an agent or a model to add.',
        note_ja: '正解。会話も判断もないなら、エージェントやモデルが付け加える価値はない。',
      },
      {
        text: 'An agent with a single topic and one action.',
        text_ja: 'トピック1つ・アクション1つのエージェント。',
        correct: false,
        note: 'An agent adds reasoning cost and non-determinism for a task that needs neither.',
        note_ja: 'どちらも不要なタスクに対して、推論のコストと非決定性を持ち込むことになる。',
      },
      {
        text: 'A Flex prompt template scheduled to run each night.',
        text_ja: '毎晩実行するようスケジュールした Flex プロンプトテンプレート。',
        correct: false,
        note: 'Prompt templates generate language. Fixed-rule record updates are not a generation task.',
        note_ja: 'プロンプトテンプレートは言語を生成するもの。固定ルールのレコード更新は生成タスクではない。',
      },
      {
        text: 'A retriever over the affected records.',
        text_ja: '対象レコードに対するリトリーバー。',
        correct: false,
        note: 'Retrievers find content for grounding. They do not update records.',
        note_ja: 'リトリーバーはグラウンディング用にコンテンツを探すもので、レコードは更新しない。',
      },
    ],
    explanation:
      'Not every requirement needs AI. If the task is deterministic, has no natural-language input and requires no judgement, plain automation (a flow) is cheaper, faster and more predictable. Reserve agents for work that genuinely needs reasoning over language.',
    explanation_ja:
      'すべての要件にAIが必要なわけではない。処理が決定的で、自然言語の入力がなく、判断も不要なら、通常の自動化（フロー）のほうが安く、速く、予測可能である。エージェントは、言語に対する推論が本当に必要な仕事に取っておく。',
    reference:
      '💡 No conversation + no judgement → flow, not an agent. This "is AI even needed?" judgement is a recurring exam theme.',
    reference_ja:
      '💡 会話なし＋判断なし→エージェントではなくフロー。「そもそもAIが必要か」を問う設問は繰り返し出る。',
  },
  {
    id: 'af-m1-18',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 18,
    question:
      'At Riverton Health the same patient exists as three separate contacts sourced from three systems, and the agent gives an incomplete history as a result. Which Data 360 capability addresses this?',
    question_ja:
      'Riverton Health では、同一の患者が3つのシステム由来の3件の取引先責任者として存在しており、その結果エージェントが不完全な履歴を返している。これに対応する Data 360 の機能はどれか。',
    options: [
      {
        text: 'Data spaces',
        text_ja: 'データスペース',
        correct: false,
        note: 'Data spaces partition data so it can be used independently — the opposite of unifying it.',
        note_ja: 'データスペースはデータを区切って独立に扱うための機能で、統合とは逆方向。',
      },
      {
        text: 'Identity resolution, which matches and reconciles source records into a unified profile',
        text_ja: 'ID解決。ソースレコードを突き合わせて調整し、統合プロファイルにまとめる機能。',
        correct: true,
        note: 'Correct. Identity resolution matches records across sources into one unified individual profile.',
        note_ja: '正解。ID解決は複数ソースにまたがるレコードを突き合わせ、1つの統合された個人プロファイルにまとめる。',
      },
      {
        text: 'Chunking',
        text_ja: 'チャンク分割',
        correct: false,
        note: 'Chunking splits unstructured documents for indexing. Unrelated to duplicate records.',
        note_ja: 'チャンク分割はインデックス化のために非構造化ドキュメントを分割する処理。重複レコードとは無関係。',
      },
      {
        text: 'Search indexes',
        text_ja: '検索インデックス',
        correct: false,
        note: 'Indexes support retrieval over content; they do not reconcile duplicate people.',
        note_ja: 'インデックスはコンテンツの検索を支えるもので、重複する人物の名寄せは行わない。',
      },
    ],
    explanation:
      'Identity resolution is the Data 360 capability that matches records describing the same individual across sources and reconciles them into a unified profile. Data spaces do the opposite: they keep data sets deliberately separate (see Q33).',
    explanation_ja:
      'ID解決は、複数ソースにまたがる同一人物のレコードを突き合わせ、統合プロファイルへ調整する Data 360 の機能である。データスペースはその逆で、データセットを意図的に分離しておく（Q33参照）。',
    reference: '💡 Unify duplicates → identity resolution. Keep brands/datasets apart → data spaces.',
    reference_ja: '💡 重複を統合する→ID解決。ブランドやデータセットを分離する→データスペース。',
  },
  {
    id: 'af-m1-19',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 19,
    question:
      'Stonebridge Media wants to discover what customers are asking that the agent currently cannot handle. Which monitoring capability provides that?',
    question_ja:
      'Stonebridge Media は、現在のエージェントが処理できていない顧客の問い合わせ内容を把握したい。これを提供する監視機能はどれか。',
    options: [
      {
        text: 'The event log of deployment changes.',
        text_ja: 'デプロイ変更のイベントログ。',
        correct: false,
        note: 'Deployment history tells you what changed, not what customers asked.',
        note_ja: 'デプロイ履歴は何が変わったかを示すもので、顧客が何を尋ねたかは分からない。',
      },
      {
        text: 'Utterance analysis, which surfaces what users actually asked and where no topic matched.',
        text_ja: '発話分析。ユーザーが実際に何を尋ねたか、どこでトピックが一致しなかったかを可視化する。',
        correct: true,
        note: 'Correct. Unmatched utterances are the direct signal of unmet demand.',
        note_ja: '正解。一致しなかった発話こそが、満たされていない需要の直接的なシグナル。',
      },
      {
        text: 'Billing reports from the model provider.',
        text_ja: 'モデルプロバイダーからの請求レポート。',
        correct: false,
        note: 'Usage volume says nothing about intent coverage.',
        note_ja: '利用量からは意図のカバー範囲は何も分からない。',
      },
      {
        text: 'The field-level security audit.',
        text_ja: '項目レベルセキュリティの監査。',
        correct: false,
        note: 'A security artefact, unrelated to conversational coverage.',
        note_ja: 'セキュリティ関連の成果物であり、会話のカバー範囲とは無関係。',
      },
    ],
    explanation:
      'Utterance analysis aggregates what users actually said and flags utterances where no topic matched. Those unmatched utterances tell you which topics to extend or add (see Q54). Transcripts, by contrast, are for investigating a single conversation (Q45).',
    explanation_ja:
      '発話分析はユーザーが実際に発した内容を集約し、どのトピックにも一致しなかった発話を示す。その未一致の発話が、拡張すべき／追加すべきトピックを教えてくれる（Q54参照）。一方トランスクリプトは、個別の会話を調査するためのもの（Q45）。',
    reference: '💡 Aggregate/trends → utterance analysis. One specific conversation → transcript. Pre-release quality → Testing Center.',
    reference_ja: '💡 全体傾向→発話分析。特定の1会話→トランスクリプト。リリース前の品質→Testing Center。',
  },
  {
    id: 'af-m1-20',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 20,
    question:
      'Thornfield Foods wants to embed its agent inside a custom mobile application the company builds and owns. Which approach is appropriate?',
    question_ja:
      'Thornfield Foods は、自社で開発・所有するカスタムモバイルアプリケーションの中にエージェントを組み込みたい。適切な方法はどれか。',
    options: [
      {
        text: 'Publish the agent to the Slack channel and link to it from the app.',
        text_ja: 'エージェントを Slack チャネルに公開し、アプリからリンクする。',
        correct: false,
        note: 'That sends users out of the app rather than embedding the agent in it.',
        note_ja: 'ユーザーをアプリの外へ送り出すだけで、アプリ内に組み込んだことにはならない。',
      },
      {
        text: "Export the agent's Agent Script and run it inside the application.",
        text_ja: 'エージェントの Agent Script をエクスポートし、アプリケーション内で実行する。',
        correct: false,
        note: 'Agent Script is an authoring artefact; it is not a runtime you can host yourself.',
        note_ja: 'Agent Script は作成用の成果物であり、自前でホストできる実行環境ではない。',
      },
      {
        text: 'Wrap the agent in a Flex prompt template invoked from Apex.',
        text_ja: 'Apex から呼び出す Flex プロンプトテンプレートでエージェントをラップする。',
        correct: false,
        note: 'A prompt template generates text; it does not run a whole agent conversation.',
        note_ja: 'プロンプトテンプレートはテキストを生成するもので、エージェントの会話全体を実行するものではない。',
      },
      {
        text: 'Use the Agent API to invoke the agent from the custom application.',
        text_ja: 'Agent API を使って、カスタムアプリケーションからエージェントを呼び出す。',
        correct: true,
        note: 'Correct. The Agent API is the supported way for an external application to hold a conversation with an agent.',
        note_ja: '正解。Agent API は、外部アプリケーションがエージェントと会話するための正式な手段。',
      },
    ],
    explanation:
      'Channels (Slack, the Salesforce app, a site) are pre-built surfaces you publish an agent to. When the surface is an application you own and build yourself, the Agent API is how you invoke the agent programmatically.',
    explanation_ja:
      'チャネル（Slack、Salesforce アプリ、サイト）はエージェントを公開できる既製の接点である。接点が自社で作る独自アプリケーションの場合は、Agent API を使ってプログラム的にエージェントを呼び出す。',
    reference: '💡 Pre-built surface → channel. Your own custom app → Agent API. External tools → MCP. Another agent → A2A.',
    reference_ja: '💡 既製の接点→チャネル。自社の独自アプリ→Agent API。外部ツール→MCP。別のエージェント→A2A。',
  },
  {
    id: 'af-m1-21',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 21,
    question:
      "Umberton Sports wants the customer's list of open orders fetched once, before the agent decides anything, so that it is available to every subsequent step. Where should this be placed?",
    question_ja:
      'Umberton Sports は、エージェントが何かを判断する前に顧客の未処理注文リストを一度だけ取得し、以降のすべてのステップで利用できるようにしたい。これはどこに配置すべきか。',
    options: [
      {
        text: 'In an after_reasoning block.',
        text_ja: 'after_reasoning ブロックの中。',
        correct: false,
        note: 'That runs after the decision, so the data would not be available to the decision itself.',
        note_ja: '判断の後に実行されるため、判断そのものにはデータが使えない。',
      },
      {
        text: 'In the topic classification description.',
        text_ja: 'トピックの分類説明の中。',
        correct: false,
        note: 'The classification description is text used for routing; it cannot fetch data.',
        note_ja: '分類説明はルーティングに使われるテキストであり、データ取得はできない。',
      },
      {
        text: 'In an availability filter on each action.',
        text_ja: '各アクションの利用可能条件の中。',
        correct: false,
        note: 'Availability filters gate actions; they are not a place to load shared context.',
        note_ja: '利用可能条件はアクションの可否を制御するもので、共有コンテキストを読み込む場所ではない。',
      },
      {
        text: 'In a before_reasoning block, which runs ahead of the reasoning step.',
        text_ja: 'before_reasoning ブロックの中。推論ステップより前に実行される。',
        correct: true,
        note: 'Correct. before_reasoning runs first, so the fetched data is in context for the reasoning step and everything after it.',
        note_ja: '正解。before_reasoning は最初に実行されるため、取得したデータが推論ステップとその後のすべてで文脈に載る。',
      },
    ],
    explanation:
      'Agent Script blocks are ordered around the reasoning step. before_reasoning runs first and is where you load context the decision needs. after_reasoning runs last and is where you apply fixed post-processing to the produced response (see Q48).',
    explanation_ja:
      'Agent Script のブロックは推論ステップを軸に順序が決まっている。before_reasoning は最初に実行され、判断に必要な文脈を読み込む場所。after_reasoning は最後に実行され、生成された応答に対する固定の後処理を適用する場所（Q48参照）。',
    reference: '💡 Need it *for* the decision → before_reasoning. Need it applied *to* the answer → after_reasoning.',
    reference_ja: '💡 判断の「ために」必要→before_reasoning。回答「に対して」適用したい→after_reasoning。',
  },
  {
    id: 'af-m1-22',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 22,
    question:
      'Vantage Rail needs one generative capability that can be invoked from a screen flow, from Apex, and as an action available to an agent. Which prompt template type supports all three?',
    question_ja:
      'Vantage Rail は、画面フローからも、Apex からも、エージェントが利用できるアクションとしても呼び出せる生成機能を1つ必要としている。これら3つすべてに対応するプロンプトテンプレートの種類はどれか。',
    options: [
      {
        text: 'Record Summary',
        text_ja: 'Record Summary（レコード要約）',
        correct: false,
        note: 'Bound to the record page experience, not a general-purpose callable capability.',
        note_ja: 'レコードページ上の体験に紐づいており、汎用的に呼び出せる機能ではない。',
      },
      {
        text: 'Field Generation',
        text_ja: 'Field Generation（項目生成）',
        correct: false,
        note: 'Bound to generating a value for a specific field.',
        note_ja: '特定の項目に値を生成することに紐づいている。',
      },
      {
        text: 'Flex',
        text_ja: 'Flex（フレックス）',
        correct: true,
        note: 'Correct. Flex is the general-purpose type designed to be invoked from flows, Apex, and as an agent action.',
        note_ja: '正解。Flex はフロー・Apex・エージェントアクションから呼び出せるよう設計された汎用型。',
      },
      {
        text: 'Sales Email',
        text_ja: 'Sales Email（営業メール）',
        correct: false,
        note: 'Bound to drafting outbound email to a contact or lead.',
        note_ja: '取引先責任者やリード宛の送信メール下書きに紐づいている。',
      },
    ],
    explanation:
      'Record Summary, Field Generation and Sales Email are each tied to a specific user experience. Flex is the general-purpose template: it takes the inputs you define and can be called from a flow, from Apex, or exposed as an agent action.',
    explanation_ja:
      'Record Summary・Field Generation・Sales Email はそれぞれ特定のユーザー体験に紐づいている。Flex は汎用テンプレートで、自分で定義した入力を受け取り、フロー・Apex から呼び出したり、エージェントアクションとして公開したりできる。',
    reference: '💡 "Invoked from multiple places / custom inputs" → Flex. Every other type is tied to one surface.',
    reference_ja: '💡 「複数の場所から呼び出す／入力を自分で定義する」→Flex。他の種類はすべて特定の接点に紐づく。',
  },
  {
    id: 'af-m1-23',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 23,
    question:
      'Westmark Textiles wants the fastest path to grounding an agent in a folder of product PDFs, without hand-configuring ingestion, chunking, and index settings. What should the specialist use?',
    question_ja:
      'Westmark Textiles は、取り込み・チャンク分割・インデックス設定を手作業で構成することなく、製品PDFのフォルダーにエージェントをグラウンディングする最短の方法を求めている。スペシャリストが使うべきものはどれか。',
    options: [
      {
        text: 'A calculated insight built over the file metadata.',
        text_ja: 'ファイルメタデータ上に構築した計算済みインサイト。',
        correct: false,
        note: 'Calculated insights derive metrics from structured data; they do not make PDFs retrievable.',
        note_ja: '計算済みインサイトは構造化データから指標を算出するもので、PDFを検索可能にはしない。',
      },
      {
        text: 'An Agentforce Data Library, which handles ingestion, chunking, indexing, and retrieval configuration for the uploaded content.',
        text_ja: 'Agentforce Data Library。アップロードしたコンテンツの取り込み・チャンク分割・インデックス化・検索設定をまとめて処理する。',
        correct: true,
        note: 'Correct. A Data Library is the packaged path: upload the content and the plumbing is configured for you.',
        note_ja: '正解。Data Library はまとめて用意された経路で、コンテンツをアップロードすれば裏側の設定が済む。',
      },
      {
        text: 'A dedicated data space for the PDFs.',
        text_ja: 'PDF専用のデータスペース。',
        correct: false,
        note: 'A data space partitions data; it does not index documents for retrieval.',
        note_ja: 'データスペースはデータを区切るもので、検索のためにドキュメントをインデックス化はしない。',
      },
      {
        text: 'An identity resolution ruleset.',
        text_ja: 'ID解決のルールセット。',
        correct: false,
        note: 'Identity resolution unifies duplicate people records. Unrelated to documents.',
        note_ja: 'ID解決は重複する人物レコードを統合するもの。ドキュメントとは無関係。',
      },
    ],
    explanation:
      'An Agentforce Data Library is the low-configuration route to unstructured grounding: you upload content and it handles ingestion, chunking, indexing and retrieval setup. Building the pieces yourself (index + custom retriever) is the route you take when you need control — for example a metadata filter (Q3, Q43).',
    explanation_ja:
      'Agentforce Data Library は非構造化グラウンディングへの低設定ルートで、コンテンツをアップロードすれば取り込み・チャンク分割・インデックス化・検索設定を引き受けてくれる。自分で部品を組む（インデックス＋カスタムリトリーバー）のは、メタデータフィルターなど制御が必要な場合の経路である（Q3・Q43）。',
    reference: '💡 "Fastest / without configuring" → Data Library. "Filter / restrict / control" → custom retriever.',
    reference_ja: '💡 「最短で／設定なしで」→Data Library。「フィルター／制限／制御したい」→カスタムリトリーバー。',
  },
  {
    id: 'af-m1-24',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 24,
    question:
      "Yarrow Labs deployed an agent from a sandbox into production. The agent responds, but it never returns any grounded content from the company's document library. What is the most likely cause?",
    question_ja:
      'Yarrow Labs はサンドボックスから本番へエージェントを展開した。エージェントは応答するものの、自社ドキュメントライブラリからグラウンディングされたコンテンツを一切返さない。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'Agents deploy in an active state and must be deactivated and reactivated.',
        text_ja: 'エージェントはアクティブな状態で展開されるため、いったん非アクティブ化して再度アクティブ化する必要がある。',
        correct: false,
        note: 'Agents deploy inactive (Q35), and reactivation would not create missing Data 360 configuration anyway.',
        note_ja: 'エージェントは非アクティブな状態で展開される（Q35）うえ、再アクティブ化しても不足している Data 360 の構成は生まれない。',
      },
      {
        text: 'Prompt templates cannot be included in a metadata deployment.',
        text_ja: 'プロンプトテンプレートはメタデータ展開に含められない。',
        correct: false,
        note: 'They can be. And the symptom is missing grounded content, not missing generation.',
        note_ja: '含められる。加えて症状は「グラウンディングされた内容がない」ことであり、生成そのものが止まっているわけではない。',
      },
      {
        text: 'Data 360 configuration, including the retriever and the index behind it, does not travel with the metadata deployment and must be set up in the target org.',
        text_ja: 'リトリーバーやその背後のインデックスを含む Data 360 の構成はメタデータ展開に含まれず、対象組織側で構築する必要がある。',
        correct: true,
        note: 'Correct. The agent definition deploys, but the data-side configuration it depends on must exist in the target org.',
        note_ja: '正解。エージェント定義は展開されるが、それが依存するデータ側の構成は対象組織に別途用意する必要がある。',
      },
      {
        text: 'The Agent API has not been enabled in production.',
        text_ja: '本番組織で Agent API が有効化されていない。',
        correct: false,
        note: 'The Agent API matters for external invocation, not for grounding.',
        note_ja: 'Agent API は外部からの呼び出しに関わるもので、グラウンディングとは関係ない。',
      },
    ],
    explanation:
      'Deployment moves metadata. Data 360 configuration — data streams, mappings, indexes, retrievers — and the agent user with its permission assignments (Q57) are environment-level setup that must be established in the target org.',
    explanation_ja:
      '展開が運ぶのはメタデータである。Data 360 の構成（データストリーム、マッピング、インデックス、リトリーバー）や、エージェントユーザーとその権限割り当て（Q57）は環境側のセットアップであり、対象組織で別途構築する必要がある。',
    reference:
      '💡 Deploys as metadata: agent definition, topics, actions, flows, prompt templates. Configured per org: Data 360 setup, agent user + permissions.',
    reference_ja:
      '💡 メタデータで展開されるもの：エージェント定義・トピック・アクション・フロー・プロンプトテンプレート。組織ごとに構成するもの：Data 360 のセットアップ、エージェントユーザーと権限。',
  },
  {
    id: 'af-m1-25',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 25,
    question:
      'A Zephyr Cargo specialist is explaining hybrid reasoning to a colleague. What distinguishes a prompt instruction from a deterministic instruction in Agent Script?',
    question_ja:
      'Zephyr Cargo のスペシャリストが同僚にハイブリッド推論を説明している。Agent Script における「プロンプト指示」と「決定的指示」の違いは何か。',
    options: [
      {
        text: 'A prompt instruction is evaluated by the model at run time and its outcome can vary; a deterministic instruction executes exactly as written every time.',
        text_ja: 'プロンプト指示は実行時にモデルが評価するため結果が変わり得る。決定的指示は毎回記述どおりに実行される。',
        correct: true,
        note: 'Correct. This is the definition of hybrid reasoning: model judgement where it helps, fixed execution where it must not vary.',
        note_ja: '正解。これがハイブリッド推論の定義そのもの。判断が役立つ箇所はモデルに、ぶれてはいけない箇所は固定実行に任せる。',
      },
      {
        text: 'A prompt instruction runs faster because it does not require a model call.',
        text_ja: 'プロンプト指示はモデル呼び出しを必要としないため高速である。',
        correct: false,
        note: 'Reversed — the prompt instruction is precisely the one the model evaluates.',
        note_ja: '逆。モデルが評価するのはまさにプロンプト指示のほう。',
      },
      {
        text: 'Deterministic instructions are only available in the Canvas view.',
        text_ja: '決定的指示は Canvas ビューでのみ利用できる。',
        correct: false,
        note: 'Canvas and Script are two views of the same definition (Q32); neither has exclusive capabilities.',
        note_ja: 'Canvas と Script は同じ定義の2つのビュー（Q32）であり、どちらかにしかない機能はない。',
      },
      {
        text: 'Prompt instructions may only appear inside after_reasoning blocks.',
        text_ja: 'プロンプト指示は after_reasoning ブロック内にしか記述できない。',
        correct: false,
        note: 'No such restriction exists.',
        note_ja: 'そのような制限はない。',
      },
    ],
    explanation:
      'Hybrid reasoning lets one agent definition combine model judgement with guaranteed execution. Use prompt instructions where interpretation and nuance add value; use deterministic instructions for compliance steps, mandatory lookups and fixed formatting.',
    explanation_ja:
      'ハイブリッド推論により、1つのエージェント定義の中でモデルの判断と確実な実行を組み合わせられる。解釈やニュアンスが価値を生む箇所にはプロンプト指示を、コンプライアンス手順・必須の参照・固定の書式には決定的指示を使う。',
    reference: '💡 This distinction underpins Q1, Q14, Q30 and Q48. If a requirement says "always", it is deterministic.',
    reference_ja: '💡 この区別は Q1・Q14・Q30・Q48 の土台になる。要件に「必ず」とあれば決定的指示。',
  },
  {
    id: 'af-m1-26',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 26,
    question:
      'Ashgrove Dental finds that generated appointment summaries invent outcomes when the clinical notes field is empty. Which prompt-level change addresses this most directly?',
    question_ja:
      'Ashgrove Dental では、臨床メモ項目が空のときに、生成された診療サマリーが実際にはない結果を作り出してしまう。これに最も直接的に対処するプロンプトレベルの変更はどれか。',
    options: [
      {
        text: 'Increase the maximum response length so the model has room to explain itself.',
        text_ja: '最大応答長を増やし、モデルが説明する余地を作る。',
        correct: false,
        note: 'More room to write is more room to invent. Length does not constrain truthfulness.',
        note_ja: '書く余地が増えれば作り話の余地も増える。長さは正確さを制約しない。',
      },
      {
        text: 'Switch to a larger model.',
        text_ja: 'より大きなモデルに切り替える。',
        correct: false,
        note: 'A bigger model still fills gaps when the prompt does not tell it what to do with missing data.',
        note_ja: '欠損データの扱いを指示していなければ、大きなモデルでも空白を埋めようとする。',
      },
      {
        text: 'Remove the merge field for the notes so the model cannot see it is empty.',
        text_ja: 'メモの差し込み項目を削除し、空であることをモデルに見せないようにする。',
        correct: false,
        note: 'Hiding the gap makes invention more likely, not less — the model has even less grounding.',
        note_ja: '欠損を隠すと作り話は増える。グラウンディングがさらに減るため。',
      },
      {
        text: 'Instruct the model explicitly to state that the information is unavailable rather than infer it.',
        text_ja: '情報が利用できない場合は推測せず「情報なし」と明示するよう、モデルに明確に指示する。',
        correct: true,
        note: 'Correct. Telling the model what to do with missing data is the direct prompt-level control for this failure.',
        note_ja: '正解。欠損データをどう扱うかをモデルに指示することが、この失敗に対する直接的なプロンプトレベルの制御。',
      },
    ],
    explanation:
      'Models fill gaps unless told not to. The prompt-level control for fabrication is an explicit instruction on how to handle missing or insufficient grounding — state that it is unavailable rather than infer. Model size and response length do not address it.',
    explanation_ja:
      'モデルは指示がなければ空白を埋めようとする。作り話に対するプロンプトレベルの制御は、グラウンディングが欠けている／不十分なときの扱いを明示的に指示すること（推測せず「情報なし」と述べる）である。モデルの大きさや応答長では解決しない。',
    reference: '💡 Hallucination on missing data → explicit "say it is unavailable" instruction, plus better grounding.',
    reference_ja: '💡 欠損データでのハルシネーション→「情報なしと述べる」明示指示＋グラウンディングの改善。',
  },
  {
    id: 'af-m1-27',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 27,
    question:
      'Bellamy Wine users search using everyday wording that differs from the phrasing in the documentation, and exact-term matching misses relevant passages. Which index type addresses this?',
    question_ja:
      'Bellamy Wine のユーザーは、ドキュメントの表現とは異なる日常的な言い回しで検索しており、完全一致では関連するパッセージを取りこぼしている。これに対応するインデックスの種類はどれか。',
    options: [
      {
        text: 'A keyword-only index with an expanded stop-word list.',
        text_ja: 'ストップワードリストを拡張したキーワードのみのインデックス。',
        correct: false,
        note: 'Still exact-term matching. Stop words do not bridge different vocabulary.',
        note_ja: '依然として完全一致のまま。ストップワードでは語彙の違いは埋まらない。',
      },
      {
        text: 'A calculated insight over the document metadata.',
        text_ja: 'ドキュメントメタデータ上の計算済みインサイト。',
        correct: false,
        note: 'A derived metric over structured data; not a retrieval mechanism for text.',
        note_ja: '構造化データ上の派生指標であり、テキスト検索の仕組みではない。',
      },
      {
        text: 'A data lake object holding the raw files.',
        text_ja: '生ファイルを保持するデータレイクオブジェクト。',
        correct: false,
        note: 'Storage, not search. Nothing here makes passages retrievable by meaning.',
        note_ja: '保管であって検索ではない。意味でパッセージを引ける仕組みは何もない。',
      },
      {
        text: 'A vector-based search index, which matches on semantic similarity rather than exact terms.',
        text_ja: 'ベクトルベースの検索インデックス。完全一致ではなく意味的な類似度で一致させる。',
        correct: true,
        note: 'Correct. Vector search embeds meaning, so paraphrases and synonyms still match.',
        note_ja: '正解。ベクトル検索は意味を埋め込むため、言い換えや同義語でも一致する。',
      },
    ],
    explanation:
      'Vector (semantic) indexes embed text so that passages match on meaning rather than exact wording. Use them when users phrase things differently from the source material. Keyword indexes remain useful when exact identifiers or codes must match literally.',
    explanation_ja:
      'ベクトル（セマンティック）インデックスはテキストを埋め込み、表現の一致ではなく意味でパッセージを一致させる。ユーザーの言い回しが原文と異なる場合に使う。型番やコードなど厳密な一致が必要な場合はキーワードインデックスが有効。',
    reference: '💡 Different wording, same meaning → vector index. Exact codes/IDs must match literally → keyword index.',
    reference_ja: '💡 言い回しが違うが意味は同じ→ベクトルインデックス。型番やIDを厳密に一致させたい→キーワードインデックス。',
  },
  {
    id: 'af-m1-28',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 28,
    question:
      'Croftwood Timber has deployed a service agent to a public help site used by unauthenticated visitors. Whose permissions determine what data the agent can read?',
    question_ja:
      'Croftwood Timber は、未認証の訪問者が利用する公開ヘルプサイトにサービスエージェントを展開した。エージェントが読み取れるデータを決めるのは誰の権限か。',
    options: [
      {
        text: 'The permissions of the anonymous visitor.',
        text_ja: '匿名訪問者の権限。',
        correct: false,
        note: 'An unauthenticated visitor has no Salesforce user and therefore no permissions to inherit.',
        note_ja: '未認証の訪問者は Salesforce ユーザーを持たないため、継承すべき権限が存在しない。',
      },
      {
        text: 'The permissions of the dedicated agent user configured for that agent.',
        text_ja: 'そのエージェント用に構成された専用エージェントユーザーの権限。',
        correct: true,
        note: 'Correct. With no logged-in user, the agent runs as its dedicated agent user, whose access must be scoped deliberately.',
        note_ja: '正解。ログインユーザーがいないため、エージェントは専用のエージェントユーザーとして動作し、そのアクセス範囲は意図的に設計する必要がある。',
      },
      {
        text: 'The permissions of the specialist who built the agent.',
        text_ja: 'エージェントを構築したスペシャリストの権限。',
        correct: false,
        note: 'The builder\'s access is irrelevant at run time.',
        note_ja: '構築者のアクセス権は実行時には無関係。',
      },
      {
        text: 'The permissions of a system administrator, by default.',
        text_ja: '既定でシステム管理者の権限。',
        correct: false,
        note: 'That would be a serious over-grant, and it is not how the agent user works.',
        note_ja: '重大な過剰付与であり、エージェントユーザーの仕組みとも異なる。',
      },
    ],
    explanation:
      'Where there is no logged-in user, the agent runs as a dedicated agent user. Because that user\'s permissions define the entire data boundary for every anonymous visitor, they must be scoped to the minimum necessary. Compare with Q7, where an internal agent inherits the logged-in user.',
    explanation_ja:
      'ログインユーザーがいない場合、エージェントは専用のエージェントユーザーとして動作する。そのユーザーの権限がすべての匿名訪問者に対するデータ境界を規定するため、必要最小限に絞る必要がある。社内エージェントがログインユーザーを継承する Q7 と対比しておく。',
    reference: '💡 The agent user is also why a flow action can fail with an access error (Q50) and why it must be configured per org (Q57).',
    reference_ja: '💡 エージェントユーザーは、フローアクションがアクセスエラーになる原因（Q50）でもあり、組織ごとに構成が必要な理由（Q57）でもある。',
  },
  {
    id: 'af-m1-29',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 29,
    question:
      'Delacroix Cosmetics wants to know how often the agent finishes a conversation without handing it to a person. Which metric reports this?',
    question_ja:
      'Delacroix Cosmetics は、エージェントが人に引き継ぐことなく会話を完了させた頻度を知りたい。これを示す指標はどれか。',
    options: [
      {
        text: 'Average handle time',
        text_ja: '平均処理時間',
        correct: false,
        note: 'Measures duration, not whether a human was needed.',
        note_ja: '所要時間を測るもので、人の介在が必要だったかは示さない。',
      },
      {
        text: 'Containment rate, the proportion of conversations completed without escalation to a human',
        text_ja: '封じ込め率。人へのエスカレーションなしに完了した会話の割合。',
        correct: true,
        note: 'Correct. Containment rate is exactly the proportion resolved without human handoff.',
        note_ja: '正解。封じ込め率は、人への引き継ぎなしに解決した会話の割合そのもの。',
      },
      {
        text: 'The number of topics defined on the agent',
        text_ja: 'エージェントに定義されたトピック数',
        correct: false,
        note: 'A configuration count, not a performance metric.',
        note_ja: '構成上の件数であり、パフォーマンス指標ではない。',
      },
      {
        text: 'Token consumption per conversation',
        text_ja: '会話あたりのトークン消費量',
        correct: false,
        note: 'A cost metric, unrelated to escalation.',
        note_ja: 'コスト指標であり、エスカレーションとは無関係。',
      },
    ],
    explanation:
      'Containment rate is the headline effectiveness metric for a service agent: the share of conversations it completes without escalating to a person. Read it alongside utterance analysis, which explains why escalations happen.',
    explanation_ja:
      '封じ込め率はサービスエージェントの効果を示す代表的な指標で、人へエスカレーションせずに完了した会話の割合を表す。エスカレーションが起きる理由を説明する発話分析と併せて読む。',
    reference: '💡 Containment rate = how often it succeeded alone. Utterance analysis = why it did not.',
    reference_ja: '💡 封じ込め率＝単独で完了できた割合。発話分析＝できなかった理由。',
  },
  {
    id: 'af-m1-30',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 30,
    question:
      'An Elmsworth Schools agent sometimes answers enrolment questions from memory rather than looking up the record. Which change most directly enforces the lookup?',
    question_ja:
      'Elmsworth Schools のエージェントは、入学に関する質問にレコードを参照せず記憶から答えてしまうことがある。参照を最も直接的に強制する変更はどれか。',
    options: [
      {
        text: 'Make the retrieval step a deterministic instruction so it always executes before the response is composed.',
        text_ja: '参照ステップを決定的指示にし、応答を組み立てる前に必ず実行されるようにする。',
        correct: true,
        note: 'Correct. A deterministic instruction guarantees the lookup runs, so the answer is always grounded in the record.',
        note_ja: '正解。決定的指示にすれば参照が必ず実行され、回答は常にレコードに基づくものになる。',
      },
      {
        text: 'Increase the temperature setting on the model.',
        text_ja: 'モデルの temperature 設定を上げる。',
        correct: false,
        note: 'Higher temperature increases variability, making the problem worse.',
        note_ja: 'temperature を上げると変動が増え、問題は悪化する。',
      },
      {
        text: 'Add more example answers to the topic description.',
        text_ja: 'トピックの説明に回答例をさらに追加する。',
        correct: false,
        note: 'Examples nudge behaviour but do not guarantee the lookup happens.',
        note_ja: '例は挙動を誘導するだけで、参照が実行される保証にはならない。',
      },
      {
        text: 'Publish the agent to an additional channel.',
        text_ja: 'エージェントを追加のチャネルに公開する。',
        correct: false,
        note: 'Channels control where the agent is available, not how it reasons.',
        note_ja: 'チャネルはエージェントがどこで使えるかを決めるもので、推論の仕方とは無関係。',
      },
    ],
    explanation:
      'When a step must happen before the answer is produced, express it as a deterministic instruction. This is the same principle as Q1 and Q21: guaranteed behaviour comes from deterministic execution, not from persuading the model.',
    explanation_ja:
      '回答を生成する前に必ず実行しなければならないステップは、決定的指示として記述する。Q1・Q21 と同じ原則で、保証された挙動はモデルを説得することではなく決定的な実行から得られる。',
    reference: '💡 "Answers from memory" is a grounding failure. Force the lookup deterministically and give it real data to use.',
    reference_ja: '💡 「記憶から答える」はグラウンディングの失敗。参照を決定的に強制し、使える実データを与える。',
  },
]
