<script setup lang="ts">
import { computed, ref } from 'vue'
import { clientPlatforms, proxyClients, type PlatformKey } from '../../data/clients'

const props = defineProps<{
  platform?: PlatformKey
}>()

const activePlatform = ref<PlatformKey | 'all'>(props.platform || 'all')

const filtered = computed(() => {
  if (activePlatform.value === 'all') return proxyClients
  return proxyClients.filter((c) => c.platforms.includes(activePlatform.value as PlatformKey))
})
</script>

<template>
  <section class="kb-clients-wrap">
    <div v-if="!platform" class="kb-client-tabs" role="tablist">
      <button
        type="button"
        class="kb-tab"
        :class="{ active: activePlatform === 'all' }"
        @click="activePlatform = 'all'"
      >
        全平台 ({{ proxyClients.length }})
      </button>
      <button
        v-for="p in clientPlatforms"
        :key="p.key"
        type="button"
        class="kb-tab"
        :class="{ active: activePlatform === p.key }"
        @click="activePlatform = p.key"
      >
        {{ p.label }}
      </button>
    </div>

    <div class="kb-client-grid">
      <article v-for="c in filtered" :key="c.id" class="kb-client-card">
        <div class="kb-client-head">
          <h4>{{ c.name }}</h4>
          <span class="kb-badge" :class="c.pricing === '免费开源' ? 'kb-badge-green' : 'kb-badge-amber'">
            {{ c.pricing }}
          </span>
        </div>
        <div class="kb-client-core">核心：<code>{{ c.core }}</code></div>
        <p class="kb-client-sum">{{ c.summary }}</p>
        <p v-if="c.caution" class="kb-client-warn">注意：{{ c.caution }}</p>
        <div class="kb-client-foot">
          <a :href="c.docPath">配置教程 →</a>
          <a :href="c.officialUrl" target="_blank" rel="nofollow noopener">{{ c.sourceLabel }} ↗</a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.kb-client-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.kb-tab {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  color: var(--kb-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.kb-tab.active {
  background: var(--kb-brand);
  color: #FFFFFF;
  border-color: var(--kb-brand);
}

.kb-client-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.kb-client-card {
  padding: 15px 17px;
  border-radius: 10px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.kb-client-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.kb-client-head h4 {
  margin: 0 !important;
  font-size: 15.5px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-client-core {
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

.kb-client-sum {
  margin: 0 !important;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--kb-text-2);
}

.kb-client-warn {
  margin: 2px 0 0 !important;
  font-size: 12.5px;
  color: #B45309;
  background: #FFFBEB;
  padding: 6px 8px;
  border-radius: 6px;
}

.kb-client-foot {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
}

.kb-client-foot a {
  color: var(--kb-brand);
  text-decoration: none;
}

@media (max-width: 720px) {
  .kb-client-grid {
    grid-template-columns: 1fr;
  }
}
</style>
