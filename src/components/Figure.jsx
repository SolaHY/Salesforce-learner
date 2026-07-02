// 学習インプット用の図解（インラインSVG）。
// study/*.js のセクションに figure: '<key>' を指定すると、その図がインプット内に表示される。
// 外部依存なし・テーマ配色に合わせた業務的なトーン。

const C = {
  text: '#1a1f2b',
  muted: '#5e6675',
  line: '#5e6675',
  border: '#c9d3e0',
  blue: '#1b7ced',
  blueDeep: '#0b5cb8',
  blueTint: '#eaf3fe',
  purple: '#7f56d9',
  purpleTint: '#f0eafc',
  green: '#2e844a',
  greenTint: '#e7f4ec',
  gold: '#b26a00',
  goldTint: '#fdf3e3',
  red: '#c23934',
  redTint: '#fdecec',
}

// 角丸ボックス＋中央寄せ複数行テキスト
function RBox({ x, y, w, h, fill = '#fff', stroke = C.border, lines = [], fs = 14, color = C.text, weight = 600, rx = 10 }) {
  const arr = Array.isArray(lines) ? lines : [lines]
  const startY = y + h / 2 - ((arr.length - 1) * fs * 1.3) / 2 + fs * 0.34
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1.5" />
      {arr.map((t, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={startY + i * fs * 1.3}
          textAnchor="middle"
          fontSize={i === 0 ? fs : fs - 1.5}
          fontWeight={i === 0 ? weight : 400}
          fill={i === 0 ? color : C.muted}
        >
          {t}
        </text>
      ))}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2, dashed = false, color = C.line }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="2"
      markerEnd="url(#ah)"
      strokeDasharray={dashed ? '6 4' : undefined}
    />
  )
}

function Cap({ x, y, children, anchor = 'middle', fs = 12, color = C.muted, weight = 400 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={fs} fill={color} fontWeight={weight}>
      {children}
    </text>
  )
}

function Diagram({ vw, vh, caption, children }) {
  return (
    <figure className="study-figure">
      <svg viewBox={`0 0 ${vw} ${vh}`} width="100%" role="img" aria-label={caption} preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="ah" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L7,3 L0,6 Z" fill={C.line} />
          </marker>
        </defs>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/* ============ 図解の定義 ============ */

// 共有・アクセスのピラミッド（基準から広げる）
function SecurityPyramid() {
  const bars = [
    { w: 250, fill: C.greenTint, stroke: C.green, t: '手動共有・チーム共有', s: '個別に追加' },
    { w: 350, fill: C.blueTint, stroke: C.blue, t: '共有ルール', s: '条件でまとめて公開' },
    { w: 450, fill: C.blueTint, stroke: C.blueDeep, t: 'ロール階層', s: '上位者は下位のデータを閲覧' },
    { w: 560, fill: '#e8edf5', stroke: C.blueDeep, t: 'OWD（組織の共有設定）', s: '最も制限的な「基準」' },
  ]
  const cx = 300
  let y = 18
  return (
    <Diagram vw={680} vh={288} caption="レコードアクセスは OWD（最も制限的な基準）から始まり、上の層ほどアクセスを「広げる」方向にのみ働く">
      {bars.map((b, i) => {
        const yy = y
        y += 62
        return <RBox key={i} x={cx - b.w / 2} y={yy} w={b.w} h={52} fill={b.fill} stroke={b.stroke} lines={[b.t, b.s]} fs={15} />
      })}
      <Arrow x1={628} y1={252} x2={628} y2={30} />
      <text x={648} y={140} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.green} transform="rotate(90 648 140)">
        アクセスを広げる
      </text>
    </Diagram>
  )
}

// プロファイル＋権限セット（加算モデル）
function PermissionStack() {
  return (
    <Diagram vw={680} vh={230} caption="プロファイル（基本）に権限セットを重ねて権限を「追加」する。権限セットで権限を減らすことはできない">
      <RBox x={30} y={60} w={170} h={110} fill={C.blueTint} stroke={C.blueDeep} lines={['プロファイル', '1人に1つ・基本の権限']} fs={15} />
      <text x={222} y={122} textAnchor="middle" fontSize={30} fill={C.muted} fontWeight={700}>＋</text>
      <RBox x={250} y={52} w={160} h={46} fill={C.greenTint} stroke={C.green} lines={['権限セットA']} fs={14} />
      <RBox x={250} y={106} w={160} h={46} fill={C.greenTint} stroke={C.green} lines={['権限セットB']} fs={14} />
      <text x={215} y={200} textAnchor="middle" fontSize={12.5} fill={C.muted}>（追加分・複数割り当て可）</text>
      <text x={438} y={122} textAnchor="middle" fontSize={30} fill={C.muted} fontWeight={700}>＝</text>
      <RBox x={470} y={60} w={180} h={110} fill={C.goldTint} stroke={C.gold} lines={['有効な権限', 'プロファイル ＋ 全権限セット']} fs={15} />
    </Diagram>
  )
}

// セキュリティの4階層（ゲート）
function SecurityLayers() {
  const rows = [
    { t: '組織レベル', s: 'ログインIP範囲・ログイン時間・MFA・パスワードポリシー', fill: '#e8edf5', stroke: C.blueDeep },
    { t: 'オブジェクトレベル（CRUD）', s: 'プロファイル/権限セットで 作成・参照・編集・削除 を許可', fill: C.blueTint, stroke: C.blue },
    { t: '項目レベル（FLS）', s: '項目ごとに 参照/編集 を制御（非表示にもできる）', fill: C.purpleTint, stroke: C.purple },
    { t: 'レコードレベル', s: 'OWD・ロール階層・共有ルール・手動共有で「どのレコードか」を制御', fill: C.greenTint, stroke: C.green },
  ]
  let y = 14
  return (
    <Diagram vw={680} vh={288} caption="4つの層をすべて通過して初めてデータにアクセスできる。上位の層で拒否されれば下位は評価されない">
      {rows.map((r, i) => {
        const yy = y
        y += 66
        return (
          <g key={i}>
            <RBox x={70} y={yy} w={540} h={50} fill={r.fill} stroke={r.stroke} lines={[r.t, r.s]} fs={14.5} />
            {i < rows.length - 1 && <Arrow x1={340} y1={yy + 50} x2={340} y2={yy + 64} />}
          </g>
        )
      })}
    </Diagram>
  )
}

// 主従 / 参照 / 多対多
function RelationshipTypes() {
  return (
    <Diagram vw={680} vh={250} caption="主従＝子は親に依存（削除連鎖・積み上げ集計可）／参照＝独立（集計不可）／多対多＝2つの主従を持つジャンクション">
      {/* 主従関係 */}
      <text x={113} y={26} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>主従関係</text>
      <RBox x={40} y={40} w={70} h={40} fill={C.blueTint} stroke={C.blueDeep} lines={['親']} fs={14} />
      <RBox x={150} y={40} w={70} h={40} fill={C.blueTint} stroke={C.blueDeep} lines={['子']} fs={14} />
      <Arrow x1={110} y1={60} x2={150} y2={60} />
      <Cap x={113} y={104} fs={11.5}>削除が連鎖</Cap>
      <Cap x={113} y={122} fs={11.5}>積み上げ集計◎</Cap>
      <Cap x={113} y={140} fs={11.5}>共有を継承</Cap>

      {/* 参照関係 */}
      <text x={340} y={26} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>参照関係</text>
      <RBox x={267} y={40} w={70} h={40} fill={C.goldTint} stroke={C.gold} lines={['親']} fs={14} />
      <RBox x={377} y={40} w={70} h={40} fill={C.goldTint} stroke={C.gold} lines={['子']} fs={14} />
      <Arrow x1={337} y1={60} x2={377} y2={60} dashed />
      <Cap x={340} y={104} fs={11.5}>親を消しても子は残る</Cap>
      <Cap x={340} y={122} fs={11.5}>積み上げ集計×</Cap>
      <Cap x={340} y={140} fs={11.5}>独立した所有者・共有</Cap>

      {/* 多対多 */}
      <text x={565} y={26} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>多対多</text>
      <RBox x={492} y={40} w={64} h={40} fill={C.greenTint} stroke={C.green} lines={['A']} fs={14} />
      <RBox x={574} y={40} w={64} h={40} fill={C.greenTint} stroke={C.green} lines={['B']} fs={14} />
      <RBox x={505} y={110} w={120} h={40} fill="#fff" stroke={C.green} lines={['ジャンクション']} fs={12.5} />
      <Arrow x1={540} y1={80} x2={555} y2={110} />
      <Arrow x1={598} y1={80} x2={580} y2={110} />
      <Cap x={565} y={172} fs={11.5}>主従を2つ持つ中間</Cap>
    </Diagram>
  )
}

// レコードトリガーフロー：保存前 / 保存後
function FlowTiming() {
  return (
    <Diagram vw={680} vh={210} caption="同一レコードの項目更新は「保存前」が高速（追加のDML不要）。別レコード作成・メール・外部連携は「保存後」で行う">
      <RBox x={20} y={78} w={90} h={54} fill="#fff" stroke={C.border} lines={['保存要求']} fs={13.5} />
      <Arrow x1={110} y1={105} x2={140} y2={105} />
      <RBox x={140} y={60} w={180} h={90} fill={C.blueTint} stroke={C.blue} lines={['保存前 (before save)', '同一レコードを', '高速に項目更新']} fs={14} />
      <line x1={345} y1={40} x2={345} y2={170} stroke={C.red} strokeWidth="2" strokeDasharray="5 4" />
      <Cap x={345} y={32} fs={11.5} color={C.red} weight={700}>DBへ書き込み</Cap>
      <RBox x={370} y={60} w={200} h={90} fill={C.greenTint} stroke={C.green} lines={['保存後 (after save)', '別レコード作成・メール', '承認申請・外部連携']} fs={14} />
      <Arrow x1={570} y1={105} x2={600} y2={105} />
      <RBox x={600} y={78} w={70} h={54} fill="#fff" stroke={C.border} lines={['完了']} fs={13.5} />
    </Diagram>
  )
}

// 自動化ツールの選択
function AutomationDecision() {
  const rows = [
    { cond: '入力値を検証して不正な保存を止めたい', tool: '入力規則', fill: C.redTint, stroke: C.red },
    { cond: 'レコードを自動で作成・更新したい', tool: 'Flow（フロー）', fill: C.blueTint, stroke: C.blue },
    { cond: '人が多段階で承認する手続きにしたい', tool: '承認プロセス', fill: C.goldTint, stroke: C.gold },
    { cond: '宣言的では無理な複雑・大量処理', tool: 'Apex（コード）', fill: '#eee', stroke: C.muted },
  ]
  let y = 40
  return (
    <Diagram vw={680} vh={286} caption="「宣言的（設定）でできることは宣言的に」。目的からツールを選び、Apex は最終手段にする">
      <text x={340} y={22} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>目的に応じてツールを選ぶ</text>
      {rows.map((r, i) => {
        const yy = y
        y += 58
        return (
          <g key={i}>
            <RBox x={30} y={yy} w={380} h={46} fill="#fff" stroke={C.border} lines={[r.cond]} fs={13.5} weight={500} />
            <Arrow x1={410} y1={yy + 23} x2={452} y2={yy + 23} />
            <RBox x={452} y={yy} w={200} h={46} fill={r.fill} stroke={r.stroke} lines={[r.tool]} fs={14.5} />
          </g>
        )
      })}
    </Diagram>
  )
}

// 営業データモデル
function SalesDataModel() {
  return (
    <Diagram vw={680} vh={250} caption="リードを変換すると取引先・取引先責任者・商談が生まれる。商談は価格表の商品と結び付く">
      <RBox x={30} y={100} w={110} h={50} fill={C.goldTint} stroke={C.gold} lines={['リード']} fs={14} />
      <Arrow x1={140} y1={125} x2={185} y2={125} />
      <Cap x={162} y={116} fs={11}>変換</Cap>
      <RBox x={190} y={30} w={140} h={46} fill={C.blueTint} stroke={C.blue} lines={['取引先']} fs={14} />
      <RBox x={190} y={100} w={140} h={46} fill={C.blueTint} stroke={C.blue} lines={['取引先責任者']} fs={13.5} />
      <RBox x={190} y={170} w={140} h={46} fill={C.greenTint} stroke={C.green} lines={['商談']} fs={14} />
      <line x1={260} y1={76} x2={260} y2={100} stroke={C.line} strokeWidth="2" />
      <line x1={260} y1={146} x2={260} y2={170} stroke={C.line} strokeWidth="2" />
      <Arrow x1={330} y1={193} x2={380} y2={193} />
      <RBox x={385} y={170} w={150} h={46} fill="#fff" stroke={C.border} lines={['商談商品']} fs={13.5} />
      <Arrow x1={535} y1={193} x2={560} y2={193} />
      <RBox x={560} y={170} w={100} h={46} fill="#fff" stroke={C.border} lines={['価格表']} fs={13} />
      <Cap x={400} y={60} anchor="start" fs={11.5}>取引先の下に取引先責任者・商談がぶら下がる</Cap>
    </Diagram>
  )
}

// リード変換
function LeadConversion() {
  return (
    <Diagram vw={680} vh={220} caption="リード変換で 取引先・取引先責任者・（任意で）商談 が生成される。変換後のリードは編集できない">
      <RBox x={30} y={80} w={140} h={60} fill={C.goldTint} stroke={C.gold} lines={['リード', '見込み客']} fs={15} />
      <Arrow x1={170} y1={110} x2={250} y2={110} />
      <text x={210} y={98} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.text}>変換</text>
      <RBox x={260} y={22} w={200} h={46} fill={C.blueTint} stroke={C.blue} lines={['取引先 (Account)']} fs={14} />
      <RBox x={260} y={87} w={200} h={46} fill={C.blueTint} stroke={C.blue} lines={['取引先責任者 (Contact)']} fs={14} />
      <RBox x={260} y={152} w={200} h={46} fill={C.greenTint} stroke={C.green} lines={['商談 (Opportunity)・任意']} fs={13.5} />
      <Cap x={500} y={115} anchor="start" fs={11.5} color={C.red} weight={600}>変換後リードは</Cap>
      <Cap x={500} y={133} anchor="start" fs={11.5} color={C.red} weight={600}>編集不可</Cap>
    </Diagram>
  )
}

// インポートウィザード vs データローダ
function ImportTools() {
  return (
    <Diagram vw={680} vh={250} caption="少量・主要オブジェクトはインポートウィザード、大量・全オブジェクト・自動化はデータローダ">
      <RBox x={24} y={20} w={300} h={40} fill={C.blueTint} stroke={C.blue} lines={['インポートウィザード']} fs={15} />
      {['最大 5万件まで', '主要な標準/カスタムオブジェクト', 'ブラウザUI・重複防止あり', '挿入・更新（削除は不可）'].map((t, i) => (
        <Cap key={i} x={40} y={88 + i * 26} anchor="start" fs={12.5} color={C.text}>{'• ' + t}</Cap>
      ))}
      <RBox x={356} y={20} w={300} h={40} fill={C.greenTint} stroke={C.green} lines={['データローダ']} fs={15} />
      {['最大 500万件まで', 'すべてのオブジェクト', 'API利用・CSV・自動化可', '挿入/更新/upsert/削除/エクスポート'].map((t, i) => (
        <Cap key={i} x={372} y={88 + i * 26} anchor="start" fs={12.5} color={C.text}>{'• ' + t}</Cap>
      ))}
      <line x1={340} y1={20} x2={340} y2={230} stroke={C.border} strokeWidth="1.5" strokeDasharray="4 4" />
    </Diagram>
  )
}

// レポート4形式
function ReportFormats() {
  const items = [
    { t: '表形式', s: '単純な一覧', kind: 'tabular' },
    { t: 'サマリー', s: '行をグループ化', kind: 'summary' },
    { t: 'マトリックス', s: '行×列で集計', kind: 'matrix' },
    { t: '結合', s: '複数ブロック', kind: 'joined' },
  ]
  return (
    <Diagram vw={680} vh={220} caption="4つのレポート形式。グラフを載せるにはサマリー/マトリックス（グループ化）が必要">
      {items.map((it, i) => {
        const x = 20 + i * 165
        return (
          <g key={i}>
            <rect x={x} y={20} width={145} height={110} rx={10} fill="#fff" stroke={C.border} strokeWidth="1.5" />
            {/* mini table glyph */}
            {it.kind === 'tabular' &&
              [0, 1, 2, 3].map((r) => <rect key={r} x={x + 18} y={40 + r * 18} width={109} height={10} rx={2} fill={C.blueTint} stroke={C.blue} strokeWidth="0.8" />)}
            {it.kind === 'summary' &&
              [0, 1, 2, 3].map((r) => <rect key={r} x={x + 18 + (r % 2) * 12} y={40 + r * 18} width={109 - (r % 2) * 12} height={10} rx={2} fill={r % 2 ? '#fff' : C.greenTint} stroke={C.green} strokeWidth="0.8" />)}
            {it.kind === 'matrix' &&
              [0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}-${c}`} x={x + 20 + c * 36} y={40 + r * 24} width={32} height={18} rx={2} fill={C.purpleTint} stroke={C.purple} strokeWidth="0.8" />))}
            {it.kind === 'joined' &&
              [0, 1].map((c) => <rect key={c} x={x + 18 + c * 58} y={40} width={50} height={72} rx={3} fill={C.goldTint} stroke={C.gold} strokeWidth="0.8" />)}
            <text x={x + 72} y={152} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>{it.t}</text>
            <text x={x + 72} y={172} textAnchor="middle" fontSize={11.5} fill={C.muted}>{it.s}</text>
          </g>
        )
      })}
    </Diagram>
  )
}

// ケース自動化
function CaseAutomation() {
  return (
    <Diagram vw={680} vh={210} caption="外部から入ったケースを、割り当て→自動応答で初動、時間超過はエスカレーションで再割当・通知">
      <RBox x={16} y={70} w={130} h={64} fill={C.goldTint} stroke={C.gold} lines={['Web/メール', 'to ケース']} fs={13.5} />
      <Arrow x1={146} y1={102} x2={176} y2={102} />
      <RBox x={176} y={70} w={130} h={64} fill={C.blueTint} stroke={C.blue} lines={['割り当てルール', '担当/キュー決定']} fs={13} />
      <Arrow x1={306} y1={102} x2={336} y2={102} />
      <RBox x={336} y={70} w={130} h={64} fill={C.blueTint} stroke={C.blue} lines={['自動応答ルール', '顧客へ自動返信']} fs={13} />
      <Arrow x1={466} y1={102} x2={510} y2={102} />
      <Cap x={488} y={92} fs={10.5} color={C.red}>時間超過</Cap>
      <RBox x={510} y={70} w={150} h={64} fill={C.redTint} stroke={C.red} lines={['エスカレーション', '再割当・通知']} fs={13} />
    </Diagram>
  )
}

// Agentforce アーキテクチャ
function AgentforceArch() {
  return (
    <Diagram vw={680} vh={280} caption="ユーザーの要求を推論エンジンが解釈し、トピック内の許可されたアクションを実行。全体を信頼レイヤーが保護する">
      <rect x={16} y={16} width={648} height={196} rx={14} fill="#f3f9f8" stroke={C.green} strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={30} y={38} fontSize={12.5} fontWeight={700} fill={C.green}>Einstein Trust Layer（マスキング・ゼロデータ保持・監査・毒性検出）</text>
      <RBox x={36} y={110} w={120} h={56} fill="#fff" stroke={C.border} lines={['ユーザーの要求']} fs={13} />
      <Arrow x1={156} y1={138} x2={186} y2={138} />
      <RBox x={186} y={100} w={150} h={76} fill={C.purpleTint} stroke={C.purple} lines={['Atlas', 'Reasoning Engine', '意図理解→計画→実行']} fs={13} />
      <Arrow x1={336} y1={138} x2={366} y2={138} />
      <RBox x={366} y={110} w={120} h={56} fill={C.blueTint} stroke={C.blue} lines={['トピック', '扱う業務範囲']} fs={13} />
      <Arrow x1={486} y1={138} x2={516} y2={138} />
      <RBox x={516} y={100} w={132} h={76} fill={C.blueTint} stroke={C.blueDeep} lines={['アクション', 'Flow / Apex', 'プロンプト']} fs={13} />
      <RBox x={240} y={230} w={200} h={40} fill={C.goldTint} stroke={C.gold} lines={['CRM / Data Cloud データ（グラウンディング）']} fs={12} />
      <Arrow x1={340} y1={230} x2={340} y2={182} />
    </Diagram>
  )
}

// Trust Layer の流れ
function TrustLayer() {
  return (
    <Diagram vw={680} vh={200} caption="プロンプトはマスキングしてからLLMへ。応答は毒性検出を通し、すべて監査ログに記録。データは外部LLMに保持されない">
      <RBox x={14} y={70} w={120} h={60} fill="#fff" stroke={C.border} lines={['プロンプト', '＋CRMデータ']} fs={12.5} />
      <Arrow x1={134} y1={100} x2={160} y2={100} />
      <RBox x={160} y={70} w={120} h={60} fill={C.blueTint} stroke={C.blue} lines={['マスキング', '機密情報を秘匿']} fs={12.5} />
      <Arrow x1={280} y1={100} x2={306} y2={100} />
      <RBox x={306} y={70} w={90} h={60} fill={C.purpleTint} stroke={C.purple} lines={['LLM', '生成']} fs={12.5} />
      <Arrow x1={396} y1={100} x2={422} y2={100} />
      <RBox x={422} y={70} w={120} h={60} fill={C.greenTint} stroke={C.green} lines={['毒性検出', '安全性チェック']} fs={12.5} />
      <Arrow x1={542} y1={100} x2={568} y2={100} />
      <RBox x={568} y={70} w={100} h={60} fill={C.goldTint} stroke={C.gold} lines={['監査ログ', '記録']} fs={12.5} />
      <text x={340} y={168} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.red}>プロンプト・応答は外部LLMに保持されない（ゼロデータ保持）</text>
    </Diagram>
  )
}

const FIGURES = {
  'security-pyramid': SecurityPyramid,
  'permission-stack': PermissionStack,
  'security-layers': SecurityLayers,
  'relationship-types': RelationshipTypes,
  'flow-timing': FlowTiming,
  'automation-decision': AutomationDecision,
  'sales-datamodel': SalesDataModel,
  'lead-conversion': LeadConversion,
  'import-tools': ImportTools,
  'report-formats': ReportFormats,
  'case-automation': CaseAutomation,
  'agentforce-arch': AgentforceArch,
  'trust-layer': TrustLayer,
}

export default function Figure({ name }) {
  const Cmp = FIGURES[name]
  if (!Cmp) return null
  return <Cmp />
}
