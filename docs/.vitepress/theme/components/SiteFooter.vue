<script setup lang="ts">
import { siteData } from '../../data/site'
</script>

<template>
  <footer class="kb-footer">
    <div class="kb-footer-inner">
      <div class="kb-footer-grid">
        <div class="kb-footer-brand">
          <div class="kb-footer-logo-row">
            <img src="/avatar.jpg" alt="v2rayn百科头像" width="32" height="32" class="kb-footer-avatar" />
            <span class="kb-footer-name">{{ siteData.brandName }}</span>
          </div>
          <p class="kb-footer-desc">
            面向中文用户的网络工具技术教程与机场品牌评测数据库。所有品牌参数、实测截图与风险提示均标注资料来源与核实日期。
          </p>
          <p class="kb-footer-meta">
            域名：{{ siteData.domain }} · 联系邮箱：{{ siteData.email }}
          </p>
        </div>

        <div class="kb-footer-col">
          <h4>核心知识专题</h4>
          <ul>
            <li><a href="/airport/">机场推荐专题</a></li>
            <li><a href="/vpn/">VPN 与加速器专题</a></li>
            <li><a href="/clash/">Clash 客户端专题</a></li>
            <li><a href="/resources/">资源与风险情报</a></li>
          </ul>
        </div>

        <div class="kb-footer-col">
          <h4>数据库与客户端</h4>
          <ul>
            <li><a href="/brands/">31 家机场品牌库</a></li>
            <li><a href="/reviews/guangsuyun">光速云旗舰深度评测</a></li>
            <li><a href="/comparisons/">品牌横向对比中心</a></li>
            <li><a href="/clients/">全平台客户端中心</a></li>
          </ul>
        </div>

        <div class="kb-footer-col">
          <h4>站点透明与合规</h4>
          <ul>
            <li><a href="/about/">关于本站与推广披露</a></li>
            <li><a href="/about/privacy">隐私政策与免责声明</a></li>
            <li><a href="/about/search-and-maintenance">搜索接入与维护文档</a></li>
            <li><a href="/resources/risk-intel/">31 家品牌审计报告</a></li>
          </ul>
        </div>
      </div>

      <div class="kb-footer-disclosure">
        {{ siteData.disclosureFull }}
      </div>

      <div class="kb-footer-bottom">
        <span>© 2026 {{ siteData.brandName }} ({{ siteData.domain }}). 保留所有权利。</span>
        <span>
          搜索模式：{{ siteData.algolia.enabled ? 'Algolia DocSearch' : '本地中文全文检索（Algolia 已预留配置）' }}
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.kb-footer {
  background: var(--kb-bg-soft);
  border-top: 1px solid var(--kb-border);
  margin-top: 56px;
  padding: 44px 24px 32px;
  color: var(--kb-text-2);
}

.kb-footer-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.kb-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  margin-bottom: 28px;
}

.kb-footer-logo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.kb-footer-avatar {
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid var(--kb-border-strong);
  background: #FFFFFF;
}

.kb-footer-name {
  font-size: 18px;
  font-weight: 800;
  color: var(--kb-text);
}

.kb-footer-desc {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--kb-text-muted);
}

.kb-footer-meta {
  margin: 0;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

.kb-footer-col h4 {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.kb-footer-col a {
  font-size: 13.5px;
  color: var(--kb-text-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.kb-footer-col a:hover {
  color: var(--kb-brand);
}

.kb-footer-disclosure {
  padding: 14px 16px;
  background: var(--kb-bg);
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--kb-text-muted);
  margin-bottom: 18px;
}

.kb-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

@media (max-width: 860px) {
  .kb-footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 540px) {
  .kb-footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
