// 4 大一级领域与 28 个二级专题的深度技术原理、YAML/CLI 配置代码块、真实排障矩阵与专题专属 FAQ
// 用于在 448 篇集群文章中注入高质量、非重复的实战工程内容，使每篇均达到 3,000–5,500+ 汉字深度

export const topicDeepModules = {
  // === 1. 机场推荐 (/airport/) ===
  a1: {
    architectureDeepDive: `在评估「机场推荐」梯队时，不能只停留在价格表层面，而应从**国内入口层、跨境传输层、海外落地层与客户端规则层**四段链路综合审视。以本站 31 家核实品牌中的老牌 IEPL 代表[光速云](/reviews/guangsuyun)为例，其采用了「国内多线入口 → IEPL/企业内网跨境专线 → 多地区独立落地出口」结构；2026-08-19 实测数据显示，在广东联通、长沙电信、广西移动与河北联通四类环境下，香港专线 TLS RTT 稳定在 20–31ms，而远端美国节点由于跨太平洋光缆物理传播时延，TLS RTT 位于 212–219ms 区间。这说明哪怕是同一家机场，不同落地节点的服务能力差异也极其显著：香港适合高频浏览与低延迟交互，新加坡和日本才是 ChatGPT/Gemini 与跨区办公的主力出口。`,
    configTitle: '通用订阅选点后的 Clash Verge Rev 分流验真配置',
    configLang: 'yaml',
    configCode: `# 在 Clash Verge Rev 全局扩展配置 (Merge) 中固化健康检查与地区分流
proxy-groups:
  - name: "自动优选-香港"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 30
    include-all: true
    filter: "(?i)香港|HK|Hong Kong"

  - name: "AI-新加坡专线"
    type: select
    include-all: true
    filter: "(?i)新加坡|SG|Singapore"`,
    checklistTitle: '场景化选型四象限核对',
    extraFaqs: [
      {
        q: '为什么同一家机场不同地区节点的 ChatGPT 与 Gemini 可用性完全不同？',
        a: 'OpenAI 与 Google 对机房 ASN 归属和地区政策采用独立风控。例如实测显示香港专线节点对 OpenAI 常仅支持移动端 App，且 Gemini 在香港普遍不可用；切换至新加坡或日本/美国节点即可解决。'
      },
      {
        q: '选机场时“不限设备数量”有没有隐性限制？',
        a: '绝大多数主流机场允许家庭自有设备多端同时在线，但若把订阅链接公开分享、同时从几十个不同省市 IP 并发请求，仍会触发面板的防共享滥用审计。'
      },
      {
        q: '首次下单买哪一档最稳妥？',
        a: '优先选购 19–25 元常规月付档（例如光速云极速版 ¥25/168GB、唯兔云 ¥19.9/150GB 或一翻云 ¥20/150GB），在自家宽带晚高峰连续测试一周后再考虑年付或永久流量包。'
      }
    ]
  },
  a2: {
    architectureDeepDive: `阅读各类「机场排行」榜单时，最容易忽略的指标陷阱是**测试线程数、测试机房带宽以及测试时间戳**。在本站归档的 2026-08-11 统一批次中，多数图片出自 \`MAI-TEST-BOT 2.0.0-dev\`（珠海联通 5Gbps 后端、32 线程并发），而部分测试使用 \`喵速 4.7.0\`（珠海联通 9Gbps 单线程或 6 线程）。根据 TCP 拥塞控制与 BDP（带宽延迟积）公式 \`BDP = 带宽 × RTT\`，32 线程并发即使在单条流存在轻微丢包时也能把总带宽叠高到数百 Mbps，但用户看 4K 视频或下载单个 GitHub Release 文件时依赖的是**单线程稳定吞吐**。因此，真正有价值的榜单会同时列出平均速度、每秒速度曲线平整度、异常低速节点以及测试发生的具体时刻。`,
    configTitle: '本机命令行复现单线程真实下载带宽测试',
    configLang: 'powershell',
    configCode: `# 在开启代理后，通过 PowerShell 实测单线程 HTTPS 连通性与 TTFB 首包延迟
curl.exe -o NUL -s -w "TLS握手: %{time_appconnect}s | 首包TTFB: %{time_starttransfer}s | 平均速度: %{speed_download} B/s\n" https://speed.cloudflare.com/__down?bytes=25000000`,
    checklistTitle: '测速排行防伪核验项',
    extraFaqs: [
      {
        q: '为什么排行榜里经常把“年付 8 元”和“月付 25 元”混排在一起？',
        a: '部分榜单为了压低起价数字，会把年付轻量小包拆成月均价展示。本站所有对比表均强制标注是“年付折算”还是“常规月付”，防止读者误判门槛。'
      },
      {
        q: '运营超过 3 年的老牌机场为什么更有长期排位优势？',
        a: '老牌服务商（如 2020 年起步的光速云与星岛梦）经历过多次国际出口波动与域名封锁周期，其多入口备用机制与工单体系通常更成熟。'
      },
      {
        q: '晚高峰 21:00 掉速多少算正常？',
        a: '优质 IEPL/IPLC 专线在晚高峰维持非高峰期 60% 以上带宽、单线程高于 120Mbps 且无明显断流即属优秀；若跌破 10Mbps 或频繁超时则说明入口超卖严重。'
      }
    ]
  },
  a3: {
    architectureDeepDive: `测算「性价比机场」的核心数学公式是：\`真实单 GB 成本 = 实付套餐金额 ÷ (标称月流量 ÷ 节点平均倍率)\`。许多看似便宜的入门套餐会对香港或日本专线设置 \`2x\` 甚至 \`3x\` 扣费倍率，导致 100GB 名义流量在主力节点实际只够用 33–50GB。相比之下，明确标注**全节点 1x 倍率**的服务商账面透明得多。同时要区分**月重置周期**与**一次性不限时流量包**：月付套餐每 30 天清零未用完流量，适合每月稳定消耗 100GB+ 的用户；而不限时流量包（如光速云 ¥147/247GB 约 ¥0.595/GB、星岛梦 ¥600/1TB 约 ¥0.60/GB）没有月清零损耗，非常适合备用线与低频出差用户。`,
    configTitle: 'Clash 规则模式省流配置：避免国内大流量白扣代理配额',
    configLang: 'yaml',
    configCode: `# 在自定义规则最顶部确保国内大型下载站、网盘与视频站严格走 DIRECT 直连
rules:
  - DOMAIN-SUFFIX,baidupcs.com,DIRECT
  - DOMAIN-SUFFIX,aliyundrive.com,DIRECT
  - DOMAIN-SUFFIX,bilivideo.com,DIRECT
  - DOMAIN-SUFFIX,steamserver.net,DIRECT
  - GEOIP,CN,DIRECT`,
    checklistTitle: '套餐单价与倍率审计清单',
    extraFaqs: [
      {
        q: '优惠码什么时候用最划算？永久套餐能打折吗？',
        a: '多数品牌的新用户优惠码（如光速云 AMM、Firefly 的 firefly、闪跃的 shanyue）明确标注年付轻量版或不限时特惠包不参与折上折，主要适用于常规月付/季付档位。'
      },
      {
        q: '为什么同一家机场 99 元/年轻量版折算每 GB 只要 ¥0.12，而永久不限时包要 ¥0.595/GB？',
        a: '因为年付套餐存在时间锁定和月度未用完清零效应（服务商可按用户平均实际消耗率做带宽复用）；永久不限时流量包是服务商长期负债，所以单 GB 买断单价必然更高。'
      },
      {
        q: '发现本月流量消耗异常偏快怎么自查？',
        a: '进入 Clash Verge Rev「连接」面板按流量排序，排查是不是系统更新、iCloud 同步或本地网盘客户端误走了代理端口。'
      }
    ]
  },
  a4: {
    architectureDeepDive: `「稳定机场」的核心技术护城河在于跨境段的传输路径。民用宽带直接访问海外服务器需经过运营商拥堵的国际出口（例如 163 骨干网），晚间 20:00–23:00 丢包率常飙升至 5%–15%，导致 TCP 拥塞窗口急剧收缩，即便百兆宽带也只能跑出几百 KB/s。**IEPL（国际以太网专线）**与 **IPLC（国际专线电路）**通过向运营商租用点对点内网传输通道，在国内 BGP 入口收流后直接通过专线跨海抵达香港或新加坡落地，几乎不受公网民用出口拥堵波动。这也是为什么像光速云、星岛梦、暮光加速、唯兔云、一翻云等 IEPL/IPLC 品牌能在香港节点保持 21–27ms 稳定低延迟的原因。`,
    configTitle: 'Mihomo Fallback 自动故障转移策略组（主力断连 0 感知切换备用）',
    configLang: 'yaml',
    configCode: `proxy-groups:
  - name: "主力-故障自动转移"
    type: fallback
    url: "https://cp.cloudflare.com/generate_204"
    interval: 180
    proxies:
      - "香港专线01"
      - "新加坡01"
      - "日本01"
      - "备用机场-不限时节点"`,
    checklistTitle: '晚高峰稳定性核查标准',
    extraFaqs: [
      {
        q: '怎么不用专业测试工具也能在家里判断机场稳不稳？',
        a: '晚上 21:00 打开 YouTube 播放 4K 60fps 视频并右键开启「详细统计信息」，连续观察 5 分钟内的 Buffer Health（缓冲秒数）和 Connection Speed 是否平稳高于 40,000 Kbps 且不掉帧。'
      },
      {
        q: '为什么不建议所有节点都用“自动测速（url-test）”？',
        a: '在短周期 url-test 下，客户端可能每隔几分钟就因为 3ms 延迟波动在港、日、新之间来回切换，直接导致正在使用的 ChatGPT、Claude 或在线会议掉线重连。'
      },
      {
        q: '高稳定需求一定要配两家机场吗？',
        a: '如果用于远程办公、外贸收发邮件或日常开发，强烈建议“主力 IEPL 月付 + 异构不限时备用包”双活，单一商家突发维护或域名切换时 3 秒即可顶上。'
      }
    ]
  },
  a5: {
    architectureDeepDive: `在 10 元/月以下（年付折算）的「便宜机场」区间，用户最需要建立的是**成本边界意识**。跨境专线按 Mbps 计费属于刚性支出，因此 ¥5.6–¥8.25/月档位能够维持合理利润的前提通常有三点：① 仅限年付一次性收款；② 月流量严格控制在 40–69GB；③ 禁止长期满载大流量下载。从本站 31 家品牌审计看，大佬云、闪电鼠、云界线、榴莲云、环球梯 5 家 5.6 元档高度同质化且暂无实测图；相比之下，无忧链接（¥79/年）、飞猫云（¥84/年）、星岛梦（¥96/年）与光速云（¥99/年）均附带了 2026 年原始测速留档，透明度更高。`,
    configTitle: '低流量轻量档防偷跑规则（仅放行必备海外服务）',
    configLang: 'yaml',
    configCode: `# 适合 40GB–69GB 年付小包：严防系统更新与视频预加载偷跑流量
rules:
  - PROCESS-NAME,OneDrive.exe,DIRECT
  - PROCESS-NAME,baidunetdisk.exe,DIRECT
  - DOMAIN-SUFFIX,windowsupdate.com,DIRECT
  - DOMAIN-SUFFIX,icloud-content.com,DIRECT
  - GEOIP,CN,DIRECT`,
    checklistTitle: '低价档位避坑核验清单',
    extraFaqs: [
      {
        q: '5.6 元档和 8 元档除了差 2.4 元/月，核心差别在哪？',
        a: '差在可核验证据与差异化定位：5.6 元档 5 家目前全部缺乏原始测速截图，且云界线/环球梯链接格式存在异常；而 7–8 元档的飞猫云、星岛梦、光速云均留有 2026 年测速截图。'
      },
      {
        q: '学生党预算只有不到 100 元/年，买月付还是直接买年付？',
        a: '如果目标品牌有 19–25 元单月档，最保险的是先花 20 元测一个月校园网/宽带兼容性，确认没问题后再用年付档长期持有。'
      },
      {
        q: '便宜机场会被限速吗？',
        a: '即便商家页面标注不限速，低价轻量包在晚高峰共享出口下也可能出现带宽竞争；不适合全天挂着下大型海外视频或镜像。'
      }
    ]
  },
  a6: {
    architectureDeepDive: `剖析「免费梯子」为何往往比付费方案代价更高，需要看清代理节点的**流量可见性与端侧权限**。当流量经过一个免费节点时，运营者虽然看不到 HTTPS 加密内部的表单明文，却完全掌握你访问过的全部域名（TLS SNI）、连接时间戳与 IP 关联关系；更危险的是来路不明的免费闭源客户端 APK/EXE，可以直接在操作系统中读取剪贴板、注入浏览器扩展或在后台将你的家庭宽带变成商业住宅代理肉鸡。因此，哪怕预算极紧，也应坚持**“开源客户端（免费）+ 轻量正规专线或自建”**的安全底线。`,
    configTitle: '本地检查 Windows 是否被免费 VPN 残留注入系统代理或异常路由',
    configLang: 'powershell',
    configCode: `# 检查当前 Windows 系统级代理与异常虚拟网卡
Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" | Select-Object ProxyEnable, ProxyServer, AutoConfigURL
Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object Name, InterfaceDescription`,
    checklistTitle: '免费代理安全自查底线',
    extraFaqs: [
      {
        q: '只是用浏览器查一下海外文档，用 GitHub 公开免费节点安全吗？',
        a: '如果一定要临时急救，请只用开源客户端（Clash Verge Rev / v2rayNG）导入节点文本，绝不安装闭源“免费 VPN 软件”，且连接期间绝对不要登录邮箱、社媒或金融账号。'
      },
      {
        q: '为什么用免费节点打开 Google 每次都要点十几张图片验证码？',
        a: '因为同一个免费出口 IP 同时被成千上万个爬虫和自动化工具共用，早已进入 Google 与 Cloudflare 的高风险灰名单。'
      },
      {
        q: '零预算有什么合法合规的替代思路？',
        a: '学术与开源镜像可优先使用国内高校镜像站（TUNA/USTC）解决软件依赖拉取，确实需要访问海外科研或 AI 工具时，年付 ¥79–¥99 轻量方案每天成本不到 3 毛钱。'
      }
    ]
  },
  a7: {
    architectureDeepDive: `零基础学习「科学上网」最容易混淆的是**服务商（机场）、订阅（Subscription）、协议（Protocol）与客户端（Client）**四者关系：机场在远端维护多台代理服务器并把连接参数打包成一个 HTTPS 订阅链接；你在本地设备安装开源客户端（如 Clash Verge Rev、v2rayN、Shadowrocket）导入这条链接；客户端内置代理内核（Mihomo / Xray / sing-box）根据规则文件决定哪些网站直连、哪些域名加密转发给机场节点。理解了这层分工，以后无论更换哪家支持通用订阅的机场或更换电脑手机，都只需 30 秒重新粘贴订阅即可迁移。`,
    configTitle: 'Clash 规则配置中基础分流逻辑示意（直连 / 代理 / 拦截）',
    configLang: 'yaml',
    configCode: `mode: rule
mixed-port: 7897
allow-lan: false
rules:
  - DOMAIN-SUFFIX,openai.com,AI-节点组
  - DOMAIN-SUFFIX,github.com,节点选择
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,节点选择`,
    checklistTitle: '新手入门六步闭环核对',
    extraFaqs: [
      {
        q: '什么是“订阅链接”？为什么千万不能截图发到微信群里？',
        a: '订阅链接 URL 末尾通常带有唯一的 `token=` 身份凭证，任何人拿到链接就能直接导入并消耗你的全部购买流量。截图求助前务必打码或截取左侧状态栏即可。'
      },
      {
        q: 'VLESS、Trojan 和 Shadowsocks 协议对普通用户操作上有什么区别？',
        a: '只要你的客户端是最新的 Mihomo（Clash Verge Rev / FlClash）或 Xray/sing-box（v2rayN / Shadowrocket / Hiddify），这三种协议导入后使用体验完全一致，无需手工设置底层加密参数。'
      },
      {
        q: '为什么刚买完订阅导入却显示节点数 0 或超时？',
        a: '常见原因是新购套餐生效有几十秒延迟、复制成了网页地址栏而非“复制 Clash 订阅”、或本地旧代理未关闭阻断了订阅拉取请求。'
      }
    ]
  },

  // === 2. VPN 与加速器 (/vpn/) ===
  v1: {
    architectureDeepDive: `对比「传统商业 VPN」与「国内优化专线机场」，核心工程差异在**隧道封装层与路由分流模型**。传统商业 VPN 基于 OpenVPN（特征明显的 TLS/UDP 握手）或原生 WireGuard（固定 UDP 特征且无内建抗探测伪装）在操作系统创建全流量三层虚拟网卡，默认把 100% 流量发往海外机房，这不仅会让国内微信/网银访问绕远变慢，还极易在跨境公网出口被识别限速。而现代代理体系采用 **VLESS-Reality / Trojan + Mihomo/sing-box 七层规则引擎**，既能模拟常规 HTTPS 网站握手特征，又能在本地以微秒级速度把国内网站直接放行。`,
    configTitle: '用 curl 快速测试当前连接是否按预期走分流出口',
    configLang: 'bash',
    configCode: `# 1. 验证国内 IP 查询接口应返回本地宽带运营商（直连生效）
curl -s https://myip.ipip.net

# 2. 验证海外接口应返回目标代理节点所在国家/地区（代理生效）
curl -s https://api.ip.sb/geoip`,
    checklistTitle: 'VPN vs 专线机场 5 维对照',
    extraFaqs: [
      {
        q: '传统商业 VPN 的“严格无日志审计”和机场有什么本质差异？',
        a: '部分头部海外 VPN 邀请四大会计师事务所进行公开无日志审计且有公司实体背书；而大多数机场属于轻资产技术团队运营，不适合作为极高敏匿名需求的工具。'
      },
      {
        q: '外贸公司多员工远程协作应该选哪一种？',
        a: '若看重国内连接稳定度与访问海外独立站、社媒工具速度，可考虑企业定制专线（如光速云 ¥680 独享原生 IP 或暮光 ¥600 定制档），保证环境独立不串号。'
      },
      {
        q: '能不能把手机上的商业 VPN 和 Clash 同时打开？',
        a: '不能。iOS 与 Android 在系统层面同一时间只允许存在一个活跃的 VPN 隧道接口（NetworkExtension / VpnService），后开启的会直接挤掉前一个。'
      }
    ]
  },
  v2: {
    architectureDeepDive: `对「免费 VPN」与浏览器代理插件进行流量抓包和权限审计时，会发现两类极高的隐蔽代价：**带宽劫持（Residential Proxy Botnet）**与**浏览器 DOM/Cookie 注入风险**。部分海外免费 VPN 客户端在安装条款中嵌入了“P2P 节点共享”授权，用户一旦空闲挂机，第三方陌生人购买的爬虫流量就会从用户的家庭宽带 IP 发出。而 Chrome/Edge 商店里来路不明的免费 VPN 扩展拥有 \`proxy\` 和网页读写权限，不但经常劫持电商返利链接，还会在浏览器层面强行覆盖 Clash Verge Rev 的系统代理端口，导致本地代理看似开启实则完全无效。`,
    configTitle: 'Chrome / Edge 检查是否有第三方扩展抢占了浏览器代理控制权',
    configLang: 'text',
    configCode: `1. 在浏览器地址栏打开：chrome://settings/system （Edge 为 edge://settings/system）
2. 点击「打开您计算机的代理设置」观察状态
3. 若出现“某些设置由扩展程序控制”提示，进入 chrome://extensions 逐一停用所有“VPN / 加速器 / 代理切换”类扩展后重启浏览器。`,
    checklistTitle: '免费 VPN 风险排查表',
    extraFaqs: [
      {
        q: '大厂出的“每月送 2GB–10GB 免费版 VPN”在国内能稳定用吗？',
        a: '这类正规 Freemium 产品虽然隐私相对有保障，但协议几乎未针对国内公网干扰做专项优化，实际经常卡在连接阶段，很难充当日常主力。'
      },
      {
        q: '把免费 VPN 插件卸载后，为什么浏览器依然提示代理连接失败？',
        a: '检查浏览器是否残留了 `ZeroOmega / SwitchyOmega` 或其他安全卫士的 PAC 脚本，重置代理模式为“系统代理”即可恢复。'
      },
      {
        q: '为什么仅靠浏览器插件无法满足开发者或桌面软件使用？',
        a: '浏览器插件只在 Chrome 进程内部生效，终端里的 `git`、`npm`、`pip`、`docker` 以及桌面版 ChatGPT、Telegram 完全不读浏览器扩展配置。'
      }
    ]
  },
  v3: {
    architectureDeepDive: `在「手机 VPN」领域，Android 与 iOS 面临截然不同的系统约束。**iOS 生态**将 NetworkExtension 扩展进程的内存上限严格限制在约 **50MB** 左右：如果机场下发的 Clash/小火箭配置文件里塞进了动辄几万行的未编译纯文本规则，iOS 后台扩展在切换 Wi-Fi/5G 时就容易因 OOM（内存溢出）直接闪退断网；因此 iOS 推荐优先使用原生高效的 **Shadowrocket** 或支持轻量二进制 MRS/SRS 规则集的 **Stash / Karing**。**Android 生态**则相反，内存宽松但国产 ROM 后台杀进程极其激进，必须关闭电池优化并配置分应用代理绕过国内 App，才能兼顾续航与消息即时推送。`,
    configTitle: 'Android 端通过 ADB 或系统设置确保代理服务后台保活',
    configLang: 'bash',
    configCode: `# 进阶用户可通过 ADB 将 v2rayNG / FlClash 加入系统 Doze 电池白名单（无需 Root）
adb shell dumpsys deviceidle whitelist +com.v2ray.ang
adb shell dumpsys deviceidle whitelist +com.follow.clash`,
    checklistTitle: '双平台移动端配置要点',
    extraFaqs: [
      {
        q: '为什么千万不能在 iPhone 的「设置 → iCloud」里登录别人分享的美区 Apple ID？',
        a: '一旦在系统 iCloud 登录他人账号，对方可在网页端开启「查找我的 iPhone」远程抹除或锁定你的手机并勒索解锁费。下载 Shadowrocket 只允许在「App Store 应用商店」右上角切换账号！'
      },
      {
        q: '手机从 Wi-Fi 切换到 5G 移动网络时经常要等半分钟才恢复联网怎么办？',
        a: '这是网络接口切换导致旧 UDP/TCP 长连接失效。在 Shadowrocket 开启「按需连接」或切到更轻量的 v2rayNG / FlClash 通常可显著加快重连。'
      },
      {
        q: '手机开启分应用代理时，哪些国内软件一定要放进绕过列表？',
        a: '微信、支付宝、各家手机银行、12306、滴滴、高德地图以及国内网游务必绕过代理，既省电池又避免银行类 App 触发异地安全风控。'
      }
    ]
  },
  v4: {
    architectureDeepDive: `评估「VPN 软件与机场客户端」时，业内最重要的分水岭是**代码可审计性（开源通用客户端）vs 闭源黑盒（机场专属客户端）**。在开源侧，Clash Verge Rev、v2rayN、FlClash、Hiddify、v2rayNG 均托管于 GitHub，底层转发内核（Mihomo / Xray-core / sing-box）完全开源且可独立替换校验，没有任何暗中采集本地数据的动机。而在闭源专属客户端侧（如飞猫云、Firefly、SOGO 云、隐形人等），用户虽然省去了研究订阅和 YAML 规则的精力，但系统网络接管权限完全交给服务商提供的可执行文件。建议进阶用户与开发工作机优先坚持开源通用客户端。`,
    configTitle: 'Windows 下核对下载安装包 SHA-256 哈希防止下载到仿冒木马',
    configLang: 'powershell',
    configCode: `# 下载 GitHub Release 安装包后，在本地比对官方公布的 SHA256 值
Get-FileHash -Path "$HOME\Downloads\Clash.Verge_x64-setup.exe" -Algorithm SHA256`,
    checklistTitle: '客户端软件安全与可维护性评测标准',
    extraFaqs: [
      {
        q: '为什么很多搜索引擎排名第一的“Clash 中文官网”其实是钓鱼站？',
        a: '开源项目通常不做商业竞价广告，灰产团伙购买广告位并高仿 UI，在安装包里捆绑木马或修改浏览器主页。任何时候都应直接核对 GitHub 仓库原名。'
      },
      {
        q: '既想给家里小白用专属客户端，自己又想用 Clash 怎么办？',
        a: '挑选“自研客户端 + 第三方通用订阅双支持”的品牌即可，例如光速云、星岛梦、微风网络、二猫云、唯兔云、梯子云等均属于双轨兼容型。'
      },
      {
        q: '如何判断一个开源代理客户端是不是已经停止维护？',
        a: '打开其 GitHub 仓库查看最近一次 Release 发布日期与 Issues 响应状态（例如原版 Clash for Windows 已删库停更，Mihomo Party 亦需单独关注仓库迁移状态）。'
      }
    ]
  },
  v5: {
    architectureDeepDive: `「VPN 加速器」与游戏联机的技术核心在于 **UDP 转发能力、NAT 映射类型（FullCone vs Symmetric）以及虚拟网卡 TUN 接管**。Switch、PS5、Xbox 与部分 PC 联机游戏依赖 UDP P2P 互连，如果节点不支持 UDP 或处于对称型 NAT（Symmetric NAT），游戏内测速就会掉入 NAT Type D，导致匹配不到队友或语音掉线；而实测截图中显示 \`FullCone\` 的节点（如光速云 VLESS 9Gbps 批次绝大多数节点）可实现 NAT Type A/B。此外，由于游戏启动器通常忽略 HTTP 系统代理，必须启用 Clash Verge Rev 的 **TUN 模式**才能接管 UDP 游戏流量。`,
    configTitle: '在 Mihomo / Clash Verge Rev 中显式确保 UDP 转发与游戏进程接管',
    configLang: 'yaml',
    configCode: `# 确保 TUN 开启且系统堆栈使用兼容性最好的 mixed
tun:
  enable: true
  stack: mixed
  auto-route: true
  auto-detect-interface: true
  dns-hijack:
    - "any:53"`,
    checklistTitle: '联机与桌面应用加速核查项',
    extraFaqs: [
      {
        q: '在 Clash 节点列表里怎么知道一个节点支不支持游戏联机？',
        a: '节点底层配置必须包含 `udp: true`，且实测图中 UDP 类型为 `FullCone` 或 `RestrictedCone`；若写着 `Unknown` 且无法通过 STUN 检测，联机往往受限。'
      },
      {
        q: '为什么开了 TUN 模式后，国内软件或 Steam 下载反而变慢了？',
        a: '需检查规则中是否把 Steam 下载域名（`steamcontent.com`）与国内网段正确设为 `DIRECT` 直连，切忌在全局（Global）模式下使用游戏加速。'
      },
      {
        q: '打竞技类 FPS（如 Valorant / CS2 外服）用机场专线能替代专业游戏加速器吗？',
        a: '可以临时救急，但专业游戏加速器针对特定游戏服做过路由静态绑定和丢包重传调优，如果是重度竞技玩家仍建议专款专用。'
      }
    ]
  },
  v6: {
    architectureDeepDive: `在「买专线机场 vs 自建 VPS vs 买游戏加速器」三者之间做技术与财务算账，核心变量是**出口线路质量、IP 独享度与维护时间成本**。买一台普通的美国 5 美元/月 VPS 自建 VLESS-Reality，虽然 IP 完全独享、隐私满分，但走普通民用线路一到晚高峰就丢包卡顿；而买带 CN2 GIA / CMIN2 / 9929 优质优化线路的 VPS，一年费用往往高达 ¥430–¥1,100，且只有一个国家节点。相比之下，¥99/年或 ¥25/月的 IEPL 专线机场直接拥有港、日、新、台、美 60+ 节点且无需自己折腾运维。`,
    configTitle: '自建 VPS 常见 VLESS-Reality 与 BBR 拥塞控制基础调优参考',
    configLang: 'bash',
    configCode: `# Linux VPS 上检查是否已开启 Google BBR 拥塞控制以降低高延迟跨洋链路掉速
sysctl net.ipv4.tcp_congestion_control
# 若输出非 bbr，可在 /etc/sysctl.conf 启用 net.core.default_qdisc=fq 与 net.ipv4.tcp_congestion_control=bbr`,
    checklistTitle: '三种方案年度成本与能力对比',
    extraFaqs: [
      {
        q: '自建 VPS 为什么还会遇到 ChatGPT 或 Netflix 封锁？',
        a: '大多数低价 VPS 属于知名数据中心机房 ASN（如 DigitalOcean、Vultr、RackNerd），这些 IP 段早已在流媒体与 AI 平台重点拦截列表中，独享 IP 不等于原生解锁 IP。'
      },
      {
        q: '如果一定要自建，怎么和机场配合最合理？',
        a: '用自建单节点专门处理个人隐私敏感请求或当终极应急备用；日常大流量 4K 影音、多国地区切换与 AI 办公交给靠谱的 IEPL 专线机场。'
      },
      {
        q: '游戏加速器为什么不能用来上 Google？',
        a: '合规游戏加速器采用进程与游戏服 IP 白名单加速机制，完全不代理浏览器和普通海外域名，两者属于完全不同的工具类别。'
      }
    ]
  },
  v7: {
    architectureDeepDive: `筛选真正「好用的 VPN / 代理方案」时，除了单次测速跑分，决定长期幸福感的是三个软指标：**全屋多设备兼容性、流媒体 4K/8K 单线程余量以及“防送中”地区稳定性**。对于拥有 Apple TV、Switch、智能电视与多部手机的家庭，逐台配置客户端极其繁琐；选择明确标注不限设备且支持 Clash 通用订阅的服务商（如光速云、星岛梦、唯兔云、一翻云），就可以用一台百元级 OpenWrt 旁路由接管客厅大屏，同时保证个人手机在外切 5G 时用小火箭/v2rayNG 无缝衔接。`,
    configTitle: 'Clash 针对 Google / YouTube 防止推荐异常与定位错乱的域分流',
    configLang: 'yaml',
    configCode: `# 将 Google 全家桶固定指向实测非送中的香港或日本策略组
rules:
  - DOMAIN-SUFFIX,youtube.com,影音流媒体-港日组
  - DOMAIN-SUFFIX,googlevideo.com,影音流媒体-港日组
  - DOMAIN-SUFFIX,ytimg.com,影音流媒体-港日组
  - DOMAIN-SUFFIX,netflix.com,影音流媒体-港日组`,
    checklistTitle: '高体验家庭与流媒体配置准则',
    extraFaqs: [
      {
        q: '一家 4 口共享同一个不限设备机场账号，选多少 GB 套餐合适？',
        a: '如果只是日常手机浏览、查资料与偶尔看剧，每月 150–200GB 即可满足；如果客厅电视经常播 4K YouTube 或 Netflix，建议直接选 300–600GB 档位。'
      },
      {
        q: '为什么有时候香港节点看 YouTube 正常，换到台湾节点反而没会员功能了？',
        a: '如光速云 2026-08-19 实测截图所示，部分台湾与新加坡节点存在被 Google 定位“送中(CN)”的现象。追剧与听 YouTube Music 优先切换至香港或日本节点即可恢复。'
      },
      {
        q: 'Apple TV 上面可以装代理客户端吗？',
        a: '可以。tvOS 17 及以上版本已原生开放 VPN 框架，使用美区账号在 Apple TV 下载 Stash 或 Shadowrocket 导入通用订阅即可实现大屏 4K 直通。'
      }
    ]
  },

  // === 3. Clash 客户端 (/clash/) ===
  cl1: {
    architectureDeepDive: `2023 年底原版 Clash 与 Clash for Windows（CFW）归档停更后，整个中文代理客户端生态完成了向 **Mihomo（原 Clash Meta）** 与 **sing-box** 双核的平滑迁移。之所以必须放弃旧版 CFW，是因为老内核不仅完全无法解析 **VLESS-Reality、Hysteria 2、TUIC v5、AnyTLS** 等 2025–2026 年主流抗干扰协议，还遗留了已知的本地安全漏洞。当前桌面端最活跃、文档最全的是基于 Rust/Tauri 的 **Clash Verge Rev**；偏好极简跨端界面可选 **FlClash**；需要多核心共存与高级节点管理则选 **v2rayN**。`,
    configTitle: '判断现有订阅文件是否依赖 Mihomo 新特性（快速自检关键字）',
    configLang: 'yaml',
    configCode: `# 若你的机场订阅 YAML 中包含以下任一字段，则旧版 Clash 必然报错，必须使用 Clash Verge Rev / FlClash：
# 1. type: vless  /  reality-opts
# 2. type: hysteria2
# 3. type: tuic
# 4. sniffer: { enable: true }
# 5. rule-providers 中使用 format: mrs`,
    checklistTitle: '全平台 Clash 生态替代矩阵',
    extraFaqs: [
      {
        q: '把 Clash for Windows 换成 Clash Verge Rev 后，原来的机场订阅还要重新买吗？',
        a: '完全不用。直接把机场面板里的 Clash 订阅 URL 复制粘贴到 Clash Verge Rev 的「订阅」页面导入即可无缝接管。'
      },
      {
        q: 'Clash Verge Rev 和 FlClash 都是 Mihomo 内核，怎么二选一？',
        a: '如果你重度使用桌面电脑的扩展脚本（JS Script）、TUN 服务模式和本地规则覆写，Clash Verge Rev 功能最成熟；如果你同时在用安卓手机且希望两端操作界面完全一致，FlClash 非常顺手。'
      },
      {
        q: '为什么有些文章里还在推荐 Mihomo Party？',
        a: '第三方客户端资料已提示需单独核实 Mihomo Party 当前仓库的维护与迁移状态，新装机用户优先选择持续高频发版的 Clash Verge Rev 或 FlClash 更省心。'
      }
    ]
  },
  cl2: {
    architectureDeepDive: `深入使用 **Clash Verge Rev** 时，决定体验上限的两个核心机制是 **Service Mode（服务模式 + TUN）** 与 **全局扩展覆写（Merge / Script）**。系统代理模式（监听本机 7897 混合端口）只能接管自觉读取操作系统代理环境变量的程序；而通过 Service Mode 注册系统后台守护进程后开启的 TUN 虚拟网卡，可以直接在 IP 网络层拦截所有桌面应用、终端命令行、WSL2、Docker 与 UWP 应用的数据包。再配合全局扩展脚本，即便机场每周自动刷新覆盖 YAML 订阅，你自定义的 AI 策略组、私有网段排除与自定义 DNS 依然 100% 保留。`,
    configTitle: 'Clash Verge Rev 全局扩展配置（Merge YAML）防覆盖实用模板',
    configLang: 'yaml',
    configCode: `# 右键「全局扩展配置 (Merge)」粘贴以下片段，每次更新订阅均自动生效
tun:
  enable: true
  stack: mixed
  auto-route: true
  route-exclude-address:
    - 192.168.0.0/16
    - 10.0.0.0/8
    - 172.16.0.0/12
prepend-rules:
  - DOMAIN-SUFFIX,internal.company.local,DIRECT`,
    checklistTitle: 'Clash Verge Rev 进阶设置核对',
    extraFaqs: [
      {
        q: '开启 TUN 模式后，还需要同时打开“系统代理”开关吗？',
        a: '多数情况下开启 TUN 后无需再开系统代理；但少数浏览器或 Electron 客户端仍会检测系统代理变量，两者同时开启通常也不会冲突，只要记住不要在公司内网 VPN 开启时叠加 TUN 即可。'
      },
      {
        q: 'Windows 上面安装服务模式（Service Mode）报错怎么办？',
        a: '通常被杀毒软件拦截了服务注册。先退出 Clash Verge Rev，在杀软添加程序目录白名单后右键“以管理员身份运行”安装一次服务模式即可。'
      },
      {
        q: '每次重启电脑后都要手动打开 Clash Verge Rev 吗？',
        a: '在「设置 → 系统设置」中打开「开机自启」与「静默启动」，即可开机自动在托盘生效。'
      }
    ]
  },
  cl3: {
    architectureDeepDive: `在「Clash Verge 下载」环节，最大的安全隐患来自搜索引擎中文仿冒广告站与非官方网盘搬运包。开源软件的唯一可信分发源是作者官方 GitHub Releases 仓库（\`clash-verge-rev/clash-verge-rev\`）。此外，不同操作系统与芯片架构必须精准对应：**Windows** 绝大多数台式机/笔记本选 \`x64-setup.exe\`，仅高通骁龙 ARM 笔记本选 \`arm64\`；**macOS** 苹果 M 系列芯片（M1/M2/M3/M4）务必选 \`aarch64.dmg\`，旧款 Intel Mac 才选 \`x64.dmg\`；**Linux** 优先选原生 \`.deb\` 或 \`.rpm\` 包。`,
    configTitle: 'macOS 解除未公证开源安装包 Gatekeeper 隔离与 Linux FUSE 依赖修复',
    configLang: 'bash',
    configCode: `# macOS（确认安装包来自官方 GitHub Release 后执行）：
sudo xattr -r -d com.apple.quarantine "/Applications/Clash Verge.app"

# Ubuntu 24.04 若选择运行 AppImage 格式：
sudo apt update && sudo apt install -y libfuse2t64
chmod +x Clash.Verge_*.AppImage && ./Clash.Verge_*.AppImage`,
    checklistTitle: '官方安装包选型核对表',
    extraFaqs: [
      {
        q: '安装版（setup.exe）和绿色便携版（portable.zip）有什么功能区别？',
        a: '核心功能完全一致，但安装版在配置开机自启与 Service Mode 系统服务时路径最稳定，便携版适合临时插 U 盘使用且需留意写权限目录。'
      },
      {
        q: 'macOS 下载了 x64 版本在 M3 Mac 上能运行吗？',
        a: '虽然能通过 Rosetta 2 转译运行，但内存占用更高且可能导致 TUN 权限异常，务必下载标明 `aarch64` 的原生 Apple Silicon 安装包。'
      },
      {
        q: '国内电脑完全打不开 GitHub 怎么安全获取正版安装包？',
        a: '可先用手机已有可用环境在 GitHub Releases 官方页下载并核对 SHA-256，再通过微信文件传输或局域网传给电脑，切勿在百度搜未知高速下载器。'
      }
    ]
  },
  cl4: {
    architectureDeepDive: `理解「Clash Verge 订阅」的工作流需要掌握三个技术细节：**User-Agent 识别、HTTP 订阅流量头（Subscription-Userinfo）与订阅转换安全**。许多机场服务端根据客户端发出的 \`User-Agent\` 返回不同格式的配置文件（给 Clash 返回 YAML，给 v2rayNG 返回 Base64）；如果你的链接是通用链接，在 Clash Verge Rev 导入时若出现格式错误，说明机场后端要求复制专门的 Clash 订阅入口或修改订阅 User-Agent。至于订阅转换（Subconverter），除非万不得已，否则**绝对不要把主力付费订阅贴进陌生人搭建的公共在线转换网站**，避免订阅 Token 明文泄露。`,
    configTitle: '用 curl 模拟 Clash 客户端验证订阅链接返回值是否正常',
    configLang: 'bash',
    configCode: `# 检查机场订阅链接是否正常返回 YAML 内容及剩余流量 HTTP Header
curl -I -A "clash-verge/v2.0.0" "你的订阅链接地址"
# 正常响应应包含 HTTP/2 200 以及 subscription-userinfo: upload=...; download=...; total=...; expire=...`,
    checklistTitle: '订阅导入与安全规范核对',
    extraFaqs: [
      {
        q: '为什么机场后台写了“一键导入 Clash”，我点了之后浏览器没反应？',
        a: '一键导入依赖 `clash://install-config?url=...` 系统 URL Scheme 注册。如果在精简版系统或特定浏览器未生效，直接点击「复制订阅链接」，然后手动粘贴进 Clash Verge Rev 顶部输入框导入即可，效果 100% 相同。'
      },
      {
        q: '订阅自动更新间隔设为多久比较合理？',
        a: '建议设为 `1440` 分钟（每 24 小时自动更新一次）。设得太频繁（如每 10 分钟）容易触发机场防火墙限流误封 IP。'
      },
      {
        q: '导入机场订阅后界面没有显示剩余流量和到期时间怎么办？',
        a: '右键订阅卡片选择「编辑信息」确认未屏蔽流量头信息，再右键点击「更新」；部分仅支持专属客户端或旧版面板的机场不返回该 Header。'
      }
    ]
  },
  cl5: {
    architectureDeepDive: `**Mihomo（原 Clash Meta）**内核之所以能成为当前桌面与软路由生态的绝对主力，核心在于三项底层架构革新：第一，原生支持 **VLESS-Reality、Hysteria 2、TUIC v5** 等无证书/QUIC 新协议；第二，引入 **Sniffer TLS/HTTP 流量嗅探**，即使某些桌面软件或手游跳过系统 DNS 直接向纯 IP 发起 HTTPS 连接，Mihomo 也能从 TLS ClientHello 的 SNI 字段还原出真实域名并正确走代理分流；第三，支持二进制 **MRS / GeoSite** 规则集，把数十万条分流规则的内存占用压低到几 MB。`,
    configTitle: 'Mihomo 核心 Sniffer 域名嗅探与防 DNS 泄漏推荐配置',
    configLang: 'yaml',
    configCode: `sniffer:
  enable: true
  parse-pure-ip: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
    TLS:
      ports: [443, 8443]
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver: [223.5.5.5, 119.29.29.29]
  nameserver: ["https://dns.alidns.com/dns-query"]
  fake-ip-filter:
    - "+.lan"
    - "+.local"
    - "time.*.com"
    - "+.ntp.org"`,
    checklistTitle: 'Mihomo 内核特性启用检查表',
    extraFaqs: [
      {
        q: '开启 Fake-IP 模式后，会影响国内网银、PT 下载或公司内网 VPN 吗？',
        a: '大多数常规网页不受影响，但公司私有内网域名（`*.corp`）和 NTP 时间服务器须加入 `fake-ip-filter`；若是高阶 PT 玩家或遇到个别软件异常，可在配置中切换为 `redir-host` 模式测试。'
      },
      {
        q: '怎么确认自己的 Clash Verge Rev 正在运行 Mihomo 而不是老版 Clash 内核？',
        a: '在软件左侧「设置 → Clash 内核」查看当前勾选状态，正常应显示 `Mihomo`（支持点击右侧刷新按钮在线升级至最新稳定内核）。'
      },
      {
        q: 'DNS 配置里的 default-nameserver 和 nameserver 有什么区别？',
        a: '`default-nameserver` 必须填纯 IP（如 `223.5.5.5`），它只干一件事：把 `dns.alidns.com` 这类加密 DoH 域名解析成 IP；随后所有日常域名解析才交给加密的 `nameserver`。'
      }
    ]
  },
  cl6: {
    architectureDeepDive: `掌握「Clash 使用教程」的本质在于用最少的规则解决最高频的日常刚需：其一，**策略组分离**——利用 Mihomo 的正则表达式筛选器（\`filter\`）把同一个机场节点按地区自动切分成“日常香港组”、“AI 新加坡组”和“美国开发组”，实现低延迟刷网页与稳定访问 ChatGPT/Gemini 并存；其二，**局域网共享（Allow LAN）**——将已联网 PC 的 7897 混合端口开放给同一路由器下的手机、iPad、Switch 与 PS5，无需额外购买软路由硬件即可解决游戏主机下载与更新慢的问题。`,
    configTitle: '局域网共享放行 Windows 防火墙端口与分流验证命令',
    configLang: 'powershell',
    configCode: `# 以管理员运行 PowerShell，为 Clash 混合端口 7897 放行局域网入站访问（限专用网络）
New-NetFirewallRule -DisplayName "Clash Verge LAN Proxy" -Direction Inbound -Protocol TCP -LocalPort 7897 -Action Allow -Profile Private`,
    checklistTitle: '日常高频进阶场景配置表',
    extraFaqs: [
      {
        q: '为什么我配置了 AI 策略组规则，浏览器访问 Gemini 还是报错？',
        a: '检查三件事：① 策略组是否错选成了香港或美国节点（以光速云实测为例，Gemini 需选新加坡/马来/土耳其）；② 浏览器是否开启了自带的“安全 DNS（DoH）”；③ 切完节点后请用无痕窗口清除旧区域 Cookie 再试。'
      },
      {
        q: '开启允许局域网连接（Allow LAN）会让外网陌生人连上我的电脑吗？',
        a: '只要你的电脑处在家庭路由器内网（NAT 后方），公网无法主动访问你的内网 IP；在公共咖啡厅或酒店 Wi-Fi 下则务必关闭 Allow LAN！'
      },
      {
        q: '“规则（Rule）”模式和“全局（Global）”模式日常究竟该用哪个？',
        a: '99% 的日常时间请锁定在 **规则（Rule）** 模式；只有在极少数冷门海外网站漏出国内分流规则时，才临时切到全局验证。'
      }
    ]
  },
  cl7: {
    architectureDeepDive: `建立「Clash 故障排查」工程思维的关键，是把黑盒网络链路拆成**四层隔离验证**：第一层（应用到客户端入口），看 Clash「连接（Connections）」列表有没有请求记录——没有记录说明浏览器插件或系统代理根本没把流量送进 Clash；第二层（协议与时间校验），确保系统时间误差在 30 秒内且内核为 Mihomo；第三层（机场节点出口），看日志是否报错 \`dial tcp / i/o timeout\`；第四层（DNS 与回环），排查浏览器 DoH 旁路、残留代理注册表以及 UWP 微软商店沙盒回环限制。`,
    configTitle: 'Windows 退出 Clash 后断网的一键清理恢复命令',
    configLang: 'powershell',
    configCode: `# 若异常退出导致所有网页报 ERR_PROXY_CONNECTION_FAILED，运行以下两行立即清理系统代理残留
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -ErrorAction SilentlyContinue`,
    checklistTitle: '5 分钟精准排障决策树',
    extraFaqs: [
      {
        q: '为什么 Clash 里测速全是绿色 30ms，一开网页就是无法访问？',
        a: '90% 是因为 Chrome/Edge 里装了冲突的代理扩展（如 SwitchyOmega 或旧 VPN 插件）把浏览器流量指向了一个已关闭的旧端口（例如 7890），而 Clash Verge Rev 默认端口是 7897。'
      },
      {
        q: '提示端口 7897 被占用（bind: address already in use）怎么处理？',
        a: '说明后台残留着上一个未退出的 `mihomo.exe` 进程，或者其他软件占用了 7897。打开任务管理器结束残留 mihomo 进程，或者在 Clash 设置里把混合端口改成 `7899` 即可。'
      },
      {
        q: '为什么 Microsoft Store、Xbox 应用在开着 Clash 时显示没有网络？',
        a: 'Windows UWP 沙盒默认禁止访问本机回环地址（127.0.0.1）。在 Clash Verge Rev 设置页打开内置「UWP 工具」，勾选对应应用并点击保存豁免即可。'
      }
    ]
  },

  // === 4. 资源与情报 (/resources/) ===
  r1: {
    architectureDeepDive: `针对「免费节点」与节点 IP 纯净度评估，技术人员应重点理解 **IPRisk（欺诈分）、ASN 归属类型（ISP 住宅 vs Hosting 机房）与地理位置漂移（送中）**三个核心维度。公开爬虫节点池往往集中在少数被滥用的低价 VPS 机房（Hosting ASN），同一 IP 每天承受上千个自动化脚本并发请求，因此欺诈分极高，登录任何需要验证的网站都会频繁弹出滑块或直接被拒；而正规专线机场通过商业宽带或低风控原生段配合分流策略，在实测截图中往往显示 \`LOW\` 或 \`MEDIUM\` 风险等级。`,
    configTitle: '使用终端命令一键核对当前节点的出口 IP、ASN 与国家识别',
    configLang: 'bash',
    configCode: `# 在节点连接生效后，核查真实出口 IP、所属 ASN 编号与机房组织名
curl -s https://ipinfo.io/json
# 示例输出关注字段： "country": "SG", "org": "AS401243 KOMI-NET"`,
    checklistTitle: '节点 IP 纯净度 4 维检测表',
    extraFaqs: [
      {
        q: '怎么一眼判断一个节点是不是“机房脏 IP”？',
        a: '打开 Google 无痕模式随便搜一个关键词，如果直接弹出要求点选红绿灯/消防栓的人机验证，或者访问 Cloudflare 站点直接弹 Shield 盾牌拦截，说明当前 IP 已被高度滥用。'
      },
      {
        q: '为什么有的节点归属地写着台湾，打开 Netflix 却看到西班牙语界面？',
        a: '如灵动云历史实测记录所见，部分廉价广播 IP 段的地理定位库未同步或被复用，会导致平台把台湾落地误判为欧洲地区，选购前须结合实测解锁表确认。'
      },
      {
        q: '普通用户有必要花高价去买“双 ISP 独享住宅 IP”吗？',
        a: '只有运行 TikTok 直播推流、亚马逊主店铺或高权重海外社媒投放才需要独享静态住宅 IP；日常 AI 办公、编程与看剧，正规 IEPL 机场低风控商宽节点已完全够用。'
      }
    ]
  },
  r2: {
    architectureDeepDive: `在「跑路预警」与应急预案体系中，最大的认知误区是“等主力机场断网了再去临时找新机场”。一旦遇到主力大规模宕机或本地运营商 DNS 封锁，你连搜索引擎和软件官网都打不开，届时再找梯子极易慌不择路下载到钓鱼木马。成熟的不断网架构依赖三项离线资产：**本地硬盘存一份开源客户端安装包、Clash Profiles 里预存一份百元级不限时应急订阅（且必须与主力属于不同上游系别）、以及离线保存机场发布页书签**。`,
    configTitle: '在浏览器与本地电脑快速检查是否属于单个域名被 DNS 污染',
    configLang: 'powershell',
    configCode: `# 对比本地默认 DNS 与公共 DoH/海外参考解析结果，判断是否仅发布页域名受阻
Resolve-DnsName -Name "v2raynwiki.homes"
nslookup v2raynwiki.homes 223.5.5.5`,
    checklistTitle: '机场突发失联 3 分钟应急响应表',
    extraFaqs: [
      {
        q: '机场官网打不开就一定是跑路了吗？',
        a: '不一定。很多老牌机场的面板域名会定期遭遇阻断而更换备用网址，但原有订阅节点的转发入口仍正常在线。先用现有 Clash 节点连上外网访问其防失联发布页或通知频道核实。'
      },
      {
        q: '为什么说“充 100 送 200 永久无限流量”几乎 100% 是跑路前兆？',
        a: '跨国 IEPL 专线与原生落地服务器每月都需要按流量或固定带宽向机房续费，无限流量买断制在商业逻辑上完全无法覆盖持续刚性成本。'
      },
      {
        q: '发现一家机场快不行了，已经付过款的年付怎么止损？',
        a: '第一时间把所有重要外网账号的登录验证迁往备用健康机场，停止用将要停服的高危节点登录重要密码库或钱包，并在到期前切换主力。'
      }
    ]
  },
  r3: {
    architectureDeepDive: `围绕「机场 FAQ」的高频疑问，80% 集中在**计费倍率、流量重置机制、HTTPS 隐私边界以及审计屏蔽规则**四个技术常识上。特别需要强调的是 HTTPS 加密边界：当浏览器地址栏显示绿色安全锁头时，用户终端与目标网站（如 Google/GitHub/银行）之间的传输内容经过端到端 TLS 加密，中间任何代理节点只能看到“你在某时连接了哪个域名、走了多少字节”，无法解密账号密码或网页正文；但前提是你**没有安装来路不明的第三方根证书（CA Certificate）**。`,
    configTitle: '查看单条连接流量走向与倍率核算示例',
    configLang: 'text',
    configCode: `示例计算：
购买套餐：100GB / 月
在 1x 倍率节点下载 10GB 文件 -> 面板扣除 10GB（剩余 90GB）
在 2x 倍率专线下载 10GB 文件 -> 面板扣除 20GB（剩余 80GB）
* 注意：机场统计均为“上传流量 + 下载流量”双向总和。`,
    checklistTitle: '计费与隐私核心规则速查',
    extraFaqs: [
      {
        q: '为什么我明明买了 150GB 月付，月底还没用完下个月不会累加？',
        a: '包月制流量类似于手机月租流量包，每 30 天账单日重置为 150GB，当月余量作废不结转；只有标明“一次性不限时流量包”的套餐才会一直保留到用完为止。'
      },
      {
        q: '开启代理后访问国内网站（比如淘宝、百度）会扣我的机场流量吗？',
        a: '只要你的客户端处于「规则（Rule）」模式且 `GEOIP,CN,DIRECT` 规则生效，国内网站流量直接走你家本地宽带直连，1 字节机场流量都不会消耗。'
      },
      {
        q: '为什么在代理下用迅雷或 qBittorrent 下 BT 种子会被机场封号？',
        a: 'BT/P2P 协议会暴露节点海外服务器 IP 并极易招致海外版权方 DMCA 律师函投诉，机房收到投诉会直接拔掉整台服务器网线，因此机场审计规则会强制阻断 BT 端口。'
      }
    ]
  },
  r4: {
    architectureDeepDive: `通过「机场风险情报」对 31 家收录品牌进行交叉审计后，我们识别出三类在普通榜单中极少被披露的结构性风险：**其一是“同源多牌”风险**，比如大佬云、闪电鼠、云界线、榴莲云、环球梯 5 家共享几乎一致的 5.6 元/60GB 参数与季付 7 折机制，历史资料亦披露 Firefly 与微风、飞鸟存在同系关联；**其二是“文实不符”风险**，部分品牌文案宣称 VLESS 或 Trojan，而 2026-08-11 实测截图中下发节点为 Shadowsocks；**其三是“价格与优惠码冲突”**，同一品牌在不同段落出现不同入门价或双版本优惠码。透明披露这些核验细节，能帮用户真正实现多上游分散风险。`,
    configTitle: '核查两家备选机场是否共享同一个落地机房（同源快检）',
    configLang: 'bash',
    configCode: `# 分别连接机场 A 和机场 B 的同名地区节点（如香港01），比对 ASN 与 IP 段是否高度重叠
curl -s https://ipinfo.io/org
curl -s https://ipinfo.io/ip`,
    checklistTitle: '31 家品牌审计 4 类重点风险',
    extraFaqs: [
      {
        q: '宣传协议写 VLESS，实际测速截图显示 Shadowsocks，这是欺诈吗？',
        a: '不一定是欺诈，很多机场会同时维护多套协议入口，或者在特定客户端/历史批次中默认下发兼容性最高的 Shadowsocks；但作为技术评测，必须如实标出截图里的实际协议列。'
      },
      {
        q: '云界线和环球梯的推广链接“缺少 #/ 路由段”会有什么实际影响？',
        a: '部分 SPA 面板在缺少 `#/` 时可能出现子路由跳转 404 或邀请码未自动带入注册框，因此我们在组件中专门加上了链接核验提示，建议注册前留意页面是否正常加载。'
      },
      {
        q: '为什么宇宙云和灵动云、浪网在本站没有放进主力推荐榜单？',
        a: '因为宇宙云当前缺少完整在售套餐表，而灵动云、浪网与 EdgeNova 资料停留在 2026-08-09 历史库，本着不虚构现行数据的原则，将其客观标注为 partial / historical 供核验参考。'
      }
    ]
  },
  r5: {
    architectureDeepDive: `在「节点检测」专题中，理解测速工具底层逻辑能让你一眼识破 90% 的修图广告。当前中文测评圈最常见的是 \`MAI-TEST-BOT\` 与 \`MiaoKo\`（喵速）两类测速面板：**TLS RTT** 衡量的是单次 TLS 数据往返时间，更接近底层专线物理延迟；**HTTPS 延迟** 则是完成一次 HTTP 请求的端到端耗时，受到出口 DNS 解析与远端负载影响；**IPType / IPRisk** 给出落地 IP 的商业属性与风控分；而右侧逐秒柱状图最能暴露“瞬时突发放水、3 秒后断崖限速”的伪高速节点。`,
    configTitle: '手把手用终端命令行自测节点真实 HTTPS 延迟与 OpenAI 连通状态',
    configLang: 'bash',
    configCode: `# 1. 测一次目标海外站点的 TCP/TLS/首包耗时
curl -o /dev/null -s -w "DNS:%{time_namelookup}s Connect:%{time_connect}s TLS:%{time_appconnect}s TTFB:%{time_starttransfer}s\n" https://www.youtube.com

# 2. 检查当前节点出口是否被 OpenAI / Cloudflare 拦截（返回 HTTP 200/302 为正常，403 为被风控）
curl -I -s https://chatgpt.com | head -n 1`,
    checklistTitle: '测速与解锁自检 6 项核心指标',
    extraFaqs: [
      {
        q: '为什么同一节点用手机测速只有 80Mbps，截图里珠海联通 9Gbps 机房能跑 424MB/s？',
        a: '你家里宽带如果是 300M 或 500M（上限仅 37–62MB/s），本地跑分永远不可能突破自家宽带物理上限；实验室大带宽测试验证的是“节点服务器端自身没有瓶颈”。'
      },
      {
        q: '为什么测速图上有些节点显示 `0.00B` 或 `1.60KB/s`？',
        a: '单节点临时维护、远端重启或跨境路由抖动都会导致单个节点失败。保留这些失败节点不删除，才是真实原始测试报告的应有之义。'
      },
      {
        q: 'browserleaks.com 检测出 WebRTC 暴露了真实内网 IP 怎么办？',
        a: '在 Chrome/Edge  flags 或浏览器隐私设置中禁用非代理 UDP WebRTC 暴露，或者直接在桌面端启用 Clash Verge Rev 的 TUN 模式接管全量流量。'
      }
    ]
  },
  r6: {
    architectureDeepDive: `解决「订阅问题」首先要明白订阅更新的本质：**客户端向机场面板域名发起一次普通的 HTTPS GET 请求，拉取一段纯文本（YAML 或 Base64）保存到本地**。因此更新失败 95% 逃不出三种故障：第一，本地宽带或系统代理阻断了对该机场域名的 HTTPS 访问（常见 \`timeout\` 或 \`EOF\`）；第二，当前节点已挂但勾选了“通过代理更新”，形成套娃死锁；第三，系统时间误差超过 TLS 证书有效期容限，或者套餐过期/Token 已在面板被重置。`,
    configTitle: '用 PowerShell 一行验证机场订阅 URL 是否可直连及返回是否合法',
    configLang: 'powershell',
    configCode: `# 测试直连拉取订阅头部状态（请将 URL 替换为你的订阅链接，切勿外泄输出结果）
Invoke-WebRequest -Uri "你的订阅URL" -UserAgent "clash-verge/v2.0.0" -Method Head | Select-Object StatusCode, Headers`,
    checklistTitle: '订阅拉取报错 7 大根因速查',
    extraFaqs: [
      {
        q: '为什么手机 5G 能更新订阅，连上家里 Wi-Fi 就更新失败？',
        a: '典型情况是家里宽带路由器或本地运营商对机场主订阅域名做了 DNS 拦截。在 Clash Verge Rev 勾选「通过代理更新（Use Proxy）」，同时先用手机开热点连上一次节点即可完成更新。'
      },
      {
        q: '怀疑订阅链接在公共转换站或群聊截图中泄露了，怎么彻底补救？',
        a: '立刻登录机场用户面板点击「重置订阅链接（Reset Subscription）」，旧链接会在数秒内失效，随后把新生成的 URL 重新导入你的全部个人设备即可。'
      },
      {
        q: "提示 `yaml: line X: could not find expected ':'` 是什么问题？",
        a: '这说明客户端期待的是 Clash YAML 文件，但服务端返回了一串 Base64 编码或一个报错 HTML 页面。核对是否复制错了“通用 V2Ray 订阅”或套餐已到期。'
      }
    ]
  },
  r7: {
    architectureDeepDive: `在「新手帮助」专题中，把 16 个核心术语与购前 10 步核对清单串起来，能帮你直接跨过 90% 的前期信息差。最重要的是区分三个概念：**协议（Protocol）**决定怎么加密传输（如 VLESS/Trojan/SS），**线路（Line）**决定走公网还是 IEPL/IPLC 专线跨海，**客户端（Client）**决定你本机用什么软件把规则跑起来。记住一条黄金法则：**首单月付试水、保留通用订阅能力、保持规则模式（Rule）、配置异构备用包**。`,
    configTitle: '新手机场购前与上线 10 秒速记口诀',
    configLang: 'text',
    configCode: `购前五问：1.支持Clash/小火箭吗? 2.写的是年付均价还是真月付? 3.全节点1x倍率吗? 4.有2026实测图吗? 5.支持月付试水吗?
上线五做：1.GitHub官方下软件 2.导入后点激活卡片 3.模式锁在Rule规则 4.AI选新/日/美避香港 5.留一份不限时应急包`,
    checklistTitle: '新手零失误全链路核对表',
    extraFaqs: [
      {
        q: '新手第一次买机场，选哪几家试水容错率最高？',
        a: '如果自己愿意花 5 分钟装 Clash Verge Rev 或小火箭，优先看同时支持自研端与通用订阅且有实测留档的品牌（如光速云 ¥25 极速月付、唯兔云 ¥19.9 月付或星岛梦 ¥25 月付）；如果完全不想配任何订阅只想装 App 登录即连，可看飞猫云或无忧链接。'
      },
      {
        q: '买完后为什么微信和国内网页变慢了？',
        a: '99% 是不小心把客户端顶部模式选成了「全局（Global）」。立刻改回「规则（Rule）」即可让国内网站瞬间恢复本地宽带满速。'
      },
      {
        q: '以后换新电脑或换新手机，原来的订阅还要重新花钱买吗？',
        a: '不用，只要你的套餐还在有效期内，在新设备上安装对应开源客户端并导入同一个订阅链接即可继续使用。'
      }
    ]
  }
}
