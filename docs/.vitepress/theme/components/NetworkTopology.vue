<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug?: string
  mode?: 'iepl' | 'iplc' | 'relay'
}>()

const brand = computed(() => (props.slug ? getBrandBySlug(props.slug) : undefined))
const accent = computed(() => brand.value?.accentColor || '#38BDF8')
const lineLabel = computed(() => {
  if (brand.value) return brand.value.lineType
  if (props.mode === 'iplc') return 'IPLC 国际点对点内网专线（概念拓扑示意）'
  if (props.mode === 'relay') return '国内 BGP 公网中转（概念拓扑示意）'
  return 'IEPL 以太网内网专线（概念拓扑示意）'
})
const protocolLabel = computed(() =>
  brand.value ? brand.value.protocols.join(' / ') : 'VLESS / Trojan / Shadowsocks'
)
const regionsLabel = computed(() =>
  brand.value ? brand.value.regions.slice(0, 5).join(' · ') : '香港 · 日本 · 新加坡 · 台湾 · 美国'
)
</script>

<template>
  <div class="obs-panel">
    <div class="obs-header">
      <div class="obs-title-group">
        <span class="obs-kicker">NETWORK PATH OBSERVATORY · ARCHITECTURE SCHEMATIC</span>
        <h3 class="obs-title">
          {{ brand ? `${brand.name} 线路传输拓扑示意` : '跨境专线与中转网络路径示意图' }}
        </h3>
      </div>
      <span class="obs-status-pill">
        <span class="obs-dot obs-dot-blue" />
        概念拓扑示意 · 非实时路由追踪
      </span>
    </div>

    <div class="obs-topo-flow">
      <div class="obs-node">
        <span class="obs-node-step obs-mono">HOP 01</span>
        <strong>用户终端设备</strong>
        <p>PC / 手机 / OpenWrt 软路由</p>
        <span class="obs-chip obs-mono">{{ protocolLabel }}</span>
      </div>

      <div class="obs-link">
        <span class="obs-link-line" />
        <span class="obs-link-tag">加密接入</span>
      </div>

      <div class="obs-node">
        <span class="obs-node-step obs-mono">HOP 02</span>
        <strong>国内 BGP 入口节点</strong>
        <p>电信 / 联通 / 移动三网优化接入，隐藏终端直连特征</p>
      </div>

      <div class="obs-link obs-link-dedicated">
        <span class="obs-link-line-thick" :style="{ background: accent }" />
        <span class="obs-link-tag" :style="{ borderColor: accent, color: accent }">
          {{ brand ? brand.lineCategory : 'IEPL/IPLC' }} 跨境传输
        </span>
      </div>

      <div class="obs-node">
        <span class="obs-node-step obs-mono">HOP 03</span>
        <strong>海外落地出口集群</strong>
        <p>{{ regionsLabel }}</p>
      </div>

      <div class="obs-link">
        <span class="obs-link-line" />
        <span class="obs-link-tag">目标服务</span>
      </div>

      <div class="obs-node">
        <span class="obs-node-step obs-mono">HOP 04</span>
        <strong>AI / 流媒体 / 公网目标</strong>
        <p>ChatGPT · Claude · Netflix · GitHub</p>
      </div>
    </div>

    <div class="obs-footer">
      <span>架构说明：{{ lineLabel }}</span>
      <span>声明：此为基于公开架构资料绘制的原理示意，不代表可独立核实的物理运营商合同</span>
    </div>
  </div>
</template>

<style scoped>
.obs-topo-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 8px;
}

.obs-node {
  background: var(--obs-surface);
  border: 1px solid var(--obs-border);
  border-radius: 10px;
  padding: 12px;
  min-height: 112px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.obs-node-step {
  font-size: 10.5px;
  color: var(--obs-muted);
}

.obs-node strong {
  font-size: 13.5px;
  color: #F8FAFC;
}

.obs-node p {
  margin: 0 !important;
  font-size: 12px;
  line-height: 1.5;
  color: #94A3B8;
}

.obs-chip {
  margin-top: auto;
  display: inline-block;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.14);
  color: #CBD5E1;
  width: fit-content;
}

.obs-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;
}

.obs-link-line {
  width: 100%;
  height: 2px;
  background: rgba(148, 163, 184, 0.45);
}

.obs-link-line-thick {
  width: 100%;
  height: 4px;
  border-radius: 999px;
}

.obs-link-tag {
  font-size: 11px;
  color: #CBD5E1;
  white-space: nowrap;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: var(--obs-surface-2);
}

@media (max-width: 960px) {
  .obs-topo-flow {
    grid-template-columns: 1fr;
  }
  .obs-link {
    min-width: unset;
    padding: 4px 0;
  }
  .obs-link-line,
  .obs-link-line-thick {
    width: 2px;
    height: 18px;
  }
}
</style>
