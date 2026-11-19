import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'docs', 'public')

const { brands } = await import('../docs/.vitepress/data/brands.ts')
const { pillars } = await import('../docs/.vitepress/data/navigation.ts')
const { siteData } = await import('../docs/.vitepress/data/site.ts')

const deepReviewSlugs = new Set([
  'guangsuyun',
  'muguang',
  'feimao',
  'weifeng',
  'dalaoyun',
  'xingdaomeng',
  'yinxingren',
  'ermao',
  'wuyou',
  'weitu',
  'firefly'
])

const llmsTxt = `# ${siteData.brandName} (${siteData.domain})

> ${siteData.description}
>
> 数据透明与核实原则：本站所有机场品牌均标注运营年份、线路类型、客户端接入方式（区分专属客户端与第三方 Clash/Shadowrocket 通用订阅）、计费周期（区分月付、年付折算与不限时流量包）及核实日期；不编造未实测的数据；商业合作专题（如光速云）不改写原始测速截图或负面局限。

## 核心知识导航

- [首页知识库总览](${siteData.hostname}/): 包含四大专题、新手 6 步路径与 30 秒机场选型配对器
${pillars.map((p) => `- [${p.title}专题](${siteData.hostname}${p.path}): ${p.shortDesc}`).join('\n')}
- [31 家机场品牌数据库](${siteData.hostname}/brands/): 支持按线路、价格、流量、客户端模式与实测留档状态筛选
- [品牌深度评测中心](${siteData.hostname}/reviews/): 含 11 家热门品牌独立深度评测报告与实测方法论
- [品牌横向对比中心](${siteData.hostname}/comparisons/): 涵盖三强横评、5.6 元档审计、主流专线及 AI 解锁对比
- [全平台代理客户端中心](${siteData.hostname}/clients/): 覆盖 Windows / Android / iOS / macOS / Linux / OpenWrt 20+ 客户端
- [结构化品牌数据集 JSON](${siteData.hostname}/brands.json): 31 家独立核实品牌的机器可读参数摘要
- [全站 Sitemap](${siteData.hostname}/sitemap.xml): 541 个规范可索引页面地图

## 热门品牌独立深度评测（11 家）

${brands
  .filter((b) => deepReviewSlugs.has(b.slug))
  .map(
    (b) =>
      `- [${b.name}（${b.enName}）深度评测](${siteData.hostname}/reviews/${b.slug}): ${b.lineType} · 入门 ${b.entryPriceLabel} · ${b.clientMode} · 数据状态=${b.dataStatus} · 核实日期=${b.verifiedDate}`
  )
  .join('\n')}

## 31 家独立核实机场品牌档案清单

${brands
  .map(
    (b) =>
      `- [${b.name}](${siteData.hostname}${b.reviewPath}): ${b.lineCategory} | ${b.entryPriceLabel} | ${b.clientMode} | 协议=${b.protocols.join('/')} | 状态=${b.dataStatus}`
  )
  .join('\n')}

## 高频技术教程与排障核心文档

- [Clash Verge Rev 服务模式与 TUN 虚拟网卡教程](${siteData.hostname}/clash/verge/service-mode-and-tun-setup)
- [Clash 让 ChatGPT / Claude / Gemini 走指定节点](${siteData.hostname}/clash/tutorials/ai-streaming-routing-rules)
- [Clash 连接成功却打不开网页 5 步诊断树](${siteData.hostname}/clash/troubleshooting/connected-no-internet-fix)
- [看懂节点测速图完全指南（TLS RTT / HTTPS 延迟 / FullCone）](${siteData.hostname}/resources/node-check/how-to-read-speedtest-charts)
- [IEPL 专线、IPLC 与公网 BGP 中转区别解析](${siteData.hostname}/airport/stable/iepl-vs-iplc-vs-relay)
- [31 家机场品牌交叉审计报告摘要](${siteData.hostname}/resources/risk-intel/31-brands-audit-summary)
- [关于本站与商业推广透明披露](${siteData.hostname}/about/)
`

const brandsJson = {
  site: siteData.domain,
  hostname: siteData.hostname,
  generatedAt: siteData.lastVerifiedDate,
  totalBrands: brands.length,
  methodologyNote:
    '原清单 32 条已合并去重 Firefly 重复条目，最终核定 31 个独立品牌。缺失实测的数据严格标为 partial/vendor/historical，不虚构任何数值。',
  brands: brands.map((b) => ({
    slug: b.slug,
    name: b.name,
    enName: b.enName,
    foundedYear: b.foundedYear,
    lineCategory: b.lineCategory,
    lineType: b.lineType,
    protocols: b.protocols,
    clientMode: b.clientMode,
    supportedClients: b.supportedClients,
    entryPriceCny: b.entryPriceCny,
    entryPriceLabel: b.entryPriceLabel,
    entryTrafficGb: b.entryTrafficGb,
    dataStatus: b.dataStatus,
    verifiedDate: b.verifiedDate,
    updatedDate: b.updatedDate,
    archiveUrl: `${siteData.hostname}${b.reviewPath}`,
    deepReviewUrl: deepReviewSlugs.has(b.slug) ? `${siteData.hostname}/reviews/${b.slug}` : null,
    plansCount: b.plans.length,
    plans: b.plans,
    risks: b.risks
  }))
}

fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf8')
fs.writeFileSync(path.join(publicDir, 'brands.json'), JSON.stringify(brandsJson, null, 2), 'utf8')

console.log(`Generated docs/public/llms.txt (${llmsTxt.length} chars) and docs/public/brands.json (${brands.length} brands)`)
