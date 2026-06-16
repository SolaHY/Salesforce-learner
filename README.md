# SF Learner — Salesforce 認定アドミニストレーター学習ポータル

Salesforce Certified Administrator 資格の合格を目指すための学習ポータルサイトです。
React + Vite で構築されており、学習データはブラウザの localStorage に保存されます（サーバー不要）。

## 機能

- **📝 問題演習（クイズ）**: 出題範囲（ドメイン）別 / 全範囲の4択・複数選択問題。即時採点と解説付き。
- **🃏 フラッシュカード**: 用語・概念を暗記するためのフリップカード。「復習済み」管理あり。
- **📚 学習教材**: 各ドメインの要点まとめ。
- **📈 進捗トラッキング**: 正答率、ドメイン別習熟度、演習履歴をローカル保存・可視化。

## 出題範囲（ドメイン）

| ドメイン | 配点 |
| --- | --- |
| 構成と設定 | 20% |
| オブジェクトマネージャ / Lightning アプリビルダー | 20% |
| 営業・マーケティングアプリケーション | 12% |
| サービス・サポートアプリケーション | 11% |
| 生産性とコラボレーション | 7% |
| データと分析の管理 | 14% |
| ワークフロー / プロセスの自動化 | 16% |

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー (http://localhost:5173)
npm run build    # 本番ビルド (dist/)
npm run preview  # ビルド結果のプレビュー
```

## コンテンツの追加・編集

サンプルコンテンツは `src/data/` にまとまっています。JSON的なJSオブジェクトを編集するだけで増やせます。

- `src/data/domains.js` — 出題範囲の定義
- `src/data/quizzes.js` — 問題（`answer` は選択肢のインデックス。複数正解は `multi: true` + 配列）
- `src/data/flashcards.js` — フラッシュカード（表 `front` / 裏 `back`）
- `src/data/studyMaterials.js` — 学習教材のまとめ

> ⚠️ 同梱のコンテンツは学習用のサンプルです。最新の試験範囲は公式の
> [Salesforce 認定アドミニストレーター試験ガイド](https://trailhead.salesforce.com/credentials/administrator)
> を確認してください。

## 技術スタック

- React 18 / React Router 6
- Vite 5
- 状態の永続化: localStorage（バックエンド不要）
