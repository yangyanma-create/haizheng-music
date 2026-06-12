# 海正 NFC 迷你專輯網站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個 Next.js 靜態網站，讓買家感應 NFC 後直接開啟海正的專輯頁面或單曲頁面，包含封面、歌詞、創作背景、串流平台連結與導流區塊。

**Architecture:** 純靜態 Next.js App Router 網站，所有內容存在 `data/tracks.json` 與 `data/album.json`，透過 `lib/tracks.ts` 讀取。兩種頁面：專輯首頁（`/`）與動態單曲頁面（`/track/[slug]`），全部在 build time 產生靜態 HTML。

**Tech Stack:** Next.js 14（App Router、`output: 'export'`）、TypeScript、Tailwind CSS、Vercel 部署

---

## 檔案結構

```
haizheng-music/
├── app/
│   ├── layout.tsx              # 全站 layout，設定 metadata、字型
│   ├── page.tsx                # 專輯首頁 /
│   ├── globals.css             # Tailwind base styles
│   └── track/
│       └── [slug]/
│           └── page.tsx        # 單曲頁面 /track/[slug]
├── components/
│   ├── TrackList.tsx           # 曲目列表元件（首頁使用）
│   ├── StreamingButtons.tsx    # Spotify / Apple Music / YouTube 按鈕
│   ├── SocialLinks.tsx         # 導流區塊（社群＋網站連結）
│   └── Lyrics.tsx              # 歌詞顯示元件（保留換行）
├── data/
│   ├── album.json              # 專輯資訊（名稱、封面、年份、社群連結）
│   └── tracks.json             # 所有歌曲資料陣列
├── lib/
│   └── tracks.ts               # 讀取 JSON、型別定義、getTrackBySlug
├── public/
│   └── images/                 # 封面圖片（album-cover.jpg、各 track cover）
├── next.config.js              # output: 'export'
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1：初始化 Next.js 專案

**Files:**
- Create: `haizheng-music/` 整個專案目錄
- Create: `next.config.js`
- Create: `tailwind.config.ts`

- [ ] **Step 1: 建立 Next.js 專案**

在 `/Users/chiyangma/haizheng-music` 目錄執行：

```bash
cd /Users/chiyangma/haizheng-music
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint --import-alias "@/*"
```

遇到提示全部按 Enter 接受預設值。

- [ ] **Step 2: 設定靜態輸出**

編輯 `next.config.js`，讓 Next.js 輸出純靜態 HTML：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 3: 確認可以 build**

```bash
npm run build
```

預期輸出：`Export successful`，`out/` 目錄被產生。

- [ ] **Step 4: 清理預設內容**

刪除 `app/page.tsx` 裡的預設範例 JSX，改成最簡單的佔位頁：

```tsx
export default function Home() {
  return <main><p>海正音樂</p></main>
}
```

刪除 `app/globals.css` 裡 Tailwind directives 以外的所有內容，保留：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 5: 確認可以啟動**

```bash
npm run dev
```

開啟 `http://localhost:3000`，看到「海正音樂」文字即成功。

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: init Next.js project with static export"
```

---

## Task 2：建立資料檔案與型別

**Files:**
- Create: `data/album.json`
- Create: `data/tracks.json`
- Create: `lib/tracks.ts`

- [ ] **Step 1: 建立 album.json**

```bash
mkdir -p data
```

建立 `data/album.json`，先填入佔位資料（之後換成真實內容）：

```json
{
  "title": "專輯名稱",
  "year": "2026",
  "cover": "/images/album-cover.jpg",
  "description": "專輯介紹文字",
  "social": {
    "instagram": "https://instagram.com/haizheng",
    "facebook": "https://facebook.com/haizheng",
    "website": "https://haizheng.com"
  },
  "buyLink": "https://shopee.tw/haizheng"
}
```

- [ ] **Step 2: 建立 tracks.json**

建立 `data/tracks.json`，先填入 2 首佔位歌曲（之後補齊 5-6 首）：

```json
[
  {
    "slug": "song-one",
    "title": "第一首歌名",
    "cover": "/images/track-1.jpg",
    "lyrics": "第一段歌詞\n第二行\n\n第二段歌詞\n第二行",
    "story": "這首歌的創作背景故事，說明靈感來源與創作過程。",
    "spotify": "https://open.spotify.com/track/REPLACE_ME",
    "appleMusic": "https://music.apple.com/tw/album/REPLACE_ME",
    "youtube": "https://youtube.com/watch?v=REPLACE_ME",
    "buyLink": "https://shopee.tw/haizheng"
  },
  {
    "slug": "song-two",
    "title": "第二首歌名",
    "cover": "/images/track-2.jpg",
    "lyrics": "第一段歌詞\n第二行\n\n第二段歌詞\n第二行",
    "story": "這首歌的創作背景故事。",
    "spotify": "https://open.spotify.com/track/REPLACE_ME",
    "appleMusic": "https://music.apple.com/tw/album/REPLACE_ME",
    "youtube": "https://youtube.com/watch?v=REPLACE_ME",
    "buyLink": "https://shopee.tw/haizheng"
  }
]
```

- [ ] **Step 3: 建立 lib/tracks.ts**

```bash
mkdir -p lib
```

建立 `lib/tracks.ts`：

```typescript
import albumData from '@/data/album.json'
import tracksData from '@/data/tracks.json'

export type Track = {
  slug: string
  title: string
  cover: string
  lyrics: string
  story: string
  spotify: string
  appleMusic: string
  youtube: string
  buyLink: string
}

export type Album = {
  title: string
  year: string
  cover: string
  description: string
  social: {
    instagram: string
    facebook: string
    website: string
  }
  buyLink: string
}

export const album: Album = albumData
export const tracks: Track[] = tracksData

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  return tracks.map((t) => t.slug)
}
```

- [ ] **Step 4: 確認 TypeScript 沒有錯誤**

```bash
npx tsc --noEmit
```

預期輸出：無錯誤（空白輸出）。

- [ ] **Step 5: Commit**

```bash
git add data/ lib/
git commit -m "feat: add album/tracks data and TypeScript types"
```

---

## Task 3：建立共用元件

**Files:**
- Create: `components/TrackList.tsx`
- Create: `components/StreamingButtons.tsx`
- Create: `components/SocialLinks.tsx`
- Create: `components/Lyrics.tsx`

- [ ] **Step 1: 建立 StreamingButtons.tsx**

```bash
mkdir -p components
```

建立 `components/StreamingButtons.tsx`：

```tsx
type Props = {
  spotify: string
  appleMusic: string
  youtube: string
}

export default function StreamingButtons({ spotify, appleMusic, youtube }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <a
        href={spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#1DB954] text-black font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>▶</span> 在 Spotify 收聽
      </a>
      <a
        href={appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>♪</span> 在 Apple Music 收聽
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#FF0000] text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>▶</span> 在 YouTube 收聽
      </a>
    </div>
  )
}
```

- [ ] **Step 2: 建立 Lyrics.tsx**

建立 `components/Lyrics.tsx`：

```tsx
type Props = {
  lyrics: string
}

export default function Lyrics({ lyrics }: Props) {
  const paragraphs = lyrics.split('\n\n')

  return (
    <div className="space-y-4 text-gray-300 leading-relaxed">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: 建立 TrackList.tsx**

建立 `components/TrackList.tsx`：

```tsx
import Link from 'next/link'
import { Track } from '@/lib/tracks'

type Props = {
  tracks: Track[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <ol className="w-full max-w-md space-y-2">
      {tracks.map((track, index) => (
        <li key={track.slug}>
          <Link
            href={`/track/${track.slug}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition group"
          >
            <span className="text-gray-500 w-6 text-right text-sm">{index + 1}</span>
            <span className="flex-1 text-white group-hover:text-gray-200">{track.title}</span>
            <span className="text-gray-500 text-sm">→</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 4: 建立 SocialLinks.tsx**

建立 `components/SocialLinks.tsx`：

```tsx
import { Album } from '@/lib/tracks'

type Props = {
  social: Album['social']
  buyLink: string
}

export default function SocialLinks({ social, buyLink }: Props) {
  const links = [
    { label: 'Instagram', href: social.instagram },
    { label: 'Facebook', href: social.facebook },
    { label: '官方網站', href: social.website },
    { label: '購買專輯', href: buyLink },
  ].filter((l) => l.href)

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-white/30 text-white/70 rounded-full text-sm hover:border-white hover:text-white transition"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: 確認 TypeScript 沒有錯誤**

```bash
npx tsc --noEmit
```

預期輸出：無錯誤。

- [ ] **Step 6: Commit**

```bash
git add components/
git commit -m "feat: add TrackList, StreamingButtons, Lyrics, SocialLinks components"
```

---

## Task 4：建立專輯首頁

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: 更新 layout.tsx**

編輯 `app/layout.tsx`，設定全站暗色背景與基本 metadata：

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '海正音樂',
  description: '裘海正官方音樂專頁',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: 建立專輯首頁 app/page.tsx**

```tsx
import Image from 'next/image'
import { album, tracks } from '@/lib/tracks'
import TrackList from '@/components/TrackList'
import SocialLinks from '@/components/SocialLinks'

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-12 max-w-lg mx-auto">
      {/* 封面 */}
      <div className="w-64 h-64 relative mb-6 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={album.cover}
          alt={album.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 專輯名稱 */}
      <h1 className="text-2xl font-bold mb-1">{album.title}</h1>
      <p className="text-gray-400 text-sm mb-2">裘海正 · {album.year}</p>
      {album.description && (
        <p className="text-gray-400 text-sm text-center mb-8 leading-relaxed">
          {album.description}
        </p>
      )}

      {/* 曲目列表 */}
      <TrackList tracks={tracks} />

      {/* 導流區塊 */}
      <SocialLinks social={album.social} buyLink={album.buyLink} />
    </main>
  )
}
```

- [ ] **Step 3: 加入佔位封面圖片**

建立 `public/images/` 目錄，放入一張暫時的封面圖（任何 jpg 都可以，命名為 `album-cover.jpg`）：

```bash
mkdir -p public/images
# 複製任何一張測試圖片
cp ~/Downloads/any-image.jpg public/images/album-cover.jpg
# 或是建立純色佔位圖（需要 ImageMagick）
# convert -size 640x640 xc:#333333 public/images/album-cover.jpg
```

> 若沒有圖片，可暫時將 `album.cover` 改為空字串，之後再補。

- [ ] **Step 4: 啟動並確認首頁**

```bash
npm run dev
```

開啟 `http://localhost:3000`，確認：
- 專輯封面顯示
- 專輯名稱、年份顯示
- 曲目列表顯示（2首佔位歌曲）
- 底部導流連結顯示

- [ ] **Step 5: Commit**

```bash
git add app/ public/
git commit -m "feat: add album home page with cover, track list, and social links"
```

---

## Task 5：建立單曲頁面

**Files:**
- Create: `app/track/[slug]/page.tsx`

- [ ] **Step 1: 建立單曲頁面**

建立 `app/track/[slug]/page.tsx`：

```tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTrackBySlug, getAllSlugs } from '@/lib/tracks'
import StreamingButtons from '@/components/StreamingButtons'
import Lyrics from '@/components/Lyrics'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

type Props = {
  params: { slug: string }
}

export default function TrackPage({ params }: Props) {
  const track = getTrackBySlug(params.slug)

  if (!track) {
    notFound()
  }

  return (
    <main className="flex flex-col items-center px-6 py-12 max-w-lg mx-auto">
      {/* 返回按鈕 */}
      <Link
        href="/"
        className="self-start text-gray-400 hover:text-white text-sm mb-8 transition"
      >
        ← 返回專輯
      </Link>

      {/* 單曲封面 */}
      <div className="w-56 h-56 relative mb-6 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={track.cover}
          alt={track.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 歌名 */}
      <h1 className="text-2xl font-bold mb-6">{track.title}</h1>

      {/* 串流按鈕 */}
      <StreamingButtons
        spotify={track.spotify}
        appleMusic={track.appleMusic}
        youtube={track.youtube}
      />

      {/* 購買連結 */}
      {track.buyLink && (
        <a
          href={track.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-sm text-gray-400 hover:text-white underline transition"
        >
          購買實體專輯
        </a>
      )}

      {/* 歌詞 */}
      <section className="mt-10 w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-300">歌詞</h2>
        <Lyrics lyrics={track.lyrics} />
      </section>

      {/* 創作背景 */}
      {track.story && (
        <section className="mt-10 w-full">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">創作背景</h2>
          <p className="text-gray-400 leading-relaxed">{track.story}</p>
        </section>
      )}
    </main>
  )
}
```

- [ ] **Step 2: 為佔位歌曲加入封面圖**

```bash
cp public/images/album-cover.jpg public/images/track-1.jpg
cp public/images/album-cover.jpg public/images/track-2.jpg
```

- [ ] **Step 3: 確認單曲頁面**

```bash
npm run dev
```

開啟 `http://localhost:3000/track/song-one`，確認：
- 「← 返回專輯」連結可用
- 封面顯示
- 三個串流按鈕顯示
- 歌詞顯示（換行正確）
- 創作背景顯示

- [ ] **Step 4: 確認 build 成功**

```bash
npm run build
```

預期輸出：`Export successful`，`out/track/song-one/index.html` 存在。

- [ ] **Step 5: Commit**

```bash
git add app/track/ public/images/
git commit -m "feat: add track detail page with lyrics, story, and streaming buttons"
```

---

## Task 6：部署到 Vercel

**Files:**
- Create: `.gitignore`（確認 `out/` 在其中）

- [ ] **Step 1: 確認 .gitignore 正確**

確認 `.gitignore` 包含以下內容（`create-next-app` 通常已自動產生）：

```
node_modules/
.next/
out/
.env*
```

- [ ] **Step 2: 推送到 GitHub**

```bash
gh repo create haizheng-music --public --source=. --remote=origin --push
```

若沒有 `gh` CLI，手動在 GitHub 建立 repo 後：

```bash
git remote add origin https://github.com/YOUR_USERNAME/haizheng-music.git
git push -u origin main
```

- [ ] **Step 3: 連接 Vercel**

1. 前往 [vercel.com](https://vercel.com)，登入
2. 點「Add New Project」
3. 選擇 `haizheng-music` repo
4. Framework Preset 選「Next.js」
5. 點「Deploy」

Vercel 會自動偵測 `output: 'export'` 並部署靜態檔案。

- [ ] **Step 4: 確認部署成功**

部署完成後，Vercel 會給一個網址（格式：`haizheng-music-xxx.vercel.app`）。

用手機瀏覽器開啟該網址，確認：
- 首頁正常顯示
- 點曲目進入單曲頁面正常
- 串流按鈕可點擊

- [ ] **Step 5: 記錄網址**

將最終網址記在 `data/album.json` 的備註中，以便之後寫入 NFC 卡：

專輯 NFC 寫入：`https://haizheng-music-xxx.vercel.app`
單曲 NFC 寫入：`https://haizheng-music-xxx.vercel.app/track/song-slug`

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: finalize deployment config"
git push
```

---

## Task 7：填入真實內容

**Files:**
- Modify: `data/album.json`
- Modify: `data/tracks.json`
- Add: `public/images/*.jpg`（真實封面圖片）

- [ ] **Step 1: 準備圖片**

將以下圖片放入 `public/images/`：
- `album-cover.jpg` — 專輯封面（建議 800×800px 以上）
- `track-1.jpg`、`track-2.jpg`…（各單曲封面，可與專輯封面相同）

- [ ] **Step 2: 更新 album.json**

將 `data/album.json` 的佔位資料換成真實資訊：
- 專輯名稱、年份、介紹
- IG、FB、官方網站連結
- 購買連結

- [ ] **Step 3: 更新 tracks.json**

將 `data/tracks.json` 換成真實的 5-6 首歌資料：
- 每首歌的真實 Spotify / Apple Music / YouTube 連結
- 完整歌詞（段落間用空行 `\n\n` 分隔）
- 創作背景故事

- [ ] **Step 4: 本機確認**

```bash
npm run dev
```

逐一確認每首歌的頁面，確保歌詞換行正確、連結都能開啟。

- [ ] **Step 5: Build 並推送**

```bash
npm run build
git add data/ public/images/
git commit -m "content: add real album and track data"
git push
```

Vercel 偵測到推送後會自動重新部署。

---

## Task 8：寫入 NFC 並測試

（此 Task 為實體操作，不需寫程式）

- [ ] **Step 1: 安裝 NFC Tools App**

在手機安裝「NFC Tools」（iOS / Android 皆免費）。

- [ ] **Step 2: 寫入專輯 NFC**

1. 開啟 NFC Tools → Write → Add a record → URL
2. 輸入：`https://haizheng-music-xxx.vercel.app`
3. 手機靠近 NFC 貼片，寫入完成

- [ ] **Step 3: 寫入各單曲 NFC**

重複以上步驟，依序寫入每首歌的 URL：
- `https://haizheng-music-xxx.vercel.app/track/song-slug-1`
- `https://haizheng-music-xxx.vercel.app/track/song-slug-2`
- …

- [ ] **Step 4: 測試感應**

用另一支手機（或同一支手機的設定應用程式以外）感應 NFC，確認：
- 螢幕上方出現通知
- 點擊後正確開啟對應頁面
- 串流平台按鈕可正常跳轉

---

## 完成標準

- [ ] `npm run build` 無錯誤，靜態輸出成功
- [ ] 首頁顯示封面、曲目列表、導流連結
- [ ] 每首歌的單曲頁面顯示歌詞、創作背景、三個串流按鈕
- [ ] 部署到 Vercel，手機瀏覽器可正常存取
- [ ] NFC 貼片感應後正確跳轉對應頁面
