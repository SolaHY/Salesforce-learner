export const promptStudy = {
  intro:
    'Prompt engineering on this exam is mostly about choosing the right template type, grounding it with real data, and verifying it before release. Four template types exist and each is tied to a different destination for its output. Beyond that, the recurring themes are versioning (save is not activate) and controlling what the model does when data is missing.',
  intro_ja:
    'この試験のプロンプトエンジニアリングは、主に「適切なテンプレート種別を選ぶ」「実データでグラウンディングする」「リリース前に検証する」の3点です。テンプレートは4種類あり、それぞれ出力の行き先が異なります。加えて、バージョン管理（保存は有効化ではない）と、データが欠けているときのモデルの振る舞いの制御が繰り返し問われます。',
  sections: [
    {
      heading: 'The four prompt template types',
      heading_ja: '4つのプロンプトテンプレート種別',
      body:
        'Choose the template type by asking where the generated output lands. Three of the four are tied to a specific user experience; the fourth is the general-purpose type you call from elsewhere. Questions on this topic are frequent and are straightforward marks once the mapping is memorised.',
      body_ja:
        'テンプレート種別は「生成された出力がどこに着地するか」で選びます。4つのうち3つは特定のユーザー体験に紐づき、残る1つは他から呼び出す汎用型です。この論点は頻出で、対応関係さえ覚えれば確実に得点できます。',
      figure: 'af-template-types',
      points: [
        'Field Generation — writes the generated value into a specific field. The user triggers it on that field from the record page.',
        'Record Summary — displays a generated overview of a record and its related data on the record page. Read-only; it does not write anywhere.',
        'Sales Email — drafts an outbound email to a contact or lead, with the record data merged in.',
        'Flex — the general-purpose type. It takes inputs you define and can be invoked from a screen flow, from Apex, or exposed as an agent action.',
        'Decision rule: into a field → Field Generation. Onto the page → Record Summary. Into an email → Sales Email. Called from code, flow or an agent → Flex.',
        'When one capability is needed in several places, Flex is the answer. Building three near-identical templates guarantees they will drift apart.',
      ],
      points_ja: [
        'Field Generation — 生成した値を特定の項目に書き込む。ユーザーがレコードページ上でその項目から実行する。',
        'Record Summary — レコードと関連データの生成された概要をレコードページに表示する。読み取り専用で、どこにも書き込まない。',
        'Sales Email — 取引先責任者やリード宛の送信メールを、レコードデータを差し込んだ形で下書きする。',
        'Flex — 汎用型。自分で定義した入力を受け取り、画面フロー・Apex から呼び出したり、エージェントアクションとして公開したりできる。',
        '判定ルール：項目に入る→Field Generation。画面に出る→Record Summary。メールになる→Sales Email。コード・フロー・エージェントから呼ぶ→Flex。',
        '1つの機能が複数の場所で必要なら答えは Flex。ほぼ同一のテンプレートを3つ作れば、必ず内容がずれていく。',
      ],
    },
    {
      heading: 'Grounding a prompt template',
      heading_ja: 'プロンプトテンプレートのグラウンディング',
      body:
        'A template without grounding produces generic text. Grounding supplies the real data the model should work from, and the mechanism depends on where that data lives. This mirrors the data unit, but here the question is usually phrased in terms of a single template.',
      body_ja:
        'グラウンディングのないテンプレートは一般的な文章しか生み出しません。グラウンディングはモデルが依拠すべき実データを供給する仕組みで、その手段はデータの所在によって決まります。データ単元と同じ論点ですが、ここでは1つのテンプレートを主語にして問われます。',
      points: [
        'Merge fields — reference the record and its related records. They resolve live at the moment of generation, which is what "current balance" and "last three transactions" require.',
        'Retrieval — a retriever over an indexed corpus, for policy documents, manuals and knowledge articles.',
        'Both together — when the answer needs the customer record *and* a document library, configure structured and unstructured grounding side by side.',
        'Static text and hard-coded examples are not grounding. A hard-coded example transaction risks the model echoing those values as if they were real.',
        'Primary object — the object the template is built against. It scopes which merge fields are available; changing it will break existing merge fields.',
      ],
      points_ja: [
        '差し込み項目 — レコードとその関連レコードを参照する。生成の瞬間にライブで解決されるため、「現在残高」「直近3件の取引」といった要件に応えられる。',
        '検索 — インデックス化したコーパスに対するリトリーバー。規程文書、マニュアル、ナレッジ記事など。',
        '両方の併用 — 回答に顧客レコード「と」文書ライブラリの両方が必要な場合は、構造化・非構造化のグラウンディングを並行して構成する。',
        '固定テキストやハードコードした例はグラウンディングではない。取引の例をハードコードすると、モデルがその値を実データのように出力するリスクがある。',
        '主オブジェクト — テンプレートが基づくオブジェクト。利用できる差し込み項目の範囲を決め、変更すると既存の差し込み項目が壊れる。',
      ],
    },
    {
      heading: 'Versioning: save is not activate',
      heading_ja: 'バージョン管理：保存は有効化ではない',
      body:
        'Prompt templates are versioned. Editing and saving creates a new version, but the previously activated version continues to serve requests until you activate the new one. "I changed it and nothing happened" is nearly always this.',
      body_ja:
        'プロンプトテンプレートはバージョン管理されています。編集して保存すると新しいバージョンが作られますが、新版を有効化するまでは以前に有効化されたバージョンが処理を続けます。「変更したのに何も変わらない」は、ほぼ常にこれです。',
      points: [
        'Saving an edit produces a new version. Activation is a separate, deliberate step.',
        'Symptom to remember: users still see output matching the old wording after a save. Cause: the revised version was never activated.',
        'The same trap exists for agents: a successful deployment does not activate them (see the lifecycle unit). Deploy ≠ activate, save ≠ activate.',
        'A disabled model would cause failures, not correct output in the old wording — a useful way to eliminate that distractor.',
      ],
      points_ja: [
        '編集を保存すると新しいバージョンが作られる。有効化はそれとは別の、意図的な手順。',
        '覚えるべき症状：保存後もユーザーには旧文言に沿った出力が返る。原因：改訂版が有効化されていない。',
        '同じ落とし穴がエージェントにもある。展開が成功しても有効化はされない（ライフサイクル単元を参照）。展開≠有効化、保存≠有効化。',
        'モデルが無効化されていればエラーになるはずで、旧文言どおりの正常な出力にはならない。この考え方で誤答選択肢を消せる。',
      ],
    },
    {
      heading: 'Preview: verifying before release (deep dive)',
      heading_ja: 'プレビュー：リリース前の検証（深掘り）',
      body:
        'Template preview is the design-time verification tool. It resolves the merge fields against a sample record and shows you both the fully assembled prompt and the response the model returns. Deploying and watching production is never the right answer on this exam.',
      body_ja:
        'テンプレートプレビューは設計時の検証ツールです。サンプルレコードで差し込み項目を解決し、完全に組み立てられたプロンプトと、モデルが返す応答の両方を見せてくれます。この試験で「展開して本番を見守る」が正解になることはありません。',
      points: [
        'Preview shows the resolved prompt — what the model actually receives after merge fields and grounding are applied — and the generated response.',
        'Preview with a *typical* record, not your best one. A curated sample hides the problem of sparse real-world data.',
        'The agent equivalent of preview is Testing Center; the audit trail and provider logs are not design tools.',
        'Common production failure: excellent in preview, generic in production. The usual cause is merge fields resolving empty for many real records.',
      ],
      points_ja: [
        'プレビューは解決済みプロンプト（差し込み項目とグラウンディングが適用された後にモデルが実際に受け取る内容）と、生成された応答の両方を表示する。',
        'プレビューは「最良の」レコードではなく「典型的な」レコードで行う。選び抜いたサンプルは、実データが疎であるという問題を隠してしまう。',
        'エージェントにおけるプレビューの相当物は Testing Center。監査証跡やプロバイダーのログは設計用のツールではない。',
        'よくある本番での失敗：プレビューでは優秀、本番では一般論。典型的な原因は、多くの実レコードで差し込み項目が空に解決されること。',
      ],
    },
    {
      heading: 'Controlling hallucination (deep dive)',
      heading_ja: 'ハルシネーションの制御（深掘り）',
      body:
        'Models fill gaps unless told not to. When a field is empty or grounding is thin, the model will produce something plausible rather than nothing. The prompt-level control is an explicit instruction about what to do with missing information.',
      body_ja:
        'モデルは指示がなければ空白を埋めます。項目が空だったりグラウンディングが薄かったりすると、何も出さないのではなく、もっともらしい内容を作り出します。これに対するプロンプトレベルの制御は、情報が欠けている場合の扱いを明示的に指示することです。',
      points: [
        'Instruct explicitly: state that the information is unavailable rather than infer it. This is the direct fix for fabrication on empty fields.',
        'Improve grounding: fabrication is often a symptom of the model having too little real data to work from.',
        'Do not increase the maximum response length. More room to write is more room to invent.',
        'Do not switch to a larger model as the first move. A bigger model still fills gaps when the prompt does not say what to do with missing data.',
        'Do not hide the gap by removing the merge field. That reduces grounding further and makes invention more likely, not less.',
        'For fixed text that must always appear — a disclaimer, a compliance footer — an interpreted instruction is not enough. Anything mandatory needs deterministic handling (see the agent unit).',
      ],
      points_ja: [
        '明示的に指示する：推測せず「情報が利用できない」と述べさせる。空項目に対する作り話への直接的な対処。',
        'グラウンディングを改善する：作り話は、モデルが依拠できる実データが少なすぎることの症状であることが多い。',
        '最大応答長を増やしてはいけない。書く余地が増えれば作り話の余地も増える。',
        '最初の一手としてより大きなモデルに切り替えてはいけない。欠損データの扱いを指示していなければ、大きなモデルでも空白を埋めようとする。',
        '差し込み項目を削除して欠損を隠してはいけない。グラウンディングがさらに減り、作り話はむしろ増える。',
        '免責文言やコンプライアンスフッターのように必ず出力すべき固定テキストには、解釈される指示では不十分。必須の要件には決定的な扱いが必要（エージェント単元を参照）。',
      ],
    },
  ],
}
