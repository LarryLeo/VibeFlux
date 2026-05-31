# ReactFlux Copilot Instructions

## Build, lint, and test commands

- Use `pnpm`.
- `pnpm dev` starts the Vite dev server on `0.0.0.0:3000`.
- `pnpm build` creates the production build in `build/`.
- `pnpm lint` runs the repository ESLint config.
- `pnpm exec eslint src/components/Sidebar/Sidebar.jsx` lints a single file.
- `pnpm format:check` runs the Prettier check used in CI.
- `pnpm format` rewrites formatting across the repo.
- There is no automated test suite configured in this repository, so there is no single-test command to run.

## High-level architecture

- This is a React 18 SPA built with Vite 7. `src/main.jsx` registers the PWA service worker and syntax highlighter, then mounts the router.
- Routing is defined in `src/routes.jsx` with `createBrowserRouter`. `/login` is outside the main app shell. Authenticated routes render through `App.jsx` and `components/Main/Main.jsx`, with `pages/RouterProtect.jsx` redirecting unauthenticated users back to `/login`.
- `src/App.jsx` is the top-level shell. It wires Arco `ConfigProvider`, responsive sidebar layout, language setup, theme setup, and feed icon synchronization before rendering `Main`.
- API access is centralized in `src/apis/ofetch.js`. Every Miniflux request uses that client, which reads auth from `src/store/authState.js`, sets the per-user server as `baseURL`, sends either `X-Auth-Token` or Basic auth headers, and clears auth plus navigates to `/login` on HTTP 401.
- Resource-specific API helpers in `src/apis/` build on that shared client. Pages stay thin and usually pass a page-specific `getEntries` function plus an `info` descriptor into the shared `components/Content/Content.jsx` container.
- Global state uses nanostores, not Redux. Persistent atoms in `src/store/authState.js` and `src/store/settingsState.js` mirror the `auth` and `settings` localStorage keys. `src/store/dataState.js` holds feeds, categories, counters, version, and integration availability. `src/store/contentState.js` holds the current entry list, filters, selected article, pagination state, and deduplication-aware entry updates.
- `src/hooks/useAppData.js` is the main hydration flow for app-wide Miniflux data. It fetches feeds, categories, counters, version, and integration status, then updates the nanostores that drive the sidebar and page content.
- `components/Content/Content.jsx` is the shared reading surface. It coordinates article-list fetching, article-detail loading, hotkeys, swipe navigation, refresh behavior, and the AI summary action.
- Article lists are optimized for large feeds. `components/Article/ArticleList.jsx` uses `virtua` virtualization plus `SimpleBar`, incremental loading through `useLoadMore`, and optional mark-as-read-on-scroll behavior through `useScrollRead`.
- I18n spans multiple files: locale JSON files live in `src/locales/`, `src/hooks/useLanguage.js` dynamically imports them and sets Day.js locale, and `src/App.jsx` maps the selected language to the matching Arco locale package.

## Key conventions

- This repo is JavaScript/JSX only. Do not introduce TypeScript files or TS-specific patterns.
- Use the `@/` alias for imports from `src/`. Parent-relative imports are intentionally blocked by ESLint.
- Formatting is strict: no semicolons, double quotes, trailing commas, and a 100-character print width.
- Import ordering is enforced: builtin -> external -> internal -> parent -> sibling -> index -> object -> type, with blank lines between groups.
- Do not include `index.js` or `index.jsx` in import paths. The lint config enforces `noUselessIndex`.
- The React Compiler is enabled in Vite and enforced by ESLint. Keep component and hook code compatible with compiler expectations instead of opting out casually.
- Filename casing matters. `src/**/*.jsx` is generally PascalCase, while `src/hooks/**/*.js` and `src/store/**/*.js` must stay camelCase. Check `eslint.config.mjs` for the small list of explicit exceptions before renaming files.
- Prefer extending the existing nanostores and their setter helpers over introducing another global state pattern.
- Changes to authentication or user settings should go through the store helpers so localStorage-backed state stays in sync.
- The AI summary feature is configured from values stored in `settingsState` (`openAiBaseUrl`, `openAiApiKey`, `openAiModel`) and calls an OpenAI-compatible `/chat/completions` endpoint directly from the client. Do not move that flow to environment variables unless the feature is being redesigned deliberately.
- Adding a new language requires coordinated changes in at least four places: `src/locales/`, Arco locale imports in `src/App.jsx`, Day.js locale imports in `src/hooks/useLanguage.js`, and the translated README in `docs/`.
- Deployment assumes SPA path rewriting to `index.html`. `build/` is the deployable artifact, and GitHub Pages CI publishes that directory to `gh-pages`.

## Playwright MCP usage

- If browser validation is needed, use Playwright MCP against `pnpm dev` on port `3000`. This repo is a client-side SPA, so route changes, responsive layout, and reading interactions are easier to verify in a real browser than with static inspection alone.
- The most useful end-to-end checks here are login and logout behavior, 401 redirects back to `/login`, sidebar navigation between `/all`, `/today`, `/starred`, `/history`, `/feed/:id`, and `/category/:id`, opening an article detail route, and responsive behavior when the sidebar collapses on smaller viewports.
- Many useful flows require a reachable Miniflux instance because the app reads the server URL and credentials from localStorage-backed auth state and sends every API request to that configured server. If no Miniflux backend is available, limit browser checks to unauthenticated flows or UI that does not depend on live feed data.
- If you validate AI summary behavior in the browser, remember that it depends on `settingsState` values for `openAiBaseUrl`, `openAiApiKey`, and `openAiModel`; the feature will intentionally fail until those are populated.
