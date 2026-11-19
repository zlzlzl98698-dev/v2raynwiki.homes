---
title: 光速云（Guangsuyun）参数档案与套餐清单（2026-10-19 核实）
description: 整理 光速云（Guangsuyun）的基础参数、IEPL 专线 + 企业级内网专线（部分档位标注全球 IPLC）、套餐报价表（¥99/年（折合约 ¥8.25/月））、客户端模式与数据核实状态。
date: 2026-10-19
updatedDate: 2026-11-19
category: 品牌参数档案
author: v2rayn百科评测组
dataStatus: measured
relatedBrands:
  - guangsuyun
  - muguang
  - feimao
  - xingdaomeng
keywords:
  - 光速云参数
  - 光速云套餐价格
  - 光速云优惠码
  - IEPL机场档案
faq:
  - q: "光速云 支持 Clash Verge Rev 和 Shadowrocket 第三方客户端吗？"
    a: "支持。光速云 属于「自研+第三方订阅」模式，兼容 自研全平台客户端、Clash Verge Rev、Shadowrocket、v2rayN、FlClash，可搭配规则分流灵活使用。"
  - q: "光速云 的起步价格与计费周期是怎么算的？"
    a: "光速云 当前记录的入门参考价为 ¥99/年（折合约 ¥8.25/月）（年付轻量版折算月成本，常规月付极速版为 ¥25/月）。请注意区分年付折算均价与常规月付价格，并以官网结算页实时价格为准。"
  - q: "光速云 目前有公开实测截图或独立数据验证吗？"
    a: "本站已归档 6 张 光速云 原始测速留档截图（测试时间：2026-08-19（长沙电信 2Gbps / MiaoKo））。需注意单批次快照不能单独证明全年晚高峰稳定性，仍建议先小额月付实测。"
---

# 光速云（Guangsuyun）参数与套餐档案

<div class="kb-answer-first">
  <div class="kb-answer-first-label">档案速览 · Answer-First</div>
  <p>光速云自 2020 年起运营，定位综合型 IEPL/IPLC 专线服务，同时提供自研客户端与 Clash、Shadowrocket 等第三方订阅导入。套餐跨度覆盖 99 元/年轻量版、147 元 247GB 永久不限时套餐、25–138 元常规月付及 680 元企业定制。2026-08-19 实测截图显示其在电信、移动、联通三网均具备较高吞吐能力，但 ChatGPT 与 Gemini 存在明显的地区节点分化，需按需选点。 如需查看完整的套餐单价测算、客户端配置与同梯队横评，请前往 <a href="/reviews/guangsuyun">光速云 2026 深度评测</a>。</p>
</div>

<BrandInfrastructureSnapshot slug="guangsuyun" />

<BrandCTA slug="guangsuyun" />

## 一、品牌基础参数与特点

- **品牌名称**：光速云（Guangsuyun，别名：GSY / 光速云机场）
- **运营起始**：2020
- **线路架构**：IEPL 专线 + 企业级内网专线（部分档位标注全球 IPLC）
- **协议与客户端**：协议记录为 `VLESS / Shadowsocks（实测截图） / AnyTLS（电信专线截图）`，客户端接入属于 **自研+第三方订阅**（自研全平台客户端、Clash Verge Rev、Shadowrocket、v2rayN、FlClash）
- **支付方式**：支付宝 / 微信 / USDT

- 2020 年起运营，产品线覆盖年付入门、一次性永久流量包、常规月付到企业定制
- IEPL 与企业内网双线路架构，全节点 1 倍率，单节点最高标称 2.5Gbps
- 自研客户端与第三方通用订阅并行，兼容 Clash、Shadowrocket、v2rayN
- 12+ 国家地区 60+ 节点覆盖，香港/日/新/美节点储备充足
- 2026-08-19 三网 2Gbps 及珠海联通 9Gbps 实测截图可查，不限设备数

## 二、套餐价格、流量额度与计费周期

年付轻量版折算月成本，常规月付极速版为 ¥25/月。下方卡片已清晰区分月付、年付折算与一次性不限时流量包：

<BrandPricingTable slug="guangsuyun" />

## 三、线路架构与测速实测状态

<NetworkTopology slug="guangsuyun" />

<NetworkPerformanceReport slug="guangsuyun" />

### 原始实测截图留档（未经裁切改写）

<BrandScreenshots slug="guangsuyun" />

## 四、AI 工具与流媒体解锁状态

<StreamingAvailabilityMatrix slug="guangsuyun" />

## 五、适用人群、风险提示与审计备注

### 适合人群
- 希望同时兼容自研客户端与 Clash Verge Rev / Shadowrocket 订阅的用户
- 需要 99 元低门槛年付或 147 元永久不限时备用流量包的用户
- 对香港、新加坡、日本三网速度和延迟有一定要求的日常办公与流媒体用户

### 不适合人群
- 要求全节点无脑直连 Gemini 或 ChatGPT 网页版且不愿切换地区的用户
- 期望极低价且支持无条件退款的用户（特殊套餐不支持退款）

### 风险提示与数据审计记录
- **风险提示**：特殊商品与年付/永久套餐不支持退款，建议先购入极速版月付实测晚高峰
- **风险提示**：不同协议批次（Shadowsocks vs VLESS）实测表现存在差异，且美国个别节点出现低速异常
- **风险提示**：历史文案中曾出现轻量版 59GB 与 69GB 的流量表述差异，下单前以官网结算页为准
- **审计备注**：已核对《光速云品牌信息.txt》与《32家机场品牌清单.txt》差异：前者列 4 档套餐且顶部注 59GB、正文注 69GB；后者补全流光/量子/无界共 7 档套餐，本站以较完整的 7 档并标注核对提示。
- **审计备注**：光速云为本站商业重点合作品牌，优先建设专题与深度评测，但所有测速截图、异常节点与 Gemini 区域限制均如实披露。

## 六、同梯队品牌横向对比

<BrandComparison :slugs='["guangsuyun","muguang","feimao","xingdaomeng"]' />

## 七、常见问题（FAQ）

### 1. 光速云 支持 Clash Verge Rev 和 Shadowrocket 第三方客户端吗？
支持。光速云 属于「自研+第三方订阅」模式，兼容 自研全平台客户端、Clash Verge Rev、Shadowrocket、v2rayN、FlClash，可搭配规则分流灵活使用。

### 2. 光速云 的起步价格与计费周期是怎么算的？
光速云 当前记录的入门参考价为 ¥99/年（折合约 ¥8.25/月）（年付轻量版折算月成本，常规月付极速版为 ¥25/月）。请注意区分年付折算均价与常规月付价格，并以官网结算页实时价格为准。

### 3. 光速云 目前有公开实测截图或独立数据验证吗？
本站已归档 6 张 光速云 原始测速留档截图（测试时间：2026-08-19（长沙电信 2Gbps / MiaoKo））。需注意单批次快照不能单独证明全年晚高峰稳定性，仍建议先小额月付实测。

---

<BrandCTA slug="guangsuyun" heading="前往 光速云 官方注册入口（优惠码 AMM）" />
