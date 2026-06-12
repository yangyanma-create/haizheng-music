import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getTrackBySlug, getAllSlugs } from '@/lib/tracks'
import StreamingButtons from '@/components/StreamingButtons'
import Lyrics from '@/components/Lyrics'
import BackButton from '@/components/BackButton'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params
  const track = getTrackBySlug(slug)

  if (!track) notFound()

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 模糊背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src={track.cover}
          alt=""
          fill
          className="object-cover scale-125"
          style={{ filter: 'blur(60px)' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(6, 4, 16, 0.85)' }} />
      </div>

      {/* 大圖 Hero — 佔上半螢幕 */}
      <div className="relative z-10 w-full flex-shrink-0" style={{ height: '55vh', maxHeight: '480px' }}>
        <Image
          src={track.cover}
          alt={track.title}
          fill
          className="object-cover"
          priority
        />

        {/* 左上角返回 */}
        <div className="absolute top-0 left-0 p-5 z-10">
          <BackButton />
        </div>

        {/* 底部漸層 + 歌名 */}
        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24"
          style={{
            background: 'linear-gradient(to top, rgba(6,4,16,1) 0%, rgba(6,4,16,0.6) 50%, transparent 100%)',
          }}
        >
          <h1 className="font-playfair text-3xl font-bold mb-1" style={{ color: '#ffffff' }}>
            {track.title}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>裘海正 · {track.titleEn}</p>
        </div>
      </div>

      {/* 下方內容 — 可捲動 */}
      <main className="relative z-10 flex flex-col px-6 pb-16 w-full max-w-sm mx-auto">
        {/* 串流按鈕 */}
        <div className="py-6">
          <StreamingButtons
            spotify={track.spotify}
            appleMusic={track.appleMusic}
            youtube={track.youtube}
          />
          {track.buyLink && (
            <a
              href={track.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-4 text-xs transition"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              購買實體專輯
            </a>
          )}
        </div>

        {/* 歌詞 */}
        {track.lyrics && track.lyrics !== '（純音樂）' && (
          <div
            className="w-full rounded-2xl p-5 mb-4"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>歌詞</p>
            <Lyrics lyrics={track.lyrics} />
          </div>
        )}

        {/* 創作背景 */}
        {track.story && (
          <div
            className="w-full rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>創作背景</p>
            <p className="text-sm leading-relaxed" style={{ color: '#ffffff' }}>{track.story}</p>
          </div>
        )}
      </main>
    </div>
  )
}
