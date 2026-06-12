'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { tracks, album } from '@/lib/tracks'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index)
            setActiveIndex(index)
          }
        })
      },
      { root: el, threshold: 0.6 }
    )

    const cards = el.querySelectorAll('[data-index]')
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const totalCards = tracks.length + 1 // +1 for tracklist card
  const currentTrack = activeIndex < tracks.length ? tracks[activeIndex] : null

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 模糊背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src={currentTrack ? currentTrack.cover : album.cover}
          alt=""
          fill
          className="object-cover scale-125 transition-all duration-700"
          style={{ filter: 'blur(50px)' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8, 6, 18, 0.78)' }} />
      </div>

      {/* 頂部標題 */}
      <div className="relative z-10 text-center pt-14 pb-4">
        <p className="text-xs text-white/40 tracking-widest uppercase mb-1">Album</p>
        <h1 className="text-xl font-bold text-white">{album.title}</h1>
        <p className="text-xs text-white/40 mt-1">裘海正 · {album.year}</p>
      </div>

      {/* 滑動卡片區 */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 flex items-center"
        style={{
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* 左側 padding spacer */}
        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 140px)' }} />

        {/* 歌曲卡片 */}
        {tracks.map((track, index) => (
          <Link
            key={track.slug}
            href={`/track/${track.slug}`}
            data-index={index}
            className="flex-shrink-0 transition-all duration-300"
            style={{
              width: '280px',
              scrollSnapAlign: 'center',
              marginRight: '16px',
            }}
          >
            <div
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                width: '280px',
                height: '280px',
                boxShadow: activeIndex === index
                  ? '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)'
                  : '0 8px 24px rgba(0,0,0,0.4)',
                opacity: activeIndex === index ? 1 : 0.5,
                transform: activeIndex === index ? 'scale(1)' : 'scale(0.88)',
              }}
            >
              <Image
                src={track.cover}
                alt={track.title}
                width={280}
                height={280}
                className="object-cover w-full h-full"
              />
            </div>
            {/* 曲目編號 */}
            <div className="text-center mt-3">
              <p className="text-xs text-white/30">{String(index + 1).padStart(2, '0')}</p>
            </div>
          </Link>
        ))}

        {/* 最後一張：查看完整曲目 */}
        <Link
          href="/tracklist"
          data-index={tracks.length}
          className="flex-shrink-0"
          style={{
            width: '280px',
            scrollSnapAlign: 'center',
            marginRight: '16px',
          }}
        >
          <div
            className="rounded-2xl flex flex-col items-center justify-center transition-all duration-300"
            style={{
              width: '280px',
              height: '280px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              opacity: activeIndex === tracks.length ? 1 : 0.5,
              transform: activeIndex === tracks.length ? 'scale(1)' : 'scale(0.88)',
            }}
          >
            <p className="text-3xl mb-3">☰</p>
            <p className="text-white font-semibold text-sm">查看完整曲目</p>
            <p className="text-white/40 text-xs mt-1">全部 {tracks.length} 首</p>
          </div>
          <div className="text-center mt-3">
            <p className="text-xs text-white/30"> </p>
          </div>
        </Link>

        {/* 右側 padding spacer */}
        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 140px)' }} />
      </div>

      {/* 歌名區 */}
      <div className="relative z-10 text-center pb-6 px-6" style={{ minHeight: '80px' }}>
        {currentTrack ? (
          <>
            <h2 className="text-lg font-bold text-white mb-1">{currentTrack.title}</h2>
            <p className="text-xs text-white/40">點擊進入歌詞與故事</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-white mb-1">完整曲目</h2>
            <p className="text-xs text-white/40">點擊查看全部歌曲</p>
          </>
        )}

        {/* 點點指示器 */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? '20px' : '6px',
                height: '6px',
                background: activeIndex === i ? '#fff' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
