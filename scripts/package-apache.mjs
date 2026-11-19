import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'docs', '.vitepress', 'dist')
const deployDir = path.join(rootDir, 'deploy')
const outZip = path.join(deployDir, 'v2raynwiki-homes-apache-dist.zip')

if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, '.htaccess'))) {
  console.error('Missing docs/.vitepress/dist/.htaccess. Run `npm run build:check` first.')
  process.exit(1)
}

fs.mkdirSync(deployDir, { recursive: true })
if (fs.existsSync(outZip)) fs.unlinkSync(outZip)

// 使用 System.IO.Compression.ZipFile 打包 distDir 内容，确保根目录下隐藏文件 .htaccess 完整写入压缩包根目录
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$src = "${distDir.replace(/\\/g, '\\\\')}"
$zipPath = "${outZip.replace(/\\/g, '\\\\')}"
[System.IO.Compression.ZipFile]::CreateFromDirectory($src, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$hasHtaccess = $null -ne $zip.GetEntry('.htaccess')
$count = $zip.Entries.Count
$zip.Dispose()
Write-Output ("PACKED_ENTRIES=" + $count + " HAS_HTACCESS=" + $hasHtaccess)
`

const result = execFileSync('powershell.exe', ['-NoProfile', '-Command', psScript], {
  encoding: 'utf8'
}).trim()

const sizeMB = (fs.statSync(outZip).size / 1024 / 1024).toFixed(2)
console.log(`Apache deployment archive ready: ${outZip}`)
console.log(`${result} SIZE_MB=${sizeMB}`)
