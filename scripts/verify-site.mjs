import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const docsDir = path.join(rootDir, 'docs')
const distDir = path.join(docsDir, '.vitepress', 'dist')

function walk(dir, extFilter = null) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.vitepress') {
        if (dir === docsDir && entry.name === '.vitepress') continue
      }
      out.push(...walk(full, extFilter))
    } else if (!extFilter || full.endsWith(extFilter)) {
      out.push(full)
    }
  }
  return out
}

const errors = []
const warnings = []

// 1. Check source Markdown for hardcoded affiliate URLs
const mdFiles = walk(docsDir, '.md')
const affPatterns = [/aff\.com/i, /aff\.cc/i, /gsyvipaff/i, /flycataff/i, /breezenetaff/i, /twilightaff/i, /fireflyaff/i]
for (const f of mdFiles) {
  const text = fs.readFileSync(f, 'utf8')
  for (const re of affPatterns) {
    if (re.test(text)) {
      errors.push(`Hardcoded affiliate URL detected in Markdown: ${path.relative(rootDir, f)}`)
      break
    }
  }
}

// 2. Check critical build artifacts in dist/
const requiredDistFiles = ['.htaccess', 'robots.txt', 'sitemap.xml', 'llms.txt', 'brands.json', '404.html', 'index.html', 'avatar.jpg', 'og-cover.png', 'brands/index.html', 'reviews/guangsuyun.html']
for (const rel of requiredDistFiles) {
  const full = path.join(distDir, rel)
  if (!fs.existsSync(full)) {
    errors.push(`Missing required build output: docs/.vitepress/dist/${rel}`)
  }
}

// 3. Validate sitemap.xml
let sitemapUrlCount = 0
const sitemapPath = path.join(distDir, 'sitemap.xml')
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8')
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  sitemapUrlCount = locs.length
  if (sitemapUrlCount < 100) {
    errors.push(`Sitemap has unexpectedly few URLs: ${sitemapUrlCount}`)
  }
  for (const u of locs) {
    if (!u.startsWith('https://v2raynwiki.homes/')) {
      errors.push(`Unexpected sitemap hostname: ${u}`)
    }
    if (u.includes('404')) {
      errors.push(`404 leaked into sitemap.xml: ${u}`)
    }
  }
}

// 4. Scan all rendered HTML files in dist/
const htmlFiles = walk(distDir, '.html')
let brokenLinksCount = 0
let affiliateLinkCount = 0
let jsonLdCount = 0
let missingMetaCount = 0

function resolveDistTarget(hrefPath) {
  const clean = hrefPath.split('#')[0].split('?')[0]
  if (!clean || clean === '/') return path.join(distDir, 'index.html')
  const trimmed = clean.replace(/^\/+/, '')
  const candidates = [
    path.join(distDir, trimmed),
    path.join(distDir, trimmed, 'index.html'),
    path.join(distDir, `${trimmed.replace(/\/$/, '')}.html`)
  ]
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile())
}

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/')
  const html = fs.readFileSync(file, 'utf8')
  const is404 = rel === '404.html'

  if (!is404) {
    if (!html.includes('rel="canonical"')) {
      missingMetaCount++
      errors.push(`Missing canonical link in ${rel}`)
    }
    if (!html.includes('application/ld+json')) {
      warnings.push(`No JSON-LD in ${rel}`)
    } else {
      jsonLdCount++
    }
    if (!/<h1[\s>]/i.test(html)) {
      errors.push(`Missing <h1> in ${rel}`)
    }
  }

  // Check internal links & images
  const hrefMatches = [...html.matchAll(/href="(\/[^"]*?)"/g)]
  for (const m of hrefMatches) {
    const href = m[1]
    if (href.startsWith('/assets/')) continue
    if (!resolveDistTarget(href)) {
      brokenLinksCount++
      errors.push(`Broken internal link in ${rel}: ${href}`)
    }
  }

  const imgMatches = [...html.matchAll(/src="(\/images\/[^"]*?)"/g)]
  for (const m of imgMatches) {
    const src = m[1]
    if (!resolveDistTarget(src)) {
      errors.push(`Missing image asset referenced in ${rel}: ${src}`)
    }
  }

  // Verify affiliate links have required rel & target
  const aTagMatches = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)]
  for (const m of aTagMatches) {
    const tag = m[0]
    const url = m[1]
    if (affPatterns.some((re) => re.test(url)) || /xingdaomeng\.com|civetnet\.com|yuzoucloud\.cc/i.test(url)) {
      affiliateLinkCount++
      if (!/rel="[^"]*nofollow[^"]*sponsored[^"]*noopener[^"]*"/i.test(tag)) {
        errors.push(`Affiliate link missing rel="nofollow sponsored noopener" in ${rel}: ${url}`)
      }
      if (!/target="_blank"/i.test(tag)) {
        errors.push(`Affiliate link missing target="_blank" in ${rel}: ${url}`)
      }
    }
  }
}

// 5. Verify SSR static HTML contains brand names in /brands/index.html
const brandsHtmlPath = path.join(distDir, 'brands', 'index.html')
if (fs.existsSync(brandsHtmlPath)) {
  const bHtml = fs.readFileSync(brandsHtmlPath, 'utf8')
  for (const expectedName of ['光速云', '暮光加速', '飞猫云', '微风网络', '边缘节点 EdgeNova']) {
    if (!bHtml.includes(expectedName)) {
      errors.push(`Static SSR HTML of /brands/ missing expected brand text: ${expectedName}`)
    }
  }
}

const summary = {
  markdownSourceFiles: mdFiles.length,
  renderedHtmlPages: htmlFiles.length,
  sitemapUrls: sitemapUrlCount,
  pagesWithJsonLd: jsonLdCount,
  affiliateLinksVerified: affiliateLinkCount,
  brokenInternalLinks: brokenLinksCount,
  missingMetaCount,
  warningCount: warnings.length,
  errorCount: errors.length
}

console.log('=== v2raynWiki Build & Compliance Verification ===')
console.log(JSON.stringify(summary, null, 2))

if (warnings.length > 0) {
  console.log('\nWarnings (first 10):')
  for (const w of warnings.slice(0, 10)) console.log('  [WARN]', w)
}

if (errors.length > 0) {
  console.error('\nErrors (first 30):')
  for (const e of errors.slice(0, 30)) console.error('  [ERR]', e)
  process.exit(1)
}

console.log('\nALL CHECKS PASSED.')
