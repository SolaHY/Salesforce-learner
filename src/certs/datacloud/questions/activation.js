// 単元6：Data Activations and Utilization（セグメントと活用・配点20%／最大）
// セグメンテーション、アクティベーションターゲット、同意、Data Action、フローでの活用。
export const activationQuestions = [
  {
    id: 'dc-act-1',
    domain: 'dc-activation',
    type: 'mcq',
    question: 'What is the correct order when setting up an activation for the first time?',
    question_ja: '初めてアクティベーションを設定する際の正しい順序はどれか。',
    options: [
      {
        text: 'Create the activation target, then create the activation that sends the segment to it',
        text_ja: 'アクティベーションターゲットを作成し、次にセグメントをそこへ送るアクティベーションを作成する',
        correct: true,
        note: 'Correct. The destination must exist before delivery to it can be configured.',
        note_ja: '正解。配信を設定するには、その宛先が先に存在している必要がある。',
      },
      {
        text: 'Create the activation first, then choose a target afterwards from the segment page',
        text_ja: '先にアクティベーションを作成し、その後セグメントの画面からターゲットを選ぶ',
        correct: false,
        note: 'Reversed. The activation references a target, so the target must exist first.',
        note_ja: '順序が逆。アクティベーションはターゲットを参照するため、ターゲットが先に必要。',
      },
      {
        text: 'Publish the segment, which automatically creates a matching activation target',
        text_ja: 'セグメントを公開すると、対応するアクティベーションターゲットが自動的に作成される',
        correct: false,
        note: 'Publishing recalculates membership; it does not create destinations.',
        note_ja: '公開はメンバーシップを再計算するもので、宛先を作成しない。',
      },
      {
        text: 'Create a data action, which serves as the activation target',
        text_ja: 'Data Action を作成し、それをアクティベーションターゲットとして使う',
        correct: false,
        note: 'Data actions are a separate, event-driven path with their own targets.',
        note_ja: 'Data Action はそれ自身のターゲットを持つ、別のイベント駆動の経路。',
      },
    ],
    explanation:
      'Two objects, two steps. The activation target is the destination system — Marketing Cloud, an advertising audience, Salesforce CRM, S3, SFTP. The activation is the configured delivery: which segment goes there, with which attributes, and how often. The target must exist before the activation can reference it.',
    explanation_ja:
      'オブジェクトが2つ、手順が2つある。アクティベーションターゲットは宛先システム（Marketing Cloud、広告オーディエンス、Salesforce CRM、S3、SFTP など）である。アクティベーションは設定された配信であり、どのセグメントを、どの属性とともに、どの頻度で送るかを定める。アクティベーションが参照する以上、ターゲットが先に存在していなければならない。',
    reference:
      '💡 Target = where. Activation = what goes there and how often. Segment = who.',
    reference_ja:
      '💡 ターゲット＝どこへ。アクティベーション＝何を、どの頻度で。セグメント＝誰を。',
  },
  {
    id: 'dc-act-2',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A marketing team complains that a segment activated to Marketing Cloud contains customers who unsubscribed from email last month. The unsubscribe data is ingested into Data 360 correctly.',
    scenario_ja:
      'マーケティングチームから、Marketing Cloud へアクティベートしたセグメントに、先月メール配信を停止した顧客が含まれているとの苦情があった。配信停止のデータは Data 360 に正しく取り込まれている。',
    question: 'What is the correct fix?',
    question_ja: '正しい対処はどれか。',
    options: [
      {
        text: 'Filter on consent within the segment or the activation so opted-out individuals are excluded automatically',
        text_ja: 'セグメントまたはアクティベーションの内側で同意により絞り込み、オプトアウト済みの人を自動的に除外する',
        correct: true,
        note: 'Correct. The control must be enforced by the platform, not by whoever happens to run the campaign.',
        note_ja: '正解。統制はプラットフォームが強制すべきで、たまたまキャンペーンを実行した人に委ねてはならない。',
      },
      {
        text: 'Instruct the marketing team to remove unsubscribed contacts before each send',
        text_ja: '送信のたびに配信停止した連絡先を除外するようマーケティングチームに指示する',
        correct: false,
        note: 'A manual process is always the wrong answer for consent — it fails the first time someone is busy.',
        note_ja: '同意に関して手作業のプロセスは常に誤答。誰かが忙しかった時点で破綻する。',
      },
      {
        text: 'Delete the unsubscribed individuals from Data 360',
        text_ja: '配信停止した個人を Data 360 から削除する',
        correct: false,
        note: 'Destroys the very record of the opt-out, so nothing prevents re-adding them at the next ingest.',
        note_ja: 'オプトアウトの記録そのものを破壊するため、次回の取り込みで再び追加されるのを何も防げない。',
      },
      {
        text: 'Reduce the segment publish frequency so stale members are refreshed less often',
        text_ja: '古いメンバーの更新頻度を下げるため、セグメントの公開頻度を減らす',
        correct: false,
        note: 'Publishing less often makes staleness worse, and it does not address consent at all.',
        note_ja: '公開頻度を下げれば古さは悪化するし、そもそも同意にまったく対処していない。',
      },
    ],
    explanation:
      'Consent is modelled as data on contact points, and the correct design filters on it automatically so an opted-out individual cannot be sent regardless of who runs the activation. Note that consent attaches to the contact point rather than to the person — someone may consent by email and not by SMS, so filtering must be channel-aware.',
    explanation_ja:
      '同意は Contact Point 上のデータとしてモデル化されており、正しい設計はそれで自動的に絞り込んで、誰がアクティベーションを実行してもオプトアウト済みの人が送信対象にならないようにする。なお同意は人ではなく Contact Point に紐づく。メールには同意していても SMS には同意していないことがあるため、絞り込みはチャネルを意識する必要がある。',
    reference:
      '💡 Any answer of the form "tell the team to remember" is wrong. Consent must be enforced structurally.',
    reference_ja:
      '💡 「チームに忘れないよう伝える」という形の答えはすべて誤り。同意は構造として強制する必要がある。',
  },
  {
    id: 'dc-act-3',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'A segment shows the correct membership in Data 360, but the destination system receives fewer records than expected. What are the most likely causes?',
    question_ja:
      'Data 360 上ではセグメントのメンバー数は正しいが、宛先システムが受け取るレコード数は想定より少ない。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'Consent filtering in the activation, or profiles missing a required attribute for that target',
        text_ja: 'アクティベーションでの同意によるフィルタ、またはそのターゲットに必須の属性を欠くプロファイル',
        correct: true,
        note: 'Correct. These are the two standard reasons a delivered count is lower than a segment count.',
        note_ja: '正解。配信件数がセグメント件数を下回る、2つの標準的な理由。',
      },
      {
        text: 'The segment was built on the wrong DMO',
        text_ja: 'セグメントが誤った DMO の上に作られている',
        correct: false,
        note: 'That would make the segment count itself wrong, but the scenario says it is correct.',
        note_ja: 'それならセグメントの件数自体が誤るはずだが、シナリオはそれが正しいとしている。',
      },
      {
        text: 'Identity resolution has not run',
        text_ja: 'ID解決が実行されていない',
        correct: false,
        note: 'Again, that would show up as a wrong segment count upstream of activation.',
        note_ja: 'それもアクティベーションより上流で、セグメント件数の誤りとして現れるはず。',
      },
      {
        text: 'The activation target was created after the segment',
        text_ja: 'アクティベーションターゲットがセグメントより後に作成された',
        correct: false,
        note: 'Creation order between the two is not a constraint, and it would not silently drop records.',
        note_ja: '両者の作成順序は制約ではないし、それが静かにレコードを落とすこともない。',
      },
    ],
    explanation:
      'Localise the discrepancy first. A correct segment count with a lower delivered count places the problem inside the activation, and the two standard causes are consent filtering removing opted-out individuals, and profiles lacking an attribute the target requires. Causes upstream of the segment would have made the segment count wrong too.',
    explanation_ja:
      'まず食い違いの発生場所を絞り込む。セグメントの件数が正しく配信件数が少ないなら、問題はアクティベーションの内側にある。標準的な原因は2つで、同意によるフィルタがオプトアウト済みの人を除外している場合と、ターゲットが必須とする属性をプロファイルが欠いている場合である。セグメントより上流の原因なら、セグメントの件数自体も誤っていたはずである。',
    reference:
      '💡 Compare counts at each stage. Where the number first diverges from expectation is where the cause lives.',
    reference_ja:
      '💡 各段階で件数を比較する。想定と最初にずれた場所に原因がある。',
  },
  {
    id: 'dc-act-4',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A bank wants a case to be created in Salesforce automatically whenever a customer\'s Data 360 fraud-risk insight crosses a threshold, so an agent can call them the same day.',
    scenario_ja:
      'ある銀行は、顧客の Data 360 上の不正リスクのインサイトがしきい値を超えた際に、担当者が当日中に電話できるよう、Salesforce で自動的にケースを作成したいと考えている。',
    question: 'What should the consultant configure?',
    question_ja: 'コンサルタントは何を設定すべきか。',
    options: [
      {
        text: 'A data action targeting a platform event, with a platform-event-triggered flow creating the case',
        text_ja: 'プラットフォームイベントを対象とする Data Action と、ケースを作成するプラットフォームイベント起動フロー',
        correct: true,
        note: 'Correct. Platform Event is the standard route from a Data 360 event into Salesforce automation.',
        note_ja: '正解。プラットフォームイベントは、Data 360 のイベントから Salesforce の自動化へ入る標準の経路。',
      },
      {
        text: 'A segment of high-risk customers, activated to Salesforce CRM daily',
        text_ja: '高リスク顧客のセグメントを、日次で Salesforce CRM にアクティベートする',
        correct: false,
        note: 'Population-shaped and scheduled. The requirement is per-customer and event-driven.',
        note_ja: '母集団の形をしたスケジュール実行。要件は顧客単位のイベント駆動。',
      },
      {
        text: 'A calculated insight refreshed nightly, surfaced on the account page',
        text_ja: '夜間更新の Calculated Insight を取引先ページに表示する',
        correct: false,
        note: 'Displays information but triggers nothing; no case would ever be created.',
        note_ja: '情報を表示するだけで何も起動しない。ケースは1件も作成されない。',
      },
      {
        text: 'A webhook data action pointing at the Salesforce REST API',
        text_ja: 'Salesforce REST API を指す Webhook の Data Action',
        correct: false,
        note: 'Technically reachable, but Platform Event is the supported native route into Salesforce automation.',
        note_ja: '技術的には到達可能だが、Salesforce の自動化への標準的な経路はプラットフォームイベント。',
      },
    ],
    explanation:
      'Distinguish the two paths. Activation is population-shaped and scheduled: "send this population a campaign". Data actions are event-shaped and immediate: "when this happens, do that". Data action targets are Platform Event, Webhook and Marketing Cloud — Platform Event is the route into Salesforce automation, Webhook the route to a non-Salesforce system.',
    explanation_ja:
      '2つの経路を区別する。アクティベーションは母集団の形をしたスケジュール実行で、「この母集団にキャンペーンを送る」。Data Action はイベントの形をした即時実行で、「これが起きたらあれをする」。Data Action のターゲットはプラットフォームイベント、Webhook、Marketing Cloud の3つで、プラットフォームイベントが Salesforce の自動化への経路、Webhook が Salesforce 以外への経路である。',
    reference:
      '💡 Data action targets are exactly three: Platform Event, Webhook, Marketing Cloud. Memorise the list.',
    reference_ja:
      '💡 Data Action のターゲットはちょうど3つ：プラットフォームイベント、Webhook、Marketing Cloud。この一覧を覚える。',
  },
  {
    id: 'dc-act-5',
    domain: 'dc-activation',
    type: 'multi',
    question: 'Which two are valid data action targets? (Choose 2)',
    question_ja: 'Data Action の有効なターゲットを2つ選べ。',
    options: [
      {
        text: 'Platform Event',
        text_ja: 'プラットフォームイベント',
        correct: true,
        note: 'Correct. The route into Salesforce automation via a platform-event-triggered flow.',
        note_ja: '正解。プラットフォームイベント起動フローを通じた Salesforce 自動化への経路。',
      },
      {
        text: 'Webhook',
        text_ja: 'Webhook',
        correct: true,
        note: 'Correct. The route to an external system that is not Salesforce.',
        note_ja: '正解。Salesforce 以外の外部システムへの経路。',
      },
      {
        text: 'Amazon S3 bucket',
        text_ja: 'Amazon S3 バケット',
        correct: false,
        note: 'S3 is an activation target for delivering segment files, not a data action target.',
        note_ja: 'S3 はセグメントのファイルを配信するアクティベーションターゲットであり、Data Action のターゲットではない。',
      },
      {
        text: 'Google Ads audience',
        text_ja: 'Google 広告のオーディエンス',
        correct: false,
        note: 'An advertising activation target, used for segment delivery rather than event notification.',
        note_ja: '広告向けのアクティベーションターゲット。イベント通知ではなくセグメント配信に使う。',
      },
      {
        text: 'Snowflake table',
        text_ja: 'Snowflake のテーブル',
        correct: false,
        note: 'Snowflake participates via Zero Copy federation and sharing, not as a data action target.',
        note_ja: 'Snowflake は Zero Copy の連携と共有で関わるもので、Data Action のターゲットではない。',
      },
    ],
    explanation:
      'Keep the two destination lists separate. Data action targets are Platform Event, Webhook and Marketing Cloud — they carry an event notification. Activation targets are destinations for segment membership and attributes: Marketing Cloud Engagement and Personalization, advertising audiences, Salesforce CRM, S3 and SFTP. Confusing the lists is a common exam trap.',
    explanation_ja:
      '2つの宛先リストを分けて覚える。Data Action のターゲットはプラットフォームイベント、Webhook、Marketing Cloud で、これらはイベント通知を運ぶ。アクティベーションターゲットはセグメントのメンバーと属性の宛先であり、Marketing Cloud Engagement と Personalization、広告オーディエンス、Salesforce CRM、S3、SFTP などがある。この2つを混同するのは試験でよくある罠である。',
    reference:
      '💡 Data actions notify that something happened. Activations deliver who is in a population.',
    reference_ja:
      '💡 Data Action は「何かが起きた」ことを通知する。アクティベーションは「誰が母集団に含まれるか」を届ける。',
  },
  {
    id: 'dc-act-6',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'Marketing reports that customers who purchased yesterday still appear in a "no purchase in 90 days" segment. Ingestion and identity resolution are both current. What is the most likely cause?',
    question_ja:
      'マーケティングから、昨日購入した顧客が「90日間購入なし」のセグメントに依然として含まれていると報告があった。取り込みと ID解決はいずれも最新である。最も可能性の高い原因はどれか。',
    options: [
      {
        text: 'The segment has not been republished since the purchases were ingested',
        text_ja: '購入データが取り込まれた後、セグメントが再公開されていない',
        correct: true,
        note: 'Correct. Membership is recalculated at publish time; a segment is not continuously live.',
        note_ja: '正解。メンバーシップは公開時に再計算される。セグメントは常時ライブではない。',
      },
      {
        text: 'The segment criteria reference the wrong DMO',
        text_ja: 'セグメントの条件が誤った DMO を参照している',
        correct: false,
        note: 'Possible in general, but the scenario points at freshness rather than at wrong logic.',
        note_ja: '一般にはあり得るが、シナリオが示しているのはロジックの誤りではなく鮮度。',
      },
      {
        text: 'Consent filtering is excluding the recent purchasers',
        text_ja: '同意によるフィルタが直近の購入者を除外している',
        correct: false,
        note: 'Consent filtering would remove people from the segment, not keep stale ones in it.',
        note_ja: '同意フィルタは人を除外する方向に働く。古いメンバーを残す方向ではない。',
      },
      {
        text: 'The activation target is misconfigured',
        text_ja: 'アクティベーションターゲットの設定が誤っている',
        correct: false,
        note: 'The target affects delivery, not the membership Data 360 calculates.',
        note_ja: 'ターゲットは配信に影響するもので、Data 360 が計算するメンバーシップには影響しない。',
      },
    ],
    explanation:
      'Segment membership is recalculated when the segment publishes, not continuously. Publish on a schedule for routine campaigns, or on demand when timing matters. Note that freshness is bounded by three independent schedules — ingestion, identity resolution and segment publishing — and the slowest one governs.',
    explanation_ja:
      'セグメントのメンバーシップは公開時に再計算されるのであって、常時再計算されるわけではない。定常的なキャンペーンはスケジュール公開、タイミングが重要なときはオンデマンド公開にする。なお鮮度は3つの独立したスケジュール（取り込み、ID解決、セグメント公開）で決まり、最も遅いものが全体を支配する。',
    reference:
      '💡 "The list looks out of date" with healthy upstream data is almost always a publish schedule question.',
    reference_ja:
      '💡 上流のデータが健全なのに「リストが古い」なら、ほぼ常に公開スケジュールの問題。',
  },
  {
    id: 'dc-act-7',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'A company wants to exclude existing customers from a paid acquisition campaign on Google and Meta. What is the standard approach?',
    question_ja:
      'ある企業が、Google と Meta の有料獲得キャンペーンから既存顧客を除外したい。標準的な方法はどれか。',
    options: [
      {
        text: 'Build a suppression segment of existing customers and activate it to the advertising targets',
        text_ja: '既存顧客のサプレッションセグメントを作り、広告のターゲットへアクティベートする',
        correct: true,
        note: 'Correct. Suppression is the standard pattern for excluding a population from targeting.',
        note_ja: '正解。サプレッションは、対象から母集団を除外する標準的な手段。',
      },
      {
        text: 'Ask the advertising agency to filter the audience manually',
        text_ja: '広告代理店に手作業でオーディエンスを絞り込んでもらう',
        correct: false,
        note: 'A manual process outside the platform, and the agency does not know who is a customer.',
        note_ja: 'プラットフォーム外の手作業であり、そもそも代理店は誰が顧客かを知らない。',
      },
      {
        text: 'Delete existing customers from Data 360 so they cannot be targeted',
        text_ja: 'ターゲティングされないよう、既存顧客を Data 360 から削除する',
        correct: false,
        note: 'Destroys the data needed for every other use case, including knowing who to suppress.',
        note_ja: '他のすべてのユースケースに必要なデータを破壊する。誰を除外すべきかを知る手段まで失う。',
      },
      {
        text: 'Create a data action that notifies the ad platform on each new customer',
        text_ja: '新規顧客が発生するたびに広告プラットフォームへ通知する Data Action を作成する',
        correct: false,
        note: 'Event notification does not manage an audience list, and ad platforms consume audiences, not events.',
        note_ja: 'イベント通知はオーディエンスリストを管理しない。広告プラットフォームが受け取るのはオーディエンスであってイベントではない。',
      },
    ],
    explanation:
      'Suppression is one of the canonical Data 360 use cases and often the recommended first project: it needs few sources, and the saving in wasted ad spend is directly measurable. Build the segment of people to exclude, activate it to the advertising targets, and the ad platform suppresses them.',
    explanation_ja:
      'サプレッションは Data 360 の代表的なユースケースであり、最初のプロジェクトとして推奨されることも多い。必要なソースが少なく、無駄な広告費の削減額が直接測定できるからである。除外すべき人のセグメントを作り、広告のターゲットへアクティベートすれば、広告プラットフォーム側で除外される。',
    reference:
      '💡 Suppression segments exclude a population. They are activated exactly like any other segment.',
    reference_ja:
      '💡 サプレッションセグメントは母集団を除外する。アクティベートの仕方は他のセグメントとまったく同じ。',
  },
  {
    id: 'dc-act-8',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'When configuring an activation, how should the consultant decide which attributes to include?',
    question_ja:
      'アクティベーションを設定する際、含める属性をどのように決めるべきか。',
    options: [
      {
        text: 'Send the minimum set the destination actually needs',
        text_ja: '宛先が実際に必要とする最小限のセットを送る',
        correct: true,
        note: 'Correct. Minimisation here is simultaneously a governance and a cost principle.',
        note_ja: '正解。ここでの最小化はガバナンスの原則であると同時にコストの原則。',
      },
      {
        text: 'Send every available attribute so the destination has maximum flexibility',
        text_ja: '宛先が最大限柔軟に使えるよう、利用可能なすべての属性を送る',
        correct: false,
        note: 'Exports personal data with no stated purpose, and increases cost for no benefit.',
        note_ja: '目的の定まらない個人データを送り出し、利益なくコストだけを増やす。',
      },
      {
        text: 'Send only the identifier, and let the destination look up the rest',
        text_ja: '識別子だけを送り、残りは宛先側で参照させる',
        correct: false,
        note: 'The destination usually cannot look anything up — that is precisely why attributes accompany members.',
        note_ja: '宛先は通常何も参照できない。だからこそ属性をメンバーに添えて送る。',
      },
      {
        text: 'Match the attribute list to whatever the previous activation used',
        text_ja: '直前のアクティベーションが使った属性リストに合わせる',
        correct: false,
        note: 'Copying a previous configuration is not a reason; each destination has its own needs.',
        note_ja: '過去の設定の踏襲は理由にならない。宛先ごとに必要なものは異なる。',
      },
    ],
    explanation:
      'You choose which attributes accompany segment members, and the rule is the minimum the destination needs. This limits what personal data leaves the platform, and it limits cost. Related attributes can bring in data from related objects — the most recent order, for example — but the same restraint applies.',
    explanation_ja:
      'セグメントのメンバーに添える属性は選択でき、原則は「宛先が必要とする最小限」である。これによりプラットフォームの外へ出る個人データを制限し、同時にコストも抑えられる。関連属性を使えば直近の注文など関連オブジェクトのデータも含められるが、同じ抑制が当てはまる。',
    reference:
      '💡 "Only these fields may leave the platform" → restrict the attributes in the activation. That is where the boundary is drawn.',
    reference_ja:
      '💡 「この項目だけが platform の外に出てよい」→アクティベーションの属性を限定する。境界はそこで引かれる。',
  },
  {
    id: 'dc-act-9',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A subscription company wants a Salesforce flow to check a customer\'s unified lifetime-value attribute mid-run, and branch to a retention path if it exceeds a threshold. The flow is triggered by a case update in the CRM.',
    scenario_ja:
      'あるサブスクリプション企業が、Salesforce のフローの実行中に顧客の統合済み生涯価値の属性を確認し、しきい値を超える場合はリテンションの分岐へ進ませたいと考えている。フローは CRM のケース更新で起動する。',
    question: 'What should the consultant use?',
    question_ja: 'コンサルタントは何を使うべきか。',
    options: [
      {
        text: 'An invocable action that queries Data 360 from within the flow',
        text_ja: 'フローの中から Data 360 を照会する Invocable Action',
        correct: true,
        note: 'Correct. Invocable actions let a running flow read a unified attribute before deciding a branch.',
        note_ja: '正解。Invocable Action により、実行中のフローが分岐の判断前に統合済みの属性を読める。',
      },
      {
        text: 'A Data Cloud-triggered flow',
        text_ja: 'Data Cloud 起動フロー',
        correct: false,
        note: 'That starts a flow from a Data 360 change. Here the flow is already running, started by a case update.',
        note_ja: 'それは Data 360 の変更からフローを開始するもの。ここではケース更新で既にフローが動いている。',
      },
      {
        text: 'A nightly activation writing lifetime value to every Contact record',
        text_ja: '毎晩、生涯価値をすべてのコンタクトレコードへ書き込むアクティベーション',
        correct: false,
        note: 'Workable but heavy-handed: it copies an attribute to every record to serve an occasional lookup.',
        note_ja: '機能はするが過剰。たまにしか参照しない属性を全レコードにコピーすることになる。',
      },
      {
        text: 'A data action with a webhook target',
        text_ja: 'Webhook をターゲットとする Data Action',
        correct: false,
        note: 'Sends an outbound notification; it does not answer a question asked from inside a running flow.',
        note_ja: '外向きの通知を送るもので、実行中のフローからの問い合わせに答えるものではない。',
      },
    ],
    explanation:
      'Note the direction of the interaction. A Data Cloud-triggered flow starts because Data 360 changed. An invocable action is the reverse: a flow that is already running asks Data 360 a question mid-execution. Here the flow is triggered by a CRM case update, so the invocable action is the fit.',
    explanation_ja:
      'やり取りの方向に注目する。Data Cloud 起動フローは、Data 360 が変化したことを契機に開始する。Invocable Action はその逆で、既に動いているフローが実行中に Data 360 へ問い合わせる。ここではフローは CRM のケース更新で起動しているため、Invocable Action が適合する。',
    reference:
      '💡 Data 360 starts the flow → Data Cloud-triggered flow. The flow asks Data 360 → invocable action.',
    reference_ja:
      '💡 Data 360 がフローを起動→Data Cloud 起動フロー。フローが Data 360 に問い合わせる→Invocable Action。',
  },
  {
    id: 'dc-act-10',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'On which object is a people-targeting segment normally built?',
    question_ja: '人を対象とするセグメントは通常どのオブジェクトの上に作られるか。',
    options: [
      {
        text: 'The Unified Individual DMO',
        text_ja: 'Unified Individual DMO',
        correct: true,
        note: 'Correct. It is the output of identity resolution, so counting it counts people rather than source rows.',
        note_ja: '正解。ID解決の出力なので、これを数えればソースの行ではなく人を数えることになる。',
      },
      {
        text: 'The source DLO from the CRM connector',
        text_ja: 'CRM コネクタのソース DLO',
        correct: false,
        note: 'Segmentation does not operate on DLOs at all; they must be mapped first.',
        note_ja: 'セグメンテーションはそもそも DLO に対して動かない。先にマッピングが必要。',
      },
      {
        text: 'The Contact Point Email DMO',
        text_ja: 'Contact Point Email DMO',
        correct: false,
        note: 'One person can hold several emails, so this would count contact points rather than people.',
        note_ja: '1人が複数のメールを持つため、これでは人ではなく Contact Point を数えることになる。',
      },
      {
        text: 'The activation target',
        text_ja: 'アクティベーションターゲット',
        correct: false,
        note: 'A destination system, not a segmentation base.',
        note_ja: '宛先システムであって、セグメントの基点ではない。',
      },
    ],
    explanation:
      'Segments are built on a segmentation-eligible DMO, and for people-targeting that is normally the Unified Individual. This is why unification has to work before segmentation is meaningful: building on a source DMO counts the same person once per system, and building on a contact point counts them once per email address.',
    explanation_ja:
      'セグメントはセグメント化可能な DMO の上に作られ、人を対象とする場合それは通常 Unified Individual である。だからこそ統合が機能していなければセグメンテーションに意味がない。ソース側の DMO に作れば同一人物をシステムごとに数え、Contact Point に作ればメールアドレスごとに数えてしまう。',
    reference:
      '💡 If the segment count looks like a row count rather than a person count, check the base DMO first.',
    reference_ja:
      '💡 セグメントの件数が人数ではなく行数に見えるなら、まず基点の DMO を確認する。',
  },
  {
    id: 'dc-act-11',
    domain: 'dc-activation',
    type: 'multi',
    question:
      'Which two are true about segment publishing? (Choose 2)',
    question_ja: 'セグメントの公開について正しいものを2つ選べ。',
    options: [
      {
        text: 'Membership is recalculated at publish time, on a schedule or on demand',
        text_ja: 'メンバーシップは公開時に、スケジュールまたはオンデマンドで再計算される',
        correct: true,
        note: 'Correct. A segment is not a continuously live query.',
        note_ja: '正解。セグメントは常時ライブなクエリではない。',
      },
      {
        text: 'Activations run when the segment publishes, so activation freshness is bounded by publish frequency',
        text_ja: 'アクティベーションはセグメントの公開時に実行されるため、鮮度は公開頻度が上限になる',
        correct: true,
        note: 'Correct. The destination cannot be fresher than the last publish.',
        note_ja: '正解。宛先の鮮度が最後の公開より新しくなることはない。',
      },
      {
        text: 'Publishing a segment triggers identity resolution to run',
        text_ja: 'セグメントの公開は ID解決の実行を起動する',
        correct: false,
        note: 'These are independent schedules; publishing does not trigger resolution.',
        note_ja: '両者は独立したスケジュール。公開が解決処理を起動することはない。',
      },
      {
        text: 'Segments can span multiple data spaces',
        text_ja: 'セグメントは複数のデータスペースをまたげる',
        correct: false,
        note: 'Segments are scoped to a data space, which is what makes spaces an effective separation control.',
        note_ja: 'セグメントはデータスペース単位。だからこそデータスペースが有効な分離の統制手段になる。',
      },
      {
        text: 'A published segment automatically creates its own activation target',
        text_ja: '公開されたセグメントは自動的に専用のアクティベーションターゲットを作成する',
        correct: false,
        note: 'Targets are created deliberately, before the activation that references them.',
        note_ja: 'ターゲットは意図的に、それを参照するアクティベーションより前に作成する。',
      },
    ],
    explanation:
      'Publishing recalculates membership and drives the activations attached to the segment. Three independent schedules govern end-to-end freshness — ingestion, identity resolution and segment publishing — and the destination is only ever as current as the slowest of the three.',
    explanation_ja:
      '公開はメンバーシップを再計算し、そのセグメントに紐づくアクティベーションを駆動する。エンドツーエンドの鮮度は3つの独立したスケジュール（取り込み、ID解決、セグメント公開）で決まり、宛先の鮮度は常にその中で最も遅いものに合わせられる。',
    reference:
      '💡 End-to-end latency = ingestion schedule + resolution schedule + publish schedule. Add them up when a scenario states a deadline.',
    reference_ja:
      '💡 エンドツーエンドの遅延＝取り込み間隔＋解決間隔＋公開間隔。期限が示されたシナリオでは足し合わせて考える。',
  },
  {
    id: 'dc-act-12',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A retailer runs the same "lapsed customer" criteria inside four different segments, each activated to a different channel. When the definition of "lapsed" changes from 90 to 120 days, all four have to be edited, and one is missed.',
    scenario_ja:
      'ある小売企業が、同じ「休眠顧客」の条件を4つの異なるセグメントの中で使っており、それぞれ別のチャネルへアクティベートしている。「休眠」の定義が90日から120日に変わったとき、4つすべてを編集する必要があり、1つが漏れてしまった。',
    question: 'What should the consultant recommend?',
    question_ja: 'コンサルタントは何を推奨すべきか。',
    options: [
      {
        text: 'Define "lapsed" once — as a reusable segment or a calculated insight — and reference it from the four segments',
        text_ja: '「休眠」を1度だけ定義し（再利用可能なセグメントまたは Calculated Insight として）、4つのセグメントからそれを参照する',
        correct: true,
        note: 'Correct. One definition, many consumers — the change then happens in exactly one place.',
        note_ja: '正解。定義は1つ、利用者は複数。変更は正確に1箇所で済む。',
      },
      {
        text: 'Introduce a review checklist so nobody forgets to update all four',
        text_ja: '4つすべての更新を忘れないよう、レビューのチェックリストを導入する',
        correct: false,
        note: 'A process patch over a design problem. It will fail again the next time someone is rushed.',
        note_ja: '設計上の問題をプロセスで覆い隠しているだけ。次に誰かが急いだときにまた破綻する。',
      },
      {
        text: 'Merge the four segments into one and activate it to all four channels',
        text_ja: '4つのセグメントを1つに統合し、4つのチャネルすべてへアクティベートする',
        correct: false,
        note: 'Only valid if the four genuinely target identical populations, which the scenario does not say.',
        note_ja: '4つが本当に同一の母集団を対象としている場合にのみ妥当だが、シナリオはそう述べていない。',
      },
      {
        text: 'Accept the duplication, since segment criteria are cheap to maintain',
        text_ja: 'セグメントの条件は維持コストが低いので、重複をそのまま受け入れる',
        correct: false,
        note: 'The scenario has already demonstrated the cost: one segment now targets the wrong population.',
        note_ja: 'シナリオが既にそのコストを示している。1つのセグメントが誤った母集団を対象にしてしまった。',
      },
    ],
    explanation:
      'Nested and related segments let you reuse a definition instead of restating criteria in several places, and a calculated insight does the same for a derived metric. Restating the same logic in four places guarantees they will eventually disagree — which is exactly what happened here.',
    explanation_ja:
      'ネストしたセグメントや関連セグメントを使えば、複数箇所で条件を書き直さずに定義を再利用できる。導出指標については Calculated Insight が同じ役割を果たす。同じロジックを4箇所に書けば、いずれ食い違うことが保証される。ここで起きたのはまさにそれである。',
    reference:
      '💡 Reuse the definition, not the criteria. Duplicated logic is a defect waiting for a requirement change.',
    reference_ja:
      '💡 条件文ではなく定義を再利用する。重複したロジックは、要件変更を待っている不具合。',
  },
  {
    id: 'dc-act-13',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'Which statement about consent in Data 360 is correct?',
    question_ja: 'Data 360 における同意に関する記述として正しいものはどれか。',
    options: [
      {
        text: 'Consent attaches to the contact point, so someone can be opted in for email and opted out for SMS',
        text_ja: '同意は Contact Point に紐づくため、メールはオプトイン、SMS はオプトアウトという状態があり得る',
        correct: true,
        note: 'Correct. This is why contact points are separate DMOs rather than fields on Individual.',
        note_ja: '正解。Contact Point が Individual の項目ではなく別 DMO である理由がこれ。',
      },
      {
        text: 'Consent is a single flag on the unified individual covering all channels',
        text_ja: '同意は統合プロファイル上の単一のフラグで、全チャネルを対象とする',
        correct: false,
        note: 'That model cannot represent channel-specific preferences, which are the normal case.',
        note_ja: 'そのモデルではチャネルごとの選好を表現できない。実際にはそれが普通。',
      },
      {
        text: 'Consent applies only to ingested data, not to federated Zero Copy data',
        text_ja: '同意は取り込んだデータにのみ適用され、Zero Copy の連携データには適用されない',
        correct: false,
        note: 'Governance applies identically regardless of how the data is accessed.',
        note_ja: 'データへのアクセス方法に関わらず、ガバナンスは同じように適用される。',
      },
      {
        text: 'Consent is enforced automatically on every activation without configuration',
        text_ja: '同意は設定なしにすべてのアクティベーションで自動的に強制される',
        correct: false,
        note: 'You must model consent and filter on it. It is not applied for you by default.',
        note_ja: '同意はモデル化してフィルタに使う必要がある。既定で自動適用されるわけではない。',
      },
    ],
    explanation:
      'Consent lives with the contact point, not with the person as a whole, which is precisely why email, phone and address are modelled as separate DMOs. And consent is not automatic: you model it and filter on it inside the segment or the activation, so that the platform enforces the rule rather than a person remembering it.',
    explanation_ja:
      '同意は人全体ではなく Contact Point に紐づく。メール・電話・住所が別々の DMO としてモデル化されているのはまさにそのためである。また同意は自動ではない。モデル化したうえでセグメントまたはアクティベーションの内側で絞り込み、人の記憶ではなくプラットフォームがルールを強制するようにする。',
    reference:
      '💡 Consent applies to federated data too. Zero Copy changes where data lives, not what you may do with it.',
    reference_ja:
      '💡 同意は連携データにも適用される。Zero Copy が変えるのはデータの所在であって、扱ってよい範囲ではない。',
  },
  {
    id: 'dc-act-14',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'A company wants CRM users to see which marketing segments a contact belongs to, so they can tailor conversations. What approach fits?',
    question_ja:
      'ある企業が、CRM のユーザーが会話を調整できるよう、コンタクトが所属するマーケティングセグメントを見られるようにしたい。適した方法はどれか。',
    options: [
      {
        text: 'Activate the segment to Salesforce CRM so membership is written back and visible to users',
        text_ja: 'セグメントを Salesforce CRM へアクティベートし、所属が書き戻されてユーザーに見えるようにする',
        correct: true,
        note: 'Correct. Salesforce CRM is a valid activation target, and writing membership back closes the loop.',
        note_ja: '正解。Salesforce CRM は有効なアクティベーションターゲットであり、所属の書き戻しがループを閉じる。',
      },
      {
        text: 'Give every CRM user a Data Cloud Marketing Admin permission set',
        text_ja: 'すべての CRM ユーザーに Data Cloud Marketing Admin 権限セットを付与する',
        correct: false,
        note: 'Massive over-provisioning, and it sends users to a different application to see one fact.',
        note_ja: '極端な過剰付与であり、1つの情報を見るためにユーザーを別アプリへ行かせることになる。',
      },
      {
        text: 'Email the segment list to the sales team weekly',
        text_ja: '毎週、セグメントのリストを営業チームへメールで送る',
        correct: false,
        note: 'An ungoverned copy that goes stale immediately and cannot be used during a live conversation.',
        note_ja: '即座に古くなる統制されていないコピーであり、会話中には使えない。',
      },
      {
        text: 'Create a data action per segment targeting a webhook',
        text_ja: 'セグメントごとに Webhook を対象とする Data Action を作成する',
        correct: false,
        note: 'Data actions notify on events; they are not how you display ongoing membership in CRM.',
        note_ja: 'Data Action はイベントを通知するもの。CRM で継続的な所属を表示する手段ではない。',
      },
    ],
    explanation:
      'Salesforce CRM is itself an activation target, and writing segment membership back is the standard way to let CRM users act on it. This is the final step of closing the loop — and ideally the outcome of what they do next flows back into Data 360 as engagement data, so the next segment is better informed than the last.',
    explanation_ja:
      'Salesforce CRM 自体がアクティベーションターゲットであり、セグメントの所属を書き戻すことが、CRM のユーザーがそれをもとに行動できるようにする標準的な方法である。これがループを閉じる最後の段階であり、理想的にはその後の行動の結果がエンゲージメントデータとして Data 360 に戻り、次のセグメントがより良い情報に基づくものになる。',
    reference:
      '💡 Close the loop: activate out, then bring the outcome back in as engagement data.',
    reference_ja:
      '💡 ループを閉じる：外へアクティベートし、その結果をエンゲージメントデータとして戻す。',
  },
  {
    id: 'dc-act-15',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A media company needs to notify an external subscription platform, which is not built on Salesforce, whenever a viewer\'s engagement score drops below a churn threshold.',
    scenario_ja:
      'あるメディア企業が、視聴者のエンゲージメントスコアが解約のしきい値を下回った際に、Salesforce 上に構築されていない外部のサブスクリプション基盤へ通知する必要がある。',
    question: 'What should the consultant configure?',
    question_ja: 'コンサルタントは何を設定すべきか。',
    options: [
      {
        text: 'A data action with a webhook target',
        text_ja: 'Webhook をターゲットとする Data Action',
        correct: true,
        note: 'Correct. Webhook is the data action route to a system that is not Salesforce.',
        note_ja: '正解。Webhook は Salesforce 以外のシステムへ向かう Data Action の経路。',
      },
      {
        text: 'A data action with a platform event target',
        text_ja: 'プラットフォームイベントをターゲットとする Data Action',
        correct: false,
        note: 'Platform Event is the route into Salesforce automation; the destination here is external.',
        note_ja: 'プラットフォームイベントは Salesforce の自動化への経路。ここでの宛先は外部システム。',
      },
      {
        text: 'An activation to an SFTP target with a nightly file',
        text_ja: '夜間ファイルによる SFTP ターゲットへのアクティベーション',
        correct: false,
        note: 'Population-shaped and delayed; the requirement is a per-viewer event notification.',
        note_ja: '母集団の形をしていて遅延もある。要件は視聴者単位のイベント通知。',
      },
      {
        text: 'Zero Copy data sharing to the subscription platform',
        text_ja: 'サブスクリプション基盤への Zero Copy データ共有',
        correct: false,
        note: 'Sharing exposes data for querying; it does not push a notification when a threshold is crossed.',
        note_ja: '共有はクエリ用にデータを公開するもので、しきい値超過時に通知を送るものではない。',
      },
    ],
    explanation:
      'Work through the two decisions. First, event or population? A threshold crossing for one viewer is an event, so this is data action territory. Second, which target? Platform Event reaches Salesforce automation, Webhook reaches an external system, and the destination here is explicitly not built on Salesforce.',
    explanation_ja:
      '2つの判断を順に行う。第一に、イベントか母集団か。1人の視聴者がしきい値を超えたのはイベントなので Data Action の領域である。第二に、どのターゲットか。プラットフォームイベントは Salesforce の自動化へ、Webhook は外部システムへ届く。ここでの宛先は明示的に Salesforce 上に構築されていない。',
    reference:
      '💡 Two questions, in order: is it an event or a population? Then: is the destination Salesforce or not?',
    reference_ja:
      '💡 順番に2つ問う：イベントか母集団か。次に、宛先は Salesforce かそれ以外か。',
  },
  {
    id: 'dc-act-16',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'What are related attributes in an activation used for?',
    question_ja: 'アクティベーションにおける関連属性は何のために使うか。',
    options: [
      {
        text: 'To include data from related objects, such as the most recent order, alongside the profile attributes',
        text_ja: '直近の注文など関連オブジェクトのデータを、プロファイルの属性とあわせて含めるため',
        correct: true,
        note: 'Correct. They enrich what the destination receives beyond the profile itself.',
        note_ja: '正解。プロファイル本体を超えて、宛先が受け取る内容を充実させる。',
      },
      {
        text: 'To relate two segments so they publish together',
        text_ja: '2つのセグメントを関連付けて同時に公開させるため',
        correct: false,
        note: 'That is not what related attributes do; segment reuse is handled by nested segments.',
        note_ja: '関連属性の役割ではない。セグメントの再利用はネストしたセグメントが担う。',
      },
      {
        text: 'To define which match rules apply to the activation',
        text_ja: 'アクティベーションに適用する一致ルールを定義するため',
        correct: false,
        note: 'Match rules belong to identity resolution, several stages earlier.',
        note_ja: '一致ルールは ID解決に属するもので、数段階前の話。',
      },
      {
        text: 'To specify the consent rules for each contact point',
        text_ja: '各 Contact Point の同意ルールを指定するため',
        correct: false,
        note: 'Consent is modelled as data and applied as a filter, not through related attributes.',
        note_ja: '同意はデータとしてモデル化しフィルタとして適用するもので、関連属性を通じてではない。',
      },
    ],
    explanation:
      'Activations carry segment members plus the attributes you select. Related attributes extend that selection to related objects, so a campaign can personalise on the customer\'s most recent order rather than on profile fields alone. The same minimisation principle applies — include what the destination genuinely needs.',
    explanation_ja:
      'アクティベーションはセグメントのメンバーと、選択した属性を運ぶ。関連属性はその選択を関連オブジェクトへ広げるもので、プロファイルの項目だけでなく顧客の直近の注文などでキャンペーンをパーソナライズできる。ここでも最小化の原則が当てはまる。宛先が本当に必要とするものだけを含める。',
    reference:
      '💡 Related attributes are still exported personal data. Select them with the same restraint as profile attributes.',
    reference_ja:
      '💡 関連属性も外部へ出る個人データ。プロファイルの属性と同じ抑制をもって選ぶ。',
  },
  {
    id: 'dc-act-17',
    domain: 'dc-activation',
    type: 'mcq',
    question:
      'A scenario requires sending a monthly newsletter to all customers in a loyalty tier. Which mechanism fits?',
    question_ja:
      'あるロイヤルティランクのすべての顧客へ月次のニュースレターを送る必要がある。適した仕組みはどれか。',
    options: [
      {
        text: 'A segment published monthly, activated to Marketing Cloud Engagement',
        text_ja: '月次で公開するセグメントを Marketing Cloud Engagement へアクティベートする',
        correct: true,
        note: 'Correct. A population on a schedule is exactly what segmentation plus activation is for.',
        note_ja: '正解。スケジュールに沿った母集団こそ、セグメント＋アクティベーションの用途。',
      },
      {
        text: 'A data action with a Marketing Cloud target firing per customer',
        text_ja: '顧客ごとに発火する Marketing Cloud ターゲットの Data Action',
        correct: false,
        note: 'Data actions are event-shaped. Nothing is "happening" here — it is a scheduled population send.',
        note_ja: 'Data Action はイベントの形をしている。ここでは何も「起きて」いない。スケジュールされた母集団への送信。',
      },
      {
        text: 'A streaming insight over loyalty tier changes',
        text_ja: 'ロイヤルティランクの変更に対する Streaming Insight',
        correct: false,
        note: 'Real-time machinery for a monthly requirement; the value does not decay in minutes.',
        note_ja: '月次の要件にリアルタイムの仕組みを持ち込んでいる。この値は数分で失われはしない。',
      },
      {
        text: 'A Data Cloud-triggered flow per customer',
        text_ja: '顧客ごとの Data Cloud 起動フロー',
        correct: false,
        note: 'Again event-shaped, and it would run per record change rather than once a month.',
        note_ja: 'これもイベントの形で、月1回ではなくレコードの変更ごとに動いてしまう。',
      },
    ],
    explanation:
      'This is the plain segmentation-and-activation case, and it is worth recognising quickly so that the real-time machinery is not applied where it does not belong. Segment plus activation for "send this population a campaign"; data action or triggered flow for "when this happens, do that".',
    explanation_ja:
      'これは素直なセグメント＋アクティベーションの事例であり、すぐに見抜けるようにしておく価値がある。そうすればリアルタイムの仕組みを不適切な場面に持ち込まずに済む。「この母集団にキャンペーンを送る」ならセグメント＋アクティベーション、「これが起きたらあれをする」なら Data Action か起動フローである。',
    reference:
      '💡 Not every requirement needs real-time. Applying streaming machinery to a monthly send is over-engineering.',
    reference_ja:
      '💡 すべての要件がリアルタイムを必要とするわけではない。月次の送信にストリーミングを持ち込むのは過剰設計。',
  },
  {
    id: 'dc-act-18',
    domain: 'dc-activation',
    type: 'scenario',
    scenario:
      'A consultant is asked to activate a segment containing 40 profile attributes to an advertising platform that only needs a hashed email address to build the audience.',
    scenario_ja:
      'コンサルタントが、オーディエンス構築にハッシュ化されたメールアドレスしか必要としない広告プラットフォームへ、40のプロファイル属性を含むセグメントをアクティベートするよう依頼された。',
    question: 'What should the consultant do?',
    question_ja: 'コンサルタントは何をすべきか。',
    options: [
      {
        text: 'Include only the attributes the platform needs, and raise the discrepancy with the requester',
        text_ja: 'そのプラットフォームが必要とする属性だけを含め、依頼者に食い違いを指摘する',
        correct: true,
        note: 'Correct. Send the minimum the destination needs, and surface the mismatch rather than silently complying.',
        note_ja: '正解。宛先が必要とする最小限を送り、黙って従うのではなく食い違いを表面化させる。',
      },
      {
        text: 'Include all 40 attributes as requested, since the requester specified them',
        text_ja: '依頼者が指定した以上、要求どおり40属性すべてを含める',
        correct: false,
        note: 'Exports 39 unnecessary personal attributes to a third party with no purpose for them.',
        note_ja: '第三者に対し、用途のない39個の個人属性を不必要に送り出すことになる。',
      },
      {
        text: 'Include all 40 but rely on the platform to ignore what it does not use',
        text_ja: '40すべてを含め、使わない分はプラットフォーム側が無視することに期待する',
        correct: false,
        note: 'The data has still left the platform. What the recipient does with it is not a control.',
        note_ja: 'データは既にプラットフォームの外へ出ている。受け取った側の扱いは統制にならない。',
      },
      {
        text: 'Decline the activation entirely',
        text_ja: 'アクティベーション自体を断る',
        correct: false,
        note: 'Disproportionate. The requirement is legitimate; only the attribute list is wrong.',
        note_ja: '過剰。要件自体は正当で、誤っているのは属性リストだけ。',
      },
    ],
    explanation:
      'You choose which attributes accompany segment members, and the rule is the minimum the destination actually needs. Sending 40 when one is required exports personal data with no stated purpose — a data ethics failure as well as an unnecessary cost. Raising the discrepancy is part of the consultant\'s job, not an escalation.',
    explanation_ja:
      'セグメントのメンバーに添える属性は選択でき、原則は「宛先が実際に必要とする最小限」である。1つで足りるところに40を送るのは、目的の定まらない個人データを送り出すことであり、データ倫理上の失敗であると同時に不要なコストでもある。食い違いを指摘することはコンサルタントの職務であって、エスカレーションではない。',
    reference:
      '💡 Minimisation is not only about ingestion. It applies just as strongly at the point data leaves the platform.',
    reference_ja:
      '💡 最小化は取り込みだけの話ではない。データがプラットフォームを出る地点にも同じ強さで当てはまる。',
  },
]
