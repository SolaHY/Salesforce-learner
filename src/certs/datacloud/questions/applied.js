// 応用問題（全6単元・シナリオ中心）。
// 単元別ファイルの論点を、別の状況で問い直す問題を配点比率に沿って追加している。
// 出題プールを120問にすることで、模擬試験を本番と同じ60問ちょうどで2回分構成できる。
export const appliedQuestions = [
  // ================= Solution Positioning (4) =================
  {
    id: 'dc-app-1',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'An airline\'s loyalty director wants Data 360 to "give us a 360-degree view". Pressed for detail, she cannot name a decision that would change as a result. The IT director wants to start ingesting next week.',
    scenario_ja:
      'ある航空会社のロイヤルティ担当ディレクターが、Data 360 で「360度の顧客像を得たい」と話している。詳細を尋ねても、その結果として変わる意思決定を挙げられない。IT ディレクターは来週から取り込みを始めたいと考えている。',
    question: 'What should the consultant do first?',
    question_ja: 'コンサルタントがまず行うべきことはどれか。',
    options: [
      {
        text: 'Work with the sponsor to define one measurable outcome and the decision it will change',
        text_ja: 'スポンサーと共に、測定可能な成果を1つと、それによって変わる意思決定を定義する',
        correct: true,
        note: 'Correct. A use case no one can measure cannot demonstrate value, so this must be settled before ingestion.',
        note_ja: '正解。誰も測れないユースケースでは価値を示せない。取り込みの前に決着させる必要がある。',
      },
      {
        text: 'Begin ingesting the loyalty and booking systems, since those are needed for any use case',
        text_ja: 'どのユースケースでも必要になるので、ロイヤルティと予約のシステムから取り込みを始める',
        correct: false,
        note: 'Data-first thinking. Without a defined outcome there is no basis for deciding what "needed" means.',
        note_ja: 'データ起点の発想。成果が定義されていなければ、何が「必要」かを判断する根拠がない。',
      },
      {
        text: 'Build a dashboard of all available customer attributes to show what a 360-degree view looks like',
        text_ja: '360度の顧客像がどのようなものかを示すため、利用可能な全顧客属性のダッシュボードを作る',
        correct: false,
        note: 'Produces a demonstration, not an outcome, and quietly commits to ingesting everything.',
        note_ja: 'デモにはなるが成果にはならない。しかも暗黙のうちに全部取り込むことを約束してしまう。',
      },
      {
        text: 'Recommend delaying the project by six months until the business matures',
        text_ja: '事業側が成熟するまで、プロジェクトを6か月延期するよう推奨する',
        correct: false,
        note: 'Disproportionate. Defining a use case is a workshop, not a six-month wait.',
        note_ja: '過剰。ユースケースの定義はワークショップで済む話で、6か月待つ必要はない。',
      },
    ],
    explanation:
      '"A 360-degree view" names a capability, not an outcome. Confirm the use case can actually be measured before building it, then work backwards to the minimum data required. Starting ingestion first maximises credit consumption and time-to-value in service of a goal nobody has defined.',
    explanation_ja:
      '「360度の顧客像」は能力の呼び名であって成果ではない。構築前にそのユースケースが実際に測定可能か確認し、そこから必要最小限のデータへ逆算する。先に取り込みを始めれば、誰も定義していない目標のためにクレジット消費と価値実現までの時間を最大化することになる。',
    reference:
      '💡 Test any proposed use case with one question: what number changes, and can we measure it today?',
    reference_ja:
      '💡 ユースケース候補は1つの問いで検証する：どの数値が動くのか、そしてそれを今日測定できるのか。',
  },
  {
    id: 'dc-app-2',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A telecoms company plans to use unified profiles to train a model that decides which customers are offered a discounted retention plan. The data science lead asks whether there are any governance concerns beyond privacy.',
    scenario_ja:
      'ある通信会社が、どの顧客に割引の継続プランを提示するかを判断するモデルの学習に、統合プロファイルを使う計画を立てている。データサイエンス責任者が、プライバシー以外にガバナンス上の懸念があるか尋ねている。',
    question: 'What should the consultant raise?',
    question_ja: 'コンサルタントが提起すべき点はどれか。',
    options: [
      {
        text: 'The risk of bias and unfair exclusion when profiles drive targeting or eligibility decisions',
        text_ja: 'プロファイルがターゲティングや適格性の判断を左右する際の、バイアスと不当な排除のリスク',
        correct: true,
        note: 'Correct. This is an explicit data ethics concern, distinct from privacy and consent.',
        note_ja: '正解。プライバシーや同意とは別に、データ倫理として明示されている観点。',
      },
      {
        text: 'No further concerns — if consent was obtained, any modelling use is acceptable',
        text_ja: '他に懸念はない。同意を取得していれば、どのようなモデル利用も許容される',
        correct: false,
        note: 'Consent covers permission to use data; it does not make the resulting decisions fair.',
        note_ja: '同意はデータを使ってよいかを扱うもので、その結果下される判断が公正であることを保証しない。',
      },
      {
        text: 'That predictive models cannot be used on unified profiles at all',
        text_ja: '統合プロファイルに対して予測モデルはそもそも使えないこと',
        correct: false,
        note: 'They can — that is a core Data 360 capability via Einstein Studio and BYOM.',
        note_ja: '使える。Einstein Studio と BYOM を通じた Data 360 の中核機能。',
      },
      {
        text: 'That the model must be retrained daily to stay compliant',
        text_ja: 'コンプライアンス維持のためモデルを毎日再学習する必要があること',
        correct: false,
        note: 'Invented requirement. Retraining cadence is a modelling decision, not a governance rule.',
        note_ja: '架空の要件。再学習の頻度はモデリング上の判断であってガバナンスの規則ではない。',
      },
    ],
    explanation:
      'Governance is broader than privacy. It also covers ownership, quality, retention, visibility — and fairness. When unified profiles feed AI models or eligibility decisions, watch for bias and unfair exclusion. Having consent to use the data does not make the decision the model produces defensible.',
    explanation_ja:
      'ガバナンスはプライバシーより広い。所有者、品質、保持期間、可視範囲、そして公正性も含む。統合プロファイルが AI モデルや適格性の判断に入るときは、バイアスと不当な排除に注意する。データを使う同意があることは、モデルが出す判断の正当性を保証しない。',
    reference:
      '💡 Consent answers "may we use this data?". Fairness answers "is the decision we made with it defensible?"',
    reference_ja:
      '💡 同意は「このデータを使ってよいか」に答える。公正性は「それで下した判断は正当か」に答える。',
  },
  {
    id: 'dc-app-3',
    domain: 'dc-positioning',
    type: 'mcq',
    question:
      'Which best describes the relationship between Data 360 and the source systems it connects to?',
    question_ja:
      'Data 360 と、それが接続するソースシステムとの関係を最もよく表しているのはどれか。',
    options: [
      {
        text: 'Source systems keep their own records unchanged; Data 360 unifies a view across them',
        text_ja: 'ソースシステムは自身のレコードをそのまま保持し、Data 360 はそれらを横断したビューを統合する',
        correct: true,
        note: 'Correct. Data 360 unifies the view, not the sources. Source duplicates remain where they are.',
        note_ja: '正解。Data 360 が統合するのはビューであってソースではない。ソース側の重複はその場に残る。',
      },
      {
        text: 'Data 360 deduplicates and cleans the records inside each source system',
        text_ja: 'Data 360 は各ソースシステム内のレコードを重複排除し、クレンジングする',
        correct: false,
        note: 'A very common misconception. Resolution happens in Data 360, not in the sources.',
        note_ja: '非常によくある誤解。解決処理は Data 360 で起き、ソース側では起きない。',
      },
      {
        text: 'Source systems become read-only once connected to Data 360',
        text_ja: 'Data 360 に接続されると、ソースシステムは読み取り専用になる',
        correct: false,
        note: 'Connecting a source does not change how that system is used.',
        note_ja: 'ソースを接続しても、そのシステムの使われ方は変わらない。',
      },
      {
        text: 'Data 360 becomes the system of record for all connected data',
        text_ja: 'Data 360 が、接続されたすべてのデータの記録システムになる',
        correct: false,
        note: 'The sources remain the systems of record — which is exactly why source priority reconciliation exists.',
        note_ja: '記録システムはソース側のまま。だからこそソース優先度の調整ルールが存在する。',
      },
    ],
    explanation:
      'Data 360 sits above the source systems and unifies a view across them. The sources keep their records, including their duplicates, and continue to serve their other consumers. This is why reconciliation rules need a concept of an authoritative source at all — the truth still lives elsewhere.',
    explanation_ja:
      'Data 360 はソースシステムの上に位置し、それらを横断したビューを統合する。ソースは重複を含めて自分のレコードを保持し、他の利用者にも引き続き応える。だからこそ調整ルールに「正となるソース」という概念が必要になる。正しい値は依然として別の場所にあるからである。',
    reference:
      '💡 If a scenario expects the source systems to be cleaned up, that is a data quality project, not Data 360.',
    reference_ja:
      '💡 シナリオがソースシステムの整理を期待しているなら、それはデータ品質のプロジェクトであって Data 360 ではない。',
  },
  {
    id: 'dc-app-4',
    domain: 'dc-positioning',
    type: 'scenario',
    scenario:
      'A retail group operating in five countries asks whether they need five Data 360 instances, since each country has its own Salesforce org and its own privacy regulator.',
    scenario_ja:
      '5か国で事業を展開する小売グループが、各国が独自の Salesforce 組織と独自のプライバシー規制当局を持つことを理由に、Data 360 のインスタンスが5つ必要かどうか尋ねている。',
    question: 'What should the consultant recommend?',
    question_ja: 'コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'One Data 360 instance connecting all five orgs, with data spaces separating the countries',
        text_ja: '5つの組織すべてを接続する1つの Data 360 インスタンスと、国を分けるデータスペース',
        correct: true,
        note: 'Correct. One instance can connect several orgs, and data spaces provide the regulatory separation.',
        note_ja: '正解。1つのインスタンスが複数組織を接続でき、データスペースが規制上の分離を提供する。',
      },
      {
        text: 'Five separate Data 360 instances, one per country',
        text_ja: '国ごとに1つずつ、5つの独立した Data 360 インスタンス',
        correct: false,
        note: 'Expensive, and it leaves customers who shop in two countries fragmented — the problem you were hired to solve.',
        note_ja: '高コストであり、2か国で買い物する顧客は分断されたまま残る。解決を依頼された当の問題である。',
      },
      {
        text: 'One instance with a single data space, filtering by country in every segment',
        text_ja: '単一のデータスペースを持つ1つのインスタンスで、すべてのセグメントを国で絞り込む',
        correct: false,
        note: 'Relies on every builder remembering the filter, which is not a control a regulator would accept.',
        note_ja: 'すべての作成者がフィルタを忘れないことに依存する。規制当局が統制として認めるものではない。',
      },
      {
        text: 'One instance, and consolidate the five Salesforce orgs into one first',
        text_ja: '1つのインスタンス。ただし先に5つの Salesforce 組織を1つに統合する',
        correct: false,
        note: 'A multi-year org consolidation is wildly disproportionate — Data 360 is designed to span orgs as they are.',
        note_ja: '数年がかりの組織統合は著しく過剰。Data 360 は組織を現状のまま横断できるよう設計されている。',
      },
    ],
    explanation:
      'This scenario combines the two structural facts of the platform. Data 360 sits above the org boundary, so one instance connects several Salesforce orgs and non-Salesforce sources. Data spaces then partition the data for regulatory separation, with permission sets associated to the appropriate space.',
    explanation_ja:
      'このシナリオはプラットフォームの2つの構造的事実を組み合わせている。Data 360 は組織の境界の上に位置するため、1つのインスタンスが複数の Salesforce 組織と非 Salesforce のソースを接続する。そのうえでデータスペースが規制上の分離のためにデータを区画化し、適切なスペースに権限セットを関連付ける。',
    reference:
      '💡 Multi-org, multi-brand and multi-region scenarios almost always resolve to: one instance + several data spaces.',
    reference_ja:
      '💡 複数組織・複数ブランド・複数地域のシナリオは、ほぼ常に「1インスタンス＋複数データスペース」に落ち着く。',
  },

  // ================= Setup and Administration (3) =================
  {
    id: 'dc-app-5',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'A segment that ran correctly last week now returns roughly half the expected members. The data stream refresh history shows successful runs with normal row counts, and the DLO contains the expected records.',
    scenario_ja:
      '先週は正しく動いていたセグメントが、今週は想定の約半分のメンバーしか返さない。データストリームの更新履歴は正常な行数で成功しており、DLO にも想定どおりのレコードが存在する。',
    question: 'Where should the consultant look next?',
    question_ja: 'コンサルタントが次に確認すべきはどこか。',
    options: [
      {
        text: 'Identity resolution — a match rule change may have split or re-resolved profiles',
        text_ja: 'ID解決。一致ルールの変更でプロファイルが分割または再解決された可能性がある',
        correct: true,
        note: 'Correct. Ingestion is verified healthy, so the next stage down the pipeline is resolution.',
        note_ja: '正解。取り込みは健全と確認済みなので、パイプラインの次の段階は解決処理。',
      },
      {
        text: 'The activation target configuration',
        text_ja: 'アクティベーションターゲットの設定',
        correct: false,
        note: 'That is downstream of the segment. The membership count is already wrong before activation.',
        note_ja: 'それはセグメントより下流。アクティベーション以前にメンバー数が既に誤っている。',
      },
      {
        text: 'The data stream primary key',
        text_ja: 'データストリームの主キー',
        correct: false,
        note: 'A key problem would show as duplicates or missing rows in the DLO, which the scenario rules out.',
        note_ja: '主キーの問題なら DLO 側で重複や行の欠落として現れるが、シナリオはそれを否定している。',
      },
      {
        text: 'Credit consumption limits',
        text_ja: 'クレジット消費の上限',
        correct: false,
        note: 'Consumption does not silently halve a segment; that is not how the limit behaves.',
        note_ja: '消費量がセグメントを静かに半減させることはない。上限はそのような挙動をしない。',
      },
    ],
    explanation:
      'Troubleshoot down the pipeline and stop where the count first goes wrong. Ingestion is confirmed healthy and the DLO is correct, so the problem lies between the DLO and the segment: mapping or identity resolution. A ruleset change that re-resolves profiles is a strong candidate, because it can split existing unified individuals a segment already depended on.',
    explanation_ja:
      'パイプラインを上から辿り、件数が最初におかしくなる段階で止まる。取り込みは健全と確認され DLO も正しいので、問題は DLO とセグメントの間、すなわちマッピングか ID解決にある。プロファイルを再解決するルールセットの変更は有力な候補である。既にセグメントが依存していた統合プロファイルを分割し得るからである。',
    reference:
      '💡 A ruleset change is not a quick edit — it re-resolves profiles and can silently change every segment downstream.',
    reference_ja:
      '💡 ルールセットの変更は軽い編集ではない。プロファイルを再解決し、下流のあらゆるセグメントを静かに変え得る。',
  },
  {
    id: 'dc-app-6',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'A regional marketing team needs to build and activate segments for their region only. They must not be able to see other regions\' customers, and must not change data streams or mappings.',
    scenario_ja:
      'ある地域のマーケティングチームが、自分たちの地域についてのみセグメントを作成・アクティベートする必要がある。他地域の顧客を閲覧してはならず、データストリームやマッピングを変更してもならない。',
    question: 'What combination satisfies this?',
    question_ja: 'これを満たす組み合わせはどれか。',
    options: [
      {
        text: 'A Marketing Manager permission set, associated with that region\'s data space',
        text_ja: 'その地域のデータスペースに関連付けた Marketing Manager 権限セット',
        correct: true,
        note: 'Correct. The permission set grants segment and activation work; the data space limits which data.',
        note_ja: '正解。権限セットがセグメントとアクティベーションの作業を許し、データスペースが対象データを限定する。',
      },
      {
        text: 'A Marketing Admin permission set, associated with that region\'s data space',
        text_ja: 'その地域のデータスペースに関連付けた Marketing Admin 権限セット',
        correct: false,
        note: 'The data scoping is right, but Marketing Admin also grants platform setup they must not have.',
        note_ja: 'データの範囲は正しいが、Marketing Admin は与えてはならない基盤設定の権限も付与してしまう。',
      },
      {
        text: 'A Data Cloud User permission set, associated with that region\'s data space',
        text_ja: 'その地域のデータスペースに関連付けた Data Cloud User 権限セット',
        correct: false,
        note: 'Too narrow — read and explore only. They could not create segments or activations.',
        note_ja: '狭すぎる。参照と探索のみで、セグメントやアクティベーションを作成できない。',
      },
      {
        text: 'A Marketing Manager permission set with a region filter applied to each segment',
        text_ja: '各セグメントに地域フィルタを適用した Marketing Manager 権限セット',
        correct: false,
        note: 'A filter does not stop them seeing other regions, and it depends on everyone remembering it.',
        note_ja: 'フィルタでは他地域の閲覧を防げないし、全員がそれを覚えていることに依存する。',
      },
    ],
    explanation:
      'Two mechanisms, two requirements. The permission set answers "what may they do" — Marketing Manager creates and manages segments and activations without platform setup. The data space association answers "to which data" — the region\'s partition only. Scenarios naming both a role and a region are always asking you to combine them.',
    explanation_ja:
      '仕組みが2つ、要件が2つ。権限セットが「何をしてよいか」に答える。Marketing Manager は基盤設定なしにセグメントとアクティベーションを作成・管理できる。データスペースとの関連付けが「どのデータに対してか」に答え、対象はその地域の区画のみとなる。役割と地域の両方が書かれたシナリオは、常にこの2つを組み合わせさせている。',
    reference:
      '💡 Grant the narrowest permission set that still covers the job — then scope it with a data space.',
    reference_ja:
      '💡 職務に足りる最小の権限セットを付与し、そのうえでデータスペースで範囲を絞る。',
  },
  {
    id: 'dc-app-7',
    domain: 'dc-setup',
    type: 'multi',
    question:
      'A client asks how to keep a development and a production Data 360 environment consistent. Which two practices should the consultant recommend? (Choose 2)',
    question_ja:
      '顧客から、開発環境と本番環境の Data 360 をどう一致させるか尋ねられた。推奨すべき実践を2つ選べ。',
    options: [
      {
        text: 'Build and validate configuration in the lower environment before promoting it',
        text_ja: '設定は下位環境で構築・検証してから昇格させる',
        correct: true,
        note: 'Correct. Build low, test, promote — the same governed-change discipline as elsewhere on the platform.',
        note_ja: '正解。下位環境で作り、テストし、昇格させる。プラットフォームの他領域と同じ統制された変更管理。',
      },
      {
        text: 'Package the configuration in data kits and deploy them, rather than rebuilding by hand',
        text_ja: '手作業で作り直すのではなく、設定を Data Kit にまとめてデプロイする',
        correct: true,
        note: 'Correct. Data kits make the deployment repeatable and auditable.',
        note_ja: '正解。Data Kit によりデプロイが再現可能かつ監査可能になる。',
      },
      {
        text: 'Copy the ingested production data into development so both hold identical records',
        text_ja: '両環境が同一のレコードを持つよう、本番の取り込み済みデータを開発環境へコピーする',
        correct: false,
        note: 'Data kits deliberately move configuration only; each environment ingests through its own connections.',
        note_ja: 'Data Kit が運ぶのは意図的に設定だけ。各環境は自分の接続で取り込む。',
      },
      {
        text: 'Give the whole team Data Cloud Admin in both environments so anyone can fix drift',
        text_ja: 'ずれを誰でも直せるよう、両環境でチーム全員に Data Cloud Admin を付与する',
        correct: false,
        note: 'Over-provisioning, and unrestricted production edits are how environments drift in the first place.',
        note_ja: '過剰付与であり、本番を無制限に編集できることこそが、そもそも環境のずれを生む原因。',
      },
      {
        text: 'Maintain a written checklist of manual steps to repeat in production',
        text_ja: '本番で繰り返す手作業の手順を、チェックリストとして文書化しておく',
        correct: false,
        note: 'A process patch over a tooling problem. Packaging exists precisely so this is unnecessary.',
        note_ja: 'ツールで解決すべき問題をプロセスで覆い隠している。パッケージングはまさにこれを不要にするためにある。',
      },
    ],
    explanation:
      'Data 360 configuration is metadata, so it should be packaged and promoted rather than recreated. Data kits carry data streams, DMOs, mappings, calculated insights and segments between environments; they intentionally do not carry ingested data, which each environment obtains through its own connected sources.',
    explanation_ja:
      'Data 360 の設定はメタデータなので、作り直すのではなくパッケージ化して昇格させるべきである。Data Kit はデータストリーム、DMO、マッピング、Calculated Insight、セグメントを環境間で運ぶ。取り込んだデータは意図的に運ばず、各環境が自分の接続したソースから取得する。',
    reference:
      '💡 Configuration promotes; data does not. That split is the whole point of a data kit.',
    reference_ja:
      '💡 昇格するのは設定であってデータではない。この区別こそ Data Kit の存在意義。',
  },

  // ================= Ingestion (5) =================
  {
    id: 'dc-app-8',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A grocery chain ingests till transactions, each row carrying a store code, a basket id, a timestamp and a loyalty card number. The consultant must decide the data stream category.',
    scenario_ja:
      'あるスーパーマーケットチェーンが、店舗コード・買い物かご ID・タイムスタンプ・ロイヤルティカード番号を各行に持つレジ取引を取り込んでいる。コンサルタントはデータストリームのカテゴリを決めなければならない。',
    question: 'Which category applies, and why?',
    question_ja: 'どのカテゴリが該当し、その理由は何か。',
    options: [
      {
        text: 'Engagement, because each row is a time-stamped action by a customer',
        text_ja: 'Engagement。各行が顧客による時刻付きの行動であるため',
        correct: true,
        note: 'Correct. The event timestamp is the giveaway, and Engagement requires an event time field.',
        note_ja: '正解。イベントのタイムスタンプが判別の手がかりで、Engagement はイベント時刻の項目を必須とする。',
      },
      {
        text: 'Profile, because the loyalty card number identifies a person',
        text_ja: 'Profile。ロイヤルティカード番号が人を識別するため',
        correct: false,
        note: 'A person identifier appearing in the row does not make the row a description of a person.',
        note_ja: '行に人物の識別子が含まれることは、その行が人物の記述であることを意味しない。',
      },
      {
        text: 'Other, because transactions are neither profiles nor engagements',
        text_ja: 'Other。取引はプロファイルでもエンゲージメントでもないため',
        correct: false,
        note: 'Other is for reference data such as store or product lists — not time-stamped customer actions.',
        note_ja: 'Other は店舗や商品の一覧といった参照データ向けで、時刻付きの顧客行動ではない。',
      },
      {
        text: 'Profile, because the store code makes each row a location record',
        text_ja: 'Profile。店舗コードにより各行が拠点のレコードになるため',
        correct: false,
        note: 'The store code is context on the action; the row is still a transaction, and a store is not a profile.',
        note_ja: '店舗コードは行動の文脈情報にすぎず、行は依然として取引。そもそも店舗はプロファイルではない。',
      },
    ],
    explanation:
      'Ask what the row is about, not which identifiers it happens to contain. A till transaction is something the customer did at a moment in time, which is Engagement. The loyalty card number is how the engagement attaches to a resolved person; the store list itself would be a separate Other stream.',
    explanation_ja:
      '行にどの識別子が含まれているかではなく、その行が何についてのものかを問う。レジ取引は顧客がある時点で行ったことであり、Engagement である。ロイヤルティカード番号は、そのエンゲージメントを解決済みの人物に結びつける手段にすぎない。店舗一覧そのものは別途 Other のストリームになる。',
    reference:
      '💡 Rows describing a person → Profile. Rows describing something that happened → Engagement. Lookup lists → Other.',
    reference_ja:
      '💡 人物を記述する行→Profile。起きたことを記述する行→Engagement。参照用の一覧→Other。',
  },
  {
    id: 'dc-app-9',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A company federates a Snowflake table via Zero Copy. Segment builds that use it are noticeably slower than segments built on ingested data, and one build failed during a Snowflake maintenance window.',
    scenario_ja:
      'ある企業が Zero Copy で Snowflake のテーブルを連携している。それを使うセグメントの構築は、取り込み済みデータのセグメントより明らかに遅く、Snowflake のメンテナンス時間中に1件の構築が失敗した。',
    question: 'How should the consultant explain this?',
    question_ja: 'コンサルタントはこれをどう説明すべきか。',
    options: [
      {
        text: 'Expected behaviour — federated queries depend on the external platform\'s availability and consume its compute',
        text_ja: '想定どおりの挙動。連携クエリは外部プラットフォームの可用性に依存し、その計算資源を消費する',
        correct: true,
        note: 'Correct. This is the documented trade-off of avoiding the copy.',
        note_ja: '正解。コピーを避けることの、明示されたトレードオフ。',
      },
      {
        text: 'A misconfiguration — correctly configured federation performs identically to ingested data',
        text_ja: '設定ミス。正しく設定された連携は取り込み済みデータと同等の性能になる',
        correct: false,
        note: 'Federation always involves a round trip to the external platform; parity is not the expectation.',
        note_ja: '連携には常に外部プラットフォームへの往復が伴う。同等の性能は期待するものではない。',
      },
      {
        text: 'A sign that Zero Copy should never be used for segmentation',
        text_ja: 'Zero Copy をセグメンテーションに使うべきでない兆候',
        correct: false,
        note: 'Overcorrection. Federated data is fully usable in segmentation; the trade-off is simply real.',
        note_ja: '過剰反応。連携データはセグメンテーションで問題なく使える。トレードオフが実在するというだけ。',
      },
      {
        text: 'A consent issue affecting federated data only',
        text_ja: '連携データにのみ影響する同意の問題',
        correct: false,
        note: 'Unrelated. Consent affects who is included, not query latency or availability.',
        note_ja: '無関係。同意は誰が含まれるかに影響するもので、クエリの遅延や可用性には影響しない。',
      },
    ],
    explanation:
      'Zero Copy avoids storage, duplication and synchronisation lag, and the cost is a runtime dependency: the external platform must be reachable, and each federated query consumes its compute. When the data must remain usable regardless of the external system\'s availability, that is precisely the case for ingesting instead.',
    explanation_ja:
      'Zero Copy は保管・重複・同期の遅延を回避するが、その代償は実行時の依存である。外部プラットフォームに到達できる必要があり、連携クエリのたびにその計算資源を消費する。外部システムの可用性に関わらずデータを使い続ける必要があるなら、それこそが取り込みを選ぶ理由になる。',
    reference:
      '💡 Zero Copy trades storage cost for a runtime dependency. Neither option is free — pick which cost you prefer.',
    reference_ja:
      '💡 Zero Copy は保管コストと実行時依存の交換。どちらも無料ではない。どちらのコストを取るかを選ぶ。',
  },
  {
    id: 'dc-app-10',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A subscription service ingests a customer file nightly with upsert. Marketing complains that customers who closed their accounts six months ago are still receiving campaigns, even though they were removed from the source file at the time.',
    scenario_ja:
      'あるサブスクリプションサービスが、毎晩 upsert で顧客ファイルを取り込んでいる。マーケティングから、6か月前に解約した顧客がまだキャンペーンを受け取っているとの苦情がある。解約時にソースファイルからは削除されている。',
    question: 'Which two responses are appropriate? (Choose 2)',
    question_ja: '適切な対応を2つ選べ。',
    options: [
      {
        text: 'Switch the stream to full refresh so source deletions propagate',
        text_ja: 'ソースでの削除が伝播するよう、ストリームを full refresh に切り替える',
        correct: true,
        note: 'Correct. Full refresh replaces the stream contents, so rows absent at the source are removed.',
        note_ja: '正解。full refresh は内容を置き換えるため、ソースに無い行は削除される。',
      },
      {
        text: 'Have the source include a status field so closed accounts can be identified and excluded explicitly',
        text_ja: 'ソースにステータス項目を持たせ、解約済みを明示的に識別・除外できるようにする',
        correct: true,
        note: 'Correct. An explicit status is more robust than inferring closure from a row\'s absence.',
        note_ja: '正解。行が無いことから解約を推測するより、明示的なステータスの方が堅牢。',
      },
      {
        text: 'Reduce the ingestion frequency to weekly',
        text_ja: '取り込み頻度を週次に減らす',
        correct: false,
        note: 'Frequency is irrelevant; upsert never deletes anything no matter how often it runs.',
        note_ja: '頻度は無関係。upsert は何回実行しても何も削除しない。',
      },
      {
        text: 'Change the primary key so closed accounts stop matching',
        text_ja: '解約済みが一致しなくなるよう主キーを変更する',
        correct: false,
        note: 'Breaks identification for every row and produces duplicates rather than removing stale records.',
        note_ja: 'すべての行の識別が壊れ、古いレコードが消えるどころか重複が生じる。',
      },
      {
        text: 'Delete the affected individuals from the Unified Individual DMO',
        text_ja: '該当する個人を Unified Individual DMO から削除する',
        correct: false,
        note: 'Unified profiles are generated output; the next resolution run recreates them from the source data.',
        note_ja: '統合プロファイルは生成された出力。次の解決実行でソースデータから作り直される。',
      },
    ],
    explanation:
      'Upsert has no deletion semantics: it updates on primary key match and inserts otherwise, so a row that vanishes from the source simply stops being updated. Either make deletions propagate with full refresh, or model closure explicitly with a status field — the latter is often preferable because it survives a change of refresh mode.',
    explanation_ja:
      'upsert に削除の意味論はない。主キーが一致すれば更新し、なければ挿入するだけなので、ソースから消えた行は単に更新されなくなる。full refresh で削除を伝播させるか、ステータス項目で解約を明示的にモデル化する。後者は更新モードを変えても機能し続けるため、しばしば望ましい。',
    reference:
      '💡 Absence of a row is a weak signal. An explicit status field states the fact instead of implying it.',
    reference_ja:
      '💡 行が無いことは弱いシグナル。明示的なステータス項目は、事実をほのめかすのではなく明言する。',
  },
  {
    id: 'dc-app-11',
    domain: 'dc-ingestion',
    type: 'mcq',
    question:
      'A source system exposes a customer id that is regenerated whenever the record is edited. Why is it unsuitable as a primary key?',
    question_ja:
      'あるソースシステムは、レコードが編集されるたびに再生成される顧客 ID を公開している。これが主キーとして不適切な理由はどれか。',
    options: [
      {
        text: 'It is not stable, so upsert cannot recognise the row across runs and will insert duplicates',
        text_ja: '安定していないため、upsert が実行をまたいで同じ行を認識できず、重複を挿入してしまう',
        correct: true,
        note: 'Correct. A primary key must be unique and stable in the source.',
        note_ja: '正解。主キーはソース側で一意かつ安定している必要がある。',
      },
      {
        text: 'Primary keys must always be email addresses',
        text_ja: '主キーは必ずメールアドレスでなければならない',
        correct: false,
        note: 'No such rule. Any unique, stable field can serve.',
        note_ja: 'そのような規則はない。一意かつ安定した項目であれば何でもよい。',
      },
      {
        text: 'Numeric identifiers cannot be used as primary keys',
        text_ja: '数値の識別子は主キーとして使用できない',
        correct: false,
        note: 'Invented restriction; the data type is not the issue.',
        note_ja: '架空の制約。データ型は問題ではない。',
      },
      {
        text: 'It would cause identity resolution to over-match',
        text_ja: 'ID解決が過剰一致を起こすため',
        correct: false,
        note: 'Wrong stage and wrong direction — this is an ingestion-level problem producing duplicate rows.',
        note_ja: '段階も方向も誤り。これは重複行を生む取り込み段階の問題。',
      },
    ],
    explanation:
      'The primary key is what makes a row identifiable across runs. A key that changes on every edit means each run sees an unrecognised row and inserts it, so the DLO fills with duplicates of the same customer. Look for a genuinely stable identifier, or derive one at ingest with a formula field.',
    explanation_ja:
      '主キーは実行をまたいで行を識別するためのものである。編集のたびに変わる主キーでは、実行のたびに未知の行と見なされて挿入され、DLO は同一顧客の重複で埋まる。本当に安定した識別子を探すか、取り込み時に数式項目で導出する。',
    reference:
      '💡 Two requirements for a primary key: unique across rows, and stable across runs. Both, not either.',
    reference_ja:
      '💡 主キーの要件は2つ：行をまたいで一意であること、実行をまたいで安定していること。どちらか一方ではなく両方。',
  },
  {
    id: 'dc-app-12',
    domain: 'dc-ingestion',
    type: 'scenario',
    scenario:
      'A consultant must combine an orders DLO with a returns DLO to produce a net-purchase figure per customer, refreshed nightly for use in segmentation.',
    scenario_ja:
      'コンサルタントが、注文の DLO と返品の DLO を組み合わせて顧客ごとの純購入額を算出し、毎晩更新してセグメンテーションに使えるようにする必要がある。',
    question: 'Which approach fits best?',
    question_ja: '最も適した方法はどれか。',
    options: [
      {
        text: 'A batch data transform joining and aggregating the two objects, writing the result to a new DLO',
        text_ja: '2つのオブジェクトを結合・集計するバッチデータ変換を作り、結果を新しい DLO に書き出す',
        correct: true,
        note: 'Correct. Joins and aggregation on a schedule are exactly what batch transforms are for.',
        note_ja: '正解。スケジュール実行での結合と集計こそバッチ変換の用途。',
      },
      {
        text: 'A formula field on the orders data stream subtracting returns',
        text_ja: '注文のデータストリームに、返品を差し引く数式項目を作る',
        correct: false,
        note: 'Formula fields are row-level at ingest and cannot reach into another object to join or aggregate.',
        note_ja: '数式項目は取り込み時の行単位のもので、別オブジェクトに手を伸ばして結合や集計はできない。',
      },
      {
        text: 'Ask the source system to provide a pre-calculated net-purchase field',
        text_ja: 'ソースシステムに、事前計算した純購入額の項目を提供してもらう',
        correct: false,
        note: 'Prefer transforming in Data 360; the source usually serves other consumers with other definitions.',
        note_ja: 'Data 360 側での変換を選ぶ。ソースは通常、別の定義を持つ他の利用者にも応えている。',
      },
      {
        text: 'A streaming insight over the orders stream',
        text_ja: '注文ストリームに対する Streaming Insight',
        correct: false,
        note: 'Real-time machinery for a nightly requirement; the value does not decay in minutes.',
        note_ja: '夜間の要件にリアルタイムの仕組みを持ち込んでいる。この値は数分で失われはしない。',
      },
    ],
    explanation:
      'Match the weight of the work to the tool. Formula fields do light row-level derivation at ingest — concatenation, casting, trimming. Batch data transforms do the heavier scheduled work of joining across objects, aggregating and reshaping, and write their output to a new DLO that can then be mapped and segmented on.',
    explanation_ja:
      '作業の重さに応じてツールを選ぶ。数式項目は取り込み時の軽量な行単位の導出（連結・型変換・トリム）を担う。バッチデータ変換はオブジェクト間の結合・集計・再構成といったより重いスケジュール処理を担い、出力を新しい DLO に書き出す。その DLO はマッピングしてセグメントに使える。',
    reference:
      '💡 Note: a calculated insight could also produce this metric. Transform when you need a new object; insight when you need a metric.',
    reference_ja:
      '💡 補足：この指標は Calculated Insight でも作れる。新しいオブジェクトが要るなら変換、指標が要るならインサイト。',
  },

  // ================= Harmonization and Unification (5) =================
  {
    id: 'dc-app-13',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'A hotel group matches guests on email exact match only. Corporate bookers frequently reserve rooms for many colleagues using their own email address, and those guests are now merging into one profile.',
    scenario_ja:
      'あるホテルグループが、メールの完全一致のみでゲストを照合している。法人の予約担当者が自分のメールアドレスで多数の同僚の部屋を予約することが多く、それらのゲストが1つのプロファイルに結合されてしまっている。',
    question: 'What should the consultant do?',
    question_ja: 'コンサルタントは何をすべきか。',
    options: [
      {
        text: 'Stop treating the booking email as an identifying signal on its own; match on a guest-level identifier instead',
        text_ja: '予約時のメールを単独の識別シグナルとして扱うのをやめ、ゲスト単位の識別子で照合する',
        correct: true,
        note: 'Correct. The email identifies the booker, not the guest, so it is the wrong field to match on here.',
        note_ja: '正解。そのメールが識別しているのは予約者であってゲストではない。ここで照合すべき項目ではない。',
      },
      {
        text: 'Switch the email match from exact to fuzzy',
        text_ja: 'メールの照合を完全一致からあいまい一致に変更する',
        correct: false,
        note: 'Loosening makes over-matching worse. The email is genuinely identical — that is the problem.',
        note_ja: '緩めれば過剰一致は悪化する。メールは本当に同一であり、それこそが問題。',
      },
      {
        text: 'Delete the corporate bookers from Data 360',
        text_ja: '法人の予約担当者を Data 360 から削除する',
        correct: false,
        note: 'Destroys data about real customers, and the merged guests would remain merged.',
        note_ja: '実在する顧客のデータを破壊するうえ、結合されたゲストは結合されたまま残る。',
      },
      {
        text: 'Add a reconciliation rule using Most Recent to pick the right guest name',
        text_ja: '正しいゲスト名を選ぶため、Most Recent の調整ルールを追加する',
        correct: false,
        note: 'Reconciliation picks a value after merging; it cannot undo a merge that should not have happened.',
        note_ja: '調整は結合後に値を選ぶもの。起きるべきでなかった結合を取り消せない。',
      },
    ],
    explanation:
      'Over-matching is not always caused by a loose rule — sometimes the field itself is not identifying in that context. A booking email identifies whoever made the booking, so matching guests on it merges everyone a corporate booker ever booked for. Never match on a field that does not identify the entity you are resolving.',
    explanation_ja:
      '過剰一致は必ずしもルールが緩いことによるものではない。その文脈でその項目自体が識別性を持たない場合もある。予約時のメールが識別するのは予約を行った人物であり、それでゲストを照合すれば、法人の予約担当者が予約したすべての人が結合される。解決しようとしている対象を識別しない項目で照合してはならない。',
    reference:
      '💡 Ask what the field identifies, not just how unique it looks. A shared email is unique — to the wrong person.',
    reference_ja:
      '💡 項目がどれだけ一意に見えるかではなく、何を識別しているかを問う。共有されたメールは一意だが、識別しているのは別人。',
  },
  {
    id: 'dc-app-14',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'A consultant has mapped a new loyalty DLO to the Individual DMO only. Identity resolution will not let them build a rule using email, and match rates are poor.',
    scenario_ja:
      'コンサルタントが、新しいロイヤルティ DLO を Individual DMO にのみマッピングした。ID解決でメールを使うルールを作成できず、一致率も低い。',
    question: 'What is the most likely cause?',
    question_ja: '最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'Email must be mapped to Contact Point Email, not held as an attribute of Individual',
        text_ja: 'メールは Individual の属性としてではなく、Contact Point Email にマッピングする必要がある',
        correct: true,
        note: 'Correct. Contact points are separate DMOs, and matching on email expects the data to live there.',
        note_ja: '正解。Contact Point は別 DMO であり、メールでの照合はそこにデータがあることを前提とする。',
      },
      {
        text: 'Identity resolution cannot use email as a match criterion',
        text_ja: 'ID解決はメールを一致条件として使用できない',
        correct: false,
        note: 'Email is one of the strongest ordinary matching signals available.',
        note_ja: 'メールは、通常利用できる中で最も強い照合シグナルの1つ。',
      },
      {
        text: 'The DLO must be in the Engagement category to support matching',
        text_ja: '照合を行うには DLO が Engagement カテゴリでなければならない',
        correct: false,
        note: 'The opposite — identity resolution is built on Profile data.',
        note_ja: '逆である。ID解決は Profile データの上に成り立つ。',
      },
      {
        text: 'Match rules require a custom DMO',
        text_ja: '一致ルールにはカスタム DMO が必要',
        correct: false,
        note: 'Standard DMOs are exactly what the rules are designed around.',
        note_ja: '標準 DMO こそ、ルールが前提として設計されているもの。',
      },
    ],
    explanation:
      'Mapping only to Individual is a common and consequential mistake. The Customer 360 model deliberately separates contact points — email, phone, address — into their own DMOs, because a person can hold several of each and each carries its own consent state. Matching rules expect to find email in Contact Point Email.',
    explanation_ja:
      'Individual にのみマッピングするのは、よくある、そして影響の大きい誤りである。Customer 360 モデルは Contact Point（メール・電話・住所）を意図的に別々の DMO に分けている。1人が各種類を複数持ち得て、それぞれが固有の同意状態を伴うためである。一致ルールはメールが Contact Point Email にあることを前提としている。',
    reference:
      '💡 Map identifiers to where the model expects them: emails to Contact Point Email, system ids to Party Identification.',
    reference_ja:
      '💡 識別子はモデルが期待する場所へマッピングする。メールは Contact Point Email、システムの ID は Party Identification。',
  },
  {
    id: 'dc-app-15',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'A unified profile shows a customer\'s job title from the CRM, but the marketing platform has a newer value. The business says the CRM is authoritative for job titles. Is the profile behaving correctly?',
    question_ja:
      'ある統合プロファイルが CRM の役職を表示しているが、マーケティング基盤にはより新しい値がある。事業側は役職については CRM が正だとしている。プロファイルの挙動は正しいか。',
    options: [
      {
        text: 'Yes, if the reconciliation rule is Source Priority with CRM ranked first',
        text_ja: '正しい。調整ルールが Source Priority で CRM が最上位であれば',
        correct: true,
        note: 'Correct. Source priority deliberately overrides recency when a system is declared authoritative.',
        note_ja: '正解。あるシステムが正と宣言されているとき、ソース優先度は意図的に最新性を上回る。',
      },
      {
        text: 'No — the unified profile should always show the most recently updated value',
        text_ja: '正しくない。統合プロファイルは常に最後に更新された値を表示すべきである',
        correct: false,
        note: 'Recency is one strategy among three, not a universal rule, and it contradicts the stated requirement.',
        note_ja: '最新性は3つの方式の1つであって普遍の規則ではないし、明示された要件と矛盾する。',
      },
      {
        text: 'No — a match rule is needed to select the correct job title',
        text_ja: '正しくない。正しい役職を選ぶには一致ルールが必要である',
        correct: false,
        note: 'Wrong rule type. Match rules decide merging; reconciliation decides displayed values.',
        note_ja: 'ルール種別が誤り。一致ルールは結合を、調整ルールは表示する値を決める。',
      },
      {
        text: 'No — job title cannot be reconciled and must be maintained manually',
        text_ja: '正しくない。役職は調整できないため手動で維持する必要がある',
        correct: false,
        note: 'Invented limitation; text attributes like job title reconcile normally.',
        note_ja: '架空の制約。役職のようなテキスト属性は通常どおり調整できる。',
      },
    ],
    explanation:
      'Source priority intentionally beats recency. When the business declares a system of record for an attribute, the newest value from a less-trusted system should not win — that is the whole reason the strategy exists. The profile is behaving exactly as configured, and the configuration matches the stated requirement.',
    explanation_ja:
      'ソース優先度は意図的に最新性に優先する。事業側がある属性について記録システムを宣言したなら、信頼度の低いシステムの新しい値が勝ってはならない。この方式が存在する理由がまさにそれである。プロファイルは設定どおりに動いており、その設定は明示された要件に合致している。',
    reference:
      '💡 "Newest" and "most trusted" are different questions. Decide which one the business actually asked for.',
    reference_ja:
      '💡 「最新」と「最も信頼できる」は別の問い。事業側が実際に求めたのはどちらかを判断する。',
  },
  {
    id: 'dc-app-16',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'After a match rule change, a customer service manager reports that a long-standing VIP customer\'s profile "lost" ten years of order history. The orders are still visible in Data Explorer on the orders DMO.',
    scenario_ja:
      '一致ルールの変更後、あるカスタマーサービスのマネージャーから、長年の VIP 顧客のプロファイルが10年分の注文履歴を「失った」と報告があった。注文は注文 DMO 上の Data Explorer では依然として確認できる。',
    question: 'What most likely happened?',
    question_ja: '最も可能性の高い出来事はどれか。',
    options: [
      {
        text: 'The rule change split the unified profile, so the orders now attach to a different unified individual',
        text_ja: 'ルール変更で統合プロファイルが分割され、注文が別の統合プロファイルに紐づいた',
        correct: true,
        note: 'Correct. The data still exists — the link changed. This is the blast radius of a ruleset change.',
        note_ja: '正解。データは存在しており、変わったのは紐づけである。ルールセット変更の影響範囲がこれ。',
      },
      {
        text: 'The order data was deleted by the resolution run',
        text_ja: '解決処理の実行によって注文データが削除された',
        correct: false,
        note: 'Unification is additive, not destructive — and the scenario confirms the orders are still there.',
        note_ja: '統合は加算的であって破壊的ではない。シナリオも注文が残っていることを確認している。',
      },
      {
        text: 'The orders data stream failed and must be re-ingested',
        text_ja: '注文のデータストリームが失敗したため、再取り込みが必要',
        correct: false,
        note: 'The orders are visible in Data Explorer, so ingestion is fine.',
        note_ja: '注文は Data Explorer で確認できるので取り込みは正常。',
      },
      {
        text: 'A reconciliation rule discarded the older orders',
        text_ja: '調整ルールが古い注文を破棄した',
        correct: false,
        note: 'Reconciliation picks among conflicting attribute values; it does not discard related records.',
        note_ja: '調整は衝突する属性値の中から選ぶもので、関連レコードを破棄しない。',
      },
    ],
    explanation:
      'Changing match rules re-resolves profiles, which can merge or split existing unified individuals. Nothing is destroyed — the source records and related data remain — but the links change, and anything depending on those links appears to lose data. Run a ruleset against a sample first and treat the change as governed, not as a quick edit.',
    explanation_ja:
      '一致ルールの変更はプロファイルを再解決し、既存の統合プロファイルを結合したり分割したりする。失われるものは何もなく、ソースレコードと関連データは残るが、紐づけが変わるため、それに依存していたものはデータを失ったように見える。まずサンプルに対してルールセットを実行し、この変更を軽い編集ではなく統制された変更として扱うこと。',
    reference:
      '💡 "Data disappeared" after a ruleset change is almost always a re-link, not a deletion. Check Profile Explorer.',
    reference_ja:
      '💡 ルールセット変更後の「データが消えた」は、ほぼ常に削除ではなく紐づけ直し。Profile Explorer を確認する。',
  },
  {
    id: 'dc-app-17',
    domain: 'dc-unification',
    type: 'multi',
    question:
      'Which two are true about the relationship between harmonisation and unification? (Choose 2)',
    question_ja: '調和と統合の関係について正しいものを2つ選べ。',
    options: [
      {
        text: 'Harmonisation must happen first — identity resolution runs on mapped DMOs, not raw DLOs',
        text_ja: '調和が先。ID解決はマッピング済みの DMO に対して実行され、生の DLO には対して実行されない',
        correct: true,
        note: 'Correct. Mapping is the prerequisite for every downstream stage, resolution included.',
        note_ja: '正解。マッピングは、解決処理を含む下流のあらゆる段階の前提条件。',
      },
      {
        text: 'Harmonisation is structural (aligning field names to a shared model); unification is about people',
        text_ja: '調和は構造の話（項目名を共通モデルへ揃える）で、統合は人の話である',
        correct: true,
        note: 'Correct. Two different jobs that exam scenarios often blend together.',
        note_ja: '正解。試験のシナリオがしばしば混ぜて出す、2つの異なる作業。',
      },
      {
        text: 'Unification happens first, and harmonisation then aligns the merged profiles',
        text_ja: '統合が先に起き、その後で調和が結合済みプロファイルを揃える',
        correct: false,
        note: 'Reversed. Resolution needs the data already in a shared shape to compare it.',
        note_ja: '順序が逆。解決処理は比較のために、データが既に共通の形になっている必要がある。',
      },
      {
        text: 'Harmonisation automatically deduplicates people as a side effect of mapping',
        text_ja: 'マッピングの副次効果として、調和が自動的に人物を重複排除する',
        correct: false,
        note: 'Mapping aligns structure only. Deduplicating people is what identity resolution does.',
        note_ja: 'マッピングが揃えるのは構造だけ。人物の重複排除は ID解決の役割。',
      },
      {
        text: 'The two are the same process under different names',
        text_ja: '両者は名前が違うだけの同じ処理である',
        correct: false,
        note: 'They are distinct stages, and the exam tests whether you can separate them.',
        note_ja: '別々の段階であり、試験はそれを区別できるかを問う。',
      },
    ],
    explanation:
      'Harmonisation takes a DLO with whatever column names the source used and maps it onto a DMO, so every source speaks the same language. Unification then decides that five rows are one human being. The order is fixed: you cannot compare records meaningfully until they are in a shared shape.',
    explanation_ja:
      '調和は、ソースが使っていた列名のままの DLO を DMO へマッピングし、どのソースも同じ言葉を話すようにする。統合はその後で、5行が1人の人間だと判断する。順序は固定である。共通の形になるまで、レコードを意味のある形で比較できない。',
    reference:
      '💡 Structure first, then people. Map before you resolve, always.',
    reference_ja:
      '💡 まず構造、次に人。解決の前に必ずマッピングする。',
  },

  // ================= Enhancements, Sharing and Analysis (5) =================
  {
    id: 'dc-app-18',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'A gym chain wants two metrics: "visits in the last 7 days" for a weekly engagement report, and "member has just badged in at reception" to trigger a personalised greeting on the front-desk screen.',
    scenario_ja:
      'あるジムチェーンが2つの指標を求めている。週次のエンゲージメントレポート用の「直近7日間の来館回数」と、受付画面にパーソナライズされた挨拶を表示するための「会員が今まさに受付で入館した」である。',
    question: 'How should these be built?',
    question_ja: 'これらはどう構築すべきか。',
    options: [
      {
        text: 'A calculated insight for the weekly metric, and a streaming insight with a data action for the badge-in',
        text_ja: '週次の指標には Calculated Insight、入館には Data Action を伴う Streaming Insight',
        correct: true,
        note: 'Correct. One is a stable scheduled metric; the other decays in seconds and needs an immediate response.',
        note_ja: '正解。一方は安定したスケジュール指標、他方は数秒で価値が失われ即時の対応を要する。',
      },
      {
        text: 'Two calculated insights, one refreshed weekly and one refreshed every minute',
        text_ja: '2つの Calculated Insight。1つは週次、もう1つは毎分更新',
        correct: false,
        note: 'A one-minute batch is expensive and still too slow for a person standing at reception.',
        note_ja: '1分ごとのバッチは高コストで、しかも受付に立っている人には依然として遅すぎる。',
      },
      {
        text: 'Two streaming insights, since streaming can serve both requirements',
        text_ja: '2つの Streaming Insight。ストリーミングは両方の要件に応えられるため',
        correct: false,
        note: 'Over-engineering the weekly metric, which is stable and better computed in batch.',
        note_ja: '週次の指標に対する過剰設計。安定した指標はバッチで計算する方がよい。',
      },
      {
        text: 'A data graph for both, refreshed hourly',
        text_ja: '両方を Data Graph にし、1時間ごとに更新する',
        correct: false,
        note: 'A data graph makes reads fast; it does not compute metrics or trigger responses.',
        note_ja: 'Data Graph は読み取りを速くするもので、指標の計算も対応の起動も行わない。',
      },
    ],
    explanation:
      'Choose insights by latency requirement, not by what you want to compute. "Visits in the last 7 days" is stable and reusable — a calculated insight on a schedule. "Just badged in" decays in seconds and must produce an immediate response, which is a streaming insight triggering a data action.',
    explanation_ja:
      'インサイトは「何を計算したいか」ではなく遅延要件で選ぶ。「直近7日間の来館回数」は安定していて再利用でき、スケジュール実行の Calculated Insight が適する。「今まさに入館した」は数秒で価値が失われ即時の対応を要するので、Data Action を起動する Streaming Insight になる。',
    reference:
      '💡 The same scenario can need both. Read each metric separately rather than picking one engine for the whole requirement.',
    reference_ja:
      '💡 1つのシナリオが両方を必要とすることもある。要件全体で1つに決めず、指標ごとに読む。',
  },
  {
    id: 'dc-app-19',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'An insurer\'s Agentforce agent gives confident but incorrect answers about customers\' active policies. Investigation shows each customer exists as three unresolved profiles across the policy, claims and portal systems.',
    scenario_ja:
      'ある保険会社の Agentforce エージェントが、顧客の有効な契約について自信を持って誤った回答をしている。調査の結果、各顧客が契約・請求・ポータルの3システムにわたって未解決の3プロファイルとして存在していることが判明した。',
    question: 'What is the root cause and the correct fix?',
    question_ja: '根本原因と正しい対処はどれか。',
    options: [
      {
        text: 'Grounding on unresolved profiles gives the model a fragment of the customer; fix identity resolution first',
        text_ja: '未解決のプロファイルにグラウンディングするとモデルに顧客の断片しか渡らない。まず ID解決を直す',
        correct: true,
        note: 'Correct. AI is bounded by the quality of its grounding, and unification is what makes grounding complete.',
        note_ja: '正解。AI の品質はグラウンディングの質で上限が決まり、グラウンディングを完全にするのが統合。',
      },
      {
        text: 'The language model is faulty and should be replaced',
        text_ja: '言語モデルに欠陥があるので置き換えるべきである',
        correct: false,
        note: 'The model answered correctly given what it was shown. The input was incomplete, not the model.',
        note_ja: '与えられた情報に対してモデルは正しく答えている。不完全だったのは入力であってモデルではない。',
      },
      {
        text: 'Increase the data graph refresh frequency',
        text_ja: 'Data Graph の更新頻度を上げる',
        correct: false,
        note: 'Refreshing a graph built over fragmented profiles just delivers the same fragments sooner.',
        note_ja: '分断されたプロファイルの上に作った Data Graph を頻繁に更新しても、同じ断片が早く届くだけ。',
      },
      {
        text: 'Disable the agent until the policy system is rebuilt',
        text_ja: '契約システムを作り直すまでエージェントを停止する',
        correct: false,
        note: 'Disproportionate. The source systems are fine; the resolution layer is what needs work.',
        note_ja: '過剰。ソースシステムに問題はなく、手を入れるべきは解決の層。',
      },
    ],
    explanation:
      'This connects the positioning objective to the AI objective. Data 360 is the grounding layer, and grounding is only as good as the profile behind it. An agent shown one of three fragments will answer confidently from that fragment — which is precisely how confidently wrong answers are produced. Fix unification, and the grounding becomes complete.',
    explanation_ja:
      'これは位置づけの観点と AI の観点をつなぐ設問である。Data 360 はグラウンディング層であり、グラウンディングの質はその背後のプロファイルを超えない。3つの断片のうち1つだけを見せられたエージェントは、その断片から自信を持って答える。自信満々の誤答が生まれる経路がまさにこれである。統合を直せばグラウンディングは完全になる。',
    reference:
      '💡 When AI answers are wrong but confident, suspect the grounding data before suspecting the model.',
    reference_ja:
      '💡 AI の回答が誤っているのに自信満々なら、モデルを疑う前にグラウンディングのデータを疑う。',
  },
  {
    id: 'dc-app-20',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'A company wants a churn score available for segmentation, personalisation on the website, and display in the service console. How many times must the score be computed?',
    question_ja:
      'ある企業が、解約スコアをセグメンテーション、Web サイトのパーソナライゼーション、サービスコンソールでの表示に使いたい。スコアは何回計算する必要があるか。',
    options: [
      {
        text: 'Once — the prediction lands as a DMO field and every consumer reads the same value',
        text_ja: '1回。予測は DMO の項目として着地し、すべての利用者が同じ値を読む',
        correct: true,
        note: 'Correct. Once a score is a DMO field, it behaves like any other attribute across all consumption paths.',
        note_ja: '正解。スコアが DMO の項目になれば、すべての利用経路で他の属性と同じように振る舞う。',
      },
      {
        text: 'Three times — once per consuming channel',
        text_ja: '3回。利用チャネルごとに1回',
        correct: false,
        note: 'Duplicating the computation guarantees the three channels eventually show different scores.',
        note_ja: '計算を重複させれば、3つのチャネルがいずれ異なるスコアを示すことになる。',
      },
      {
        text: 'Twice — once for batch consumers and once for real-time consumers',
        text_ja: '2回。バッチ利用者向けとリアルタイム利用者向けにそれぞれ1回',
        correct: false,
        note: 'The same stored value serves both; a data graph can make the real-time read fast without recomputing.',
        note_ja: '同じ保存値が両方に応える。リアルタイムの読み取りは、再計算せずとも Data Graph で高速化できる。',
      },
      {
        text: 'Once per data space that consumes it',
        text_ja: '利用するデータスペースごとに1回',
        correct: false,
        note: 'Data spaces partition data; they are not a reason to recompute a score.',
        note_ja: 'データスペースはデータを区画化するもので、スコアを再計算する理由にはならない。',
      },
    ],
    explanation:
      'Prediction output lands as a DMO field, which means the score becomes an ordinary attribute. Segmentation, personalisation and console display all read the same stored value. Computing the same metric several times is how organisations end up with three teams reporting three different numbers.',
    explanation_ja:
      '予測結果は DMO の項目として着地するため、スコアは通常の属性になる。セグメンテーション、パーソナライゼーション、コンソール表示のいずれも同じ保存値を読む。同じ指標を複数回計算することこそ、3チームが3つの異なる数値を報告する結果を招く。',
    reference:
      '💡 One definition, many consumers. This applies to predictions and calculated insights alike.',
    reference_ja:
      '💡 定義は1つ、利用者は複数。これは予測にも Calculated Insight にも等しく当てはまる。',
  },
  {
    id: 'dc-app-21',
    domain: 'dc-insights',
    type: 'scenario',
    scenario:
      'A finance team asks for Data 360 data to be delivered to their spreadsheet every month so they can build their own analysis, arguing it is simpler than learning a new tool.',
    scenario_ja:
      'ある財務チームが、独自の分析を行うため、Data 360 のデータを毎月表計算ファイルで受け取りたいと求めている。新しいツールを覚えるより簡単だ、というのが理由である。',
    question: 'What should the consultant recommend?',
    question_ja: 'コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'Connect CRM Analytics or Tableau to Data 360 so the analysis runs on live unified data',
        text_ja: 'CRM Analytics か Tableau を Data 360 に接続し、統合データに対してその場で分析する',
        correct: true,
        note: 'Correct. Both read Data 360 objects directly, so no ungoverned copy is created.',
        note_ja: '正解。どちらも Data 360 のオブジェクトを直接読むため、統制されていないコピーが生じない。',
      },
      {
        text: 'Set up the monthly export as requested, since the team knows their own needs best',
        text_ja: 'チームが自分たちの必要を最もよく知っているので、要望どおり月次エクスポートを設定する',
        correct: false,
        note: 'Creates an ungoverned copy that goes stale immediately and cannot honour access controls.',
        note_ja: '即座に古くなり、アクセス制御も反映できない統制されていないコピーを作ることになる。',
      },
      {
        text: 'Refuse and require them to use Data Explorer',
        text_ja: '断り、Data Explorer を使うよう求める',
        correct: false,
        note: 'Data Explorer is an administrative diagnostic tool, not an analysis environment for a finance team.',
        note_ja: 'Data Explorer は管理者向けの診断ツールであって、財務チームの分析環境ではない。',
      },
      {
        text: 'Activate a segment to an SFTP target so the file arrives automatically',
        text_ja: 'ファイルが自動的に届くよう、SFTP ターゲットへセグメントをアクティベートする',
        correct: false,
        note: 'Automating the export does not fix it — it is still a second copy that immediately drifts.',
        note_ja: 'エクスポートを自動化しても解決しない。即座にずれ始める2つ目のコピーであることに変わりはない。',
      },
    ],
    explanation:
      'Prefer analysing in place. CRM Analytics reads Data 360 objects directly and Tableau connects for exploratory work, so the finance team gets their analysis without a copy. An export — manual or automated — creates a second version of the truth that starts drifting the moment it is created and carries none of the platform\'s access controls.',
    explanation_ja:
      'その場での分析を選ぶ。CRM Analytics は Data 360 のオブジェクトを直接読み、Tableau は探索的な作業のために接続する。したがって財務チームはコピーなしに分析を得られる。手動であれ自動であれエクスポートは2つ目の「正しい数値」を作り、それは作成した瞬間からずれ始め、プラットフォームのアクセス制御を何も引き継がない。',
    reference:
      '💡 Automating a bad pattern does not make it a good one. An automated export is still an export.',
    reference_ja:
      '💡 悪いパターンを自動化しても良いパターンにはならない。自動化されたエクスポートもエクスポート。',
  },
  {
    id: 'dc-app-22',
    domain: 'dc-insights',
    type: 'mcq',
    question:
      'Which of these is NOT a reason to build a data graph?',
    question_ja: 'Data Graph を作る理由として当てはまらないものはどれか。',
    options: [
      {
        text: 'To guarantee transactionally current values at the moment of reading',
        text_ja: '読み取りの瞬間にトランザクション整合の値を保証するため',
        correct: true,
        note: 'Correct — this is NOT a reason. The view is materialised, so it is only as fresh as its last refresh.',
        note_ja: '正解＝理由に当てはまらない。マテリアライズドビューなので、鮮度は最後の更新時点まで。',
      },
      {
        text: 'To reduce the number of calls needed to assemble a customer context',
        text_ja: '顧客コンテキストを組み立てるのに必要な呼び出し回数を減らすため',
        correct: false,
        note: 'This IS a reason — pre-computing the join is the core benefit.',
        note_ja: 'これは理由に当てはまる。結合の事前計算が中核の利点。',
      },
      {
        text: 'To ground a generative AI agent with structured customer context',
        text_ja: '構造化された顧客コンテキストで生成AI エージェントをグラウンディングするため',
        correct: false,
        note: 'This IS a reason — it is one of the primary consumers.',
        note_ja: 'これは理由に当てはまる。主要な利用者の1つ。',
      },
      {
        text: 'To serve a personalisation engine that needs a near-real-time read',
        text_ja: 'ニアリアルタイムの読み取りを必要とするパーソナライゼーションエンジンに応えるため',
        correct: false,
        note: 'This IS a reason — low-latency reads are the design goal.',
        note_ja: 'これは理由に当てはまる。低遅延の読み取りが設計目標。',
      },
    ],
    explanation:
      'Read the question carefully — it asks which is not a reason. A data graph buys speed by pre-computing the join, and the price of pre-computation is that the view must be refreshed and is therefore only as current as its last refresh. It is deliberately not the structure for data that must be transactionally accurate to the second.',
    explanation_ja:
      '設問をよく読むこと。当てはまらないものを問うている。Data Graph は結合を事前計算することで速度を得るが、事前計算の代償として更新が必要になり、鮮度は最後の更新時点までとなる。秒単位でトランザクション整合が必要なデータのための構造では、意図的にない。',
    reference:
      '💡 Watch for NOT / EXCEPT in the stem. Reading past the negation is one of the commonest ways to lose easy marks.',
    reference_ja:
      '💡 設問文の NOT／EXCEPT に注意。否定の読み飛ばしは、取れるはずの点を落とす最も一般的な原因の1つ。',
  },

  // ================= Activations and Utilization (6) =================
  {
    id: 'dc-app-23',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A charity wants to email a thank-you within one hour of a donation, and separately to send a quarterly impact report to everyone who donated in the previous quarter.',
    scenario_ja:
      'ある慈善団体が、寄付から1時間以内にお礼のメールを送りたいと考えている。それとは別に、前四半期に寄付したすべての人へ四半期ごとの活動報告を送りたいとも考えている。',
    question: 'Which mechanisms fit each requirement?',
    question_ja: 'それぞれの要件に適した仕組みはどれか。',
    options: [
      {
        text: 'A data action for the thank-you, and a segment with a quarterly activation for the report',
        text_ja: 'お礼には Data Action、報告には四半期のアクティベーションを伴うセグメント',
        correct: true,
        note: 'Correct. One is a per-donation event, the other is a scheduled population send.',
        note_ja: '正解。一方は寄付ごとのイベント、他方はスケジュールされた母集団への送信。',
      },
      {
        text: 'Segments with activations for both, published hourly and quarterly',
        text_ja: '両方をセグメント＋アクティベーションにし、1時間ごとと四半期ごとに公開する',
        correct: false,
        note: 'An hourly publish is a heavy way to approximate an event, and it still may not hit the one-hour window.',
        note_ja: '1時間ごとの公開はイベントを近似する重い方法であり、しかも1時間以内に収まらないことがある。',
      },
      {
        text: 'Data actions for both, one firing per donation and one firing quarterly',
        text_ja: '両方を Data Action にし、寄付ごとと四半期ごとに発火させる',
        correct: false,
        note: 'Data actions fire on events, not on a calendar. The quarterly report is a population send.',
        note_ja: 'Data Action はイベントで発火するもので、カレンダーでは発火しない。四半期報告は母集団への送信。',
      },
      {
        text: 'Streaming insights for both',
        text_ja: '両方を Streaming Insight にする',
        correct: false,
        note: 'Streaming insights compute metrics; they do not deliver a population to a channel.',
        note_ja: 'Streaming Insight は指標を計算するもので、母集団をチャネルへ届けるものではない。',
      },
    ],
    explanation:
      'The two paths are distinguished by shape, not by speed alone. "When this happens, do that" — a donation arriving — is a data action. "Send this population a campaign" — everyone who donated last quarter — is a segment plus activation on a schedule. Requirements often contain both, and each is answered separately.',
    explanation_ja:
      '2つの経路は速度だけでなく形で区別される。「これが起きたらあれをする」（寄付が発生する）は Data Action である。「この母集団にキャンペーンを送る」（前四半期に寄付した全員）はセグメント＋スケジュール実行のアクティベーションである。要件には両方が含まれることが多く、それぞれ別々に答える。',
    reference:
      '💡 Ask "is this an event or a population?" for each requirement separately, before choosing any mechanism.',
    reference_ja:
      '💡 仕組みを選ぶ前に、要件ごとに「これはイベントか母集団か」を別々に問う。',
  },
  {
    id: 'dc-app-24',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A business requires that a campaign reaches customers within four hours of them qualifying. Ingestion runs hourly, identity resolution runs every six hours, and the segment publishes every two hours.',
    scenario_ja:
      'ある事業では、顧客が条件を満たしてから4時間以内にキャンペーンを届ける必要がある。取り込みは1時間ごと、ID解決は6時間ごと、セグメントの公開は2時間ごとに実行されている。',
    question: 'What should the consultant change?',
    question_ja: 'コンサルタントは何を変更すべきか。',
    options: [
      {
        text: 'Increase the identity resolution frequency — at six hours it alone breaches the four-hour requirement',
        text_ja: 'ID解決の実行頻度を上げる。6時間ではそれだけで4時間の要件を超過する',
        correct: true,
        note: 'Correct. Freshness is bounded by the slowest schedule, and resolution is the bottleneck here.',
        note_ja: '正解。鮮度は最も遅いスケジュールで決まり、ここでのボトルネックは解決処理。',
      },
      {
        text: 'Increase the ingestion frequency to every 15 minutes',
        text_ja: '取り込み頻度を15分ごとに上げる',
        correct: false,
        note: 'Ingestion is already the fastest stage. Speeding it up does not move the bottleneck.',
        note_ja: '取り込みは既に最も速い段階。速めてもボトルネックは動かない。',
      },
      {
        text: 'Publish the segment every 30 minutes',
        text_ja: 'セグメントを30分ごとに公開する',
        correct: false,
        note: 'Publishing more often just re-reads unresolved data; the six-hour resolution still governs.',
        note_ja: '頻繁に公開しても未解決のデータを読み直すだけ。6時間の解決処理が依然として支配する。',
      },
      {
        text: 'Nothing — the four-hour requirement is already met because ingestion is hourly',
        text_ja: '何も変更しない。取り込みが1時間ごとなので4時間の要件は既に満たされている',
        correct: false,
        note: 'Only the fastest stage is hourly. The end-to-end path is bounded by the slowest.',
        note_ja: '1時間ごとなのは最も速い段階だけ。エンドツーエンドの経路は最も遅い段階で決まる。',
      },
    ],
    explanation:
      'End-to-end freshness is governed by three independent schedules — ingestion, identity resolution and segment publishing — and the slowest one wins. Here resolution at six hours alone exceeds the four-hour requirement, so no amount of faster ingestion or more frequent publishing can meet it.',
    explanation_ja:
      'エンドツーエンドの鮮度は3つの独立したスケジュール（取り込み・ID解決・セグメント公開）で決まり、最も遅いものが支配する。ここでは6時間の解決処理だけで4時間の要件を超えているため、取り込みを速めても公開を頻繁にしても要件は満たせない。',
    reference:
      '💡 When a scenario gives you three schedules and a deadline, find the slowest one. It is always the answer.',
    reference_ja:
      '💡 3つのスケジュールと期限が示されたら、最も遅いものを探す。それが常に答え。',
  },
  {
    id: 'dc-app-25',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A media company activates a segment to an advertising platform. Legal asks for evidence that customers who withdrew consent last week were excluded from this week\'s activation.',
    scenario_ja:
      'あるメディア企業が、広告プラットフォームへセグメントをアクティベートしている。法務から、先週同意を撤回した顧客が今週のアクティベーションから除外されたことの証拠を求められた。',
    question: 'What best supports this?',
    question_ja: 'これを最もよく裏付けるものはどれか。',
    options: [
      {
        text: 'Consent modelled as data and filtered inside the activation, with the activation publish history showing the delivered count',
        text_ja: '同意をデータとしてモデル化してアクティベーション内で絞り込み、公開履歴で配信件数を示す',
        correct: true,
        note: 'Correct. The filter enforces the rule and the history evidences what actually went out.',
        note_ja: '正解。フィルタがルールを強制し、履歴が実際に何が送信されたかを示す。',
      },
      {
        text: 'A signed statement from the marketing team confirming they removed those customers',
        text_ja: '該当顧客を除外したことを確認するマーケティングチームの署名入り文書',
        correct: false,
        note: 'A manual assurance, not a control. Legal is asking for evidence the system enforced it.',
        note_ja: '手作業の保証であって統制ではない。法務が求めているのはシステムが強制した証拠。',
      },
      {
        text: 'Deletion of the withdrawn customers from Data 360',
        text_ja: '同意を撤回した顧客を Data 360 から削除すること',
        correct: false,
        note: 'Destroys the record of the withdrawal, leaving nothing to prove and nothing to prevent re-adding them.',
        note_ja: '撤回の記録そのものを破壊し、証明する材料も再追加を防ぐ手段も失う。',
      },
      {
        text: 'A screenshot of the segment builder showing the current criteria',
        text_ja: '現在の条件を映したセグメントビルダーのスクリーンショット',
        correct: false,
        note: 'Shows the configuration now, not what was actually sent last week.',
        note_ja: '今の設定を示すだけで、先週実際に何が送信されたかは示さない。',
      },
    ],
    explanation:
      'Two things are needed: enforcement and evidence. Filtering on consent inside the segment or activation means an opted-out individual cannot be sent regardless of who runs it, and the activation publish history records what actually went out and how many members it contained. Deleting the record of a withdrawal is counterproductive — it is the very evidence being asked for.',
    explanation_ja:
      '必要なものは2つ、強制と証拠である。セグメントまたはアクティベーションの内側で同意により絞り込めば、誰が実行してもオプトアウト済みの人は送信されない。そしてアクティベーションの公開履歴が、実際に何が何件送信されたかを記録する。撤回の記録を削除するのは逆効果である。それこそが求められている証拠だからである。',
    reference:
      '💡 Consent withdrawal is data to keep, not data to delete. You need it to keep honouring the withdrawal.',
    reference_ja:
      '💡 同意の撤回は削除すべきデータではなく保持すべきデータ。撤回を守り続けるために必要になる。',
  },
  {
    id: 'dc-app-26',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'Which requirement is best met by writing segment membership back to Salesforce CRM?',
    question_ja:
      'セグメントの所属を Salesforce CRM へ書き戻すことで最もよく満たされる要件はどれか。',
    options: [
      {
        text: 'Sales reps need to see which campaigns a contact qualifies for while working the record',
        text_ja: '営業担当者がレコードを操作しながら、そのコンタクトがどのキャンペーンの対象かを見たい',
        correct: true,
        note: 'Correct. Salesforce CRM is a valid activation target, and this closes the loop for CRM users.',
        note_ja: '正解。Salesforce CRM は有効なアクティベーションターゲットであり、CRM ユーザーに対しループを閉じる。',
      },
      {
        text: 'An external ad platform needs the audience for suppression',
        text_ja: '外部の広告プラットフォームが除外用にオーディエンスを必要としている',
        correct: false,
        note: 'That activation should target the advertising platform directly, not travel through CRM.',
        note_ja: 'そのアクティベーションは CRM を経由せず、広告プラットフォームを直接ターゲットにすべき。',
      },
      {
        text: 'An AI agent needs the full customer context during a live conversation',
        text_ja: 'AI エージェントがライブの会話中に顧客コンテキスト全体を必要としている',
        correct: false,
        note: 'That is a data graph and retriever requirement, not segment membership write-back.',
        note_ja: 'それは Data Graph と Retriever の要件で、セグメント所属の書き戻しではない。',
      },
      {
        text: 'Analysts need to explore unified data with SQL',
        text_ja: 'アナリストが SQL で統合データを探索したい',
        correct: false,
        note: 'That is the Query Editor with a read permission set, not an activation.',
        note_ja: 'それは参照用の権限セットとクエリエディタの話で、アクティベーションではない。',
      },
    ],
    explanation:
      'Salesforce CRM is itself an activation target. Writing segment membership back is the standard way to let CRM users act on Data 360 insight during their normal work. The other options each have their own mechanism — direct activation to the ad platform, data graphs for AI grounding, and query access for analysts.',
    explanation_ja:
      'Salesforce CRM 自体がアクティベーションターゲットである。セグメントの所属を書き戻すことが、CRM のユーザーが通常業務の中で Data 360 の知見をもとに行動できるようにする標準的な方法である。他の選択肢にはそれぞれ固有の仕組みがある。広告プラットフォームへの直接アクティベーション、AI グラウンディングのための Data Graph、アナリスト向けのクエリアクセスである。',
    reference:
      '💡 Match the consumer to the mechanism. Not every "make the data available" requirement is an activation.',
    reference_ja:
      '💡 利用者と仕組みを対応づける。「データを使えるようにする」要件がすべてアクティベーションとは限らない。',
  },
  {
    id: 'dc-app-27',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A retailer wants to send a re-order reminder when a customer\'s predicted consumable replenishment date arrives. The prediction comes from a BYOM model and lands as a DMO field updated nightly.',
    scenario_ja:
      'ある小売企業が、顧客の消耗品の予測補充日が到来したタイミングで再注文のリマインダーを送りたいと考えている。予測は BYOM のモデルによるもので、毎晩更新される DMO の項目として着地する。',
    question: 'Which approach fits?',
    question_ja: '適した方法はどれか。',
    options: [
      {
        text: 'A daily segment whose criteria select customers whose predicted date is today, activated to the email channel',
        text_ja: '予測日が本日である顧客を条件とする日次セグメントを、メールチャネルへアクティベートする',
        correct: true,
        note: 'Correct. The prediction is an ordinary DMO attribute, so it can be used as segment criteria like any other.',
        note_ja: '正解。予測は通常の DMO 属性なので、他と同じようにセグメントの条件に使える。',
      },
      {
        text: 'A streaming insight watching the prediction field',
        text_ja: '予測項目を監視する Streaming Insight',
        correct: false,
        note: 'The field updates nightly, so there is no continuous stream to window over, and no minutes-level need.',
        note_ja: '項目は毎晩更新されるので、ウィンドウをかける連続ストリームは存在しないし、分単位の必要もない。',
      },
      {
        text: 'Nothing can be done — predictions cannot be used in segmentation',
        text_ja: '対応不可。予測はセグメンテーションに使用できない',
        correct: false,
        note: 'Predictions land as DMO fields precisely so they can be segmented and activated on.',
        note_ja: '予測が DMO の項目として着地するのは、まさにセグメント化・アクティベートできるようにするため。',
      },
      {
        text: 'Export the predictions and have the email platform decide who to contact',
        text_ja: '予測をエクスポートし、誰に連絡するかはメール基盤に判断させる',
        correct: false,
        note: 'Moves the targeting logic out of the platform and creates a copy that immediately drifts.',
        note_ja: 'ターゲティングのロジックをプラットフォームの外へ出し、即座にずれ始めるコピーを作ることになる。',
      },
    ],
    explanation:
      'This is the practical consequence of predictions landing as DMO fields: a predicted date is just an attribute, so ordinary segmentation criteria apply. Because the field refreshes nightly, a daily segment publish matches the data\'s actual cadence — using streaming machinery here would be over-engineering.',
    explanation_ja:
      '予測が DMO の項目として着地することの実務上の帰結がこれである。予測日は単なる属性なので、通常のセグメント条件がそのまま使える。項目は毎晩更新されるため、日次のセグメント公開がデータの実際の更新間隔と一致する。ここでストリーミングの仕組みを使うのは過剰設計になる。',
    reference:
      '💡 Match the publish cadence to the data\'s refresh cadence. Publishing faster than the data changes buys nothing.',
    reference_ja:
      '💡 公開間隔をデータの更新間隔に合わせる。データが変わるより速く公開しても何も得られない。',
  },
  {
    id: 'dc-app-28',
    domain: 'dc-activation',
    type: 'multi',
    question:
      'A consultant is reviewing an activation before go-live. Which two checks are most important? (Choose 2)',
    question_ja:
      'コンサルタントが本番稼働前にアクティベーションをレビューしている。最も重要な確認を2つ選べ。',
    options: [
      {
        text: 'That consent is filtered so opted-out individuals cannot be included',
        text_ja: 'オプトアウト済みの人が含まれないよう、同意で絞り込まれていること',
        correct: true,
        note: 'Correct. This is the control that must be structural rather than procedural.',
        note_ja: '正解。手順ではなく構造として担保すべき統制。',
      },
      {
        text: 'That only the attributes the destination actually needs are included',
        text_ja: '宛先が実際に必要とする属性だけが含まれていること',
        correct: true,
        note: 'Correct. This is where personal data leaves the platform, so minimisation applies most sharply.',
        note_ja: '正解。ここが個人データがプラットフォームを出る地点であり、最小化が最も強く効く。',
      },
      {
        text: 'That the segment contains as many members as possible to maximise reach',
        text_ja: 'リーチを最大化するため、セグメントにできるだけ多くのメンバーが含まれていること',
        correct: false,
        note: 'Reach is not a quality measure, and maximising it works against both consent and relevance.',
        note_ja: 'リーチは品質の指標ではないし、最大化は同意にも関連性にも反する。',
      },
      {
        text: 'That the activation runs more frequently than the segment publishes',
        text_ja: 'アクティベーションがセグメントの公開より頻繁に実行されること',
        correct: false,
        note: 'Not possible — activations run when the segment publishes, so publish frequency is the ceiling.',
        note_ja: '不可能。アクティベーションはセグメントの公開時に実行されるため、公開頻度が上限。',
      },
      {
        text: 'That all source DLOs have been given a custom DMO',
        text_ja: 'すべてのソース DLO にカスタム DMO が用意されていること',
        correct: false,
        note: 'An anti-pattern — one custom DMO per source recreates the fragmentation the platform removes.',
        note_ja: 'アンチパターン。ソースごとにカスタム DMO を作れば、プラットフォームが解消する分断を作り直す。',
      },
    ],
    explanation:
      'The two go-live checks that matter most are both about what leaves the platform and for whom. Consent must be filtered structurally so it holds regardless of who runs the activation, and the attribute list must be the minimum the destination needs. Note also that activation frequency is capped by segment publish frequency — it cannot exceed it.',
    explanation_ja:
      '本番稼働前に最も重要な2つの確認は、いずれも「何がプラットフォームを出るか」「誰に対してか」に関わるものである。同意は誰が実行しても効くよう構造として絞り込む必要があり、属性リストは宛先が必要とする最小限でなければならない。またアクティベーションの頻度はセグメントの公開頻度が上限であり、それを超えることはできない点にも注意する。',
    reference:
      '💡 Go-live checklist for an activation: consent filtered, attributes minimised, publish cadence matched to the need.',
    reference_ja:
      '💡 アクティベーションの稼働前チェック：同意で絞り込む、属性を最小化する、公開間隔を必要に合わせる。',
  },
]
