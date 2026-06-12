import Image from 'next/image'
import { album, tracks } from '@/lib/tracks'
import TrackList from '@/components/TrackList'
import SocialLinks from '@/components/SocialLinks'

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* 模糊背景 */}
      <div className="fixed inset-0 z-0">
        <Image
          src={album.cover}
          alt=""
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10, 8, 20, 0.75)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }} />
      </div>

      {/* 內容 */}
      <main className="relative z-10 flex flex-col items-center px-6 py-14 w-full max-w-sm mx-auto">
        {/* 封面 */}
        <div
          className="rounded-2xl overflow-hidden mb-6 flex-shrink-0"
          style={{
            width: '200px',
            height: '200px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <Image
            src={album.cover}
            alt={album.title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* 專輯名稱 */}
        <h1 className="text-2xl font-bold text-white mb-1 tracking-wide text-center">{album.title}</h1>
        <p className="text-sm text-white/60 mb-8 text-center">裘海正 · {album.year}</p>

        {/* 曲目列表 — 毛玻璃卡片 */}
        <div
          className="w-full rounded-2xl overflow-hidden mb-6"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <TrackList tracks={tracks} />
        </div>

        {/* 導流區塊 */}
        <SocialLinks social={album.social} buyLink={album.buyLink} />
      </main>
    </div>
  )
}
