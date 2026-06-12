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
        <div className="absolute inset-0" style={{ background: 'rgba(6, 4, 16, 0.82)' }} />
      </div>

      {/* 頂部標題 */}
      <div className="relative z-10 text-center pt-12 pb-6">
        <p className="text-xs text-white/40 tracking-widest uppercase mb-2">Chiou Haizheng</p>
        <h1 className="font-playfair text-2xl font-bold text-white tracking-wide">非我勇敢</h1>
        <p className="text-xs text-white/30 mt-1 tracking-widest italic font-playfair">I Am Not Brave · 2016</p>
      </div>

      {/* 滑動卡片 */}
      <div
        ref={scrollRef}
        className="relative z-10 flex items-center py-4"
        style={{
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 120px)' }} />

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
                className="rounded-2xl overflow-hidden transition-all duration-500 flex flex-col"
                style={{
                  width: '240px',
                  height: '340px',
                  boxShadow: isActive
                    ? '0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.12)'
                    : '0 8px 24px rgba(0,0,0,0.4)',
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? 'scale(1) translateY(0px)' : 'scale(0.88) translateY(12px)',
                }}
              >
                {/* 封面圖片 — 上方 75% */}
                <div className="relative flex-1">
                  <Image
                    src={track.cover}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 資訊區 — 下方固定高度 */}
                <div
                  className="flex-shrink-0 px-4 py-4"
                  style={{
                    height: '96px',
                    background: 'linear-gradient(180deg, rgba(6,4,16,0.85) 0%, rgba(6,4,16,0.97) 100%)',
                  }}
                >
                  <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase mb-1">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-playfair text-base font-bold text-white leading-tight mb-0.5">
                    {track.title}
                  </h2>
                  <p className="text-[11px] text-white/50 italic font-playfair">
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
            className="rounded-2xl flex flex-col items-center justify-center transition-all duration-500"
            style={{
              width: '240px',
              height: '340px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: activeIndex === tracks.length ? 1 : 0.45,
              transform: activeIndex === tracks.length ? 'scale(1) translateY(0px)' : 'scale(0.88) translateY(12px)',
            }}
          >
            <p className="text-white/30 text-4xl mb-4 font-light">≡</p>
            <p className="font-playfair text-lg font-bold text-white mb-1">Full Album</p>
            <p className="text-white/40 text-xs tracking-widest">完整曲目</p>
            <p className="text-white/25 text-xs mt-2">{tracks.length} Tracks</p>
          </div>
        </Link>

        <div className="flex-shrink-0" style={{ width: 'calc(50vw - 120px)' }} />
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
                background: activeIndex === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
        <p className="text-[10px] text-white/30 tracking-widest uppercase">Swipe to explore</p>
      </div>
    </div>
  )
}
