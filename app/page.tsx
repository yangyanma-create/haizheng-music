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

  const totalCards = tracks.length + 1
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
          style={{ filter: 'blur(60px)' }}
          priority
        />
        <div className="absolute inset-0" style={{ background: 'rgba(6, 4, 16, 0.85)' }} />
      </div>

      {/* 頂部標題 */}
      <div className="relative z-10 text-center pt-12 pb-4">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Chiou Haizheng</p>
        <h1 className="font-zcool text-2xl font-bold tracking-wide" style={{ color: '#ffffff' }}>非我勇敢</h1>
        <p className="text-xs mt-1 tracking-widest italic font-playfair" style={{ color: 'rgba(255,255,255,0.6)' }}>I Am Not Brave · 2016</p>
      </div>

      {/* 滑動卡片 */}
      <div
        ref={scrollRef}
        className="relative z-10 flex items-center py-6"
        style={{
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 130px)' }} />

        {tracks.map((track, index) => {
          const isActive = activeIndex === index
          return (
            <Link
              key={track.slug}
              href={`/track/${track.slug}`}
              data-index={index}
              className="flex-shrink-0 mr-4 no-underline"
              style={{ scrollSnapAlign: 'center', color: 'inherit', textDecoration: 'none' }}
            >
              <div
                style={{
                  width: '260px',
                  height: '360px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.5s',
                  boxShadow: isActive
                    ? '0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)'
                    : '0 8px 24px rgba(0,0,0,0.4)',
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? 'scale(1) translateY(0px)' : 'scale(0.88) translateY(16px)',
                }}
              >
                {/* 封面圖片 — 全滿 */}
                <Image
                  src={track.cover}
                  alt={track.title}
                  fill
                  className="object-cover"
                />

                {/* 底部漸層 + 歌名 */}
                <div
                  className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                  }}
                >
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-zcool text-xl font-bold leading-tight mb-0.5" style={{ color: '#ffffff' }}>
                    {track.title}
                  </h2>
                  <p className="text-xs italic font-playfair" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {track.titleEn}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}

        {/* 最後一張：完整曲目 */}
        <Link
          href="/tracklist"
          data-index={tracks.length}
          className="flex-shrink-0 mr-4"
          style={{ scrollSnapAlign: 'center', color: 'inherit', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '260px',
              height: '360px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.5s',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              opacity: activeIndex === tracks.length ? 1 : 0.5,
              transform: activeIndex === tracks.length ? 'scale(1) translateY(0px)' : 'scale(0.88) translateY(16px)',
            }}
          >
            <p className="text-5xl mb-5 font-light" style={{ color: '#ffffff' }}>≡</p>
            <p className="font-playfair text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Full Album</p>
            <p className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>完整曲目</p>
            <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{tracks.length} Tracks</p>
          </div>
        </Link>

        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 130px)' }} />
      </div>

      {/* 底部指示器 */}
      <div className="relative z-10 text-center pb-10 pt-2">
        <div className="flex justify-center gap-1.5 mb-4">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? '18px' : '5px',
                height: '5px',
                background: activeIndex === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>Swipe to explore</p>
      </div>
    </div>
  )
}
