import Link from 'next/link'
import Image from 'next/image'
import { tracks, album } from '@/lib/tracks'

export default function TracklistPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 模糊背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image src={album.cover} alt="" fill className="object-cover scale-125" style={{ filter: 'blur(50px)' }} priority />
        <div className="absolute inset-0" style={{ background: 'rgba(8, 6, 18, 0.82)' }} />
      </div>

      <main className="relative z-10 flex flex-col px-6 py-12 max-w-sm mx-auto w-full">
        <Link href="/" className="text-xs transition mb-8" style={{ color: '#ffffff' }}>← 返回</Link>

        {/* 專輯封面 + 名稱 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 64, height: 64 }}>
            <Image src={album.cover} alt={album.title} width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{album.title}</h1>
            <p className="text-xs" style={{ color: '#ffffff' }}>裘海正 · {album.year}</p>
          </div>
        </div>

        {/* 曲目列表 */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {tracks.map((track, index) => (
            <Link
              key={track.slug}
              href={`/track/${track.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
              style={{ borderBottom: index < tracks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <span className="w-5 text-right text-xs flex-shrink-0" style={{ color: '#ffffff' }}>{index + 1}</span>
              <span className="flex-1 text-sm font-medium" style={{ color: '#ffffff' }}>{track.title}</span>
              <svg className="w-3 h-3 flex-shrink-0" style={{ color: '#ffffff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
