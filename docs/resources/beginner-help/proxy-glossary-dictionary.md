---
title: 网络代理核心术语百科词典：IPLC / IEPL / BGP / TUN / Fake-IP 一文读懂
description: 用通俗中文一次讲明白节点、落地、中转、专线、原生 IP、倍率、TUN 与 Fake-IP。 围绕「机场术语大全 IPLC IEPL BGP TUN」提供直接结论、实操步骤、对比表格、底层技术配置与常见问题解答。
date: 2026-10-19
updatedDate: 2026-11-19
category: 资源与情报 / 新手帮助
author: v2rayn百科技术组
relatedBrands:
  - guangsuyun
  - feimao
  - tiziyun
related:
  - title: "网络代理核心术语百科词典：2026 参数对比与避坑清单"
    link: "/resources/beginner-help/proxy-glossary-dictionary-comparison-checklist"
    desc: "机场术语大全 IPLC IEPL BGP TUN · 2026 参数对比与避坑清单"
  - title: "网络代理核心术语百科词典：新手零基础图解步骤"
    link: "/resources/beginner-help/proxy-glossary-dictionary-beginner-step-by-step"
    desc: "机场术语大全 IPLC IEPL BGP TUN · 新手零基础图解步骤"
  - title: "网络代理核心术语百科词典：晚高峰实测表现与数据分析"
    link: "/resources/beginner-help/proxy-glossary-dictionary-peak-hour-benchmark"
    desc: "机场术语大全 IPLC IEPL BGP TUN · 晚高峰实测表现与数据分析"
  - title: "网络代理核心术语百科词典：常见报错与故障排查手册"
    link: "/resources/beginner-help/proxy-glossary-dictionary-troubleshooting-guide"
    desc: "机场术语大全 IPLC IEPL BGP TUN · 常见报错与故障排查手册"
  - title: "网络代理核心术语百科词典：Windows / macOS / 手机端适配要点"
    link: "/resources/beginner-help/proxy-glossary-dictionary-cross-platform-setup"
    desc: "机场术语大全 IPLC IEPL BGP TUN · Windows / macOS / 手机端适配要点"
  - title: "网络代理核心术语百科词典：隐私安全与风控防护规范"
    link: "/resources/beginner-help/proxy-glossary-dictionary-security-best-practices"
    desc: "机场术语大全 IPLC IEPL BGP TUN · 隐私安全与风控防护规范"
keywords:
  - 机场术语大全 IPLC IEPL BGP TUN
  - 代理工具新手帮助中心
  - 术语词汇表
  - 首次购买清单
  - 设备选择指南
faq:
  - q: "为什么大家把提供代理节点的服务商叫做“机场”？"
    a: "早期主流客户端图标是一架纸飞机（Shadowsocks），提供大量“纸飞机节点”集合的平台便被中文社区形象地称为“机场”。"
  - q: "新手第一次买机场，选哪几家试水容错率最高？"
    a: "如果自己愿意花 5 分钟装 Clash Verge Rev 或小火箭，优先看同时支持自研端与通用订阅且有实测留档的品牌（如光速云 ¥25 极速月付、唯兔云 ¥19.9 月付或星岛梦 ¥25 月付）；如果完全不想配任何订阅只想装 App 登录即连，可看飞猫云或无忧链接。"
  - q: "买完后为什么微信和国内网页变慢了？"
    a: "99% 是不小心把客户端顶部模式选成了「全局（Global）」。立刻改回「规则（Rule）」即可让国内网站瞬间恢复本地宽带满速。"
  - q: "以后换新电脑或换新手机，原来的订阅还要重新花钱买吗？"
    a: "不用，只要你的套餐还在有效期内，在新设备上安装对应开源客户端并导入同一个订阅链接即可继续使用。"
---

# 网络代理核心术语百科词典：IPLC / IEPL / BGP / TUN / Fake-IP 一文读懂

<div class="kb-answer-first">
  <div class="kb-answer-first-label">直接结论 · Answer-First</div>
  <p>新手看教程常被一堆英文缩写劝退。本文用最直白的大白话汇总 16 个高频核心术语，覆盖线路架构、协议栈、客户端模式与测速指标，读完即可无障碍看懂全站教程与品牌评测。</p>
</div>

## 一、网络代理核心术语百科词典核心背景与标准实操步骤

<div class="kb-steps">
  <div class="kb-step"><div class="kb-step-num">1</div><div><strong>线路与节点类术语</strong>：**机场**：提供多地区代理节点订阅的服务商；**落地**：最终访问目标网站的海外出口服务器；**中转（Relay）**：在国内先收流再转发至海外落地；**IEPL / IPLC**：绕开拥堵民用公网的企业级跨境内网专线；**BGP**：支持电信/联通/移动三网智能优化接入的多线机房。</div></div>
  <div class="kb-step"><div class="kb-step-num">2</div><div><strong>客户端与模式类术语</strong>：**订阅（Subscription）**：一键同步几十个节点与分流规则的专属链接；**规则模式（Rule）**：国内直连、海外代理的智能模式；**全局模式（Global）**：全部流量强行走代理；**TUN 模式**：虚拟网卡，接管终端与桌面软件全部流量；**Fake-IP**：虚拟 IP 映射技术，消除本地 DNS 污染。</div></div>
  <div class="kb-step"><div class="kb-step-num">3</div><div><strong>计费与测速类术语</strong>：**倍率（1x / 2x）**：流量扣费系数；**原生 IP**：注册地与机房所在地一致、流媒体/AI 解锁友好的 IP；**送中**：海外 IP 被 Google 误判回中国大陆；**TLS RTT**：加密握手往返延迟；**FullCone**：最适合游戏联机的完全圆锥形 UDP NAT。</div></div>
</div>

## 二、机场术语大全 IPLC IEPL BGP TUN关键维度速查对照表

| 高频术语 | 一句话通俗解释 | 延伸阅读 |
| --- | --- | --- |
| IEPL / IPLC | 不经民用公网国际出口的企业级跨境内网专线 | /airport/stable/iepl-vs-iplc-vs-relay |
| Mihomo | 原 Clash Meta，目前主流开源规则代理内核 | /clash/meta/mihomo-reality-hysteria2 |
| TUN 模式 | 创建虚拟网卡接管终端、Docker 与桌面游戏 | /clash/verge/service-mode-and-tun-setup |
| Fake-IP | 防止 DNS 污染并提速的虚拟 IP 映射机制 | /clash/meta/dns-fakeip-best-practices |
| FullCone NAT | 对 Switch/PS5 联机与语音通话最友好的 UDP 类型 | /vpn/accelerator/udp-fullcone-nat-guide |

## 机场术语大全 IPLC IEPL BGP TUN底层技术机制与工程配置基准

要从根本上把「网络代理核心术语百科词典」跑通且保持跨季度稳定，不能只看界面上的开关按钮，还需要掌握链路加密、入口分发与客户端分流之间的协作原理：

### 新手帮助架构机制拆解

在「新手帮助」专题中，把 16 个核心术语与购前 10 步核对清单串起来，能帮你直接跨过 90% 的前期信息差。最重要的是区分三个概念：**协议（Protocol）**决定怎么加密传输（如 VLESS/Trojan/SS），**线路（Line）**决定走公网还是 IEPL/IPLC 专线跨海，**客户端（Client）**决定你本机用什么软件把规则跑起来。记住一条黄金法则：**首单月付试水、保留通用订阅能力、保持规则模式（Rule）、配置异构备用包**。

### 新手机场购前与上线 10 秒速记口诀

```text
购前五问：1.支持Clash/小火箭吗? 2.写的是年付均价还是真月付? 3.全节点1x倍率吗? 4.有2026实测图吗? 5.支持月付试水吗?
上线五做：1.GitHub官方下软件 2.导入后点激活卡片 3.模式锁在Rule规则 4.AI选新/日/美避香港 5.留一份不限时应急包
```

### 实施验收清单（新手零失误全链路核对表）

1. 桌面主力优先使用持续维护的 **Clash Verge Rev（Mihomo 内核）** 或 **v2rayN**，确保 VLESS-Reality 与 Hysteria 2 新协议零异常兼容。
2. 日常代理模式保持 **规则（Rule）**，国内网盘、系统更新与内网地址务必直连（`DIRECT`），防止白白消耗月度高速流量配额。
3. 所有测速指标均须核对其采样运营商与测试日期（如 `2026-08-19` 三网 2Gbps 或 `2026-08-11` 批次），新品牌坚持先月付后年付。

## 网络代理核心术语百科词典：3 家实测品牌全维核验矩阵

围绕「机场术语大全 IPLC IEPL BGP TUN」做架构与服务商联动判断时，下表严格引用本站 31 家独立核实库中的原始建档数据，区分实时测试样本与厂商自述口径：

| 品牌 | 运营起始 | 线路 | 客户端模式 | 入门参考价 | 一次性不限时 | 香港采样 | 新加坡采样 | 优惠码 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [光速云](/reviews/guangsuyun) | 2020 | IEPL | 自研+第三方订阅 | ¥99/年（折合约 ¥8.25/月） | ¥147/247GB | 22ms / 529Mbps | 46ms / 387Mbps | `AMM` |
| [飞猫云](/reviews/feimao) | 2023 | 混合专线 | 仅专属客户端 | ¥84/年（折合 ¥7/月） | ¥680/1000GB | 21ms / 526Mbps | 45ms / 413Mbps | `flycat888` |
| [梯子云](/brands/tiziyun) | 2025 | IEPL | 自研+第三方订阅 | 年付折合约 ¥7.4/月（60GB/月） | 未单列 | 缺统一图 | 缺统一图 | `tiziyun` |

### 逐品牌适配结论与边界提示

#### 1. 光速云（Guangsuyun）核心建档结论
- **深度页入口**：[光速云 详情与分析](/reviews/guangsuyun) ｜ [全量字段档案](/reviews/guangsuyun)
- **传输与兼容**：IEPL 专线 + 企业级内网专线（部分档位标注全球 IPLC），协议 `VLESS / Shadowsocks（实测截图） / AnyTLS（电信专线截图）`，兼容 自研全平台客户端、Clash Verge Rev、Shadowrocket、v2rayN、FlClash。
- **实况审计备注**：归档 6 张实测图（最近批次：2026-08-19（长沙电信 2Gbps / MiaoKo），图面协议：Shadowsocks）。 AI 适配：ChatGPT / OpenAI（partial）、Gemini（partial）、Claude（vendor-claimed）。 核心风控：特殊商品与年付/永久套餐不支持退款，建议先购入极速版月付实测晚高峰；不同协议批次（Shadowsocks vs VLESS）实测表现存在差异，且美国个别节点出现低速异常；历史文案中曾出现轻量版 59GB 与 69GB 的流量表述差异，下单前以官网结算页为准。

#### 2. 飞猫云（FlyCat / Feimao）核心建档结论
- **深度页入口**：[飞猫云 详情与分析](/reviews/feimao) ｜ [全量字段档案](/brands/feimao)
- **传输与兼容**：亚太欧美优化专线，协议 `Shadowsocks（2026-08-11 实测截图）`，兼容 飞猫云专属客户端（下载登录即用）。
- **实况审计备注**：归档 1 张实测图（最近批次：2026-08-11 08:52:30 CST，图面协议：Shadowsocks）。 AI 适配：ChatGPT / Claude（vendor-claimed）、Gemini（partial）。 核心风控：专属客户端模式无法导出给第三方客户端或软路由使用；8 月测速截图时间为早上 08:52，不能直接等同晚高峰表现。

#### 3. 梯子云（LadderCloud / Tiziyun）核心建档结论
- **深度页入口**：[梯子云 详情与分析](/brands/tiziyun) ｜ [全量字段档案](/brands/tiziyun)
- **传输与兼容**：IEPL 专线，协议 `VLESS`，兼容 自研全平台客户端、Clash Verge Rev、Shadowrocket、v2rayN、FlClash。
- **实况审计备注**：暂无原始截图留档（等级 `vendor`），请先按月付档实测。 AI 适配：ChatGPT / Claude（vendor-claimed）。 核心风控：2025 年新品牌，尚无独立节点测速截图；“完美解锁”等措辞仅为品牌方资料表述。

## 「网络代理核心术语百科词典」跨场景边界故障与快速修正矩阵

| 常见边界故障 | 隐藏技术成因 | 建议执行动作 |
| --- | --- | --- |
| 浏览器正常但开发终端/AI 桌面端超时 | 系统代理未覆盖 CLI 进程与桌面底层网络 | 安装 Clash Verge Rev 的 **Service Mode** 并启用 **TUN（Mixed）** |
| 切换非香港节点后 AI 平台仍报地区受限 | 浏览器留存旧风控 Cookie 或内建 DoH 绕过分流 | 清理目标站点 Cookie 开无痕重登，并在浏览器关闭「使用安全 DNS」 |
| 更新订阅报错 `yaml unmarshal error` | 复制了 Base64 节点链接而非 Clash 专用格式，或入口被劫持 | 检查是否误选链接格式；先用正常节点代理再触发手动刷新订阅 |
| 夜间空闲时段流量莫名高额消耗 | 全局模式误让系统更新/网盘同步流量走过专线 | 切换回 **规则（Rule）**，并将常用大流量软件加入 `DIRECT` 规则 |

## 三、「网络代理核心术语百科词典」全集群专项教程矩阵（P1 + P2 共 7 篇）

<div class="kb-grid-2">
  <a href="/resources/beginner-help/proxy-glossary-dictionary-comparison-checklist" class="kb-card">
    <span class="kb-badge kb-badge-blue" style="margin-bottom:6px;">P1 · 2026 参数对比与避坑清单</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：2026 参数对比与避坑清单</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的2026 参数对比与避坑清单。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-beginner-step-by-step" class="kb-card">
    <span class="kb-badge kb-badge-blue" style="margin-bottom:6px;">P1 · 新手零基础图解步骤</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：新手零基础图解步骤</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的新手零基础图解步骤。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-peak-hour-benchmark" class="kb-card">
    <span class="kb-badge kb-badge-blue" style="margin-bottom:6px;">P1 · 晚高峰实测表现与数据分析</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：晚高峰实测表现与数据分析</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的晚高峰实测表现与数据分析。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-troubleshooting-guide" class="kb-card">
    <span class="kb-badge kb-badge-blue" style="margin-bottom:6px;">P1 · 常见报错与故障排查手册</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：常见报错与故障排查手册</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的常见报错与故障排查手册。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-cross-platform-setup" class="kb-card">
    <span class="kb-badge kb-badge-amber" style="margin-bottom:6px;">P2 · Windows / macOS / 手机端适配要点</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：Windows / macOS / 手机端适配要点</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的Windows / macOS / 手机端适配要点。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-security-best-practices" class="kb-card">
    <span class="kb-badge kb-badge-amber" style="margin-bottom:6px;">P2 · 隐私安全与风控防护规范</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：隐私安全与风控防护规范</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的隐私安全与风控防护规范。</p>
  </a>
  <a href="/resources/beginner-help/proxy-glossary-dictionary-advanced-faq" class="kb-card">
    <span class="kb-badge kb-badge-amber" style="margin-bottom:6px;">P2 · 高频疑问与进阶配置 FAQ</span>
    <h4 class="kb-card-title">网络代理核心术语百科词典：高频疑问与进阶配置 FAQ</h4>
    <p>点击查看针对「机场术语大全 IPLC IEPL BGP TUN」的高频疑问与进阶配置 FAQ。</p>
  </a>
</div>

## 四、新手帮助关联实测参考品牌

<BrandRecommendation :slugs='["guangsuyun","feimao","tiziyun"]' title="本主题相关参考品牌" />

## 五、「机场术语大全 IPLC IEPL BGP TUN」核心常见问题（FAQ）

<details open class="kb-faq-details">
<summary><strong>1. 为什么大家把提供代理节点的服务商叫做“机场”？</strong></summary>

早期主流客户端图标是一架纸飞机（Shadowsocks），提供大量“纸飞机节点”集合的平台便被中文社区形象地称为“机场”。

</details>

<details open class="kb-faq-details">
<summary><strong>2. 新手第一次买机场，选哪几家试水容错率最高？</strong></summary>

如果自己愿意花 5 分钟装 Clash Verge Rev 或小火箭，优先看同时支持自研端与通用订阅且有实测留档的品牌（如光速云 ¥25 极速月付、唯兔云 ¥19.9 月付或星岛梦 ¥25 月付）；如果完全不想配任何订阅只想装 App 登录即连，可看飞猫云或无忧链接。

</details>

<details open class="kb-faq-details">
<summary><strong>3. 买完后为什么微信和国内网页变慢了？</strong></summary>

99% 是不小心把客户端顶部模式选成了「全局（Global）」。立刻改回「规则（Rule）」即可让国内网站瞬间恢复本地宽带满速。

</details>

<details open class="kb-faq-details">
<summary><strong>4. 以后换新电脑或换新手机，原来的订阅还要重新花钱买吗？</strong></summary>

不用，只要你的套餐还在有效期内，在新设备上安装对应开源客户端并导入同一个订阅链接即可继续使用。

</details>

---

> **更新与来源说明**：本文为 v2rayn百科「[新手帮助](/resources/beginner-help/) → 网络代理核心术语百科词典」集群核心入口文档，最近核实日期 2026-11-19，内容依据公开技术规范与本站实测资料库整理。
