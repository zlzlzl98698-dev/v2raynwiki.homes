<script setup lang="ts">
import { computed, ref } from 'vue'
import { brands, type BrandRecord } from '../../data/brands'
import { getBrandLink } from '../../data/links'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

const query = ref('')
const lineFilter = ref('all')
const priceFilter = ref('all')
const trafficFilter = ref('all')
const clientFilter = ref('all')
const statusFilter = ref('all')
const sortBy = ref<'default' | 'price-asc' | 'price-desc' | 'traffic-desc'>('default')

const filteredBrands = computed<BrandRecord[]>(() => {
  const q = query.value.trim().toLowerCase()
  const list = brands.filter((b) => {
    if (q) {
      const hay = [
        b.name,
        b.enName,
        ...(b.aliases || []),
        b.tagline,
        b.lineType,
        ...b.protocols,
        ...b.regions
      ]
        .join(' ')
        .toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (lineFilter.value !== 'all' && b.lineCategory !== lineFilter.value) return false
    if (clientFilter.value !== 'all' && b.clientMode !== clientFilter.value) return false
    if (statusFilter.value !== 'all' && b.dataStatus !== statusFilter.value) return false

    if (priceFilter.value === 'under-10' && b.entryPriceCny >= 10) return false
    if (priceFilter.value === '10-20' && (b.entryPriceCny < 10 || b.entryPriceCny > 20)) return false
    if (priceFilter.value === 'over-20' && b.entryPriceCny <= 20) return false

    if (trafficFilter.value === '60plus' && b.entryTrafficGb < 60) return false
    if (trafficFilter.value === '100plus' && b.entryTrafficGb < 100) return false

    return true
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'price-asc') return a.entryPriceCny - b.entryPriceCny
    if (sortBy.value === 'price-desc') return b.entryPriceCny - a.entryPriceCny
    if (sortBy.value === 'traffic-desc') return b.entryTrafficGb - a.entryTrafficGb
    return a.rankOrder - b.rankOrder
  })
})

function resetFilters() {
  query.value = ''
  lineFilter.value = 'all'
  priceFilter.value = 'all'
  trafficFilter.value = 'all'
  clientFilter.value = 'all'
  statusFilter.value = 'all'
  sortBy.value = 'default'
}

function statusLabel(st: BrandRecord['dataStatus']) {
  if (st === 'measured') return { text: '含实测截图', cls: 'kb-badge-green' }
  if (st === 'vendor') return { text: '品牌资料', cls: 'kb-badge-amber' }
  if (st === 'historical') return { text: '历史档案', cls: 'kb-badge-slate' }
  return { text: '部分待核实', cls: 'kb-badge-slate' }
}
</script>

<template>
  <section class="kb-db">
    <div class="kb-db-controls">
      <div class="kb-db-search-row">
        <input
          v-model="query"
          type="search"
          class="kb-db-input"
          placeholder="搜索品牌名称、英文名、协议（VLESS/Trojan）、地区或关键词…"
          aria-label="搜索机场品牌"
        />
        <select v-model="sortBy" class="kb-db-select" aria-label="排序方式">
          <option value="default">排序：默认收录顺序</option>
          <option value="price-asc">价格：入门折算价从低到高</option>
          <option value="price-desc">价格：入门折算价从高到低</option>
          <option value="traffic-desc">流量：入门月流量从高到低</option>
        </select>
      </div>

      <div class="kb-db-filters">
        <select v-model="lineFilter" class="kb-db-select" aria-label="线路筛选">
          <option value="all">全部线路类型</option>
          <option value="IEPL">IEPL 专线</option>
          <option value="IPLC">IPLC 专线</option>
          <option value="混合专线">混合/BGP专线</option>
          <option value="BGP中转">中转优化</option>
        </select>

        <select v-model="priceFilter" class="kb-db-select" aria-label="价格筛选">
          <option value="all">全部入门价位</option>
          <option value="under-10">¥10/月以下（年付折算）</option>
          <option value="10-20">¥10 – ¥20/月</option>
          <option value="over-20">¥20/月以上</option>
        </select>

        <select v-model="trafficFilter" class="kb-db-select" aria-label="流量筛选">
          <option value="all">全部入门流量</option>
          <option value="60plus">60GB/月 及以上</option>
          <option value="100plus">100GB/月 及以上</option>
        </select>

        <select v-model="clientFilter" class="kb-db-select" aria-label="客户端筛选">
          <option value="all">全部客户端模式</option>
          <option value="自研+第三方订阅">自研 + 第三方订阅</option>
          <option value="第三方订阅为主">第三方订阅为主</option>
          <option value="仅专属客户端">仅专属客户端</option>
          <option value="待核实">待核实</option>
        </select>

        <select v-model="statusFilter" class="kb-db-select" aria-label="实测状态筛选">
          <option value="all">全部核实状态</option>
          <option value="measured">含实测截图留档</option>
          <option value="vendor">品牌资料整理</option>
          <option value="partial">部分参数待核实</option>
          <option value="historical">历史库记录</option>
        </select>

        <button type="button" class="kb-db-reset" @click="resetFilters">重置筛选</button>
      </div>

      <div class="kb-db-summary-bar">
        <span>当前显示 <strong>{{ filteredBrands.length }}</strong> / {{ brands.length }} 个独立核实品牌（原清单 32 条已合并去重 Firefly 重复项）</span>
        <span>核实基准日：{{ siteData.lastVerifiedDate }}</span>
      </div>
    </div>

    <div v-if="filteredBrands.length === 0" class="kb-db-empty">
      <p>当前筛选条件下未匹配到品牌，建议放宽价格、流量或客户端筛选条件。</p>
      <button type="button" class="kb-db-reset" @click="resetFilters">显示全部 31 个品牌</button>
    </div>

    <div v-else class="kb-db-grid">
      <article v-for="brand in filteredBrands" :key="brand.slug" class="kb-db-card">
        <div class="kb-db-card-bar" :style="{ background: brand.accentColor }" />
        <div class="kb-db-card-body">
          <div class="kb-db-card-head">
            <div>
              <h3>
                <a :href="brand.reviewPath">{{ brand.name }}</a>
              </h3>
              <span class="kb-db-en">{{ brand.enName }} · {{ brand.foundedYear }}</span>
            </div>
            <div class="kb-db-badges">
              <span v-if="brand.isPriorityPartner" class="kb-badge kb-badge-blue">重点专题</span>
              <span class="kb-badge" :class="statusLabel(brand.dataStatus).cls">
                {{ statusLabel(brand.dataStatus).text }}
              </span>
            </div>
          </div>

          <p class="kb-db-tagline">{{ brand.tagline }}</p>

          <dl class="kb-db-specs">
            <div>
              <dt>入门参考</dt>
              <dd class="obs-mono">{{ brand.entryPriceLabel }}</dd>
            </div>
            <div>
              <dt>线路架构</dt>
              <dd>{{ brand.lineCategory }}</dd>
            </div>
            <div>
              <dt>客户端</dt>
              <dd>{{ brand.clientMode }}</dd>
            </div>
            <div>
              <dt>记录优惠码</dt>
              <dd class="obs-mono">{{ getBrandLink(brand.slug)?.couponCode || '待核实' }}</dd>
            </div>
          </dl>

          <div class="kb-db-card-foot">
            <a :href="brand.reviewPath" class="kb-db-detail-link">评测与参数档案 →</a>
            <RegistrationButton :slug="brand.slug" size="sm" variant="outline" label="注册入口" />
          </div>
        </div>
      </article>
    </div>

    <p class="kb-disclosure">{{ siteData.disclosureFull }}</p>
  </section>
</template>

<style scoped>
.kb-db-controls {
  padding: 18px;
  border-radius: 12px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  margin: 1.25rem 0 1.5rem;
  display: grid;
  gap: 12px;
}

.kb-db-search-row {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 10px;
}

.kb-db-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kb-db-input,
.kb-db-select {
  height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--kb-border-strong);
  background: var(--kb-bg);
  color: var(--kb-text);
  font-size: 13.5px;
}

.kb-db-reset {
  height: 38px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid var(--kb-border-strong);
  background: var(--kb-bg);
  color: var(--kb-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.kb-db-reset:hover {
  border-color: var(--kb-brand);
  color: var(--kb-brand);
}

.kb-db-summary-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

.kb-db-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.kb-db-card {
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.kb-db-card-bar {
  height: 4px;
  width: 100%;
}

.kb-db-card-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.kb-db-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.kb-db-card-head h3 {
  margin: 0 !important;
  font-size: 17px;
  font-weight: 750;
}

.kb-db-card-head h3 a {
  color: var(--kb-text);
  text-decoration: none;
}

.kb-db-card-head h3 a:hover {
  color: var(--kb-brand);
}

.kb-db-en {
  font-size: 12px;
  color: var(--kb-text-muted);
}

.kb-db-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
}

.kb-db-tagline {
  margin: 0 0 12px !important;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--kb-text-2);
}

.kb-db-specs {
  margin: 0 0 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  background: var(--kb-bg-soft);
}

.kb-db-specs dt {
  font-size: 11.5px;
  color: var(--kb-text-muted);
}

.kb-db-specs dd {
  margin: 2px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--kb-text);
}

.kb-db-card-foot {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.kb-db-detail-link {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--kb-brand);
  text-decoration: none;
}

.kb-db-empty {
  padding: 36px 20px;
  text-align: center;
  border: 1px dashed var(--kb-border-strong);
  border-radius: 12px;
  background: var(--kb-bg-soft);
}

@media (max-width: 780px) {
  .kb-db-search-row,
  .kb-db-grid {
    grid-template-columns: 1fr;
  }
}
</style>
