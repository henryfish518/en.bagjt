/**
 * Content Collections 配置（Astro 5 Content Layer）
 * -----------------------------------------------------------------------------
 * news     : 新闻/文章 —— Markdown，按语言分目录 src/content/news/{ar,en}/
 *            添加文章 = 往对应语言目录放一个 .md 文件，无需改任何代码。
 *            文件名即 URL slug（两语言同名文件互为翻译对应）。
 *
 * products : 产品数据 —— JSON，按语言 src/content/products/{ar,en}.json
 *            （文件名 ar / en 对应语言，schema 见下）
 *
 * 界面短标签（按钮、导航等）仍保留在 src/i18n/{ar,en}.json，
 * 内容型数据（文章、产品参数）统一走 content collections。
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const keyValuePair = z.object({ key: z.string(), value: z.string() });

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    /** 文章标题 */
    title: z.string(),
    /** 发布日期（决定列表排序） */
    date: z.coerce.date(),
    /** 摘要：用于列表卡片、SEO description */
    description: z.string(),
    /** 封面图（可选，/public 下的绝对路径） */
    cover: z.string().optional(),
    /** 草稿：true 时构建时跳过 */
    draft: z.boolean().default(false),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    /** 页头标准参数横条（吨袋共性参数） */
    specs: z.array(keyValuePair),
    /** 产品分类列表 */
    items: z.array(
      z.object({
        /** 分类 slug，与详情锚点 #id 一致 */
        id: z.string(),
        name: z.string(),
        /** 卡片简介 */
        short: z.string(),
        /** 详细说明段落 */
        description: z.string(),
        /** 特性列表 */
        features: z.array(z.string()),
        /** 适用场景一句话 */
        applications: z.string(),
        /** 该分类的规格参数 */
        specs: z.array(keyValuePair).default([]),
        /** 卡片配图 alt 文本 */
        imageAlt: z.string(),
      }),
    ),
    /** 详细规格表数据（表格标题在 i18n JSON 的 products.specTable.title） */
    specTableRows: z.array(keyValuePair),
  }),
});

export const collections = { news, products };
