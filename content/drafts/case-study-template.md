---
# ===== Hero & Overview 側欄 =====
slug: project-name            # 網址 /work/project-name
title: Project Name           # Hero 大標
heroImage: /images/project-name/hero.png
role: [Founding Designer, Core Product Redesign]   # MY ROLE
team: 2 Designers, Front-End Engineer              # TEAM
platform: Desktop & Mobile                         # PLATFORM
timeline: 2024 · 6 months                          # 可省略
scope: 0→1 Product Redesign · Design System        # SCOPE
impactLine: "↑58% Free-to-Paid Conversion · ↑23% Daily Active Users"  # 沒有數據可省略
award: "Silver Winner - MUSE Design Awards"        # 可省略
awardUrl: https://design.museaward.com/...         # 可省略：award 連結
awardBadge: /sn_muse_award_badge.png               # 可省略：award 前的徽章圖
accent: "#4271AA"                                  # 可省略：eyebrow 與數據強調色
heroBackground: "linear-gradient(to bottom right, #87AEF6 0%, #1E2A43 100%)"  # 可省略：Hero 背景
darkSurface: "#201932"                             # 可省略：標 "dark" 的圖的底色
description: 一句話的頁面描述                       # 可省略：<meta description>
---

<!--
使用說明
- 每個 ## 對應頁面上一個區塊，### 是左欄標籤（RESEARCH、PROBLEM 等）。
- 不適用的區塊整段刪除即可，元件會自動略過。
- 圖片用 ![caption](path)；並排圖片連續寫兩行。
- 標記 [待補] 的地方代表素材不足，請不要用推測內容填。
- 每個 ## 區塊的 eyebrow 文字可自訂（FEATURE 01、STEP 01、VISUAL LANGUAGE、REFLECTION 等），版型不變。
- 版型依 ## 名稱決定：Overview、Showcase、Impact、Transition 有專屬版型，其他名稱都用一般區塊。
- Transition 是深色漸層的過場，用來接到下一個功能。收尾的反思請用 ## Reflection（一般白底區塊）。

圖片與影片
- 同一行寫多張 = 並排；分行寫 = 上下堆疊。
- caption 會顯示在圖下方；寫成 ![](path) 就不顯示。
- 兩張並排且 caption 剛好是 Before / After，改成在圖上方顯示紅綠標籤。
- 路徑在 public/ 找不到檔案時，自動顯示佔位框（標出 caption 與路徑）。
- .mp4 / .webm / .mov 會變成影片，預設自動靜音循環播放；加 "controls" 改成有控制列：
  ![Demo](/images/x/demo.mp4 "controls")
- YouTube / Vimeo 網址會嵌入播放器：![Demo](https://youtu.be/xxxx)
- 影片旁邊放同名 .jpg（demo.mp4 → demo.jpg）會自動當成載入前的預覽圖。
- 白字透明底的圖加 "dark"，會放在深色底板上：![Flow](/images/x/flow.png "dark")
  底色用 frontmatter 的 darkSurface，沒寫就是深灰。
- 圖片不會被放大超過原始尺寸。直式橫式照片並排時加 "cover"，會裁成一樣的 4:3：
  ![A](/images/x/a.jpg "cover") ![B](/images/x/b.jpg "cover")
- 多個選項用空格分開："dark controls"

文字
- 一般 Markdown 都能用：粗體、斜體、連結、項目清單、1. 2. 3. 數字清單、子清單、引言、表格。
- md 裡的換行會照樣換行（例如 **標題** 下一行接說明）。

色票（名稱 | 色碼）
::: swatches
Brand Blue | #4271AA
Ink | #1E2A43
:::

字體樣本（字型名稱接在 type 後面，會從 Google Fonts 載入；每行：字級 | 說明 | 字重，後兩欄可省略）
::: type Roboto
sample: The quick brown fox jumps over the lazy dog
34 | Title | 700
17 | Body
:::

草稿標記
- [待補]、[待確認] 在本機開發時顯示為黃色標籤，正式上線（production build）時自動隱藏。
-->

## Overview
<!-- eyebrow: OVERVIEW -->
# 一句話的價值主張標題（例：Empowering Investors to Scan Fast, Search Deep, Act Confident）

第一段：我是誰、在這個專案做了什麼（角色 + 範圍）。

第二段：使用者遇到的核心問題。

第三段：我的解法路徑（從哪裡開始、延伸到哪裡）。

## Context
<!-- eyebrow: CONTEXT -->
# 這個專案真正要解的問題（例：Redesigning for Value, Not Just Aesthetics）

### Research
最初的假設是什麼、怎麼驗證、發現了什麼。

> "使用者原話 1"
> "使用者原話 2"

![對比插圖 A](path) ![對比插圖 B](path)

### Insight & Challenge
真正的障礙是：

- **洞察一標題**
  說明。
- **洞察二標題**
  說明。

一句話重新定義設計挑戰。

### Strategy
**短期：...**
說明。

**長期：...**
說明。

## Feature 01
<!-- eyebrow: FEATURE 01 -->
# 功能名稱：一句話說它解決什麼

### Problem
**問題摘要句。**

- **問題 A**
  說明。
- **問題 B**
  說明。

![標註過的原始畫面](path)

### Solution
解法摘要（例：Card-level for scannability, navigation-level for discoverability）。

### Level / 子區塊名稱
#### 01 子解法標題
說明 + 為什麼。

![Before](path) ![After](path)

#### 02 子解法標題
說明。

## Showcase
<!-- 全寬展示圖 -->
![](path)

## Impact
<!-- 有數據用 stats；沒有數據改用 outcomes / quotes -->
stats:
- value: 23%
  label: Increase in
  highlight: Daily Active Users

結果敘述段落。

> "使用者回饋原話"

## Transition
<!-- 深色漸層過場：連結到下一個功能或下一段反思 -->
# 一句話的轉折（例：From passive information to actionable advice.）

說明接下來為什麼往這個方向走。

## Feature 02
<!-- 可選，可標記為 locked 預告 -->
locked: false
# 功能名稱：一句話價值

### Context
說明。

![](path)
