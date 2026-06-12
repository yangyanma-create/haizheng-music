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
