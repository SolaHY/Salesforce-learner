export const dataStudy = {
  intro:
    'Grounding is what makes an answer specific to your company rather than generic. There are two shapes of source data and two mechanisms to match: structured records and fields are read through merge fields, and unstructured documents are made searchable through an index and a retriever. This unit also covers the Data 360 pipeline — data lake objects, data model objects, identity resolution and data spaces — because that is where the data comes from.',
  intro_ja:
    'グラウンディングこそが、回答を一般論ではなく自社固有のものにします。ソースデータには2つの形があり、それぞれに対応する仕組みがあります。構造化されたレコードと項目は差し込み項目で読み、非構造化のドキュメントはインデックスとリトリーバーで検索可能にします。この単元では、そのデータの供給元である Data 360 のパイプライン（データレイクオブジェクト、データモデルオブジェクト、ID解決、データスペース）も扱います。',
  sections: [
    {
      heading: 'Two kinds of grounding',
      heading_ja: '2種類のグラウンディング',
      body:
        'Almost every grounding question can be answered by identifying the shape of the source. Records and fields are structured: you know exactly which values you want, so you reference them directly. Documents are unstructured: you do not know in advance which passage is relevant, so you have to search at run time.',
      body_ja:
        'グラウンディングの設問は、ほぼすべてソースの形を見極めることで答えられます。レコードと項目は構造化されており、欲しい値が最初から分かっているので直接参照します。ドキュメントは非構造化で、どの箇所が関連するか事前には分からないため、実行時に検索する必要があります。',
      figure: 'af-grounding-types',
      points: [
        'Structured grounding — merge fields over the record and its related records, resolved live at the moment of generation. Use when the requirement names specific values: current balance, last three transactions, account tier.',
        'Unstructured grounding — retrieval from a search index built over documents. Use when the requirement is about a body of content: policy PDFs, service manuals, twelve thousand knowledge articles.',
        'Volume is the giveaway. A handful of known records → merge fields. A corpus where relevance must be worked out per question → retrieval.',
        'The two are complementary, not alternatives. When an answer needs both a customer record and a library of disclosure PDFs, configure both.',
        'Static text pasted into a template is not grounding. It cannot be customer-specific and it cannot stay current.',
        'Without grounding, the model answers from its own training data. "Based on our documents, not general knowledge" is always a grounding requirement.',
      ],
      points_ja: [
        '構造化グラウンディング — レコードと関連レコードに対する差し込み項目。生成の瞬間にライブで解決される。「現在残高」「直近3件の取引」「取引先ティア」のように具体的な値を指名する要件で使う。',
        '非構造化グラウンディング — ドキュメント上に構築した検索インデックスからの検索。規程PDF、サービスマニュアル、1万2千件のナレッジ記事のような「コンテンツの集合」が対象の要件で使う。',
        '分量が手がかりになる。既知のレコードが数件→差し込み項目。質問ごとに関連性を判定する必要があるコーパス→検索。',
        'この2つは択一ではなく補完関係。顧客レコードと開示PDFライブラリの両方が必要な回答なら、両方を構成する。',
        'テンプレートに貼り付けた固定テキストはグラウンディングではない。顧客ごとの内容にもならず、最新にも保てない。',
        'グラウンディングがなければ、モデルは自身の学習データから答える。「一般知識ではなく自社文書に基づいて」は常にグラウンディングの要件。',
      ],
    },
    {
      heading: 'The retrieval pipeline: ingest, chunk, embed, index, retrieve',
      heading_ja: '検索パイプライン：取り込み・チャンク分割・埋め込み・インデックス化・検索',
      body:
        'Retrieval has a build-time half and a run-time half, and the exam asks you to put the steps in order. At build time the content is prepared and indexed. At run time the relevant pieces are found and inserted into the prompt. This pattern is retrieval-augmented generation.',
      body_ja:
        '検索には構築時と実行時の2つの局面があり、試験では手順を正しい順に並べられるかが問われます。構築時にコンテンツを準備してインデックス化し、実行時に関連する部分を見つけてプロンプトへ差し込みます。この仕組みが検索拡張生成（RAG）です。',
      figure: 'af-rag-pipeline',
      points: [
        'Build time: ingest the content → chunk it into passages → embed the chunks → index them. Nothing is retrievable until this is done.',
        'Run time: retrieve the most relevant chunks for the question → include them in the prompt → the model generates its answer from them.',
        'Chunking splits long documents into passages. It is a trade-off: small chunks are precise but may split an answer in half; large chunks carry more context but bring more surrounding noise.',
        'Overlap means adjacent chunks share some text. It is the specific remedy when a procedure or list straddles a chunk boundary and gets cut in half.',
        'Vector (semantic) index — matches on meaning, so paraphrases and synonyms still retrieve the right passage. Use it when users phrase things differently from the source material.',
        'Keyword index — matches literal terms. Still useful when exact identifiers, part numbers or codes must match precisely.',
        'Retriever — the component that decides which chunks are eligible and ranks them. A custom retriever can apply a metadata filter, which is how you restrict retrieval by product line, review date, region or status.',
      ],
      points_ja: [
        '構築時：コンテンツを取り込む→パッセージにチャンク分割する→チャンクを埋め込む→インデックス化する。これが完了するまで何も検索できない。',
        '実行時：質問に対して最も関連するチャンクを検索する→プロンプトに含める→モデルがそれをもとに回答を生成する。',
        'チャンク分割は長い文書をパッセージに分ける処理。トレードオフがあり、小さいチャンクは精密だが回答を分断しうる。大きいチャンクは文脈を多く含むが周辺のノイズも増える。',
        'オーバーラップとは隣り合うチャンクがテキストを共有すること。手順やリストがチャンク境界をまたいで途中で切れる場合の的確な対処。',
        'ベクトル（セマンティック）インデックス — 意味で一致するため、言い換えや同義語でも正しいパッセージを引ける。ユーザーの言い回しが原文と異なる場合に使う。',
        'キーワードインデックス — 文字どおりの語で一致する。型番、部品番号、コードなど厳密な一致が必要な場合には依然として有用。',
        'リトリーバー — どのチャンクが対象となるかを決め、順位付けするコンポーネント。カスタムリトリーバーはメタデータフィルターを適用でき、製品ライン・レビュー期限・地域・ステータスによる絞り込みはこれで行う。',
      ],
    },
    {
      heading: 'Diagnosing retrieval problems',
      heading_ja: '検索の問題を切り分ける',
      body:
        'Several exam questions describe a retrieval symptom and ask for the fix. They are easy marks once you can map symptom to cause, because each symptom has exactly one appropriate remedy and the distractors are the remedies for the other symptoms.',
      body_ja:
        '検索の症状を提示して対処を問う設問がいくつも出ます。症状と原因を対応づけられれば確実に得点できます。各症状には適切な対処がちょうど1つあり、誤答の選択肢は他の症状に対する対処だからです。',
      points: [
        'Right kind of content but about the wrong subject (wrong vehicle line, wrong region) → scoping problem → metadata plus a filter in a custom retriever.',
        'Right subject but the passage is too short to contain a complete answer → increase chunk size so each chunk carries more context.',
        'Answers cut off mid-procedure because steps span a boundary → increase the overlap (or the chunk size) so the steps stay together.',
        'Users phrase questions differently from the documentation and relevant passages are missed → use a vector index rather than keyword matching.',
        'Only current documents should be eligible → store the review date as metadata and filter on it in the retriever. Do not delete content that is still needed for older cases.',
        'Never solve a data-scope problem with a prompt instruction. Telling the model to "prefer recent content" is not enforcement; scope belongs to the retriever.',
      ],
      points_ja: [
        'コンテンツの種類は正しいが主題が違う（車種ラインが違う、地域が違う）→絞り込みの問題→メタデータ＋カスタムリトリーバーのフィルター。',
        '主題は正しいがパッセージが短すぎて回答が完結しない→チャンクサイズを大きくし、各チャンクがより多くの文脈を持つようにする。',
        '手順が境界をまたぐため回答が途中で切れる→オーバーラップ（またはチャンクサイズ）を大きくし、手順がまとまって残るようにする。',
        'ユーザーの質問の言い回しがドキュメントと異なり、関連するパッセージを取りこぼす→キーワード一致ではなくベクトルインデックスを使う。',
        '有効な文書だけを対象にしたい→レビュー期限をメタデータとして保持し、リトリーバーでフィルターする。旧機種の対応に必要なコンテンツを削除してはいけない。',
        'データ範囲の問題をプロンプト指示で解こうとしない。「新しいコンテンツを優先せよ」と伝えても強制にはならない。範囲はリトリーバーの担当。',
      ],
    },
    {
      heading: 'Agentforce Data Library vs building it yourself',
      heading_ja: 'Agentforce Data Library と自前構築の使い分け',
      body:
        'There are two legitimate routes to unstructured grounding, and the exam tests whether you can tell which one a requirement calls for. Match the amount of configuration to what is actually needed.',
      body_ja:
        '非構造化グラウンディングには正当な経路が2つあり、要件がどちらを求めているかを見分けられるかが問われます。構成の手間は、実際に必要なものに見合わせます。',
      points: [
        'Agentforce Data Library — the packaged path. Upload the content and it handles ingestion, chunking, indexing and retrieval configuration for you.',
        'Choose the Data Library when the requirement emphasises speed, or explicitly says "without hand-configuring ingestion, chunking and index settings", and there are no special filtering or ranking needs.',
        'Build it yourself — data stream, index and a custom retriever — when you need a metadata filter, custom ranking, or one index shared across several use cases.',
        'Neither route is "more correct". Over-engineering a simple FAQ upload is as wrong as trying to force a filtered, versioned corpus through the packaged path.',
      ],
      points_ja: [
        'Agentforce Data Library — まとめて用意された経路。コンテンツをアップロードすれば、取り込み・チャンク分割・インデックス化・検索設定を引き受けてくれる。',
        '要件が速さを強調している場合や、「取り込み・チャンク分割・インデックス設定を手作業で構成せずに」と明記されており、特別なフィルターやランキングが不要な場合は Data Library を選ぶ。',
        '自前構築（データストリーム、インデックス、カスタムリトリーバー）は、メタデータフィルター、独自のランキング、複数用途で共有する1つのインデックスが必要な場合に選ぶ。',
        'どちらが「より正しい」ということはない。単純なFAQのアップロードを過剰設計するのは、フィルターやバージョン管理が必要なコーパスを既製経路に押し込むのと同じくらい誤り。',
      ],
    },
    {
      heading: 'The Data 360 pipeline: DLO, DMO and mapping (deep dive)',
      heading_ja: 'Data 360 のパイプライン：DLO・DMO・マッピング（深掘り）',
      body:
        'Data brought into Data 360 follows a fixed path, and the exam asks about both the structures and the reason the mapping step exists. Ingested data first mirrors its source exactly; it only becomes useful to downstream features once it has been harmonised into a standard model.',
      body_ja:
        'Data 360 に取り込まれたデータは決まった経路をたどります。試験では構造そのものと、マッピングという工程が存在する理由の両方が問われます。取り込まれたデータはまずソースの形をそのまま写し、標準モデルへ調和されて初めて下流の機能から使えるようになります。',
      figure: 'af-data360-pipeline',
      points: [
        'Data lake object (DLO) — the landing structure. It mirrors the source file or system exactly, so every source looks different from every other.',
        'Data model object (DMO) — the standard, harmonised model. Mapping a DLO to a DMO is what turns source-specific shapes into a consistent structure.',
        'Why mapping exists: downstream features — identity resolution, segmentation, calculated insights, retrievers — all expect the harmonised model. They cannot work against each source\'s idiosyncratic shape.',
        'Identity resolution — matches records describing the same individual across sources and reconciles them into one unified profile. This is what fixes "the same patient exists as three contacts".',
        'Data spaces — partition data within a single Data 360 instance so brands, regions or business units can use it independently. This is the opposite of identity resolution and the two are often needed together.',
        'Calculated insight — a derived metric computed over harmonised data. It is not a landing structure and it does not make documents retrievable.',
        'Data 360 configuration is environment-level setup. It does not travel with a metadata deployment and must be established in each org — a very common deployment failure (see the lifecycle unit).',
      ],
      points_ja: [
        'データレイクオブジェクト（DLO） — 着地先の構造。ソースのファイルやシステムをそのまま写すため、ソースごとに形が異なる。',
        'データモデルオブジェクト（DMO） — 標準化・調和されたモデル。DLO を DMO へマッピングすることで、ソース固有の形が一貫した構造に変わる。',
        'マッピングが存在する理由：下流機能（ID解決、セグメント化、計算済みインサイト、リトリーバー）はいずれも調和済みモデルを前提としており、ソースごとの独自の形のままでは動作できない。',
        'ID解決 — 複数ソースにまたがる同一人物のレコードを突き合わせ、1つの統合プロファイルに調整する。「同じ患者が3件の取引先責任者として存在する」を解決するのがこれ。',
        'データスペース — 単一の Data 360 インスタンス内でデータを区切り、ブランド・地域・事業部が独立して利用できるようにする。ID解決とは正反対の機能で、両者は併用されることも多い。',
        '計算済みインサイト — 調和済みデータ上で算出する派生指標。着地構造ではなく、ドキュメントを検索可能にするものでもない。',
        'Data 360 の構成は環境レベルのセットアップ。メタデータ展開では移送されず、各組織で構築する必要がある（展開時の失敗として非常に多い。ライフサイクル単元を参照）。',
      ],
    },
  ],
}
