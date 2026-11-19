<script setup lang="ts">
import { computed } from 'vue'
import { getBrandBySlug } from '../../data/brands'

const props = defineProps<{
  slug: string
}>()

const brand = computed(() => getBrandBySlug(props.slug))

function toWebpPreview(originalPath: string): string {
  const match = originalPath.match(/^\/images\/(guangsuyun|speedtest)\/(.+)\.(png|jpe?g)$/i)
  if (!match) return originalPath
  return `/images/webp/${match[1]}/${match[2]}.webp`
}

const WEBP_DIMENSIONS: Record<string, [number, number]> = {
  '/images/webp/guangsuyun/guangsuyun-speed-unlock-mobile-2gbps.webp': [829, 808],
  '/images/webp/guangsuyun/guangsuyun-speed-unlock-telecom-2gbps.webp': [825, 808],
  '/images/webp/guangsuyun/guangsuyun-speed-unlock-unicom-2gbps.webp': [824, 809],
  '/images/webp/guangsuyun/guangsuyun-speed-vless-unicom-9gbps.webp': [592, 1064],
  '/images/webp/guangsuyun/guangsuyun-streaming-vless-unicom-9gbps.webp': [869, 1067],
  '/images/webp/speedtest/weifeng-2026-08-11.webp': [1040, 1588],
  '/images/webp/speedtest/wuyou-2026-08-11-1.webp': [870, 1280],
  '/images/webp/speedtest/wuyou-2026-08-11-2.webp': [789, 1280]
}

function getShotSize(originalPath: string): [number, number] {
  const webp = toWebpPreview(originalPath)
  return WEBP_DIMENSIONS[webp] || [1040, 1300]
}
</script>

<template>
  <section v-if="brand?.screenshots && brand.screenshots.length > 0" class="kb-shots">
    <div v-for="(shot, i) in brand.screenshots" :key="shot.image" class="kb-shot-card">
      <div class="kb-shot-meta">
        <strong>原始实测留档 #{{ i + 1 }} · {{ shot.testedAt }}</strong>
        <span class="kb-badge kb-badge-slate">{{ shot.protocolDisplayed }} · {{ shot.toolFamily }}</span>
      </div>
      <figure class="kb-shot-fig">
        <img
          :src="toWebpPreview(shot.image)"
          :data-fullsrc="shot.image"
          :width="getShotSize(shot.image)[0]"
          :height="getShotSize(shot.image)[1]"
          :alt="`${brand.name} ${shot.testedAt} 节点实测截图`"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span>{{ shot.caption }}</span>
          <a :href="shot.image" target="_blank" rel="noopener" class="kb-raw-link">查看原始原图 ↗</a>
        </figcaption>
      </figure>
    </div>
    <p class="kb-shot-note">
      页面展示轻量 WebP 预览以加快加载；点击图片放大或点击“查看原始原图”均可核验未经裁切改写的原始 PNG/JPG 留档。
    </p>
  </section>
</template>

<style scoped>
.kb-shots {
  display: grid;
  gap: 18px;
  margin: 1.25rem 0;
}

.kb-shot-card {
  padding: 14px 16px;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-bg-soft);
}

.kb-shot-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13.5px;
  color: var(--kb-text);
}

.kb-shot-fig {
  margin: 0;
}

.kb-shot-fig img {
  width: 100%;
  height: auto;
  display: block;
}

.kb-shot-fig figcaption {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--kb-text-muted);
}

.kb-raw-link {
  color: var(--kb-brand);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.kb-shot-note {
  margin: 0 !important;
  font-size: 12.5px;
  color: var(--kb-text-muted);
}
</style>
