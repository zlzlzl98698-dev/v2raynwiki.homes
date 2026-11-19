<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { getClusterAllSubItems, pillars, resolveBreadcrumbs } from '../../data/navigation'
import { getBrandBySlug } from '../../data/brands'
import { siteData } from '../../data/site'

const { frontmatter } = useData()
const route = useRoute()

const crumbs = computed(() => resolveBreadcrumbs(route.path))
const upstreamLink = computed(() => {
  if (crumbs.value.length >= 2) {
    const target = crumbs.value[crumbs.value.length - 2]
    if (target?.path && target.path !== route.path) return target
  }
  return null
})

const relatedLinks = computed<Array<{ title: string; link: string; desc?: string }>>(() => {
  if (Array.isArray(frontmatter.value.related) && frontmatter.value.related.length > 0) {
    return frontmatter.value.related
  }
  const clean = route.path.replace(/\.html$/, '')
  for (const p of pillars) {
    if (clean.startsWith(p.path)) {
      const siblingEntries: Array<{ title: string; link: string; desc?: string }> = []
      for (const t of p.topics) {
        if (clean.startsWith(t.path)) {
          for (const c of t.clusters) {
            if (c.entryPath === clean) {
              for (const sub of getClusterAllSubItems(c)) {
                siblingEntries.push({
                  title: sub.title,
                  link: sub.path,
                  desc: `${c.primaryKeyword} · ${sub.shortTitle}`
                })
              }
            } else if (c.entryPath !== clean) {
              siblingEntries.push({ title: c.title, link: c.entryPath, desc: c.summary })
            }
          }
        }
      }
      if (siblingEntries.length < 3) {
        for (const t of p.topics.slice(0, 4)) {
          if (t.path !== clean && !siblingEntries.some((x) => x.link === t.path)) {
            siblingEntries.push({ title: `${t.title}专题`, link: t.path, desc: t.summary })
          }
        }
      }
      return siblingEntries.slice(0, 4)
    }
  }
  return [
    { title: '31 家机场品牌数据库', link: '/brands/', desc: '按线路、价格、客户端筛选与排序' },
    { title: '光速云深度评测', link: '/reviews/guangsuyun', desc: '含三网 2Gbps 与 9Gbps 实测截图与解锁拆解' },
    { title: 'Clash Verge Rev 教程', link: '/clash/verge/', desc: '官方下载、服务模式 TUN 与全局覆写实战' },
    { title: '机场跑路预警与风险情报', link: '/resources/scam-alert/', desc: '识别高危灵车特征与应急切换方案' }
  ]
})

const relatedBrandList = computed(() => {
  const slugs: string[] = Array.isArray(frontmatter.value.relatedBrands)
    ? frontmatter.value.relatedBrands
    : []
  return slugs.map((s) => getBrandBySlug(s)).filter(Boolean)
})
</script>

<template>
  <section v-if="route.path !== '/'" class="kb-doc-after">
    <div v-if="upstreamLink" class="kb-upstream-bar">
      <span>返回上级专题：</span>
      <a :href="upstreamLink.path" class="kb-upstream-link">← {{ upstreamLink.label }}</a>
    </div>

    <div v-if="relatedBrandList.length > 0" class="kb-related-block">
      <h3>本文涉及品牌档案</h3>
      <div class="kb-brand-pills">
        <a v-for="b in relatedBrandList" :key="b!.slug" :href="b!.reviewPath" class="kb-brand-pill">
          <strong>{{ b!.name }}</strong>
          <span>{{ b!.lineCategory }} · {{ b!.entryPriceLabel }}</span>
        </a>
      </div>
    </div>

    <div v-if="relatedLinks.length > 0" class="kb-related-block">
      <h3>延伸阅读与相关教程</h3>
      <div class="kb-related-grid">
        <a v-for="item in relatedLinks" :key="item.link" :href="item.link" class="kb-related-card">
          <div class="kb-related-title">{{ item.title }}</div>
          <p v-if="item.desc" class="kb-related-desc">{{ item.desc }}</p>
        </a>
      </div>
    </div>

    <div class="kb-source-note">
      <strong>资料来源与透明声明：</strong>{{ siteData.disclosureShort }} 如发现套餐或实测信息过期，请参阅
      <a href="/about/">数据核实规范与商业披露</a>。
    </div>
  </section>
</template>

<style scoped>
.kb-doc-after {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--kb-border);
}

.kb-upstream-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--kb-text-muted);
  margin-bottom: 20px;
}

.kb-upstream-link {
  color: var(--kb-brand);
  font-weight: 600;
  text-decoration: none;
}

.kb-related-block {
  margin-bottom: 24px;
}

.kb-related-block h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: var(--kb-text);
}

.kb-brand-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.kb-brand-pill {
  display: inline-flex;
  flex-direction: column;
  padding: 10px 14px;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg-soft);
  text-decoration: none;
  transition: border-color 0.15s, background-color 0.15s;
}

.kb-brand-pill:hover {
  border-color: var(--kb-brand);
  background: var(--kb-brand-soft);
}

.kb-brand-pill strong {
  color: var(--kb-text);
  font-size: 14px;
}

.kb-brand-pill span {
  color: var(--kb-text-muted);
  font-size: 12px;
}

.kb-related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.kb-related-card {
  display: block;
  padding: 14px 16px;
  border: 1px solid var(--kb-border);
  border-radius: 10px;
  background: var(--kb-bg);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.kb-related-card:hover {
  border-color: var(--kb-brand);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
}

.kb-related-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--kb-text);
  margin-bottom: 4px;
}

.kb-related-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--kb-text-muted);
}

.kb-source-note {
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--kb-bg-soft);
  border: 1px solid var(--kb-border);
  font-size: 12.5px;
  color: var(--kb-text-muted);
  line-height: 1.65;
}

.kb-source-note a {
  color: var(--kb-brand);
}

@media (max-width: 640px) {
  .kb-related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
