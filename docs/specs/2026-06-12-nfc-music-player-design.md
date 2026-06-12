# 海正迷你專輯 NFC 網站 — 設計文件

**日期：** 2026-06-12  
**專案：** 裘海正 NFC 實體迷你專輯  
**負責人：** Phil（馬齊陽）

---

## 專案目標

製作一個可供販售的實體 NFC 卡片迷你專輯。  
買家用手機感應 NFC 卡，自動開啟專屬網頁，即可播放音樂、閱讀歌詞與創作背景。

---

## 實體產品

- **NFC 卡片規格：** NTAG213（信用卡尺寸白卡，可印刷）
- **販售形式：** 專輯卡（整張專輯）+ 單曲卡（單首歌），可分開販售
- **購買管道：** 蝦皮 / 露天搜尋「NFC卡片 NTAG213」
- **寫入工具：** NFC Tools App（iOS / Android，免費）

---

## 網站架構

### 技術選型

| 項目 | 選擇 |
|------|------|
| 框架 | Next.js（靜態輸出） |
| 部署 | Vercel（免費） |
| 網址 | `haizheng-music.vercel.app`（可日後升級自訂網域） |
| 內容管理 | `data/tracks.json`（無需資料庫） |

### 頁面路由

```
/                    → 專輯首頁
/track/[slug]        → 單曲頁面
```

### NFC 卡對應

| NFC 卡 | 指向 URL |
|--------|---------|
| 專輯卡 | `haizheng-music.vercel.app` |
| 單曲卡 #1 | `haizheng-music.vercel.app/track/song-slug-1` |
| 單曲卡 #2 | `haizheng-music.vercel.app/track/song-slug-2` |
| ...（最多6首） | ... |

---

## 頁面內容

### 專輯首頁 `/`

- 專輯封面大圖
- 專輯名稱、年份
- 曲目列表（點擊進入單曲頁）
- 社群連結（IG、FB）

### 單曲頁面 `/track/[slug]`

- 單曲封面圖
- 歌名
- 串流平台按鈕（Spotify、Apple Music、YouTube）
- 歌詞
- 創作背景故事
- 購買 / 周邊銷售連結

---

## 資料結構

`data/tracks.json`

```json
[
  {
    "slug": "song-name",
    "title": "歌名",
    "cover": "/images/track-1.jpg",
    "lyrics": "歌詞內容...",
    "story": "創作背景故事...",
    "spotify": "https://open.spotify.com/...",
    "appleMusic": "https://music.apple.com/...",
    "youtube": "https://youtube.com/...",
    "buyLink": "https://..."
  }
]
```

---

## 專輯資訊（待補）

- [ ] 專輯名稱
- [ ] 曲目數量（預計 5-6 首）
- [ ] 各首歌的 Spotify / Apple Music / YouTube 連結
- [ ] 封面圖片
- [ ] 各首歌歌詞
- [ ] 各首歌創作背景
- [ ] 社群帳號連結（IG、FB）
- [ ] 購買 / 銷售連結

---

## 實作階段

1. **建立 Next.js 專案**，設定靜態輸出
2. **建立資料檔案** `data/tracks.json`，填入歌曲資訊
3. **開發專輯首頁** `/`
4. **開發單曲頁面** `/track/[slug]`
5. **部署到 Vercel**，取得網址
6. **測試 NFC 寫入**，確認感應流程正確
7. （日後）購買 NFC 卡片並客製印刷卡面

---

## 未來可擴充

- 自訂網域（`haizheng.com` 等）
- 多語言支援（中 / 英）
- 播放次數統計
- 限量版序號驗證
