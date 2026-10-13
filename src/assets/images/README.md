# 图片资源占位说明

本目录用于存放**真实图片**。当前项目使用内置的占位图（SVG 图标 + 说明文字），
不包含任何真实图片，方便你先跑通项目再逐步替换。

> 与俄罗斯站（bagjt-site）共用同一套图片规格，可直接复用同一批产品图。

## 需要放入的图片

| 文件名 | 用途 | 建议尺寸 | 引用位置 |
|---|---|---|---|
| `hero-fibc.jpg` | 首页主视觉 | 1200×900 | `src/components/Hero.astro` |
| `factory.jpg` | 厂区 / 车间图 | 1200×900 | `src/pages/[lang]/about.astro` |
| `products/universal.jpg` | 通用吨袋 | 800×500 | `src/components/ProductCard.astro` |
| `products/food-grade.jpg` | 食品级吨袋 | 800×500 | 同上 |
| `products/heavy-duty.jpg` | 重型吨袋 | 800×500 | 同上 |
| `products/inner-baffle.jpg` | 内拉筋吨袋 | 800×500 | 同上 |
| `products/acid-alkali.jpg` | 耐酸碱吨袋 | 800×500 | 同上 |
| `products/heat-resistant.jpg` | 耐高温集装袋 | 800×500 | 同上 |
| `products/type-d.jpg` | TYPE-D 导电集装袋 | 800×500 | 同上 |
| `products/type-c.jpg` | TYPE-C 防静电集装袋 | 800×500 | 同上 |

## 替换方法（示例）

以首页 Hero 为例，打开 `src/components/Hero.astro`：

```diff
  ---
+ import heroImg from '@/assets/images/hero-fibc.jpg';
  import { getLocalizedPath, type Locale } from '@/i18n';
```

然后把占位块：

```astro
<div class="img-placeholder">...</div>
```

替换为：

```astro
<Image
  src={heroImg}
  alt={imageAlt}
  widths={[480, 768, 1024]}
  sizes="(max-width: 1024px) 100vw, 520px"
  format="webp"
  quality={80}
  loading="eager"
  class="h-full w-full object-cover"
/>
```

> 说明：Astro 的 `Image` 组件要求**静态 import**（构建时可分析），
> 因此不能直接用模板字符串拼接路径，需要显式声明映射表。
> 所有图片在构建时由 sharp 压缩并转为 webp，输出到 `dist/_astro/`。

## 中东站点额外提示

- **产品图尽量复用俄罗斯站**：同一款吨袋不需要重新拍摄，直接 copy 到本目录即可。
- **若图片上有俄文标注**，需要重新导出无文字或英文 / 阿拉伯文版本，
  否则阿拉伯语页面出现俄文会降低专业度。
- **alt 文本**已按 AR / EN 分别写在 `src/content/products/{ar,en}.json` 与
  各语言包的 `imageAlt` 字段中，替换图片时保留即可。
