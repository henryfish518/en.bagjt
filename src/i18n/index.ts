/**
 * i18n 工具模块（英文独立站）
 * -----------------------------------------------------------------------------
 * 所有文案均来自 src/i18n/en.json。
 * 修改文案 = 直接改 json 文件 → 重新打包部署。无 CMS、无后台。
 *
 * 来源说明：本站由 bagjt-me-ar（阿英双语站）按语种拆分而来，
 * 只保留英文（LTR）。原 RTL 逻辑属性（ps/pe/ms/me/start/end）对 LTR 同样成立，无需改动。
 */

import en from './en.json';

export const LOCALES = ['en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 默认语言：英语（访问 / 自动跳转到 /en/） */
export const DEFAULT_LOCALE: Locale = 'en';

/** 各语言的 html lang / dir / og:locale / hreflang */
export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; dir: 'rtl' | 'ltr'; ogLocale: string; hreflang: string }
> = {
  en: { htmlLang: 'en', dir: 'ltr', ogLocale: 'en_US', hreflang: 'en-US' },
};

/** 语言切换器显示名（用该语言自身书写，符合本地化惯例） */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'English',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
};

/** 语言旗标 emoji 占位（如需 SVG 图标可替换为组件） */
export const LOCALE_FLAG: Record<Locale, string> = {
  en: '🇬🇧',
};

/**
 * 日期格式化用的 Intl locale。
 */
export const INTL_LOCALE: Record<Locale, string> = {
  en: 'en-US',
};

const dictionaries = { en } as const;

export type Dictionary = typeof en;

/**
 * 取指定语言的完整字典。
 */
export function useTranslations(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dictionary;
}

/**
 * 生成某语言下的 URL 路径。
 * 单语站：根路径直出，不带 /en/ 前缀。
 * getLocalizedPath('en', 'products') -> '/products/'
 * getLocalizedPath('en')             -> '/'
 */
export function getLocalizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  // 带锚点的路径（如 products#type-c）需要保留 # 之后的锚点
  const [pathPart, hashPart] = clean.split('#');
  const url = pathPart ? `/${pathPart}/` : '/';
  return hashPart ? `${url}#${hashPart}` : url;
}

/**
 * 生成 hreflang 备用链接组（含 x-default）。
 * 用于 <link rel="alternate" hreflang="..."> —— Google 多语言收录关键。
 * 单语站：只有 en 一条 + x-default，全部指向本站。
 */
export function getAlternateLinks(
  site: string,
  path = '',
): Array<{ hreflang: string; href: string }> {
  const links = LOCALES.map((loc) => ({
    hreflang: LOCALE_META[loc].hreflang,
    href: new URL(getLocalizedPath(loc, path), site).href,
  }));
  links.push({
    hreflang: 'x-default',
    href: new URL(getLocalizedPath(DEFAULT_LOCALE, path), site).href,
  });
  return links;
}

/** 根据当前语言返回另一种语言（单语站返回自身；语言切换器将不显示） */
export function getOtherLocale(locale: Locale): Locale {
  return locale;
}

/** 校验任意字符串是否为受支持的语言 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export default { useTranslations, getLocalizedPath, LOCALES, DEFAULT_LOCALE };
