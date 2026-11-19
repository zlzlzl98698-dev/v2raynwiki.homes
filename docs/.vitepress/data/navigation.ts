import type { DefaultTheme } from 'vitepress'

export interface Level3Cluster {
  id: string
  slug: string
  title: string
  entryPath: string
  primaryKeyword: string
  summary: string
  plannedCount: number
}

export interface Level2Topic {
  id: string
  slug: string
  title: string
  path: string
  primaryKeyword: string
  secondaryKeywords: string[]
  intent: '商业评估' | '信息教程' | '交易决策' | '排障诊断'
  summary: string
  relatedBrands: string[]
  clusters: [Level3Cluster, Level3Cluster]
}

export interface Level1Pillar {
  id: 'airport' | 'vpn' | 'clash' | 'resources'
  title: string
  path: string
  shortDesc: string
  tagline: string
  topics: Level2Topic[]
}

export const pillars: Level1Pillar[] = [
  {
    id: 'airport',
    title: '机场推荐',
    path: '/airport/',
    shortDesc: '31 家品牌实测档案、专线排行、性价比选型与科学上网入门路径',
    tagline: '基于实测留档与透明定价的中文机场评测与选型知识库',
    topics: [
      {
        id: 'a1',
        slug: 'recommend',
        title: '机场推荐',
        path: '/airport/recommend/',
        primaryKeyword: '2026机场推荐',
        secondaryKeywords: ['靠谱机场推荐', '专线机场推荐', 'AI办公机场'],
        intent: '商业评估',
        summary: '按使用场景、预算区间、客户端兼容性与晚高峰稳定性筛选高可信机场。',
        relatedBrands: ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'xingdaomeng'],
        clusters: [
          {
            id: 'c01',
            slug: 'comprehensive-selection',
            title: '综合场景与新手选型',
            entryPath: '/airport/recommend/beginner-selection-guide',
            primaryKeyword: '新手机场怎么选',
            summary: '面向首次购买者的 5 维筛选框架：协议、线路、计费周期、订阅模式与风险控制。',
            plannedCount: 8
          },
          {
            id: 'c02',
            slug: 'ai-streaming-airports',
            title: 'AI 工具与流媒体解锁选型',
            entryPath: '/airport/recommend/ai-streaming-airport-guide',
            primaryKeyword: '支持ChatGPT和Netflix的机场',
            summary: '结合实测截图拆解 ChatGPT、Claude、Gemini 与 Netflix/Disney+ 地区节点规律。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a2',
        slug: 'ranking',
        title: '机场排行',
        path: '/airport/ranking/',
        primaryKeyword: '机场排行榜',
        secondaryKeywords: ['高速机场排名', 'IPLC机场排行', '老牌机场榜单'],
        intent: '商业评估',
        summary: '披露评测方法论、区分商业合作与独立实测指标，按场景建立透明对比榜单。',
        relatedBrands: ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'weitu'],
        clusters: [
          {
            id: 'c03',
            slug: 'speed-benchmark-ranking',
            title: '测速留档与带宽梯队',
            entryPath: '/airport/ranking/speed-benchmark-methodology',
            primaryKeyword: '机场测速排行怎么看',
            summary: '解读单线程与多线程测速、TLS RTT 与 HTTPS 延迟差异，避免被非晚高峰数据误导。',
            plannedCount: 8
          },
          {
            id: 'c04',
            slug: 'veteran-brand-ranking',
            title: '老牌运营年限与稳定性梯队',
            entryPath: '/airport/ranking/veteran-airports-analysis',
            primaryKeyword: '老牌稳定机场盘点',
            summary: '对比 2020–2023 年上线老牌服务商与 2025 新秀在套餐结构、线路冗余上的差异。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a3',
        slug: 'value',
        title: '性价比机场',
        path: '/airport/value/',
        primaryKeyword: '性价比机场推荐',
        secondaryKeywords: ['高性价比IEPL机场', '百元以内年付机场', '不限时流量包机场'],
        intent: '交易决策',
        summary: '横向拆解单 GB 流量成本、年付折算陷阱、倍率规则与一次性不限时流量包性价比。',
        relatedBrands: ['guangsuyun', 'weifeng', 'weitu', 'yifan', 'xingdaomeng'],
        clusters: [
          {
            id: 'c05',
            slug: 'price-per-gb-analysis',
            title: '套餐单价与倍率成本测算',
            entryPath: '/airport/value/price-per-gb-calculator',
            primaryKeyword: '机场套餐性价比怎么算',
            summary: '用单 GB 真实成本对比 99 元年付、20–25 元月付与 147 元永久不限时套餐。',
            plannedCount: 8
          },
          {
            id: 'c06',
            slug: 'unlimited-time-packages',
            title: '不限时一次性流量包专题',
            entryPath: '/airport/value/non-expiring-traffic-packs',
            primaryKeyword: '永久不限时流量包机场',
            summary: '针对备用线路与低频用户，对比光速云 147 永久包、星岛梦、二猫云与唯兔云不限时档。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a4',
        slug: 'stable',
        title: '稳定机场',
        path: '/airport/stable/',
        primaryKeyword: '稳定机场推荐',
        secondaryKeywords: ['晚高峰不卡机场', 'IEPL专线机场', 'IPLC专线机场'],
        intent: '商业评估',
        summary: '深入解析 IEPL、IPLC 与 BGP 中转架构，筛选适合远程办公与高频 AI 开发的稳定线路。',
        relatedBrands: ['guangsuyun', 'muguang', 'firefly', 'shanyue', 'ermao'],
        clusters: [
          {
            id: 'c07',
            slug: 'iepl-iplc-architecture',
            title: 'IEPL / IPLC 专线原理与鉴别',
            entryPath: '/airport/stable/iepl-vs-iplc-vs-relay',
            primaryKeyword: 'IEPL和IPLC专线区别',
            summary: '讲透内网过境、BGP 多线入口、公网中转与直连线路在晚高峰丢包与延迟上的本质差异。',
            plannedCount: 8
          },
          {
            id: 'c08',
            slug: 'peak-hour-stability',
            title: '晚高峰稳定性测试与多备策略',
            entryPath: '/airport/stable/evening-peak-backup-strategy',
            primaryKeyword: '晚高峰稳定科学上网方案',
            summary: '如何搭配主力专线 + 不限时备用机场，构建双冗余且不同架构的高可用代理环境。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a5',
        slug: 'cheap',
        title: '便宜机场',
        path: '/airport/cheap/',
        primaryKeyword: '便宜机场推荐',
        secondaryKeywords: ['5元机场', '10元以下机场', '学生党平价机场'],
        intent: '交易决策',
        summary: '客观评估 5.6 元至 12 元低价年付与入门月付机场的真实成本边界与防坑要点。',
        relatedBrands: ['wuyou', 'feimao', 'dalaoyun', 'shandianshu', 'guangsuyun'],
        clusters: [
          {
            id: 'c09',
            slug: 'under-10-yuan-tier',
            title: '10 元以下平价档横向避坑',
            entryPath: '/airport/cheap/under-10-yuan-audit',
            primaryKeyword: '10元以下便宜机场靠谱吗',
            summary: '拆解 5.6 元档（大佬云/闪电鼠等）与 7–8 元年付档（飞猫/无忧/光速云）的真实配置差别。',
            plannedCount: 8
          },
          {
            id: 'c10',
            slug: 'student-budget-plan',
            title: '学生党与轻度用户省钱方案',
            entryPath: '/airport/cheap/student-low-budget-guide',
            primaryKeyword: '学生党便宜机场怎么买',
            summary: '控制月均成本在 10 元以内、同时避免一次性大额踩坑的分阶段购入策略。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a6',
        slug: 'free',
        title: '免费梯子',
        path: '/airport/free/',
        primaryKeyword: '免费梯子风险与替代',
        secondaryKeywords: ['免费机场靠谱吗', '免费VPN安全吗', '低成本替代方案'],
        intent: '信息教程',
        summary: '剖析所谓“永久免费梯子”的流量劫持、隐私变现与不稳定真相，提供安全可控的应急与低价方案。',
        relatedBrands: ['wuyou', 'feimao', 'guangsuyun'],
        clusters: [
          {
            id: 'c11',
            slug: 'free-proxy-security',
            title: '免费梯子安全审计与隐私风险',
            entryPath: '/airport/free/free-ladder-security-risks',
            primaryKeyword: '免费梯子为什么不安全',
            summary: '从中间人日志、僵尸网络节点共享到恶意改包，全面拆解免费代理的隐性代价。',
            plannedCount: 8
          },
          {
            id: 'c12',
            slug: 'safe-low-cost-alternatives',
            title: '安全应急与低成本替代路线',
            entryPath: '/airport/free/safe-alternatives-to-free-vpn',
            primaryKeyword: '免费梯子安全替代方案',
            summary: '如何用开源协议客户端 + 低价不限时流量包或正规轻量年付，彻底告别免费节点折腾。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'a7',
        slug: 'guide',
        title: '科学上网',
        path: '/airport/guide/',
        primaryKeyword: '科学上网新手教程',
        secondaryKeywords: ['代理协议入门', 'VLESS与Trojan区别', '全平台配置指南'],
        intent: '信息教程',
        summary: '从零理解代理协议、节点、订阅链接、分流规则与客户端协作关系的新手系统课程。',
        relatedBrands: ['guangsuyun', 'feimao', 'yifan'],
        clusters: [
          {
            id: 'c13',
            slug: 'proxy-fundamentals',
            title: '代理协议与核心概念精讲',
            entryPath: '/airport/guide/proxy-protocols-explained',
            primaryKeyword: 'VLESS VMess Trojan Hysteria2区别',
            summary: '系统讲清 Shadowsocks、Trojan、VLESS-Reality 与 Hysteria 2 的加密特点与客户端要求。',
            plannedCount: 8
          },
          {
            id: 'c14',
            slug: 'zero-to-one-onboarding',
            title: '新手从零到稳定连网全流程',
            entryPath: '/airport/guide/beginner-complete-workflow',
            primaryKeyword: '新手怎么配置机场订阅',
            summary: '分六步完成选服务、选客户端、导入订阅、规则分流、延迟检测与日常排障。',
            plannedCount: 8
          }
        ]
      }
    ]
  },
  {
    id: 'vpn',
    title: 'VPN 与加速器',
    path: '/vpn/',
    shortDesc: '传统商业 VPN 与机场架构对比、手机端选型、游戏与办公加速器解析',
    tagline: '理清传统 VPN、专线机场与游戏加速器的技术边界与选型策略',
    topics: [
      {
        id: 'v1',
        slug: 'recommend',
        title: 'VPN 推荐',
        path: '/vpn/recommend/',
        primaryKeyword: '好用的VPN推荐',
        secondaryKeywords: ['国内能用的VPN', 'VPN与机场区别', '外贸办公VPN'],
        intent: '商业评估',
        summary: '对比传统海外商业 VPN 与国内专线优化机场在连接成功率、延迟和价格上的核心差异。',
        relatedBrands: ['guangsuyun', 'muguang', 'firefly'],
        clusters: [
          {
            id: 'c15',
            slug: 'vpn-vs-airport-architecture',
            title: '传统 VPN 与专线机场深度对比',
            entryPath: '/vpn/recommend/vpn-vs-airport-comparison',
            primaryKeyword: 'VPN和机场有什么区别',
            summary: '从加密协议栈、抗干扰能力、节点延迟、规则分流与价格结构 5 个维度全面拆解。',
            plannedCount: 8
          },
          {
            id: 'c16',
            slug: 'business-remote-vpn',
            title: '远程办公与跨境电商专用方案',
            entryPath: '/vpn/recommend/cross-border-work-network',
            primaryKeyword: '跨境办公用VPN还是机场',
            summary: '针对远程协作、GitHub/Docker 开发与社媒运营，给出低封号风险的固定落地方案。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v2',
        slug: 'free',
        title: '免费 VPN',
        path: '/vpn/free/',
        primaryKeyword: '免费VPN评测与风险',
        secondaryKeywords: ['永久免费VPN靠谱吗', '浏览器插件VPN风险', '免费VPN限速'],
        intent: '信息教程',
        summary: '系统测试和剖析常见免费 VPN 与浏览器代理插件的限速机制、数据收集条款及可用率瓶颈。',
        relatedBrands: ['wuyou', 'feimao'],
        clusters: [
          {
            id: 'c17',
            slug: 'free-vpn-business-model',
            title: '免费 VPN 盈利模式与合规隐患',
            entryPath: '/vpn/free/how-free-vpn-monetizes',
            primaryKeyword: '免费VPN靠什么赚钱',
            summary: '拆解免费增值、广告追踪、带宽共享（住宅代理池）三大常见商业模式。',
            plannedCount: 8
          },
          {
            id: 'c18',
            slug: 'browser-extension-vs-client',
            title: '浏览器代理插件与系统客户端差异',
            entryPath: '/vpn/free/browser-extension-limitations',
            primaryKeyword: 'Chrome免费VPN插件安全吗',
            summary: '为什么仅靠浏览器插件无法覆盖终端、Git、桌面 AI 应用与系统 DNS。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v3',
        slug: 'mobile',
        title: '手机 VPN',
        path: '/vpn/mobile/',
        primaryKeyword: '手机VPN推荐与配置',
        secondaryKeywords: ['安卓科学上网', 'iPhone小火箭教程', '手机省电代理'],
        intent: '信息教程',
        summary: '覆盖 Android 与 iOS 两大移动生态，解决美区 Apple ID、后台保活、省电分流与专属 App 选择问题。',
        relatedBrands: ['feimao', 'guangsuyun', 'tiziyun', 'wuyou'],
        clusters: [
          {
            id: 'c19',
            slug: 'ios-proxy-setup',
            title: 'iPhone / iPad 代理客户端配置体系',
            entryPath: '/vpn/mobile/ios-shadowrocket-vs-stash',
            primaryKeyword: 'iPhone用什么代理软件好',
            summary: '对比 Shadowrocket、Stash、Quantumult X、Streisand 与机场专属客户端的上手成本。',
            plannedCount: 8
          },
          {
            id: 'c20',
            slug: 'android-proxy-setup',
            title: 'Android 安卓代理客户端与省电优化',
            entryPath: '/vpn/mobile/android-v2rayng-vs-flclash',
            primaryKeyword: '安卓手机用v2rayNG还是FlClash',
            summary: '讲解安卓端分应用代理、电池白名单防杀后台与官方 APK 防仿冒验证。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v4',
        slug: 'reviews',
        title: 'VPN 软件评测',
        path: '/vpn/reviews/',
        primaryKeyword: 'VPN软件评测标准',
        secondaryKeywords: ['专属客户端评测', '开源客户端安全性', 'VPN协议对比'],
        intent: '商业评估',
        summary: '以统一测试维度评估商业 VPN 软件、机场自研客户端与开源通用代理客户端。',
        relatedBrands: ['guangsuyun', 'feimao', 'firefly', 'sogo', 'yinxingren'],
        clusters: [
          {
            id: 'c21',
            slug: 'proprietary-vs-open-source',
            title: '机场专属客户端 vs 开源第三方客户端',
            entryPath: '/vpn/reviews/proprietary-vs-opensource-clients',
            primaryKeyword: '机场专属客户端和Clash哪个好',
            summary: '从易用性、规则自由度、软路由兼容与隐私可审计性深度对比两种客户端形态。',
            plannedCount: 8
          },
          {
            id: 'c22',
            slug: 'vpn-evaluation-framework',
            title: '网络代理工具评测指标体系',
            entryPath: '/vpn/reviews/network-tool-benchmark-standard',
            primaryKeyword: '怎么评测一款VPN或机场',
            summary: '公开本站采用的延迟、吞吐、丢包、DNS 泄漏、WebRTC 泄漏与多时段稳定性评测框架。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v5',
        slug: 'accelerator',
        title: 'VPN 加速器',
        path: '/vpn/accelerator/',
        primaryKeyword: 'VPN加速器与游戏加速',
        secondaryKeywords: ['UDP转发加速器', 'FullCone NAT节点', '海外应用加速'],
        intent: '信息教程',
        summary: '区分传统合规游戏加速器与全网代理工具，详解 UDP FullCone NAT 对联机游戏与语音通话的关键影响。',
        relatedBrands: ['guangsuyun', 'muguang', 'yifan'],
        clusters: [
          {
            id: 'c23',
            slug: 'udp-fullcone-gaming',
            title: 'UDP 转发与 FullCone NAT 实战',
            entryPath: '/vpn/accelerator/udp-fullcone-nat-guide',
            primaryKeyword: '机场节点UDP FullCone有什么用',
            summary: '看懂测速图里的 FullCone / RestrictedCone / Unknown 含义及其对游戏与视频会议的影响。',
            plannedCount: 8
          },
          {
            id: 'c24',
            slug: 'tun-mode-app-acceleration',
            title: 'TUN 虚拟网卡接管桌面应用加速',
            entryPath: '/vpn/accelerator/tun-mode-desktop-apps',
            primaryKeyword: 'Clash开启TUN模式加速软件',
            summary: '解决系统代理无法接管终端、Docker、Steam 或客户端游戏流量的完整方案。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v6',
        slug: 'compare',
        title: '加速器对比',
        path: '/vpn/compare/',
        primaryKeyword: '网络加速器横向对比',
        secondaryKeywords: ['专线机场对比', '游戏加速器对比VPN', '跨境网络方案对比'],
        intent: '商业评估',
        summary: '针对不同网络诉求，横向比较游戏加速器、商业 VPN、IEPL 机场与自建 VPS 的综合性价比。',
        relatedBrands: ['guangsuyun', 'muguang', 'weitu', 'u1s1'],
        clusters: [
          {
            id: 'c25',
            slug: 'airport-vs-self-hosted-vps',
            title: '买机场 vs 自建 VPS（VLESS-Reality）对比',
            entryPath: '/vpn/compare/airport-vs-self-hosted-vps',
            primaryKeyword: '自建VPS和买机场哪个划算',
            summary: '从月均成本、维护耗时、晚高峰线路质量、IP 封锁风险与多地区解锁做全面算账。',
            plannedCount: 8
          },
          {
            id: 'c26',
            slug: 'game-booster-vs-proxy',
            title: '正规游戏加速器 vs 全网代理工具',
            entryPath: '/vpn/compare/game-booster-vs-proxy-client',
            primaryKeyword: '游戏加速器能当VPN用吗',
            summary: '清晰界定游戏加速器与全网代理在路由范围、延迟抖动和合规用途上的边界。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'v7',
        slug: 'best',
        title: '好用的 VPN',
        path: '/vpn/best/',
        primaryKeyword: '好用的VPN怎么挑',
        secondaryKeywords: ['Mac好用的VPN', '不限设备VPN', '看4K不卡的代理'],
        intent: '交易决策',
        summary: '按“不限设备、低延迟、4K 视频、AI 开发”等核心体验维度，给出可落地的组合选购清单。',
        relatedBrands: ['guangsuyun', 'muguang', 'xingdaomeng', 'weitu', 'firefly'],
        clusters: [
          {
            id: 'c27',
            slug: 'multi-device-family-setup',
            title: '多设备家庭与全屋路由方案',
            entryPath: '/vpn/best/multi-device-home-network',
            primaryKeyword: '多设备不限人数机场推荐',
            summary: '如何挑选不限设备数的服务商，并在电脑、手机、Apple TV 与 OpenWrt 软路由间统一配置。',
            plannedCount: 8
          },
          {
            id: 'c28',
            slug: '4k-streaming-experience',
            title: '4K/8K 流媒体与海外影音流畅指南',
            entryPath: '/vpn/best/4k-streaming-node-selection',
            primaryKeyword: '看Netflix和YouTube 4K选什么节点',
            summary: '拆解单线程速度阈值、原生 IP 区域识别与“YouTube 送中”修复方法。',
            plannedCount: 8
          }
        ]
      }
    ]
  },
  {
    id: 'clash',
    title: 'Clash 客户端',
    path: '/clash/',
    shortDesc: 'Clash Verge Rev、Mihomo 内核、订阅导入、规则分流与全平台客户端教程',
    tagline: '基于官方开源项目的 Clash / Mihomo / v2rayN 客户端实战技术手册',
    topics: [
      {
        id: 'cl1',
        slug: 'recommend',
        title: 'Clash 推荐',
        path: '/clash/recommend/',
        primaryKeyword: 'Clash客户端推荐',
        secondaryKeywords: ['Clash for Windows替代品', 'Mihomo客户端大全', '跨平台代理软件'],
        intent: '商业评估',
        summary: '在原版 Clash 归档后，系统梳理 Windows、macOS、Linux、Android、iOS 仍持续维护的官方客户端。',
        relatedBrands: ['guangsuyun', 'yifan', 'weifeng', 'weitu'],
        clusters: [
          {
            id: 'c29',
            slug: 'cfw-migration-matrix',
            title: 'Clash for Windows 停更后迁移选型',
            entryPath: '/clash/recommend/cfw-alternatives-comparison',
            primaryKeyword: 'Clash for Windows停更用什么替代',
            summary: '横向评测 Clash Verge Rev、FlClash、Clash Nyanpasu、Clash Mi 与 v2rayN 的特性与维护状态。',
            plannedCount: 8
          },
          {
            id: 'c30',
            slug: 'cross-platform-client-matrix',
            title: '全平台 20+ 代理客户端选型总表',
            entryPath: '/clash/recommend/cross-platform-client-matrix',
            primaryKeyword: '全平台代理客户端推荐',
            summary: '按 Windows/Android/iOS/macOS/Linux/OpenWrt 六大系统给出官方渠道选型建议。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl2',
        slug: 'verge',
        title: 'Clash Verge',
        path: '/clash/verge/',
        primaryKeyword: 'Clash Verge Rev 教程',
        secondaryKeywords: ['Clash Verge怎么用', 'Mihomo内核切换', 'Clash Verge设置'],
        intent: '信息教程',
        summary: '深入讲解 Clash Verge Rev 核心界面、系统代理、TUN 服务模式、全局覆写与开机自启配置。',
        relatedBrands: ['guangsuyun', 'yifan', 'xingdaomeng'],
        clusters: [
          {
            id: 'c31',
            slug: 'verge-core-setup',
            title: 'Clash Verge Rev 核心设置与服务模式',
            entryPath: '/clash/verge/service-mode-and-tun-setup',
            primaryKeyword: 'Clash Verge Rev服务模式和TUN怎么开',
            summary: '一步步完成 Service Mode 安装、TUN 接管设置、混合端口配置与代理模式选择。',
            plannedCount: 8
          },
          {
            id: 'c32',
            slug: 'verge-merge-script',
            title: '全局扩展覆写（Merge）与脚本进阶',
            entryPath: '/clash/verge/global-merge-script-guide',
            primaryKeyword: 'Clash Verge Rev全局覆写配置',
            summary: '无需手动修改每次更新都会被覆盖的机场 YAML，通过 Merge 永久保留自定义分流与 DNS。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl3',
        slug: 'verge-download',
        title: 'Clash Verge 下载',
        path: '/clash/verge-download/',
        primaryKeyword: 'Clash Verge Rev 官方下载',
        secondaryKeywords: ['Clash Verge Windows安装', 'Mac Apple Silicon Clash', 'Linux AppImage'],
        intent: '信息教程',
        summary: '教用户从官方 GitHub Releases 识别系统架构安装包、核对校验和并避开搜索引擎仿冒钓鱼站。',
        relatedBrands: ['guangsuyun', 'weifeng'],
        clusters: [
          {
            id: 'c33',
            slug: 'official-download-verification',
            title: '官方下载渠道与防钓鱼安全核验',
            entryPath: '/clash/verge-download/official-release-guide',
            primaryKeyword: 'Clash Verge Rev正版下载地址',
            summary: '区分 x64/arm64/setup/portable 安装包，识别山寨中文官网并核对 GitHub Release 签名。',
            plannedCount: 8
          },
          {
            id: 'c34',
            slug: 'macos-linux-install',
            title: 'macOS 与 Linux 多发行版安装排坑',
            entryPath: '/clash/verge-download/macos-linux-installation',
            primaryKeyword: 'Mac安装Clash Verge提示已损坏',
            summary: '解决 macOS 隔离属性报错、Apple Silicon 选包以及 Ubuntu/Debian/Arch 安装依赖问题。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl4',
        slug: 'verge-subscription',
        title: 'Clash Verge 订阅',
        path: '/clash/verge-subscription/',
        primaryKeyword: 'Clash Verge 订阅导入教程',
        secondaryKeywords: ['Clash订阅链接怎么用', '订阅更新失败', '订阅转换教程'],
        intent: '信息教程',
        summary: '详解 URL 订阅导入、本地 YAML 导入、定时自动更新、User-Agent 兼容与安全订阅转换。',
        relatedBrands: ['guangsuyun', 'yifan', 'weitu', 'tiziyun'],
        clusters: [
          {
            id: 'c35',
            slug: 'subscription-import-update',
            title: '订阅导入、自动更新与流量显示',
            entryPath: '/clash/verge-subscription/import-and-auto-update',
            primaryKeyword: 'Clash Verge怎么导入订阅链接',
            summary: '图解一键导入与手动复制 URL 两种方式，配置 24 小时自动更新与防断链代理更新。',
            plannedCount: 8
          },
          {
            id: 'c36',
            slug: 'subconverter-security',
            title: '订阅转换原理与隐私安全规范',
            entryPath: '/clash/verge-subscription/subconverter-safety-guide',
            primaryKeyword: '机场订阅转换安全吗',
            summary: '何时需要把 V2Ray/Shadowrocket 订阅转为 Clash YAML，以及如何避免在不可信后端泄露订阅。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl5',
        slug: 'meta',
        title: 'Clash Meta',
        path: '/clash/meta/',
        primaryKeyword: 'Clash Meta Mihomo 内核指南',
        secondaryKeywords: ['Mihomo协议支持', 'Reality配置', 'Fake-IP与Redir-Host'],
        intent: '信息教程',
        summary: '深入 Mihomo（原 Clash Meta）内核特性：VLESS-Reality、Hysteria 2、Sniffer 域名嗅探与 Fake-IP 机制。',
        relatedBrands: ['guangsuyun', 'yifan', 'sujie'],
        clusters: [
          {
            id: 'c37',
            slug: 'mihomo-protocols-sniffer',
            title: 'Mihomo 新协议支持与流量嗅探',
            entryPath: '/clash/meta/mihomo-reality-hysteria2',
            primaryKeyword: 'Mihomo支持哪些协议',
            summary: '对比原版 Clash 与 Mihomo 内核差异，解析 VLESS-Reality、Hysteria2 与 TLS Sniffer 配置。',
            plannedCount: 8
          },
          {
            id: 'c38',
            slug: 'dns-fakeip-architecture',
            title: 'Mihomo DNS 分流与 Fake-IP 防泄漏',
            entryPath: '/clash/meta/dns-fakeip-best-practices',
            primaryKeyword: 'Clash DNS防泄漏配置',
            summary: '彻底讲清 nameserver、fallback、default-nameserver 与 fake-ip-filter 的正确写法。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl6',
        slug: 'tutorials',
        title: 'Clash 使用教程',
        path: '/clash/tutorials/',
        primaryKeyword: 'Clash 分流规则教程',
        secondaryKeywords: ['规则模式与全局模式', 'ChatGPT指定节点分流', '局域网共享代理'],
        intent: '信息教程',
        summary: '实战导向的高频日常操作指南：规则/全局/直连切换、AI 专属策略组、局域网共享给主机与电视。',
        relatedBrands: ['guangsuyun', 'muguang', 'xingdaomeng'],
        clusters: [
          {
            id: 'c39',
            slug: 'rule-routing-groups',
            title: '策略组与 AI/流媒体定向分流',
            entryPath: '/clash/tutorials/ai-streaming-routing-rules',
            primaryKeyword: 'Clash怎么让ChatGPT走指定节点',
            summary: '配置 OpenAI、Claude、Gemini、Netflix 独立策略组，解决香港节点不可用 AI 的痛点。',
            plannedCount: 8
          },
          {
            id: 'c40',
            slug: 'lan-sharing-proxy',
            title: '局域网共享与多终端协同代理',
            entryPath: '/clash/tutorials/lan-proxy-sharing-guide',
            primaryKeyword: '电脑Clash怎么共享给手机和Switch',
            summary: '开启 Allow LAN 并放行系统防火墙，让同 Wi-Fi 下的手机、PS5、Switch 共享代理。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'cl7',
        slug: 'troubleshooting',
        title: 'Clash 故障排查',
        path: '/clash/troubleshooting/',
        primaryKeyword: 'Clash连不上网排查',
        secondaryKeywords: ['Clash有延迟打不开网页', '系统代理关闭后断网', 'TUN模式冲突'],
        intent: '排障诊断',
        summary: '按故障现象建立决策树：节点全超时、有延迟但打不开网页、退掉软件后国内断网、端口占用等。',
        relatedBrands: ['guangsuyun', 'feimao', 'weifeng'],
        clusters: [
          {
            id: 'c41',
            slug: 'connection-timeout-matrix',
            title: '节点超时与连上无网诊断树',
            entryPath: '/clash/troubleshooting/connected-no-internet-fix',
            primaryKeyword: 'Clash连接成功但打不开网页怎么办',
            summary: '按时间同步、系统代理冲突、浏览器插件接管、DNS 污染与内核版本 5 步快速定位根因。',
            plannedCount: 8
          },
          {
            id: 'c42',
            slug: 'windows-proxy-recovery',
            title: '退出断网、端口冲突与 UWP 环回修复',
            entryPath: '/clash/troubleshooting/windows-proxy-reset-guide',
            primaryKeyword: '关闭Clash后电脑上不了网怎么恢复',
            summary: '清理残留 Windows 代理注册表项、解决 7897 端口冲突并修复微软商店/UWP 应用联网。',
            plannedCount: 8
          }
        ]
      }
    ]
  },
  {
    id: 'resources',
    title: '资源与情报',
    path: '/resources/',
    shortDesc: '免费节点风险评估、机场跑路预警、节点测速方法、订阅故障库与新手百科',
    tagline: '降低踩坑成本的机场风险情报、实测检测方法论与高频问答中心',
    topics: [
      {
        id: 'r1',
        slug: 'free-nodes',
        title: '免费节点',
        path: '/resources/free-nodes/',
        primaryKeyword: '免费节点获取与风险提示',
        secondaryKeywords: ['公开订阅安全吗', '临时测试节点', '免费Clash节点真相'],
        intent: '信息教程',
        summary: '客观科普公开免费节点池的存活周期、蜜罐风控及安全隔离测试规范，不搬运来路不明的脏节点。',
        relatedBrands: ['wuyou', 'feimao', 'guangsuyun'],
        clusters: [
          {
            id: 'c43',
            slug: 'public-node-risk-analysis',
            title: '公开免费节点池存活率与风控实析',
            entryPath: '/resources/free-nodes/public-node-pool-risks',
            primaryKeyword: 'GitHub免费节点安全吗',
            summary: '分析公开节点被用于账号风控、金融登录拦截与高频失效的技术原因。',
            plannedCount: 8
          },
          {
            id: 'c44',
            slug: 'safe-testing-sandbox',
            title: '如何安全验证新订阅与节点纯净度',
            entryPath: '/resources/free-nodes/node-purity-check-guide',
            primaryKeyword: '怎么检测代理节点IP纯净度',
            summary: '利用 IP 欺诈分查询、ASN 归属检测与 DNS 泄漏工具快速辨别机房脏 IP 与原生 IP。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r2',
        slug: 'scam-alert',
        title: '跑路预警',
        path: '/resources/scam-alert/',
        primaryKeyword: '机场跑路预警与防骗指南',
        secondaryKeywords: ['灵车机场特征', '跑路前兆识别', '大额年付风险'],
        intent: '排障诊断',
        summary: '总结机场停服跑路前最常见的 8 大信号，帮助用户规避“超低价无限流量终身会员”类高危盘。',
        relatedBrands: ['guangsuyun', 'xingdaomeng', 'muguang'],
        clusters: [
          {
            id: 'c45',
            slug: 'exit-scam-warning-signs',
            title: '高危灵车特征与跑路前兆清单',
            entryPath: '/resources/scam-alert/airport-exit-scam-signals',
            primaryKeyword: '怎么判断机场会不会跑路',
            summary: '识别异常大促、工单失联、官网频繁失联、节点大面积超时与“永久不限流量”诱饵。',
            plannedCount: 8
          },
          {
            id: 'c46',
            slug: 'post-outage-contingency',
            title: '机场失联或停服后的应急切换方案',
            entryPath: '/resources/scam-alert/emergency-switch-playbook',
            primaryKeyword: '机场跑路了怎么办',
            summary: '提前保留备用订阅、离线客户端安装包与域名防失联书签，确保关键时刻不断网。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r3',
        slug: 'faq',
        title: '机场 FAQ',
        path: '/resources/faq/',
        primaryKeyword: '机场常见问题解答',
        secondaryKeywords: ['倍率是什么意思', '流量消耗异常', '同时在线设备限制'],
        intent: '信息教程',
        summary: '聚合新手与进阶用户最高频的 30+ 核心问题，采用 Answer-First 简明直答结构。',
        relatedBrands: ['guangsuyun', 'weitu', 'feimao'],
        clusters: [
          {
            id: 'c47',
            slug: 'billing-traffic-faq',
            title: '计费、倍率、重置日与退款 FAQ',
            entryPath: '/resources/faq/billing-multiplier-faq',
            primaryKeyword: '机场节点倍率是什么意思',
            summary: '讲清 0.5x/1x/2x 倍率计费、自然月 vs 账单日重置、不限时包有效期及退款常见条款。',
            plannedCount: 8
          },
          {
            id: 'c48',
            slug: 'privacy-security-faq',
            title: '隐私安全、审计规则与账号风控 FAQ',
            entryPath: '/resources/faq/privacy-audit-rules-faq',
            primaryKeyword: '机场审计规则和隐私安全',
            summary: '解释机场能看到什么流量、HTTPS 端到端加密边界以及为什么不应在代理下裸奔敏感操作。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r4',
        slug: 'risk-intel',
        title: '机场风险情报',
        path: '/resources/risk-intel/',
        primaryKeyword: '机场风险情报与同源审计',
        secondaryKeywords: ['套壳机场识别', '协议与宣传不符', '优惠码价格审计'],
        intent: '商业评估',
        summary: '公开本站对 31 家收录品牌的交叉核验发现：同质化套餐、链接异常、协议差异与历史信息时效风险。',
        relatedBrands: ['guangsuyun', 'firefly', 'yunjiexian', 'huanqiuti', 'yuzhou'],
        clusters: [
          {
            id: 'c49',
            slug: 'brand-audit-transparency',
            title: '31 家机场品牌交叉审计与异常披露',
            entryPath: '/resources/risk-intel/31-brands-audit-summary',
            primaryKeyword: '机场品牌数据真伪怎么查',
            summary: '披露 5.6 元档高度同质化、Firefly 重复条目、历史价冲突与协议标实不一致等真实审计发现。',
            plannedCount: 8
          },
          {
            id: 'c50',
            slug: 'same-upstream-diversification',
            title: '同源上游风险与多架构备份原则',
            entryPath: '/resources/risk-intel/avoid-single-upstream-failure',
            primaryKeyword: '备用机场怎么避免同上游',
            summary: '为什么买两家同系机场仍可能同时宕机，教你从落地 ASN、协议与面板特征分散风险。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r5',
        slug: 'node-check',
        title: '节点检测',
        path: '/resources/node-check/',
        primaryKeyword: '机场节点测速与解锁检测',
        secondaryKeywords: ['MiaoKo测速怎么看', '流媒体解锁测试脚本', 'DNS泄漏检测'],
        intent: '排障诊断',
        summary: '提供完整的节点自检工具箱指南：读懂测速表各项参数、识别送中 IP 与自测 AI/流媒体可用性。',
        relatedBrands: ['guangsuyun', 'lingdong', 'u1s1'],
        clusters: [
          {
            id: 'c51',
            slug: 'read-speedtest-charts',
            title: '看懂节点测速图（TLS RTT / 均速 / 峰值）',
            entryPath: '/resources/node-check/how-to-read-speedtest-charts',
            primaryKeyword: '机场测速图TLS RTT和HTTPS延迟怎么看',
            summary: '以光速云 2026-08-19 实测图为例，逐列拆解 TLS RTT、HTTPS 延迟、IPRisk、ASN 与单线程吞吐。',
            plannedCount: 8
          },
          {
            id: 'c52',
            slug: 'unlock-leak-self-check',
            title: '流媒体/AI 解锁与 IP/DNS 泄漏自测',
            entryPath: '/resources/node-check/unlock-and-dns-leak-test',
            primaryKeyword: '怎么测试节点能不能用ChatGPT和Netflix',
            summary: '手把手用浏览器工具与脚本检测 OpenAI/Gemini/Netflix 区域识别及 WebRTC 真实 IP 泄漏。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r6',
        slug: 'subscription-issues',
        title: '订阅问题',
        path: '/resources/subscription-issues/',
        primaryKeyword: '机场订阅更新失败解决',
        secondaryKeywords: ['订阅链接打不开', '节点全部消失', 'YAML语法错误'],
        intent: '排障诊断',
        summary: '集中解决订阅拉取超时、域名被污染、套餐到期、客户端版本过旧导致的协议不识别等问题。',
        relatedBrands: ['guangsuyun', 'yifan', 'kexin'],
        clusters: [
          {
            id: 'c53',
            slug: 'subscription-fetch-errors',
            title: '订阅拉取失败与超时 7 大原因修复',
            entryPath: '/resources/subscription-issues/subscription-update-failed-fix',
            primaryKeyword: 'Clash订阅更新失败怎么办',
            summary: '针对网络拦截、证书错误、开启代理更新冲突、旧版内核不支持 VLESS 等问题逐项排查。',
            plannedCount: 8
          },
          {
            id: 'c54',
            slug: 'subscription-security-hygiene',
            title: '订阅链接泄露重置与流量盗刷防护',
            entryPath: '/resources/subscription-issues/subscription-leak-reset',
            primaryKeyword: '机场订阅链接泄露怎么办',
            summary: '发现流量异常暴涨时，如何重置订阅令牌、排查局域网设备并在后台查验连接日志。',
            plannedCount: 8
          }
        ]
      },
      {
        id: 'r7',
        slug: 'beginner-help',
        title: '新手帮助',
        path: '/resources/beginner-help/',
        primaryKeyword: '代理工具新手帮助中心',
        secondaryKeywords: ['术语词汇表', '首次购买清单', '设备选择指南'],
        intent: '信息教程',
        summary: '为纯零基础用户准备的术语字典、首次购入避坑清单与按设备类型一键直达的入门路径图。',
        relatedBrands: ['guangsuyun', 'feimao', 'tiziyun'],
        clusters: [
          {
            id: 'c55',
            slug: 'glossary-dictionary',
            title: '网络代理核心术语百科词典',
            entryPath: '/resources/beginner-help/proxy-glossary-dictionary',
            primaryKeyword: '机场术语大全 IPLC IEPL BGP TUN',
            summary: '用通俗中文一次讲明白节点、落地、中转、专线、原生 IP、倍率、TUN 与 Fake-IP。',
            plannedCount: 8
          },
          {
            id: 'c56',
            slug: 'first-purchase-checklist',
            title: '新手首次购买与上线 10 步核对清单',
            entryPath: '/resources/beginner-help/first-time-buyer-checklist',
            primaryKeyword: '第一次买机场要注意什么',
            summary: '从试水预算、核对设备客户端兼容性到保存防失联入口，10 条清单直接照做不踩坑。',
            plannedCount: 8
          }
        ]
      }
    ]
  }
]

export function getTopNav(): DefaultTheme.NavItem[] {
  return pillars.map((pillar) => ({
    text: pillar.title,
    activeMatch: `^${pillar.path}`,
    items: [
      { text: `${pillar.title}总览`, link: pillar.path },
      ...pillar.topics.map((t) => ({
        text: t.title,
        link: t.path
      })),
      ...(pillar.id === 'airport'
        ? [
            { text: '品牌数据库（31家）', link: '/brands/' },
            { text: '深度评测中心', link: '/reviews/' },
            { text: '横向对比专题', link: '/comparisons/' }
          ]
        : []),
      ...(pillar.id === 'clash'
        ? [{ text: '全平台客户端中心', link: '/clients/' }]
        : [])
    ]
  }))
}

export const p1AngleDefs = [
  { key: 'comparison', suffix: '2026 参数对比与避坑清单', slugSuffix: '-comparison-checklist', priority: 'P1' },
  { key: 'beginner', suffix: '新手零基础图解步骤', slugSuffix: '-beginner-step-by-step', priority: 'P1' },
  { key: 'benchmark', suffix: '晚高峰实测表现与数据分析', slugSuffix: '-peak-hour-benchmark', priority: 'P1' },
  { key: 'troubleshoot', suffix: '常见报错与故障排查手册', slugSuffix: '-troubleshooting-guide', priority: 'P1' }
] as const

export const p2AngleDefs = [
  { key: 'cross-platform', suffix: 'Windows / macOS / 手机端适配要点', slugSuffix: '-cross-platform-setup', priority: 'P2' },
  { key: 'security', suffix: '隐私安全与风控防护规范', slugSuffix: '-security-best-practices', priority: 'P2' },
  { key: 'advanced-faq', suffix: '高频疑问与进阶配置 FAQ', slugSuffix: '-advanced-faq', priority: 'P2' }
] as const

export function getClusterP1Items(cluster: Level3Cluster) {
  return p1AngleDefs.map((def) => ({
    key: def.key,
    priority: def.priority,
    title: `${cluster.title}：${def.suffix}`,
    shortTitle: def.suffix,
    path: `${cluster.entryPath}${def.slugSuffix}`
  }))
}

export function getClusterP2Items(cluster: Level3Cluster) {
  return p2AngleDefs.map((def) => ({
    key: def.key,
    priority: def.priority,
    title: `${cluster.title}：${def.suffix}`,
    shortTitle: def.suffix,
    path: `${cluster.entryPath}${def.slugSuffix}`
  }))
}

export function getClusterAllSubItems(cluster: Level3Cluster) {
  return [...getClusterP1Items(cluster), ...getClusterP2Items(cluster)]
}

export function getSidebarConfig(): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.SidebarMulti = {}

  for (const pillar of pillars) {
    sidebar[pillar.path] = [
      {
        text: `${pillar.title}专题`,
        items: [{ text: `${pillar.title}知识库总览`, link: pillar.path }]
      },
      ...pillar.topics.map((topic) => ({
        text: topic.title,
        collapsed: false,
        items: [
          { text: `${topic.title}导览`, link: topic.path },
          ...topic.clusters.map((cluster) => ({
            text: cluster.title,
            collapsed: true,
            items: [
              { text: `${cluster.title}（核心入口）`, link: cluster.entryPath },
              ...getClusterAllSubItems(cluster).map((sub) => ({
                text: sub.shortTitle,
                link: sub.path
              }))
            ]
          }))
        ]
      })),
      {
        text: '关联数据库与工具',
        collapsed: true,
        items: [
          { text: '31 家机场品牌数据库', link: '/brands/' },
          { text: '光速云旗舰深度评测', link: '/reviews/guangsuyun' },
          { text: '全平台客户端中心', link: '/clients/' },
          { text: '品牌横向对比中心', link: '/comparisons/' }
        ]
      }
    ]
  }

  sidebar['/brands/'] = [
    {
      text: '机场品牌数据库',
      items: [
        { text: '31 家品牌检索总表', link: '/brands/' },
        { text: '光速云深度评测（重点）', link: '/reviews/guangsuyun' },
        { text: '品牌深度评测中心', link: '/reviews/' },
        { text: '横向对比专题', link: '/comparisons/' }
      ]
    },
    {
      text: '核心实测与热门品牌',
      collapsed: false,
      items: [
        { text: '光速云（详细档案）', link: '/brands/guangsuyun' },
        { text: '暮光加速', link: '/brands/muguang' },
        { text: '飞猫云', link: '/brands/feimao' },
        { text: '微风网络', link: '/brands/weifeng' },
        { text: '星岛梦', link: '/brands/xingdaomeng' },
        { text: '二猫云', link: '/brands/ermao' },
        { text: '无忧链接', link: '/brands/wuyou' },
        { text: '唯兔云', link: '/brands/weitu' },
        { text: 'Firefly（萤火虫）', link: '/brands/firefly' },
        { text: '一翻云', link: '/brands/yifan' }
      ]
    },
    {
      text: '更多收录品牌',
      collapsed: true,
      items: [
        { text: '大佬云', link: '/brands/dalaoyun' },
        { text: '宇宙云', link: '/brands/yuzhou' },
        { text: 'U1S1', link: '/brands/u1s1' },
        { text: '灵猫网络', link: '/brands/lingmao' },
        { text: '极连云', link: '/brands/jilian' },
        { text: '光年梯', link: '/brands/guangnian' },
        { text: 'SOGO 云', link: '/brands/sogo' },
        { text: '可信云', link: '/brands/kexin' },
        { text: '速界', link: '/brands/sujie' },
        { text: '闪跃', link: '/brands/shanyue' },
        { text: '全球云', link: '/brands/quanqiu' },
        { text: '闪电鼠', link: '/brands/shandianshu' },
        { text: '云界线', link: '/brands/yunjiexian' },
        { text: '榴莲云', link: '/brands/liulianyun' },
        { text: '神行加速', link: '/brands/shenxing' },
        { text: '环球梯', link: '/brands/huanqiuti' },
        { text: '隐形人', link: '/brands/yinxingren' },
        { text: '梯子云', link: '/brands/tiziyun' },
        { text: '灵动云（历史）', link: '/brands/lingdong' },
        { text: '浪网（历史）', link: '/brands/langwang' },
        { text: '边缘节点 EdgeNova（历史）', link: '/brands/edgenova' }
      ]
    }
  ]

  sidebar['/reviews/'] = [
    {
      text: '品牌深度评测中心',
      items: [
        { text: '评测总览与方法论', link: '/reviews/' },
        { text: '光速云旗舰深度评测（重点）', link: '/reviews/guangsuyun' },
        { text: '31 家品牌数据库', link: '/brands/' },
        { text: '横向对比专题', link: '/comparisons/' }
      ]
    },
    {
      text: '前十热门品牌深度评测',
      collapsed: false,
      items: [
        { text: '暮光加速深度评测', link: '/reviews/muguang' },
        { text: '飞猫云深度评测', link: '/reviews/feimao' },
        { text: '微风网络深度评测', link: '/reviews/weifeng' },
        { text: '大佬云深度评测', link: '/reviews/dalaoyun' },
        { text: '星岛梦深度评测', link: '/reviews/xingdaomeng' },
        { text: '隐形人深度评测', link: '/reviews/yinxingren' },
        { text: '二猫云深度评测', link: '/reviews/ermao' },
        { text: '无忧链接深度评测', link: '/reviews/wuyou' },
        { text: '唯兔云深度评测', link: '/reviews/weitu' },
        { text: 'Firefly（萤火虫）深度评测', link: '/reviews/firefly' }
      ]
    }
  ]

  sidebar['/comparisons/'] = [
    {
      text: '横向对比中心',
      items: [
        { text: '全部对比专题总览', link: '/comparisons/' },
        { text: '光速云 vs 暮光加速 vs 飞猫云', link: '/comparisons/guangsuyun-vs-muguang-vs-feimao' },
        { text: '5.6 元极限平价档 5 家对比', link: '/comparisons/budget-5-yuan-tier-comparison' },
        { text: 'IEPL / IPLC 主流专线对比', link: '/comparisons/iepl-iplc-flagship-comparison' },
        { text: '专属客户端 vs 第三方订阅对比', link: '/comparisons/proprietary-vs-subscription-airports' },
        { text: 'ChatGPT / Claude / Gemini AI 解锁对比', link: '/comparisons/ai-tools-airport-comparison' }
      ]
    }
  ]

  sidebar['/clients/'] = [
    {
      text: '第三方代理客户端中心',
      items: [
        { text: '全平台 20+ 客户端总览', link: '/clients/' },
        { text: 'Windows 电脑客户端', link: '/clients/windows' },
        { text: 'Android 安卓客户端', link: '/clients/android' },
        { text: 'iPhone / iPad 客户端', link: '/clients/ios' },
        { text: 'macOS 苹果电脑客户端', link: '/clients/macos' },
        { text: 'Linux 桌面与主机客户端', link: '/clients/linux' },
        { text: 'OpenWrt / 软路由客户端', link: '/clients/openwrt' }
      ]
    },
    {
      text: '延伸教程专题',
      items: [
        { text: 'Clash Verge Rev 专题', link: '/clash/verge/' },
        { text: 'Clash 故障排查中心', link: '/clash/troubleshooting/' },
        { text: '节点检测与测速指南', link: '/resources/node-check/' }
      ]
    }
  ]

  sidebar['/about/'] = [
    {
      text: '关于 v2rayn百科',
      items: [
        { text: '站点说明与商业推广披露', link: '/about/' },
        { text: '隐私政策与免责声明', link: '/about/privacy' },
        { text: 'Algolia 搜索与部署维护说明', link: '/about/search-and-maintenance' }
      ]
    }
  ]

  return sidebar
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export function resolveBreadcrumbs(routePath: string): BreadcrumbItem[] {
  const clean = routePath.replace(/\.html$/, '').replace(/\/index$/, '/')
  const crumbs: BreadcrumbItem[] = [{ label: '首页', path: '/' }]
  if (clean === '/' || clean === '') return crumbs

  for (const pillar of pillars) {
    if (clean === pillar.path || clean.startsWith(pillar.path)) {
      crumbs.push({ label: pillar.title, path: pillar.path })
      for (const topic of pillar.topics) {
        if (clean === topic.path || clean.startsWith(topic.path)) {
          crumbs.push({ label: topic.title, path: topic.path })
          for (const cluster of topic.clusters) {
            if (clean === cluster.entryPath || clean === `${cluster.entryPath}/`) {
              crumbs.push({ label: cluster.title })
              return crumbs
            }
            for (const sub of getClusterAllSubItems(cluster)) {
              if (clean === sub.path || clean === `${sub.path}/`) {
                crumbs.push({ label: cluster.title, path: cluster.entryPath })
                crumbs.push({ label: sub.shortTitle })
                return crumbs
              }
            }
          }
          return crumbs
        }
      }
      return crumbs
    }
  }

  if (clean.startsWith('/brands')) {
    crumbs.push({ label: '品牌数据库', path: '/brands/' })
    if (clean !== '/brands/' && clean !== '/brands') {
      crumbs.push({ label: '品牌详情档案' })
    }
  } else if (clean.startsWith('/reviews')) {
    crumbs.push({ label: '深度评测', path: '/reviews/' })
    if (clean !== '/reviews/' && clean !== '/reviews') {
      crumbs.push({ label: '专题评测' })
    }
  } else if (clean.startsWith('/comparisons')) {
    crumbs.push({ label: '横向对比', path: '/comparisons/' })
    if (clean !== '/comparisons/' && clean !== '/comparisons') {
      crumbs.push({ label: '对比分析' })
    }
  } else if (clean.startsWith('/clients')) {
    crumbs.push({ label: '客户端中心', path: '/clients/' })
    if (clean !== '/clients/' && clean !== '/clients') {
      crumbs.push({ label: '平台客户端教程' })
    }
  } else if (clean.startsWith('/about')) {
    crumbs.push({ label: '关于本站', path: '/about/' })
  }

  return crumbs
}
