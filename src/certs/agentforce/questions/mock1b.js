// 同梱の模擬試験「Mock Exam 1」Q31〜Q60（screenshots/Agentforce）。
export const mock1bQuestions = [
  {
    id: 'af-m1-31',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 31,
    question:
      'Fenwick Marine wants a group of users to be able to run prompt templates but not to create or modify them. What should the specialist grant?',
    question_ja:
      'Fenwick Marine は、あるユーザーグループにプロンプトテンプレートの実行はできるが作成や変更はできないようにしたい。スペシャリストが付与すべきものはどれか。',
    options: [
      {
        text: 'Modify All Data.',
        text_ja: 'Modify All Data（すべてのデータの編集）。',
        correct: false,
        note: 'A sweeping org-wide grant that has nothing to do with prompt templates and violates least privilege.',
        note_ja: '組織全体に及ぶ広範な権限で、プロンプトテンプレートとは無関係。最小権限の原則にも反する。',
      },
      {
        text: 'The Data 360 administration permission.',
        text_ja: 'Data 360 の管理権限。',
        correct: false,
        note: 'Administers the data platform, not prompt template usage.',
        note_ja: 'データ基盤の管理権限であり、プロンプトテンプレートの利用可否とは別。',
      },
      {
        text: 'Nothing; running a template requires no additional permission.',
        text_ja: '何も付与しない。テンプレートの実行に追加の権限は不要である。',
        correct: false,
        note: 'Using generative features is permission-gated; it is not open by default.',
        note_ja: '生成系機能の利用は権限で制御されており、既定で誰でも使えるわけではない。',
      },
      {
        text: 'The permission that allows using prompt templates, without the permission that allows managing them.',
        text_ja: 'プロンプトテンプレートの「利用」を許可する権限のみを付与し、「管理」を許可する権限は付与しない。',
        correct: true,
        note: 'Correct. Use and manage are separate permissions, which is exactly how you express run-but-not-edit.',
        note_ja: '正解。利用と管理は別々の権限であり、「実行はできるが編集はできない」はこの分離で表現する。',
      },
    ],
    explanation:
      'Agentforce separates the permission to use generative features from the permission to build and manage them. Grant only the former to consumers. Reaching for Modify All Data to solve a feature-access problem is always wrong.',
    explanation_ja:
      'Agentforce では、生成系機能を「使う」権限と「作成・管理する」権限が分かれている。利用者には前者だけを付与する。機能アクセスの問題を Modify All Data で解決しようとするのは常に誤り。',
    reference: '💡 Least privilege: separate "use" from "manage". Never solve access questions with Modify All Data.',
    reference_ja: '💡 最小権限：「利用」と「管理」を分ける。アクセス系の設問を Modify All Data で解決してはいけない。',
  },
  {
    id: 'af-m1-32',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 32,
    question:
      'At Greystone Insurance a builder edits the agent in the Script view while a colleague has the same agent open in the Canvas view. What is true of the change?',
    question_ja:
      'Greystone Insurance で、あるビルダーが Script ビューでエージェントを編集している一方、同僚が同じエージェントを Canvas ビューで開いている。この変更について正しいものはどれか。',
    options: [
      {
        text: 'Canvas and Script are two views of one agent definition and stay in sync, so the change appears in both.',
        text_ja: 'Canvas と Script は1つのエージェント定義に対する2つのビューであり同期しているため、変更は両方に現れる。',
        correct: true,
        note: 'Correct. One definition, two representations — a change made in either view is the same change.',
        note_ja: '正解。定義は1つ、表現が2つ。どちらのビューで加えた変更も同じ変更である。',
      },
      {
        text: 'Canvas edits take precedence over Script edits when the agent is compiled.',
        text_ja: 'エージェントのコンパイル時に、Canvas の編集が Script の編集より優先される。',
        correct: false,
        note: 'There is no precedence rule because there are not two competing definitions.',
        note_ja: '競合する2つの定義が存在しないため、優先順位というものがない。',
      },
      {
        text: 'The Script view is read-only and cannot be edited.',
        text_ja: 'Script ビューは読み取り専用で編集できない。',
        correct: false,
        note: 'Agent Script is an authoring surface; it is editable.',
        note_ja: 'Agent Script は作成用の画面であり、編集できる。',
      },
      {
        text: 'The two views hold independent definitions that must be merged by hand.',
        text_ja: '2つのビューは独立した定義を保持しており、手作業でマージする必要がある。',
        correct: false,
        note: 'They are not independent; there is a single underlying definition.',
        note_ja: '独立していない。基礎となる定義は1つだけ。',
      },
    ],
    explanation:
      'Agent Script and Canvas are two editors over the same underlying agent definition. Builders can work in whichever representation suits them; the definition — and therefore the compiled resolved prompt (Q12) — is the same.',
    explanation_ja:
      'Agent Script と Canvas は、同じエージェント定義に対する2つのエディタである。ビルダーは自分に合う表現で作業でき、定義は同一であり、したがってコンパイル後の解決済みプロンプト（Q12）も同じになる。',
    reference: '💡 One definition, two views. There is no import/export or merge step between them.',
    reference_ja: '💡 定義は1つ、ビューは2つ。両者の間にインポート／エクスポートやマージの手順は存在しない。',
  },
  {
    id: 'af-m1-33',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 33,
    question:
      'Hollowell Group operates two brands whose data must stay separated for analysis and grounding, within a single Data 360 instance. Which capability provides that separation?',
    question_ja:
      'Hollowell Group は2つのブランドを運営しており、単一の Data 360 インスタンス内で、分析とグラウンディングのためにデータを分離しておく必要がある。この分離を提供する機能はどれか。',
    options: [
      {
        text: 'Identity resolution',
        text_ja: 'ID解決',
        correct: false,
        note: 'Identity resolution unifies records. Here the requirement is the opposite.',
        note_ja: 'ID解決はレコードを統合する機能。ここでの要件はその逆。',
      },
      {
        text: 'Data lake objects',
        text_ja: 'データレイクオブジェクト',
        correct: false,
        note: 'DLOs are per-source landing structures, not a governance boundary between brands.',
        note_ja: 'DLO はソースごとの着地構造であり、ブランド間のガバナンス境界ではない。',
      },
      {
        text: 'Data spaces, which partition data so it can be used independently',
        text_ja: 'データスペース。データを区切って独立に利用できるようにする。',
        correct: true,
        note: 'Correct. Data spaces are the partitioning boundary within one Data 360 instance.',
        note_ja: '正解。データスペースは1つの Data 360 インスタンス内での分割境界。',
      },
      {
        text: 'Search indexes',
        text_ja: '検索インデックス',
        correct: false,
        note: 'Indexes enable retrieval; they are not a data-governance partition.',
        note_ja: 'インデックスは検索を可能にするもので、データガバナンス上の区画ではない。',
      },
    ],
    explanation:
      'Data spaces partition data within a single Data 360 instance so different brands, regions or business units can use it independently. Contrast with identity resolution (Q18), which deliberately brings records together.',
    explanation_ja:
      'データスペースは単一の Data 360 インスタンス内でデータを区切り、ブランド・地域・事業部ごとに独立して利用できるようにする。レコードを意図的にまとめる ID解決（Q18）と対比しておく。',
    reference: '💡 Separate → data spaces. Unify → identity resolution. Two sides of the same exam pair.',
    reference_ja: '💡 分ける→データスペース。まとめる→ID解決。この2つは対で問われる。',
  },
  {
    id: 'af-m1-34',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 34,
    question:
      'An Inglewood Bank specialist is asked what a topic actually is within an agent. Which description is correct?',
    question_ja:
      'Inglewood Bank のスペシャリストが、エージェントにおける「トピック」とは実際に何かを尋ねられた。正しい説明はどれか。',
    options: [
      {
        text: 'It is the store for the conversation transcript.',
        text_ja: '会話トランスクリプトの保管場所である。',
        correct: false,
        note: 'Transcripts are a monitoring artefact, not the definition of a topic.',
        note_ja: 'トランスクリプトは監視用の成果物であり、トピックの定義ではない。',
      },
      {
        text: 'It defines which model is used for generation.',
        text_ja: '生成に使用するモデルを定義するものである。',
        correct: false,
        note: 'Model selection is separate configuration.',
        note_ja: 'モデルの選択は別の構成項目。',
      },
      {
        text: 'It is the security context under which actions run.',
        text_ja: 'アクションが実行されるセキュリティコンテキストである。',
        correct: false,
        note: 'That is the agent user or the logged-in user (Q7, Q28).',
        note_ja: 'それはエージェントユーザーまたはログインユーザーのこと（Q7・Q28）。',
      },
      {
        text: "It groups a job to be done with its instructions and the actions available for that job, and the reasoning engine selects it based on the user's request.",
        text_ja: '「なすべき仕事」を、その指示とその仕事で使えるアクションとともにまとめたもの。推論エンジンがユーザーの要求に基づいて選択する。',
        correct: true,
        note: 'Correct. A topic is the unit of scope: job + instructions + available actions, chosen by classification.',
        note_ja: '正解。トピックはスコープの単位であり、仕事＋指示＋利用可能なアクションを束ね、分類によって選ばれる。',
      },
    ],
    explanation:
      'A topic bundles a job to be done with the instructions that govern it and the actions available while doing it. The reasoning engine classifies the user\'s request to select a topic — which is why overlapping classification descriptions cause mis-routing (Q4).',
    explanation_ja:
      'トピックは「なすべき仕事」を、それを統べる指示と、その最中に使えるアクションとともに束ねたものである。推論エンジンはユーザーの要求を分類してトピックを選ぶ。だからこそ分類説明が重なると誤ルーティングが起きる（Q4）。',
    reference: '💡 Topic = scope + instructions + actions. Action = a specific thing the agent can do.',
    reference_ja: '💡 トピック＝スコープ＋指示＋アクション。アクション＝エージェントが実行できる具体的な操作。',
  },
  {
    id: 'af-m1-35',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 35,
    question:
      'Kirkham Retail deployed an agent to production and the change set reported success, but the agent does not respond to any request. What is the most likely explanation?',
    question_ja:
      'Kirkham Retail が本番にエージェントを展開し、変更セットは成功を報告したが、エージェントはどのリクエストにも応答しない。最も可能性の高い理由はどれか。',
    options: [
      {
        text: 'The Atlas Reasoning Engine has to be enabled individually for each agent.',
        text_ja: 'Atlas Reasoning Engine はエージェントごとに個別に有効化する必要がある。',
        correct: false,
        note: 'The reasoning engine is not enabled per agent.',
        note_ja: '推論エンジンはエージェント単位で有効化するものではない。',
      },
      {
        text: 'Agents cannot be deployed and must be rebuilt by hand in the target org.',
        text_ja: 'エージェントは展開できず、対象組織で手作業で作り直す必要がある。',
        correct: false,
        note: 'Agent definitions do deploy as metadata.',
        note_ja: 'エージェント定義はメタデータとして展開できる。',
      },
      {
        text: 'The agent\'s topics deployed but its actions did not.',
        text_ja: 'エージェントのトピックは展開されたが、アクションは展開されなかった。',
        correct: false,
        note: 'Missing actions would cause partial failures, not total silence.',
        note_ja: 'アクションの欠落なら部分的な失敗になるはずで、完全な無応答にはならない。',
      },
      {
        text: 'Agents deploy in an inactive state and must be activated in the target org.',
        text_ja: 'エージェントは非アクティブな状態で展開されるため、対象組織で有効化する必要がある。',
        correct: true,
        note: 'Correct. A successful deployment does not activate the agent; activation is a separate step.',
        note_ja: '正解。展開が成功してもエージェントは有効化されない。有効化は別の手順。',
      },
    ],
    explanation:
      'A successful deployment means the metadata arrived, not that the agent is live. Agents arrive inactive and must be activated deliberately — the same save-versus-activate distinction that applies to prompt templates (Q11).',
    explanation_ja:
      '展開の成功はメタデータが到着したことを意味するだけで、エージェントが稼働していることは意味しない。エージェントは非アクティブな状態で到着し、意図的に有効化する必要がある。プロンプトテンプレートの「保存と有効化」（Q11）と同じ区別である。',
    reference: '💡 Deploy ≠ activate (agents). Save ≠ activate (prompt templates). Both are classic exam traps.',
    reference_ja: '💡 展開≠有効化（エージェント）。保存≠有効化（プロンプトテンプレート）。どちらも定番の引っかけ。',
  },
  {
    id: 'af-m1-36',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 36,
    question:
      'Loxley Freight wants a one-paragraph overview of a case and its related records displayed to service representatives on the record page. Which prompt template type is designed for this?',
    question_ja:
      'Loxley Freight は、ケースとその関連レコードの1段落の概要を、レコードページ上でサービス担当者に表示したい。この用途向けに設計されたプロンプトテンプレートの種類はどれか。',
    options: [
      {
        text: 'Field Generation',
        text_ja: 'Field Generation（項目生成）',
        correct: false,
        note: 'Writes a value into a field rather than displaying an overview on the page.',
        note_ja: '項目に値を書き込むもので、ページ上に概要を表示するものではない。',
      },
      {
        text: 'Record Summary',
        text_ja: 'Record Summary（レコード要約）',
        correct: true,
        note: 'Correct. Record Summary presents a generated overview of the record and its related data on the record page.',
        note_ja: '正解。Record Summary はレコードと関連データの生成された概要をレコードページに表示する。',
      },
      {
        text: 'Sales Email',
        text_ja: 'Sales Email（営業メール）',
        correct: false,
        note: 'Drafts outbound email, not an on-page summary.',
        note_ja: '送信メールを下書きするもので、ページ上の要約ではない。',
      },
      {
        text: 'Flex',
        text_ja: 'Flex（フレックス）',
        correct: false,
        note: 'General-purpose and invoked programmatically; not the record-page summary experience.',
        note_ja: '汎用でプログラム的に呼び出す型であり、レコードページ上の要約体験ではない。',
      },
    ],
    explanation:
      'Record Summary is the template type for an at-a-glance overview of a record and its related data, rendered on the record page. Compare Q2 (Field Generation writes into a field) and Q22 (Flex is invoked from flow, Apex or an agent).',
    explanation_ja:
      'Record Summary は、レコードと関連データの概要を一目で把握できる形でレコードページに描画するテンプレート種別である。Q2（Field Generation は項目へ書き込む）、Q22（Flex はフロー・Apex・エージェントから呼び出す）と対比しておく。',
    reference: '💡 The four template types are asked repeatedly. Memorise them by output destination.',
    reference_ja: '💡 4つのテンプレート種別は繰り返し問われる。出力先で覚える。',
  },
  {
    id: 'af-m1-37',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 37,
    question:
      'Marlowe Bank wants a particular agent to be available to employees inside the Salesforce app and nowhere else. What determines this?',
    question_ja:
      'Marlowe Bank は、特定のエージェントを Salesforce アプリ内の従業員だけが利用でき、他の場所では使えないようにしたい。これを決めるものはどれか。',
    options: [
      {
        text: 'The model selected for the agent.',
        text_ja: 'エージェントに選択したモデル。',
        correct: false,
        note: 'Model choice affects generation quality and cost, not availability.',
        note_ja: 'モデルの選択は生成品質やコストに関わるもので、利用可能な場所とは無関係。',
      },
      {
        text: 'The channels the agent is published to.',
        text_ja: 'エージェントを公開したチャネル。',
        correct: true,
        note: 'Correct. Channels define the surfaces where an agent is reachable; publish only to the Salesforce app.',
        note_ja: '正解。チャネルはエージェントに到達できる接点を定義する。Salesforce アプリにのみ公開すればよい。',
      },
      {
        text: "The filter configured on the agent's retriever.",
        text_ja: 'エージェントのリトリーバーに構成したフィルター。',
        correct: false,
        note: 'A retriever filter scopes retrieved content, not where the agent is available.',
        note_ja: 'リトリーバーのフィルターは検索対象を絞るもので、エージェントの利用可能な場所は決めない。',
      },
      {
        text: "The primary object of the agent's prompt templates.",
        text_ja: 'エージェントのプロンプトテンプレートの主オブジェクト。',
        correct: false,
        note: 'The primary object scopes merge fields, not availability.',
        note_ja: '主オブジェクトは差し込み項目の範囲を決めるもので、利用可能性とは無関係。',
      },
    ],
    explanation:
      'Channels determine where an agent can be reached — the Salesforce app, Slack, a website, and so on. Publishing scope is a deployment decision, distinct from what the agent knows (retrievers) or how it writes (templates and models).',
    explanation_ja:
      'チャネルはエージェントにどこから到達できるか（Salesforce アプリ、Slack、Webサイトなど）を決める。公開範囲は展開上の判断であり、エージェントが何を知っているか（リトリーバー）や、どう書くか（テンプレートやモデル）とは別の話である。',
    reference: '💡 Where it lives → channels. What it knows → grounding. What it can do → actions. Who it runs as → agent user.',
    reference_ja: '💡 どこにいるか→チャネル。何を知るか→グラウンディング。何ができるか→アクション。誰として動くか→エージェントユーザー。',
  },
  {
    id: 'af-m1-38',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 38,
    question: 'Which sequence correctly describes grounding an agent in unstructured content at Norbury Foods?',
    question_ja:
      'Norbury Foods における、非構造化コンテンツへのエージェントのグラウンディングの手順として正しいものはどれか。',
    options: [
      {
        text: 'Embed the content, ingest it, retrieve it, then chunk it.',
        text_ja: 'コンテンツを埋め込み、取り込み、検索し、その後チャンク分割する。',
        correct: false,
        note: 'Chunking must precede embedding, and retrieval comes last, at run time.',
        note_ja: 'チャンク分割は埋め込みより前で、検索は実行時に最後に来る。',
      },
      {
        text: 'Retrieve the content, chunk it, embed it, then ingest it.',
        text_ja: 'コンテンツを検索し、チャンク分割し、埋め込み、その後取り込む。',
        correct: false,
        note: 'Entirely reversed — you cannot retrieve content you have not ingested.',
        note_ja: '完全に逆順。取り込んでいないコンテンツを検索することはできない。',
      },
      {
        text: 'Ingest the content, chunk it, embed and index the chunks, retrieve relevant chunks at run time, then include them in the prompt.',
        text_ja: 'コンテンツを取り込み、チャンク分割し、チャンクを埋め込んでインデックス化し、実行時に関連チャンクを検索してプロンプトに含める。',
        correct: true,
        note: 'Correct. Ingest → chunk → embed/index (build time), then retrieve → include in prompt (run time).',
        note_ja: '正解。取り込み→チャンク分割→埋め込み・インデックス化（構築時）、その後 検索→プロンプトに含める（実行時）。',
      },
      {
        text: 'Index the content, mask it, activate it, then deploy it.',
        text_ja: 'コンテンツをインデックス化し、マスキングし、有効化して展開する。',
        correct: false,
        note: 'Mixes unrelated concepts; masking and activation are not steps in the grounding pipeline.',
        note_ja: '無関係な概念の混在。マスキングや有効化はグラウンディングの工程ではない。',
      },
    ],
    explanation:
      'Grounding on unstructured content has a build-time half and a run-time half. Build time: ingest, chunk, embed and index. Run time: retrieve the most relevant chunks and include them in the prompt sent to the model.',
    explanation_ja:
      '非構造化コンテンツのグラウンディングは、構築時と実行時に分かれる。構築時：取り込み、チャンク分割、埋め込み、インデックス化。実行時：最も関連するチャンクを検索し、モデルへ送るプロンプトに含める。',
    reference: '💡 Build time: ingest → chunk → embed → index. Run time: retrieve → augment prompt → generate. (This is RAG.)',
    reference_ja: '💡 構築時：取り込み→チャンク分割→埋め込み→インデックス化。実行時：検索→プロンプト拡張→生成。（これが RAG）',
  },
  {
    id: 'af-m1-39',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 39,
    question:
      'Ormsby Utilities wants its billing agent to hand a specialised regulatory question to a separate agent owned by another team and to receive the result back. Which protocol is designed for this?',
    question_ja:
      'Ormsby Utilities は、請求エージェントが専門的な規制関連の質問を別チームが所有する別のエージェントへ引き渡し、その結果を受け取れるようにしたい。この用途のために設計されたプロトコルはどれか。',
    options: [
      {
        text: 'MCP',
        text_ja: 'MCP',
        correct: false,
        note: 'MCP connects an agent to external tools and data sources, not to another agent.',
        note_ja: 'MCP はエージェントを外部ツールやデータソースへ接続するもので、別のエージェントへの接続ではない。',
      },
      {
        text: 'A2A, which standardises delegation between agents',
        text_ja: 'A2A。エージェント間の委譲を標準化するもの。',
        correct: true,
        note: 'Correct. A2A (agent-to-agent) is the protocol for delegating work to another agent and receiving the result.',
        note_ja: '正解。A2A（agent-to-agent）は、別のエージェントに作業を委譲し結果を受け取るためのプロトコル。',
      },
      {
        text: 'The Agent API, used as the only supported mechanism',
        text_ja: 'Agent API。唯一サポートされる仕組みとして。',
        correct: false,
        note: 'The Agent API is for external applications invoking an agent, and it is not the only mechanism.',
        note_ja: 'Agent API は外部アプリケーションがエージェントを呼び出すためのもので、唯一の仕組みでもない。',
      },
      {
        text: 'SOMA',
        text_ja: 'SOMA',
        correct: false,
        note: 'Not an Agentforce protocol — a distractor.',
        note_ja: 'Agentforce のプロトコルではない。ダミーの選択肢。',
      },
    ],
    explanation:
      'A2A standardises delegation between agents, including across teams and organisations. MCP standardises access to tools and data. The Agent API is the inbound path for an external application. Identify the counterparty and the protocol follows.',
    explanation_ja:
      'A2A はチームや組織をまたぐ場合も含め、エージェント間の委譲を標準化する。MCP はツールやデータへのアクセスを標準化する。Agent API は外部アプリケーションからの受け口である。相手が誰かを特定すればプロトコルは決まる。',
    reference: '💡 Counterparty test: tool/data → MCP. Another agent → A2A. Your own app calling in → Agent API.',
    reference_ja: '💡 相手で判定：ツール／データ→MCP。別のエージェント→A2A。自社アプリからの呼び出し→Agent API。',
  },
  {
    id: 'af-m1-40',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 40,
    question:
      'A Pemberton Motors agent frequently answers questions that fall well outside its intended remit. Which change addresses this most directly?',
    question_ja:
      'Pemberton Motors のエージェントが、本来の担当範囲から大きく外れた質問にも頻繁に回答してしまう。これに最も直接的に対処する変更はどれか。',
    options: [
      {
        text: 'Reduce the number of actions attached to each topic.',
        text_ja: '各トピックに紐づくアクションの数を減らす。',
        correct: false,
        note: 'Fewer actions limits what it can do, not what subjects it will discuss.',
        note_ja: 'アクションを減らすとできることは減るが、どの話題に応じるかは変わらない。',
      },
      {
        text: 'Change the model used by the agent.',
        text_ja: 'エージェントが使用するモデルを変更する。',
        correct: false,
        note: 'Scope is a configuration concern, not a model capability concern.',
        note_ja: 'スコープは構成の問題であり、モデルの能力の問題ではない。',
      },
      {
        text: "Tighten the agent's role and scope statement so out-of-scope requests are declined and redirected.",
        text_ja: 'エージェントのロールとスコープの記述を厳密にし、範囲外の要求は断って誘導するようにする。',
        correct: true,
        note: 'Correct. The role and scope statement is what defines the boundary of what the agent will engage with.',
        note_ja: '正解。ロールとスコープの記述こそが、エージェントが応じる範囲の境界を定義する。',
      },
      {
        text: 'Increase the maximum response length.',
        text_ja: '最大応答長を増やす。',
        correct: false,
        note: 'Irrelevant to scope.',
        note_ja: 'スコープとは無関係。',
      },
    ],
    explanation:
      'Two different boundary problems have two different fixes. Answering the wrong subjects entirely → tighten the agent-level role and scope statement. Choosing the wrong topic among valid ones → sharpen the topic classification descriptions (Q4).',
    explanation_ja:
      '境界の問題は2種類あり、対処も異なる。そもそも範囲外の話題に答えてしまう→エージェントレベルのロールとスコープの記述を厳密にする。妥当なトピックの中から誤ったものを選ぶ→トピックの分類説明を明確にする（Q4）。',
    reference: '💡 Agent-level boundary → role & scope. Topic-level boundary → classification description.',
    reference_ja: '💡 エージェント全体の境界→ロールとスコープ。トピック間の境界→分類説明。',
  },
  {
    id: 'af-m1-41',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 41,
    question:
      "Quillon Media wants its agent's answers to be based on the company's internal policy documents rather than on general model knowledge. What has to be configured?",
    question_ja:
      'Quillon Media は、エージェントの回答が一般的なモデルの知識ではなく、自社の社内ポリシー文書に基づくようにしたい。何を構成する必要があるか。',
    options: [
      {
        text: 'A Sales Email prompt template.',
        text_ja: 'Sales Email のプロンプトテンプレート。',
        correct: false,
        note: 'Unrelated — that drafts outbound email.',
        note_ja: '無関係。送信メールを下書きするもの。',
      },
      {
        text: 'A retriever over an indexed library of those documents, made available to the agent.',
        text_ja: 'それらの文書をインデックス化したライブラリに対するリトリーバーを構成し、エージェントから利用できるようにする。',
        correct: true,
        note: 'Correct. Grounding on internal documents means indexing them and giving the agent a retriever over that index.',
        note_ja: '正解。社内文書へのグラウンディングとは、それらをインデックス化し、そのインデックスに対するリトリーバーをエージェントに与えること。',
      },
      {
        text: 'Identity resolution on the Contact object.',
        text_ja: 'Contact オブジェクトに対する ID解決。',
        correct: false,
        note: 'Unifies duplicate people records; nothing to do with document grounding.',
        note_ja: '重複する人物レコードを統合するもので、文書のグラウンディングとは無関係。',
      },
      {
        text: 'An availability filter on the relevant topic.',
        text_ja: '該当トピックへの利用可能条件の設定。',
        correct: false,
        note: 'Controls when something is offered, not what knowledge the answer draws on.',
        note_ja: '何かを提示する条件を制御するもので、回答が依拠する知識は変えない。',
      },
    ],
    explanation:
      'Grounding is what makes answers company-specific instead of generic. For documents that means an index plus a retriever the agent can use. Without grounding, the model answers from its own training data.',
    explanation_ja:
      'グラウンディングこそが、回答を一般論ではなく自社固有のものにする。文書の場合は、インデックスと、エージェントが使えるリトリーバーがそれにあたる。グラウンディングがなければ、モデルは自身の学習データから答えてしまう。',
    reference: '💡 "Based on our documents, not general knowledge" → retrieval grounding. Fastest setup → Data Library (Q23).',
    reference_ja: '💡 「一般知識ではなく自社文書に基づく」→検索グラウンディング。最短の構築→Data Library（Q23）。',
  },
  {
    id: 'af-m1-42',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 42,
    question:
      'Redwater Tools has roughly twelve thousand support articles that a prompt template needs to be able to draw on. Which grounding approach is appropriate?',
    question_ja:
      'Redwater Tools には、プロンプトテンプレートが参照できるようにしたいサポート記事が約1万2千件ある。適切なグラウンディング手法はどれか。',
    options: [
      {
        text: 'Merge fields on the Knowledge object.',
        text_ja: 'Knowledge オブジェクトに対する差し込み項目。',
        correct: false,
        note: 'Merge fields pull specific records you already identified. They cannot search twelve thousand articles.',
        note_ja: '差し込み項目はすでに特定済みのレコードを引くもので、1万2千件を検索することはできない。',
      },
      {
        text: 'Static text pasted into the template.',
        text_ja: 'テンプレートに貼り付けた固定テキスト。',
        correct: false,
        note: 'Impossible at this volume and impossible to keep current.',
        note_ja: 'この分量では不可能であり、最新状態を保つこともできない。',
      },
      {
        text: 'A related list displayed on the case record.',
        text_ja: 'ケースレコード上に表示する関連リスト。',
        correct: false,
        note: 'A UI component. It does not put content into the prompt.',
        note_ja: 'UIコンポーネントであり、プロンプトにコンテンツを入れるものではない。',
      },
      {
        text: 'Retrieval from a search index built over the article content.',
        text_ja: '記事コンテンツ上に構築した検索インデックスからの検索。',
        correct: true,
        note: 'Correct. At this scale you must select the relevant few at run time, which is exactly what retrieval does.',
        note_ja: '正解。この規模では実行時に関連するごく一部を選び出す必要があり、それこそが検索の役割。',
      },
    ],
    explanation:
      'Volume decides the approach. A handful of known records → merge fields. A large corpus where relevance must be determined per question → an index and a retriever. Twelve thousand articles is firmly in retrieval territory.',
    explanation_ja:
      '分量で手法が決まる。既知のレコードが数件→差し込み項目。質問ごとに関連性を判定する必要がある大規模なコーパス→インデックスとリトリーバー。1万2千件は明確に検索の領域。',
    reference: '💡 Known records, few → merge fields. Large corpus, must search → retrieval.',
    reference_ja: '💡 既知の少数レコード→差し込み項目。検索が必要な大量コーパス→検索。',
  },
  {
    id: 'af-m1-43',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 43,
    question:
      'Sundale Bank wants retrieval restricted to documents whose review date is still current. Which approach achieves this?',
    question_ja:
      'Sundale Bank は、レビュー期限が有効な文書だけに検索を限定したい。これを実現する方法はどれか。',
    options: [
      {
        text: 'Reduce the chunk size so stale content is less likely to match.',
        text_ja: 'チャンクサイズを小さくし、古いコンテンツが一致しにくくする。',
        correct: false,
        note: 'Chunk size does not encode recency. Stale content would still be eligible.',
        note_ja: 'チャンクサイズは新しさを表現しない。古いコンテンツは依然として検索対象のまま。',
      },
      {
        text: 'Switch the index to keyword matching.',
        text_ja: 'インデックスをキーワード一致に切り替える。',
        correct: false,
        note: 'Matching style is unrelated to document freshness.',
        note_ja: '一致方式は文書の新しさとは無関係。',
      },
      {
        text: 'Store the review date as metadata on the indexed content and apply a filter in a custom retriever.',
        text_ja: 'レビュー期限をインデックス対象コンテンツのメタデータとして保持し、カスタムリトリーバーでフィルターを適用する。',
        correct: true,
        note: 'Correct. Metadata plus a retriever filter is the standard way to enforce eligibility rules on retrieval.',
        note_ja: '正解。メタデータ＋リトリーバーのフィルターが、検索対象の適格性ルールを強制する標準的な方法。',
      },
      {
        text: 'Delete outdated documents from Salesforce Files after each retrieval.',
        text_ja: '毎回の検索後に、古い文書を Salesforce Files から削除する。',
        correct: false,
        note: 'Destructive, unmanageable, and reactive rather than preventive.',
        note_ja: '破壊的で運用不能。予防ではなく事後対応にすぎない。',
      },
    ],
    explanation:
      'Retrieval eligibility rules — vehicle line (Q3), review date, region, product — are all implemented the same way: carry the attribute as metadata on the indexed content and filter on it in a custom retriever.',
    explanation_ja:
      '検索の適格性ルール（車種ライン（Q3）、レビュー期限、地域、製品など）は、いずれも同じ方法で実装する。属性をインデックス対象コンテンツのメタデータとして持たせ、カスタムリトリーバーでそれをフィルターする。',
    reference: '💡 Any "only retrieve documents where…" requirement → metadata + custom retriever filter.',
    reference_ja: '💡 「〜の文書だけを検索対象にしたい」系の要件→メタデータ＋カスタムリトリーバーのフィルター。',
  },
  {
    id: 'af-m1-44',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 44,
    question:
      'Tarnbrook Telecom wants the agent to hand the conversation to a person whenever a customer expresses an intention to cancel their service. What is the appropriate design?',
    question_ja:
      'Tarnbrook Telecom は、顧客が解約の意向を示した場合には常に、会話を人へ引き継ぐようにしたい。適切な設計はどれか。',
    options: [
      {
        text: 'Configure an escalation action and instruct the agent to invoke it when cancellation intent is present.',
        text_ja: 'エスカレーションアクションを構成し、解約意向がある場合にそれを実行するようエージェントに指示する。',
        correct: true,
        note: 'Correct. Escalation is a deliberate handoff action triggered by a defined condition.',
        note_ja: '正解。エスカレーションは、定義された条件で発動する意図的な引き継ぎアクション。',
      },
      {
        text: 'Deactivate the agent during business hours so people handle those calls.',
        text_ja: '営業時間中はエージェントを非アクティブ化し、人が対応するようにする。',
        correct: false,
        note: 'Removes the agent from all conversations, not just cancellations.',
        note_ja: '解約だけでなく、すべての会話からエージェントを外してしまう。',
      },
      {
        text: 'Remove the cancellation topic so the agent cannot respond at all.',
        text_ja: '解約トピックを削除し、エージェントが応答できないようにする。',
        correct: false,
        note: 'The agent would fail to recognise the intent rather than route it correctly.',
        note_ja: '意図を認識できなくなるだけで、正しくルーティングされるわけではない。',
      },
      {
        text: 'Set the containment target for the agent to zero.',
        text_ja: 'エージェントの封じ込め目標をゼロに設定する。',
        correct: false,
        note: 'Containment rate is a measurement, not a control that routes conversations.',
        note_ja: '封じ込め率は測定指標であり、会話をルーティングする制御ではない。',
      },
    ],
    explanation:
      'Handing off to a human is an action, configured like any other and invoked when a defined condition is met. Note that containment rate (Q29) measures how often escalation did not happen — it is an outcome, not a setting.',
    explanation_ja:
      '人への引き継ぎはアクションであり、他のアクションと同様に構成し、定義された条件を満たしたときに実行する。封じ込め率（Q29）はエスカレーションが起きなかった割合を測る「結果」であって、設定項目ではない点に注意。',
    reference: '💡 If a requirement says "hand over to a person when X", the answer is an escalation action, not a setting.',
    reference_ja: '💡 「Xのときは人に引き継ぐ」という要件の答えは、設定ではなくエスカレーションアクション。',
  },
  {
    id: 'af-m1-45',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 45,
    question:
      'A single Vellacourt Rail customer has complained about one specific conversation with the agent. Which tool shows what actually happened in that conversation?',
    question_ja:
      'Vellacourt Rail のある1人の顧客が、エージェントとの特定の会話について苦情を申し立てた。その会話で実際に何が起きたかを示すツールはどれか。',
    options: [
      {
        text: 'The aggregate analytics dashboard for the agent.',
        text_ja: 'エージェントの集計分析ダッシュボード。',
        correct: false,
        note: 'Aggregates hide individual conversations.',
        note_ja: '集計値では個別の会話は見えない。',
      },
      {
        text: 'The conversation transcript for that session, showing utterances, the topics selected, the actions invoked, and the responses.',
        text_ja: 'そのセッションの会話トランスクリプト。発話、選択されたトピック、実行されたアクション、応答が確認できる。',
        correct: true,
        note: 'Correct. The transcript is the per-conversation record of the full decision path.',
        note_ja: '正解。トランスクリプトは会話単位で判断経路全体を記録したもの。',
      },
      {
        text: 'The deployment history for the org.',
        text_ja: '組織のデプロイ履歴。',
        correct: false,
        note: 'Tells you what changed, not what was said.',
        note_ja: '何が変わったかは分かるが、何が話されたかは分からない。',
      },
      {
        text: 'The Trust Layer masking configuration.',
        text_ja: 'Trust Layer のマスキング構成。',
        correct: false,
        note: 'A security setting, not a record of the interaction.',
        note_ja: 'セキュリティ設定であり、やり取りの記録ではない。',
      },
    ],
    explanation:
      'Match the tool to the scope of the question. One specific conversation → transcript. Trends across many conversations → utterance analysis and analytics. Quality before release → Testing Center.',
    explanation_ja:
      '設問のスコープにツールを合わせる。特定の1会話→トランスクリプト。多数の会話にまたがる傾向→発話分析と分析ダッシュボード。リリース前の品質→Testing Center。',
    reference: '💡 One conversation → transcript. Many → utterance analysis. Before release → Testing Center.',
    reference_ja: '💡 1件の会話→トランスクリプト。多数→発話分析。リリース前→Testing Center。',
  },
  {
    id: 'af-m1-46',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 46,
    question:
      "A Wexley Group specialist wants to inspect both the assembled prompt and the model's output for a template before releasing it to users. What should they do?",
    question_ja:
      'Wexley Group のスペシャリストは、テンプレートをユーザーへ公開する前に、組み立てられたプロンプトとモデルの出力の両方を確認したい。どうすべきか。',
    options: [
      {
        text: 'Deploy it to production and monitor the first day of results.',
        text_ja: '本番へ展開し、初日の結果を監視する。',
        correct: false,
        note: 'That exposes users to an unverified template — the opposite of inspecting before release.',
        note_ja: '未検証のテンプレートをユーザーに晒すことになる。リリース前の確認とは逆の行為。',
      },
      {
        text: 'Read the Trust Layer audit trail after the first invocation.',
        text_ja: '最初の呼び出し後に Trust Layer の監査証跡を読む。',
        correct: false,
        note: 'Still after the fact, and the audit trail is a governance record, not a design tool.',
        note_ja: 'これも事後であり、監査証跡はガバナンス記録であって設計用のツールではない。',
      },
      {
        text: 'Enable zero data retention and check the provider logs.',
        text_ja: 'ゼロデータ保持を有効化し、プロバイダーのログを確認する。',
        correct: false,
        note: 'Provider logs are not accessible to you, and ZDR is a privacy control.',
        note_ja: 'プロバイダーのログは利用者からは参照できず、ゼロデータ保持はプライバシー制御である。',
      },
      {
        text: 'Use the template preview with sample records to see the resolved prompt and the generated response.',
        text_ja: 'サンプルレコードを使ったテンプレートプレビューで、解決済みプロンプトと生成された応答を確認する。',
        correct: true,
        note: 'Correct. Preview resolves merge fields against a sample record and shows both the prompt and the response.',
        note_ja: '正解。プレビューはサンプルレコードで差し込み項目を解決し、プロンプトと応答の両方を表示する。',
      },
    ],
    explanation:
      'Template preview is the design-time verification tool: pick a sample record, see the fully resolved prompt, and see what the model returns. It is the prompt-template counterpart of Testing Center for agents (Q5, Q49).',
    explanation_ja:
      'テンプレートプレビューは設計時の検証ツールである。サンプルレコードを選び、完全に解決されたプロンプトと、モデルが返す内容を確認できる。エージェントにおける Testing Center（Q5・Q49）に相当する。',
    reference: '💡 Verify before release: prompt templates → preview. Agents → Testing Center. Never "ship and watch".',
    reference_ja: '💡 リリース前の検証：プロンプトテンプレート→プレビュー。エージェント→Testing Center。「出してから様子を見る」は誤り。',
  },
  {
    id: 'af-m1-47',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 47,
    question: 'Why does Yardley Health need to map its data lake objects to data model objects?',
    question_ja:
      'Yardley Health がデータレイクオブジェクトをデータモデルオブジェクトへマッピングする必要があるのはなぜか。',
    options: [
      {
        text: 'To reduce the storage cost of ingested data.',
        text_ja: '取り込んだデータの保管コストを削減するため。',
        correct: false,
        note: 'Mapping is about harmonisation, not storage economics.',
        note_ja: 'マッピングは調和のためであり、保管コストの話ではない。',
      },
      {
        text: 'To apply masking to sensitive fields before ingestion.',
        text_ja: '取り込み前に機密項目へマスキングを適用するため。',
        correct: false,
        note: 'Masking is a Trust Layer control on prompts, and it happens later.',
        note_ja: 'マスキングはプロンプトに対する Trust Layer の制御であり、時点も後になる。',
      },
      {
        text: 'To have a vector index created automatically.',
        text_ja: 'ベクトルインデックスを自動的に作成させるため。',
        correct: false,
        note: 'Indexing is a separate, deliberate configuration step.',
        note_ja: 'インデックス化は別の、意図的な構成手順。',
      },
      {
        text: 'To place source data into a standard, harmonised model that downstream features such as identity resolution, segmentation, and retrievers can use consistently.',
        text_ja: 'ソースデータを標準化・調和されたモデルに載せ、ID解決・セグメント化・リトリーバーといった下流機能が一貫して利用できるようにするため。',
        correct: true,
        note: 'Correct. Harmonisation is the point: downstream features expect a standard model, not each source\'s idiosyncratic shape.',
        note_ja: '正解。調和こそが目的。下流機能は標準モデルを前提としており、ソースごとの独自の形は扱えない。',
      },
    ],
    explanation:
      'DLOs mirror each source exactly, so every source looks different. Mapping to DMOs harmonises them into one standard model. Identity resolution, segmentation, calculated insights and retrievers all depend on that harmonised layer.',
    explanation_ja:
      'DLO は各ソースをそのまま写すため、ソースごとに形が異なる。DMO へのマッピングによって1つの標準モデルへ調和される。ID解決、セグメント化、計算済みインサイト、リトリーバーはいずれもこの調和された層に依存している。',
    reference: '💡 Q8 asks what the structures are; Q47 asks why mapping exists. Same pipeline, two angles.',
    reference_ja: '💡 Q8 は構造そのものを、Q47 はマッピングの目的を問う。同じ流れを2つの角度から見ている。',
  },
  {
    id: 'af-m1-48',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 48,
    question:
      'Ashcombe Legal requires a fixed compliance footer on every response the agent produces, with no discretion left to the model. Where should this be implemented?',
    question_ja:
      'Ashcombe Legal は、エージェントが生成するすべての応答に固定のコンプライアンス用フッターを付ける必要があり、モデルの裁量は一切残したくない。どこに実装すべきか。',
    options: [
      {
        text: 'As a deterministic instruction in an after_reasoning block, which runs after the reasoning step and applies to the produced response.',
        text_ja: 'after_reasoning ブロック内の決定的指示として。推論ステップの後に実行され、生成された応答に適用される。',
        correct: true,
        note: 'Correct. The footer applies to the finished response, so it belongs after reasoning, and it must be deterministic.',
        note_ja: '正解。フッターは完成した応答に適用するものなので推論の後に置き、かつ決定的である必要がある。',
      },
      {
        text: 'In the topic classification description so the model always sees it.',
        text_ja: 'モデルが常に目にするよう、トピックの分類説明の中に。',
        correct: false,
        note: 'The classification description is used for routing, and the model would still have discretion.',
        note_ja: '分類説明はルーティングに使われるものであり、モデルの裁量も残ってしまう。',
      },
      {
        text: 'In a before_reasoning block so it is loaded first.',
        text_ja: '最初に読み込まれるよう、before_reasoning ブロックの中に。',
        correct: false,
        note: 'Right block type, wrong position: the footer applies to output, which does not exist yet.',
        note_ja: 'ブロックの種類は正しいが位置が誤り。フッターは出力に適用するが、その時点で出力はまだ存在しない。',
      },
      {
        text: 'In the retriever filter so the footer is always retrieved.',
        text_ja: 'フッターが常に検索されるよう、リトリーバーのフィルターに。',
        correct: false,
        note: 'Retrievers find grounding content; they do not append fixed text to responses.',
        note_ja: 'リトリーバーはグラウンディング用のコンテンツを探すもので、応答に固定テキストを付加しない。',
      },
    ],
    explanation:
      'Two decisions here. Deterministic versus prompt: "no discretion" means deterministic. Before versus after reasoning: the footer applies to the produced response, so after_reasoning. Compare Q21, where data is needed for the decision and therefore goes before.',
    explanation_ja:
      'ここでの判断は2つ。決定的かプロンプトか：「裁量なし」なら決定的。推論の前か後か：フッターは生成された応答に適用するので after_reasoning。判断の「ために」データが必要で前に置く Q21 と対比しておく。',
    reference: '💡 Before = context for the decision. After = post-processing of the answer. Fixed text → deterministic.',
    reference_ja: '💡 before＝判断のための文脈。after＝回答の後処理。固定テキスト→決定的指示。',
  },
  {
    id: 'af-m1-49',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 49,
    question:
      'Beaumont Foods wants a repeatable measurement of agent quality across a representative set of utterances, run after every change. Which approach provides that?',
    question_ja:
      'Beaumont Foods は、代表的な発話セットに対してエージェントの品質を反復的に測定し、変更のたびに実行したい。これを提供する手法はどれか。',
    options: [
      {
        text: 'Utterance analysis on production traffic alone.',
        text_ja: '本番トラフィックのみに対する発話分析。',
        correct: false,
        note: 'Production traffic varies, so it is not a repeatable comparison, and it only measures after release.',
        note_ja: '本番トラフィックは変動するため反復比較にならず、リリース後にしか測れない。',
      },
      {
        text: 'Manual spot checks performed by the support team each week.',
        text_ja: 'サポートチームが毎週行う手作業の抜き取りチェック。',
        correct: false,
        note: 'Inconsistent coverage and not tied to changes.',
        note_ja: 'カバー範囲が一定せず、変更との紐づけもない。',
      },
      {
        text: 'A suite of test cases run in Testing Center, with results compared before and after each change.',
        text_ja: 'Testing Center で実行するテストケースのスイート。変更の前後で結果を比較する。',
        correct: true,
        note: 'Correct. A fixed suite gives a repeatable baseline, which is what regression detection requires.',
        note_ja: '正解。固定されたスイートは反復可能な基準線を与える。退行検出にはそれが必要。',
      },
      {
        text: 'The Trust Layer audit trail.',
        text_ja: 'Trust Layer の監査証跡。',
        correct: false,
        note: 'A governance record, not a quality measurement.',
        note_ja: 'ガバナンス記録であり、品質測定ではない。',
      },
    ],
    explanation:
      'Repeatable quality measurement needs a fixed input set. Testing Center suites give exactly that: the same utterances every time, so a difference in results means the change caused it. This is why Q58 starts with running the existing suite.',
    explanation_ja:
      '反復可能な品質測定には固定の入力セットが要る。Testing Center のスイートはまさにそれで、毎回同じ発話を使うため、結果の差は変更に起因すると判断できる。Q58 が既存スイートの実行から始まるのはこのためである。',
    reference: '💡 Repeatable + before/after → Testing Center. Real-world demand → utterance analysis.',
    reference_ja: '💡 反復可能＋変更前後の比較→Testing Center。実際の需要→発話分析。',
  },
  {
    id: 'af-m1-50',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 50,
    question:
      'A Corbridge Energy service agent invokes a flow action and the invocation fails with an access error, although the same flow runs correctly when a person launches it. What is the most likely cause?',
    question_ja:
      'Corbridge Energy のサービスエージェントがフローアクションを実行するとアクセスエラーで失敗するが、同じフローを人が起動すると正常に動作する。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The agent has been given too many topics to classify against.',
        text_ja: '分類対象のトピックがエージェントに多すぎる。',
        correct: false,
        note: 'That could cause mis-routing, not an access error.',
        note_ja: 'それは誤ルーティングの原因にはなり得るが、アクセスエラーの原因ではない。',
      },
      {
        text: 'The agent user lacks access to the flow or to the records the flow touches.',
        text_ja: 'エージェントユーザーが、そのフローまたはフローが触れるレコードへのアクセス権を持っていない。',
        correct: true,
        note: 'Correct. Works for a person but not the agent → the two are running as different users with different permissions.',
        note_ja: '正解。人では動きエージェントでは動かない＝両者は権限の異なる別のユーザーとして実行されている。',
      },
      {
        text: 'The agent has been published to too many channels.',
        text_ja: 'エージェントが多すぎるチャネルに公開されている。',
        correct: false,
        note: 'Channel count does not affect permissions.',
        note_ja: 'チャネル数は権限に影響しない。',
      },
      {
        text: 'The reasoning engine cannot invoke flows.',
        text_ja: '推論エンジンはフローを実行できない。',
        correct: false,
        note: 'False — flows are a primary action type (Q10).',
        note_ja: '誤り。フローは代表的なアクション種別（Q10）。',
      },
    ],
    explanation:
      'The signature "works for a human, fails for the agent" points straight at the agent user. Actions execute in the agent\'s security context, so the agent user needs access to the flow itself and to every object and field the flow touches.',
    explanation_ja:
      '「人では動くがエージェントでは失敗する」という症状はエージェントユーザーを直接指し示す。アクションはエージェントのセキュリティコンテキストで実行されるため、エージェントユーザーにはフロー自体と、フローが触れるすべてのオブジェクト・項目へのアクセス権が必要。',
    reference: '💡 Access error on an action → check the agent user first (Q28), and remember it is configured per org (Q57).',
    reference_ja: '💡 アクションのアクセスエラー→まずエージェントユーザーを確認（Q28）。組織ごとの構成が必要な点も想起する（Q57）。',
  },
  {
    id: 'af-m1-51',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 51,
    question:
      'Denholm Retail must ensure that one specific model is never used anywhere in the org, for regulatory reasons. What should the specialist do?',
    question_ja:
      'Denholm Retail は規制上の理由から、特定のモデルが組織内のどこでも使われないようにする必要がある。スペシャリストがすべきことはどれか。',
    options: [
      {
        text: 'Remove that model from the configuration of every existing prompt template.',
        text_ja: '既存のすべてのプロンプトテンプレートの構成から、そのモデルを外す。',
        correct: false,
        note: 'Covers today but not tomorrow — nothing stops someone selecting it in a new template.',
        note_ja: '今日の分は塞げても明日は塞げない。新しいテンプレートで選ばれるのを防げない。',
      },
      {
        text: 'Disable the model at the org level so it cannot be selected by any template or agent.',
        text_ja: '組織レベルでそのモデルを無効化し、どのテンプレートやエージェントからも選択できないようにする。',
        correct: true,
        note: 'Correct. An org-level control is the only way to guarantee it is never used, now or in future.',
        note_ja: '正解。将来も含めて使われないことを保証できるのは組織レベルの制御だけ。',
      },
      {
        text: 'Add a prompt instruction telling that model not to respond.',
        text_ja: 'そのモデルに応答しないよう指示するプロンプト指示を追加する。',
        correct: false,
        note: 'Self-defeating: you would still be sending data to the prohibited model.',
        note_ja: '本末転倒。禁止対象のモデルにデータを送ってしまっている。',
      },
      {
        text: 'Deactivate every template that currently references it.',
        text_ja: '現在そのモデルを参照しているテンプレートをすべて非アクティブ化する。',
        correct: false,
        note: 'Disables working functionality and still does not prevent future selection.',
        note_ja: '正常に動いている機能まで止めるうえ、将来の選択も防げない。',
      },
    ],
    explanation:
      'When a requirement is absolute and org-wide, the control must be org-wide too. Cleaning up individual templates is enumeration, not enforcement — a new template created next month would reintroduce the risk.',
    explanation_ja:
      '要件が絶対的かつ組織全体に及ぶなら、制御も組織全体でなければならない。個別テンプレートの掃除は「列挙」であって「強制」ではなく、来月作られる新しいテンプレートでリスクが再発する。',
    reference: '💡 "Never, anywhere" → org-level control. Per-item cleanup never guarantees a future state.',
    reference_ja: '💡 「どこでも決して」→組織レベルの制御。個別対応では将来の状態を保証できない。',
  },
  {
    id: 'af-m1-52',
    domain: 'af-prompt',
    type: 'mcq',
    source: 'official',
    examOrder: 52,
    question:
      "Everly Bank needs its agent to answer using both the customer's account record and a library of PDF disclosure documents. What does this require?",
    question_ja:
      'Everly Bank は、顧客の口座レコードとPDFの開示書類ライブラリの両方を使ってエージェントに回答させたい。これに必要なものはどれか。',
    options: [
      {
        text: 'Structured grounding through the record and its fields, together with retrieval from an index built over the disclosure documents.',
        text_ja: 'レコードとその項目による構造化グラウンディングと、開示書類上に構築したインデックスからの検索の併用。',
        correct: true,
        note: 'Correct. Two source shapes require two grounding mechanisms used together.',
        note_ja: '正解。ソースの形が2種類あるなら、2つのグラウンディング手法を併用する。',
      },
      {
        text: 'Only a search index, because an index can also read record fields directly.',
        text_ja: '検索インデックスのみ。インデックスはレコード項目も直接読めるから。',
        correct: false,
        note: 'False premise. Indexes serve indexed content, not live record fields.',
        note_ja: '前提が誤り。インデックスが扱うのはインデックス化されたコンテンツであり、ライブなレコード項目ではない。',
      },
      {
        text: 'Only merge fields, because merge fields can read the contents of attached PDFs.',
        text_ja: '差し込み項目のみ。差し込み項目は添付PDFの中身も読めるから。',
        correct: false,
        note: 'False premise. Merge fields read field values, not document contents.',
        note_ja: '前提が誤り。差し込み項目は項目の値を読むのであって、ドキュメントの中身は読まない。',
      },
      {
        text: 'Identity resolution, which converts documents into records.',
        text_ja: 'ID解決。ドキュメントをレコードに変換する。',
        correct: false,
        note: 'False premise. Identity resolution unifies duplicate person records.',
        note_ja: '前提が誤り。ID解決は重複する人物レコードを統合するもの。',
      },
    ],
    explanation:
      'Structured and unstructured grounding are complementary, not alternatives. Records and fields → merge fields. Documents → an index and a retriever. When the answer needs both, configure both.',
    explanation_ja:
      '構造化グラウンディングと非構造化グラウンディングは択一ではなく補完関係にある。レコードと項目→差し込み項目。ドキュメント→インデックスとリトリーバー。回答に両方が必要なら両方を構成する。',
    reference: '💡 Three of the four options here rest on a false premise. Check the premise before judging the conclusion.',
    reference_ja: '💡 この設問は4択のうち3つが誤った前提に立っている。結論より先に前提を確認する。',
  },
  {
    id: 'af-m1-53',
    domain: 'af-integration',
    type: 'mcq',
    source: 'official',
    examOrder: 53,
    question:
      'Frampton Hotels wants the agent to look up a reservation using an API the company already exposes from its property management system. Which implementation is most appropriate?',
    question_ja:
      'Frampton Hotels は、自社の宿泊管理システムがすでに公開しているAPIを使って、エージェントに予約を照会させたい。最も適切な実装はどれか。',
    options: [
      {
        text: 'A Record Summary prompt template pointed at the Reservation object.',
        text_ja: 'Reservation オブジェクトを対象とした Record Summary プロンプトテンプレート。',
        correct: false,
        note: 'Summarises a Salesforce record; it cannot call an external API.',
        note_ja: 'Salesforce レコードを要約するもので、外部APIは呼び出せない。',
      },
      {
        text: 'An action built on an external service or Apex call that invokes the existing API.',
        text_ja: '既存のAPIを呼び出す外部サービスまたは Apex コールに基づくアクション。',
        correct: true,
        note: 'Correct. Reaching an external system is work, so it is an action — implemented over the existing API.',
        note_ja: '正解。外部システムへの到達は「実行」なのでアクションになる。既存APIの上に実装する。',
      },
      {
        text: 'An availability filter that returns the reservation.',
        text_ja: '予約を返す利用可能条件。',
        correct: false,
        note: 'Availability filters gate actions; they do not fetch data.',
        note_ja: '利用可能条件はアクションの可否を制御するもので、データ取得はしない。',
      },
      {
        text: 'A dedicated data space for reservations.',
        text_ja: '予約専用のデータスペース。',
        correct: false,
        note: 'A data partition, not an integration mechanism.',
        note_ja: 'データの区画であり、連携の仕組みではない。',
      },
    ],
    explanation:
      'When the agent must reach an external system, that is an action. Implement it over an external service or an Apex callout. MCP (Q15) is the alternative when the other side already exposes an MCP-compatible tool surface.',
    explanation_ja:
      'エージェントが外部システムへ到達する必要があるなら、それはアクションである。外部サービスまたは Apex コールアウトの上に実装する。相手側が MCP 対応のツール面をすでに公開している場合は MCP（Q15）が選択肢になる。',
    reference: '💡 Existing company API → action over external service / Apex. MCP-compatible tool platform → MCP.',
    reference_ja: '💡 自社の既存API→外部サービス／Apex によるアクション。MCP対応のツール基盤→MCP。',
  },
  {
    id: 'af-m1-54',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 54,
    question:
      "Gorsely Insurance observes a rising proportion of conversations in which no topic matched the customer's request. What action follows from that signal?",
    question_ja:
      'Gorsely Insurance では、顧客の要求にどのトピックも一致しなかった会話の割合が上昇している。このシグナルから導かれる対応はどれか。',
    options: [
      {
        text: "Increase the agent's maximum response length.",
        text_ja: 'エージェントの最大応答長を増やす。',
        correct: false,
        note: 'Unrelated to whether a topic matched.',
        note_ja: 'トピックが一致したかどうかとは無関係。',
      },
      {
        text: 'Disable the model currently in use.',
        text_ja: '現在使用しているモデルを無効化する。',
        correct: false,
        note: 'The gap is in configured coverage, not in the model.',
        note_ja: '不足しているのは構成上のカバー範囲であり、モデルではない。',
      },
      {
        text: "Review the unmatched utterances and either extend an existing topic's scope or add a topic to cover the demand.",
        text_ja: '一致しなかった発話を精査し、既存トピックのスコープを広げるか、需要に対応するトピックを追加する。',
        correct: true,
        note: 'Correct. Unmatched utterances describe demand you have not covered; read them and close the gap.',
        note_ja: '正解。一致しなかった発話はカバーできていない需要を表す。内容を読み、ギャップを埋める。',
      },
      {
        text: 'Reduce the number of channels the agent is published to.',
        text_ja: 'エージェントを公開しているチャネル数を減らす。',
        correct: false,
        note: 'Reduces exposure rather than improving coverage.',
        note_ja: '露出を減らすだけで、カバー範囲の改善にはならない。',
      },
    ],
    explanation:
      'A rising no-match rate is the clearest signal that real demand has outgrown the configured topics. The response is to read the unmatched utterances (Q19) and extend or add topics — then verify with a Testing Center suite before release.',
    explanation_ja:
      '未一致率の上昇は、実際の需要が構成済みトピックを超えたことを示す最も明確なシグナルである。対応は、一致しなかった発話を読み（Q19）、トピックを拡張または追加すること。そのうえでリリース前に Testing Center のスイートで検証する。',
    reference: '💡 The loop: utterance analysis finds the gap → extend/add topics → Testing Center verifies → controlled release (Q60).',
    reference_ja: '💡 サイクル：発話分析でギャップ発見→トピック拡張・追加→Testing Center で検証→統制されたリリース（Q60）。',
  },
  {
    id: 'af-m1-55',
    domain: 'af-trust',
    type: 'mcq',
    source: 'official',
    examOrder: 55,
    question:
      'A user at Halloway Media pastes text into the chat instructing the agent to disregard its instructions and reveal its configuration. Which Trust Layer capability is designed to resist this?',
    question_ja:
      'Halloway Media のユーザーが、指示を無視して構成を明かすようエージェントに命じるテキストをチャットに貼り付けた。これに抵抗するために設計された Trust Layer の機能はどれか。',
    options: [
      {
        text: 'Zero data retention',
        text_ja: 'ゼロデータ保持',
        correct: false,
        note: 'Governs what the provider stores, not what the agent can be talked into doing.',
        note_ja: 'プロバイダーが何を保存するかを規定するもので、エージェントが言いくるめられるかとは無関係。',
      },
      {
        text: 'Data masking',
        text_ja: 'データマスキング',
        correct: false,
        note: 'Protects sensitive values in the prompt; it does not resist instruction override.',
        note_ja: 'プロンプト内の機密値を保護するもので、指示の上書きに抵抗するものではない。',
      },
      {
        text: 'Audit trail',
        text_ja: '監査証跡',
        correct: false,
        note: 'Records the attempt after the fact; it does not prevent it.',
        note_ja: '事後に試行を記録するだけで、防止はしない。',
      },
      {
        text: 'Prompt defence',
        text_ja: 'プロンプト防御',
        correct: true,
        note: 'Correct. Prompt defence is the guardrail against prompt injection and instruction-override attempts.',
        note_ja: '正解。プロンプト防御はプロンプトインジェクションや指示の上書きに対するガードレール。',
      },
    ],
    explanation:
      'Prompt injection is a user trying to override the system\'s instructions through the conversation. Prompt defence is the Trust Layer guardrail aimed at that attack. Masking, zero data retention, toxicity detection and the audit trail each address different risks.',
    explanation_ja:
      'プロンプトインジェクションとは、ユーザーが会話を通じてシステムの指示を上書きしようとする攻撃である。プロンプト防御はその攻撃に対する Trust Layer のガードレール。マスキング、ゼロデータ保持、毒性検出、監査証跡はそれぞれ別のリスクに対応する。',
    reference:
      '💡 Trust Layer map — masking: data leaving. ZDR: provider retention. Toxicity: harmful output. Prompt defence: injection. Audit trail: record.',
    reference_ja:
      '💡 Trust Layer 対応表 — マスキング：データの流出。ゼロデータ保持：プロバイダーの保存。毒性検出：有害な出力。プロンプト防御：インジェクション。監査証跡：記録。',
  },
  {
    id: 'af-m1-56',
    domain: 'af-data',
    type: 'mcq',
    source: 'official',
    examOrder: 56,
    question:
      'Ivorton Labs finds that answers are cut off mid-procedure because the steps of a procedure span chunk boundaries. Which adjustment is most appropriate?',
    question_ja:
      'Ivorton Labs では、手順のステップがチャンクの境界をまたぐため、回答が手順の途中で切れてしまう。最も適切な調整はどれか。',
    options: [
      {
        text: 'Increase the chunk size or the overlap so procedural steps remain together within a retrieved passage.',
        text_ja: 'チャンクサイズまたはオーバーラップを大きくし、手順のステップが検索されたパッセージ内にまとまって残るようにする。',
        correct: true,
        note: 'Correct. Overlap in particular keeps content that straddles a boundary present in both chunks.',
        note_ja: '正解。特にオーバーラップは、境界をまたぐ内容を両方のチャンクに残す働きをする。',
      },
      {
        text: 'Reduce the number of retrieved passages to one.',
        text_ja: '検索するパッセージ数を1つに減らす。',
        correct: false,
        note: 'Retrieving less makes truncation more likely, not less.',
        note_ja: '取得量を減らせば途切れる可能性はむしろ高まる。',
      },
      {
        text: 'Switch the index from semantic to keyword matching.',
        text_ja: 'インデックスをセマンティックからキーワード一致へ切り替える。',
        correct: false,
        note: 'Matching style does not change how content was split.',
        note_ja: '一致方式は、コンテンツがどう分割されたかを変えない。',
      },
      {
        text: 'Remove the retriever and use merge fields instead.',
        text_ja: 'リトリーバーを外し、代わりに差し込み項目を使う。',
        correct: false,
        note: 'Merge fields cannot read document content at all.',
        note_ja: '差し込み項目はドキュメントの中身をまったく読めない。',
      },
    ],
    explanation:
      'Overlap is the specific remedy for content that straddles chunk boundaries: adjacent chunks share text, so a procedure split across a boundary still appears intact in at least one chunk. Increasing chunk size helps for the same reason.',
    explanation_ja:
      'オーバーラップは、チャンク境界をまたぐコンテンツに対する的確な対処である。隣り合うチャンクがテキストを共有するため、境界で分断された手順も少なくとも一方のチャンクには完全な形で現れる。チャンクサイズの拡大も同じ理由で有効。',
    reference: '💡 Q13 = passage too short overall. Q56 = content split at a boundary. Overlap targets the boundary case.',
    reference_ja: '💡 Q13＝パッセージが全体的に短い。Q56＝境界で内容が分断される。境界の問題に効くのがオーバーラップ。',
  },
  {
    id: 'af-m1-57',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 57,
    question:
      'Jarrow Freight is promoting an agent from a sandbox to production. Which item must be configured directly in the target org rather than deployed as metadata?',
    question_ja:
      'Jarrow Freight はエージェントをサンドボックスから本番へ昇格させようとしている。メタデータとして展開するのではなく、対象組織で直接構成しなければならない項目はどれか。',
    options: [
      {
        text: "The agent's topics",
        text_ja: 'エージェントのトピック',
        correct: false,
        note: 'Topics are part of the agent definition and deploy as metadata.',
        note_ja: 'トピックはエージェント定義の一部であり、メタデータとして展開される。',
      },
      {
        text: "The agent's prompt templates",
        text_ja: 'エージェントのプロンプトテンプレート',
        correct: false,
        note: 'Prompt templates deploy as metadata (though they still need activating — Q11).',
        note_ja: 'プロンプトテンプレートはメタデータとして展開される（ただし有効化は別途必要 — Q11）。',
      },
      {
        text: 'The flows used as agent actions',
        text_ja: 'エージェントアクションとして使われるフロー',
        correct: false,
        note: 'Flows are standard deployable metadata.',
        note_ja: 'フローは標準的な展開可能メタデータ。',
      },
      {
        text: 'The agent user and its permission assignments',
        text_ja: 'エージェントユーザーとその権限割り当て',
        correct: true,
        note: 'Correct. Users and permission assignments are environment-specific and must be set up in the target org.',
        note_ja: '正解。ユーザーと権限割り当ては環境固有であり、対象組織側で構築する必要がある。',
      },
    ],
    explanation:
      'Definitions deploy; environment configuration does not. Topics, actions, flows and prompt templates travel as metadata. The agent user with its permission assignments — and Data 360 setup (Q24) — must be established in each org.',
    explanation_ja:
      '定義は展開されるが、環境の構成は展開されない。トピック、アクション、フロー、プロンプトテンプレートはメタデータとして移送される。エージェントユーザーとその権限割り当て、そして Data 360 のセットアップ（Q24）は各組織で構築する必要がある。',
    reference: '💡 Three deployment traps: inactive on arrival (Q35), Data 360 not included (Q24), agent user per org (Q57).',
    reference_ja: '💡 展開の3つの落とし穴：到着時は非アクティブ（Q35）、Data 360 は含まれない（Q24）、エージェントユーザーは組織ごと（Q57）。',
  },
  {
    id: 'af-m1-58',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 58,
    question:
      'Kelbrook Retail added three actions to an existing topic, and an answer that had been reliable for months has started to change. What should the specialist do first?',
    question_ja:
      'Kelbrook Retail は既存のトピックに3つのアクションを追加したところ、数か月間安定していた回答が変化し始めた。スペシャリストが最初にすべきことはどれか。',
    options: [
      {
        text: 'Run the existing test suite to identify which cases regressed, then narrow the topic or the action descriptions accordingly.',
        text_ja: '既存のテストスイートを実行して退行したケースを特定し、それに応じてトピックまたはアクションの説明を絞り込む。',
        correct: true,
        note: 'Correct. Measure first: the suite tells you exactly what changed before you start editing.',
        note_ja: '正解。まず測る。スイートが、編集を始める前に何が変わったのかを正確に教えてくれる。',
      },
      {
        text: 'Roll the org back to the previous release.',
        text_ja: '組織を前回のリリースにロールバックする。',
        correct: false,
        note: 'Discards the new capability without understanding the cause.',
        note_ja: '原因を理解しないまま新機能を捨てることになる。',
      },
      {
        text: 'Deactivate the agent permanently and rebuild it.',
        text_ja: 'エージェントを恒久的に非アクティブ化し、作り直す。',
        correct: false,
        note: 'Wildly disproportionate to a topic-scope regression.',
        note_ja: 'トピックのスコープに起因する退行に対して、あまりに過剰な対応。',
      },
      {
        text: "Increase the agent's token limit.",
        text_ja: 'エージェントのトークン上限を増やす。',
        correct: false,
        note: 'Unrelated to which action the engine selects.',
        note_ja: 'エンジンがどのアクションを選ぶかとは無関係。',
      },
    ],
    explanation:
      'Adding actions widens the candidate set the reasoning engine chooses from, which can change previously stable behaviour. The disciplined response is to run the existing suite to see exactly what regressed, then tighten the descriptions that now overlap.',
    explanation_ja:
      'アクションの追加は推論エンジンの選択候補を広げるため、それまで安定していた挙動が変わることがある。規律ある対応は、既存スイートを実行して何が退行したかを正確に把握し、そのうえで重なってしまった説明を絞り込むこと。',
    reference: '💡 This is why Q49 matters: without a suite there is no baseline, so you cannot tell what your change broke.',
    reference_ja: '💡 Q49 が重要な理由がここにある。スイートがなければ基準線がなく、変更が何を壊したのか判断できない。',
  },
  {
    id: 'af-m1-59',
    domain: 'af-agent',
    type: 'mcq',
    source: 'official',
    examOrder: 59,
    question:
      'Lynford Group is designing a supervisor agent that delegates to several specialist agents inside a single Salesforce org. Which statement describes this architecture correctly?',
    question_ja:
      'Lynford Group は、単一の Salesforce 組織内で複数の専門エージェントに委譲するスーパーバイザーエージェントを設計している。このアーキテクチャを正しく説明しているものはどれか。',
    options: [
      {
        text: 'Each specialist agent must live in a separate org.',
        text_ja: '各専門エージェントは別々の組織に存在しなければならない。',
        correct: false,
        note: 'No such requirement — multiple agents can coexist in one org.',
        note_ja: 'そのような要件はない。1つの組織に複数のエージェントが共存できる。',
      },
      {
        text: 'Delegation between agents in the same org requires MCP.',
        text_ja: '同一組織内のエージェント間の委譲には MCP が必要である。',
        correct: false,
        note: 'MCP is for external tools and data. Agent-to-agent delegation is A2A (Q39), and within one org it is native.',
        note_ja: 'MCP は外部ツールやデータ向け。エージェント間の委譲は A2A（Q39）で、同一組織内ではネイティブに行える。',
      },
      {
        text: "Keeping the agents in one org lets them share that org's data and governance, with the supervisor routing requests by reasoning over each specialist's declared scope.",
        text_ja: '同一組織にエージェントを置くことで組織のデータとガバナンスを共有でき、スーパーバイザーは各専門エージェントの宣言されたスコープを推論してリクエストを振り分ける。',
        correct: true,
        note: 'Correct. Shared data and governance, with routing driven by each specialist\'s declared scope.',
        note_ja: '正解。データとガバナンスを共有し、各専門エージェントの宣言されたスコープに基づいて振り分ける。',
      },
      {
        text: 'A supervisor agent cannot invoke actions of its own.',
        text_ja: 'スーパーバイザーエージェントは自身のアクションを実行できない。',
        correct: false,
        note: 'No such restriction exists.',
        note_ja: 'そのような制限はない。',
      },
    ],
    explanation:
      'The supervisor pattern scales the same idea as topic selection up one level: instead of choosing a topic, the supervisor reasons over each specialist agent\'s declared scope and routes to it. Keeping them in one org means shared data, security and governance.',
    explanation_ja:
      'スーパーバイザーパターンは、トピック選択と同じ発想を一段上のレベルに広げたものである。トピックを選ぶ代わりに、各専門エージェントの宣言されたスコープを推論して振り分ける。同一組織に置けば、データ・セキュリティ・ガバナンスを共有できる。',
    reference: '💡 Same org → native delegation, shared governance. Across orgs/teams → A2A (Q39).',
    reference_ja: '💡 同一組織→ネイティブな委譲、ガバナンス共有。組織やチームをまたぐ→A2A（Q39）。',
  },
  {
    id: 'af-m1-60',
    domain: 'af-lifecycle',
    type: 'mcq',
    source: 'official',
    examOrder: 60,
    question:
      'Mowbray Bank wants a controlled process so that changes to production agents are reviewed and traceable. Which practice supports this?',
    question_ja:
      'Mowbray Bank は、本番エージェントへの変更がレビューされ追跡可能になるよう、統制されたプロセスを求めている。これを支える実践はどれか。',
    options: [
      {
        text: 'Allow builders to edit production agents directly so that fixes reach customers quickly.',
        text_ja: '修正が早く顧客に届くよう、ビルダーが本番エージェントを直接編集できるようにする。',
        correct: false,
        note: 'Speed at the cost of review and traceability — the opposite of what was asked.',
        note_ja: 'レビューと追跡可能性を犠牲にした速さであり、求められているものの正反対。',
      },
      {
        text: 'Disable monitoring so that the change log is not cluttered with routine activity.',
        text_ja: '変更ログが日常的な活動で煩雑にならないよう、監視を無効化する。',
        correct: false,
        note: 'Destroys the traceability the requirement asks for.',
        note_ja: '要件が求めている追跡可能性そのものを破壊する。',
      },
      {
        text: 'Build and test changes in a lower environment, review them, promote them through a controlled release, and keep an auditable record of what changed.',
        text_ja: '下位環境で変更を作成・テストし、レビューを経て統制されたリリースで昇格させ、変更内容の監査可能な記録を残す。',
        correct: true,
        note: 'Correct. Build low, verify, review, promote, record — the standard governed release lifecycle.',
        note_ja: '正解。下位環境で作り、検証し、レビューし、昇格させ、記録する。統制されたリリースライフサイクルの標準形。',
      },
      {
        text: 'Deactivate all agents at the end of every working day.',
        text_ja: '毎営業日の終わりにすべてのエージェントを非アクティブ化する。',
        correct: false,
        note: 'Disrupts service and does nothing for review or traceability.',
        note_ja: 'サービスを妨げるだけで、レビューにも追跡可能性にも寄与しない。',
      },
    ],
    explanation:
      'Governed change means build and test in a lower environment, review, promote through a controlled release, and keep an audit record. Testing Center provides the verification step (Q49), and deactivation remains available for incidents (Q9).',
    explanation_ja:
      '統制された変更とは、下位環境で作成・テストし、レビューし、統制されたリリースで昇格させ、監査記録を残すことである。検証の工程は Testing Center が担い（Q49）、インシデント時には非アクティブ化が使える（Q9）。',
    reference: '💡 Editing production directly is never the right answer on this exam.',
    reference_ja: '💡 この試験で「本番を直接編集する」が正解になることはない。',
  },
]
