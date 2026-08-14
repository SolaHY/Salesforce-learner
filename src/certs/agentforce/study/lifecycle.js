export const lifecycleStudy = {
  intro:
    'This unit covers everything after the agent is built: moving it between orgs, proving a change did not break anything, watching how it performs in production, and responding when something goes wrong. The most reliable way to answer these questions is to place each tool on a timeline — before release or after release — because the distractors are almost always tools from the other half.',
  intro_ja:
    'この単元は、エージェントを作り終えた後のすべてを扱います。組織間の移送、変更が何も壊していないことの証明、本番での挙動の監視、問題発生時の対応です。設問に確実に答えるコツは、各ツールを「リリース前かリリース後か」の時間軸に置くことです。誤答の選択肢は、ほぼ常にもう一方の半分に属するツールだからです。',
  sections: [
    {
      heading: 'Deployment: what travels and what does not',
      heading_ja: '展開：移送されるものとされないもの',
      body:
        'A metadata deployment moves definitions. It does not move environment configuration. Three specific failures follow from this, and each appears in the exam as a described symptom you must diagnose.',
      body_ja:
        'メタデータ展開が運ぶのは定義であり、環境の構成は運びません。ここから3つの特定の失敗が生じ、それぞれが「症状を読んで診断する」形で試験に出ます。',
      figure: 'af-deployment-gaps',
      points: [
        'Travels as metadata: the agent definition, its topics, its actions, the flows used as actions, and prompt templates.',
        'Does not travel: Data 360 configuration (data streams, mappings, indexes, retrievers) and the agent user with its permission assignments. Both must be established in the target org.',
        'Failure 1 — the agent does not respond at all. Agents deploy in an inactive state and must be activated in the target org. Deployment success only means the metadata arrived.',
        'Failure 2 — the agent talks but never returns grounded content. The Data 360 configuration it depends on does not exist in the target org.',
        'Failure 3 — a specific action fails with an access error, although the same flow works when a person runs it. The agent user lacks the permission assignments its sandbox counterpart had.',
        'Read the symptom carefully to tell these apart: silent → not activated; talks but knows nothing → Data 360 missing; access error on one action → agent user.',
      ],
      points_ja: [
        'メタデータとして移送されるもの：エージェント定義、そのトピック、アクション、アクションとして使うフロー、プロンプトテンプレート。',
        '移送されないもの：Data 360 の構成（データストリーム、マッピング、インデックス、リトリーバー）と、エージェントユーザーおよびその権限割り当て。どちらも対象組織で構築する必要がある。',
        '失敗1 — エージェントが一切応答しない。エージェントは非アクティブな状態で展開されるため、対象組織で有効化する必要がある。展開成功はメタデータが到着したことしか意味しない。',
        '失敗2 — 応答はするが、グラウンディングされたコンテンツを返さない。依存している Data 360 の構成が対象組織に存在しない。',
        '失敗3 — 特定のアクションがアクセスエラーで失敗する。ただし人が同じフローを実行すると動作する。エージェントユーザーに、サンドボックス側で付与されていた権限割り当てがない。',
        '症状を丁寧に読んで区別する：無反応→未有効化。話すが何も知らない→Data 360 未構築。特定アクションのアクセスエラー→エージェントユーザー。',
      ],
    },
    {
      heading: 'Testing Center: proving a change is safe',
      heading_ja: 'Testing Center：変更が安全であることの証明',
      body:
        'Testing Center gives you a repeatable measurement of agent quality. Because the input set is fixed, a difference in results before and after a change can be attributed to the change. This is the only tool on this exam that provides evidence *before* customers are exposed.',
      body_ja:
        'Testing Center は、エージェントの品質を反復的に測定する手段を提供します。入力セットが固定されているため、変更の前後で結果に差があれば、それは変更に起因すると判断できます。この試験で、顧客に晒す「前に」証拠を与えてくれる唯一のツールです。',
      points: [
        'A test case evaluates the whole decision path: the utterance, the topic the agent selected, the actions it invoked, and the response it produced.',
        'Evaluating only the final response would hide a case where the right answer was reached through the wrong topic — that path would break later.',
        'A suite is a representative set of utterances run after every change, with results compared before and after. That comparison is what makes regression detection possible.',
        'Adding actions to a topic widens the candidate set the reasoning engine chooses from, which can change previously stable answers. The disciplined first step is to run the existing suite and see exactly what regressed.',
        'Manual spot checks and production traffic are not repeatable, so they cannot serve as a baseline.',
        'The prompt-template equivalent of Testing Center is template preview. Both exist so you do not have to test on customers.',
      ],
      points_ja: [
        'テストケースは判断の経路全体を評価する。発話、エージェントが選んだトピック、実行したアクション、生成した応答。',
        '最終応答だけを評価すると、誤ったトピック経由でたまたま正答したケースを見逃す。その経路は後で必ず破綻する。',
        'スイートとは、変更のたびに実行する代表的な発話の集合で、結果を前後で比較する。この比較こそが退行検出を可能にする。',
        'トピックへのアクション追加は推論エンジンの選択候補を広げるため、それまで安定していた回答が変わることがある。規律ある最初の一手は、既存スイートを実行して何が退行したかを正確に把握すること。',
        '手作業の抜き取りチェックや本番トラフィックは反復可能でないため、基準線にならない。',
        'Testing Center に相当するプロンプトテンプレート側の仕組みがテンプレートプレビュー。どちらも「顧客でテストしなくて済む」ために存在する。',
      ],
    },
    {
      heading: 'Monitoring: transcripts, utterance analysis and containment rate',
      heading_ja: '監視：トランスクリプト、発話分析、封じ込め率',
      body:
        'After release, three tools answer three different questions. Matching the tool to the scope of the question — one conversation, many conversations, or overall effectiveness — is how these marks are earned.',
      body_ja:
        'リリース後は、3つのツールが3つの異なる問いに答えます。設問のスコープ（1件の会話か、多数の会話か、全体の効果か）にツールを対応づけることが得点につながります。',
      figure: 'af-monitoring-timeline',
      points: [
        'Conversation transcript — the per-session record showing utterances, the topics selected, the actions invoked and the responses. Use it when one specific customer complains about one specific conversation.',
        'Utterance analysis — aggregates what users actually asked and surfaces utterances where no topic matched. Use it to discover demand the agent cannot currently handle.',
        'Containment rate — the proportion of conversations completed without escalation to a human. It is the headline effectiveness metric, and it is measured, not configured.',
        'Metrics and diagnostics work as a pair: containment rate tells you something is wrong, utterance analysis tells you what.',
        'A rising no-match rate means configured coverage has not kept pace with real demand. Read the unmatched utterances, then extend an existing topic\'s scope or add a topic.',
        'Aggregate dashboards hide individual conversations; deployment history tells you what changed, not what was said. Neither substitutes for a transcript.',
      ],
      points_ja: [
        '会話トランスクリプト — セッション単位の記録で、発話・選択されたトピック・実行されたアクション・応答が確認できる。特定の顧客が特定の会話について苦情を申し立てた場合に使う。',
        '発話分析 — ユーザーが実際に尋ねた内容を集約し、どのトピックにも一致しなかった発話を可視化する。エージェントが現在処理できていない需要を発見するために使う。',
        '封じ込め率 — 人へエスカレーションせずに完了した会話の割合。代表的な効果指標であり、測定されるものであって設定するものではない。',
        '指標と診断は対で機能する。封じ込め率は「何かおかしい」ことを示し、発話分析は「何が」を教える。',
        '未一致率の上昇は、構成上のカバー範囲が実際の需要に追いついていないことを意味する。一致しなかった発話を読み、既存トピックのスコープを広げるか、トピックを追加する。',
        '集計ダッシュボードは個別の会話を隠し、デプロイ履歴は何が変わったかしか示さない。どちらもトランスクリプトの代わりにはならない。',
      ],
    },
    {
      heading: 'Incident response and governed change (deep dive)',
      heading_ja: 'インシデント対応と統制された変更（深掘り）',
      body:
        'Two situations need clear procedures: something is going wrong right now, and something needs to change safely. The exam has a firm view on both, and "edit production directly" is never the answer.',
      body_ja:
        '明確な手順が必要な状況が2つあります。いま何かが起きている場合と、何かを安全に変更する場合です。試験はどちらについても明確な立場を取っており、「本番を直接編集する」が正解になることはありません。',
      points: [
        'Incident: deactivate the agent. It stops customer exposure immediately, it is fully reversible, and it leaves the definition intact for diagnosis.',
        'Do not delete topics or actions to stop an incident. That destroys the evidence you need and creates rework.',
        'Do not lower a conversation limit as a containment measure. It reduces exposure without stopping it — customers still receive wrong information.',
        'Governed change: build and test in a lower environment, review, promote through a controlled release, and keep an auditable record of what changed.',
        'Disabling monitoring to keep the change log tidy destroys the traceability the requirement asks for. It is always a wrong answer.',
        'The full improvement loop: a metric falls → utterance analysis explains why → topics are extended or added → Testing Center verifies → a controlled release promotes the change → monitoring confirms the effect.',
      ],
      points_ja: [
        'インシデント時：エージェントを非アクティブ化する。顧客への影響を即座に止められ、完全に元へ戻せ、定義は調査のためにそのまま残る。',
        'インシデントを止めるためにトピックやアクションを削除してはいけない。必要な証拠を壊し、作り直しの手間を生む。',
        '封じ込め策として会話上限を下げてはいけない。影響を減らすだけで止められず、顧客は依然として誤った情報を受け取る。',
        '統制された変更：下位環境で作成・テストし、レビューし、統制されたリリースで昇格させ、変更内容の監査可能な記録を残す。',
        '変更ログを整然と保つために監視を無効化するのは、要件が求めている追跡可能性そのものを破壊する。常に誤答。',
        '改善サイクル全体：指標が低下→発話分析が理由を説明→トピックを拡張・追加→Testing Center で検証→統制されたリリースで昇格→監視で効果を確認。',
      ],
    },
  ],
}
