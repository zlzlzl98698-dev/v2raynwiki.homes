<script setup lang="ts">
import { computed } from 'vue'
import { AFFILIATE_REL, getBrandLink } from '../../data/links'

const props = withDefaults(
  defineProps<{
    slug: string
    label?: string
    variant?: 'primary' | 'outline'
    size?: 'md' | 'sm'
  }>(),
  {
    variant: 'primary',
    size: 'md'
  }
)

const linkRecord = computed(() => getBrandLink(props.slug))
const buttonLabel = computed(() => props.label || `前往 ${linkRecord.value?.name || '官方'} 注册入口`)
</script>

<template>
  <a
    v-if="linkRecord"
    :href="linkRecord.registerUrl"
    target="_blank"
    :rel="AFFILIATE_REL"
    class="kb-reg-btn"
    :class="[`kb-reg-${variant}`, `kb-reg-${size}`]"
  >
    <span>{{ buttonLabel }}</span>
    <span aria-hidden="true">↗</span>
  </a>
</template>

<style scoped>
.kb-reg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none !important;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
}

.kb-reg-md {
  padding: 9px 16px;
  font-size: 14px;
}

.kb-reg-sm {
  padding: 6px 12px;
  font-size: 13px;
}

.kb-reg-primary {
  background: var(--kb-brand);
  color: #FFFFFF !important;
  border: 1px solid var(--kb-brand);
}

.kb-reg-primary:hover {
  background: var(--kb-brand-hover);
  border-color: var(--kb-brand-hover);
}

.kb-reg-outline {
  background: var(--kb-bg);
  color: var(--kb-brand) !important;
  border: 1px solid #BFDBFE;
}

.kb-reg-outline:hover {
  background: var(--kb-brand-soft);
  border-color: var(--kb-brand);
}
</style>
