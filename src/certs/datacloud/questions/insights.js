// 単元5：Data Enhancements, Sharing, and Analysis（拡張・共有・分析・配点18%）
// Calculated / Streaming Insights、Data Graph、他システムからの参照、レポート、予測AI・生成AI。
export const insightsQuestions = [
  {
    id: 'dc-ins-1',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A company wants a lifetime-value metric per customer, refreshed daily and reusable across segments and dashboards. Which feature fits?',
    question_ja:
      'ある企業が、顧客ごとの生涯価値の指標を、日次で更新しセグメントとダッシュボードの両方で再利用したいと考えている。適した機能はどれか。',
    options: [
      {
        text: 'Calculated insight',
        text_ja: 'Calculated Insight',
        correct: true,
        note: 'Correct. Batch, SQL-defined, scheduled — exactly the profile of a stable reusable metric.',
        note_ja: '正解。バッチ処理・SQL 定義・スケジュール実行。安定した再利用可能な指標の性質そのもの。',
      },
      {
        text: 'Streaming insight',
        text_ja: 'Streaming Insight',
        correct: false,
        note: 'Streaming is for metrics whose value decays in minutes. Lifetime value is stable by definition.',
        note_ja: 'Streaming は数分で価値が失われる指標向け。生涯価値は定義上安定している。',
      },
      {
        text: 'Data graph',
        text_ja: 'Data Graph',
        correct: false,
        note: 'A data graph is a denormalised view for fast reads, not a mechanism for computing a metric.',
        note_ja: 'Data Graph は高速読み取り用の非正規化ビューであり、指標を計算する仕組みではない。',
      },
      {
        text: 'Activation target',
        text_ja: 'アクティベーションターゲット',
        correct: false,
        note: 'A destination system, unrelated to computing metrics.',
        note_ja: '宛先システムであり、指標の計算とは無関係。',
      },
    ],
    explanation:
      'Calculated insights are batch computations defined in SQL with measures, dimensions and filters, refreshed on a schedule. They are the right building block for stable, reusable metrics — lifetime value, order count, average basket size, days since last purchase — and once computed they can be used in segmentation, in activation attributes and in dashboards alike.',
    explanation_ja:
      'Calculated Insight は、measure・dimension・filter を SQL で定義しスケジュールで再計算するバッチ処理である。生涯価値、注文回数、平均購入額、最終購入からの日数といった、安定して再利用する指標に適した部品であり、一度計算すればセグメンテーション、アクティベーションの属性、ダッシュボードのいずれでも使える。',
    reference:
      '💡 Choose insights by latency requirement, not by what you want to compute. Stable metric → calculated.',
    reference_ja:
      '💡 インサイトは「何を計算したいか」ではなく遅延要件で選ぶ。安定した指標→Calculated。',
  },
  {
    id: 'dc-ins-2',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'An online retailer wants to detect that a customer has added items to a basket and then remained inactive for 20 minutes, and respond within that same session.',
    scenario_ja:
      'ある EC 事業者が、顧客がカートに商品を追加した後20分間操作していないことを検知し、同じセッション中に対応したいと考えている。',
    question: 'Which combination is appropriate?',
    question_ja: '適切な組み合わせはどれか。',
    options: [
      {
        text: 'A streaming insight over a time window, triggering a data action',
        text_ja: '時間ウィンドウでの Streaming Insight と、それが起動する Data Action',
        correct: true,
        note: 'Correct. Streaming insights handle time-series windows, and data actions turn the detection into an immediate response.',
        note_ja: '正解。Streaming Insight は時系列のウィンドウを扱い、Data Action が検知を即時の対応に変える。',
      },
      {
        text: 'A calculated insight refreshed hourly, feeding a scheduled segment',
        text_ja: '1時間ごとに更新する Calculated Insight と、それを使うスケジュール実行のセグメント',
        correct: false,
        note: 'Hourly batch plus a scheduled segment cannot respond within a session that lasts minutes.',
        note_ja: '1時間ごとのバッチとスケジュール実行のセグメントでは、数分のセッション中に対応できない。',
      },
      {
        text: 'A data graph refreshed nightly',
        text_ja: '夜間更新の Data Graph',
        correct: false,
        note: 'A data graph makes reads fast, but a nightly refresh cannot detect an event happening now.',
        note_ja: 'Data Graph は読み取りを速くするが、夜間更新では今起きているイベントを検知できない。',
      },
      {
        text: 'A segment published daily and activated to email',
        text_ja: '日次で公開しメールにアクティベートするセグメント',
        correct: false,
        note: 'A daily cycle arrives long after the session ended.',
        note_ja: '日次のサイクルでは、セッションが終わってからずっと後に届くことになる。',
      },
    ],
    explanation:
      'Two features combine here. Streaming insights compute continuously over engagement data using time windows, which is what "inactive for 20 minutes" requires. Data actions then fire on that insight to produce the immediate response. Segmentation plus activation is the population-shaped, scheduled path and cannot meet an in-session requirement.',
    explanation_ja:
      'ここでは2つの機能が組み合わさる。Streaming Insight はエンゲージメントデータに対し時間ウィンドウで連続的に計算し、「20分間操作なし」という条件はまさにそれを必要とする。次に Data Action がそのインサイトに対して発火し、即時の対応を生む。セグメント＋アクティベーションは母集団の形をしたスケジュール実行の経路であり、セッション中の要件は満たせない。',
    reference:
      '💡 Segment + activation = "send this population a campaign". Streaming insight + data action = "when this happens, do that".',
    reference_ja:
      '💡 セグメント＋アクティベーション＝「この母集団にキャンペーンを送る」。Streaming Insight＋Data Action＝「これが起きたらあれをする」。',
  },
  {
    id: 'dc-ins-3',
    domain: 'dc-insights',
    type: 'mcq',
    question: 'What is the primary purpose of a data graph?',
    question_ja: 'Data Graph の主たる目的は何か。',
    options: [
      {
        text: 'To pre-join related DMOs into a materialised view so a full customer context can be read in one low-latency call',
        text_ja: '関連する DMO を事前に結合してマテリアライズドビューにし、顧客コンテキスト全体を1回の低遅延な呼び出しで読めるようにすること',
        correct: true,
        note: 'Correct. Pre-computing the join is what delivers the speed.',
        note_ja: '正解。結合を事前計算することが速度をもたらす。',
      },
      {
        text: 'To visualise relationships between objects for documentation purposes',
        text_ja: '文書化のためにオブジェクト間の関係を可視化すること',
        correct: false,
        note: 'Despite the name, it is not a diagram. It is a materialised data structure.',
        note_ja: '名前に反して図ではない。マテリアライズドされたデータ構造である。',
      },
      {
        text: 'To replace identity resolution by linking records graphically',
        text_ja: 'レコードをグラフ的に結び付けることで ID解決を置き換えること',
        correct: false,
        note: 'It consumes resolved data; it does not perform resolution.',
        note_ja: '解決済みのデータを利用する側であって、解決処理を行うものではない。',
      },
      {
        text: 'To store raw ingested data before mapping',
        text_ja: 'マッピング前の生の取り込みデータを保管すること',
        correct: false,
        note: 'That is the DLO, at the opposite end of the pipeline.',
        note_ja: 'それは DLO であり、パイプラインの正反対の端にある。',
      },
    ],
    explanation:
      'A data graph combines and denormalises related DMOs — for example Individual with its contact points, orders and insights — into a materialised view. Because the join is pre-computed, consumers make fewer calls and get near-real-time responses. Its main consumers are generative AI grounding, retrievers, personalisation engines and APIs that need one fast read.',
    explanation_ja:
      'Data Graph は関連する DMO（例：Individual とその Contact Point、注文、インサイト）を結合・非正規化してマテリアライズドビューにする。結合が事前計算されているため、利用側は呼び出し回数を減らせてニアリアルタイムの応答を得られる。主な利用者は生成AI のグラウンディング、Retriever、パーソナライゼーションエンジン、1回の高速読み取りを必要とする API である。',
    reference:
      '💡 Trade-off: the view is materialised, so it must be refreshed. Not for data that must be current to the second.',
    reference_ja:
      '💡 トレードオフ：マテリアライズドビューなので更新が必要。秒単位の最新性が要るデータ向けではない。',
  },
  {
    id: 'dc-ins-4',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'Service agents need to see a customer\'s unified purchase history on the Contact record page, but the org does not need to filter or report on it natively. What is the best approach?',
    question_ja:
      'サポート担当者がコンタクトのレコードページで統合済みの購買履歴を見る必要があるが、組織側でそれを標準機能で絞り込んだりレポートしたりする必要はない。最善の方法はどれか。',
    options: [
      {
        text: 'Add Data Cloud related lists / profile components to the record page',
        text_ja: 'レコードページに Data Cloud の関連リストやプロファイルコンポーネントを追加する',
        correct: true,
        note: 'Correct. Surfacing in place shows the data without copying it, which is all the requirement asks for.',
        note_ja: '正解。その場に表示すればコピーせずにデータを見せられる。要件が求めているのはそれだけ。',
      },
      {
        text: 'Copy every purchase history field onto the Contact object',
        text_ja: '購買履歴のすべての項目を Contact オブジェクトへコピーする',
        correct: false,
        note: 'Unnecessary duplication that immediately begins to drift, for a view-only requirement.',
        note_ja: '閲覧だけの要件に対して不要な複製を作り、それは即座にずれ始める。',
      },
      {
        text: 'Export the history nightly to a custom object',
        text_ja: '履歴を毎晩カスタムオブジェクトへエクスポートする',
        correct: false,
        note: 'Worse duplication with added latency, and it re-fragments the view that was just unified.',
        note_ja: '遅延まで加わったより悪い複製であり、統合したばかりのビューを再び分断する。',
      },
      {
        text: 'Give agents direct access to Data Explorer instead of the record page',
        text_ja: 'レコードページではなく Data Explorer への直接アクセスを担当者に与える',
        correct: false,
        note: 'Data Explorer is an administrative diagnostic tool, not an agent-facing experience.',
        note_ja: 'Data Explorer は管理者向けの診断ツールであり、担当者向けの画面ではない。',
      },
    ],
    explanation:
      'The deciding question is what the org needs to do with the data. If people only need to see it, surface it in place with related lists and profile components. Copy a field onto a CRM object only when it must be filterable, natively reportable, or usable by standard automation such as validation rules — copying more than needed rebuilds the fragmentation Data 360 was bought to remove.',
    explanation_ja:
      '決め手は「そのデータで組織が何をしたいか」である。見るだけでよいなら、関連リストやプロファイルコンポーネントでその場に表示する。CRM オブジェクトへの項目のコピーは、絞り込み、標準レポート、入力規則などの標準自動化で使う必要がある場合に限る。必要以上にコピーすれば、Data 360 を導入して解消したはずの分断を作り直すことになる。',
    reference:
      '💡 See it → surface in place. Filter, report or automate on it → copy the field. Nothing more.',
    reference_ja:
      '💡 見るだけ→その場に表示。絞り込み・レポート・自動化に使う→項目をコピー。それ以上はしない。',
  },
  {
    id: 'dc-ins-5',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A company has a churn model already trained and hosted in Amazon SageMaker. They want to use its predictions for segmentation in Data 360 without moving their data. What should they use?',
    question_ja:
      'ある企業が、Amazon SageMaker で学習済み・ホスト済みの解約予測モデルを持っている。データを移動せずに、その予測を Data 360 のセグメンテーションに使いたい。何を使うべきか。',
    options: [
      {
        text: 'Bring Your Own Model (BYOM) in Einstein Studio / Model Builder',
        text_ja: 'Einstein Studio／Model Builder の BYOM（Bring Your Own Model）',
        correct: true,
        note: 'Correct. BYOM connects an externally hosted model; predictions land back as a DMO field.',
        note_ja: '正解。BYOM は外部でホストされたモデルを接続し、予測結果は DMO の項目として戻る。',
      },
      {
        text: 'Retrain the model inside Data 360 from scratch',
        text_ja: 'Data 360 の中でモデルをゼロから学習し直す',
        correct: false,
        note: 'Wasteful when a working model already exists, and it is not what the requirement asks for.',
        note_ja: '動くモデルが既にあるのに無駄が大きく、要件が求めていることでもない。',
      },
      {
        text: 'Export the unified profiles to SageMaker and import scored results as a file',
        text_ja: '統合プロファイルを SageMaker へエクスポートし、スコア済みの結果をファイルで取り込む',
        correct: false,
        note: 'Moves the data, which the requirement explicitly excludes, and adds a manual synchronisation problem.',
        note_ja: '要件が明示的に排除しているデータの移動を行い、手作業の同期問題まで増える。',
      },
      {
        text: 'A calculated insight that reimplements the model logic in SQL',
        text_ja: 'モデルのロジックを SQL で再実装した Calculated Insight',
        correct: false,
        note: 'Calculated insights compute metrics; they cannot reproduce a trained machine learning model.',
        note_ja: 'Calculated Insight は指標を計算するもので、学習済みの機械学習モデルを再現できるものではない。',
      },
    ],
    explanation:
      'BYOM connects a model hosted in Amazon SageMaker, Google Vertex AI or Databricks without the data leaving Data 360 to train or score. The prediction output lands as a DMO field, which means a predicted churn score can be segmented and activated exactly like any other attribute — this is the key consequence the exam tests.',
    explanation_ja:
      'BYOM は Amazon SageMaker、Google Vertex AI、Databricks でホストされたモデルを接続する。学習やスコアリングのためにデータが Data 360 の外へ出ることはない。予測結果は DMO の項目として着地するため、予測された解約スコアを他の属性とまったく同じようにセグメント化・アクティベートできる。試験が問うのはこの帰結である。',
    reference:
      '💡 Predictions become data. Once a score is a DMO field, everything you can do with an attribute you can do with it.',
    reference_ja:
      '💡 予測はデータになる。スコアが DMO の項目になれば、属性にできることはすべてスコアにもできる。',
  },
  {
    id: 'dc-ins-6',
    domain: 'dc-insights',
    type: 'multi',
    question:
      'Which two are true of streaming insights? (Choose 2)',
    question_ja: 'Streaming Insight について正しいものを2つ選べ。',
    options: [
      {
        text: 'They compute continuously over engagement data using time windows',
        text_ja: 'エンゲージメントデータに対し、時間ウィンドウで連続的に計算する',
        correct: true,
        note: 'Correct. Time-series aggregation over a continuous stream is precisely their design.',
        note_ja: '正解。連続するストリームに対する時系列の集計こそが、その設計そのもの。',
      },
      {
        text: 'They can trigger data actions',
        text_ja: 'Data Action を起動できる',
        correct: true,
        note: 'Correct. This is how a real-time metric becomes a real-time response.',
        note_ja: '正解。リアルタイムの指標がリアルタイムの対応に変わるのはこの経路。',
      },
      {
        text: 'They are the right choice for stable long-term metrics such as lifetime value',
        text_ja: '生涯価値のような安定した長期指標に適した選択である',
        correct: false,
        note: 'That is a calculated insight. Streaming is for values that decay quickly.',
        note_ja: 'それは Calculated Insight の役割。Streaming は価値がすぐ失われる値のためのもの。',
      },
      {
        text: 'They replace the need for identity resolution',
        text_ja: 'ID解決を不要にする',
        correct: false,
        note: 'They consume the data model like everything else; resolution remains necessary.',
        note_ja: '他と同様にデータモデルを利用する側であり、解決処理は依然として必要。',
      },
      {
        text: 'They can only be used in dashboards, not in segmentation',
        text_ja: 'ダッシュボードでのみ使用でき、セグメンテーションには使えない',
        correct: false,
        note: 'Both calculated and streaming insights can be used in segmentation and in activation attributes.',
        note_ja: 'Calculated も Streaming も、セグメンテーションとアクティベーションの属性の両方で使える。',
      },
    ],
    explanation:
      'Streaming insights handle time-series aggregation over continuous engagement data and can trigger data actions, which is the path from detection to immediate response. Both insight types can feed segmentation and activation; what separates them is timeliness — streaming for values that decay in minutes, calculated for stable measures on a schedule.',
    explanation_ja:
      'Streaming Insight は連続するエンゲージメントデータに対する時系列集計を担い、Data Action を起動できる。これが検知から即時対応へ至る経路である。どちらの種類のインサイトもセグメンテーションとアクティベーションに供給できる。両者を分けるのは即時性であり、Streaming は数分で価値が失われる値、Calculated はスケジュールで求める安定した指標のためのものである。',
    reference:
      '💡 The choice is latency, not capability. Both feed segments; only one meets a minutes-level requirement.',
    reference_ja:
      '💡 選択軸は機能ではなく遅延。どちらもセグメントに供給できるが、分単位の要件を満たすのは一方だけ。',
  },
  {
    id: 'dc-ins-7',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'A company is building an Agentforce service agent that must answer questions about a customer\'s recent orders, open cases and loyalty tier, quickly and accurately, during a live conversation.',
    scenario_ja:
      'ある企業が、ライブの会話中に顧客の直近の注文、オープンなケース、ロイヤルティランクについて、素早く正確に回答する Agentforce のサービスエージェントを構築している。',
    question: 'What should the consultant configure in Data 360?',
    question_ja: 'コンサルタントは Data 360 で何を設定すべきか。',
    options: [
      {
        text: 'A data graph over the unified individual and its related objects, used for grounding',
        text_ja: 'Unified Individual とその関連オブジェクトに対する Data Graph を作り、グラウンディングに使う',
        correct: true,
        note: 'Correct. The pre-computed join gives the agent the whole customer context in one low-latency read.',
        note_ja: '正解。事前計算された結合により、エージェントは1回の低遅延な読み取りで顧客コンテキスト全体を得られる。',
      },
      {
        text: 'A calculated insight refreshed weekly',
        text_ja: '週次で更新する Calculated Insight',
        correct: false,
        note: 'Weekly data cannot answer "recent orders" or "open cases" during a live conversation.',
        note_ja: '週次のデータでは、ライブの会話中に「直近の注文」や「オープンなケース」に答えられない。',
      },
      {
        text: 'A nightly activation exporting profiles to a file',
        text_ja: 'プロファイルをファイルへ書き出す夜間アクティベーション',
        correct: false,
        note: 'Activation delivers populations to destinations; it is not how an agent reads one customer\'s context.',
        note_ja: 'アクティベーションは母集団を宛先へ届けるもの。エージェントが1人の顧客のコンテキストを読む仕組みではない。',
      },
      {
        text: 'A segment containing all customers with open cases',
        text_ja: 'オープンなケースを持つすべての顧客を含むセグメント',
        correct: false,
        note: 'A population, not a per-conversation context lookup for one individual.',
        note_ja: 'それは母集団であって、1人の顧客に対する会話ごとのコンテキスト参照ではない。',
      },
    ],
    explanation:
      'Agentforce agents ground on Data 360 through data graphs and retrievers. A data graph pre-joins the unified individual with its related objects so the whole context arrives in one fast call — exactly what a live conversation needs. Retrievers handle the search step over indexed unstructured content such as knowledge articles.',
    explanation_ja:
      'Agentforce のエージェントは Data Graph と Retriever を通じて Data 360 にグラウンディングする。Data Graph は Unified Individual とその関連オブジェクトを事前結合し、1回の高速な呼び出しでコンテキスト全体を届ける。ライブの会話が必要とするのはまさにこれである。Retriever は、ナレッジ記事などインデックス済みの非構造化コンテンツに対する検索段階を担う。',
    reference:
      '💡 Structured customer context → data graph. Unstructured content (documents, articles) → search index + retriever.',
    reference_ja:
      '💡 構造化された顧客コンテキスト→Data Graph。非構造化コンテンツ（文書・記事）→検索インデックス＋Retriever。',
  },
  {
    id: 'dc-ins-8',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A company wants to make Data 360 insights available to their analytics team, who work exclusively in Snowflake. What is the most appropriate approach?',
    question_ja:
      'ある企業が、Snowflake だけで作業している分析チームに Data 360 のインサイトを提供したい。最も適切な方法はどれか。',
    options: [
      {
        text: 'Zero Copy data sharing, exposing Data 360 objects to Snowflake without copying',
        text_ja: 'Zero Copy のデータ共有により、コピーせずに Data 360 のオブジェクトを Snowflake へ公開する',
        correct: true,
        note: 'Correct. Data sharing is the outbound direction of Zero Copy, built for exactly this.',
        note_ja: '正解。データ共有は Zero Copy の外向き方向であり、まさにこのために用意されている。',
      },
      {
        text: 'A scheduled export of insights to CSV, loaded into Snowflake nightly',
        text_ja: 'インサイトを CSV へ定期エクスポートし、毎晩 Snowflake へロードする',
        correct: false,
        note: 'Creates a copy that drifts, adds latency, and needs a pipeline nobody wants to maintain.',
        note_ja: 'ずれていくコピーを作り、遅延を加え、誰も保守したくないパイプラインを必要とする。',
      },
      {
        text: 'Give the analytics team Data Cloud Admin permission sets so they can work in Data 360 instead',
        text_ja: '分析チームに Data Cloud Admin 権限セットを付与し、代わりに Data 360 で作業してもらう',
        correct: false,
        note: 'Over-provisioning, and it ignores the requirement that they work in Snowflake.',
        note_ja: '過剰な権限付与であり、Snowflake で作業するという要件も無視している。',
      },
      {
        text: 'Rebuild the insights as Snowflake views over the source systems',
        text_ja: 'ソースシステムの上に Snowflake のビューとしてインサイトを作り直す',
        correct: false,
        note: 'Duplicates the logic in two places and loses the benefit of computing on unified data.',
        note_ja: 'ロジックを2箇所に重複させ、統合データ上で計算する利点を失う。',
      },
    ],
    explanation:
      'Zero Copy works in both directions. Query and file federation bring external data into Data 360 without copying; data sharing exposes Data 360 objects and insights out to Snowflake, BigQuery, Databricks and Redshift, again without copying. Prefer surfacing over exporting — an export creates a second copy that immediately begins to drift.',
    explanation_ja:
      'Zero Copy は双方向に働く。クエリ連携とファイル連携は外部データをコピーせず Data 360 に取り込み、データ共有は Data 360 のオブジェクトとインサイトを Snowflake、BigQuery、Databricks、Redshift へ、やはりコピーせずに公開する。エクスポートより表出を選ぶこと。エクスポートは即座にずれ始める2つ目のコピーを作る。',
    reference:
      '💡 Zero Copy in = federation. Zero Copy out = data sharing. Neither duplicates the data.',
    reference_ja:
      '💡 Zero Copy の入り＝連携。Zero Copy の出＝データ共有。どちらもデータを複製しない。',
  },
  {
    id: 'dc-ins-9',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'Which is required before retrievers can ground generative AI answers on a library of PDF product manuals?',
    question_ja:
      'Retriever が PDF の製品マニュアル群を根拠に生成AI の回答をグラウンディングできるようにするために、事前に必要なものはどれか。',
    options: [
      {
        text: 'The unstructured content must be ingested, chunked and placed in a search index',
        text_ja: '非構造化コンテンツを取り込み、分割して検索インデックスに登録する必要がある',
        correct: true,
        note: 'Correct. Retrievers search an index; unindexed documents are not reachable.',
        note_ja: '正解。Retriever が検索するのはインデックス。インデックス化されていない文書には到達できない。',
      },
      {
        text: 'The PDFs must be converted into calculated insights',
        text_ja: 'PDF を Calculated Insight に変換する必要がある',
        correct: false,
        note: 'Calculated insights compute numeric metrics from structured data, not document content.',
        note_ja: 'Calculated Insight は構造化データから数値指標を計算するもので、文書の内容を扱うものではない。',
      },
      {
        text: 'The PDFs must be mapped to the Individual DMO',
        text_ja: 'PDF を Individual DMO にマッピングする必要がある',
        correct: false,
        note: 'Product manuals are not people. Unstructured content follows the indexing path, not profile mapping.',
        note_ja: '製品マニュアルは人ではない。非構造化コンテンツはプロファイルのマッピングではなくインデックス化の経路を辿る。',
      },
      {
        text: 'Identity resolution must run over the document library',
        text_ja: '文書ライブラリに対して ID解決を実行する必要がある',
        correct: false,
        note: 'Identity resolution unifies people, not documents.',
        note_ja: 'ID解決が統合するのは人であって文書ではない。',
      },
    ],
    explanation:
      'Structured and unstructured data take different paths. Structured customer data is mapped to DMOs, unified and read through data graphs. Unstructured content — PDFs, knowledge articles, call transcripts — is ingested, chunked and indexed into a search index so that retrievers can perform the search step of retrieval-augmented generation over it.',
    explanation_ja:
      '構造化データと非構造化データは別の経路を辿る。構造化された顧客データは DMO にマッピングされ、統合され、Data Graph 経由で読まれる。非構造化コンテンツ（PDF、ナレッジ記事、通話記録）は取り込み・分割のうえ検索インデックスに登録され、Retriever がそこに対して RAG の検索段階を実行できるようになる。',
    reference:
      '💡 Two paths: structured → DMO → data graph. Unstructured → chunk → search index → retriever.',
    reference_ja:
      '💡 2つの経路：構造化→DMO→Data Graph。非構造化→分割→検索インデックス→Retriever。',
  },
  {
    id: 'dc-ins-10',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A calculated insight refreshes every hour, but the business only reviews the metric weekly. What should the consultant recommend?',
    question_ja:
      'ある Calculated Insight が1時間ごとに更新されているが、業務側はその指標を週次でしか確認していない。コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'Reduce the refresh frequency to match the business need, lowering credit consumption',
        text_ja: '更新頻度を業務上の必要に合わせて下げ、クレジット消費を抑える',
        correct: true,
        note: 'Correct. Calculated insights consume credits on every refresh; schedule to the need, not to the maximum.',
        note_ja: '正解。Calculated Insight は更新のたびにクレジットを消費する。最大頻度ではなく必要に合わせる。',
      },
      {
        text: 'Keep the hourly refresh, since more frequent data is always better',
        text_ja: 'データは頻繁なほど常に良いので、1時間ごとの更新を維持する',
        correct: false,
        note: 'Not when it costs credits and nobody looks at it. Frequency should follow the requirement.',
        note_ja: 'クレジットを消費し、しかも誰も見ていないなら良くはない。頻度は要件に従うべき。',
      },
      {
        text: 'Convert it to a streaming insight to reduce cost',
        text_ja: 'コスト削減のため Streaming Insight に変換する',
        correct: false,
        note: 'Streaming is for near-real-time needs and does not fit a weekly review; it is the opposite direction.',
        note_ja: 'Streaming はニアリアルタイムの必要に応えるもので、週次の確認には合わない。方向が逆。',
      },
      {
        text: 'Delete the insight and compute the metric manually each week',
        text_ja: 'インサイトを削除し、毎週手作業で指標を計算する',
        correct: false,
        note: 'Replaces an automated, reusable metric with recurring manual work.',
        note_ja: '自動化され再利用できる指標を、繰り返しの手作業に置き換えている。',
      },
    ],
    explanation:
      'Data 360 is consumption-priced, and calculated insights consume credits every time they refresh. Schedule refreshes to the business need rather than as often as possible. This is the same cost discipline that makes narrow data streams and Zero Copy preferred elsewhere in the exam.',
    explanation_ja:
      'Data 360 は従量課金であり、Calculated Insight は更新のたびにクレジットを消費する。更新は可能な限り頻繁にではなく、業務上の必要に合わせてスケジュールする。試験の他の場面で絞り込んだデータストリームや Zero Copy が好まれるのと同じコスト規律である。',
    reference:
      '💡 "More frequent is better" is not a design principle. Match the schedule to the decision it supports.',
    reference_ja:
      '💡 「頻繁なほど良い」は設計原則ではない。スケジュールは、それが支える意思決定に合わせる。',
  },
  {
    id: 'dc-ins-11',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'Which tool is appropriate for building dashboards over unified Data 360 data?',
    question_ja:
      '統合された Data 360 のデータに対してダッシュボードを構築するのに適したツールはどれか。',
    options: [
      {
        text: 'CRM Analytics or Tableau, both of which can read Data 360 objects',
        text_ja: 'CRM Analytics または Tableau。いずれも Data 360 のオブジェクトを読める',
        correct: true,
        note: 'Correct. Both connect directly, so the analysis runs on unified data without an export.',
        note_ja: '正解。どちらも直接接続でき、エクスポートなしに統合データ上で分析できる。',
      },
      {
        text: 'Exporting to a spreadsheet and charting there',
        text_ja: '表計算ソフトへエクスポートしてそこでグラフを作る',
        correct: false,
        note: 'Almost always the wrong answer — it creates an ungoverned copy that immediately goes stale.',
        note_ja: 'ほぼ常に誤答。統制されていないコピーを作り、それは即座に古くなる。',
      },
      {
        text: 'Data Explorer, which is designed as a dashboard tool',
        text_ja: 'ダッシュボードツールとして設計された Data Explorer',
        correct: false,
        note: 'Data Explorer is for inspecting records during troubleshooting, not for building dashboards.',
        note_ja: 'Data Explorer はトラブルシューティング時にレコードを確認するためのもので、ダッシュボード構築用ではない。',
      },
      {
        text: 'Standard CRM report types, which work over Data 360 objects exactly as over CRM objects',
        text_ja: '標準の CRM レポートタイプ。CRM オブジェクトとまったく同じように Data 360 オブジェクトでも動く',
        correct: false,
        note: 'Standard CRM reports do not run over Data 360 objects the way they do over CRM objects.',
        note_ja: '標準の CRM レポートは、CRM オブジェクトに対するようには Data 360 オブジェクトに対して動かない。',
      },
    ],
    explanation:
      'Data 360 data can be analysed without leaving the platform. CRM Analytics reads Data 360 objects directly, and Tableau connects for exploratory and enterprise analysis. Calculated insights are often the right building block for a dashboard metric — compute once and reuse in reporting, segmentation and activation alike.',
    explanation_ja:
      'Data 360 のデータは、プラットフォームから出さずに分析できる。CRM Analytics は Data 360 のオブジェクトを直接読み、Tableau は探索的分析やエンタープライズ分析のために接続する。ダッシュボードの指標には Calculated Insight が適した部品になることが多い。1度計算して、レポート・セグメント・アクティベーションで使い回せる。',
    reference:
      '💡 Analyse in place. An export is a second copy that starts drifting the moment it is created.',
    reference_ja:
      '💡 その場で分析する。エクスポートは作成した瞬間からずれ始める2つ目のコピー。',
  },
  {
    id: 'dc-ins-12',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'A telecom company built a calculated insight for average monthly data usage. Marketing wants to use it to build a segment; the service team wants it visible on the account record; and the finance team wants it in a dashboard.',
    scenario_ja:
      'ある通信会社が、月間平均データ使用量の Calculated Insight を作成した。マーケティングはそれを使ってセグメントを作りたい。サポートチームは取引先レコード上に表示したい。財務チームはダッシュボードで見たい。',
    question: 'What is true about serving all three requirements?',
    question_ja: 'この3つの要件を満たすことについて正しいのはどれか。',
    options: [
      {
        text: 'One calculated insight can serve all three — it can be used in segmentation, surfaced in CRM and read by analytics',
        text_ja: '1つの Calculated Insight で3つすべてを満たせる。セグメンテーションに使え、CRM に表出でき、分析ツールからも読める',
        correct: true,
        note: 'Correct. Compute once, reuse everywhere — this reusability is a main reason to build insights at all.',
        note_ja: '正解。1度計算してどこでも再利用する。この再利用性こそインサイトを作る主要な理由の1つ。',
      },
      {
        text: 'Three separate insights are needed, one per consuming team',
        text_ja: '利用チームごとに1つ、計3つの別々のインサイトが必要',
        correct: false,
        note: 'Duplicating the definition three times guarantees the three teams eventually disagree on the number.',
        note_ja: '定義を3つに重複させれば、3チームがいずれ数値で食い違うことが保証される。',
      },
      {
        text: 'Calculated insights can only be used in segmentation',
        text_ja: 'Calculated Insight はセグメンテーションでのみ使用できる',
        correct: false,
        note: 'They can also feed activation attributes, CRM surfacing and analytics.',
        note_ja: 'アクティベーションの属性、CRM への表出、分析にも供給できる。',
      },
      {
        text: 'The insight must be exported before any team can use it',
        text_ja: 'いずれのチームが使う場合も、事前にエクスポートが必要',
        correct: false,
        note: 'No export is needed; all three consumption paths read it in place.',
        note_ja: 'エクスポートは不要。3つの利用経路はいずれもその場で読む。',
      },
    ],
    explanation:
      'Reusability is the point of building an insight rather than a one-off query. A single calculated insight can define segment criteria, travel as an activation attribute, be surfaced beside a CRM record and be read by CRM Analytics or Tableau. Defining the same metric three times is how three teams end up reporting three different numbers.',
    explanation_ja:
      '使い捨てのクエリではなくインサイトを作る意義は再利用性にある。1つの Calculated Insight が、セグメントの条件を定義し、アクティベーションの属性として運ばれ、CRM レコードの横に表出され、CRM Analytics や Tableau から読まれる。同じ指標を3回定義すれば、3チームが3つの異なる数値を報告する結末になる。',
    reference:
      '💡 One definition, many consumers. Duplicated metric definitions are how organisations lose a single version of the truth.',
    reference_ja:
      '💡 定義は1つ、利用者は複数。指標定義の重複こそ、組織が「唯一の正しい数値」を失う原因。',
  },
  {
    id: 'dc-ins-13',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'What distinguishes how predictive AI and generative AI consume Data 360?',
    question_ja: '予測AI と生成AI が Data 360 を利用する仕方の違いは何か。',
    options: [
      {
        text: 'Predictive models write a prediction back as data; generative models read context at prompt time and write nothing back',
        text_ja: '予測モデルは予測結果をデータとして書き戻し、生成モデルはプロンプト実行時にコンテキストを読むだけで何も書き戻さない',
        correct: true,
        note: 'Correct. This is why a predicted score is segmentable but a generated answer is not.',
        note_ja: '正解。予測スコアはセグメントに使えるのに、生成された回答は使えないのはこのため。',
      },
      {
        text: 'Predictive AI requires Zero Copy; generative AI requires ingestion',
        text_ja: '予測AI には Zero Copy が必要で、生成AI には取り込みが必要',
        correct: false,
        note: 'Neither has such a requirement. Both work regardless of how the data arrived.',
        note_ja: 'どちらにもそのような要件はない。データがどう入ってきたかに関係なく機能する。',
      },
      {
        text: 'Only generative AI can use unified profiles',
        text_ja: '統合プロファイルを使えるのは生成AI だけである',
        correct: false,
        note: 'Both benefit from unified profiles; unresolved data degrades both equally.',
        note_ja: 'どちらも統合プロファイルの恩恵を受ける。未解決のデータはどちらも同じように劣化させる。',
      },
      {
        text: 'Predictive AI runs inside Data 360 only; generative AI runs externally only',
        text_ja: '予測AI は Data 360 内部でのみ、生成AI は外部でのみ実行される',
        correct: false,
        note: 'BYOM connects externally hosted predictive models, so the split is not accurate.',
        note_ja: 'BYOM は外部でホストされた予測モデルを接続するので、この区分は正確ではない。',
      },
    ],
    explanation:
      'The two paths differ in direction. A predictive model is trained or connected and scores land back as a DMO field, so a prediction becomes an ordinary attribute you can segment and activate on. Generative grounding is a read at prompt time — retrievers and data graphs supply context, and nothing is persisted back into the model.',
    explanation_ja:
      '2つの道筋は方向が異なる。予測モデルは学習または接続され、スコアは DMO の項目として戻る。したがって予測は通常の属性となり、セグメント化もアクティベートもできる。生成AI のグラウンディングはプロンプト実行時の読み取りであり、Retriever と Data Graph がコンテキストを供給するだけで、モデル側へ何も保存されない。',
    reference:
      '💡 Ask which direction the data flows. Prediction flows in and becomes data; grounding flows out and leaves nothing.',
    reference_ja:
      '💡 データがどちらへ流れるかを問う。予測は流れ込んでデータになり、グラウンディングは流れ出て何も残さない。',
  },
  {
    id: 'dc-ins-14',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A CRM validation rule must prevent orders above a customer\'s Data 360 credit-risk threshold. How should the threshold be made available?',
    question_ja:
      'CRM の入力規則で、顧客の Data 360 上の与信リスクしきい値を超える注文を防ぎたい。しきい値はどのように利用可能にすべきか。',
    options: [
      {
        text: 'Copy the field onto the CRM object, because standard automation needs it natively',
        text_ja: '標準の自動化が標準機能として必要とするため、項目を CRM オブジェクトへコピーする',
        correct: true,
        note: 'Correct. Validation rules are native automation and cannot evaluate data that only exists in Data 360.',
        note_ja: '正解。入力規則は標準の自動化であり、Data 360 にしか存在しないデータは評価できない。',
      },
      {
        text: 'Add a Data Cloud related list to the record page',
        text_ja: 'レコードページに Data Cloud の関連リストを追加する',
        correct: false,
        note: 'That displays the value to a person; a validation rule cannot read a page component.',
        note_ja: 'それは人に値を見せるだけ。入力規則がページのコンポーネントを読むことはできない。',
      },
      {
        text: 'Use a data graph, which validation rules can query directly',
        text_ja: 'Data Graph を使う。入力規則から直接クエリできる',
        correct: false,
        note: 'Validation rules cannot query a data graph; they evaluate fields on the record.',
        note_ja: '入力規則から Data Graph をクエリすることはできない。評価するのはレコード上の項目。',
      },
      {
        text: 'Publish a segment of high-risk customers each night',
        text_ja: '毎晩、高リスク顧客のセグメントを公開する',
        correct: false,
        note: 'A nightly population does not give the rule a per-record threshold value at save time.',
        note_ja: '夜間の母集団では、保存時にレコード単位のしきい値を入力規則へ渡せない。',
      },
    ],
    explanation:
      'This is the case where copying is correct. Surface data in place when people only need to see it, but copy a field onto the CRM object when it must be filterable, natively reportable, or usable by standard automation such as validation rules — which evaluate fields on the record and cannot reach outside it.',
    explanation_ja:
      'これはコピーが正しい場面である。人が見るだけでよいならその場に表示するが、絞り込み、標準レポート、入力規則などの標準自動化で使う必要があるなら CRM オブジェクトへ項目をコピーする。入力規則はレコード上の項目を評価するもので、その外側には手が届かない。',
    reference:
      '💡 Copy sparingly and deliberately. Each copied field is a small step back toward the fragmentation you removed.',
    reference_ja:
      '💡 コピーは控えめに、意図をもって。コピーした項目1つひとつが、解消した分断へ少しずつ引き戻す。',
  },
  {
    id: 'dc-ins-15',
    domain: 'dc-insights',
    type: 'multi',
    question:
      'Which two are appropriate consumers of a data graph? (Choose 2)',
    question_ja: 'Data Graph の利用者として適切なものを2つ選べ。',
    options: [
      {
        text: 'Generative AI grounding for an Agentforce agent',
        text_ja: 'Agentforce エージェントのための生成AI グラウンディング',
        correct: true,
        note: 'Correct. One low-latency read of the whole customer context is exactly what grounding needs.',
        note_ja: '正解。顧客コンテキスト全体を1回の低遅延な読み取りで得ることこそ、グラウンディングが必要とするもの。',
      },
      {
        text: 'A personalisation engine that needs the full customer context in one call',
        text_ja: '顧客コンテキスト全体を1回の呼び出しで必要とするパーソナライゼーションエンジン',
        correct: true,
        note: 'Correct. Fewer calls and near-real-time response is the design goal of a data graph.',
        note_ja: '正解。呼び出し回数を減らしニアリアルタイムで応答することが Data Graph の設計目標。',
      },
      {
        text: 'A financial ledger requiring transactionally current balances to the second',
        text_ja: '秒単位でトランザクション整合の残高を必要とする財務元帳',
        correct: false,
        note: 'A data graph is materialised and must be refreshed, so it is not a source of second-accurate truth.',
        note_ja: 'Data Graph はマテリアライズドされており更新が必要なので、秒単位で正確な情報源にはならない。',
      },
      {
        text: 'The identity resolution ruleset',
        text_ja: 'ID解決ルールセット',
        correct: false,
        note: 'Resolution runs on mapped DMOs and produces the data a graph is later built from.',
        note_ja: '解決処理はマッピング済みの DMO に対して動き、後から Data Graph が作られる元のデータを生む。',
      },
      {
        text: 'A data stream ingesting raw source files',
        text_ja: '生のソースファイルを取り込むデータストリーム',
        correct: false,
        note: 'Ingestion is at the opposite end of the pipeline from a data graph.',
        note_ja: '取り込みは、Data Graph とはパイプラインの反対側の端にある。',
      },
    ],
    explanation:
      'Data graphs exist to serve fast reads of a full customer context: AI grounding, retrievers, personalisation engines and APIs. Because the view is materialised and refreshed on a cadence, it is deliberately not the right structure for data that must be transactionally current to the second.',
    explanation_ja:
      'Data Graph は顧客コンテキスト全体の高速な読み取りに応えるために存在する。AI のグラウンディング、Retriever、パーソナライゼーションエンジン、API がその利用者である。ビューはマテリアライズドされ一定間隔で更新されるため、秒単位でトランザクション整合が必要なデータには意図的に向いていない。',
    reference:
      '💡 Data graph = speed through pre-computation. The cost of pre-computation is that it is as fresh as its last refresh.',
    reference_ja:
      '💡 Data Graph＝事前計算による速度。事前計算の代償は、鮮度が最後の更新時点で止まること。',
  },
  {
    id: 'dc-ins-16',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'Which statement about calculated insights is correct?',
    question_ja: 'Calculated Insight に関する記述として正しいものはどれか。',
    options: [
      {
        text: 'They are defined with measures, dimensions and filters, and can be used in both segmentation and activation attributes',
        text_ja: 'measure・dimension・filter で定義され、セグメンテーションとアクティベーションの属性の両方で使える',
        correct: true,
        note: 'Correct. That reusability across consumption paths is a large part of their value.',
        note_ja: '正解。利用経路をまたいだこの再利用性が、その価値の大部分を占める。',
      },
      {
        text: 'They compute in near real time over streaming engagement data',
        text_ja: 'ストリーミングのエンゲージメントデータに対しニアリアルタイムで計算する',
        correct: false,
        note: 'That describes streaming insights. Calculated insights are batch and scheduled.',
        note_ja: 'それは Streaming Insight の説明。Calculated Insight はバッチかつスケジュール実行。',
      },
      {
        text: 'They can only be used in dashboards',
        text_ja: 'ダッシュボードでのみ使用できる',
        correct: false,
        note: 'They are equally usable in segment criteria and as activation attributes.',
        note_ja: 'セグメントの条件としても、アクティベーションの属性としても同じように使える。',
      },
      {
        text: 'They run automatically whenever a source record changes',
        text_ja: 'ソースレコードが変更されるたびに自動的に実行される',
        correct: false,
        note: 'They refresh on a schedule, which is why the refresh cadence is a design and cost decision.',
        note_ja: 'スケジュールで再計算される。更新間隔が設計とコストの判断事項になるのはそのため。',
      },
    ],
    explanation:
      'Calculated insights are batch computations defined in SQL using measures, dimensions and filters, refreshed on a schedule rather than on record change. Once computed they are broadly reusable — segment criteria, activation attributes and dashboard metrics all read the same definition, which keeps the organisation on one version of the number.',
    explanation_ja:
      'Calculated Insight は、measure・dimension・filter を用いて SQL で定義するバッチ計算であり、レコードの変更時ではなくスケジュールに従って再計算される。一度計算すれば広く再利用でき、セグメントの条件、アクティベーションの属性、ダッシュボードの指標がいずれも同じ定義を読む。これにより組織は1つの数値に揃う。',
    reference:
      '💡 Calculated = batch, scheduled, SQL. Streaming = continuous, windowed, can trigger data actions.',
    reference_ja:
      '💡 Calculated＝バッチ・スケジュール・SQL。Streaming＝連続・ウィンドウ・Data Action を起動可能。',
  },
]
