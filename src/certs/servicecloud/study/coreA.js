// 学習教材（前半4単元）：導入の進め方 / 設計と業務知識 / ケース管理 / 対応チャネル

export const implementationStudy = {
  intro:
    'This unit is about how a consultant behaves, not which button to click. The recurring theme is governed change: capture requirements, analyse impact, let the decision-maker decide, build in a lower environment, test against the approved design, and promote through a controlled release. Sandbox selection and deployment sequencing are the two most heavily tested mechanics.',
  intro_ja:
    'この単元は「どのボタンを押すか」ではなく「コンサルタントとしてどう振る舞うか」を扱います。一貫したテーマは統制された変更管理です。要件を記録し、影響を分析し、意思決定者に判断してもらい、下位環境で構築し、承認済みの設計に対してテストし、統制されたリリースで昇格させる。出題が特に多いのはサンドボックスの選定とデプロイ順序の2点です。',
  sections: [
    {
      heading: 'Governed change: how a consultant handles a new requirement',
      heading_ja: '統制された変更：新しい要件への対応',
      body:
        'Mid-project requirements are normal. What distinguishes a consultant is the response: never build immediately, and never dismiss without analysis. Both extremes bypass governance and both are wrong answers on this exam.',
      body_ja:
        'プロジェクト途中での要件追加は日常です。コンサルタントを分けるのはその対応で、ただちに構築することも、分析せずに退けることもしません。どちらの極端もガバナンスを迂回しており、この試験ではいずれも誤答になります。',
      points: [
        'Correct first step: document the requirement and evaluate its impact on scope, timeline and cost. Then the sponsor decides.',
        'Building immediately bypasses governance and hides the cost of scope growth.',
        'Deferring without analysis is equally uncontrolled — a rejection with no basis is as ungoverned as an acceptance with no basis.',
        'Restarting a phase is almost never proportionate to a single new requirement.',
        'Distinguish a defect from a change request. Does not match the approved design → defect → fix the build. The design itself needs to change → change request → govern it.',
      ],
      points_ja: [
        '正しい最初の手順：要件を文書化し、スコープ・スケジュール・コストへの影響を評価する。そのうえでスポンサーが判断する。',
        'ただちに構築するのはガバナンスの迂回であり、スコープ増加のコストを隠してしまう。',
        '分析せずに先送りするのも同様に統制を欠く。根拠のない却下は、根拠のない受け入れと同じく統制されていない。',
        'フェーズのやり直しは、要件1件に対してほぼ常に過剰。',
        '不具合と変更要求を区別する。承認済み設計と一致しない→不具合→構築を修正。設計自体を変える必要がある→変更要求→統制して扱う。',
      ],
    },
    {
      heading: 'Sandbox selection',
      heading_ja: 'サンドボックスの選定',
      body:
        'Sandbox questions are answered by matching the data you need to the sandbox type that carries it. Two facts decide almost every question: only Full Sandbox contains a complete production copy, and Developer / Developer Pro contain no production data at all.',
      body_ja:
        'サンドボックスの設問は、必要なデータとそれを持つ種別を対応づければ答えられます。ほぼすべての設問は次の2点で決まります。本番の完全コピーを持つのは Full Sandbox のみ、Developer／Developer Pro は本番データをまったく含まない。',
      figure: 'sc-sandbox-types',
      points: [
        'Developer Sandbox — metadata only, small data limit. For individual development.',
        'Developer Pro Sandbox — metadata only, larger limit. For development and integration testing with hand-loaded data.',
        'Partial Copy Sandbox — metadata plus a sample of production data. Good for functional testing and UAT, not for performance testing.',
        'Full Sandbox — a complete production copy including all data. Required for realistic performance testing and for regulated UAT.',
        'Performance testing always means Full Sandbox. Loading extra data into a Partial Copy does not reproduce production volume or distribution.',
        'A Full Sandbox copies real data, so apply sandbox data masking where regulation requires it.',
        'Typical path: Developer (build) → Partial Copy (functional / UAT) → Full (performance and final UAT).',
      ],
      points_ja: [
        'Developer Sandbox — メタデータのみ、データ容量は小。個人の開発用。',
        'Developer Pro Sandbox — メタデータのみ、容量は大きめ。手動投入データでの開発と結合テスト用。',
        'Partial Copy Sandbox — メタデータに加え本番データのサンプルを含む。機能テストや UAT には適するが、パフォーマンステストには不十分。',
        'Full Sandbox — 全データを含む本番の完全コピー。現実的なパフォーマンステストと、規制環境での UAT に必要。',
        'パフォーマンステストは常に Full Sandbox。Partial Copy に追加データを読み込んでも、本番のデータ量や分布は再現できない。',
        'Full Sandbox は実データをコピーするため、規制上必要な場合はサンドボックスのデータマスキングを適用する。',
        '標準的な流れ：Developer（構築）→Partial Copy（機能テスト／UAT）→Full（パフォーマンスと最終UAT）。',
      ],
    },
    {
      heading: 'Deployment and dependencies',
      heading_ja: 'デプロイと依存関係',
      body:
        'Change sets do not gather dependencies for you. Most deployment failures in the exam are a missing referenced component, and the fix is either to include it or to sequence the deployment so the referenced component arrives first.',
      body_ja:
        '変更セットは依存関係を自動で収集しません。試験に出るデプロイ失敗の多くは参照先コンポーネントの欠落であり、対処は「変更セットに含める」か「参照される側が先に到着するよう順序を組む」かのいずれかです。',
      points: [
        'Deploy base components first: objects and fields, then the validation rules, flows, layouts and reports that reference them.',
        'A validation rule referencing a field not present in the target org means the field was omitted from the change set. Add it.',
        'Use "View/Add Dependencies" when assembling a change set — it is the built-in guard against exactly this failure.',
        'Deactivating a validation rule is not required for deployment and would not create the missing field.',
        'Manually creating the field in the target org works once, but it breaks the repeatability that a governed release depends on.',
      ],
      points_ja: [
        '基盤となるコンポーネントを先にデプロイする。オブジェクトと項目、次にそれらを参照する入力規則・フロー・レイアウト・レポート。',
        '対象組織に存在しない項目を入力規則が参照している場合、その項目が変更セットから漏れている。追加する。',
        '変更セット作成時は「依存関係を表示／追加」を使う。まさにこの失敗に対する標準の防御手段。',
        '入力規則の無効化はデプロイに必須ではなく、不足している項目が作られるわけでもない。',
        '対象組織で項目を手動作成すれば一度は通るが、統制されたリリースが前提とする再現性を損なう。',
      ],
    },
    {
      heading: 'UAT and training (deep dive)',
      heading_ja: 'UAT とトレーニング（深掘り）',
      body:
        'UAT verifies the build against the approved design, and training determines whether the build is actually used. Both have a standard right answer on this exam, and both have tempting shortcuts that are wrong.',
      body_ja:
        'UAT は承認済みの設計に対して構築内容を検証し、トレーニングは構築されたものが実際に使われるかを左右します。この試験ではどちらにも定石の正答があり、どちらにも魅力的だが誤った近道があります。',
      points: [
        'UAT mismatch with the approved design is a defect: fix the configuration and retest. Do not rewrite the documentation to match the build, and do not ask agents to adapt.',
        'Escalate to the sponsor only for genuine scope or priority decisions, not for a straightforward build defect.',
        'Training large populations: use train-the-trainer, which scales where direct delivery does not.',
        'Timing: deliver agent training close to go-live, on a stable build, so it is still fresh when the system is live.',
        'Training too early against an unfinished build guarantees rework and forgetting; training on go-live day in production is high risk.',
        'Generic self-paced content alone cannot cover the org-specific process agents will actually follow.',
      ],
      points_ja: [
        'UAT で承認済み設計との不一致が見つかったら不具合。構成を修正して再テストする。構築内容に合わせて文書を書き換えたり、担当者に合わせてもらったりしない。',
        'スポンサーへのエスカレーションは、スコープや優先順位の判断が必要な場合に限る。単純な構築上の不具合には不要。',
        '大人数のトレーニングはトレーナー育成方式を使う。直接実施ではスケールしない規模に対応できる。',
        '実施時期：構築が安定した状態で、稼働直前に担当者向けトレーニングを行い、稼働時に知識が新鮮な状態を保つ。',
        '未完成の構築に対して早すぎるトレーニングは、やり直しと忘却を招く。稼働当日に本番環境で行うのはリスクが高い。',
        '汎用の自習コンテンツだけでは、担当者が実際に従う組織固有の手順をカバーできない。',
      ],
    },
  ],
}

export const solutionStudy = {
  intro:
    'This is the largest area of the exam. It covers the service data model (Account, Contact, Case, Asset, Entitlement), licensing decisions, the sharing model, and how to choose a routing design. The recurring skill is proportionality: choosing the smallest solution that meets the requirement, rather than the most capable one.',
  intro_ja:
    'この単元は試験で最大の比重を占めます。サービスのデータモデル（取引先・取引先責任者・ケース・納入品・エンタイトルメント）、ライセンス選定、共有モデル、ルーティング設計の選択を扱います。繰り返し問われる力は「規模に見合った判断」で、最も高機能なものではなく、要件を満たす最小の解決策を選ぶことです。',
  sections: [
    {
      heading: 'The service data model',
      heading_ja: 'サービスのデータモデル',
      body:
        'Case questions often hinge on which object holds the information the agent needs. Product, Asset, Contract and Entitlement are distinct concepts that are easy to confuse, and the exam tests exactly that boundary.',
      body_ja:
        'ケースに関する設問は、担当者が必要とする情報をどのオブジェクトが保持しているかで決まることが多くあります。Product、Asset、Contract、Entitlement は混同しやすい別概念であり、試験はまさにその境界を問います。',
      figure: 'sc-data-model',
      points: [
        'Product — what the company sells: the model or SKU. Not specific to one customer.',
        'Asset — the individual unit a specific customer owns. Service history for that physical unit lives here.',
        'Contract — the commercial agreement: terms, dates, renewal.',
        'Entitlement — what level of support the customer is due. It is what drives entitlement processes and milestones.',
        'Typical trap: "see all previous service visits for that specific unit" → Asset, not Product.',
        'Entitlements can be associated with an account, an asset or a contract, and are then applied to the case.',
      ],
      points_ja: [
        'Product — 企業が販売するもの。型番やSKU。特定の顧客に紐づかない。',
        'Asset — 特定の顧客が所有する個体。その物理的な個体のサービス履歴はここに置く。',
        'Contract — 商取引上の契約。条件、期間、更新。',
        'Entitlement — 顧客が受けられるサポートのレベル。エンタイトルメントプロセスとマイルストーンを駆動する。',
        '典型的な引っかけ：「その特定の個体に対する過去のサービス訪問をすべて見たい」→Product ではなく Asset。',
        'エンタイトルメントは取引先・納入品・契約に関連付けられ、そのうえでケースに適用される。',
      ],
    },
    {
      heading: 'Licensing decisions',
      heading_ja: 'ライセンスの選定',
      body:
        'Licensing questions are cost-versus-need judgements. Work out whether the user is internal or external, and what they actually need to do. Choosing the most capable licence is usually the wrong answer.',
      body_ja:
        'ライセンスの設問はコストと必要機能の判断です。ユーザーが社内か社外か、そして実際に何をする必要があるかを見極めます。最も高機能なライセンスを選ぶのは、たいてい誤答です。',
      points: [
        'Service Cloud User — internal agents who work cases. The full-capability, highest-cost internal option.',
        'Salesforce Platform — internal users who need read or reference access but do not handle cases. The cost-effective choice for back-office staff.',
        'Customer Community — external customers, high volume, submitting and tracking their own cases and reading knowledge. The B2C self-service default.',
        'Customer Community Plus — adds roles, sharing and reports. Choose it only when those capabilities are genuinely required.',
        'Partner Community — channel partners who need sales objects such as leads and opportunities.',
        'Guest user — unauthenticated visitors. Access is defined by the guest user profile and sharing, and must be scoped tightly.',
      ],
      points_ja: [
        'Service Cloud User — ケースを処理する社内担当者向け。最も高機能で最も高コストな社内向け選択肢。',
        'Salesforce Platform — 参照目的でのアクセスが必要だがケース対応はしない社内ユーザー向け。バックオフィス職員にコスト効率が良い。',
        'Customer Community — 社外の顧客向け。大量ユーザーが自分のケースを起票・追跡し、ナレッジを閲覧する。B2Cセルフサービスの既定。',
        'Customer Community Plus — ロール・共有・レポートが追加される。これらが本当に必要な場合にのみ選ぶ。',
        'Partner Community — リードや商談などの営業オブジェクトを必要とするチャネルパートナー向け。',
        'ゲストユーザー — 未認証の訪問者。アクセスはゲストユーザープロファイルと共有設定で定義され、厳密に絞る必要がある。',
      ],
    },
    {
      heading: 'Sharing and visibility',
      heading_ja: '共有と可視性',
      body:
        'Record visibility questions are answered by remembering the direction each mechanism works in. The org-wide default is the floor; everything else opens access upwards. Nothing in the sharing model restricts access below the OWD.',
      body_ja:
        'レコードの可視性に関する設問は、各仕組みが「どちら向きに働くか」を思い出せば答えられます。組織の共有設定（OWD）が下限であり、他のすべては上向きにアクセスを広げます。共有モデルの中に OWD より下へ制限するものはありません。',
      points: [
        'Org-wide default (OWD) — the baseline. Setting Case to Private means users see only records they own or that are shared with them.',
        'Role hierarchy, sharing rules, manual sharing and teams all widen access from that baseline. None of them can restrict.',
        'Profiles and permission sets control object and field permissions, not record-level visibility. They also only grant.',
        'Therefore "prevent guests from seeing other customers\' cases" → set the Case OWD to Private. A sharing rule or permission set cannot achieve it.',
        'Guest user access on Experience Cloud needs particular care: guests have no record ownership in the usual sense, so the sharing design must be deliberate.',
      ],
      points_ja: [
        '組織の共有設定（OWD） — 基準線。Case を「非公開」にすると、ユーザーは自分が所有するレコードと共有されたレコードのみを見る。',
        'ロール階層、共有ルール、手動共有、チームはいずれもその基準線からアクセスを広げる。制限する働きはない。',
        'プロファイルと権限セットはオブジェクトと項目の権限を制御するもので、レコードレベルの可視性ではない。こちらも付与のみ。',
        'したがって「ゲストに他の顧客のケースを見せない」→Case の OWD を非公開にする。共有ルールや権限セットでは実現できない。',
        'Experience Cloud のゲストユーザーアクセスは特に注意が必要。通常の意味でのレコード所有を持たないため、共有設計を意図的に行う必要がある。',
      ],
    },
    {
      heading: 'Choosing a routing design (deep dive)',
      heading_ja: 'ルーティング設計の選択（深掘り）',
      body:
        'Several features can route cases, and the exam tests whether you pick the proportionate one. The decision turns on what the routing depends on and how large the operation is.',
      body_ja:
        'ケースをルーティングできる機能は複数あり、試験では「規模に見合ったもの」を選べるかが問われます。判断は「ルーティングが何に依存するか」と「運用の規模」で決まります。',
      figure: 'sc-routing-decision',
      points: [
        'Assignment rules — evaluate criteria at case creation and set the owner or queue. The right answer when routing depends on a record attribute known at creation, such as account tier.',
        'Queues — a holding area agents pull from. Simple and effective when there are few dimensions.',
        'Omni-Channel push routing — actively pushes work to available agents based on capacity. Earns its complexity at larger scale or across multiple channels.',
        'Skills-based routing — matches work to agents by attributes such as language or product expertise. Scales where a queue-per-combination design does not.',
        'Escalation rules — time-based reassignment after a case has been open too long. Not an initial routing mechanism, and only one can be active per object.',
        'Proportionality test: with 10 agents and one queue, a priority-sorted list view plus assignment rules beats implementing Omni-Channel.',
      ],
      points_ja: [
        '割り当てルール — ケース作成時に条件を評価し、所有者やキューを設定する。取引先区分など作成時に判明しているレコード属性でルーティングする場合の正答。',
        'キュー — 担当者が引き取る保留領域。軸が少ない場合はシンプルで有効。',
        'Omni-Channel プッシュルーティング — キャパシティに基づいて対応可能な担当者へ作業を能動的に配信する。規模が大きい場合や複数チャネルでその複雑さに見合う。',
        'スキルベースルーティング — 言語や製品知識などの属性で作業と担当者を突き合わせる。組み合わせごとにキューを作る設計では対応できない規模に拡張できる。',
        'エスカレーションルール — ケースが長時間未解決の場合の時間ベースの再割り当て。初回ルーティングの手段ではなく、オブジェクトごとに有効化できるのは1つのみ。',
        '規模の判断：担当者10名・キュー1つなら、Omni-Channel の導入より、優先度でソートしたリストビュー＋割り当てルールのほうが優る。',
      ],
    },
  ],
}

export const caseStudy = {
  intro:
    'Case management covers the lifecycle of a case: how it is created, how SLAs are tracked against it, how follow-up actions are automated, and the platform limits that quietly break things at volume. Entitlements and milestones are the highest-value topic here.',
  intro_ja:
    'ケース管理はケースのライフサイクル、すなわち作成方法、SLAの追跡、フォローアップ処理の自動化、そして大量処理時に静かに問題を起こすプラットフォーム上限を扱います。この中で最も出題価値が高いのはエンタイトルメントとマイルストーンです。',
  sections: [
    {
      heading: 'Entitlements, entitlement processes and milestones',
      heading_ja: 'エンタイトルメント、エンタイトルメントプロセス、マイルストーン',
      body:
        'Entitlements express what support a customer is due; entitlement processes track elapsed time against that commitment; milestones are the checkpoints within the process, with actions that fire before, at, and after the target.',
      body_ja:
        'エンタイトルメントは顧客が受けられるサポートを表し、エンタイトルメントプロセスはそのコミットメントに対する経過時間を追跡し、マイルストーンはプロセス内のチェックポイントとして、目標の前・時点・後にアクションを発火させます。',
      figure: 'sc-entitlement-chain',
      points: [
        'Use entitlements when different customer tiers have different commitments, and when someone must be warned before a breach.',
        'Milestone actions come in three kinds: warning (before the target), violation (after it is missed) and success (when met). Pre-breach notification is a warning action.',
        'Only one escalation rule can be active per object, so "three tiers with three different commitments" cannot be built with escalation rules.',
        'Troubleshooting order when milestones do not appear: is the entitlement process actually applied to the case? Then, is the entitlement associated with the account/asset/contract? Then, timing relative to activation.',
        'Contrast: a single uniform rule such as "escalate everything after 72 hours regardless of tier" is a case escalation rule, not entitlements. Entitlements exist to express differences.',
      ],
      points_ja: [
        '顧客区分ごとにコミットメントが異なる場合、および違反前に誰かへ警告する必要がある場合にエンタイトルメントを使う。',
        'マイルストーンアクションは3種類。警告（目標前）、違反（未達後）、成功（達成時）。違反前の通知は警告アクション。',
        'エスカレーションルールはオブジェクトごとに1つしか有効化できないため、「3区分・3つの異なるコミットメント」はエスカレーションルールでは構築できない。',
        'マイルストーンが表示されないときの切り分け順：まずケースにエンタイトルメントプロセスが適用されているか。次に取引先／納入品／契約にエンタイトルメントが関連付けられているか。最後に有効化との時間関係。',
        '対比：「区分に関係なく72時間で全件エスカレーション」のような一律のルールはケースエスカレーションルールであり、エンタイトルメントではない。エンタイトルメントは「違い」を表現するためにある。',
      ],
    },
    {
      heading: 'Case automation and time-delayed actions',
      heading_ja: 'ケースの自動化と時間差の処理',
      body:
        'When a requirement says "N hours after X", the declarative answer is a record-triggered flow with a scheduled path. Knowing which tool is enforcement and which is only guidance is equally important.',
      body_ja:
        '要件に「Xの N時間後」とあれば、宣言的な答えはスケジュールパスを持つレコードトリガーフローです。あわせて、どのツールが「強制」でどれが「案内」にすぎないかを区別することも同じく重要です。',
      points: [
        'Record-triggered flow with a scheduled path — fires a defined time after the triggering change. The standard answer for follow-up surveys, delayed notifications and time-based checks.',
        'Validation rule — blocks the save when a condition is not met. This is the only genuine enforcement mechanism among the common options.',
        'Required field — forces a value, but not a meaningful one. It cannot verify that an article was actually attached.',
        'Flow screen prompts, path guidance and alerts — guidance the agent can ignore. Never the answer to "enforce" or "must".',
        'Escalation rules — time-based reassignment of open cases. They do not act on closed cases, so they cannot send a post-closure survey.',
      ],
      points_ja: [
        'スケジュールパス付きレコードトリガーフロー — トリガーとなる変更から指定時間後に実行される。フォローアップアンケート、遅延通知、時間ベースのチェックにおける定石。',
        '入力規則 — 条件を満たさない場合に保存をブロックする。一般的な選択肢の中で唯一の本当の強制手段。',
        '必須項目 — 値の入力は強制するが、意味のある値とは限らない。記事が実際に添付されたかを検証することはできない。',
        '画面フローのプロンプト、パスのガイダンス、アラート — 担当者が無視できる案内。「強制する」「必須」の答えにはならない。',
        'エスカレーションルール — 未解決ケースの時間ベースの再割り当て。クローズ済みケースには作用しないため、クローズ後のアンケート送信には使えない。',
      ],
    },
    {
      heading: 'Case creation limits and channel behaviour (deep dive)',
      heading_ja: 'ケース作成の上限とチャネルの挙動（深掘り）',
      body:
        'Several exam questions describe volumes that quietly exceed a platform limit. The characteristic danger is that the failure is silent: the integration runs, the form accepts the submission, and nothing appears.',
      body_ja:
        'プラットフォームの上限を静かに超える数量を提示する設問がいくつもあります。危険なのは失敗が「無言」であることです。連携は実行され、フォームは送信を受け付け、それでも何も現れません。',
      points: [
        'Web-to-Case has a default limit of 5,000 cases per day. Submissions above it simply do not create cases — customer requests are lost without an error to the submitter.',
        'The limit is not license-based; an increase is requested from Salesforce. Above the limit, design an alternative intake path such as an API integration or an Experience Cloud form.',
        'Daily single-email limits are easily exhausted by large batch integrations. "The integration ran but no emails were sent" is almost always this.',
        'Flows do run during bulk DML — the idea that they do not is a common misconception and a frequent distractor.',
        'Live Chat Transcript records are created and related to the case automatically at the end of a chat session. No custom flow or manual copy is required.',
      ],
      points_ja: [
        'Web-to-Case には既定で1日5,000件の上限がある。それを超えた送信はケースを作成せず、送信者にエラーも出ないまま顧客の依頼が失われる。',
        '上限はライセンスに連動しておらず、引き上げは Salesforce への依頼で行う。上限を超える場合は、API連携や Experience Cloud のフォームなど別の受付経路を設計する。',
        '大量のバッチ連携では、1日あたりの単一メール送信上限を容易に使い切る。「連携は動いたがメールが送られない」は、ほぼ常にこれ。',
        'フローは一括DML中も実行される。実行されないという理解はよくある誤解で、誤答の選択肢として頻出。',
        'Live Chat Transcript レコードはチャットセッション終了時に自動作成され、ケースに関連付けられる。カスタムフローも手動コピーも不要。',
      ],
    },
  ],
}

export const channelsStudy = {
  intro:
    'Channel questions are answered by matching the customer\'s starting point to the intake feature designed for it. Email, web form, chat, messaging, phone, social and self-service portal each have a distinct answer, and the distractors are usually the other channels.',
  intro_ja:
    'チャネルの設問は、顧客の出発点と、それ向けに設計された受付機能を対応づけることで答えられます。メール、Webフォーム、チャット、メッセージング、電話、ソーシャル、セルフサービスポータルにはそれぞれ固有の答えがあり、誤答の選択肢はたいてい他のチャネルです。',
  sections: [
    {
      heading: 'Email and web channels',
      heading_ja: 'メールと Web のチャネル',
      body:
        'Email-to-Case and Web-to-Case are the two oldest intake channels and both have specific configuration points the exam returns to: where the email is processed, and how replies are matched back to the original case.',
      body_ja:
        'Email-to-Case と Web-to-Case は最も古い受付チャネルで、どちらにも試験が繰り返し問う具体的な構成点があります。メールがどこで処理されるか、そして返信をどうやって元のケースに突き合わせるか、です。',
      points: [
        'On-Demand Email-to-Case — routes messages through Salesforce servers. Simplest, no infrastructure to run.',
        'On-Premises Email-to-Case — an email agent installed behind the company firewall, so message data never leaves internal servers. The answer whenever regulation requires data to stay internal.',
        'Email threading — a token in the subject line or email headers lets Salesforce match a reply to the originating case. Without it, every reply creates a new case.',
        'Header-based threading is more robust than subject-line tokens, because customers frequently edit the subject.',
        'Auto-response rules send acknowledgements; assignment rules set ownership. Neither of them threads a conversation.',
        'Web-to-Case is a one-way form post with a 5,000 case per day default limit. It has no built-in knowledge surfacing.',
      ],
      points_ja: [
        'On-Demand Email-to-Case — メッセージが Salesforce のサーバーを経由する。最もシンプルで、運用すべき基盤がない。',
        'On-Premises Email-to-Case — 自社ファイアウォール内に導入したメールエージェントを使い、メッセージデータが社内サーバーから出ない。規制上データを社内に留める必要がある場合の答え。',
        'メールのスレッド化 — 件名やメールヘッダー内のトークンにより、Salesforce が返信を元のケースに突き合わせる。これがないと、すべての返信が新規ケースになる。',
        '顧客は件名を書き換えることが多いため、ヘッダーによるスレッド化のほうが件名トークンより堅牢。',
        '自動応答ルールは受付確認を送り、割り当てルールは所有者を設定する。どちらも会話をスレッド化しない。',
        'Web-to-Case は一方向のフォーム送信で、既定の上限は1日5,000件。ナレッジを提示する機能は内蔵していない。',
      ],
    },
    {
      heading: 'Chat, messaging and bots',
      heading_ja: 'チャット、メッセージング、ボット',
      body:
        'The distinction that matters most here is synchronous versus asynchronous. Chat is a live session that ends when the window closes; messaging persists so the conversation can be resumed later, on a different device.',
      body_ja:
        'ここで最も重要な区別は同期か非同期かです。チャットはウィンドウを閉じると終了するリアルタイムのセッション、メッセージングは会話が保持され、後から別のデバイスでも再開できます。',
      figure: 'sc-channel-map',
      points: [
        'Chat (Live Agent) — synchronous and session-bound. Closing the window ends the conversation.',
        'Messaging for In-App and Web — asynchronous. The conversation persists across devices and sessions, so a customer can start on mobile and continue on a laptop with history intact.',
        '"Continue later / across devices / without losing history" always points to asynchronous messaging, never to chat.',
        'Einstein Bots run on top of a channel. When the bot cannot resolve an issue, it transfers the conversation to a live agent within the same session, so the agent inherits the transcript and context.',
        'A bot is not a persistence mechanism and not a deflection portal — it is a conversational layer.',
      ],
      points_ja: [
        'チャット（Live Agent） — 同期かつセッションに紐づく。ウィンドウを閉じると会話が終了する。',
        'Messaging for In-App and Web — 非同期。デバイスとセッションをまたいで会話が保持されるため、モバイルで始めてノートPCで履歴を保ったまま続けられる。',
        '「後で続ける／デバイスをまたぐ／履歴を失わない」は常に非同期メッセージングを指し、チャットではない。',
        'Einstein Bots はチャネルの上で動作する。ボットが解決できない場合、同一セッション内で有人担当者へ会話を転送し、担当者はトランスクリプトと文脈を引き継ぐ。',
        'ボットは永続化の仕組みでも、ケース回避のポータルでもない。あくまで会話のレイヤーである。',
      ],
    },
    {
      heading: 'Telephony, social and self-service (deep dive)',
      heading_ja: '電話、ソーシャル、セルフサービス（深掘り）',
      body:
        'The remaining channels each have one decisive question. For telephony: are you keeping the existing phone system or replacing it? For social: which posts genuinely warrant a case? For self-service: does the customer need to log in?',
      body_ja:
        '残るチャネルには、それぞれ決定的な問いが1つずつあります。電話：既存の電話システムを残すのか置き換えるのか。ソーシャル：どの投稿が本当にケース化に値するのか。セルフサービス：顧客はログインする必要があるのか。',
      points: [
        'Open CTI with a vendor adapter — integrates an existing telephony platform (such as Cisco) into the console and delivers screen pop.',
        'Service Cloud Voice — Salesforce-native telephony. The answer only when replacing the phone system, not when integrating one.',
        'CTI screen pop matches the caller and opens the relevant record automatically. Specify what happens with no match and with multiple matches.',
        'Social Customer Service connects social accounts and uses monitoring rules to decide which posts become cases. Direct messages, complaints and replies to the support account warrant cases; retweets of the company\'s own promotional posts do not.',
        'Experience Cloud portal with guest user access — lets customers view public content and check status without logging in. Pair it with a Private OWD so guests cannot see other customers\' cases.',
        'Einstein Article Recommendations on the portal deflects cases before submission by recommending articles as the customer types.',
      ],
      points_ja: [
        'ベンダーアダプタを用いた Open CTI — 既存の電話基盤（Cisco など）をコンソールに統合し、スクリーンポップを実現する。',
        'Service Cloud Voice — Salesforce ネイティブの電話機能。統合ではなく電話システム自体を置き換える場合にのみ正答となる。',
        'CTI スクリーンポップは発信者を突き合わせて該当レコードを自動で開く。一致なしの場合と複数一致の場合の挙動を明示しておく。',
        'Social Customer Service はソーシャルアカウントを接続し、監視ルールでどの投稿をケース化するか決める。ダイレクトメッセージ、苦情、サポートアカウントへの返信はケース化に値するが、自社の販促投稿のリツイートは該当しない。',
        'ゲストユーザーアクセスを備えた Experience Cloud ポータル — ログインなしで公開コンテンツの閲覧と状況確認ができる。ゲストが他の顧客のケースを見ないよう、OWD を非公開にして併用する。',
        'ポータル上の Einstein Article Recommendations は、顧客の入力に応じて記事を推奨し、送信前にケースを回避する。',
      ],
    },
  ],
}
