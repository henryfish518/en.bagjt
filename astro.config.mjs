// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * 生产域名（用于 sitemap / canonical / hreflang 绝对地址）
 *
 * ===================== 【英文独立站：en.bagjt.com】 =====================
 * 本站由 bagjt-me-ar（阿英双语站）拆分而来，只保留英文，按语种独立建站。
 * 改域名时，以下 4 处必须同步（缺一处就会产生跨域名 SEO 冲突）：
 *   - astro.config.mjs 中的 SITE（本处，驱动 sitemap / canonical / og:url）
 *   - src/config.ts 中的 SITE.url（驱动 hreflang 与 JSON-LD）
 *   - public/robots.txt 中的 Sitemap 行
 *   - src/i18n/en.json 中的 meta.domain 与 contact.siteValue（页面可见文字）
 * ====================================================================
 */
export const SITE = 'https://en.bagjt.com';

export default defineConfig({
  site: SITE,

  // 纯静态站点：构建时一次性预渲染英文全部页面
  output: 'static',

  // 纯英文独立站：根路径直出，URL 不带 /en/ 前缀
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],

  build: {
    inlineStylesheets: 'auto',
  },

  image: {
    // sharp 用于静态构建时压缩图片
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
