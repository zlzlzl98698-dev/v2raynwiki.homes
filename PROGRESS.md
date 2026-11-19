# 项目执行进度记录（PROGRESS.md）

最后更新：2026-11-19 ｜ 项目域名：`https://v2raynwiki.homes` ｜ 品牌：`v2rayn百科`

## 阶段执行状态

- [x] **阶段一：项目扫描与品牌审计** — 扫描空工作区、桌面 5 份资料文件、5 张光速云实测解锁图及 2026-08-11 测速压缩包；完成 32 条原始清单去重审计，核定 31 家独立品牌并记录全部价格/优惠码/协议/链接冲突。
- [x] **阶段二：VitePress 环境初始化** — 完成 `package.json`、VitePress 1.6 + Vue 3 + TypeScript 环境安装、中央配置文件 `site.ts`/`links.ts`/`brands.ts`/`clients.ts`/`navigation.ts` 及 24 张原始截图原样入库。
- [x] **阶段三：高级多级文档主题** — 扩展 VitePress 默认主题，实现纯白专业编辑部风格（CSS Variables）、4 大一级下拉导航、自动切换多级左侧栏、右侧目录、全站面包屑、自定义知识库首页（14 模块）、图片点击放大与自定义 Footer。
- [x] **阶段四：SEO/GEO 内容架构** — 完成 4 个一级专题、28 个二级专题、56 个三级集群规划与全部 56 篇正式集群入口文章，输出 448 篇 SEO 文章标题库及全部 13 份 `content-planning/` 交付文件。
- [x] **阶段五：31 家品牌数据库与评测系统** — 完成 `/brands/` 交互筛选库（静态 HTML 预渲染完整可读）、31 家独立品牌档案页、光速云旗舰万字深度评测（含 6 张真实三网/9Gbps 截图）及 4 个 Dark Network Observatory 观测组件。
- [x] **阶段六：跨平台客户端与横向对比中心** — 完成 Windows / Android / iOS / macOS / Linux / OpenWrt 6 大平台 20+ 客户端指南及 5 篇高意图横向对比专题。
- [x] **阶段七：技术 SEO 与 GEO/AEO** — 注入独立 Title/Description/Canonical/OG、动态 JSON-LD（Organization/WebSite/BreadcrumbList/Article/ItemList/SoftwareApplication/FAQPage）、原生 Sitemap、robots.txt 与全站内链系统。
- [x] **阶段八：搜索系统** — 完成 Algolia DocSearch 环境变量接入配置与 `algolia/docsearch-config.json` 索引规则；无凭证环境下已自动启用 VitePress 原生中文 Local Search 确保开箱可用。
- [x] **阶段九：商业转化系统** — 完成 6 个合规转化组件，所有推广链接集中于 `links.ts`，强制输出 `rel="nofollow sponsored noopener"` 与推广披露。
- [x] **阶段十：生产构建与全站自动化验收（448 篇全满配 + 前十品牌深度评测 + 30 秒选型配对器 + GEO/Apache 打包收尾）** — 全站 **542 个 Markdown** 静态构建为 HTML，**541 个规范页面**自动生成 `sitemap.xml`（排除 `404.html`），包含全部 **448 篇集群长尾教程（56 P0 + 224 P1 + 168 P2 100% 满配）**、**11 篇热门品牌独立深度评测**（光速云 + 前十热门品牌）、**31 家品牌参数档案**、`/llms.txt` 与 `/brands.json` GEO 结构化端点、1200×630 `og-cover.png`、24 张 WebP 轻量化预览（原图字节完整保留）及含 `.htaccess`（含去多余尾斜杠 301 规范）的一键部署包 `deploy/v2raynwiki-homes-apache-dist.zip`。

## 真实构建验收指标（2026-11-19 全量满配版）

| 检查项 | 实测结果 |
| --- | --- |
| Markdown 源文件 / 渲染 HTML 页数 | **542 页**（含 541 个可索引页面 + `404.html`） |
| 集群文章矩阵完成度 | **448 / 448（100%）**：56 P0 + 224 P1 + 168 P2（均值 **3,210 汉字**，最低 **2,440 汉字**；按角度差异化防模板重合，全站独立 `<h2>` 签名 **474 种**） |
| 品牌评测矩阵 | **31 家参数档案 + 11 家热门品牌独立深度评测**（光速云旗舰评测扩展至 **4,329 汉字** + 前十品牌评测 + 6 篇对比专题均扩充 >2,000 字符） |
| 全站链接与 SEO/GEO 校验 | **1,521 条推广链接合规**（全站 1,594 外链 `0` 漏加 `nofollow`）、**0 死链**、**0 隐藏 FAQ Schema**、**459 页 `<details>` 语义 FAQ**、`Article.image` 与全站 Logo `alt` 齐全 |
| Apache 部署包与本地预览 | `deploy/v2raynwiki-homes-apache-dist.zip`（1,705 文件 / **58.19 MB**，含 `.htaccess`）；Algolia 抽出 **4,330 条索引记录** |
| 交互式转化组件 | 新增 `<AirportMatcher />` 30 秒选型配对器（首页 + `/airport/`） |
| 搜索与 Algolia 同步 | 本地中文全文搜索已启用；支持标准 Algolia 免费层 `npm run algolia:sync` 自主推送索引 |

## 下一阶段工作优先级

1. **接入普通 Algolia 免费层索引**：复制 `.env.example` 为 `.env` 填入 `VITE_ALGOLIA_APP_ID` 与公开 `Search-Only API Key`，命令行传入 `ALGOLIA_ADMIN_KEY` 运行 `npm run algolia:sync` 并重构建 `npm run build:check`。
2. **Apache 上线部署**：将 `docs/.vitepress/dist/`（含 `.htaccess`）上传至 Apache 虚拟主机，抽检深层 URL 刷新与未知 URL 返回 HTTP 404。
3. **品牌数据持续复核**：定期复核宇宙云完整套餐、历史库 3 家品牌（灵动云/浪网/EdgeNova）及无实测截图品牌的晚高峰数据。
