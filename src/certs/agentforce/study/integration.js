export const integrationStudy = {
  intro:
    'This is the smallest unit and the most mechanical to learn. Four connection mechanisms exist, and each is chosen by what sits on the other end: an external tool platform, another agent, a plain API, or an application calling in. Add channels — where the agent is reachable — and escalation, and the unit is covered.',
  intro_ja:
    'この単元は最も小さく、覚え方も最も機械的です。接続の仕組みは4つあり、いずれも「相手側が何か」で決まります。外部のツール基盤、別のエージェント、通常のAPI、そして呼び出してくる側のアプリケーションです。これにチャネル（エージェントにどこから到達できるか）とエスカレーションを加えれば、この単元は網羅できます。',
  sections: [
    {
      heading: 'Four connection mechanisms',
      heading_ja: '4つの接続の仕組み',
      body:
        'Identify the counterparty and the mechanism follows. Note that direction matters too: MCP and A2A are outbound from your agent, while the Agent API is the inbound path into it.',
      body_ja:
        '相手が誰かを特定すれば、仕組みは自ずと決まります。向きも重要です。MCP と A2A は自社エージェントからの外向き、Agent API はエージェントへの内向き（受け口）です。',
      figure: 'af-integration-map',
      points: [
        'MCP (Model Context Protocol) — standardises how an agent connects to external tools and data sources. Choose it when a third-party platform exposes an MCP-compatible tool surface.',
        'A2A (agent to agent) — standardises delegation between agents, including agents owned by other teams or companies. Choose it when the counterparty is itself an agent and you expect a result back.',
        'Agent API — the inbound path. Use it when an application you build and own needs to hold a conversation with your agent, such as a custom mobile app.',
        'Action over an external service or Apex — use it when the counterparty is an ordinary API your company already exposes, with no MCP surface involved.',
        'Counterparty test: tool or data source → MCP. Another agent → A2A. Your own app calling in → Agent API. A plain existing API → an action.',
        'Watch for distractors. "SOMA" is not an Agentforce protocol. "Only flows can reach external systems" is false. "MCP is the universal connector" is false.',
      ],
      points_ja: [
        'MCP（Model Context Protocol） — エージェントが外部のツールやデータソースへ接続する方法を標準化する。サードパーティが MCP 対応のツール面を公開している場合に選ぶ。',
        'A2A（agent to agent） — エージェント間の委譲を標準化する。他チームや他社が所有するエージェントも含む。相手自身がエージェントで、結果を受け取ることを期待する場合に選ぶ。',
        'Agent API — 内向きの経路。自社で開発・所有するアプリケーション（カスタムモバイルアプリなど）がエージェントと会話する必要がある場合に使う。',
        '外部サービスまたは Apex によるアクション — 相手が自社がすでに公開している通常のAPIで、MCP 面が関与しない場合に使う。',
        '相手で判定：ツールまたはデータソース→MCP。別のエージェント→A2A。自社アプリからの呼び出し→Agent API。既存の通常API→アクション。',
        '誤答に注意。「SOMA」は Agentforce のプロトコルではない。「外部システムに到達できるのはフローだけ」は誤り。「MCP は汎用コネクタ」も誤り。',
      ],
    },
    {
      heading: 'Channels and escalation',
      heading_ja: 'チャネルとエスカレーション',
      body:
        'Channels decide where an agent can be reached; escalation decides when it hands the conversation to a person. Both are configuration decisions, and both attract distractors that confuse a control with a measurement.',
      body_ja:
        'チャネルはエージェントにどこから到達できるかを決め、エスカレーションはいつ会話を人へ引き渡すかを決めます。どちらも構成上の判断であり、どちらも「制御」と「測定」を取り違えさせる誤答を伴います。',
      points: [
        'Channels are the pre-built surfaces you publish an agent to: the Salesforce app, Slack, a website, and so on. Publishing scope is what makes an agent available in one place and nowhere else.',
        'When the surface is an application you build yourself, that is not a channel — use the Agent API.',
        'Escalation is a configured action, invoked when defined conditions are met. One escalation action can serve several trigger conditions.',
        'Note how trigger conditions mix: "the customer is distressed" needs judgement and suits a prompt instruction, while "asked three times without resolution" is countable and can be deterministic.',
        'Containment rate is not a control. Setting a containment target to zero does not cause escalations; containment is measured after the fact.',
        'Deactivating the agent or removing a topic are not escalation designs. They remove the capability instead of routing it.',
      ],
      points_ja: [
        'チャネルはエージェントを公開する既製の接点。Salesforce アプリ、Slack、Webサイトなど。公開範囲によって、ある場所でだけ利用可能にできる。',
        '接点が自社で開発するアプリケーションの場合、それはチャネルではない。Agent API を使う。',
        'エスカレーションは構成済みのアクションで、定義された条件を満たしたときに実行される。1つのエスカレーションアクションが複数の発動条件に対応できる。',
        '発動条件の性質は混在する点に注意。「顧客が動揺している」は判断を要するのでプロンプト指示向き、「解決せず3回尋ねた」は数えられるので決定的にできる。',
        '封じ込め率は制御ではない。封じ込め目標をゼロに設定してもエスカレーションは起きない。封じ込めは事後に測定される。',
        'エージェントの非アクティブ化やトピックの削除はエスカレーションの設計ではない。振り分けるのではなく機能を取り去っているだけ。',
      ],
    },
    {
      heading: 'Multi-agent architecture (deep dive)',
      heading_ja: 'マルチエージェントのアーキテクチャ（深掘り）',
      body:
        'As an estate grows, a single agent with dozens of topics becomes hard to route reliably. The supervisor pattern raises the same classification idea one level: instead of choosing a topic, a supervisor agent chooses a specialist agent.',
      body_ja:
        '規模が大きくなると、数十のトピックを持つ単一のエージェントでは確実なルーティングが難しくなります。スーパーバイザーパターンは、同じ分類の発想を一段上へ引き上げます。トピックを選ぶ代わりに、スーパーバイザーエージェントが専門エージェントを選ぶのです。',
      points: [
        'A supervisor agent routes requests by reasoning over each specialist agent\'s declared scope — the same classification mechanism as topic selection, one level up.',
        'Specialist agents do not need to live in separate orgs. Keeping them in one org lets them share that org\'s data, security model and governance.',
        'Delegation within one org is native. MCP is not required for it — MCP is for external tools and data.',
        'A2A is the protocol when delegation crosses an organisational boundary, such as handing a question to an agent owned by another team or company.',
        'A supervisor agent can still have actions of its own; there is no restriction preventing that.',
      ],
      points_ja: [
        'スーパーバイザーエージェントは、各専門エージェントの宣言されたスコープを推論して要求を振り分ける。トピック選択と同じ分類の仕組みを一段上のレベルで使う。',
        '専門エージェントを別々の組織に置く必要はない。同一組織に置けば、その組織のデータ・セキュリティモデル・ガバナンスを共有できる。',
        '同一組織内の委譲はネイティブに行える。そのために MCP は不要。MCP は外部ツールとデータのためのもの。',
        '委譲が組織の境界をまたぐ場合（他チームや他社が所有するエージェントへ質問を渡す場合など）は A2A を使う。',
        'スーパーバイザーエージェント自身がアクションを持つことも可能。それを妨げる制限はない。',
      ],
    },
  ],
}
