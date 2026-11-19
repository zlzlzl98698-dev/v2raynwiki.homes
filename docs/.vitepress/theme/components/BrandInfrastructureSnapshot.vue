<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import { getBrandLink } from '../../data/links'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const link = computed(() => getBrandLink(props.slug))
</script>

<template>
  <div v-if="brand" class="obs-panel" :style="{ borderTop: `3px solid ${brand.accentColor}` }">
    <div class="obs-header">
      <div class="obs-title-group">
        <span class="obs-kicker">INFRASTRUCTURE SERVICE SNAPSHOT · {{ brand.enName.toUpperCase() }}</span>
        <h3 class="obs-title">{{ brand.name }} 核心基础设施档案</h3>
      </div>
      <span class="obs-status-pill">
        <span class="obs-dot" :style="{ background: brand.accentColor }" />
        核实日期 {{ brand.verifiedDate }}
      </span>
    </div>

    <div class="obs-kv-grid">
      <div class="obs-kv">
        <span>运营起始</span>
        <strong class="obs-mono">{{ brand.foundedYear }}</strong>
      </div>
      <div class="obs-kv">
        <span>线路架构</span>
        <strong>{{ brand.lineType }}</strong>
      </div>
      <div class="obs-kv">
        <span>协议栈</span>
        <strong class="obs-mono">{{ brand.protocols.join(' / ') }}</strong>
      </div>
      <div class="obs-kv">
        <span>客户端接入方式</span>
        <strong>{{ brand.clientMode }}</strong>
      </div>
      <div class="obs-kv">
        <span>入门参考价</span>
        <strong class="obs-mono" :style="{ color: brand.accentColor }">{{ brand.entryPriceLabel }}</strong>
      </div>
      <div class="obs-kv">
        <span>记录优惠码</span>
        <strong class="obs-mono">{{ link?.couponCode || '待核实' }}</strong>
      </div>
    </div>

    <div class="obs-region-row">
      <span class="obs-region-label">节点覆盖：</span>
      <span v-for="r in brand.regions" :key="r" class="obs-region-chip">{{ r }}</span>
    </div>

    <div class="obs-footer">
      <span>资料来源：{{ brand.dataSource }}</span>
      <span>支持客户端：{{ brand.supportedClients.join('、') }}</span>
    </div>
  </div>
</template>

<style scoped>
.obs-kv-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.obs-kv {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.obs-kv span {
  font-size: 11.5px;
  color: var(--obs-muted);
}

.obs-kv strong {
  font-size: 13.5px;
  color: #F8FAFC;
  line-height: 1.45;
}

.obs-region-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.obs-region-label {
  font-size: 12px;
  color: var(--obs-muted);
}

.obs-region-chip {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--obs-surface-2);
  border: 1px solid var(--obs-border);
  color: #E2E8F0;
}

@media (max-width: 720px) {
  .obs-kv-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
