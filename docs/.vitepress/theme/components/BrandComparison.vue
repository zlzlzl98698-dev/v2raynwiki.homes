<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'
import { getBrandLink } from '../../data/links'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

const props = defineProps<{
  slugs: string[]
}>()

const rows = computed(() =>
  props.slugs
    .map((s) => {
      const b = getBrandBySlug(s)
      if (!b) return null
      const hk = b.speedMetrics?.find((m) => m.region === '香港')
      return {
        brand: b,
        link: getBrandLink(s),
        hkText: hk ? `${hk.latencyMs}ms / ${hk.downloadMbps}Mbps` : '无统一测速表'
      }
    })
    .filter(Boolean)
)
</script>

<template>
  <div class="kb-cmp-wrap">
    <table class="kb-cmp-table">
      <thead>
        <tr>
          <th>品牌</th>
          <th>运营时间</th>
          <th>线路架构</th>
          <th>客户端模式</th>
          <th>入门参考价</th>
          <th>香港非晚高峰记录</th>
          <th>数据状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r!.brand.slug">
          <td>
            <a :href="r!.brand.reviewPath" class="kb-cmp-name">{{ r!.brand.name }}</a>
            <div v-if="r!.link?.couponCode" class="kb-cmp-coupon">码：<code>{{ r!.link.couponCode }}</code></div>
          </td>
          <td>{{ r!.brand.foundedYear }}</td>
          <td>{{ r!.brand.lineCategory }}</td>
          <td>{{ r!.brand.clientMode }}</td>
          <td>{{ r!.brand.entryPriceLabel }}</td>
          <td class="obs-mono">{{ r!.hkText }}</td>
          <td>
            <span v-if="r!.brand.dataStatus === 'measured'" class="kb-badge kb-badge-green">含实测图</span>
            <span v-else-if="r!.brand.dataStatus === 'vendor'" class="kb-badge kb-badge-amber">品牌资料</span>
            <span v-else class="kb-badge kb-badge-slate">部分待核实</span>
          </td>
          <td>
            <RegistrationButton :slug="r!.brand.slug" size="sm" variant="outline" label="入口" />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
  </div>
</template>

<style scoped>
.kb-cmp-wrap {
  margin: 1.5rem 0;
}

.kb-cmp-name {
  font-weight: 700;
  color: var(--kb-text);
  text-decoration: none;
}

.kb-cmp-name:hover {
  color: var(--kb-brand);
}

.kb-cmp-coupon {
  font-size: 12px;
  color: var(--kb-text-muted);
  margin-top: 2px;
}
</style>
