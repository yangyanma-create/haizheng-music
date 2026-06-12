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
  params: Promise<{ slug: string }>
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params
  const track = getTrackBySlug(slug)

  if (!track) {
    notFound()
  }

  return (
    <main className="flex flex-col items-center px-6 py-12 max-w-lg mx-auto">
      {/* 返回按鈕 */}
      <Link
        href="/"
        className="self-start text-sm mb-10 transition-colors hover:text-white"
        style={{ color: '#6b6080' }}
      >
        ← 返回專輯
      </Link>

      {/* 單曲封面 */}
      <div className="w-48 h-48 relative mb-6 rounded-2xl overflow-hidden"
           style={{ boxShadow: '0 0 50px rgba(123, 94, 167, 0.5), 0 15px 30px rgba(0,0,0,0.5)' }}>
        <Image
          src={track.cover}
          alt={track.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 歌名 */}
      <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
      <p className="text-sm mb-8" style={{ color: '#a89ec8' }}>裘海正</p>

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
          className="mt-4 text-xs transition-colors hover:text-white"
          style={{ color: '#6b6080' }}
        >
          購買實體專輯
        </a>
      )}

      {/* 分隔線 */}
      <div className="w-full h-px my-10" style={{ background: 'linear-gradient(90deg, transparent, #7b5ea7, transparent)' }} />

      {/* 歌詞 */}
      {track.lyrics && track.lyrics !== '（純音樂）' && (
        <section className="w-full mb-10">
          <h2 className="text-xs font-semibold tracking-widest mb-5 uppercase" style={{ color: '#7b5ea7' }}>歌詞</h2>
          <Lyrics lyrics={track.lyrics} />
        </section>
      )}

      {/* 創作背景 */}
      {track.story && (
        <section className="w-full">
          <h2 className="text-xs font-semibold tracking-widest mb-4 uppercase" style={{ color: '#7b5ea7' }}>創作背景</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#8a7fa8' }}>{track.story}</p>
        </section>
      )}
    </main>
  )
}
