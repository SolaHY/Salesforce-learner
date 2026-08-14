// 学習教材（後半4単元）：ナレッジ管理 / サービスコンソール / 連携とデータ管理 / 分析とKPI

export const knowledgeStudy = {
  intro:
    'Knowledge questions cluster around three ideas: the article lifecycle and what happens to a published article during an update, how data categories control who sees what, and how to measure whether knowledge is actually working. KCS is the methodology that ties them together.',
  intro_ja:
    'ナレッジの設問は3つの論点に集中します。記事のライフサイクルと更新中の公開記事の扱い、データカテゴリによる可視性の制御、そしてナレッジが実際に機能しているかの測定です。それらを束ねる方法論が KCS です。',
  sections: [
    {
      heading: 'Article lifecycle and versioning',
      heading_ja: '記事のライフサイクルとバージョン管理',
      body:
        'The single most repeated knowledge question is what happens to a published article while someone updates it. The answer is designed so the knowledge base never has a gap.',
      body_ja:
        'ナレッジで最も繰り返し問われるのは、誰かが更新している間、公開済みの記事がどうなるかです。答えは「ナレッジベースに空白が生じないように設計されている」というものです。',
      figure: 'sc-article-lifecycle',
      points: [
        'Editing a published article creates a new draft version. The published version stays live and searchable throughout the draft and review process.',
        'The new version replaces the published one only when it is itself published. Nothing is unpublished, archived or deleted as a side effect of editing.',
        'Archiving is a deliberate lifecycle action, never automatic.',
        'The lifecycle is: draft → review/approval (if configured) → published → (edit creates a new draft) → archived when retired.',
        'This applies identically whether an agent or a knowledge manager makes the edit — the exam asks it both ways.',
      ],
      points_ja: [
        '公開済み記事を編集すると新しい下書きバージョンが作られる。下書きとレビューの間、公開済みバージョンは公開・検索可能なまま維持される。',
        '新バージョンが公開されて初めて、公開済みバージョンと置き換わる。編集の副作用として非公開化・アーカイブ・削除が起きることはない。',
        'アーカイブは意図的なライフサイクル操作であり、自動では起きない。',
        'ライフサイクル：下書き → レビュー／承認（設定時） → 公開 →（編集で新しい下書き）→ 廃止時にアーカイブ。',
        '編集者が担当者かナレッジ管理者かにかかわらず同じ挙動。試験は両方の視点で問う。',
      ],
    },
    {
      heading: 'Data categories and visibility',
      heading_ja: 'データカテゴリと可視性',
      body:
        'Data categories classify articles — typically by product line, region or audience — and category visibility settings decide which categories each role or profile can see. When articles are missing for some agents, this is where to look.',
      body_ja:
        'データカテゴリは記事を分類し（通常は製品ライン、地域、対象読者など）、カテゴリの表示設定が、どのロールやプロファイルがどのカテゴリを見られるかを決めます。一部の担当者に記事が表示されない場合は、まずここを確認します。',
      points: [
        'Data category visibility is configured per role or profile and silently filters results — no error, articles simply do not appear.',
        'Diagnose by scope. No Knowledge visible at all → the Knowledge User feature licence or a missing Knowledge component on the page layout. Some articles visible but not others → data category visibility, or article state.',
        'Category visibility also governs what customers see on an Experience Cloud portal, which is how public and internal content are separated.',
        'Promoted search terms boost specific articles for specific search terms. Useful, but they still require the user to search.',
      ],
      points_ja: [
        'データカテゴリの表示設定はロールまたはプロファイル単位で構成され、結果を無言で絞り込む。エラーは出ず、記事が単に表示されない。',
        '範囲で切り分ける。ナレッジがまったく見えない→Knowledge User 機能ライセンス、またはページレイアウトのナレッジコンポーネントの欠落。一部の記事だけ見えない→データカテゴリの表示設定、または記事の状態。',
        'カテゴリの表示設定は Experience Cloud ポータルで顧客が見る内容も制御する。公開コンテンツと社内コンテンツはこれで分離する。',
        'プロモート検索語は特定の検索語に対して特定の記事を上位に出す。有用だが、依然としてユーザーの検索が前提。',
      ],
    },
    {
      heading: 'Deflection, recommendations and KCS (deep dive)',
      heading_ja: 'ケース回避、記事レコメンデーション、KCS（深掘り）',
      body:
        'The business case for knowledge is deflection: customers resolving their own issues, and agents resolving cases faster. Einstein Article Recommendations is the packaged way to surface articles without anyone searching, and KCS is the working practice that keeps the content good.',
      body_ja:
        'ナレッジの投資対効果はケース回避にあります。顧客が自力で解決し、担当者がより速くケースを解決することです。Einstein Article Recommendations は誰も検索せずに記事を提示するための標準機能であり、KCS はコンテンツの質を保つ実践です。',
      points: [
        'Einstein Article Recommendations — analyses case or form content and surfaces likely-relevant articles automatically. Agent-facing in the console, customer-facing on the portal.',
        'Deflecting before submission requires an Experience Cloud portal that recommends articles as the customer describes the issue. Web-to-Case alone cannot do this.',
        'KCS (Knowledge-Centered Support) — agents search Knowledge before working a case, then attach or create articles as part of the resolution workflow. Capture is a by-product of solving, not a separate task.',
        'KCS anti-patterns the exam uses as distractors: publishing a new article for every case (duplication), centralising all review through knowledge managers (bottleneck), aggressive time-based archiving.',
        'Reuse before creating. A new article is written only when nothing existing fits.',
      ],
      points_ja: [
        'Einstein Article Recommendations — ケースやフォームの内容を解析し、関連性の高い記事を自動で提示する。コンソールでは担当者向け、ポータルでは顧客向け。',
        '送信前のケース回避には、顧客が問題を記述している最中に記事を推奨する Experience Cloud ポータルが必要。Web-to-Case 単体では実現できない。',
        'KCS（Knowledge-Centered Support） — 担当者はケース対応前にナレッジを検索し、解決の流れの中で記事を添付または作成する。知識の蓄積は解決の副産物であり、別作業ではない。',
        '試験が誤答として使う KCS のアンチパターン：ケースごとに新規記事を公開（重複の量産）、レビューをナレッジ管理者に集中（ボトルネック）、時間基準の過度なアーカイブ。',
        '作る前に再利用する。既存で合うものがない場合にのみ新規記事を書く。',
      ],
    },
  ],
}

export const consoleStudy = {
  intro:
    'The Service Console unit is about where things live on screen and which productivity tool matches which requirement. Most questions are answered by knowing the purpose of four console regions and the difference between quick text, quick actions and macros.',
  intro_ja:
    'サービスコンソールの単元は「画面上のどこに何を置くか」と「どの生産性ツールがどの要件に合うか」を扱います。設問の多くは、コンソールの4つの領域の役割と、クイックテキスト／クイックアクション／マクロの違いを知っていれば答えられます。',
  sections: [
    {
      heading: 'Console regions and what belongs in each',
      heading_ja: 'コンソールの各領域と配置するもの',
      body:
        'Four regions come up repeatedly, and the exam distinguishes them precisely. Learn each by the question it answers: what is this record, what else relates to it, what tools are always available, and what am I working through.',
      body_ja:
        '繰り返し登場する領域が4つあり、試験はそれらを厳密に区別します。それぞれが答える問いで覚えます。このレコードは何か、他に何が関連するか、常に使えるツールは何か、いま何を順に処理しているのか。',
      figure: 'sc-console-anatomy',
      points: [
        'Highlights Panel — the fixed strip at the top of the record showing key fields (priority, entitlement, account) without scrolling. Configured from the page layout.',
        'Related Records component — surfaces other records, such as the customer\'s other open cases, in a sidebar panel so the agent does not open separate tabs.',
        'Utility Bar — persistent app-level tools in the footer: softphone, history, notes, macros. This is where the softphone must be added, and omitting it is the most common reason it does not appear.',
        'Split View — a record list alongside one open record, for working through a queue efficiently.',
        'Compact layout is related but different: it drives mobile headers and hover previews, not the console top strip.',
      ],
      points_ja: [
        'ハイライトパネル — レコード上部の固定領域で、スクロールせずに主要項目（優先度、エンタイトルメント、取引先）を表示する。ページレイアウトから構成する。',
        '関連レコードコンポーネント — 顧客の他の未解決ケースなど、他のレコードをサイドバーパネルに表示し、別タブを開かずに済むようにする。',
        'ユーティリティバー — フッターに常駐するアプリ全体のツール。ソフトフォン、履歴、メモ、マクロなど。ソフトフォンはここに追加する必要があり、追加漏れが表示されない最多の原因。',
        '分割ビュー — レコード一覧と開いている1件を並べて表示し、キューを効率的に処理する。',
        'コンパクトレイアウトは関連するが別物。モバイルのヘッダーとホバープレビューを制御するもので、コンソール上部の帯ではない。',
      ],
    },
    {
      heading: 'Agent productivity tools (deep dive)',
      heading_ja: '担当者の生産性ツール（深掘り）',
      body:
        'Three tools look similar in a multiple-choice list and are distinguished by how much they do. Match the tool to the number of steps the requirement describes.',
      body_ja:
        '選択肢の中では似て見える3つのツールは、「どこまでやるか」で区別します。要件が示す手順の数にツールを合わせます。',
      points: [
        'Quick Text — inserts predefined text into an email, chat or field. Text only; it cannot update fields.',
        'Quick Action — performs a single operation, such as creating a related record or updating a field.',
        'Macro — runs a multi-step sequence in the console from one trigger: insert the closing message, update the status, log the call. This is the answer whenever a requirement lists several steps "with one click".',
        'Irreversible macros need care, particularly when run in bulk across selected records.',
        'A flow triggered on status change reacts after the agent acts; it is not the one-click action the agent invokes.',
      ],
      points_ja: [
        'クイックテキスト — 定型文をメール、チャット、項目に挿入する。テキストのみで、項目の更新はできない。',
        'クイックアクション — 関連レコードの作成や項目の更新など、単一の操作を実行する。',
        'マクロ — コンソール上で複数手順を1回の実行でまとめて行う。終了メッセージの挿入、ステータスの更新、通話記録の作成など。要件が複数の手順を「1クリックで」と示していれば答えはこれ。',
        '取り消せないマクロは注意が必要。特に選択した複数レコードへ一括実行する場合。',
        'ステータス変更で起動するフローは担当者の操作後に反応するもので、担当者が実行する1クリックの操作ではない。',
      ],
    },
  ],
}

export const dataStudy = {
  intro:
    'This unit combines two related concerns: how Salesforce talks to other systems, and how it copes with large volumes of data. Integration questions are answered by identifying who initiates the call and whether a response is needed; data questions turn on indexes, selectivity, external IDs and cleansing before load.',
  intro_ja:
    'この単元は2つの関連する論点を組み合わせます。Salesforce が他システムとどう対話するか、そして大量データにどう対処するかです。連携の設問は「誰が呼び出すか」「応答が必要か」で答えられ、データの設問はインデックス、選択性、外部ID、読み込み前のクレンジングが軸になります。',
  sections: [
    {
      heading: 'Integration patterns and APIs',
      heading_ja: '連携パターンと API',
      body:
        'Two questions settle almost every integration item: which side initiates the call, and does the caller need the response before it can continue? Answer those and the pattern follows.',
      body_ja:
        'ほぼすべての連携設問は2つの問いで決まります。どちら側が呼び出すのか、そして呼び出し側は続行のために応答を必要とするのか。この2つに答えればパターンが決まります。',
      figure: 'sc-integration-patterns',
      points: [
        'Remote Call-In — an external system calls into Salesforce. An IVR creating a case on an incoming call is the classic example.',
        'Request and Reply — Salesforce calls out and waits for the response before continuing. Implemented as a synchronous callout.',
        'Fire and Forget — Salesforce calls out and does not wait. Platform Events are the native fire-and-forget mechanism.',
        'Batch Data Synchronization — scheduled bulk movement of data between systems.',
        'API selection follows the pattern: Bulk API for large asynchronous loads, Streaming API to push event notifications to subscribers, synchronous SOAP/REST callouts when the response is needed to continue.',
        'Salesforce Connect with external objects — read external data live at view time without storing it in Salesforce. The answer whenever the requirement says "must be current" and "must not be stored".',
      ],
      points_ja: [
        'Remote Call-In — 外部システムが Salesforce を呼び出す。着信時に IVR がケースを作成するのが典型例。',
        'Request and Reply — Salesforce が呼び出し、応答を待ってから続行する。同期コールアウトとして実装する。',
        'Fire and Forget — Salesforce が呼び出し、待たない。Platform Events がネイティブの fire-and-forget 手段。',
        'Batch Data Synchronization — システム間でのスケジュールされた一括データ移動。',
        'API の選択はパターンに従う。大量の非同期読み込みは Bulk API、購読者へのイベント通知は Streaming API、続行に応答が必要な場合は同期の SOAP/REST コールアウト。',
        '外部オブジェクトを用いた Salesforce Connect — 閲覧時に外部データをライブで読み取り、Salesforce に保存しない。「最新である必要」かつ「保存してはならない」という要件の答え。',
      ],
    },
    {
      heading: 'Large data volumes and performance',
      heading_ja: '大量データとパフォーマンス',
      body:
        'At millions of records, list views and reports slow down when filters cannot use an index. Requesting a custom index is only half the answer — the query must also be selective enough for the optimiser to use it.',
      body_ja:
        'レコードが数百万件になると、絞り込みがインデックスを利用できない場合にリストビューやレポートが遅くなります。カスタムインデックスの依頼は答えの半分にすぎず、オプティマイザがそれを使うにはクエリが十分に選択的である必要があります。',
      points: [
        'A custom index on the filtered field lets the query optimiser handle large volumes efficiently. Custom indexes are requested through Salesforce Support.',
        'Selectivity matters: the index is only used when the filter returns a small enough proportion of records. A non-selective filter causes the optimiser to skip the index entirely.',
        'Archiving reduces total volume but does not solve indexing for the active records still being filtered.',
        'Switching from a list view to a report does not change the underlying query cost.',
        'Increasing list view page size makes performance worse, not better.',
      ],
      points_ja: [
        '絞り込み対象項目へのカスタムインデックスにより、クエリオプティマイザが大量データを効率的に処理できる。カスタムインデックスは Salesforce サポート経由で依頼する。',
        '選択性が重要。絞り込みが十分に少ない割合のレコードを返す場合にのみインデックスが使われる。選択性が低いとオプティマイザはインデックスを使わない。',
        'アーカイブは総量を減らすが、絞り込み対象として残るアクティブレコードのインデックス問題は解決しない。',
        'リストビューからレポートに切り替えても、基礎となるクエリコストは変わらない。',
        'リストビューのページサイズを増やすと、パフォーマンスはむしろ悪化する。',
      ],
    },
    {
      heading: 'Migration, external IDs and data quality (deep dive)',
      heading_ja: '移行、外部ID、データ品質（深掘り）',
      body:
        'Migration questions repeat one lesson: design for restartability and clean the data before it enters Salesforce. Both failures described in the practice set — duplicates on restart and 80,000 duplicate customers — trace back to work that should have happened before the first load.',
      body_ja:
        '移行の設問は同じ教訓を繰り返します。再実行可能性を設計し、Salesforce に入る前にデータをクレンジングすること。練習問題に登場する2つの失敗（再実行時の重複と8万件の重複顧客）は、いずれも最初の読み込み前に済ませておくべき作業に起因します。',
      points: [
        'External ID field — stores the legacy record identifier and enables upsert. With it, restarting a failed load updates the already-loaded rows instead of inserting duplicates.',
        'Without an external ID there is no key to match on, so any restart duplicates everything already loaded. Salesforce does not deduplicate automatically.',
        'A formula field cannot be an external ID, and a free-text field is not a matching key.',
        'Deduplicate at source before migration and agree a field matching strategy. Importing known duplicates and cleaning up afterwards is much harder once related records are attached to the wrong parents.',
        'Recommended order: profile the data → cleanse → map → define matching keys → load in dependency order → validate.',
        'Concurrency: flows updating the same parent record simultaneously cause record locking errors. Reduce batch size, order the load by parent, or move the parent update to an asynchronous path.',
        'Governor limits explain most "it ran but nothing happened" symptoms — the daily single-email limit being the classic example.',
      ],
      points_ja: [
        '外部ID項目 — レガシー側のレコード識別子を保持し、upsert を可能にする。これがあれば、失敗した読み込みの再実行はすでに読み込まれた行を更新し、重複を挿入しない。',
        '外部IDがなければ突合キーが存在せず、再実行時にすでに読み込まれた分がすべて重複する。Salesforce が自動的に重複排除することはない。',
        '数式項目は外部IDにできず、自由記述の項目は突合キーにならない。',
        '移行前にソース側で重複排除し、項目の突合戦略を合意する。既知の重複を取り込んで後からクレンジングするのは、関連レコードが誤った親に紐づいた後では格段に難しくなる。',
        '推奨順序：データのプロファイリング→クレンジング→マッピング→突合キーの定義→依存順に読み込み→検証。',
        '同時実行：同じ親レコードを更新するフローが同時に走るとレコードロックエラーになる。バッチサイズを縮小する、親ごとに並べ替える、親の更新を非同期化する。',
        'ガバナ制限は「実行されたのに何も起きない」症状の多くを説明する。1日あたりの単一メール送信上限が典型例。',
      ],
    },
  ],
}

export const analyticsStudy = {
  intro:
    'The smallest unit, and the most mechanical. Match the artefact to the audience, know which metrics genuinely measure what they claim to, and remember that some contact centre data does not exist in Salesforce at all.',
  intro_ja:
    '最も小さく、最も機械的な単元です。成果物を対象者に合わせ、各指標が本当に主張どおりのものを測っているかを見極め、コンタクトセンターのデータの一部は Salesforce 内に存在しないことを覚えておきます。',
  sections: [
    {
      heading: 'Matching the artefact to the audience',
      heading_ja: '成果物を対象者に合わせる',
      body:
        'Reports, dashboards and Omni-Channel Supervisor answer different questions for different people. The exam presents a requester and a requirement, and the correct answer is the artefact that fits both.',
      body_ja:
        'レポート、ダッシュボード、Omni-Channel Supervisor は、それぞれ異なる相手の異なる問いに答えます。試験は依頼者と要件を提示し、その両方に合う成果物が正答になります。',
      points: [
        'Executive wanting monthly trends and year-over-year volume with no case detail → a summary dashboard.',
        'Supervisor wanting live agent availability and queue status → Omni-Channel Supervisor. Dashboards refresh on a schedule and cannot show presence.',
        'Analyst wanting case-level detail → a detailed report.',
        'Report type determines which objects are joined and therefore which fields are available. Choose it from the data you need, not the chart you want.',
        'SLA compliance lives in entitlement milestone completion, so a "cases resolved within SLA" figure needs a Cases with Entitlements report type.',
      ],
      points_ja: [
        '経営層が、ケース詳細なしで月次傾向と前年同期比の件数を求めている→サマリーダッシュボード。',
        'スーパーバイザーが担当者のリアルタイムな稼働状況とキューの状態を求めている→Omni-Channel Supervisor。ダッシュボードはスケジュール更新で、在席状況は表示できない。',
        'アナリストがケース単位の詳細を求めている→詳細レポート。',
        'レポートタイプが、どのオブジェクトを結合し、結果としてどの項目が使えるかを決める。欲しいグラフではなく、必要なデータから選ぶ。',
        'SLA の遵守はエンタイトルメントのマイルストーン達成として記録されるため、「SLA内に解決されたケース」の数値には Cases with Entitlements のレポートタイプが必要。',
      ],
    },
    {
      heading: 'Metrics that measure what they claim (deep dive)',
      heading_ja: '主張どおりのものを測る指標（深掘り）',
      body:
        'Several questions offer four plausible metrics where only one actually measures the stated goal. The distractors typically measure activity where the requirement asks for an outcome.',
      body_ja:
        'もっともらしい4つの指標のうち、実際に目的を測っているのは1つだけ、という設問がいくつもあります。誤答はたいてい、要件が「結果」を求めているのに「活動量」を測っています。',
      points: [
        'Case deflection = customers who viewed an article and did not create a case. Counting portal-created cases measures the opposite.',
        'Agent knowledge adoption = percentage of closed cases with an attached article. Publication counts and search volume measure activity around the knowledge base, not its use.',
        'Article effectiveness = percentage of closed cases where the article was attached and the case was not reopened. Views and ratings measure popularity and opinion, not resolution.',
        'Effectiveness metrics pair a usage signal with an outcome signal. Usage alone can be high for a poor article.',
        'Containment and deflection are "did not happen" metrics — always define carefully what counts as the avoided event.',
      ],
      points_ja: [
        'ケース回避＝記事を閲覧してケースを作成しなかった顧客。ポータル経由で作成されたケース数を数えるのは逆の測定。',
        '担当者のナレッジ定着＝記事が添付されたクローズ済みケースの割合。公開数や検索回数は、ナレッジベース周辺の活動量であって利用度ではない。',
        '記事の有効性＝記事が添付され、かつケースが再オープンされなかったクローズ済みケースの割合。閲覧数と評価は人気度と主観であり、解決したかではない。',
        '有効性の指標は「利用のシグナル」と「結果のシグナル」を組み合わせる。利用量だけなら質の低い記事でも高くなり得る。',
        '封じ込めとケース回避は「起きなかったこと」を測る指標。回避された事象が何を指すかを必ず明確に定義する。',
      ],
    },
    {
      heading: 'Where the data physically lives',
      heading_ja: 'データが物理的にどこにあるか',
      body:
        'Not every contact centre KPI can be sourced from Salesforce. When a metric depends on telephony behaviour, the data is generated in the phone system and must be integrated in if it is needed for reporting.',
      body_ja:
        'コンタクトセンターの KPI がすべて Salesforce から取得できるわけではありません。指標が電話の挙動に依存する場合、データは電話システム側で生成されるため、レポートに必要なら連携して取り込む必要があります。',
      points: [
        'Phone hold time is measured by the ACD telephony platform, not by Salesforce. Average handle time including hold must come from there.',
        'Salesforce can report on what happened to the case — status changes, ownership, milestone completion, activity timeline — but not on call-level timing it never saw.',
        'Omni-Channel work item logs track routing and agent capacity inside Salesforce; they are not a substitute for telephony metrics.',
        'When a KPI spans both systems, decide early whether to integrate call data into Salesforce or report from the telephony platform.',
      ],
      points_ja: [
        '電話の保留時間は ACD 電話基盤で計測され、Salesforce では計測されない。保留を含む平均処理時間はそこから取得する必要がある。',
        'Salesforce はケースに起きたこと（ステータス変更、所有者、マイルストーン達成、活動タイムライン）はレポートできるが、そもそも観測していない通話レベルの時間情報はレポートできない。',
        'Omni-Channel の作業アイテムログは Salesforce 内のルーティングと担当者キャパシティを追跡するもので、電話系指標の代わりにはならない。',
        'KPI が両システムにまたがる場合、通話データを Salesforce に連携するか、電話基盤側でレポートするかを早期に決める。',
      ],
    },
  ],
}
