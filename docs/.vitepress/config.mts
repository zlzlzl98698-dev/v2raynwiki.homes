import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type HeadConfig } from 'vitepress'

// 在 Node 构建阶段主动加载项目根目录 .env / .env.local 中的公开 VITE_ 变量
const dotEnvVars: Record<string, string> = {}
for (const envName of ['.env', '.env.local']) {
  const envPath = path.resolve(process.cwd(), envName)
  if (!fs.existsSync(envPath)) continue
  for (const raw of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq <= 0) continue
    const key = line.slice(0, eq).trim()
    if (!key.startsWith('VITE_')) continue
    const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (val) {
      dotEnvVars[key] = val
      if (!process.env[key]) process.env[key] = val
    }
  }
}

import { siteData } from './data/site'
import { getSidebarConfig, getTopNav, resolveBreadcrumbs } from './data/navigation'
import { brands } from './data/brands'

const resolvedAlgoliaAppId = process.env.VITE_ALGOLIA_APP_ID || dotEnvVars.VITE_ALGOLIA_APP_ID || siteData.algolia.appId
const resolvedAlgoliaApiKey = process.env.VITE_ALGOLIA_API_KEY || dotEnvVars.VITE_ALGOLIA_API_KEY || siteData.algolia.apiKey
const resolvedAlgoliaIndexName =
  process.env.VITE_ALGOLIA_INDEX_NAME || dotEnvVars.VITE_ALGOLIA_INDEX_NAME || siteData.algolia.indexName
const isAlgoliaEnabled = Boolean(resolvedAlgoliaAppId && resolvedAlgoliaApiKey)

const resolvedGoogleVerify = process.env.VITE_GOOGLE_SITE_VERIFICATION || dotEnvVars.VITE_GOOGLE_SITE_VERIFICATION || ''
const resolvedBingVerify = process.env.VITE_BING_SITE_VERIFICATION || dotEnvVars.VITE_BING_SITE_VERIFICATION || ''
const resolvedShenmaVerify = process.env.VITE_SHENMA_SITE_VERIFICATION || dotEnvVars.VITE_SHENMA_SITE_VERIFICATION || ''
const resolvedBaiduVerify = process.env.VITE_BAIDU_SITE_VERIFICATION || dotEnvVars.VITE_BAIDU_SITE_VERIFICATION || ''

function buildCanonical(relativePath: string): string {
  if (relativePath === 'index.md') return `${siteData.hostname}/`
  const cleaned = relativePath
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
  return `${siteData.hostname}/${cleaned}`
}

export default defineConfig({
  lang: siteData.language,
  title: siteData.brandName,
  titleTemplate: `:title | ${siteData.brandName}`,
  description: siteData.description,
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  metaChunk: true,

  head: [
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/avatar.jpg' }],
    ['meta', { name: 'theme-color', content: '#2563EB' }],
    ['meta', { property: 'og:site_name', content: siteData.brandName }],
    ['meta', { property: 'og:locale', content: siteData.locale }],
    ['meta', { property: 'og:image', content: `${siteData.hostname}/og-cover.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${siteData.hostname}/og-cover.png` }],
    ...(resolvedGoogleVerify
      ? [['meta', { name: 'google-site-verification', content: resolvedGoogleVerify }] as HeadConfig]
      : []),
    ...(resolvedBingVerify
      ? [['meta', { name: 'msvalidate.01', content: resolvedBingVerify }] as HeadConfig]
      : []),
    ...(resolvedShenmaVerify
      ? [['meta', { name: 'shenma-site-verification', content: resolvedShenmaVerify }] as HeadConfig]
      : []),
    ...(resolvedBaiduVerify
      ? [['meta', { name: 'baidu-site-verification', content: resolvedBaiduVerify }] as HeadConfig]
      : [])
  ],

  sitemap: {
    hostname: siteData.hostname,
    transformItems: (items) => {
      return items
        .filter((item) => !item.url.includes('404') && !item.url.includes('draft'))
        .map((item) => ({
          ...item,
          lastmod: item.lastmod || siteData.lastVerifiedDate
        }))
    }
  },

  markdown: {
    lineNumbers: false,
    theme: 'github-light',
    headers: {
      level: [2, 3]
    }
  },

  transformHead({ pageData }) {
    const head: HeadConfig[] = []
    const canonical = buildCanonical(pageData.relativePath)
    const fm = pageData.frontmatter || {}
    const pageTitle = fm.title || pageData.title || siteData.brandName
    const pageDesc = fm.description || pageData.description || siteData.description

    head.push(['link', { rel: 'canonical', href: canonical }])
    head.push(['meta', { property: 'og:title', content: pageTitle }])
    head.push(['meta', { property: 'og:description', content: pageDesc }])
    head.push(['meta', { property: 'og:url', content: canonical }])
    head.push(['meta', { property: 'og:type', content: pageData.relativePath === 'index.md' ? 'website' : 'article' }])

    if (Array.isArray(fm.keywords) && fm.keywords.length > 0) {
      head.push(['meta', { name: 'keywords', content: fm.keywords.join(', ') }])
    }

    if (fm.draft === true || pageData.relativePath === '404.md') {
      head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }])
      return head
    }

    head.push(['meta', { name: 'robots', content: 'index, follow' }])

    const pubDateRaw = fm.date || siteData.lastVerifiedDate
    const modDateRaw = fm.updatedDate || fm.date || siteData.lastVerifiedDate
    const toIsoDay = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v).slice(0, 10))
    if (pageData.relativePath !== 'index.md') {
      head.push(['meta', { property: 'article:published_time', content: toIsoDay(pubDateRaw) }])
      head.push(['meta', { property: 'article:modified_time', content: toIsoDay(modDateRaw) }])
      if (fm.author) head.push(['meta', { property: 'article:author', content: String(fm.author) }])
      if (fm.category) head.push(['meta', { property: 'article:section', content: String(fm.category) }])
    }

    const graph: Record<string, unknown>[] = []

    if (pageData.relativePath === 'index.md') {
      graph.push({
        '@type': 'Organization',
        '@id': `${siteData.hostname}/#organization`,
        name: siteData.brandName,
        url: siteData.hostname,
        logo: `${siteData.hostname}/avatar.jpg`
      })
      graph.push({
        '@type': 'WebSite',
        '@id': `${siteData.hostname}/#website`,
        url: siteData.hostname,
        name: siteData.brandName,
        description: siteData.description,
        inLanguage: siteData.language,
        publisher: { '@id': `${siteData.hostname}/#organization` }
      })
    } else {
      const routePath =
        '/' +
        pageData.relativePath
          .replace(/\/index\.md$/, '/')
          .replace(/\.md$/, '')
      const crumbs = resolveBreadcrumbs(routePath)
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: c.label,
          item: c.path ? `${siteData.hostname}${c.path}` : canonical
        }))
      })

      if (fm.schemaType === 'ItemList' && pageData.relativePath === 'brands/index.md') {
        graph.push({
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDesc,
          url: canonical,
          inLanguage: siteData.language
        })
        graph.push({
          '@type': 'ItemList',
          name: '机场品牌数据库（31 家独立核实品牌）',
          numberOfItems: brands.length,
          itemListElement: brands.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            url: `${siteData.hostname}${b.reviewPath}`
          }))
        })
      } else if (fm.schemaType === 'SoftwareApplication') {
        graph.push({
          '@type': 'SoftwareApplication',
          name: fm.softwareName || pageTitle,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: fm.operatingSystem || 'Windows, macOS, Linux, Android, iOS',
          description: pageDesc,
          url: canonical
        })
      } else if (pageData.relativePath.endsWith('/index.md') && pageData.relativePath !== 'about/index.md') {
        graph.push({
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDesc,
          url: canonical,
          inLanguage: siteData.language,
          isPartOf: { '@id': `${siteData.hostname}/#website` }
        })
      } else if (pageData.relativePath.startsWith('brands/')) {
        graph.push({
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDesc,
          url: canonical,
          inLanguage: siteData.language,
          datePublished: pubDateRaw,
          dateModified: modDateRaw
        })
      } else {
        const ogImage = fm.coverImage
          ? fm.coverImage.startsWith('http')
            ? fm.coverImage
            : `${siteData.hostname}${fm.coverImage}`
          : `${siteData.hostname}/og-cover.png`
        graph.push({
          '@type': 'Article',
          headline: pageTitle,
          description: pageDesc,
          image: [ogImage],
          inLanguage: siteData.language,
          mainEntityOfPage: canonical,
          datePublished: pubDateRaw,
          dateModified: modDateRaw,
          author: {
            '@type': 'Organization',
            name: fm.author || `${siteData.brandName}编辑部`,
            url: `${siteData.hostname}/about/`
          },
          publisher: {
            '@type': 'Organization',
            name: siteData.brandName,
            logo: {
              '@type': 'ImageObject',
              url: `${siteData.hostname}/avatar.jpg`
            }
          }
        })
      }

      if (Array.isArray(fm.faq) && fm.faq.length > 0) {
        const stripMdCode = (val: string) => String(val || '').replace(/`/g, '').trim()
        graph.push({
          '@type': 'FAQPage',
          mainEntity: fm.faq.map((item: { q: string; a: string }) => ({
            '@type': 'Question',
            name: stripMdCode(item.q),
            acceptedAnswer: {
              '@type': 'Answer',
              text: stripMdCode(item.a)
            }
          }))
        })
      }
    }

    if (graph.length > 0) {
      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
      ])
    }

    return head
  },

  themeConfig: {
    logo: { src: '/avatar.jpg', alt: `${siteData.brandName} Logo` },
    siteTitle: siteData.brandName,
    nav: getTopNav(),
    sidebar: getSidebarConfig(),

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最近更新',
      formatOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '知识库目录',
    darkModeSwitchLabel: '主题切换',

    search: isAlgoliaEnabled
      ? {
          provider: 'algolia',
          options: {
            appId: resolvedAlgoliaAppId,
            apiKey: resolvedAlgoliaApiKey,
            indexName: resolvedAlgoliaIndexName,
            placeholder: '搜索教程、机场品牌、客户端或故障代码…',
            translations: {
              button: {
                buttonText: '搜索知识库',
                buttonAriaLabel: '搜索知识库'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清空关键词',
                  resetButtonAriaLabel: '清空关键词',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '最近搜索',
                  noRecentSearchesText: '暂无搜索记录',
                  saveRecentSearchButtonTitle: '保存搜索',
                  removeRecentSearchButtonTitle: '移除记录'
                },
                errorScreen: {
                  titleText: '搜索服务连接失败',
                  helpText: '请检查网络状态或稍后重试'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索支持'
                },
                noResultsScreen: {
                  noResultsText: '未找到相关文档',
                  suggestedQueryText: '可尝试更换更简短的中文关键词，如“光速云”“Clash Verge”“TUN”'
                }
              }
            }
          }
        }
      : {
          provider: 'local',
          options: {
            locales: {
              root: {
                translations: {
                  button: {
                    buttonText: '搜索知识库',
                    buttonAriaLabel: '搜索知识库'
                  },
                  modal: {
                    displayDetails: '显示正文摘要',
                    resetButtonTitle: '重置搜索',
                    backButtonTitle: '关闭搜索',
                    noResultsText: '未找到相关文档，建议换用“光速云”“Clash”“IEPL”等关键词',
                    footer: {
                      selectText: '进入',
                      navigateText: '上下选择',
                      closeText: '关闭'
                    }
                  }
                }
              }
            }
          }
        }
  }
})
