<script setup lang="ts">
import { brands } from '../../data/brands'
import { clientPlatforms } from '../../data/clients'
import { pillars } from '../../data/navigation'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'
import AirportMatcher from './AirportMatcher.vue'

function openSiteSearch() {
  const btn = document.querySelector<HTMLButtonElement>('.DocSearch-Button, .VPNavBarSearch button')
  if (btn) btn.click()
}

const learningSteps = [
  { num: '01', title: '理解基础概念', desc: '先搞懂协议、订阅、IEPL 专线、倍率与原生 IP 的含义', link: '/resources/beginner-help/proxy-glossary-dictionary' },
  { num: '02', title: '按需挑选服务', desc: '区分年付折算、月付、不限时流量包与客户端模式', link: '/airport/recommend/beginner-selection-guide' },
  { num: '03', title: '下载官方客户端', desc: '从官方 GitHub 或美区商店获取客户端，远离仿冒包', link: '/clash/verge-download/official-release-guide' },
  { num: '04', title: '导入订阅链接', desc: '在 Clash Verge Rev / v2rayN / Shadowrocket 中导入并自动更新', link: '/clash/verge-subscription/import-and-auto-update' },
  { num: '05', title: '分流与测速验真', desc: '配置 AI 策略组，读懂 TLS RTT、吞吐与解锁实测', link: '/resources/node-check/how-to-read-speedtest-charts' },
  { num: '06', title: '常见故障自救', desc: '遇到连上无网、退出断网或订阅拉取超时快速修复', link: '/clash/troubleshooting/connected-no-internet-fix' }
]

const hotTutorials = [
  { tag: '旗舰深度评测', title: '光速云全面深度评测：三网 2Gbps 与 9Gbps 实测截图拆解', desc: '完整核对 7 档套餐、三网吞吐、ChatGPT/Gemini 区域分化与优缺点。', link: '/reviews/guangsuyun' },
  { tag: 'Clash 实战', title: 'Clash Verge Rev 服务模式与 TUN 虚拟网卡完整教程', desc: '解决终端、Docker 与桌面端无法走系统代理的核心配置步骤。', link: '/clash/verge/service-mode-and-tun-setup' },
  { tag: '网络架构', title: 'IEPL 专线、IPLC 与公网 BGP 中转有什么本质区别？', desc: '用拓扑图与延迟数据讲清晚高峰丢包的底层原因。', link: '/airport/stable/iepl-vs-iplc-vs-relay' },
  { tag: 'AI 解锁指南', title: 'ChatGPT、Claude 与 Gemini 节点选型及分流规则', desc: '为什么香港节点经常仅限 OpenAI App？教你配置专属 AI 策略组。', link: '/clash/tutorials/ai-streaming-routing-rules' },
  { tag: '风险审计', title: '31 家机场品牌数据交叉审计：去重、同质化与异常链接披露', desc: '公开核验 Firefly 重复项、5.6 元同源档及协议差异记录。', link: '/resources/risk-intel/31-brands-audit-summary' },
  { tag: '故障诊断', title: 'Clash 连接成功却打不开网页？5 步定位根因并修复', desc: '覆盖系统时间偏移、DNS 污染、代理插件冲突与退出断网恢复。', link: '/clash/troubleshooting/connected-no-internet-fix' }
]

const topBrands = brands.slice(0, 6)

const troubleshootingLinks = [
  { title: '节点有延迟但网页打不开', link: '/clash/troubleshooting/connected-no-internet-fix' },
  { title: '关闭 Clash 后电脑断网恢复', link: '/clash/troubleshooting/windows-proxy-reset-guide' },
  { title: '机场订阅拉取失败或超时', link: '/resources/subscription-issues/subscription-update-failed-fix' },
  { title: 'macOS 安装提示软件已损坏', link: '/clash/verge-download/macos-linux-installation' },
  { title: '如何辨别高危跑路机场前兆', link: '/resources/scam-alert/airport-exit-scam-signals' },
  { title: '订阅泄露导致流量异常暴涨', link: '/resources/subscription-issues/subscription-leak-reset' }
]

const homeFaqs = [
  {
    q: '为什么同一家机场年付标价 8 元/月，点进去月付却是 25 元？',
    a: '很多服务商的“7–8 元/月”是指年付小流量包（例如 99 元/年、每月 69GB）按 12 个月折算出的均价，而非按月续费价。本站所有套餐均明确区分月付、年付折算与一次性不限时包。'
  },
  {
    q: '机场专属客户端和 Clash / v2rayN 第三方通用客户端怎么选？',
    a: '纯新手只求手机电脑登录即用，可选支持专属客户端的品牌（如飞猫云、光速云）；需要自定义 AI 分流、全局覆写或 OpenWrt 软路由透明代理，务必选择提供通用订阅的服务商。'
  },
  {
    q: '单日节点测速图跑出 500Mbps，能证明这家机场绝对稳定吗？',
    a: '不能。测速图只能证明在特定测试时间、测试带宽和节点条件下跑出过相应速度。晚高峰稳定性、AI 解锁与长期口碑仍需结合月付试水和多时段观察。'
  },
  {
    q: '本站的商业合作与机场推荐排行是什么关系？',
    a: '光速云为本站重点合作推广品牌，优先建设深度专题与实测归档；但所有原始测速截图、Gemini 区域限制、节点异常与价格差异均如实披露，商业合作不改写实测数据。'
  }
]
</script>

<template>
  <div class="kb-home">
    <!-- 2. 知识库 Hero -->
    <section class="kb-hero">
      <div class="kb-hero-inner">
        <span class="kb-hero-pill">中文网络工具专业知识库 · 31 家机场核实档案 · 56 主题文档集群</span>
        <h1>v2rayn百科：系统掌握代理客户端、专线线路与机场实测数据</h1>
        <p class="kb-hero-sub">
          覆盖 <strong>Clash Verge Rev / v2rayN / Shadowrocket</strong> 全平台实战教程、<strong>31 家机场品牌</strong>透明参数与原始测速留档、套餐性价比测算及订阅故障排查。
        </p>

        <div class="kb-hero-search">
          <button type="button" class="kb-search-trigger" @click="openSiteSearch">
            <span class="kb-search-placeholder">搜索：光速云、Clash Verge、IEPL、TUN 模式、订阅更新失败、不限时流量包…</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>

        <div class="kb-hero-actions">
          <a href="/airport/guide/beginner-complete-workflow" class="kb-btn-primary">新手零基础入门</a>
          <a href="/brands/" class="kb-btn-secondary">浏览 31 家品牌数据库</a>
          <a href="/clients/" class="kb-btn-secondary">全平台客户端教程</a>
        </div>
      </div>
    </section>

    <div class="kb-home-container">
      <!-- 3. 四大知识主题 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>四大核心知识体系</h2>
            <p>4 个一级专题 → 28 个二级栏目 → 56 个独立文档集群，支持左侧多级目录随时跳转</p>
          </div>
        </div>
        <div class="kb-pillars-grid">
          <article v-for="p in pillars" :key="p.id" class="kb-pillar-card">
            <h3><a :href="p.path">{{ p.title }}</a></h3>
            <p>{{ p.shortDesc }}</p>
            <div class="kb-pillar-links">
              <a v-for="t in p.topics" :key="t.id" :href="t.path">{{ t.title }}</a>
            </div>
            <a :href="p.path" class="kb-pillar-more">进入{{ p.title }}专题 →</a>
          </article>
        </div>
      </section>

      <!-- 4. 新手入门路径 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>新手 6 步快速上手路径</h2>
            <p>按推荐顺序阅读，从零基础术语到完成多设备稳定连网与故障自救</p>
          </div>
          <a href="/resources/beginner-help/" class="kb-sec-link">查看新手帮助中心 →</a>
        </div>
        <div class="kb-learn-grid">
          <a v-for="step in learningSteps" :key="step.num" :href="step.link" class="kb-learn-card">
            <span class="kb-learn-num obs-mono">{{ step.num }}</span>
            <div>
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
          </a>
        </div>
      </section>

      <!-- 5. 热门教程 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>精选深度教程与实测专题</h2>
            <p>聚焦搜索频次最高的核心教程、协议解析与评测文档</p>
          </div>
        </div>
        <div class="kb-grid-3">
          <a v-for="item in hotTutorials" :key="item.link" :href="item.link" class="kb-card">
            <span class="kb-badge kb-badge-blue" style="margin-bottom: 8px;">{{ item.tag }}</span>
            <h4 class="kb-card-title">{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </a>
        </div>
      </section>

      <!-- 6 & 9. 重点品牌深度评测（光速云优先专题） -->
      <section class="kb-section kb-flagship-box">
        <div class="kb-flagship-copy">
          <div class="kb-flagship-tags">
            <span class="kb-badge kb-badge-blue">重点合作品牌深度评测</span>
            <span class="kb-badge kb-badge-green">含 6 张原始实测截图留档</span>
          </div>
          <h2>光速云 2026 全面深度评测与三网实测档案</h2>
          <p>
            收录 2020 年起运营的老牌 IEPL/企业内网双专线服务：完整拆解 99 元年付轻量版、147 元 247GB 永久不限时包与 25–138 元月付体系；直接呈现长沙电信 / 广西移动 / 河北联通 2Gbps 与珠海联通 9Gbps 实测截图，并如实标注香港节点 OpenAI 仅 App 可用及 Gemini 地区分化情况。
          </p>
          <div class="kb-flagship-actions">
            <a href="/reviews/guangsuyun" class="kb-btn-primary">阅读光速云深度评测</a>
            <RegistrationButton slug="guangsuyun" variant="outline" label="光速云注册入口（码 AMM）" />
          </div>
          <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
        </div>
      </section>

      <!-- 7. 机场推荐与品牌数据库预览 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>机场品牌数据库（31 家独立核实档案）</h2>
            <p>支持按线路类型、价格区间、月流量、客户端模式及实测留档状态实时筛选</p>
          </div>
          <a href="/brands/" class="kb-sec-link">打开完整 31 家品牌库 →</a>
        </div>
        <AirportMatcher />
        <div class="kb-grid-3">
          <article v-for="b in topBrands" :key="b.slug" class="kb-mini-brand">
            <div class="kb-mini-head">
              <h4><a :href="b.reviewPath">{{ b.name }}</a></h4>
              <span class="kb-badge kb-badge-slate">{{ b.lineCategory }}</span>
            </div>
            <div class="kb-mini-price obs-mono">{{ b.entryPriceLabel }}</div>
            <p>{{ b.tagline }}</p>
            <div class="kb-mini-foot">
              <a :href="b.reviewPath">完整档案 →</a>
              <span>{{ b.clientMode }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- 8. 跨平台客户端知识库 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>第三方代理客户端文档中心</h2>
            <p>按操作系统整理 20+ 主流开源与商店客户端，均优先指向官方发布渠道</p>
          </div>
          <a href="/clients/" class="kb-sec-link">查看全部客户端对比 →</a>
        </div>
        <div class="kb-grid-3">
          <a v-for="p in clientPlatforms" :key="p.key" :href="p.path" class="kb-card">
            <h4 class="kb-card-title">{{ p.label }}</h4>
            <p>{{ p.note }}</p>
          </a>
        </div>
      </section>

      <!-- 10. 套餐比较与横向对比 -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>套餐性价比与品牌横向对比</h2>
            <p>拒绝只看宣传标语，用真实单 GB 价格、协议兼容性与实测留档做横向决策</p>
          </div>
          <a href="/comparisons/" class="kb-sec-link">查看全部横向对比 →</a>
        </div>
        <div class="kb-grid-2">
          <a href="/comparisons/guangsuyun-vs-muguang-vs-feimao" class="kb-card">
            <h4 class="kb-card-title">光速云 vs 暮光加速 vs 飞猫云</h4>
            <p>双模式综合专线、团队多设备大流量与新手专属客户端三强直接对照。</p>
          </a>
          <a href="/comparisons/budget-5-yuan-tier-comparison" class="kb-card">
            <h4 class="kb-card-title">5.6 元极限平价档 5 家横向审计</h4>
            <p>大佬云、闪电鼠、云界线、榴莲云、环球梯参数同质化与异常链接核验。</p>
          </a>
          <a href="/comparisons/iepl-iplc-flagship-comparison" class="kb-card">
            <h4 class="kb-card-title">主流 IEPL / IPLC 专线机场对比</h4>
            <p>对比光速云、星岛梦、唯兔云、Firefly、一翻云与闪跃的流量与协议差异。</p>
          </a>
          <a href="/airport/value/non-expiring-traffic-packs" class="kb-card">
            <h4 class="kb-card-title">不限时一次性流量包深度对比</h4>
            <p>备用机场怎么买最划算？拆解 100GB–1TB 永久流量包的真实成本。</p>
          </a>
        </div>
      </section>

      <!-- 11 & 12. 故障排查与最新更新 -->
      <section class="kb-section kb-split-2">
        <div class="kb-panel-box">
          <h3>网络故障排查直达</h3>
          <ul class="kb-list-links">
            <li v-for="t in troubleshootingLinks" :key="t.link">
              <a :href="t.link">{{ t.title }}</a>
            </li>
          </ul>
          <a href="/clash/troubleshooting/" class="kb-sec-link">进入故障排查中心 →</a>
        </div>

        <div class="kb-panel-box">
          <h3>近期重点更新档案（{{ siteData.lastVerifiedDate }}）</h3>
          <ul class="kb-list-links">
            <li><a href="/reviews/guangsuyun">光速云三网 2Gbps + 珠海联通 9Gbps 实测补全</a></li>
            <li><a href="/brands/">31 家机场品牌库去重审计上线（含实测截图留档）</a></li>
            <li><a href="/clients/openwrt">OpenWrt / 软路由 OpenClash、Nikki 与 HomeProxy 指南</a></li>
            <li><a href="/comparisons/ai-tools-airport-comparison">ChatGPT / Claude / Gemini 机场节点实测对比</a></li>
            <li><a href="/resources/node-check/how-to-read-speedtest-charts">如何读懂 MiaoKo 与 MAI-TEST-BOT 节点测速图</a></li>
            <li><a href="/about/search-and-maintenance">Algolia 全文搜索配置与 Apache 部署运维指南</a></li>
          </ul>
          <a href="/reviews/" class="kb-sec-link">浏览全部评测更新 →</a>
        </div>
      </section>

      <!-- 13. 常见问题 FAQ -->
      <section class="kb-section">
        <div class="kb-sec-head">
          <div>
            <h2>高频常见问题（FAQ）</h2>
            <p>先给直接结论，再链接完整文档展开技术细节</p>
          </div>
          <a href="/resources/faq/" class="kb-sec-link">查看全部机场 FAQ →</a>
        </div>
        <div class="kb-grid-2">
          <div v-for="faq in homeFaqs" :key="faq.q" class="kb-faq-card">
            <h4>{{ faq.q }}</h4>
            <p>{{ faq.a }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.kb-home {
  background: var(--kb-bg);
}

.kb-hero {
  background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);
  border-bottom: 1px solid var(--kb-border);
  padding: 56px 24px 48px;
}

.kb-hero-inner {
  max-width: 920px;
  margin: 0 auto;
  text-align: center;
}

.kb-hero-pill {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--kb-brand-soft);
  border: 1px solid #BFDBFE;
  color: var(--kb-brand);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 18px;
}

.kb-hero h1 {
  margin: 0 0 16px;
  font-size: clamp(1.9rem, 3.6vw, 2.75rem);
  line-height: 1.25;
  font-weight: 850;
  color: var(--kb-text);
  letter-spacing: -0.025em;
}

.kb-hero-sub {
  margin: 0 auto 26px;
  max-width: 720px;
  font-size: 16.5px;
  line-height: 1.75;
  color: var(--kb-text-2);
}

.kb-hero-search {
  max-width: 640px;
  margin: 0 auto 22px;
}

.kb-search-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid var(--kb-border-strong);
  background: var(--kb-bg);
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.kb-search-trigger:hover {
  border-color: var(--kb-brand);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.1);
}

.kb-search-placeholder {
  font-size: 14.5px;
  color: var(--kb-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kb-search-trigger kbd {
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
  color: var(--kb-text-muted);
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  flex-shrink: 0;
}

.kb-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.kb-btn-primary,
.kb-btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 9px;
  font-size: 14.5px;
  font-weight: 650;
  text-decoration: none;
  transition: background-color 0.15s, border-color 0.15s;
}

.kb-btn-primary {
  background: var(--kb-brand);
  color: #FFFFFF;
}

.kb-btn-primary:hover {
  background: var(--kb-brand-hover);
}

.kb-btn-secondary {
  background: var(--kb-bg);
  color: var(--kb-text);
  border: 1px solid var(--kb-border-strong);
}

.kb-btn-secondary:hover {
  border-color: var(--kb-brand);
  color: var(--kb-brand);
}

.kb-home-container {
  max-width: 1220px;
  margin: 0 auto;
  padding: 16px 24px 20px;
}

.kb-section {
  margin-top: 48px;
}

.kb-sec-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 18px;
}

.kb-sec-head h2 {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 800;
  color: var(--kb-text);
}

.kb-sec-head p {
  margin: 0;
  font-size: 14.5px;
  color: var(--kb-text-muted);
}

.kb-sec-link {
  font-size: 14px;
  font-weight: 650;
  color: var(--kb-brand);
  text-decoration: none;
}

.kb-pillars-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.kb-pillar-card {
  padding: 22px;
  border-radius: 14px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  display: flex;
  flex-direction: column;
}

.kb-pillar-card h3 {
  margin: 0 0 8px;
  font-size: 19px;
  font-weight: 800;
}

.kb-pillar-card h3 a {
  color: var(--kb-text);
  text-decoration: none;
}

.kb-pillar-card p {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--kb-text-muted);
}

.kb-pillar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 16px;
}

.kb-pillar-links a {
  padding: 4px 10px;
  border-radius: 7px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  font-size: 13px;
  color: var(--kb-text-2);
  text-decoration: none;
}

.kb-pillar-links a:hover {
  border-color: var(--kb-brand);
  color: var(--kb-brand);
  background: var(--kb-brand-soft);
}

.kb-pillar-more {
  margin-top: auto;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--kb-brand);
  text-decoration: none;
}

.kb-learn-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.kb-learn-card {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
  text-decoration: none;
  transition: border-color 0.15s, background-color 0.15s;
}

.kb-learn-card:hover {
  border-color: var(--kb-brand);
  background: var(--kb-bg);
}

.kb-learn-num {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--kb-brand-soft);
  color: var(--kb-brand);
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kb-learn-card h4 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-learn-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--kb-text-muted);
}

.kb-flagship-box {
  padding: 28px 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #F8FBFF 0%, #EFF6FF 100%);
  border: 1px solid #BFDBFE;
}

.kb-flagship-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.kb-flagship-copy h2 {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 800;
  color: var(--kb-text);
}

.kb-flagship-copy p {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.75;
  color: var(--kb-text-2);
}

.kb-flagship-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.kb-mini-brand {
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  display: flex;
  flex-direction: column;
}

.kb-mini-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.kb-mini-head h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 750;
}

.kb-mini-head h4 a {
  color: var(--kb-text);
  text-decoration: none;
}

.kb-mini-price {
  font-size: 13px;
  font-weight: 700;
  color: var(--kb-brand);
  margin-bottom: 6px;
}

.kb-mini-brand p {
  margin: 0 0 12px;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--kb-text-muted);
}

.kb-mini-foot {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

.kb-mini-foot a {
  color: var(--kb-brand);
  font-weight: 600;
  text-decoration: none;
}

.kb-split-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.kb-panel-box {
  padding: 22px;
  border-radius: 14px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
}

.kb-panel-box h3 {
  margin: 0 0 14px;
  font-size: 17.5px;
  font-weight: 750;
  color: var(--kb-text);
}

.kb-list-links {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: grid;
  gap: 9px;
}

.kb-list-links a {
  font-size: 14px;
  color: var(--kb-text-2);
  text-decoration: none;
}

.kb-list-links a:hover {
  color: var(--kb-brand);
}

.kb-faq-card {
  padding: 18px 20px;
  border-radius: 12px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
}

.kb-faq-card h4 {
  margin: 0 0 8px;
  font-size: 15.5px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-faq-card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--kb-text-muted);
}

@media (max-width: 900px) {
  .kb-pillars-grid,
  .kb-learn-grid,
  .kb-split-2 {
    grid-template-columns: 1fr;
  }
}
</style>
