---
title: Clash Verge Rev 服务模式（Service Mode）与 TUN 虚拟网卡完整配置教程
description: 详细演示如何在 Windows、macOS 与 Linux 的 Clash Verge Rev 中安装 Service Mode 系统服务、开启 TUN 虚拟网卡、配置混合端口，解决终端/Git/Docker/桌面游戏不走代理的问题。
date: 2026-10-19
updatedDate: 2026-11-19
category: Clash Verge 实战
author: v2rayn百科技术组
relatedBrands:
  - guangsuyun
  - yifan
  - xingdaomeng
keywords:
  - Clash Verge Rev TUN模式
  - Clash服务模式安装
  - 终端走Clash代理
  - Clash Verge Rev设置教程
faq:
  - q: 为什么开了系统代理后，浏览器能上网但命令行 Git / npm / Docker 依然超时？
    a: 系统代理仅对读取操作系统 HTTP/SOCKS 代理变量的应用（主要是浏览器）生效，大多数命令行工具、开发 IDE 插件与桌面游戏不会自动遵循系统代理。开启 Clash Verge Rev 的 TUN 虚拟网卡模式可从网络层接管全部流量。
  - q: 开启 TUN 模式必须先安装服务模式（Service Mode）吗？
    a: 是的。创建和修改系统虚拟网卡路由表需要管理员/Root 权限。安装 Service Mode 后，Clash Verge Rev 无需每次手动右键“以管理员身份运行”，重启电脑也可自动生效。
---

# Clash Verge Rev 服务模式（Service Mode）与 TUN 虚拟网卡完整配置教程

<div class="kb-answer-first">
  <div class="kb-answer-first-label">核心结论 · Answer-First</div>
  <p>当你发现浏览器可以正常访问海外网站，但 <strong>PowerShell、Git、npm、pip、Cursor、Telegram 或游戏客户端依旧直连超时</strong>，根本原因是系统代理（System Proxy）只影响遵循系统代理变量的软件。在 <strong>Clash Verge Rev</strong> 中依次完成<strong>「安装服务模式 → 开启 TUN 模式 → 设为规则（Rule）模式」</strong>三步，即可在操作系统网络层自动分流全部应用流量。</p>
</div>

## 一、系统代理 vs TUN 模式的核心区别

| 对比项 | 系统代理（System Proxy） | TUN 虚拟网卡模式 |
| --- | --- | --- |
| 工作层级 | 应用层（HTTP / SOCKS5 监听端口，默认 `7897`） | 操作系统网络层（IP / TCP / UDP 虚拟网卡） |
| 覆盖范围 | 浏览器及显式支持系统代理的软件 | 几乎全部软件（终端、Git、Docker、IDE、UWP、桌面游戏） |
| 权限要求 | 普通用户权限即可 | 需安装 **Service Mode** 系统服务（一次授权） |
| 资源占用 | 极低 | 略高（正常 PC 可忽略不计） |
| 适用建议 | 纯网页浏览与轻度办公 | 开发者、AI 桌面端、跨区游戏与需要全局接管的用户 |

## 二、准备条件

1. 已从官方 GitHub Releases 安装最新版 **Clash Verge Rev**（参考 [官方下载与防钓鱼核验指南](/clash/verge-download/official-release-guide)）。
2. 已成功导入至少一份可用的机场 Clash 订阅（如 [光速云](/reviews/guangsuyun)、[一翻云](/brands/yifan) 或 [星岛梦](/brands/xingdaomeng) 等支持第三方订阅的品牌）。
3. 确认关闭了其他同时运行的 VPN、网易 UU 或旧版 Clash 客户端，避免路由表冲突。

## 三、四步开启服务模式与 TUN

<div class="kb-steps">
  <div class="kb-step">
    <div class="kb-step-num">1</div>
    <div>
      <strong>安装服务模式（Service Mode）</strong>：打开 Clash Verge Rev → 左侧栏进入「设置（Settings）」→ 在「Clash 设置」区域找到 <strong>服务模式</strong> 右侧的盾牌图标 → 点击「安装（Install）」。Windows 会弹出 UAC 权限确认框，macOS 会要求输入开机密码，授权后图标变为绿色对勾。
    </div>
  </div>
  <div class="kb-step">
    <div class="kb-step-num">2</div>
    <div>
      <strong>开启 TUN 模式开关</strong>：在同一设置页中，将 <strong>TUN 模式（Tun Mode）</strong> 开关打开。点击其右侧齿轮图标，确认堆栈（Stack）设为 <code>Mixed</code>（兼容性最好）或 <code>System</code>，开启 <strong>严格路由（Strict Route）</strong> 与 <strong>自动配置路由</strong>。
    </div>
  </div>
  <div class="kb-step">
    <div class="kb-step-num">3</div>
    <div>
      <strong>避免与系统代理重复叠加</strong>：开启 TUN 模式后，可将「系统代理」关闭或保留（部分浏览器插件显式检测系统代理时保留更稳妥）；确保「代理（Proxies）」顶部处于 <strong>规则（Rule）</strong> 模式，这样国内网站和内网 IP 会自动直连。
    </div>
  </div>
  <div class="kb-step">
    <div class="kb-step-num">4</div>
    <div>
      <strong>验证终端与 DNS 是否生效</strong>：打开系统终端运行测试命令，若顺利返回 HTTP 200 与海外出口 IP 即配置成功。
    </div>
  </div>
</div>

```bash
# 验证命令行是否已通过 TUN 正常访问海外接口
curl -I https://www.google.com
curl https://api.ip.sb/geoip
```

## 四、常见报错与排障方案

| 报错现象 | 常见原因 | 解决方案 |
| --- | --- | --- |
| 点击安装服务模式无反应或失败 | 杀毒软件拦截后台服务注册，或从非管理员目录运行便携版 | 将程序放行至白名单，右键以管理员身份运行安装一次服务模式 |
| 开启 TUN 后全部网站瞬间断网 | 与企业 VPN（如 EasyConnect / AnyConnect）或杀毒防火墙虚拟网卡冲突 | 退出其他 VPN 软件；在 TUN 设置中将堆栈切换为 `gVisor` 重试 |
| 局域网 NAS / 打印机无法访问 | 严格路由拦截了私有网段 | 在全局覆写中将 `192.168.0.0/16`、`10.0.0.0/8` 加入 `route-exclude-address` |
| 开启 TUN 后部分国内网站解析变慢 | 订阅自带 DNS 配置缺少国内分流上游 | 参照 [Mihomo DNS 与 Fake-IP 最佳实践](/clash/meta/dns-fakeip-best-practices) 配置 `nameserver-policy` |

## 五、常见问题（FAQ）

### 1. 为什么开了系统代理后，浏览器能上网但命令行 Git / npm / Docker 依然超时？
系统代理仅对读取操作系统 HTTP/SOCKS 代理变量的应用（主要是浏览器）生效，大多数命令行工具、开发 IDE 插件与桌面游戏不会自动遵循系统代理。开启 Clash Verge Rev 的 TUN 虚拟网卡模式可从网络层接管全部流量。

### 2. 开启 TUN 模式必须先安装服务模式（Service Mode）吗？
是的。创建和修改系统虚拟网卡路由表需要管理员/Root 权限。安装 Service Mode 后，Clash Verge Rev 无需每次手动右键“以管理员身份运行”，重启电脑也可自动生效。

### 3. 开启 TUN 后，Docker 容器或 WSL2 无法访问外网怎么办？
Windows 下 WSL2 默认使用 Hyper-V 虚拟网段（通常为 `172.16.0.0/12`），Linux/macOS Docker 也可能与 Fake-IP 网段（`198.18.0.1/16`）或宿主路由表冲突。请在全局覆写中确保放行宿主与容器私有网段，并在 Windows 11 中于 `.wslconfig` 启用 `networkingMode=mirrored` 让 WSL2 直接共享宿主 TUN 路由。

### 4. 游戏联机或语音软件开启 TUN 后丢包/无法直连 P2P 怎么办？
首先在节点的连接测试中确认机场节点支持 UDP 转发，再在全局覆写的 `tun` 段中启用 `udp-timeout` 调优或把国内语音/联机平台域名写入直连规则；若仍触发对称型 NAT 限制，可参考 [UDP 与 FullCone NAT 游戏优化](/vpn/accelerator/udp-fullcone-nat-guide)。

## 六、TUN 内核栈选型（Mixed / System / gVisor）、排除网段与终端校验

不同操作系统在接管底层数据包时的内核机制不同，选错 TUN Stack 会直接表现为 CPU 占用飙升或局部连接卡死。可按以下工程准则配置全局覆写（Global Override）YAML 片段：

```yaml
tun:
  enable: true
  stack: mixed          # Windows/Linux 桌面端优先 mixed；仅纯 UDP 游戏或高并发可选 system；容器/无特权环境退回 gvisor
  dns-hijack:
    - "any:53"          # 劫持系统与 CLI 发起的传统 53 端口明文 DNS 请求，避免泄漏到运营商本地 DNS
    - "tcp://any:53"
  auto-route: true
  auto-detect-interface: true
  strict-route: true    # 防止浏览器 QUIC / DoH 绕过虚拟网卡造成分流失效
  route-exclude-address:
    - 192.168.0.0/16    # 放行家庭路由器、NAS 与局域网打印机
    - 10.0.0.0/8        # 放行企业内网 / 校园网内网段
    - 172.16.0.0/12     # 放行 Docker Bridge 与默认内网容器网段
    - fc00::/7          # 放行 IPv6 唯一本地地址（ULA）
```

| TUN Stack 类型 | 实现原理 | 吞吐与 CPU 开销 | 适用场景与常见副作用 |
| :--- | :--- | :--- | :--- |
| `system` | 直接使用操作系统原生 TCP/IP 协议栈处理隧道包 | 吞吐最高、CPU 最低 | 适合 Windows（Wintun）与 Linux 桌面高带宽跑满；偶发特定杀毒软件驱动冲突 |
| `mixed`（推荐） | TCP 走 `system` 栈，UDP 走内置轻量栈 | 性能与稳定性兼顾 | Mihomo 内核默认推荐方案，兼顾高速下载与 UDP 抗阻塞 |
| `gvisor` | 在用户态完全运行 Go/gVisor 网络协议栈 | 内存与 CPU 占用略高 | 适合权限受限环境或 `system` 栈触发蓝屏/内核恐慌时的兜底方案 |

开启后，切勿只看浏览器能否打开网页，建议在终端执行以下命令确认命令行与系统级流量已被 TUN 虚拟网卡完整接管：

```powershell
# Windows PowerShell：验证虚拟网卡 Meta 存在且 Git/curl 无需环境变量即可走代理
Get-NetAdapter | Where-Object { $_.InterfaceDescription -match "Wintun|Mihomo|Clash" }
curl.exe -I https://www.google.com --max-time 8
git ls-remote https://github.com/MetaCubeX/mihomo.git HEAD
```

```bash
# macOS / Linux：检查 utun / Meta 虚拟接口与 53 端口 DNS 劫持效果
ifconfig | grep -E "utun|Meta" -A 3
dig +short openai.com @8.8.8.8
```

若 `curl.exe -I https://www.google.com` 报 `Could not resolve host`，说明 `dns-hijack` 或 Mihomo `dns.enable: true` 未生效；若提示连接重置，则重点核对系统防火墙/杀毒软件是否拦截了 `mihomo.exe` 核心进程出站。

## 七、分操作系统深度排障：Windows WSL2、macOS Helper 与 Linux systemd

不同操作系统在启用 TUN 虚拟网卡时有各自的权限模型与网卡隔离机制。以下 3 类跨平台实操问题在开发者社群中占比最高：

### 1. Windows 11 下 WSL2 与 Docker Desktop 无网络或 DNS 失败
默认情况下 WSL2 使用 NAT 模式分配 `172.x` 子网，开启 Clash Verge Rev TUN 后，WSL2 内 `curl` 与 `apt update` 往往因 DNS 指向宿主虚拟网卡被阻断而超时。推荐一劳永逸方案：在 Windows 用户目录 `%USERPROFILE%\.wslconfig` 中写入以下配置后执行 `wsl --shutdown` 重启子系统，即可与宿主共享镜像网络并直接享受 TUN 透明代理：

```ini
[wsl2]
networkingMode=mirrored
dnsTunneling=true
autoProxy=true
```

若使用较旧版本 Windows 10（不支持 mirrored 模式），则需要在 Clash Verge Rev 侧边栏「设置 → Clash 设置」中开启 **允许局域网连接（Allow LAN）**，并在 WSL2 `/etc/resolv.conf` 指向宿主宿主机 IP 配合环境变量分流，详见 [局域网与子系统共享代理教程](/clash/tutorials/lan-proxy-sharing-guide)。

### 2. macOS 卸载重装服务模式与 System Extension 授权
在 macOS Sonoma / Sequoia 上升级 Clash Verge Rev 后，若发现 TUN 开关灰显或切换后无法访问外网，通常是因为旧版 `io.github.clash-verge-rev.helper` 服务签名未随新版本同步刷新。可打开 Clash Verge Rev → 设置 → 服务模式点击「卸载（Uninstall）」，完全退出应用后重新打开并点击「安装（Install）」，输入开机密码重新授予特权；必要时可在系统「设置 → 隐私与安全性 → 登录项与扩展」确认应用后台权限未被系统关闭。

### 3. Linux（Ubuntu / Arch）普通用户免 root 运行 `mihomo` 核心
Linux 桌面端不建议长期使用 `sudo clash-verge` 启动图形界面（会导致桌面主题与 Electron 沙盒异常）。通过应用内安装 `Service Mode` 会注册 systemd 守护进程 `clash-verge-service.service`；如果使用命令行独立核心或自定义打包版本，也可通过 `setcap` 为二进制文件单独授予网卡管理能力：

```bash
# 查看 Service Mode 后台服务状态与最近日志
systemctl status clash-verge-service
journalctl -u clash-verge-service -n 50 --no-pager
```

### 4. Windows UWP 应用（Microsoft Store / Xbox / 邮件）回环代理问题
开启系统代理模式下 UWP 应用默认被 Windows AppContainer 沙盒禁止访问 `127.0.0.1` 回环地址；而只要按本文第三步正确安装了 Service Mode 并开启 TUN 虚拟网卡，所有流量会在 IP 层被 Wintun 驱动接管，**不再经过 `127.0.0.1` 本地回环**，因此 Microsoft Store 更新与 Xbox 联机通常无需额外做 UWP 回环解除即可直接生效。

## 八、参考实测机场与延伸阅读

在完成 Clash Verge Rev 的 TUN 虚拟网卡配置后，建议配合支持 **Clash / Mihomo 完整规则下发** 且具备稳定 UDP/BGP 线路的机场进行长期稳定性验证：

<BrandRecommendation
  :slugs="['guangsuyun', 'yiyun', 'feiniao', 'suxun']"
  title="TUN 模式与高并发开发场景适配机场"
  description="以下品牌在 2026 年实测中均提供原生 Clash/Mihomo 订阅兼容、完整域名分流规则下发与多线 IEPL/BGP 入口，适合搭配 TUN 全局接管使用。"
/>

- 进阶协议与分流继续阅读：[Mihomo DNS 与 Fake-IP 最佳实践](/clash/meta/dns-fakeip-best-practices)、[AI 与流媒体精细分流规则教程](/clash/tutorials/ai-streaming-routing-rules)、[已连接但无法上网排障手册](/clash/troubleshooting/connected-no-internet-fix)。

### 实测适配机场核心参数速查表（基于 31 家核实档案）

为避免新手在开启 Clash Verge Rev TUN 模式后因选择了仅限专属客户端的品牌（如飞猫云、Firefly、SOGO 云）导致无法导出标准 YAML 订阅，下表汇总了支持通用订阅且已收录核心实况参数的代表品牌：

| 品牌名称 | 最低参考档位 | 专线 / 协议特性 | 通用订阅兼容性 | 多端/开发适用度评价 |
| :--- | :--- | :--- | :--- | :--- |
| [光速云](/reviews/guangsuyun) | 轻量版 `¥99/年` / 极速 `¥25/月`（优惠码 `AMM`） | 2Gbps 三网与 9Gbps 单线程实测留档 | 完整兼容 Clash / Mihomo | 同时支持自研客户端与全规则订阅下发，适合开发者主力 |
| [一翻云](/brands/yifan) | 厂商标准月付档 | `2026-08-11` 批次实测留档（SS/VLESS） | 兼容标准 Clash 订阅 | 适合需要规则集分流与独立策略组控制的用户 |
| [星岛梦](/reviews/xingdaomeng) | 标准入门月付档 | 2026-08-11 批次测试留档，IEPL 路线参考 | 兼容标准 Clash 订阅 | 支持全规则导入，适合叠加本文 TUN 全局接管方案 |
| [微风网络](/reviews/weifeng) | 清风 `¥137/年` `100GB/月` | 2026-08-11 测试留档 | 兼容标准 Clash 订阅 | 价格梯度清晰，适合轻量开发与日常双开浏览 |

### 同集群 7 篇进阶专项教程导航（P1 + P2）

- **参数与排障对照**：[Service Mode 与 TUN 参数对比清单](/clash/verge/service-mode-and-tun-setup-comparison-checklist) ｜ [常见报错与驱动冲突排障手册](/clash/verge/service-mode-and-tun-setup-troubleshooting-guide)
- **分步骤与跨端教程**：[新手零基础图解步骤](/clash/verge/service-mode-and-tun-setup-beginner-step-by-step) ｜ [Windows / macOS / 手机端适配要点](/clash/verge/service-mode-and-tun-setup-cross-platform-setup)
- **安全与进阶深度**：[隐私安全与 DNS 防泄漏规范](/clash/verge/service-mode-and-tun-setup-security-best-practices) ｜ [晚高峰 TUN 吞吐损耗评估](/clash/verge/service-mode-and-tun-setup-peak-hour-benchmark) ｜ [高频疑问与进阶 FAQ](/clash/verge/service-mode-and-tun-setup-advanced-faq)
