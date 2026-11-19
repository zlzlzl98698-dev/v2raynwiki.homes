<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { resolveBreadcrumbs } from '../../data/navigation'

const route = useRoute()
const { frontmatter, page } = useData()

const breadcrumbs = computed(() => resolveBreadcrumbs(route.path))
const isDocPage = computed(() => !frontmatter.value.layout || frontmatter.value.layout === 'doc')
const updatedDate = computed(() => {
  const raw = frontmatter.value.updatedDate || frontmatter.value.date || '2026-11-19'
  if (raw instanceof Date) return raw.toISOString().slice(0, 10)
  return String(raw).slice(0, 10)
})
</script>

<template>
  <div v-if="isDocPage && route.path !== '/'" class="kb-doc-top">
    <nav class="kb-breadcrumb" aria-label="面包屑导航">
      <template v-for="(item, idx) in breadcrumbs" :key="idx">
        <a
          v-if="item.path && idx < breadcrumbs.length - 1"
          :href="item.path"
          :class="idx === 1 ? 'vp-doc-breadcrumb-root' : ''"
        >
          {{ item.label }}
        </a>
        <span v-else class="kb-breadcrumb-current">{{ item.label }}</span>
        <span v-if="idx < breadcrumbs.length - 1" class="kb-breadcrumb-sep">/</span>
      </template>
    </nav>

    <div v-if="frontmatter.category || frontmatter.updatedDate || frontmatter.dataStatus" class="kb-doc-meta">
      <span v-if="frontmatter.category" class="kb-badge kb-badge-blue">{{ frontmatter.category }}</span>
      <span v-if="frontmatter.dataStatus === 'measured'" class="kb-badge kb-badge-green">含实测截图留档</span>
      <span v-else-if="frontmatter.dataStatus === 'vendor'" class="kb-badge kb-badge-amber">含品牌资料宣称</span>
      <span v-else-if="frontmatter.dataStatus === 'historical'" class="kb-badge kb-badge-slate">历史库档案·待复核</span>
      <span class="kb-meta-date">核实更新：{{ updatedDate }}</span>
      <span v-if="frontmatter.author" class="kb-meta-author">维护：{{ frontmatter.author }}</span>
    </div>
  </div>
</template>

<style scoped>
.kb-doc-top {
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--kb-border);
}

.kb-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  color: var(--kb-text-muted);
  margin-bottom: 10px;
}

.kb-breadcrumb a {
  color: var(--kb-text-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.kb-breadcrumb a:hover {
  color: var(--kb-brand);
}

.kb-breadcrumb-current {
  color: var(--kb-text);
  font-weight: 600;
}

.kb-breadcrumb-sep {
  color: #CBD5E1;
}

.kb-doc-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--kb-text-muted);
}
</style>
