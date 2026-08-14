export const agentStudy = {
  intro:
    'Agents are the centre of this exam. An agent is a definition made of topics, each bundling a job with its instructions and the actions available for that job. The Atlas Reasoning Engine reads a resolved prompt and decides which topic and which actions apply. The single most examined idea in this unit is hybrid reasoning: the difference between an instruction the model interprets and one that executes exactly as written.',
  intro_ja:
    'エージェントはこの試験の中心です。エージェントは複数のトピックからなる定義であり、各トピックは「なすべき仕事」を、その指示とその仕事で使えるアクションとともに束ねています。Atlas Reasoning Engine は解決済みプロンプトを読み、どのトピックとどのアクションを使うかを判断します。この単元で最も多く問われるのはハイブリッド推論、すなわち「モデルが解釈する指示」と「記述どおりに実行される指示」の違いです。',
  sections: [
    {
      heading: 'What an agent is made of',
      heading_ja: 'エージェントを構成する要素',
      body:
        'An agent is not a single block of prompt text. It is a structured definition: a role and scope statement that sets the outer boundary, a set of topics that divide the work, and actions attached to each topic that let the agent affect the world. Understanding which layer a problem belongs to is how you answer most questions in this unit.',
      body_ja:
        'エージェントは1つのプロンプト文の塊ではありません。外側の境界を定めるロールとスコープの記述、仕事を分割する複数のトピック、そして各トピックに紐づく「世界に働きかける」ためのアクションからなる構造化された定義です。問題がどの層に属するかを見極めることが、この単元の設問に答える鍵になります。',
      figure: 'af-agent-anatomy',
      points: [
        'Role and scope statement — the agent-level boundary. It decides what the agent will engage with at all, and what it declines and redirects. Fix out-of-remit answers here.',
        'Topic — a job to be done, its instructions, and the actions available while doing that job. The reasoning engine selects one by classifying the user request against each topic\'s classification description.',
        'Action — a specific thing the agent can do: run a flow, call Apex or an external service, use a standard action, or invoke a prompt template. Actions are how an agent changes data or reaches other systems.',
        'Classification description — the text the engine matches the request against. Overlapping descriptions across topics are the standard cause of mis-routing.',
        'Availability filter — a condition on an action that decides whether the action is even presented to the reasoning engine. Because a filtered-out action is invisible, this is enforcement rather than guidance.',
        'Rule of thumb: wrong subject entirely → role and scope. Right subject, wrong topic → classification descriptions. Right topic, wrong action → action descriptions or availability filters.',
      ],
      points_ja: [
        'ロールとスコープの記述 — エージェントレベルの境界。そもそも何に応じ、何を断って誘導するかを決める。担当範囲外への回答はここで直す。',
        'トピック — なすべき仕事、その指示、その仕事で使えるアクションの束。推論エンジンは、ユーザーの要求を各トピックの分類説明と照合して1つを選ぶ。',
        'アクション — エージェントが実行できる具体的な操作。フローの実行、Apex や外部サービスの呼び出し、標準アクションの利用、プロンプトテンプレートの呼び出しなど。データを変更したり他システムへ到達したりする手段。',
        '分類説明 — 推論エンジンが要求を照合するテキスト。トピック間で説明が重なることが、誤ルーティングの典型的な原因。',
        '利用可能条件 — アクションに付ける条件で、そのアクションを推論エンジンに提示するかどうかを決める。除外されたアクションは見えないため、案内ではなく強制として機能する。',
        '目安：そもそも主題が違う→ロールとスコープ。主題は合うがトピックが違う→分類説明。トピックは合うがアクションが違う→アクションの説明または利用可能条件。',
      ],
    },
    {
      heading: 'The Atlas Reasoning Engine and the resolved prompt',
      heading_ja: 'Atlas Reasoning Engine と解決済みプロンプト',
      body:
        'A common misconception is that the model reads your Agent Script line by line. It does not. Everything you author — the script or canvas definition, the active topic\'s instructions, and the data you have grounded — is parsed and assembled into a single resolved prompt before any model call is made. The reasoning engine works from that.',
      body_ja:
        'よくある誤解は、モデルが Agent Script を1行ずつ読んでいるというものです。そうではありません。作成したもの（スクリプトまたはキャンバスの定義、アクティブなトピックの指示、グラウンディングしたデータ）はすべて解析され、モデル呼び出しの前に単一の「解決済みプロンプト」として組み立てられます。推論エンジンはそれをもとに動作します。',
      points: [
        'Authoring artefacts are compiled. The engine receives one resolved prompt, not the raw script and not the canvas diagram.',
        'Agent Script and the Canvas view are two editors over one underlying definition. They stay in sync, there is no precedence rule, and there is no manual merge step.',
        'Because the engine reasons over a single assembled prompt, everything that matters must be *in* that prompt — which is why grounding and before_reasoning blocks matter so much.',
        'The engine then classifies the request to select a topic, and selects actions from those the topic makes available and that pass their availability filters.',
        'Model choice affects generation quality and cost. It does not affect topic routing logic, and it is never the fix for a scoping problem.',
      ],
      points_ja: [
        '作成した成果物はコンパイルされる。エンジンが受け取るのは単一の解決済みプロンプトであり、生のスクリプトでもキャンバスの図でもない。',
        'Agent Script と Canvas ビューは、1つの定義に対する2つのエディタ。常に同期しており、優先順位のルールも手動マージの手順も存在しない。',
        'エンジンは組み立てられた単一のプロンプトをもとに推論するため、重要なものはすべてそのプロンプトの「中」になければならない。グラウンディングや before_reasoning ブロックが重要なのはこのため。',
        'その後エンジンは要求を分類してトピックを選び、そのトピックが提供し、かつ利用可能条件を通過したアクションの中から選択する。',
        'モデルの選択は生成の品質とコストに影響する。トピックのルーティングロジックには影響せず、スコープの問題の解決策になることも決してない。',
      ],
    },
    {
      heading: 'Hybrid reasoning: prompt instructions vs deterministic instructions',
      heading_ja: 'ハイブリッド推論：プロンプト指示と決定的指示',
      body:
        'This is the highest-yield concept in the whole exam. Agent Script lets one definition mix two kinds of instruction. A prompt instruction is evaluated by the model at run time, so its outcome can vary. A deterministic instruction executes exactly as written, every time. Almost every "how do I guarantee X" question is answered by the second kind.',
      body_ja:
        'これは試験全体で最も出題効率の高い概念です。Agent Script は1つの定義の中で2種類の指示を混在させられます。プロンプト指示は実行時にモデルが評価するため結果が変動します。決定的指示は毎回、記述どおりに実行されます。「どうやってXを保証するか」という設問のほぼすべてが、後者で答えられます。',
      figure: 'af-hybrid-reasoning',
      points: [
        'Prompt instruction — interpreted by the model. Use it where nuance, tone and contextual judgement genuinely add value: how to phrase a refusal, how to adapt to a frustrated customer.',
        'Deterministic instruction — executes exactly as written. Use it for compliance steps, mandatory verification, required lookups, and fixed text that must always appear.',
        'Keyword test: "always / every / must / identically / guaranteed / never" → deterministic. "Decide / judge / depending on / as appropriate" → prompt instruction.',
        'A description is neither. Writing "only for premium members" in an action description is guidance the model may ignore; it is not a control.',
        'Getting a requirement 80% right is what "the model decides" looks like in practice. If an auditor would ask you to prove it happens every time, it has to be deterministic.',
        'The point of hybrid reasoning is not to prefer one kind over the other. It is to assign each requirement to the mechanism that fits it.',
      ],
      points_ja: [
        'プロンプト指示 — モデルが解釈する。ニュアンス、トーン、文脈判断が本当に価値を生む場面で使う。断りの表現、苛立った顧客への対応の調整など。',
        '決定的指示 — 記述どおりに実行される。コンプライアンス手順、必須の本人確認、必要な参照、必ず出力すべき固定テキストに使う。',
        'キーワード判定：「必ず／毎回／must／同一に／保証／決して」→決定的指示。「判断して／状況に応じて／適宜」→プロンプト指示。',
        '説明文はどちらでもない。アクションの説明に「プレミアム会員のみ」と書いてもモデルは無視しうる案内であり、制御ではない。',
        '要件が8割の確率で満たされる、というのが「モデルが判断する」の実際の姿。監査担当に「毎回起きると証明できるか」と問われる要件なら、決定的でなければならない。',
        'ハイバリッド推論の要点はどちらか一方を好むことではなく、各要件を適した仕組みに割り当てることにある。',
      ],
    },
    {
      heading: 'before_reasoning and after_reasoning blocks',
      heading_ja: 'before_reasoning ブロックと after_reasoning ブロック',
      body:
        'Agent Script blocks are positioned relative to the reasoning step, and the exam tests whether you can place work on the correct side of it. The question to ask is simple: is this work an input to the decision, or a treatment of the output?',
      body_ja:
        'Agent Script のブロックは推論ステップを基準に配置され、試験ではその前後どちらに置くべきかが問われます。問うべきことは単純です。この処理は「判断への入力」なのか、「出力への処理」なのか。',
      points: [
        'before_reasoning — runs ahead of the reasoning step. This is where you load context the decision needs: fetch the customer\'s open orders, look up entitlement, retrieve the account tier.',
        'after_reasoning — runs after the reasoning step and applies to the response that was produced. This is where fixed post-processing lives: a compliance footer, a survey link, a standard sign-off.',
        'Both blocks can contain deterministic instructions. Choosing the block is about timing; choosing deterministic versus prompt is about whether variation is acceptable.',
        'Classic trap: putting a mandatory lookup in after_reasoning. The decision has already been made, so the data arrives too late to influence it.',
        'Mirror trap: putting a fixed footer in before_reasoning. The response does not exist yet, so there is nothing to append it to.',
      ],
      points_ja: [
        'before_reasoning — 推論ステップより前に実行される。判断に必要な文脈を読み込む場所。顧客の未処理注文の取得、権利の確認、取引先ティアの参照など。',
        'after_reasoning — 推論ステップの後に実行され、生成された応答に適用される。固定の後処理を置く場所。コンプライアンスフッター、アンケートリンク、定型の結び文など。',
        'どちらのブロックにも決定的指示を置ける。ブロックの選択はタイミングの問題、決定的かプロンプトかは変動が許容されるかの問題。',
        '典型的な引っかけ：必須の参照を after_reasoning に置くこと。判断はすでに終わっており、データが届くのが遅すぎる。',
        '対になる引っかけ：固定フッターを before_reasoning に置くこと。その時点で応答は存在せず、付加する対象がない。',
      ],
    },
    {
      heading: 'Actions: what an agent can actually do (deep dive)',
      heading_ja: 'アクション：エージェントが実際にできること（深掘り）',
      body:
        'Prompt templates produce language; actions produce effects. When a requirement involves updating records, calling another system, or branching on conditions, you are looking for an action. The most common implementation is a flow published as an agent action.',
      body_ja:
        'プロンプトテンプレートは言語を生み、アクションは効果を生みます。レコードの更新、他システムの呼び出し、条件分岐を伴う要件であれば、探しているのはアクションです。最も一般的な実装は、エージェントアクションとして公開したフローです。',
      points: [
        'Flow published as an agent action — the default choice for multi-step logic, record updates, callouts and conditional branching. Declarative and maintainable.',
        'Apex or an external service — used when you must call an API the company already exposes, or when the logic exceeds what flow can express.',
        'Standard actions — supplied by the Agentforce library for common operations. Useful, but they will not implement company-specific processes without configuration.',
        'A prompt template can be exposed as an action, but only for generating language. It cannot update records or make callouts.',
        'An Apex trigger is not an agent action. Triggers fire on DML; an agent cannot choose to invoke one.',
        'Actions run in the agent\'s security context, so the running user needs access to the flow and to every object and field it touches. "Works for a person, fails for the agent" always points here.',
      ],
      points_ja: [
        'エージェントアクションとして公開したフロー — 複数ステップのロジック、レコード更新、コールアウト、条件分岐に対する既定の選択肢。宣言的で保守しやすい。',
        'Apex または外部サービス — 自社がすでに公開しているAPIを呼ぶ必要がある場合や、フローで表現できないロジックの場合に使う。',
        '標準アクション — 一般的な操作向けに Agentforce のライブラリが提供する。有用だが、設定なしに企業固有のプロセスを実現するものではない。',
        'プロンプトテンプレートもアクションとして公開できるが、それは言語の生成に限られる。レコードの更新やコールアウトはできない。',
        'Apex トリガはエージェントアクションではない。トリガは DML を契機に起動し、エージェントが選んで呼び出すことはできない。',
        'アクションはエージェントのセキュリティコンテキストで実行されるため、実行ユーザーにはフローと、それが触れるすべてのオブジェクト・項目へのアクセス権が必要。「人では動きエージェントでは失敗する」は常にここを指す。',
      ],
    },
    {
      heading: 'When not to use an agent (deep dive)',
      heading_ja: 'エージェントを使うべきでない場面（深掘り）',
      body:
        'The exam rewards restraint. Reasoning costs money, adds latency and introduces variability. If a requirement has no natural-language input and needs no judgement, plain automation is the better design — and the exam will present that as the correct answer.',
      body_ja:
        'この試験は抑制を評価します。推論にはコストがかかり、レイテンシが増え、変動が生じます。自然言語の入力がなく判断も不要な要件であれば、通常の自動化のほうが優れた設計であり、試験でもそれが正解として提示されます。',
      points: [
        'Two-question test: is there natural-language input? Is judgement required? If both answers are no, build a flow, not an agent.',
        'A nightly job applying fixed rules to a set of records is deterministic automation. Wrapping it in an agent adds cost and non-determinism for nothing.',
        'Conversely, if the input is free-form language and the right next step depends on interpreting it, that is genuinely agent work.',
        'The same restraint applies within an agent: prefer deterministic instructions wherever variation would be a defect rather than a feature.',
        'Supervisor pattern — for large estates, a supervisor agent routes to specialist agents by reasoning over each specialist\'s declared scope. Within one org they share that org\'s data and governance; delegation across orgs or companies uses A2A.',
      ],
      points_ja: [
        '2つの問い：自然言語の入力があるか。判断が必要か。どちらも NO なら、エージェントではなくフローを作る。',
        '固定ルールを一連のレコードに適用する夜間ジョブは決定的な自動化。エージェントで包んでも、コストと非決定性が増えるだけで見返りがない。',
        '逆に、入力が自由記述の言語で、次にすべきことがその解釈に依存するなら、それは本当にエージェントの仕事である。',
        '同じ抑制はエージェントの内部にも当てはまる。変動が「特徴」ではなく「欠陥」になる箇所では、決定的指示を優先する。',
        'スーパーバイザーパターン — 規模が大きい場合、スーパーバイザーエージェントが各専門エージェントの宣言されたスコープを推論して振り分ける。同一組織内ならデータとガバナンスを共有し、組織や企業をまたぐ委譲には A2A を使う。',
      ],
    },
  ],
}
