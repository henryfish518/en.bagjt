// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * 生产域名（用于 sitemap / canonical / hreflang 绝对地址）
 *
 * ===================== 【已确定：ar.bagjt.com】 =====================
 * 本站已部署到 Cloudflare Pages 并绑定域名 https://ar.bagjt.com。
 * 改域名时，以下 4 处必须同步（缺一处就会产生跨域名 SEO 冲突）：
 *   - astro.config.mjs 中的 SITE（本处，驱动 sitemap / canonical / og:url）
 *   - src/config.ts 中的 SITE.url（驱动 hreflang 与 JSON-LD）
 *   - public/robots.txt 中的 Sitemap 行
 *   - src/i18n/{ar,en}.json 中的 meta.domain 与 contact.siteValue（页面可见文字）
 * ====================================================================
 */
export const SITE = 'https://ar.bagjt.com';

export default defineConfig({
  site: SITE,

  // 纯静态站点：构建时一次性预渲染 ar / en 全部页面
  output: 'static',

  // 默认语言为阿拉伯语（RTL）。访问 / 时由 src/pages/index.astro 跳转到 /ar/
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: {
          ar: 'ar',
          en: 'en-US',
        },
      },
      // 首页重定向页不入 sitemap
      filter: (page) => page !== `${SITE}/`,
    }),
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
