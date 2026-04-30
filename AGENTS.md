# AGENTS.md — ReactFlux

A React SPA frontend for [Miniflux](https://github.com/miniflux/v2) RSS reader. No tests, no TypeScript.

## Quick commands

| Command | What |
|---|---|
| `pnpm dev` | Dev server on `0.0.0.0:3000` |
| `pnpm build` | Production build to `build/` |
| `pnpm lint` | ESLint (flat config) |
| `pnpm format` | Prettier —write |
| `pnpm format:check` | Prettier dry-run |
| `pnpm update-fonts` | Download Google Fonts locally to `public/fonts/` |

CI runs `lint -> format:check` in that order.

## Tech stack

- **React 18** (JSX, no TypeScript, `.jsx` / `.js` only)
- **Vite 7** with `@vitejs/plugin-react` + React Compiler (`babel-plugin-react-compiler`, target 18)
- **pnpm** (lockfile: `pnpm-lock.yaml`)
- **Arco Design** (`@arco-design/web-react`) for UI
- **nanostores** + `@nanostores/persistent` for state (persisted to localStorage, not Redux)
- **ofetch** for HTTP client to Miniflux REST API
- **react-router** v7 (`createBrowserRouter`)

## Architecture

- Entry: `src/main.jsx` → `src/routes.jsx` → `src/App.jsx`
- Auth stored in `localStorage` key `"auth"` — server URL + token (or username/password Basic Auth)
- All API calls go through `src/apis/ofetch.js`; 401 redirects to `/login`
- State atoms in `src/store/` (camelCase files), read via `@nanostores/react` `useStore`
- SPA: server must rewrite all paths to `index.html` (Caddyfile provides `try_files`)
- Build output dir: `build/` (gitignored, deployed to `gh-pages` branch)

## Code conventions

These differ from defaults or are easy to miss:

- **No semicolons.** Double quotes. Trailing commas. 100-char print width.
- **Import path alias:** `@/` → `src/` (configured in `vite.config.js` and `jsconfig.json`)
- **No `index.js` in import paths** (`noUselessIndex` rule enforces this)
- **Import groups** (with blank line between): builtin → external → internal → parent → sibling → index → object → type
- **JSX props** sorted: reserved first, shorthand first, callbacks last, multiline last
- **Filename casing by directory:**
  - `src/components/**/*.jsx` → `pascalCase`
  - `src/hooks/**/*.js`, `src/store/**/*.js` → `camelCase`
  - Some exceptions listed in `eslint.config.mjs`
- **React Compiler** is active — `react-compiler/react-compiler: "error"`
- `react/prop-types` is off, `no-unused-vars` is off
- `import/no-relative-parent-imports: "error"` — prefer `@/` alias over `../` imports

## Docker

Multi-stage: `node:22-alpine` builds, `caddy:2-alpine` serves on port 2000. Run with `docker compose up -d`.

## I18n

Locale JSON files in `src/locales/`. Adding a language requires:
1. Add JSON file in `src/locales/`
2. Register Arco locale import in `src/App.jsx`
3. Add Day.js locale import
4. Add README translation in `docs/`

## Fonts

Font files live in `public/fonts/` (version-tracked). Generated CSS at `public/styles/fonts.css`. Update via `pnpm update-fonts`.

## Deployment

- **Cloudflare Pages**: framework preset "Create React App"
- **Static hosting**: SPA URL rewriting (`try_files` to `index.html`)
- **GitHub Pages**: CI pushes `build/` to `gh-pages` branch
- **Docker**: `electh/reactflux` image on Docker Hub
