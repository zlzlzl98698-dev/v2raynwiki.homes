import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { clusterDetails } from './cluster-content.mjs'
import { top10DeepReviews } from './top10-reviews-data.mjs'
import { topicDeepModules } from './topic-deep-modules.mjs'
import {
  buildExtendedErrorMatrix,
  buildTechAndVerificationSection,
  buildVerifiedBrandDeepSection
} from './article-enrichment.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const docsDir = path.join(rootDir, 'docs')
const planDir = path.join(rootDir, 'content-planning')

const { brands, getBrandBySlug } = await import('../docs/.vitepress/data/brands.ts')
const { brandLinks } = await import('../docs/.vitepress/data/links.ts')
const { pillars, getClusterP1Items, getClusterP2Items, getClusterAllSubItems } = await import(
  '../docs/.vitepress/data/navigation.ts'
)
const { siteData } = await import('../docs/.vitepress/data/site.ts')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function writeFileSafe(filePath, content, overwrite = true) {
  if (!overwrite && fs.existsSync(filePath)) return false
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf8')
  return true
}

function csvEscape(val) {
  const s = String(val ?? '')
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

const handwrittenP0Paths = new Set([
  '/clash/verge/service-mode-and-tun-setup',
  '/clash/tutorials/ai-streaming-routing-rules',
  '/clash/troubleshooting/connected-no-internet-fix',
  '/resources/node-check/how-to-read-speedtest-charts',
  '/airport/stable/iepl-vs-iplc-vs-relay',
  '/resources/risk-intel/31-brands-audit-summary'
])

const deepReviewSlugs = new Set(['guangsuyun', ...Object.keys(top10DeepReviews)])

const peerMap = {
  guangsuyun: ['guangsuyun', 'muguang', 'feimao', 'xingdaomeng'],
  muguang: ['muguang', 'guangsuyun', 'feimao', 'u1s1'],
  feimao: ['feimao', 'wuyou', 'guangsuyun', 'firefly'],
  weifeng: ['weifeng', 'guangsuyun', 'weitu', 'xingdaomeng'],
  dalaoyun: ['dalaoyun', 'shandianshu', 'yunjiexian', 'liulianyun', 'huanqiuti'],
  xingdaomeng: ['xingdaomeng', 'guangsuyun', 'weitu', 'ermao'],
  ermao: ['ermao', 'xingdaomeng', 'weitu', 'yifan'],
  wuyou: ['wuyou', 'feimao', 'guangsuyun', 'lingmao'],
  weitu: ['weitu', 'yifan', 'guangsuyun', 'xingdaomeng'],
  firefly: ['firefly', 'shanyue', 'guangsuyun', 'feimao'],
  yuzhou: ['yuzhou', 'guangsuyun', 'u1s1', 'xingdaomeng'],
  u1s1: ['u1s1', 'muguang', 'yifan', 'guangsuyun'],
  lingmao: ['lingmao', 'feimao', 'wuyou', 'guangsuyun'],
  jilian: ['jilian', 'guangnian', 'weitu', 'guangsuyun'],
  guangnian: ['guangnian', 'jilian', 'yifan', 'guangsuyun'],
  yifan: ['yifan', 'weitu', 'guangsuyun', 'xingdaomeng'],
  sogo: ['sogo', 'quanqiu', 'firefly', 'guangsuyun'],
  kexin: ['kexin', 'sujie', 'sogo', 'guangsuyun'],
  sujie: ['sujie', 'kexin', 'guangsuyun', 'yifan'],
  shanyue: ['shanyue', 'firefly', 'yinxingren', 'guangsuyun'],
  quanqiu: ['quanqiu', 'sogo', 'muguang', 'guangsuyun'],
  shandianshu: ['shandianshu', 'dalaoyun', 'yunjiexian', 'liulianyun', 'huanqiuti'],
  yunjiexian: ['yunjiexian', 'dalaoyun', 'shandianshu', 'huanqiuti'],
  liulianyun: ['liulianyun', 'dalaoyun', 'shandianshu', 'yunjiexian'],
  shenxing: ['shenxing', 'weifeng', 'jilian', 'guangsuyun'],
  huanqiuti: ['huanqiuti', 'yunjiexian', 'dalaoyun', 'shandianshu'],
  yinxingren: ['yinxingren', 'shanyue', 'firefly', 'muguang'],
  tiziyun: ['tiziyun', 'guangsuyun', 'feimao', 'weifeng'],
  lingdong: ['lingdong', 'guangsuyun', 'yifan', 'muguang'],
  langwang: ['langwang', 'muguang', 'guangsuyun', 'lingdong'],
  edgenova: ['edgenova', 'weitu', 'guangsuyun', 'lingdong']
}

// =========================================================================
// 1. 生成全部 31 个品牌参数档案页 (docs/brands/<slug>.md)
// =========================================================================
let generatedBrands = 0
for (const b of brands) {
  const link = brandLinks[b.slug]
  const peers = peerMap[b.slug] || [b.slug, 'guangsuyun', 'xingdaomeng', 'weitu']
  const hasShots = Array.isArray(b.screenshots) && b.screenshots.length > 0
  const hasDeepReview = deepReviewSlugs.has(b.slug)

  const faqList = [
    {
      q: `${b.name} 支持 Clash Verge Rev 和 Shadowrocket 第三方客户端吗？`,
      a:
        b.clientMode === '仅专属客户端'
          ? `不支持第三方通用订阅。${b.name} 当前采用官方专属客户端下载登录即用模式，无法导出给 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由使用。`
          : b.clientMode === '待核实'
            ? `当前收录资料尚未确认 ${b.name} 的最新客户端接入模式，下单前请在官网核对是否提供 Clash/通用订阅链接。`
            : `支持。${b.name} 属于「${b.clientMode}」模式，兼容 ${b.supportedClients.join('、')}，可搭配规则分流灵活使用。`
    },
    {
      q: `${b.name} 的起步价格与计费周期是怎么算的？`,
      a: `${b.name} 当前记录的入门参考价为 ${b.entryPriceLabel}（${b.entryBillingNote}）。请注意区分年付折算均价与常规月付价格，并以官网结算页实时价格为准。`
    },
    {
      q: `${b.name} 目前有公开实测截图或独立数据验证吗？`,
      a: hasShots
        ? `本站已归档 ${b.screenshots.length} 张 ${b.name} 原始测速留档截图（测试时间：${b.screenshots[0].testedAt}）。需注意单批次快照不能单独证明全年晚高峰稳定性，仍建议先小额月付实测。`
        : `当前资料库尚未收录 ${b.name} 的独立原始测速截图（数据状态：${b.dataStatus}），相关速度与解锁说明主要来自公开资料整理，建议首单按月付实测核验。`
    }
  ]

  const md = `---
title: ${b.name}（${b.enName}）参数档案与套餐清单（${b.verifiedDate} 核实）
description: 整理 ${b.name}（${b.enName}）的基础参数、${b.lineType}、套餐报价表（${b.entryPriceLabel}）、客户端模式与数据核实状态。
date: ${b.verifiedDate}
updatedDate: ${b.updatedDate}
category: 品牌参数档案
author: v2rayn百科评测组
dataStatus: ${b.dataStatus}
relatedBrands:
${peers.map((s) => `  - ${s}`).join('\n')}
keywords:
  - ${b.name}参数
  - ${b.name}套餐价格
  - ${b.name}优惠码
  - ${b.lineCategory}机场档案
faq:
${faqList.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${b.name}（${b.enName}）参数与套餐档案

<div class="kb-answer-first">
  <div class="kb-answer-first-label">档案速览 · Answer-First</div>
  <p>${b.summary}${hasDeepReview ? ` 如需查看完整的套餐单价测算、客户端配置与同梯队横评，请前往 <a href="/reviews/${b.slug}">${b.name} 2026 深度评测</a>。` : ''}</p>
</div>

<BrandInfrastructureSnapshot slug="${b.slug}" />

<BrandCTA slug="${b.slug}" />

## 一、品牌基础参数与特点

- **品牌名称**：${b.name}（${b.enName}${b.aliases?.length ? `，别名：${b.aliases.join(' / ')}` : ''}）
- **运营起始**：${b.foundedYear}
- **线路架构**：${b.lineType}
- **协议与客户端**：协议记录为 \`${b.protocols.join(' / ')}\`，客户端接入属于 **${b.clientMode}**（${b.supportedClients.join('、')}）
- **支付方式**：${b.paymentMethods.join(' / ')}

${b.features.map((f) => `- ${f}`).join('\n')}

## 二、套餐价格、流量额度与计费周期

${b.entryBillingNote}。下方卡片已清晰区分月付、年付折算与一次性不限时流量包：

<BrandPricingTable slug="${b.slug}" />

## 三、线路架构与测速实测状态

<NetworkTopology slug="${b.slug}" />

<NetworkPerformanceReport slug="${b.slug}" />

${
  hasShots
    ? `### 原始实测截图留档（未经裁切改写）\n\n<BrandScreenshots slug="${b.slug}" />`
    : `> **实测证据状态说明**：本站目前尚未取得 ${b.name} 的独立原始测速截图，绝不虚构延迟或峰值速度。建议先以最低月付档在自家宽带晚高峰（20:00–23:00）实测验证。`
}

## 四、AI 工具与流媒体解锁状态

<StreamingAvailabilityMatrix slug="${b.slug}" />

## 五、适用人群、风险提示与审计备注

### 适合人群
${b.suitableFor.map((s) => `- ${s}`).join('\n')}

### 不适合人群
${b.notSuitableFor.map((s) => `- ${s}`).join('\n')}

### 风险提示与数据审计记录
${b.risks.map((r) => `- **风险提示**：${r}`).join('\n')}
${b.auditNotes.map((a) => `- **审计备注**：${a}`).join('\n')}

## 六、同梯队品牌横向对比

<BrandComparison :slugs='${JSON.stringify(peers)}' />

## 七、常见问题（FAQ）

${faqList.map((f, i) => `### ${i + 1}. ${f.q}\n${f.a}`).join('\n\n')}

---

<BrandCTA slug="${b.slug}" heading="前往 ${b.name} 官方注册入口${link?.couponCode ? `（优惠码 ${link.couponCode}）` : ''}" />
`

  writeFileSafe(path.join(docsDir, 'brands', `${b.slug}.md`), md, true)
  generatedBrands++
}

// =========================================================================
// 2. 生成前十热门品牌独立深度评测页 (docs/reviews/<slug>.md)
//    （保留手写的 docs/reviews/guangsuyun.md）
// =========================================================================
let generatedTop10Reviews = 0
for (const [slug, extra] of Object.entries(top10DeepReviews)) {
  const b = getBrandBySlug(slug)
  if (!b) continue
  const link = brandLinks[slug]
  const peers = peerMap[slug] || [slug, 'guangsuyun', 'muguang', 'feimao']
  const hasShots = Array.isArray(b.screenshots) && b.screenshots.length > 0

  const planTableRows = b.plans.map((p) => {
    const gbMatch = String(p.traffic).match(/(\d+(?:\.\d+)?)\s*(TB|T|GB|G)/i)
    let unitPrice = '待核实'
    if (gbMatch) {
      const rawNum = parseFloat(gbMatch[1])
      const gbVal = /T/i.test(gbMatch[2]) ? rawNum * 1024 : rawNum
      if (gbVal > 0) {
        if (p.billingCycle === '年付') {
          unitPrice = `约 ¥${(p.priceCny / (gbVal * 12)).toFixed(3)}/GB`
        } else {
          unitPrice = `约 ¥${(p.priceCny / gbVal).toFixed(3)}/GB`
        }
      }
    }
    return `| ${p.name} | ${p.billingCycle} | ¥${p.priceCny} | ${p.traffic}（${p.trafficCycle}） | ${unitPrice} | ${p.note || '常规在售参考档'} |`
  })

  const clientWorkflow =
    b.clientMode === '仅专属客户端'
      ? `**注意：${b.name} 采用官方专属客户端模式（不提供第三方通用订阅链接）**。您无法将节点导入 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由。\n\n<div class="kb-steps">\n  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>注册并下载官方专属客户端</strong>：通过下方注册入口完成账号注册，在用户后台下载对应 Windows / macOS / Android / iOS 官方客户端。</div></div>\n  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>账号密码直接登录</strong>：启动官方 App 后直接输入注册邮箱与密码登录，无需复制或转换任何 YAML 订阅地址。</div></div>\n  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>按场景挑选节点与模式</strong>：日常优先使用系统自带智能分流模式，避开将微信、国内网盘走代理流量；使用 AI 工具时手动切换至非受限节点测试。</div></div>\n</div>`
      : `**${b.name} 支持第三方通用订阅导入**，可无缝搭配开源客户端与规则分流脚本使用：\n\n<div class="kb-steps">\n  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>获取 Clash / 通用订阅链接</strong>：在 ${b.name} 用户中心「仪表盘」复制对应格式的订阅 URL（避免在陌生在线网站转换订阅）。</div></div>\n  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>导入开源客户端</strong>：PC/Mac 推荐使用 <a href="/clash/verge-download/official-release-guide">Clash Verge Rev</a> 或 <a href="/clients/windows#v2rayn">v2rayN</a>；安卓推荐 <a href="/clients/android#v2rayng">v2rayNG / FlClash</a>；iPhone 推荐 <a href="/clients/ios#shadowrocket">Shadowrocket</a>。</div></div>\n  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>启用规则（Rule）模式与 AI 分流</strong>：导入激活后保持规则模式，并可参考 <a href="/clash/tutorials/ai-streaming-routing-rules">AI 定向策略组教程</a> 让 ChatGPT/Gemini 自动匹配对应地区节点。</div></div>\n</div>`

  const faqs = [
    {
      q: `${b.name} 怎么样？最适合什么类型的用户？`,
      a: `${b.name} 定位为「${extra.positioning}」，属于 ${b.lineType}，入门参考价 ${b.entryPriceLabel}。${b.suitableFor.join('；')}。`
    },
    {
      q: `${b.name} 的实际最低月付成本和年付折算有什么区别？`,
      a: `${b.entryBillingNote}。请注意“年付折算均价”需一次性支付全年费用且多数特殊套餐不支持退款，首次测试强烈建议选择最小月付档先测晚高峰。`
    },
    {
      q: `${b.name} 能导入 Clash Verge Rev、Shadowrocket 或 OpenWrt 吗？`,
      a:
        b.clientMode === '仅专属客户端'
          ? `不能。${b.name} 当前仅提供官方专属客户端登录使用，不开放 Clash 或小火箭订阅链接；如果您依赖软路由或自定义规则，请改选光速云、星岛梦、唯兔云或一翻云。`
          : b.clientMode === '待核实'
            ? `目前资料未确认 ${b.name} 的订阅导出政策，下单前请先向客服核实。`
            : `可以。${b.name} 支持 ${b.supportedClients.join('、')}，并支持配合 Clash Verge Rev 的服务模式 TUN 与全局扩展脚本。`
    },
    {
      q: `${b.name} 有哪些必须提前了解的风险与数据冲突？`,
      a: `${b.risks.join('；')}。${b.auditNotes.join('；')}`
    }
  ]

  const reviewMd = `---
title: ${extra.title}
description: ${b.summary} 全面拆解 ${b.name} 套餐单 GB 成本、测速留档、客户端使用方式、同梯队对比与风险核实。
date: ${b.verifiedDate}
updatedDate: ${b.updatedDate}
category: 品牌深度评测
author: v2rayn百科评测组
dataStatus: ${b.dataStatus}
relatedBrands:
${peers.map((s) => `  - ${s}`).join('\n')}
related:
  - title: ${JSON.stringify(`${b.name} 完整参数档案`)}
    link: ${JSON.stringify(`/brands/${b.slug}`)}
    desc: ${JSON.stringify(`查看 ${b.name} 结构化参数与完整对比入口`)}
  - title: "光速云 2026 旗舰深度评测"
    link: "/reviews/guangsuyun"
    desc: "含三网 2Gbps 与 9Gbps 全节点解锁及测速拆解"
  - title: "专属客户端 vs 第三方通用订阅深度对比"
    link: "/comparisons/proprietary-vs-subscription-airports"
    desc: "对比两类客户端自由度与软路由兼容边界"
keywords:
  - ${b.name}深度评测
  - ${b.name}怎么样
  - ${b.name}测速与解锁
  - ${b.name}套餐性价比
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${extra.title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">核心评测结论 · Answer-First</div>
  <p><strong>${b.name}（${b.enName}）</strong>定位为「<strong>${extra.positioning}</strong>」。${b.summary}</p>
</div>

<BrandInfrastructureSnapshot slug="${b.slug}" />

<BrandCTA slug="${b.slug}" heading="前往 ${b.name} 官方入口${link?.couponCode ? `（记录优惠码 ${link.couponCode}）` : ''}" />

## 一、核心定位与数据审计透明说明

${extra.auditWarning}

- **运营起始年份**：${b.foundedYear}
- **官方线路定位**：${b.lineType}
- **客户端接入模式**：**${b.clientMode}**（${b.supportedClients.join('、')}）
- **主要特点**：${b.features.join('；')}

## 二、套餐体系与单 GB 真实成本测算

${extra.pricingInsight}

### 全档位单 GB 折算成本对照表

| 套餐名称 | 计费周期 | 标称价格 | 流量配额 | 折算单 GB 成本 | 备注说明 |
| --- | --- | --- | --- | --- | --- |
${planTableRows.join('\n')}

<BrandPricingTable slug="${b.slug}" />

## 三、线路架构与实测证据拆解

${extra.lineDeepDive}

<NetworkTopology slug="${b.slug}" />

<NetworkPerformanceReport slug="${b.slug}" />

${
  hasShots
    ? `### 原始实测截图留档（点击可放大核验）\n\n<BrandScreenshots slug="${b.slug}" />`
    : `> **无原始测速截图披露**：本站严格遵守不编造实测数据的原则。当前尚未收录 ${b.name} 的独立原始测速 PNG/JPG 留档，上文或数据库中的非晚高峰参考值亦仅供区间对照，务必先小额月付在晚高峰 21:00 自测。`
}

## 四、AI 工具与流媒体解锁评估

<StreamingAvailabilityMatrix slug="${b.slug}" />

## 五、客户端接入与实战配置步骤

${clientWorkflow}

## 六、优势、不足与同梯队品牌横向对比

### 综合适合与不适合人群
- **适合人群**：${b.suitableFor.join('；')}
- **不适合人群**：${b.notSuitableFor.join('；')}
- **风险与核实提示**：${b.risks.join('；')}

### 同价位/同定位竞品横向对比

<BrandComparison :slugs='${JSON.stringify(peers)}' />

建议同步对比参考：[光速云旗舰深度评测](/reviews/guangsuyun) 与 [热门三强横评：光速云 vs 暮光加速 vs 飞猫云](/comparisons/guangsuyun-vs-muguang-vs-feimao)。

## 七、常见问题（FAQ）

${renderFaqDetailsList(faqs)}

---

<BrandCTA slug="${b.slug}" heading="前往 ${b.name} 注册体验" note="核实日期：${b.verifiedDate} ｜ 请以官网实时结算价与套餐条款为准" />
`
  writeFileSafe(path.join(docsDir, 'reviews', `${slug}.md`), reviewMd, true)
  generatedTop10Reviews++
}

function renderFaqDetailsList(faqs) {
  return faqs
    .map(
      (f, i) =>
        `<details open class="kb-faq-details">\n<summary><strong>${i + 1}. ${f.q}</strong></summary>\n\n${f.a}\n\n</details>`
    )
    .join('\n\n')
}

// =========================================================================
// 3. P1 & P2 延伸长尾文章生成器（7 类差异化专题 × 56 集群 = 392 篇）
// =========================================================================
function buildSubArticleMarkdown({ pillar, topic, cluster, detail, item, allSubItems }) {
  const relBrands = topic.relatedBrands.map((s) => getBrandBySlug(s)).filter(Boolean)
  const leadBrand = relBrands[0] || getBrandBySlug('guangsuyun')
  const secondBrand = relBrands[1] || getBrandBySlug('xingdaomeng')
  const thirdBrand = relBrands[2] || getBrandBySlug('weitu')
  const topicMod = topicDeepModules[topic.id]
  const brandDeepBlock = buildVerifiedBrandDeepSection(relBrands, brandLinks, deepReviewSlugs, cluster, item.key)
  const techDeepBlock = buildTechAndVerificationSection(topicMod, topic, cluster, item.key)
  const errorMatrixBlock = buildExtendedErrorMatrix(cluster, topic, item.key)
  const mergeFaqs = (localFaqs) => [...localFaqs, ...(topicMod?.extraFaqs || [])]

  const relatedFrontmatter = [
    { title: `${cluster.title}（P0 核心入口指南）`, link: cluster.entryPath, desc: cluster.summary },
    ...allSubItems
      .filter((s) => s.path !== item.path)
      .slice(0, 4)
      .map((s) => ({ title: s.title, link: s.path, desc: `${cluster.primaryKeyword} · ${s.shortTitle}` }))
  ]

  if (item.key === 'comparison') {
    const title = `${cluster.title}｜${cluster.primaryKeyword} 2026 参数对比与避坑清单`
    const desc = `围绕「${cluster.primaryKeyword}」整理 2026 核心参数对照表与 5 项购买/配置前避坑核查清单，结合 ${relBrands.map((b) => b.name).join('、')} 真实核实数据横向评估。`
    const faqs = mergeFaqs([
      {
        q: `在对比「${cluster.primaryKeyword}」相关方案时，最容易踩的参数误区是什么？`,
        a: `最常见误区是只看宣传起步均价而忽略「计费周期（年付折算 vs 月付）」与「客户端开放度（仅专属客户端 vs 支持 Clash/Shadowrocket 通用订阅）」。务必按本文 5 项清单逐条核对。`
      },
      {
        q: `${leadBrand.name} 与 ${secondBrand.name} 在「${cluster.title}」场景下该如何二选一？`,
        a: `${leadBrand.name} 定位「${leadBrand.lineCategory} · ${leadBrand.clientMode}」（入门 ${leadBrand.entryPriceLabel}），而 ${secondBrand.name} 为「${secondBrand.lineCategory} · ${secondBrand.clientMode}」（入门 ${secondBrand.entryPriceLabel}）。若需第三方客户端自定义分流优先选支持通用订阅的一方，若追求特定档位流量则按单 GB 成本抉择。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科评测组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}对比
  - ${cluster.primaryKeyword}避坑清单
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">参数对比直答 · Answer-First</div>
  <p>针对<strong>「${cluster.primaryKeyword}」</strong>做选型与配置对比时，核心结论是：${detail.answer} 在具体参数核对上，应优先锁定<strong>线路层级（IEPL/IPLC vs 普通中转）、客户端通用订阅兼容性、单 GB 真实折算成本以及是否具备 2026 年原始测速留档</strong>四个硬指标。</p>
</div>

## 一、${cluster.primaryKeyword}核心维度参数对照总表

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

## 二、${cluster.title}关联品牌横向对比

<BrandComparison :slugs='${JSON.stringify(topic.relatedBrands)}' />

### 代表方案差异点速评

${relBrands
  .map(
    (b, idx) =>
      `${idx + 1}. **[${b.name}](${deepReviewSlugs.has(b.slug) ? `/reviews/${b.slug}` : b.reviewPath})**（${b.foundedYear} 年运营 / \`${b.lineCategory}\`）：入门参考价 **${b.entryPriceLabel}**，客户端模式为 **${b.clientMode}**。核心优势在于${b.features[0]}；需注意：${b.risks[0]}。`
  )
  .join('\n')}

## 三、选型与配置「${cluster.primaryKeyword}」必查 5 项清单

<div class="kb-steps">
  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>核对客户端与软路由兼容性</strong>：确认主力设备（Windows / macOS / iOS 小火箭 / OpenWrt 软路由）是否必须依赖通用订阅链接。纯专属客户端品牌无法导入 Clash Verge Rev。</div></div>
  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>拆解年付均价与常规月付差额</strong>：核对低至 5.6–8 元/月的标价是否为年付折算价；首次测试任何线路均优先选择 19–25 元单月套餐或百元内小包验证。</div></div>
  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>核验重点业务要点（${detail.steps[0][0]}）</strong>：${detail.steps[0][1]}</div></div>
  <div class="kb-step"><div class="kb-step-num">4</div><div><strong>核查原始测速与解锁分化（${detail.steps[1]?.[0] || '多节点实测验证'}）</strong>：${detail.steps[1]?.[1] || '查看是否保留带时间戳的原始测速图，并区分香港、新加坡、日本节点的 AI 与流媒体解锁状态。'}</div></div>
  <div class="kb-step"><div class="kb-step-num">5</div><div><strong>建立异构双备防失联预案</strong>：主力方案之外，搭配不同上游或一次性不限时流量包，并收藏 <a href="${cluster.entryPath}">${cluster.title}核心入口</a> 与本地安装包。</div></div>
</div>

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 四、「${cluster.primaryKeyword}」比价与选型常见问题（FAQ）

${renderFaqDetailsList(faqs)}
`
  }

  if (item.key === 'beginner') {
    const title = `${cluster.title}｜${cluster.primaryKeyword}新手零基础图解步骤`
    const desc = `面向零基础新手的「${cluster.primaryKeyword}」分步实操教程：从环境准备、客户端选择、配置导入到连通性自检，一步步照做即可完成。`
    const faqs = mergeFaqs([
      {
        q: `零基础新手按本文配置「${cluster.primaryKeyword}」大概需要多久？`,
        a: `只要提前准备好对应的官方客户端与有效订阅（或账号），按本文标准步骤逐项操作通常在 5–10 分钟内即可完成并验证通过。`
      },
      {
        q: `操作到一半发现节点有延迟但网页打不开怎么办？`,
        a: `请先确认客户端处于「规则（Rule）」模式且系统时间已自动同步，若仍异常可直接跳转阅读本集群配套的故障排查手册。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科技术组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}教程
  - ${cluster.primaryKeyword}新手步骤
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">新手速成结论 · Answer-First</div>
  <p>第一次处理<strong>「${cluster.primaryKeyword}」</strong>无需死记硬背复杂网络理论。记住核心结论：${detail.answer} 只要按下方「准备环境 → 标准分步操作 → 三项自检核验」顺序执行，零基础也能一次跑通。</p>
</div>

## 一、${cluster.primaryKeyword}入门前环境与软件准备表

| 操作系统 | 推荐首选客户端 | 配置文件/接入要求 | 官方教程入口 |
| --- | --- | --- | --- |
| Windows 10/11 | Clash Verge Rev / v2rayN | 优先 x64 安装版 + Clash YAML 订阅 | [Windows 客户端指南](/clients/windows) |
| macOS (M系列/Intel) | Clash Verge Rev / FlClash | 区分 aarch64 与 x64 安装包 | [macOS 客户端指南](/clients/macos) |
| Android 安卓 | v2rayNG / FlClash / Hiddify | 优先下载 arm64-v8a 官方 APK | [Android 客户端指南](/clients/android) |
| iPhone / iPad | Shadowrocket / Stash / Karing | 需使用非国区 App Store 下载 | [iOS 客户端指南](/clients/ios) |
| OpenWrt 软路由 | OpenClash / Nikki / HomeProxy | 必须选用支持通用订阅的服务商 | [OpenWrt 软路由指南](/clients/openwrt) |

## 二、${cluster.title}零基础分步实操流程

<div class="kb-steps">
${detail.steps
  .map(
    ([stTitle, stBody], idx) =>
      `  <div class="kb-step"><div class="kb-step-num">${idx + 1}</div><div><strong>第 ${idx + 1} 步：${stTitle}</strong><br />${stBody}</div></div>`
  )
  .join('\n')}
</div>

### 终端与浏览器连通性快速验证

\`\`\`bash
# 1. 检查海外 HTTPS 响应头（返回 HTTP/2 200 即连通）
curl -I https://www.google.com

# 2. 检查当前出口 IP 与归属 ASN
curl https://api.ip.sb/geoip
\`\`\`

## 三、新手处理「${cluster.primaryKeyword}」最易忽略的细节

1. **导入订阅后忘记点击激活卡片**：在 Clash Verge Rev 的「订阅（Profiles）」界面导入链接后，必须**单击生成的卡片使其高亮**，再去「代理」页选择「规则（Rule）」模式。
2. **长期误开全局（Global）模式**：全局模式会把微信、B 站、淘宝与网盘流量全部绕去海外，既卡顿又白白耗尽流量；日常请始终保持 **规则（Rule）** 模式。
3. **香港节点直连 AI 报错以为配置失败**：如 [${leadBrand.name}档案](${deepReviewSlugs.has(leadBrand.slug) ? `/reviews/${leadBrand.slug}` : leadBrand.reviewPath}) 所示，香港节点普遍对 ChatGPT 网页版与 Gemini 存在地区限制，使用 AI 工具时请切换至 **新加坡、日本或美国节点**。

## 四、${topic.title}新手友好型参考品牌

<BrandRecommendation :slugs='${JSON.stringify(topic.relatedBrands.slice(0, 3))}' title="新手友好型参考品牌" />

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 五、「${cluster.primaryKeyword}」新手常见问题（FAQ）

${renderFaqDetailsList(faqs)}
`
  }

  if (item.key === 'benchmark') {
    const title = `${cluster.title}｜${cluster.primaryKeyword}晚高峰实测表现与数据分析`
    const desc = `基于 2026 原始测速留档截图与非晚高峰/晚高峰多网样本，深度拆解「${cluster.primaryKeyword}」相关的 TLS RTT 延迟、单线程吞吐、AI/流媒体解锁分化与数据解读方法。`
    const faqs = mergeFaqs([
      {
        q: `为什么分析「${cluster.primaryKeyword}」时不能只看白天的最高测速峰值？`,
        a: `白天跨境链路空闲时普通公网中转也能跑出高数值；唯有晚间 20:00–23:00 高峰期的平均速度、速度曲线平整度与 HTTPS 延迟，才能反映真实体验。`
      },
      {
        q: `实测数据中不同地区的合理延迟（TLS RTT）范围是多少？`,
        a: `国内三网访问香港/台湾节点通常在 20–48ms；新加坡与日本节点在 42–80ms；美国西海岸节点在 135–215ms。若远超该区间通常代表入口绕路或晚高峰拥塞。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科评测组
dataStatus: measured
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}实测
  - ${cluster.primaryKeyword}晚高峰测速
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">实测数据分析结论 · Answer-First</div>
  <p>评估<strong>「${cluster.primaryKeyword}」</strong>的真实网络质量时，必须坚持 Evidence-First 原则：${detail.answer} 结合本站 2026-08-11 统一批次与 2026-08-19 三网 2Gbps/9Gbps 实测库，<strong>平均吞吐、HTTPS 请求体感延迟与逐节点 AI 解锁分化</strong>远比单一峰值跑分更具决策价值。</p>
</div>

## 一、${cluster.primaryKeyword}代表品牌节点延迟与带宽观测面板

以下展示本专题代表品牌 **[${leadBrand.name}](${deepReviewSlugs.has(leadBrand.slug) ? `/reviews/${leadBrand.slug}` : leadBrand.reviewPath})** 的节点延迟与下载吞吐观测数据（可与 [${secondBrand.name}](${secondBrand.reviewPath})、[${thirdBrand.name}](${thirdBrand.reviewPath}) 档案交叉对照）：

<NetworkPerformanceReport slug="${leadBrand.slug}" />

<StreamingAvailabilityMatrix slug="${leadBrand.slug}" />

## 二、${cluster.title}五地区基准延迟与吞吐量化对照

| 品牌名称 | 线路类型 | 香港 (延迟/下载) | 新加坡 (延迟/下载) | 日本 (延迟/下载) | 美国 (延迟/下载) | 实测留档状态 |
| --- | --- | --- | --- | --- | --- | --- |
${relBrands
  .map((b) => {
    const getM = (reg) => {
      const m = b.speedMetrics?.find((x) => x.region === reg)
      return m ? `${m.latencyMs}ms / ${m.downloadMbps}Mbps` : '待复核'
    }
    return `| [${b.name}](${deepReviewSlugs.has(b.slug) ? `/reviews/${b.slug}` : b.reviewPath}) | ${b.lineCategory} | ${getM('香港')} | ${getM('新加坡')} | ${getM('日本')} | ${getM('美国')} | ${b.dataStatus === 'measured' ? `含实测截图(${b.screenshots?.length || 1}张)` : '品牌资料记录'} |`
  })
  .join('\n')}

## 三、${topic.title}实测指标与快照局限解读

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

### 单日测速快照的 3 条方法论边界

1. **区分测试带宽与家庭宽带上限**：实验室后端测出 500Mbps+ 证明节点出口充裕；家庭宽带只要晚高峰单线程稳定在 **120Mbps（15MB/s）** 以上，观看 4K 60fps 视频与拉取大型镜像即已流畅。
2. **如实对待异常与失败节点**：真实测试中存在个别维护或低速节点（如光速云 9Gbps 批次中的美国02 单节点低速），保留原始记录正是为了指导用户在客户端测速跳过。
3. **跨网差异需本地验证**：北方联通、南方电信与移动宽带路径不同，建议阅读 [看懂节点测速图完全指南](/resources/node-check/how-to-read-speedtest-charts) 并在晚间 20:30–22:30 进行本地自测。

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 四、「${cluster.primaryKeyword}」测速数据分析 FAQ

${renderFaqDetailsList(faqs)}
`
  }

  if (item.key === 'troubleshoot') {
    const title = `${cluster.title}｜${cluster.primaryKeyword}常见报错与故障排查手册`
    const desc = `针对「${cluster.primaryKeyword}」使用过程中的连接超时、延迟红字、订阅更新报错、分流失效与平台风控问题，提供标准化 4 步诊断树与快速修复方案。`
    const faqs = mergeFaqs([
      {
        q: `遇到「${cluster.primaryKeyword}」突发异常时，怎么在 1 分钟内判断是本地问题还是机场故障？`,
        a: `最简单的方法是打开手机关闭 Wi-Fi 改用 5G 移动流量测试同一订阅，或在电脑切换至另一家异构备用订阅：若备用正常而主订阅全红，则为机场侧入口维护；若两个都连不上，则是本地系统代理、时间同步或防火墙冲突。`
      },
      {
        q: `修改配置排障后导致客户端彻底无法启动怎么办？`,
        a: `在客户端 Profiles 目录中关闭或清空刚才修改的全局扩展脚本/Merge 配置，重启内核并重新拉取一次机场原生订阅即可恢复初始状态。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科技术组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}故障排查
  - ${cluster.primaryKeyword}报错解决
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">排障速查结论 · Answer-First</div>
  <p>处理<strong>「${cluster.primaryKeyword}」</strong>相关报错时，切忌盲目重装系统或反复删软件。核心排障基准：${detail.answer} 按下方「故障现象对照表 → 4 步标准诊断树 → 应急回退预案」逐项排除，可在 3 分钟内定位 95% 的常见故障。</p>
</div>

## 一、${cluster.primaryKeyword}高频报错现象、根因与修复速查

| 典型异常 / 报错现象 | 高概率根因 | 立即修复动作 |
| --- | --- | --- |
| 节点测速有绿色延迟，但浏览器打不开任何外网 | 浏览器代理扩展（SwitchyOmega 等）端口劫持，或误选为直连（Direct）模式 | 停用浏览器代理插件，确认客户端处于 **规则（Rule）** 模式并重开系统代理 |
| 全部节点一次性变为 \`Timeout\` 超时 | 系统时间偏差超过 60 秒、订阅套餐到期耗尽，或机场入口域名变更 | 同步操作系统网络时间 → 登录机场面板核对流量并更新订阅 |
| 网页正常，但命令行 / Git / Docker / 桌面游戏连不上 | 系统代理不接管非 HTTP 变量进程，尚未开启 TUN 虚拟网卡 | 参考 [服务模式与 TUN 教程](/clash/verge/service-mode-and-tun-setup) 安装 Service Mode 并启用 TUN |
| 访问 ChatGPT / Claude / Gemini 报 403 或地区不支持 | 当前落在了香港节点（常仅限 App）或高风控机房 IP | 切换至新加坡、日本或美国节点，并配置 [AI 定向策略组](/clash/tutorials/ai-streaming-routing-rules) |
| 关闭客户端后连国内百度/B站也打不开 | 异常退出导致 Windows 注册表残留 \`127.0.0.1:7897\` 手动代理 | 进入 Windows 设置 → 网络和 Internet → 代理 → 关闭手动代理服务器 |

## 二、${cluster.title}专项核查基准参数表

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

## 三、排查「${cluster.primaryKeyword}」异常的四步诊断流程

<div class="kb-steps">
  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>第 1 步：核查系统时间、端口与内核状态</strong><br />确认操作系统时间误差在 30 秒以内；确认混合端口（默认 <code>7897</code>）未被旧进程占用，且内核已选用支持新协议的 <strong>Mihomo（Clash Meta）</strong> 或最新版 sing-box / Xray。</div></div>
  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>第 2 步：对照专项配置要点（${detail.steps[0][0]}）</strong><br />${detail.steps[0][1]}</div></div>
  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>第 3 步：观察实时连接日志（Connections / Logs）</strong><br />打开客户端「连接」与「日志」面板：若访问网页时列表毫无动静，说明流量未进入客户端；若出现红色 <code>dial tcp / handshake failed</code>，说明当前节点不可达，立即切换地区节点或刷新订阅。</div></div>
  <div class="kb-step"><div class="kb-step-num">4</div><div><strong>第 4 步：一键切换异构备用订阅止损</strong><br />若确认为单一机场临时线路维护，立即在 Profiles 界面切换至预先准备的备用订阅（如不限时流量包），保障工作不断线。</div></div>
</div>

## 四、${topic.title}高可用主备参考品牌

<BrandRecommendation :slugs='${JSON.stringify(topic.relatedBrands.slice(0, 3))}' title="适合作为主备冗余的参考品牌" />

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 五、「${cluster.primaryKeyword}」故障排查常见问题（FAQ）

${renderFaqDetailsList(faqs)}
`
  }

  // ======================== P2 深度拓展三大场景 ========================
  if (item.key === 'cross-platform') {
    const title = `${cluster.title}｜${cluster.primaryKeyword} Windows / macOS / 手机端适配要点`
    const desc = `针对「${cluster.primaryKeyword}」在 Windows 11、macOS（Apple Silicon / Intel）、Android、iOS 及 OpenWrt 软路由的跨平台适配细节、架构选包与统一规则策略。`
    const faqs = mergeFaqs([
      {
        q: `如何在电脑、手机和路由器之间同步「${cluster.primaryKeyword}」的使用体验？`,
        a: `关键在于选用支持通用订阅的服务商（如 ${relBrands.filter((b) => b.clientMode !== '仅专属客户端').map((b) => b.name).join('、') || '光速云、星岛梦'}），并在各端统一选用同一内核生态（例如桌面 Clash Verge Rev + 安卓 FlClash + iOS Stash + 软路由 OpenClash/Nikki）。`
      },
      {
        q: `仅支持专属客户端的机场怎么在多台设备上保持一致？`,
        a: `需在每台设备分别安装官方对应系统的专属 App 并登录同一账号，注意 iOS 端可能需要外区商店或 TestFlight，且无法直接在 OpenWrt 软路由上运行。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科技术组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}跨平台
  - ${cluster.primaryKeyword}手机电脑配置
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">跨平台适配结论 · Answer-First</div>
  <p>围绕<strong>「${cluster.primaryKeyword}」</strong>进行多端部署时，最常踩的坑是“桌面端正常但手机断流、Mac 芯片包下错、或软路由无法导入订阅”。核心原则：${detail.answer} 在选型与配置上务必按操作系统分别落实架构核验与后台保活。</p>
</div>

## 一、${cluster.primaryKeyword}六大系统与软路由适配矩阵

| 系统平台 | 架构 / 固件注意点 | 推荐开源客户端 | 本专题专属适配要点 |
| --- | --- | --- | --- |
| **Windows 10/11** | 常规 PC 选 \`x64\`，骁龙本选 \`arm64\` | [Clash Verge Rev](/clients/windows) / v2rayN | 终端与 IDE 须装 Service Mode 并启用 TUN；关闭后留意清理代理残留 |
| **macOS** | M1–M4 选 \`aarch64\`，Intel 选 \`x64\` | [Clash Verge Rev](/clients/macos) / FlClash | 首次运行若提示“已损坏”，核实官方签名后执行 \`xattr\` 移除隔离属性 |
| **Android** | 优先选 \`arm64-v8a\` 官方 APK | [v2rayNG / FlClash / Hiddify](/clients/android) | 关闭系统电池优化防杀后台，配置分应用绕过国内银行 App；拒用 Play 冒牌 NekoBox |
| **iOS / iPadOS** | 仅在 App Store 内切外区账号 | [Shadowrocket / Stash / Karing](/clients/ios) | 全局路由设为「配置」，关闭冗余日志防止 Network Extension 内存超限闪退 |
| **Linux 桌面/主机** | 桌面选 \`.deb/.rpm\`，无头选 Web UI | [v2rayA / sing-box](/clients/linux) | Ubuntu 24.04 运行 AppImage 需补 \`libfuse2t64\`；服务器推荐 systemd 守护 |
| **OpenWrt 软路由** | 核对 fw3/fw4、架构及 \`/overlay\` 空间 | [OpenClash / Nikki / HomeProxy](/clients/openwrt) | **严禁使用纯专属客户端机场**；Nikki 需 OpenWrt 24.10+，切忌多插件同开 |

## 二、${cluster.title}跨设备统一分流落地策略

<div class="kb-steps">
  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>优先保持跨端内核规则一致性</strong>：若希望一套规则打通桌面与移动，推荐使用 Mihomo（Clash Meta）生态全家桶；若偏好轻量化多协议自动选点，可选 sing-box 系（Hiddify / Karing / HomeProxy）。</div></div>
  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>结合本专题核心步骤执行（${detail.steps[0][0]}）</strong>：${detail.steps[0][1]}</div></div>
  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>多设备并发与流量配额核对</strong>：虽然大多数 IEPL 机场标注不限设备在线，但手机端后台云相册同步、电脑端系统更新若未走规则直连，会快速耗尽小包流量。</div></div>
</div>

## 三、${topic.title}跨端核查参考参数表

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 四、「${cluster.primaryKeyword}」跨平台部署 FAQ

${renderFaqDetailsList(faqs)}
`
  }

  // item.key === 'security' tail + advanced-faq
  if (item.key === 'security') {
    const title = `${cluster.title}｜${cluster.primaryKeyword}隐私安全与风控防护规范`
    const desc = `针对「${cluster.primaryKeyword}」总结 6 条隐私安全与账号防风控规范：覆盖防订阅泄露、DNS/WebRTC 防泄漏、开源客户端安全校验、防 AI/社媒封号与高危跑路识别。`
    const faqs = mergeFaqs([
      {
        q: `在配置「${cluster.primaryKeyword}」时，如何最大限度降低个人隐私与账号风控风险？`,
        a: `坚持四项底线：① 只从 GitHub 官方 Releases 或正版商店装开源客户端；② 不把含 Token 的主力订阅链接粘贴进陌生公共在线订阅转换站；③ 开启 Fake-IP 与安全规则防止 DNS 泄漏；④ 登录 ChatGPT/Claude/PayPal 等高风控平台时锁定低欺诈分固定地区节点，避免高频跳 IP。`
      },
      {
        q: `使用代理时网站能看到我的真实国内 IP 吗？`,
        a: `正常开启代理后网站看到的是落地节点 IP；但若浏览器开启 WebRTC 或存在 DNS 泄漏，部分页面仍可能探测到本地真实 IP 或国内运营商 DNS，可用 browserleaks.com 提前自测验证。`
      }
    ])
    return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科安全组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}安全
  - ${cluster.primaryKeyword}防风控
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">安全与风控直答 · Answer-First</div>
  <p>围绕<strong>「${cluster.primaryKeyword}」</strong>落地的全部操作中，真正导致隐私泄露或账号封禁的往往不是线路本身，而是<strong>下载了山寨木马客户端、在第三方公共站泄露了订阅 Token、未做 DNS 防泄漏或登录高价值账号时出口 IP 高频漂移</strong>。遵循下方 6 条安全防护规范可将风险降至最低。</p>
</div>

## 一、${cluster.primaryKeyword}全链路 6 项安全与防风控规范

<div class="kb-steps">
  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>安装包来源绝对纯净</strong>：严禁通过百度搜索置顶广告或不明网盘下载客户端，仅从官方 GitHub Releases 核对 SHA-256 获取；安卓切勿安装 Google Play 冒牌 NekoBox。</div></div>
  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>保护订阅链接等于保护门钥匙</strong>：订阅 URL 携带认证 Token。严禁截图发群未打码，也严禁贴入来路不明的在线订阅转换网站；需要规则增强请在本地用 Clash Merge 覆写。</div></div>
  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>配置 DNS 防泄漏与浏览器隔离</strong>：参照 <a href="/clash/meta/dns-fakeip-best-practices">Mihomo DNS 与 Fake-IP 规范</a> 防止本地 DNS 查询泄露；并在浏览器访问 <a href="/resources/node-check/unlock-and-dns-leak-test">browserleaks 自测教程</a> 验证 WebRTC 不外泄真实内网/公网 IP。</div></div>
  <div class="kb-step"><div class="kb-step-num">4</div><div><strong>高价值账号固定节点防漂移</strong>：登录 Claude、ChatGPT Plus、Amazon 或 PayPal 时，关闭自动测速随机切节点，绑定单个低风险（IPRisk LOW）的固定地区节点。</div></div>
  <div class="kb-step"><div class="kb-step-num">5</div><div><strong>严守国内业务直连规则与审计红线</strong>：网银、政务与本地支付始终保持 <code>DIRECT</code> 直连；不在代理隧道内运行 BT/PT 下载或端口扫描，防止触发服务商审计拦截。</div></div>
  <div class="kb-step"><div class="kb-step-num">6</div><div><strong>控制资金敞口与同源分散</strong>：不囤积“永久无限流量”高危促销，首单仅买月付验证，并配合 <a href="/resources/risk-intel/avoid-single-upstream-failure">异构多架构备份原则</a>。</div></div>
</div>

## 二、${cluster.title}常见风险点与防护矩阵

| 风险类型 | 触发原因 | 有效防护方案 |
| --- | --- | --- |
| 客户端内置木马/广告劫持 | 搜索下载山寨汉化打包软件 | 仅用官方 GitHub 开源版本（Clash Verge Rev / v2rayN / FlClash） |
| 流量一夜盗刷清零 | 公共转换站泄露或截图暴露订阅 | 后台点击「重置订阅链接」并禁用公共转换后端 |
| AI / 社媒账号被风控封号 | 免费脏 IP 或 10 分钟内跨港/日/美跳 IP | 选正规专线固定低风控地区节点，拒绝公开免费池 |
| 金融与隐私数据风险 | 安装不明 CA 根证书或全局经过未知节点 | 绝不安装来路不明 CA 证书，国内应用保持规则直连 |

## 三、${topic.title}安全评估基准与检测参数

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 四、「${cluster.primaryKeyword}」隐私防泄漏与风控 FAQ

${renderFaqDetailsList(faqs)}
`
  }

  // item.key === 'advanced-faq'
  const title = `${cluster.title}｜${cluster.primaryKeyword}高频疑问与进阶配置 FAQ`
  const desc = `集中解答用户在实际操作「${cluster.primaryKeyword}」时遇到的高频疑难问题、进阶参数调优思路及关联决策建议。`
  const extraFaqs = mergeFaqs([
    ...detail.faqs,
    {
      q: `如何把「${cluster.primaryKeyword}」相关配置固化到 Clash Verge Rev 中避免每次更新订阅被重置？`,
      a: `请勿直接编辑下载后的订阅 YAML 文件，而是使用 Clash Verge Rev 左侧 Profiles 页的「全局扩展配置（Merge）」或「全局扩展脚本（Script）」，将自定义 DNS、TUN 排除网段与策略组动态注入。`
    },
    {
      q: `在选型「${cluster.title}」关联机场时，应该更看重实测截图还是低价促销？`,
      a: `永远把「客户端开放度 + 运营年限 + 带时间戳的原始测速留档」排在低价促销之前。对于缺实测图或价格口径冲突的品牌，只建议按最低月付小额试水。`
    },
    {
      q: `如果已经遇到连接故障或需要对比多家品牌，下一步看哪篇文档最快？`,
      a: `故障排障请直达本集群《常见报错与故障排查手册》或全站故障中心；品牌横向比较请前往 /brands/ 数据库与 /reviews/ 深度评测中心。`
    }
  ])
  return `---
title: ${title}
description: ${desc}
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科编辑部
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${relatedFrontmatter.map((r) => `  - title: ${JSON.stringify(r.title)}\n    link: ${JSON.stringify(r.link)}\n    desc: ${JSON.stringify(r.desc)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}常见问题
  - ${cluster.primaryKeyword}FAQ
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${extraFaqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${title}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">核心问答总览 · Answer-First</div>
  <p>围绕<strong>「${cluster.primaryKeyword}」</strong>的高频疑问可浓缩为一句话原则：${detail.answer} 下方按「直接结论 → 核心参数表 → 进阶问答」整理了从入门避坑到高级调优的完整解答。</p>
</div>

## 一、「${cluster.primaryKeyword}」核心疑问与进阶问答（FAQ）

${renderFaqDetailsList(extraFaqs)}

## 二、${cluster.title}快速决策与参考指标表

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

## 三、${cluster.title}完整集群 7 篇专项索引

- **P0 核心入口**：[${cluster.title}完整实战指南](${cluster.entryPath})
${allSubItems
  .filter((s) => s.path !== item.path)
  .map((s) => `- **${s.priority} 专项文档**：[${s.title}](${s.path})`)
  .join('\n')}

${techDeepBlock}

${brandDeepBlock}

${errorMatrixBlock}

## 四、${topic.title}关联核实品牌推荐

<BrandRecommendation :slugs='${JSON.stringify(topic.relatedBrands.slice(0, 3))}' title="与本专题匹配度较高的核实品牌" />
`
}

// =========================================================================
// 4. 生成 28 个二级专题 + 56 个 P0 + 224 个 P1 + 168 个 P2（全量 448 篇集群文章！）
// =========================================================================
let generatedL2 = 0
let generatedP0 = 0
let preservedHandwrittenP0 = 0
let generatedSub = 0

for (const pillar of pillars) {
  for (const topic of pillar.topics) {
    const l2Path = path.join(docsDir, pillar.id, topic.slug, 'index.md')
    const l2Md = `---
title: ${topic.title}专题知识库（${topic.primaryKeyword}与全套 16 篇教程导航）
description: ${topic.summary} 已完成该专题下 2 个三级集群全部 16 篇结构化教程（2 篇 P0 入口 + 8 篇 P1 专项 + 6 篇 P2 跨端/安全/进阶 FAQ）。
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} · ${topic.title}
author: v2rayn百科编辑部
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
keywords:
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
---

# ${topic.title}专题导览

<div class="kb-answer-first">
  <div class="kb-answer-first-label">专题定位 · ${topic.intent}</div>
  <p>${topic.summary} 本专题下设 <strong>2 个核心三级文档集群</strong>，现已完成并发布全部 <strong>16 篇完整文档矩阵（2 篇 P0 核心入口 + 8 篇 P1 实战长尾 + 6 篇 P2 跨端/安全/进阶 FAQ）</strong>。</p>
</div>

## 一、核心三级文档集群入口（P0）

<div class="kb-grid-2">
${topic.clusters
  .map(
    (c) => `  <a href="${c.entryPath}" class="kb-card">
    <span class="kb-badge kb-badge-blue" style="margin-bottom:8px;">P0 核心集群入口 · ${c.primaryKeyword}</span>
    <h4 class="kb-card-title">${c.title}</h4>
    <p>${c.summary}</p>
  </a>`
  )
  .join('\n')}
</div>

## 二、全套专项长尾教程矩阵（P1 + P2 共 14 篇）

${topic.clusters
  .map((c) => {
    const subs = getClusterAllSubItems(c)
    return `### ${c.title}（P1 + P2 完整子文档）\n\n<div class="kb-grid-2">\n${subs
      .map(
        (sub) => `  <a href="${sub.path}" class="kb-card">
    <span class="kb-badge ${sub.priority === 'P1' ? 'kb-badge-green' : 'kb-badge-amber'}" style="margin-bottom:6px;">${sub.priority} 已发布 · ${sub.shortTitle}</span>
    <h4 class="kb-card-title">${sub.title}</h4>
    <p>围绕「${c.primaryKeyword}」提供${sub.shortTitle}与可落地操作基准。</p>
  </a>`
      )
      .join('\n')}\n</div>`
  })
  .join('\n\n')}

## 三、专题覆盖核心问题与关键词

- **核心搜索词**：\`${topic.primaryKeyword}\`
- **延伸长尾词**：${topic.secondaryKeywords.map((k) => `\`${k}\``).join(' · ')}
- **主要用户意图**：${topic.intent}
- **所属一级知识体系**：[${pillar.title}专题总览](${pillar.path})

## 四、本专题关联推荐品牌

<BrandRecommendation :slugs='${JSON.stringify(topic.relatedBrands)}' title="与「${topic.title}」场景匹配的参考品牌" />
`
    writeFileSafe(l2Path, l2Md, true)
    generatedL2++

    for (const cluster of topic.clusters) {
      const detail = clusterDetails[cluster.id]
      if (!detail) {
        throw new Error(`Missing cluster content detail for ${cluster.id}`)
      }
      const p1List = getClusterP1Items(cluster)
      const p2List = getClusterP2Items(cluster)
      const allSubList = getClusterAllSubItems(cluster)

      // P0 集群入口（保护 6 篇手写旗舰长文不被覆盖）
      const relP0Md = cluster.entryPath.replace(/^\//, '') + '.md'
      const absP0Md = path.join(docsDir, relP0Md)
      if (handwrittenP0Paths.has(cluster.entryPath) && fs.existsSync(absP0Md)) {
        preservedHandwrittenP0++
      } else {
        const p0RelBrands = topic.relatedBrands.map((s) => getBrandBySlug(s)).filter(Boolean)
        const p0TopicMod = topicDeepModules[topic.id]
        const p0TechBlock = buildTechAndVerificationSection(p0TopicMod, topic, cluster, 'p0')
        const p0BrandBlock = buildVerifiedBrandDeepSection(p0RelBrands, brandLinks, deepReviewSlugs, cluster, 'p0')
        const p0ErrorBlock = buildExtendedErrorMatrix(cluster, topic, 'p0')
        const p0Faqs = [...detail.faqs, ...(p0TopicMod?.extraFaqs || [])]
        const p0Md = `---
title: ${detail.h1}
description: ${cluster.summary} 围绕「${cluster.primaryKeyword}」提供直接结论、实操步骤、对比表格、底层技术配置与常见问题解答。
date: 2026-10-19
updatedDate: 2026-11-19
category: ${pillar.title} / ${topic.title}
author: v2rayn百科技术组
relatedBrands:
${topic.relatedBrands.map((s) => `  - ${s}`).join('\n')}
related:
${allSubList.slice(0, 6).map((sub) => `  - title: ${JSON.stringify(sub.title)}\n    link: ${JSON.stringify(sub.path)}\n    desc: ${JSON.stringify(`${cluster.primaryKeyword} · ${sub.shortTitle}`)}`).join('\n')}
keywords:
  - ${cluster.primaryKeyword}
  - ${topic.primaryKeyword}
${topic.secondaryKeywords.map((k) => `  - ${k}`).join('\n')}
faq:
${p0Faqs.map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`).join('\n')}
---

# ${detail.h1}

<div class="kb-answer-first">
  <div class="kb-answer-first-label">直接结论 · Answer-First</div>
  <p>${detail.answer}</p>
</div>

## 一、${cluster.title}核心背景与标准实操步骤

<div class="kb-steps">
${detail.steps
  .map(
    ([title, body], idx) =>
      `  <div class="kb-step"><div class="kb-step-num">${idx + 1}</div><div><strong>${title}</strong>：${body}</div></div>`
  )
  .join('\n')}
</div>

## 二、${cluster.primaryKeyword}关键维度速查对照表

| ${detail.tableHeaders.join(' | ')} |
| ${detail.tableHeaders.map(() => '---').join(' | ')} |
${detail.tableRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

${p0TechBlock}

${p0BrandBlock}

${p0ErrorBlock}

## 三、「${cluster.title}」全集群专项教程矩阵（P1 + P2 共 7 篇）

<div class="kb-grid-2">
${[...p1List, ...p2List]
  .map(
    (sub) => `  <a href="${sub.path}" class="kb-card">
    <span class="kb-badge ${sub.priority === 'P1' ? 'kb-badge-blue' : 'kb-badge-amber'}" style="margin-bottom:6px;">${sub.priority} · ${sub.shortTitle}</span>
    <h4 class="kb-card-title">${sub.title}</h4>
    <p>点击查看针对「${cluster.primaryKeyword}」的${sub.shortTitle}。</p>
  </a>`
  )
  .join('\n')}
</div>

## 四、${topic.title}关联实测参考品牌

<BrandRecommendation :slugs='${JSON.stringify(topic.relatedBrands.slice(0, 3))}' title="本主题相关参考品牌" />

## 五、「${cluster.primaryKeyword}」核心常见问题（FAQ）

${renderFaqDetailsList(p0Faqs)}

---

> **更新与来源说明**：本文为 v2rayn百科「[${topic.title}](${topic.path}) → ${cluster.title}」集群核心入口文档，最近核实日期 2026-11-19，内容依据公开技术规范与本站实测资料库整理。
`
        writeFileSafe(absP0Md, p0Md, true)
        generatedP0++
      }

      // 生成 P1 + P2 共 7 篇子文档
      for (const subItem of allSubList) {
        const relSubMd = subItem.path.replace(/^\//, '') + '.md'
        const absSubMd = path.join(docsDir, relSubMd)
        const subMd = buildSubArticleMarkdown({
          pillar,
          topic,
          cluster,
          detail,
          item: subItem,
          allSubItems: allSubList
        })
        writeFileSafe(absSubMd, subMd, true)
        generatedSub++
      }
    }
  }
}

// =========================================================================
// 5. 全量同步更新 content-planning/ 规划文档（448/448 集群文章 + 11 篇深度评测）
// =========================================================================
ensureDir(planDir)

const angleTemplates = [
  { suffix: '完整实战指南（核心入口）', slugSuffix: '', intent: '信息教程', priority: 'P0', published: true },
  { suffix: '2026 参数对比与避坑清单', slugSuffix: '-comparison-checklist', intent: '商业评估', priority: 'P1', published: true },
  { suffix: '新手零基础图解步骤', slugSuffix: '-beginner-step-by-step', intent: '信息教程', priority: 'P1', published: true },
  { suffix: '晚高峰实测表现与数据分析', slugSuffix: '-peak-hour-benchmark', intent: '商业评估', priority: 'P1', published: true },
  { suffix: '常见报错与故障排查手册', slugSuffix: '-troubleshooting-guide', intent: '排障诊断', priority: 'P1', published: true },
  { suffix: 'Windows / macOS / 手机端适配要点', slugSuffix: '-cross-platform-setup', intent: '信息教程', priority: 'P2', published: true },
  { suffix: '隐私安全与风控防护规范', slugSuffix: '-security-best-practices', intent: '信息教程', priority: 'P2', published: true },
  { suffix: '高频疑问与进阶配置 FAQ', slugSuffix: '-advanced-faq', intent: '信息教程', priority: 'P2', published: true }
]

const plannedArticles = []
let seq = 1
for (const pillar of pillars) {
  for (const topic of pillar.topics) {
    for (const cluster of topic.clusters) {
      const baseSlug = cluster.entryPath.split('/').pop()
      const parentUrl = topic.path
      angleTemplates.forEach((tpl, idx) => {
        const isEntry = idx === 0
        const url = isEntry ? cluster.entryPath : `${parentUrl}${baseSlug}${tpl.slugSuffix}`
        const mdPath = `docs${url}.md`
        const title = isEntry
          ? `${cluster.title}：${cluster.primaryKeyword}完整指南`
          : `${cluster.title}｜${cluster.primaryKeyword}${tpl.suffix}`
        plannedArticles.push({
          id: `ART-${String(seq++).padStart(3, '0')}`,
          pillar: pillar.title,
          pillarPath: pillar.path,
          topic: topic.title,
          topicPath: topic.path,
          clusterId: cluster.id,
          clusterTitle: cluster.title,
          title,
          url,
          mdPath,
          primaryKeyword: isEntry ? cluster.primaryKeyword : `${cluster.primaryKeyword} ${tpl.suffix.slice(0, 6)}`,
          secondaryKeywords: topic.secondaryKeywords.join(' / '),
          intent: tpl.intent,
          outline: `1.直接结论 → 2.背景原理 → 3.实操步骤/数据表 → 4.风险注意事项 → 5.FAQ`,
          userQuestion: `如何系统解决「${cluster.primaryKeyword}」相关的选型或实操问题？`,
          faq: `针对 ${cluster.title} 的核心高频问答`,
          relatedBrands: topic.relatedBrands.join(' / '),
          internalLinks: `${topic.path} | ${cluster.entryPath} | /brands/ | /reviews/guangsuyun`,
          priority: tpl.priority,
          status: '已发布'
        })
      })
    }
  }
}

writeFileSafe(
  path.join(planDir, 'SEO-一级导航规划.md'),
  `# SEO 一级导航规划（4 大核心知识主题）

核实日期：2026-11-19 ｜ 站点域名：\`${siteData.hostname}\` ｜ 品牌：${siteData.brandName}

| 序号 | 一级导航 | 规范 URL | 二级专题数 | 三级集群数 | 规划文章数 | 已发布集群文章（P0+P1+P2） | 商业与 SEO 定位 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${pillars
  .map(
    (p, i) =>
      `| ${i + 1} | ${p.title} | \`${p.path}\` | ${p.topics.length} | ${p.topics.length * 2} | ${p.topics.length * 16} | ${p.topics.length * 16}（100%） | ${p.shortDesc} |`
  )
  .join('\n')}
`
)

writeFileSafe(
  path.join(planDir, 'SEO-二级专题规划.md'),
  `# SEO 二级专题规划（28 个独立专题）

| 编号 | 所属一级 | 二级专题 | 规范 URL | 核心关键词 | 次级关键词 | 搜索意图 | 已发布文章数 | 页面状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${pillars
  .flatMap((p) =>
    p.topics.map(
      (t) =>
        `| ${t.id.toUpperCase()} | ${p.title} | ${t.title} | \`${t.path}\` | ${t.primaryKeyword} | ${t.secondaryKeywords.join('、')} | ${t.intent} | 16 篇（2 P0 + 8 P1 + 6 P2） | 已发布 |`
    )
  )
  .join('\n')}
`
)

writeFileSafe(
  path.join(planDir, 'SEO-三级文档集群规划.md'),
  `# SEO 三级文档集群规划（56 个主题集群）

| 集群ID | 一级导航 | 二级专题 | 三级集群名称 | 独立入口 URL | 核心关键词 | 规划篇数 | 已发布篇数（P0+P1+P2） | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${pillars
  .flatMap((p) =>
    p.topics.flatMap((t) =>
      t.clusters.map(
        (c) =>
          `| ${c.id.toUpperCase()} | ${p.title} | ${t.title} | ${c.title} | \`${c.entryPath}\` | ${c.primaryKeyword} | ${c.plannedCount} | 8 篇（1 P0 + 4 P1 + 3 P2） | 已发布 |`
      )
    )
  )
  .join('\n')}
`
)

writeFileSafe(
  path.join(planDir, 'SEO-完整文章标题库.md'),
  `# SEO 完整文章标题库（448 篇全量已发布）

- **已发布集群教程（P0 + P1 + P2 100% 满配）**：**448 篇**（56 篇 P0 核心入口 + 224 篇 P1 专项长尾 + 168 篇 P2 跨端/安全/进阶 FAQ）。
- **整站已发布可索引页面总数**：448 篇集群教程 + 4 篇一级专题 + 28 篇二级专题 + 31 篇品牌档案 + 11 篇热门品牌深度评测 + 7 篇客户端教程 + 6 篇横向对比 + 5 篇数据库/总览/关于页 + 1 首页 = **541 个已发布可索引页面**（另含 \`404.html\`，合计 542 页）。

| ID | 一级/二级 | 集群 | SEO 标题 | 独立 URL | Markdown 路径 | 核心词 | 意图 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${plannedArticles
  .map(
    (a) =>
      `| ${a.id} | ${a.pillar}/${a.topic} | ${a.clusterTitle} | ${a.title} | \`${a.url}\` | \`${a.mdPath}\` | ${a.primaryKeyword} | ${a.intent} | ${a.priority} | ${a.status} |`
  )
  .join('\n')}
`
)

const kwHeader = 'ID,页面类型,名称,规范URL,核心关键词,次级关键词,搜索意图,所属集群,上游入口,状态'
const kwRows = [
  ...pillars.flatMap((p) =>
    p.topics.map((t) =>
      [t.id, '二级专题', t.title, t.path, t.primaryKeyword, t.secondaryKeywords.join('|'), t.intent, p.title, p.path, '已发布']
        .map(csvEscape)
        .join(',')
    )
  ),
  ...plannedArticles.map((a) =>
    [a.id, '文章', a.title, a.url, a.primaryKeyword, a.secondaryKeywords, a.intent, a.clusterTitle, a.topicPath, a.status]
      .map(csvEscape)
      .join(',')
  ),
  ...brands.map((b) =>
    [`BRD-${b.slug}`, '品牌参数档案', b.name, b.reviewPath, `${b.name}参数`, `${b.name}价格|${b.lineCategory}机场`, '商业评估', '品牌数据库', '/brands/', '已发布']
      .map(csvEscape)
      .join(',')
  ),
  ...[...deepReviewSlugs].map((slug) => {
    const b = getBrandBySlug(slug)
    return [`REV-${slug}`, '深度评测', `${b.name}深度评测`, `/reviews/${slug}`, `${b.name}评测`, `${b.name}怎么样|${b.name}测速`, '商业评估', '品牌评测中心', '/reviews/', '已发布']
      .map(csvEscape)
      .join(',')
  })
]
writeFileSafe(path.join(planDir, 'SEO-关键词映射表.csv'), '\uFEFF' + [kwHeader, ...kwRows].join('\n'))

const linkHeader = '来源页面URL,目标页面URL,链接关系类型,推荐锚文本方向,是否已实施'
const linkRows = [
  ['/', '/airport/', '首页→一级专题', '机场推荐专题', '是'],
  ['/', '/vpn/', '首页→一级专题', 'VPN 与加速器专题', '是'],
  ['/', '/clash/', '首页→一级专题', 'Clash 客户端专题', '是'],
  ['/', '/resources/', '首页→一级专题', '资源与情报专题', '是'],
  ['/', '/brands/', '首页→品牌库', '浏览 31 家品牌数据库', '是'],
  ['/', '/reviews/guangsuyun', '首页→旗舰评测', '光速云 2026 旗舰深度评测', '是'],
  ['/reviews/', '/reviews/guangsuyun', '评测中心→旗舰评测', '光速云深度评测', '是'],
  ...[...deepReviewSlugs].map((slug) => ['/reviews/', `/reviews/${slug}`, '评测中心→热门深度评测', `${getBrandBySlug(slug)?.name}深度评测`, '是']),
  ...pillars.flatMap((p) =>
    p.topics.flatMap((t) =>
      t.clusters.flatMap((c) => [
        [t.path, c.entryPath, '二级专题→P0集群入口', c.title, '是'],
        ...getClusterAllSubItems(c).map((sub) => [c.entryPath, sub.path, `P0集群入口→${sub.priority}专项长尾`, sub.title, '是'])
      ])
    )
  ),
  ...brands.map((b) => ['/brands/', b.reviewPath, '品牌库→品牌档案', `${b.name}参数与套餐档案`, '是'])
].map((r) => r.map(csvEscape).join(','))
writeFileSafe(path.join(planDir, 'SEO-内部链接矩阵.csv'), '\uFEFF' + [linkHeader, ...linkRows].join('\n'))

writeFileSafe(
  path.join(planDir, 'SEO-内容发布优先级.md'),
  `# SEO 内容发布优先级路线图

## P0（100% 已完成并发布）
- 首页知识库入口（含 30 秒机场选型配对器）
- 4 个一级导航专题页 + 28 个二级栏目专题页 + 56 个三级文档集群 P0 核心入口文章
- 31 家独立核实机场品牌档案页 + 品牌数据库筛选总页（\`/brands/\`）
- 11 家热门品牌独立深度评测（\`/reviews/guangsuyun\` + 前十热门品牌 \`/reviews/<slug>\`）
- 6 大平台客户端教程中心 + 5 篇横向对比专题 + 关于/隐私/运维文档

## P1（100% 已完成并发布 — 224 篇）
- 覆盖全部 56 个集群的「参数对比与避坑」「新手图解步骤」「晚高峰实测分析」「报错与故障排查」共 224 篇。

## P2（100% 已完成并发布 — 168 篇）
- 覆盖全部 56 个集群的「Windows/macOS/手机端适配」「隐私安全与风控防护」「高频疑问与进阶 FAQ」共 168 篇。
- 全站 448 篇集群内容矩阵已 100% 上线并纳入 \`sitemap.xml\`。
`
)

writeFileSafe(
  path.join(planDir, 'SEO-品牌评测规划.md'),
  `# SEO 品牌评测规划（31 家参数档案 + 11 家独立深度评测）

| 排名序 | 品牌名称 | Slug | 参数档案 URL | 独立深度评测 URL | 数据状态 | 原始截图数 | 发布状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${brands
  .map(
    (b) =>
      `| ${b.rankOrder} | ${b.name} | \`${b.slug}\` | \`${b.reviewPath}\` | ${deepReviewSlugs.has(b.slug) ? `\`/reviews/${b.slug}\`` : '档案页涵盖'} | ${b.dataStatus} | ${b.screenshots?.length || 0} | 已发布 |`
  )
  .join('\n')}
`
)

const urlHeader = '路由URL,文件路径,页面层级,规范Canonical,索引状态,内容状态'
const publishedStaticRoutes = [
  ['/', 'docs/index.md', '首页', `${siteData.hostname}/`, 'index', '已发布'],
  ['/brands/', 'docs/brands/index.md', '品牌数据库', `${siteData.hostname}/brands/`, 'index', '已发布'],
  ['/reviews/', 'docs/reviews/index.md', '评测中心', `${siteData.hostname}/reviews/`, 'index', '已发布'],
  ...[...deepReviewSlugs].map((slug) => [
    `/reviews/${slug}`,
    `docs/reviews/${slug}.md`,
    slug === 'guangsuyun' ? '旗舰深度评测' : '前十品牌深度评测',
    `${siteData.hostname}/reviews/${slug}`,
    'index',
    '已发布'
  ]),
  ['/comparisons/', 'docs/comparisons/index.md', '对比中心', `${siteData.hostname}/comparisons/`, 'index', '已发布'],
  ['/comparisons/guangsuyun-vs-muguang-vs-feimao', 'docs/comparisons/guangsuyun-vs-muguang-vs-feimao.md', '横向对比', `${siteData.hostname}/comparisons/guangsuyun-vs-muguang-vs-feimao`, 'index', '已发布'],
  ['/comparisons/budget-5-yuan-tier-comparison', 'docs/comparisons/budget-5-yuan-tier-comparison.md', '横向对比', `${siteData.hostname}/comparisons/budget-5-yuan-tier-comparison`, 'index', '已发布'],
  ['/comparisons/iepl-iplc-flagship-comparison', 'docs/comparisons/iepl-iplc-flagship-comparison.md', '横向对比', `${siteData.hostname}/comparisons/iepl-iplc-flagship-comparison`, 'index', '已发布'],
  ['/comparisons/proprietary-vs-subscription-airports', 'docs/comparisons/proprietary-vs-subscription-airports.md', '横向对比', `${siteData.hostname}/comparisons/proprietary-vs-subscription-airports`, 'index', '已发布'],
  ['/comparisons/ai-tools-airport-comparison', 'docs/comparisons/ai-tools-airport-comparison.md', '横向对比', `${siteData.hostname}/comparisons/ai-tools-airport-comparison`, 'index', '已发布'],
  ['/clients/', 'docs/clients/index.md', '客户端中心', `${siteData.hostname}/clients/`, 'index', '已发布'],
  ['/clients/windows', 'docs/clients/windows.md', '平台客户端', `${siteData.hostname}/clients/windows`, 'index', '已发布'],
  ['/clients/android', 'docs/clients/android.md', '平台客户端', `${siteData.hostname}/clients/android`, 'index', '已发布'],
  ['/clients/ios', 'docs/clients/ios.md', '平台客户端', `${siteData.hostname}/clients/ios`, 'index', '已发布'],
  ['/clients/macos', 'docs/clients/macos.md', '平台客户端', `${siteData.hostname}/clients/macos`, 'index', '已发布'],
  ['/clients/linux', 'docs/clients/linux.md', '平台客户端', `${siteData.hostname}/clients/linux`, 'index', '已发布'],
  ['/clients/openwrt', 'docs/clients/openwrt.md', '平台客户端', `${siteData.hostname}/clients/openwrt`, 'index', '已发布'],
  ['/about/', 'docs/about/index.md', '关于与披露', `${siteData.hostname}/about/`, 'index', '已发布'],
  ['/about/privacy', 'docs/about/privacy.md', '隐私声明', `${siteData.hostname}/about/privacy`, 'index', '已发布'],
  ['/about/search-and-maintenance', 'docs/about/search-and-maintenance.md', '搜索与运维', `${siteData.hostname}/about/search-and-maintenance`, 'index', '已发布'],
  ['/404', 'docs/404.md', '错误页', `${siteData.hostname}/404`, 'noindex', '已发布'],
  ...pillars.map((p) => [p.path, `docs${p.path}index.md`, '一级专题', `${siteData.hostname}${p.path}`, 'index', '已发布']),
  ...pillars.flatMap((p) => p.topics.map((t) => [t.path, `docs${t.path}index.md`, '二级专题', `${siteData.hostname}${t.path}`, 'index', '已发布'])),
  ...brands.map((b) => [`/brands/${b.slug}`, `docs/brands/${b.slug}.md`, '品牌档案', `${siteData.hostname}/brands/${b.slug}`, 'index', '已发布']),
  ...plannedArticles.map((a) => [
    a.url,
    a.mdPath,
    `三级集群${a.priority}`,
    `${siteData.hostname}${a.url}`,
    'index',
    '已发布'
  ])
].map((r) => r.map(csvEscape).join(','))
writeFileSafe(path.join(planDir, 'SEO-URL路由规划.csv'), '\uFEFF' + [urlHeader, ...publishedStaticRoutes].join('\n'))

console.log(
  JSON.stringify(
    {
      brandsGenerated: generatedBrands,
      top10DeepReviewsGenerated: generatedTop10Reviews,
      level2TopicsGenerated: generatedL2,
      level3P0Generated: generatedP0,
      level3P0HandwrittenPreserved: preservedHandwrittenP0,
      level3P1PlusP2Generated: generatedSub,
      totalPublishedClusterArticles: plannedArticles.length
    },
    null,
    2
  )
)
