const yearNode = document.querySelector(".footer p");
if (yearNode) {
  yearNode.textContent = `© ${new Date().getFullYear()} fuyun_tools`;
}

for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const backToTopButton = document.querySelector(".back-to-top");

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

for (const trigger of document.querySelectorAll(".shot-trigger")) {
  trigger.addEventListener("click", () => {
    const src = trigger.getAttribute("data-lightbox-src");
    const alt = trigger.getAttribute("data-lightbox-alt");
    if (!src) return;
    openLightbox(src, alt);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const updateBackToTopVisibility = () => {
  if (!backToTopButton) return;
  const visible = window.scrollY > 380;
  backToTopButton.classList.toggle("is-visible", visible);
};

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true,
  });
  updateBackToTopVisibility();
}

const LANG_STORAGE_KEY = "fuyun_tools_site_lang";
const langButtons = document.querySelectorAll(".lang-btn");
const releaseButtons = document.querySelectorAll(".js-latest-exe");
const releaseVersionNodes = document.querySelectorAll(".js-latest-version");
const versionLabelNodes = document.querySelectorAll(".js-version-label");
const i18nTextNodes = document.querySelectorAll("[data-i18n]");
const i18nAriaNodes = document.querySelectorAll("[data-i18n-aria-label]");
const i18nAltNodes = document.querySelectorAll("[data-i18n-alt]");
const lightboxAltTriggers = document.querySelectorAll(".shot-trigger");

const i18nMap = {
  zh: {
    nav_features: "功能",
    nav_usage: "使用",
    nav_gallery: "界面",
    nav_architecture: "架构",
    github_repo_label: "GitHub 仓库",
    hero_badge: "Windows AI 划词 + 截图标注录屏 OCR + 剪贴板管理 + 应用启动器 + 文档管理",
    hero_title: "把剪贴板、截图标注、录屏音频、AI 划词、应用启动与文档管理，整合为一个高效的桌面工具箱",
    hero_desc:
      "fuyun_tools 常驻系统托盘，通过统一快捷键管理文字/图片剪贴板历史、截图标注与 OCR、屏幕录制与音频采集、AI 划词翻译/解释、应用快速启动与文档管理，是 Windows 上一站式效率工具箱。",
    view_source: "查看源码",
    meta_stack: "技术栈：Vue 3 + Element Plus + Tauri 2 + Rust",
    meta_ai_sdk: "AI SDK：async-openai（OpenAI 兼容）",
    latest_version_label: "当前最新版本：",
    logo_showcase_title: "品牌图标",
    logo_showcase_desc: "统一用于网站 Logo、分享卡片与应用识别",
    logo_alt: "fuyun_tools 品牌图标",
    core_title: "核心能力",
    core_1: "文本剪贴板自动记录、去重、搜索、分类、回填",
    core_2: "图片剪贴板缩略图管理、双击回填、全屏预览、磁盘限额",
    core_3: "Windows 划词工具栏支持翻译 / 解释 / 复制 / 自定义提示词 / 网页搜索",
    core_screenshot: "Windows 截图标注工具：框选/圆形/箭头/文字/画笔/马赛克/取色器，支持长截图与固定到屏幕",
    core_7:
      "Windows 录屏胶囊支持开始/暂停/恢复/停止，系统音频+麦克风采集，按键说话",
    core_6: "Windows 固定图片窗口右键 OCR 识别，双引擎（Windows 原生 + PaddleOCR）离线运行",
    core_launcher: "Windows 应用启动器（Alt+Q）：扫描开始菜单，模糊搜索快速启动",
    core_docs: "Windows 文档管理器（Ctrl+Shift+D）：索引与仓库双模式，FTS5 全文搜索",
    core_4: "支持 DeepSeek、通义千问、小米 Mimo 与自定义 OpenAI 兼容服务，API Key 本地加密",
    core_backup: "数据备份与恢复：设置/历史/图片一键导出，支持自动备份与回滚",
    core_5: "全局热键、托盘菜单、开机自启、应用更新、系统诊断",
    features_title: "功能模块",
    feature_1_title: "剪贴板管理",
    feature_1_desc:
      "自动去重记录文本历史，支持分类、固定、容量保护，键盘方向键与鼠标双路径交互回填。",
    feature_2_title: "图片剪贴板",
    feature_2_desc:
      "自动捕获图片历史，异步缩略图加载，磁盘配额管理，支持分类、标记与全屏预览。",
    feature_3_title: "AI 划词助手",
    feature_3_desc:
      "Windows 下监听文本选择与鼠标事件，自动弹出工具栏，支持翻译/解释/复制/自定义提示词与网页搜索，流式输出。",
    feature_screenshot_title: "截图标注",
    feature_screenshot_desc:
      "区域截图与自动窗口检测，提供框选/圆形/箭头/文字/画笔/马赛克/取色器等标注工具，支持撤销重做、长截图与固定到屏幕。",
    feature_7_title: "图片 OCR",
    feature_7_desc:
      "固定图片窗口右键触发 OCR 识别，双引擎（Windows 原生 + PaddleOCR）离线运行，结果在独立文本窗口展示。",
    feature_8_title: "录屏与音频采集",
    feature_8_desc:
      "录屏胶囊支持开始/暂停/恢复/停止，支持系统音频与麦克风设备选择，按键说话，可配置帧率与码率参数，ffmpeg 按需下载。",
    feature_launcher_title: "应用启动器",
    feature_launcher_desc:
      "扫描开始菜单快捷方式，支持模糊搜索、分类管理、自定义命令，键盘导航快速启动应用（Alt+Q）。",
    feature_docs_title: "文档管理器",
    feature_docs_desc:
      "索引与仓库双模式，支持 PDF/Word 内容提取与 FTS5 全文搜索，分类管理、拖拽导入与导入撤销（Ctrl+Shift+D）。",
    feature_4_title: "AI 服务配置",
    feature_4_desc:
      "内置 DeepSeek、通义千问、小米 Mimo 提供商，支持自定义 OpenAI 兼容服务，API Key 本地加密保存，提供连接测试。",
    feature_backup_title: "备份与诊断",
    feature_backup_desc:
      "设置/历史/图片一键导出与恢复，支持自动备份与回滚保护；内置系统诊断面板监控存储、依赖与性能状态。",
    feature_5_title: "系统集成",
    feature_5_desc:
      "应用常驻托盘，支持 6 组全局热键，具备开机自启、自动更新、主题切换（暗色/亮色/护眼），零数据上传，OCR 完全离线。",
    usage_title: "软件使用流程",
    usage_1_title: "基础配置与启动",
    usage_1_desc: "启动后常驻托盘，建议首先进入设置配置 AI 服务与 API Key、调整各类历史上限与快捷键设置。",
    usage_2_title: "文本与图片剪贴板",
    usage_2_desc: "使用 Ctrl+Shift+Z / Ctrl+Shift+X 快速唤出文字/图片窗口，通过方向键、回车或双击回填到当前焦点应用。",
    usage_3_title: "AI 划词助手",
    usage_3_desc: "Windows 任意应用中选中文本自动弹出工具栏，支持一键翻译、解释、复制及自定义提示词流式结果展示。",
    usage_4_title: "截图标注与 OCR",
    usage_4_desc: "使用 Ctrl+Shift+S 区域截图，通过标注工具编辑后复制/保存/固定到屏幕，在固定窗口右键触发 OCR 文字识别。",
    usage_5_title: "录屏与音频采集",
    usage_5_desc: "进入设置启用录屏后通过录屏胶囊开始录制（Alt+R）；首次自动检查并按需下载 ffmpeg，支持按键说话控制麦克风。",
    usage_launcher_title: "应用启动器",
    usage_launcher_desc: "使用 Alt+Q 唤出启动器，输入关键词模糊匹配应用名称，回车快速启动；支持分类管理与自定义命令。",
    usage_docs_title: "文档管理器",
    usage_docs_desc: "使用 Ctrl+Shift+D 打开文档管理器，拖拽导入文件，按分类整理，FTS5 全文搜索快速定位，支持导入撤销。",
    usage_backup_title: "数据备份与恢复",
    usage_backup_desc: "在设置中手动导出备份包，或开启自动备份按日/周/月定期执行；支持合并/覆写两种恢复策略与回滚保护。",
    gallery_title: "界面预览",
    gallery_desc: "以下为软件真实界面截图，展示核心工作流与窗口体验。",
    gallery_1: "文本剪贴板窗口",
    gallery_2: "图片历史管理",
    gallery_3: "大图预览模式",
    gallery_4: "划词工具栏",
    gallery_5: "AI 结果窗口",
    gallery_6: "设置页（AI 配置）",
    gallery_7: "应用启动器",
    gallery_8: "启动器分类管理",
    gallery_9: "文档管理器",
    gallery_10: "文档导入管理",
    arch_title: "实现架构",
    arch_1_title: "前端层",
    arch_1_desc:
      "多页面 Vue 结构分别承载剪贴板、图片管理、截图编辑、录屏胶囊、启动器、文档管理、设置、划词工具栏与结果窗口。",
    arch_2_title: "Tauri 运行层",
    arch_2_desc:
      "Rust 侧统一管理全局快捷键、托盘菜单、窗口行为、插件能力与状态同步。",
    arch_3_title: "业务服务层",
    arch_3_desc:
      "拆分为 clipboard / image_clipboard / ai / screenshot / recording / launcher / document / backup / diagnostic 服务，涵盖历史监听、流式 AI、截图标注、录屏采集与数据备份。",
    arch_4_title: "Windows 扩展特性",
    arch_4_desc:
      "通过全局鼠标/键盘 Hook 与文本选择引擎，驱动划词工具栏与截图取色器等交互，结合 WASAPI/WGC 实现系统级音频与录屏采集。",
    cta_title: "开始使用 fuyun_tools",
    cta_desc:
      "下载发布包，首次运行后自动生成配置。在设置中配置 AI 模型与 API Key 即可开始 AI 划词，同时启用截图、录屏、启动器与文档管理等模块。",
    view_guide: "查看使用说明",
    github_repo: "GitHub 仓库",
    back_to_top_label: "回到顶部",
    close_preview: "关闭预览",
    download_latest_exe: "下载最新版（Windows .exe）",
    version_loading: "加载中...",
    gallery_alt_1: "fuyun_tools 文本剪贴板窗口",
    gallery_alt_2: "fuyun_tools 图片剪贴板列表",
    gallery_alt_3: "fuyun_tools 图片全屏预览",
    gallery_alt_4: "fuyun_tools 划词工具栏",
    gallery_alt_5: "fuyun_tools AI 结果窗口",
    gallery_alt_6: "fuyun_tools 设置页面",
    gallery_alt_7: "fuyun_tools 应用启动器",
    gallery_alt_8: "fuyun_tools 启动器分类管理",
    gallery_alt_9: "fuyun_tools 文档管理器",
    gallery_alt_10: "fuyun_tools 文档导入管理",
    doc_title: "fuyun_tools - 系统托盘效率工具",
    doc_desc:
      "fuyun_tools 是一款集剪贴板历史管理、截图标注与录屏、图片 OCR、Windows AI 划词、应用启动器与文档管理于一体的桌面效率工具。",
    og_desc:
      "统一管理文字与图片剪贴板，在 Windows 上实现 AI 划词翻译、截图标注、录屏音频采集、应用启动器、文档管理与图片 OCR 识别。",
  },
  en: {
    nav_features: "Features",
    nav_usage: "Workflow",
    nav_gallery: "Screenshots",
    nav_architecture: "Architecture",
    github_repo_label: "GitHub Repository",
    hero_badge:
      "Windows AI Text Selection + Screenshot Annotate Record OCR + Clipboard + App Launcher + Doc Manager",
    hero_title:
      "Clipboard, Screenshot Annotation, Screen Recording, AI Selection, App Launcher & Doc Manager — All in One Desktop Toolkit",
    hero_desc:
      "fuyun_tools runs in the system tray, unifying text/image clipboard history, screenshot annotation & OCR, screen recording with audio, AI-powered selection translate/explain, app launcher, and document management — a complete Windows productivity toolbox.",
    view_source: "View Source",
    meta_stack: "Stack: Vue 3 + Element Plus + Tauri 2 + Rust",
    meta_ai_sdk: "AI SDK: async-openai (OpenAI compatible)",
    latest_version_label: "Latest Version: ",
    logo_showcase_title: "Brand Icon",
    logo_showcase_desc:
      "Used consistently in site logo, share cards, and product identity",
    logo_alt: "fuyun_tools brand icon",
    core_title: "Core Capabilities",
    core_1: "Auto capture, dedup, search, categorize, and refill text clipboard items",
    core_2:
      "Image clipboard thumbnails, double-click refill, fullscreen preview, disk quota",
    core_3: "Windows selection toolbar for translate / explain / copy / custom prompts / web search",
    core_screenshot: "Windows screenshot annotation: rectangle/circle/arrow/text/brush/mosaic/color picker, long screenshot & pin to screen",
    core_7:
      "Windows recording capsule: start/pause/resume/stop, system audio + microphone capture, push-to-talk",
    core_6: "Windows image window right-click OCR, dual-engine (Windows Native + PaddleOCR) fully offline",
    core_launcher: "Windows app launcher (Alt+Q): scan Start Menu, fuzzy search, quick launch",
    core_docs: "Windows document manager (Ctrl+Shift+D): index & repository dual mode, FTS5 full-text search",
    core_4:
      "DeepSeek, Qwen, Xiaomi Mimo, and custom OpenAI-compatible providers, API Key encrypted locally",
    core_backup: "Data backup & restore: one-click export settings/history/images, auto-backup with rollback",
    core_5: "Global hotkeys, tray menu, auto-start, in-app update, system diagnostics",
    features_title: "Feature Modules",
    feature_1_title: "Clipboard Manager",
    feature_1_desc:
      "Auto dedup text history with categories, pinning, capacity protection, and keyboard/mouse refill to focused apps.",
    feature_2_title: "Image Clipboard",
    feature_2_desc:
      "Auto capture image history with async thumbnails, disk quota, categories, tags, and fullscreen preview.",
    feature_3_title: "AI Selection Assistant",
    feature_3_desc:
      "On Windows, listens to text selection and mouse events, then pops a toolbar offering translate/explain/copy/custom prompts and web search with streaming output.",
    feature_screenshot_title: "Screenshot Annotation",
    feature_screenshot_desc:
      "Region capture with smart window detection. Annotate with rectangle/circle/arrow/text/brush/mosaic/color picker. Undo/redo, long screenshot, and pin to screen.",
    feature_7_title: "Image OCR",
    feature_7_desc:
      "Right-click on pinned image to trigger OCR with dual engines (Windows Native + PaddleOCR), running fully offline. Results shown in a standalone window.",
    feature_8_title: "Screen Recording + Audio",
    feature_8_desc:
      "Recording capsule with start/pause/resume/stop, system + microphone audio, push-to-talk, configurable FPS/bitrate. ffmpeg downloaded on demand.",
    feature_launcher_title: "App Launcher",
    feature_launcher_desc:
      "Scans Start Menu shortcuts, fuzzy search, category management, custom commands. Keyboard navigation for quick app launch (Alt+Q).",
    feature_docs_title: "Document Manager",
    feature_docs_desc:
      "Index & repository dual mode, PDF/Word content extraction, FTS5 full-text search, category management, drag-drop import with undo (Ctrl+Shift+D).",
    feature_4_title: "AI Provider Config",
    feature_4_desc:
      "Built-in DeepSeek, Qwen, Xiaomi Mimo providers plus custom OpenAI-compatible services. API keys encrypted locally with connection testing.",
    feature_backup_title: "Backup & Diagnostics",
    feature_backup_desc:
      "One-click export/restore of settings, history & images with auto-backup and rollback protection. Built-in diagnostics panel for storage, dependencies & performance.",
    feature_5_title: "System Integration",
    feature_5_desc:
      "Tray-resident with 6 global hotkeys, auto-start, auto-update, theme switching (dark/light/eye-care), zero data collection, fully offline OCR.",
    usage_title: "Usage Flow",
    usage_1_title: "Basic Config & Launch",
    usage_1_desc:
      "Runs in tray after launch. Configure AI provider and API key in settings first, then adjust history limits and shortcuts as needed.",
    usage_2_title: "Text & Image Clipboard",
    usage_2_desc:
      "Use Ctrl+Shift+Z / Ctrl+Shift+X to quick open text/image windows. Refill to focused app via arrow keys, Enter or double-click.",
    usage_3_title: "AI Selection Assistant",
    usage_3_desc:
      "Select text in any Windows app to auto-pop toolbar, supporting one-click translate, explain, copy and custom prompt streaming results.",
    usage_4_title: "Screenshot Annotation & OCR",
    usage_4_desc:
      "Use Ctrl+Shift+S for region screenshot, edit with annotation tools, then copy/save/pin to screen. Right-click on pinned window for OCR text extraction.",
    usage_5_title: "Screen Recording + Audio",
    usage_5_desc:
      "Enable recording in settings, then start from the recording capsule (Alt+R); auto-checks and downloads ffmpeg on first use. Push-to-talk for microphone control.",
    usage_launcher_title: "App Launcher",
    usage_launcher_desc:
      "Press Alt+Q to open launcher, type to fuzzy-search apps by name, Enter to launch. Supports category management and custom commands.",
    usage_docs_title: "Document Manager",
    usage_docs_desc:
      "Press Ctrl+Shift+D to open document manager, drag-drop files to import, organize by category, use FTS5 full-text search to find files. Import undo supported.",
    usage_backup_title: "Backup & Restore",
    usage_backup_desc:
      "Manually export a backup package from settings, or enable scheduled auto-backup (daily/weekly/monthly). Supports merge/overwrite strategies with rollback protection.",
    gallery_title: "UI Preview",
    gallery_desc: "Real screenshots of the product workflow and core windows.",
    gallery_1: "Text Clipboard Window",
    gallery_2: "Image History Management",
    gallery_3: "Fullscreen Preview",
    gallery_4: "Selection Toolbar",
    gallery_5: "AI Result Window",
    gallery_6: "Settings (AI Config)",
    gallery_7: "App Launcher",
    gallery_8: "Launcher Category Management",
    gallery_9: "Document Manager",
    gallery_10: "Document Import Management",
    arch_title: "Architecture",
    arch_1_title: "Frontend Layer",
    arch_1_desc:
      "Multi-page Vue windows for clipboard, image manager, screenshot editor, recording capsule, launcher, document manager, settings, toolbar, and result display.",
    arch_2_title: "Tauri Runtime",
    arch_2_desc:
      "Rust layer handles global shortcuts, tray menu, window behavior, plugins, and state sync.",
    arch_3_title: "Service Layer",
    arch_3_desc:
      "Split into clipboard / image_clipboard / ai / screenshot / recording / launcher / document / backup / diagnostic services for history listeners, streaming AI, annotation, capture, and data backup.",
    arch_4_title: "Windows Extensions",
    arch_4_desc:
      "Global mouse/keyboard hooks and text selection engine drive the toolbar and screenshot workflows, leveraging WASAPI/WGC for system-level audio and screen capture.",
    cta_title: "Get Started with fuyun_tools",
    cta_desc:
      "Download the release package. Settings are generated on first run. Configure AI model and API key to start AI selection, and enable screenshot, recording, launcher, and document manager modules.",
    view_guide: "View Guide",
    github_repo: "GitHub Repository",
    back_to_top_label: "Back to top",
    close_preview: "Close Preview",
    download_latest_exe: "Download Latest (Windows .exe)",
    version_loading: "Loading...",
    gallery_alt_1: "fuyun_tools text clipboard window",
    gallery_alt_2: "fuyun_tools image clipboard list",
    gallery_alt_3: "fuyun_tools image fullscreen preview",
    gallery_alt_4: "fuyun_tools selection toolbar",
    gallery_alt_5: "fuyun_tools AI result window",
    gallery_alt_6: "fuyun_tools settings page",
    gallery_alt_7: "fuyun_tools app launcher",
    gallery_alt_8: "fuyun_tools launcher category management",
    gallery_alt_9: "fuyun_tools document manager",
    gallery_alt_10: "fuyun_tools document import management",
    doc_title: "fuyun_tools - Tray Productivity Tool",
    doc_desc:
      "fuyun_tools is a desktop productivity tool combining clipboard history, screenshot annotation, screen recording, image OCR, AI text selection, app launcher, and document management.",
    og_desc:
      "Manage text and image clipboard, run AI selection, screenshot annotation with OCR, screen recording with audio, app launcher, and document management on Windows.",
  },
};

const SITE_BASE_URL = window.location.origin + window.location.pathname;
let currentLang = "zh";
let latestReleaseState = {
  tagName: "",
  publishedAt: "",
  exeUrl: "",
};

const getText = (key) => i18nMap[currentLang]?.[key] || i18nMap.zh[key] || key;
const buildLanguageUrl = (lang) => `${SITE_BASE_URL}?lang=${lang}`;

const syncSeoLanguageUrls = () => {
  const canonical = document.querySelector('link[rel="canonical"]');
  const alternateZh = document.querySelector(
    'link[rel="alternate"][hreflang="zh-CN"]',
  );
  const alternateEn = document.querySelector(
    'link[rel="alternate"][hreflang="en"]',
  );
  const ogUrlMeta = document.querySelector('meta[property="og:url"]');
  const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
  const targetUrl = buildLanguageUrl(currentLang);
  if (canonical) canonical.setAttribute("href", targetUrl);
  if (alternateZh) alternateZh.setAttribute("href", buildLanguageUrl("zh"));
  if (alternateEn) alternateEn.setAttribute("href", buildLanguageUrl("en"));
  if (ogUrlMeta) ogUrlMeta.setAttribute("content", targetUrl);
  if (ogLocaleMeta)
    ogLocaleMeta.setAttribute(
      "content",
      currentLang === "en" ? "en_US" : "zh_CN",
    );
};

const applyLanguage = () => {
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
  for (const node of i18nTextNodes) {
    const key = node.getAttribute("data-i18n");
    if (!key) continue;
    node.textContent = getText(key);
  }
  for (const node of i18nAriaNodes) {
    const key = node.getAttribute("data-i18n-aria-label");
    if (!key) continue;
    node.setAttribute("aria-label", getText(key));
  }
  for (const node of i18nAltNodes) {
    const key = node.getAttribute("data-i18n-alt");
    if (!key) continue;
    node.setAttribute("alt", getText(key));
  }
  const galleryAltKeys = [
    "gallery_alt_1",
    "gallery_alt_2",
    "gallery_alt_3",
    "gallery_alt_4",
    "gallery_alt_5",
    "gallery_alt_6",
    "gallery_alt_7",
    "gallery_alt_8",
    "gallery_alt_9",
    "gallery_alt_10",
  ];
  lightboxAltTriggers.forEach((trigger, index) => {
    const key = galleryAltKeys[index];
    if (!key) return;
    trigger.setAttribute("data-lightbox-alt", getText(key));
  });
  document.title = getText("doc_title");
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  const ogDescriptionMeta = document.querySelector(
    'meta[property="og:description"]',
  );
  const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
  const twitterDescriptionMeta = document.querySelector(
    'meta[name="twitter:description"]',
  );
  if (descriptionMeta)
    descriptionMeta.setAttribute("content", getText("doc_desc"));
  if (ogTitleMeta) ogTitleMeta.setAttribute("content", getText("doc_title"));
  if (ogDescriptionMeta)
    ogDescriptionMeta.setAttribute("content", getText("og_desc"));
  if (twitterTitleMeta)
    twitterTitleMeta.setAttribute("content", getText("doc_title"));
  if (twitterDescriptionMeta)
    twitterDescriptionMeta.setAttribute("content", getText("og_desc"));
  syncSeoLanguageUrls();
  for (const button of langButtons) {
    button.classList.toggle(
      "is-active",
      button.getAttribute("data-lang") === currentLang,
    );
  }
};

const selectWindowsExeAsset = (assets) => {
  const exeAssets = assets.filter(
    (asset) =>
      asset &&
      typeof asset.name === "string" &&
      asset.name.toLowerCase().endsWith(".exe"),
  );
  if (!exeAssets.length) return null;
  const score = (name) => {
    const lower = name.toLowerCase();
    let value = 0;
    if (lower.includes("setup")) value += 4;
    if (lower.includes("installer")) value += 3;
    if (lower.includes("x64")) value += 2;
    if (lower.includes("windows")) value += 1;
    return value;
  };
  return exeAssets.sort((a, b) => score(b.name) - score(a.name))[0];
};

const applyLatestExeUrl = (url = "") => {
  if (!url) return;
  for (const button of releaseButtons) {
    button.href = url;
  }
};

const applyLatestVersionToButtons = (tagName = "") => {
  const text = tagName
    ? currentLang === "en"
      ? `Download ${tagName} (Windows .exe)`
      : `下载 ${tagName}（Windows .exe）`
    : getText("download_latest_exe");
  for (const button of releaseButtons) {
    button.textContent = text;
  }
};

const applyLatestVersion = (tagName = "", publishedAt = "") => {
  if (!releaseVersionNodes.length) return;
  const dateText = publishedAt
    ? new Date(publishedAt).toISOString().slice(0, 10)
    : "";
  const fallbackText = getText("version_loading");
  const text = tagName
    ? dateText
      ? currentLang === "en"
        ? `${tagName} (${dateText})`
        : `${tagName}（${dateText}）`
      : tagName
    : fallbackText;
  for (const node of releaseVersionNodes) {
    node.textContent = text;
  }
};

const applyReleaseUi = () => {
  applyLatestVersion(
    latestReleaseState.tagName,
    latestReleaseState.publishedAt,
  );
  applyLatestVersionToButtons(latestReleaseState.tagName);
  applyLatestExeUrl(latestReleaseState.exeUrl);
};

const loadLatestReleaseInfo = async () => {
  if (!releaseButtons.length && !releaseVersionNodes.length) return;
  try {
    const response = await fetch(
      "https://api.github.com/repos/zRq1351/fuyun_tools/releases/latest",
    );
    if (!response.ok) return;
    const latestRelease = await response.json();
    latestReleaseState.tagName = latestRelease.tag_name || "";
    latestReleaseState.publishedAt = latestRelease.published_at || "";
    if (latestRelease.tag_name) {
      applyLatestVersion(
        latestReleaseState.tagName,
        latestReleaseState.publishedAt,
      );
      applyLatestVersionToButtons(latestReleaseState.tagName);
    }
    const exeAsset = selectWindowsExeAsset(
      Array.isArray(latestRelease.assets) ? latestRelease.assets : [],
    );
    latestReleaseState.exeUrl = exeAsset?.browser_download_url || "";
    if (!latestReleaseState.exeUrl) return;
    applyLatestExeUrl(latestReleaseState.exeUrl);
  } catch (_error) {}
};

const initializeLanguage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const queryLang = searchParams.get("lang");
  const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  if (queryLang === "en" || queryLang === "zh") {
    currentLang = queryLang;
  } else if (storedLang === "en" || storedLang === "zh") {
    currentLang = storedLang;
  }
  applyLanguage();
  applyReleaseUi();
  for (const button of langButtons) {
    button.addEventListener("click", () => {
      const nextLang = button.getAttribute("data-lang");
      if (nextLang !== "zh" && nextLang !== "en") return;
      if (nextLang === currentLang) return;
      currentLang = nextLang;
      localStorage.setItem(LANG_STORAGE_KEY, currentLang);
      const target = buildLanguageUrl(currentLang);
      window.history.replaceState({}, "", target);
      applyLanguage();
      applyReleaseUi();
    });
  }
};

initializeLanguage();
loadLatestReleaseInfo();

// Particle animation system
function createParticles() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  document.body.appendChild(particlesContainer);

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random starting position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 8 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 15000);
  }

  // Create particles continuously
  setInterval(createParticle, 300);

  // Create initial particles
  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 100);
  }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });
}

// Enhanced cursor trail effect
function createCursorTrail() {
  const trail = [];
  const trailLength = 8;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: ${4 - i * 0.5}px;
      height: ${4 - i * 0.5}px;
      background: rgba(99, 178, 255, ${0.6 - i * 0.08});
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform ${0.1 + i * 0.02}s ease;
      box-shadow: 0 0 ${6 - i}px rgba(99, 178, 255, 0.4);
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX;
    let y = mouseY;

    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0];

      dot.style.left = x + "px";
      dot.style.top = y + "px";
      dot.style.transform = `translate(-50%, -50%)`;

      if (nextDot) {
        x += (parseFloat(nextDot.style.left) - x) * 0.3;
        y += (parseFloat(nextDot.style.top) - y) * 0.3;
      }
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

// Typing effect for hero title
function addTypingEffect() {
  const heroTitle = document.querySelector("h1");
  if (!heroTitle) return;

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  heroTitle.appendChild(cursor);
}

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    hero.style.transform = `translateY(${rate}px)`;
  });
}

// Enhanced button hover effects
function enhanceButtons() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function (e) {
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Glowing effect for cards
function addCardGlow() {
  document
    .querySelectorAll(".card, .usage-step, .arch-item")
    .forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(99, 178, 255, 0.1), transparent 50%),
        rgba(15, 24, 50, 0.76)
      `;
      });

      card.addEventListener("mouseleave", function () {
        this.style.background = "rgba(15, 24, 50, 0.76)";
      });
    });
}

// Initialize all enhancements
function initEnhancements() {
  createParticles();
  initScrollAnimations();
  addTypingEffect();
  enhanceButtons();
  addCardGlow();

  // Delay cursor trail for better performance
  setTimeout(createCursorTrail, 1000);

  // Only add parallax on non-mobile devices
  if (window.innerWidth > 768) {
    initParallax();
  }
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEnhancements);
} else {
  initEnhancements();
}

// Custom scrollbar with JavaScript - 修复拖拽跟随鼠标问题
function createCustomScrollbar() {
  // Hide native scrollbar with CSS
  const style = document.createElement("style");
  style.textContent = `
    /* Hide native scrollbar */
    ::-webkit-scrollbar {
      display: none !important;
    }
    
    html {
      scrollbar-width: none !important;
    }
    
    body {
      -ms-overflow-style: none !important;
      overflow: -moz-scrollbars-none !important;
    }
  `;
  document.head.appendChild(style);

  // Create custom scrollbar elements
  const scrollbarContainer = document.createElement("div");
  scrollbarContainer.id = "custom-scrollbar";
  scrollbarContainer.innerHTML = `
    <div class="scrollbar-track">
      <div class="scrollbar-thumb"></div>
    </div>
  `;
  document.body.appendChild(scrollbarContainer);

  // Add CSS for custom scrollbar
  const scrollbarStyle = document.createElement("style");
  scrollbarStyle.textContent = `
    #custom-scrollbar {
      position: fixed;
      top: 0;
      right: 0;
      width: 12px;
      height: 100vh;
      z-index: 9999;
      pointer-events: auto;
    }
    
    .scrollbar-track {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 100%;
      background: 
        linear-gradient(90deg, rgba(15, 23, 42, 0.9), rgba(25, 35, 60, 0.9)),
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(99, 178, 255, 0.03) 2px,
          rgba(99, 178, 255, 0.03) 4px
        );
      border-left: 1px solid rgba(99, 178, 255, 0.1);
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    
    .scrollbar-thumb {
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      min-height: 30px;
      background: 
        linear-gradient(180deg, 
          rgba(99, 178, 255, 0.8), 
          rgba(108, 255, 237, 0.6),
          rgba(255, 107, 157, 0.4),
          rgba(99, 178, 255, 0.8)
        );
      background-size: 100% 200%;
      border-radius: 6px;
      border: 1px solid rgba(99, 178, 255, 0.3);
      box-shadow: 
        0 0 15px rgba(99, 178, 255, 0.6),
        0 0 25px rgba(108, 255, 237, 0.4),
        0 0 35px rgba(99, 178, 255, 0.2),
        inset 0 0 10px rgba(255, 255, 255, 0.1);
      cursor: pointer;
      pointer-events: auto;
      transition: box-shadow 0.3s ease;
      animation: scrollbar-glow 2s ease-in-out infinite, scrollbar-flow 3s ease-in-out infinite;
    }
    
    .scrollbar-thumb:hover {
      background: 
        linear-gradient(180deg, 
          rgba(99, 178, 255, 1), 
          rgba(108, 255, 237, 0.8),
          rgba(255, 107, 157, 0.6),
          rgba(99, 178, 255, 1)
        );
      box-shadow: 
        0 0 20px rgba(99, 178, 255, 0.8),
        0 0 35px rgba(108, 255, 237, 0.6),
        0 0 50px rgba(99, 178, 255, 0.4),
        0 0 65px rgba(108, 255, 237, 0.2),
        inset 0 0 15px rgba(255, 255, 255, 0.2);
      transform: scaleX(1.1);
      border-color: rgba(99, 178, 255, 0.6);
    }
    
    .scrollbar-thumb:active,
    .scrollbar-thumb.dragging {
      background: 
        linear-gradient(180deg, 
          rgba(255, 107, 157, 1), 
          rgba(99, 178, 255, 1),
          rgba(108, 255, 237, 0.8),
          rgba(255, 107, 157, 1)
        );
      box-shadow: 
        0 0 25px rgba(255, 107, 157, 0.8),
        0 0 40px rgba(99, 178, 255, 0.6),
        0 0 55px rgba(108, 255, 237, 0.4),
        inset 0 0 20px rgba(255, 255, 255, 0.3);
      transform: scaleX(1.15);
    }
    
    @keyframes scrollbar-glow {
      0%, 100% {
        box-shadow: 
          0 0 15px rgba(99, 178, 255, 0.6),
          0 0 25px rgba(108, 255, 237, 0.4),
          0 0 35px rgba(99, 178, 255, 0.2),
          inset 0 0 10px rgba(255, 255, 255, 0.1);
      }
      50% {
        box-shadow: 
          0 0 20px rgba(99, 178, 255, 0.8),
          0 0 30px rgba(108, 255, 237, 0.6),
          0 0 45px rgba(99, 178, 255, 0.4),
          0 0 55px rgba(108, 255, 237, 0.2),
          inset 0 0 15px rgba(255, 255, 255, 0.15);
      }
    }
    
    @keyframes scrollbar-flow {
      0%, 100% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 0% 100%;
      }
    }
    
    @keyframes scrollbar-rainbow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(scrollbarStyle);

  // JavaScript scrollbar functionality
  const thumb = scrollbarContainer.querySelector(".scrollbar-thumb");
  const track = scrollbarContainer.querySelector(".scrollbar-track");
  let isDragging = false;
  let startMouseY = 0;
  let startThumbTop = 0;

  // Update scrollbar position
  function updateScrollbar() {
    if (isDragging) return; // 拖拽时不更新，避免冲突
    
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollHeight <= clientHeight) {
      thumb.style.display = "none";
      return;
    }

    thumb.style.display = "block";
    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * clientHeight,
      30
    );
    const maxThumbTop = clientHeight - thumbHeight;
    const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;

    thumb.style.height = thumbHeight + "px";
    thumb.style.top = thumbTop + "px";
  }

  // Scroll to position
  function scrollToPosition(thumbTop) {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const clientHeight = document.documentElement.clientHeight;
    const thumbHeight = thumb.offsetHeight;
    const maxThumbTop = clientHeight - thumbHeight;
    
    // 防止除零错误
    if (maxThumbTop <= 0 || scrollHeight <= clientHeight) return;
    
    const percentage = Math.max(0, Math.min(1, thumbTop / maxThumbTop));
    const scrollTo = percentage * (scrollHeight - clientHeight);
    
    // 使用直接赋值scrollTop，确保实时性
    document.documentElement.scrollTop = scrollTo;
    document.body.scrollTop = scrollTo;
  }

  // Mouse events for thumb dragging
  thumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startMouseY = e.clientY;
    startThumbTop = parseFloat(thumb.style.top) || 0;
    thumb.classList.add("dragging");
    document.body.style.userSelect = "none";
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaY = e.clientY - startMouseY;
    const newThumbTop = startThumbTop + deltaY;
    const clientHeight = document.documentElement.clientHeight;
    const thumbHeight = thumb.offsetHeight;
    const maxThumbTop = clientHeight - thumbHeight;
    
    // Clamp the thumb position
    const clampedThumbTop = Math.max(0, Math.min(maxThumbTop, newThumbTop));
    
    // Update thumb position immediately
    thumb.style.top = clampedThumbTop + "px";
    
    // Scroll the page
    scrollToPosition(clampedThumbTop);
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove("dragging");
      document.body.style.userSelect = "";
    }
  });

  // Click on track to scroll
  track.addEventListener("click", (e) => {
    if (e.target === thumb || isDragging) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const thumbHeight = thumb.offsetHeight;
    const newThumbTop = clickY - thumbHeight / 2;
    const clientHeight = document.documentElement.clientHeight;
    const maxThumbTop = clientHeight - thumbHeight;
    const clampedThumbTop = Math.max(0, Math.min(maxThumbTop, newThumbTop));
    
    thumb.style.top = clampedThumbTop + "px";
    scrollToPosition(clampedThumbTop);
  });

  // Update on scroll
  window.addEventListener("scroll", updateScrollbar, { passive: true });

  // Update on resize
  window.addEventListener("resize", updateScrollbar, { passive: true });

  // Initial update
  updateScrollbar();

  // Continuous update for smoother experience
  setInterval(updateScrollbar, 16); // ~60fps updates
}

// Initialize custom scrollbar
createCustomScrollbar();
