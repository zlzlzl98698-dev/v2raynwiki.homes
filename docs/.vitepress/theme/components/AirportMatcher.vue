<script setup lang="ts">
import { computed, ref } from 'vue'
import { brands, type BrandRecord } from '../../data/brands'
import { getBrandLink } from '../../data/links'
import { siteData } from '../../data/site'
import RegistrationButton from './RegistrationButton.vue'

type BudgetOpt = 'any' | 'under-10' | '10-25' | 'non-expiring'
type ClientOpt = 'any' | 'third-party' | 'easy-app'
type SceneOpt = 'ai' | 'streaming' | 'multi-device' | 'backup'

const budget = ref<BudgetOpt>('any')
const clientPref = ref<ClientOpt>('third-party')
const scene = ref<SceneOpt>('ai')
const measuredOnly = ref(false)

interface ScoredBrand {
  brand: BrandRecord
  score: number
  reasons: string[]
  deepReviewUrl: string
}

const deepReviewSlugs = new Set([
  'guangsuyun',
  'muguang',
  'feimao',
  'weifeng',
  'dalaoyun',
  'xingdaomeng',
  'yinxingren',
  'ermao',
  'wuyou',
  'weitu',
  'firefly'
])

const matches = computed<ScoredBrand[]>(() => {
  const candidates = brands
    .filter((b) => {
      if (measuredOnly.value && b.dataStatus !== 'measured') return false
      if (clientPref.value === 'third-party' && (b.clientMode === '仅专属客户端' || b.clientMode === '待核实')) {
        return false
      }
      if (budget.value === 'under-10' && b.entryPriceCny >= 10) return false
      if (budget.value === '10-25' && b.entryPriceCny > 25) return false
      if (budget.value === 'non-expiring') {
        const hasOnce = b.plans.some((p) => p.billingCycle === '一次性付费')
        if (!hasOnce) return false
      }
      return true
    })
    .map((b) => {
      let score = 0
      const reasons: string[] = []

      if (b.dataStatus === 'measured') {
        score += 22
        reasons.push(`含 ${b.screenshots?.length || 1} 张原始实测截图留档`)
      } else if (b.dataStatus === 'vendor') {
        score += 10
      }

      if (b.foundedYear === '2020') {
        score += 14
        reasons.push('2020 年起运营老牌')
      } else if (b.foundedYear === '2023') {
        score += 9
        reasons.push('2023 年成熟运营')
      }

      if (clientPref.value === 'third-party' && b.clientMode === '自研+第三方订阅') {
        score += 10
        reasons.push('同时支持自研客户端与 Clash/Shadowrocket 订阅')
      } else if (clientPref.value === 'easy-app' && b.clientMode === '仅专属客户端') {
        score += 10
        reasons.push('专属客户端登录即用，免订阅配置')
      }

      if (scene.value === 'ai') {
        const aiOk = b.unlockMatrix.some(
          (u) => u.category === 'AI' && (u.status === 'operational' || u.status === 'partial' || u.status === 'vendor-claimed')
        )
        if (aiOk) {
          score += 12
          reasons.push(b.unlockDataSource === '实测记录' ? '具备 AI 实测记录与地区分流依据' : '资料标注覆盖主流 AI 场景')
        }
      } else if (scene.value === 'streaming') {
        const stOk = b.unlockMatrix.some((u) => u.category === 'Streaming' && (u.status === 'operational' || u.status === 'vendor-claimed'))
        if (stOk) {
          score += 12
          reasons.push('覆盖 Netflix / Disney+ / YouTube 等流媒体场景')
        }
      } else if (scene.value === 'multi-device') {
        if (b.features.join(' ').includes('不限设备') || b.features.join(' ').includes('多设备')) {
          score += 14
          reasons.push('明确支持多设备或不限设备并发')
        }
      } else if (scene.value === 'backup') {
        const oncePlan = b.plans.find((p) => p.billingCycle === '一次性付费')
        if (oncePlan) {
          score += 15
          reasons.push(`提供一次性不限时包（${oncePlan.traffic} / ¥${oncePlan.priceCny}）`)
        }
      }

      if (b.lineCategory === 'IEPL' || b.lineCategory === 'IPLC') {
        score += 6
      }

      if (b.dataStatus === 'historical' || b.dataStatus === 'partial') {
        score -= 15
      }

      return {
        brand: b,
        score,
        reasons: reasons.slice(0, 3),
        deepReviewUrl: deepReviewSlugs.has(b.slug) ? `/reviews/${b.slug}` : b.reviewPath
      }
    })
    .sort((a, b) => b.score - a.score || a.brand.rankOrder - b.brand.rankOrder)

  return candidates.slice(0, 3)
})

function resetMatcher() {
  budget.value = 'any'
  clientPref.value = 'third-party'
  scene.value = 'ai'
  measuredOnly.value = false
}
</script>

<template>
  <section class="kb-matcher" aria-label="30 秒机场选型配对器">
    <div class="kb-matcher-head">
      <div>
        <span class="kb-badge kb-badge-blue" style="margin-bottom: 6px;">智能筛选工具 · 基于 31 家核实数据库</span>
        <h3>30 秒机场选型配对器</h3>
        <p>按您的预算、客户端习惯与核心场景实时匹配核实品牌，绝不虚构排行评分。</p>
      </div>
      <button type="button" class="kb-matcher-reset" @click="resetMatcher">重置条件</button>
    </div>

    <div class="kb-matcher-controls">
      <div class="kb-m-field">
        <label for="m-budget">1. 预算与计费偏好</label>
        <select id="m-budget" v-model="budget">
          <option value="any">不限预算（全部核实档位）</option>
          <option value="under-10">¥10/月以下（轻量年付折算）</option>
          <option value="10-25">¥10–¥25/月（常规月付试水）</option>
          <option value="non-expiring">一次性不限时流量包（备用首选）</option>
        </select>
      </div>

      <div class="kb-m-field">
        <label for="m-client">2. 客户端与软件习惯</label>
        <select id="m-client" v-model="clientPref">
          <option value="third-party">必须支持 Clash / 小火箭 / 软路由通用订阅</option>
          <option value="easy-app">接受专属客户端登录即用（免折腾配置）</option>
          <option value="any">两种接入方式都可以</option>
        </select>
      </div>

      <div class="kb-m-field">
        <label for="m-scene">3. 首要使用场景</label>
        <select id="m-scene" v-model="scene">
          <option value="ai">ChatGPT / Claude / Gemini AI 办公</option>
          <option value="streaming">Netflix / Disney+ / YouTube 4K</option>
          <option value="multi-device">多设备 / 家庭共享不限设备</option>
          <option value="backup">应急备用不断网（永久流量包）</option>
        </select>
      </div>

      <div class="kb-m-check">
        <label>
          <input v-model="measuredOnly" type="checkbox" />
          <span>仅显示含 2026 原始测速截图的品牌</span>
        </label>
      </div>
    </div>

    <div v-if="matches.length === 0" class="kb-matcher-empty">
      <p>当前组合条件过严，未匹配到完全符合的品牌（例如部分“仅专属客户端”品牌未提供通用订阅或暂缺一次性包）。</p>
      <button type="button" class="kb-matcher-reset" @click="resetMatcher">恢复默认推荐条件</button>
    </div>

    <div v-else class="kb-matcher-results">
      <article v-for="(item, idx) in matches" :key="item.brand.slug" class="kb-m-card">
        <div class="kb-m-top">
          <div class="kb-m-title">
            <span class="kb-m-rank obs-mono">#{{ idx + 1 }}</span>
            <h4><a :href="item.deepReviewUrl">{{ item.brand.name }}</a></h4>
            <span class="kb-badge kb-badge-slate">{{ item.brand.lineCategory }}</span>
            <span v-if="item.brand.isPriorityPartner" class="kb-badge kb-badge-blue">重点专题</span>
          </div>
          <span class="kb-m-price obs-mono">{{ item.brand.entryPriceLabel }}</span>
        </div>

        <p class="kb-m-sub">{{ item.brand.tagline }}</p>

        <ul class="kb-m-reasons">
          <li v-for="r in item.reasons" :key="r">{{ r }}</li>
        </ul>

        <div class="kb-m-foot">
          <div class="kb-m-links">
            <a :href="item.deepReviewUrl" class="kb-m-review">深度评测 →</a>
            <a :href="item.brand.reviewPath" class="kb-m-archive">参数档案</a>
            <span v-if="getBrandLink(item.brand.slug)?.couponCode" class="kb-m-code">
              码：<code>{{ getBrandLink(item.brand.slug)?.couponCode }}</code>
            </span>
          </div>
          <RegistrationButton :slug="item.brand.slug" size="sm" label="前往注册" />
        </div>
      </article>
    </div>

    <p class="kb-disclosure">{{ siteData.disclosureShort }}</p>
  </section>
</template>

<style scoped>
.kb-matcher {
  padding: 22px 24px;
  border-radius: 14px;
  border: 1px solid var(--kb-border);
  background: var(--kb-bg-soft);
  margin: 1.5rem 0;
}

.kb-matcher-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.kb-matcher-head h3 {
  margin: 0 0 4px !important;
  font-size: 19px;
  font-weight: 800;
  color: var(--kb-text);
  border: none !important;
  padding: 0 !important;
}

.kb-matcher-head p {
  margin: 0 !important;
  font-size: 13.5px;
  color: var(--kb-text-muted);
}

.kb-matcher-reset {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--kb-border-strong);
  background: var(--kb-bg);
  color: var(--kb-text-2);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}

.kb-matcher-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.kb-m-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.kb-m-field label {
  font-size: 12.5px;
  font-weight: 650;
  color: var(--kb-text-2);
}

.kb-m-field select {
  height: 38px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--kb-border-strong);
  background: var(--kb-bg);
  color: var(--kb-text);
  font-size: 13.5px;
}

.kb-m-check {
  grid-column: 1 / -1;
}

.kb-m-check label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--kb-text-2);
  cursor: pointer;
}

.kb-matcher-results {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.kb-m-card {
  padding: 15px 16px;
  border-radius: 12px;
  background: var(--kb-bg);
  border: 1px solid var(--kb-border);
  display: flex;
  flex-direction: column;
}

.kb-m-top {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.kb-m-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.kb-m-rank {
  font-size: 12px;
  font-weight: 800;
  color: var(--kb-brand);
}

.kb-m-title h4 {
  margin: 0 !important;
  font-size: 16px;
  font-weight: 750;
}

.kb-m-title h4 a {
  color: var(--kb-text);
  text-decoration: none;
}

.kb-m-price {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--kb-brand);
}

.kb-m-sub {
  margin: 0 0 8px !important;
  font-size: 13px;
  line-height: 1.55;
  color: var(--kb-text-muted);
}

.kb-m-reasons {
  margin: 0 0 12px !important;
  padding-left: 16px !important;
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--kb-text-2);
}

.kb-m-foot {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--kb-border);
}

.kb-m-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
}

.kb-m-review {
  font-weight: 700;
  color: var(--kb-brand);
  text-decoration: none;
}

.kb-m-archive {
  color: var(--kb-text-muted);
  text-decoration: none;
}

.kb-matcher-empty {
  padding: 20px;
  text-align: center;
  background: var(--kb-bg);
  border: 1px dashed var(--kb-border-strong);
  border-radius: 10px;
}

@media (max-width: 920px) {
  .kb-matcher-controls,
  .kb-matcher-results {
    grid-template-columns: 1fr;
  }
}
</style>
