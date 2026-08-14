// 単元4：Harmonization and Unification（統合と名寄せ・配点17%）
// DLO→DMO のマッピング、ID解決の一致ルールと調整ルール、統合プロファイル。
export const unificationQuestions = [
  {
    id: 'dc-uni-1',
    domain: 'dc-unification',
    type: 'mcq',
    question: 'What is the difference between match rules and reconciliation rules?',
    question_ja: '一致ルールと調整ルールの違いは何か。',
    options: [
      {
        text: 'Match rules decide which records are the same person; reconciliation rules decide which conflicting value is shown',
        text_ja: '一致ルールはどのレコードが同一人物かを決め、調整ルールは衝突する値のうちどれを表示するかを決める',
        correct: true,
        note: 'Correct. Match runs first and answers "are these the same person?"; reconciliation runs second and picks the winning value.',
        note_ja: '正解。一致が先に動いて「同一人物か」に答え、調整が次に動いて採用する値を選ぶ。',
      },
      {
        text: 'Match rules run on DLOs; reconciliation rules run on DMOs',
        text_ja: '一致ルールは DLO に対して、調整ルールは DMO に対して実行される',
        correct: false,
        note: 'Both operate on mapped DMOs. Identity resolution never runs on raw DLOs.',
        note_ja: 'どちらもマッピング済みの DMO に対して動く。ID解決が生の DLO に対して動くことはない。',
      },
      {
        text: 'Match rules apply to individuals; reconciliation rules apply to accounts',
        text_ja: '一致ルールは個人に、調整ルールは取引先に適用される',
        correct: false,
        note: 'Invented split. Both rule types are part of the same ruleset and apply to the same resolution.',
        note_ja: '架空の区分。どちらのルール種別も同じルールセットの一部で、同じ解決処理に適用される。',
      },
      {
        text: 'Match rules are optional; reconciliation rules are mandatory',
        text_ja: '一致ルールは任意で、調整ルールは必須である',
        correct: false,
        note: 'The reverse of the dependency: without match rules there is nothing to reconcile.',
        note_ja: '依存関係が逆。一致ルールがなければ調整すべきものが存在しない。',
      },
    ],
    explanation:
      'An identity resolution ruleset is a pair of rule types applied in order. Match rules run first and determine which source records represent the same individual. Reconciliation rules run second and determine, among the merged records, which value appears on the unified profile. Questions are frequently designed so that a wrong answer is the right rule type applied to the wrong question.',
    explanation_ja:
      'ID解決ルールセットは、順番に適用される2種類のルールの組である。一致ルールが先に動き、どのソースレコードが同一人物を表すかを決める。調整ルールが次に動き、結合されたレコードのうちどの値を統合プロファイルに表示するかを決める。設問はしばしば「正しいルール種別を誤った問いに当てはめた」選択肢を誤答として用意する。',
    reference:
      '💡 Match = do these merge? Reconcile = which value wins? Keep the two questions strictly separate.',
    reference_ja:
      '💡 一致＝結合するか？ 調整＝どの値を採るか？ この2つの問いを厳密に分ける。',
  },
  {
    id: 'dc-uni-2',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'After running identity resolution, a company finds that a married couple living at the same address, sharing a surname, has been merged into a single unified profile. The current match rule matches on last name and postal code.',
    scenario_ja:
      'ID解決の実行後、同じ住所に住み姓を共有する夫婦が、1つの統合プロファイルに結合されていることが判明した。現在の一致ルールは姓と郵便番号で照合している。',
    question: 'What should the consultant do?',
    question_ja: 'コンサルタントは何をすべきか。',
    options: [
      {
        text: 'Tighten the rule by adding a discriminating criterion such as email or first name, or match on a party identifier instead',
        text_ja: 'メールや名などの識別力のある条件を追加してルールを厳しくする、または Party Identification で照合する',
        correct: true,
        note: 'Correct. This is over-matching; the fix is a stronger, more identifying rule.',
        note_ja: '正解。これは過剰一致。対処はより識別力の高いルールにすること。',
      },
      {
        text: 'Loosen the rule to fuzzy matching so more variation is tolerated',
        text_ja: 'より多くのばらつきを許容できるよう、あいまい一致に緩める',
        correct: false,
        note: 'The wrong direction. Loosening would merge even more people who are not the same person.',
        note_ja: '方向が逆。緩めれば同一人物でない人をさらに多く結合してしまう。',
      },
      {
        text: 'Delete one of the two source records',
        text_ja: '2件のソースレコードのうち一方を削除する',
        correct: false,
        note: 'Destroys real data about a real customer to work around a rule problem.',
        note_ja: 'ルールの問題を回避するために、実在する顧客の実データを破壊している。',
      },
      {
        text: 'Add a reconciliation rule to separate them',
        text_ja: '2人を分離する調整ルールを追加する',
        correct: false,
        note: 'Reconciliation picks values after merging; it cannot undo a merge decision made by match rules.',
        note_ja: '調整は結合後に値を選ぶもので、一致ルールが下した結合の判断を取り消せない。',
      },
    ],
    explanation:
      'Read the symptom and adjust in the correct direction. Two different people merged is over-matching, and the fix is to tighten: add a discriminating criterion, or stop matching on weak fields. Matching on surname and postal code alone is the textbook cause — it will merge families and housemates every time. Never match on a non-identifying field alone.',
    explanation_ja:
      '症状を読み、正しい方向に調整する。別人2人が結合されたのは過剰一致であり、対処は厳しくすること。識別力のある条件を追加するか、弱い項目での照合をやめる。姓と郵便番号だけでの照合は教科書的な原因であり、必ず家族や同居人を結合してしまう。識別性のない項目単独で照合してはならない。',
    reference:
      '💡 Over-matching → tighten. Under-matching → loosen or standardise. Reconciliation cannot fix either.',
    reference_ja:
      '💡 過剰一致→厳しくする。不足一致→緩めるか標準化する。調整ルールではどちらも直せない。',
  },
  {
    id: 'dc-uni-3',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'A retailer finds that the same customer appears as three separate unified profiles: one from CRM with "Robert Smith", one from e-commerce with "BOB SMITH " (trailing space, uppercase), and one from loyalty with "Bob  Smith" (double space). All three share the same email address, but the email is stored with different capitalisation in each system.',
    scenario_ja:
      'ある小売企業で、同一顧客が3つの別々の統合プロファイルとして現れている。CRM では「Robert Smith」、EC では「BOB SMITH 」（末尾に空白・大文字）、ロイヤルティでは「Bob  Smith」（二重空白）である。3件とも同じメールアドレスを共有しているが、システムごとに大文字小文字が異なる形で保持されている。',
    question: 'What is the most effective fix?',
    question_ja: '最も効果的な対処はどれか。',
    options: [
      {
        text: 'Normalise the data at ingest and use a normalised match on email',
        text_ja: '取り込み時にデータを正規化し、メールに対して正規化一致を使う',
        correct: true,
        note: 'Correct. Normalisation handles the casing and whitespace differences, and email is the strong identifying signal here.',
        note_ja: '正解。正規化が大文字小文字と空白の差を吸収し、この場面ではメールが強い識別シグナルになる。',
      },
      {
        text: 'Match on first name and last name using exact matching',
        text_ja: '名と姓に対して完全一致で照合する',
        correct: false,
        note: 'Exact matching is defeated by every one of the formatting differences described, and "Robert" vs "Bob" too.',
        note_ja: '完全一致は、記載されたどの書式差にも負ける。「Robert」対「Bob」にも対応できない。',
      },
      {
        text: 'Manually merge the three profiles in Profile Explorer',
        text_ja: 'Profile Explorer で3つのプロファイルを手動で結合する',
        correct: false,
        note: 'Fixes one customer once. The next run recreates the problem for every similar customer.',
        note_ja: '1人の顧客を1度だけ直すに過ぎない。次回実行時、同様のすべての顧客で同じ問題が再発する。',
      },
      {
        text: 'Ask the three source systems to standardise how they store names',
        text_ja: '3つのソースシステムに、氏名の保持形式を統一するよう依頼する',
        correct: false,
        note: 'Slow, often refused, and the sources serve other consumers. Transform in Data 360 instead.',
        note_ja: '遅く、断られることも多く、ソースは他の利用者も抱えている。代わりに Data 360 側で変換する。',
      },
    ],
    explanation:
      'This is under-matching caused by data quality. Normalised matching handles case, punctuation and spacing differences before comparing, and normalising at ingest improves every rule that runs afterwards. Note also that "Robert" and "Bob" would defeat exact name matching entirely, which is why the shared email is the better signal to build the rule on.',
    explanation_ja:
      'これはデータ品質に起因する不足一致である。正規化一致は比較前に大文字小文字・記号・空白の差を吸収し、取り込み時の正規化は、その後に走るすべてのルールの成績を改善する。また「Robert」と「Bob」は完全一致では到底照合できない。共通のメールをルールの土台にする方が優れたシグナルなのはそのためである。',
    reference:
      '💡 A manual merge fixes one row. A rule or a transform fixes the class of problem. The exam always prefers the latter.',
    reference_ja:
      '💡 手動結合は1行を直すだけ。ルールや変換は問題の種類そのものを直す。試験は常に後者を選ぶ。',
  },
  {
    id: 'dc-uni-4',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'The ERP is the authoritative system for billing addresses. Which reconciliation rule should be used for the billing address attribute?',
    question_ja:
      '請求先住所については ERP が正となるシステムである。請求先住所の属性にはどの調整ルールを使うべきか。',
    options: [
      {
        text: 'Most Recent',
        text_ja: 'Most Recent（最新）',
        correct: false,
        note: 'Recency would let a stale update in another system override the authoritative source.',
        note_ja: '最新性を採ると、他システムの更新が正となるソースを上書きしてしまう。',
      },
      {
        text: 'Source Priority',
        text_ja: 'Source Priority（ソース優先度）',
        correct: true,
        note: 'Correct. When a scenario names an authoritative system of record, source priority is the rule.',
        note_ja: '正解。シナリオが正となるシステムを名指ししているときは、ソース優先度が答え。',
      },
      {
        text: 'Most Frequent',
        text_ja: 'Most Frequent（最頻）',
        correct: false,
        note: 'Frequency would let several less-trusted systems outvote the authoritative one.',
        note_ja: '頻度を採ると、信頼度の低い複数のシステムが正となるシステムを多数決で押し切ってしまう。',
      },
      {
        text: 'A match rule on the address field',
        text_ja: '住所項目に対する一致ルール',
        correct: false,
        note: 'Match rules decide merging, not which value is displayed. Wrong rule type for the question.',
        note_ja: '一致ルールが決めるのは結合であって表示する値ではない。この問いに対してルール種別が誤り。',
      },
    ],
    explanation:
      'The three reconciliation strategies map to three different scenario cues. "The ERP is the system of record" names an authority, which is source priority. "Take whatever was updated last" is recency. "One system is occasionally wrong, trust the consensus" is frequency. Reading which cue the scenario gives is the whole task.',
    explanation_ja:
      '3つの調整方式は、シナリオ中の3種類の手がかりに対応する。「ERP が正である」は権威を名指ししており、ソース優先度。「最後に更新されたものを採る」は最新性。「あるシステムが時々誤るので多数派を信じる」は最頻。シナリオがどの手がかりを与えているかを読むことが課題のすべてである。',
    reference:
      '💡 "System of record" / "authoritative" / "source of truth" → Source Priority. Not recency, not frequency.',
    reference_ja:
      '💡 「記録システム」「正となる」「信頼できる出所」→ソース優先度。最新性でも最頻でもない。',
  },
  {
    id: 'dc-uni-5',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'Why are contact points (email, phone, address) modelled as separate DMOs rather than fields on Individual?',
    question_ja:
      'Contact Point（メール、電話、住所）が Individual の項目ではなく別々の DMO としてモデル化されているのはなぜか。',
    options: [
      {
        text: 'Because one individual can hold several of each, and each carries its own consent state',
        text_ja: '1人が各種類を複数持ち得て、それぞれが固有の同意状態を伴うため',
        correct: true,
        note: 'Correct. Someone may consent by email but not by SMS, which requires consent to live with the contact point.',
        note_ja: '正解。メールには同意しても SMS には同意しないことがあり、同意が Contact Point に紐づく必要がある。',
      },
      {
        text: 'To reduce the storage cost of the Individual object',
        text_ja: 'Individual オブジェクトの保管コストを削減するため',
        correct: false,
        note: 'Storage is not the reason; the model is shaped by cardinality and consent, not by size.',
        note_ja: '理由は保管容量ではない。モデルの形を決めているのは多重度と同意であって、サイズではない。',
      },
      {
        text: 'Because identity resolution cannot read fields on Individual',
        text_ja: 'ID解決が Individual の項目を読めないため',
        correct: false,
        note: 'Identity resolution reads Individual attributes routinely; that is not a limitation.',
        note_ja: 'ID解決は Individual の属性を通常どおり読む。そのような制約はない。',
      },
      {
        text: 'To allow contact points to be reconciled down to a single value per person',
        text_ja: 'Contact Point を1人あたり単一の値に調整できるようにするため',
        correct: false,
        note: 'The opposite: contact points are deliberately not collapsed to one. A person legitimately keeps several.',
        note_ja: '逆である。Contact Point は意図的に1つに畳まれない。1人が複数持つのは正当。',
      },
    ],
    explanation:
      'The separation is deliberate and has direct consequences for activation. A unified individual can have many emails, phones and addresses, and consent attaches to the contact point rather than to the person as a whole. Reconciliation does not collapse contact points to a single value — that would destroy exactly the information activation needs.',
    explanation_ja:
      'この分離は意図的で、アクティベーションに直接影響する。統合プロファイルは複数のメール・電話・住所を持ち得て、同意は人全体ではなく Contact Point に紐づく。調整ルールが Contact Point を単一の値に畳むことはない。それをすれば、アクティベーションが必要とする情報そのものが失われる。',
    reference:
      '💡 Consent lives with the contact point. Someone can be reachable by email and opted out of SMS at the same time.',
    reference_ja:
      '💡 同意は Contact Point に紐づく。メールでは到達可能でありながら SMS はオプトアウト、という状態があり得る。',
  },
  {
    id: 'dc-uni-6',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'Which DMO typically holds source system identifiers such as a loyalty number or a CRM record id?',
    question_ja:
      'ロイヤルティ番号や CRM のレコード ID といった、ソースシステムの識別子を通常保持する DMO はどれか。',
    options: [
      {
        text: 'Party Identification',
        text_ja: 'Party Identification',
        correct: true,
        note: 'Correct. It stores source identifiers and is a strong, reliable signal in match rules.',
        note_ja: '正解。ソース側の識別子を保持し、一致ルールにおいて強く信頼できるシグナルになる。',
      },
      {
        text: 'Contact Point Email',
        text_ja: 'Contact Point Email',
        correct: false,
        note: 'That holds email addresses and their consent state, not system identifiers.',
        note_ja: 'それが保持するのはメールアドレスとその同意状態であって、システムの識別子ではない。',
      },
      {
        text: 'Sales Order',
        text_ja: 'Sales Order',
        correct: false,
        note: 'Transactional data about purchases, not identity attributes.',
        note_ja: '購買に関するトランザクションデータであり、ID の属性ではない。',
      },
      {
        text: 'Data Lake Object',
        text_ja: 'Data Lake Object',
        correct: false,
        note: 'A DLO is the raw ingested shape, not a DMO in the Customer 360 data model.',
        note_ja: 'DLO は取り込んだ生の形であり、Customer 360 データモデル上の DMO ではない。',
      },
    ],
    explanation:
      'Party Identification is the standard DMO for identifiers issued by source systems. Matching on a party identifier is the most reliable approach available, because a loyalty number or a system record id identifies a specific person by design — unlike a name or a postal code, which merely describe them.',
    explanation_ja:
      'Party Identification は、ソースシステムが発行した識別子のための標準 DMO である。Party Identification による照合は利用できる中で最も信頼できる方法である。ロイヤルティ番号やシステムのレコード ID は、設計上ある特定の人物を識別するものだからである。氏名や郵便番号のように、単にその人を描写するだけのものとは異なる。',
    reference:
      '💡 Strength of matching signals, best first: party identifier > email > phone > name + address components.',
    reference_ja:
      '💡 照合シグナルの強さ（強い順）：Party Identification ＞ メール ＞ 電話 ＞ 氏名＋住所の要素。',
  },
  {
    id: 'dc-uni-7',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'A newly ingested DLO does not appear as an option when building a segment. What is the most likely cause?',
    question_ja:
      '新たに取り込んだ DLO が、セグメント作成時の選択肢に現れない。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The DLO has not been mapped to a DMO',
        text_ja: 'DLO が DMO にマッピングされていない',
        correct: true,
        note: 'Correct. Segmentation operates on the data model; unmapped DLOs are invisible to it.',
        note_ja: '正解。セグメンテーションはデータモデルに対して動く。未マッピングの DLO はそこから見えない。',
      },
      {
        text: 'Segments can only be built on Engagement category data',
        text_ja: 'セグメントは Engagement カテゴリのデータでのみ作成できる',
        correct: false,
        note: 'Segments are normally built on the Unified Individual, which comes from Profile data.',
        note_ja: 'セグメントは通常 Unified Individual の上に作られ、それは Profile データから生まれる。',
      },
      {
        text: 'The DLO needs at least 1,000 records before it becomes available',
        text_ja: '利用可能になるには DLO に最低1,000件のレコードが必要',
        correct: false,
        note: 'Invented threshold. Availability depends on mapping, not on row count.',
        note_ja: '架空のしきい値。利用可否はマッピングの有無で決まり、行数では決まらない。',
      },
      {
        text: 'An activation target must exist before segmentation is possible',
        text_ja: 'セグメンテーションを行うにはアクティベーションターゲットが先に必要',
        correct: false,
        note: 'Targets are needed for activation, which happens after a segment exists.',
        note_ja: 'ターゲットが必要なのはアクティベーションであり、それはセグメントが存在した後の話。',
      },
    ],
    explanation:
      'Mapping is the gate between ingestion and everything downstream. A DLO holds raw data with the source\'s own field names; until it is mapped to a DMO in the Customer 360 data model, identity resolution, insights, segmentation and activation cannot see it. "The data is there but nothing downstream can use it" is nearly always a mapping gap.',
    explanation_ja:
      'マッピングは取り込みと下流のすべての間にある関門である。DLO はソース側の項目名のままの生データを保持しており、Customer 360 データモデルの DMO にマッピングされるまで、ID解決・インサイト・セグメンテーション・アクティベーションからは見えない。「データはあるのに下流で使えない」は、ほぼ常にマッピング漏れである。',
    reference:
      '💡 Order of operations: ingest → map → resolve → segment. Skipping the map step breaks everything after it.',
    reference_ja:
      '💡 処理の順序：取り込み→マッピング→解決→セグメント。マッピングを飛ばすと、その後のすべてが壊れる。',
  },
  {
    id: 'dc-uni-8',
    domain: 'dc-unification',
    type: 'multi',
    question:
      'Which two actions are appropriate when the same person appears as multiple unified profiles? (Choose 2)',
    question_ja:
      '同一人物が複数の統合プロファイルとして現れる場合に適切な対応を2つ選べ。',
    options: [
      {
        text: 'Standardise the data formats at ingest so existing rules can match successfully',
        text_ja: '既存のルールが一致できるよう、取り込み時にデータ形式を標準化する',
        correct: true,
        note: 'Correct. Under-matching is often a data quality problem, and fixing it improves every rule at once.',
        note_ja: '正解。不足一致はしばしばデータ品質の問題であり、それを直せばすべてのルールが同時に改善する。',
      },
      {
        text: 'Add a match rule using a stronger identifier, such as a party identifier or email',
        text_ja: 'Party Identification やメールなど、より強い識別子を使う一致ルールを追加する',
        correct: true,
        note: 'Correct. Adding an identifying signal is the direct fix for under-matching.',
        note_ja: '正解。識別力のあるシグナルを追加することが不足一致への直接の対処。',
      },
      {
        text: 'Tighten the existing match rules by adding more required criteria',
        text_ja: '必須条件を追加して既存の一致ルールを厳しくする',
        correct: false,
        note: 'The wrong direction. Tightening makes under-matching worse, producing even more separate profiles.',
        note_ja: '方向が逆。厳しくすれば不足一致は悪化し、別々のプロファイルがさらに増える。',
      },
      {
        text: 'Delete the duplicate profiles from the unified individual DMO',
        text_ja: 'Unified Individual DMO から重複したプロファイルを削除する',
        correct: false,
        note: 'Unified profiles are generated output. Deleting them does not change the rules, so the next run recreates them.',
        note_ja: '統合プロファイルは生成された出力。削除してもルールは変わらないので、次回実行で再び作られる。',
      },
      {
        text: 'Change the reconciliation rules to Most Recent',
        text_ja: '調整ルールを Most Recent に変更する',
        correct: false,
        note: 'Reconciliation picks values within a merged profile; it cannot cause records to merge.',
        note_ja: '調整は結合済みプロファイル内で値を選ぶもので、レコードを結合させることはできない。',
      },
    ],
    explanation:
      'One person as several profiles is under-matching, and there are two productive responses: improve the data so the existing rules can match, or add a rule on a stronger identifying signal. Tightening moves in the wrong direction, reconciliation rules are the wrong rule type entirely, and deleting generated output is futile because the next run recreates it.',
    explanation_ja:
      '1人が複数プロファイルになるのは不足一致であり、有効な対応は2つある。既存ルールが一致できるようデータを改善するか、より強い識別シグナルに基づくルールを追加するかである。厳しくするのは方向が逆、調整ルールはそもそもルール種別が違い、生成された出力の削除は次回実行で作り直されるため無意味である。',
    reference:
      '💡 Unified profiles are derived output, never a place to edit by hand. Change the rules, then let the ruleset re-resolve.',
    reference_ja:
      '💡 統合プロファイルは導出された出力であり、手で編集する場所ではない。ルールを変え、ルールセットに再解決させる。',
  },
  {
    id: 'dc-uni-9',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'A consultant wants to review the effect of a new match rule before applying it broadly. What is possible?',
    question_ja:
      'コンサルタントが、新しい一致ルールを広く適用する前にその効果を確認したい。何が可能か。',
    options: [
      {
        text: 'Run the ruleset against a sample to review results before committing',
        text_ja: '本適用の前に、サンプルに対してルールセットを実行し結果を確認する',
        correct: true,
        note: 'Correct. Previewing on a sample is the governed way to validate a rule change.',
        note_ja: '正解。サンプルでの事前確認が、ルール変更を検証する統制された方法。',
      },
      {
        text: 'Nothing — match rules can only be evaluated after a full production run',
        text_ja: '何もできない。一致ルールは本番の完全実行後にしか評価できない',
        correct: false,
        note: 'This would make ruleset changes recklessly risky, which is why sampling exists.',
        note_ja: 'それではルールセットの変更が無謀に危険になる。だからこそサンプル実行がある。',
      },
      {
        text: 'Match rules apply instantly and cannot be changed once saved',
        text_ja: '一致ルールは即座に適用され、保存後は変更できない',
        correct: false,
        note: 'Rules can be changed; resolution is scheduled, not instant.',
        note_ja: 'ルールは変更できる。解決処理は即時ではなくスケジュール実行。',
      },
      {
        text: 'Only Salesforce Support can preview identity resolution results',
        text_ja: 'ID解決の結果を事前確認できるのは Salesforce サポートだけである',
        correct: false,
        note: 'This is a standard administrative capability, not a support request.',
        note_ja: 'これは標準の管理機能であり、サポートへの依頼事項ではない。',
      },
    ],
    explanation:
      'Changing match rules re-resolves the profiles, which can merge or split existing unified individuals — a change with wide blast radius. Running the ruleset against a sample first lets you review the effect before committing, and treating ruleset changes as governed changes rather than quick edits is the behaviour the exam expects.',
    explanation_ja:
      '一致ルールを変更するとプロファイルが再解決され、既存の統合プロファイルが結合したり分割したりする。影響範囲の広い変更である。先にサンプルに対してルールセットを実行すれば、本適用の前に効果を確認できる。ルールセットの変更を軽い編集ではなく統制された変更として扱うことが、試験が期待する振る舞いである。',
    reference:
      '💡 A ruleset change is not a quick edit. It can split a profile a segment already depends on.',
    reference_ja:
      '💡 ルールセットの変更は軽い編集ではない。既にセグメントが依存しているプロファイルを分割し得る。',
  },
  {
    id: 'dc-uni-10',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'A company has ingested and mapped customer data from three systems. They now want to segment on unified customers, but every segment returns the source record count rather than a deduplicated person count.',
    scenario_ja:
      'ある企業が3つのシステムから顧客データを取り込み、マッピングを完了した。統合済みの顧客でセグメントを作りたいが、どのセグメントも重複排除された人数ではなくソースレコード件数を返してしまう。',
    question: 'What is the most likely cause?',
    question_ja: '最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The segment is built on a source DMO rather than on the Unified Individual',
        text_ja: 'セグメントが Unified Individual ではなくソース側の DMO の上に作られている',
        correct: true,
        note: 'Correct. Deduplicated counts require segmenting on the unified profile, which is the output of resolution.',
        note_ja: '正解。重複排除された件数を得るには、解決処理の出力である統合プロファイルの上でセグメントを作る必要がある。',
      },
      {
        text: 'The data streams use full refresh instead of upsert',
        text_ja: 'データストリームが upsert ではなく full refresh を使っている',
        correct: false,
        note: 'Refresh mode governs how rows are updated or removed, not whether people are deduplicated.',
        note_ja: '更新モードは行の更新や削除の扱いを決めるもので、人物の重複排除とは無関係。',
      },
      {
        text: 'Segments always report source record counts and cannot show unique people',
        text_ja: 'セグメントは常にソースレコード件数を報告し、ユニークな人数は表示できない',
        correct: false,
        note: 'Deduplicated targeting is the core purpose of the platform; of course it can.',
        note_ja: '重複排除されたターゲティングはこのプラットフォームの中核目的。当然できる。',
      },
      {
        text: 'The reconciliation rules have not been configured',
        text_ja: '調整ルールが設定されていない',
        correct: false,
        note: 'Reconciliation affects which values display on a profile, not how many profiles a segment counts.',
        note_ja: '調整はプロファイルに表示される値に影響するもので、セグメントが数えるプロファイル数には影響しない。',
      },
    ],
    explanation:
      'Segments are built on a chosen DMO, and the base you choose determines what you count. Building on a source DMO counts source rows, so the same person is counted once per system. Building on the Unified Individual — the output of identity resolution — counts people, which is the entire point of unifying them first.',
    explanation_ja:
      'セグメントは選んだ DMO の上に作られ、その基点が「何を数えるか」を決める。ソース側の DMO に作れば数えるのはソースの行であり、同一人物がシステムごとに1回ずつ数えられる。ID解決の出力である Unified Individual に作れば数えるのは人であり、そもそも先に統合した目的はそこにある。',
    reference:
      '💡 Ask what the segment base is. Counting rows instead of people is the classic sign of segmenting on the wrong DMO.',
    reference_ja:
      '💡 セグメントの基点が何かを確認する。人ではなく行を数えているのは、誤った DMO でセグメントを作った典型的な兆候。',
  },
  {
    id: 'dc-uni-11',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'Which statement about custom DMOs is most accurate?',
    question_ja: 'カスタム DMO に関する記述として最も正確なものはどれか。',
    options: [
      {
        text: 'They exist for data the standard model does not cover, but standard DMOs should be preferred where they fit',
        text_ja: '標準モデルで扱えないデータのために存在するが、当てはまる場合は標準 DMO を優先すべきである',
        correct: true,
        note: 'Correct. Standard DMOs are what packaged features and the rest of the platform expect.',
        note_ja: '正解。標準 DMO こそ、パッケージ機能やプラットフォームの他の部分が前提としているもの。',
      },
      {
        text: 'Custom DMOs should be created for every source system to keep data separated',
        text_ja: 'データを分離しておくため、ソースシステムごとにカスタム DMO を作成すべきである',
        correct: false,
        note: 'That defeats harmonisation entirely — the point is that every source speaks the same language.',
        note_ja: 'それでは調和の意味が完全に失われる。どのソースも同じ言葉を話すようにするのが目的。',
      },
      {
        text: 'Custom DMOs cannot be used in segmentation',
        text_ja: 'カスタム DMO はセグメンテーションに使用できない',
        correct: false,
        note: 'They can be mapped and used like standard DMOs.',
        note_ja: '標準 DMO と同様にマッピングして使える。',
      },
      {
        text: 'Custom DMOs are required whenever data comes from a non-Salesforce source',
        text_ja: 'Salesforce 以外のソースから来たデータには常にカスタム DMO が必要である',
        correct: false,
        note: 'Source origin is irrelevant. Non-Salesforce data maps to standard DMOs routinely.',
        note_ja: 'ソースの出自は無関係。非 Salesforce のデータも通常どおり標準 DMO にマッピングする。',
      },
    ],
    explanation:
      'Harmonisation means every source lands in the same canonical shape. Standard DMOs are what the rest of the platform, and its packaged features, expect to find. Custom DMOs are a legitimate escape hatch for data the standard model genuinely does not cover, but creating one per source system recreates the fragmentation the platform exists to remove.',
    explanation_ja:
      '調和とは、どのソースも同じ正規の形に着地させることである。標準 DMO こそ、プラットフォームの他の部分とそのパッケージ機能が前提とするものである。標準モデルが本当に扱えないデータに対してカスタム DMO を使うのは正当だが、ソースシステムごとに1つ作れば、このプラットフォームが解消するために存在する分断を作り直すことになる。',
    reference:
      '💡 One custom DMO per source system is an anti-pattern. It is a data lake with extra steps, not a data model.',
    reference_ja:
      '💡 ソースシステムごとに1つカスタム DMO を作るのはアンチパターン。手間の増えたデータレイクであって、データモデルではない。',
  },
  {
    id: 'dc-uni-12',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'When does identity resolution run?',
    question_ja: 'ID解決はいつ実行されるか。',
    options: [
      {
        text: 'On a schedule configured for the ruleset within its data space',
        text_ja: 'データスペース内でルールセットに設定されたスケジュールに従って',
        correct: true,
        note: 'Correct. Unification is scheduled, which is why freshly ingested records are not immediately unified.',
        note_ja: '正解。統合はスケジュール実行であり、だからこそ取り込んだばかりのレコードはすぐには統合されない。',
      },
      {
        text: 'Immediately as each record is ingested',
        text_ja: '各レコードが取り込まれた瞬間に即座に',
        correct: false,
        note: 'A common misconception, and the source of many "the profile is missing" support cases.',
        note_ja: 'よくある誤解であり、「プロファイルが無い」という問い合わせの多くの原因。',
      },
      {
        text: 'Only when a segment referencing the profile is published',
        text_ja: 'そのプロファイルを参照するセグメントが公開されたときのみ',
        correct: false,
        note: 'Segment publishing recalculates membership; it does not trigger identity resolution.',
        note_ja: 'セグメントの公開はメンバーシップを再計算するもので、ID解決を起動しない。',
      },
      {
        text: 'Once, when the ruleset is first created, and never again',
        text_ja: 'ルールセットを最初に作成したときの1回だけで、以後は実行されない',
        correct: false,
        note: 'It runs repeatedly to incorporate newly ingested data.',
        note_ja: '新しく取り込まれたデータを取り込むため、繰り返し実行される。',
      },
    ],
    explanation:
      'Identity resolution rulesets are scoped to a data space and run on a schedule. This has a practical consequence that appears repeatedly in troubleshooting questions: a record ingested after the last run is not yet part of any unified profile. Before investigating match rules, always confirm the ruleset actually ran after the data arrived.',
    explanation_ja:
      'ID解決ルールセットはデータスペース単位で、スケジュールに従って実行される。これはトラブルシューティングの設問に繰り返し現れる実務上の帰結を持つ。前回実行の後に取り込まれたレコードは、まだどの統合プロファイルにも含まれていない。一致ルールを調べる前に、データ到着後にルールセットが実際に実行されたかを必ず確認すること。',
    reference:
      '💡 Ingestion, resolution and segment publishing are three independent schedules. Freshness is bounded by the slowest one.',
    reference_ja:
      '💡 取り込み・解決・セグメント公開は3つの独立したスケジュール。鮮度は最も遅いものが上限になる。',
  },
  {
    id: 'dc-uni-13',
    domain: 'dc-unification',
    type: 'scenario',
    scenario:
      'A B2B company wants to unify contacts across systems and also relate them correctly to their employing companies, which appear under slightly different names in each system ("Acme Corp", "ACME Corporation", "Acme Corp.").',
    scenario_ja:
      'ある BtoB 企業が、システム横断でコンタクトを統合するとともに、勤務先企業へ正しく関連付けたいと考えている。企業名はシステムごとに微妙に異なる表記（「Acme Corp」「ACME Corporation」「Acme Corp.」）で存在している。',
    question: 'What should the consultant address?',
    question_ja: 'コンサルタントは何に対処すべきか。',
    options: [
      {
        text: 'Standardise the company name data and configure matching for accounts as well as individuals',
        text_ja: '企業名データを標準化し、個人だけでなく取引先についても照合を設定する',
        correct: true,
        note: 'Correct. B2B unification requires resolving both the person and the organisation they belong to.',
        note_ja: '正解。BtoB の統合では、人物とその所属組織の両方を解決する必要がある。',
      },
      {
        text: 'Ignore company names, since only individual unification matters',
        text_ja: '個人の統合だけが重要なので、企業名は無視する',
        correct: false,
        note: 'In B2B, the account relationship is central to how the customer is understood and targeted.',
        note_ja: 'BtoB では、顧客をどう理解しターゲティングするかにおいて取引先との関係が中心。',
      },
      {
        text: 'Create a separate data space for each company name variant',
        text_ja: '企業名の表記ゆれごとに別のデータスペースを作成する',
        correct: false,
        note: 'Data spaces separate visibility between business units; they are not a deduplication mechanism.',
        note_ja: 'データスペースは事業単位間の可視範囲を分けるもので、重複排除の仕組みではない。',
      },
      {
        text: 'Use reconciliation rules to merge the company name variants',
        text_ja: '調整ルールを使って企業名の表記ゆれを結合する',
        correct: false,
        note: 'Reconciliation picks a value after merging; deciding that the variants are one company is a matching job.',
        note_ja: '調整は結合後に値を選ぶもの。表記ゆれが同一企業だと判断するのは一致ルールの仕事。',
      },
    ],
    explanation:
      'The same match-versus-reconcile distinction applies to organisations. Deciding that "Acme Corp" and "ACME Corporation" are the same company is a matching decision; choosing which spelling to display afterwards is reconciliation. And as with individuals, standardising the data before matching improves the outcome more reliably than loosening the rules.',
    explanation_ja:
      '一致と調整の区別は組織に対しても同じように当てはまる。「Acme Corp」と「ACME Corporation」が同一企業だと判断するのは一致の判断であり、その後どの表記を表示するかを選ぶのが調整である。また個人の場合と同様、照合前にデータを標準化する方が、ルールを緩めるより確実に結果を改善する。',
    reference:
      '💡 The match/reconcile split is not specific to people. Apply the same reasoning to accounts and other entities.',
    reference_ja:
      '💡 一致と調整の分担は人に固有のものではない。取引先など他のエンティティにも同じ考え方を適用する。',
  },
  {
    id: 'dc-uni-14',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'What is the relationship between a unified profile and the source profiles that formed it?',
    question_ja: '統合プロファイルと、それを構成したソースプロファイルの関係はどうなっているか。',
    options: [
      {
        text: 'The unified profile links back to its source profiles, which remain available',
        text_ja: '統合プロファイルはソースプロファイルへリンクし、ソース側は引き続き参照できる',
        correct: true,
        note: 'Correct. Traceability is why Profile Explorer can show you why two records merged.',
        note_ja: '正解。この追跡可能性があるからこそ、Profile Explorer は2件が結合した理由を示せる。',
      },
      {
        text: 'The source profiles are deleted once unification completes',
        text_ja: '統合が完了するとソースプロファイルは削除される',
        correct: false,
        note: 'They are retained. Deleting them would make resolution unauditable and irreversible.',
        note_ja: 'ソース側は保持される。削除すれば解決処理は監査不能かつ不可逆になる。',
      },
      {
        text: 'The source profiles are overwritten with the unified values',
        text_ja: 'ソースプロファイルは統合後の値で上書きされる',
        correct: false,
        note: 'Data 360 does not write back over source data as part of resolution.',
        note_ja: 'Data 360 は解決処理の一環としてソースデータを上書きすることはない。',
      },
      {
        text: 'There is no link; the unified profile is an independent new record',
        text_ja: 'リンクは無く、統合プロファイルは独立した新規レコードである',
        correct: false,
        note: 'Without the link you could not trace a merge, and Profile Explorer would have nothing to show.',
        note_ja: 'リンクが無ければ結合を追跡できず、Profile Explorer に表示するものが無くなる。',
      },
    ],
    explanation:
      'Unification is additive, not destructive. The unified individual is derived output linked back to the source profiles that formed it, and those sources remain intact. This traceability is what makes Profile Explorer useful for diagnosing why two records merged or failed to, and it is why changing match rules can safely re-resolve profiles.',
    explanation_ja:
      '統合は加算的であって破壊的ではない。Unified Individual はそれを構成したソースプロファイルへリンクした導出出力であり、ソース側はそのまま残る。この追跡可能性があるから、Profile Explorer は2件が結合した／しなかった理由の診断に役立つ。また一致ルールを変更してもプロファイルを安全に再解決できるのはそのためである。',
    reference:
      '💡 Nothing is destroyed by unification. That is why a ruleset can be changed and re-run without losing data.',
    reference_ja:
      '💡 統合によって失われるものは無い。だからこそルールセットを変更して再実行してもデータを失わない。',
  },
  {
    id: 'dc-uni-15',
    domain: 'dc-unification',
    type: 'mcq',
    question:
      'Which reconciliation rule best fits an attribute where one source system is known to occasionally contain typos, while three others are reliable?',
    question_ja:
      'ある属性について、1つのソースシステムに時々誤入力があると分かっており、他の3つは信頼できる場合、最も適した調整ルールはどれか。',
    options: [
      {
        text: 'Most Frequent',
        text_ja: 'Most Frequent（最頻）',
        correct: true,
        note: 'Correct. The three reliable systems outvote the occasional typo, without hard-coding a priority order.',
        note_ja: '正解。信頼できる3つが時折の誤入力を多数決で上回る。優先順位を固定的に決める必要もない。',
      },
      {
        text: 'Most Recent',
        text_ja: 'Most Recent（最新）',
        correct: false,
        note: 'If the typo happens to be the latest update, recency will select it.',
        note_ja: '誤入力がたまたま最新の更新だった場合、最新性はそれを選んでしまう。',
      },
      {
        text: 'Source Priority',
        text_ja: 'Source Priority（ソース優先度）',
        correct: false,
        note: 'Workable, but the scenario describes consensus among equals rather than one authoritative system.',
        note_ja: '機能はするが、シナリオが描いているのは1つの権威ではなく対等な複数の合意。',
      },
      {
        text: 'A fuzzy match rule on the attribute',
        text_ja: 'その属性に対するあいまい一致ルール',
        correct: false,
        note: 'Wrong rule type. Match rules decide merging, not which value is displayed.',
        note_ja: 'ルール種別が誤り。一致ルールは結合を決めるもので、表示する値を決めるものではない。',
      },
    ],
    explanation:
      'Most Frequent takes the value that appears most often across sources, which is exactly right when one system is occasionally wrong and no single system is authoritative. Source priority would also work if the scenario named a system of record, but it does not — it describes several equally trusted systems and one unreliable one.',
    explanation_ja:
      'Most Frequent はソース全体で最も多く現れる値を採る。あるシステムが時々誤り、かつどれか1つが正であるわけではない場合にまさに適する。シナリオが記録システムを名指ししていればソース優先度も機能するが、ここでは名指ししていない。同等に信頼できる複数のシステムと、1つの不安定なシステムを描いている。',
    reference:
      '💡 Recency = "latest wins". Frequency = "consensus wins". Priority = "the named system wins". Match the cue.',
    reference_ja:
      '💡 最新性＝「最後が勝つ」。最頻＝「多数が勝つ」。優先度＝「名指しされたシステムが勝つ」。手がかりに対応させる。',
  },
]
