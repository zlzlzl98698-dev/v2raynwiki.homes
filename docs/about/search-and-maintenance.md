---
title: Algolia 全文搜索配置、Sitemap 与 Apache 静态部署运维指南
description: 详细记录 v2rayn百科的 Algolia DocSearch 接入切换流程、本地搜索回退机制、自动 Sitemap 校验及 Apache .htaccess 静态部署规范。
date: 2026-10-19
updatedDate: 2026-11-19
category: 站点运维
author: v2rayn百科工程组
---

# Algolia 搜索配置、自动 Sitemap 与 Apache 部署说明

## 一、站内搜索架构与 Algolia 接入状态

当前环境尚未配置正式的 Algolia 凭证，因此本站已自动启用 **VitePress 原生本地中文全文搜索（Local Search）**，确保首次上线即具备完整的中文关键词检索、标题定位与正文摘要能力。

正式的 **Algolia DocSearch** 接入代码已完整预留在 `docs/.vitepress/config.mts` 与 `docs/.vitepress/data/site.ts` 中，且爬虫索引规则已沉淀至 `algolia/docsearch-config.json`。

### 切换至 Algolia 的操作步骤

1. **申请或创建索引服务**：
   - 若符合开源/技术文档资格，可向 Algolia DocSearch 提交申请；
   - 因商业推荐内容网站可能不符合免费 DocSearch 计划资格，亦可直接注册普通 **Algolia Application**，使用 `algolia/docsearch-config.json` 或自建脚本将构建后的页面标题与正文推送至索引。
2. **配置构建环境变量**（复制 `.env.example` 为 `.env`，切勿将 `.env` 提交至仓库）：
   ```bash
   VITE_ALGOLIA_APP_ID=你的ApplicationID
   VITE_ALGOLIA_API_KEY=你的公开SearchOnlyAPIKey
   VITE_ALGOLIA_INDEX_NAME=v2raynwiki_homes
   ```
   > **安全红线**：只允许填写公开的 `Search-Only API Key`，严禁把 `Admin API Key` 或 `Write Key` 写入前端环境变量！
3. **重新执行构建**：运行 `npm run build` 后，VitePress 会自动切换至 Algolia 搜索组件并激活中文翻译界面。

## 二、自动 Sitemap 与技术 SEO 校验

- VitePress 原生 `sitemap` 在每次 `npm run build` 时自动生成 `docs/.vitepress/dist/sitemap.xml`，规范域名统一由 `docs/.vitepress/data/site.ts` 控制（默认 `https://v2raynwiki.homes`）。
- 自动过滤 `404` 及 `draft: true` 页面，避免空白草稿进入搜索引擎索引。
- `docs/public/robots.txt` 自动输出至部署根目录并指向 `https://v2raynwiki.homes/sitemap.xml`。

## 三、Apache 静态部署方法

1. 本地执行构建与自动化体检：
   ```bash
   npm install
   npm run build:check
   ```
2. 将构建输出目录 `docs/.vitepress/dist/` 中的全部文件（**包含隐藏文件 `.htaccess`**）上传至 Apache 站点根目录（如 `/var/www/v2raynwiki.homes/public_html/`）。
3. 确认 Apache 已启用 `mod_rewrite`、`mod_headers`、`mod_deflate` 且虚拟主机配置 `AllowOverride All`。
4. `.htaccess` 已配置：HTTPS 301 跳转、去 `www` 规范化、`cleanUrls` 静态 `.html` 内部映射、禁止目录浏览（`Options -Indexes`）、静态指纹资源长期缓存以及真实 `ErrorDocument 404 /404.html`（不存在路径绝不返回 200）。

## 四、全站自动化校验与持续维护检查（CI / 本地发版门禁）

每次编辑文档内容或更新 `brands.ts` / `links.ts` 数据后，工程构建流水线必须通过以下 4 个核心验证脚本才能生成发布包：

1. **GEO 结构化数据源生成 (`npm run geo:feeds`)**：自动汇总品牌档案并写出静态 `docs/public/llms.txt` 与 `docs/public/brands.json`，确保大语言模型及外部索引工具获取与前端完全一致的规范字段。
2. **VitePress 静态构建 (`npm run build`)**：强制零容忍内部死链检测（Dead Link Check），凡存在无效文档内链直接中断构建，同时输出 `sitemap.xml` 与每页独立 JSON-LD（`Article`、`BreadcrumbList`、`FAQPage`、`SoftwareApplication`）。
3. **全站合规验收脚本 (`npm run verify`)**：扫描全量构建产物 HTML，校验 `renderedHtmlPages` 与源文档匹配数、确认每一条推广注册 URL 均附带 `rel="nofollow sponsored noopener"`、检查 Meta 与 Canonical 完整性。
4. **一键部署压缩包与线上回测 (`npm run deploy:pack` + `npm run check:live`)**：打包包含 `.htaccess` 的标准 Apache 发布归档 `deploy/v2raynwiki-homes-apache-dist.zip`；部署至虚拟主机后即可针对线上 HTTPS 跳转、多余尾斜杠 301 规范化及 `404` 状态码执行端到端抽检。

| 维护命令 | 适用场景 | 核查焦点 |
| :--- | :--- | :--- |
| `npm run build:check` | 每次改稿或修改主题组件后必跑 | 0 死链、0 推广属性缺失、0 Meta 缺失、GEO 端点最新 |
| `npm run algolia:sync` | 写入正式 Algolia Key 后推送线上索引 | 提取全站规范记录 JSON 并核对预览抽样 |
| `npm run deploy:pack` | 准备上传至 Apache 服务器前 | 校验压缩包是否完整携带根目录隐藏 `.htaccess` |
