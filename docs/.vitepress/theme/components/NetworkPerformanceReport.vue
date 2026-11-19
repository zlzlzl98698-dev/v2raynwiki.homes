<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const maxMbps = computed(() => {
  if (!brand.value?.speedMetrics?.length) return 600
  return Math.max(550, ...brand.value.speedMetrics.map((m) => m.downloadMbps))
})

const avgLatency = computed(() => {
  const list = brand.value?.speedMetrics
  if (!list?.length) return null
  return Math.round(list.reduce((acc, i) => acc + i.latencyMs, 0) / list.length)
})

const peakSpeed = computed(() => {
  const list = brand.value?.speedMetrics
  if (!list?.length) return null
  return Math.max(...list.map((i) => i.downloadMbps))
})

const statusMeta = computed(() => {
  const st = brand.value?.dataStatus
  if (st === 'measured') return { label: 'Measured Data', dot: 'obs-dot-green' }
  if (st === 'vendor') return { label: 'Vendor Data', dot: 'obs-dot-amber' }
  if (st === 'historical') return { label: 'Historical Record', dot: 'obs-dot-slate' }
  return { label: 'Not Tested / Partial', dot: 'obs-dot-slate' }
})
</script>

<template>
  <div v-if="brand" class="obs-panel" :style="{ '--brand-accent': brand.accentColor }">
    <div class="obs-header">
      <div class="obs-title-group">
        <span class="obs-kicker">PERFORMANCE MONITORING REPORT · {{ brand.enName.toUpperCase() }}</span>
        <h3 class="obs-title">{{ brand.name }} 节点延迟与带宽观测</h3>
      </div>
      <span class="obs-status-pill">
        <span class="obs-dot" :class="statusMeta.dot" />
        {{ statusMeta.label }}
      </span>
    </div>

    <div v-if="brand.speedMetrics && brand.speedMetrics.length > 0" class="obs-metrics-wrap">
      <div class="obs-summary-row">
        <div class="obs-kpi">
          <span class="obs-kpi-label">样本平均延迟</span>
          <strong class="obs-mono obs-kpi-val">{{ avgLatency }} ms</strong>
        </div>
        <div class="obs-kpi">
          <span class="obs-kpi-label">峰值记录下载</span>
          <strong class="obs-mono obs-kpi-val" :style="{ color: brand.accentColor }">{{ peakSpeed }} Mbps</strong>
        </div>
        <div class="obs-kpi">
          <span class="obs-kpi-label">线路架构</span>
          <strong class="obs-kpi-val-sm">{{ brand.lineCategory }}</strong>
        </div>
        <div class="obs-kpi">
          <span class="obs-kpi-label">记录日期</span>
          <strong class="obs-mono obs-kpi-val-sm">{{ brand.speedDataDate || brand.verifiedDate }}</strong>
        </div>
      </div>

      <div class="obs-bars">
        <div v-for="m in brand.speedMetrics" :key="m.region" class="obs-bar-row">
          <div class="obs-bar-meta">
            <span class="obs-region">
              <span class="obs-dot" :class="m.latencyMs <= 60 ? 'obs-dot-green' : m.latencyMs <= 120 ? 'obs-dot-amber' : 'obs-dot-slate'" />
              {{ m.region }}节点
            </span>
            <span class="obs-mono obs-vals">
              <span>RTT {{ m.latencyMs }}ms</span>
              <strong :style="{ color: brand.accentColor }">{{ m.downloadMbps }} Mbps</strong>
            </span>
          </div>
          <div class="obs-track">
            <div
              class="obs-fill"
              :style="{
                width: `${Math.max(4, Math.round((m.downloadMbps / maxMbps) * 100))}%`,
                background: brand.accentColor
              }"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="obs-empty">
      <span class="obs-dot obs-dot-slate" />
      当前尚无该品牌逐地区可比测速表数据（{{ brand.screenshots?.length ? '请查看下方原始测速留档截图' : '数据状态：待实测核验，本站不虚构延迟或带宽数值' }}）。
    </div>

    <div class="obs-footer">
      <span>来源：{{ brand.speedDataSource || brand.dataSource }}</span>
      <span>单日非晚高峰快照不代表长期全时段承诺 · v2raynWiki Observatory</span>
    </div>
  </div>
</template>

<style scoped>
.obs-summary-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.obs-kpi {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.obs-kpi-label {
  font-size: 11.5px;
  color: var(--obs-muted);
}

.obs-kpi-val {
  font-size: 18px;
  color: #F8FAFC;
}

.obs-kpi-val-sm {
  font-size: 13px;
  color: #E2E8F0;
}

.obs-bars {
  display: grid;
  gap: 12px;
}

.obs-bar-row {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 8px;
  padding: 10px 12px;
}

.obs-bar-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
  font-size: 13.5px;
}

.obs-region {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #F1F5F9;
}

.obs-vals {
  display: inline-flex;
  gap: 14px;
  font-size: 13px;
  color: #CBD5E1;
}

.obs-track {
  height: 7px;
  background: rgba(148, 163, 184, 0.16);
  border-radius: 999px;
  overflow: hidden;
}

.obs-fill {
  height: 100%;
  border-radius: 999px;
  opacity: 0.92;
}

.obs-empty {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--obs-surface);
  border: 1px dashed var(--obs-border);
  border-radius: 8px;
  font-size: 13.5px;
  color: #CBD5E1;
}

@media (max-width: 720px) {
  .obs-summary-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
