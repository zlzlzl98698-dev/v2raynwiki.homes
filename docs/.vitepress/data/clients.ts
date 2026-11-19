export type PlatformKey = 'windows' | 'android' | 'ios' | 'macos' | 'linux' | 'openwrt'

export interface ClientItem {
  id: string
  name: string
  platforms: PlatformKey[]
  core: string
  protocols: string[]
  pricing: '免费开源' | '付费应用' | '免费/含内购'
  officialUrl: string
  sourceLabel: string
  docPath: string
  summary: string
  caution?: string
  recommended?: boolean
}

export const clientPlatforms: Array<{ key: PlatformKey; label: string; path: string; note: string }> = [
  { key: 'windows', label: 'Windows 电脑', path: '/clients/windows', note: '区分 x64 与 ARM64 安装包，推荐优先从 GitHub Releases 下载' },
  { key: 'android', label: 'Android 安卓', path: '/clients/android', note: '优先核对 arm64-v8a APK 签名，警惕非官方商店仿冒包' },
  { key: 'ios', label: 'iPhone / iPad', path: '/clients/ios', note: '国区 App Store 不上架代理客户端，需使用非国区 Apple ID 下载' },
  { key: 'macos', label: 'macOS 苹果电脑', path: '/clients/macos', note: '务必区分 Apple Silicon (arm64) 与 Intel (x64) 版本' },
  { key: 'linux', label: 'Linux 桌面与主机', path: '/clients/linux', note: '提供 DEB / RPM / AppImage 及无桌面 Web UI（v2rayA）方案' },
  { key: 'openwrt', label: 'OpenWrt / 软路由', path: '/clients/openwrt', note: '安装前须核对 OpenWrt 版本、CPU 架构、nftables/fw4 防火墙依赖' }
]

export const proxyClients: ClientItem[] = [
  {
    id: 'clash-verge-rev',
    name: 'Clash Verge Rev',
    platforms: ['windows', 'macos', 'linux'],
    core: 'Mihomo (Clash Meta)',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clash/verge/',
    summary: '当前桌面端最主流的 Mihomo 图形界面客户端，支持订阅管理、规则覆写、DNS 分流与系统级 TUN 虚拟网卡模式。',
    recommended: true
  },
  {
    id: 'v2rayn',
    name: 'v2rayN',
    platforms: ['windows', 'macos', 'linux'],
    core: 'Xray-core / sing-box / Mihomo',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'WireGuard'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/2dust/v2rayN',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/windows#v2rayn',
    summary: '经典多核心桌面客户端，现已支持 Windows、macOS 与 Linux，适合多协议节点管理与细粒度路由分流。',
    recommended: true
  },
  {
    id: 'flclash',
    name: 'FlClash',
    platforms: ['windows', 'android', 'macos', 'linux'],
    core: 'Mihomo (Clash Meta)',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/chen08209/FlClash',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/windows#flclash',
    summary: '基于 Flutter 构建的跨平台 Mihomo 客户端，界面现代简洁，桌面与安卓操作逻辑高度统一。',
    recommended: true
  },
  {
    id: 'clash-nyanpasu',
    name: 'Clash Nyanpasu',
    platforms: ['windows', 'macos', 'linux'],
    core: 'Mihomo / Clash RS 多内核',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/libnyanpasu/clash-nyanpasu',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clash/recommend/',
    summary: '注重配置增强与多内核切换的桌面端 Clash 图形客户端，适合习惯自定义脚本和配置文件覆写的进阶用户。'
  },
  {
    id: 'hiddify',
    name: 'Hiddify',
    platforms: ['windows', 'android', 'ios', 'macos', 'linux'],
    core: 'sing-box',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC', 'SSH'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/hiddify/hiddify-app',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/android#hiddify',
    summary: '基于 sing-box 的全平台开源客户端，自动兼容多种订阅格式与智能选点，非常适合跨平台新手快速上手。',
    recommended: true
  },
  {
    id: 'karing',
    name: 'Karing',
    platforms: ['windows', 'android', 'ios', 'macos', 'linux'],
    core: 'sing-box',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/KaringX/karing',
    sourceLabel: 'GitHub / App Store',
    docPath: '/clients/ios#karing',
    summary: '面向新手优化的 sing-box 系跨平台工具，内置常见分流规则集，兼容 Clash、V2Ray、sing-box 订阅。'
  },
  {
    id: 'clash-mi',
    name: 'Clash Mi',
    platforms: ['windows', 'android', 'ios', 'macos', 'linux'],
    core: 'Mihomo',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/KaringX/clashmi',
    sourceLabel: 'GitHub / App Store',
    docPath: '/clients/macos#clash-mi',
    summary: '轻量级多平台 Mihomo 图形客户端，原生使用 Clash YAML 配置，适合全端保持同一份规则订阅。'
  },
  {
    id: 'mihomo-party',
    name: 'Mihomo Party',
    platforms: ['windows', 'macos', 'linux'],
    core: 'Mihomo',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/mihomo-party-org/clash-party',
    sourceLabel: 'GitHub 仓库',
    docPath: '/clash/meta/',
    summary: 'Mihomo 系配置与分流管理客户端，适合历史教程检索与配置迁移场景。',
    caution: '请单独核对项目最新维护状态与仓库迁移说明，新装机优先考虑 Clash Verge Rev 或 FlClash。'
  },
  {
    id: 'v2rayng',
    name: 'v2rayNG',
    platforms: ['android'],
    core: 'Xray-core',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'WireGuard'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/2dust/v2rayNG',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/android#v2rayng',
    summary: '安卓端装机量最高的 Xray 系开源客户端，轻量省电，支持单节点链接扫码与订阅分组更新。',
    recommended: true
  },
  {
    id: 'cmfa',
    name: 'Clash Meta for Android',
    platforms: ['android'],
    core: 'Mihomo (Clash Meta)',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/MetaCubeX/ClashMetaForAndroid',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/android#cmfa',
    summary: 'Mihomo 官方生态的安卓规则代理客户端，适合熟悉经典 Clash 策略组与规则覆写的用户。'
  },
  {
    id: 'nekobox',
    name: 'NekoBox for Android',
    platforms: ['android'],
    core: 'sing-box',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/MatsuriDayo/NekoBoxForAndroid',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/android#nekobox',
    summary: '功能丰富的 sing-box 系安卓客户端，适合有一定配置基础的进阶用户。',
    caution: '官方项目已提示维护资源有限，并特别警告切勿下载 Google Play 上被第三方控制的同名版本，仅从 GitHub 获取。'
  },
  {
    id: 'sing-box',
    name: 'sing-box 官方客户端 (SFA/SFI/SFM)',
    platforms: ['android', 'ios', 'macos', 'linux'],
    core: 'sing-box 原生',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC', 'AnyTLS'],
    pricing: '免费开源',
    officialUrl: 'https://sing-box.sagernet.org/',
    sourceLabel: 'sing-box 官方文档',
    docPath: '/clients/linux#sing-box',
    summary: 'SagerNet 官方维护的原生多平台客户端，原生支持 JSON 配置与前沿传输协议（含 AnyTLS 等）。'
  },
  {
    id: 'shadowrocket',
    name: 'Shadowrocket（小火箭）',
    platforms: ['ios'],
    core: '自研多协议内核',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '付费应用',
    officialUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
    sourceLabel: '美区 App Store',
    docPath: '/clients/ios#shadowrocket',
    summary: 'iOS 平台最普及的规则代理软件，兼容几乎所有主流机场订阅，支持模块重写与连接日志排查。',
    caution: '美区 App Store 显示为付费应用（以所属商店区域实际售价与上架状态为准）。',
    recommended: true
  },
  {
    id: 'stash',
    name: 'Stash',
    platforms: ['ios', 'macos'],
    core: 'Clash 兼容内核',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '付费应用',
    officialUrl: 'https://apps.apple.com/us/app/stash-rule-based-proxy/id1596063349',
    sourceLabel: 'App Store',
    docPath: '/clients/ios#stash',
    summary: '原生兼容 Clash YAML 策略组、规则集与覆写语法的苹果生态代理工具。',
    caution: '美区 App Store 为付费应用，实际价格以所在地区商店为准。'
  },
  {
    id: 'quantumult-x',
    name: 'Quantumult X（圈 X）',
    platforms: ['ios'],
    core: '自研规则引擎',
    protocols: ['VMess', 'Trojan', 'Shadowsocks', 'VLESS'],
    pricing: '付费应用',
    officialUrl: 'https://apps.apple.com/us/app/quantumult-x/id1443988620',
    sourceLabel: 'App Store',
    docPath: '/clients/ios#quantumult-x',
    summary: '主打高度自定义分流、HTTP 请求重写、JavaScript 脚本与自定义 DNS 的 iOS 进阶网络工具。',
    caution: '美区 App Store 为付费应用，上手门槛高于 Shadowrocket。'
  },
  {
    id: 'surge',
    name: 'Surge 5 / Surge Mac',
    platforms: ['ios', 'macos'],
    core: 'Surge 网络引擎',
    protocols: ['Shadowsocks', 'VMess', 'Trojan', 'Hysteria2', 'TUIC', 'Snell'],
    pricing: '免费/含内购',
    officialUrl: 'https://nssurge.com/',
    sourceLabel: 'Surge 官网 / App Store',
    docPath: '/clients/macos#surge',
    summary: '专业级苹果生态网络调试与规则代理套件，支持 Ponte 异地组网、完整抓包分析与精细化策略控制。',
    caution: '包含应用内购买或独立授权许可，适合专业开发者与高阶网络调试需求。'
  },
  {
    id: 'streisand',
    name: 'Streisand',
    platforms: ['ios'],
    core: 'Xray / sing-box',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://apps.apple.com/us/app/streisand/id6450534064',
    sourceLabel: 'App Store',
    docPath: '/clients/ios#streisand',
    summary: 'iOS 端少见的免费多协议代理客户端，支持主流 VLESS/VMess/Trojan/Hysteria2 订阅导入。'
  },
  {
    id: 'v2raya',
    name: 'v2rayA',
    platforms: ['linux', 'openwrt'],
    core: 'Xray / V2Ray / sing-box',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/v2rayA/v2rayA',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/linux#v2raya',
    summary: '提供浏览器 Web 管理界面的 Linux 透明代理客户端，非常适合无桌面服务器、NAS 与 Linux 旁路由。'
  },
  {
    id: 'openclash',
    name: 'OpenClash',
    platforms: ['openwrt'],
    core: 'Mihomo (Clash Meta)',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/vernesong/OpenClash',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/openwrt#openclash',
    summary: 'OpenWrt 生态使用最广泛的 Clash 透明代理插件，支持 Fake-IP、Redir-Host、自定义规则覆写与定时订阅更新。',
    recommended: true
  },
  {
    id: 'passwall2',
    name: 'PassWall2',
    platforms: ['openwrt'],
    core: 'Xray / sing-box',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/xiaorouji/openwrt-passwall2',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/openwrt#passwall2',
    summary: '基于 Xray/sing-box 路由分流的轻量 OpenWrt 透明代理插件，低内存路由器运行更省资源。'
  },
  {
    id: 'nikki',
    name: 'Nikki',
    platforms: ['openwrt'],
    core: 'Mihomo',
    protocols: ['VLESS', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/nikkinikki-org/OpenWrt-nikki',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/openwrt#nikki',
    summary: '面向新版 OpenWrt nftables/fw4 架构设计的现代化 Mihomo 透明代理插件。',
    caution: '项目明确要求 OpenWrt 24.10 及以上版本，旧版固件请勿直接安装。'
  },
  {
    id: 'homeproxy',
    name: 'HomeProxy',
    platforms: ['openwrt'],
    core: 'sing-box',
    protocols: ['VLESS-Reality', 'VMess', 'Trojan', 'Shadowsocks', 'Hysteria2', 'TUIC'],
    pricing: '免费开源',
    officialUrl: 'https://github.com/immortalwrt/homeproxy',
    sourceLabel: 'GitHub 官方仓库',
    docPath: '/clients/openwrt#homeproxy',
    summary: 'ImmortalWrt 团队维护的原生 sing-box 路由代理管理界面，结构清爽、与新版防火墙契合度高。'
  }
]
