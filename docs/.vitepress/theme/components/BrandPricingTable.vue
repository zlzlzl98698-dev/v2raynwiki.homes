<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))
</script>

<template>
  <section v-if="brand" class="kb-pricing">
    <div class="kb-pricing-head">
      <div>
        <h4>{{ brand.name }} 套餐价格与计费周期一览</h4>
        <p>核实日期：{{ brand.verifiedDate }} · 区分月付、年付折算与一次性不限时流量包，下单前以官网结算页为准</p>
      </div>
      <RegistrationButton :slug="brand.slug" size="sm" variant="outline" label="核对官网最新价格" />
    </div>

    <div class="kb-pricing-grid">
      <div
        v-for="plan in brand.plans"
        :key="`${plan.name}-${plan.billingCycle}`"
        class="kb-plan-card"
        :class="{ 'is-rec': plan.recommended }"
      >
        <div class="kb-plan-top">
          <span class="kb-plan-cycle">{{ plan.billingCycle }}</span>
          <span v-if="plan.recommended" class="kb-badge kb-badge-blue">主流参考档</span>
        </div>
        <h5 class="kb-plan-name">{{ plan.name }}</h5>
        <div class="kb-plan-price">
          <strong>¥{{ plan.priceCny }}</strong>
          <span>/{{ plan.billingCycle === '一次性付费' ? '一次性' : plan.billingCycle }}</span>
        </div>
        <div v-if="plan.monthlyEquivCny && plan.billingCycle !== '月付'" class="kb-plan-equiv">
          折合约 ¥{{ plan.monthlyEquivCny }}/月
        </div>
        <div class="kb-plan-traffic">
          <span>流量额度：<strong>{{ plan.traffic }}</strong></span>
          <span>周期：{{ plan.trafficCycle }}</span>
        </div>
        <p v-if="plan.note" class="kb-plan-note">{{ plan.note }}</p>
        <div class="kb-plan-foot">
          <RegistrationButton :slug="brand.slug" size="sm" :variant="plan.recommended ? 'primary' : 'outline'" label="前往注册查看" />
        </div>
      </div>
    </div>
    <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
  </section>
</template>

<style scoped>
.kb-pricing {
  margin: 1.5rem 0;
}

.kb-pricing-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.kb-pricing-head h4 {
  margin: 0 0 4px !important;
  font-size: 17px;
  font-weight: 750;
  color: var(--kb-text);
}

.kb-pricing-head p {
  margin: 0 !important;
  font-size: 13px;
  color: var(--kb-text-muted);
}

.kb-pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.kb-plan-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;
  background: var(--kb-bg);
  border: 1px solid var(--kb-border);
}

.kb-plan-card.is-rec {
  border-color: var(--kb-brand);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.08);
}

.kb-plan-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.kb-plan-cycle {
  font-size: 12px;
  font-weight: 600;
  color: var(--kb-text-muted);
}

.kb-plan-name {
  margin: 0 0 8px !important;
  font-size: 15px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-plan-price strong {
  font-size: 24px;
  font-weight: 800;
  color: var(--kb-text);
  font-family: var(--vp-font-family-mono);
}

.kb-plan-price span {
  font-size: 13px;
  color: var(--kb-text-muted);
}

.kb-plan-equiv {
  font-size: 12px;
  color: var(--kb-brand);
  font-weight: 600;
  margin-top: 2px;
}

.kb-plan-traffic {
  margin: 10px 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--kb-bg-soft);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--kb-text-2);
}

.kb-plan-note {
  margin: 0 0 12px !important;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--kb-text-muted);
}

.kb-plan-foot {
  margin-top: auto;
  padding-top: 6px;
}

@media (max-width: 820px) {
  .kb-pricing-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .kb-pricing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
