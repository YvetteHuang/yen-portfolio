# Wondera × Design System 現況盤點

## 目標

- 釐清目前 `Wondera` 使用了哪些設計 token（字體、顏色、間距、尺寸）。
- 區分「已在 DS 定義」與「專案自定義」。
- 提出整併策略：哪些應升級到 DS、哪些維持 Wondera 專用。

## 目前 DS（既有定義）

來源：`src/lib/designSystem.js`

- `dsFonts`
  - `display`: Source Serif 4
  - `body`: Inter
- `dsBreakpoints`
  - `320 / 720 / 1024 / 1440`
- `dsType`
  - `h1 / h2 / h3 / subtitle / body / meta`（含 responsive 字級）
- `dsLayout`
  - `pageFrame / contentMax / textMax`
- `dsSpacing`
  - `pageTopBottom / sectionGap / sectionInner(Tight) / paragraphGap / cardPadding / dividerTop`

## Wondera 已套用 DS 的部分

來源：`src/app/work/wondera/wondera.js`

- 字體：大量使用 `dsFonts.display`、`dsFonts.body`
- 版面：使用 `dsLayout.pageFrame`、`dsLayout.textMax`
- 間距：使用 `dsSpacing.sectionGap`、`dsSpacing.sectionInner`、`dsSpacing.paragraphGap`、`dsSpacing.dividerTop`
- 文字層級：有使用 `dsType.meta`、`dsType.body`、局部 `dsType.h2`

結論：Wondera 已有 DS 基底，但仍混用不少專案局部值。

## Wondera 自定義盤點（DS 外）

### A. 顏色（Priority 高）

#### 1) HEX / 硬編碼色

- Hero gradient: `#6320EE`, `#351A6B`, `#161616`
- Section 背景：`#32167A`
- Flow 元件色：`#E5D9FF`, `#6233C1`, `#2A1146`

#### 2) Tailwind violet 調色

- `text-violet-300`, `text-violet-200`, `text-violet-100`
- `border-violet-400/30`, `border-violet-300/40`
- `bg-violet-500/10`, `bg-violet-500/25`, `bg-violet-500/35`, `bg-violet-400/20`

### B. Typography（Priority 中高）

- 多組自定義 display 尺寸：
  - `text-[2.25rem] ... min-[1440px]:text-[4rem]`
  - `text-[1.75rem] ... min-[1024px]:text-[2.5rem]`
  - `text-[2.5rem] ... min-[1440px]:text-[3.25rem]`
- 其他 text token：
  - `text-[1.2rem]`, `text-[1.05rem]`, `text-[0.625rem]`, `text-[0.65rem]`
- 行高與 tracking：
  - `leading-[1.08]`, `leading-[1.14]`, `leading-[1.4]`
  - `tracking-[0.22em]`, `tracking-[0.2em]`, `tracking-[0.18em]`, `tracking-[0.14em]`

### C. Spacing / Radius / Size（Priority 中）

- 常見局部 spacing：
  - `gap-10`, `gap-14`, `gap-8`, `p-4`, `p-5`, `mt-5`, `mt-[4.5rem]`
- 尺寸：
  - `max-w-[1440px]`, `max-w-[280px|300px|320px|360px|420px|450px]`
  - `min-h-[12rem]`, `min-h-[2.75rem]`, `h-[clamp(360px,60vw,1043px)]`
- 圓角：
  - `rounded-md`, `rounded-lg`, `rounded-2xl`, `rounded-full`

## DS 與全域字體策略衝突（必修）

目前存在 3 層字體來源：

- `src/app/layout.js`：`Geist`, `Geist_Mono`
- `src/app/globals.css`：`body { font-family: Arial, Helvetica, sans-serif; }`
- `src/lib/designSystem.js`：`Inter`, `Source Serif 4`

這會造成 token 收斂後仍出現視覺不一致。建議先定版字體架構，再做大規模 token 替換。

## 判斷原則：哪些要進 DS，哪些留 Wondera 專用

### 應升級為 DS Token（跨頁可重用）

- 品牌核心色階（如 accent 主色與對應 on-accent 文本色）
- 重複出現的 section heading 尺寸與字重組合
- 常用卡片間距與 radius 規格（例如 `card-sm/md/lg`）
- 常見 overlay/background surface（`surface-1/2`, `elevated`）

### 維持 Wondera 專案專用（不建議直接進 DS）

- 故事性 Hero 漸層（頁面主視覺）
- Flow 動畫元件專用色（若只在 Wondera 有語意）
- 特定圖像容器尺寸（若只綁定該案例素材）

## 回答關鍵問題：要先修 Wondera 還是先做 DS？

建議順序：**先做「小規模 token 收斂」，再修 Wondera 細節；不要先全面重構。**

原因：

- 若先直接修 UI 細節，後續 DS token 調整會再改一次，成本雙倍。
- 但若先做完整 DS 大重構，範圍太大、風險高、迭代慢。
- 最佳做法是先定「最小可用 token 集」（顏色 + 文字 + spacing 各一小組），先把 Wondera 高頻重複值掛上 token，再做視覺微調。

## 建議執行計畫（3 階段）

### Phase 1（1-2 次 PR）

- 鎖定高頻重複值，建立最小 token：
  - `dsColors.accent.*`（含 violet 對應）
  - `dsType.caseStudyHeading`（或 `dsType.sectionTitle`）
  - `dsSurface.card*` / `dsRadius.*`
- 不改版型邏輯，只做 token 對接。

### Phase 2（Wondera 局部清理）

- 把 Wondera 重複 class 替換成語意化 token。
- 專案專用值保留在 `wonderaTokens`（或 Wondera module 常數），避免污染全域 DS。

### Phase 3（跨頁驗證）

- 檢查首頁卡片與其他案例頁是否可共用新 token。
- 真正可復用者再升級為全域 DS；不可復用者退回專案 token。

## 建議下一步（可直接開始）

1. 先定義一版 `dsColors`（不超過 8-12 個 color token）。
2. 在 Wondera 先替換 3 類高頻值：
   - 紫色相關顏色
   - section 大標字級
   - card / toc 的邊框與底色
3. 做視覺回歸檢查，再決定是否擴充更多 token。

