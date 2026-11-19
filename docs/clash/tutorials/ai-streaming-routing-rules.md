---
title: Clash 怎么让 ChatGPT、Claude 与 Gemini 走指定节点？AI 与流媒体定向分流规则教程
description: 通过 Clash Verge Rev 全局扩展覆写（Merge），为 OpenAI/ChatGPT、Claude、Google Gemini、Netflix 绑定独立策略组，彻底解决香港节点无法访问 AI 与频繁手动切节点的痛点。
date: 2026-10-19
updatedDate: 2026-11-19
category: Clash 分流教程
author: v2rayn百科技术组
relatedBrands:
  - guangsuyun
  - sujie
  - yifan
keywords:
  - Clash ChatGPT分流
  - Clash Gemini指定新加坡节点
  - Clash Verge全局覆写规则
  - AI工具策略组配置
faq:
  - q: 为什么不能直接把整个机场切成新加坡或美国节点？
    a: 香港节点物理延迟通常仅 20–30ms，刷网页和看高清视频响应最快；美国节点延迟多在 140–210ms。通过规则分流让常规海外流量走香港、AI 流量自动走新加坡/日本/美国，可以同时兼顾低延迟与 AI 稳定解锁。
  - q: 修改订阅自带的 YAML 为什么第二天就失效了？
    a: 机场定时更新订阅时会整份覆盖本地 YAML 文件。正确做法是在 Clash Verge Rev 中使用“全局扩展配置（Merge）”或“扩展脚本”，将自定义规则叠加在原始订阅之上。
---

# Clash 怎么让 ChatGPT、Claude 与 Gemini 走指定节点？

<div class="kb-answer-first">
  <div class="kb-answer-first-label">实战直答 · Answer-First</div>
  <p>根据本站对 <a href="/reviews/guangsuyun">光速云</a> 等品牌的真实测试，<strong>香港节点普遍无法直连 ChatGPT 网页版与 Gemini</strong>，而<strong>新加坡节点对 Gemini 与 OpenAI 同时通过率最高</strong>，日本/美国节点对 OpenAI 与 Claude 友好。使用 Clash Verge Rev 的<strong>全局扩展覆写（Merge）</strong>添加 20 行规则，即可实现“常规走香港 22ms 低延迟、Gemini 自动锁新加坡、ChatGPT/Claude 自动走日本或美国”，且订阅更新永不丢失。</p>
</div>

## 一、先理清三大 AI 平台的地区规律

| AI 平台 | 常见可用地区 | 常见受限地区 | 分流策略建议 |
| --- | --- | --- | --- |
| **ChatGPT / OpenAI** | 日本、新加坡、美国、台湾 | 香港（常仅限 App 或拦截网页） | 独立分组指向 `日本 / 新加坡 / 美国` |
| **Google Gemini** | 新加坡、美国原生、马来、土耳其 | 香港、部分日本/美区机房 IP | 实测确认解锁的地区单独锁定（如光速云选新加坡） |
| **Claude (Anthropic)** | 美国、新加坡、日本（部分） | 香港及高风控机房段 | 固定单一低风控出口，避免同会话频繁跳 IP |

## 二、在 Clash Verge Rev 中配置永久生效的覆写规则

不要直接编辑机场导入的 YAML（每次更新订阅都会覆盖）。按以下步骤配置**全局扩展脚本（Script）**：

1. 打开 Clash Verge Rev → 左侧进入「订阅（Profiles）」。
2. 点击顶部工具栏的 **「全局扩展脚本」**（右键 → 编辑文件）。
3. 粘贴以下最小可用脚本（请将 `新加坡01`、`日本01` 替换为你订阅中实际存在的节点或分组名）：

```javascript
function main(config) {
  const customRules = [
    // Google Gemini 锁定实测解锁地区（以新加坡组为例）
    'DOMAIN-SUFFIX,gemini.google.com,AI-Gemini',
    'DOMAIN-SUFFIX,generativelanguage.googleapis.com,AI-Gemini',
    'DOMAIN-SUFFIX,aistudio.google.com,AI-Gemini',
    'DOMAIN-SUFFIX,makersuite.google.com,AI-Gemini',

    // OpenAI / ChatGPT
    'DOMAIN-SUFFIX,openai.com,AI-OpenAI',
    'DOMAIN-SUFFIX,chatgpt.com,AI-OpenAI',
    'DOMAIN-SUFFIX,oaistatic.com,AI-OpenAI',
    'DOMAIN-SUFFIX,oaiusercontent.com,AI-OpenAI',

    // Claude / Anthropic
    'DOMAIN-SUFFIX,claude.ai,AI-OpenAI',
    'DOMAIN-SUFFIX,anthropic.com,AI-OpenAI'
  ]

  const allNames = (config.proxies || []).map((p) => p.name)
  const sgNodes = allNames.filter((n) => /新加坡|SG|狮城/i.test(n))
  const jpUsNodes = allNames.filter((n) => /日本|JP|美国|US|新加坡|SG/i.test(n))

  config['proxy-groups'] = config['proxy-groups'] || []
  config['proxy-groups'].unshift(
    {
      name: 'AI-Gemini',
      type: 'select',
      proxies: sgNodes.length ? sgNodes : ['DIRECT']
    },
    {
      name: 'AI-OpenAI',
      type: 'select',
      proxies: jpUsNodes.length ? jpUsNodes : ['DIRECT']
    }
  )

  config.rules = [...customRules, ...(config.rules || [])]
  return config
}
```

4. 保存脚本并确保「全局扩展脚本」处于勾选启用状态。
5. 切换到「代理（Proxies）」页面，即可看到顶部多出 `AI-Gemini` 和 `AI-OpenAI` 两个独立策略组，分别点选实测可用的节点即可！

## 三、验证规则是否真正命中

打开 Clash Verge Rev 左侧的 **「连接（Connections）」** 实时日志页，访问 `chatgpt.com` 或 `gemini.google.com`，在搜索框输入 `openai` 或 `gemini`，检查右侧 **规则（Rule）** 与 **链路（Chains）** 列是否准确命中 `AI-OpenAI` / `AI-Gemini`。如果发现命中了其他默认规则，说明该域名走的是 IPv6 或被浏览器内置 DoH 绕过，可在浏览器中关闭「使用安全 DNS」后再试。

## 四、支持自定义 Clash 分流的代表机场

> 注意：仅限专属客户端的机场（如飞猫云、Firefly、SOGO 云、隐形人）无法导入 Clash Verge Rev 使用上述脚本。需要自定义 AI 分流请优先选择提供第三方通用订阅的服务商：

<BrandRecommendation :slugs="['guangsuyun', 'yifan', 'sujie', 'xingdaomeng']" title="支持 Clash 通用订阅与 AI 分流的热门品牌" />

---

## 五、进阶规则：把 Cursor、Claude Code、Gemini CLI 与流媒体一起纳入精准分流

除了网页版 ChatGPT 与 Gemini，现代开发者常在终端或 IDE 中同时运行 **Cursor、Claude Code、Gemini CLI、GitHub Copilot 与 Docker**，而客厅/电脑端还要兼顾 **Netflix 与 YouTube 4K**。如果把上述工具全部塞进单一代理组，很容易出现“Gemini 所在的新加坡节点延迟稍高、而看 4K 视频却希望走 22ms 香港专线”的冲突。

### 1. 结合规则集（Rule Providers）与 `GEOSITE` 简化维护
在 Mihomo 内核中，无需手工穷举上百个域名。通过扩展脚本同时维护以下 4 个相互独立的策略组，就能一次兼顾速度与风控稳定：
- **`AI-Gemini`**：严格正则过滤匹配 `新加坡|SG`（结合光速云 2026-08-19 实测，新加坡 10 个节点全线绿标解锁 Gemini）；
- **`AI-OpenAI-Claude`**：正则过滤排除香港（`^(?!.*(香港|HK)).*(日本|JP|新加坡|SG|美国|US)`），同时防止 `Claude` 因 `url-test` 频繁跨国家切换触发账号封禁（必须使用 `type: select` 手动锁定单节点）；
- **`Media-4K`**：正则匹配 `香港|HK|日本|JP`，绕开部分出现 YouTube 送中（CN）的新加坡/台湾节点；
- **`Proxy-Default`**：默认日常海外访问走自动优选香港组，享受 20–30ms 最低延迟。

### 2. 常见 AI 分流失效的 4 个深层原因排查
| 失效现象 | 隐藏原因 | 对应修复动作 |
| --- | --- | --- |
| 规则已配置但 `gemini.google.com` 依然走直连或香港 | 浏览器启用了内建「使用安全 DNS（DoH）」，绕过了 Clash 域名嗅探 | 在 Chrome/Edge 设置中搜索 DNS 并关闭安全 DNS |
| 桌面端 Cursor / Claude Code 报地区不支持 | 仅开了浏览器代理插件或系统代理，未开 TUN 接管桌面进程 | 参考 [服务模式与 TUN 教程](/clash/verge/service-mode-and-tun-setup) 启用 TUN |
| 换到新加坡节点后 ChatGPT 仍提示不可用 | 浏览器缓存了之前香港 IP 的风控 Cookie 或 Cloudflare 会话 | 新开无痕窗口或清除 `openai.com / chatgpt.com` 站内 Cookie 后重登 |
| 订阅更新后策略组全部消失 | 修改了订阅自带 YAML 而非全局扩展脚本 | 务必将 JS 脚本写入 Clash Verge Rev「全局扩展脚本」并保持勾选启用 |

### 3. 延伸教程导航
- 同集群配套教程：[参数对比清单](/clash/tutorials/ai-streaming-routing-rules-comparison-checklist) ｜ [隐私与防风控规范](/clash/tutorials/ai-streaming-routing-rules-security-best-practices) ｜ [常见报错排查](/clash/tutorials/ai-streaming-routing-rules-troubleshooting-guide)

## 六、进阶工程方案：合并 YAML 配置（Merge）与开发者终端流量接管

对于同时使用浏览器插件、桌面端 IDE 与终端 CLI 工具的重度用户，单纯写几条 `DOMAIN-SUFFIX` 规则还不够完整。若出现 **IPv6 DNS 泄漏**、**QUIC（HTTP/3）绕过规则引擎** 或 **Node.js / Python 脚本未读取 Windows 系统代理**，依然会导致 OpenAI、Anthropic 或 Google Gemini 返回 `Request not allowed` 或地区不符提示。

### 1. 全局扩展配置（Global Merge）配合禁用 QUIC 与 IPv6 泄漏

在 Clash Verge Rev 中除了 JavaScript「全局扩展脚本」，还可以在「全局扩展配置（Merge YAML）」中叠加内核级防护参数，从根源阻断浏览器与系统双栈抢跑：

```yaml
# 在 Clash Verge Rev「全局扩展配置 (Merge)」中追加或合并以下键
ipv6: false
unified-delay: true
tcp-concurrent: true
find-process-mode: strict

dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  respect-rules: true
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "+.stun.*.*"
    - "time.*.com"
    - "ntp.*.com"
  proxy-server-nameserver:
    - https://223.5.5.5/dns-query
    - https://1.12.12.12/dns-query
  nameserver-policy:
    "geosite:cn,private":
      - https://223.5.5.5/dns-query
      - https://1.12.12.12/dns-query

# 建议在规则顶部额外加入 UDP 443 REJECT，迫使 Chrome/Edge 放弃 HTTP/3 (QUIC) 回退到 TCP TLS，提升分流命中率
# - AND,((NETWORK,UDP),(DST-PORT,443)),REJECT
```

### 2. Claude Code / Cursor / Codex CLI / Gemini CLI 环境变量与 TUN 二选一实操

很多终端与 AI CLI 工具基于 Node.js 或 Go 编写，默认**不会**读取 Windows/macOS 系统代理。你有两种可靠方案确保它们严格遵循你的分流规则：

| 方案 | 适用人群 | 具体配置方式 | 优缺点评估 |
| :--- | :--- | :--- | :--- |
| **方案 A：开启 Service Mode + TUN 模式（推荐）** | 追求一次配置全软件省心生效的用户 | 安装 Clash Verge Rev 服务模式并开启 TUN，`stack` 设为 `mixed` | 无需配任何环境变量，Docker/Cursor/CLI 自动走分流规则；需注意排除内网网段 |
| **方案 B：在 Shell 中按需注入代理环境变量** | 公司内网不能装虚拟网卡驱动或仅临时调试脚本 | 在 PowerShell 或 `.zshrc` 中声明 `HTTP_PROXY` / `HTTPS_PROXY` 指向 `127.0.0.1:7897` | 零权限入侵、不影响系统其他程序；但不同工具对大小写环境变量兼容性不同 |

```powershell
# PowerShell 临时验证终端 AI CLI 是否通过本地 Clash 端口访问 API
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
$env:ALL_PROXY="socks5://127.0.0.1:7897"
curl.exe -I https://api.openai.com/v1/models --max-time 8
curl.exe -I https://generativelanguage.googleapis.com --max-time 8
```

### 3. 防账号风控的 5 条铁律

1. **禁止对 AI 策略组使用 `url-test` 或 `load-balance`**：ChatGPT 与 Claude 后台会话高度敏感，若 `url-test` 每 300 秒因几毫秒波动将你的出口 IP 从新加坡切到日本再切回美国，极易触发人机验证、退出登录甚至账号封禁。务必保持 `type: select` 并手工固定单一优质节点。
2. **区分“网页可用”与“API 低风险”**：部分落地机房 IP 虽然网页版 ChatGPT 不拦截，但在 `IPRisk` 测速列显示 `HIGH/CRITICAL`，调用 API 或注册账号仍会被拒。优先挑选 [品牌数据库](/brands/) 与实测截图中低风险（`LOW`）的新加坡、日本与美西节点。
3. **浏览器清理历史 Cookie 后再切节点**：若你之前误用香港节点访问过 `claude.ai` 或 `gemini.google.com` 并被种下风控标识，切完规则后务必在无痕窗口测试或清空对应站点 Cookie，避免“配置已生效但旧会话仍报错”的误判。
4. **独立分离流媒体与 AI 分组**：用 `Media-4K` 单独匹配 YouTube、Netflix、Disney+ 走香港/日本大带宽专线，防止看 4K 视频把新加坡 AI 专线的流量或并发占满。
5. **准备不同地区的热备节点**：当主力新加坡节点短暂维护时，提前在 `AI-OpenAI` 备用清单里备好日本与台湾/美国节点，并在需要时一键切换；跨品牌架构选型可参考 [31 家机场风控审计](/resources/risk-intel/31-brands-audit-summary) 与 [IEPL 与公网中转线路差异](/airport/stable/iepl-vs-iplc-vs-relay)。

## 七、高频 FAQ 补充

### 1. 为什么在规则里写了 `GEOSITE,openai,AI-OpenAI` 却提示找不到规则集？
旧版 Clash 内核不支持 `GEOSITE`，且部分精简版客户端未内置最新 `geosite.dat` 数据库。使用本教程的 `DOMAIN-SUFFIX` 明文规则清单兼容性最高，几乎所有年份和版本的 Mihomo / Clash Meta 内核均可零依赖直接运行。

### 2. 开启分流后，为什么电脑上的 ChatGPT 桌面客户端仍然提示不可用？
因为桌面应用可能走了独立连接或 UDP QUIC，且若未开启 TUN 模式，仅靠浏览器系统代理无法接管原生桌面应用流量。按 [服务模式与 TUN 完整教程](/clash/verge/service-mode-and-tun-setup) 启用 TUN 后，再到 Clash Verge Rev 的「连接」页面搜索 `chatgpt` 查看进程名确认是否命中 `AI-OpenAI` 即可定位。

### 3. 为什么不能直接把整个机场切成新加坡或美国节点？
香港节点物理延迟通常仅 20–30ms，刷网页和看高清视频响应最快；美国节点延迟多在 140–210ms。通过规则分流让常规海外流量走香港、AI 流量自动走新加坡/日本/美国，可以同时兼顾低延迟与 AI 稳定解锁。

### 4. 修改订阅自带的 YAML 为什么第二天就失效了？
机场定时更新订阅时会整份覆盖本地 YAML 文件。正确做法是在 Clash Verge Rev 中使用“全局扩展配置（Merge）”或“扩展脚本”，将自定义规则叠加在原始订阅之上。

## 八、AI 工具与 4K 流媒体分流机场选型对照与同集群导航

配置好精准分流脚本后，最终稳定性仍取决于节点落地 IP 的洁净度（`IPRisk`）以及品牌是否允许通过第三方 Clash 订阅自定义规则：

| 品牌与档案链接 | 实测时间 / 样本说明 | AI 与流媒体地区解锁观察 | 规则分流友好度说明 |
| :--- | :--- | :--- | :--- |
| [光速云](/reviews/guangsuyun) | 2026-08-19 三网 2Gbps + 9Gbps 留档 | 新加坡 10 节点全绿解锁 Gemini；日本、新加坡三网解锁 OpenAI/Netflix | 支持标准 Clash 订阅，完美运行本文全局扩展 JS 脚本 |
| [速捷云](/brands/sujie) | 厂商规则支持第三方客户端导入 | 具体地区解锁建议以最新节点列表实际测试为准 | 开放 Clash 订阅格式，便于自行按地区正则拆分组 |
| [一翻云](/brands/yifan) | 2026-08-11 批次测试截图留档 | 节点连通性已留档，具体 AI 风控表现需购入后现测 | 兼容 Clash Verge Rev 与 Mihomo 扩展配置（Merge） |

> 本集群其余 7 篇配套细化教程：[零基础图解步骤](/clash/tutorials/ai-streaming-routing-rules-beginner-step-by-step) ｜ [跨端适配要点](/clash/tutorials/ai-streaming-routing-rules-cross-platform-setup) ｜ [晚高峰 AI 节点稳定性实测](/clash/tutorials/ai-streaming-routing-rules-peak-hour-benchmark) ｜ [高频问答 FAQ](/clash/tutorials/ai-streaming-routing-rules-advanced-faq)
