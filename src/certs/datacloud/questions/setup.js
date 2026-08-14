// 単元2：Setup and Administration（設定と管理・配点13%）
// 権限セット、データスペース、ガバナンスの設定への落とし込み、開発ライフサイクル、トラブルシューティング。
export const setupQuestions = [
  {
    id: 'dc-set-1',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'A user must create and manage segments and activations, but must not configure data streams or identity resolution. Which permission set fits?',
    question_ja:
      'あるユーザーはセグメントとアクティベーションの作成・管理を行う必要があるが、データストリームや ID解決の設定は行ってはならない。適切な権限セットはどれか。',
    options: [
      {
        text: 'Data Cloud Admin',
        text_ja: 'Data Cloud Admin',
        correct: false,
        note: 'Too broad. It grants full platform setup including data streams and identity resolution rulesets.',
        note_ja: '広すぎる。データストリームや ID解決ルールセットを含むセットアップ全般を許してしまう。',
      },
      {
        text: 'Data Cloud Marketing Manager',
        text_ja: 'Data Cloud Marketing Manager',
        correct: true,
        note: 'Correct. It covers creating and managing segments and activations without the underlying platform setup.',
        note_ja: '正解。基盤側のセットアップを伴わずに、セグメントとアクティベーションの作成・管理を担える。',
      },
      {
        text: 'Data Cloud User',
        text_ja: 'Data Cloud User',
        correct: false,
        note: 'Too narrow. It allows reading and exploring data but not creating segments and activations.',
        note_ja: '狭すぎる。データの参照と探索はできるが、セグメントとアクティベーションの作成はできない。',
      },
      {
        text: 'System Administrator profile',
        text_ja: 'システム管理者プロファイル',
        correct: false,
        note: 'Granting a full admin profile to solve a scoped access need is always the wrong answer.',
        note_ja: '限定的なアクセス要件を解決するために全権の管理者プロファイルを付与するのは常に誤答。',
      },
    ],
    explanation:
      'Data 360 access is granted with permission sets shaped around roles. Marketing Manager sits between the marketing-focused sets: broader than Marketing Specialist (who works within existing segments) but without the platform configuration that Admin and Marketing Admin carry. Always grant the narrowest set that covers the job.',
    explanation_ja:
      'Data 360 のアクセスは役割の形に沿った権限セットで付与する。Marketing Manager はマーケティング系の中間に位置し、既存セグメント内で作業する Marketing Specialist より広く、Admin や Marketing Admin が持つ基盤設定は含まない。常に職務に足りる最小の権限セットを付与する。',
    reference:
      '💡 Order of breadth: Marketing Specialist < Marketing Manager < Marketing Admin. Admin (Architect) covers platform setup.',
    reference_ja:
      '💡 広さの順：Marketing Specialist ＜ Marketing Manager ＜ Marketing Admin。Admin（Architect）は基盤のセットアップを担う。',
  },
  {
    id: 'dc-set-2',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'A holding company runs two retail brands from one Salesforce estate. Legal requires that the marketing team of Brand A must never be able to see or target Brand B customers, and that the two brands\' profiles must not be unified with each other.',
    scenario_ja:
      'ある持株会社が、1つの Salesforce 環境で2つの小売ブランドを運営している。法務は、ブランドAのマーケティングチームがブランドBの顧客を閲覧・ターゲティングできないこと、および両ブランドのプロファイルが互いに統合されないことを要求している。',
    question: 'What should the consultant implement?',
    question_ja: 'コンサルタントは何を実装すべきか。',
    options: [
      {
        text: 'Separate data spaces for each brand, with permission sets associated to the appropriate space',
        text_ja: 'ブランドごとに別のデータスペースを作り、適切なスペースに権限セットを関連付ける',
        correct: true,
        note: 'Correct. Data spaces partition the data, and identity resolution, segments and activations are scoped per space.',
        note_ja: '正解。データスペースがデータを区画化し、ID解決・セグメント・アクティベーションはスペース単位で閉じる。',
      },
      {
        text: 'A single data space with a brand field, and a filter on every segment',
        text_ja: '単一のデータスペースにブランド項目を持たせ、すべてのセグメントにフィルタをかける',
        correct: false,
        note: 'Relies on every builder remembering the filter, and it would not stop the two brands\' profiles unifying.',
        note_ja: 'すべての作成者がフィルタを忘れないことに依存するうえ、両ブランドのプロファイル統合を止められない。',
      },
      {
        text: 'Two separate Data 360 instances, one per brand',
        text_ja: 'ブランドごとに1つずつ、2つの独立した Data 360 インスタンス',
        correct: false,
        note: 'Disproportionate and expensive. Data spaces provide exactly this separation within one instance.',
        note_ja: '過剰かつ高コスト。データスペースが1つのインスタンス内でまさにこの分離を提供する。',
      },
      {
        text: 'Field-level security on the brand field for each marketing user',
        text_ja: '各マーケティングユーザーに対し、ブランド項目に項目レベルセキュリティを設定する',
        correct: false,
        note: 'Hiding a field does not hide the records, and it does not prevent cross-brand unification.',
        note_ja: '項目を隠してもレコードは隠れないし、ブランドをまたぐ統合も防げない。',
      },
    ],
    explanation:
      'This is the canonical data space scenario. Data spaces are logical partitions with their own data, their own identity resolution rulesets and their own segments and activations. Because unification is scoped to a space, putting the brands in separate spaces satisfies both requirements at once — visibility and non-unification — without relying on anyone to remember a filter.',
    explanation_ja:
      'これはデータスペースの代表的なシナリオである。データスペースは独自のデータ、独自の ID解決ルールセット、独自のセグメントとアクティベーションを持つ論理区画である。統合はスペース単位で閉じるため、ブランドを別スペースに置けば、可視範囲と非統合という2つの要件を同時に満たせる。しかも誰かがフィルタを覚えていることに依存しない。',
    reference:
      '💡 A control that depends on a person remembering is not a control. Prefer the design where the platform enforces it.',
    reference_ja:
      '💡 人が覚えていることに依存する統制は統制ではない。プラットフォームが強制する設計を選ぶ。',
  },
  {
    id: 'dc-set-3',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'Data from a data stream has not appeared in the DLO since yesterday. What should the consultant check first?',
    question_ja:
      'あるデータストリームのデータが昨日から DLO に現れていない。コンサルタントが最初に確認すべきものはどれか。',
    options: [
      {
        text: 'The identity resolution ruleset run history',
        text_ja: 'ID解決ルールセットの実行履歴',
        correct: false,
        note: 'Unification happens after the data lands. If the DLO is empty, the problem is upstream of resolution.',
        note_ja: '統合はデータ着地の後に起きる。DLO が空なら問題は解決処理より上流にある。',
      },
      {
        text: 'The data stream refresh history for run status, row counts and errors',
        text_ja: 'データストリームの更新履歴（実行ステータス・行数・エラー）',
        correct: true,
        note: 'Correct. When data is missing entirely, start where it should have entered and read the run result.',
        note_ja: '正解。データがまるごと無いときは、入ってくるはずの場所から始めて実行結果を読む。',
      },
      {
        text: 'The activation publish history',
        text_ja: 'アクティベーションの公開履歴',
        correct: false,
        note: 'That is the last stage of the pipeline; it cannot explain data that never arrived.',
        note_ja: 'それはパイプライン最後の段階であり、そもそも届いていないデータの説明にはならない。',
      },
      {
        text: 'The segment membership count',
        text_ja: 'セグメントのメンバー数',
        correct: false,
        note: 'A symptom, not a cause. It will be wrong, but it will not tell you why.',
        note_ja: '原因ではなく症状。おかしくはなっているが、なぜかは分からない。',
      },
    ],
    explanation:
      'Troubleshoot down the pipeline in order: did the data arrive, did it land in the right shape, did it map, did it unify, did it activate. The stage where the row count first goes wrong is the stage with the bug. When data is missing entirely, the data stream refresh history is the first and most informative place to look.',
    explanation_ja:
      'トラブルシューティングはパイプラインを順に下る。データは届いたか、正しい形で着地したか、マッピングされたか、統合されたか、アクティベートされたか。件数が最初におかしくなる段階に不具合がある。データがまるごと無い場合、データストリームの更新履歴が最初に見るべき、最も情報量の多い場所である。',
    reference:
      '💡 Confirm the row count at each stage. Diagnosing from the symptom end wastes time; diagnose from the source end.',
    reference_ja:
      '💡 各段階で行数を確認する。症状側から診断すると時間を浪費する。ソース側から診断する。',
  },
  {
    id: 'dc-set-4',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'A consultant needs to see which source records were merged into one unified profile, and why. Which tool should they use?',
    question_ja:
      'どのソースレコードが1つの統合プロファイルに結合されたのか、またその理由を確認したい。使うべきツールはどれか。',
    options: [
      {
        text: 'Data Explorer',
        text_ja: 'Data Explorer',
        correct: false,
        note: 'Data Explorer inspects records in a DLO or DMO, but does not show the resolution behind a unified profile.',
        note_ja: 'Data Explorer は DLO や DMO のレコードを確認するもので、統合プロファイルの解決過程は示さない。',
      },
      {
        text: 'Profile Explorer',
        text_ja: 'Profile Explorer',
        correct: true,
        note: 'Correct. Profile Explorer shows one unified individual together with the source records behind it.',
        note_ja: '正解。Profile Explorer は1つの統合プロファイルと、その元になったソースレコードを併せて表示する。',
      },
      {
        text: 'Data stream refresh history',
        text_ja: 'データストリームの更新履歴',
        correct: false,
        note: 'That reports ingestion runs, which is several stages before unification.',
        note_ja: 'それは取り込みの実行結果を示すもので、統合よりも数段階前の話。',
      },
      {
        text: 'Activation target configuration',
        text_ja: 'アクティベーションターゲットの設定',
        correct: false,
        note: 'The destination configuration says nothing about how profiles resolved.',
        note_ja: '宛先の設定は、プロファイルがどう解決されたかについて何も語らない。',
      },
    ],
    explanation:
      'Choose the diagnostic lens by the question you are asking. Data Explorer answers "did the data arrive and does it look right?". Profile Explorer answers "why did these two people merge, or why did they not?". Query Editor quantifies a problem you have already localised, and refresh history covers ingestion.',
    explanation_ja:
      '問いの内容で診断の手段を選ぶ。Data Explorer は「データは届いたか、見た目は正しいか」に答える。Profile Explorer は「なぜこの2人が結合したのか／なぜしなかったのか」に答える。クエリエディタは既に場所を絞り込んだ問題を定量化し、更新履歴は取り込みを担当する。',
    reference:
      '💡 Data Explorer = records. Profile Explorer = one person and their sources. Query Editor = SQL across objects.',
    reference_ja:
      '💡 Data Explorer＝レコード。Profile Explorer＝1人とそのソース。クエリエディタ＝オブジェクト横断の SQL。',
  },
  {
    id: 'dc-set-5',
    domain: 'dc-setup',
    type: 'mcq',
    question: 'What does a data kit package?',
    question_ja: 'Data Kit がパッケージ化するものは何か。',
    options: [
      {
        text: 'Data 360 metadata such as data streams, data model objects, mappings, calculated insights and segments',
        text_ja: 'データストリーム、データモデルオブジェクト、マッピング、Calculated Insight、セグメントといった Data 360 のメタデータ',
        correct: true,
        note: 'Correct. A data kit is the deployment unit for Data 360 configuration.',
        note_ja: '正解。Data Kit は Data 360 の設定をデプロイするための単位。',
      },
      {
        text: 'The ingested customer records themselves, for transfer to another org',
        text_ja: '取り込んだ顧客レコードそのもの（他組織への転送用）',
        correct: false,
        note: 'Data kits move configuration, not the ingested data.',
        note_ja: 'Data Kit が運ぶのは設定であり、取り込んだデータではない。',
      },
      {
        text: 'User permission set assignments',
        text_ja: 'ユーザーへの権限セット割り当て',
        correct: false,
        note: 'Assignments are managed in the Salesforce org, not packaged as a data kit.',
        note_ja: '割り当ては Salesforce 組織側で管理するもので、Data Kit としてパッケージ化はしない。',
      },
      {
        text: 'Credit consumption reports',
        text_ja: 'クレジット消費のレポート',
        correct: false,
        note: 'Usage reporting is not a packaging artefact.',
        note_ja: '使用量のレポートはパッケージ化の成果物ではない。',
      },
    ],
    explanation:
      'Data 360 configuration is metadata, so it moves between environments rather than being rebuilt by hand. A data kit is the packaging unit for that metadata. It carries configuration only — the ingested data stays where it is and is re-ingested in the target environment through its own streams.',
    explanation_ja:
      'Data 360 の設定はメタデータなので、手作業で作り直すのではなく環境間を移動する。Data Kit はそのメタデータのパッケージ単位である。運ぶのは設定だけで、取り込んだデータはその場に残り、移行先ではそれぞれのストリームで改めて取り込まれる。',
    reference:
      '💡 Whenever a packaging option exists, rebuilding by hand in production is the wrong answer — it is neither repeatable nor auditable.',
    reference_ja:
      '💡 パッケージング手段があるなら、本番で手作業で作り直すのは誤答。再現性も監査可能性もない。',
  },
  {
    id: 'dc-set-6',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'A team of business analysts needs to explore unified profiles and run SQL queries to validate data quality. They must not be able to change data streams, mappings or identity resolution rules.',
    scenario_ja:
      'あるビジネスアナリストのチームが、統合プロファイルを探索し、データ品質を検証するために SQL クエリを実行する必要がある。データストリーム、マッピング、ID解決ルールを変更できてはならない。',
    question: 'What is the correct approach?',
    question_ja: '正しい対応はどれか。',
    options: [
      {
        text: 'Assign a read and explore permission set such as Data Cloud User, scoped to the relevant data space',
        text_ja: '関連するデータスペースに紐づけた、Data Cloud User のような参照・探索用の権限セットを割り当てる',
        correct: true,
        note: 'Correct. It matches the job exactly: explore and query, without configuration rights.',
        note_ja: '正解。職務に正確に対応する。設定権限なしで探索とクエリができる。',
      },
      {
        text: 'Assign Data Cloud Admin and ask the analysts not to change anything',
        text_ja: 'Data Cloud Admin を割り当て、何も変更しないようアナリストに依頼する',
        correct: false,
        note: 'A policy request is not an access control. Over-provisioning is itself a governance failure.',
        note_ja: '依頼はアクセス制御ではない。過剰な権限付与そのものがガバナンス上の失敗。',
      },
      {
        text: 'Export the unified profiles to a spreadsheet for the analysts to review offline',
        text_ja: '統合プロファイルを表計算ファイルへエクスポートし、アナリストがオフラインで確認する',
        correct: false,
        note: 'Creates an ungoverned copy that immediately goes stale, and re-fragments the view you just unified.',
        note_ja: '統制されていないコピーを作り、それは即座に古くなり、せっかく統合したビューを再び分断する。',
      },
      {
        text: 'Create a separate data space for the analysts and copy the profiles into it',
        text_ja: 'アナリスト用に別のデータスペースを作り、プロファイルをそこへコピーする',
        correct: false,
        note: 'Data spaces separate visibility; they are not a workaround for permissions, and copying duplicates data and cost.',
        note_ja: 'データスペースは可視範囲を分けるもので、権限の回避策ではない。コピーはデータとコストを二重にする。',
      },
    ],
    explanation:
      'Permission sets decide what a user may do; data spaces decide which data they do it to. Here the requirement is purely about capability — explore and query, but do not configure — so the answer is the narrowest permission set that covers the job, associated with the data space the analysts should reach.',
    explanation_ja:
      '権限セットは「何をしてよいか」を、データスペースは「どのデータに対してか」を決める。ここでの要件は能力の話（探索とクエリはよいが設定は不可）に尽きるため、答えは職務に足りる最小の権限セットを、アナリストが到達すべきデータスペースに関連付けることである。',
    reference:
      '💡 Permission set = what you can do. Data space = which data you can do it to. Scenarios naming a role and a region need both.',
    reference_ja:
      '💡 権限セット＝できること。データスペース＝対象のデータ。役割と地域の両方が書かれたシナリオでは両方が必要。',
  },
  {
    id: 'dc-set-7',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'A segment built yesterday shows no members, although the underlying DLO clearly contains matching records. What is the most likely cause?',
    question_ja:
      '昨日作成したセグメントのメンバーが0件だが、元になる DLO には該当するレコードが明らかに存在する。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The DLO has not been mapped to a DMO, so the data is not available to segmentation',
        text_ja: 'DLO が DMO にマッピングされておらず、データがセグメンテーションから利用できない',
        correct: true,
        note: 'Correct. Segmentation runs on the data model, never on the raw DLO. Unmapped data is invisible downstream.',
        note_ja: '正解。セグメンテーションはデータモデルに対して実行され、生の DLO には対して実行されない。未マッピングのデータは下流から見えない。',
      },
      {
        text: 'The DLO contains too many rows for segmentation to process',
        text_ja: 'DLO の行数が多すぎてセグメンテーションが処理できない',
        correct: false,
        note: 'Volume does not silently produce a zero-member segment; the platform is built for large volumes.',
        note_ja: '量が原因で静かに0件になることはない。プラットフォームは大量データを前提に作られている。',
      },
      {
        text: 'Segments cannot be built on ingested data, only on manually entered data',
        text_ja: 'セグメントは取り込んだデータでは作成できず、手入力したデータでのみ作成できる',
        correct: false,
        note: 'Invented restriction. Ingested data is the normal basis for segmentation.',
        note_ja: '架空の制約。取り込んだデータこそセグメンテーションの通常の基礎。',
      },
      {
        text: 'The activation target has not been created yet',
        text_ja: 'アクティベーションターゲットがまだ作成されていない',
        correct: false,
        note: 'A missing target blocks activation, not segment membership. Membership is computed before any target is involved.',
        note_ja: 'ターゲットの未作成はアクティベーションを止めるが、セグメントのメンバー数には影響しない。メンバーはターゲットが関わる前に計算される。',
      },
    ],
    explanation:
      'Mapping is the gate between ingestion and everything else. Until a DLO is mapped to a DMO its data cannot be unified, segmented or activated, which produces exactly this symptom: records are visibly present in Data Explorer but the segment resolves to nobody.',
    explanation_ja:
      'マッピングは取り込みとそれ以外のすべての間にある関門である。DLO が DMO にマッピングされるまで、そのデータは統合もセグメント化もアクティベートもできない。その結果まさにこの症状が出る。Data Explorer では確かにレコードが見えるのに、セグメントは誰にも解決されない。',
    reference:
      '💡 "Data is there but nothing downstream sees it" is nearly always a mapping gap.',
    reference_ja:
      '💡 「データはあるのに下流から見えない」は、ほぼ常にマッピング漏れ。',
  },
  {
    id: 'dc-set-8',
    domain: 'dc-setup',
    type: 'multi',
    question:
      'Which two statements about data spaces are correct? (Choose 2)',
    question_ja: 'データスペースに関する記述として正しいものを2つ選べ。',
    options: [
      {
        text: 'Segments, activations and identity resolution are scoped to a data space',
        text_ja: 'セグメント、アクティベーション、ID解決はデータスペース単位で閉じる',
        correct: true,
        note: 'Correct. This scoping is why data spaces satisfy both visibility and non-unification requirements.',
        note_ja: '正解。このスコープの性質ゆえに、データスペースは可視範囲と非統合の両方の要件を満たせる。',
      },
      {
        text: 'A data stream can be made available to more than one data space, with filters',
        text_ja: 'データストリームはフィルタ付きで複数のデータスペースに提供できる',
        correct: true,
        note: 'Correct. A shared source such as a product catalogue does not have to be ingested twice.',
        note_ja: '正解。商品カタログのような共有ソースを二重に取り込む必要はない。',
      },
      {
        text: 'Every org must have exactly one data space',
        text_ja: 'すべての組織はデータスペースをちょうど1つ持たなければならない',
        correct: false,
        note: 'There is a default data space, and additional ones are created as needed.',
        note_ja: '既定のデータスペースがあり、必要に応じて追加できる。',
      },
      {
        text: 'Data spaces are the billing unit for Data 360 credits',
        text_ja: 'データスペースは Data 360 のクレジット課金の単位である',
        correct: false,
        note: 'Credits are consumed by activity — ingestion, processing, queries, activations — not per space.',
        note_ja: 'クレジットは活動（取り込み、処理、クエリ、アクティベーション）によって消費され、スペース単位ではない。',
      },
      {
        text: 'A segment in one data space can include profiles from another data space',
        text_ja: 'あるデータスペースのセグメントに、別のデータスペースのプロファイルを含められる',
        correct: false,
        note: 'Segments do not span data spaces — that would defeat the separation they exist to provide.',
        note_ja: 'セグメントはデータスペースをまたがない。またげるなら、分離という存在意義が失われる。',
      },
    ],
    explanation:
      'A data space is a logical partition with its own data, rulesets, segments and activations. The scoping is strict — nothing spans spaces — which is what makes them the right control for brand, region or business-unit separation. Sharing a source across spaces with filters avoids duplicating ingestion for genuinely common data.',
    explanation_ja:
      'データスペースは、独自のデータ・ルールセット・セグメント・アクティベーションを持つ論理区画である。スコープは厳格で、スペースをまたぐものはない。だからこそブランド・地域・事業部門の分離に適した統制手段になる。共通のソースはフィルタ付きでスペース間に共有でき、本当に共通なデータの取り込みを二重にせずに済む。',
    reference:
      '💡 Use data spaces for separation of visibility. Do not use them merely to organise objects — that is the data model\'s job.',
    reference_ja:
      '💡 可視範囲を分けるためにデータスペースを使う。単にオブジェクトを整理する目的では使わない。それはデータモデルの役割。',
  },
  {
    id: 'dc-set-9',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'A consultant has built and tested a set of data streams, mappings and calculated insights in a development environment. The client asks how these will reach production.',
    scenario_ja:
      'コンサルタントが開発環境でデータストリーム、マッピング、Calculated Insight を構築・テストした。顧客から、これらをどうやって本番へ持っていくのか尋ねられた。',
    question: 'What should the consultant describe?',
    question_ja: 'コンサルタントは何を説明すべきか。',
    options: [
      {
        text: 'Package the configuration in a data kit and deploy it to production',
        text_ja: '設定を Data Kit にパッケージ化し、本番へデプロイする',
        correct: true,
        note: 'Correct. Data kits are the packaging unit for Data 360 metadata, and the deployment is repeatable and auditable.',
        note_ja: '正解。Data Kit は Data 360 メタデータのパッケージ単位であり、デプロイは再現可能で監査もできる。',
      },
      {
        text: 'Recreate each object manually in production, following the development environment as a reference',
        text_ja: '開発環境を参照しながら、本番で各オブジェクトを手作業で作り直す',
        correct: false,
        note: 'Not repeatable, not auditable, and prone to drift between environments.',
        note_ja: '再現性も監査可能性もなく、環境間のずれを生みやすい。',
      },
      {
        text: 'Export the ingested data from development and import it into production',
        text_ja: '開発環境から取り込み済みデータをエクスポートし、本番へインポートする',
        correct: false,
        note: 'This moves data, not configuration. Production ingests its own data through its own streams.',
        note_ja: 'それは設定ではなくデータを移す行為。本番は自分のストリームで自分のデータを取り込む。',
      },
      {
        text: 'Connect production directly to the development data space so it can reuse the configuration',
        text_ja: '本番を開発用データスペースへ直接接続し、設定を再利用する',
        correct: false,
        note: 'Data spaces are partitions within an instance, not a mechanism for sharing configuration between environments.',
        note_ja: 'データスペースはインスタンス内の区画であり、環境間で設定を共有する仕組みではない。',
      },
    ],
    explanation:
      'The lifecycle discipline is the same as anywhere on the platform: build low, test, promote. Data kits carry Data 360 metadata — streams, DMOs, mappings, calculated insights, segments — between environments. They deliberately do not carry the ingested data, which each environment obtains through its own connected sources.',
    explanation_ja:
      'ライフサイクルの原則はプラットフォームの他の領域と同じである。下位環境で作り、テストし、昇格させる。Data Kit は Data 360 のメタデータ（ストリーム、DMO、マッピング、Calculated Insight、セグメント）を環境間で運ぶ。取り込んだデータは意図的に運ばない。各環境は自分が接続したソースから取得する。',
    reference:
      '💡 Configuration promotes; data does not. Each environment ingests its own data through its own connections.',
    reference_ja:
      '💡 昇格するのは設定であってデータではない。各環境は自分の接続で自分のデータを取り込む。',
  },
  {
    id: 'dc-set-10',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'After Data 360 is provisioned, users report they cannot see any Data 360 features. What is the most likely cause?',
    question_ja:
      'Data 360 のプロビジョニング後、ユーザーから Data 360 の機能が一切見えないと報告があった。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'No Data 360 permission sets have been assigned to those users',
        text_ja: 'それらのユーザーに Data 360 の権限セットが割り当てられていない',
        correct: true,
        note: 'Correct. Provisioning enables the platform; it does not grant anyone access. A Salesforce admin assigns the sets.',
        note_ja: '正解。プロビジョニングはプラットフォームを有効化するだけで、誰にもアクセス権を付与しない。割り当ては Salesforce の管理者が行う。',
      },
      {
        text: 'Provisioning has not finished and will complete automatically within 30 days',
        text_ja: 'プロビジョニングが完了しておらず、30日以内に自動的に完了する',
        correct: false,
        note: 'Invented waiting period. If provisioning were incomplete, the platform itself would not be available.',
        note_ja: '架空の待機期間。プロビジョニングが未完了なら、プラットフォーム自体が利用できない。',
      },
      {
        text: 'A data space must be created before any feature becomes visible',
        text_ja: 'いずれの機能も、データスペースを作成するまで表示されない',
        correct: false,
        note: 'A default data space already exists; visibility is a permissions matter.',
        note_ja: '既定のデータスペースは既に存在する。表示可否は権限の問題。',
      },
      {
        text: 'Data must be ingested before the Data 360 application appears',
        text_ja: 'Data 360 アプリケーションが表示されるには、先にデータを取り込む必要がある',
        correct: false,
        note: 'You need access to the platform in order to configure ingestion in the first place.',
        note_ja: 'そもそも取り込みを設定するためにプラットフォームへのアクセスが必要。',
      },
    ],
    explanation:
      'Provisioning and access are separate steps. Data 360 access is granted with permission sets, assigned by a Salesforce admin in the connected org — profiles alone do not grant it, and provisioning does not grant it automatically. This is a very common first-day support question.',
    explanation_ja:
      'プロビジョニングとアクセス付与は別の手順である。Data 360 のアクセスは権限セットで付与し、接続された組織の Salesforce 管理者が割り当てる。プロファイル単独では付与されず、プロビジョニングでも自動的には付与されない。導入初日に非常によく起きる問い合わせである。',
    reference:
      '💡 Provisioning ≠ access. Nothing in Data 360 is visible until a permission set is assigned.',
    reference_ja:
      '💡 プロビジョニング≠アクセス権。権限セットを割り当てるまで Data 360 の何も見えない。',
  },
  {
    id: 'dc-set-11',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'A privacy policy states "we keep customer web behaviour for 13 months only". How is this best implemented?',
    question_ja:
      'プライバシーポリシーに「顧客の Web 行動履歴は13か月のみ保持する」と定められている。最も適切な実装はどれか。',
    options: [
      {
        text: 'Set data retention on the relevant data lake object so older records are removed automatically',
        text_ja: '該当するデータレイクオブジェクトに保持期間を設定し、古いレコードが自動的に削除されるようにする',
        correct: true,
        note: 'Correct. Retention is a platform setting, so the policy enforces itself rather than depending on a recurring task.',
        note_ja: '正解。保持期間はプラットフォームの設定なので、定期作業に依存せずポリシーが自動的に効く。',
      },
      {
        text: 'Ask an administrator to delete old records manually each quarter',
        text_ja: '管理者に四半期ごとに古いレコードを手作業で削除してもらう',
        correct: false,
        note: 'A manual recurring task is not a control — it fails silently the first time someone is busy.',
        note_ja: '手作業の定期タスクは統制ではない。誰かが忙しかった時点で静かに破綻する。',
      },
      {
        text: 'Add a filter to every segment excluding data older than 13 months',
        text_ja: 'すべてのセグメントに、13か月より古いデータを除外するフィルタを追加する',
        correct: false,
        note: 'Filtering hides the data from segments but does not delete it, so the retention policy is still breached.',
        note_ja: 'フィルタはセグメントから見えなくするだけで削除はしない。保持ポリシー違反は解消されない。',
      },
      {
        text: 'Move records older than 13 months into a separate data space',
        text_ja: '13か月より古いレコードを別のデータスペースへ移す',
        correct: false,
        note: 'Moving is not deleting. The data is still retained, just somewhere else.',
        note_ja: '移動は削除ではない。データは場所を変えて保持されたまま。',
      },
    ],
    explanation:
      'Turning a policy sentence into a platform setting is exactly what this objective tests. Retention on the data lake object enforces the rule automatically. Note the distinction the wrong answers exploit: filtering and moving change visibility, while the policy demands the data actually stop existing.',
    explanation_ja:
      'ポリシーの一文をプラットフォームの設定に変換すること——この観点が試しているのはまさにそれである。データレイクオブジェクトへの保持期間設定がルールを自動的に強制する。誤答が突いている区別に注意すること。フィルタや移動は可視性を変えるだけだが、ポリシーが求めているのはデータが実際に存在しなくなることである。',
    reference:
      '💡 Policy → setting mapping: separation → data spaces, purpose → consent filters, retention → DLO retention, deletion request → consent/deletion APIs.',
    reference_ja:
      '💡 ポリシー→設定の対応：分離→データスペース、目的→同意フィルタ、保持期間→DLO の保持設定、削除申請→同意／削除 API。',
  },
  {
    id: 'dc-set-12',
    domain: 'dc-setup',
    type: 'scenario',
    scenario:
      'Marketing reports that a unified profile for a well-known customer does not exist, even though both her CRM contact record and her loyalty record were ingested and mapped successfully this morning.',
    scenario_ja:
      'マーケティング部門から、ある著名な顧客の統合プロファイルが存在しないと報告があった。ただし、その顧客の CRM コンタクトレコードとロイヤルティレコードは、いずれも今朝正常に取り込まれマッピングされている。',
    question: 'What is the most likely explanation?',
    question_ja: '最も可能性の高い説明はどれか。',
    options: [
      {
        text: 'The identity resolution ruleset has not run since the records were ingested',
        text_ja: 'レコードが取り込まれた後、ID解決ルールセットがまだ実行されていない',
        correct: true,
        note: 'Correct. Unification runs on a schedule, so freshly ingested records are not unified until the next run.',
        note_ja: '正解。統合はスケジュール実行なので、取り込んだばかりのレコードは次回実行まで統合されない。',
      },
      {
        text: 'Unified profiles are only created for customers with recent purchases',
        text_ja: '統合プロファイルは直近に購入のある顧客に対してのみ作成される',
        correct: false,
        note: 'Invented rule. Unification depends on match rules, not on purchase recency.',
        note_ja: '架空のルール。統合は一致ルールに依存するのであって、購入の新しさには依存しない。',
      },
      {
        text: 'A profile cannot be unified from only two source records',
        text_ja: '2件のソースレコードだけではプロファイルを統合できない',
        correct: false,
        note: 'Invented minimum. A unified profile can be formed from one or more source profiles.',
        note_ja: '架空の下限。統合プロファイルは1件以上のソースプロファイルから作られる。',
      },
      {
        text: 'The activation target must be configured before profiles unify',
        text_ja: 'プロファイルが統合される前にアクティベーションターゲットの設定が必要',
        correct: false,
        note: 'Activation is the last stage of the pipeline and has no bearing on unification.',
        note_ja: 'アクティベーションはパイプライン最後の段階であり、統合とは無関係。',
      },
    ],
    explanation:
      'Unification is not instantaneous. Identity resolution rulesets run on a schedule within a data space, so records ingested since the last run are not yet reflected. Before investigating match rules, check the ruleset run history — a large share of "missing unified profile" reports are simply timing.',
    explanation_ja:
      '統合は即時ではない。ID解決ルールセットはデータスペース内でスケジュール実行されるため、前回実行以降に取り込まれたレコードはまだ反映されていない。一致ルールを調べる前にルールセットの実行履歴を確認すること。「統合プロファイルが無い」という報告のかなりの割合は単なるタイミングの問題である。',
    reference:
      '💡 Before debugging match rules, confirm the ruleset actually ran after the data arrived.',
    reference_ja:
      '💡 一致ルールをデバッグする前に、データ到着後にルールセットが実際に実行されたかを確認する。',
  },
  {
    id: 'dc-set-13',
    domain: 'dc-setup',
    type: 'mcq',
    question:
      'Which statement about assigning Data 360 access is correct?',
    question_ja: 'Data 360 のアクセス付与に関する記述として正しいものはどれか。',
    options: [
      {
        text: 'Access is granted through permission sets, which can be associated with specific data spaces',
        text_ja: 'アクセスは権限セットで付与し、権限セットは特定のデータスペースに関連付けられる',
        correct: true,
        note: 'Correct. Permission set for capability, data space association for which partition they reach.',
        note_ja: '正解。権限セットが能力を、データスペースとの関連付けが到達できる区画を決める。',
      },
      {
        text: 'Access is granted by editing the user\'s profile only',
        text_ja: 'アクセスはユーザーのプロファイルを編集することだけで付与される',
        correct: false,
        note: 'Profiles alone do not grant Data 360 access; permission sets are the mechanism.',
        note_ja: 'プロファイル単独では Data 360 のアクセスは付与されない。仕組みは権限セット。',
      },
      {
        text: 'Every Data 360 user must be a System Administrator in the connected org',
        text_ja: 'すべての Data 360 ユーザーは、接続された組織でシステム管理者でなければならない',
        correct: false,
        note: 'Emphatically not. Granting admin to everyone is the opposite of the least-privilege principle the exam expects.',
        note_ja: '明確に違う。全員に管理者権限を与えるのは、試験が求める最小権限の原則の正反対。',
      },
      {
        text: 'Access is inherited automatically from the user\'s role hierarchy position',
        text_ja: 'アクセスはユーザーのロール階層上の位置から自動的に継承される',
        correct: false,
        note: 'The role hierarchy governs CRM record sharing, not Data 360 feature access.',
        note_ja: 'ロール階層は CRM のレコード共有を制御するもので、Data 360 の機能アクセスではない。',
      },
    ],
    explanation:
      'Two mechanisms combine. Permission sets determine what a user may do — configure the platform, build segments, or only explore. Associating a permission set with a data space determines which partition of data they may do it to. Scenarios that name both a role and a brand or region are asking you to use both.',
    explanation_ja:
      '2つの仕組みが組み合わさる。権限セットがユーザーの「できること」（基盤の設定、セグメントの作成、あるいは探索のみ）を決める。権限セットとデータスペースの関連付けが「どの区画のデータに対してか」を決める。役割とブランドや地域の両方が書かれたシナリオは、その両方を使わせている。',
    reference:
      '💡 Least privilege is the default answer. "Give them System Administrator" is never correct on this exam.',
    reference_ja:
      '💡 最小権限が既定の答え。この試験で「システム管理者を付ける」が正解になることはない。',
  },
]
