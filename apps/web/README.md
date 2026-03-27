# Yuhan Mart — Web (`apps/web`)

## Yuhan Suite 통합

- 통합 명세: 저장소 루트 [`docs/integration/`](../docs/integration/README.md)
- **Vercel**: Root Directory를 `apps/web`로 두고 빌드; SPA 라우팅은 [`vercel.json`](./vercel.json). 프로덕션에서는 `VITE_SUITE_BFF_BASE`로 BFF 공개 URL 지정(로컬 `vite` 프록시는 프로덕에 없음). 상세는 [`docs/integration/DEPLOY_SUPABASE_VERCEL.md`](../docs/integration/DEPLOY_SUPABASE_VERCEL.md).
- 앱 내 허브: 사이드바 **Yuhan Suite** — Yuaimarketing 허브, 로컬 CRM, ERP 재무, 이벤트 파이프라인 데모
- 선택 환경 변수: [`.env.example`](./.env.example) (`VITE_SUITE_*`, `VITE_NAV_SURFACE=core` 출시용 축소 내비)
- **E2E**: 루트에서 `npm run e2e` (Playwright, dev 서버 자동 기동). CI 전 `npx playwright install chromium` — `apps/web` 워크스페이스.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
