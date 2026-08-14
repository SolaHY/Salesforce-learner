// 単元3：Data Source Connection and Ingestion（接続と取り込み・配点18%）
// コネクタと Ingestion API、ストリームのカテゴリと更新モード、データ変換、Zero Copy。
export const ingestionQuestions = [
  {
    id: 'dc-ing-1',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'A data stream ingests website page-view events, each with the time the view occurred. Which data stream category applies?',
    question_ja:
      'あるデータストリームが、閲覧時刻を伴う Web のページビューイベントを取り込む。適用すべきデータストリームのカテゴリはどれか。',
    options: [
      {
        text: 'Profile',
        text_ja: 'Profile',
        correct: false,
        note: 'Profile describes who someone is — attributes of a person, not time-stamped actions.',
        note_ja: 'Profile はその人が誰であるかを表す。人物の属性であって、時刻付きの行動ではない。',
      },
      {
        text: 'Engagement',
        text_ja: 'Engagement',
        correct: true,
        note: 'Correct. Engagement is what someone did and when, and it requires an event time field — which this data has.',
        note_ja: '正解。Engagement は「誰が何をいつしたか」で、イベント時刻の項目が必須。このデータはそれを持つ。',
      },
      {
        text: 'Other',
        text_ja: 'Other',
        correct: false,
        note: 'Other is for reference data that is neither a person nor a time-stamped action, such as a product catalogue.',
        note_ja: 'Other は人でも時刻付きの行動でもない参照データ用（商品カタログなど）。',
      },
      {
        text: 'Transactional',
        text_ja: 'Transactional',
        correct: false,
        note: 'Not a data stream category. There are exactly three: Profile, Engagement and Other.',
        note_ja: 'データストリームのカテゴリではない。カテゴリは Profile／Engagement／Other のちょうど3つ。',
      },
    ],
    explanation:
      'There are exactly three categories. Profile is who someone is and requires a primary key. Engagement is what they did and when, and requires an event time field — the presence of an action timestamp is the giveaway. Other covers reference and lookup data. Critically, the category cannot be changed after the stream is created.',
    explanation_ja:
      'カテゴリはちょうど3つある。Profile は「その人が誰か」で主キーが必要。Engagement は「何をいつしたか」でイベント時刻の項目が必要であり、行動の時刻があることが判別の手がかりになる。Other は参照・マスタ系データを扱う。重要なのは、カテゴリはストリーム作成後に変更できないという点である。',
    reference:
      '💡 Timestamp of an action → Engagement. Attributes of a person → Profile. Product or location list → Other.',
    reference_ja:
      '💡 行動の時刻→Engagement。人物の属性→Profile。商品や拠点の一覧→Other。',
  },
  {
    id: 'dc-ing-2',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'A consultant realises a data stream was created with the wrong category. What must be done?',
    question_ja:
      'あるデータストリームが誤ったカテゴリで作成されていたことにコンサルタントが気づいた。何をしなければならないか。',
    options: [
      {
        text: 'Edit the data stream and change the category',
        text_ja: 'データストリームを編集してカテゴリを変更する',
        correct: false,
        note: 'The category is fixed at creation. Any answer offering to edit it is wrong.',
        note_ja: 'カテゴリは作成時に確定する。編集できるとする選択肢は誤り。',
      },
      {
        text: 'Delete the data stream and recreate it with the correct category',
        text_ja: 'データストリームを削除し、正しいカテゴリで作り直す',
        correct: true,
        note: 'Correct. Because the category is immutable, recreation is the only route.',
        note_ja: '正解。カテゴリは変更不可なので、作り直す以外に方法はない。',
      },
      {
        text: 'Create a data transform that converts the category',
        text_ja: 'カテゴリを変換するデータ変換を作成する',
        correct: false,
        note: 'Transforms reshape data, not stream metadata. The category is a property of the stream.',
        note_ja: '変換はデータの形を変えるものでストリームのメタデータは変えない。カテゴリはストリームの属性。',
      },
      {
        text: 'Remap the DLO to a different DMO, which resets the category',
        text_ja: 'DLO を別の DMO に再マッピングし、カテゴリをリセットする',
        correct: false,
        note: 'Mapping and category are independent; remapping does not reset the category.',
        note_ja: 'マッピングとカテゴリは独立している。再マッピングでカテゴリはリセットされない。',
      },
    ],
    explanation:
      'The data stream category determines which DMOs the stream can map to and how the data behaves downstream, and it cannot be changed after creation. This immutability is exactly why the exam tests it: getting it wrong means deleting and rebuilding, which is expensive if it is discovered late.',
    explanation_ja:
      'データストリームのカテゴリは、マッピングできる DMO と下流での挙動を決めるもので、作成後は変更できない。この変更不可という性質こそ試験が問う理由である。間違えると削除して作り直すことになり、発見が遅れるほど高くつく。',
    reference:
      '💡 Choose the category deliberately at creation. It is one of the few genuinely irreversible decisions in Data 360.',
    reference_ja:
      '💡 カテゴリは作成時に慎重に選ぶ。Data 360 の中では数少ない、本当に取り消せない判断の1つ。',
  },
  {
    id: 'dc-ing-3',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A retailer deletes discontinued products from its product master file each week. In Data 360, discontinued products still appear in segments weeks after they were removed from the source. The stream currently uses upsert.',
    scenario_ja:
      'ある小売企業は、毎週、商品マスタファイルから廃番商品を削除している。しかし Data 360 では、ソースから削除して数週間経っても廃番商品がセグメントに現れ続ける。現在このストリームは upsert を使用している。',
    question: 'What should the consultant change?',
    question_ja: 'コンサルタントは何を変更すべきか。',
    options: [
      {
        text: 'Change the refresh mode to full refresh so removed rows disappear from the stream',
        text_ja: '更新モードを full refresh に変更し、削除された行がストリームからも消えるようにする',
        correct: true,
        note: 'Correct. Full refresh replaces the stream contents, so rows absent at the source are removed here too.',
        note_ja: '正解。full refresh はストリームの内容を置き換えるため、ソースに無い行はこちらでも削除される。',
      },
      {
        text: 'Change the primary key so deleted rows no longer match',
        text_ja: '削除された行が一致しなくなるよう主キーを変更する',
        correct: false,
        note: 'This would break identification of every row and cause duplicates, not remove the stale ones.',
        note_ja: 'すべての行の識別が壊れて重複が生じるだけで、古い行は消えない。',
      },
      {
        text: 'Increase the refresh frequency of the existing upsert stream',
        text_ja: '既存の upsert ストリームの更新頻度を上げる',
        correct: false,
        note: 'Running upsert more often still never deletes anything — frequency is not the issue.',
        note_ja: 'upsert をより頻繁に実行しても、何も削除されないことに変わりはない。頻度は問題ではない。',
      },
      {
        text: 'Add a filter to each segment excluding discontinued products',
        text_ja: '各セグメントに廃番商品を除外するフィルタを追加する',
        correct: false,
        note: 'Treats the symptom in every segment forever, instead of fixing the stream once.',
        note_ja: 'ストリームを1度直せば済むところを、すべてのセグメントで永久に症状に対処することになる。',
      },
    ],
    explanation:
      'Upsert matches on the primary key: update if present, insert if not. Nothing in that contract tells the platform a row was deleted at the source, so removed rows persist. Full refresh replaces the contents of the stream, which is the answer whenever deletions must propagate.',
    explanation_ja:
      'upsert は主キーで突き合わせ、あれば更新、なければ挿入する。この動作の中に「ソースで削除された」ことを伝える手段はないため、削除された行は残り続ける。full refresh はストリームの内容を置き換えるので、削除を伝播させたい場合の答えになる。',
    reference:
      '💡 "Deleted at source but still present in Data 360" is the signature symptom of an upsert stream.',
    reference_ja:
      '💡 「ソースでは削除済みなのに Data 360 に残る」は upsert ストリームの典型的な症状。',
  },
  {
    id: 'dc-ing-4',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'A company needs to ingest data from a bespoke internal system that has no standard Data 360 connector. Which approach is appropriate?',
    question_ja:
      'ある企業が、標準の Data 360 コネクタが存在する独自の社内システムからデータを取り込む必要がある。適切な方法はどれか。',
    options: [
      {
        text: 'The Ingestion API, with a schema uploaded to describe the payload',
        text_ja: 'Ingestion API。ペイロードを定義するスキーマをアップロードして使う',
        correct: true,
        note: 'Correct. The Ingestion API is the route for sources without a standard connector, and the schema must be defined first.',
        note_ja: '正解。標準コネクタが無いソース向けの経路が Ingestion API で、先にスキーマの定義が必要。',
      },
      {
        text: 'Ask the vendor to rebuild the system on Salesforce so a connector becomes available',
        text_ja: 'コネクタが使えるよう、ベンダーにシステムを Salesforce 上で作り直してもらう',
        correct: false,
        note: 'Wildly disproportionate to an integration requirement.',
        note_ja: '連携要件に対して著しく過剰。',
      },
      {
        text: 'Manually export to a spreadsheet and upload it each morning',
        text_ja: '毎朝、表計算ファイルに手動でエクスポートしてアップロードする',
        correct: false,
        note: 'A manual recurring task; use SFTP or cloud storage at minimum if files are genuinely the interface.',
        note_ja: '手作業の定期タスク。本当にファイル連携なら最低でも SFTP かクラウドストレージを使う。',
      },
      {
        text: 'It is not possible to ingest from systems without a standard connector',
        text_ja: '標準コネクタの無いシステムからは取り込めない',
        correct: false,
        note: 'The Ingestion API exists precisely for this case.',
        note_ja: 'まさにこの場合のために Ingestion API がある。',
      },
    ],
    explanation:
      'The Ingestion API covers sources with no standard connector. It offers two modes — streaming for near-real-time events and bulk for large periodic loads — and in both cases you must upload a schema (OpenAPI/YAML) describing the payload before data can flow. Missing that step is a common cause of a first ingestion failing.',
    explanation_ja:
      'Ingestion API は標準コネクタが無いソースを扱う。モードは2つ（ニアリアルタイムのイベント向けストリーミングと、大量の定期ロード向けバルク）で、いずれの場合もデータを流す前にペイロードを定義するスキーマ（OpenAPI／YAML）のアップロードが必要である。この手順の漏れが、初回の取り込み失敗のよくある原因である。',
    reference:
      '💡 Ingestion API modes: streaming for events as they happen, bulk for large scheduled loads.',
    reference_ja:
      '💡 Ingestion API のモード：発生の都度のイベントにはストリーミング、大量の定期ロードにはバルク。',
  },
  {
    id: 'dc-ing-5',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A financial services company keeps ten years of transaction history in Snowflake. They want to use it for segmentation in Data 360, but their data governance board refuses to allow a second copy of the data to be created, and the volume would be very expensive to ingest.',
    scenario_ja:
      'ある金融サービス企業は、10年分の取引履歴を Snowflake に保持している。Data 360 でのセグメンテーションに使いたいが、データガバナンス委員会はデータの二重保有を認めておらず、量も膨大で取り込みコストが非常に高い。',
    question: 'What should the consultant recommend?',
    question_ja: 'コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'Zero Copy query federation, so the Snowflake tables are queried live without being copied',
        text_ja: 'Zero Copy のクエリ連携。Snowflake のテーブルをコピーせずにライブでクエリする',
        correct: true,
        note: 'Correct. Data appears as external data lake objects that can be mapped and segmented, with no duplication.',
        note_ja: '正解。データは外部データレイクオブジェクトとして現れ、マッピングもセグメント化もでき、複製は生じない。',
      },
      {
        text: 'A bulk Ingestion API load, scheduled overnight to reduce cost',
        text_ja: 'コスト削減のため夜間にスケジュールしたバルク Ingestion API ロード',
        correct: false,
        note: 'Still creates the second copy the governance board prohibited, and still incurs the volume cost.',
        note_ja: 'ガバナンス委員会が禁じた二重保有を依然として作り、量に応じたコストもかかる。',
      },
      {
        text: 'Aggregate the history in Snowflake first, then ingest only the summary',
        text_ja: 'まず Snowflake 側で履歴を集計し、要約だけを取り込む',
        correct: false,
        note: 'A reasonable instinct, but it discards detail needed for segmentation and still copies data unnecessarily.',
        note_ja: '発想としては妥当だが、セグメンテーションに必要な粒度を失ううえ、不要なコピーは残る。',
      },
      {
        text: 'Export from Snowflake to S3 and use the cloud storage connector',
        text_ja: 'Snowflake から S3 へエクスポートし、クラウドストレージコネクタを使う',
        correct: false,
        note: 'This creates two copies rather than one, and adds a synchronisation problem on top.',
        note_ja: 'コピーが1つどころか2つになり、さらに同期の問題まで増える。',
      },
    ],
    explanation:
      'Zero Copy query federation is designed for exactly this combination of constraints: the data already lives in a supported platform (Snowflake, BigQuery, Databricks, Redshift), duplicating it is unacceptable, and the volume makes ingestion costly. The federated tables surface as external data lake objects you can map and segment on. The trade-off is a dependency on the external platform\'s availability and compute.',
    explanation_ja:
      'Zero Copy のクエリ連携は、まさにこの制約の組み合わせのために設計されている。データが対応プラットフォーム（Snowflake、BigQuery、Databricks、Redshift）に既にあり、複製が許されず、量ゆえに取り込みコストが高い。連携されたテーブルは外部データレイクオブジェクトとして現れ、マッピングとセグメント化ができる。トレードオフは外部プラットフォームの可用性と計算資源への依存である。',
    reference:
      '💡 Zero Copy avoids the storage and duplication, not the governance. Consent and access rules still apply to federated data.',
    reference_ja:
      '💡 Zero Copy が回避するのは保管と重複であってガバナンスではない。同意やアクセス制御は連携データにも適用される。',
  },
  {
    id: 'dc-ing-6',
    domain: 'dc-ingestion',
    type: 'multi',
    question: 'Which two are true of Zero Copy in Data 360? (Choose 2)',
    question_ja: 'Data 360 における Zero Copy について正しいものを2つ選べ。',
    options: [
      {
        text: 'Query federation lets external tables be queried live and surfaced as external data lake objects',
        text_ja: 'クエリ連携により、外部テーブルをライブでクエリし、外部データレイクオブジェクトとして表出できる',
        correct: true,
        note: 'Correct. The data stays put; Data 360 reads it in place.',
        note_ja: '正解。データはその場に残り、Data 360 はそれをその場で読む。',
      },
      {
        text: 'Data sharing works in the outbound direction, exposing Data 360 objects to external platforms without copying',
        text_ja: 'データ共有は外向きに働き、Data 360 のオブジェクトをコピーせず外部プラットフォームへ公開する',
        correct: true,
        note: 'Correct. Zero Copy is bidirectional: federation brings data in, sharing sends it out.',
        note_ja: '正解。Zero Copy は双方向。連携が取り込み方向、共有が送り出し方向。',
      },
      {
        text: 'Federated data is exempt from consent and access controls',
        text_ja: '連携されたデータは同意とアクセス制御の対象外になる',
        correct: false,
        note: 'Governance applies identically. Zero Copy changes where data lives, not what you may do with it.',
        note_ja: 'ガバナンスは同じように適用される。Zero Copy が変えるのはデータの所在であって、扱ってよい範囲ではない。',
      },
      {
        text: 'Federated queries run entirely on Data 360 compute with no dependency on the external platform',
        text_ja: '連携クエリは完全に Data 360 の計算資源で実行され、外部プラットフォームに依存しない',
        correct: false,
        note: 'The opposite: queries depend on the external platform\'s availability and consume its compute.',
        note_ja: '逆である。クエリは外部プラットフォームの可用性に依存し、その計算資源を消費する。',
      },
      {
        text: 'Zero Copy works with any data source, including bespoke internal systems',
        text_ja: 'Zero Copy は独自の社内システムを含む、あらゆるデータソースで利用できる',
        correct: false,
        note: 'It works with supported platforms (Snowflake, BigQuery, Databricks, Redshift). Bespoke systems use the Ingestion API.',
        note_ja: '対応プラットフォーム（Snowflake、BigQuery、Databricks、Redshift）で利用できる。独自システムは Ingestion API を使う。',
      },
    ],
    explanation:
      'Zero Copy has two inbound forms — query federation for external tables and file federation for lake files — plus an outbound form, data sharing. In every form the data is not duplicated. What Zero Copy does not do is exempt anything from governance, and it does not remove the dependency on the external platform, whose compute serves each federated query.',
    explanation_ja:
      'Zero Copy には取り込み方向の2形態（外部テーブル向けのクエリ連携と、レイク上のファイル向けのファイル連携）に加え、送り出し方向のデータ共有がある。いずれの形態でもデータは複製されない。一方で Zero Copy はガバナンスを免除しないし、外部プラットフォームへの依存も解消しない。連携クエリのたびに、その側の計算資源が使われる。',
    reference:
      '💡 Ingest when the data must be available independently of the source, or when the source is not a supported Zero Copy platform.',
    reference_ja:
      '💡 ソースと独立してデータを使える必要があるとき、またはソースが Zero Copy 対応でないときは取り込む。',
  },
  {
    id: 'dc-ing-7',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Customer records are duplicating in a DLO on every stream run. Which is the most likely cause?',
    question_ja:
      'ストリームの実行のたびに DLO で顧客レコードが重複している。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The primary key is not unique or not stable in the source',
        text_ja: '主キーがソース側で一意でない、または安定していない',
        correct: true,
        note: 'Correct. Upsert relies on the key to identify a row across runs. A changing or repeating key produces duplicates.',
        note_ja: '正解。upsert は実行をまたいで行を識別するために主キーに依存する。変化する／重複する主キーは重複を生む。',
      },
      {
        text: 'The stream category is set to Engagement',
        text_ja: 'ストリームのカテゴリが Engagement に設定されている',
        correct: false,
        note: 'Category determines mapping and downstream behaviour, not duplicate suppression.',
        note_ja: 'カテゴリはマッピングと下流の挙動を決めるもので、重複の抑制とは無関係。',
      },
      {
        text: 'Identity resolution has not run',
        text_ja: 'ID解決が実行されていない',
        correct: false,
        note: 'Identity resolution merges people across DMOs; it is not what prevents duplicate rows within one DLO.',
        note_ja: 'ID解決は DMO をまたいで人物を結合するもので、1つの DLO 内の行の重複を防ぐ仕組みではない。',
      },
      {
        text: 'The DLO has no retention policy configured',
        text_ja: 'DLO に保持ポリシーが設定されていない',
        correct: false,
        note: 'Retention removes old data over time; it does not affect how rows are matched on ingest.',
        note_ja: '保持ポリシーは時間が経った古いデータを削除するもので、取り込み時の行の突き合わせには影響しない。',
      },
    ],
    explanation:
      'The primary key is what makes a row identifiable across runs. It must be unique and stable in the source. A key that changes between runs causes the same record to be inserted repeatedly; a key that repeats across different records causes them to overwrite each other. Both symptoms trace back to key selection, not to category or resolution.',
    explanation_ja:
      '主キーは実行をまたいで行を識別するためのものであり、ソース側で一意かつ安定している必要がある。実行のたびに変わる主キーは同じレコードを繰り返し挿入させ、異なるレコード間で重複する主キーは互いを上書きさせる。どちらの症状も原因は主キーの選定にあり、カテゴリや解決処理ではない。',
    reference:
      '💡 Duplicates within one DLO = primary key problem. Duplicate people across DMOs = identity resolution problem.',
    reference_ja:
      '💡 1つの DLO 内での重複＝主キーの問題。DMO をまたいだ人物の重複＝ID解決の問題。',
  },
  {
    id: 'dc-ing-8',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Source systems store phone numbers in inconsistent formats. Match rates in identity resolution are poor. What is the best fix?',
    question_ja:
      'ソースシステムが電話番号を不統一な書式で保持しており、ID解決の一致率が低い。最善の対処はどれか。',
    options: [
      {
        text: 'Normalise the formats during ingestion, before identity resolution runs',
        text_ja: 'ID解決が実行される前に、取り込みの段階で書式を正規化する',
        correct: true,
        note: 'Correct. Data quality is upstream of match quality — the same rules perform better on standardised data.',
        note_ja: '正解。データ品質は一致品質の上流にある。標準化されたデータなら同じルールでも成績が上がる。',
      },
      {
        text: 'Ask each source system owner to change their storage format',
        text_ja: '各ソースシステムの管理者に、保存形式の変更を依頼する',
        correct: false,
        note: 'Slow, often refused, and the sources serve other consumers. Transform in Data 360 instead.',
        note_ja: '遅く、断られることも多く、ソースは他の利用者も抱えている。代わりに Data 360 側で変換する。',
      },
      {
        text: 'Remove phone number from the match rules entirely',
        text_ja: '一致ルールから電話番号を完全に除外する',
        correct: false,
        note: 'Discards a useful signal to avoid fixing a formatting problem, which lowers match rates further.',
        note_ja: '書式の問題を直す代わりに有用なシグナルを捨てており、一致率はさらに下がる。',
      },
      {
        text: 'Switch every match rule to fuzzy matching',
        text_ja: 'すべての一致ルールをあいまい一致に変更する',
        correct: false,
        note: 'Blanket fuzzy matching raises the risk of merging different people, and it does not address the root cause.',
        note_ja: '一律のあいまい一致は別人を結合するリスクを高めるうえ、根本原因に対処していない。',
      },
    ],
    explanation:
      'Standardise formats before identity resolution, not after. Consistent casing, trimmed whitespace and normalised phone and postal formats materially improve match rates without loosening the rules. Data 360 can do this at ingest with formula fields on the data stream, or with a data transform — preferable to asking source systems that serve other consumers to change.',
    explanation_ja:
      '書式の標準化は ID解決の後ではなく前に行う。大文字小文字の統一、空白の除去、電話番号や郵便番号の正規化は、ルールを緩めずに一致率を実質的に押し上げる。Data 360 はこれをデータストリームの数式項目やデータ変換で取り込み時に行える。他の利用者も抱えるソースシステムに変更を依頼するより望ましい。',
    reference:
      '💡 Fix data quality before loosening match rules. Loosening rules to compensate for dirty data causes false merges.',
    reference_ja:
      '💡 一致ルールを緩める前にデータ品質を直す。汚いデータを補うためにルールを緩めると誤結合が起きる。',
  },
  {
    id: 'dc-ing-9',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Which transformation option is appropriate for joining two objects and aggregating the result on a schedule?',
    question_ja:
      '2つのオブジェクトを結合し、その結果をスケジュールで集計するのに適した変換手段はどれか。',
    options: [
      {
        text: 'A formula field on the data stream',
        text_ja: 'データストリームの数式項目',
        correct: false,
        note: 'Formula fields are light, row-level derivations at ingest — concatenation, casting, trimming. They cannot join or aggregate.',
        note_ja: '数式項目は取り込み時の軽量な行単位の導出（連結・型変換・トリム）。結合も集計もできない。',
      },
      {
        text: 'A batch data transform',
        text_ja: 'バッチデータ変換',
        correct: true,
        note: 'Correct. Batch transforms handle joins, aggregation, filtering and reshaping, writing output to a new DLO.',
        note_ja: '正解。バッチ変換は結合・集計・フィルタ・再構成を担い、出力を新しい DLO に書き出す。',
      },
      {
        text: 'An identity resolution ruleset',
        text_ja: 'ID解決ルールセット',
        correct: false,
        note: 'Rulesets merge people; they are not a general-purpose transformation tool.',
        note_ja: 'ルールセットは人物を結合するもので、汎用の変換ツールではない。',
      },
      {
        text: 'An activation target',
        text_ja: 'アクティベーションターゲット',
        correct: false,
        note: 'A destination system at the end of the pipeline, not a transformation.',
        note_ja: 'パイプライン最後の宛先システムであり、変換ではない。',
      },
    ],
    explanation:
      'Match the weight of the work to the tool. Formula fields on a data stream do light row-level derivation at ingest. Batch data transforms do the heavier scheduled work — joins across objects, aggregation, filtering, reshaping — and write the result to a new DLO. Streaming data transforms apply the same idea continuously to streaming data.',
    explanation_ja:
      '作業の重さに応じてツールを選ぶ。データストリームの数式項目は取り込み時の軽量な行単位の導出を担う。バッチデータ変換はより重いスケジュール処理（オブジェクト間の結合、集計、フィルタ、再構成）を担い、結果を新しい DLO に書き出す。ストリーミングデータ変換は同じ考え方をストリーミングデータに継続的に適用する。',
    reference:
      '💡 Formula field = row-level, at ingest. Batch transform = cross-object, scheduled, writes a new DLO.',
    reference_ja:
      '💡 数式項目＝取り込み時・行単位。バッチ変換＝オブジェクト横断・スケジュール実行・新しい DLO を書き出す。',
  },
  {
    id: 'dc-ing-10',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A subscription business wants abandoned-cart events available in Data 360 within seconds of occurring, so that a recovery message can be triggered while the customer is still browsing.',
    scenario_ja:
      'あるサブスクリプション事業者は、顧客がまだ閲覧しているうちに復帰メッセージを起動できるよう、カート放棄イベントを発生から数秒以内に Data 360 で利用できるようにしたい。',
    question: 'Which ingestion approach fits?',
    question_ja: '適した取り込み方法はどれか。',
    options: [
      {
        text: 'The streaming mode of the Ingestion API, or the Web SDK for first-party site events',
        text_ja: 'Ingestion API のストリーミングモード、または自社サイトのイベントには Web SDK',
        correct: true,
        note: 'Correct. Both deliver events in near real time, which is what a seconds-level requirement demands.',
        note_ja: '正解。どちらもニアリアルタイムでイベントを届ける。秒単位の要件が求めるのはこれ。',
      },
      {
        text: 'A nightly file drop to SFTP',
        text_ja: '夜間の SFTP へのファイル配置',
        correct: false,
        note: 'Arrives many hours late. The customer left the site long before the data lands.',
        note_ja: '何時間も遅れて到着する。データが着地するずっと前に顧客はサイトを離れている。',
      },
      {
        text: 'A bulk Ingestion API load every six hours',
        text_ja: '6時間ごとのバルク Ingestion API ロード',
        correct: false,
        note: 'Bulk mode is for large periodic loads, and six hours does not meet a seconds-level requirement.',
        note_ja: 'バルクモードは大量の定期ロード向けで、6時間では秒単位の要件を満たせない。',
      },
      {
        text: 'A Zero Copy federation of the e-commerce warehouse',
        text_ja: 'EC のウェアハウスに対する Zero Copy 連携',
        correct: false,
        note: 'Federation reads the warehouse live, but the warehouse itself is typically loaded in batches, so the event is not there yet.',
        note_ja: '連携はウェアハウスをライブで読むが、そのウェアハウス自体が通常バッチで更新されるため、イベントはまだそこに無い。',
      },
    ],
    explanation:
      'Match the mechanism to the latency requirement. Streaming ingestion (Ingestion API streaming mode, or the Web and Mobile SDKs for first-party behavioural events) delivers events in near real time. Note the trap in the Zero Copy option: federating a warehouse gives you live access to the warehouse, but not to data the warehouse has not itself received yet.',
    explanation_ja:
      '遅延要件に手段を合わせる。ストリーミングでの取り込み（Ingestion API のストリーミングモード、またはファーストパーティの行動イベントには Web／Mobile SDK）がニアリアルタイムでイベントを届ける。Zero Copy の選択肢に仕掛けられた罠に注意すること。ウェアハウスへの連携はウェアハウスへのライブアクセスを与えるが、そのウェアハウスがまだ受け取っていないデータは得られない。',
    reference:
      '💡 Federation is only as fresh as the platform it federates. Live access to a stale source is still stale.',
    reference_ja:
      '💡 連携の鮮度は連携先の鮮度が上限。古いソースへのライブアクセスは、やはり古い。',
  },
  {
    id: 'dc-ing-11',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Which data stream category requires a primary key and forms the basis for identity resolution?',
    question_ja:
      '主キーを必要とし、ID解決の基礎となるデータストリームのカテゴリはどれか。',
    options: [
      {
        text: 'Profile',
        text_ja: 'Profile',
        correct: true,
        note: 'Correct. Profile data describes who someone is and is what identity resolution and segmentation are built on.',
        note_ja: '正解。Profile はその人が誰であるかを表すデータで、ID解決とセグメンテーションの土台になる。',
      },
      {
        text: 'Engagement',
        text_ja: 'Engagement',
        correct: false,
        note: 'Engagement records actions over time and requires an event time field, not a person-level primary key for resolution.',
        note_ja: 'Engagement は時系列の行動を記録し、イベント時刻の項目を必要とする。解決のための人物単位の主キーではない。',
      },
      {
        text: 'Other',
        text_ja: 'Other',
        correct: false,
        note: 'Other is reference data such as product or store lists — not people, so not the basis for resolution.',
        note_ja: 'Other は商品や店舗の一覧といった参照データ。人ではないので解決の基礎にはならない。',
      },
      {
        text: 'All three categories require a primary key for identity resolution',
        text_ja: '3つのカテゴリすべてが ID解決のために主キーを必要とする',
        correct: false,
        note: 'Identity resolution operates on profile data; it does not resolve product catalogues or page views into people.',
        note_ja: 'ID解決はプロファイルデータに対して働く。商品カタログやページビューを人に解決するわけではない。',
      },
    ],
    explanation:
      'Profile is the category that describes people — contacts, accounts, leads, loyalty members — and it requires a primary key. Because identity resolution decides which source records represent the same person, it is profile data that feeds it. Engagement data attaches to those resolved people through their identifiers.',
    explanation_ja:
      'Profile は人を表すカテゴリ（コンタクト、取引先、リード、ロイヤルティ会員）で、主キーを必要とする。ID解決はどのソースレコードが同一人物を表すかを判断するものなので、それに供給されるのは Profile データである。Engagement データは、識別子を通じて解決済みの人物に紐づく。',
    reference:
      '💡 Profile = people (primary key). Engagement = actions (event time). Other = reference lists.',
    reference_ja:
      '💡 Profile＝人（主キー）。Engagement＝行動（イベント時刻）。Other＝参照リスト。',
  },
  {
    id: 'dc-ing-12',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Data in Data 360 is consistently about eight hours older than the source system. Stream runs all report success. What is the most likely cause?',
    question_ja:
      'Data 360 のデータが、ソースシステムより一貫して約8時間古い。ストリームの実行はすべて成功と報告されている。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The data stream refresh schedule does not run frequently enough for the requirement',
        text_ja: 'データストリームの更新スケジュールが、要件に対して十分な頻度で実行されていない',
        correct: true,
        note: 'Correct. Successful runs plus consistent lag is a scheduling question, not a failure.',
        note_ja: '正解。実行が成功していて一定の遅れがあるなら、それは障害ではなくスケジュールの問題。',
      },
      {
        text: 'The primary key is misconfigured',
        text_ja: '主キーの設定が誤っている',
        correct: false,
        note: 'A bad key causes duplicates or overwrites, not a uniform time lag.',
        note_ja: '主キーの誤りは重複や上書きを招くが、一様な時間の遅れは生じない。',
      },
      {
        text: 'Identity resolution is over-matching',
        text_ja: 'ID解決が過剰一致している',
        correct: false,
        note: 'Over-matching merges different people; it has no effect on data freshness.',
        note_ja: '過剰一致は別人を結合する現象で、データの鮮度には影響しない。',
      },
      {
        text: 'The DLO is not mapped to a DMO',
        text_ja: 'DLO が DMO にマッピングされていない',
        correct: false,
        note: 'Unmapped data would be entirely absent downstream, not merely eight hours behind.',
        note_ja: '未マッピングなら下流にはまったく現れない。8時間遅れて現れるのではない。',
      },
    ],
    explanation:
      'Read the shape of the symptom. Runs succeeding plus a consistent, predictable lag points at the schedule rather than at a defect. Increase the refresh frequency, move to incremental refresh if the source supports it, or use a streaming mechanism if the requirement is genuinely near real time.',
    explanation_ja:
      '症状の形を読む。実行が成功していて一定の予測可能な遅れがあるなら、不具合ではなくスケジュールを指している。更新頻度を上げる、ソースが対応していれば incremental refresh に切り替える、要件が本当にニアリアルタイムならストリーミングの仕組みを使う。',
    reference:
      '💡 Runs failing → a defect. Runs succeeding with a steady lag → a schedule. Read which one the scenario describes.',
    reference_ja:
      '💡 実行が失敗→不具合。実行は成功していて一定の遅れ→スケジュール。シナリオがどちらを描いているか読む。',
  },
  {
    id: 'dc-ing-13',
    domain: 'dc-ingestion',
    type: 'multi',
    question:
      'Which two are valid reasons to choose ingestion over Zero Copy federation? (Choose 2)',
    question_ja:
      'Zero Copy 連携ではなく取り込みを選ぶ妥当な理由を2つ選べ。',
    options: [
      {
        text: 'The source is not one of the supported Zero Copy platforms',
        text_ja: 'ソースが Zero Copy の対応プラットフォームではない',
        correct: true,
        note: 'Correct. Bespoke systems, SaaS apps and file drops are ingested; federation covers supported warehouses.',
        note_ja: '正解。独自システム、SaaS アプリ、ファイル配置は取り込む。連携は対応ウェアハウス向け。',
      },
      {
        text: 'The data must remain available even if the external platform is unavailable',
        text_ja: '外部プラットフォームが利用できない場合でもデータを利用し続ける必要がある',
        correct: true,
        note: 'Correct. Federated queries depend on the external platform; ingestion removes that runtime dependency.',
        note_ja: '正解。連携クエリは外部プラットフォームに依存する。取り込みはその実行時依存を取り除く。',
      },
      {
        text: 'Ingestion is always cheaper than federation',
        text_ja: '取り込みは連携より常に安い',
        correct: false,
        note: 'The reverse is often true for large volumes — avoiding the copy is a major reason Zero Copy exists.',
        note_ja: '大量データではむしろ逆であることが多い。コピーを避けられることが Zero Copy の主要な存在理由。',
      },
      {
        text: 'Only ingested data can be used in segmentation',
        text_ja: 'セグメンテーションに使えるのは取り込んだデータだけである',
        correct: false,
        note: 'Federated data surfaces as external data lake objects that can be mapped and segmented on.',
        note_ja: '連携データは外部データレイクオブジェクトとして現れ、マッピングもセグメント化もできる。',
      },
      {
        text: 'Ingestion removes the need to apply consent rules',
        text_ja: '取り込めば同意ルールの適用が不要になる',
        correct: false,
        note: 'Consent applies to all data in the platform regardless of how it got there.',
        note_ja: '同意はどのように入ってきたかに関わらず、プラットフォーム内のすべてのデータに適用される。',
      },
    ],
    explanation:
      'Choose ingestion when the source is not a supported Zero Copy platform, or when the data must be usable independently of the external system\'s availability and performance. Choose Zero Copy when the data already lives in a supported warehouse and duplicating it is unacceptable on cost or governance grounds. Note that federated data is fully usable in segmentation.',
    explanation_ja:
      'ソースが Zero Copy 対応プラットフォームでない場合、または外部システムの可用性・性能と独立してデータを使う必要がある場合は取り込みを選ぶ。データが対応ウェアハウスに既にあり、コストやガバナンス上の理由で複製が許されない場合は Zero Copy を選ぶ。なお、連携データはセグメンテーションで問題なく利用できる。',
    reference:
      '💡 The decision is about dependency and support, not about what you are allowed to segment on.',
    reference_ja:
      '💡 判断の軸は依存関係と対応可否であって、セグメントに使ってよいかどうかではない。',
  },
  {
    id: 'dc-ing-14',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'Which connector is appropriate for ingesting scheduled CSV files delivered by a third-party agency?',
    question_ja:
      '外部代理店から提供されるスケジュール配信の CSV ファイルを取り込むのに適したコネクタはどれか。',
    options: [
      {
        text: 'A cloud storage connector (Amazon S3, Google Cloud Storage, Azure) or SFTP',
        text_ja: 'クラウドストレージコネクタ（Amazon S3、Google Cloud Storage、Azure）または SFTP',
        correct: true,
        note: 'Correct. These are the standard mechanisms for file-based delivery on a schedule.',
        note_ja: '正解。スケジュールされたファイル配信の標準的な仕組み。',
      },
      {
        text: 'The Salesforce CRM connector',
        text_ja: 'Salesforce CRM コネクタ',
        correct: false,
        note: 'That connector reads standard objects from a connected Salesforce org, not third-party files.',
        note_ja: 'そのコネクタは接続された Salesforce 組織の標準オブジェクトを読むもので、第三者のファイルではない。',
      },
      {
        text: 'Zero Copy query federation',
        text_ja: 'Zero Copy のクエリ連携',
        correct: false,
        note: 'Federation targets supported data platforms, not agency file drops.',
        note_ja: '連携の対象は対応データプラットフォームであって、代理店のファイル配置ではない。',
      },
      {
        text: 'The Marketing Cloud connector',
        text_ja: 'Marketing Cloud コネクタ',
        correct: false,
        note: 'That connector brings engagement and subscriber data from Marketing Cloud specifically.',
        note_ja: 'そのコネクタは Marketing Cloud 固有のエンゲージメント・購読者データを取り込むもの。',
      },
    ],
    explanation:
      'Match the source to the mechanism. Cloud storage connectors handle file drops in S3, Google Cloud Storage or Azure Storage, and SFTP covers scheduled file transfer. The CRM and Marketing Cloud connectors are source-specific, and Zero Copy targets supported data platforms rather than files delivered by a partner.',
    explanation_ja:
      'ソースと手段を対応づける。クラウドストレージコネクタは S3、Google Cloud Storage、Azure Storage へのファイル配置を扱い、SFTP はスケジュールされたファイル転送を担う。CRM コネクタと Marketing Cloud コネクタはソース固有であり、Zero Copy の対象はパートナーが配信するファイルではなく対応データプラットフォームである。',
    reference:
      '💡 Files → cloud storage or SFTP. No connector → Ingestion API. Supported warehouse → Zero Copy. Salesforce → CRM connector.',
    reference_ja:
      '💡 ファイル→クラウドストレージか SFTP。コネクタ無し→Ingestion API。対応ウェアハウス→Zero Copy。Salesforce→CRM コネクタ。',
  },
  {
    id: 'dc-ing-15',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A consultant is designing ingestion for a loyalty platform that exposes 240 fields. The agreed use case — suppressing existing loyalty members from acquisition advertising — needs the member identifier, email, join date and tier.',
    scenario_ja:
      'あるコンサルタントが、240項目を公開しているロイヤルティ基盤の取り込みを設計している。合意されたユースケース（既存のロイヤルティ会員を獲得広告から除外する）に必要なのは、会員識別子、メール、入会日、ランクである。',
    question: 'What should be ingested?',
    question_ja: '何を取り込むべきか。',
    options: [
      {
        text: 'Only the four fields the use case requires',
        text_ja: 'ユースケースに必要な4項目だけ',
        correct: true,
        note: 'Correct. Minimisation is both an ethics principle and a cost principle, and more fields can be added later.',
        note_ja: '正解。最小化は倫理の原則であると同時にコストの原則。項目は後から追加できる。',
      },
      {
        text: 'All 240 fields, so future use cases are not blocked',
        text_ja: '将来のユースケースを妨げないよう、240項目すべて',
        correct: false,
        note: 'Maximises credit consumption and privacy exposure for use cases that may never exist.',
        note_ja: '存在するかも分からないユースケースのために、クレジット消費とプライバシー上の露出を最大化する。',
      },
      {
        text: 'All fields except those explicitly marked as sensitive',
        text_ja: '機微と明示された項目を除くすべての項目',
        correct: false,
        note: 'Still far more than the use case needs, and "not marked sensitive" is not the same as "needed".',
        note_ja: 'ユースケースの必要をなお大きく超えている。「機微と明示されていない」は「必要」と同義ではない。',
      },
      {
        text: 'The four fields plus every field that might be useful for identity resolution',
        text_ja: '4項目に加え、ID解決に役立ちそうなすべての項目',
        correct: false,
        note: 'A reasonable instinct, but "might be useful" is unbounded. Add matching fields deliberately when resolution needs them.',
        note_ja: '発想は分かるが「役立ちそう」には際限がない。解決が必要とする段階で、意図的に照合用の項目を追加する。',
      },
    ],
    explanation:
      'Ingest only what the agreed use case requires. Extra fields consume credits, increase privacy exposure and slow identity resolution, all in service of hypothetical future needs. Fields can be added to a stream later when a use case actually justifies them — the decision is reversible, unlike the stream category.',
    explanation_ja:
      '合意されたユースケースに必要なものだけを取り込む。余分な項目はクレジットを消費し、プライバシー上の露出を増やし、ID解決を遅くする。しかもそれは仮定の将来の必要のためでしかない。項目は、実際にユースケースが正当化する段階で後から追加できる。ストリームのカテゴリと違い、この判断は取り消せる。',
    reference:
      '💡 Field selection is reversible; stream category is not. Be liberal about revisiting fields, strict about the category.',
    reference_ja:
      '💡 項目の選択は取り消せるが、ストリームのカテゴリは取り消せない。項目は気軽に見直し、カテゴリは厳密に決める。',
  },
  {
    id: 'dc-ing-16',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'What must be done before data can flow through the Ingestion API?',
    question_ja: 'Ingestion API でデータを流す前に何をしなければならないか。',
    options: [
      {
        text: 'Upload a schema describing the payload, and create the corresponding connector',
        text_ja: 'ペイロードを定義するスキーマをアップロードし、対応するコネクタを作成する',
        correct: true,
        note: 'Correct. Data 360 needs the schema to know the shape of what it is receiving.',
        note_ja: '正解。Data 360 は受け取るものの形を知るためにスキーマを必要とする。',
      },
      {
        text: 'Run identity resolution once to initialise the data model',
        text_ja: 'データモデルを初期化するため、ID解決を一度実行する',
        correct: false,
        note: 'Resolution operates on data that already arrived; it is not an ingestion prerequisite.',
        note_ja: '解決処理は既に到着したデータに対して働く。取り込みの前提条件ではない。',
      },
      {
        text: 'Create an activation target for the incoming data',
        text_ja: '受信データ用のアクティベーションターゲットを作成する',
        correct: false,
        note: 'Activation targets are destinations at the end of the pipeline, unrelated to ingestion.',
        note_ja: 'アクティベーションターゲットはパイプライン最後の宛先であり、取り込みとは無関係。',
      },
      {
        text: 'Nothing — the Ingestion API infers the structure from the first payload it receives',
        text_ja: '何も不要。Ingestion API は最初に受け取ったペイロードから構造を推測する',
        correct: false,
        note: 'The schema must be defined explicitly. Inference would make the contract unstable.',
        note_ja: 'スキーマは明示的に定義する必要がある。推測に任せると連携の取り決めが不安定になる。',
      },
    ],
    explanation:
      'The Ingestion API requires an uploaded schema (OpenAPI/YAML) describing the payload, along with the connector that will receive it. This applies to both streaming and bulk modes. Omitting the schema is a common cause of a first ingestion attempt failing, and it is a favourite exam detail because it is easy to overlook.',
    explanation_ja:
      'Ingestion API は、ペイロードを定義するスキーマ（OpenAPI／YAML）のアップロードと、それを受け取るコネクタを必要とする。これはストリーミングモードとバルクモードの両方に当てはまる。スキーマの省略は初回の取り込み試行が失敗するよくある原因であり、見落としやすいため試験が好んで問う細部でもある。',
    reference:
      '💡 Ingestion API checklist: connector created, schema uploaded, then send. Streaming or bulk is chosen per use case.',
    reference_ja:
      '💡 Ingestion API の手順：コネクタ作成 → スキーマのアップロード → 送信。ストリーミングかバルクかはユースケースごとに選ぶ。',
  },
]
