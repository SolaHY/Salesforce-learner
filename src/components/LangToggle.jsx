// 「英語で学ぶ ⇄ 日本語で確認する」の切り替えボタン。
// 各設問・各セクションの右上に置き、その項目だけを一時的に切り替える用途で使う。
export default function LangToggle({ lang, onToggle, size = 'sm' }) {
  const showingJa = lang === 'ja'
  return (
    <button
      type="button"
      className={`lang-toggle ${size} ${showingJa ? 'ja' : 'en'}`}
      onClick={onToggle}
      title={showingJa ? 'Show the original English' : '日本語で確認する'}
      aria-label={showingJa ? 'Show the original English' : '日本語で確認する'}
    >
      {showingJa ? 'EN' : '日本語'}
    </button>
  )
}
