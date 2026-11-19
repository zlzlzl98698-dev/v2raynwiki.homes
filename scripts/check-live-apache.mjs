/**
 * Apache 线上部署后烟雾测试工具
 *
 * 用法：npm run deploy:check -- https://v2raynwiki.homes
 */

const baseArg = process.argv[2] || 'https://v2raynwiki.homes'
const baseUrl = baseArg.replace(/\/+$/, '')

const checks = [
  { path: '/', expectStatus: [200], desc: '首页' },
  { path: '/airport/', expectStatus: [200], desc: '一级专题目录页' },
  { path: '/airport', expectStatus: [301, 308], desc: '目录无尾斜杠应 301 规范至 /airport/' },
  { path: '/reviews/guangsuyun', expectStatus: [200], desc: '单页文章 cleanUrl' },
  { path: '/reviews/guangsuyun/', expectStatus: [301, 308], desc: '非目录文章多余尾斜杠应 301 去掉' },
  { path: '/brands/', expectStatus: [200], desc: '31 家品牌数据库' },
  { path: '/robots.txt', expectStatus: [200], desc: 'robots.txt' },
  { path: '/sitemap.xml', expectStatus: [200], desc: 'sitemap.xml' },
  { path: '/llms.txt', expectStatus: [200], desc: 'GEO llms.txt 索引' },
  { path: '/brands.json', expectStatus: [200], desc: '结构化品牌数据 JSON' },
  { path: '/og-cover.png', expectStatus: [200], desc: 'Open Graph 封面图' },
  { path: '/avatar.jpg', expectStatus: [200], desc: '品牌头像' },
  { path: '/non-existent-smoke-test-404', expectStatus: [404], desc: '不存在路径必须严格返回 HTTP 404' }
]

let failed = 0
for (const c of checks) {
  const url = `${baseUrl}${c.path}`
  try {
    const res = await fetch(url, { redirect: 'manual' })
    const ok = c.expectStatus.includes(res.status)
    const loc = res.headers.get('location')
    console.log(
      `${ok ? '[PASS]' : '[FAIL]'} ${res.status} ${c.path} (${c.desc})${loc ? ` -> ${loc}` : ''}`
    )
    if (!ok) failed++
  } catch (err) {
    console.error(`[ERR] ${c.path}: ${err.message}`)
    failed++
  }
}

if (failed > 0) {
  console.error(`\nSmoke test failed (${failed} check(s)).`)
  process.exit(1)
}
console.log('\nALL LIVE APACHE CHECKS PASSED.')
