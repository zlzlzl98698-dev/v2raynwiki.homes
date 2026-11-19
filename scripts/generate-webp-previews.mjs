import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const imagesRoot = path.join(rootDir, 'docs', 'public', 'images')
const webpRoot = path.join(imagesRoot, 'webp')
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const targets = []
for (const sub of ['guangsuyun', 'speedtest']) {
  const dir = path.join(imagesRoot, sub)
  if (!fs.existsSync(dir)) continue
  for (const name of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue
    const base = name.replace(/\.(png|jpe?g)$/i, '')
    targets.push({
      sub,
      name,
      srcPath: path.join(dir, name),
      outPath: path.join(webpRoot, sub, `${base}.webp`),
      relUrl: `/src/${sub}/${name}`
    })
  }
}

fs.mkdirSync(path.join(webpRoot, 'guangsuyun'), { recursive: true })
fs.mkdirSync(path.join(webpRoot, 'speedtest'), { recursive: true })

const workerHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body>
<script>
const jobs = ${JSON.stringify(targets.map((t) => ({ sub: t.sub, name: t.name, url: t.relUrl })))};
(async () => {
  for (const j of jobs) {
    const img = new Image();
    img.src = j.url;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
    const maxW = 1040;
    const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/webp', 0.84);
    await fetch('/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sub: j.sub, name: j.name, dataUrl })
    });
  }
  await fetch('/done', { method: 'POST' });
})();
</script>
</body>
</html>`

let uploadedCount = 0
let totalSrcBytes = 0
let totalWebpBytes = 0
let edgeProc = null

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(workerHtml)
    return
  }
  if (req.url?.startsWith('/src/')) {
    const parts = req.url.replace(/^\/src\//, '').split('/')
    const filePath = path.join(imagesRoot, parts[0], decodeURIComponent(parts[1]))
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': ext === '.png' ? 'image/png' : 'image/jpeg' })
      fs.createReadStream(filePath).pipe(res)
      return
    }
  }
  if (req.url === '/upload' && req.method === 'POST') {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      const match = targets.find((t) => t.sub === payload.sub && t.name === payload.name)
      if (match) {
        const b64 = payload.dataUrl.split(',')[1]
        const buf = Buffer.from(b64, 'base64')
        fs.writeFileSync(match.outPath, buf)
        totalSrcBytes += fs.statSync(match.srcPath).size
        totalWebpBytes += buf.length
        uploadedCount++
      }
      res.writeHead(200)
      res.end('ok')
    })
    return
  }
  if (req.url === '/done' && req.method === 'POST') {
    res.writeHead(200)
    res.end('done')
    const ratio = totalSrcBytes ? Math.round((1 - totalWebpBytes / totalSrcBytes) * 100) : 0
    console.log(
      JSON.stringify({
        converted: uploadedCount,
        originalMB: +(totalSrcBytes / 1024 / 1024).toFixed(2),
        webpMB: +(totalWebpBytes / 1024 / 1024).toFixed(2),
        savedPercent: `${ratio}%`
      })
    )
    setTimeout(() => {
      if (edgeProc) edgeProc.kill()
      server.close()
      process.exit(0)
    }, 200)
    return
  }
  res.writeHead(404)
  res.end('not found')
})

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port
  const userDataDir = path.join(rootDir, '.tmp-edge-webp')
  edgeProc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`,
    `http://127.0.0.1:${port}/`
  ])
  setTimeout(() => {
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true })
    } catch {}
  }, 15000)
})
