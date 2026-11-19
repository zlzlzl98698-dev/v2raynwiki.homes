export interface SiteConfigData {
  domain: string
  hostname: string
  brandName: string
  brandEn: string
  tagline: string
  description: string
  language: string
  locale: string
  email: string
  lastVerifiedDate: string
  disclosureShort: string
  disclosureFull: string
  algolia: {
    appId: string
    apiKey: string
    indexName: string
    enabled: boolean
  }
}

const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env) || {}
const procEnv = (typeof process !== 'undefined' && process.env) || {}

const algoliaAppId = metaEnv.VITE_ALGOLIA_APP_ID || procEnv.VITE_ALGOLIA_APP_ID || ''
const algoliaApiKey = metaEnv.VITE_ALGOLIA_API_KEY || procEnv.VITE_ALGOLIA_API_KEY || ''
const algoliaIndexName =
  metaEnv.VITE_ALGOLIA_INDEX_NAME || procEnv.VITE_ALGOLIA_INDEX_NAME || 'v2raynwiki_homes'

export const siteData: SiteConfigData = {
  domain: 'v2raynwiki.homes',
  hostname: 'https://v2raynwiki.homes',
  brandName: 'v2rayn百科',
  brandEn: 'v2raynWiki',
  tagline: '中文网络工具专业知识库与机场品牌评测数据库',
  description:
    '面向中文用户的专业网络代理技术教程与机场评测知识库，涵盖 Clash Verge Rev、v2rayN、Shadowrocket 客户端指南、31 家机场品牌参数与实测档案、套餐价格分析及订阅故障排查。',
  language: 'zh-CN',
  locale: 'zh_CN',
  email: 'editorial@v2raynwiki.homes',
  lastVerifiedDate: '2026-11-19',
  disclosureShort: '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
  disclosureFull:
    '商业推广披露：本站部分机场品牌注册入口为联盟推广链接（均已标注 rel="nofollow sponsored noopener"）。通过推广链接注册不会增加您的支付成本，佣金用于维持测试线路与内容更新。商业合作优先级（例如光速云的重点专题建设）不会改写原始测速截图、数据核实状态或独立风险提示。',
  algolia: {
    appId: algoliaAppId,
    apiKey: algoliaApiKey,
    indexName: algoliaIndexName,
    enabled: Boolean(algoliaAppId && algoliaApiKey)
  }
}
