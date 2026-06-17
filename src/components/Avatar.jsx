import { AVATAR_RANKS } from '../data/gamification'

// 単元クリア数 (stage 0〜7) に応じて見た目が成長する人物アバター。
// 上位段階ほど装い（眼鏡→襟→ジャケット→ネクタイ→ヘッドセット→社章→認定スター）が増える。
export default function Avatar({ stage = 0, size = 96, glow = false }) {
  const s = Math.max(0, Math.min(AVATAR_RANKS.length - 1, stage))
  const ring = AVATAR_RANKS[s].ring

  const skin = '#f0c9a8'
  const hair = '#3a2f2b'
  const blazer = s >= 3 ? '#1f2a44' : '#46506b'
  const shirt = s >= 2 ? '#ffffff' : '#d3d9e3'

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`アバター: ${AVATAR_RANKS[s].title}`}
      style={glow ? { filter: `drop-shadow(0 0 10px ${ring}aa)` } : undefined}
    >
      <defs>
        <clipPath id={`clip-${s}`}>
          <circle cx="50" cy="50" r="44" />
        </clipPath>
      </defs>

      {/* 背景円 + リング */}
      <circle cx="50" cy="50" r="46" fill="#11162e" />
      <circle cx="50" cy="50" r="46" fill="none" stroke={ring} strokeWidth="3.5" />

      <g clipPath={`url(#clip-${s})`}>
        {/* 肩・ジャケット */}
        <path d="M16,96 Q16,66 50,66 Q84,66 84,96 Z" fill={blazer} />
        {/* シャツの襟元 */}
        <path d="M40,68 L50,84 L60,68 Z" fill={shirt} />
        {/* ネクタイ (s>=4) */}
        {s >= 4 && <path d="M47,70 L53,70 L55,86 L50,92 L45,86 Z" fill="#c0414a" />}
        {/* 社章/ラペルピン (s>=6) */}
        {s >= 6 && <circle cx="38" cy="80" r="2.6" fill={ring} />}

        {/* 首 */}
        <rect x="45" y="58" width="10" height="12" rx="3" fill={skin} />
        {/* 顔 */}
        <circle cx="50" cy="45" r="17" fill={skin} />
        {/* 髪 */}
        <path d="M33,45 Q32,25 50,25 Q68,25 67,45 Q60,36 50,36 Q40,36 33,45 Z" fill={hair} />
        {/* 目 */}
        <circle cx="44" cy="46" r="1.8" fill="#2a2320" />
        <circle cx="56" cy="46" r="1.8" fill="#2a2320" />
        {/* 口 */}
        <path d="M45,53 Q50,56 55,53" fill="none" stroke="#b5765a" strokeWidth="1.6" strokeLinecap="round" />

        {/* 眼鏡 (s>=1) */}
        {s >= 1 && (
          <g stroke="#2a2f3a" strokeWidth="1.4" fill="none">
            <circle cx="44" cy="46" r="4.2" />
            <circle cx="56" cy="46" r="4.2" />
            <line x1="48.2" y1="46" x2="51.8" y2="46" />
          </g>
        )}

        {/* ヘッドセット (s>=5) */}
        {s >= 5 && (
          <g>
            <path d="M33,44 Q33,28 50,28 Q67,28 67,44" fill="none" stroke="#222a3a" strokeWidth="2.4" />
            <rect x="30.5" y="43" width="5" height="8" rx="2" fill="#222a3a" />
            <rect x="64.5" y="43" width="5" height="8" rx="2" fill="#222a3a" />
            <path d="M33,50 Q30,56 38,57" fill="none" stroke="#222a3a" strokeWidth="1.8" />
            <circle cx="38" cy="57.5" r="1.6" fill="#222a3a" />
          </g>
        )}
      </g>

      {/* 認定スター (s>=7) */}
      {s >= 7 && (
        <g transform="translate(74,24)">
          <circle r="11" fill={ring} />
          <path
            d="M0,-6 L1.8,-1.9 L6.2,-1.9 L2.6,1.1 L3.8,5.4 L0,2.8 L-3.8,5.4 L-2.6,1.1 L-6.2,-1.9 L-1.8,-1.9 Z"
            fill="#ffffff"
          />
        </g>
      )}
    </svg>
  )
}
