# HackUKosen2024
## インストール
```
pnpm install
pnpm run dev
```

また、`.env`を作成し、サーバー側のWS URLを入力する
```
VITE_WS_URL = ws://127.0.0.1:8080
```

## 開発ツール類

- eslint (linter)
- tailwindcss
- biome (formatter)

## ディレクトリ構成

```
- src
  - app
    - (pathName)
      - components/
        - componentA.tsx
      - types/
      - page.tsx
  - shared
    - components/
      - sharedComp.tsx
    - hooks/
      - sampleHook.tsx
    - utils/
    - types/
  - router.tsx // routeの定義
```

## branchルール
issue駆動でやる。

ブランチ名は```issue/(issue番号)```
