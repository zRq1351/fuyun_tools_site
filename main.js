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
    hero_badge: "Windows AI 划词 + 截图录屏 OCR + 剪贴板管理",
    hero_title: "把剪贴板、截图录屏 OCR 和 AI 划词，做成一条真正可用的效率链路",
    hero_desc:
      "fuyun_tools 常驻系统托盘，通过统一快捷键管理文字与图片历史；在 Windows 上进一步打通选词翻译、快捷截图录屏与图片 OCR 识别的完整路径。",
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
    core_6: "Windows 固定图片窗口支持右键触发 OCR 识别",
    core_7:
      "Windows 录屏胶囊支持一键开始 / 暂停 / 恢复 / 停止，并支持系统音频与麦克风采集",
    core_4: "支持 DeepSeek、通义千问、小米 Mimo 与自定义 OpenAI 兼容服务",
    core_5: "全局热键、托盘菜单、开机自启、应用更新",
    features_title: "功能模块",
    feature_1_title: "剪贴板管理",
    feature_1_desc:
      "支持历史上限策略、分类管理、键盘与鼠标双路径交互，适合高频复制粘贴场景。",
    feature_2_title: "图片剪贴板",
    feature_2_desc:
      "自动识别并持久化图片历史，支持搜索、分类、双击回填与大图预览。",
    feature_3_title: "AI 划词助手",
    feature_3_desc:
      "Windows 下监听文本选择与鼠标事件，自动弹出工具栏并流式输出翻译或解释结果。",
    feature_7_title: "图片 OCR",
    feature_7_desc:
      "固定图片窗口支持右键触发 OCR 识别，并在独立文本窗口展示结果，目前仅在 Windows 可用。",
    feature_8_title: "录屏与音频采集",
    feature_8_desc:
      "录屏胶囊支持开始/暂停/恢复/停止，支持系统音频与麦克风设备选择，并可配置帧率与码率参数。",
    feature_4_title: "AI 服务配置",
    feature_4_desc:
      "内置多提供商并支持自定义服务，API Key 本地加密保存，提供连接测试能力。",
    feature_5_title: "系统集成",
    feature_5_desc:
      "应用常驻托盘，支持热键唤起文本/图片窗口，具备自动更新与开机自启。",
    usage_title: "软件使用流程",
    usage_1_title: "基础配置与启动",
    usage_1_desc: "启动后常驻托盘，建议首先进入设置配置 AI 服务与模型，同时可按需调整历史上限和分类策略。",
    usage_2_title: "文本与图片剪贴板",
    usage_2_desc: "使用 Ctrl+Shift+Z/X 快速唤出文字/图片窗口，通过方向键、回车或双击快速回填到当前焦点应用。",
    usage_3_title: "AI 划词助手",
    usage_3_desc: "Windows 任意应用中选中文本自动弹出工具栏，支持一键翻译、解释、复制及流式结果展示。",
    usage_4_title: "录屏与 OCR 链路",
    usage_4_desc:
      "进入设置启用录屏后可通过录屏胶囊开始录制；首次会自动检查并按需下载 ffmpeg，同时仍可通过固定图片窗口右键完成 OCR 识别。",
    gallery_title: "界面预览",
    gallery_desc: "以下为软件真实界面截图，展示核心工作流与窗口体验。",
    gallery_1: "文本剪贴板窗口",
    gallery_2: "图片历史管理",
    gallery_3: "大图预览模式",
    gallery_4: "划词工具栏",
    gallery_5: "AI 结果窗口",
    gallery_6: "设置页（AI 配置）",
    arch_title: "实现架构",
    arch_1_title: "前端层",
    arch_1_desc:
      "多页面 Vue 结构分别承载剪贴板、图片管理、设置、划词工具栏与结果窗口。",
    arch_2_title: "Tauri 运行层",
    arch_2_desc:
      "Rust 侧统一管理全局快捷键、托盘菜单、窗口行为、插件能力与状态同步。",
    arch_3_title: "业务服务层",
    arch_3_desc:
      "拆分为 clipboard/image_clipboard/ai 服务，包含历史监听、流式 AI 调用与错误处理。",
    arch_4_title: "Windows 扩展特性",
    arch_4_desc:
      "通过鼠标监听与文本选择模块，驱动划词链路及工具栏的即时显示与交互。",
    cta_title: "开始使用 fuyun_tools",
    cta_desc:
      "下载发布包，首次运行后自动生成配置。在设置中配置模型与 API Key 即可开始 AI 划词。",
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
    doc_title: "fuyun_tools - 系统托盘效率工具",
    doc_desc:
      "fuyun_tools 是一款集剪贴板历史管理、快捷截图与录屏、图片 OCR、Windows AI 划词能力于一体的桌面效率工具。",
    og_desc:
      "统一管理文字与图片剪贴板，在 Windows 上实现 AI 划词翻译、录屏音频采集与图片 OCR 识别。",
  },
  en: {
    nav_features: "Features",
    nav_usage: "Workflow",
    nav_gallery: "Screenshots",
    nav_architecture: "Architecture",
    github_repo_label: "GitHub Repository",
    hero_badge:
      "Windows AI Text Selection + Screenshot/Screen Recording OCR + Clipboard Management",
    hero_title:
      "Turn Clipboard, Screenshot/Screen Recording OCR and AI Selection into One Efficient Workflow",
    hero_desc:
      "fuyun_tools runs in the system tray, unifies text and image clipboard history with hotkeys, and completes selection → translate/explain and screenshot/screen recording → OCR on Windows.",
    view_source: "View Source",
    meta_stack: "Stack: Vue 3 + Element Plus + Tauri 2 + Rust",
    meta_ai_sdk: "AI SDK: async-openai (OpenAI compatible)",
    latest_version_label: "Latest Version: ",
    logo_showcase_title: "Brand Icon",
    logo_showcase_desc:
      "Used consistently in site logo, share cards, and product identity",
    logo_alt: "fuyun_tools brand icon",
    core_title: "Core Capabilities",
    core_1: "Auto capture, search, categorize, and refill text clipboard items",
    core_2:
      "Image clipboard thumbnails, double-click refill, and fullscreen preview",
    core_3: "Windows selection toolbar for translate / explain / copy",
    core_6: "Windows image window supports right-click OCR text extraction",
    core_7:
      "Windows recording capsule supports start/pause/resume/stop with system and microphone audio capture",
    core_4:
      "DeepSeek, Qwen, Xiaomi Mimo, and custom OpenAI-compatible providers",
    core_5: "Global hotkeys, tray menu, auto-start, and in-app update",
    features_title: "Feature Modules",
    feature_1_title: "Clipboard Manager",
    feature_1_desc:
      "Supports retention policy, categories, keyboard and mouse interaction for high-frequency copy/paste.",
    feature_2_title: "Image Clipboard",
    feature_2_desc:
      "Automatically records image history with search, categories, double-click refill, and large preview.",
    feature_3_title: "AI Selection Assistant",
    feature_3_desc:
      "On Windows, listens to text selection and mouse events, then streams translation/explanation results.",
    feature_7_title: "Image OCR",
    feature_7_desc:
      "Right-click in the pinned image window to trigger OCR, with results displayed in a standalone text window (Windows only).",
    feature_8_title: "Screen Recording + Audio",
    feature_8_desc:
      "The recording capsule supports start/pause/resume/stop, system and microphone device selection, plus FPS/bitrate tuning.",
    feature_4_title: "AI Provider Config",
    feature_4_desc:
      "Built-in providers plus custom services, encrypted local API key storage, and connection testing.",
    feature_5_title: "System Integration",
    feature_5_desc:
      "Tray-resident app with global hotkeys for text/image windows, auto-update, and auto-start.",
    usage_title: "Usage Flow",
    usage_1_title: "Basic Config & Launch",
    usage_1_desc:
      "Runs in tray after launch. It's recommended to configure AI provider and model in settings first, and adjust history limits and strategies as needed.",
    usage_2_title: "Text & Image Clipboard",
    usage_2_desc:
      "Use Ctrl+Shift+Z/X to quick open text/image windows. Refill to focused app via arrow keys, Enter or double-click.",
    usage_3_title: "AI Selection Assistant",
    usage_3_desc:
      "Select text in any Windows app to auto-pop toolbar, supporting one-click translate, explain, copy and streaming results.",
    usage_4_title: "Recording + OCR Flow",
    usage_4_desc:
      "Enable recording in settings, then start from the recording capsule; on first use it auto-checks and downloads ffmpeg if needed, while OCR remains available from the pinned image window.",
    gallery_title: "UI Preview",
    gallery_desc: "Real screenshots of the product workflow and core windows.",
    gallery_1: "Text Clipboard Window",
    gallery_2: "Image History Management",
    gallery_3: "Fullscreen Preview",
    gallery_4: "Selection Toolbar",
    gallery_5: "AI Result Window",
    gallery_6: "Settings (AI Config)",
    arch_title: "Architecture",
    arch_1_title: "Frontend Layer",
    arch_1_desc:
      "Multi-page Vue windows for clipboard, image manager, settings, toolbar, and result display.",
    arch_2_title: "Tauri Runtime",
    arch_2_desc:
      "Rust layer handles global shortcuts, tray menu, window behavior, plugins, and state sync.",
    arch_3_title: "Service Layer",
    arch_3_desc:
      "Split clipboard/image/ai services for history listeners, streaming AI calls, and error handling.",
    arch_4_title: "Windows Extensions",
    arch_4_desc:
      "Mouse listener and text selection modules drive toolbar visibility and selection workflow.",
    cta_title: "Get Started with fuyun_tools",
    cta_desc:
      "Download the release package. Settings are generated on first run. Configure model and API key to start AI selection.",
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
    doc_title: "fuyun_tools - Tray Productivity Tool",
    doc_desc:
      "fuyun_tools is a desktop productivity tool combining clipboard history, screenshot and recording workflows, image OCR, and Windows AI text selection.",
    og_desc:
      "Manage text and image clipboard in one place and run AI selection, screen recording with audio capture, and image OCR on Windows.",
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
