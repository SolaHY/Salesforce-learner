// 応用クイズ（シナリオ形式）用に本教材で作成した問題。
// 模試の論点を別の状況で問い直し、判断の型が身についているかを確認する。
export const appliedQuestions = [
  // ── Prompt Engineering ─────────────────────────────────────────────
  {
    id: 'af-ap-1',
    domain: 'af-prompt',
    type: 'scenario',
    scenario:
      'A specialist built a Field Generation template for a "Next Best Action" field. In preview against a sample record the output is excellent, but in production the field is often populated with generic advice that ignores the account.',
    scenario_ja:
      'あるスペシャリストが「次の推奨アクション」項目向けに Field Generation テンプレートを作成した。サンプルレコードでのプレビューでは出力は良好だが、本番では取引先の内容を無視した一般的な助言が入ることが多い。',
    question: 'What should the specialist investigate first?',
    question_ja: 'スペシャリストが最初に調べるべきことはどれか。',
    options: [
      {
        text: 'Whether the merge fields resolve to empty values for many real records, leaving the model without grounding.',
        text_ja: '実際の多くのレコードで差し込み項目が空値に解決され、モデルにグラウンディングが与えられていないかどうか。',
        correct: true,
        note: 'Correct. A curated sample record has full data; real records often do not. Empty grounding produces generic output.',
        note_ja: '正解。選び抜いたサンプルレコードはデータが揃っているが、実レコードはそうとは限らない。グラウンディングが空だと一般論が出る。',
      },
      {
        text: 'Whether the template was saved without being activated.',
        text_ja: 'テンプレートが有効化されずに保存されただけではないか。',
        correct: false,
        note: 'An unactivated version would serve the old wording, not generic advice from the new one.',
        note_ja: '有効化されていなければ旧文言が返るはずで、新版から一般論が返ることにはならない。',
      },
      {
        text: 'Whether the model has been disabled at the org level.',
        text_ja: 'モデルが組織レベルで無効化されていないか。',
        correct: false,
        note: 'A disabled model causes failures, not degraded content.',
        note_ja: 'モデルが無効ならエラーになる。品質が落ちた内容が返るわけではない。',
      },
      {
        text: 'Whether the agent user has access to the Account object.',
        text_ja: 'エージェントユーザーが Account オブジェクトへのアクセス権を持っているか。',
        correct: false,
        note: 'This is a prompt template invoked by a user on a record page, not an agent action.',
        note_ja: 'これはレコードページ上でユーザーが実行するプロンプトテンプレートであり、エージェントアクションではない。',
      },
    ],
    explanation:
      '"Great in preview, generic in production" almost always means the grounding is thinner in reality than in the sample. Check field completeness across real records, and add an explicit instruction for how to behave when data is missing (Mock Q26).',
    explanation_ja:
      '「プレビューでは良いのに本番では一般論」は、ほぼ常に実データのグラウンディングがサンプルより薄いことを意味する。実レコードでの項目の充足率を確認し、データ欠損時の振る舞いを明示的に指示する（模試Q26）。',
    reference: '💡 Preview with a *typical* record, not your best one. Then add a missing-data instruction.',
    reference_ja: '💡 プレビューは「最良の」レコードではなく「典型的な」レコードで行う。そのうえで欠損時の指示を加える。',
  },
  {
    id: 'af-ap-2',
    domain: 'af-prompt',
    type: 'scenario',
    scenario:
      'A team needs the same summarisation logic in three places: a screen flow used by agents, a nightly Apex job, and as something the conversational agent can call.',
    scenario_ja:
      'あるチームは、同じ要約ロジックを3か所で必要としている。担当者が使う画面フロー、夜間の Apex ジョブ、そして会話型エージェントが呼び出せる形である。',
    question: 'What is the most maintainable design?',
    question_ja: '最も保守しやすい設計はどれか。',
    options: [
      {
        text: 'Build one Flex prompt template and invoke it from the flow, from Apex, and as an agent action.',
        text_ja: 'Flex プロンプトテンプレートを1つ作り、フロー・Apex・エージェントアクションから呼び出す。',
        correct: true,
        note: 'Correct. Flex is the one type callable from all three, so the logic lives in a single place.',
        note_ja: '正解。Flex はこの3か所すべてから呼び出せる唯一の型であり、ロジックを1か所に集約できる。',
      },
      {
        text: 'Build three templates — Record Summary, Field Generation and Sales Email — and keep them aligned.',
        text_ja: 'Record Summary・Field Generation・Sales Email の3つのテンプレートを作り、内容を揃えて維持する。',
        correct: false,
        note: 'Three copies of the same logic will drift apart. None of those types fits all three callers anyway.',
        note_ja: '同じロジックの複製が3つあれば必ずずれていく。そもそもこれらの型は3つの呼び出し元すべてには適合しない。',
      },
      {
        text: 'Implement the summarisation in Apex and have the flow and the agent call the Apex.',
        text_ja: '要約を Apex で実装し、フローとエージェントからその Apex を呼び出す。',
        correct: false,
        note: 'Pushes a generative capability into code, losing the template tooling, preview and versioning.',
        note_ja: '生成機能をコードに押し込むことになり、テンプレートのツール・プレビュー・バージョン管理の利点を失う。',
      },
      {
        text: 'Create a Record Summary template and expose it through the Agent API.',
        text_ja: 'Record Summary テンプレートを作成し、Agent API 経由で公開する。',
        correct: false,
        note: 'Record Summary is bound to the record page, and the Agent API invokes agents, not templates.',
        note_ja: 'Record Summary はレコードページに紐づく。また Agent API が呼び出すのはエージェントであってテンプレートではない。',
      },
    ],
    explanation:
      'Flex exists precisely for reusable generative logic with custom inputs. The other three template types are each tied to one user experience, so reaching for them in a multi-caller scenario forces duplication.',
    explanation_ja:
      'Flex はまさに、入力を自分で定義する再利用可能な生成ロジックのために存在する。他の3種はそれぞれ特定のユーザー体験に紐づくため、複数の呼び出し元がある場面で使うと重複を招く。',
    reference: '💡 One capability, many callers → Flex. This is the single most useful thing to know about template types.',
    reference_ja: '💡 1つの機能を多くの呼び出し元から→Flex。テンプレート種別について最も役立つ知識。',
  },
  {
    id: 'af-ap-3',
    domain: 'af-prompt',
    type: 'scenario',
    scenario:
      'Legal has asked that a disclaimer appear in every email drafted by a Sales Email template. A specialist added the sentence to the template as guidance, but roughly one draft in five omits it.',
    scenario_ja:
      '法務部門から、Sales Email テンプレートで下書きされるすべてのメールに免責文言を入れるよう求められた。スペシャリストはガイダンスとしてその一文をテンプレートに追加したが、5通に1通ほどは欠落している。',
    question: 'What does this outcome demonstrate?',
    question_ja: 'この結果が示していることはどれか。',
    options: [
      {
        text: 'Instructions the model interprets cannot guarantee an outcome; anything mandatory needs deterministic handling.',
        text_ja: 'モデルが解釈する指示では結果を保証できない。必須の要件には決定的な扱いが必要である。',
        correct: true,
        note: 'Correct. An 80% compliance rate is exactly what "the model decides" produces. Mandatory means deterministic.',
        note_ja: '正解。「モデルが判断する」とはまさに80%程度の遵守率になるということ。必須なら決定的にする。',
      },
      {
        text: 'The model is too small and should be replaced with a larger one.',
        text_ja: 'モデルが小さすぎるため、より大きなものに置き換えるべきである。',
        correct: false,
        note: 'A larger model raises the rate but still cannot guarantee it.',
        note_ja: '大きなモデルなら遵守率は上がるが、それでも保証にはならない。',
      },
      {
        text: 'The disclaimer should be stored in a search index and retrieved.',
        text_ja: '免責文言は検索インデックスに格納して検索させるべきである。',
        correct: false,
        note: 'Retrieval is for finding relevant content, not for guaranteeing fixed text appears.',
        note_ja: '検索は関連コンテンツを探す仕組みであり、固定テキストの出力を保証するものではない。',
      },
      {
        text: 'The template needs a longer maximum response length.',
        text_ja: 'テンプレートの最大応答長を長くする必要がある。',
        correct: false,
        note: 'Length is not why a sentence is omitted.',
        note_ja: '一文が欠落する理由は長さではない。',
      },
    ],
    explanation:
      'This is the prompt-template counterpart of Mock Q1 and Q48. Requirements phrased as "every / always / must" are not satisfied by asking the model nicely — they need a deterministic mechanism, or post-processing outside the generative step.',
    explanation_ja:
      'これは模試Q1・Q48 のプロンプトテンプレート版である。「毎回／必ず」と表現される要件は、モデルに丁寧に頼むだけでは満たされない。決定的な仕組みか、生成の外側での後処理が必要になる。',
    reference: '💡 If a compliance auditor would ask "can you prove it happens every time?", it must be deterministic.',
    reference_ja: '💡 監査担当に「毎回起きると証明できますか」と問われる類の要件は、決定的でなければならない。',
  },
  // ── Agentforce Concepts ────────────────────────────────────────────
  {
    id: 'af-ap-4',
    domain: 'af-agent',
    type: 'scenario',
    scenario:
      'An agent has one topic named "Account help" with twenty actions attached, covering billing, shipping, returns and technical support. Users report that it often picks a plausible but wrong action.',
    scenario_ja:
      'あるエージェントには「Account help」という単一のトピックがあり、請求・配送・返品・技術サポートをカバーする20個のアクションが紐づいている。ユーザーからは、もっともらしいが誤ったアクションが選ばれることが多いと報告されている。',
    question: 'What is the most appropriate structural change?',
    question_ja: '最も適切な構造上の変更はどれか。',
    options: [
      {
        text: 'Split it into several narrower topics, each with a distinct classification description and only its own actions.',
        text_ja: 'それぞれ明確に異なる分類説明と自身のアクションだけを持つ、より狭い複数のトピックに分割する。',
        correct: true,
        note: 'Correct. Topics are the unit of scope. Narrow topics give the engine a smaller, clearer candidate set.',
        note_ja: '正解。トピックはスコープの単位。狭いトピックにすれば、エンジンが選ぶ候補集合が小さく明確になる。',
      },
      {
        text: 'Keep one topic and add examples of correct behaviour to each action description.',
        text_ja: 'トピックは1つのまま、各アクションの説明に正しい挙動の例を追加する。',
        correct: false,
        note: 'Helps at the margin, but twenty candidates in one scope remains the underlying problem.',
        note_ja: '多少は改善するが、1つのスコープに20の候補があるという根本問題は残る。',
      },
      {
        text: 'Add an availability filter to every action.',
        text_ja: 'すべてのアクションに利用可能条件を設定する。',
        correct: false,
        note: 'Availability filters express data conditions, not intent boundaries. Wrong tool for this problem.',
        note_ja: '利用可能条件はデータ上の条件を表すもので、意図の境界ではない。この問題には道具が合わない。',
      },
      {
        text: 'Build four separate agents, one per subject area.',
        text_ja: '主題領域ごとに4つの独立したエージェントを構築する。',
        correct: false,
        note: 'Over-engineering. Topics exist to organise scope within one agent.',
        note_ja: '過剰設計。1つのエージェント内でスコープを整理するためにトピックがある。',
      },
    ],
    explanation:
      'A topic bundles a job with its instructions and its actions (Mock Q34). When one topic covers four jobs, the reasoning engine has to choose among twenty loosely related actions. Narrower topics with sharper classification descriptions fix routing at the source.',
    explanation_ja:
      'トピックは仕事を、その指示とアクションとともに束ねる（模試Q34）。1つのトピックが4つの仕事をカバーしていると、推論エンジンは関連の薄い20のアクションから選ばざるを得ない。分類説明を鋭くした狭いトピックにすることで、ルーティングを根本から直せる。',
    reference: '💡 Escalating scale of boundary fixes: action description → topic description → split topics → agent role & scope.',
    reference_ja: '💡 境界の修正は段階的に：アクション説明→トピック説明→トピック分割→エージェントのロールとスコープ。',
  },
  {
    id: 'af-ap-5',
    domain: 'af-agent',
    type: 'scenario',
    scenario:
      'A retailer requires that the agent always greets the customer by name, always checks loyalty tier before quoting a discount, and phrases refusals politely and in context.',
    scenario_ja:
      'ある小売企業は、エージェントが常に顧客の名前で挨拶し、割引を提示する前に必ずロイヤルティ階層を確認し、断る際は文脈に応じて丁寧に表現することを求めている。',
    question: 'How should these three requirements be expressed?',
    question_ja: 'これら3つの要件はどのように表現すべきか。',
    options: [
      {
        text: 'The greeting and the loyalty check as deterministic instructions; the phrasing of refusals as a prompt instruction.',
        text_ja: '挨拶とロイヤルティ確認は決定的指示として、断りの表現はプロンプト指示として記述する。',
        correct: true,
        note: 'Correct. Two are invariant steps; the third genuinely needs contextual judgement.',
        note_ja: '正解。2つは不変のステップ、3つ目は本当に文脈判断を要する。',
      },
      {
        text: 'All three as deterministic instructions, for consistency.',
        text_ja: '一貫性のため、3つとも決定的指示にする。',
        correct: false,
        note: 'Fixed refusal wording would read as robotic and would not fit varied situations.',
        note_ja: '断り文句を固定すると機械的になり、多様な状況に合わなくなる。',
      },
      {
        text: 'All three as prompt instructions, to keep the agent natural.',
        text_ja: '自然さを保つため、3つともプロンプト指示にする。',
        correct: false,
        note: 'The loyalty check would then be skippable, which is a commercial and compliance risk.',
        note_ja: 'ロイヤルティ確認が省略され得るようになり、商流上・コンプライアンス上のリスクになる。',
      },
      {
        text: 'All three in the topic classification description.',
        text_ja: '3つともトピックの分類説明に記述する。',
        correct: false,
        note: 'The classification description is used to select the topic, not to govern behaviour within it.',
        note_ja: '分類説明はトピックを選ぶために使われるもので、トピック内の振る舞いを統べるものではない。',
      },
    ],
    explanation:
      'Hybrid reasoning is about assigning each requirement to the right mechanism. Invariant steps → deterministic. Requirements about tone, nuance and contextual judgement → prompt instructions. Using one mechanism for everything wastes the design.',
    explanation_ja:
      'ハイブリッド推論とは、各要件を適切な仕組みに割り当てることである。不変のステップ→決定的指示。トーン・ニュアンス・文脈判断に関する要件→プロンプト指示。すべてを片方に寄せると、この設計の利点が失われる。',
    reference: '💡 Ask of each requirement: "would a fixed script be acceptable here?" Yes → deterministic. No → prompt.',
    reference_ja: '💡 各要件に問う：「ここは固定の台本で許容されるか？」YES→決定的、NO→プロンプト。',
  },
  {
    id: 'af-ap-6',
    domain: 'af-agent',
    type: 'scenario',
    scenario:
      'An agent must know the customer\'s open case count to decide whether to offer a callback, and must append a survey link to whatever answer it gives.',
    scenario_ja:
      'あるエージェントは、コールバックを提案するかどうかを判断するために顧客の未解決ケース数を知る必要があり、また、どの回答にもアンケートリンクを付加する必要がある。',
    question: 'Where do these two pieces belong in Agent Script?',
    question_ja: 'Agent Script において、この2つはそれぞれどこに配置すべきか。',
    options: [
      {
        text: 'The case count in a before_reasoning block; the survey link in an after_reasoning block.',
        text_ja: 'ケース数は before_reasoning ブロック、アンケートリンクは after_reasoning ブロック。',
        correct: true,
        note: 'Correct. Data needed for the decision goes before; post-processing of the answer goes after.',
        note_ja: '正解。判断に必要なデータは前へ、回答の後処理は後ろへ。',
      },
      {
        text: 'Both in a before_reasoning block so nothing is forgotten.',
        text_ja: '忘れないよう、両方を before_reasoning ブロックに置く。',
        correct: false,
        note: 'The answer does not exist yet, so the link cannot be appended to it there.',
        note_ja: 'その時点では回答が存在しないため、そこでリンクを付加することはできない。',
      },
      {
        text: 'Both in an after_reasoning block so they run against the final response.',
        text_ja: '最終応答に対して実行されるよう、両方を after_reasoning ブロックに置く。',
        correct: false,
        note: 'The decision has already been made, so the case count arrives too late to influence it.',
        note_ja: '判断はすでに終わっており、ケース数が判断に影響するには遅すぎる。',
      },
      {
        text: 'The case count in an availability filter; the survey link in the topic description.',
        text_ja: 'ケース数は利用可能条件に、アンケートリンクはトピックの説明に。',
        correct: false,
        note: 'Neither mechanism does what is needed: filters gate actions, descriptions guide selection.',
        note_ja: 'どちらも必要な役割を果たさない。フィルターはアクションの可否、説明は選択の誘導。',
      },
    ],
    explanation:
      'Position the work relative to the reasoning step by asking what it is for. Input to the decision → before_reasoning. Treatment of the output → after_reasoning. This mirrors Mock Q21 and Q48.',
    explanation_ja:
      '推論ステップに対する配置は「何のための処理か」で決める。判断への入力→before_reasoning。出力への処理→after_reasoning。模試Q21・Q48 と同じ構図である。',
    reference: '💡 Both blocks can hold deterministic instructions. The block choice is about timing, not about determinism.',
    reference_ja: '💡 どちらのブロックにも決定的指示は置ける。ブロックの選択はタイミングの問題であって、決定性の問題ではない。',
  },
  {
    id: 'af-ap-7',
    domain: 'af-agent',
    type: 'scenario',
    scenario:
      'A "cancel subscription" action must never be offered to customers on an enterprise contract, because those cancellations are handled by an account manager.',
    scenario_ja:
      '「サブスクリプションの解約」アクションは、エンタープライズ契約の顧客には決して提示してはならない。それらの解約はアカウントマネージャーが担当するためである。',
    question: 'Which mechanism enforces this?',
    question_ja: 'これを強制する仕組みはどれか。',
    options: [
      {
        text: 'An availability filter on the action, keyed to the contract type.',
        text_ja: '契約種別を条件にした、そのアクションへの利用可能条件。',
        correct: true,
        note: 'Correct. The action is withheld from the candidate set entirely for enterprise contracts.',
        note_ja: '正解。エンタープライズ契約では、そのアクションが候補集合から完全に外される。',
      },
      {
        text: 'A deterministic instruction telling the agent not to use the action for enterprise customers.',
        text_ja: 'エンタープライズ顧客にはそのアクションを使わないようエージェントに伝える決定的指示。',
        correct: false,
        note: 'Closer than a description, but availability filters are the purpose-built control for conditional exposure.',
        note_ja: '説明文よりは近いが、条件付きの提示制御には利用可能条件という専用の仕組みがある。',
      },
      {
        text: 'A sentence in the action description warning about enterprise contracts.',
        text_ja: 'エンタープライズ契約に関する注意をアクションの説明に書く。',
        correct: false,
        note: 'A description is guidance, never enforcement (Mock Q14).',
        note_ja: '説明はあくまで案内であり、強制ではない（模試Q14）。',
      },
      {
        text: 'A separate agent for enterprise customers.',
        text_ja: 'エンタープライズ顧客向けに別のエージェントを用意する。',
        correct: false,
        note: 'Duplicates an entire agent to express one condition.',
        note_ja: '条件1つのためにエージェント全体を複製することになる。',
      },
    ],
    explanation:
      'Availability filters answer "under what data conditions may this action be used?" They remove the action from the reasoning engine\'s view, so no amount of user persuasion can surface it.',
    explanation_ja:
      '利用可能条件は「どのデータ条件下でこのアクションを使ってよいか」に答える仕組みである。アクションを推論エンジンの視界から外すため、ユーザーがどれだけ働きかけても表に出てこない。',
    reference: '💡 Conditional exposure → availability filter. Guaranteed execution → deterministic instruction. Do not swap them.',
    reference_ja: '💡 条件付きの提示→利用可能条件。実行の保証→決定的指示。この2つを取り違えない。',
  },
  {
    id: 'af-ap-8',
    domain: 'af-agent',
    type: 'scenario',
    scenario:
      'A colleague proposes replacing a nightly data-quality job — which flags records missing a postcode — with an agent, arguing that "AI is more flexible".',
    scenario_ja:
      '同僚が、郵便番号が欠けているレコードを検出する夜間のデータ品質ジョブを、「AIのほうが柔軟だから」という理由でエージェントに置き換えることを提案している。',
    question: 'What is the appropriate response?',
    question_ja: '適切な対応はどれか。',
    options: [
      {
        text: 'Keep it as automation: the rule is fixed, there is no conversation, and no judgement is required.',
        text_ja: '自動化のまま維持する。ルールは固定で、会話もなく、判断も不要だから。',
        correct: true,
        note: 'Correct. Reasoning adds cost, latency and variability where none of it buys anything.',
        note_ja: '正解。推論はコスト・レイテンシ・変動をもたらすが、この用件では何の見返りもない。',
      },
      {
        text: 'Rebuild it as an agent so that it can explain its findings in natural language.',
        text_ja: '所見を自然言語で説明できるよう、エージェントとして作り直す。',
        correct: false,
        note: 'A report can carry explanation without introducing non-determinism into the detection itself.',
        note_ja: '説明はレポートでも伝えられる。検出そのものに非決定性を持ち込む必要はない。',
      },
      {
        text: 'Rebuild it as a Flex prompt template scheduled nightly.',
        text_ja: '毎晩スケジュール実行する Flex プロンプトテンプレートとして作り直す。',
        correct: false,
        note: 'Prompt templates generate language; they are not a record-scanning mechanism.',
        note_ja: 'プロンプトテンプレートは言語を生成するもので、レコードを走査する仕組みではない。',
      },
      {
        text: 'Build both and compare the results for a month.',
        text_ja: '両方を構築し、1か月結果を比較する。',
        correct: false,
        note: 'Spends effort testing a hypothesis that the requirements already rule out.',
        note_ja: '要件の時点で否定できる仮説の検証に労力を費やすことになる。',
      },
    ],
    explanation:
      'Mock Q17 in a different costume. The test is always: is there natural-language input, and is judgement required? If both answers are no, deterministic automation is the correct and cheaper design.',
    explanation_ja:
      '模試Q17 の装いを変えた問題である。判定基準は常に「自然言語の入力があるか」「判断が必要か」。どちらも NO なら、決定的な自動化のほうが正しく、かつ安い設計になる。',
    reference: '💡 Agentforce Specialist questions reward restraint. Knowing when not to use an agent is part of the skill.',
    reference_ja: '💡 この試験は抑制を評価する。「エージェントを使わない判断」もスキルのうち。',
  },
  // ── Data 360 & Retrieval ───────────────────────────────────────────
  {
    id: 'af-ap-9',
    domain: 'af-data',
    type: 'scenario',
    scenario:
      'A support agent grounded on a product manual answers correctly for the current model year but occasionally quotes a procedure that was withdrawn two years ago. All manuals, current and historical, are in one index.',
    scenario_ja:
      '製品マニュアルにグラウンディングされたサポートエージェントは、現行モデルイヤーについては正しく回答するが、2年前に廃止された手順を引用することがある。現行・過去のすべてのマニュアルが1つのインデックスに入っている。',
    question: 'What is the most appropriate remedy?',
    question_ja: '最も適切な対処はどれか。',
    options: [
      {
        text: 'Carry the model year and status as metadata and filter on them in a custom retriever.',
        text_ja: 'モデルイヤーとステータスをメタデータとして持たせ、カスタムリトリーバーでフィルターする。',
        correct: true,
        note: 'Correct. Eligibility rules on retrieval are always metadata plus a retriever filter (Mock Q43).',
        note_ja: '正解。検索の適格性ルールは常に「メタデータ＋リトリーバーのフィルター」で実装する（模試Q43）。',
      },
      {
        text: 'Delete the historical manuals from the index.',
        text_ja: '過去のマニュアルをインデックスから削除する。',
        correct: false,
        note: 'Support staff still need historical procedures for older units in the field.',
        note_ja: '現場に残る旧機種のために、サポート担当は過去の手順を必要とする。',
      },
      {
        text: 'Reduce the chunk size so old and new procedures do not mix.',
        text_ja: '新旧の手順が混ざらないよう、チャンクサイズを小さくする。',
        correct: false,
        note: 'Chunk size does not encode recency or status.',
        note_ja: 'チャンクサイズは新しさやステータスを表現しない。',
      },
      {
        text: 'Add a prompt instruction telling the model to prefer recent content.',
        text_ja: '新しいコンテンツを優先するようモデルに指示するプロンプト指示を追加する。',
        correct: false,
        note: 'The model cannot reliably judge recency of passages it is handed, and this is not enforcement.',
        note_ja: 'モデルは渡されたパッセージの新しさを確実には判断できず、そもそも強制にならない。',
      },
    ],
    explanation:
      'Whenever a question is about which documents are allowed to be retrieved — by product line, by review date, by region, by status — the answer is metadata on the indexed content plus a filter in a custom retriever.',
    explanation_ja:
      '「どの文書を検索対象として許可するか」を問う設問（製品ライン別、レビュー期限、地域、ステータスなど）の答えは、常にインデックス対象コンテンツのメタデータ＋カスタムリトリーバーのフィルターである。',
    reference: '💡 Do not solve a data-scope problem with a prompt instruction. Scope belongs to the retriever.',
    reference_ja: '💡 データの範囲の問題をプロンプト指示で解こうとしない。範囲はリトリーバーの担当。',
  },
  {
    id: 'af-ap-10',
    domain: 'af-data',
    type: 'scenario',
    scenario:
      'A specialist must ground an agent in three sources: live opportunity records, a folder of 400 sales playbook PDFs, and a legacy CSV export of historical win/loss reasons.',
    scenario_ja:
      'あるスペシャリストは、3つのソースにエージェントをグラウンディングする必要がある。ライブの商談レコード、400件のセールスプレイブックPDFのフォルダー、そして過去の受注・失注理由のレガシーCSVエクスポートである。',
    question: 'Which combination is correct?',
    question_ja: '正しい組み合わせはどれか。',
    options: [
      {
        text: 'Merge fields for the records; a Data Library or index plus retriever for the PDFs; ingest the CSV into Data 360 and map the DLO to a DMO.',
        text_ja: 'レコードには差し込み項目、PDFには Data Library またはインデックス＋リトリーバー、CSVは Data 360 に取り込み DLO を DMO へマッピングする。',
        correct: true,
        note: 'Correct. Each source shape gets the mechanism designed for it.',
        note_ja: '正解。それぞれのソースの形に、そのために設計された仕組みを当てる。',
      },
      {
        text: 'Index all three sources together so a single retriever covers everything.',
        text_ja: '3つのソースをまとめてインデックス化し、1つのリトリーバーですべてを賄う。',
        correct: false,
        note: 'Live record values must be read at generation time, not from a stale index.',
        note_ja: 'ライブなレコードの値は生成時点で読む必要があり、古くなり得るインデックスから読むべきではない。',
      },
      {
        text: 'Use merge fields for all three, since every source ultimately becomes fields.',
        text_ja: '最終的にはすべて項目になるので、3つとも差し込み項目を使う。',
        correct: false,
        note: 'Merge fields cannot search 400 PDFs.',
        note_ja: '差し込み項目では400件のPDFを検索できない。',
      },
      {
        text: 'Put all three in a single data space and let identity resolution unify them.',
        text_ja: '3つを1つのデータスペースに入れ、ID解決に統合させる。',
        correct: false,
        note: 'Data spaces partition; identity resolution unifies person records. Neither makes PDFs retrievable.',
        note_ja: 'データスペースは区切るもの、ID解決は人物レコードを統合するもの。どちらもPDFを検索可能にしない。',
      },
    ],
    explanation:
      'Grounding decisions follow the shape of each source independently. Live structured data → merge fields. Documents → index and retriever. Bulk external data → ingest into Data 360 (DLO), then map to a DMO so downstream features can use it.',
    explanation_ja:
      'グラウンディングの判断は、ソースごとにその形に従って独立に行う。ライブな構造化データ→差し込み項目。ドキュメント→インデックスとリトリーバー。大量の外部データ→Data 360 に取り込み（DLO）、DMO へマッピングして下流機能から使えるようにする。',
    reference: '💡 Never force one grounding mechanism onto every source. Mixed sources normally need mixed mechanisms (Mock Q52).',
    reference_ja: '💡 すべてのソースに1つの手法を当てはめない。ソースが混在すれば手法も混在する（模試Q52）。',
  },
  {
    id: 'af-ap-11',
    domain: 'af-data',
    type: 'scenario',
    scenario:
      'After a company acquires a competitor, the same customers appear in both CRM datasets. Marketing wants unified profiles for the combined customer base, but the two brands must keep their analytics separate for the first year.',
    scenario_ja:
      'ある企業が競合を買収し、同一の顧客が両方のCRMデータセットに現れている。マーケティングは統合された顧客基盤の統一プロファイルを望んでいるが、2つのブランドは初年度は分析を分離しておく必要がある。',
    question: 'Which Data 360 capabilities meet both requirements?',
    question_ja: '両方の要件を満たす Data 360 の機能はどれか。',
    options: [
      {
        text: 'Identity resolution to unify the duplicate customers, and data spaces to keep the brands\' analytics separate.',
        text_ja: '重複する顧客を統合する ID解決と、ブランドの分析を分離するデータスペース。',
        correct: true,
        note: 'Correct. The two capabilities address opposite needs and are used together here.',
        note_ja: '正解。この2つは正反対のニーズに対応する機能であり、ここでは併用する。',
      },
      {
        text: 'Identity resolution alone, since unified profiles supersede the need for separation.',
        text_ja: 'ID解決のみ。統一プロファイルがあれば分離は不要になるから。',
        correct: false,
        note: 'The separation requirement is explicit and does not disappear.',
        note_ja: '分離の要件は明示されており、なくなるものではない。',
      },
      {
        text: 'Data spaces alone, since separated data cannot contain duplicates.',
        text_ja: 'データスペースのみ。分離されたデータには重複が生じないから。',
        correct: false,
        note: 'Separation does not deduplicate; the same person still exists in both.',
        note_ja: '分離しても重複は解消しない。同じ人物は依然として両方に存在する。',
      },
      {
        text: 'Search indexes over both datasets.',
        text_ja: '両データセットに対する検索インデックス。',
        correct: false,
        note: 'Indexes serve retrieval over content; they neither unify nor partition.',
        note_ja: 'インデックスはコンテンツの検索を担うもので、統合も分離も行わない。',
      },
    ],
    explanation:
      'Identity resolution and data spaces are frequently presented as alternatives, but they solve different problems and are often used together: unify who the customer is, while keeping business units\' data governance separate.',
    explanation_ja:
      'ID解決とデータスペースは択一のように出題されがちだが、解く問題が異なり、併用されることも多い。顧客が誰であるかは統合しつつ、事業部ごとのデータガバナンスは分離しておく、という形である。',
    reference: '💡 Unify people → identity resolution. Partition datasets → data spaces. They are orthogonal.',
    reference_ja: '💡 人物を統合→ID解決。データセットを分割→データスペース。両者は直交する概念。',
  },
  {
    id: 'af-ap-12',
    domain: 'af-data',
    type: 'scenario',
    scenario:
      'A new specialist is told to "just upload the FAQ PDFs and get the agent answering from them by Friday". No filtering, versioning or custom ranking is required.',
    scenario_ja:
      '新任のスペシャリストが「FAQのPDFをアップロードして、金曜までにエージェントがそこから回答できるようにしてほしい」と依頼された。フィルター、バージョン管理、独自のランキングは不要である。',
    question: 'What is the appropriate route?',
    question_ja: '適切な進め方はどれか。',
    options: [
      {
        text: 'Use an Agentforce Data Library, which packages ingestion, chunking, indexing and retrieval configuration.',
        text_ja: '取り込み・チャンク分割・インデックス化・検索設定をまとめて提供する Agentforce Data Library を使う。',
        correct: true,
        note: 'Correct. With no special requirements, the packaged path is fastest and least error-prone.',
        note_ja: '正解。特別な要件がないなら、まとめて用意された経路が最速で誤りも少ない。',
      },
      {
        text: 'Build a data stream, a DLO, a DMO mapping, a custom index and a custom retriever.',
        text_ja: 'データストリーム、DLO、DMOマッピング、カスタムインデックス、カスタムリトリーバーを構築する。',
        correct: false,
        note: 'Correct components, but far more configuration than the requirement justifies.',
        note_ja: '部品としては正しいが、要件に対して構成の手間が過大。',
      },
      {
        text: 'Paste the FAQ content into the prompt template as static text.',
        text_ja: 'FAQ の内容を固定テキストとしてプロンプトテンプレートに貼り付ける。',
        correct: false,
        note: 'Unmaintainable, and it will not scale beyond a couple of pages.',
        note_ja: '保守できず、数ページを超えると成立しない。',
      },
      {
        text: 'Create a data space for the FAQ files.',
        text_ja: 'FAQ ファイル用のデータスペースを作成する。',
        correct: false,
        note: 'A partition, not a retrieval mechanism.',
        note_ja: '区画であって、検索の仕組みではない。',
      },
    ],
    explanation:
      'Match the amount of configuration to the requirement. Data Library when you need speed and no special control; index plus custom retriever when you need filtering, custom ranking or a shared index across use cases.',
    explanation_ja:
      '構成の手間は要件に見合わせる。速さ重視で特別な制御が不要なら Data Library、フィルターや独自ランキング、複数用途で共有するインデックスが必要ならインデックス＋カスタムリトリーバー。',
    reference: '💡 Both routes are legitimate. The exam tests whether you can tell which one the requirement calls for.',
    reference_ja: '💡 どちらの経路も正当。要件がどちらを求めているかを見分けられるかが問われる。',
  },
  // ── Trust, Security & Permissions ──────────────────────────────────
  {
    id: 'af-ap-13',
    domain: 'af-trust',
    type: 'scenario',
    scenario:
      'An internal HR agent is being rolled out. Security asks two questions: can an employee use it to see another employee\'s salary record, and will salary figures be sent to the model provider?',
    scenario_ja:
      '社内向けの人事エージェントを展開しようとしている。セキュリティ部門から2点の質問があった。従業員がこれを使って他の従業員の給与レコードを閲覧できてしまわないか、そして給与額がモデルプロバイダーへ送信されるのか、である。',
    question: 'Which pair of answers is correct?',
    question_ja: '正しい回答の組み合わせはどれか。',
    options: [
      {
        text: 'No — an employee agent runs as the logged-in user, so existing sharing applies; and masking can prevent salary values from reaching the provider.',
        text_ja: 'いいえ。従業員向けエージェントはログインユーザーとして動作するため既存の共有設定が適用される。また、マスキングにより給与額がプロバイダーに届かないようにできる。',
        correct: true,
        note: 'Correct. Security context handles the first concern; Trust Layer masking handles the second.',
        note_ja: '正解。1点目はセキュリティコンテキストが、2点目は Trust Layer のマスキングが担う。',
      },
      {
        text: 'Yes to both — agents bypass sharing and always send full context to the provider.',
        text_ja: 'どちらも「はい」。エージェントは共有設定を迂回し、常に完全なコンテキストをプロバイダーに送信する。',
        correct: false,
        note: 'Both halves are false. Agents respect the running user\'s access, and masking exists precisely for this.',
        note_ja: '両方とも誤り。エージェントは実行ユーザーのアクセス権に従い、マスキングはまさにこのために存在する。',
      },
      {
        text: 'No to both — zero data retention prevents any data from being sent to the provider.',
        text_ja: 'どちらも「いいえ」。ゼロデータ保持により、いかなるデータもプロバイダーへ送信されない。',
        correct: false,
        note: 'Zero data retention prevents storage, not transmission. Masking prevents transmission of specific values.',
        note_ja: 'ゼロデータ保持が防ぐのは保存であって送信ではない。特定の値の送信を防ぐのはマスキング。',
      },
      {
        text: 'Yes to the first — every agent runs as a dedicated agent user with broad access.',
        text_ja: '1点目は「はい」。すべてのエージェントは広範なアクセス権を持つ専用エージェントユーザーとして動作する。',
        correct: false,
        note: 'Dedicated agent users apply to unauthenticated scenarios, and their access should be minimal.',
        note_ja: '専用エージェントユーザーは未認証の場面で使われるもので、そのアクセス権は最小限にすべきである。',
      },
    ],
    explanation:
      'Two separate controls answer two separate questions. Who can see what → security context (logged-in user for employee agents, dedicated agent user for public ones). What leaves the platform → Trust Layer masking, distinct from zero data retention.',
    explanation_ja:
      '2つの別々の制御が2つの別々の問いに答える。誰が何を見られるか→セキュリティコンテキスト（従業員向けはログインユーザー、公開向けは専用エージェントユーザー）。何がプラットフォームの外へ出るか→Trust Layer のマスキング（ゼロデータ保持とは別物）。',
    reference: '💡 Masking = does not leave. Zero data retention = leaves but is not kept. These are constantly confused.',
    reference_ja: '💡 マスキング＝そもそも外へ出ない。ゼロデータ保持＝出るが保存されない。この2つは混同されやすい。',
  },
  {
    id: 'af-ap-14',
    domain: 'af-trust',
    type: 'scenario',
    scenario:
      'A newly deployed agent action fails in production with an access error on a custom object. The same action worked throughout testing in the sandbox.',
    scenario_ja:
      '新しく展開したエージェントアクションが、本番でカスタムオブジェクトのアクセスエラーにより失敗する。サンドボックスでのテスト中は同じアクションが正常に動作していた。',
    question: 'What is the most likely cause?',
    question_ja: '最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The agent user in production does not have the permission assignments its sandbox counterpart had, because users and permission assignments are configured per org.',
        text_ja: '本番のエージェントユーザーに、サンドボックス側で付与されていた権限割り当てがない。ユーザーと権限割り当ては組織ごとに構成するため。',
        correct: true,
        note: 'Correct. This is the classic combination of Mock Q50 (agent user access) and Q57 (configured per org).',
        note_ja: '正解。模試Q50（エージェントユーザーのアクセス権）と Q57（組織ごとの構成）の典型的な組み合わせ。',
      },
      {
        text: 'The custom object was not included in the deployment.',
        text_ja: 'カスタムオブジェクトが展開に含まれていなかった。',
        correct: false,
        note: 'A missing object gives a different error, and the object clearly exists to be denied access to.',
        note_ja: 'オブジェクトが存在しなければ別のエラーになる。アクセス拒否が出る以上、オブジェクトは存在している。',
      },
      {
        text: 'The agent was deployed in an inactive state.',
        text_ja: 'エージェントが非アクティブな状態で展開された。',
        correct: false,
        note: 'An inactive agent would not respond at all, rather than failing on one action.',
        note_ja: '非アクティブなら一切応答しないはずで、特定のアクションだけ失敗することにはならない。',
      },
      {
        text: 'The Trust Layer is masking the object name.',
        text_ja: 'Trust Layer がオブジェクト名をマスキングしている。',
        correct: false,
        note: 'Masking applies to sensitive values in prompts, not to object access.',
        note_ja: 'マスキングはプロンプト内の機密値に適用されるもので、オブジェクトのアクセス制御ではない。',
      },
    ],
    explanation:
      '"Worked in sandbox, fails in production" plus an access error points at environment-specific configuration. The agent user and its permission assignments do not travel with a metadata deployment and must be established in every org.',
    explanation_ja:
      '「サンドボックスでは動き本番では失敗」かつアクセスエラーという組み合わせは、環境固有の構成を指し示す。エージェントユーザーとその権限割り当てはメタデータ展開では移送されず、各組織で構築する必要がある。',
    reference: '💡 Post-deployment checklist: activate the agent, set up Data 360, create/assign the agent user permissions.',
    reference_ja: '💡 展開後のチェックリスト：エージェントの有効化、Data 360 のセットアップ、エージェントユーザーの権限作成・割り当て。',
  },
  {
    id: 'af-ap-15',
    domain: 'af-trust',
    type: 'scenario',
    scenario:
      'A public-facing agent on a help site starts returning internal cost figures in its answers when customers ask detailed pricing questions.',
    scenario_ja:
      'ヘルプサイト上の一般公開エージェントが、顧客が詳細な価格に関する質問をした際に、社内の原価情報を回答に含めるようになった。',
    question: 'What is the correct first response?',
    question_ja: '正しい最初の対応はどれか。',
    options: [
      {
        text: 'Deactivate the agent, then review the dedicated agent user\'s object and field access and the scope of the grounding sources.',
        text_ja: 'エージェントを非アクティブ化し、そのうえで専用エージェントユーザーのオブジェクト・項目アクセス権と、グラウンディングソースの範囲を確認する。',
        correct: true,
        note: 'Correct. Stop the exposure first, then fix the root cause, which is over-broad access or grounding.',
        note_ja: '正解。まず露出を止め、次に根本原因（過大なアクセス権またはグラウンディング範囲）を修正する。',
      },
      {
        text: 'Add a prompt instruction telling the agent never to mention cost figures.',
        text_ja: '原価情報には決して言及しないよう指示するプロンプト指示を追加する。',
        correct: false,
        note: 'Leaves the data reachable and relies on the model to police itself. Not a security control.',
        note_ja: 'データには到達可能なまま、モデルの自制に依存することになる。セキュリティ制御とは言えない。',
      },
      {
        text: 'Enable zero data retention.',
        text_ja: 'ゼロデータ保持を有効化する。',
        correct: false,
        note: 'Concerns what the provider stores, not what customers are shown.',
        note_ja: 'プロバイダーが何を保存するかの話であり、顧客に何が表示されるかとは関係ない。',
      },
      {
        text: 'Reduce the number of channels the agent is published to.',
        text_ja: 'エージェントを公開しているチャネル数を減らす。',
        correct: false,
        note: 'Narrows exposure without stopping it or addressing the cause.',
        note_ja: '露出を狭めるだけで、停止にも原因の解消にもならない。',
      },
    ],
    explanation:
      'Incident response first (deactivate — Mock Q9), then root cause. For a public agent the boundary is the dedicated agent user\'s permissions plus the scope of what is grounded; if the data is reachable, a prompt instruction will not reliably keep it hidden.',
    explanation_ja:
      'まずインシデント対応（非アクティブ化：模試Q9）、次に根本原因。公開エージェントの境界は、専用エージェントユーザーの権限と、グラウンディング対象の範囲である。データに到達できる状態なら、プロンプト指示で確実に隠し続けることはできない。',
    reference: '💡 Security boundaries are permissions and scope. Instructions are guidance, and guidance is not a boundary.',
    reference_ja: '💡 セキュリティの境界は権限とスコープ。指示は案内にすぎず、案内は境界にならない。',
  },
  // ── Deployment, Testing & Monitoring ───────────────────────────────
  {
    id: 'af-ap-16',
    domain: 'af-lifecycle',
    type: 'scenario',
    scenario:
      'A specialist is asked to prove that a change to an agent\'s topic descriptions did not degrade anything before it is promoted to production.',
    scenario_ja:
      'あるスペシャリストが、エージェントのトピック説明への変更が何も劣化させていないことを、本番へ昇格させる前に証明するよう求められた。',
    question: 'Which approach provides that proof?',
    question_ja: 'その証明を提供する手法はどれか。',
    options: [
      {
        text: 'Run the same Testing Center suite before and after the change and compare the results.',
        text_ja: '変更の前後で同じ Testing Center のスイートを実行し、結果を比較する。',
        correct: true,
        note: 'Correct. A fixed input set is what makes a before/after comparison meaningful.',
        note_ja: '正解。入力セットが固定されているからこそ、前後比較に意味が生まれる。',
      },
      {
        text: 'Review the conversation transcripts from the previous week.',
        text_ja: '前週の会話トランスクリプトを確認する。',
        correct: false,
        note: 'Transcripts show what happened before the change; they cannot evaluate the change.',
        note_ja: 'トランスクリプトは変更前に起きたことを示すもので、変更そのものは評価できない。',
      },
      {
        text: 'Check the containment rate for the last thirty days.',
        text_ja: '直近30日の封じ込め率を確認する。',
        correct: false,
        note: 'A production outcome metric, only available after release.',
        note_ja: '本番の結果指標であり、リリース後にしか得られない。',
      },
      {
        text: 'Deploy to production and watch the utterance analysis dashboard.',
        text_ja: '本番へ展開し、発話分析ダッシュボードを監視する。',
        correct: false,
        note: 'That is testing on customers, which is what the request was designed to avoid.',
        note_ja: '顧客を使ったテストであり、依頼はまさにそれを避けるためのもの。',
      },
    ],
    explanation:
      'Before release, use Testing Center. After release, use utterance analysis, transcripts and containment rate. Confusing the two halves of that timeline is the most common trap in this domain.',
    explanation_ja:
      'リリース前は Testing Center、リリース後は発話分析・トランスクリプト・封じ込め率。この時系列の前後を取り違えるのが、この領域で最も多い引っかけである。',
    reference: '💡 Before release: preview (templates), Testing Center (agents). After release: transcripts, utterance analysis, containment.',
    reference_ja: '💡 リリース前：プレビュー（テンプレート）、Testing Center（エージェント）。リリース後：トランスクリプト、発話分析、封じ込め率。',
  },
  {
    id: 'af-ap-17',
    domain: 'af-lifecycle',
    type: 'scenario',
    scenario:
      'Three months after launch, containment rate has fallen from 68% to 51% while conversation volume has doubled following a new product launch.',
    scenario_ja:
      'ローンチから3か月後、新製品の発売に伴い会話量が倍増する一方で、封じ込め率は68%から51%へ低下した。',
    question: 'What is the most productive next step?',
    question_ja: '最も生産的な次の一手はどれか。',
    options: [
      {
        text: 'Review utterance analysis for unmatched utterances, expecting them to cluster around the new product, then extend or add topics.',
        text_ja: '発話分析で未一致の発話を確認し、新製品まわりに集中していると想定してトピックを拡張または追加する。',
        correct: true,
        note: 'Correct. Containment tells you something is wrong; utterance analysis tells you what.',
        note_ja: '正解。封じ込め率は「何かおかしい」ことを示し、発話分析は「何が」を教える。',
      },
      {
        text: 'Switch to a larger model to improve comprehension.',
        text_ja: '理解力を高めるため、より大きなモデルに切り替える。',
        correct: false,
        note: 'The agent has no topics covering the new product; no model can compensate for missing configuration.',
        note_ja: '新製品をカバーするトピックが存在しない。構成の欠落はどのモデルでも補えない。',
      },
      {
        text: 'Raise the containment target so the metric looks healthier.',
        text_ja: '指標が健全に見えるよう、封じ込め率の目標値を引き上げる。',
        correct: false,
        note: 'Changing a target does not change behaviour.',
        note_ja: '目標値を変えても挙動は変わらない。',
      },
      {
        text: 'Reduce the agent\'s channels to lower the volume.',
        text_ja: '会話量を減らすため、エージェントのチャネルを減らす。',
        correct: false,
        note: 'Suppresses demand rather than serving it.',
        note_ja: '需要に応えるのではなく、需要を抑え込むだけ。',
      },
    ],
    explanation:
      'Metrics and diagnostics work as a pair. Containment rate is the outcome measure; utterance analysis explains it. A fall coinciding with a new product almost always means configured coverage has not kept pace with demand.',
    explanation_ja:
      '指標と診断は対で機能する。封じ込め率は結果指標、発話分析はその説明である。新製品の投入と同時に低下している場合、構成上のカバー範囲が需要に追いついていないことがほぼ確実である。',
    reference: '💡 The improvement loop: metric falls → utterance analysis → extend topics → Testing Center → controlled release.',
    reference_ja: '💡 改善サイクル：指標の低下→発話分析→トピック拡張→Testing Center→統制されたリリース。',
  },
  {
    id: 'af-ap-18',
    domain: 'af-lifecycle',
    type: 'scenario',
    scenario:
      'A deployment to production completed successfully. The agent responds to greetings but every attempt to look up an order returns "I could not find that information", and no grounded content appears.',
    scenario_ja:
      '本番への展開は正常に完了した。エージェントは挨拶には応答するが、注文の照会を試みるたびに「その情報を見つけられませんでした」と返し、グラウンディングされたコンテンツも表示されない。',
    question: 'Which post-deployment step was most likely missed?',
    question_ja: '展開後の手順のうち、見落とされた可能性が最も高いものはどれか。',
    options: [
      {
        text: 'The Data 360 configuration — data streams, mappings, indexes and retrievers — was not established in the production org.',
        text_ja: 'データストリーム、マッピング、インデックス、リトリーバーといった Data 360 の構成が本番組織で構築されていない。',
        correct: true,
        note: 'Correct. The agent runs (so it is active) but has no data layer behind it (Mock Q24).',
        note_ja: '正解。エージェントは動作している（＝有効化済み）が、その背後のデータ層が存在しない（模試Q24）。',
      },
      {
        text: 'The agent was never activated.',
        text_ja: 'エージェントが有効化されていない。',
        correct: false,
        note: 'An inactive agent would not respond to greetings either.',
        note_ja: '非アクティブなら挨拶にも応答しない。',
      },
      {
        text: 'The prompt templates were not included in the deployment.',
        text_ja: 'プロンプトテンプレートが展開に含まれていない。',
        correct: false,
        note: 'Templates do deploy, and their absence would not present as empty grounding.',
        note_ja: 'テンプレートは展開される。またその欠落は「グラウンディングが空」という症状にはならない。',
      },
      {
        text: 'The Agent API was not enabled.',
        text_ja: 'Agent API が有効化されていない。',
        correct: false,
        note: 'The Agent API matters only for external invocation.',
        note_ja: 'Agent API は外部からの呼び出しにのみ関係する。',
      },
    ],
    explanation:
      'Read the symptom carefully. Responding at all rules out "inactive". Responding but never with grounded data points squarely at the data layer, which is environment configuration rather than deployable metadata.',
    explanation_ja:
      '症状を正確に読む。応答している時点で「非アクティブ」は除外される。応答するがグラウンディングされたデータが一切ないという症状は、データ層を直接指し示す。データ層はメタデータではなく環境の構成である。',
    reference: '💡 Silent → not activated. Talks but knows nothing → Data 360 missing. Access error on an action → agent user.',
    reference_ja: '💡 無反応→未有効化。話すが何も知らない→Data 360 未構築。アクションのアクセスエラー→エージェントユーザー。',
  },
  // ── Integrations & Channels ────────────────────────────────────────
  {
    id: 'af-ap-19',
    domain: 'af-integration',
    type: 'scenario',
    scenario:
      'An architect lists four connections for one programme: a partner logistics agent owned by another company, an internal inventory REST API, a third-party observability platform exposing MCP-compatible tools, and a customer-facing mobile app the company builds.',
    scenario_ja:
      'アーキテクトが1つのプログラムにおける4つの接続を挙げた。他社が所有するパートナーの物流エージェント、社内の在庫REST API、MCP対応ツールを公開するサードパーティの可観測性プラットフォーム、そして自社が開発する顧客向けモバイルアプリである。',
    question: 'Which mapping is correct?',
    question_ja: '正しい対応付けはどれか。',
    options: [
      {
        text: 'A2A for the partner agent; an action over Apex or an external service for the inventory API; MCP for the observability tools; the Agent API for the mobile app.',
        text_ja: 'パートナーエージェントには A2A、在庫APIには Apex または外部サービスによるアクション、可観測性ツールには MCP、モバイルアプリには Agent API。',
        correct: true,
        note: 'Correct. Each mechanism is chosen by what sits on the other end of the connection.',
        note_ja: '正解。接続の相手側が何であるかによって、それぞれの仕組みが決まる。',
      },
      {
        text: 'MCP for all four, since MCP is the universal connector.',
        text_ja: '4つすべてに MCP。MCP は汎用のコネクタだから。',
        correct: false,
        note: 'MCP is for tools and data sources, not for delegating to another agent or for inbound calls.',
        note_ja: 'MCP はツールやデータソース向けであり、他エージェントへの委譲や外部からの呼び出しには使わない。',
      },
      {
        text: 'The Agent API for all four, since everything is ultimately an API call.',
        text_ja: '4つすべてに Agent API。最終的にはすべてAPI呼び出しだから。',
        correct: false,
        note: 'The Agent API is the inbound path into your agent, not a general outbound mechanism.',
        note_ja: 'Agent API は自社エージェントへの受け口であり、汎用の外向き手段ではない。',
      },
      {
        text: 'A2A for the partner agent and the observability platform; flows for the rest.',
        text_ja: 'パートナーエージェントと可観測性プラットフォームには A2A、残りはフロー。',
        correct: false,
        note: 'The observability platform is a tool surface, so MCP applies, not A2A.',
        note_ja: '可観測性プラットフォームはツール面であり、A2A ではなく MCP が該当する。',
      },
    ],
    explanation:
      'Four connection types, four answers. Another agent → A2A. MCP-compatible tool surface → MCP. Your own or a partner\'s plain API → an action over an external service or Apex. An external app calling in → the Agent API.',
    explanation_ja:
      '接続の型は4つ、答えも4つ。別のエージェント→A2A。MCP対応のツール面→MCP。自社やパートナーの通常のAPI→外部サービスまたは Apex によるアクション。外部アプリからの呼び出し→Agent API。',
    reference: '💡 Direction matters too: MCP and A2A are outbound, the Agent API is inbound.',
    reference_ja: '💡 向きも重要：MCP と A2A は外向き、Agent API は内向き（受け口）。',
  },
  {
    id: 'af-ap-20',
    domain: 'af-integration',
    type: 'scenario',
    scenario:
      'A service agent should hand over to a human when the customer becomes distressed, mentions legal action, or asks three times without resolution. The business wants this handled consistently.',
    scenario_ja:
      'サービスエージェントは、顧客が動揺している、法的措置に言及した、または解決しないまま3回尋ねた場合に、人へ引き継ぐべきである。事業側はこれを一貫して処理したいと考えている。',
    question: 'What is the appropriate design?',
    question_ja: '適切な設計はどれか。',
    options: [
      {
        text: 'One escalation action, invoked by clearly stated conditions in the agent\'s instructions.',
        text_ja: '1つのエスカレーションアクションを用意し、エージェントの指示で条件を明確に記述して実行させる。',
        correct: true,
        note: 'Correct. One handoff mechanism, several trigger conditions expressed in the instructions.',
        note_ja: '正解。引き継ぎの仕組みは1つ、発動条件は複数を指示に明記する。',
      },
      {
        text: 'Three separate agents, one per escalation trigger.',
        text_ja: 'エスカレーション条件ごとに3つの独立したエージェント。',
        correct: false,
        note: 'Triggers are conditions, not agents.',
        note_ja: '条件はあくまで条件であって、エージェントではない。',
      },
      {
        text: 'Lower the containment target until escalations increase.',
        text_ja: 'エスカレーションが増えるまで封じ込め率の目標を下げる。',
        correct: false,
        note: 'Containment rate is measured, not configured.',
        note_ja: '封じ込め率は測定されるものであり、設定するものではない。',
      },
      {
        text: 'Publish the agent to fewer channels so more customers reach a person directly.',
        text_ja: 'より多くの顧客が直接人に到達できるよう、エージェントの公開チャネルを減らす。',
        correct: false,
        note: 'Avoids the agent entirely instead of designing the handoff.',
        note_ja: '引き継ぎを設計するのではなく、エージェント自体を回避しているだけ。',
      },
    ],
    explanation:
      'Escalation is one configured action with well-specified triggering conditions. Note the mixture: distress and legal mentions call for judgement, so they are prompt instructions; "asked three times" is countable and can be deterministic.',
    explanation_ja:
      'エスカレーションは、発動条件を明確に定めた1つの構成済みアクションである。条件の性質が混在している点に注意：動揺や法的言及は判断を要するのでプロンプト指示、「3回尋ねた」は数えられるので決定的にできる。',
    reference: '💡 Even inside one feature, some conditions suit prompt instructions and others suit deterministic ones.',
    reference_ja: '💡 同じ機能の中でも、プロンプト指示が適する条件と決定的指示が適する条件が混在する。',
  },
]
