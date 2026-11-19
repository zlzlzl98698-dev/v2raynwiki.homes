<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import { getBrandLink } from '../../data/links'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slug: string
  heading?: string
  note?: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
const linkRecord = computed(() => getBrandLink(props.slug))
</script>

<template>
  <aside v-if="brand && linkRecord" class="kb-cta-box">
    <div class="kb-cta-main">
      <div class="kb-cta-copy">
        <div class="kb-cta-head">
          <h4>{{ heading || `${brand.name} 注册入口与优惠信息` }}</h4>
          <span v-if="brand.isPriorityPartner" class="kb-badge kb-badge-blue">本站重点合作专题</span>
        </div>
        <p class="kb-cta-sub">{{ note || brand.entryBillingNote }}</p>
        <div class="kb-cta-meta">
          <span>入门参考：<strong>{{ brand.entryPriceLabel }}</strong></span>
          <span v-if="linkRecord.couponCode">
            优惠码：<code>{{ linkRecord.couponCode }}</code>
          </span>
        </div>
        <p v-if="linkRecord.couponNote" class="kb-cta-coupon-note">{{ linkRecord.couponNote }}</p>
        <p v-if="linkRecord.linkFormatNote" class="kb-cta-warn">链接核验提示：{{ linkRecord.linkFormatNote }}</p>
      </div>
      <div class="kb-cta-actions">
        <RegistrationButton :slug="brand.slug" />
        <a :href="brand.reviewPath" class="kb-cta-detail">查看完整档案 →</a>
      </div>
    </div>
    <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
  </aside>
</template>

<style scoped>
.kb-cta-box {
  margin: 1.5rem 0;
  padding: 18px 20px;
  border-radius: 12px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  border-left: 4px solid var(--kb-brand);
}

.kb-cta-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.kb-cta-copy {
  flex: 1 1 360px;
}

.kb-cta-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.kb-cta-head h4 {
  margin: 0 !important;
  font-size: 16.5px;
  font-weight: 750;
  color: var(--kb-text);
}

.kb-cta-sub {
  margin: 0 0 8px !important;
  font-size: 14px;
  color: var(--kb-text-2);
}

.kb-cta-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 13.5px;
  color: var(--kb-text-2);
}

.kb-cta-coupon-note {
  margin: 6px 0 0 !important;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}

.kb-cta-warn {
  margin: 6px 0 0 !important;
  font-size: 12.5px;
  color: #B45309;
}

.kb-cta-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.kb-cta-detail {
  font-size: 13px;
  font-weight: 600;
  color: var(--kb-brand);
  text-decoration: none;
}

@media (max-width: 640px) {
  .kb-cta-actions {
    align-items: flex-start;
  }
}
</style>
