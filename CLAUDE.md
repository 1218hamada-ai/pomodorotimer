# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを操作する際のガイダンスを提供します。

## プロジェクト概要

8つの変換カテゴリ（温度、距離、重さ、体積、エネルギー、面積、速度、圧力）をサポートするReactベースの単位変換アプリケーションです。ダークモード、localStorageによる変換履歴の永続化、トースト通知、リアルタイム変換を備えたクリーンなUIを特徴としています。

## ビルドコマンド

```bash
# 開発サーバーを起動 (http://localhost:5173)
npm run dev

# 本番用ビルド
npm run build

# コードのリント
npm run lint

# 本番ビルドのプレビュー
npm run preview
```

## アーキテクチャ

### 状態管理
- **AppContext** (`src/context/AppContext.jsx`): React Context APIを使用したグローバル状態プロバイダー
  - 管理内容: ダークモード、変換履歴（最大50件）、精度設定、トースト通知
  - すべての設定はlocalStorageに永続化され、マウント時に読み込まれる
  - 履歴エントリには、タイムスタンプ、カテゴリ、入力/出力値と単位が含まれる

### 主要な設計パターン
- **変換関数** (`src/utils/conversions.js`): 単位間を変換する純粋関数
  - すべての変換は基準単位を使用（例：距離はメートル、温度はセルシウス）
  - パターン: 入力値 → 基準単位 → 出力単位
  - バリデーションを含む（距離/重さ/面積の負の値、温度の絶対零度）
  - 無効な入力に対して日本語のエラーメッセージをスロー

- **コンポーネント構造**:
  - `App.jsx`: AppProviderでアプリケーションをラップし、カテゴリ選択と履歴の表示を管理
  - `UnitConverter.jsx`: 単位や値の変更時に自動変換を行うメイン変換UI
  - `ConversionHistory.jsx`: カテゴリでフィルタリングできる履歴を表示
  - `QuickCompare.jsx`: 選択したカテゴリの全単位への変換を表示
  - `Toast.jsx` + `ToastContainer.jsx` + `useToast.js`: カスタムトースト通知システム

### データフロー
1. ユーザーが値を入力 → UnitConverterがローカル状態を更新
2. useEffectが変更を検知 → utils/conversions.jsの変換関数を呼び出し
3. 結果を精度に応じてフォーマット（AppContextから取得） → UIに表示
4. 変換成功 → AppContext.addToHistory()で履歴に追加
5. 履歴が自動的にlocalStorageに永続化

## 重要な実装の詳細

- **精度**: ユーザー設定可能（デフォルト6桁）、localStorageに'precision'として保存
- **自動変換**: UnitConverterはuseEffectを使用して、入力値または単位の変更時に自動的に変換（手動の「変換」ボタン押下は不要）
- **エラーハンドリング**: 変換エラーはトースト通知として表示され、結果フィールドはクリアされる
- **ダークモード**: AppContextで管理され、ドキュメントルートの'dark'クラスを切り替える
- **アイコン**: UI要素にreact-icons（FiCopy、FiCheck）を使用
- **CSS**: ユーティリティファーストのアプローチ、カスタムCSSクラス（input-field、animate-slideUpなど）

## ファイル構成

```
src/
├── components/         # Reactコンポーネント
├── context/           # グローバル状態（AppContext）
├── hooks/             # カスタムフック（useToast）
└── utils/             # 純粋なユーティリティ関数（変換ロジック）
```

## 変換の追加方法

新しい変換カテゴリを追加する場合：
1. 基準単位パターンに従って、`src/utils/conversions.js`に変換関数を追加
2. `App.jsx`で関数をインポート
3. AppContentの`categories`配列にカテゴリオブジェクトを追加: id、name（日本語）、icon（絵文字）、units配列、converter関数
4. 残り（UI、履歴、トースト）は既存のコンポーネントを介して自動的に動作

## ローカライゼーション

UIテキストは日本語です。変換関数のエラーメッセージも日本語です。コードを変更する際は、この一貫性を保ってください。
