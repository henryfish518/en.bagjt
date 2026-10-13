// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * 生产域名（用于 sitemap / canonical / hreflang 绝对地址）
 *
 * ============================ 【需确认】 ============================
 * 这里默认使用 bagjt.com 的中东子域名。若你已注册独立域名
 * （例如 bagjt.ae / bagjt-me.com），改这一处即可，同时记得同步修改：
 *   - src/config.ts 中的 SITE.url
 *   - public/robots.txt 中的 Host 与 Sitemap
 *   - public/og-*.svg 中的域名文字（可选）
 * ====================================================================
 */
export const SITE = 'https://me.bagjt.com';

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
