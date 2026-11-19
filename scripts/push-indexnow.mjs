/**
 * IndexNow 主动推送工具（面向 Bing / ChatGPT Search / Yandex 等支持 IndexNow 的搜索引擎）
 *
 * 用法：
 *   1. 本地预览推送列表（不发网络请求）：npm run indexnow:push
 *   2. 正式生成校验文件并推送：
 *      设置环境变量 INDEXNOW_KEY（8-128位字母数字，如 32 位十六进制随机串），
 *      运行 npm run indexnow:push -- --submit（确保站点已部署到 Apache 且 https://v2raynwiki.homes/<key>.txt 可访问）
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'docs', '.vitepress', 'dist')
const publicDir = path.join(rootDir, 'docs', 'public')
const sitemapPath = path.join(distDir, 'sitemap.xml')
const outPreviewPath = path.join(rootDir, 'algolia', 'indexnow-payload-preview.json')

const HOST = 'v2raynwiki.homes'
const HOSTNAME = `https://${HOST}`

function loadKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim()
  for (const name of ['.env', '.env.local']) {
    const p = path.join(rootDir, name)
    if (!fs.existsSync(p)) continue
    for (const raw of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = raw.trim().match(/^INDEXNOW_KEY=(.+)$/)
      if (m) return m[1].trim().replace(/^["']|["']$/g, '')
    }
  }
  return ''
}

function readSitemapUrls() {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error('未找到 docs/.vitepress/dist/sitemap.xml，请先运行 npm run build')
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8')
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
}

async function main() {
  const submit = process.argv.includes('--submit')
  const key = loadKey()
  const urls = readSitemapUrls()

  if (key) {
    if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
      throw new Error('INDEXNOW_KEY 格式无效，须为 8-128 位字母、数字或连字符')
    }
    fs.writeFileSync(path.join(publicDir, `${key}.txt`), key, 'utf8')
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, `${key}.txt`), key, 'utf8')
    }
    console.log(`已写入 IndexNow 验证文件：docs/public/${key}.txt 与 docs/.vitepress/dist/${key}.txt`)
  }

  const payload = {
    host: HOST,
    key: key || '<YOUR_INDEXNOW_KEY>',
    keyLocation: `${HOSTNAME}/${key || '<YOUR_INDEXNOW_KEY>'}.txt`,
    urlList: urls
  }

  fs.mkdirSync(path.dirname(outPreviewPath), { recursive: true })
  fs.writeFileSync(outPreviewPath, JSON.stringify({ totalUrls: urls.length, ...payload }, null, 2), 'utf8')
  console.log(`已生成 IndexNow 推送载荷预览（共 ${urls.length} 个 URL）：algolia/indexnow-payload-preview.json`)

  if (!submit) {
    console.log('当前为预演模式（未发送线上请求）。站点部署到 Apache 后，传入 INDEXNOW_KEY 并运行 `npm run indexnow:push -- --submit` 即可主动推送。')
    return
  }

  if (!key) {
    throw new Error('正式推送必须提供 INDEXNOW_KEY 环境变量或在 .env 中配置')
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  })
  const text = await res.text()
  console.log(`IndexNow 响应状态：${res.status} ${text}`)
  if (!res.ok) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
