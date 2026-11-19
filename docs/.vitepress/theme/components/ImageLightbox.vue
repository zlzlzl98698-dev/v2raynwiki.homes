<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const activeSrc = ref('')
const activeAlt = ref('')

function handleDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target || target.tagName !== 'IMG') return
  if (!target.closest('.vp-doc')) return
  const img = target as HTMLImageElement
  if (img.width < 120) return
  activeSrc.value = img.dataset.fullsrc || img.src
  activeAlt.value = img.alt || '测试截图放大预览'
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    activeSrc.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocClick)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocClick)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="activeSrc" class="kb-lightbox" role="dialog" aria-modal="true" @click="activeSrc = ''">
      <div class="kb-lightbox-box" @click.stop>
        <button type="button" class="kb-lightbox-close" aria-label="关闭大图" @click="activeSrc = ''">×</button>
        <img :src="activeSrc" :alt="activeAlt" />
        <p v-if="activeAlt" class="kb-lightbox-cap">{{ activeAlt }}</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.kb-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(11, 18, 32, 0.86);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.kb-lightbox-box {
  position: relative;
  max-width: 94vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.kb-lightbox-box img {
  max-width: 100%;
  max-height: 82vh;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #0F172A;
}

.kb-lightbox-close {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: #172033;
  color: #FFFFFF;
  font-size: 20px;
  cursor: pointer;
}

.kb-lightbox-cap {
  margin: 0;
  color: #E2E8F0;
  font-size: 13px;
  text-align: center;
}
</style>
