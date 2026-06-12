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
    <div style={{ minHeight: '100vh', background: '#f0ebe3', display: 'flex', flexDirection: 'column' }}>

      {/* 大圖 Hero */}
      <div style={{ position: 'relative', width: '100%', flexShrink: 0, padding: '16px 16px 0', height: '55vh', maxHeight: '480px', boxSizing: 'border-box' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden' }}>
          <Image src={track.cover} alt={track.title} fill style={{ objectFit: 'cover' }} priority />

          {/* 返回按鈕 */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
            <BackButton dark />
          </div>
        </div>
      </div>

      {/* 歌名區 — 圖片下方 */}
      <div style={{ padding: '20px 24px 16px', maxWidth: '400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#aaa', textTransform: 'uppercase', marginBottom: '6px' }}>
          裘海正 · Chiou Haizheng
        </p>
        <h1 className="font-zcool" style={{ fontSize: '32px', color: '#1a1a1a', margin: '0 0 4px', lineHeight: 1.2 }}>
          {track.title}
        </h1>
        <p className="font-playfair" style={{ fontSize: '14px', color: '#888', fontStyle: 'italic', margin: 0 }}>
          {track.titleEn}
        </p>
      </div>

      {/* 串流按鈕 */}
      <div style={{ padding: '0 24px 20px', maxWidth: '400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
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
            style={{ display: 'block', textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#aaa' }}
          >
            購買實體專輯
          </a>
        )}
      </div>

      {/* 歌詞 */}
      {track.lyrics && track.lyrics !== '（純音樂）' && (
        <div style={{ padding: '0 24px 16px', maxWidth: '400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#aaa', textTransform: 'uppercase', marginBottom: '16px' }}>歌詞</p>
            <Lyrics lyrics={track.lyrics} />
          </div>
        </div>
      )}

      {/* 創作背景 */}
      {track.story && (
        <div style={{ padding: '0 24px 40px', maxWidth: '400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#aaa', textTransform: 'uppercase', marginBottom: '12px' }}>創作背景</p>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.8, margin: 0 }}>{track.story}</p>
          </div>
        </div>
      )}
    </div>
  )
}
