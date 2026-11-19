<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import { getBrandLink } from '../../data/links'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slugs: string[]
  title?: string
}>()

const items = computed(() =>
  props.slugs
    .map((slug) => {
      const b = getBrandBySlug(slug)
      const l = getBrandLink(slug)
      return b ? { brand: b, link: l } : null
    })
    .filter(Boolean)
)
</script>

<template>
  <section class="kb-rec-wrap">
    <h3 v-if="title" class="kb-rec-title">{{ title }}</h3>
    <div class="kb-rec-list">
      <article v-for="entry in items" :key="entry!.brand.slug" class="kb-rec-card">
        <div class="kb-rec-head">
          <div class="kb-rec-name-row">
            <span class="kb-rec-accent" :style="{ background: entry!.brand.accentColor }" />
            <h4>
              <a :href="entry!.brand.reviewPath">{{ entry!.brand.name }}</a>
            </h4>
            <span class="kb-badge kb-badge-slate">{{ entry!.brand.lineCategory }}</span>
            <span v-if="entry!.brand.isPriorityPartner" class="kb-badge kb-badge-blue">重点合作专题</span>
            <span v-else-if="entry!.brand.dataStatus === 'measured'" class="kb-badge kb-badge-green">含实测截图</span>
          </div>
          <div class="kb-rec-price">{{ entry!.brand.entryPriceLabel }}</div>
        </div>

        <p class="kb-rec-summary">{{ entry!.brand.tagline }}</p>

        <div class="kb-rec-meta">
          <span>客户端：{{ entry!.brand.clientMode }}</span>
          <span>协议：{{ entry!.brand.protocols[0] }}</span>
          <span v-if="entry!.link?.couponCode">优惠码：<code>{{ entry!.link.couponCode }}</code></span>
        </div>

        <div class="kb-rec-actions">
          <a :href="entry!.brand.reviewPath" class="kb-rec-link">查看评测与实测档案 →</a>
          <RegistrationButton :slug="entry!.brand.slug" size="sm" label="前往注册" />
        </div>
      </article>
    </div>
    <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
  </section>
</template>

<style scoped>
.kb-rec-wrap {
  margin: 1.5rem 0;
}

.kb-rec-title {
  margin-top: 0 !important;
  margin-bottom: 14px !important;
}

.kb-rec-list {
  display: grid;
  gap: 14px;
}

.kb-rec-card {
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg);
}

.kb-rec-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.kb-rec-name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.kb-rec-accent {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.kb-rec-name-row h4 {
  margin: 0 !important;
  font-size: 16.5px;
  font-weight: 750;
}

.kb-rec-name-row h4 a {
  color: var(--kb-text);
  text-decoration: none;
}

.kb-rec-name-row h4 a:hover {
  color: var(--kb-brand);
}

.kb-rec-price {
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--kb-brand);
}

.kb-rec-summary {
  margin: 0 0 10px !important;
  font-size: 14.5px;
  color: var(--kb-text-2);
}

.kb-rec-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 13px;
  color: var(--kb-text-muted);
  margin-bottom: 12px;
}

.kb-rec-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.kb-rec-link {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--kb-brand);
  text-decoration: none;
}
</style>
