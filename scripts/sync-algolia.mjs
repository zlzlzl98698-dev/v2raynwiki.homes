/**
 * Algolia 静态站点索引提取与同步工具（适配 Algolia DocSearch / 普通 Algolia 索引）
 *
 * 用法：
 *   1. 仅生成本地索引预览文件（无需密钥）：npm run algolia:sync
 *   2. 正式推送至 Algolia：
 *      在 .env 填好 VITE_ALGOLIA_APP_ID、VITE_ALGOLIA_INDEX_NAME，
 *      并在终端传入 ALGOLIA_ADMIN_KEY（严禁加 VITE_ 前缀）后执行 npm run algolia:sync
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'docs', '.vitepress', 'dist')
const outPreviewPath = path.join(rootDir, 'algolia', 'records-preview.json')

const HOSTNAME = 'https://v2raynwiki.homes'

function loadDotEnvAll() {
  const env = {}
  for (const name of ['.env', '.env.local']) {
    const p = path.join(rootDir, name)
    if (!fs.existsSync(p)) continue
    for (const raw of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const line = raw.trim()
      if (!line || line.startsWith('#')) continue
      const idx = line.indexOf('=')
      if (idx <= 0) continue
      const k = line.slice(0, idx).trim()
      const v = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      if (v) env[k] = v
    }
  }
  return env
}

function walkHtml(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walkHtml(full))
    } else if (full.endsWith('.html')) {
      out.push(full)
    }
  }
  return out
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveSectionName(urlPath) {
  if (urlPath.startsWith('/airport/')) return '机场推荐'
  if (urlPath.startsWith('/vpn/')) return 'VPN 与加速器'
  if (urlPath.startsWith('/clash/')) return 'Clash 客户端'
  if (urlPath.startsWith('/resources/')) return '资源与情报'
  if (urlPath.startsWith('/brands/')) return '机场品牌数据库'
  if (urlPath.startsWith('/reviews/')) return '品牌深度评测'
  if (urlPath.startsWith('/comparisons/')) return '品牌横向对比'
  if (urlPath.startsWith('/clients/')) return '第三方代理客户端'
  if (urlPath.startsWith('/about/')) return '关于与运维'
  return 'v2rayn百科'
}

function buildRecords() {
  if (!fs.existsSync(distDir)) {
    throw new Error('未找到构建产物 docs/.vitepress/dist，请先执行 npm run build')
  }

  const files = walkHtml(distDir)
  const records = []

  for (const file of files) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/')
    if (rel === '404.html') continue
    const html = fs.readFileSync(file, 'utf8')
    if (html.includes('content="noindex')) continue

    const urlPath =
      rel === 'index.html'
        ? '/'
        : '/' + rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '')
    const fullUrl = `${HOSTNAME}${urlPath}`
    const lvl0 = resolveSectionName(urlPath)

    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i)
    const lvl1 = stripTags(h1Match ? h1Match[1] : titleMatch ? titleMatch[1] : 'v2rayn百科')

    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    const bodyHtml = mainMatch ? mainMatch[1] : html

    // 1. 页面级标题记录
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)
    records.push({
      objectID: `${urlPath}#lvl1`,
      url: fullUrl,
      url_without_anchor: fullUrl,
      type: 'lvl1',
      lang: 'zh-CN',
      hierarchy: {
        lvl0,
        lvl1,
        lvl2: null,
        lvl3: null
      },
      content: descMatch ? descMatch[1] : ''
    })

    // 2. 按 H2 切片生成章节级记录（兼容 DocSearch 展示结构）
    const h2Regex = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2[^>]*id="|$)/gi
    let m
    let sectionIdx = 0
    while ((m = h2Regex.exec(bodyHtml)) !== null) {
      const anchor = m[1]
      const h2Text = stripTags(m[2]).replace(/\s*#\s*$/, '').trim()
      const sectionText = stripTags(m[3]).slice(0, 600)
      if (!h2Text) continue
      records.push({
        objectID: `${urlPath}#${anchor}-${sectionIdx++}`,
        url: `${fullUrl}#${anchor}`,
        url_without_anchor: fullUrl,
        anchor,
        type: 'content',
        lang: 'zh-CN',
        hierarchy: {
          lvl0,
          lvl1,
          lvl2: h2Text,
          lvl3: null
        },
        content: sectionText
      })
    }
  }

  return records
}

async function main() {
  const dotEnv = loadDotEnvAll()
  const appId = process.env.VITE_ALGOLIA_APP_ID || dotEnv.VITE_ALGOLIA_APP_ID || ''
  const indexName = process.env.VITE_ALGOLIA_INDEX_NAME || dotEnv.VITE_ALGOLIA_INDEX_NAME || 'v2raynwiki_homes'
  const adminKey = process.env.ALGOLIA_ADMIN_KEY || dotEnv.ALGOLIA_ADMIN_KEY || ''

  const records = buildRecords()
  fs.mkdirSync(path.dirname(outPreviewPath), { recursive: true })
  fs.writeFileSync(
    outPreviewPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        indexName,
        totalRecords: records.length,
        sample: records.slice(0, 10)
      },
      null,
      2
    ),
    'utf8'
  )

  console.log(`已提取 Algolia 索引记录：${records.length} 条（抽样预览已写入 algolia/records-preview.json）`)

  if (!appId || !adminKey) {
    console.log(
      '未检测到 VITE_ALGOLIA_APP_ID 或 ALGOLIA_ADMIN_KEY，已跳过线上推送（当前前端自动使用 VitePress 本地中文搜索）。'
    )
    console.log(
      '正式接入步骤：1) 在 .env 填入 VITE_ALGOLIA_APP_ID 与公开 Search-Only 的 VITE_ALGOLIA_API_KEY；2) 命令行设置 ALGOLIA_ADMIN_KEY 后运行 npm run algolia:sync；3) 运行 npm run build:check。'
    )
    return
  }

  const endpoint = `https://${appId}.algolia.net/1/indexes/${encodeURIComponent(indexName)}`
  const headers = {
    'Content-Type': 'application/json',
    'X-Algolia-Application-Id': appId,
    'X-Algolia-API-Key': adminKey
  }

  // 更新中文分词与检索属性设置
  const settingsRes = await fetch(`${endpoint}/settings`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      searchableAttributes: [
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl0)',
        'content'
      ],
      attributesForFaceting: ['lang', 'hierarchy.lvl0', 'type'],
      indexLanguages: ['zh'],
      queryLanguages: ['zh'],
      distinct: true,
      attributeForDistinct: 'url_without_anchor'
    })
  })
  if (!settingsRes.ok) {
    throw new Error(`Algolia 索引配置失败 (${settingsRes.status}): ${await settingsRes.text()}`)
  }

  // 清空旧记录并按 500 条分批写入
  const clearRes = await fetch(`${endpoint}/clear`, { method: 'POST', headers })
  if (!clearRes.ok) {
    throw new Error(`Algolia 清空索引失败 (${clearRes.status}): ${await clearRes.text()}`)
  }

  const chunkSize = 500
  for (let i = 0; i < records.length; i += chunkSize) {
    const batch = records.slice(i, i + chunkSize).map((body) => ({ action: 'addObject', body }))
    const batchRes = await fetch(`${endpoint}/batch`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ requests: batch })
    })
    if (!batchRes.ok) {
      throw new Error(`Algolia 批量写入失败 (${batchRes.status}): ${await batchRes.text()}`)
    }
  }

  console.log(`已成功向 Algolia 索引 [${indexName}] 推送 ${records.length} 条中文检索记录！`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
