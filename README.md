# 単位変換ツール (Unit Converter)

React + Vite で作成した、シンプルで使いやすい単位変換Webアプリです。
GitHub Pages にてデプロイ済みです。

## 機能

- 8つの変換カテゴリをサポート
  - 🌡️ 温度（°C / °F / K）
  - 📏 距離（m / km / cm / mm / mi / yd / ft / in）
  - ⚖️ 重さ（kg / g / mg / lb / oz / t）
  - 🫗 体積（L / mL / cup / gal / fl oz / pint / quart / tbsp / tsp）
  - ⚡ エネルギー（J / kJ / kcal / BTU）
  - 📐 面積（m² / km² / cm² / ha / acre / ft² / yd²）
  - 💨 速度（m/s / km/h / mph / knots）
  - 🔬 圧力（Pa / kPa / atm / bar / psi）
- リアルタイム自動変換
- 変換履歴の保存（最大50件、localStorage永続化）
- ダークモード対応
- トースト通知
- 全単位への一括変換表示（QuickCompare）

## 技術スタック

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動（http://localhost:5173）
npm run dev

# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## ライセンス

MIT
