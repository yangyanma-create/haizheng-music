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
