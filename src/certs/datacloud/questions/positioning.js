// 単元1：Solution Positioning（提案と位置づけ・配点14%）
// 用語とビジネス価値、AIの土台としての役割、最初のユースケース選定、データ倫理とガバナンス。
export const positioningQuestions = [
  {
    id: 'dc-pos-1',
    domain: 'dc-positioning',
    type: 'mcq',
    question: 'Which statement best describes what Data 360 (Data Cloud) is?',
    question_ja: 'Data 360（Data Cloud）が何であるかを最もよく表しているのはどれか。',
    options: [
      {
        text: 'A replacement for the Salesforce CRM database that stores all records in one object',
        text_ja: 'すべてのレコードを1つのオブジェクトに保管する、Salesforce CRM データベースの置き換え',
        correct: false,
        note: 'Data 360 does not replace CRM. Records stay in their source systems; Data 360 builds a unified view across them.',
        note_ja: 'Data 360 は CRM を置き換えない。レコードは各ソースシステムに残り、Data 360 はそれらを横断した統合ビューを作る。',
      },
      {
        text: 'A customer data platform that connects to data across systems, harmonises it, resolves identities and makes the result actionable',
        text_ja: 'システム横断でデータに接続し、調和させ、IDを解決し、その結果を行動につなげる顧客データプラットフォーム',
        correct: true,
        note: 'Correct. This is the connect → harmonise → unify → analyse → act pipeline in one sentence.',
        note_ja: '正解。接続→調和→統合→分析→実行というパイプラインを1文で表している。',
      },
      {
        text: 'A reporting tool that builds dashboards over existing Salesforce objects',
        text_ja: '既存の Salesforce オブジェクトの上にダッシュボードを作るレポーティングツール',
        correct: false,
        note: 'Reporting is a consumer of Data 360, not its definition. CRM Analytics and Tableau do the dashboards.',
        note_ja: 'レポーティングは Data 360 の利用者であって定義ではない。ダッシュボードは CRM Analytics や Tableau が担う。',
      },
      {
        text: 'A data warehouse for long-term archival of historical transactions',
        text_ja: '過去トランザクションを長期保管するためのデータウェアハウス',
        correct: false,
        note: 'Archival storage is not the purpose. Data 360 exists to resolve and activate the customer, not to warehouse history.',
        note_ja: '長期保管は目的ではない。Data 360 は顧客を解決し行動につなげるために存在し、履歴を倉庫に積むためではない。',
      },
    ],
    explanation:
      'Data 360 is a customer data platform. Its defining job is producing a single resolved view of a customer across fragmented systems and then making that view usable — in segmentation, in AI grounding and in operational systems. It neither replaces CRM storage nor functions primarily as a warehouse or a reporting tool.',
    explanation_ja:
      'Data 360 は顧客データプラットフォームである。その本質的な役割は、分断されたシステムを横断して顧客の解決済みの単一ビューを作り、それをセグメンテーション・AIのグラウンディング・業務システムで使えるようにすることにある。CRM の保管を置き換えるものでも、主にウェアハウスやレポーティングツールとして機能するものでもない。',
    reference:
      '💡 Memorise the pipeline order — connect → harmonise → unify → analyse → act. Most positioning questions are asking which stage a term belongs to.',
    reference_ja:
      '💡 パイプラインの順序を覚える：接続→調和→統合→分析→実行。位置づけの設問の多くは「その用語がどの段階か」を問うている。',
  },
  {
    id: 'dc-pos-2',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'A customer asks why Data 360 matters for their planned generative AI assistant. What is the most accurate explanation?',
    question_ja:
      '顧客が、計画中の生成AIアシスタントにとって Data 360 がなぜ重要なのかを尋ねてきた。最も正確な説明はどれか。',
    options: [
      {
        text: 'It provides the large language model that answers customer questions',
        text_ja: '顧客の質問に回答する大規模言語モデルを提供するから',
        correct: false,
        note: 'Data 360 supplies data, not the model. The model comes from the AI platform.',
        note_ja: 'Data 360 が供給するのはデータでありモデルではない。モデルは AI プラットフォーム側のもの。',
      },
      {
        text: 'It grounds the model in a unified, current view of the customer so answers are based on complete context',
        text_ja: '統合された最新の顧客像でモデルをグラウンディングし、完全なコンテキストに基づいた回答にするから',
        correct: true,
        note: 'Correct. Grounding is the role Data 360 plays, and unification is why the grounding is trustworthy.',
        note_ja: '正解。Data 360 の役割はグラウンディングであり、その根拠が信頼できるのは統合されているからである。',
      },
      {
        text: 'It removes the need to configure permissions because AI answers are always safe to show',
        text_ja: 'AIの回答は常に安全に表示できるため、権限設定が不要になるから',
        correct: false,
        note: 'Dangerous and wrong. Access control and consent apply to AI-surfaced data exactly as elsewhere.',
        note_ja: '危険かつ誤り。アクセス制御と同意は、AIが提示するデータにも他と同様に適用される。',
      },
      {
        text: 'It fine-tunes the model automatically on every new record ingested',
        text_ja: '新しいレコードを取り込むたびにモデルを自動的にファインチューニングするから',
        correct: false,
        note: 'Grounding is retrieval at prompt time, not continuous fine-tuning of the model weights.',
        note_ja: 'グラウンディングはプロンプト実行時の検索であり、モデルの重みを継続的にファインチューニングすることではない。',
      },
    ],
    explanation:
      'Generative AI quality is bounded by the context it is given. Data 360 is the grounding layer: data graphs supply structured customer context with low latency and retrievers search indexed content, together forming retrieval-augmented generation. Grounding on an unresolved profile hands the model a fragment of the customer, which is how confidently wrong answers are produced.',
    explanation_ja:
      '生成AI の品質は与えられたコンテキストで上限が決まる。Data 360 はそのグラウンディング層であり、Data Graph が構造化された顧客コンテキストを低遅延で供給し、Retriever がインデックス済みコンテンツを検索して、あわせて RAG を構成する。未解決のプロファイルにグラウンディングするとモデルには顧客の断片しか渡らず、自信満々の誤答が生まれる。',
    reference:
      '💡 Predictive AI writes a prediction back as data you can segment on. Generative AI reads context at prompt time and writes nothing back.',
    reference_ja:
      '💡 予測AI は予測結果をデータとして書き戻し、それをセグメントに使える。生成AI はプロンプト実行時にコンテキストを読むだけで、何も書き戻さない。',
  },
  {
    id: 'dc-pos-3',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A retailer has just purchased Data 360. The CIO wants every system in the company connected in the first phase: CRM, e-commerce, the loyalty platform, the data warehouse, the point-of-sale system and two regional ERPs. No specific business outcome has been agreed yet.',
    scenario_ja:
      'ある小売企業が Data 360 を購入したばかりである。CIO は第1フェーズで社内のすべてのシステム（CRM、EC、ロイヤルティ基盤、データウェアハウス、POS、2つの地域 ERP）を接続したいと考えている。具体的なビジネス成果はまだ合意されていない。',
    question: 'What should the consultant recommend?',
    question_ja: 'コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'Agree a single measurable use case first, then ingest only the sources that use case requires',
        text_ja: 'まず測定可能なユースケースを1つ合意し、そのユースケースに必要なソースだけを取り込む',
        correct: true,
        note: 'Correct. Outcome first, data second. This limits credit consumption and produces demonstrable value quickly.',
        note_ja: '正解。成果が先、データが後。クレジット消費を抑え、示せる価値を早く出せる。',
      },
      {
        text: 'Ingest all seven sources in phase one so the data is ready for any future use case',
        text_ja: '将来どのユースケースにも対応できるよう、第1フェーズで7つすべてのソースを取り込む',
        correct: false,
        note: 'The classic wrong answer. It maximises cost and time-to-value, and slows identity resolution with data nobody has a use for.',
        note_ja: '典型的な誤答。コストと価値実現までの時間を最大化し、誰も使い道のないデータで ID解決を遅くする。',
      },
      {
        text: 'Start with the data warehouse only, since it already contains data from the other systems',
        text_ja: '他システムのデータを既に含んでいるため、データウェアハウスだけから始める',
        correct: false,
        note: 'Still data-first rather than outcome-first, and warehouse data is often aggregated and stale for real-time use.',
        note_ja: 'これも成果ではなくデータから始めている。またウェアハウスのデータは集計済み・古いことが多く、リアルタイム用途に向かない。',
      },
      {
        text: 'Decline the project until the CIO produces a complete enterprise data dictionary',
        text_ja: 'CIO が全社のデータディクショナリを完成させるまでプロジェクトを断る',
        correct: false,
        note: 'Disproportionate. A consultant guides scope; they do not block delivery pending exhaustive documentation.',
        note_ja: '過剰。コンサルタントはスコープを導くのであって、網羅的な文書化を待って提供を止めるのではない。',
      },
    ],
    explanation:
      'Positioning questions that describe an "ingest everything" ambition are testing outcome-first thinking. Choose one measurable business outcome, work backwards to the minimum data needed, and prove value. Extra data consumes credits, slows identity resolution and delays the first demonstrable result.',
    explanation_ja:
      '「全部取り込みたい」という意欲を描いた位置づけの設問は、成果起点で考えられるかを試している。測定可能なビジネス成果を1つ選び、そこから必要最小限のデータへ逆算し、価値を示す。余分なデータはクレジットを消費し、ID解決を遅くし、最初の成果が出るまでを引き延ばす。',
    reference:
      '💡 "Reduce churn in the premium tier" is a use case. "Ingest the data warehouse" is not — it names data, not an outcome.',
    reference_ja:
      '💡 「プレミアム層の解約を減らす」はユースケース。「データウェアハウスを取り込む」はユースケースではない。データを述べているだけで成果ではない。',
  },
  {
    id: 'dc-pos-4',
    domain: 'dc-positioning',
    type: 'multi',
    question: 'Which two are appropriate initial use cases for a first Data 360 implementation? (Choose 2)',
    question_ja: '最初の Data 360 導入における初期ユースケースとして適切なものを2つ選べ。',
    options: [
      {
        text: 'Suppressing existing customers from acquisition advertising to reduce wasted spend',
        text_ja: '既存顧客を獲得広告から除外し、無駄な広告費を削減する',
        correct: true,
        note: 'Correct. Narrow, needs few sources, and the saving is directly measurable — an ideal first use case.',
        note_ja: '正解。範囲が狭く必要なソースも少なく、削減額が直接測定できる。最初のユースケースとして理想的。',
      },
      {
        text: 'Giving service agents a unified view of the customer across support, commerce and marketing',
        text_ja: 'サポート・コマース・マーケティングを横断した統合ビューをサポート担当者に提供する',
        correct: true,
        note: 'Correct. A well-bounded use case with a clear outcome (handle time, resolution rate) and obvious value from unification.',
        note_ja: '正解。範囲が明確で成果（対応時間、解決率）もはっきりしており、統合の価値が分かりやすい。',
      },
      {
        text: 'Replacing the enterprise data warehouse as the company\'s system of record',
        text_ja: '全社の記録システムとして、企業のデータウェアハウスを置き換える',
        correct: false,
        note: 'Data 360 is not a warehouse replacement, and a platform migration is not a use case.',
        note_ja: 'Data 360 はウェアハウスの置き換えではなく、基盤移行はユースケースではない。',
      },
      {
        text: 'Migrating all historical transactions from the last fifteen years for archival',
        text_ja: '過去15年分のすべてのトランザクションを保管目的で移行する',
        correct: false,
        note: 'Archival is not an outcome, and this maximises cost while delivering nothing measurable.',
        note_ja: '保管は成果ではない。コストを最大化しながら測定可能なものを何も生まない。',
      },
      {
        text: 'Rebuilding every CRM page layout to display Data 360 fields',
        text_ja: 'Data 360 の項目を表示するため、すべての CRM ページレイアウトを作り直す',
        correct: false,
        note: 'A configuration task, not a business outcome, and doing it everywhere before proving value is premature.',
        note_ja: 'ビジネス成果ではなく設定作業。価値を示す前に全面展開するのは時期尚早。',
      },
    ],
    explanation:
      'A good starter use case is narrow, needs few sources, and produces a number someone already cares about. Suppression and a unified agent view both qualify. Warehouse replacement, bulk archival and org-wide layout changes are platform activities, not outcomes, and none of them demonstrates the value of unification.',
    explanation_ja:
      '良い初期ユースケースは、範囲が狭く、必要なソースが少なく、誰かが既に気にしている数値を動かす。除外（サプレッション）と担当者向け統合ビューはいずれも該当する。ウェアハウスの置き換え、一括保管、全社的なレイアウト変更は基盤側の活動であって成果ではなく、いずれも統合の価値を示さない。',
    reference:
      '💡 Test a proposed use case with one question: what number changes, and can we measure it today?',
    reference_ja:
      '💡 ユースケース候補は1つの問いで検証する：どの数値が動くのか、そしてそれを今日測定できるのか。',
  },
  {
    id: 'dc-pos-5',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'A company collected email addresses for order confirmations only. Marketing now wants to use the same addresses for a promotional campaign. What should the consultant advise?',
    question_ja:
      'ある企業は注文確認のためだけにメールアドレスを収集した。マーケティング部門が同じアドレスを販促キャンペーンに使いたいと考えている。コンサルタントは何を助言すべきか。',
    options: [
      {
        text: 'Proceed, because the addresses are already in Data 360 and technically available for activation',
        text_ja: 'アドレスは既に Data 360 にあり技術的にアクティベート可能なので、そのまま進める',
        correct: false,
        note: 'Technical capability is not permission. This is the exact confusion the ethics objective tests.',
        note_ja: '技術的に可能であることは、やってよいことを意味しない。倫理の観点が試しているのはまさにこの取り違え。',
      },
      {
        text: 'Do not use them for marketing without consent for that purpose; obtain marketing consent and filter activations on it',
        text_ja: 'その目的の同意なしにマーケティングへ使わない。マーケティングの同意を取得し、アクティベーションをそれで絞り込む',
        correct: true,
        note: 'Correct. Data collected for a stated purpose may only be used for that purpose; repurposing requires fresh consent.',
        note_ja: '正解。明示した目的のために収集したデータはその目的にのみ使える。用途変更には新たな同意が必要。',
      },
      {
        text: 'Use them once, then add an unsubscribe link so recipients can opt out afterwards',
        text_ja: '一度だけ使い、その後オプトアウトできるよう配信停止リンクを付ける',
        correct: false,
        note: 'Opt-out after the fact does not cure sending without consent — the unconsented send has already happened.',
        note_ja: '事後のオプトアウトでは、同意なしの送信は正当化されない。同意なき送信は既に行われている。',
      },
      {
        text: 'Move the addresses to a separate data space, which removes the original purpose restriction',
        text_ja: 'アドレスを別のデータスペースへ移すことで、当初の目的による制限を解除する',
        correct: false,
        note: 'Data spaces control visibility, not consent. Moving data does not change what the customer agreed to.',
        note_ja: 'データスペースが制御するのは可視範囲であって同意ではない。データを移しても顧客が同意した内容は変わらない。',
      },
    ],
    explanation:
      'Purpose limitation is a core data ethics principle and a named exam objective. Data collected for one stated purpose may not be repurposed without consent for the new purpose. The correct design also filters activations on consent automatically, so that an opted-out individual cannot be sent regardless of who runs the campaign.',
    explanation_ja:
      '目的の限定はデータ倫理の中核原則であり、試験の明示された観点でもある。ある目的のために収集したデータは、新しい目的についての同意なしに転用してはならない。正しい設計ではアクティベーションを同意で自動的に絞り込み、誰がキャンペーンを実行してもオプトアウト済みの人が送信対象にならないようにする。',
    reference:
      '💡 In this exam, "we technically can" is never a reason. Ask what the customer agreed to, then design so the rule enforces itself.',
    reference_ja:
      '💡 この試験では「技術的にできる」は理由にならない。顧客が何に同意したかを問い、そのルールが自動的に効く設計にする。',
  },
  {
    id: 'dc-pos-6',
    domain: 'dc-positioning',
    type: 'mcq',
    question: 'Which Data 360 concept represents the harmonised, canonical shape of ingested data?',
    question_ja: '取り込んだデータの、調和された正規の形を表す Data 360 の概念はどれか。',
    options: [
      {
        text: 'Data Lake Object (DLO)',
        text_ja: 'Data Lake Object（DLO）',
        correct: false,
        note: 'The DLO is the raw landing shape with the source\'s own field names, before harmonisation.',
        note_ja: 'DLO は調和前の、ソース側の項目名のままの生の着地形。',
      },
      {
        text: 'Data Model Object (DMO)',
        text_ja: 'Data Model Object（DMO）',
        correct: true,
        note: 'Correct. The DMO is the object in the Customer 360 data model that DLOs are mapped onto.',
        note_ja: '正解。DMO は DLO のマッピング先となる、Customer 360 データモデル上のオブジェクト。',
      },
      {
        text: 'Data stream',
        text_ja: 'データストリーム',
        correct: false,
        note: 'A data stream is the ingestion pipeline that produces a DLO, not a shape of data.',
        note_ja: 'データストリームは DLO を生む取り込みのパイプラインであり、データの形ではない。',
      },
      {
        text: 'Data graph',
        text_ja: 'Data Graph',
        correct: false,
        note: 'A data graph is a denormalised materialised view built for fast reads, well after harmonisation.',
        note_ja: 'Data Graph は高速読み取りのために作る非正規化のマテリアライズドビューで、調和よりずっと後の段階。',
      },
    ],
    explanation:
      'A data stream ingests from a source and produces a DLO holding the raw shape. Mapping aligns DLO fields to DMO fields in the Customer 360 data model, and the DMO is what everything downstream — identity resolution, insights, segmentation, activation — actually operates on.',
    explanation_ja:
      'データストリームがソースから取り込み、生の形を保持する DLO を作る。マッピングが DLO の項目を Customer 360 データモデルの DMO の項目へ揃え、その DMO が下流のすべて（ID解決、インサイト、セグメンテーション、アクティベーション）の実際の対象になる。',
    reference:
      '💡 Stream → DLO → (mapping) → DMO → identity resolution → segment. Nothing downstream reads the DLO directly.',
    reference_ja:
      '💡 ストリーム→DLO→（マッピング）→DMO→ID解決→セグメント。下流のどれも DLO を直接は読まない。',
  },
  {
    id: 'dc-pos-7',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A bank\'s executive sponsor is unconvinced by the Data 360 proposal. She points out that the bank already has a data warehouse containing every system\'s data, and a BI team producing customer reports from it.',
    scenario_ja:
      'ある銀行のエグゼクティブスポンサーが Data 360 の提案に納得していない。銀行には既に全システムのデータを含むデータウェアハウスがあり、BI チームがそこから顧客レポートを作成していると指摘している。',
    question: 'Which explanation best differentiates Data 360 from the existing warehouse?',
    question_ja: '既存のウェアハウスとの違いを最もよく説明しているのはどれか。',
    options: [
      {
        text: 'Data 360 stores more data than a warehouse can hold',
        text_ja: 'Data 360 はウェアハウスより多くのデータを保管できる',
        correct: false,
        note: 'Volume is not the differentiator, and the claim is not generally true.',
        note_ja: '容量は差別化要因ではないし、その主張は一般に正しくない。',
      },
      {
        text: 'Data 360 resolves records into a single customer identity and makes that identity directly actionable in operational systems',
        text_ja: 'Data 360 はレコードを単一の顧客IDに解決し、そのIDを業務システムで直接行動につなげられるようにする',
        correct: true,
        note: 'Correct. Identity resolution plus activation is precisely what a warehouse and a BI report do not provide.',
        note_ja: '正解。ID解決とアクティベーションこそ、ウェアハウスや BI レポートが提供しないもの。',
      },
      {
        text: 'Data 360 produces better-looking dashboards than the BI team\'s reports',
        text_ja: 'Data 360 は BI チームのレポートより見栄えのよいダッシュボードを作る',
        correct: false,
        note: 'Presentation is not the argument, and it dismisses the sponsor\'s existing investment rather than addressing it.',
        note_ja: '見た目は論点ではないし、スポンサーの既存投資に向き合わずに切り捨てている。',
      },
      {
        text: 'Data 360 removes the need for the data warehouse entirely',
        text_ja: 'Data 360 によってデータウェアハウスは完全に不要になる',
        correct: false,
        note: 'Overreach. The two coexist, and Zero Copy is designed specifically so the warehouse can stay where it is.',
        note_ja: '言い過ぎ。両者は共存するし、Zero Copy はまさにウェアハウスをその場に残せるように設計されている。',
      },
    ],
    explanation:
      'A warehouse stores and reports; it typically leaves the same person as several rows and cannot push a decision into an operational channel. Data 360 adds identity resolution and activation, and Zero Copy means the warehouse does not have to be replaced or duplicated to participate.',
    explanation_ja:
      'ウェアハウスは保管とレポーティングを行うが、通常は同一人物を複数行のまま残し、判断を業務チャネルへ押し出すこともできない。Data 360 は ID解決とアクティベーションを追加し、Zero Copy によってウェアハウスは置き換えも複製もせずに参加できる。',
    reference:
      '💡 Never position Data 360 by attacking an existing investment. Position it by naming what the existing investment structurally cannot do.',
    reference_ja:
      '💡 既存投資を攻撃して Data 360 を位置づけないこと。既存投資が構造的にできないことを挙げて位置づける。',
  },
  {
    id: 'dc-pos-8',
    domain: 'dc-positioning',
    type: 'mcq',
    question: 'How is Data 360 priced, and why does that matter to solution design?',
    question_ja: 'Data 360 の課金はどのような仕組みで、それが設計にどう影響するか。',
    options: [
      {
        text: 'Per named user, so design should minimise the number of users granted access',
        text_ja: '指名ユーザー単位。したがってアクセスを付与するユーザー数を最小化すべき',
        correct: false,
        note: 'Data 360 is not licensed primarily per user, and restricting users would not control the main cost driver.',
        note_ja: 'Data 360 は主にユーザー単位のライセンスではないし、ユーザーを絞っても主要なコスト要因は制御できない。',
      },
      {
        text: 'Consumption-based in credits, so ingestion volume, processing, queries and activations all carry cost',
        text_ja: 'クレジットによる従量課金。したがって取り込み量、処理、クエリ、アクティベーションのすべてがコストを伴う',
        correct: true,
        note: 'Correct. This is why narrow data streams, sensible refresh schedules and Zero Copy are so often the right design.',
        note_ja: '正解。絞り込んだデータストリーム、妥当な更新スケジュール、Zero Copy が正しい設計になりやすいのはこのため。',
      },
      {
        text: 'A flat annual fee that makes data volume irrelevant to design',
        text_ja: '定額の年間料金であり、データ量は設計に無関係',
        correct: false,
        note: 'If volume were free, "ingest everything" would be a defensible strategy. It is not.',
        note_ja: '量が無料なら「全部取り込む」も正当化できるはずだが、実際にはそうではない。',
      },
      {
        text: 'Per data space, so consolidating everything into one space is always cheapest',
        text_ja: 'データスペース単位。したがってすべてを1つのスペースに統合するのが常に最も安い',
        correct: false,
        note: 'Data spaces are a governance construct, not the billing unit, and consolidating them can break required separation.',
        note_ja: 'データスペースはガバナンスの仕組みであって課金単位ではない。統合すると必要な分離が壊れることもある。',
      },
    ],
    explanation:
      'Data 360 consumes credits across ingestion, processing, queries and activations. Design choices therefore have a direct cost consequence, which is the underlying reason the exam rewards ingesting only what the use case needs, scheduling refreshes to the business need rather than as often as possible, and using Zero Copy when the data already lives in a supported platform.',
    explanation_ja:
      'Data 360 は取り込み・処理・クエリ・アクティベーションを通じてクレジットを消費する。したがって設計の選択がそのままコストに響く。ユースケースに必要なものだけを取り込む、更新は可能な限り頻繁にではなく業務上の必要に合わせる、データが対応プラットフォームに既にあるなら Zero Copy を使う——試験がこれらを評価する根本理由がこれである。',
    reference:
      '💡 When two designs both work, the exam usually prefers the one that moves or recomputes less data.',
    reference_ja:
      '💡 2つの設計がどちらも動くとき、試験は通常、動かすデータ量や再計算量が少ない方を選ぶ。',
  },
  {
    id: 'dc-pos-9',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'A stakeholder asks whether the exam topic "Data Cloud" and the product "Data 360" are different things. What is correct?',
    question_ja:
      'あるステークホルダーが、試験科目の「Data Cloud」と製品の「Data 360」は別物かと尋ねてきた。正しいのはどれか。',
    options: [
      {
        text: 'They are the same product; Salesforce renamed Data Cloud to Data 360, and the credential name changed accordingly',
        text_ja: '同じ製品である。Salesforce が Data Cloud を Data 360 へ改称し、資格名もそれに合わせて変更された',
        correct: true,
        note: 'Correct. Older material and much of the setup UI still say Data Cloud; treat the terms as interchangeable.',
        note_ja: '正解。古い教材や設定画面の多くは今も Data Cloud のまま。用語は互換として扱う。',
      },
      {
        text: 'Data 360 is a premium tier sold on top of Data Cloud',
        text_ja: 'Data 360 は Data Cloud の上位に販売される上位エディション',
        correct: false,
        note: 'There is no separate premium product; the rename applies to the whole product.',
        note_ja: '別の上位製品は存在しない。改称は製品全体に適用される。',
      },
      {
        text: 'Data Cloud handles ingestion and Data 360 handles activation',
        text_ja: 'Data Cloud が取り込みを、Data 360 がアクティベーションを担当する',
        correct: false,
        note: 'Invented split. Both names refer to the same platform, which does both.',
        note_ja: '架空の分担。どちらの名称も同一のプラットフォームを指し、そのプラットフォームが両方を行う。',
      },
      {
        text: 'Data 360 replaced Data Cloud, and Data Cloud features were removed',
        text_ja: 'Data 360 が Data Cloud を置き換え、Data Cloud の機能は削除された',
        correct: false,
        note: 'A rename is not a replacement — no capability was withdrawn.',
        note_ja: '改称は置き換えではない。失われた機能はない。',
      },
    ],
    explanation:
      'Salesforce renamed the product and the credential to Data 360. The exam and the product UI may use either term, and some permission sets were renamed alongside it (Data Cloud Admin now appears as Data Cloud Architect in newer orgs). Do not read a renamed term as a different feature.',
    explanation_ja:
      'Salesforce は製品名と資格名を Data 360 へ改称した。試験でも製品画面でもどちらの表記も使われ得る。あわせて一部の権限セットも改称されている（Data Cloud Admin は新しい組織では Data Cloud Architect と表示される）。改称された用語を別機能と読み違えないこと。',
    reference:
      '💡 Data Cloud = Data 360. The current credential name is "Salesforce Certified Data 360 Consultant".',
    reference_ja:
      '💡 Data Cloud ＝ Data 360。現在の資格名は「Salesforce Certified Data 360 Consultant」。',
  },
  {
    id: 'dc-pos-10',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A healthcare provider wants to use Data 360 to unify patient records across appointment, billing and portal systems. Their privacy officer asks what governance principles will apply to the implementation.',
    scenario_ja:
      'ある医療機関が、予約・請求・ポータルの各システムを横断して患者レコードを統合するために Data 360 を使いたいと考えている。プライバシー責任者が、導入にどのガバナンス原則が適用されるかを尋ねている。',
    question: 'Which principle should the consultant emphasise first?',
    question_ja: 'コンサルタントが最初に強調すべき原則はどれか。',
    options: [
      {
        text: 'Data minimisation — ingest only the fields the agreed use case requires, not everything the sources offer',
        text_ja: 'データ最小化 — ソースが提供するすべてではなく、合意したユースケースに必要な項目だけを取り込む',
        correct: true,
        note: 'Correct. Minimisation reduces both privacy exposure and cost, and it is the principle that shapes the very first design decision.',
        note_ja: '正解。最小化はプライバシー上の露出とコストの両方を減らし、最初の設計判断そのものを形づくる原則。',
      },
      {
        text: 'Encrypt every field, because encryption satisfies all governance requirements',
        text_ja: 'すべての項目を暗号化する。暗号化はガバナンス要件をすべて満たすため',
        correct: false,
        note: 'Encryption protects data at rest and in transit; it says nothing about purpose, consent, retention or access.',
        note_ja: '暗号化は保存時と転送時のデータを守るだけで、目的・同意・保持期間・アクセスについては何も担保しない。',
      },
      {
        text: 'Grant the privacy officer System Administrator so she can audit everything directly',
        text_ja: 'プライバシー責任者にシステム管理者権限を付与し、すべてを直接監査できるようにする',
        correct: false,
        note: 'Over-provisioning is itself a governance failure. Grant the narrowest permission set that covers the job.',
        note_ja: '過剰な権限付与そのものがガバナンス上の失敗。職務に足りる最小の権限セットを付与する。',
      },
      {
        text: 'Defer governance decisions until after unification is working, to avoid delaying the build',
        text_ja: '構築の遅延を避けるため、統合が動くまでガバナンスの判断を先送りする',
        correct: false,
        note: 'Governance is a design input, not a later review. Retrofitting it means re-ingesting and re-resolving.',
        note_ja: 'ガバナンスは後から行うレビューではなく設計の入力。後付けは再取り込みと再解決を意味する。',
      },
    ],
    explanation:
      'Minimisation is the principle that acts earliest: it determines which fields enter the platform at all, and every later control — consent filtering, retention, access — is simpler when less sensitive data was brought in to begin with. It is simultaneously an ethics principle and a cost principle, which is why the exam favours it.',
    explanation_ja:
      '最小化は最も早い段階で効く原則である。そもそもどの項目をプラットフォームに入れるかを決め、その後のすべての制御（同意によるフィルタ、保持期間、アクセス）は、機微なデータを最初から少なく入れておくほど簡単になる。倫理の原則であると同時にコストの原則でもあり、だからこそ試験はこれを重視する。',
    reference:
      '💡 Governance covers more than privacy: ownership, quality, retention and visibility. Data spaces and permission sets are how visibility is implemented.',
    reference_ja:
      '💡 ガバナンスはプライバシーだけではない。所有者、品質、保持期間、可視範囲も含む。可視範囲を実装するのがデータスペースと権限セット。',
  },
  {
    id: 'dc-pos-11',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'Which term describes the profile produced when identity resolution links several source records to one person?',
    question_ja:
      'ID解決が複数のソースレコードを1人に紐づけたときに生成されるプロファイルを指す用語はどれか。',
    options: [
      {
        text: 'Unified Individual profile',
        text_ja: 'Unified Individual（統合プロファイル）',
        correct: true,
        note: 'Correct. The unified individual is the output of identity resolution and the usual base for segmentation.',
        note_ja: '正解。Unified Individual は ID解決の出力であり、セグメンテーションの通常の基点。',
      },
      {
        text: 'Data Lake Object',
        text_ja: 'Data Lake Object',
        correct: false,
        note: 'The DLO is raw ingested data, upstream of any resolution.',
        note_ja: 'DLO は取り込んだ生データで、解決処理より上流にある。',
      },
      {
        text: 'Calculated insight',
        text_ja: 'Calculated Insight',
        correct: false,
        note: 'A calculated insight is a derived metric, not a profile.',
        note_ja: 'Calculated Insight は導出された指標であってプロファイルではない。',
      },
      {
        text: 'Activation target',
        text_ja: 'アクティベーションターゲット',
        correct: false,
        note: 'An activation target is a destination system at the very end of the pipeline.',
        note_ja: 'アクティベーションターゲットはパイプラインの最後にある宛先システム。',
      },
    ],
    explanation:
      'Identity resolution applies match rules to decide which source records represent the same person, then reconciliation rules to decide which conflicting values are shown. The result is a Unified Individual profile linked back to the source profiles that formed it, and it is what segmentation normally targets.',
    explanation_ja:
      'ID解決は、まず一致ルールでどのソースレコードが同一人物かを判断し、次に調整ルールで衝突する値のうちどれを表示するかを決める。その結果が Unified Individual（統合プロファイル）で、それを構成したソースプロファイルに紐づいており、セグメンテーションの通常の対象となる。',
    reference:
      '💡 Unification is scheduled, not instant. "The unified profile is missing" is very often just a ruleset that has not run yet.',
    reference_ja:
      '💡 統合は即時ではなくスケジュール実行。「統合プロファイルが無い」の多くは、単にルールセットが未実行なだけ。',
  },
  {
    id: 'dc-pos-12',
    domain: 'dc-positioning',
    type: 'multi',
    question:
      'Which two capabilities distinguish Data 360 from simply loading all source data into one database? (Choose 2)',
    question_ja:
      '全ソースのデータを1つのデータベースに読み込むのと比べて、Data 360 を特徴づける能力を2つ選べ。',
    options: [
      {
        text: 'Identity resolution that collapses multiple source records into one customer profile',
        text_ja: '複数のソースレコードを1つの顧客プロファイルにまとめる ID解決',
        correct: true,
        note: 'Correct. A shared database still leaves the same person as several rows; resolution is what makes them one.',
        note_ja: '正解。共通のデータベースに入れても同一人物は複数行のまま。1人にするのが ID解決。',
      },
      {
        text: 'Activation that pushes segments and attributes into operational systems and channels',
        text_ja: 'セグメントと属性を業務システムやチャネルへ送り出すアクティベーション',
        correct: true,
        note: 'Correct. A database is read-from; Data 360 also acts, delivering populations to destinations.',
        note_ja: '正解。データベースは読み出される側だが、Data 360 は母集団を宛先へ届けて行動もする。',
      },
      {
        text: 'Guaranteed elimination of all duplicate records in every source system',
        text_ja: 'すべてのソースシステムにおける重複レコードの完全な排除の保証',
        correct: false,
        note: 'Data 360 resolves a unified view; it does not clean up or deduplicate the source systems themselves.',
        note_ja: 'Data 360 は統合ビューを作るのであって、ソースシステム側を整理・重複排除するわけではない。',
      },
      {
        text: 'Automatic generation of business requirements from the ingested data',
        text_ja: '取り込んだデータからのビジネス要件の自動生成',
        correct: false,
        note: 'Not a capability of any platform. Requirements come from stakeholders.',
        note_ja: 'どのプラットフォームにもない機能。要件はステークホルダーから来る。',
      },
      {
        text: 'Replacement of the need for consent management',
        text_ja: '同意管理を不要にすること',
        correct: false,
        note: 'The opposite: unifying data makes consent management more important, not less.',
        note_ja: '逆である。データを統合するほど同意管理は重要になる。',
      },
    ],
    explanation:
      'A shared database gives you co-location. Data 360 adds the two things co-location does not: resolving records into one person, and acting on the result by delivering it to the systems where work happens. Note also that Data 360 does not clean the source systems — the sources keep their duplicates; only the unified view is resolved.',
    explanation_ja:
      '共通のデータベースが与えるのは「同じ場所に置くこと」だけである。Data 360 はそれだけでは得られない2つを加える。レコードを1人に解決すること、そしてその結果を業務が行われるシステムへ届けて行動につなげることである。なお Data 360 はソースシステムを整理しない。ソース側の重複はそのまま残り、解決されるのは統合ビューだけである。',
    reference:
      '💡 Data 360 unifies the view, not the sources. Source systems keep their own records exactly as they were.',
    reference_ja:
      '💡 Data 360 が統合するのはビューであってソースではない。ソースシステムのレコードは元のまま残る。',
  },
  {
    id: 'dc-pos-13',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A marketing director wants Data 360 so she can target customers who browsed a product but did not buy it, while the customer is still on the website. The IT director insists this is the same as their existing nightly warehouse extract.',
    scenario_ja:
      'あるマーケティングディレクターは、商品を閲覧したが購入しなかった顧客に、その顧客がまだ Web サイトにいるうちに働きかけたいと考え、Data 360 を求めている。IT ディレクターは、それは既存の夜間ウェアハウス抽出と同じことだと主張している。',
    question: 'What distinguishes the requirement from the nightly extract?',
    question_ja: 'この要件が夜間抽出と異なる点はどこか。',
    options: [
      {
        text: 'The latency requirement — value decays within minutes, which a nightly batch cannot serve',
        text_ja: '遅延要件。価値が数分で失われるため、夜間バッチでは満たせない',
        correct: true,
        note: 'Correct. "While the customer is still on the site" is a real-time requirement, pointing to streaming insights and data actions.',
        note_ja: '正解。「顧客がまだサイトにいるうちに」はリアルタイム要件であり、Streaming Insight と Data Action を指す。',
      },
      {
        text: 'The volume of data — Data 360 handles more rows than a warehouse extract',
        text_ja: 'データ量。Data 360 はウェアハウス抽出より多くの行を扱える',
        correct: false,
        note: 'Volume is not what fails here. A nightly extract of any size still arrives too late.',
        note_ja: 'ここで問題なのは量ではない。どれだけ大きくても夜間抽出では間に合わない。',
      },
      {
        text: 'The number of source systems involved',
        text_ja: '関係するソースシステムの数',
        correct: false,
        note: 'The scenario does not turn on source count; it turns on timing.',
        note_ja: 'このシナリオの分かれ目はソース数ではなくタイミング。',
      },
      {
        text: 'Nothing — the two approaches are equivalent and the extract should be reused',
        text_ja: '違いはない。2つは同等なので抽出を再利用すべき',
        correct: false,
        note: 'They are not equivalent. A batch that runs once a day cannot respond during a session.',
        note_ja: '同等ではない。1日1回のバッチはセッション中に反応できない。',
      },
    ],
    explanation:
      'Read scenarios for the latency requirement. A value that decays in minutes calls for streaming insights computed over time windows and a data action to respond immediately; a stable long-term measure calls for a calculated insight on a schedule. A nightly batch cannot satisfy an in-session requirement no matter how much data it moves.',
    explanation_ja:
      'シナリオからは遅延要件を読み取る。数分で価値が失われるものは、時間ウィンドウで計算する Streaming Insight と、即座に反応する Data Action を必要とする。長期の安定した指標ならスケジュール実行の Calculated Insight でよい。夜間バッチは、どれだけデータを動かしてもセッション中の要件は満たせない。',
    reference:
      '💡 Phrases like "within minutes", "in session" and "before they leave" are the exam signalling streaming, not batch.',
    reference_ja:
      '💡 「数分以内に」「セッション中に」「離脱する前に」といった表現は、バッチではなくストリーミングを指す試験側の合図。',
  },
  {
    id: 'dc-pos-14',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'Which statement about Data 360 and multiple Salesforce orgs is correct?',
    question_ja: 'Data 360 と複数の Salesforce 組織に関する記述として正しいものはどれか。',
    options: [
      {
        text: 'One Data 360 instance can connect several Salesforce orgs and non-Salesforce sources at once',
        text_ja: '1つの Data 360 インスタンスが、複数の Salesforce 組織と非 Salesforce のソースを同時に接続できる',
        correct: true,
        note: 'Correct. Cross-org unification is one of the strongest reasons a multi-org company adopts Data 360.',
        note_ja: '正解。組織横断の統合は、複数組織を持つ企業が Data 360 を採用する最も強い理由の1つ。',
      },
      {
        text: 'Each Salesforce org requires its own separate Data 360 instance',
        text_ja: '各 Salesforce 組織に、それぞれ専用の Data 360 インスタンスが必要',
        correct: false,
        note: 'This would defeat the purpose — the customer would remain fragmented across orgs.',
        note_ja: 'それでは目的が失われる。顧客は組織をまたいで分断されたまま残る。',
      },
      {
        text: 'Data 360 can connect only to Salesforce sources',
        text_ja: 'Data 360 は Salesforce のソースにのみ接続できる',
        correct: false,
        note: 'It connects to cloud storage, SFTP, custom sources via the Ingestion API, and external warehouses via Zero Copy.',
        note_ja: 'クラウドストレージ、SFTP、Ingestion API 経由の独自ソース、Zero Copy 経由の外部ウェアハウスにも接続できる。',
      },
      {
        text: 'Connecting a second org requires re-ingesting the first org\'s data',
        text_ja: '2つ目の組織を接続するには、1つ目の組織のデータを再取り込みする必要がある',
        correct: false,
        note: 'Invented constraint. Sources are added independently.',
        note_ja: '架空の制約。ソースはそれぞれ独立に追加する。',
      },
    ],
    explanation:
      'Data 360 is designed to sit above the org boundary. A single instance connects multiple Salesforce orgs alongside non-Salesforce sources, which is exactly the situation that produces the worst fragmentation — the same customer existing separately in each org with no link between them.',
    explanation_ja:
      'Data 360 は組織の境界の上に位置するよう設計されている。1つのインスタンスが複数の Salesforce 組織と非 Salesforce のソースを同時に接続する。これはまさに最悪の分断が起きる状況——同じ顧客が各組織に別々に存在し、互いに何のつながりもない状態——に対応するものである。',
    reference:
      '💡 Multi-org, multi-brand and multi-region scenarios usually combine one Data 360 instance with several data spaces.',
    reference_ja:
      '💡 複数組織・複数ブランド・複数地域のシナリオでは、通常1つの Data 360 インスタンスと複数のデータスペースを組み合わせる。',
  },
]
