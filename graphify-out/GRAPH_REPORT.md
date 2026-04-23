# Graph Report - . (2026-04-23)

## Corpus Check

- 109 files · ~203,039 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 385 nodes · 431 edges · 59 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- [[_COMMUNITY_Feed Management UI|Feed Management UI]]
- [[_COMMUNITY_App Shell & Docs|App Shell & Docs]]
- [[_COMMUNITY_Entry API Queries|Entry API Queries]]
- [[_COMMUNITY_Settings UI Components|Settings UI Components]]
- [[_COMMUNITY_Entry View Utilities|Entry View Utilities]]
- [[_COMMUNITY_Appearance Controls|Appearance Controls]]
- [[_COMMUNITY_Sidebar Feed Organization|Sidebar Feed Organization]]
- [[_COMMUNITY_App Bootstrap & Auth|App Bootstrap & Auth]]
- [[_COMMUNITY_Article List State|Article List State]]
- [[_COMMUNITY_Rich Content Parsing|Rich Content Parsing]]
- [[_COMMUNITY_Article Card Metadata|Article Card Metadata]]
- [[_COMMUNITY_Feed Icons & URL Utils|Feed Icons & URL Utils]]
- [[_COMMUNITY_Category Settings API|Category Settings API]]
- [[_COMMUNITY_Search Filtering|Search Filtering]]
- [[_COMMUNITY_Feed Management API|Feed Management API]]
- [[_COMMUNITY_Integration Utilities|Integration Utilities]]
- [[_COMMUNITY_Reading Experience Mockup|Reading Experience Mockup]]
- [[_COMMUNITY_Image Extraction Utils|Image Extraction Utils]]
- [[_COMMUNITY_Infinite Article Loading|Infinite Article Loading]]
- [[_COMMUNITY_Media Playback|Media Playback]]
- [[_COMMUNITY_Hotkey State|Hotkey State]]
- [[_COMMUNITY_Cross-Device Mockup|Cross-Device Mockup]]
- [[_COMMUNITY_Code Block Rendering|Code Block Rendering]]
- [[_COMMUNITY_Image Overlay UI|Image Overlay UI]]
- [[_COMMUNITY_Editable Tag Input|Editable Tag Input]]
- [[_COMMUNITY_Locale Text Utilities|Locale Text Utilities]]
- [[_COMMUNITY_Crawling Policy|Crawling Policy]]
- [[_COMMUNITY_Reading Scene Background|Reading Scene Background]]
- [[_COMMUNITY_Loading Skeletons|Loading Skeletons]]
- [[_COMMUNITY_Ripple Effect|Ripple Effect]]
- [[_COMMUNITY_Auth State|Auth State]]
- [[_COMMUNITY_Data Readiness State|Data Readiness State]]
- [[_COMMUNITY_Feed Icon State|Feed Icon State]]
- [[_COMMUNITY_Heading Navigation|Heading Navigation]]
- [[_COMMUNITY_Form Validation|Form Validation]]
- [[_COMMUNITY_API Client|API Client]]
- [[_COMMUNITY_Article Table of Contents|Article Table of Contents]]
- [[_COMMUNITY_Image Link Tag|Image Link Tag]]
- [[_COMMUNITY_Editable Tag|Editable Tag]]
- [[_COMMUNITY_Keyboard Shortcuts|Keyboard Shortcuts]]
- [[_COMMUNITY_Settings Item|Settings Item]]
- [[_COMMUNITY_Custom Link|Custom Link]]
- [[_COMMUNITY_Edit Feed Modal|Edit Feed Modal]]
- [[_COMMUNITY_Fade Transition|Fade Transition]]
- [[_COMMUNITY_Category Page|Category Page]]
- [[_COMMUNITY_Error Page|Error Page]]
- [[_COMMUNITY_Feed Page|Feed Page]]
- [[_COMMUNITY_Sidebar Expansion State|Sidebar Expansion State]]
- [[_COMMUNITY_Syntax Highlighting|Syntax Highlighting]]
- [[_COMMUNITY_Initial Loading Spinner|Initial Loading Spinner]]
- [[_COMMUNITY_Time Utilities|Time Utilities]]
- [[_COMMUNITY_RSS Feed Icon|RSS Feed Icon]]
- [[_COMMUNITY_App Logo|App Logo]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_Route Definitions|Route Definitions]]
- [[_COMMUNITY_App Constants|App Constants]]
- [[_COMMUNITY_Document Icon|Document Icon]]

## God Nodes (most connected - your core abstractions)

1. `useScreenWidth()` - 13 edges
2. `ReactFlux README (English)` - 12 edges
3. `getSettings()` - 10 edges
4. `buildEntriesUrl()` - 9 edges
5. `Content()` - 8 edges
6. `Translation contribution workflow` - 8 edges
7. `useKeyHandlers()` - 7 edges
8. `ReactFlux` - 7 edges
9. `ReactFlux HTML shell` - 7 edges
10. `updateFontFamily()` - 6 edges

## Surprising Connections (you probably didn't know these)

- `getTodayEntries()` --calls--> `get24HoursAgoTimestamp()` [INFERRED]
  src\apis\entries.js → src\utils\date.js
- `Content()` --calls--> `useArticleList()` [INFERRED]
  src\components\Content\Content.jsx → src\hooks\useArticleList.js
- `Light and dark theme color metadata` --semantically_similar_to--> `Dark mode and custom theme support` [INFERRED] [semantically similar]
  index.html → README.md
- `updateFontFamily()` --calls--> `All()` [INFERRED]
  scripts\update-fonts.js → src\pages\All.jsx
- `App()` --calls--> `useFeedIconsSync()` [INFERRED]
  src\App.jsx → src\hooks\useFeedIconsSync.js

## Hyperedges (group relationships)

- **Multilingual README set** — readme_en_doc, readme_de_doc, readme_es_doc, readme_fr_doc, readme_zh_cn_doc [EXTRACTED 1.00]
- **ReactFlux deployment options** — readme_static_spa_deployment, readme_cloudflare_pages, readme_gh_pages_branch, readme_vercel, readme_docker [EXTRACTED 1.00]
- **HTML bootstrap shell** — index_html_doc, index_html_main_jsx_entry, index_html_loading_spinner, index_html_pwa_manifest_metadata [EXTRACTED 1.00]
- **Multi-Device Interface System** — devices_reactflux_interface, devices_desktop_three_pane_layout, devices_mobile_article_view [EXTRACTED 1.00]
- **Feed Reading Workflow** — screenshot_feed_sidebar, screenshot_article_list, screenshot_article_detail_view, screenshot_secret_level_article [INFERRED 0.82]
- **Global Allow Crawling Policy** — robots_robots_txt, robots_all_user_agents, robots_allow_all_crawling [INFERRED 0.82]
- **Reading With Coffee Scene** — background_background_image, background_open_book, background_coffee_mug, background_reading_activity [INFERRED 0.91]

## Communities

### Community 0 - "Feed Management UI"

Cohesion: 0.07
Nodes (16): ActionButtons(), AddFeed(), Content(), ContextProvider(), AddFeedModal(), SettingsModal(), Profile(), MoreOptionsDropdown() (+8 more)

### Community 1 - "App Shell & Docs"

Cohesion: 0.12
Nodes (27): ReactFlux HTML shell, External LXGW WenKai font stylesheet, Initial loading spinner, /src/main.jsx entrypoint, Web app manifest metadata, Light and dark theme color metadata, Arco Design and Day.js i18n packages, Article and feed management (+19 more)

### Community 2 - "Entry API Queries"

Cohesion: 0.13
Nodes (15): addDateFilters(), buildEntriesUrl(), getAllEntries(), getCategoryEntries(), getFeedEntries(), getHistoryEntries(), getOriginalContent(), getStarredEntries() (+7 more)

### Community 3 - "Settings UI Components"

Cohesion: 0.09
Nodes (7): CustomTooltip(), SearchAndSortBar(), SettingsTabs(), CategoryTitle(), FeedMenuItem(), SidebarTrigger(), useScreenWidth()

### Community 4 - "Entry View Utilities"

Cohesion: 0.2
Nodes (15): All(), getEntries(), buildGoogleFontsURL(), buildVersionInfo(), calculateHash(), checkForChanges(), cleanFontDirectory(), downloadFont() (+7 more)

### Community 5 - "Appearance Controls"

Cohesion: 0.15
Nodes (8): handleConfigChange(), applyColor(), getColorFromPalette(), getColorValue(), getDisplayColorValue(), isDarkMode(), handleFilterChange(), updateSettings()

### Community 6 - "Sidebar Feed Organization"

Cohesion: 0.12
Nodes (9): CategoryList(), getUTCDate(), EditCategoryModal(), FeedList(), RefreshModal(), Sidebar(), useCategoryOperations(), updateFeedStatus() (+1 more)

### Community 7 - "App Bootstrap & Auth"

Cohesion: 0.14
Nodes (8): App(), getLocale(), isValidAuth(), Login(), RouterProtect(), useFeedIconsSync(), useLanguage(), useTheme()

### Community 8 - "Article List State"

Cohesion: 0.15
Nodes (7): setEntriesWithDeduplication(), checkIsInLast24Hours(), removeDuplicateEntries(), handleResponses(), useArticleList(), handleEntriesStatusUpdate(), handleEntryStatusUpdate()

### Community 9 - "Rich Content Parsing"

Cohesion: 0.22
Nodes (6): decodeAndParseCodeContent(), handleBskyVideo(), handleCodeBlock(), handleFigure(), handleImage(), handleTableBasedCode()

### Community 10 - "Article Card Metadata"

Cohesion: 0.18
Nodes (7): ArticleCard(), generateReadingTime(), generateRelativeTime(), get24HoursAgoTimestamp(), getDayEndTimestamp(), getTimestamp(), addTimeRangeParams()

### Community 11 - "Feed Icons & URL Utils"

Cohesion: 0.2
Nodes (5): FeedIcon(), getFallbackIconURL(), getHostname(), getSecondHostname(), useFeedIcons()

### Community 12 - "Category Settings API"

Cohesion: 0.18
Nodes (3): updateCategory(), General(), compareVersions()

### Community 13 - "Search Filtering"

Cohesion: 0.29
Nodes (7): filterEntries(), computeLPSArray(), extractBasicSearchTerms(), filterByQuery(), filterData(), kmpSearch(), parseQuery()

### Community 14 - "Feed Management API"

Cohesion: 0.22
Nodes (0):

### Community 15 - "Integration Utilities"

Cohesion: 0.25
Nodes (2): getCurrentUser(), markAllAsRead()

### Community 16 - "Reading Experience Mockup"

Cohesion: 0.38
Nodes (7): Article Detail View, Article List, Context-Preserving Reading, Feed Sidebar, ReactFlux, Secret Level Trailer Article, Split-View Reading Layout

### Community 17 - "Image Extraction Utils"

Cohesion: 0.53
Nodes (4): findImageEnclosure(), findMediaEnclosure(), getWeiboFirstImage(), parseCoverImage()

### Community 18 - "Infinite Article Loading"

Cohesion: 0.4
Nodes (2): LoadMoreComponent(), useLoadMore()

### Community 19 - "Media Playback"

Cohesion: 0.5
Nodes (2): getMediaType(), getMimeType()

### Community 20 - "Hotkey State"

Cohesion: 0.5
Nodes (3): resetHotkey(), updateHotkey(), createSetter()

### Community 21 - "Cross-Device Mockup"

Cohesion: 0.5
Nodes (5): Cross-Device Reading Experience, Desktop Three-Pane Layout, Mobile Article View, ReactFlux Interface, Devices Showcase Mockup

### Community 22 - "Code Block Rendering"

Cohesion: 0.5
Nodes (0):

### Community 23 - "Image Overlay UI"

Cohesion: 0.67
Nodes (2): findImageNode(), ImageOverlayButton()

### Community 24 - "Editable Tag Input"

Cohesion: 0.67
Nodes (2): EditableTagGroup(), processKeyName()

### Community 25 - "Locale Text Utilities"

Cohesion: 0.5
Nodes (0):

### Community 26 - "Crawling Policy"

Cohesion: 0.5
Nodes (4): All User Agents, Allow All Crawling, Robots.txt, Robots.txt Specification

### Community 27 - "Reading Scene Background"

Cohesion: 0.83
Nodes (4): Background Reading Scene, Coffee Mug, Open Book, Reading Activity

### Community 28 - "Loading Skeletons"

Cohesion: 0.67
Nodes (0):

### Community 29 - "Ripple Effect"

Cohesion: 1.0
Nodes (2): Ripple(), useDebouncedRippleCleanUp()

### Community 30 - "Auth State"

Cohesion: 1.0
Nodes (2): resetAuth(), setAuth()

### Community 31 - "Data Readiness State"

Cohesion: 0.67
Nodes (0):

### Community 32 - "Feed Icon State"

Cohesion: 0.67
Nodes (0):

### Community 33 - "Heading Navigation"

Cohesion: 0.67
Nodes (0):

### Community 34 - "Form Validation"

Cohesion: 0.67
Nodes (0):

### Community 35 - "API Client"

Cohesion: 1.0
Nodes (0):

### Community 36 - "Article Table of Contents"

Cohesion: 1.0
Nodes (0):

### Community 37 - "Image Link Tag"

Cohesion: 1.0
Nodes (0):

### Community 38 - "Editable Tag"

Cohesion: 1.0
Nodes (0):

### Community 39 - "Keyboard Shortcuts"

Cohesion: 1.0
Nodes (0):

### Community 40 - "Settings Item"

Cohesion: 1.0
Nodes (0):

### Community 41 - "Custom Link"

Cohesion: 1.0
Nodes (0):

### Community 42 - "Edit Feed Modal"

Cohesion: 1.0
Nodes (0):

### Community 43 - "Fade Transition"

Cohesion: 1.0
Nodes (0):

### Community 44 - "Category Page"

Cohesion: 1.0
Nodes (0):

### Community 45 - "Error Page"

Cohesion: 1.0
Nodes (0):

### Community 46 - "Feed Page"

Cohesion: 1.0
Nodes (0):

### Community 47 - "Sidebar Expansion State"

Cohesion: 1.0
Nodes (0):

### Community 48 - "Syntax Highlighting"

Cohesion: 1.0
Nodes (0):

### Community 49 - "Initial Loading Spinner"

Cohesion: 1.0
Nodes (0):

### Community 50 - "Time Utilities"

Cohesion: 1.0
Nodes (0):

### Community 51 - "RSS Feed Icon"

Cohesion: 1.0
Nodes (2): Default Feed Icon, RSS Feed

### Community 52 - "App Logo"

Cohesion: 1.0
Nodes (2): Application Logo, Stylized Document Icon

### Community 53 - "ESLint Config"

Cohesion: 1.0
Nodes (0):

### Community 54 - "Vite Config"

Cohesion: 1.0
Nodes (0):

### Community 55 - "App Entry Point"

Cohesion: 1.0
Nodes (0):

### Community 56 - "Route Definitions"

Cohesion: 1.0
Nodes (0):

### Community 57 - "App Constants"

Cohesion: 1.0
Nodes (0):

### Community 58 - "Document Icon"

Cohesion: 1.0
Nodes (1): Document Icon

## Knowledge Gaps

- **26 isolated node(s):** `User-friendly reading experience`, `Customizable reading experience`, `Article and feed management`, `URL rewriting to index.html`, `Arco Design and Day.js i18n packages` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `API Client`** (2 nodes): `createApiClient()`, `ofetch.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Article Table of Contents`** (2 nodes): `ArticleTOC()`, `ArticleTOC.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Image Link Tag`** (2 nodes): `ImageLinkTag()`, `ImageLinkTag.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Editable Tag`** (2 nodes): `EditableTag()`, `EditableTag.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Keyboard Shortcuts`** (2 nodes): `Hotkeys()`, `Hotkeys.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Settings Item`** (2 nodes): `SettingItem()`, `SettingItem.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Custom Link`** (2 nodes): `CustomLink()`, `CustomLink.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Edit Feed Modal`** (2 nodes): `EditFeedModal()`, `EditFeedModal.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fade Transition`** (2 nodes): `FadeTransition()`, `FadeTransition.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Category Page`** (2 nodes): `Category()`, `Category.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Error Page`** (2 nodes): `ErrorPage()`, `ErrorPage.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Feed Page`** (2 nodes): `Feed()`, `Feed.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sidebar Expansion State`** (2 nodes): `setExpandedCategories()`, `sidebarState.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Syntax Highlighting`** (2 nodes): `registerLanguages()`, `highlighter.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Initial Loading Spinner`** (2 nodes): `hideSpinner()`, `loading.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Time Utilities`** (2 nodes): `time.js`, `sleep()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `RSS Feed Icon`** (2 nodes): `Default Feed Icon`, `RSS Feed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Logo`** (2 nodes): `Application Logo`, `Stylized Document Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Entry Point`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Route Definitions`** (1 nodes): `routes.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Constants`** (1 nodes): `constants.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Document Icon`** (1 nodes): `Document Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `useScreenWidth()` connect `Settings UI Components` to `Feed Management UI`, `Category Settings API`, `Sidebar Feed Organization`, `App Bootstrap & Auth`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `useEntryActions()` connect `Feed Management UI` to `Article List State`, `Article Card Metadata`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `ActionButtons()` connect `Feed Management UI` to `Settings UI Components`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `useScreenWidth()` (e.g. with `App()` and `ActionButtons()`) actually correct?**
  _`useScreenWidth()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 9 inferred relationships involving `getSettings()` (e.g. with `getOriginalContent()` and `buildEntriesUrl()`) actually correct?**
  _`getSettings()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `Content()` (e.g. with `useDocumentTitle()` and `useContentContext()`) actually correct?**
  _`Content()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `User-friendly reading experience`, `Customizable reading experience`, `Article and feed management` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._
