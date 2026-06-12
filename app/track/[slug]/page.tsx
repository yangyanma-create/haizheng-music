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
    <div className="relative min-h-screen flex flex-col items-center">
      {/* 模糊背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src={track.cover}
          alt=""
          fill
          className="object-cover scale-125"
          style={{ filter: 'blur(50px)' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8, 6, 18, 0.78)' }} />
      </div>

      {/* 內容 */}
      <main className="relative z-10 flex flex-col items-center px-6 py-12 w-full max-w-sm mx-auto">
        {/* 返回 */}
        <BackButton />

        {/* 封面 */}
        <div
          className="rounded-2xl overflow-hidden mb-5 flex-shrink-0"
          style={{
            width: '176px',
            height: '176px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <Image
            src={track.cover}
            alt={track.title}
            width={176}
            height={176}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* 歌名 */}
        <h1 className="font-playfair text-xl font-bold text-white mb-1 text-center">{track.title}</h1>
        <p className="text-xs mb-1 text-center" style={{ color: '#ffffff' }}>裘海正 · Chiou Haizheng</p>
        <p className="font-playfair italic text-sm mb-7 text-center" style={{ color: '#ffffff' }}>{track.titleEn}</p>

        {/* 串流按鈕 */}
        <StreamingButtons
          spotify={track.spotify}
          appleMusic={track.appleMusic}
          youtube={track.youtube}
        />

        {track.buyLink && (
          <a href={track.buyLink} target="_blank" rel="noopener noreferrer"
             className="mt-3 text-xs transition" style={{ color: '#ffffff' }}>
            購買實體專輯
          </a>
        )}

        {/* 歌詞 */}
        {track.lyrics && track.lyrics !== '（純音樂）' && (
          <div
            className="w-full rounded-2xl p-5 mt-8"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#ffffff' }}>歌詞</p>
            <Lyrics lyrics={track.lyrics} />
          </div>
        )}

        {/* 創作背景 */}
        {track.story && (
          <div
            className="w-full rounded-2xl p-5 mt-4"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#ffffff' }}>創作背景</p>
            <p className="text-sm leading-relaxed" style={{ color: '#ffffff' }}>{track.story}</p>
          </div>
        )}
      </main>
    </div>
  )
}
