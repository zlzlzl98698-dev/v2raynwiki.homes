<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <div v-if="brand" class="kb-rel-brand">
    <div>
      <div class="kb-rel-head">
        <strong>{{ brand.name }}</strong>
        <span class="kb-badge kb-badge-slate">{{ brand.lineCategory }}</span>
        <span class="kb-rel-price">{{ brand.entryPriceLabel }}</span>
      </div>
      <p>{{ brand.tagline }}</p>
    </div>
    <div class="kb-rel-btns">
      <a :href="brand.reviewPath" class="kb-rel-detail">详细评测</a>
      <RegistrationButton :slug="brand.slug" size="sm" label="注册入口" />
    </div>
  </div>
</template>

<style scoped>
.kb-rel-brand {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  margin: 1rem 0;
  border-radius: 10px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
}

.kb-rel-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.kb-rel-price {
  font-size: 13px;
  font-weight: 600;
  color: var(--kb-brand);
}

.kb-rel-brand p {
  margin: 0 !important;
  font-size: 13.5px;
  color: var(--kb-text-muted);
}

.kb-rel-btns {
  display: flex;
  align-items: center;
  gap: 12px;
}

.kb-rel-detail {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--kb-brand);
  text-decoration: none;
}
</style>
