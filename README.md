# SF Learner — Salesforce 認定資格 学習ポータル

Salesforce 認定資格の合格を目指す学習ポータルです。
洗練されたモダンUIに、ほどよいゲーミフィケーション（成長するキャラクター）を組み合わせています。
React + Vite 製で、学習データはブラウザの localStorage に保存されます（サーバー不要）。

## 対応資格

サイドバーの「学習中の資格」タブで切り替えます。**進捗・実績は資格ごとに独立して保存**されるため、
ある資格の学習状況が他に影響することはありません。

| 資格 | 単元 | 問題数 | 模擬試験 | 合格ライン | 表示言語 |
| --- | --- | --- | --- | --- | --- |
| **認定アドミニストレーター**（ADM-201） | 8 | 470 | 約63問 × 6回 | 65% | 日本語 |
| **認定ビジネスアナリスト** | 6 | 174 | 58問 × 3回 | 72% | 日本語 |
| **Agentforce Specialist** | 6 | 80 | 60問 × 1回 | 73% | **英日切替** |
| **Service Cloud Consultant** | 8 | 60 | 60問 × 1回 | 67% | **英日切替** |
| **Data Cloud / Data 360 Consultant** | 6 | 120 | 60問 × 2回 | 70% | **英日切替** |

どの資格でも、学習マップ／ロードマップ／模擬試験／フラッシュカード／進捗・実績の5画面と、
単元ごとの「インプット → 簡単クイズ → 深堀インプット → 応用クイズ → 単元テスト」フローが同じように使えます。

## スマホ対応

760px 以下では画面が窮屈になっていたため、860px 以下を「スマホ表示」として作り直しました。

- **固定ヘッダー**（上）… 学習中の資格名と進捗（例：`2 / 6`）。右のボタンで設定シートを開閉。
- **設定シート**… 資格の切り替え・既定の表示言語・アバターの進捗。画面を移動すると自動的に閉じます。
- **ボトムナビ**（下）… マップ／ロード／模試／カード／進捗の5タブ。親指で届く位置に常駐し、
  iPhone のホームバー分の余白（`env(safe-area-inset-bottom)`）も確保しています。
- 画面を移動すると先頭までスクロールし、前の画面の途中から始まらないようにしています。

あわせて次の点も調整しています。

- 単元フローの5ステップは横スクロールの帯に変更（折り返しで潰れないように）
- 選択肢は上揃え＋余白圧縮で、長文でも ○/× マークに押し負けない
- フラッシュカードの高さを可変にして、日本語の長文があふれないように
- 320px 幅でも横スクロールが出ないよう、グリッドの下限値と余白を調整
- iOS 横向きでの文字の自動拡大を抑止（`text-size-adjust`）

> サイドバー版（861px 以上）の見た目と操作は従来どおりです。

## 英語で学び、分からないときだけ日本語で確認する

Agentforce・Service Cloud・Data Cloud の教材は**英語**で、設問・選択肢・解説・学習教材のすべてに日本語訳を併記しています。

- **その場だけ切り替え** — 各設問・各セクション・各カードの右上にある「日本語」ボタンを押すと、**その項目だけ**が日本語になります（他は英語のまま）。もう一度押すと「EN」で英語に戻ります。次の設問に進むと自動的に英語表示に戻ります。
- **既定の言語を変更** — サイドバーの「既定の表示言語」で English / 日本語 を切り替えると、全体の初期表示が変わります。この設定でも個別の切り替えは引き続き使えます。
- 日本語訳を持たない資格（アドミン・BA）では、これらのボタンは表示されません。

実装は `src/hooks/useLang.jsx` の `pick(obj, field, lang)` が中心で、`field` と `field_ja` の2つを持つオブジェクトから
表示言語に応じた値を返します（日本語訳がなければ英語にフォールバック）。

## 学習マップ & 成長キャラクター

- **学習マップ**: 各単元を順に攻略する進行型マップ。単元テストで合格ライン以上を取ると**クリア**（アドミン70% / BA 72% / Agentforce 73% / Service Cloud 67%）。
- **成長するアバター**: 単元をクリアするたびにアバターが段階的に成長。段階数は単元数に応じて変わり、称号も資格ごとに異なる（例：Service Cloud は Newcomer → Support Agent → … → Certified Service Cloud Consultant）。
- **模擬試験**: 本番想定の問題数・出題比率・合格ラインで構成。
- **ロードマップ**: 合格までの推奨ルートを5フェーズで提示。

## 機能

- **問題演習**: 4択・複数選択に加え、**シナリオ（シミュレーション）形式**を収録。
  - **選択肢ごとに「なぜ正解 / なぜ不正解か」を解説**。さらに 💡 補足情報（実務Tips・引っかけ注意点）付き。
  - 即時採点・S〜D評価（評価の閾値は資格の合格ラインに連動）。
  - 選択肢の並びは毎回シャッフルされ、成績は各問の最初の回答で確定。
- **模擬試験**: 本番想定の問題数に分割。実試験由来のセットは**原本と同じ並び順**で収録。
- **フラッシュカード**: 用語暗記のフリップカード。
- **学習教材**: 各単元の要点まとめ。要所に依存なしのインライン SVG 図解（全43点）。
- **進捗・実績**: アバターの成長記録・正答率・連続記録・バッジ・単元別習熟度・演習履歴を可視化。

### 図解リファレンス（単体ページ）

React アプリとは独立した静的 HTML。依存なし・JS 不要・ライト/ダークテーマ対応で、ビルド時に `dist/` へそのままコピーされる。

| ファイル | 内容 | 公開URL |
| --- | --- | --- |
| `public/data-import-export.html` | データのインポート / エクスポート | <https://solahy.github.io/Salesforce-learner/data-import-export.html> |
| `public/login-security.html` | ログインとアクセス制御 | <https://solahy.github.io/Salesforce-learner/login-security.html> |

## 出題範囲（単元別）

### 認定アドミニストレーター（8単元・全470問）

設定とセットアップ 15% / オブジェクトマネージャ 15% / 営業・マーケ 10% / サービス 10% /
生産性 10% / データと分析 17% / 自動化 15% / Agentforce 8%

### 認定ビジネスアナリスト（6単元・全174問）

顧客ディスカバリー 17% / ステークホルダーとの協働 24% / プロセスマッピング 16% /
要件 17% / ユーザーストーリー 15% / ユーザー受け入れ 11%

本番は 60問（＋採点対象外5問）・105分・合格ライン72%。受験にはアドミニストレーター認定が前提。

### Agentforce Specialist（6単元・全80問）

Prompt Engineering 13% / Agentforce Concepts 23% / Data 360 & Retrieval 22% /
Trust, Security & Permissions 12% / Deployment, Testing & Monitoring 20% / Integrations & Channels 10%

本番は 60問・105分・44問正解で合格（約73%）。
うち60問は同梱の模擬試験（`screenshots/Agentforce`）と同一、20問はその論点を別状況で問い直す応用問題。
**配点は同梱模試の出題分布から算出した本教材の比重**であり、公式比率とは異なる場合がある。

### Service Cloud Consultant（8単元・全60問）

Implementation Strategies 15% / Solution Design & Industry Knowledge 26% / Case Management 15% /
Interaction Channels 10% / Knowledge Management 9% / Service Console 10% /
Integration & Data Management 10% / Contact Center Analytics 5%

本番は 60問・105分・合格ライン67%（約40/60問）。
全60問は同梱の練習試験（`screenshots/Service Cloud`・Set A）と同一。
**配点は公式試験ガイドの比率**に合わせているため、練習試験の出題分布とは一致しない。

> ⚠️ Set A の解答キーは Q25 を C としているが、これは同じ論点の Q9（B）および実際の記事バージョン管理の挙動と矛盾する。
> 本教材では B を正解として扱い、その旨を当該問題の補足に明記している。

### Data Cloud / Data 360 Consultant（6単元・全120問）

Solution Positioning 14% / Setup and Administration 13% / Data Source Connection and Ingestion 18% /
Harmonization and Unification 17% / Data Enhancements, Sharing, and Analysis 18% / Data Activations and Utilization 20%

本番は 60問（＋採点対象外5問）・105分・合格ライン70%（約42/60問）。**前提資格なし**。
**配点は公式試験ガイドの比率そのまま**で、120問もその比率に沿って配分している（模試2回分がちょうど60問ずつになる）。

> ℹ️ **名称について** — 2025年の製品改称により、資格名は「Data Cloud Consultant」から
> **「Data 360 Consultant」** へ移行した（同一の資格）。設定画面や既存教材の多くは今も Data Cloud 表記のため、
> 本教材では現行の Data 360 を主としつつ旧称を併記している。権限セットも一部改称されている
> （Data Cloud Admin → Data Cloud Architect）。
>
> ⚠️ この資格は公式の練習試験を同梱していないため、全120問は**公式試験ガイドの出題範囲に基づく自作問題**である。
> 他資格のような「公式問題」バッジは表示されない。

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー (http://localhost:5173)
npm run build    # 本番ビルド (dist/)
npm run preview  # ビルド結果のプレビュー
```

## コンテンツの追加・編集

### 資格の追加

`src/certs/` に資格ごとのディレクトリを作り、`src/certs/index.js` の `CERTS` に追加するだけで、
画面側の変更なしに新しい資格が増やせます。各資格は次のスキーマを提供します。

```js
{
  id, name, short, code, subtitle, accent,
  bilingual,                        // true なら言語切替UIが有効になる
  exam: { questions, minutes, passPct, prereq },
  stageClearPct,                    // 単元クリアの判定ライン
  domains, domainById,
  questions, questionsByDomain,
  studyMaterials,                   // domainId -> { intro, sections }
  flashcards, flashcardsByDomain,
  roadmap, resources,
  ranks,                            // アバターの称号（要素数 = domains.length + 1）
  badges,                           // makeBadges() で生成
  mocks: { exams, passPct, intro },
  mapIntro,
}
```

| 資格 | 場所 |
| --- | --- |
| アドミニストレーター | `src/data/`（`src/certs/admin.js` が束ねる） |
| ビジネスアナリスト | `src/certs/ba/` |
| Agentforce Specialist | `src/certs/agentforce/` |
| Service Cloud Consultant | `src/certs/servicecloud/` |
| Data Cloud / Data 360 Consultant | `src/certs/datacloud/` |

### 問題のスキーマ（共通）

```js
{
  id, domain, type: 'mcq' | 'multi' | 'scenario',
  source?: 'official' | 'similar',   // 出典バッジの表示に使う
  examOrder?,                        // 原本の並び順（模試をこの順で出題する）
  scenario?, scenario_ja?,
  question, question_ja,
  options: [{ text, text_ja, correct, note, note_ja }],   // note = なぜ正解/不正解か
  explanation, explanation_ja,
  reference?, reference_ja?,         // 💡 補足情報・実務Tips
}
```

- 正解は `options[].correct` から導出（複数 `true` で複数選択問題）。
- `_ja` を持つ項目があれば、その設問に言語切替ボタンが自動的に表示されます。
- `type: 'scenario'` の問題は「応用クイズ」に、それ以外は「簡単クイズ」に振り分けられます。
  シナリオ型を持たない資格では、問題を前半・後半に二分して両ステップに割り当てます。

### 学習教材のスキーマ

```js
{
  intro, intro_ja,
  sections: [{ heading, heading_ja, body, body_ja, points: [], points_ja: [], figure? }]
}
```

`sections` の前半がインプット（基礎）、後半が深堀インプット（応用）に自動分割されます。

### 図解の追加

`src/components/Figure.jsx` の `FIGURES` にコンポーネントを登録し、
`study/*.js` のセクションに `figure: '<key>'` を指定すると、インプット内に表示されます。
未登録のキーを指定した場合は何も表示されません（安全に無視される）。

> ⚠️ 同梱のコンテンツは学習用の教材です。最新の試験範囲は必ず公式の試験ガイドで確認してください。
> [アドミニストレーター](https://trailhead.salesforce.com/credentials/administrator) ／
> [ビジネスアナリスト](https://trailhead.salesforce.com/credentials/businessanalyst) ／
> [Agentforce Specialist](https://trailhead.salesforce.com/credentials/agentforce-specialist) ／
> [Service Cloud Consultant](https://trailhead.salesforce.com/credentials/serviceCloudConsultant) ／
> [Data Cloud / Data 360 Consultant](https://trailhead.salesforce.com/credentials/datacloudconsultant)
> （[試験ガイド](https://help.salesforce.com/s/articleView?id=005298940&type=1&language=en_US)）

## 技術スタック

- React 18 / React Router 6
- Vite 5
- 状態の永続化: localStorage（バックエンド不要）
  - `sf-learner-cert` … 学習中の資格
  - `sf-learner-lang` … 既定の表示言語（`en` / `ja`）
  - `sf-learner-progress-v2` … アドミニストレーターの進捗（既存キーをそのまま利用）
  - `sf-learner-progress-v2:<certId>` … その他の資格の進捗
