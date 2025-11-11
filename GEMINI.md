# Repository Guidelines

## プロジェクト構成 & モジュール
- ルート直下: ライブラリ本体 `YKLiba_*.js` と一部 `*_test.js`。
- `ykliba/`: Google Apps Script 用プロジェクト（`.clasp.json`, `appsscript.json`）。
- `ykliba/dist/`: デプロイ対象の配布物。編集は原則ルートのソース→`dist/`へ同期。
- 代表モジュール: Arrayx/Base/Book/Code/Config/Drive/Log/Misc/Range/Rectangle/Simple/Sort/Store/Utils。

## ビルド・実行・デプロイ
- 同期（ルート→配布物）: `cp YKLiba_*.js ykliba/dist/`
- デプロイ（Apps Script へ push）: `cd ykliba && clasp push`
- 関数の実行（ローカルから）: `cd ykliba && clasp run <関数名>`
- 初回認証が必要な場合: `clasp login`

## コーディング規約 & 命名
- 言語: Google Apps Script (V8, JS)。`const/let` 優先、`===`/`!==`を使用。
- インデント: 2 スペース。行末セミコロンは既存スタイルに合わせて統一。
- 命名: ファイル名は `YKLiba_<Module>.js`。クラスは PascalCase、メソッド/変数は camelCase。
- ログ: 依存ライブラリ `YKLiblog` を使用（`ykliba/appsscript.json` 参照）。
- フォーマッタ/リンタ: 導入なし。PR では既存スタイルを踏襲し diff を最小化。

## テスト指針
- 形式: `_test.js` の関数は GAS 上で動作（Sheets/Drive API を使用）。
- 実行例: `cd ykliba && clasp run test_remove_files_unser_folder`
- 命名: テスト関数は `test_` 接頭辞。主要ユーティリティ（Range/Code/Drive 等）に対し代表ケースを用意。

## コミット & Pull Request
- 慣例（履歴準拠）: 端的な英語・動詞始まり（例: "Refactor range helpers"）。
- 推奨フォーマット: `feat(range): add transformRange2`, `fix(drive): handle empty folder`。
- PR 必須項目: 目的/背景、変更点一覧、確認手順（`clasp run` 例含む）、影響範囲、関連 Issue、必要に応じてスクショ。

## セキュリティ & 設定
- 秘匿情報: スクリプト ID・個人データを共有しない（`.clasp.json` の取り扱い注意）。
- 実行環境: `Asia/Tokyo`、ランタイム V8、依存 `YKLiblog`（開発モード）。

