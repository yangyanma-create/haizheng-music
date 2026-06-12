import Image from 'next/image'
import { album, tracks } from '@/lib/tracks'
import TrackList from '@/components/TrackList'
import SocialLinks from '@/components/SocialLinks'

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-14 max-w-lg mx-auto">
      {/* 封面 */}
      <div className="w-56 h-56 relative mb-8 rounded-2xl overflow-hidden"
           style={{ boxShadow: '0 0 60px rgba(123, 94, 167, 0.6), 0 20px 40px rgba(0,0,0,0.5)' }}>
        <Image
          src={album.cover}
          alt={album.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 專輯名稱 */}
      <h1 className="text-3xl font-bold mb-1 tracking-wide">{album.title}</h1>
      <p className="text-sm mb-1" style={{ color: '#a89ec8' }}>裘海正</p>
      <p className="text-xs mb-8" style={{ color: '#6b6080' }}>{album.year}</p>

      {/* 分隔線 */}
      <div className="w-full max-w-md h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #7b5ea7, transparent)' }} />

      {/* 曲目列表 */}
      <TrackList tracks={tracks} />

      {/* 導流區塊 */}
      <SocialLinks social={album.social} buyLink={album.buyLink} />
    </main>
  )
}
