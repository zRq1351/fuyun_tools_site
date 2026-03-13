const yearNode = document.querySelector(".footer p")
if (yearNode) {
  yearNode.textContent = `© ${new Date().getFullYear()} fuyun_tools`
}

for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href")
    if (!targetId || targetId === "#") return
    const target = document.querySelector(targetId)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  })
}

const lightbox = document.querySelector("#lightbox")
const lightboxImage = document.querySelector(".lightbox-image")
const lightboxClose = document.querySelector(".lightbox-close")

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) return
  lightboxImage.src = src
  lightboxImage.alt = alt || ""
  lightbox.classList.add("is-open")
  lightbox.setAttribute("aria-hidden", "false")
}

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return
  lightbox.classList.remove("is-open")
  lightbox.setAttribute("aria-hidden", "true")
  lightboxImage.src = ""
}

for (const trigger of document.querySelectorAll(".shot-trigger")) {
  trigger.addEventListener("click", () => {
    const src = trigger.getAttribute("data-lightbox-src")
    const alt = trigger.getAttribute("data-lightbox-alt")
    if (!src) return
    openLightbox(src, alt)
  })
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox()
    }
  })
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox)
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox()
  }
})

const LANG_STORAGE_KEY = "fuyun_tools_site_lang"
const langButtons = document.querySelectorAll(".lang-btn")
const releaseButtons = document.querySelectorAll(".js-latest-exe")
const releaseVersionNodes = document.querySelectorAll(".js-latest-version")
const versionLabelNodes = document.querySelectorAll(".js-version-label")
const i18nTextNodes = document.querySelectorAll("[data-i18n]")
const i18nAriaNodes = document.querySelectorAll("[data-i18n-aria-label]")
const i18nAltNodes = document.querySelectorAll("[data-i18n-alt]")
const lightboxAltTriggers = document.querySelectorAll(".shot-trigger")

const i18nMap = {
  zh: {
    nav_features: "功能",
    nav_usage: "使用",
    nav_gallery: "界面",
    nav_platform: "平台",
    nav_architecture: "架构",
    github_repo_label: "GitHub 仓库",
    hero_badge: "Windows AI 划词 + 跨平台剪贴板管理",
    hero_title: "把剪贴板和 AI 划词，做成一条真正可用的效率链路",
    hero_desc: "fuyun_tools 常驻系统托盘，通过统一快捷键管理文字与图片历史；在 Windows 上进一步打通选词、翻译、解释、复制的完整路径。",
    view_source: "查看源码",
    meta_stack: "技术栈：Vue 3 + Element Plus + Tauri 2 + Rust",
    meta_ai_sdk: "AI SDK：async-openai（OpenAI 兼容）",
    latest_version_label: "当前最新版本：",
    logo_showcase_title: "品牌图标",
    logo_showcase_desc: "统一用于网站 Logo、分享卡片与应用识别",
    logo_alt: "fuyun_tools 品牌图标",
    core_title: "核心能力",
    core_1: "文本剪贴板自动记录、搜索、分类、回填",
    core_2: "图片剪贴板缩略图管理、双击回填、全屏预览",
    core_3: "Windows 划词工具栏支持翻译 / 解释 / 复制",
    core_4: "支持 DeepSeek、通义千问、小米 Mimo 与自定义 OpenAI 兼容服务",
    core_5: "全局热键、托盘菜单、开机自启、应用更新",
    features_title: "功能模块",
    feature_1_title: "剪贴板管理",
    feature_1_desc: "支持历史上限策略、分类管理、键盘与鼠标双路径交互，适合高频复制粘贴场景。",
    feature_2_title: "图片剪贴板",
    feature_2_desc: "自动识别并持久化图片历史，支持搜索、分类、双击回填与大图预览。",
    feature_3_title: "AI 划词助手",
    feature_3_desc: "Windows 下监听文本选择与鼠标事件，自动弹出工具栏并流式输出翻译或解释结果。",
    feature_4_title: "AI 服务配置",
    feature_4_desc: "内置多提供商并支持自定义服务，API Key 本地加密保存，提供连接测试能力。",
    feature_5_title: "系统集成",
    feature_5_desc: "应用常驻托盘，支持热键唤起文本/图片窗口，具备自动更新与开机自启。",
    feature_6_title: "数据与安全",
    feature_6_desc: "历史记录与配置本地存储，生产环境默认不落日志文件，降低敏感信息暴露风险。",
    usage_title: "软件使用流程",
    usage_1_title: "启动与唤出",
    usage_1_desc: "启动后常驻托盘，使用 Ctrl+Shift+Z 快速打开剪贴板窗口。",
    usage_2_title: "快速回填",
    usage_2_desc: "通过方向键、回车或双击，选择历史项并回填到当前焦点应用。",
    usage_3_title: "AI 划词处理",
    usage_3_desc: "Windows 选中文本后自动弹出工具栏，一键翻译、解释与复制。",
    usage_4_title: "配置模型与策略",
    usage_4_desc: "在设置中配置 AI Provider 与模型，同时调整历史上限和分类策略。",
    gallery_title: "界面预览",
    gallery_desc: "以下为软件真实界面截图，展示核心工作流与窗口体验。",
    gallery_1: "文本剪贴板窗口",
    gallery_2: "图片历史管理",
    gallery_3: "大图预览模式",
    gallery_4: "划词工具栏",
    gallery_5: "AI 结果窗口",
    gallery_6: "设置页（AI 配置）",
    platform_title: "平台兼容性",
    table_feature: "功能",
    table_clipboard: "剪贴板管理",
    table_ai_selection: "AI 划词",
    table_tray_hotkey: "托盘与热键",
    arch_title: "实现架构",
    arch_1_title: "前端层",
    arch_1_desc: "多页面 Vue 结构分别承载剪贴板、图片管理、设置、划词工具栏与结果窗口。",
    arch_2_title: "Tauri 运行层",
    arch_2_desc: "Rust 侧统一管理全局快捷键、托盘菜单、窗口行为、插件能力与状态同步。",
    arch_3_title: "业务服务层",
    arch_3_desc: "拆分为 clipboard/image_clipboard/ai 服务，包含历史监听、流式 AI 调用与错误处理。",
    arch_4_title: "Windows 扩展特性",
    arch_4_desc: "通过鼠标监听与文本选择模块，驱动划词链路及工具栏的即时显示与交互。",
    cta_title: "开始使用 fuyun_tools",
    cta_desc: "下载发布包，首次运行后自动生成配置。在设置中配置模型与 API Key 即可开始 AI 划词。",
    view_guide: "查看使用说明",
    github_repo: "GitHub 仓库",
    close_preview: "关闭预览",
    download_latest_exe: "下载最新版（Windows .exe）",
    version_loading: "加载中...",
    gallery_alt_1: "fuyun_tools 文本剪贴板窗口",
    gallery_alt_2: "fuyun_tools 图片剪贴板列表",
    gallery_alt_3: "fuyun_tools 图片全屏预览",
    gallery_alt_4: "fuyun_tools 划词工具栏",
    gallery_alt_5: "fuyun_tools AI 结果窗口",
    gallery_alt_6: "fuyun_tools 设置页面",
    doc_title: "fuyun_tools - 系统托盘效率工具",
    doc_desc: "fuyun_tools 是一款集剪贴板历史管理与 Windows AI 划词能力于一体的桌面效率工具。",
    og_desc: "统一管理文字与图片剪贴板，在 Windows 上实现 AI 划词翻译与解释。"
  },
  en: {
    nav_features: "Features",
    nav_usage: "Workflow",
    nav_gallery: "Screenshots",
    nav_platform: "Platforms",
    nav_architecture: "Architecture",
    github_repo_label: "GitHub Repository",
    hero_badge: "Windows AI Text Selection + Cross-platform Clipboard",
    hero_title: "Turn Clipboard and AI Selection into One Efficient Workflow",
    hero_desc: "fuyun_tools runs in the system tray, unifies text and image clipboard history with hotkeys, and completes selection → translate/explain → copy on Windows.",
    view_source: "View Source",
    meta_stack: "Stack: Vue 3 + Element Plus + Tauri 2 + Rust",
    meta_ai_sdk: "AI SDK: async-openai (OpenAI compatible)",
    latest_version_label: "Latest Version: ",
    logo_showcase_title: "Brand Icon",
    logo_showcase_desc: "Used consistently in site logo, share cards, and product identity",
    logo_alt: "fuyun_tools brand icon",
    core_title: "Core Capabilities",
    core_1: "Auto capture, search, categorize, and refill text clipboard items",
    core_2: "Image clipboard thumbnails, double-click refill, and fullscreen preview",
    core_3: "Windows selection toolbar for translate / explain / copy",
    core_4: "DeepSeek, Qwen, Xiaomi Mimo, and custom OpenAI-compatible providers",
    core_5: "Global hotkeys, tray menu, auto-start, and in-app update",
    features_title: "Feature Modules",
    feature_1_title: "Clipboard Manager",
    feature_1_desc: "Supports retention policy, categories, keyboard and mouse interaction for high-frequency copy/paste.",
    feature_2_title: "Image Clipboard",
    feature_2_desc: "Automatically records image history with search, categories, double-click refill, and large preview.",
    feature_3_title: "AI Selection Assistant",
    feature_3_desc: "On Windows, listens to text selection and mouse events, then streams translation/explanation results.",
    feature_4_title: "AI Provider Config",
    feature_4_desc: "Built-in providers plus custom services, encrypted local API key storage, and connection testing.",
    feature_5_title: "System Integration",
    feature_5_desc: "Tray-resident app with global hotkeys for text/image windows, auto-update, and auto-start.",
    feature_6_title: "Data & Security",
    feature_6_desc: "Local-only storage for history and settings, with safer logging defaults in production.",
    usage_title: "Usage Flow",
    usage_1_title: "Launch & Open",
    usage_1_desc: "Run in tray and press Ctrl+Shift+Z to open clipboard window quickly.",
    usage_2_title: "Quick Refill",
    usage_2_desc: "Use arrow keys, Enter, or double-click to refill selected history item.",
    usage_3_title: "AI Selection",
    usage_3_desc: "Select text on Windows to open toolbar and trigger translate/explain/copy in one click.",
    usage_4_title: "Model & Policy",
    usage_4_desc: "Configure AI provider/model and tune history limits and grouping strategy in settings.",
    gallery_title: "UI Preview",
    gallery_desc: "Real screenshots of the product workflow and core windows.",
    gallery_1: "Text Clipboard Window",
    gallery_2: "Image History Management",
    gallery_3: "Fullscreen Preview",
    gallery_4: "Selection Toolbar",
    gallery_5: "AI Result Window",
    gallery_6: "Settings (AI Config)",
    platform_title: "Platform Compatibility",
    table_feature: "Feature",
    table_clipboard: "Clipboard Manager",
    table_ai_selection: "AI Text Selection",
    table_tray_hotkey: "Tray & Hotkeys",
    arch_title: "Architecture",
    arch_1_title: "Frontend Layer",
    arch_1_desc: "Multi-page Vue windows for clipboard, image manager, settings, toolbar, and result display.",
    arch_2_title: "Tauri Runtime",
    arch_2_desc: "Rust layer handles global shortcuts, tray menu, window behavior, plugins, and state sync.",
    arch_3_title: "Service Layer",
    arch_3_desc: "Split clipboard/image/ai services for history listeners, streaming AI calls, and error handling.",
    arch_4_title: "Windows Extensions",
    arch_4_desc: "Mouse listener and text selection modules drive toolbar visibility and selection workflow.",
    cta_title: "Get Started with fuyun_tools",
    cta_desc: "Download the release package. Settings are generated on first run. Configure model and API key to start AI selection.",
    view_guide: "View Guide",
    github_repo: "GitHub Repository",
    close_preview: "Close Preview",
    download_latest_exe: "Download Latest (Windows .exe)",
    version_loading: "Loading...",
    gallery_alt_1: "fuyun_tools text clipboard window",
    gallery_alt_2: "fuyun_tools image clipboard list",
    gallery_alt_3: "fuyun_tools image fullscreen preview",
    gallery_alt_4: "fuyun_tools selection toolbar",
    gallery_alt_5: "fuyun_tools AI result window",
    gallery_alt_6: "fuyun_tools settings page",
    doc_title: "fuyun_tools - Tray Productivity Tool",
    doc_desc: "fuyun_tools is a desktop productivity tool combining clipboard history management and Windows AI text selection.",
    og_desc: "Manage text and image clipboard in one place and run AI translation/explanation for selected text on Windows."
  }
}

let currentLang = "zh"
let latestReleaseState = {
  tagName: "",
  publishedAt: "",
  exeUrl: ""
}

const getText = (key) => i18nMap[currentLang]?.[key] || i18nMap.zh[key] || key

const applyLanguage = () => {
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN"
  for (const node of i18nTextNodes) {
    const key = node.getAttribute("data-i18n")
    if (!key) continue
    node.textContent = getText(key)
  }
  for (const node of i18nAriaNodes) {
    const key = node.getAttribute("data-i18n-aria-label")
    if (!key) continue
    node.setAttribute("aria-label", getText(key))
  }
  for (const node of i18nAltNodes) {
    const key = node.getAttribute("data-i18n-alt")
    if (!key) continue
    node.setAttribute("alt", getText(key))
  }
  const galleryAltKeys = ["gallery_alt_1", "gallery_alt_2", "gallery_alt_3", "gallery_alt_4", "gallery_alt_5", "gallery_alt_6"]
  lightboxAltTriggers.forEach((trigger, index) => {
    const key = galleryAltKeys[index]
    if (!key) return
    trigger.setAttribute("data-lightbox-alt", getText(key))
  })
  document.title = getText("doc_title")
  const descriptionMeta = document.querySelector('meta[name="description"]')
  const ogTitleMeta = document.querySelector('meta[property="og:title"]')
  const ogDescriptionMeta = document.querySelector('meta[property="og:description"]')
  const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]')
  const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]')
  if (descriptionMeta) descriptionMeta.setAttribute("content", getText("doc_desc"))
  if (ogTitleMeta) ogTitleMeta.setAttribute("content", getText("doc_title"))
  if (ogDescriptionMeta) ogDescriptionMeta.setAttribute("content", getText("og_desc"))
  if (twitterTitleMeta) twitterTitleMeta.setAttribute("content", getText("doc_title"))
  if (twitterDescriptionMeta) twitterDescriptionMeta.setAttribute("content", getText("og_desc"))
  for (const button of langButtons) {
    button.classList.toggle("is-active", button.getAttribute("data-lang") === currentLang)
  }
}

const selectWindowsExeAsset = (assets) => {
  const exeAssets = assets.filter((asset) => asset && typeof asset.name === "string" && asset.name.toLowerCase().endsWith(".exe"))
  if (!exeAssets.length) return null
  const score = (name) => {
    const lower = name.toLowerCase()
    let value = 0
    if (lower.includes("setup")) value += 4
    if (lower.includes("installer")) value += 3
    if (lower.includes("x64")) value += 2
    if (lower.includes("windows")) value += 1
    return value
  }
  return exeAssets.sort((a, b) => score(b.name) - score(a.name))[0]
}

const applyLatestExeUrl = (url = "") => {
  if (!url) return
  for (const button of releaseButtons) {
    button.href = url
  }
}

const applyLatestVersionToButtons = (tagName = "") => {
  const text = tagName
    ? currentLang === "en"
      ? `Download ${tagName} (Windows .exe)`
      : `下载 ${tagName}（Windows .exe）`
    : getText("download_latest_exe")
  for (const button of releaseButtons) {
    button.textContent = text
  }
}

const applyLatestVersion = (tagName = "", publishedAt = "") => {
  if (!releaseVersionNodes.length) return
  const dateText = publishedAt ? new Date(publishedAt).toISOString().slice(0, 10) : ""
  const fallbackText = getText("version_loading")
  const text = tagName
    ? dateText
      ? currentLang === "en"
        ? `${tagName} (${dateText})`
        : `${tagName}（${dateText}）`
      : tagName
    : fallbackText
  for (const node of releaseVersionNodes) {
    node.textContent = text
  }
}

const applyReleaseUi = () => {
  applyLatestVersion(latestReleaseState.tagName, latestReleaseState.publishedAt)
  applyLatestVersionToButtons(latestReleaseState.tagName)
  applyLatestExeUrl(latestReleaseState.exeUrl)
}

const loadLatestReleaseInfo = async () => {
  if (!releaseButtons.length && !releaseVersionNodes.length) return
  try {
    const response = await fetch("https://api.github.com/repos/zRq1351/fuyun_tools/releases/latest")
    if (!response.ok) return
    const latestRelease = await response.json()
    latestReleaseState.tagName = latestRelease.tag_name || ""
    latestReleaseState.publishedAt = latestRelease.published_at || ""
    if (latestRelease.tag_name) {
      applyLatestVersion(latestReleaseState.tagName, latestReleaseState.publishedAt)
      applyLatestVersionToButtons(latestReleaseState.tagName)
    }
    const exeAsset = selectWindowsExeAsset(Array.isArray(latestRelease.assets) ? latestRelease.assets : [])
    latestReleaseState.exeUrl = exeAsset?.browser_download_url || ""
    if (!latestReleaseState.exeUrl) return
    applyLatestExeUrl(latestReleaseState.exeUrl)
  } catch (_error) {
  }
}

const initializeLanguage = () => {
  const storedLang = localStorage.getItem(LANG_STORAGE_KEY)
  if (storedLang === "en" || storedLang === "zh") {
    currentLang = storedLang
  }
  applyLanguage()
  applyReleaseUi()
  for (const button of langButtons) {
    button.addEventListener("click", () => {
      const nextLang = button.getAttribute("data-lang")
      if (nextLang !== "zh" && nextLang !== "en") return
      if (nextLang === currentLang) return
      currentLang = nextLang
      localStorage.setItem(LANG_STORAGE_KEY, currentLang)
      applyLanguage()
      applyReleaseUi()
    })
  }
}

initializeLanguage()
loadLatestReleaseInfo()
