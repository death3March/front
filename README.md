# HackUKosen2024
## 開発ツール類

- eslint (linter)
- tailwindcss
- biome (formatter)

## ディレクトリ構成

```
- src
  - features
    - (domain)
      - components/
        - componentA.tsx
      - types/
  - route
    - (path)
      - route.tsx // layoutのみ。ここでロジックの定義はしない
  - shared
    - components/
      - sharedComp.tsx
    - hooks/
      - sampleHook.tsx
    - utils/
    - types/
```

## branchルール
issue駆動でやる。

ブランチ名は```issue/#(issue番号)```