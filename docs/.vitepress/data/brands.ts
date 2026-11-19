export type DataStatus = 'measured' | 'vendor' | 'historical' | 'partial'
export type UnlockState = 'operational' | 'partial' | 'unavailable' | 'not-tested' | 'vendor-claimed'

export interface BrandPlan {
  name: string
  billingCycle: '月付' | '季付' | '半年付' | '年付' | '一次性付费'
  priceCny: number
  monthlyEquivCny?: number
  traffic: string
  trafficCycle: string
  recommended?: boolean
  note?: string
}

export interface SpeedMetric {
  region: string
  latencyMs: number
  downloadMbps: number
  uploadMbps?: number
  lossRate?: string
}

export interface UnlockEntry {
  service: string
  category: 'AI' | 'Streaming'
  status: UnlockState
  note: string
}

export interface SpeedScreenshotEvidence {
  image: string
  testedAt: string
  protocolDisplayed: string
  toolFamily: string
  caption: string
  dateConfidence?: string
}

export interface BrandRecord {
  slug: string
  name: string
  enName: string
  aliases?: string[]
  rankOrder: number
  isPriorityPartner?: boolean
  accentColor: string
  foundedYear: string
  tagline: string
  summary: string
  lineType: string
  lineCategory: 'IEPL' | 'IPLC' | 'BGP中转' | '混合专线'
  protocols: string[]
  clientMode: '自研+第三方订阅' | '仅专属客户端' | '第三方订阅为主' | '待核实'
  supportedClients: string[]
  regions: string[]
  entryPriceCny: number
  entryPriceLabel: string
  entryBillingNote: string
  entryTrafficGb: number
  paymentMethods: string[]
  features: string[]
  plans: BrandPlan[]
  speedDataDate?: string
  speedDataSource?: string
  speedMetrics?: SpeedMetric[]
  screenshots?: SpeedScreenshotEvidence[]
  unlockDataSource: '实测记录' | '品牌资料与第三方记录' | '待核实'
  unlockMatrix: UnlockEntry[]
  suitableFor: string[]
  notSuitableFor: string[]
  risks: string[]
  auditNotes: string[]
  dataStatus: DataStatus
  dataSource: string
  verifiedDate: string
  updatedDate: string
  reviewPath: string
}

export const brands: BrandRecord[] = [
  {
    slug: 'guangsuyun',
    name: '光速云',
    enName: 'Guangsuyun',
    aliases: ['GSY', '光速云机场'],
    rankOrder: 1,
    isPriorityPartner: true,
    accentColor: '#38BDF8',
    foundedYear: '2020',
    tagline: '老牌 IEPL + 企业级内网双专线，自研客户端与第三方订阅双支持',
    summary:
      '光速云自 2020 年起运营，定位综合型 IEPL/IPLC 专线服务，同时提供自研客户端与 Clash、Shadowrocket 等第三方订阅导入。套餐跨度覆盖 99 元/年轻量版、147 元 247GB 永久不限时套餐、25–138 元常规月付及 680 元企业定制。2026-08-19 实测截图显示其在电信、移动、联通三网均具备较高吞吐能力，但 ChatGPT 与 Gemini 存在明显的地区节点分化，需按需选点。',
    lineType: 'IEPL 专线 + 企业级内网专线（部分档位标注全球 IPLC）',
    lineCategory: 'IEPL',
    protocols: ['VLESS', 'Shadowsocks（实测截图）', 'AnyTLS（电信专线截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研全平台客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['香港×20', '台湾×5', '日本×10', '新加坡×10', '美国×10', '马来西亚×2', '英国', '法国', '德国', '土耳其', '泰国', '巴西'],
    entryPriceCny: 8.25,
    entryPriceLabel: '¥99/年（折合约 ¥8.25/月）',
    entryBillingNote: '年付轻量版折算月成本，常规月付极速版为 ¥25/月',
    entryTrafficGb: 69,
    paymentMethods: ['支付宝', '微信', 'USDT'],
    features: [
      '2020 年起运营，产品线覆盖年付入门、一次性永久流量包、常规月付到企业定制',
      'IEPL 与企业内网双线路架构，全节点 1 倍率，单节点最高标称 2.5Gbps',
      '自研客户端与第三方通用订阅并行，兼容 Clash、Shadowrocket、v2rayN',
      '12+ 国家地区 60+ 节点覆盖，香港/日/新/美节点储备充足',
      '2026-08-19 三网 2Gbps 及珠海联通 9Gbps 实测截图可查，不限设备数'
    ],
    plans: [
      { name: '光速云·轻量版', billingCycle: '年付', priceCny: 99, monthlyEquivCny: 8.25, traffic: '69GB', trafficCycle: '每月重置', note: '不参与折扣，适合轻度查资料与办公' },
      { name: '致敬斯诺克147永久套餐', billingCycle: '一次性付费', priceCny: 147, traffic: '247GB', trafficCycle: '不过期', recommended: true, note: '不打折，适合备用线路与低频不固定用量' },
      { name: '光速云·极速版', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '168GB', trafficCycle: '每月重置', recommended: true, note: '全节点×1倍率，半年9折/年付8折/两年75折/三年7折' },
      { name: '光速云·流光版', billingCycle: '月付', priceCny: 34, monthlyEquivCny: 34, traffic: '268GB', trafficCycle: '每月重置', note: '适合日常视频与多设备同步' },
      { name: '光速云·量子版', billingCycle: '月付', priceCny: 68, monthlyEquivCny: 68, traffic: '568GB', trafficCycle: '每月重置', note: '重度 4K 流媒体与高频开发下载' },
      { name: '光速云·无界版', billingCycle: '月付', priceCny: 138, monthlyEquivCny: 138, traffic: '900GB', trafficCycle: '每月重置', note: '团队协作与大流量跨境场景' },
      { name: '光速云·定制套餐', billingCycle: '月付', priceCny: 680, monthlyEquivCny: 680, traffic: '500GB', trafficCycle: '每月重置', note: '独享原生 IP 与按需独立部署，客服一对一确认' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-19（多网实测）',
    speedDataSource: '原始品牌测速表（2026-10-19）+ MiaoKo 三网 2Gbps/9Gbps 实测截图（2026-08-19）+ MAI-TEST-BOT（2026-08-11）',
    speedMetrics: [
      { region: '香港', latencyMs: 22, downloadMbps: 529 },
      { region: '新加坡', latencyMs: 46, downloadMbps: 387 },
      { region: '日本', latencyMs: 57, downloadMbps: 135 },
      { region: '台湾', latencyMs: 41, downloadMbps: 114 },
      { region: '美国', latencyMs: 143, downloadMbps: 18 }
    ],
    screenshots: [
      {
        image: '/images/guangsuyun/guangsuyun-speed-unlock-telecom-2gbps.jpg',
        testedAt: '2026-08-19（长沙电信 2Gbps / MiaoKo）',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MiaoKo 4.3.3 / SC-2.3.1 (6线程)',
        caption: '长沙电信 2Gbps 62 节点测速与流媒体/AI解锁：日本09均速 49.38MB/s，香港专线均速 35–42MB/s，新加坡全组解锁 Gemini(SG)，香港 OpenAI 仅 APP 可用。'
      },
      {
        image: '/images/guangsuyun/guangsuyun-speed-unlock-mobile-2gbps.jpg',
        testedAt: '2026-08-19（广西移动 2Gbps / MiaoKo）',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MiaoKo 4.3.3 / SC-2.3.1 (6线程)',
        caption: '广西移动 2Gbps 62 节点实测：新加坡01均速 53.12MB/s，香港专线19均速 52.04MB/s（TLS RTT 23ms）。'
      },
      {
        image: '/images/guangsuyun/guangsuyun-speed-unlock-unicom-2gbps.jpg',
        testedAt: '2026-08-19（河北联通 2Gbps / MiaoKo）',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MiaoKo 4.3.3 / SC-2.3.1 (6线程)',
        caption: '河北联通 2Gbps 62 节点实测：新加坡01均速 41.85MB/s，台湾03均速 37.49MB/s，香港专线整体 22–36MB/s。'
      },
      {
        image: '/images/guangsuyun/guangsuyun-streaming-vless-unicom-9gbps.jpg',
        testedAt: '2026-08-19（珠海联通 9Gbps单线程 / MiaoKo）',
        protocolDisplayed: 'VLESS + AnyTLS',
        toolFamily: 'MiaoKo 4.3.3 / 喵速 4.7.0 (A14-1)',
        caption: '70 节点流媒体与 AI 解锁专项测试：日美港普遍解锁 Netflix/Disney+/OpenAI，新加坡与台湾部分节点出现 YouTube 送中(CN) 及 TikTok 失败项。'
      },
      {
        image: '/images/guangsuyun/guangsuyun-speed-vless-unicom-9gbps.jpg',
        testedAt: '2026-08-19（珠海联通 9Gbps单线程 / MiaoKo）',
        protocolDisplayed: 'VLESS',
        toolFamily: 'MiaoKo 4.3.3 / 喵速 4.7.0 (A14-1)',
        caption: '70 节点 VLESS 单线程极限吞吐测试：香港多节点均速 380–424MB/s，新加坡 260–315MB/s，美国08达 370.94MB/s（美国02单节点异常 1.60KB/s 如实保留）。'
      },
      {
        image: '/images/speedtest/guangsuyun-2026-08-11.png',
        testedAt: '2026-08-11 14:32:56 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '2026-08-11 统一批次节点测速留档截图。'
      }
    ],
    unlockDataSource: '实测记录',
    unlockMatrix: [
      { service: 'ChatGPT / OpenAI', category: 'AI', status: 'partial', note: '日/新/美/台多数节点解锁；香港节点实测仅 APP 可用，需手动切换非港节点' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '新加坡、马来西亚、土耳其节点实测解锁；香港、日本、美国节点多显示失败' },
      { service: 'Claude', category: 'AI', status: 'vendor-claimed', note: '品牌与整理资料标注支持，8 月截图未单列 Claude 测试项' },
      { service: 'Netflix', category: 'Streaming', status: 'operational', note: '港/台/日/新/美等主力节点均实测解锁对应区域片库' },
      { service: 'Disney+', category: 'Streaming', status: 'operational', note: '港/日/新/美实测解锁，台湾节点在 8 月实测中显示失败' },
      { service: 'YouTube', category: 'Streaming', status: 'partial', note: '港/日/美稳定解锁；9Gbps 批次中部分新/台节点出现送中(CN)标记' },
      { service: 'TikTok', category: 'Streaming', status: 'partial', note: '部分美/新/港节点解锁，不同批次存在节点级失败项' },
      { service: 'Spotify / HBO Max', category: 'Streaming', status: 'vendor-claimed', note: '品牌资料与清单标注支持，以实际落地区域为准' }
    ],
    suitableFor: [
      '希望同时兼容自研客户端与 Clash Verge Rev / Shadowrocket 订阅的用户',
      '需要 99 元低门槛年付或 147 元永久不限时备用流量包的用户',
      '对香港、新加坡、日本三网速度和延迟有一定要求的日常办公与流媒体用户'
    ],
    notSuitableFor: [
      '要求全节点无脑直连 Gemini 或 ChatGPT 网页版且不愿切换地区的用户',
      '期望极低价且支持无条件退款的用户（特殊套餐不支持退款）'
    ],
    risks: [
      '特殊商品与年付/永久套餐不支持退款，建议先购入极速版月付实测晚高峰',
      '不同协议批次（Shadowsocks vs VLESS）实测表现存在差异，且美国个别节点出现低速异常',
      '历史文案中曾出现轻量版 59GB 与 69GB 的流量表述差异，下单前以官网结算页为准'
    ],
    auditNotes: [
      '已核对《光速云品牌信息.txt》与《32家机场品牌清单.txt》差异：前者列 4 档套餐且顶部注 59GB、正文注 69GB；后者补全流光/量子/无界共 7 档套餐，本站以较完整的 7 档并标注核对提示。',
      '光速云为本站商业重点合作品牌，优先建设专题与深度评测，但所有测速截图、异常节点与 Gemini 区域限制均如实披露。'
    ],
    dataStatus: 'measured',
    dataSource: '品牌清单 + 光速云品牌信息 + 2026-08-11/08-19 实测截图',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/reviews/guangsuyun'
  },
  {
    slug: 'muguang',
    name: '暮光加速',
    enName: 'Twilight / Muguang',
    rankOrder: 2,
    accentColor: '#818CF8',
    foundedYear: '2023',
    tagline: 'BGP 智能调度与专线级出口，主打多设备全平台与团队大流量',
    summary:
      '暮光加速成立于 2023 年，面向个人多设备及小型跨境协作团队，提供 109 元/年轻量档、20–180 元月付常规档、三档不限时流量包以及 600 元独享定制节点。',
    lineType: 'BGP 智能调度 + 专线级出口',
    lineCategory: '混合专线',
    protocols: ['多协议兼容（待官网核实具体协议列表）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Windows', 'macOS', 'iOS', 'Android', 'Linux 全平台兼容'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国等热门地区'],
    entryPriceCny: 9.08,
    entryPriceLabel: '¥109/年（折合约 ¥9.08/月）',
    entryBillingNote: '月付基础版 ¥20/月 120GB',
    entryTrafficGb: 70,
    paymentMethods: ['以官网结算页为准'],
    features: [
      'BGP 智能调度搭配专线级出口，定位稳定低延迟',
      '覆盖五大操作系统，支持多设备同时在线',
      '月付最高提供 1500GB 档位，另含三档不限时一次性包',
      '品牌资料宣称提供 7×24 小时真人客服'
    ],
    plans: [
      { name: '暮光·年付轻量版', billingCycle: '年付', priceCny: 109, monthlyEquivCny: 9.08, traffic: '70GB', trafficCycle: '每月重置' },
      { name: '暮光·基础版', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '120GB', trafficCycle: '每月重置', recommended: true },
      { name: '暮光·标准版', billingCycle: '月付', priceCny: 40, monthlyEquivCny: 40, traffic: '240GB', trafficCycle: '每月重置' },
      { name: '暮光·旗舰版', billingCycle: '月付', priceCny: 100, monthlyEquivCny: 100, traffic: '700GB', trafficCycle: '每月重置' },
      { name: '暮光·至尊版', billingCycle: '月付', priceCny: 180, monthlyEquivCny: 180, traffic: '1500GB', trafficCycle: '每月重置' },
      { name: '暮光·不限时轻量包', billingCycle: '一次性付费', priceCny: 219, traffic: '150GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰）',
    speedDataSource: '32家机场品牌清单测速记录（2026-10-19）',
    speedMetrics: [
      { region: '香港', latencyMs: 26, downloadMbps: 509 },
      { region: '新加坡', latencyMs: 43, downloadMbps: 419 },
      { region: '日本', latencyMs: 53, downloadMbps: 150 },
      { region: '台湾', latencyMs: 40, downloadMbps: 107 },
      { region: '美国', latencyMs: 160, downloadMbps: 19 }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视具体落地节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '资料标注主流流媒体全支持' }
    ],
    suitableFor: ['多终端同时在线的个人或小团队', '需要 700GB–1500GB 大流量月付档位的重度用户'],
    notSuitableFor: ['预算低于 10 元/月且偏好按月付费的用户'],
    risks: ['资料中对优惠码存在前后描述差异（头部注 muguang5555，正文注未查到公开活动），下单前需实测核对', '暂无 2026-08-11 批次原始测速截图'],
    auditNotes: ['基础数据与介绍段优惠码字段存在冲突，已标注待核实。'],
    dataStatus: 'vendor',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/muguang'
  },
  {
    slug: 'feimao',
    name: '飞猫云',
    enName: 'FlyCat / Feimao',
    rankOrder: 3,
    accentColor: '#F59E0B',
    foundedYear: '2023',
    tagline: '专属客户端登录即用，免导入订阅的新手友好型线路',
    summary:
      '飞猫云主打降低新手配置门槛，采用专属客户端下载登录即用模式，无需手动配置 Clash 订阅规则。学生版年付 84 元（折合 7 元/月 50GB），常规月付 25 元 150GB 起。',
    lineType: '亚太欧美优化专线',
    lineCategory: '混合专线',
    protocols: ['Shadowsocks（2026-08-11 实测截图）'],
    clientMode: '仅专属客户端',
    supportedClients: ['飞猫云专属客户端（下载登录即用）'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国及欧美地区'],
    entryPriceCny: 7,
    entryPriceLabel: '¥84/年（折合 ¥7/月）',
    entryBillingNote: '学生版年付折算价，常规月付星耀版 ¥25/月',
    entryTrafficGb: 50,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '专属客户端登录即用，免去订阅链接转换与规则调试步骤',
      '学生版年付 ¥84（50GB/月），入门门槛较低',
      '覆盖亚太与欧美常见地区，含 1000GB 一次性不限时大包'
    ],
    plans: [
      { name: '飞猫·学生版', billingCycle: '年付', priceCny: 84, monthlyEquivCny: 7, traffic: '50GB', trafficCycle: '每月重置', recommended: true },
      { name: '飞猫·星耀版', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置' },
      { name: '飞猫·星环版', billingCycle: '月付', priceCny: 45, monthlyEquivCny: 45, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '飞猫·银河版', billingCycle: '月付', priceCny: 85, monthlyEquivCny: 85, traffic: '600GB', trafficCycle: '每月重置' },
      { name: '飞猫·宇宙版', billingCycle: '月付', priceCny: 150, monthlyEquivCny: 150, traffic: '1000GB', trafficCycle: '每月重置' },
      { name: '飞猫·不限时套餐', billingCycle: '一次性付费', priceCny: 680, traffic: '1000GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11（实测截图）',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11 留档截图',
    speedMetrics: [
      { region: '香港', latencyMs: 21, downloadMbps: 526 },
      { region: '新加坡', latencyMs: 45, downloadMbps: 413 },
      { region: '日本', latencyMs: 54, downloadMbps: 138 },
      { region: '台湾', latencyMs: 41, downloadMbps: 116 },
      { region: '美国', latencyMs: 178, downloadMbps: 14 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/feimao-2026-08-11.png',
        testedAt: '2026-08-11 08:52:30 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '飞猫云 2026-08-11 早间单批次节点测速截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持' }
    ],
    suitableFor: ['初次接触代理工具、不想配置 Clash/小火箭的新手用户', '需要低价学生年付方案的轻度用户'],
    notSuitableFor: ['需要在软路由 OpenClash、Surge 或自定义 Clash 规则中使用的进阶玩家'],
    risks: ['专属客户端模式无法导出给第三方客户端或软路由使用', '8 月测速截图时间为早上 08:52，不能直接等同晚高峰表现'],
    auditNotes: ['核对 2026-08-11 截图显示 Shadowsocks 协议，已如实标注测试时间戳。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/feimao'
  },
  {
    slug: 'weifeng',
    name: '微风网络',
    enName: 'BreezeNet / Weifeng',
    rankOrder: 4,
    accentColor: '#10B981',
    foundedYear: '2023',
    tagline: 'IEPL 专线 + VLESS 协议，客服响应与入门性价比兼顾',
    summary:
      '微风网络自 2023 年运营，采用 IEPL 专线与 VLESS 协议，年付清风档 137 元提供每月 100GB（约 11.4 元/月），在低价专线区间同时提供 7×24 客服支持（夜间 AI 值守）。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（实测截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国原生 IP'],
    entryPriceCny: 11.42,
    entryPriceLabel: '¥137/年（折合约 ¥11.42/月，100GB/月）',
    entryBillingNote: '月付乘风档 ¥27/月 200GB；基础行曾记约 7 元/月 50GB，以现行清风 137 元年付为准',
    entryTrafficGb: 100,
    paymentMethods: ['以官网结算页为准'],
    features: [
      'IEPL 专线定位，避开纯中转高峰拥堵',
      '年付档直接提供 100GB/月，月付 27 元起给到 200GB/月',
      '7×24 小时在线客服（夜间 AI 辅助），适合新手求助'
    ],
    plans: [
      { name: '清风 (Breeze)', billingCycle: '年付', priceCny: 137, monthlyEquivCny: 11.42, traffic: '100GB', trafficCycle: '每月重置', recommended: true },
      { name: '乘风 (Riding)', billingCycle: '月付', priceCny: 27, monthlyEquivCny: 27, traffic: '200GB', trafficCycle: '每月重置' },
      { name: '破风 (Breaking)', billingCycle: '月付', priceCny: 57, monthlyEquivCny: 57, traffic: '500GB', trafficCycle: '每月重置' },
      { name: '御风 (Mastery)', billingCycle: '月付', priceCny: 127, monthlyEquivCny: 127, traffic: '1200GB', trafficCycle: '每月重置' },
      { name: '信风·不限时', billingCycle: '一次性付费', priceCny: 200, traffic: '270GB', trafficCycle: '一次性' },
      { name: '长风·不限时', billingCycle: '一次性付费', priceCny: 370, traffic: '570GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰）',
    speedDataSource: '32家机场品牌清单 + 压缩包微风测速截图',
    speedMetrics: [
      { region: '香港', latencyMs: 25, downloadMbps: 546 },
      { region: '新加坡', latencyMs: 43, downloadMbps: 384 },
      { region: '日本', latencyMs: 54, downloadMbps: 131 },
      { region: '台湾', latencyMs: 40, downloadMbps: 115 },
      { region: '美国', latencyMs: 167, downloadMbps: 17 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/weifeng-2026-08-11.png',
        testedAt: '2026-08-11 批次（资料包附带）',
        protocolDisplayed: '以截图为准',
        toolFamily: '节点测速实测资料包',
        caption: '微风网络节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '资料标注主流流媒体解锁' }
    ],
    suitableFor: ['需要 100GB–200GB 中等流量且看重客服支持的学生与轻度办公用户'],
    notSuitableFor: ['预算严格限定在 6–8 元/月的极低价用户'],
    risks: ['基础摘要标注“年付约7元/月 50GB”与正文套餐表“137元/年 100GB（约11.4元/月）”不一致，须以官网现行价为准'],
    auditNotes: ['发现历史入门价 7 元/50GB 与最新清风 137 元/年 100GB 冲突，已明确披露。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 测速资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/weifeng'
  },
  {
    slug: 'dalaoyun',
    name: '大佬云',
    enName: 'Dalaoyun',
    rankOrder: 5,
    accentColor: '#6366F1',
    foundedYear: '2024',
    tagline: '5.6 元极限平价档位 IEPL + VLESS 标准方案',
    summary:
      '大佬云运营于 2024 年，属于 5.6 元/月（年付折算）60GB 极限平价档位的标准 IEPL + VLESS 服务，支持自研客户端与第三方订阅，季付及以上享 7 折。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及北美常见地区（详细节点数待核实）'],
    entryPriceCny: 5.6,
    entryPriceLabel: '年付折合约 ¥5.6/月（60GB/月）',
    entryBillingNote: '季付及以上 7 折，具体全档套餐表待官网补充核实',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '5.6 元/月极限平价年付门槛，含 60GB/月流量',
      'IEPL 专线 + VLESS 协议，支持第三方订阅导入',
      '季付及以上提供 7 折优惠'
    ],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 67.2, monthlyEquivCny: 5.6, traffic: '60GB', trafficCycle: '每月重置', note: '按品牌资料“年付约5.6元/月”折算，完整档位待核实' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'ChatGPT / Claude / Gemini', category: 'AI', status: 'not-tested', note: '品牌资料未提供统一实测数据' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'not-tested', note: '品牌资料未提供统一实测数据' }
    ],
    suitableFor: ['预算极低、仅需 60GB 左右月流量作为备用线路的用户'],
    notSuitableFor: ['依赖明确完整测速报告与官方流媒体解锁承诺的商用用户'],
    risks: ['与闪电鼠、云界线、榴莲云、环球梯规格高度同质化，缺乏独立实测截图', '暂无完整多档套餐价格表'],
    auditNotes: ['与同价位 5.6 元档 4 家品牌参数几乎一致，未编造缺失测速。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/dalaoyun'
  },
  {
    slug: 'xingdaomeng',
    name: '星岛梦',
    enName: 'Xingdaomeng',
    rankOrder: 6,
    accentColor: '#0EA5E9',
    foundedYear: '2020',
    tagline: '2020 年老牌 IEPL 专线，1 倍率不限设备且含三档永久不限时包',
    summary:
      '星岛梦与光速云同属 2020 年起步的较老牌机场，采用 IEPL 专线与 Trojan/Shadowsocks 协议，1 倍率不限设备数，节点除港台日新美外还覆盖韩国及东南亚。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['Trojan（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['香港', '台湾', '日本', '美国', '新加坡', '韩国', '东南亚多地'],
    entryPriceCny: 8,
    entryPriceLabel: '¥96/年（折合 ¥8/月）',
    entryBillingNote: '月付超量150G ¥25/月；另提供 100GB/300GB/1TB 三档不限时包',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '2020 年起持续运营，节点扩展至韩国与东南亚地区',
      '全节点 1 倍流量且不限设备连接数，适合家庭共享',
      '提供 100GB / 300GB / 1TB 三档永久不限时流量包'
    ],
    plans: [
      { name: '星岛梦·贴心小包', billingCycle: '年付', priceCny: 96, monthlyEquivCny: 8, traffic: '60GB', trafficCycle: '每月重置' },
      { name: '星岛梦·超量150G', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '星岛梦·进阶300G', billingCycle: '月付', priceCny: 50, monthlyEquivCny: 50, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '星岛梦·闪光500G', billingCycle: '月付', priceCny: 70, monthlyEquivCny: 70, traffic: '500GB', trafficCycle: '每月重置' },
      { name: '星岛梦·旗舰1T版', billingCycle: '月付', priceCny: 130, monthlyEquivCny: 130, traffic: '1000GB', trafficCycle: '每月重置' },
      { name: '星岛梦·永久不限时100', billingCycle: '一次性付费', priceCny: 100, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11（实测截图）',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 27, downloadMbps: 504 },
      { region: '新加坡', latencyMs: 44, downloadMbps: 411 },
      { region: '日本', latencyMs: 57, downloadMbps: 136 },
      { region: '台湾', latencyMs: 41, downloadMbps: 103 },
      { region: '美国', latencyMs: 177, downloadMbps: 18 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/xingdaomeng-2026-08-11.png',
        testedAt: '2026-08-11 01:48:13 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '星岛梦 2026-08-11 凌晨时段节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持主流流媒体及 TikTok 跨区' }
    ],
    suitableFor: ['多设备家庭或小团队共用', '需要韩国/东南亚小众落地地区及永久不限时流量包的用户'],
    notSuitableFor: ['仅凭凌晨测速即判断晚高峰性能的用户，建议先月付验证'],
    risks: ['2026-08-11 实测时间为凌晨 01:48，未反映晚高峰负载', '品牌宣传协议为 Trojan，测速截图中显示 Shadowsocks'],
    auditNotes: ['核对时间与协议差异已如实披露。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/xingdaomeng'
  },
  {
    slug: 'ermao',
    name: '二猫云',
    enName: 'Ermao Cloud',
    rankOrder: 7,
    accentColor: '#EC4899',
    foundedYear: '2023',
    tagline: '全线 IEPL 专线不限设备，兼顾 89 元年付小包与长期订阅',
    summary:
      '二猫云 2023 年上线，走全线 IEPL 专线与 VLESS 协议，不限设备数，配备定制客户端，提供 89 元年付小包、99 元 100GB 不限时包以及 20–160 元四档月付。',
    lineType: '全线 IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['定制客户端', 'Clash Verge Rev', 'Shadowrocket'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国（介绍段称主力覆盖港日美）'],
    entryPriceCny: 7.42,
    entryPriceLabel: '¥89/年（折合约 ¥7.42/月）',
    entryBillingNote: '月付白猫套餐 ¥20/月 130GB；不限时 ¥99 / 100GB',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '全线 IEPL 专线定位，强调长期稳定运营',
      '不限设备连接数，月付起步 20 元即含 130GB',
      '提供月付至三年付及 99 元 100GB 不限时流量包'
    ],
    plans: [
      { name: '二猫年付小包', billingCycle: '年付', priceCny: 89, monthlyEquivCny: 7.42, traffic: '60GB', trafficCycle: '每月重置' },
      { name: '二猫云·不限时套餐', billingCycle: '一次性付费', priceCny: 99, traffic: '100GB', trafficCycle: '一次性' },
      { name: '二猫云·白猫套餐', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '130GB', trafficCycle: '每月重置', recommended: true },
      { name: '二猫云·橘猫畅玩版', billingCycle: '月付', priceCny: 40, monthlyEquivCny: 40, traffic: '230GB', trafficCycle: '每月重置' },
      { name: '二猫云·牛奶猫尊享版', billingCycle: '月付', priceCny: 80, monthlyEquivCny: 80, traffic: '430GB', trafficCycle: '每月重置' },
      { name: '二猫云·黑猫重度用户版', billingCycle: '月付', priceCny: 160, monthlyEquivCny: 160, traffic: '850GB', trafficCycle: '每月重置' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11（实测截图）',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 22, downloadMbps: 481 },
      { region: '新加坡', latencyMs: 46, downloadMbps: 407 },
      { region: '日本', latencyMs: 53, downloadMbps: 143 },
      { region: '台湾', latencyMs: 41, downloadMbps: 118 },
      { region: '美国', latencyMs: 134, downloadMbps: 17 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/ermao-2026-08-11.png',
        testedAt: '2026-08-11 10:45:27 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '二猫云 2026-08-11 上午单批次节点测速截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Claude / Gemini', category: 'AI', status: 'partial', note: '官方未给绝对承诺，视节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持' }
    ],
    suitableFor: ['偏好 20 元月付 130GB 中等流量且多端共享的用户'],
    notSuitableFor: ['强依赖 Claude/Gemini 稳定解锁或强依赖特定新加坡节点的用户'],
    risks: ['文案中同时提及“缺少新加坡”与测速表出现新加坡节点，节点列表以当前订阅为准', 'Claude 与 Gemini 支持状态不稳定'],
    auditNotes: ['已标注节点地区文案与测速表的轻微差异。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/ermao'
  },
  {
    slug: 'wuyou',
    name: '无忧链接',
    enName: 'WorryFree / Wuyou',
    rankOrder: 8,
    accentColor: '#14B8A6',
    foundedYear: '2025',
    tagline: '6.58 元/月起超低门槛，专属客户端直连兼顾 TikTok 跨境场景',
    summary:
      '无忧链接 2025 年上线，MINI 年付仅 79 元（40GB/月，折合 6.58 元/月），全线节点 1 倍率不限设备，2026 年 10 月起主打官方专属客户端登录即用。',
    lineType: '跨境优化专线',
    lineCategory: '混合专线',
    protocols: ['以官方专属客户端为准'],
    clientMode: '仅专属客户端',
    supportedClients: ['官方专属客户端（2026 年 10 月起主打免订阅登录）'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国'],
    entryPriceCny: 6.58,
    entryPriceLabel: '¥79/年（折合约 ¥6.58/月）',
    entryBillingNote: 'MINI 年付 40GB/月；舒心月付 ¥19/月 100GB',
    entryTrafficGb: 40,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '79 元/年超低入门价，支持 TikTok 跨区直连与轻度电商场景',
      '全线无倍率、不限速、不限设备数，7×24 在线客服',
      '专属客户端登录即用，免去订阅转换烦恼'
    ],
    plans: [
      { name: 'MINI链接', billingCycle: '年付', priceCny: 79, monthlyEquivCny: 6.58, traffic: '40GB', trafficCycle: '每月重置', recommended: true },
      { name: '舒心链接', billingCycle: '月付', priceCny: 19, monthlyEquivCny: 19, traffic: '100GB', trafficCycle: '每月重置' },
      { name: '省心链接', billingCycle: '月付', priceCny: 33, monthlyEquivCny: 33, traffic: '200GB', trafficCycle: '每月重置' },
      { name: '随心链接', billingCycle: '月付', priceCny: 77, monthlyEquivCny: 77, traffic: '500GB', trafficCycle: '每月重置' },
      { name: '忘忧链接', billingCycle: '月付', priceCny: 117, monthlyEquivCny: 117, traffic: '1000GB', trafficCycle: '每月重置' },
      { name: '100G永久不限时', billingCycle: '一次性付费', priceCny: 108, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰）',
    speedDataSource: '32家机场品牌清单 + 压缩包附带 2 张实测图',
    speedMetrics: [
      { region: '香港', latencyMs: 23, downloadMbps: 531 },
      { region: '新加坡', latencyMs: 42, downloadMbps: 418 },
      { region: '日本', latencyMs: 55, downloadMbps: 147 },
      { region: '台湾', latencyMs: 41, downloadMbps: 107 },
      { region: '美国', latencyMs: 145, downloadMbps: 17 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/wuyou-2026-08-11-1.jpg',
        testedAt: '2026-08-11 资料包附带',
        protocolDisplayed: '以截图为准',
        toolFamily: '节点测速实测资料包',
        caption: '无忧链接节点测速留档图 1。'
      },
      {
        image: '/images/speedtest/wuyou-2026-08-11-2.jpg',
        testedAt: '2026-08-11 资料包附带',
        protocolDisplayed: '以截图为准',
        toolFamily: '节点测速实测资料包',
        caption: '无忧链接节点测速留档图 2。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'TikTok / Netflix / Disney+', category: 'Streaming', status: 'vendor-claimed', note: '主打 TikTok 跨区直连与主流流媒体' }
    ],
    suitableFor: ['低成本备用机场用户', '轻度 TikTok 与跨境电商运营新手'],
    notSuitableFor: ['需要 Clash/OpenWrt 第三方订阅的高级玩家', '40GB 流量不够用的重度视频用户'],
    risks: ['2025 年新品牌，长期口碑仍需持续观察', '转为专属客户端后不再兼容第三方通用订阅软件'],
    auditNotes: ['资料包提供 2 张 JPG 测速留档图，汇总表曾标注“订阅无需转换”，与 2026-10 专属客户端切换说明并存，已注明。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 测速资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/wuyou'
  },
  {
    slug: 'weitu',
    name: '唯兔云',
    enName: 'V2Yun / Weitu',
    rankOrder: 9,
    accentColor: '#A855F7',
    foundedYear: '2023',
    tagline: 'IPLC 专线 1 倍流量不限设备，14.9–19.9 元月付均衡之选',
    summary:
      '唯兔云自 2023 年运营，采用 IPLC 专线与 Trojan 协议，不限速且不限设备数，套餐涵盖 79.9 元限量年付、14.9 元节假日月付、19.9 元常规 150GB 月付及三档永久不限时流量包。',
    lineType: 'IPLC 专线',
    lineCategory: 'IPLC',
    protocols: ['Trojan（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国等 60+ 节点'],
    entryPriceCny: 6.66,
    entryPriceLabel: '¥79.9/年（折合约 ¥6.66/月）',
    entryBillingNote: '普通月付 ¥19.9/月 150GB，限时档 ¥14.9/月 100GB',
    entryTrafficGb: 45,
    paymentMethods: ['以官网结算页为准'],
    features: [
      'IPLC 专线定位，全节点 1 倍率不限设备连接',
      '月付 19.9 元即可获得 150GB，另有 100/200/500GB 不限时包',
      '海外技术团队加多人客服支持'
    ],
    plans: [
      { name: '唯兔云·年付版限量款', billingCycle: '年付', priceCny: 79.9, monthlyEquivCny: 6.66, traffic: '45GB', trafficCycle: '每月重置' },
      { name: '唯兔云·年付加强专线', billingCycle: '年付', priceCny: 120, monthlyEquivCny: 10, traffic: '75GB', trafficCycle: '每月重置' },
      { name: '唯兔云·普通版', billingCycle: '月付', priceCny: 19.9, monthlyEquivCny: 19.9, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '唯兔云·进阶版', billingCycle: '月付', priceCny: 29.9, monthlyEquivCny: 29.9, traffic: '200GB', trafficCycle: '每月重置' },
      { name: '唯兔云·专业版', billingCycle: '月付', priceCny: 59.9, monthlyEquivCny: 59.9, traffic: '500GB', trafficCycle: '每月重置' },
      { name: '唯兔云·永久不限时100G', billingCycle: '一次性付费', priceCny: 100, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11（实测截图）',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 27, downloadMbps: 500 },
      { region: '新加坡', latencyMs: 44, downloadMbps: 414 },
      { region: '日本', latencyMs: 56, downloadMbps: 147 },
      { region: '台湾', latencyMs: 37, downloadMbps: 100 },
      { region: '美国', latencyMs: 179, downloadMbps: 17 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/weitu-2026-08-11.png',
        testedAt: '2026-08-11 13:55:08 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '唯兔云 2026-08-11 午后单批次节点测速截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持主流流媒体' }
    ],
    suitableFor: ['追求 20 元以内 IPLC 月付、同时兼顾日常 AI 与流媒体的个人或家庭用户'],
    notSuitableFor: ['仅限特定节点要求独立实测验证的企业用户'],
    risks: ['节假日 14.9 元套餐为限时开放，日常购买以 19.9 元普通版为准'],
    auditNotes: ['2026-08-11 截图显示 Shadowsocks 协议，与文字标注的 Trojan 存在批次差异，已记录。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/weitu'
  },
  {
    slug: 'firefly',
    name: 'Firefly（萤火虫）',
    enName: 'Firefly',
    aliases: ['Firefly 萤火虫'],
    rankOrder: 10,
    accentColor: '#F97316',
    foundedYear: '待核实（历史资料提及 8 年团队）',
    tagline: 'IPLC 专线 + 原生 IP 节点，主打晚高峰稳定与专属客户端免配置',
    summary:
      'Firefly（萤火虫）主打 IPLC 专线接入与原生 IP 节点，年付 96 元（60GB/月）起步，常规月付 25 元 150GB 起，支持不限设备。2026 年 10 月起全面转为官方专属客户端登录，不提供第三方订阅链接。',
    lineType: 'IPLC 专线 + 原生 IP',
    lineCategory: 'IPLC',
    protocols: ['VLESS'],
    clientMode: '仅专属客户端',
    supportedClients: ['Firefly 官方专属客户端（不提供第三方订阅链接）'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国'],
    entryPriceCny: 8,
    entryPriceLabel: '¥96/年（折合 ¥8/月）',
    entryBillingNote: '月付 Lite ¥25/月 150GB；新用户优惠码 firefly 享 8 折（年付版不适用）',
    entryTrafficGb: 60,
    paymentMethods: ['支付宝', 'USDT（历史资料标注无微信）'],
    features: [
      'IPLC 专线 + 原生 IP 节点，主打晚高峰稳定性',
      '品牌资料显示全节点不限速、不限设备数',
      '2026 年 10 月起提供官方专属客户端一键登录，免订阅配置'
    ],
    plans: [
      { name: 'Firefly 年付版', billingCycle: '年付', priceCny: 96, monthlyEquivCny: 8, traffic: '60GB', trafficCycle: '每月重置', note: '不适用 8 折优惠码' },
      { name: 'Firefly Lite', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: 'Firefly Plus', billingCycle: '月付', priceCny: 45, monthlyEquivCny: 45, traffic: '300GB', trafficCycle: '每月重置' },
      { name: 'Firefly Blaze', billingCycle: '月付', priceCny: 85, monthlyEquivCny: 85, traffic: '600GB', trafficCycle: '每月重置' },
      { name: 'Firefly Nova', billingCycle: '月付', priceCny: 150, monthlyEquivCny: 150, traffic: '1000GB', trafficCycle: '每月重置' },
      { name: 'Firefly 不限时', billingCycle: '一次性付费', priceCny: 100, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰）',
    speedDataSource: '32家机场品牌清单.txt',
    speedMetrics: [
      { region: '香港', latencyMs: 27, downloadMbps: 547 },
      { region: '新加坡', latencyMs: 42, downloadMbps: 445 },
      { region: '日本', latencyMs: 57, downloadMbps: 147 },
      { region: '台湾', latencyMs: 39, downloadMbps: 135 },
      { region: '美国', latencyMs: 143, downloadMbps: 30 }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '原生 IP 标注支持主流流媒体' }
    ],
    suitableFor: ['看重晚高峰稳定且接受官方专属客户端的 AI 办公与追剧用户'],
    notSuitableFor: ['必须导入 Clash Verge Rev、Shadowrocket 或 OpenClash 软路由的用户'],
    risks: ['源文档中重复收录为“Firefly”与“Firefly 萤火虫”并附两个不同邀请码，本站已合并去重', '历史资料显示与微风等存在同系运营关联，选备用机场时应分散架构'],
    auditNotes: ['审计去重记录：源清单第 8 条与附录第 32 条为同一品牌，已合并为唯一实体 firefly。'],
    dataStatus: 'vendor',
    dataSource: '32家机场品牌清单.txt（合并去重）',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/firefly'
  },
  {
    slug: 'yuzhou',
    name: '宇宙云',
    enName: 'Yuzhou Cloud',
    rankOrder: 11,
    accentColor: '#3B82F6',
    foundedYear: '待核实',
    tagline: 'VLESS 协议 + 60+ 节点历史记录，完整套餐待官方最新核实',
    summary:
      '宇宙云在历史资料中标注 VLESS 协议、60+ 节点与三网优化，2026-08-11 实测资料包中留有珠海联通 9Gbps VLESS 晚间实测截图，但当前完整套餐表与流量细节尚缺，标记为待核实。',
    lineType: '三网优化 / IEPL（历史资料）',
    lineCategory: 'IEPL',
    protocols: ['VLESS（2026-08-11 截图确认）'],
    clientMode: '待核实',
    supportedClients: ['待核实当前订阅与客户端模式'],
    regions: ['60+ 节点（详细地区分布待补充）'],
    entryPriceCny: 8,
    entryPriceLabel: '历史起价 ¥96/年（月流量待核实）',
    entryBillingNote: '现有资料不足以列出完整套餐表，请以官网实时页面为准',
    entryTrafficGb: 0,
    paymentMethods: ['待核实'],
    features: [
      '2026-08-11 晚间 21:04 VLESS 协议实测截图可查',
      '历史资料标注 60+ 节点、三网优化与智能负载均衡'
    ],
    plans: [
      { name: '历史年付起价参考', billingCycle: '年付', priceCny: 96, monthlyEquivCny: 8, traffic: '待核实', trafficCycle: '待核实', note: '历史起价，不可直接视为完整在售套餐' }
    ],
    screenshots: [
      {
        image: '/images/speedtest/yuzhou-2026-08-11.png',
        testedAt: '2026-08-11 21:04:24 CST',
        protocolDisplayed: 'VLESS',
        toolFamily: '主端 4.3.3 (696) / 喵速 4.7.0（珠海联通 9Gbps）',
        caption: '宇宙云 2026-08-11 晚高峰 21:04 VLESS 实测留档截图。'
      }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'ChatGPT / Claude / Gemini', category: 'AI', status: 'not-tested', note: '暂无可核实解锁记录' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'not-tested', note: '暂无可核实解锁记录' }
    ],
    suitableFor: ['愿意自行核对官网最新套餐、关注 VLESS 晚高峰实测留档的用户'],
    notSuitableFor: ['希望直接比对全套明码标价再下单的普通用户'],
    risks: ['缺少当期完整套餐价格、月流量与解锁实测记录'],
    auditNotes: ['严格遵循防虚构原则，未补写缺失套餐，仅保留历史起价与 2026-08-11 VLESS 晚间实测截图。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/yuzhou'
  },
  {
    slug: 'u1s1',
    name: 'U1S1',
    enName: 'U1S1 Cloud',
    rankOrder: 12,
    accentColor: '#EF4444',
    foundedYear: '2025',
    tagline: '2025 年上线 IPLC 专线，官方标称 2000Mbps 带宽且不限设备',
    summary:
      'U1S1 于 2025 年上线，定位高带宽 IPLC 专线，年付 96 元（60GB/月）起步，常规月付 20 元 120GB 到 180 元 1500GB，并留有 2026-08-11 晚间 22:33 实测截图。',
    lineType: 'IPLC 专线',
    lineCategory: 'IPLC',
    protocols: ['Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国'],
    entryPriceCny: 8,
    entryPriceLabel: '¥96/年（折合 ¥8/月）',
    entryBillingNote: '月付普通人真够了包 ¥20/月 120GB',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      'IPLC 专线，品牌资料宣称 2000Mbps 带宽与晚高峰不限速',
      '不限设备同时在线，最高提供 1500GB 大流量月付',
      '留有 2026-08-11 晚间 22:33 实测截图'
    ],
    plans: [
      { name: 'u1s1·就是好用包', billingCycle: '年付', priceCny: 96, monthlyEquivCny: 8, traffic: '60GB', trafficCycle: '每月重置' },
      { name: 'u1s1·普通人真够了包', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '120GB', trafficCycle: '每月重置', recommended: true },
      { name: 'u1s1·你以为用不到包', billingCycle: '月付', priceCny: 40, monthlyEquivCny: 40, traffic: '300GB', trafficCycle: '每月重置' },
      { name: 'u1s1·瘾大就拉满包', billingCycle: '月付', priceCny: 100, monthlyEquivCny: 100, traffic: '700GB', trafficCycle: '每月重置' },
      { name: 'u1s1·我全都要包', billingCycle: '月付', priceCny: 180, monthlyEquivCny: 180, traffic: '1500GB', trafficCycle: '每月重置' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11 22:33（晚间实测）',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 24, downloadMbps: 538 },
      { region: '新加坡', latencyMs: 46, downloadMbps: 414 },
      { region: '日本', latencyMs: 57, downloadMbps: 133 },
      { region: '台湾', latencyMs: 39, downloadMbps: 107 },
      { region: '美国', latencyMs: 134, downloadMbps: 20 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/u1s1-2026-08-11.png',
        testedAt: '2026-08-11 22:33:29 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: 'U1S1 2026-08-11 晚间 22:33 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注主流流媒体可用' }
    ],
    suitableFor: ['看重晚间带宽表现且愿意先月付尝鲜的用户'],
    notSuitableFor: ['只选择运营 3 年以上老牌服务商的保守用户'],
    risks: ['2025 年上线的新品牌，长期稳定性与售后尚需时间检验，不建议首单直接大额年付'],
    auditNotes: ['“2000Mbps 带宽”已明确标注为品牌资料宣称。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/u1s1'
  },
  {
    slug: 'lingmao',
    name: '灵猫网络',
    enName: 'CivetNet / Lingmao',
    rankOrder: 13,
    accentColor: '#06B6D4',
    foundedYear: '2025',
    tagline: '中转优化 1 倍率不限设备，专属客户端免订阅导入',
    summary:
      '灵猫网络成立于 2025 年，年付小包 85 元（45GB/月，折合 7.08 元/月），常规月付 25 元 150GB，主打 1 倍流量不限设备与官方专属客户端登录即用。',
    lineType: '中转优化线路',
    lineCategory: 'BGP中转',
    protocols: ['Shadowsocks（2026-08-11 截图，原文未标明协议）'],
    clientMode: '仅专属客户端',
    supportedClients: ['灵猫官方专属客户端（不提供订阅链接）'],
    regions: ['香港', '台湾', '日本', '美国', '新加坡'],
    entryPriceCny: 7.08,
    entryPriceLabel: '¥85/年（折合约 ¥7.08/月）',
    entryBillingNote: '月付 Small ¥25/月 150GB（头部旧摘要注 19 元，以正文套餐表 25 元为准）',
    entryTrafficGb: 45,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '1 倍流量、不限速且不限设备数，适合多端日常访问',
      '2026 年 10 月起全面采用官方专属客户端，无需导入订阅',
      '留有 2026-08-11 傍晚 18:45 实测留档截图'
    ],
    plans: [
      { name: '灵猫·年付小包', billingCycle: '年付', priceCny: 85, monthlyEquivCny: 7.08, traffic: '45GB', trafficCycle: '每月重置' },
      { name: '灵猫·年付Small', billingCycle: '年付', priceCny: 195, monthlyEquivCny: 16.25, traffic: '150GB', trafficCycle: '每月重置' },
      { name: '灵猫·年付Big', billingCycle: '年付', priceCny: 295, monthlyEquivCny: 24.58, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '灵猫·季付Big', billingCycle: '季付', priceCny: 125, monthlyEquivCny: 41.67, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '灵猫·月付Small', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '灵猫·月付Big', billingCycle: '月付', priceCny: 45, monthlyEquivCny: 45, traffic: '300GB', trafficCycle: '每月重置' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11 18:45',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 22, downloadMbps: 492 },
      { region: '新加坡', latencyMs: 46, downloadMbps: 409 },
      { region: '日本', latencyMs: 57, downloadMbps: 147 },
      { region: '台湾', latencyMs: 40, downloadMbps: 109 },
      { region: '美国', latencyMs: 164, downloadMbps: 19 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/lingmao-2026-08-11.png',
        testedAt: '2026-08-11 18:45:40 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '灵猫网络 2026-08-11 傍晚 18:45 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持' }
    ],
    suitableFor: ['家庭多设备轻中度上网且不想配置订阅的新手用户'],
    notSuitableFor: ['需要 Clash/软路由第三方客户端订阅的进阶用户'],
    risks: ['源资料优惠码同时出现 lmao888 与 lingmao，且头部 19 元与正文月付 25 元存在差异', '中转线路晚高峰表现易波动，建议先月付验证'],
    auditNotes: ['已记录价格与优惠码内部冲突点，以正文套餐表为准并提醒核实。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/lingmao'
  },
  {
    slug: 'jilian',
    name: '极连云',
    enName: 'Jilian Cloud',
    rankOrder: 14,
    accentColor: '#2563EB',
    foundedYear: '2024',
    tagline: '18 元/100GB 中档 IEPL 专线，留有晚高峰 22:46 实测留档',
    summary:
      '极连云运营于 2024 年，定位 18 元/月 100GB 的 IEPL 专线中档区间，同时支持自研客户端与第三方订阅，品牌资料强调覆盖常见 AI 工具场景，并留有 2026-08-11 晚间 22:46 实测截图。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及北美常见地区（详细地区以订阅为准）'],
    entryPriceCny: 18,
    entryPriceLabel: '¥18/月（100GB/月）',
    entryBillingNote: '完整多档套餐表待补充，基础档为 18 元 100GB',
    entryTrafficGb: 100,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '18 元档位 IEPL 专线，介于极低价与 25 元主流档之间',
      '同时支持自研客户端与第三方订阅导入',
      '留有 2026-08-11 晚间 22:46 实测留档截图'
    ],
    plans: [
      { name: '基础月付档（参考）', billingCycle: '月付', priceCny: 18, monthlyEquivCny: 18, traffic: '100GB', trafficCycle: '每月重置', recommended: true, note: '其余档位待官网补充核实' }
    ],
    screenshots: [
      {
        image: '/images/speedtest/jilian-2026-08-11.png',
        testedAt: '2026-08-11 22:46:50 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '极连云 2026-08-11 晚间 22:46 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: '常见 AI 工具', category: 'AI', status: 'vendor-claimed', note: '品牌资料称覆盖常见 AI 工具场景，无独立逐项解锁表' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无逐平台实测数据' }
    ],
    suitableFor: ['预算在 18 元/月左右、偏重 AI 与日常资料查询的用户'],
    notSuitableFor: ['需要完整公开全档位价格及逐项流媒体实测后再决策的用户'],
    risks: ['缺少完整多档套餐明细与流媒体专项实测数据'],
    auditNotes: ['与同价位光年梯相比少 10GB 月流量，但多一年运营记录（2024 vs 2025）。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/jilian'
  },
  {
    slug: 'guangnian',
    name: '光年梯',
    enName: 'Guangnian Ladder',
    rankOrder: 15,
    accentColor: '#0284C7',
    foundedYear: '2025',
    tagline: '18 元/110GB IEPL + VLESS，自研与第三方订阅兼备',
    summary:
      '光年梯 2025 年上线，定位 18 元/月 110GB 的 IEPL + VLESS 中档方案，比同价位极连云多 10GB 流量，支持自研客户端与第三方订阅，留有 2026-08-11 午后实测截图。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及欧美常见地区'],
    entryPriceCny: 18,
    entryPriceLabel: '¥18/月（110GB/月）',
    entryBillingNote: '完整多档套餐表待官网核实',
    entryTrafficGb: 110,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '18 元/月提供 110GB 流量，IEPL + VLESS 组合',
      '同时支持自研客户端与第三方订阅导入',
      '品牌资料标注兼顾常见 AI 与主流流媒体场景'
    ],
    plans: [
      { name: '基础月付档（参考）', billingCycle: '月付', priceCny: 18, monthlyEquivCny: 18, traffic: '110GB', trafficCycle: '每月重置', recommended: true, note: '其余档位待官网补充核实' }
    ],
    screenshots: [
      {
        image: '/images/speedtest/guangnian-2026-08-11.png',
        testedAt: '2026-08-11 14:38:04 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '光年梯 2026-08-11 午后 14:38 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: '常见 AI 工具', category: 'AI', status: 'vendor-claimed', note: '品牌资料标注支持，无独立逐项解锁表' },
      { service: '主流流媒体', category: 'Streaming', status: 'vendor-claimed', note: '品牌资料标注支持，待独立核验' }
    ],
    suitableFor: ['18 元月付预算区间内需要略多流量的用户'],
    notSuitableFor: ['偏好运营多年老牌机场的长期大额年付用户'],
    risks: ['2025 年新品牌，长期稳定性仍在观察期', '缺少完整多档套餐明细'],
    auditNotes: ['如实标注 2026-08-11 测速截图协议为 Shadowsocks。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/guangnian'
  },
  {
    slug: 'yifan',
    name: '一翻云',
    enName: '1Flyun / Yifan',
    rankOrder: 16,
    accentColor: '#22C55E',
    foundedYear: '2025',
    tagline: '全节点 IEPL 物理专线 + 原生住宅 IP，三协议兼容客户端宽松',
    summary:
      '一翻云运营于 2025 年，提供 Hysteria 2 / VLESS-Reality / Shadowsocks 三协议选项与第三方客户端兼容，年付小包 98 元（60GB/月），月付轻享版 20 元即含 150GB，并含三档不限时流量包。',
    lineType: '全节点 IEPL 物理专线 + 原生住宅 IP（品牌资料）',
    lineCategory: 'IEPL',
    protocols: ['Hysteria 2', 'VLESS-Reality', 'Shadowsocks'],
    clientMode: '第三方订阅为主',
    supportedClients: ['Clash Verge Rev', 'v2rayN', 'Shadowrocket', 'FlClash', 'Hiddify', 'sing-box'],
    regions: ['香港', '日本', '美国', '新加坡', '台湾'],
    entryPriceCny: 8.17,
    entryPriceLabel: '¥98/年（折合约 ¥8.17/月）',
    entryBillingNote: '月付轻享版 ¥20/月 150GB，另含 100/250/500GB 三档不限时包',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '同时提供 Hysteria 2、VLESS-Reality 与 Shadowsocks 三协议，兼容主流开源客户端',
      '品牌资料标注全节点 IEPL 物理专线与单节点 2Gbps 带宽，不限速不限设备',
      '20 元月付给到 150GB，含 3 档永久不过期一次性流量包'
    ],
    plans: [
      { name: '98¥·年付小包', billingCycle: '年付', priceCny: 98, monthlyEquivCny: 8.17, traffic: '60GB', trafficCycle: '每月重置' },
      { name: '轻享版', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '舒享版', billingCycle: '月付', priceCny: 35, monthlyEquivCny: 35, traffic: '350GB', trafficCycle: '每月重置' },
      { name: '尊享版', billingCycle: '月付', priceCny: 55, monthlyEquivCny: 55, traffic: '600GB', trafficCycle: '每月重置' },
      { name: '极致版', billingCycle: '月付', priceCny: 95, monthlyEquivCny: 95, traffic: '1.2TB', trafficCycle: '每月重置' },
      { name: '轻享版·不限时包', billingCycle: '一次性付费', priceCny: 100, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11 00:21',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 23, downloadMbps: 477 },
      { region: '新加坡', latencyMs: 42, downloadMbps: 390 },
      { region: '日本', latencyMs: 53, downloadMbps: 136 },
      { region: '台湾', latencyMs: 40, downloadMbps: 117 },
      { region: '美国', latencyMs: 180, downloadMbps: 20 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/yifan-2026-08-11.png',
        testedAt: '2026-08-11 00:21:30 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '一翻云 2026-08-11 凌晨 00:21 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注主流流媒体解锁' }
    ],
    suitableFor: ['偏好开源第三方客户端（Clash/v2rayN/sing-box）并希望使用 Hysteria 2 / Reality 协议的技术用户'],
    notSuitableFor: ['需要免费试用的用户（官方不提供试用）'],
    risks: ['2025 年新品牌且无免费试用', '“晚高峰 0 丢包”“原生住宅 IP”为品牌方宣称，8 月测速截图系凌晨 00:21 测得'],
    auditNotes: ['优惠码同时出现 yfy6666 与 1FLYYUN，已标注以官网结算页为准。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/yifan'
  },
  {
    slug: 'sogo',
    name: 'SOGO 云',
    enName: 'SOGO Cloud',
    rankOrder: 17,
    accentColor: '#E11D48',
    foundedYear: '2026（汇总表标注）',
    tagline: 'IEPL + 三网 BGP 覆盖 15 国家地区，仅限自研客户端',
    summary:
      'SOGO 云主打全线 IEPL 专线与三网 BGP 优化，节点覆盖 15 个国家和地区（本站收录中地区覆盖较广），年付小包 98 元（60GB/月），月付 25 元 150GB 起，但仅支持自研客户端且不提供第三方订阅。',
    lineType: '全线 IEPL 专线 + 三网 BGP 优化',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '仅专属客户端',
    supportedClients: ['SOGO 自研客户端（Windows / macOS / iOS / Android / 主流软路由）'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国', '韩国等 15 个国家与地区'],
    entryPriceCny: 8.17,
    entryPriceLabel: '¥98/年（折合约 ¥8.17/月）',
    entryBillingNote: '月付基础版 ¥25/月 150GB；含 120GB–1TB 四档不限时包',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '覆盖 15 个国家和地区，满足多区域跨区访问需求',
      '全线 IEPL + 三网 BGP，不限速、不限设备数',
      '留有 2026-08-11 晚间 18:57 实测留档截图'
    ],
    plans: [
      { name: '小包-年付版', billingCycle: '年付', priceCny: 98, monthlyEquivCny: 8.17, traffic: '60GB', trafficCycle: '每月重置' },
      { name: '基础版', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '优选版', billingCycle: '月付', priceCny: 45, monthlyEquivCny: 45, traffic: '350GB', trafficCycle: '每月重置' },
      { name: '强化版', billingCycle: '月付', priceCny: 80, monthlyEquivCny: 80, traffic: '550GB', trafficCycle: '每月重置' },
      { name: '顶配版', billingCycle: '月付', priceCny: 150, monthlyEquivCny: 150, traffic: '1.1TB', trafficCycle: '每月重置' },
      { name: 'SOGO基础餐不限时版', billingCycle: '一次性付费', priceCny: 120, traffic: '120GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11 18:57',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 26, downloadMbps: 488 },
      { region: '新加坡', latencyMs: 43, downloadMbps: 401 },
      { region: '日本', latencyMs: 57, downloadMbps: 137 },
      { region: '台湾', latencyMs: 39, downloadMbps: 118 },
      { region: '美国', latencyMs: 140, downloadMbps: 17 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/sogo-2026-08-11.png',
        testedAt: '2026-08-11 18:57:59 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: 'SOGO 云 2026-08-11 晚间 18:57 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Claude / Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注支持' }
    ],
    suitableFor: ['需要多达 15 个冷门/跨区国家节点且接受官方客户端的用户'],
    notSuitableFor: ['依赖 Clash Verge Rev / Shadowrocket 自定义规则分流的用户'],
    risks: ['不提供第三方订阅链接，官方无试用', '优惠码存在 SOGO10000 与 sss777 两个记录版本'],
    auditNotes: ['已如实说明仅专属客户端限制与优惠码差异。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/sogo'
  },
  {
    slug: 'kexin',
    name: '可信云',
    enName: 'Kosing / Kexin',
    rankOrder: 18,
    accentColor: '#0D9488',
    foundedYear: '2024',
    tagline: '25 元/150GB IEPL + VLESS，诚实标注解锁数据缺口',
    summary:
      '可信云 2024 年运营，采用 IEPL 专线与 VLESS 协议，支持第三方客户端，基础月付 25 元 150GB，并在原始资料中坦诚标注 AI 与流媒体缺乏统一实测数据。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '第三方订阅为主',
    supportedClients: ['Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['亚太及北美常见地区'],
    entryPriceCny: 25,
    entryPriceLabel: '¥25/月（150GB/月）',
    entryBillingNote: '其余套餐档位待官网补充核实',
    entryTrafficGb: 150,
    paymentMethods: ['以官网结算页为准'],
    features: [
      'IEPL 专线 + VLESS 协议，支持第三方客户端订阅',
      '资料透明度高，不夸大未经实测的 AI/流媒体解锁承诺',
      '留有 2026-08-11 批次节点测速留档截图'
    ],
    plans: [
      { name: '基础月付档（参考）', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true }
    ],
    screenshots: [
      {
        image: '/images/speedtest/kexin-2026-08-11.png',
        testedAt: '15:32:35 CST（按批次暂记 2026-08-11，日期待复核）',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        dateConfidence: 'date-inferred-from-batch-time-visible-in-image',
        caption: '可信云节点测速留档截图（注：底部仅清晰可见时间 15:32:35，完整日期按压缩包批次暂记 2026-08-11）。'
      }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'ChatGPT / Claude / Gemini', category: 'AI', status: 'not-tested', note: '品牌资料明确提示缺乏统一实测数据' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'not-tested', note: '缺乏统一实测数据，保持中性标注' }
    ],
    suitableFor: ['偏好第三方客户端、看重参数透明度的 25 元档位用户'],
    notSuitableFor: ['需要明确承诺全解锁流媒体与 AI 的用户'],
    risks: ['测速截图底部日历日期未完整显示，按批次暂记 2026-08-11', '缺乏完整多档套餐表与解锁实测'],
    auditNotes: ['严格遵循 speedtest-manifest.json 复核提示，标注 dateConfidence。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/kexin'
  },
  {
    slug: 'sujie',
    name: '速界',
    enName: 'SpeedWorld / Sujie',
    rankOrder: 19,
    accentColor: '#7C3AED',
    foundedYear: '2024',
    tagline: '25 元/150GB IEPL + VLESS，明确侧重 AI 生产力工具场景',
    summary:
      '速界自 2024 年起运营，定位 25 元/月 150GB 的 IEPL + VLESS 专线，支持自研客户端与第三方订阅，在 25 元档中明确突出 ChatGPT、Claude、Gemini 等 AI 使用场景，同时理性提示 AI 可用性受平台风控影响。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（品牌资料）', 'Shadowsocks（2026-08-11 截图）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及北美 AI 友好地区节点'],
    entryPriceCny: 25,
    entryPriceLabel: '¥25/月（150GB/月）',
    entryBillingNote: '其余套餐档位待官网补充核实',
    entryTrafficGb: 150,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '25 元档明确针对 ChatGPT / Claude / Gemini 场景优化的品牌资料定位',
      '同时支持自研客户端与第三方订阅导入',
      '留有 2026-08-11 午后 15:39 实测留档截图'
    ],
    plans: [
      { name: '基础月付档（参考）', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '150GB', trafficCycle: '每月重置', recommended: true }
    ],
    screenshots: [
      {
        image: '/images/speedtest/sujie-2026-08-11.png',
        testedAt: '2026-08-11 15:39:36 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '速界 2026-08-11 午后 15:39 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude / Gemini', category: 'AI', status: 'vendor-claimed', note: '品牌资料重点强调 AI 场景，并声明不承诺永久 100% 免疫平台风控' },
      { service: 'Netflix / Disney+ / YouTube', category: 'Streaming', status: 'not-tested', note: '暂无独立流媒体逐项实测表' }
    ],
    suitableFor: ['以 AI 开发与对话工具为首要用途、需要第三方订阅的 25 元预算用户'],
    notSuitableFor: ['期望商家承诺所有 AI 平台永不封 IP 的用户'],
    risks: ['AI 平台风控动态变化，需多地区节点备份', '完整套餐梯度待补充'],
    auditNotes: ['如实保留品牌资料中的免责声明，不夸大 AI 稳定承诺。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/sujie'
  },
  {
    slug: 'shanyue',
    name: '闪跃',
    enName: 'FlashLeap / Shanyue',
    rankOrder: 20,
    accentColor: '#D97706',
    foundedYear: '待核实',
    tagline: '纯 IPLC 专线定位，年付 96 元起，专属客户端一键直连',
    summary:
      '闪跃定位中高端纯 IPLC 专线，骨干网接入主打晚高峰低延迟，年付 96 元（60GB/月），常规月付 24 元 150GB 起，采用官方专属客户端且不提供第三方订阅链接。',
    lineType: '纯 IPLC 专线（骨干网接入）',
    lineCategory: 'IPLC',
    protocols: ['以官方专属客户端为准（原文未标明）'],
    clientMode: '仅专属客户端',
    supportedClients: ['闪跃官方专属客户端（不提供订阅链接）'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国'],
    entryPriceCny: 8,
    entryPriceLabel: '¥96/年（折合 ¥8/月）',
    entryBillingNote: '月付闪动 ¥24/月 150GB；优惠码 shanyue 8 折（年付不适用）',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '纯 IPLC 专线与原生 IP 定位，侧重晚高峰低延迟',
      '年付 96 元起步，月付档位覆盖 150GB 至 1000GB',
      '专属客户端免配置登录'
    ],
    plans: [
      { name: '闪跃年付版', billingCycle: '年付', priceCny: 96, monthlyEquivCny: 8, traffic: '60GB', trafficCycle: '每月重置' },
      { name: '闪动 (Flicker)', billingCycle: '月付', priceCny: 24, monthlyEquivCny: 24, traffic: '150GB', trafficCycle: '每月重置', recommended: true },
      { name: '飞跃 (Leap)', billingCycle: '月付', priceCny: 44, monthlyEquivCny: 44, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '瞬移 (Teleport)', billingCycle: '月付', priceCny: 84, monthlyEquivCny: 84, traffic: '600GB', trafficCycle: '每月重置' },
      { name: '跃迁 (Warp)', billingCycle: '月付', priceCny: 134, monthlyEquivCny: 134, traffic: '1000GB', trafficCycle: '每月重置' }
    ],
    speedDataDate: '2026-10-19（非晚高峰）',
    speedDataSource: '32家机场品牌清单.txt',
    speedMetrics: [
      { region: '香港', latencyMs: 23, downloadMbps: 548 },
      { region: '新加坡', latencyMs: 44, downloadMbps: 383 },
      { region: '日本', latencyMs: 53, downloadMbps: 144 },
      { region: '台湾', latencyMs: 38, downloadMbps: 110 },
      { region: '美国', latencyMs: 143, downloadMbps: 18 }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / HBO / YouTube', category: 'Streaming', status: 'vendor-claimed', note: '原生 IP 标注全解锁' }
    ],
    suitableFor: ['长期高频使用 AI 与深夜追剧、接受专属客户端的用户'],
    notSuitableFor: ['需要 Clash/OpenWrt 第三方订阅的用户', '预算极低仅偶尔上网的用户'],
    risks: ['缺少独立晚高峰实测截图，协议类型未公开', '仅限专属客户端'],
    auditNotes: ['如实标注不含 2026-08-11 独立截图留档。'],
    dataStatus: 'vendor',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/shanyue'
  },
  {
    slug: 'quanqiu',
    name: '全球云',
    enName: 'Global Cloud / Quanqiu',
    rankOrder: 21,
    accentColor: '#059669',
    foundedYear: '2026（汇总表标注）',
    tagline: 'IPLC/IEPL 专线 60+ 节点，含三档不限时包与独享私人专线',
    summary:
      '全球云覆盖 60+ 全球节点，采用 Trojan / Shadowsocks 协议与专属客户端模式，套餐极其丰富：含 99 元轻量年付、20–180 元四档 BGP 智能优化月付、三档一次性流量包及 680 元独享专线。',
    lineType: 'IPLC / IEPL 专线中转 + BGP 智能优化',
    lineCategory: '混合专线',
    protocols: ['Trojan', 'Shadowsocks'],
    clientMode: '仅专属客户端',
    supportedClients: ['全球云专属客户端（不提供第三方订阅）'],
    regions: ['香港', '台湾', '新加坡', '日本', '美国等全球 60+ 节点'],
    entryPriceCny: 8.25,
    entryPriceLabel: '¥99/年（折合约 ¥8.25/月）',
    entryBillingNote: '月付入门方案 ¥20/月 120GB；不限时 ¥100/100GB 起',
    entryTrafficGb: 59,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '60+ 全球节点覆盖，品牌资料标注 2Gbps+ 带宽资源',
      '覆盖轻量年付、BGP 月付、一次性不限时包与 680 元独享专线',
      '留有 2026-08-11 午后 15:50 实测留档截图'
    ],
    plans: [
      { name: '轻量版', billingCycle: '年付', priceCny: 99, monthlyEquivCny: 8.25, traffic: '59GB', trafficCycle: '每月重置' },
      { name: 'BGP 智能优化·入门方案', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '120GB', trafficCycle: '每月重置', recommended: true },
      { name: 'BGP 智能优化·进阶方案', billingCycle: '月付', priceCny: 40, monthlyEquivCny: 40, traffic: '300GB', trafficCycle: '每月重置' },
      { name: 'BGP 智能优化·高端方案', billingCycle: '月付', priceCny: 100, monthlyEquivCny: 100, traffic: '700GB', trafficCycle: '每月重置' },
      { name: 'BGP 智能优化·商业方案', billingCycle: '月付', priceCny: 180, monthlyEquivCny: 180, traffic: '1500GB', trafficCycle: '每月重置' },
      { name: '不限时轻量包', billingCycle: '一次性付费', priceCny: 100, traffic: '100GB', trafficCycle: '一次性' }
    ],
    speedDataDate: '2026-10-19（非晚高峰） / 2026-08-11 15:50',
    speedDataSource: '32家机场品牌清单 + MAI-TEST-BOT 2026-08-11',
    speedMetrics: [
      { region: '香港', latencyMs: 25, downloadMbps: 489 },
      { region: '新加坡', latencyMs: 45, downloadMbps: 430 },
      { region: '日本', latencyMs: 55, downloadMbps: 133 },
      { region: '台湾', latencyMs: 37, downloadMbps: 117 },
      { region: '美国', latencyMs: 138, downloadMbps: 18 }
    ],
    screenshots: [
      {
        image: '/images/speedtest/quanqiu-2026-08-11.png',
        testedAt: '2026-08-11 15:50:43 CST',
        protocolDisplayed: 'Shadowsocks',
        toolFamily: 'MAI-TEST-BOT 2.0.0-dev（珠海联通 5Gbps）',
        caption: '全球云 2026-08-11 午后 15:50 节点测速留档截图。'
      }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '资料标注支持' },
      { service: 'Gemini', category: 'AI', status: 'partial', note: '视节点而定' },
      { service: 'Netflix / Disney+ / YouTube / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '资料标注主流流媒体可用' }
    ],
    suitableFor: ['看重多地区节点数量与灵活套餐形态的用户'],
    notSuitableFor: ['依赖 Clash/v2rayN 第三方订阅的用户'],
    risks: ['不提供第三方订阅，汇总表标注为 2026 新品牌需关注长期稳定性', '优惠码记录存在 qq88 与 qqy7777 两个版本'],
    auditNotes: ['已披露优惠码版本差异及仅专属客户端限制。'],
    dataStatus: 'measured',
    dataSource: '32家机场品牌清单 + 2026-08-11 实测资料包',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/quanqiu'
  },
  {
    slug: 'shandianshu',
    name: '闪电鼠',
    enName: 'Shandianshu',
    rankOrder: 22,
    accentColor: '#EAB308',
    foundedYear: '2024',
    tagline: '5.6 元极限平价档代表，IEPL + VLESS + 60GB 年付方案',
    summary:
      '闪电鼠 2024 年起运营，与大佬云等并列本站收录中门槛最低的 5.6 元/月（年付折算）60GB 档位，采用 IEPL + VLESS，支持自研客户端与第三方订阅，季付及以上 7 折。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及北美基础地区（详细列表待核实）'],
    entryPriceCny: 5.6,
    entryPriceLabel: '年付折合约 ¥5.6/月（60GB/月）',
    entryBillingNote: '季付及以上 7 折，其余档位待官网补充核实',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: ['5.6 元极限低价门槛', 'IEPL + VLESS 协议', '自研客户端与第三方订阅双支持'],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 67.2, monthlyEquivCny: 5.6, traffic: '60GB', trafficCycle: '每月重置', note: '按年付约 5.6 元/月折算' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '暂无独立实测数据' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无独立实测数据' }
    ],
    suitableFor: ['极限低预算备用节点用户'],
    notSuitableFor: ['需要完整公开实测数据与稳定晚高峰保障的重度用户'],
    risks: ['与大佬云、云界线、榴莲云、环球梯参数高度相似，缺乏独立实测留档'],
    auditNotes: ['5.6 元档 5 家同规格品牌之一，已如实标注数据范围。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/shandianshu'
  },
  {
    slug: 'yunjiexian',
    name: '云界线',
    enName: 'Yunjiexian',
    rankOrder: 23,
    accentColor: '#64748B',
    foundedYear: '2024',
    tagline: '5.6 元极限平价 IEPL + VLESS 方案（注意推广链接格式差异）',
    summary:
      '云界线成立于 2024 年，规格为年付折合约 5.6 元/月 60GB，采用 IEPL + VLESS 并支持第三方订阅。需注意其推广链接格式缺少 #/ 路由段且正文与汇总表邀请码存在差异。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket'],
    regions: ['亚太及北美基础地区（待核实）'],
    entryPriceCny: 5.6,
    entryPriceLabel: '年付折合约 ¥5.6/月（60GB/月）',
    entryBillingNote: '季付及以上 7 折',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: ['5.6 元极限平价档位', 'IEPL + VLESS + 第三方订阅支持', '季付及以上 7 折'],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 67.2, monthlyEquivCny: 5.6, traffic: '60GB', trafficCycle: '每月重置' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '暂无独立实测数据' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无独立实测数据' }
    ],
    suitableFor: ['极限低预算备用线路用户'],
    notSuitableFor: ['对官网规范度与独立实测数据要求较高的用户'],
    risks: ['推广链接缺少 #/ 路由段，且源文档正文（aycnwNUi）与汇总表（HBaZ91c6）邀请码不一致', '缺乏独立实测与完整套餐表'],
    auditNotes: ['已重点记录链接格式异常与双邀请码冲突。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/yunjiexian'
  },
  {
    slug: 'liulianyun',
    name: '榴莲云',
    enName: 'Liulianyun',
    rankOrder: 24,
    accentColor: '#84CC16',
    foundedYear: '2024',
    tagline: '5.6 元极限平价 IEPL 方案（协议类型待官网核实）',
    summary:
      '榴莲云 2024 年起运营，同样位于年付约 5.6 元/月 60GB 极限平价档，采用 IEPL 专线并支持自研与第三方订阅，但品牌资料未明确标明具体加密协议类型。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['待核实（品牌资料未统一提供）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', '第三方订阅（具体协议以官网为准）'],
    regions: ['基础节点地区（待核实）'],
    entryPriceCny: 5.6,
    entryPriceLabel: '年付折合约 ¥5.6/月（60GB/月）',
    entryBillingNote: '季付及以上 7 折',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: ['5.6 元极限平价年付档位', 'IEPL 专线定位', '支持自研与第三方订阅'],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 67.2, monthlyEquivCny: 5.6, traffic: '60GB', trafficCycle: '每月重置' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '暂无独立实测数据' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无独立实测数据' }
    ],
    suitableFor: ['仅看重最低预算且不挑协议的轻度备用用户'],
    notSuitableFor: ['明确需要 VLESS / Hysteria 2 等特定协议的技术用户'],
    risks: ['5.6 元档中唯一未标明具体协议的品牌，且缺少独立测速截图'],
    auditNotes: ['未推测协议类型，严格标注待核实。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/liulianyun'
  },
  {
    slug: 'shenxing',
    name: '神行加速',
    enName: 'Shenxing',
    rankOrder: 25,
    accentColor: '#0EA5E9',
    foundedYear: '2024',
    tagline: '14 元/120GB 中间年付档位，流量为 5.6 元档两倍',
    summary:
      '神行加速 2024 年起运营，切入 14 元/月（年付折算）120GB 的中间价位，提供 IEPL 专线与 VLESS 协议，支持自研客户端与第三方订阅，并标注新用户 7 折优惠。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN'],
    regions: ['亚太及北美常见地区（详细分布待核实）'],
    entryPriceCny: 14,
    entryPriceLabel: '年付折合约 ¥14/月（120GB/月）',
    entryBillingNote: '品牌资料标注新用户 7 折',
    entryTrafficGb: 120,
    paymentMethods: ['以官网结算页为准'],
    features: ['14 元/月 120GB，恰好填补 5.6 元与 20 元之间的流量空档', 'IEPL + VLESS + 双客户端支持', '新用户 7 折优惠定位'],
    plans: [
      { name: '年付中档（参考）', billingCycle: '年付', priceCny: 168, monthlyEquivCny: 14, traffic: '120GB', trafficCycle: '每月重置', recommended: true }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '暂无独立实测数据' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无独立实测数据' }
    ],
    suitableFor: ['接受年付且每月稳定消耗 80–120GB 流量的中等用量用户'],
    notSuitableFor: ['偏好月付先试水或依赖实测截图决策的用户'],
    risks: ['缺少完整套餐明细与独立节点测速截图'],
    auditNotes: ['如实标注价格为年付折算参考。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/shenxing'
  },
  {
    slug: 'huanqiuti',
    name: '环球梯',
    enName: 'Huanqiuti',
    rankOrder: 26,
    accentColor: '#475569',
    foundedYear: '2024',
    tagline: '5.6 元极限平价 IEPL + VLESS 方案（注意链接格式核验）',
    summary:
      '环球梯成立于 2024 年，提供年付约 5.6 元/月 60GB 的 IEPL + VLESS 方案，支持第三方订阅。与云界线相同，其推广链接缺少 #/ 路由段，建议注册前先确认跳转正常。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研客户端', 'Clash Verge Rev', 'Shadowrocket'],
    regions: ['基础节点地区（待核实）'],
    entryPriceCny: 5.6,
    entryPriceLabel: '年付折合约 ¥5.6/月（60GB/月）',
    entryBillingNote: '季付及以上 7 折',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: ['5.6 元极限低价年付方案', 'IEPL + VLESS + 第三方订阅支持'],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 67.2, monthlyEquivCny: 5.6, traffic: '60GB', trafficCycle: '每月重置' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '暂无独立实测数据' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '暂无独立实测数据' }
    ],
    suitableFor: ['极低预算寻找 60GB 备用线路的用户'],
    notSuitableFor: ['依赖详细实测证据与高稳定性保障的用户'],
    risks: ['推广链接格式缺少 #/ 路由段，缺乏独立测速留档'],
    auditNotes: ['已提示链接格式异常与 5.6 元同质化风险。'],
    dataStatus: 'partial',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/huanqiuti'
  },
  {
    slug: 'yinxingren',
    name: '隐形人',
    enName: 'Invisible / Yinxingren',
    rankOrder: 27,
    accentColor: '#334155',
    foundedYear: '2024',
    tagline: '企业级 IPLC 专线直连，全系专属客户端（无第三方订阅）',
    summary:
      '隐形人 2024 年起运营，定位偏中高端企业级 IPLC 专线，年付星耀风暴 109 元（80GB/月），月付白银纪元 24 元 144GB 至钻石穹顶 185 元 1.6TB，并含 680 元王者定制版，仅限官方专属客户端使用。',
    lineType: '企业级 IPLC 专线直连（品牌资料）',
    lineCategory: 'IPLC',
    protocols: ['未公开标注（专属客户端内置）'],
    clientMode: '仅专属客户端',
    supportedClients: ['隐形人专属客户端（不提供 Clash/Shadowrocket 订阅链接）'],
    regions: ['香港', '日本', '美国', '新加坡', '台湾（资料标注 60+ 节点）'],
    entryPriceCny: 9.08,
    entryPriceLabel: '¥109/年（折合约 ¥9.08/月）',
    entryBillingNote: '月付白银纪元 ¥24/月 144GB；优惠码 moon80 享 8 折',
    entryTrafficGb: 80,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '品牌资料定位企业级 IPLC 专线直连与 1 小时故障响应承诺',
      '套餐最高覆盖 1.6TB/月、1.0TB 一次性流量包及 680 元定制版',
      '全平台自带客户端一键登录'
    ],
    plans: [
      { name: '星耀风暴 365天不熄', billingCycle: '年付', priceCny: 109, monthlyEquivCny: 9.08, traffic: '80GB', trafficCycle: '每月重置' },
      { name: '隐形人 白银纪元', billingCycle: '月付', priceCny: 24, monthlyEquivCny: 24, traffic: '144GB', trafficCycle: '每月重置', recommended: true },
      { name: '隐形人 黄金序列', billingCycle: '月付', priceCny: 48, monthlyEquivCny: 48, traffic: '360GB', trafficCycle: '每月重置' },
      { name: '隐形人 铂金至臻', billingCycle: '月付', priceCny: 105, monthlyEquivCny: 105, traffic: '750GB', trafficCycle: '每月重置' },
      { name: '隐形人 钻石穹顶', billingCycle: '月付', priceCny: 185, monthlyEquivCny: 185, traffic: '1.6TB', trafficCycle: '每月重置' },
      { name: '一次性小流量', billingCycle: '一次性付费', priceCny: 229, traffic: '160GB', trafficCycle: '一次性' }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT', category: 'AI', status: 'vendor-claimed', note: '官方标注支持' },
      { service: 'Claude / Gemini / TikTok', category: 'AI', status: 'partial', note: '资料标注视节点而定，无明确全解锁保证' },
      { service: 'Netflix / Disney+ / YouTube / HBO Max', category: 'Streaming', status: 'vendor-claimed', note: '官方标注支持' }
    ],
    suitableFor: ['需要大流量档位（最高 1.6TB）且接受官方自带客户端的用户'],
    notSuitableFor: ['依赖第三方 Clash/Shadowrocket/软路由订阅及希望先看独立测速的用户'],
    risks: ['2026-10-19 测速表全部地区数据为空，无独立实测留档', '不提供试用且不支持第三方客户端', '优惠码同时记录 yxr888 与 moon80'],
    auditNotes: ['严格将“1小时修复承诺”“晚高峰零卡顿”标注为品牌方资料宣称（vendor）。'],
    dataStatus: 'vendor',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/yinxingren'
  },
  {
    slug: 'tiziyun',
    name: '梯子云',
    enName: 'LadderCloud / Tiziyun',
    rankOrder: 28,
    accentColor: '#2563EB',
    foundedYear: '2025',
    tagline: '自研全平台一键客户端 + 通用订阅双支持，年付约 7.4 元/月',
    summary:
      '梯子云 2025 年上线，主打“小白一键登录自研客户端 + 第三方通用订阅双支持”，采用 IEPL + VLESS，品牌资料标注 60+ 节点、2Gbps+ 独立带宽及 500Mbps 高峰冗余。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['自研全平台客户端', 'Clash Verge Rev', 'Shadowrocket', 'v2rayN', 'FlClash'],
    regions: ['香港', '日本', '新加坡', '美国', '台湾等 60+ 节点'],
    entryPriceCny: 7.4,
    entryPriceLabel: '年付折合约 ¥7.4/月（60GB/月）',
    entryBillingNote: '完整月付/年付多档价目表待官网核实',
    entryTrafficGb: 60,
    paymentMethods: ['以官网结算页为准'],
    features: [
      '同时保留新手一键登录客户端与进阶第三方通用订阅，灵活性优于纯专属客户端机场',
      '品牌资料标注 60+ 节点、2Gbps+ 独立带宽与 500Mbps 高峰冗余',
      '提供在线客服与工单支持'
    ],
    plans: [
      { name: '年付入门档（参考）', billingCycle: '年付', priceCny: 88.8, monthlyEquivCny: 7.4, traffic: '60GB', trafficCycle: '每月重置', recommended: true }
    ],
    unlockDataSource: '品牌资料与第三方记录',
    unlockMatrix: [
      { service: 'ChatGPT / Claude', category: 'AI', status: 'vendor-claimed', note: '品牌资料宣称支持，尚缺独立实测验证' },
      { service: 'Netflix / Disney+ / TikTok', category: 'Streaming', status: 'vendor-claimed', note: '品牌资料宣称解锁，尚缺独立实测验证' }
    ],
    suitableFor: ['既想给家人用一键客户端、自己又想在电脑/软路由用 Clash 订阅的混合需求用户'],
    notSuitableFor: ['只信任有公开多网实测截图的老牌服务商用户'],
    risks: ['2025 年新品牌，尚无独立节点测速截图', '“完美解锁”等措辞仅为品牌方资料表述'],
    auditNotes: ['按合规要求，所有品牌资料宣称已标注 vendor 属性。'],
    dataStatus: 'vendor',
    dataSource: '32家机场品牌清单.txt',
    verifiedDate: '2026-10-19',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/tiziyun'
  },
  {
    slug: 'lingdong',
    name: '灵动云',
    enName: 'Lingdong Cloud',
    rankOrder: 29,
    accentColor: '#0284C7',
    foundedYear: '2025',
    tagline: '历史实测档案完整：IEPL + VLESS，OpenAI 全区解锁亮眼但 TikTok 偏弱',
    summary:
      '灵动云为 2025 年开业的 VLESS/IEPL 专线机场，拥有 2026-07-20/21 珠海联通 9Gbps 60 节点实测摘要：吞吐处于 20–80MB/s 够用级，OpenAI 解锁表现亮眼，但存在 TikTok 失败、新台 YouTube 送中与美01失败等实测瑕疵。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['VLESS（实测确认）'],
    clientMode: '自研+第三方订阅',
    supportedClients: ['Clash Verge Rev', 'v2rayN', 'Shadowrocket'],
    regions: ['香港', '台湾', '日本', '新加坡', '美国（60 节点实测）'],
    entryPriceCny: 8.25,
    entryPriceLabel: '历史年付 ¥99（70GB/月，折合 ¥8.25/月）',
    entryBillingNote: '历史月付拂风 ¥20/月 100GB，价格记录来自 2026-08-09 历史库',
    entryTrafficGb: 70,
    paymentMethods: ['支付宝', 'USDT（微信需联系客服，历史资料）'],
    features: [
      '拥有 60 节点实测摘要记录，OpenAI 各地区基本全解锁',
      '套餐覆盖月付至三年付、三档一次性流量包与 620 元私人定制',
      '不限速不限设备'
    ],
    plans: [
      { name: '灵动·穿云', billingCycle: '年付', priceCny: 99, monthlyEquivCny: 8.25, traffic: '70GB', trafficCycle: '每月重置' },
      { name: '灵动·拂风', billingCycle: '月付', priceCny: 20, monthlyEquivCny: 20, traffic: '100GB', trafficCycle: '每月重置', recommended: true },
      { name: '灵动·驭浪', billingCycle: '月付', priceCny: 50, monthlyEquivCny: 50, traffic: '300GB', trafficCycle: '每月重置' },
      { name: '灵动·破晓', billingCycle: '月付', priceCny: 100, monthlyEquivCny: 100, traffic: '700GB', trafficCycle: '每月重置' },
      { name: '灵动·凌霄', billingCycle: '月付', priceCny: 180, monthlyEquivCny: 180, traffic: '1.5TB', trafficCycle: '每月重置' },
      { name: '灵动·闲云（小流量包）', billingCycle: '一次性付费', priceCny: 199, traffic: '150GB', trafficCycle: '一次性' }
    ],
    unlockDataSource: '实测记录',
    unlockMatrix: [
      { service: 'ChatGPT / OpenAI', category: 'AI', status: 'operational', note: '2026-07-20/21 珠海联通 60 节点实测各地区基本全解锁' },
      { service: 'TikTok', category: 'Streaming', status: 'unavailable', note: '历史实测多节点失败' },
      { service: 'YouTube', category: 'Streaming', status: 'partial', note: '新加坡/台湾节点出现送中标记' },
      { service: 'Netflix / Disney+', category: 'Streaming', status: 'partial', note: '台湾落地被识别为欧洲 ES 区域' }
    ],
    suitableFor: ['主要诉求为 OpenAI 访问且能接受 20–80MB/s 常规速度的用户'],
    notSuitableFor: ['强依赖 TikTok 运营或台湾原生流媒体解锁的用户'],
    risks: ['价格与入口记录为 2026-08-09 历史资料，现行优惠码、套餐与近 30 日状态待复核', '历史实测 HTTPS 延迟偏高且美国01整节点失败'],
    auditNotes: ['收录于清单附录历史区，已完整标注历史资料日期与实测优缺点。'],
    dataStatus: 'historical',
    dataSource: '32家机场品牌清单.txt（2026-08-09 历史库）',
    verifiedDate: '2026-08-09',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/lingdong'
  },
  {
    slug: 'langwang',
    name: '浪网',
    enName: 'WaveNet / Langwang',
    rankOrder: 30,
    accentColor: '#0369A1',
    foundedYear: '待核实',
    tagline: '历史库 IEPL 专线，覆盖年付标准至 2000GB 商业大流量档',
    summary:
      '浪网收录自 2026-08-09 历史品牌库，定位 IEPL 专线，套餐跨度涵盖 119 元年付、30–200 元月付（最高 2000GB）、三档一次性流量包与 640 元定制线路，但缺乏测速与解锁实测记录。',
    lineType: 'IEPL 专线',
    lineCategory: 'IEPL',
    protocols: ['待核实'],
    clientMode: '待核实',
    supportedClients: ['待核实'],
    regions: ['待核实'],
    entryPriceCny: 9.92,
    entryPriceLabel: '历史年付 ¥119（80GB/月，折合 ¥9.92/月）',
    entryBillingNote: '历史月付入门 ¥30/月 150GB（原截图部分字段曾遮挡）',
    entryTrafficGb: 80,
    paymentMethods: ['待核实'],
    features: ['IEPL 专线定位', '最高提供 2000GB 商业大流量档及 900GB 一次性包'],
    plans: [
      { name: '浪网 年付标准', billingCycle: '年付', priceCny: 119, monthlyEquivCny: 9.92, traffic: '80GB', trafficCycle: '每月重置' },
      { name: '浪网 入门', billingCycle: '月付', priceCny: 30, monthlyEquivCny: 30, traffic: '约150GB', trafficCycle: '每月重置' },
      { name: '浪网 进阶', billingCycle: '月付', priceCny: 70, monthlyEquivCny: 70, traffic: '450GB', trafficCycle: '每月重置' },
      { name: '浪网 高端', billingCycle: '月付', priceCny: 120, monthlyEquivCny: 120, traffic: '800GB', trafficCycle: '每月重置' },
      { name: '浪网 商业', billingCycle: '月付', priceCny: 200, monthlyEquivCny: 200, traffic: '2000GB', trafficCycle: '每月重置' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '原资料明确标注未实测' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '原资料明确标注未实测' }
    ],
    suitableFor: ['需要检索历史品牌价格档位的参考用户'],
    notSuitableFor: ['缺乏近 30 日实测数据则不考虑购买的实用派用户'],
    risks: ['缺少协议、节点、设备数、支付方式与全部测速解锁数据', '属于 2026-08-09 历史记录，现行运营状态待核实'],
    auditNotes: ['严格遵循防虚构要求，缺失字段全部标记待核实。'],
    dataStatus: 'historical',
    dataSource: '32家机场品牌清单.txt（2026-08-09 历史库）',
    verifiedDate: '2026-08-09',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/langwang'
  },
  {
    slug: 'edgenova',
    name: '边缘节点 EdgeNova',
    enName: 'EdgeNova',
    rankOrder: 31,
    accentColor: '#4F46E5',
    foundedYear: '待核实',
    tagline: '历史库 IPLC + 多线路自动分配，含 15 元限时月付小档',
    summary:
      '边缘节点 EdgeNova 收录自 2026-08-09 历史品牌库，定位高速直连与 IPLC 多线路自动分配，提供 15 元 72GB 限时月付、108 元 45GB 年付及 25–200 元极界系列套餐，支持支付宝/微信/USDT。',
    lineType: '高速直连 / IPLC + 多线路自动分配',
    lineCategory: 'IPLC',
    protocols: ['待核实'],
    clientMode: '待核实',
    supportedClients: ['待核实'],
    regions: ['待核实'],
    entryPriceCny: 9,
    entryPriceLabel: '历史年付 ¥108（45GB/月，折合 ¥9/月）',
    entryBillingNote: '历史限时月付 ¥15/月 72GB，标准月付 ¥25/月 120GB',
    entryTrafficGb: 45,
    paymentMethods: ['支付宝', '微信', 'USDT（历史资料）'],
    features: ['高速直连与 IPLC 多线路自动分配定位', '提供 15 元低价月付小档与 1000GB 极限档', '历史资料记录优惠码 TH888（8 折）'],
    plans: [
      { name: '限时年付', billingCycle: '年付', priceCny: 108, monthlyEquivCny: 9, traffic: '45GB', trafficCycle: '每月重置' },
      { name: '限时月付', billingCycle: '月付', priceCny: 15, monthlyEquivCny: 15, traffic: '72GB', trafficCycle: '每月重置', recommended: true },
      { name: '极界·标准', billingCycle: '月付', priceCny: 25, monthlyEquivCny: 25, traffic: '120GB', trafficCycle: '每月重置' },
      { name: '极界·进阶', billingCycle: '月付', priceCny: 50, monthlyEquivCny: 50, traffic: '250GB', trafficCycle: '每月重置' },
      { name: '极界·高级', billingCycle: '月付', priceCny: 100, monthlyEquivCny: 100, traffic: '500GB', trafficCycle: '每月重置' },
      { name: '极界·极限', billingCycle: '月付', priceCny: 200, monthlyEquivCny: 200, traffic: '1000GB', trafficCycle: '每月重置' }
    ],
    unlockDataSource: '待核实',
    unlockMatrix: [
      { service: 'AI 工具', category: 'AI', status: 'not-tested', note: '无独立逐项实测结果，不可推断支持' },
      { service: '主流流媒体', category: 'Streaming', status: 'not-tested', note: '无独立逐项实测结果，不可推断支持' }
    ],
    suitableFor: ['关注历史价格档位参考的用户'],
    notSuitableFor: ['需要近 30 日测速与明确协议支持后再选购的用户'],
    risks: ['2026-08-09 历史记录，缺少测速、解锁、协议及现行有效状态核验'],
    auditNotes: ['收录于清单附录历史区，已标注待核实项。'],
    dataStatus: 'historical',
    dataSource: '32家机场品牌清单.txt（2026-08-09 历史库）',
    verifiedDate: '2026-08-09',
    updatedDate: '2026-11-19',
    reviewPath: '/brands/edgenova'
  }
]

export function getBrandBySlug(slug: string): BrandRecord | undefined {
  return brands.find((b) => b.slug === slug)
}

export const featuredBrandSlugs = [
  'guangsuyun',
  'muguang',
  'feimao',
  'weifeng',
  'xingdaomeng',
  'ermao',
  'wuyou',
  'weitu',
  'firefly',
  'yifan'
]
