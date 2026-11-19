---
title: iPhone / iPad iOS 代理客户端指南（Shadowrocket 小火箭 / Stash / Quantumult X / Surge 5）
description: 详解 iOS 与 iPadOS 端 11 款代理客户端的收费状态、美区 App Store 下载方式、Shadowrocket 订阅导入与规则分流设置。
date: 2026-10-19
updatedDate: 2026-11-19
category: iOS 客户端
schemaType: SoftwareApplication
softwareName: iOS 代理客户端指南
operatingSystem: iOS 15+, iPadOS 15+
author: v2rayn百科技术组
relatedBrands:
  - guangsuyun
  - xingdaomeng
  - weitu
keywords:
  - Shadowrocket小火箭教程
  - iPhone科学上网软件
  - Stash下载
  - Quantumult X配置
  - 美区App Store客户端
---

# iPhone / iPad（iOS）代理客户端选型与配置指南

<div class="kb-answer-first">
  <div class="kb-answer-first-label">核心结论 · Answer-First</div>
  <p>中国大陆区 App Store 不上架网络代理软件，需切换非国区（常见为美区）Apple ID 下载。普通用户综合性价比最高的是 <strong>Shadowrocket（小火箭）</strong>；习惯 Clash YAML 策略组的用户选 <strong>Stash</strong>；需要免费开源方案可选 <strong>Karing、Streisand 或 Hiddify</strong>。注意：切勿在系统「iCloud 设置」登录他人共享账号，仅在 <strong>App Store 商店内</strong>切换账号，防止锁机风险。</p>
</div>

## iOS 主流客户端状态一览

<ClientMatrixTable platform="ios" />

> **定价与上架透明说明**：Shadowrocket、Stash 与 Quantumult X 在美区 App Store 均为一次性买断制付费应用，Surge 5 含应用内订阅/授权购买。具体价格与上架区域请以您登录的 App Store 商店实时显示为准。

## 1. Shadowrocket（小火箭）快速上手 {#shadowrocket}

1. **导入订阅**：点击右上角 `+` 号 → 类型选择 `Subscribe` → 在 `URL` 处粘贴机场订阅链接 → 备注填写机场名 → 点击「完成」。
2. **全局路由设为「配置」**：在首页找到「全局路由（Global Routing）」，务必设为 **配置（Config）**（不要长期开「代理/全局」，否则国内 App 变慢且白耗流量）。
3. **开启自动更新与按需连接**：进入「设置 → 订阅」，开启「打开时更新」与「自动后台更新」；遇到订阅节点刷新不出时，先关闭连接或开启「通过代理更新」。
4. **AI / 流媒体单节点指定**：长按特定节点（如光速云新加坡节点用于 Gemini）或导入分流模块，可在不切全机节点的情况下精确指定分流。

## 2. Stash 与 Quantumult X 差异 {#stash}

- **Stash**：直接兼容桌面端 Clash Verge Rev 的 YAML 订阅与规则覆写，支持远程策略组、MITM 与延迟测速，适合全生态苹果用户统一配置。

### Quantumult X（圈 X）进阶特性 {#quantumult-x}
- **Quantumult X（圈 X）**：以脚本重写（Rewrite）、MITM 调试和灵活的分流策略闻名，但配置学习曲线明显高于 Shadowrocket，更适合进阶玩家。

## 3. 免费开源替代：Karing 与 Streisand {#karing}

如果你不想购买付费 App，又希望使用支持 VLESS-Reality / Hysteria 2 的原生 iOS 客户端：
- **Karing**：基于 sing-box，跨平台界面统一，内置默认分流规则集，直接粘贴机场通用订阅即可工作。

### Streisand 免费多协议 {#streisand}
- **Streisand**：支持 VLESS、VMess、Trojan、Hysteria 2 与订阅链接导入，同样零费用。

## 4. iOS 账号与隐私安全守则

- **严禁在「设置 → 顶部 Apple ID / iCloud」登录来路不明的共享账号**，这会导致“查找我的 iPhone”被远程锁定；只允许在 App Store 图标内右上角头像处退出并切换。
- 如机场提供专属 iOS 客户端（如飞猫云、Firefly 等），一般需按官网说明通过外区商店或 TestFlight 安装，且无法再导出给小火箭使用。
