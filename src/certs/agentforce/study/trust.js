export const trustStudy = {
  intro:
    'Two separate questions decide the security posture of an agent: who it runs as, and what leaves the platform. The first is answered by the security context — the logged-in user for employee agents, a dedicated agent user for public ones. The second is answered by the Einstein Trust Layer. Confusing masking with zero data retention is the most common mistake in this unit.',
  intro_ja:
    'エージェントのセキュリティ姿勢は、2つの別々の問いで決まります。「誰として動作するか」と「何がプラットフォームの外へ出るか」です。前者はセキュリティコンテキスト（従業員向けはログインユーザー、公開向けは専用エージェントユーザー）が、後者は Einstein Trust Layer が答えます。この単元で最も多い誤りは、マスキングとゼロデータ保持の混同です。',
  sections: [
    {
      heading: 'Security context: who the agent runs as',
      heading_ja: 'セキュリティコンテキスト：エージェントは誰として動作するか',
      body:
        'An agent does not have magical access. It reads data as some user, and which user that is depends on whether there is a logged-in person on the other end of the conversation. This single distinction answers a surprising number of questions.',
      body_ja:
        'エージェントが特別なアクセス権を持つわけではありません。何らかのユーザーとしてデータを読み、それが誰になるかは、会話の相手側にログインした人がいるかどうかで決まります。この1つの区別で、驚くほど多くの設問に答えられます。',
      figure: 'af-security-context',
      points: [
        'Employee (internal) agent — runs in the security context of the logged-in user. It inherits that user\'s sharing rules and field-level security, so two users legitimately receive different sets of records for the same question.',
        'Public or unauthenticated agent — there is no logged-in user, so the agent runs as a dedicated agent user configured for it. That user\'s permissions define the entire data boundary for every anonymous visitor.',
        'Because the agent user is the boundary for a public agent, its access must be scoped to the minimum necessary. Over-granting it is how internal data ends up in customer-facing answers.',
        'Actions run in the same security context. "The flow works when a person runs it but fails for the agent with an access error" always means the agent user lacks access to the flow or to the records it touches.',
        'The agent user and its permission assignments are environment-specific. They do not travel with a metadata deployment and must be configured in every org.',
        'Neither the builder\'s permissions nor a system administrator\'s are used at run time. Those are never the right answer.',
      ],
      points_ja: [
        '従業員向け（社内）エージェント — ログインユーザーのセキュリティコンテキストで動作する。そのユーザーの共有ルールと項目レベルセキュリティを継承するため、同じ質問でも2人のユーザーが異なるレコード集合を受け取るのは正常な動作。',
        '公開・未認証エージェント — ログインユーザーがいないため、そのために構成された専用エージェントユーザーとして動作する。そのユーザーの権限が、すべての匿名訪問者に対するデータ境界を規定する。',
        '公開エージェントではエージェントユーザーが境界そのものなので、そのアクセス権は必要最小限に絞る必要がある。過剰に付与すると、社内データが顧客向けの回答に混入する。',
        'アクションも同じセキュリティコンテキストで実行される。「人が実行すると動くのに、エージェントだとアクセスエラーで失敗する」は常に、エージェントユーザーがフローまたはそれが触れるレコードへのアクセス権を欠いていることを意味する。',
        'エージェントユーザーとその権限割り当ては環境固有。メタデータ展開では移送されず、すべての組織で構成する必要がある。',
        '構築者の権限もシステム管理者の権限も実行時には使われない。これらが正解になることはない。',
      ],
    },
    {
      heading: 'The Einstein Trust Layer',
      heading_ja: 'Einstein Trust Layer',
      body:
        'The Trust Layer is a set of distinct controls, each addressing a different risk. The exam tests whether you can name the right one for a described risk, and the distractors are always the other Trust Layer features. Learn them by what each one prevents.',
      body_ja:
        'Trust Layer は、それぞれ異なるリスクに対応する複数の独立した制御の集合です。試験では、提示されたリスクに対して正しいものを選べるかが問われ、誤答の選択肢は常に他の Trust Layer 機能です。「それぞれが何を防ぐか」で覚えます。',
      figure: 'af-trust-layer',
      points: [
        'Data masking — replaces sensitive values with placeholders before the prompt leaves the platform, then restores them in the response. Use when specific values (passport numbers, salaries) must never reach the model provider.',
        'Zero data retention — the provider does not store what it receives. Note carefully: the data is still transmitted. This is not the same as masking.',
        'Toxicity detection — screens generated content for harmful language.',
        'Prompt defence — resists prompt injection, where a user pastes text instructing the agent to ignore its instructions or reveal its configuration.',
        'Audit trail — records what happened. It is a governance artefact, not a preventive control and not a design-time tool.',
        'Memory aid: masking = does not leave. Zero data retention = leaves but is not kept. Prompt defence = attacks on the instructions. Toxicity = harmful output. Audit trail = the record.',
      ],
      points_ja: [
        'データマスキング — プロンプトがプラットフォームを離れる前に機密値をプレースホルダへ置換し、応答時に復元する。特定の値（パスポート番号、給与など）をモデルプロバイダーに決して届かせたくない場合に使う。',
        'ゼロデータ保持 — プロバイダーが受け取ったものを保存しない。注意：データ自体は送信される。マスキングとは別物。',
        '毒性検出 — 生成された内容に有害な表現がないか検査する。',
        'プロンプト防御 — プロンプトインジェクション（指示を無視させたり構成を暴露させたりするテキストの貼り付け）に抵抗する。',
        '監査証跡 — 何が起きたかを記録する。ガバナンス上の成果物であり、予防的な制御でも設計時のツールでもない。',
        '暗記のコツ：マスキング＝外へ出ない。ゼロデータ保持＝出るが保存されない。プロンプト防御＝指示への攻撃。毒性検出＝有害な出力。監査証跡＝記録。',
      ],
    },
    {
      heading: 'Permissions and least privilege (deep dive)',
      heading_ja: '権限と最小権限（深掘り）',
      body:
        'Generative features are permission-gated. The exam repeatedly presents a scenario where one group should be able to use a capability but not build it, and the correct answer is always the narrow, purpose-built permission rather than a sweeping grant.',
      body_ja:
        '生成系機能は権限で制御されています。試験では「あるグループには機能を使わせたいが作らせたくない」という場面が繰り返し出題され、正解は常に広範な付与ではなく、目的に沿った狭い権限です。',
      points: [
        'Using a prompt template and managing prompt templates are separate permissions. Grant only the former to consumers.',
        'Modify All Data is never the answer to a feature-access question. If it appears as an option in a permissions scenario, it is a distractor.',
        '"No permission is needed" is also wrong: generative features are not open by default.',
        'When a requirement is absolute and org-wide — "this model must never be used anywhere" — the control has to be org-wide too. Disable the model at the org level rather than editing every template that references it.',
        'Cleaning up individual items is enumeration, not enforcement. A new template created next month would reintroduce the risk.',
        'Security boundaries are permissions and scope. Instructions are guidance, and guidance is not a boundary — telling an agent "never mention costs" does not stop it reading cost data it has access to.',
      ],
      points_ja: [
        'プロンプトテンプレートの「利用」と「管理」は別々の権限。利用者には前者だけを付与する。',
        'Modify All Data が機能アクセスの設問の答えになることはない。権限系の場面で選択肢に出てきたら誤答。',
        '「権限は不要」も誤り。生成系機能は既定で誰でも使えるわけではない。',
        '要件が絶対的かつ組織全体に及ぶ場合（「このモデルはどこでも決して使わせない」）、制御も組織全体でなければならない。参照している全テンプレートを編集するのではなく、組織レベルでモデルを無効化する。',
        '個別項目の掃除は「列挙」であって「強制」ではない。来月新しく作られるテンプレートでリスクが再発する。',
        'セキュリティの境界は権限とスコープ。指示は案内であり、案内は境界にならない。「原価に言及するな」と伝えても、アクセスできる原価データを読むこと自体は止められない。',
      ],
    },
  ],
}
