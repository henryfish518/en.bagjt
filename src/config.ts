/**
 * 站点级配置 —— 联系方式集中在此处维护
 * -----------------------------------------------------------------------------
 * 【预留填写位置】把下面的占位内容替换为真实信息即可，
 * 全站页脚 / 联系页 / 浮动 WhatsApp 按钮会同步生效。
 *
 * 与俄罗斯站（bagjt-site）的差异：
 *   - 主联系方式为 WhatsApp（中东市场主流沟通工具），不再使用 Telegram
 *   - 增加阿拉伯语地址（addressAr）
 *   - 结构化数据 areaServed 覆盖中东 / 北非
 */

export const SITE = {
  /** 生产域名，需与 astro.config.mjs 中的 site 保持一致 */
  url: 'https://me.bagjt.com',

  /** 公司名（英文，用于 sitemap / 结构化数据） */
  companyEn: 'Foshan Hongyun Jiangtian Packaging Materials Co., Ltd',

  /** 公司名（阿拉伯文，用于结构化数据） */
  companyAr: 'شركة فوشان هونغيون جيانغتيان لمواد التعبئة المحدودة',
} as const;

/**
 * 联系方式
 * ============================ 【预留填写位置】 ============================
 * whatsappNumber : 纯数字国际格式，不含 + 和空格，例如 '8613800000000'
 * whatsappDisplay: 页面上展示的格式，例如 '+86 138 0000 0000'
 * email          : 真实接收询盘的邮箱
 *
 * 说明：以下电话 / 邮箱来自中文官网 robotf.cn 公开信息，
 * 若用于中东业务建议另配一个国际通用邮箱（如 sales@bagjt.com）。
 * ==========================================================================
 */
export const CONTACT = {
  whatsappNumber: '8618570518098',
  whatsappDisplay: '+86 185 7051 8098',
  email: '6868344@qq.com', // 来源：中文官网公开邮箱；建议替换为国际邮箱
  phone: '18570518098', // 来源：中文官网服务热线
  address: 'Foshan City, Guangdong Province, China',
  addressAr: 'مدينة فوشان، مقاطعة قوانغدونغ، الصين',
  hours: 'Monday – Saturday, 09:00 – 18:00 (GMT+8, Beijing time)',
  hoursAr: 'الإثنين – السبت، 09:00 – 18:00 (بتوقيت بكين GMT+8)',
} as const;

/** WhatsApp 深链（号码未填写时回退到 wa.me 首页） */
export function whatsappLink(presetText = ''): string {
  const base = CONTACT.whatsappNumber
    ? `https://wa.me/${CONTACT.whatsappNumber}`
    : 'https://wa.me/';
  return presetText ? `${base}?text=${encodeURIComponent(presetText)}` : base;
}

/** 电话深链 */
export function telLink(): string {
  return CONTACT.phone ? `tel:+${CONTACT.phone.replace(/\D/g, '')}` : 'tel:';
}

/** 邮件深链（邮箱未填写时回退到 mailto:） */
export function mailtoLink(subject = '', body = ''): string {
  const addr = CONTACT.email || '';
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${addr}${params.length ? `?${params.join('&')}` : ''}`;
}

/** 是否已配置真实联系方式（用于组件中显示提示） */
export const CONTACT_CONFIGURED = {
  whatsapp: CONTACT.whatsappNumber.length > 0,
  email: CONTACT.email.length > 0,
  phone: CONTACT.phone.length > 0,
};

/** 结构化数据用：覆盖的市场（ISO 3166-1 alpha-2，中东 + 北非） */
export const AREA_SERVED = [
  'SA', // 沙特阿拉伯
  'AE', // 阿联酋
  'EG', // 埃及
  'IQ', // 伊拉克
  'KW', // 科威特
  'QA', // 卡塔尔
  'OM', // 阿曼
  'BH', // 巴林
  'JO', // 约旦
  'LB', // 黎巴嫩
  'DZ', // 阿尔及利亚
  'MA', // 摩洛哥
  'TN', // 突尼斯
  'LY', // 利比亚
  'SD', // 苏丹
] as const;

/** 导航（slug 与 i18n key 对应） */
export const NAV_ITEMS = [
  { slug: '', key: 'home' },
  { slug: 'products', key: 'products' },
  { slug: 'news', key: 'news' },
  { slug: 'about', key: 'about' },
  { slug: 'contact', key: 'contact' },
] as const;
