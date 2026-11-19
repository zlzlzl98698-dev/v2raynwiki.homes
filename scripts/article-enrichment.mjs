// 为 448 篇集群文章（56 P0 + 224 P1 + 168 P2）生成按「核心集群 × 内容角度」高度差异化的深度内容模块
// 严格遵循：低模板重合度、标题含主关键词防指纹雷同、全部品牌与实测数据严格源自 brands.ts 与 links.ts

function getReviewUrl(b, deepReviewSlugs) {
  return deepReviewSlugs.has(b.slug) ? `/reviews/${b.slug}` : b.reviewPath
}

export function buildVerifiedBrandDeepSection(relBrands, brandLinks, deepReviewSlugs, cluster, angleKey = 'p0') {
  const kw = cluster.primaryKeyword || cluster.title

  if (angleKey === 'comparison') {
    const rows = relBrands.map((b) => {
      const link = brandLinks[b.slug]
      const url = getReviewUrl(b, deepReviewSlugs)
      const oncePlan = b.plans.find((p) => p.billingCycle === '一次性付费')
      const monthPlan = b.plans.find((p) => p.billingCycle === '月付')
      return `| [${b.name}](${url}) | ${b.entryPriceLabel} | ${monthPlan ? `¥${monthPlan.priceCny}/${monthPlan.traffic}` : '未单列月付'} | ${oncePlan ? `¥${oncePlan.priceCny}/${oncePlan.traffic}` : '未提供'} | ${b.clientMode} | \`${link?.couponCode || '无/以官网为准'}\` |`
    })
    const notes = relBrands.map((b, idx) => {
      const planList = b.plans.slice(0, 4).map((p) => `${p.name}（${p.billingCycle} ¥${p.priceCny} / ${p.traffic}）`).join('；')
      const link = brandLinks[b.slug]
      return `#### ${idx + 1}. ${b.name} 套餐梯度与折算审计（${kw}参比）\n- **已收录主力档位**：${planList}。\n- **计费细则与优惠提示**：${b.entryBillingNote}。${link?.couponNote ? `优惠说明：${link.couponNote}。` : '下单前请在结算页核实可用折扣。'}${link?.linkFormatNote ? ` **异常披露**：${link.linkFormatNote}。` : ''}`
    })
    return `## 围绕「${kw}」的代表品牌定价梯队与单 GB 核价表

基于本站 31 家核实档案，针对「${cluster.title}」场景筛选出 ${relBrands.length} 家关键参比品牌。下表重点区分**年付折算门槛、常规月付档与永久不限时流量包**，防止混淆促销口径：

| 品牌 | 起步参考口径 | 常规月付档样本 | 一次性不限时包 | 客户端支持 | 记录优惠码 |
| --- | --- | --- | --- | --- | --- |
${rows.join('\n')}

### 各品牌价格构成与折扣边界拆解

${notes.join('\n\n')}`
  }

  if (angleKey === 'beginner') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      return `| [${b.name}](${url}) | ${b.clientMode} | ${b.supportedClients.slice(0, 4).join(' / ')} | ${b.lineCategory} | ${b.suitableFor[0] || '常规日常用户'} |`
    })
    const notes = relBrands.map((b, idx) => {
      const isProprietaryOnly = b.clientMode === '仅专属客户端'
      return `#### ${idx + 1}. ${b.name} 新手上手路线建议\n- **接入难易度**：当前记录为「${b.clientMode}」。${isProprietaryOnly ? '该品牌采用闭源官方 App 登录即用，零配置即可连接，但不支持导入 Clash Verge Rev 或 OpenWrt 软路由。' : '支持标准第三方客户端（' + b.supportedClients.join('、') + '），可一键导入 Clash 订阅后开启规则分流。'}\n- **新手试水策略**：${b.entryBillingNote}；优先关注「${b.suitableFor.join('、')}」场景匹配度，尽量避开不适合场景（${b.notSuitableFor.join('、')}）。`
    })
    return `## 「${cluster.title}」新手接入门槛与客户端适配实况

零基础用户在切入「${kw}」时，决定首日体验的核心往往不是极限跑分，而是**能否顺利装上客户端并完成第一次节点更新**。以下是关联品牌的真实上手门槛梳理：

| 品牌 | 接入方式 | 兼容客户端清单 | 线路归类 | 核心适用画像 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 零基础选型与首单验证细节

${notes.join('\n\n')}`
  }

  if (angleKey === 'benchmark') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      const hk = b.speedMetrics?.find((m) => m.region === '香港')
      const jp = b.speedMetrics?.find((m) => m.region === '日本')
      const sg = b.speedMetrics?.find((m) => m.region === '新加坡')
      const shot = b.screenshots?.[0]
      return `| [${b.name}](${url}) | ${hk ? `${hk.latencyMs}ms / ${hk.downloadMbps}Mbps` : '缺统一图'} | ${jp ? `${jp.latencyMs}ms / ${jp.downloadMbps}Mbps` : '缺统一图'} | ${sg ? `${sg.latencyMs}ms / ${sg.downloadMbps}Mbps` : '缺统一图'} | ${shot ? `${shot.testedAt} (${shot.protocolDisplayed})` : `无原始截图 (${b.dataStatus})`} |`
    })
    const notes = relBrands.map((b, idx) => {
      const metricStr = b.speedMetrics?.length
        ? b.speedMetrics.map((m) => `${m.region}（${m.latencyMs}ms / ${m.downloadMbps}Mbps，采样标注：${m.testedAt}）`).join('；')
        : '当前缺少多地区量化测速读数'
      const aiUnlocked = b.unlockMatrix.filter((u) => u.status === '已解锁').map((u) => u.service).join('、') || '暂无完整已解锁标注'
      return `#### ${idx + 1}. ${b.name} 采样时段与节点区域性能档案\n- **已记录地区读数**：${metricStr}。\n- **实测截图与解锁验证**：${b.screenshots?.length ? `保留 ${b.screenshots.length} 张原始留档，明确标记测试环境与异常行。` : `暂无原始测速截图归档（状态：\`${b.dataStatus}\`），宣传高速能力需读者购入月付后在自家晚高峰验证。`} 已确认解锁标注：${aiUnlocked}。`
    })
    return `## 「${kw}」实测批次时间戳、区域延迟与带宽采样档案

本节围绕「${cluster.title}」汇总关联品牌归档的原始延迟与吞吐样本，明确区分真实截图批次与口头描述，避免跨测试环境盲目排座次：

| 品牌 | 香港样本 | 日本样本 | 新加坡样本 | 原始截图批次 / 状态 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 多地区吞吐表现与测试口径说明

${notes.join('\n\n')}`
  }

  if (angleKey === 'troubleshoot') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      const shotProto = b.screenshots?.[0]?.protocolDisplayed || '无截图对照'
      return `| [${b.name}](${url}) | \`${b.protocols.join(' / ')}\` | ${shotProto} | ${b.clientMode} | ${b.risks[0] || '注意核心版本升级'} |`
    })
    const notes = relBrands.map((b, idx) => {
      return `#### ${idx + 1}. ${b.name} 排障重点：协议栈与订阅行为核对\n- **声明协议 vs 截图字段**：文档标注协议为 \`${b.protocols.join(' / ')}\`，${b.screenshots?.[0] ? `历史测速截图列显示为 \`${b.screenshots[0].protocolDisplayed}\`（如出现文字与截图不一致属正常协议版本演进，遇到连接失败需更新订阅并切换 Mihomo 内核）。` : '因缺乏截图核验，若遇到节点超时优先排查客户端是否开启了对应传输协议支持。'}\n- **典型排查隐患**：${b.risks.join('；')}。`
    })
    return `## 「${cluster.title}」涉事品牌协议栈差异与常见接入隐患

大量“连不上、提示超时或 YAML 报错”的问题直接与品牌下发协议及客户端限制有关。下表整理了与「${kw}」强相关的品牌协议排障参数：

| 品牌 | 资料标注协议 | 截图实显协议 | 接入模式 | 高频注意点 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 分品牌连接异常原因预判

${notes.join('\n\n')}`
  }

  if (angleKey === 'cross-platform') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      const hasOpenWrt = b.supportedClients.some((c) => /OpenClash|OpenWrt|Nikki|Shadowrocket|Clash/i.test(c))
      return `| [${b.name}](${url}) | ${b.clientMode} | ${b.supportedClients.join('、')} | ${hasOpenWrt ? '支持标准导入 / 旁路由' : '以专属客户端为准'} | ${b.lineCategory} |`
    })
    const notes = relBrands.map((b, idx) => {
      return `#### ${idx + 1}. ${b.name} 多端同步与规则一致性评估\n- **覆盖端侧范围**：当前档案确认适配 ${b.supportedClients.join('、')}。${b.clientMode === '仅专属客户端' ? '在 Windows、Android 与 macOS 间可依赖同一套账号同步节点，但**无法进入 OpenWrt 软路由或 Apple TV 第三方软件**。' : '由于提供标准通用订阅，用户可将同一条 URL 分别导入电脑 Clash Verge Rev、iOS Shadowrocket 与客厅 OpenWrt，保持统一分流逻辑。'}\n- **跨平台分流边界**：${b.lineType}；建议重点检查各端 DNS 模式是否统一开启防泄漏配置。`
    })
    return `## 「${kw}」跨平台客户端兼容列表与全端同步评估

多设备协同场景下，“电脑能用、手机找不到订阅、软路由报错”是高频痛点。以下核对了与「${cluster.title}」匹配的代表品牌全平台覆盖边界：

| 品牌 | 接入机制 | 已收录支持客户端 | 路由器 / 旁路由扩展性 | 线路等级 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 各品牌多设备并发与迁移便捷度解析

${notes.join('\n\n')}`
  }

  if (angleKey === 'security') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      const link = brandLinks[b.slug]
      return `| [${b.name}](${url}) | ${b.foundedYear} | \`${b.dataStatus}\` | ${link?.linkFormatNote ? '有格式/邀请码冲突' : '字段一致'} | ${b.risks.slice(0, 2).join('；')} |`
    })
    const notes = relBrands.map((b, idx) => {
      const link = brandLinks[b.slug]
      return `#### ${idx + 1}. ${b.name} 数据审计透明率与风控警戒项\n- **审计状态**：始于 ${b.foundedYear} 年，数据来源分级 \`${b.dataStatus}\`。${link?.linkFormatNote ? `**审计异常记录**：${link.linkFormatNote}。` : '推广跳转路由与邀请码结构已核验一致。'}\n- **风险回避措施**：${b.risks.join('；')}。建议不长期存放大额余额于单家面板，重要工作流搭配异构品牌不限时包冗余。`
    })
    return `## 「${kw}」品牌运营审计状态、数据真实度与风控提示

从安全合规与防跑路视角评估「${cluster.title}」，必须优先核查品牌成立周期、是否有独立截图留档以及历史文档中暴露的冲突项：

| 品牌 | 始建年份 | 资料审计状态 | 链接/优惠码一致性 | 已披露核心风险点 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 分品牌可信度边界与风控应对动作

${notes.join('\n\n')}`
  }

  if (angleKey === 'advanced-faq') {
    const rows = relBrands.map((b) => {
      const url = getReviewUrl(b, deepReviewSlugs)
      return `| [${b.name}](${url}) | ${b.suitableFor.join('、')} | ${b.notSuitableFor.join('、')} | ${b.lineCategory} | ${b.entryPriceLabel} |`
    })
    const notes = relBrands.map((b, idx) => {
      return `#### ${idx + 1}. ${b.name} 长期主力 / 灾备角色分配建议\n- **最佳职责定位**：${b.lineType}，最契合「${b.suitableFor.join('、')}」场景。\n- **规避踩坑提醒**：如果您的日常需求落在「${b.notSuitableFor.join('、')}」区间，切勿盲目入手年付，应转而查看对比列表中的备选品牌并同步核对实时面板公告。`
    })
    return `## 「${cluster.title}」主力与应急主备角色匹配清单

结合高频提问中的典型复杂需求，下面从长期稳定性、适用人群与负面排除条件三个维度汇总相关品牌定位：

| 品牌 | 明确适合人群 | 明确不建议入手人群 | 线路底座 | 参考起步成本 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

### 长期运维分工与备用冗余建议

${notes.join('\n\n')}`
  }

  // Default P0 entry view
  const brandRows = relBrands.map((b) => {
    const link = brandLinks[b.slug]
    const hk = b.speedMetrics?.find((m) => m.region === '香港')
    const sg = b.speedMetrics?.find((m) => m.region === '新加坡')
    const oncePlan = b.plans.find((p) => p.billingCycle === '一次性付费')
    const reviewUrl = getReviewUrl(b, deepReviewSlugs)
    return `| [${b.name}](${reviewUrl}) | ${b.foundedYear} | ${b.lineCategory} | ${b.clientMode} | ${b.entryPriceLabel} | ${oncePlan ? `¥${oncePlan.priceCny}/${oncePlan.traffic}` : '未单列'} | ${hk ? `${hk.latencyMs}ms / ${hk.downloadMbps}Mbps` : '缺统一图'} | ${sg ? `${sg.latencyMs}ms / ${sg.downloadMbps}Mbps` : '缺统一图'} | \`${link?.couponCode || '无/待核实'}\` |`
  })
  const brandBreakdowns = relBrands.map((b, idx) => {
    const link = brandLinks[b.slug]
    const reviewUrl = getReviewUrl(b, deepReviewSlugs)
    const shotInfo = b.screenshots?.length
      ? `归档 ${b.screenshots.length} 张实测图（最近批次：${b.screenshots[0].testedAt}，图面协议：${b.screenshots[0].protocolDisplayed}）。`
      : `暂无原始截图留档（等级 \`${b.dataStatus}\`），请先按月付档实测。`
    const aiSummary = b.unlockMatrix
      .filter((u) => u.category === 'AI')
      .map((u) => `${u.service}（${u.status}）`)
      .join('、')
    return `#### ${idx + 1}. ${b.name}（${b.enName}）核心建档结论\n- **深度页入口**：[${b.name} 详情与分析](${reviewUrl}) ｜ [全量字段档案](${b.reviewPath})\n- **传输与兼容**：${b.lineType}，协议 \`${b.protocols.join(' / ')}\`，兼容 ${b.supportedClients.join('、')}。\n- **实况审计备注**：${shotInfo} AI 适配：${aiSummary || '待现测'}。${link?.linkFormatNote ? ` **冲突提示**：${link.linkFormatNote}。` : ''} 核心风控：${b.risks.join('；')}。`
  })
  return `## ${cluster.title}：${relBrands.length} 家实测品牌全维核验矩阵

围绕「${kw}」做架构与服务商联动判断时，下表严格引用本站 31 家独立核实库中的原始建档数据，区分实时测试样本与厂商自述口径：

| 品牌 | 运营起始 | 线路 | 客户端模式 | 入门参考价 | 一次性不限时 | 香港采样 | 新加坡采样 | 优惠码 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${brandRows.join('\n')}

### 逐品牌适配结论与边界提示

${brandBreakdowns.join('\n\n')}`
}

export function buildTechAndVerificationSection(topicMod, topic, cluster, angleKey) {
  const kw = cluster.primaryKeyword || cluster.title

  if (angleKey === 'p0') {
    return `## ${kw}底层技术机制与工程配置基准

要从根本上把「${cluster.title}」跑通且保持跨季度稳定，不能只看界面上的开关按钮，还需要掌握链路加密、入口分发与客户端分流之间的协作原理：

### ${topic.title}架构机制拆解

${topicMod.architectureDeepDive}

### ${topicMod.configTitle}

\`\`\`${topicMod.configLang}
${topicMod.configCode}
\`\`\`

### 实施验收清单（${topicMod.checklistTitle}）

1. 桌面主力优先使用持续维护的 **Clash Verge Rev（Mihomo 内核）** 或 **v2rayN**，确保 VLESS-Reality 与 Hysteria 2 新协议零异常兼容。
2. 日常代理模式保持 **规则（Rule）**，国内网盘、系统更新与内网地址务必直连（\`DIRECT\`），防止白白消耗月度高速流量配额。
3. 所有测速指标均须核对其采样运营商与测试日期（如 \`2026-08-19\` 三网 2Gbps 或 \`2026-08-11\` 批次），新品牌坚持先月付后年付。`
  }

  if (angleKey === 'comparison') {
    return `## ${kw}参数对比背后的计费与吞吐计算准则

仅看价格排序极其容易失真，针对「${cluster.title}」做横评时，建议采用以下两套量化算式筛掉账面泡沫：

1. **真实单 GB 流量成本公式**：\`真实单 GB 价格 = 实付年/月费用 ÷ (套餐标称流量 ÷ 常用节点平均扣费倍率)\`。如果某家 20 元 200GB 的套餐把香港与新加坡节点全部设为 \`2x\` 倍率，那么实际可用流量只有 \`100GB\`，单价实质翻倍。
2. **带宽延迟积（BDP）与单线程上限**：家庭看 4K 视频或拉取代码库依赖**单线程 TCP/QUIC 吞吐**。高并发（32 线程）堆出来的几百 Mbps 峰值在日常体验中参考价值有限，单线程稳态跑出 \`15 MB/s（120 Mbps）\` 以上且无显著丢包才真正够用。

### 对比阶段终端自检脚本（单线程真实体验验证）

\`\`\`powershell
# 切换待测节点后，验证同一测试文件在晚高峰的单线程 TLS 握手与平均吞吐
1..3 | ForEach-Object {
  curl.exe -o NUL -s -w "第 $_ 轮 | TLS: %{time_appconnect}s | 首包: %{time_starttransfer}s | 均速: %{speed_download} B/s\n" https://speed.cloudflare.com/__down?bytes=20000000
}
\`\`\`

> 对比决策原则（${topic.title}）：支持通用 Clash 订阅且公开原始测速图的品牌在长期可控性上显著高于黑盒闭源客户端；对纯零基础用户则可优先考核官方客户端崩溃率与售后工单时效。`
  }

  if (angleKey === 'beginner') {
    return `## ${topic.title}新手入门原理：从订阅导入到规则放行

刚接触「${kw}」的读者常有一个核心困惑：**“为什么一个不到 100 字符的订阅 URL 能瞬间变成几十个各国节点？”** 本质上订阅链接是一个托管在 CDN 上的 YAML/Base64 动态配置文件，由客户端定期拉取最新的入口域名、加密端口与分流规则集。

### 零基础上线前必须做对的 3 个动作

1. **只从开源仓库正版 Release 下载客户端**：切勿通过不明百度网盘或第三方广告站下载改包程序；桌面端确认校验签名或官方主页链接。
2. **区分「系统代理」与「TUN 虚拟网卡」**：浏览网页只开「系统代理（Rule 模式）」即可；如果 Terminal、Git、Docker、Cursor 报超时，再打开 Service Mode 与 TUN 开关。
3. **订阅导入前先校准操作系统时钟**：确保 Windows / macOS 开启自动对时，否则节点测速绿字也会因时间戳偏差超过 90 秒而被服务端直接断开。

### 一键验证本地订阅是否已真正接管出站

\`\`\`bash
# 运行以下两条命令，分别检查代理链路真实出口 IP 与连通状态码
curl -I -s https://www.google.com | head -n 5
curl -s https://api.ip.sb/geoip
\`\`\``
  }

  if (angleKey === 'benchmark') {
    return `## ${kw}测速技术深析：Mathis 丢包公式与运营商路线差异

为什么有时本地千兆宽带在晚高峰测试直连海外 VPS 会瞬间卡到几百 KB/s，而 IEPL 专线却能跑到 300+ Mbps？这背后的核心物理制约可以用经典的 **Mathis TCP 吞吐上限模型** 解释：\`Max_Rate ≈ (MSS / RTT) × (1 / sqrt(p))\`。

- 当跨国公网国际出口（如普通电信 163 拥堵时段）出现 \`3%–5%\` 随机丢包（\`p = 0.03\`）且 \`RTT = 170ms\` 时，单条 TCP 连接会被操作系统拥塞算法强行压死到 \`3–5 Mbps\`，表现为 1080P 视频缓冲卡死。
- 而采用企业内网跨境通道或就近 BGP 入口将 \`p\` 压至趋近 \`0%\`、港线 \`RTT\` 控制在 \`20–30ms\` 时，单连接即可轻松跑满家庭宽带上限。

### 三网本地复现测试命令（区分 DNS 慢 vs 出口拥堵）

\`\`\`bash
# 分段统计 DNS解析、TCP握手、TLS加密耗时与首包延迟
curl -o /dev/null -s -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Speed: %{speed_download} B/s\n" https://speed.cloudflare.com/__down?bytes=25000000
\`\`\`

- 若 \`TCP\` 高于 \`0.25s\` 说明国内中转入口到你家宽带存在跨省/跨网绕行；
- 若 \`TCP\` 很快但 \`TTFB\` 超过 \`1.5s\` 则说明海外落地服务器并发负载过高或出口拥堵。`
  }

  if (angleKey === 'troubleshoot') {
    return `## 针对「${cluster.title}」的系统级链路排查与日志定位

排查「${kw}」故障最忌盲目重启电脑或反复重装软件。工程师标准排障思路是严格执行 **从内到外四层隔离法**：

1. **代理端监听确认**：确定客户端核心进程是否成功监听本地端口（如 \`127.0.0.1:7897\`）。
2. **系统层变量与扩展冲突**：检查浏览器是否装了竞争的 SwitchyOmega / ZeroOmega / 广告拦截代理插件，或 Chrome 开启了「安全 DNS（DoH）」绕过 Fake-IP。
3. **内核日志原文解读**：打开客户端 \`Logs（Info 级别）\` 观察是否报 \`timeout\`（入口不可达）、\`EOF\`（时间差或风控断连）或 \`x509\`（证书过期/系统日期错误）。
4. **换网交叉验证**：使用手机 4G/5G 热点共享给电脑访问同一节点，若立刻畅通则 100% 为当前宽带/光猫/校园网对特定 UDP 或非标端口限速。

### ${topicMod.configTitle}

\`\`\`${topicMod.configLang}
${topicMod.configCode}
\`\`\``
  }

  if (angleKey === 'cross-platform') {
    return `## ${topic.title}跨平台底层网络栈与统一规范化策略

Windows（WinHTTP / 注册表代理 / Wintun）、macOS（NetworkExtension / utun）、Android（VpnService 进程锁保活）、iOS（NEPacketTunnelProvider 15MB 内存上限）与 OpenWrt（fw4 nftables + TProxy/TUN）五类环境的底层差异很大，但规则层面应该尽可能集中统一维护。

### 跨终端迁移 4 项工程准则

1. **订阅规则集中托管**：把所有分流规则写入全局可扩展配置或统一远程规则集，不要在 Windows 写一套、到 Shadowrocket 又手工拼凑另一套导致不同步。
2. **注意 iOS 15MB 内存墙限制**：给 iPhone / iPad 配置规则时避免塞入数十万行臃肿的 GEOSITE 全量域名表，优先加载精简后的核心 AI 与流媒体分组列表。
3. **路由器旁路与桌面终端避免双重代理**：当客厅 OpenWrt 已经接管透明代理后，局域网内的 PC 与手机应关闭本地 Clash TUN 模式，否则会出现数据包二次套娃导致延迟翻倍且连接数暴涨。

### ${topicMod.configTitle}

\`\`\`${topicMod.configLang}
${topicMod.configCode}
\`\`\``
  }

  if (angleKey === 'security') {
    return `## ${kw}防泄漏防风控边界与系统自查工程指南

在围绕「${cluster.title}」搭建长期网络工作环境时，安全防护的核心并不是口头口号，而是可验证的 **四重隔离防线**：

1. **客户端来源校验与权限最小化**：只使用开源并支持 Hash 核验的客户端，警惕要求关闭杀毒、或未签名静默修改系统根证书的野鸡加速器安装包。
2. **DNS 与 WebRTC 隐私边界**：确保 \`respect-rules: true\` 与 \`nameserver-policy\` 把国内域名留在国内可信 DNS，海外域名仅经代理通道解析；高敏感场景在浏览器内限制 WebRTC 暴露局域网/真实公网 IP。
3. **订阅 Token 防泄露管理**：机场订阅 URL 本身等价于你的账户凭证。绝不在截图、Git 公开仓库、第三方在线转换网站中直接粘贴明文订阅地址。
4. **账号防关联风控**：OpenAI、Claude 等高风控平台切忌绑定自动测速组（\`url-test\`），必须锁定单一低风险节点减少 IP 归属国频繁横跳。

### ${topicMod.configTitle}

\`\`\`${topicMod.configLang}
${topicMod.configCode}
\`\`\``
  }

  // advanced-faq
  return `## 「${cluster.title}」长效运维与参数调优进阶参考

解决「${kw}」常见表面故障后，决定半年以上长期用得舒不舒服的关键在于**自动化容灾、AI 会话隔离以及多账号策略组维护**：

### ${topic.title}高可用架构深度说明

${topicMod.architectureDeepDive}

### 进阶运维调优 3 项实践

1. **为关键 AI 服务设置独立 \`select\` 分组，而非 \`url-test\`**：把新加坡低风险节点（如实测绿标 Gemini 节点）固定用于敏感服务，日常网页/流媒体走香港 \`url-test\` 最低延迟组，互不干扰。
2. **引入异构品牌 \`fallback\` 灾备分组**：主力常用机场若遇单线机房临时割接，可在策略组后排挂载不限时按量备用节点，3 秒自动接替不断会话。
3. **定期清理过期缓存与校验客户端内核版本**：每季度检查一次 Mihomo / Xray 核心更新通告，修补 TLS 握手指纹库并保持规则集最新。`
}

export function buildExtendedErrorMatrix(cluster, topic, angleKey = 'p0') {
  const kw = cluster.primaryKeyword || cluster.title

  const tableByAngle = {
    comparison: `## 「${kw}」比价与账单争议核对对照表

| 常见对比混淆项 | 真实产生原因 | 核查与规避动作 |
| --- | --- | --- |
| 宣传“每月 5 元起”点击进去却要 60–99 元 | 起步价为年付折算均价，不支持单月购入 | 在套餐表先切换「月付/季付」查看最低单笔试错现金成本 |
| 同标称 150GB 流量实际却快两倍见底 | 主力港新日专线设置了 \`1.5x–3x\` 扣费倍率 | 下单前确认是否全节点 \`1x\` 扣流，并用规则组拦截国内下载流量 |
| 填入全站优惠码却提示不适用该档位 | 年付特惠轻量包、致敬永久包常设为不参与折扣 | 核对 [31 家品牌审计表](/resources/risk-intel/31-brands-audit-summary) 中的优惠边界，以结算页实付额为准 |
| 多家 5 元档看起来参数一模一样 | 共享相似面板或相同上游批发的同质化套餐 | 严禁同梯度 5.6 元档互为主备，至少搭配一家跨年份老牌异构品牌 |`,

    beginner: `## 「${kw}」新手首日配置高频卡点速查

| 卡点现象 | 背后新手误区 | 一分钟自救动作 |
| --- | --- | --- |
| 机场下载完自研端导入 Clash 订阅失败 | 误买了仅限专属客户端的品牌 | 仅需 App 登录用该客户端；若要用 Clash 请核查支持通用订阅的品牌 |
| 订阅地址复制到客户端报错 \`403\` / 无效 | 未剔除前缀空格，或直接粘贴了网页版登录后台网址 | 在机场面板寻找「一键导入 Clash」或「复制 Clash YAML 订阅链接」 |
| 点击节点测速全绿，浏览器却完全打不开海外站 | 仅开启客户端未打开顶部「系统代理」开关，或模式选成了 Direct | 勾选「系统代理」并把运行模式切换为 **规则（Rule）** 后刷新网页 |
| 安装 TUN 服务模式提示权限不足或被拦截 | Windows 杀毒拦截驱动，或从受限压缩包内直接双击运行 | 先完整解压到独立英文目录，再右键以管理员身份运行安装一次 Service Mode |`,

    benchmark: `## 「${kw}」测速偏差与晚高峰异常排障对照表

| 实测偏差现象 | 物理与实验条件根因 | 正确解读与验证方式 |
| --- | --- | --- |
| 别人发的测速图全绿满速，自己晚上看 4K 仍卡顿 | 附图为凌晨闲时跑分或 32 线程并发总带宽 | 只对比晚高峰 20:00–23:00 的**单线程均速**与 YouTube Stats 实时码率 |
| 香港节点延迟 25ms，打开 Gemini 却提示地区不可用 | OpenAI 与 Google 对香港机房段长期收紧策略 | 将 AI 域名独立分流至实测通过的新加坡、日本或美国节点 |
| TLS RTT 很低但 HTTPS 网页打开要 3 秒以上 | 落地机负载排队、本地 DNS 解析未走代理或 ISP 跨网抖动 | 在代理端启用 \`unified-delay\` 并用 \`curl\` 查看分段 TTFB 与 DNS 耗时 |
| 广东用户延迟 18ms，东北/华北用户延迟超 70ms | 国内单一南方入口跨省物理距离叠加路由跳数 | 确认品牌是否具备多地 BGP 就近入口，优先测自己本地三网延迟表现 |`,

    troubleshoot: `## 「${kw}」深度报错代码与网络环境冲突处置表

| 日志报错关键词 | 核心触发原因 | 精准排查与修复方案 |
| --- | --- | --- |
| \`yaml: line X: could not find expected ':'\` | 订阅返回的是 HTML 登录页/拦截页而非合法 YAML | 用浏览器或开启现有备用代理访问订阅 URL 验证返回内容是否有效 |
| \`EOF\` / \`connection reset by peer\` | 操作系统时间偏差超 90 秒，或账号并发设备超限被踢 | 开启系统自动校准时间；登录面板确认并发数并适当清理旧设备 |
| \`dial tcp ... i/o timeout\` | 本地高校校园网/企业网封锁 UDP 或端口，或单个中转节点维护 | 改用标准 TCP 443 端口的 VLESS / Trojan 节点；用手机热点做交叉测试 |
| 命令行 Git/Docker 超时但 Chrome 浏览器正常 | 系统代理仅作用浏览器，未开启 TUN 接管全系统网络栈 | 开启 Service Mode 与 TUN（Mixed），并将内网网段加入 \`route-exclude-address\` |`,

    'cross-platform': `## 「${kw}」多操作系统与软路由兼容性踩坑表

| 设备环境 | 常见跨端专属故障 | 标准处置方法 |
| --- | --- | --- |
| Windows 11 + WSL2 / Docker | 开启 Clash TUN 后子系统或容器内部无法拉取镜像 | 在 \`.wslconfig\` 配置 \`networkingMode=mirrored\` 并放行 \`172.16.0.0/12\` |
| macOS Sonoma / Sequoia | 升级客户端后 TUN 无法启用或 DNS 解析失效 | 卸载服务模式 Helper 重装授权，并在系统设置确认允许后台拓展 |
| Android 手机锁屏休眠 | 亮屏可用、锁屏 5 分钟后后台 VPN 进程被系统强杀 | 在省电策略设为「无限制」并在多任务页面下拉锁定客户端卡片 |
| OpenWrt + 客厅主机/PC | 路由器与电脑端同时开 TUN 导致双重转发延迟翻倍 | 软路由接管全局时，局域网内其他电脑和手机客户端务必保持关闭 |`,

    security: `## 「${kw}」隐私泄漏、风控验证与防跑路应急清单

| 安全与风控隐患 | 典型预警信号 | 主动防范与止损举措 |
| --- | --- | --- |
| 订阅地址意外泄露被盗刷 | 后台流量突然一夜少了几十 GB、出现陌生地区在线 IP | 立即在机场后台点击「重置订阅链接」与退出所有已登录会话 |
| 浏览器真实公网 IP / 本地 DNS 泄漏 | 检测网站漏出国内运营商真实 IP 或弹出密集人机验证 | 关闭浏览器内置「安全 DNS（DoH）」并限制 WebRTC 本地探测；启用 \`dns-hijack\` |
| 高危“灵车”跑路前兆 | 取消月付只卖三年付、群组全员禁言、节点长红不发公告 | 停止一切长周期续费，提前导出本地规则并启用不限时备用包切换预案 |
| 同源机场上游同时崩盘 | 主备两家定价、优惠、协议高度一致且在同一晚同时全部超时 | 使用 \`ipinfo.io/org\` 交叉核验出口 ASN，坚持用不同运营年份与架构品牌互补 |`,

    'advanced-faq': `## 「${kw}」长效配置维护与跨区规则调优表

| 进阶调优场景 | 低效错误做法 | 高可用最佳实践方案 |
| --- | --- | --- |
| 订阅更新冲掉自己手写的规则 | 直接双击修改导入后的本地订阅 YAML | 使用 Clash Verge Rev「全局扩展配置（Merge）」或「扩展脚本（Script）」叠加规则 |
| 同一份配置文件管理多国 AI 服务 | 全部塞进默认全局代理或短周期 \`url-test\` 自动跳国别 | 为 AI 服务单设 \`select\` 手动锁定分组，流媒体与常规浏览单走低延迟港日组 |
| 处理局域网 NAS 与银行类 App 报错 | 开启 TUN 严格路由后未加排除私有 IP 段 | 配置 \`route-exclude-address\` 排除 \`192.168.0.0/16\`、\`10.0.0.0/8\` 并加 \`GEOIP,CN,DIRECT\` |
| 评估是否需要保留第二条备用线 | 长期只靠单一家机场且无离线订阅留档 | 囤积小额按量不过期流量包，配置 \`fallback\` 分组实现故障 3 秒静默接替 |`,

    p0: `## 「${cluster.title}」跨场景边界故障与快速修正矩阵

| 常见边界故障 | 隐藏技术成因 | 建议执行动作 |
| --- | --- | --- |
| 浏览器正常但开发终端/AI 桌面端超时 | 系统代理未覆盖 CLI 进程与桌面底层网络 | 安装 Clash Verge Rev 的 **Service Mode** 并启用 **TUN（Mixed）** |
| 切换非香港节点后 AI 平台仍报地区受限 | 浏览器留存旧风控 Cookie 或内建 DoH 绕过分流 | 清理目标站点 Cookie 开无痕重登，并在浏览器关闭「使用安全 DNS」 |
| 更新订阅报错 \`yaml unmarshal error\` | 复制了 Base64 节点链接而非 Clash 专用格式，或入口被劫持 | 检查是否误选链接格式；先用正常节点代理再触发手动刷新订阅 |
| 夜间空闲时段流量莫名高额消耗 | 全局模式误让系统更新/网盘同步流量走过专线 | 切换回 **规则（Rule）**，并将常用大流量软件加入 \`DIRECT\` 规则 |`
  }

  return tableByAngle[angleKey] || tableByAngle.p0
}
