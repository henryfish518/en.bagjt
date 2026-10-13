/**
 * i18n 工具模块（中东站）
 * -----------------------------------------------------------------------------
 * 所有文案均来自 src/i18n/ar.json 与 src/i18n/en.json。
 * 修改文案 = 直接改 json 文件 → 重新打包部署。无 CMS、无后台。
 *
 * 与俄罗斯站最大的差异：阿拉伯语是 RTL（从右到左）语言。
 * 这里导出 LOCALE_META[locale].dir，由 MainLayout 写到 <html dir="...">，
 * 页面布局全部使用 Tailwind 的逻辑属性（ps/pe/ms/me/start/end），
 * 因此同一个组件在 ar / en 下都能正确镜像。
 */

import ar from './ar.json';
import en from './en.json';

export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 默认语言：阿拉伯语（访问 / 自动跳转到 /ar/） */
export const DEFAULT_LOCALE: Locale = 'ar';

/** 各语言的 html lang / dir / og:locale / hreflang */
export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; dir: 'rtl' | 'ltr'; ogLocale: string; hreflang: string }
> = {
  ar: { htmlLang: 'ar', dir: 'rtl', ogLocale: 'ar_SA', hreflang: 'ar' },
  en: { htmlLang: 'en', dir: 'ltr', ogLocale: 'en_US', hreflang: 'en-US' },
};

/** 语言切换器显示名（用该语言自身书写，符合本地化惯例） */
export const LOCALE_LABEL: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
};

export const LOCALE_SHORT: Record<Locale, string> = {
  ar: 'AR',
  en: 'EN',
};

/** 语言旗标 emoji 占位（如需 SVG 图标可替换为组件） */
export const LOCALE_FLAG: Record<Locale, string> = {
  ar: '🇸🇦',
  en: '🇬🇧',
};

/**
 * 日期格式化用的 Intl locale。
 * 阿拉伯语刻意使用「拉丁数字」（-u-nu-latn）：
 * 规格参数 / 日期里的 0-9 与页面其他数字保持一致，方便 B2B 客户阅读。
 */
export const INTL_LOCALE: Record<Locale, string> = {
  ar: 'ar-u-nu-latn',
  en: 'en-US',
};

const dictionaries = { ar, en } as const;

export type Dictionary = typeof en;

/**
 * 取指定语言的完整字典。
 * 结构以 en.json 为基准，类型安全。
 */
export function useTranslations(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dictionary;
}

/**
 * 生成某语言下的 URL 路径。
 * getLocalizedPath('ar', 'products') -> '/ar/products'
 * getLocalizedPath('en')            -> '/en/'
 */
export function getLocalizedPath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  // 带锚点的路径（如 products#type-c）需要保留 # 之后的锚点
  const [pathPart, hashPart] = clean.split('#');
  const url = pathPart ? `/${locale}/${pathPart}/` : `/${locale}/`;
  return hashPart ? `${url}#${hashPart}` : url;
}

/**
 * 生成 hreflang 备用链接组（含 x-default）。
 * 用于 <link rel="alternate" hreflang="..."> —— Google 多语言收录关键。
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

/** 根据当前语言返回另一种语言（用于语言切换器） */
export function getOtherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

/** 校验任意字符串是否为受支持的语言 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export default { useTranslations, getLocalizedPath, LOCALES, DEFAULT_LOCALE };
