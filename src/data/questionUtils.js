// 問題オブジェクトに対する共通ヘルパー（資格に依存しない）。
// 正解は options[].correct から導出する（複数 true で複数選択問題）。

export function correctIndices(question) {
  return question.options.reduce((acc, o, i) => (o.correct ? [...acc, i] : acc), [])
}

export function isMulti(question) {
  return question.options.filter((o) => o.correct).length > 1
}

// 単元名の短縮表示。括弧より前だけを使う。
// 例：「設定とセットアップ (Configuration and Setup)」→「設定とセットアップ」
//     「Prompt Engineering（プロンプトエンジニアリング）」→「Prompt Engineering」
// 英語名は語の途中で切らないよう、スペースでは分割しない。
export function shortName(name) {
  return name.split(/[（(]/)[0].trim()
}
