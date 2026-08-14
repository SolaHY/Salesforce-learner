// 学習教材（後半3単元）：統合と名寄せ / 拡張・共有・分析 / セグメントと活用

export const unificationStudy = {
  intro:
    'Harmonisation and unification are two separate jobs that the exam often blends into one scenario. Harmonisation is structural: taking a DLO with whatever column names the source happened to use and mapping it onto a Data Model Object so that every source speaks the same language. Unification is about people: deciding that these five rows are one human being. Harmonisation must happen first — identity resolution runs on mapped DMOs, not on raw DLOs.',
  intro_ja:
    '調和（harmonisation）と統合（unification）は別々の作業ですが、試験では1つのシナリオに混ぜて出されます。調和は構造の話です。ソースが偶々使っていた列名のままの DLO を Data Model Object にマッピングし、どのソースも同じ言葉を話すようにします。統合は人の話です。この5行が1人の人間だと判断します。順序として調和が先です。ID解決はマッピング済みの DMO に対して実行され、生の DLO には対して実行されません。',
  sections: [
    {
      heading: 'DLO, DMO, and mapping',
      heading_ja: 'DLO・DMO・マッピング',
      body:
        'Keep the three terms strictly separate; a large share of exam confusion comes from blurring them. The DLO is the raw landing shape, the DMO is the shared canonical shape, and mapping is the link between the two. Nothing downstream — segmentation, insights, activation — works on the DLO directly.',
      body_ja:
        '3つの用語は厳密に分けてください。試験での混乱の多くはここが曖昧なことから来ます。DLO は取り込んだ生の形、DMO は共通の正規形、マッピングはその2つをつなぐものです。下流の処理（セグメンテーション、インサイト、アクティベーション）は DLO を直接扱いません。',
      points: [
        'Data Lake Object (DLO) — the raw ingested data, one per data stream, with the source\'s own field names.',
        'Data Model Object (DMO) — the harmonised object in the Customer 360 data model. Standard DMOs include Individual, Contact Point Email, Contact Point Phone, Contact Point Address, Party Identification, Sales Order and Account.',
        'Mapping — connecting DLO fields to DMO fields. Until a DLO is mapped, its data cannot be unified, segmented or activated.',
        'Custom DMOs exist for data the standard model does not cover, but prefer standard DMOs; they are what the rest of the platform and its packaged features expect.',
        'Contact points are separate DMOs on purpose: one individual can hold several emails, phones and addresses, each with its own consent state.',
        'Party Identification holds source system identifiers (loyalty number, CRM id, order system id) and is heavily used in matching.',
      ],
      points_ja: [
        'Data Lake Object（DLO）— 取り込んだ生データ。データストリーム1つにつき1つで、ソース側の項目名のまま。',
        'Data Model Object（DMO）— Customer 360 データモデル上の調和済みオブジェクト。標準 DMO には Individual、Contact Point Email、Contact Point Phone、Contact Point Address、Party Identification、Sales Order、Account などがある。',
        'マッピング — DLO の項目を DMO の項目に対応づける作業。DLO はマッピングされるまで、統合もセグメント化もアクティベートもできない。',
        '標準モデルで足りないデータにはカスタム DMO も作れるが、まず標準 DMO を選ぶ。プラットフォームの他の機能やパッケージ機能が前提としているのは標準 DMO。',
        'Contact Point が別 DMO なのは意図的。1人が複数のメール・電話・住所を持ち、それぞれに固有の同意状態があるため。',
        'Party Identification はソースシステムの識別子（ロイヤルティ番号、CRM の ID、注文システムの ID）を保持し、マッチングで多用される。',
      ],
    },
    {
      heading: 'Identity resolution: the ruleset',
      heading_ja: 'ID解決：ルールセット',
      body:
        'An identity resolution ruleset is a pair of rule types applied in order. Match rules decide which source records are the same person; reconciliation rules decide, once merged, which value wins on the unified profile. Keeping the two straight is the single highest-value thing you can memorise in this unit — questions are frequently designed so that the wrong answers are the right rule type applied to the wrong question.',
      body_ja:
        'ID解決ルールセットは、順番に適用される2種類のルールの組です。一致ルール（match rules）がどのソースレコードを同一人物とみなすかを決め、調整ルール（reconciliation rules）が結合後に統合プロファイル上でどの値を採用するかを決めます。この2つを取り違えないことが、この単元で最も価値の高い暗記事項です。設問はしばしば「正しいルール種別を誤った問いに当てはめた」選択肢を誤答として用意します。',
      points: [
        'Match rules run first and answer: are these the same individual?',
        'Reconciliation rules run second and answer: which of the conflicting values do we display?',
        'The output is a Unified Individual profile, linked to the source profiles that formed it.',
        'Rulesets are scoped to a data space, and run on a schedule — unification is not instantaneous.',
        'A ruleset can be run against a sample first to review the effect before committing.',
        'Changing match rules re-resolves the profiles, which can merge or split existing unified individuals. Treat ruleset changes as a governed change, not a quick edit.',
      ],
      points_ja: [
        '一致ルールが先に実行され、「これらは同一人物か」に答える。',
        '調整ルールが次に実行され、「衝突する値のうちどれを表示するか」に答える。',
        '出力は Unified Individual（統合プロファイル）で、それを構成したソースプロファイルに紐づく。',
        'ルールセットはデータスペース単位で、スケジュール実行される。統合は即時ではない。',
        '本適用の前にサンプルに対して実行し、影響を確認できる。',
        '一致ルールを変更するとプロファイルが再解決され、既存の統合プロファイルが結合したり分割したりする。ルールセットの変更は軽い編集ではなく統制された変更として扱う。',
      ],
    },
    {
      heading: 'Match rules in detail',
      heading_ja: '一致ルールの詳細',
      body:
        'Match rules are where over-matching and under-matching are decided, and the exam loves the symptoms of both. Over-matching merges different people into one profile; under-matching leaves the same person as several profiles. Read the symptom in the scenario and adjust in the correct direction.',
      body_ja:
        '一致ルールは過剰一致と不足一致が決まる場所で、試験はその両方の症状を好んで出題します。過剰一致は別人を1つのプロファイルに結合し、不足一致は同一人物を複数のプロファイルのまま残します。シナリオに書かれた症状を読み、正しい方向に調整してください。',
      points: [
        'Exact match — the values must be identical. Precise, but defeated by formatting differences.',
        'Fuzzy / normalised match — normalises case, punctuation and spacing before comparing, and tolerates common name variants. Higher match rate, higher risk of false merges.',
        'Party identification match — matches on a source system identifier such as a loyalty number. The most reliable signal when it is available.',
        'Rules combine criteria: for example email exact, or (first name fuzzy AND last name exact AND postal code exact).',
        'Symptom "one person appears as several profiles" → under-matching. Add a rule, loosen to fuzzy, or standardise the data before matching.',
        'Symptom "two different people merged" → over-matching. Tighten the rule, add a discriminating criterion, or stop matching on a weak field.',
        'Never match on a non-identifying field alone. Matching on surname or postal code by itself will merge families and housemates.',
        'Data quality is upstream of match quality: normalise formats at ingest and the same rules will perform better.',
      ],
      points_ja: [
        '完全一致（Exact）— 値が同一であることを要求する。厳密だが、書式の違いに弱い。',
        'あいまい一致／正規化一致（Fuzzy / Normalised）— 比較前に大文字小文字・記号・空白を正規化し、よくある名前の異形も許容する。一致率は上がるが誤結合のリスクも上がる。',
        'Party Identification による一致 — ロイヤルティ番号などソースシステムの識別子で照合する。利用できるなら最も信頼できるシグナル。',
        'ルールは条件を組み合わせる。例：メールが完全一致、または（名があいまい一致 かつ 姓が完全一致 かつ 郵便番号が完全一致）。',
        '症状「1人が複数のプロファイルとして現れる」→ 不足一致。ルールを追加する、あいまい一致に緩める、または照合前にデータを標準化する。',
        '症状「別人2人が結合された」→ 過剰一致。ルールを厳しくする、識別力のある条件を追加する、弱い項目での照合をやめる。',
        '識別性のない項目単独で照合しないこと。姓だけ、郵便番号だけで照合すると家族や同居人が結合される。',
        'データ品質は一致品質の上流にある。取り込み時に書式を正規化すれば、同じルールでも成績が上がる。',
      ],
    },
    {
      heading: 'Reconciliation rules',
      heading_ja: '調整ルール',
      body:
        'Once records are merged, the profile still has to show one value per attribute. Reconciliation rules pick it. Note the important limitation: reconciliation applies to attributes on the unified profile, and multi-valued things like contact points are not collapsed to one — an individual legitimately keeps several emails.',
      body_ja:
        'レコードが結合された後も、プロファイルは属性ごとに1つの値を示す必要があります。それを選ぶのが調整ルールです。重要な制限に注意してください。調整は統合プロファイル上の属性に適用されるものであり、Contact Point のような多値のものは1つに畳まれません。1人が複数のメールを持つのは正当だからです。',
      points: [
        'Most Recent — take the value from the most recently updated source record. The usual default for changeable attributes like address.',
        'Most Frequent — take the value that appears most often across sources. Useful when one system is known to be occasionally wrong.',
        'Source Priority / Source Sequence — take the value from the most trusted system first. The right answer whenever the scenario names an authoritative system of record.',
        'A scenario that says "the ERP is the system of record for billing address" is describing source priority, not recency.',
        'Reconciliation decides display values; it does not decide whether records merge. That was the match rules.',
        'Contact points are not reconciled away: a unified individual can have many emails and phones, each carrying its own consent.',
      ],
      points_ja: [
        'Most Recent（最新）— 最後に更新されたソースレコードの値を採る。住所のように変化する属性の一般的な既定。',
        'Most Frequent（最頻）— ソース全体で最も多く現れる値を採る。特定のシステムが時々誤ることが分かっている場合に有効。',
        'Source Priority／Source Sequence（ソース優先度）— 最も信頼できるシステムの値を優先する。シナリオが正となるシステムを名指ししているときの正解。',
        '「請求先住所は ERP が正」と書かれたシナリオはソース優先度の話であり、最新性の話ではない。',
        '調整が決めるのは表示する値であって、レコードが結合するかどうかではない。それは一致ルールの役割。',
        'Contact Point は調整で消えない。統合プロファイルは複数のメールや電話を持ち得て、それぞれが固有の同意を伴う。',
      ],
    },
  ],
}

export const insightsStudy = {
  intro:
    'Once profiles are unified, this unit is about getting value out of them: deriving metrics, making the data readable fast, exposing it to the people and systems that need it, and feeding AI. The most heavily tested distinction is calculated versus streaming insights, and the reason is that they are chosen by latency requirement, not by what you want to compute.',
  intro_ja:
    'プロファイルが統合された後、この単元はそこから価値を取り出す話になります。指標を導出し、データを高速に読めるようにし、必要な人とシステムに公開し、AI に供給する。最も出題される区別は Calculated Insights と Streaming Insights で、その理由は「何を計算したいか」ではなく「どれだけ速く必要か」で選ぶものだからです。',
  sections: [
    {
      heading: 'Calculated vs streaming insights',
      heading_ja: 'Calculated Insights と Streaming Insights',
      body:
        'Both produce metrics on top of the data model, and the exam separates them by timeliness and by the shape of the computation. Read the scenario for a latency requirement: if the value decays in minutes, it is streaming; if it is a stable measure of long-term behaviour, it is calculated.',
      body_ja:
        'どちらもデータモデルの上に指標を作りますが、試験は「即時性」と「計算の形」で区別します。シナリオから遅延要件を読み取ってください。価値が数分で失われるなら Streaming、長期的な行動を表す安定した指標なら Calculated です。',
      points: [
        'Calculated Insight — batch, defined in SQL with measures, dimensions and filters, refreshed on a schedule. For stable, reusable metrics: lifetime value, order count, average basket size, days since last purchase.',
        'Streaming Insight — near-real-time, computed continuously over engagement data using time windows. For metrics whose value decays quickly: cart abandonment in the last 30 minutes, sessions in the last hour.',
        'Streaming insights can trigger data actions, which is how a real-time metric becomes a real-time response.',
        'Both can be used in segmentation and in activation attributes.',
        'A scenario with "within minutes" or "while the customer is still on the site" is streaming. "Top 10% of customers by lifetime spend" is calculated.',
        'Calculated insights consume credits when they refresh, so schedule them to the business need rather than as often as possible.',
      ],
      points_ja: [
        'Calculated Insight — バッチ処理。SQL で measure・dimension・filter を定義し、スケジュールで再計算する。生涯価値、注文回数、平均購入額、最終購入からの日数など、安定して再利用する指標向け。',
        'Streaming Insight — ニアリアルタイム。エンゲージメントデータに対し時間ウィンドウで連続的に計算する。直近30分のカート放棄、直近1時間のセッション数など、価値がすぐ失われる指標向け。',
        'Streaming Insight は Data Action を起動できる。リアルタイムの指標がリアルタイムの対応に変わるのはこの経路。',
        'どちらもセグメンテーションとアクティベーションの属性に利用できる。',
        '「数分以内に」「顧客がまだサイトにいるうちに」とあれば Streaming。「生涯支出の上位10%」なら Calculated。',
        'Calculated Insight は再計算のたびにクレジットを消費するため、できるだけ頻繁にではなく業務上の必要に合わせてスケジュールする。',
      ],
    },
    {
      heading: 'Data graphs',
      heading_ja: 'Data Graph',
      body:
        'A data graph pre-joins and denormalises related DMOs into a single materialised view, so a consumer can read a whole customer context in one low-latency call instead of traversing a normalised model. This is the mechanism behind fast personalisation and behind grounding for generative AI.',
      body_ja:
        'Data Graph は関連する DMO をあらかじめ結合・非正規化して1つのマテリアライズドビューにまとめます。正規化モデルを辿る代わりに、1回の低遅延な呼び出しで顧客コンテキスト全体を読めるようになります。高速なパーソナライゼーションと、生成AI のグラウンディングを支えているのがこの仕組みです。',
      points: [
        'Purpose: fewer calls and near-real-time response, achieved by pre-computing the join.',
        'Built from a primary DMO plus its related objects — for example Individual with its contact points, orders and insights.',
        'The main consumers are generative AI grounding, retrievers, personalisation engines and API callers that need one fast read.',
        'Trade-off: the view is materialised, so it must be refreshed; it is not the place for data that must be transactionally current to the second.',
        'If a question asks how to give an agent or a web experience the full customer context quickly, the answer is usually a data graph.',
      ],
      points_ja: [
        '目的：結合を事前計算しておくことで、呼び出し回数を減らしニアリアルタイムの応答を得る。',
        '起点となる DMO とその関連オブジェクトから作る。例：Individual とその Contact Point、注文、インサイト。',
        '主な利用者は生成AIのグラウンディング、Retriever、パーソナライゼーションエンジン、1回の高速読み取りが必要な API 呼び出し元。',
        'トレードオフ：マテリアライズドビューなので更新が必要。秒単位でトランザクション整合が必要なデータの置き場所ではない。',
        'エージェントや Web 体験に顧客コンテキスト全体を素早く渡す方法を問われたら、答えはたいてい Data Graph。',
      ],
    },
    {
      heading: 'Referencing Data 360 from other systems',
      heading_ja: '他システムから Data 360 を参照する',
      body:
        'Unified data is only useful where the work happens. The exam expects you to know the ways it surfaces without being copied around, and to prefer them over exporting.',
      body_ja:
        '統合データは、業務が行われる場所で使えて初めて役に立ちます。試験では、データを複製せずに表出させる手段を知っていること、そしてエクスポートよりそれらを選ぶことが期待されます。',
      points: [
        'Data Cloud related lists and profile components on a Lightning record page — show unified engagement and profile data beside the CRM record, without copying it in.',
        'Copy fields / enrichments — bring a small number of Data 360 attributes onto a CRM object when they must be filterable or usable in native automation.',
        'Query API and Connect API — programmatic access for external applications.',
        'Data sharing (Zero Copy outbound) — expose Data 360 objects to Snowflake, BigQuery or Databricks without copying.',
        'Prefer surfacing over exporting. Exporting creates a second copy that immediately begins to drift and re-fragments the customer view you just unified.',
      ],
      points_ja: [
        'Lightning レコードページの Data Cloud 関連リストとプロファイルコンポーネント — CRM レコードの横に統合済みのエンゲージメントとプロファイルを表示する。コピーは伴わない。',
        'Copy Field／エンリッチメント — 絞り込みや標準の自動化で使う必要がある少数の Data 360 属性を CRM オブジェクト側に持ってくる。',
        'Query API・Connect API — 外部アプリケーション向けのプログラム的アクセス。',
        'データ共有（Zero Copy の外向き）— Data 360 のオブジェクトを Snowflake、BigQuery、Databricks へコピーせず公開する。',
        'エクスポートより表出を選ぶ。エクスポートは2つ目のコピーを作り、それは即座にずれ始めて、せっかく統合した顧客像を再び分断する。',
      ],
    },
    {
      heading: 'Reports, dashboards and analysis',
      heading_ja: 'レポート・ダッシュボード・分析',
      body:
        'Data 360 data can be analysed without leaving it. Know which tool fits which need, and note that standard CRM reports do not run over Data 360 objects the way they run over CRM objects.',
      body_ja:
        'Data 360 のデータは、そこから出さずに分析できます。用途ごとの適切なツールを把握してください。なお、標準の CRM レポートは CRM オブジェクトに対するようには Data 360 オブジェクトに対して動きません。',
      points: [
        'CRM Analytics can read Data 360 objects directly for dashboards over unified data.',
        'Tableau connects to Data 360 for exploratory and enterprise analysis.',
        'Data Explorer and the Query Editor cover ad-hoc inspection and SQL analysis inside the platform.',
        'Calculated insights are frequently the right building block for a dashboard metric — compute once, reuse in reporting, segmentation and activation.',
        'Exporting to a spreadsheet to analyse unified data is almost always the wrong answer.',
      ],
      points_ja: [
        'CRM Analytics は Data 360 オブジェクトを直接読み、統合データに対するダッシュボードを作れる。',
        'Tableau は Data 360 に接続し、探索的分析やエンタープライズ分析に使える。',
        'Data Explorer とクエリエディタは、プラットフォーム内でのその場の確認と SQL 分析を担う。',
        'ダッシュボードの指標には Calculated Insight が適した部品になることが多い。1度計算してレポート・セグメント・アクティベーションで使い回せる。',
        '統合データを分析するために表計算ソフトへエクスポートするのは、ほぼ常に誤答。',
      ],
    },
    {
      heading: 'Predictive and generative AI tooling',
      heading_ja: '予測AI・生成AIのツール',
      body:
        'The exam guide names this explicitly. The two paths consume Data 360 differently: predictive models are trained or connected and write predictions back as data; generative models are grounded at prompt time and write nothing back.',
      body_ja:
        '試験ガイドが明示している観点です。2つの道筋は Data 360 の使い方が異なります。予測モデルは学習または接続され、予測結果をデータとして書き戻します。生成モデルはプロンプト実行時にグラウンディングされ、何も書き戻しません。',
      points: [
        'Einstein Studio / Model Builder — build a predictive model on Data 360 data, or connect an external one.',
        'Bring Your Own Model (BYOM) — connect a model hosted in Amazon SageMaker, Google Vertex AI or Databricks. The data does not leave Data 360 to train or score.',
        'Prediction output lands as a DMO field, which means you can segment and activate on a predicted score exactly as on any other attribute.',
        'Generative grounding — retrievers search indexed content and data graphs supply structured context, together forming retrieval-augmented generation.',
        'Unstructured content (documents, articles, transcripts) is chunked and placed in a search index so retrievers can use it.',
        'Agentforce agents ground on Data 360 through this same retriever and data graph path.',
      ],
      points_ja: [
        'Einstein Studio／Model Builder — Data 360 のデータで予測モデルを作る、または外部モデルを接続する。',
        'BYOM（Bring Your Own Model）— Amazon SageMaker、Google Vertex AI、Databricks でホストされたモデルを接続する。学習やスコアリングのためにデータが Data 360 の外へ出ることはない。',
        '予測結果は DMO の項目として着地する。つまり予測スコアを他の属性と同じようにセグメント化・アクティベートできる。',
        '生成AI のグラウンディング — Retriever がインデックス済みコンテンツを検索し、Data Graph が構造化コンテキストを供給する。両者で RAG を構成する。',
        '非構造化コンテンツ（文書、記事、通話記録）は分割して検索インデックスに置かれ、Retriever が利用できるようになる。',
        'Agentforce のエージェントも、この同じ Retriever と Data Graph の経路で Data 360 にグラウンディングする。',
      ],
    },
  ],
}

export const activationStudy = {
  intro:
    'This is the highest-weighted unit at 20%, and it is where the platform stops describing the customer and starts acting on them. The chain is fixed and worth memorising: build a segment on unified data, publish it, activate it to an activation target, and the target does something with the members. Separately, data actions fire on events rather than on segment membership. Most errors on this unit come from confusing those two paths.',
  intro_ja:
    'ここが配点20%で最大の単元であり、プラットフォームが顧客を「記述する」段階から「働きかける」段階へ移る場所です。連鎖は固定なので覚える価値があります。統合データの上にセグメントを作り、公開し、アクティベーションターゲットへアクティベートすると、ターゲット側がメンバーに対して何かを行う。これとは別に、Data Action はセグメントの所属ではなくイベントで発火します。この単元の誤りの多くは、この2経路の混同から生まれます。',
  sections: [
    {
      heading: 'Segmentation',
      heading_ja: 'セグメンテーション',
      body:
        'A segment is a saved set of criteria over the data model that resolves to a population. It is built on a segmentation-eligible DMO — normally the Unified Individual, which is why unification has to work before segmentation is meaningful.',
      body_ja:
        'セグメントは、データモデルに対する条件を保存したもので、実行すると母集団に解決されます。セグメント化可能な DMO の上に作られ、通常は Unified Individual です。だからこそ、統合が機能していなければセグメンテーションに意味がありません。',
      points: [
        'Criteria can combine profile attributes, engagement history, calculated insights and related attributes.',
        'Segments are built on a chosen DMO; the Unified Individual is the usual base for people-targeting.',
        'Publishing refreshes the membership. Publish on a schedule for routine campaigns, or on demand when timing matters.',
        'Membership is recalculated at publish time — a segment is not continuously live, so "the list looks out of date" is normally a publish schedule question.',
        'Nested and related segments let you reuse a definition instead of restating criteria in several places.',
        'Segments are scoped to a data space.',
        'Narrow criteria before adding more data. A segment that runs over unnecessary attributes costs more and is harder to explain.',
      ],
      points_ja: [
        '条件はプロファイル属性、エンゲージメント履歴、Calculated Insight、関連属性を組み合わせられる。',
        'セグメントは選んだ DMO の上に作る。人を対象にする場合の通常の基点は Unified Individual。',
        '公開（publish）でメンバーシップが更新される。定常的なキャンペーンはスケジュール公開、タイミングが重要なときはオンデマンド公開。',
        'メンバーシップは公開時に再計算される。セグメントは常時ライブではないため、「リストが古い」は通常は公開スケジュールの問題。',
        'ネストしたセグメントや関連セグメントを使うと、複数箇所で条件を書き直さずに定義を再利用できる。',
        'セグメントはデータスペース単位。',
        'データを足す前に条件を絞る。不要な属性にまたがって実行されるセグメントはコストが高く、説明も難しくなる。',
      ],
    },
    {
      heading: 'Activation and activation targets',
      heading_ja: 'アクティベーションとアクティベーションターゲット',
      body:
        'An activation sends a published segment, with a chosen set of attributes, to an activation target. The target is the destination system; the activation is the configured delivery. Two objects, two steps — questions often test that you know the target must exist first.',
      body_ja:
        'アクティベーションは、公開済みセグメントを、選んだ属性とともにアクティベーションターゲットへ送ります。ターゲットは宛先システム、アクティベーションは設定された配信です。オブジェクトが2つ、手順が2つ。ターゲットを先に作る必要があることを知っているかが、しばしば問われます。',
      points: [
        'Create the activation target first (the destination), then the activation (what goes there and how often).',
        'Common targets: Marketing Cloud Engagement, Marketing Cloud Personalization, advertising audiences (Google, Meta, Amazon), Salesforce CRM, Amazon S3 and SFTP file drops.',
        'You choose which attributes accompany the members. Send the minimum the destination needs — this is both a governance and a cost principle.',
        'Related attributes let you include data from related objects, such as the most recent order, alongside the profile.',
        'Activations run when the segment publishes, so activation freshness is bounded by publish frequency.',
        'A common troubleshooting cause for "fewer members arrived than expected" is consent filtering or a missing required attribute on some profiles.',
      ],
      points_ja: [
        '先にアクティベーションターゲット（宛先）を作り、次にアクティベーション（何を、どの頻度で送るか）を作る。',
        '代表的なターゲット：Marketing Cloud Engagement、Marketing Cloud Personalization、広告オーディエンス（Google、Meta、Amazon）、Salesforce CRM、Amazon S3 や SFTP へのファイル出力。',
        'メンバーに添える属性を選ぶ。宛先が必要とする最小限を送る。ガバナンスの原則であると同時にコストの原則。',
        '関連属性を使うと、直近の注文など関連オブジェクトのデータをプロファイルと一緒に含められる。',
        'アクティベーションはセグメントの公開時に実行されるため、鮮度は公開頻度が上限になる。',
        '「想定より少ない人数しか届かない」の代表的な原因は、同意によるフィルタか、一部プロファイルでの必須属性の欠落。',
      ],
    },
    {
      heading: 'Consent at activation',
      heading_ja: 'アクティベーション時の同意',
      body:
        'This is where the ethics objective becomes a configuration question. Consent is modelled as data on contact points, and the correct design filters on it automatically rather than trusting a person to remember which list is which.',
      body_ja:
        '倫理の観点が設定の問題になるのがここです。同意は Contact Point 上のデータとしてモデル化され、正しい設計は「どのリストがどれか」を人が覚えていることに頼らず、自動的に同意で絞り込みます。',
      points: [
        'Consent lives with the contact point, not with the person as a whole — someone may consent by email and not by SMS.',
        'Filter on consent inside the segment or the activation so that an opted-out individual cannot be sent regardless of who runs it.',
        'Suppression segments are the standard pattern for excluding a population from targeting.',
        'A manual process — "tell the marketer to exclude them" — is always the wrong answer.',
        'Consent applies to federated Zero Copy data exactly as it does to ingested data.',
      ],
      points_ja: [
        '同意は人単位ではなく Contact Point に紐づく。メールには同意していても SMS には同意していない、ということがある。',
        'セグメントまたはアクティベーションの内側で同意により絞り込み、誰が実行してもオプトアウト済みの人が送信対象にならないようにする。',
        '対象から母集団を除外する標準的な手段はサプレッションセグメント。',
        '「マーケターに除外するよう伝える」といった手作業のプロセスは常に誤答。',
        '同意は、取り込んだデータと同じく Zero Copy の連携データにも適用される。',
      ],
    },
    {
      heading: 'Data actions and flows',
      heading_ja: 'Data Action とフロー',
      body:
        'Activation is population-shaped and scheduled; data actions are event-shaped and immediate. When a scenario describes a single customer doing a single thing that must trigger a response now, you are in data action territory, not segmentation.',
      body_ja:
        'アクティベーションは母集団の形をしていてスケジュール実行、Data Action はイベントの形をしていて即時です。1人の顧客が1つの行動をとり、それに今すぐ反応する必要がある——そう書かれたシナリオは、セグメンテーションではなく Data Action の領域です。',
      points: [
        'A data action sends an event when something happens on a DMO, a calculated insight or a streaming insight.',
        'Data action targets: Platform Event, Webhook, and Marketing Cloud.',
        'Platform Event is the route into Salesforce automation — a platform-event-triggered flow then does the work in the org.',
        'Webhook is the route to an external system that is not Salesforce.',
        'Data Cloud-triggered flows run automation directly from Data 360 changes, and are the usual way to create or update CRM records from unified data.',
        'Invocable actions let a flow query Data 360 mid-run, for example to read a unified attribute before deciding a branch.',
        'Segment plus activation for "send this population a campaign". Data action or triggered flow for "when this happens, do that".',
      ],
      points_ja: [
        'Data Action は、DMO・Calculated Insight・Streaming Insight で何かが起きたときにイベントを送る。',
        'Data Action のターゲット：プラットフォームイベント、Webhook、Marketing Cloud。',
        'プラットフォームイベントが Salesforce の自動化への入口。プラットフォームイベント起動フローが組織側で処理を行う。',
        'Webhook は Salesforce 以外の外部システムへの経路。',
        'Data Cloud 起動フローは Data 360 の変更から直接自動化を動かす。統合データから CRM レコードを作成・更新する通常の手段。',
        'Invocable Action を使うと、フローの実行中に Data 360 を照会できる。分岐の判断前に統合済みの属性を読む、といった使い方。',
        '「この母集団にキャンペーンを送る」ならセグメント＋アクティベーション。「これが起きたらあれをする」なら Data Action か起動フロー。',
      ],
    },
    {
      heading: 'Acting on data inside Salesforce',
      heading_ja: 'Salesforce 内でデータを行動につなげる',
      body:
        'The final objective is about closing the loop inside the CRM. The recurring judgement is whether to surface Data 360 data in place or to copy a value onto a CRM record, and the deciding question is what the org needs to do with it.',
      body_ja:
        '最後の観点は CRM の内側でループを閉じる話です。繰り返し問われる判断は、Data 360 のデータをその場に表示するか、値を CRM レコードにコピーするかで、決め手は「組織がそれで何をしたいか」です。',
      points: [
        'Surface in place (related lists, profile components) when people only need to see it.',
        'Copy the field onto the CRM object when it must be filtered, reported on natively, or used by standard automation such as validation rules.',
        'Copying more attributes than needed rebuilds the fragmentation Data 360 was bought to remove — copy sparingly and deliberately.',
        'Segment membership can be written back so that CRM users can act on it.',
        'Close the loop: send the outcome of the action back into Data 360 as engagement data, so the next segment and the next model are better than the last.',
      ],
      points_ja: [
        '見るだけでよいなら、その場に表示する（関連リスト、プロファイルコンポーネント）。',
        '絞り込み、標準レポート、入力規則などの標準自動化で使う必要があるなら、項目を CRM オブジェクトにコピーする。',
        '必要以上に属性をコピーすると、Data 360 を導入して解消したはずの分断を作り直すことになる。コピーは控えめに、意図をもって。',
        'セグメントの所属を書き戻せば、CRM のユーザーがそれをもとに行動できる。',
        'ループを閉じる：行動の結果をエンゲージメントデータとして Data 360 に戻す。そうすれば次のセグメントも次のモデルも前回より良くなる。',
      ],
    },
  ],
}
