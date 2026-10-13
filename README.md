# bagjt-me-ar —— 中东站（阿拉伯语 / 英语 · RTL）

> 佛山鸿运江天包装材料有限公司 · 吨袋（FIBC）外贸站 · 中东市场版本
> 技术栈：Astro 5 + Tailwind CSS 3 + Content Collections（纯静态导出）
> 生产地址：**https://ar.bagjt.com**（Cloudflare Pages）

本站是从俄罗斯站（`E:\site\bagjt-site`）复制并本地化而来，**目录结构与代码组织完全一致**，
便于两个站点并行维护。主要差异见下方「与俄罗斯站的差异」。

---

## 一、快速开始

```bash
cd E:\site\bagjt-me-ar
npm install
npm run dev      # 本地开发 http://localhost:4321
npm run build    # 打包到 dist/
npm run preview  # 预览打包结果
```

`/` 会自动跳转到 `/ar/`（默认语言 = 阿拉伯语）。

---

## 二、与俄罗斯站的差异

| 项目 | 俄罗斯站 bagjt-site | 中东站 bagjt-me-ar |
|---|---|---|
| 默认语言 | `ru` | **`ar`（阿拉伯语）** |
| 语言 | ru / en | **ar / en** |
| 文本方向 | 全部 LTR | **`ar` 为 RTL（`<html dir="rtl">`）** |
| 字体 | Inter + Noto Sans | **Inter（拉丁）+ Noto Kufi Arabic（标题）+ Cairo（正文）** |
| 主沟通渠道 | Telegram（浮动按钮） | **WhatsApp（浮动按钮 + 首屏绿色按钮）** |
| 目标市场 | 俄罗斯 / 中亚 | **沙特、阿联酋、埃及、伊拉克 + 中东北非（MENA）** |
| 结构化数据 areaServed | RU/KZ/UZ/KG/TJ/TM | **15 个中东北非国家（见 `src/config.ts`）** |
| 端口 / 船期文案 | 俄线、中亚 | **Jebel Ali / Dammam / Alexandria / Umm Qasr** |
| 域名 | `bagjt.com` | **`ar.bagjt.com`（Cloudflare Pages）** |

---

## 三、目录结构

```
bagjt-me-ar/
├── astro.config.mjs        # site / i18n(ar,en) / sitemap
├── tailwind.config.mjs     # 品牌色 + 阿拉伯语字体栈
├── .cnb.yml                # CNB 流水线（⚠️ 首次启用前必须改 COS 桶）
├── public/                 # favicon / logo / og-* / robots.txt
└── src/
    ├── config.ts           # 域名、联系方式、areaServed、导航
    ├── content.config.ts   # Content Collections schema
    ├── i18n/
    │   ├── index.ts        # LOCALE_META（含 dir）、路径工具、Intl locale
    │   ├── ar.json         # 阿拉伯语语言包
    │   └── en.json         # 英语语言包（结构基准）
    ├── content/
    │   ├── products/{ar,en}.json   # 8 类产品数据
    │   └── news/{ar,en}/*.md       # 新闻文章（文件名 = slug）
    ├── layouts/MainLayout.astro    # <html dir>、hreflang、JSON-LD
    ├── components/                 # Header / Footer / Hero / ProductCard …
    ├── pages/
    │   ├── index.astro             # / → /ar/ 跳转
    │   ├── 404.astro
    │   └── [lang]/
    │       ├── index.astro products.astro about.astro contact.astro
    │       └── news/{index,[slug]}.astro
    ├── styles/global.css           # 阿拉伯语排版校正 + 组件类
    └── assets/images/README.md     # 真实图片替换说明
```

---

## 四、RTL（阿拉伯语从右到左）是怎么做的

### 1. 方向声明
`MainLayout.astro` 根据 `LOCALE_META[locale].dir` 输出 `<html lang="ar" dir="rtl">`，
英语页面则是 `<html lang="en" dir="ltr">`，同一个组件文件同时服务两种语言。

### 2. 组件只用逻辑属性
不写 `ml-/mr-/pl-/pr-/left-/right-/text-left`，而是写逻辑属性：

| 不要写 | 应该写 | 含义 |
|---|---|---|
| `ml-4` / `mr-4` | `ms-4` / `me-4` | margin-inline-start / end |
| `pl-4` / `pr-4` | `ps-4` / `pe-4` | padding-inline-start / end |
| `left-3` / `right-3` | `start-3` / `end-3` | inset-inline-start / end |
| `text-left` | `text-start` | 跟随阅读方向对齐 |

这样在 `dir="rtl"` 下自动镜像，**不需要写两套 CSS**。

### 3. 三处 CSS 层面的必要处理（`src/styles/global.css`）

1. **字距清零**：`letter-spacing` 会拆开阿拉伯字母的连写（ligature），
   `[dir='rtl']` 下对所有文本元素强制 `letter-spacing: normal !important`。
2. **行高放宽**：阿拉伯字母上下伸展大，标题行高强制 ≥1.45，否则会挤压 / 裁切。
3. **方向性图标镜像**：箭头 SVG 加 `flip-rtl` 类，RTL 下 `transform: scaleX(-1)`；
   hover 微位移用 `nudge-x` 类，RTL 下改为向左位移。

### 4. 数字的处理
阿拉伯语日期使用 `ar-u-nu-latn`（拉丁数字），
避免出现 `٩٠×٩٠×١١٠` 这种与页面其他规格数字不一致的形式，方便 B2B 客户快速核对参数。
所有拉丁 / 数字混排的字段（规格值、型号、电话、尺寸）都加了 `dir="auto"` 或 `dir="ltr"`，
防止双向文本（Bidi）把数字顺序打乱。

---

## 五、日常维护：怎么改内容

| 想改什么 | 改哪个文件 |
|---|---|
| 电话 / 邮箱 / WhatsApp / 地址 | `src/config.ts` → `CONTACT` |
| 域名 | `src/config.ts` 的 `SITE.url` + `astro.config.mjs` 的 `SITE` + `public/robots.txt` |
| 页面文案（标题、按钮、段落） | `src/i18n/ar.json` 与 `src/i18n/en.json`（**两个文件键必须一致**） |
| 产品参数 / 分类 | `src/content/products/ar.json` 与 `en.json`（**`id` 必须一致**） |
| 新增一篇文章 | 往 `src/content/news/ar/` 和 `src/content/news/en/` 各放一个**同名** `.md` |
| 浮动按钮 / 颜色 / 字体 | `src/components/FloatingWhatsAppButton.astro` / `tailwind.config.mjs` |

> ⚠️ `ar.json` 与 `en.json` 的键结构必须完全一致（TS 以 `en.json` 为类型基准）。
> 改完可以用下面的命令自检：
> ```bash
> node -e "const f=(o,p='')=>Object.entries(o).flatMap(([k,v])=>{const K=p?p+'.'+k:k;return v&&typeof v==='object'?f(v,K):[K]});const fs=require('fs');const a=new Set(f(JSON.parse(fs.readFileSync('src/i18n/ar.json','utf8'))));const e=new Set(f(JSON.parse(fs.readFileSync('src/i18n/en.json','utf8'))));console.log('only ar:',[...a].filter(k=>!e.has(k)),'only en:',[...e].filter(k=>!a.has(k)))"
> ```

---

## 六、SEO 要点（已内置）

- `hreflang`：每页自动输出 `ar` / `en-US` / `x-default`，新闻详情页仅在另一语言**确有译文**时才输出对应 hreflang。
- `canonical`：按 `Astro.site + pathname` 生成绝对地址。
- `sitemap-index.xml`：由 `@astrojs/sitemap` 生成，带 i18n 备用链接，`/` 跳转页不入 sitemap。
- 结构化数据：`Organization` + `areaServed`（中东 15 国）+ `availableLanguage: [ar, en, zh]`。
- `robots.txt`：`Sitemap` 已指向 `https://ar.bagjt.com/sitemap-index.xml`（换域名记得同步改）。
- 每页独立的 `og:image`（`/og-default.svg`、`/og-products.svg`、`/og-about.svg`、`/og-contact.svg`）。

---

## 七、部署（Cloudflare Pages）

本站实际部署方式：**GitHub 仓库 `henryfish518/bagjt-me-ar` → Cloudflare Pages → 自定义域名 `ar.bagjt.com`**。

- 构建命令 `npm run build`，输出目录 `dist`，纯静态，无需环境变量；
- 域名在 Cloudflare Pages 控制台的「自定义域」绑定，**不需要** `public/CNAME` 文件；
- 仓库里的 `.cnb.yml` 是早期从俄罗斯站复制的 CNB 流水线模板，**当前未启用**。
  若确定不再走 CNB + COS，可直接删除该文件，避免以后误触发覆盖俄罗斯站的桶。

---

## 八、域名口径（已确认）

生产域名为 **`https://ar.bagjt.com`**，以下 4 处必须保持一致，改域名时同步修改：

| 位置 | 作用 |
|---|---|
| `astro.config.mjs` → `SITE` | sitemap / canonical / og:url |
| `src/config.ts` → `SITE.url` | hreflang / JSON-LD |
| `public/robots.txt` → `Sitemap:` | 爬虫发现 sitemap |
| `src/i18n/{ar,en}.json` → `meta.domain`、`contact.siteValue` | 页面可见的「Website」文字 |

> 自检命令：`npm run build` 后执行
> `grep -ro "ar.bagjt.com" dist | wc -l`（应 > 0）与 `grep -ro "me.bagjt.com" dist | wc -l`（应为 0）。

---

## 九、待你确认的 2 件事

1. **联系方式**：`src/config.ts` 里的 WhatsApp / 邮箱目前沿用中文官网公开信息，
   建议为中东业务单独配一个国际邮箱（如 `sales@bagjt.com`）与 WhatsApp Business 号。
2. **真实图片**：见 `src/assets/images/README.md`，可直接复用俄罗斯站产品图
   （注意替换掉图中的俄文标注）。
