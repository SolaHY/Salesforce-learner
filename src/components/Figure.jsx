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

/* ============ ビジネスアナリスト向けの図解 ============ */

// BA と周辺ロールの守備範囲
function BaRole() {
  return (
    <Diagram vw={680} vh={250} caption="BA はビジネス側と技術側の橋渡し。PM は進行、アーキテクトは技術設計、管理者は構築を担う">
      <RBox x={16} y={80} w={150} h={80} fill={C.goldTint} stroke={C.gold} lines={['ビジネス側', '業務部門・経営層', '課題と目的']} fs={13.5} />
      <Arrow x1={166} y1={120} x2={214} y2={120} />
      <RBox x={214} y={66} w={200} h={108} fill={C.blueTint} stroke={C.blueDeep} lines={['ビジネスアナリスト', '課題を引き出し整理', '要件として言語化', '合意形成と検証']} fs={14} />
      <Arrow x1={414} y1={120} x2={462} y2={120} />
      <RBox x={462} y={80} w={200} h={80} fill={C.purpleTint} stroke={C.purple} lines={['技術側', '管理者・開発者', '設定と実装']} fs={13.5} />
      <Cap x={314} y={30} fs={12.5} weight={700} color={C.text}>BA が責任を持つのは「何を・なぜ作るか」</Cap>
      <Cap x={110} y={196}>PM＝スコープ/納期/予算</Cap>
      <Cap x={314} y={206} color={C.blueDeep} weight={600}>要件の中身に責任</Cap>
      <Cap x={562} y={196}>アーキテクト＝技術方式</Cap>
    </Diagram>
  )
}

// ウォーターフォールとアジャイル
function BaMethodology() {
  const wf = ['要件定義', '設計', '開発', 'テスト', 'リリース']
  return (
    <Diagram vw={680} vh={266} caption="ウォーターフォールは一方向に進む。アジャイルは短い反復で動くものを作り、フィードバックを次に反映する">
      <Cap x={20} y={24} anchor="start" fs={13} weight={700} color={C.text}>ウォーターフォール（要件が安定・事前承認が必要）</Cap>
      {wf.map((t, i) => (
        <g key={t}>
          <RBox x={20 + i * 130} y={38} w={112} h={44} fill="#fff" stroke={C.border} lines={[t]} fs={13} />
          {i < wf.length - 1 && <Arrow x1={132 + i * 130} y1={60} x2={148 + i * 130} y2={60} />}
        </g>
      ))}
      <Cap x={20} y={128} anchor="start" fs={13} weight={700} color={C.text}>アジャイル（要件が流動的・早期に価値を出す）</Cap>
      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <RBox
            x={20 + i * 210}
            y={142}
            w={186}
            h={72}
            fill={C.blueTint}
            stroke={C.blue}
            lines={[`スプリント ${n}`, '計画→構築→レビュー→改善']}
            fs={13}
          />
          {i < 2 && <Arrow x1={206 + i * 210} y1={178} x2={230 + i * 210} y2={178} />}
        </g>
      ))}
      <Cap x={340} y={240} color={C.blueDeep} weight={600}>各スプリント末に動く成果物とフィードバックが生まれる</Cap>
    </Diagram>
  )
}

// ステークホルダー分析（影響力 × 関心度）
function BaStakeholderMatrix() {
  const cells = [
    { x: 200, y: 40, fill: C.goldTint, stroke: C.gold, t: '満足させておく', s: '要点のみ定期報告' },
    { x: 400, y: 40, fill: C.redTint, stroke: C.red, t: '密接に管理', s: '意思決定に巻き込む' },
    { x: 200, y: 152, fill: '#eef1f6', stroke: C.border, t: '監視する', s: '最小限の情報提供' },
    { x: 400, y: 152, fill: C.greenTint, stroke: C.green, t: '情報を提供し続ける', s: 'フィードバックの提供者' },
  ]
  return (
    <Diagram vw={680} vh={280} caption="影響力（権限）と関心度の2軸で関わり方を設計する。影響力が高いのに関心が低い層を放置しないことが要点">
      {cells.map((c) => (
        <RBox key={c.t} x={c.x} y={c.y} w={196} h={104} fill={c.fill} stroke={c.stroke} lines={[c.t, c.s]} fs={14} />
      ))}
      <Arrow x1={176} y1={264} x2={176} y2={30} />
      <text x={158} y={148} textAnchor="middle" fontSize={12.5} fontWeight={700} fill={C.text} transform="rotate(-90 158 148)">
        影響力（権限）
      </text>
      <Arrow x1={190} y1={272} x2={604} y2={272} />
      <Cap x={398} y={264} fs={12.5} weight={700} color={C.text}>関心度</Cap>
    </Diagram>
  )
}

// 変更管理と定着
function BaChangeAdoption() {
  const steps = [
    { t: '早期に巻き込む', s: 'ディスカバリーから参加', fill: C.blueTint, stroke: C.blue },
    { t: '理由を伝える', s: '自分に何が良くなるか', fill: C.purpleTint, stroke: C.purple },
    { t: '育てる', s: 'トレーニング/チャンピオン', fill: C.greenTint, stroke: C.green },
    { t: '測る', s: '利用率とKPIで確認', fill: C.goldTint, stroke: C.gold },
  ]
  return (
    <Diagram vw={680} vh={200} caption="変更管理はプロジェクト開始と同時に始める継続活動。リリース直前に始めても抵抗は解消できない">
      {steps.map((s, i) => (
        <g key={s.t}>
          <RBox x={16 + i * 168} y={58} w={148} h={78} fill={s.fill} stroke={s.stroke} lines={[s.t, s.s]} fs={13.5} />
          {i < steps.length - 1 && <Arrow x1={164 + i * 168} y1={97} x2={182 + i * 168} y2={97} />}
        </g>
      ))}
      <Cap x={340} y={32} fs={12.5} weight={700} color={C.text}>プロジェクト開始 ───────────────→ リリース後</Cap>
      <Cap x={340} y={166} color={C.red} weight={600}>抵抗の多くは「悪意」ではなく「不安」から生まれる</Cap>
    </Diagram>
  )
}

// As-Is / To-Be とギャップ分析
function BaAsIsToBe() {
  return (
    <Diagram vw={680} vh={230} caption="As-Is（実態）と To-Be（将来像）の差分＝ギャップ。ギャップを埋める変更が要件になる">
      <RBox x={16} y={54} w={200} h={104} fill="#eef1f6" stroke={C.border} lines={['As-Is（現状）', '実際に行われていること', 'ワークアラウンドも含む']} fs={13.5} />
      <RBox x={462} y={54} w={200} h={104} fill={C.greenTint} stroke={C.green} lines={['To-Be（将来）', '課題を解消した業務', '関係者と合意する']} fs={13.5} />
      <RBox x={244} y={62} w={190} h={88} fill={C.goldTint} stroke={C.gold} lines={['ギャップ分析', '差分を洗い出す']} fs={14} />
      <Arrow x1={216} y1={106} x2={242} y2={106} />
      <Arrow x1={434} y1={106} x2={460} y2={106} />
      <Cap x={340} y={190} fs={12.5} weight={700} color={C.text}>埋める手段＝システム機能／業務ルール／役割分担／トレーニング</Cap>
      <Cap x={340} y={210} color={C.red}>すべてをシステムで埋める必要はない</Cap>
    </Diagram>
  )
}

// スイムレーン図の読み方
function BaSwimlane() {
  const lanes = [
    { t: '営業', y: 46, boxes: [{ x: 150, label: '見積作成' }, { x: 470, label: '顧客へ提出' }] },
    { t: '営業事務', y: 116, boxes: [{ x: 260, label: '内容チェック' }] },
    { t: '経理', y: 186, boxes: [{ x: 370, label: '与信確認' }] },
  ]
  return (
    <Diagram vw={680} vh={280} caption="レーンをまたぐ矢印（ハンドオフ）が多いほど待ち時間と情報欠落のリスクが高い＝改善の第一候補">
      {lanes.map((l) => (
        <g key={l.t}>
          <rect x={16} y={l.y} width={648} height={58} fill="#fff" stroke={C.border} strokeWidth="1.2" />
          <rect x={16} y={l.y} width={96} height={58} fill="#eef1f6" stroke={C.border} strokeWidth="1.2" />
          <text x={64} y={l.y + 34} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.text}>{l.t}</text>
          {l.boxes.map((b) => (
            <RBox key={b.label} x={b.x} y={l.y + 10} w={104} h={38} fill={C.blueTint} stroke={C.blue} lines={[b.label]} fs={12.5} rx={7} />
          ))}
        </g>
      ))}
      <Arrow x1={254} y1={75} x2={258} y2={122} />
      <Arrow x1={364} y1={145} x2={368} y2={192} />
      <Arrow x1={474} y1={205} x2={500} y2={106} />
      <Cap x={340} y={264} fs={12.5} weight={700} color={C.red}>この例では3回のハンドオフ。承認の削減・自動ルーティングが改善候補</Cap>
    </Diagram>
  )
}

// 要件の種類
function BaRequirementTypes() {
  const rows = [
    { t: 'ビジネス要件', s: '営業サイクルを20%短縮する', fill: C.goldTint, stroke: C.gold },
    { t: 'ステークホルダー要件', s: '営業マネージャは担当者別の予測を見たい', fill: C.purpleTint, stroke: C.purple },
    { t: '機能要件', s: '受注時に請求担当へ通知する', fill: C.blueTint, stroke: C.blue },
    { t: '非機能要件', s: '画面表示は3秒以内／監査ログを7年保持', fill: C.greenTint, stroke: C.green },
    { t: '移行要件', s: '過去2年分の商談データを移行する', fill: '#eef1f6', stroke: C.border },
  ]
  return (
    <Diagram vw={680} vh={276} caption="上位ほど目的、下位ほど具体。移行要件は稼働後には不要になるのが特徴">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={16 + i * 52} w={230} h={42} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={13.5} rx={8} />
          <RBox x={256} y={16 + i * 52} w={408} h={42} fill="#fff" stroke={C.border} lines={[r.s]} fs={12.5} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
    </Diagram>
  )
}

// トレーサビリティ
function BaTraceability() {
  const chain = ['ビジネス要件', 'ソリューション要件', 'ユーザーストーリー', 'テストケース', '実装']
  return (
    <Diagram vw={680} vh={196} caption="要件から実装・テストまでの対応をたどれる状態。抜けの検出と、変更時の影響分析に使う">
      {chain.map((t, i) => (
        <g key={t}>
          <RBox x={12 + i * 134} w={118} y={56} h={56} fill={i === 0 ? C.goldTint : C.blueTint} stroke={i === 0 ? C.gold : C.blue} lines={[t]} fs={12.5} />
          {i < chain.length - 1 && <Arrow x1={130 + i * 134} y1={84} x2={144 + i * 134} y2={84} />}
        </g>
      ))}
      <Cap x={340} y={34} fs={12.5} weight={700} color={C.text}>要件トレーサビリティマトリクス(RTM)で一覧化する</Cap>
      <Cap x={340} y={144} color={C.red} weight={600}>「テストされていない要件」と「要件のない実装」を検出できる</Cap>
      <Cap x={340} y={166}>変更時は「どこに波及するか」が即座に分かる</Cap>
    </Diagram>
  )
}

// ユーザーストーリーの構造
function BaUserStory() {
  return (
    <Diagram vw={680} vh={252} caption="ストーリー本体は「誰が・何を・なぜ」。合否を決めるのは受け入れ基準">
      <RBox x={16} y={26} w={648} h={92} fill={C.blueTint} stroke={C.blue} lines={['〈役割〉として、〈やりたいこと〉をしたい。なぜなら〈得たい価値〉だからだ。', '例：営業マネージャとして、担当者別のパイプラインを見たい。なぜなら予測会議の準備時間を減らしたいからだ。']} fs={13.5} />
      <Cap x={92} y={144} fs={12.5} weight={700} color={C.text}>受け入れ基準</Cap>
      <RBox x={16} y={154} w={210} h={72} fill={C.greenTint} stroke={C.green} lines={['Given（前提）', '割引率が25%の商談']} fs={12.5} />
      <RBox x={236} y={154} w={210} h={72} fill={C.greenTint} stroke={C.green} lines={['When（操作）', '保存しようとすると']} fs={12.5} />
      <RBox x={456} y={154} w={208} h={72} fill={C.greenTint} stroke={C.green} lines={['Then（結果）', 'エラーで保存されない']} fs={12.5} />
      <Cap x={470} y={144} fs={12} color={C.red}>正常系だけでなく境界値・例外も書く</Cap>
    </Diagram>
  )
}

// テストレベル
function BaTestLevels() {
  const rows = [
    { t: '単体テスト', who: '開発者', what: '個々の機能が仕様どおり動くか', fill: '#eef1f6', stroke: C.border },
    { t: '結合テスト', who: '開発者', what: '連携先とデータが正しく流れるか', fill: C.blueTint, stroke: C.blue },
    { t: '回帰テスト', who: '開発/QA', what: '既存機能が壊れていないか', fill: C.purpleTint, stroke: C.purple },
    { t: 'UAT', who: '業務ユーザー', what: 'この仕組みで業務が回るか', fill: C.greenTint, stroke: C.green },
  ]
  return (
    <Diagram vw={680} vh={236} caption="UAT を実施するのは業務ユーザー。BA は計画・シナリオ作成・進行支援・取りまとめを担う" >
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={16 + i * 54} w={150} h={44} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={13.5} rx={8} />
          <RBox x={176} y={16 + i * 54} w={130} h={44} fill="#fff" stroke={C.border} lines={[r.who]} fs={12.5} rx={8} />
          <RBox x={316} y={16 + i * 54} w={348} h={44} fill="#fff" stroke={C.border} lines={[r.what]} fs={12.5} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
    </Diagram>
  )
}

// 価値実現のループ
function BaValueLoop() {
  const steps = [
    { t: 'ディスカバリー', s: '課題と現状値', after: true },
    { t: '要件', s: '何を作るか', after: false },
    { t: '構築', s: '実装', after: false },
    { t: 'UAT', s: '業務が回るか', after: false },
    { t: '定着', s: '使われているか', after: true },
    { t: '測定', s: 'KPIは達成したか', after: true },
  ]
  const W = 100
  const GAP = 12
  const x0 = 24
  return (
    <Diagram vw={680} vh={218} caption="BA の仕事はリリースで終わらない。測定した結果を次の改善に還流させる">
      {steps.map((s, i) => {
        const x = x0 + i * (W + GAP)
        return (
          <g key={s.t}>
            <RBox
              x={x}
              y={54}
              w={W}
              h={62}
              fill={s.after ? C.goldTint : C.blueTint}
              stroke={s.after ? C.gold : C.blue}
              lines={[s.t, s.s]}
              fs={12.5}
            />
            {i < steps.length - 1 && <Arrow x1={x + W} y1={85} x2={x + W + GAP - 2} y2={85} />}
          </g>
        )
      })}
      {/* 測定 → ディスカバリー へ戻る還流の矢印 */}
      <path
        d={`M ${x0 + 5 * (W + GAP) + W / 2} 116 L ${x0 + 5 * (W + GAP) + W / 2} 156 L ${x0 + W / 2} 156 L ${x0 + W / 2} 122`}
        fill="none"
        stroke={C.green}
        strokeWidth="2"
        markerEnd="url(#ah)"
        strokeDasharray="6 4"
      />
      <Cap x={340} y={172} fs={12.5} weight={700} color={C.green}>測定結果と要望を次の改善サイクルへ還流させる</Cap>
      <Cap x={340} y={30} fs={12.5} weight={700} color={C.text}>ディスカバリーで測った現状値（ベースライン）が、最後の「測定」の比較対象になる</Cap>
      <Cap x={340} y={202} color={C.red}>リリース前にベースラインを測っておかないと改善を証明できない</Cap>
    </Diagram>
  )
}

/* ============ Agentforce Specialist 向けの図解（英語表記） ============ */

// 4つのプロンプトテンプレート種別を「出力先」で整理する
function AfTemplateTypes() {
  const rows = [
    { t: 'Field Generation', s: 'writes into a specific field', fill: C.blueTint, stroke: C.blue },
    { t: 'Record Summary', s: 'displays an overview on the record page', fill: C.purpleTint, stroke: C.purple },
    { t: 'Sales Email', s: 'drafts an outbound email', fill: C.goldTint, stroke: C.gold },
    { t: 'Flex', s: 'called from a flow, Apex, or an agent action', fill: C.greenTint, stroke: C.green },
  ]
  return (
    <Diagram vw={680} vh={244} caption="Choose the template type by where the generated output lands">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={24 + i * 52} w={190} h={42} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={13.5} rx={8} />
          <Arrow x1={206} y1={45 + i * 52} x2={228} y2={45 + i * 52} />
          <RBox x={232} y={24 + i * 52} w={432} h={42} fill="#fff" stroke={C.border} lines={[r.s]} fs={12.5} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
    </Diagram>
  )
}

// エージェント定義の階層
function AfAgentAnatomy() {
  return (
    <Diagram vw={680} vh={268} caption="Fix the problem at the layer it belongs to: scope, routing, or action selection">
      <RBox x={16} y={20} w={648} h={52} fill={C.goldTint} stroke={C.gold} lines={['Role & scope statement', 'the outer boundary — what the agent engages with at all']} fs={13.5} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <RBox
            x={16 + i * 220}
            y={96}
            w={208}
            h={64}
            fill={C.blueTint}
            stroke={C.blue}
            lines={[`Topic ${i + 1}`, 'job + instructions + actions']}
            fs={13}
          />
          <Arrow x1={120 + i * 220} y1={160} x2={120 + i * 220} y2={182} />
          <RBox x={40 + i * 220} y={184} w={160} h={48} fill={C.greenTint} stroke={C.green} lines={['Actions', 'flow / Apex / standard']} fs={12} />
        </g>
      ))}
      <Cap x={340} y={252} fs={12.5} weight={700} color={C.red}>
        Reasoning engine picks a topic by its classification description, then an action from that topic
      </Cap>
    </Diagram>
  )
}

// ハイブリッド推論：プロンプト指示 vs 決定的指示
function AfHybridReasoning() {
  return (
    <Diagram vw={680} vh={252} caption="One definition, two kinds of instruction — assign each requirement to the mechanism that fits">
      <RBox x={16} y={26} w={318} h={104} fill={C.purpleTint} stroke={C.purple} lines={['Prompt instruction', 'evaluated by the model at run time', 'outcome CAN VARY']} fs={13.5} />
      <RBox x={346} y={26} w={318} h={104} fill={C.greenTint} stroke={C.green} lines={['Deterministic instruction', 'executes exactly as written', 'SAME EVERY TIME']} fs={13.5} />
      <RBox x={16} y={148} w={318} h={62} fill="#fff" stroke={C.border} lines={['Use for: tone, nuance,', 'contextual judgement']} fs={12.5} weight={400} color={C.muted} />
      <RBox x={346} y={148} w={318} h={62} fill="#fff" stroke={C.border} lines={['Use for: compliance steps, mandatory', 'lookups, fixed text']} fs={12.5} weight={400} color={C.muted} />
      <Cap x={175} y={236} fs={12.5} weight={700} color={C.purple}>“decide / depending on / as appropriate”</Cap>
      <Cap x={505} y={236} fs={12.5} weight={700} color={C.green}>“always / must / guaranteed / never”</Cap>
    </Diagram>
  )
}

// 構造化 / 非構造化グラウンディング
function AfGroundingTypes() {
  return (
    <Diagram vw={680} vh={236} caption="Pick the mechanism from the shape of the source. When you need both, configure both">
      <RBox x={16} y={26} w={318} h={56} fill={C.blueTint} stroke={C.blue} lines={['Structured', 'records & fields']} fs={13.5} />
      <RBox x={346} y={26} w={318} h={56} fill={C.goldTint} stroke={C.gold} lines={['Unstructured', 'documents, PDFs, articles']} fs={13.5} />
      <Arrow x1={175} y1={82} x2={175} y2={104} />
      <Arrow x1={505} y1={82} x2={505} y2={104} />
      <RBox x={16} y={106} w={318} h={62} fill="#fff" stroke={C.border} lines={['Merge fields', 'resolved live at generation time']} fs={13} />
      <RBox x={346} y={106} w={318} h={62} fill="#fff" stroke={C.border} lines={['Index + retriever', 'relevant chunks found at run time']} fs={13} />
      <Cap x={340} y={196} fs={12.5} weight={700} color={C.text}>A few known records → merge fields · A corpus to search → retrieval</Cap>
      <Cap x={340} y={218} color={C.red}>Static text pasted into a template is not grounding</Cap>
    </Diagram>
  )
}

// RAG パイプライン
function AfRagPipeline() {
  const build = ['Ingest', 'Chunk', 'Embed', 'Index']
  const run = ['Retrieve', 'Augment prompt', 'Generate']
  return (
    <Diagram vw={680} vh={252} caption="Build time prepares the content; run time finds the relevant pieces and puts them in the prompt">
      <Cap x={20} y={26} anchor="start" fs={13} weight={700} color={C.blueDeep}>Build time</Cap>
      {build.map((t, i) => (
        <g key={t}>
          <RBox x={20 + i * 164} y={38} w={144} h={46} fill={C.blueTint} stroke={C.blue} lines={[t]} fs={13} />
          {i < build.length - 1 && <Arrow x1={164 + i * 164} y1={61} x2={182 + i * 164} y2={61} />}
        </g>
      ))}
      <Cap x={20} y={124} anchor="start" fs={13} weight={700} color={C.green}>Run time</Cap>
      {run.map((t, i) => (
        <g key={t}>
          <RBox x={20 + i * 220} y={136} w={200} h={46} fill={C.greenTint} stroke={C.green} lines={[t]} fs={13} />
          {i < run.length - 1 && <Arrow x1={220 + i * 220} y1={159} x2={238 + i * 220} y2={159} />}
        </g>
      ))}
      <Cap x={340} y={212} fs={12.5} weight={700} color={C.text}>Chunk size = precision vs completeness · Overlap = content straddling a boundary</Cap>
      <Cap x={340} y={234} color={C.red}>Scope (which chunks are eligible) belongs to the retriever filter, never to a prompt instruction</Cap>
    </Diagram>
  )
}

// Data 360 のパイプライン
function AfData360Pipeline() {
  return (
    <Diagram vw={680} vh={238} caption="DLO mirrors the source; mapping to a DMO harmonises it so downstream features can use it">
      <RBox x={16} y={54} w={130} h={62} fill="#fff" stroke={C.border} lines={['Source', 'CSV / system']} fs={12.5} />
      <Arrow x1={146} y1={85} x2={166} y2={85} />
      <RBox x={166} y={54} w={160} h={62} fill={C.goldTint} stroke={C.gold} lines={['Data lake object', 'exact mirror of source']} fs={12.5} />
      <Arrow x1={326} y1={85} x2={352} y2={85} />
      <Cap x={339} y={44} fs={11.5} weight={700} color={C.red}>map</Cap>
      <RBox x={352} y={54} w={160} h={62} fill={C.greenTint} stroke={C.green} lines={['Data model object', 'harmonised standard']} fs={12.5} />
      <Arrow x1={512} y1={85} x2={532} y2={85} />
      <RBox x={532} y={40} w={132} h={90} fill={C.blueTint} stroke={C.blue} lines={['Downstream', 'identity resolution', 'segmentation, retrievers']} fs={12} />
      <Cap x={340} y={166} fs={12.5} weight={700} color={C.text}>Identity resolution UNIFIES duplicate people · Data spaces PARTITION datasets</Cap>
      <Cap x={340} y={192} color={C.red} weight={600}>Data 360 configuration does NOT travel with a metadata deployment</Cap>
      <Cap x={340} y={214}>It must be established in every target org</Cap>
    </Diagram>
  )
}

// セキュリティコンテキスト
function AfSecurityContext() {
  return (
    <Diagram vw={680} vh={222} caption="Who the agent runs as depends on whether there is a logged-in person on the other end">
      <RBox x={16} y={30} w={318} h={58} fill={C.blueTint} stroke={C.blue} lines={['Employee (internal) agent', 'a person is logged in']} fs={13.5} />
      <RBox x={346} y={30} w={318} h={58} fill={C.goldTint} stroke={C.gold} lines={['Public / unauthenticated agent', 'no logged-in user']} fs={13.5} />
      <Arrow x1={175} y1={88} x2={175} y2={110} />
      <Arrow x1={505} y1={88} x2={505} y2={110} />
      <RBox x={16} y={112} w={318} h={62} fill="#fff" stroke={C.border} lines={['Runs as the LOGGED-IN USER', 'inherits their sharing & FLS']} fs={13} />
      <RBox x={346} y={112} w={318} h={62} fill="#fff" stroke={C.border} lines={['Runs as the DEDICATED AGENT USER', 'its permissions are the whole boundary']} fs={13} />
      <Cap x={340} y={200} fs={12.5} weight={700} color={C.red}>
        “Works for a person, fails for the agent with an access error” → the agent user
      </Cap>
    </Diagram>
  )
}

// Trust Layer の5つの制御
function AfTrustLayer() {
  const rows = [
    { t: 'Data masking', s: 'the value never leaves the platform', fill: C.greenTint, stroke: C.green },
    { t: 'Zero data retention', s: 'it leaves, but the provider does not store it', fill: C.blueTint, stroke: C.blue },
    { t: 'Toxicity detection', s: 'screens generated content for harmful language', fill: C.purpleTint, stroke: C.purple },
    { t: 'Prompt defence', s: 'resists “ignore your instructions” injection', fill: C.redTint, stroke: C.red },
    { t: 'Audit trail', s: 'records what happened (not preventive)', fill: C.goldTint, stroke: C.gold },
  ]
  return (
    <Diagram vw={680} vh={288} caption="Learn each control by what it prevents — the distractors are always the other four">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={20 + i * 52} w={206} h={42} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={13} rx={8} />
          <RBox x={232} y={20 + i * 52} w={432} h={42} fill="#fff" stroke={C.border} lines={[r.s]} fs={12.5} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
      <Cap x={340} y={278} fs={12.5} weight={700} color={C.red}>Masking ≠ zero data retention — the most confused pair on the exam</Cap>
    </Diagram>
  )
}

// 展開で運ばれるもの／運ばれないもの
function AfDeploymentGaps() {
  return (
    <Diagram vw={680} vh={266} caption="A deployment moves definitions. Environment configuration must be established in the target org">
      <RBox x={16} y={26} w={318} h={126} fill={C.greenTint} stroke={C.green} lines={['Travels as metadata', 'agent definition · topics', 'actions · flows', 'prompt templates']} fs={13} />
      <RBox x={346} y={26} w={318} h={126} fill={C.redTint} stroke={C.red} lines={['Does NOT travel', 'Data 360 configuration', '(streams, mappings, indexes, retrievers)', 'agent user + permission assignments']} fs={13} />
      <Cap x={20} y={182} anchor="start" fs={12.5} weight={700} color={C.text}>Three symptoms after deployment:</Cap>
      <Cap x={28} y={204} anchor="start">Silent, no response at all → deployed inactive, not activated</Cap>
      <Cap x={28} y={226} anchor="start">Talks but never grounded → Data 360 configuration missing</Cap>
      <Cap x={28} y={248} anchor="start">Access error on one action → agent user lacks permissions</Cap>
    </Diagram>
  )
}

// リリース前後のツール
function AfMonitoringTimeline() {
  return (
    <Diagram vw={680} vh={244} caption="Most distractors in this domain are tools from the other side of the release line">
      <line x1={340} y1={24} x2={340} y2={196} stroke={C.red} strokeWidth="2" strokeDasharray="6 4" />
      <Cap x={340} y={216} fs={12.5} weight={700} color={C.red}>RELEASE</Cap>
      <Cap x={172} y={38} fs={13} weight={700} color={C.blueDeep}>Before release</Cap>
      <RBox x={16} y={50} w={306} h={46} fill={C.blueTint} stroke={C.blue} lines={['Template preview', 'resolved prompt + response']} fs={12.5} />
      <RBox x={16} y={104} w={306} h={46} fill={C.blueTint} stroke={C.blue} lines={['Testing Center', 'repeatable suite, before/after']} fs={12.5} />
      <Cap x={508} y={38} fs={13} weight={700} color={C.green}>After release</Cap>
      <RBox x={358} y={50} w={306} h={40} fill={C.greenTint} stroke={C.green} lines={['Transcript — one conversation']} fs={12.5} />
      <RBox x={358} y={98} w={306} h={40} fill={C.greenTint} stroke={C.green} lines={['Utterance analysis — what users asked']} fs={12.5} />
      <RBox x={358} y={146} w={306} h={40} fill={C.greenTint} stroke={C.green} lines={['Containment rate — completed without a human']} fs={12.5} />
      <Cap x={340} y={238}>Containment rate says something is wrong; utterance analysis says what</Cap>
    </Diagram>
  )
}

// 連携の4分類
function AfIntegrationMap() {
  return (
    <Diagram vw={680} vh={244} caption="Identify the counterparty and the mechanism follows. MCP and A2A are outbound; the Agent API is inbound">
      <RBox x={250} y={98} w={180} h={54} fill={C.purpleTint} stroke={C.purple} lines={['Your agent']} fs={14} />
      <RBox x={16} y={26} w={200} h={52} fill={C.blueTint} stroke={C.blue} lines={['External tools / data', 'MCP']} fs={12.5} />
      <Arrow x1={250} y1={112} x2={218} y2={78} />
      <RBox x={464} y={26} w={200} h={52} fill={C.goldTint} stroke={C.gold} lines={['Another agent', 'A2A']} fs={12.5} />
      <Arrow x1={430} y1={112} x2={462} y2={78} />
      <RBox x={16} y={172} w={200} h={52} fill={C.greenTint} stroke={C.green} lines={['Existing company API', 'action (external service / Apex)']} fs={12} />
      <Arrow x1={250} y1={140} x2={218} y2={172} />
      <RBox x={464} y={172} w={200} h={52} fill={C.redTint} stroke={C.red} lines={['Your own application', 'Agent API (inbound)']} fs={12} />
      <Arrow x1={462} y1={190} x2={432} y2={148} />
      <Cap x={340} y={78} fs={11.5} color={C.muted}>outbound</Cap>
    </Diagram>
  )
}

/* ============ Service Cloud Consultant 向けの図解（英語表記） ============ */

// サンドボックス4種の比較
function ScSandboxTypes() {
  const rows = [
    { t: 'Developer', s: 'metadata only · small', p: 'individual development', fill: '#eef1f6', stroke: C.border },
    { t: 'Developer Pro', s: 'metadata only · larger', p: 'dev + integration testing', fill: C.blueTint, stroke: C.blue },
    { t: 'Partial Copy', s: 'metadata + sample data', p: 'functional testing · UAT', fill: C.purpleTint, stroke: C.purple },
    { t: 'Full', s: 'COMPLETE production copy', p: 'performance testing · regulated UAT', fill: C.greenTint, stroke: C.green },
  ]
  return (
    <Diagram vw={680} vh={252} caption="Only Full Sandbox reproduces production data volume — performance testing always means Full">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={22 + i * 54} w={150} h={44} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={13} rx={8} />
          <RBox x={174} y={22 + i * 54} w={220} h={44} fill="#fff" stroke={C.border} lines={[r.s]} fs={12} weight={400} color={C.muted} rx={8} />
          <RBox x={402} y={22 + i * 54} w={262} h={44} fill="#fff" stroke={C.border} lines={[r.p]} fs={12} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
      <Cap x={340} y={244} fs={12} weight={700} color={C.red}>Loading extra data into a Partial Copy does not reproduce production volume</Cap>
    </Diagram>
  )
}

// サービスのデータモデル
function ScDataModel() {
  return (
    <Diagram vw={680} vh={244} caption="Case questions often turn on which object holds what the agent needs">
      <RBox x={16} y={30} w={150} h={54} fill={C.blueTint} stroke={C.blue} lines={['Account', 'the customer']} fs={12.5} />
      <RBox x={16} y={110} w={150} h={54} fill={C.blueTint} stroke={C.blue} lines={['Contact', 'the person']} fs={12.5} />
      <RBox x={258} y={70} w={160} h={64} fill={C.purpleTint} stroke={C.purple} lines={['Case', 'the request']} fs={14} />
      <Arrow x1={166} y1={57} x2={256} y2={90} />
      <Arrow x1={166} y1={137} x2={256} y2={114} />
      <RBox x={498} y={16} w={166} h={48} fill="#fff" stroke={C.border} lines={['Product', 'the model / SKU']} fs={12} weight={400} color={C.muted} />
      <RBox x={498} y={72} w={166} h={48} fill={C.goldTint} stroke={C.gold} lines={['Asset', 'the unit they own']} fs={12} />
      <RBox x={498} y={128} w={166} h={48} fill="#fff" stroke={C.border} lines={['Contract', 'commercial terms']} fs={12} weight={400} color={C.muted} />
      <RBox x={498} y={184} w={166} h={48} fill={C.greenTint} stroke={C.green} lines={['Entitlement', 'support level due']} fs={12} />
      <Arrow x1={418} y1={98} x2={496} y2={96} />
      <Cap x={340} y={168} fs={12} weight={700} color={C.red}>“service history for that specific unit” → Asset, not Product</Cap>
      <Cap x={340} y={216} fs={12}>Entitlement drives the entitlement process and its milestones</Cap>
    </Diagram>
  )
}

// エンタイトルメントの連鎖
function ScEntitlementChain() {
  const steps = [
    { t: 'Account / Asset /', s: 'Contract holds it' },
    { t: 'Entitlement', s: 'support level due' },
    { t: 'Case', s: 'gets the entitlement' },
    { t: 'Entitlement process', s: 'applied to the case' },
    { t: 'Milestones', s: 'appear and track time' },
  ]
  return (
    <Diagram vw={680} vh={230} caption="Milestones appear only once the entitlement process is applied to the case — check that first">
      {steps.map((s, i) => (
        <g key={s.t}>
          <RBox
            x={14 + i * 134}
            y={54}
            w={120}
            h={64}
            fill={i === 4 ? C.greenTint : C.blueTint}
            stroke={i === 4 ? C.green : C.blue}
            lines={[s.t, s.s]}
            fs={11.5}
          />
          {i < steps.length - 1 && <Arrow x1={134 + i * 134} y1={86} x2={146 + i * 134} y2={86} />}
        </g>
      ))}
      <Cap x={340} y={30} fs={12.5} weight={700} color={C.text}>Use entitlements when tiers differ and someone must be warned BEFORE breach</Cap>
      <RBox x={100} y={148} w={480} h={44} fill={C.goldTint} stroke={C.gold} lines={['Milestone actions: warning (before) · violation (missed) · success (met)']} fs={12.5} />
      <Cap x={340} y={216} color={C.red}>One uniform rule for everyone (“escalate after 72h”) → escalation rule, not entitlements</Cap>
    </Diagram>
  )
}

// 連携パターン
function ScIntegrationPatterns() {
  const rows = [
    { t: 'Remote Call-In', s: 'external system → Salesforce', e: 'IVR creates a case on an incoming call', fill: C.goldTint, stroke: C.gold },
    { t: 'Request and Reply', s: 'Salesforce → external, WAITS', e: 'synchronous callout for a balance', fill: C.blueTint, stroke: C.blue },
    { t: 'Fire and Forget', s: 'Salesforce → external, no wait', e: 'Platform Events', fill: C.purpleTint, stroke: C.purple },
    { t: 'Batch Data Sync', s: 'scheduled bulk movement', e: 'nightly load, Bulk API', fill: '#eef1f6', stroke: C.border },
  ]
  return (
    <Diagram vw={680} vh={252} caption="Two questions settle it: who initiates the call, and is the response needed to continue?">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={22 + i * 54} w={166} h={44} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={12.5} rx={8} />
          <RBox x={190} y={22 + i * 54} w={228} h={44} fill="#fff" stroke={C.border} lines={[r.s]} fs={11.5} weight={400} color={C.muted} rx={8} />
          <RBox x={426} y={22 + i * 54} w={238} h={44} fill="#fff" stroke={C.border} lines={[r.e]} fs={11.5} weight={400} color={C.muted} rx={8} />
        </g>
      ))}
      <Cap x={340} y={244} fs={12} weight={700} color={C.green}>Live external data, must not be stored → Salesforce Connect + external object</Cap>
    </Diagram>
  )
}

// ルーティングの選択
function ScRoutingDecision() {
  return (
    <Diagram vw={680} vh={266} caption="Pick the proportionate mechanism — with 10 agents and one queue, a sorted list view beats Omni-Channel">
      <RBox x={16} y={22} w={200} h={58} fill={C.blueTint} stroke={C.blue} lines={['Assignment rules', 'record attribute at creation']} fs={12.5} />
      <RBox x={16} y={92} w={200} h={58} fill={C.purpleTint} stroke={C.purple} lines={['Queues', 'agents pull work']} fs={12.5} />
      <RBox x={16} y={162} w={200} h={58} fill={C.greenTint} stroke={C.green} lines={['Skills-based routing', 'agent capability required']} fs={12.5} />
      <RBox x={248} y={22} w={200} h={58} fill={C.goldTint} stroke={C.gold} lines={['Omni-Channel push', 'capacity-aware, at scale']} fs={12.5} />
      <RBox x={248} y={92} w={200} h={58} fill={C.redTint} stroke={C.red} lines={['Escalation rules', 'time-based reassignment']} fs={12.5} />
      <RBox x={248} y={162} w={200} h={58} fill="#eef1f6" stroke={C.border} lines={['Sorted list view', 'simplest, smallest change']} fs={12.5} />
      <RBox x={480} y={22} w={184} h={198} fill="#fff" stroke={C.border} lines={['Ask in order:', '1. what does routing', 'depend on?', '2. how large is the', 'operation?', '3. what is the smallest', 'change that works?']} fs={12} weight={700} color={C.text} />
      <Cap x={232} y={244} fs={12} weight={700} color={C.red}>Only ONE escalation rule can be active per object</Cap>
      <Cap x={232} y={262} fs={11.5}>so “three tiers, three commitments” cannot be escalation rules</Cap>
    </Diagram>
  )
}

// コンソールの構成
function ScConsoleAnatomy() {
  return (
    <Diagram vw={680} vh={262} caption="Learn each region by the question it answers">
      <rect x={16} y={20} width={648} height={182} rx={10} fill="#fff" stroke={C.border} strokeWidth="1.5" />
      <RBox x={28} y={32} w={624} h={40} fill={C.goldTint} stroke={C.gold} lines={['Highlights Panel — key fields of THIS record, pinned at the top']} fs={12.5} rx={7} />
      <RBox x={28} y={82} w={380} h={106} fill="#f7f9fc" stroke={C.border} lines={['Record detail']} fs={12.5} weight={400} color={C.muted} rx={7} />
      <RBox x={418} y={82} w={234} h={106} fill={C.blueTint} stroke={C.blue} lines={['Related Records', 'OTHER records:', 'open cases, history']} fs={12.5} rx={7} />
      <RBox x={16} y={208} w={648} h={34} fill={C.greenTint} stroke={C.green} lines={['Utility Bar — persistent app tools: softphone, history, notes, macros']} fs={12.5} rx={7} />
      <Cap x={340} y={258} fs={12} weight={700} color={C.red}>Softphone missing? It has not been added to the utility bar</Cap>
    </Diagram>
  )
}

// チャネルの対応表
function ScChannelMap() {
  const rows = [
    { t: 'Email', s: 'Email-to-Case (On-Demand / On-Premises)', fill: C.blueTint, stroke: C.blue },
    { t: 'Web form', s: 'Web-to-Case — 5,000 cases/day default limit', fill: C.purpleTint, stroke: C.purple },
    { t: 'Live chat', s: 'Chat — synchronous, session-bound', fill: C.goldTint, stroke: C.gold },
    { t: 'Async messaging', s: 'Messaging for In-App and Web — persists across devices', fill: C.greenTint, stroke: C.green },
    { t: 'Phone', s: 'Open CTI + adapter (keep) / Service Cloud Voice (replace)', fill: C.redTint, stroke: C.red },
    { t: 'Social', s: 'Social Customer Service + monitoring rules', fill: '#eef1f6', stroke: C.border },
    { t: 'Self-service', s: 'Experience Cloud portal (+ guest access, Einstein recs)', fill: C.blueTint, stroke: C.blue },
  ]
  return (
    <Diagram vw={680} vh={296} caption="Match the customer's starting point to the intake feature designed for it">
      {rows.map((r, i) => (
        <g key={r.t}>
          <RBox x={16} y={16 + i * 38} w={166} h={30} fill={r.fill} stroke={r.stroke} lines={[r.t]} fs={12} rx={7} />
          <Arrow x1={182} y1={31 + i * 38} x2={198} y2={31 + i * 38} />
          <RBox x={202} y={16 + i * 38} w={462} h={30} fill="#fff" stroke={C.border} lines={[r.s]} fs={11.5} weight={400} color={C.muted} rx={7} />
        </g>
      ))}
      <Cap x={340} y={288} fs={12} weight={700} color={C.red}>“Continue later, across devices, history intact” → messaging, never chat</Cap>
    </Diagram>
  )
}

// 記事のライフサイクル
function ScArticleLifecycle() {
  const steps = ['Draft', 'Review / approval', 'Published', 'Archived']
  return (
    <Diagram vw={680} vh={234} caption="Editing a published article creates a new draft — the published version stays live throughout">
      {steps.map((t, i) => (
        <g key={t}>
          <RBox
            x={26 + i * 166}
            y={56}
            w={148}
            h={48}
            fill={i === 2 ? C.greenTint : i === 3 ? '#eef1f6' : C.blueTint}
            stroke={i === 2 ? C.green : i === 3 ? C.border : C.blue}
            lines={[t]}
            fs={13}
          />
          {i < steps.length - 1 && <Arrow x1={174 + i * 166} y1={80} x2={190 + i * 166} y2={80} />}
        </g>
      ))}
      {/* published → new draft */}
      <path d="M 434 104 L 434 138 L 100 138 L 100 110" fill="none" stroke={C.red} strokeWidth="2" markerEnd="url(#ah)" strokeDasharray="6 4" />
      <Cap x={266} y={156} fs={12} weight={700} color={C.red}>editing creates a NEW version — the live one keeps serving</Cap>
      <Cap x={340} y={190} fs={12.5} weight={700} color={C.text}>Never unpublished, archived or deleted as a side effect of editing</Cap>
      <Cap x={340} y={212}>Archiving is always a deliberate action</Cap>
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
  // ビジネスアナリスト
  'ba-role': BaRole,
  'ba-methodology': BaMethodology,
  'ba-stakeholder-matrix': BaStakeholderMatrix,
  'ba-change-adoption': BaChangeAdoption,
  'ba-asis-tobe': BaAsIsToBe,
  'ba-swimlane': BaSwimlane,
  'ba-requirement-types': BaRequirementTypes,
  'ba-traceability': BaTraceability,
  'ba-user-story': BaUserStory,
  'ba-test-levels': BaTestLevels,
  'ba-value-loop': BaValueLoop,
  // Agentforce Specialist
  'af-template-types': AfTemplateTypes,
  'af-agent-anatomy': AfAgentAnatomy,
  'af-hybrid-reasoning': AfHybridReasoning,
  'af-grounding-types': AfGroundingTypes,
  'af-rag-pipeline': AfRagPipeline,
  'af-data360-pipeline': AfData360Pipeline,
  'af-security-context': AfSecurityContext,
  'af-trust-layer': AfTrustLayer,
  'af-deployment-gaps': AfDeploymentGaps,
  'af-monitoring-timeline': AfMonitoringTimeline,
  'af-integration-map': AfIntegrationMap,
  // Service Cloud Consultant
  'sc-sandbox-types': ScSandboxTypes,
  'sc-data-model': ScDataModel,
  'sc-entitlement-chain': ScEntitlementChain,
  'sc-integration-patterns': ScIntegrationPatterns,
  'sc-routing-decision': ScRoutingDecision,
  'sc-console-anatomy': ScConsoleAnatomy,
  'sc-channel-map': ScChannelMap,
  'sc-article-lifecycle': ScArticleLifecycle,
}

export default function Figure({ name }) {
  const Cmp = FIGURES[name]
  if (!Cmp) return null
  return <Cmp />
}
