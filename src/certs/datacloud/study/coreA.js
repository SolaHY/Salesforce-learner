// 学習教材（前半3単元）：提案と位置づけ / 設定と管理 / 接続と取り込み
// 英語（原文）で学び、セクション単位で日本語に切り替えられるよう英日を併記している。

export const positioningStudy = {
  intro:
    'Data 360 — the product formerly and still widely called Data Cloud — is not a CRM database and not a data warehouse. It is a customer data platform that connects to data where it lives, harmonises it into a shared model, resolves identities into a single profile, and makes that profile actionable inside Salesforce and outside it. This unit is the vocabulary unit. Almost every question elsewhere in the exam assumes you can name the layer a feature belongs to, so learn the pipeline order first: connect → harmonise → unify → analyse → act.',
  intro_ja:
    'Data 360（旧称であり今も広く使われる呼び名が Data Cloud）は、CRM のデータベースでも、データウェアハウスでもありません。データがある場所に接続し、共通モデルへ整え、ID を1つのプロファイルに解決し、そのプロファイルを Salesforce の内外で行動につなげる顧客データプラットフォームです。この単元は語彙の単元です。試験の他の単元の設問はほぼすべて「その機能がどの層のものか」を言えることを前提にしているため、まずパイプラインの順序を覚えてください：接続 → 調和 → 統合 → 分析 → 実行。',
  sections: [
    {
      heading: 'The pipeline, in order',
      heading_ja: 'パイプラインの順序',
      body:
        'Every Data 360 capability sits at one of five stages. If you can place a term on this line, most positioning questions answer themselves. Note that the terms are layered: a data stream produces a DLO, a DLO is mapped to a DMO, DMOs feed identity resolution, and only the resulting unified profile is what segmentation normally targets.',
      body_ja:
        'Data 360 のあらゆる機能は5つの段階のいずれかに属します。用語をこの線上に置けるようになれば、位置づけの設問はほぼ自動的に解けます。用語は積み重なっている点に注意してください。データストリームが DLO を生み、DLO が DMO にマッピングされ、DMO が ID 解決に入り、その結果できた統合プロファイルこそがセグメンテーションの通常の対象です。',
      points: [
        'Connect — connectors, the Ingestion API and Zero Copy bring data in (or reference it without copying).',
        'Harmonise — a Data Lake Object (DLO) holds the raw ingested shape; mapping aligns it to a Data Model Object (DMO) in the Customer 360 data model.',
        'Unify — identity resolution applies match rules and reconciliation rules to produce a Unified Individual profile.',
        'Analyse — calculated insights, streaming insights and data graphs derive metrics and fast-read views on top of the model.',
        'Act — segments, activations, data actions and flows push the result to where the work happens.',
        'Data 360 is a platform layer, not a replacement for CRM. Records stay in their systems; Data 360 unifies a view across them.',
      ],
      points_ja: [
        '接続 — コネクタ、Ingestion API、Zero Copy でデータを取り込む（またはコピーせずに参照する）。',
        '調和 — Data Lake Object（DLO）が取り込んだ生の形を保持し、マッピングによって Customer 360 データモデルの Data Model Object（DMO）へ揃える。',
        '統合 — ID解決が一致ルールと調整ルールを適用し、Unified Individual（統合プロファイル）を作る。',
        '分析 — Calculated Insights、Streaming Insights、Data Graph がモデルの上に指標と高速参照用のビューを作る。',
        '実行 — セグメント、アクティベーション、Data Action、フローが結果を業務の現場へ届ける。',
        'Data 360 はプラットフォーム層であり、CRM の置き換えではない。レコードは各システムに残り、Data 360 はそれらを横断した1つのビューを作る。',
      ],
    },
    {
      heading: 'Business value: what problem it actually solves',
      heading_ja: 'ビジネス価値：本当に解決している課題',
      body:
        'The exam frames value in terms of fragmentation. A customer exists as a CRM contact, a commerce account, a marketing subscriber and a support requester, and none of those systems knows about the others. Data 360 makes those four rows one person. Every downstream benefit — personalisation, suppression, accurate lifetime value, AI grounding — follows from that single fact.',
      body_ja:
        '試験では価値を「分断」の観点で問います。1人の顧客が CRM のコンタクト、コマースのアカウント、マーケティングの購読者、サポートの問い合わせ者として別々に存在し、どのシステムも互いを知りません。Data 360 はその4行を1人にします。パーソナライゼーション、除外（サプレッション）、正確な生涯価値、AIのグラウンディングといった下流の効果は、すべてこの1点から生まれます。',
      points: [
        'The core value is a single, resolved view of the customer across systems — not storage and not reporting.',
        'Value questions usually reward the answer that removes duplication of the person, not the answer that adds another dashboard.',
        'Data 360 is consumption-priced in credits: ingestion, processing, queries and activations all consume. Design choices have a direct cost consequence, which is why Zero Copy and narrow data streams are so often the right answer.',
        'It is org-connected: one Data 360 instance can serve multiple Salesforce orgs and non-Salesforce sources at once.',
      ],
      points_ja: [
        '中核の価値は、システムを横断した「解決済みの単一の顧客像」。保管でもレポーティングでもない。',
        '価値を問う設問では、ダッシュボードを1つ増やす選択肢ではなく、人物の重複を解消する選択肢が正解になりやすい。',
        'Data 360 はクレジットによる従量課金。取り込み・処理・クエリ・アクティベーションのすべてが消費する。設計の選択がそのままコストに響くため、Zero Copy や絞り込んだデータストリームが正解になりやすい。',
        '組織横断で使える。1つの Data 360 インスタンスが複数の Salesforce 組織と非 Salesforce のソースを同時に扱える。',
      ],
    },
    {
      heading: 'The foundation for predictive and generative AI',
      heading_ja: '予測AI・生成AIの土台として',
      body:
        'This objective is called out explicitly in the exam guide, and it is the one candidates most often under-prepare. The short version: AI is only as good as the data it is grounded in, and Data 360 is the grounding layer. Distinguish the two AI paths, because they consume Data 360 differently.',
      body_ja:
        'この観点は試験ガイドに明示されており、受験者が最も準備不足になりやすいところです。要点はこうです。AI はグラウンディングに使うデータの質を超えられず、Data 360 がそのグラウンディング層になります。2つの AI の道筋は Data 360 の使い方が異なるため、区別してください。',
      points: [
        'Predictive AI — Einstein Studio / Model Builder trains or connects a model on Data 360 data. Bring Your Own Model (BYOM) connects an external model in Amazon SageMaker, Google Vertex AI or Databricks without moving the data; predictions land back as a DMO you can segment on.',
        'Generative AI — grounding supplies the model with the customer context at prompt time. Data graphs give the low-latency read, and retrievers perform the search step of retrieval-augmented generation (RAG).',
        'Unstructured data (PDFs, knowledge articles, transcripts) is ingested, chunked and indexed into a search index so retrievers can ground answers on it.',
        'Agentforce agents are grounded on Data 360 through retrievers and data graphs — this is the most common way the two products appear together in a question.',
        'The reason unification matters to AI: grounding on an unresolved profile gives the model a fragment of the customer, which is how confidently wrong answers get generated.',
      ],
      points_ja: [
        '予測AI — Einstein Studio／Model Builder が Data 360 のデータでモデルを学習または接続する。BYOM（Bring Your Own Model）は Amazon SageMaker、Google Vertex AI、Databricks の外部モデルをデータを動かさずに接続し、予測結果は DMO として戻るのでセグメントに使える。',
        '生成AI — グラウンディングがプロンプト実行時に顧客コンテキストをモデルへ供給する。Data Graph が低遅延の読み取りを担い、Retriever が RAG（検索拡張生成）の検索段階を担う。',
        '非構造化データ（PDF、ナレッジ記事、通話記録）は取り込み・分割のうえ検索インデックスに登録され、Retriever がそれを根拠に回答できるようになる。',
        'Agentforce のエージェントは Retriever と Data Graph を通じて Data 360 にグラウンディングされる。2製品が同時に出てくる設問はこの形が最も多い。',
        '統合が AI にとって重要な理由：未解決のプロファイルにグラウンディングすると、モデルには顧客の断片しか渡らない。自信満々の誤答はこうして生まれる。',
      ],
    },
    {
      heading: 'Choosing an initial use case',
      heading_ja: '最初のユースケースの選び方',
      body:
        'Positioning questions often describe an eager customer who wants everything at once and ask what to do first. The consultant answer is always the same shape: pick one measurable business outcome, and work backwards to the minimum data needed to achieve it. Ingesting everything first is the classic wrong answer, and it is wrong on both cost and time-to-value.',
      body_ja:
        '位置づけの設問では、あれもこれもと望む顧客を描いて「まず何をするか」を問います。コンサルタントとしての答えは常に同じ形です。測定可能なビジネス成果を1つ選び、そこから逆算して必要最小限のデータを決める。まず全部取り込む、が典型的な誤答で、コストの面でも価値実現までの時間の面でも誤りです。',
      points: [
        'Start from the business outcome, not from the data inventory. "Reduce churn in the premium tier" is a use case; "ingest the data warehouse" is not.',
        'Ingest only the sources that the chosen use case needs. Extra data costs credits and slows identity resolution.',
        'Good starter use cases: suppression of existing customers from acquisition ads, cross-channel personalisation, a unified service view for agents, and a churn or lifetime-value model.',
        'Confirm the use case can actually be measured before building it — an outcome no one can measure cannot demonstrate value.',
        'Check that the required data is available and permitted for the purpose before designing around it.',
      ],
      points_ja: [
        'データの棚卸しではなくビジネス成果から始める。「プレミアム層の解約を減らす」はユースケース、「データウェアハウスを取り込む」はユースケースではない。',
        '選んだユースケースに必要なソースだけを取り込む。余分なデータはクレジットを消費し、ID解決を遅くする。',
        '最初に適したユースケース：獲得広告からの既存顧客の除外、チャネル横断のパーソナライゼーション、サポート担当者向けの統合ビュー、解約予測や生涯価値のモデル。',
        '構築前に、そのユースケースが実際に測定可能か確認する。誰も測れない成果では価値を示せない。',
        '設計に入る前に、必要なデータが利用可能で、その目的に使ってよいかを確認する。',
      ],
    },
    {
      heading: 'Data ethics and governance',
      heading_ja: 'データ倫理とガバナンス',
      body:
        'This is a named objective, and it is tested as judgement rather than as configuration. The recurring principle: technical capability does not create permission. If the platform can do something with personal data but the customer did not agree to it, the answer is no.',
      body_ja:
        'これは明示された出題観点で、設定ではなく判断として問われます。繰り返し出る原則はこれです。技術的にできることは、やってよいことを意味しない。個人データに対して機能上は可能でも、顧客が同意していなければ答えは「行わない」です。',
      points: [
        'Collect for a stated purpose, and use it only for that purpose. Repurposing data the customer consented to for something else is the classic ethics failure.',
        'Consent travels with the data. Honour it at activation, and prefer designs that filter on consent rather than relying on people to remember.',
        'Minimise: ingest the fields the use case needs, not every field the source offers. This is both an ethics and a cost principle.',
        'Be transparent about what is collected and why, and support the individual\'s rights — access, correction and deletion.',
        'Watch for bias and unfair exclusion when profiles feed AI models or targeting decisions.',
        'Governance is not only privacy. It also covers ownership, quality, retention and who is allowed to see which data — which is what data spaces and permission sets implement.',
      ],
      points_ja: [
        '明示した目的のために収集し、その目的にのみ使う。同意を得た用途とは別のことにデータを流用するのが典型的な倫理上の失敗。',
        '同意はデータに付いて回る。アクティベーション時に必ず尊重し、人の記憶に頼らず同意で絞り込む設計を選ぶ。',
        '最小化する。ソースが提供する全項目ではなく、ユースケースに必要な項目だけを取り込む。これは倫理の原則であると同時にコストの原則でもある。',
        '何を何のために収集するかを透明にし、本人の権利（アクセス・訂正・削除）に対応する。',
        'プロファイルが AI モデルやターゲティングの判断に入るとき、バイアスと不当な排除に注意する。',
        'ガバナンスはプライバシーだけではない。所有者、品質、保持期間、誰がどのデータを見てよいかも含む。それを実装するのがデータスペースと権限セット。',
      ],
    },
    {
      heading: 'Naming: Data Cloud and Data 360',
      heading_ja: '名称：Data Cloud と Data 360',
      body:
        'Salesforce renamed the product and the credential to Data 360. Older material, many connectors and much of the setup UI still say Data Cloud, and the exam may use either. Treat them as the same product.',
      body_ja:
        'Salesforce は製品名と資格名を Data 360 へ改称しました。古い教材、多くのコネクタ、設定画面の多くは今も Data Cloud のままで、試験ではどちらの表記も使われ得ます。同一の製品として扱ってください。',
      points: [
        'Data Cloud = Data 360. The credential is now "Salesforce Certified Data 360 Consultant".',
        'Some permission sets were renamed too — Data Cloud Admin is now surfaced as Data Cloud Architect in newer orgs.',
        'Do not read a renamed term as a different feature; there is no separate "Data 360" product alongside Data Cloud.',
      ],
      points_ja: [
        'Data Cloud ＝ Data 360。資格名は現在「Salesforce Certified Data 360 Consultant」。',
        '一部の権限セットも改称された。Data Cloud Admin は新しい組織では Data Cloud Architect として表示される。',
        '改称された用語を別機能と読み違えないこと。Data Cloud と並立する別製品としての「Data 360」は存在しない。',
      ],
    },
  ],
}

export const setupStudy = {
  intro:
    'This unit covers who can do what, where data is separated, and how you find out why something is broken. Three mechanics carry most of the questions: permission sets (what a user may do), data spaces (which slice of data they may do it to), and the troubleshooting tools — Data Explorer, Profile Explorer, Query Editor and the job/refresh history. Governance appears here as configuration rather than as principle.',
  intro_ja:
    'この単元は「誰が何をできるか」「データをどこで分けるか」「壊れた原因をどう突き止めるか」を扱います。設問の大半は3つの仕組みに集約されます。権限セット（ユーザーが何をしてよいか）、データスペース（どの範囲のデータに対してか）、そしてトラブルシューティングのツール（Data Explorer、Profile Explorer、クエリエディタ、ジョブ／更新履歴）です。ガバナンスはここでは原則ではなく設定として現れます。',
  sections: [
    {
      heading: 'Permission sets: capability, not visibility',
      heading_ja: '権限セット：可視範囲ではなく機能',
      body:
        'Data 360 access is granted with permission sets, never with profiles alone, and the standard sets are deliberately role-shaped. The distinction that matters most on the exam is that a permission set decides what a user can do, while a data space decides which data they do it to. Questions that give you both a role and a brand or region are usually asking you to combine the two.',
      body_ja:
        'Data 360 のアクセスは権限セットで付与します（プロファイル単独では付与しません）。標準の権限セットは役割の形に沿って用意されています。試験で最も重要な区別は、権限セットが「何をしてよいか」を決め、データスペースが「どのデータに対してか」を決めるという点です。役割とブランド／地域の両方が書かれた設問は、たいていこの2つを組み合わせさせています。',
      points: [
        'Data Cloud Admin (shown as Data Cloud Architect in newer orgs) — full setup: connectors, data streams, mapping, identity resolution rulesets, data spaces.',
        'Data Cloud Marketing Admin — everything the admin set does, plus segmentation and activation.',
        'Data Cloud Marketing Manager — creates and manages segments and activations, but not the underlying platform setup.',
        'Data Cloud Marketing Specialist — works within existing segments; the narrowest marketing role.',
        'Data Cloud User / Data Aware Specialist — read and explore data without configuring the platform.',
        'Grant the narrowest set that covers the job. "Give them System Administrator" is always a wrong answer.',
        'A Salesforce admin assigns these in the Salesforce org; provisioning Data 360 does not grant anyone access automatically.',
      ],
      points_ja: [
        'Data Cloud Admin（新しい組織では Data Cloud Architect と表示）— セットアップ全般。コネクタ、データストリーム、マッピング、ID解決ルールセット、データスペース。',
        'Data Cloud Marketing Admin — 管理者権限セットの全機能に加え、セグメンテーションとアクティベーション。',
        'Data Cloud Marketing Manager — セグメントとアクティベーションの作成・管理はできるが、基盤側のセットアップはできない。',
        'Data Cloud Marketing Specialist — 既存セグメントの範囲内で作業する、マーケティング系で最も狭い役割。',
        'Data Cloud User／Data Aware Specialist — 設定は行わず、データの参照と探索を行う。',
        '職務に足りる最小の権限セットを付与する。「システム管理者を付ける」は常に誤答。',
        '割り当ては Salesforce 組織側で管理者が行う。Data 360 をプロビジョニングしただけでは誰にもアクセス権は付かない。',
      ],
    },
    {
      heading: 'Data spaces: partitioning the platform',
      heading_ja: 'データスペース：プラットフォームの区画化',
      body:
        'A data space is a logical partition of Data 360 — brands, regions, business units or a separate environment for a subsidiary. Each data space has its own data, its own identity resolution rulesets, and its own segments and activations. This is the mechanism the exam reaches for whenever a scenario mentions two brands that must not see each other\'s customers.',
      body_ja:
        'データスペースは Data 360 の論理的な区画です。ブランド、地域、事業部門、あるいは子会社用の分離環境などに使います。各データスペースは独自のデータ、独自の ID解決ルールセット、独自のセグメントとアクティベーションを持ちます。「2つのブランドが互いの顧客を見てはならない」というシナリオで試験が求めるのはこの仕組みです。',
      points: [
        'Every org has a default data space; additional ones are created as needed.',
        'Segments, activations and identity resolution are scoped to a data space — they do not span spaces.',
        'Permission sets are associated with data spaces to control which partition a user reaches.',
        'A data stream can be made available to more than one data space, with filters, so a shared source does not have to be ingested twice.',
        'Use data spaces for separation of visibility. Do not use them merely to organise objects — that is what the data model is for.',
        'Separating brands that must not share profiles is the canonical data space scenario.',
      ],
      points_ja: [
        'すべての組織に既定のデータスペースがあり、必要に応じて追加する。',
        'セグメント、アクティベーション、ID解決はデータスペース単位。スペースをまたがない。',
        '権限セットをデータスペースに関連付けて、ユーザーが到達できる区画を制御する。',
        'データストリームはフィルタ付きで複数のデータスペースに提供できるため、共有ソースを二重に取り込む必要はない。',
        '可視範囲を分けるためにデータスペースを使う。単にオブジェクトを整理する目的では使わない（それはデータモデルの役割）。',
        'プロファイルを共有してはならないブランドの分離が、データスペースの代表的なシナリオ。',
      ],
    },
    {
      heading: 'Governance applied to configuration',
      heading_ja: 'ガバナンスを設定に落とし込む',
      body:
        'The exam expects you to turn a policy sentence into a platform setting. Learn the mapping in both directions: given a requirement, name the setting; given a setting, name what it protects.',
      body_ja:
        '試験では、ポリシーの一文をプラットフォームの設定に変換できることが求められます。対応関係を双方向で覚えてください。要件を見て設定名を挙げられること、設定を見て何を守っているか言えること。',
      points: [
        '"Brand A must not see Brand B\'s customers" → separate data spaces.',
        '"Analysts may query but must not change the model" → a read/explore permission set, not the admin set.',
        '"Do not market to people who opted out" → consent attributes modelled and filtered at activation.',
        '"Delete this person\'s data on request" → the right-to-be-forgotten / consent APIs, not a manual record hunt.',
        '"Only these fields may leave the platform" → restrict the attributes included in the activation.',
        '"Keep only what we need" → limit fields at the data stream, and set retention on the data lake object.',
      ],
      points_ja: [
        '「ブランドAはブランドBの顧客を見てはならない」→ データスペースを分ける。',
        '「アナリストはクエリしてよいがモデルを変更してはならない」→ 参照・探索用の権限セット。管理者用ではない。',
        '「オプトアウトした人にマーケティングしない」→ 同意属性をモデル化し、アクティベーションで絞り込む。',
        '「申し出があればその人のデータを削除する」→ 忘れられる権利／同意の API を使う。手作業でレコードを探すのではない。',
        '「この項目だけが platform の外に出てよい」→ アクティベーションに含める属性を限定する。',
        '「必要なものだけを保持する」→ データストリームで項目を絞り、データレイクオブジェクトに保持期間を設定する。',
      ],
    },
    {
      heading: 'The development lifecycle',
      heading_ja: '開発ライフサイクル',
      body:
        'Data 360 configuration is metadata, so it moves between environments rather than being rebuilt by hand. Data kits are the packaging unit, and the same governed-change discipline applies as anywhere else on the platform: build low, test, promote.',
      body_ja:
        'Data 360 の設定はメタデータなので、手作業で作り直すのではなく環境間を移動します。パッケージングの単位が Data Kit で、統制された変更管理の原則はプラットフォームの他の領域と同じです。下位環境で作り、テストし、昇格させる。',
      points: [
        'A data kit packages Data 360 metadata — data streams, data model objects, mappings, calculated insights, segments — for deployment to another org.',
        'Data kits move configuration, not the ingested data itself.',
        'Develop and validate in a sandbox or development data space before touching production.',
        'Rebuilding by hand in production is the wrong answer whenever a packaging option exists — it is not repeatable and it is not auditable.',
      ],
      points_ja: [
        'Data Kit は Data 360 のメタデータ（データストリーム、データモデルオブジェクト、マッピング、Calculated Insights、セグメント）を他組織へデプロイするためにまとめたもの。',
        'Data Kit が運ぶのは設定であり、取り込んだデータそのものではない。',
        '本番に触れる前に、サンドボックスまたは開発用データスペースで構築・検証する。',
        'パッケージング手段があるのに本番で手作業で作り直すのは誤答。再現性がなく、監査もできない。',
      ],
    },
    {
      heading: 'Troubleshooting: which tool answers which question',
      heading_ja: 'トラブルシューティング：どのツールで何が分かるか',
      body:
        'Diagnostic questions are answered by choosing the right lens, and the lens depends on where you suspect the problem is. Work down the pipeline: did the data arrive, did it land in the right shape, did it map, did it unify, did it activate.',
      body_ja:
        '診断の設問は、適切な観察手段を選ぶことで解けます。どこに問題がありそうかで手段が決まります。パイプラインを上から順に辿ってください。データは届いたか、正しい形で着地したか、マッピングされたか、統合されたか、アクティベートされたか。',
      points: [
        'Data Explorer — inspect the actual records in a DLO or DMO. Use it to answer "did the data arrive and does it look right?"',
        'Profile Explorer — view one unified individual and the source records behind it. Use it to answer "why did these two people merge?" or "why did they not?"',
        'Query Editor (SQL) — ad-hoc counts and comparisons across objects. Use it to quantify a problem you have already localised.',
        'Data stream refresh history — run status, row counts, and errors per run. Use it first when data is missing entirely.',
        'Identity resolution ruleset run history — when the ruleset last ran. Unification is scheduled, so a "missing" unified profile is very often just a ruleset that has not run yet.',
        'Activation/segment publish history — whether the segment published and how many members went out.',
        'A good habit: confirm the row count at each stage. The stage where the count first goes wrong is the stage with the bug.',
      ],
      points_ja: [
        'Data Explorer — DLO や DMO の実レコードを確認する。「データは届いたか、見た目は正しいか」に答える。',
        'Profile Explorer — 1つの統合プロファイルとその元になったソースレコードを見る。「なぜこの2人が結合したのか／なぜしなかったのか」に答える。',
        'クエリエディタ（SQL）— オブジェクト横断での件数や比較をその場で確認する。原因の場所を絞り込んだ後の定量化に使う。',
        'データストリームの更新履歴 — 実行ごとのステータス、行数、エラー。データがまるごと無いときは最初にここを見る。',
        'ID解決ルールセットの実行履歴 — ルールセットが最後にいつ動いたか。統合はスケジュール実行なので、「統合プロファイルが無い」の多くは単にルールセットが未実行なだけ。',
        'アクティベーション／セグメントの公開履歴 — セグメントが公開されたか、何件が送信されたか。',
        '良い習慣：各段階で行数を確認する。件数が最初におかしくなる段階に不具合がある。',
      ],
    },
  ],
}

export const ingestionStudy = {
  intro:
    'This is the largest of the first three units and the one with the most concrete, memorisable facts. Two decisions dominate: how the data gets in (connector, Ingestion API, or Zero Copy — no copy at all), and how the stream is configured (category and refresh mode). The category decision is irreversible, which is exactly why the exam keeps asking about it.',
  intro_ja:
    'この単元は前半3単元の中で最も比重が大きく、覚えるべき具体的な事実が最も多い単元です。支配的な判断は2つ。データをどう入れるか（コネクタ、Ingestion API、あるいはコピーしない Zero Copy）と、ストリームをどう設定するか（カテゴリと更新モード）です。カテゴリの選択は後から変更できません。だからこそ試験が繰り返し問うのです。',
  sections: [
    {
      heading: 'Ways in: connectors, API, and no-copy',
      heading_ja: '取り込みの手段：コネクタ、API、コピーしない方法',
      body:
        'Match the source to the mechanism. Most ingestion questions are solved by recognising which of these the scenario describes, and by noticing whether the scenario actually wants the data copied at all.',
      body_ja:
        'ソースと手段を対応づけます。取り込みの設問の多くは、シナリオがどれを指しているかを見分け、そもそもデータをコピーしたいのかどうかに気づくことで解けます。',
      points: [
        'Salesforce CRM connector — standard objects and fields from a connected org. The default path for CRM data.',
        'Marketing Cloud connectors — engagement and subscriber data from Engagement or Personalization.',
        'Cloud storage connectors — Amazon S3, Google Cloud Storage, Azure Storage for file drops; SFTP for scheduled file transfer.',
        'Ingestion API — for systems with no standard connector. Two modes: streaming for near-real-time events, and bulk for large periodic loads. You must upload a schema (OpenAPI/YAML) describing the payload before data can flow.',
        'Web and Mobile SDK — first-party behavioural events from your own site or app.',
        'MuleSoft and other integration tooling — when transformation or orchestration is needed before Data 360.',
        'Zero Copy — do not ingest at all; query the external platform in place (see below).',
      ],
      points_ja: [
        'Salesforce CRM コネクタ — 接続した組織の標準オブジェクトと項目。CRM データの既定の経路。',
        'Marketing Cloud コネクタ — Engagement や Personalization からのエンゲージメント・購読者データ。',
        'クラウドストレージコネクタ — ファイル配置用の Amazon S3、Google Cloud Storage、Azure Storage。定期的なファイル転送には SFTP。',
        'Ingestion API — 標準コネクタが無いシステム向け。ストリーミング（ニアリアルタイムのイベント）とバルク（大量の定期ロード）の2モード。データを流す前にペイロードを定義するスキーマ（OpenAPI／YAML）のアップロードが必要。',
        'Web／Mobile SDK — 自社サイトやアプリからのファーストパーティの行動イベント。',
        'MuleSoft などの連携ツール — Data 360 の手前で変換やオーケストレーションが必要な場合。',
        'Zero Copy — そもそも取り込まない。外部プラットフォームをその場でクエリする（下記）。',
      ],
    },
    {
      heading: 'Data stream category: the irreversible choice',
      heading_ja: 'データストリームのカテゴリ：取り消せない選択',
      body:
        'Every data stream is assigned one of three categories, and the category cannot be changed afterwards — you would have to delete and recreate the stream. The category determines which DMOs the stream can map to and how the data behaves downstream, so getting it wrong is expensive.',
      body_ja:
        'すべてのデータストリームは3つのカテゴリのいずれかに設定され、後から変更できません。変更したい場合はストリームを削除して作り直すことになります。カテゴリはマッピングできる DMO と下流での挙動を決めるため、間違えると高くつきます。',
      points: [
        'Profile — who someone is. Contacts, accounts, leads, loyalty members. This is the data identity resolution and segmentation are built on. Requires a primary key.',
        'Engagement — what someone did, and when. Emails opened, pages viewed, orders placed. Requires an event time field; that is the giveaway in a question.',
        'Other — reference and lookup data that is neither a person nor a time-stamped action: product catalogues, store lists, price books.',
        'A question that mentions a timestamp of an action is describing Engagement. A question about attributes of a person is Profile. A question about a product or location list is Other.',
        'The category cannot be changed after creation — recreate the stream. Any answer that says "edit the category" is wrong.',
      ],
      points_ja: [
        'Profile — その人が誰であるか。コンタクト、取引先、リード、ロイヤルティ会員。ID解決とセグメンテーションの土台になるデータ。主キーが必要。',
        'Engagement — その人が何をしたか、いつしたか。メール開封、ページ閲覧、注文。イベント時刻の項目が必須で、これが設問中の判別ポイントになる。',
        'Other — 人でも時刻付きの行動でもない参照・マスタ系データ。商品カタログ、店舗一覧、価格表。',
        '行動の時刻に言及していれば Engagement。人物の属性の話なら Profile。商品や拠点の一覧なら Other。',
        'カテゴリは作成後に変更できない。ストリームを作り直す。「カテゴリを編集する」という選択肢は誤り。',
      ],
    },
    {
      heading: 'Primary keys and refresh modes',
      heading_ja: '主キーと更新モード',
      body:
        'The primary key is what makes a row identifiable across runs, and the refresh mode decides what happens to rows that already exist. This pair produces a lot of "records are duplicating" and "deleted records are still there" questions.',
      body_ja:
        '主キーは実行をまたいで行を識別するためのもので、更新モードは既にある行をどう扱うかを決めます。この2つの組み合わせから「レコードが重複する」「削除したはずのレコードが残る」といった設問が数多く生まれます。',
      points: [
        'The primary key must be unique and stable in the source. A field that changes, or that repeats across rows, causes duplicates or overwrites.',
        'Upsert — matches on the primary key: update if present, insert if not. Rows deleted at the source remain in Data 360, because nothing tells the platform they are gone.',
        'Full refresh — replaces the contents of the stream, so rows that disappeared at the source disappear here too. This is the answer when deletions must propagate.',
        'Incremental refresh — brings only what changed since the last run. Cheaper and faster, and available for supported sources.',
        'Streams run on a schedule; near-real-time sources push instead. A "data is stale" question is usually about the schedule, not about a failure.',
        '"Deleted at source but still segmenting" → the stream is upsert; switch to full refresh (or handle deletion explicitly).',
      ],
      points_ja: [
        '主キーはソース側で一意かつ安定している必要がある。変化する項目や行をまたいで重複する項目を選ぶと、重複や上書きが起きる。',
        'Upsert — 主キーで突き合わせ、あれば更新、なければ挿入。ソースで削除された行は Data 360 に残る。削除されたことを伝える手段がないため。',
        'Full refresh — ストリームの内容を置き換えるため、ソースから消えた行はこちらでも消える。削除を伝播させたいときの答え。',
        'Incremental refresh — 前回実行以降の変更分だけを取り込む。安価で速く、対応ソースで利用できる。',
        'ストリームはスケジュールで実行され、ニアリアルタイムのソースは push する。「データが古い」という設問はたいてい障害ではなくスケジュールの話。',
        '「ソースでは削除済みなのにまだセグメントに出る」→ ストリームが upsert。full refresh に変える（または削除を明示的に扱う）。',
      ],
    },
    {
      heading: 'Transformations',
      heading_ja: 'データ変換',
      body:
        'Data 360 can reshape data on the way in and after landing. The exam distinguishes the lightweight in-stream option from the full transform, and expects you to prefer fixing shape inside the platform rather than asking the source system to change.',
      body_ja:
        'Data 360 は取り込みの途中でも着地後でもデータを整形できます。試験ではストリーム内の軽量な手段と本格的な変換を区別し、ソースシステム側を変えさせるのではなくプラットフォーム内で形を整えることを求めます。',
      points: [
        'Formula fields on a data stream — light, row-level derivation at ingest: concatenation, casting, trimming, simple conditionals.',
        'Batch data transforms — heavier work on a schedule: joins across objects, aggregation, filtering, reshaping. The output is written to a new DLO.',
        'Streaming data transforms — the same idea applied continuously to streaming data.',
        'Standardise formats before identity resolution, not after. Consistent casing, trimmed whitespace and normalised phone and postal formats materially improve match rates.',
        'Prefer transforming in Data 360 over requesting changes in the source system; the source usually serves other consumers too.',
      ],
      points_ja: [
        'データストリームの数式項目 — 取り込み時の軽量な行単位の導出。連結、型変換、トリム、単純な条件分岐。',
        'バッチデータ変換 — スケジュール実行のより重い処理。オブジェクト間の結合、集計、フィルタ、再構成。出力は新しい DLO に書き出される。',
        'ストリーミングデータ変換 — 同じ考え方をストリーミングデータに継続的に適用する。',
        '形式の標準化は ID解決の前に行う。大文字小文字の統一、空白の除去、電話番号や郵便番号の正規化は一致率を実質的に押し上げる。',
        'ソースシステムの変更を依頼するより Data 360 側で変換する方を選ぶ。ソースはたいてい他の利用者も抱えている。',
      ],
    },
    {
      heading: 'Zero Copy: federation and sharing',
      heading_ja: 'Zero Copy：連携とデータ共有',
      body:
        'Zero Copy is a named objective and appears throughout the exam. The idea is simple and the consequences are what get tested: the data is not copied into Data 360, so there is no ingestion, no duplicate storage, and no synchronisation lag — but the external platform must be reachable and its compute is used when you query.',
      body_ja:
        'Zero Copy は明示された出題観点で、試験全体に登場します。考え方は単純で、問われるのはその帰結です。データを Data 360 にコピーしないため、取り込みも、重複した保管も、同期の遅延もありません。ただし外部プラットフォームに到達できる必要があり、クエリ時にはその側の計算資源を使います。',
      points: [
        'Query federation — external tables in Snowflake, Google BigQuery, Databricks or Amazon Redshift are queried live and surface in Data 360 as external data lake objects you can map and segment on.',
        'File federation — reference files (such as Iceberg or Parquet in a data lake) without loading them.',
        'Data sharing — the other direction: Data 360 objects and insights are shared out to those platforms, again without copying.',
        'Choose Zero Copy when the data already lives in a supported warehouse, when duplicating it is unacceptable for cost or governance reasons, or when it changes too often to keep synchronised.',
        'Choose ingestion when you need the data available independently of the external system, or when the source is not a supported Zero Copy platform.',
        'Trade-off: federated queries depend on the external platform\'s availability and performance, and each query consumes its compute.',
        'Zero Copy avoids the storage and duplication, not the governance. Consent and access rules still apply to federated data.',
      ],
      points_ja: [
        'クエリ連携（Query Federation）— Snowflake、Google BigQuery、Databricks、Amazon Redshift の外部テーブルをライブでクエリし、Data 360 側には外部データレイクオブジェクトとして現れる。マッピングもセグメントもできる。',
        'ファイル連携（File Federation）— データレイク上の Iceberg や Parquet などのファイルを、読み込まずに参照する。',
        'データ共有（Data Sharing）— 逆方向。Data 360 のオブジェクトやインサイトを、やはりコピーせずにそれらのプラットフォームへ共有する。',
        'Zero Copy を選ぶ場面：データが既に対応ウェアハウスにある、コストやガバナンス上の理由で複製が許されない、変化が速すぎて同期を保てない。',
        '取り込みを選ぶ場面：外部システムと independent にデータを使える必要がある、またはソースが Zero Copy 対応プラットフォームでない。',
        'トレードオフ：連携クエリは外部プラットフォームの可用性と性能に依存し、クエリのたびにその計算資源を消費する。',
        'Zero Copy が回避するのは保管と重複であって、ガバナンスではない。同意やアクセス制御は連携データにも同じく適用される。',
      ],
    },
  ],
}
