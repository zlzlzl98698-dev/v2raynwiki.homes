<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug, type UnlockState } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const aiItems = computed(() => brand.value?.unlockMatrix.filter((u) => u.category === 'AI') || [])
const streamItems = computed(() => brand.value?.unlockMatrix.filter((u) => u.category === 'Streaming') || [])

function statusInfo(status: UnlockState) {
  switch (status) {
    case 'operational':
      return { text: 'Operational', dot: 'obs-dot-green', cls: 'st-ok' }
    case 'partial':
      return { text: 'Partial / Node-Dependent', dot: 'obs-dot-amber', cls: 'st-partial' }
    case 'vendor-claimed':
      return { text: 'Vendor Claimed', dot: 'obs-dot-blue', cls: 'st-vendor' }
    case 'unavailable':
      return { text: 'Unavailable', dot: 'obs-dot-red', cls: 'st-fail' }
    default:
      return { text: 'Not Tested', dot: 'obs-dot-slate', cls: 'st-none' }
  }
}
</script>

<template>
  <div v-if="brand" class="obs-panel">
    <div class="obs-header">
      <div class="obs-title-group">
        <span class="obs-kicker">SERVICE AVAILABILITY MATRIX · {{ brand.enName.toUpperCase() }}</span>
        <h3 class="obs-title">{{ brand.name }} AI 工具与流媒体解锁状态矩阵</h3>
      </div>
      <span class="obs-status-pill">
        <span class="obs-dot" :class="brand.unlockDataSource === '实测记录' ? 'obs-dot-green' : 'obs-dot-amber'" />
        {{ brand.unlockDataSource }}
      </span>
    </div>

    <div class="obs-group">
      <div class="obs-group-title">AI 生产力平台（ChatGPT / Claude / Gemini）</div>
      <div class="obs-matrix-grid">
        <div v-for="item in aiItems" :key="item.service" class="obs-cell">
          <div class="obs-cell-head">
            <strong class="obs-svc">{{ item.service }}</strong>
            <span class="obs-tag" :class="statusInfo(item.status).cls">
              <span class="obs-dot" :class="statusInfo(item.status).dot" />
              {{ statusInfo(item.status).text }}
            </span>
          </div>
          <p class="obs-cell-note">{{ item.note }}</p>
        </div>
      </div>
    </div>

    <div class="obs-group">
      <div class="obs-group-title">国际流媒体平台（Netflix / Disney+ / YouTube / TikTok）</div>
      <div class="obs-matrix-grid">
        <div v-for="item in streamItems" :key="item.service" class="obs-cell">
          <div class="obs-cell-head">
            <strong class="obs-svc">{{ item.service }}</strong>
            <span class="obs-tag" :class="statusInfo(item.status).cls">
              <span class="obs-dot" :class="statusInfo(item.status).dot" />
              {{ statusInfo(item.status).text }}
            </span>
          </div>
          <p class="obs-cell-note">{{ item.note }}</p>
        </div>
      </div>
    </div>

    <div class="obs-footer">
      <span>区分标准：Operational=已核实实测可用 · Partial=视地区节点 · Vendor Claimed=品牌资料宣称 · Not Tested=待实测</span>
      <span>核实日期：{{ brand.verifiedDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.obs-group {
  margin-bottom: 16px;
}

.obs-group:last-of-type {
  margin-bottom: 0;
}

.obs-group-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--obs-muted);
  letter-spacing: 0.04em;
  margin-bottom: 10px;
}

.obs-matrix-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.obs-cell {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 9px;
  padding: 12px;
}

.obs-cell-head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
}

.obs-svc {
  font-size: 14px;
  color: #F8FAFC;
}

.obs-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 5px;
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.st-ok { background: rgba(16, 185, 129, 0.14); color: #6EE7B7; border-color: rgba(16, 185, 129, 0.35); }
.st-partial { background: rgba(245, 158, 11, 0.14); color: #FCD34D; border-color: rgba(245, 158, 11, 0.35); }
.st-vendor { background: rgba(56, 189, 248, 0.12); color: #7DD3FC; border-color: rgba(56, 189, 248, 0.35); }
.st-fail { background: rgba(239, 68, 68, 0.14); color: #FCA5A5; border-color: rgba(239, 68, 68, 0.35); }
.st-none { background: rgba(148, 163, 184, 0.12); color: #CBD5E1; }

.obs-cell-note {
  margin: 0 !important;
  font-size: 12.5px;
  line-height: 1.55;
  color: #94A3B8;
}

@media (max-width: 780px) {
  .obs-matrix-grid {
    grid-template-columns: 1fr;
  }
}
</style>
