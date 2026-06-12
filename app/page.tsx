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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f0ebe3' }}>

      {/* 頂部 */}
      <div style={{ textAlign: 'center', paddingTop: '52px', paddingBottom: '24px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: '6px', fontFamily: 'var(--font-playfair)' }}>
          Donna Chiu
        </p>
        <h1 className="font-zcool" style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 4px' }}>
          非我勇敢
        </h1>
        <p style={{ fontSize: '12px', color: '#aaa', fontStyle: 'italic', fontFamily: 'var(--font-playfair)' }}>
          I Am Not Brave · 2016
        </p>
      </div>

      {/* 滑動卡片 */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '8px',
        }}
      >
        <div style={{ flexShrink: 0, width: 'calc(50vw - 130px)' }} />

        {tracks.map((track, index) => {
          const isActive = activeIndex === index
          return (
            <Link
              key={track.slug}
              href={`/track/${track.slug}`}
              data-index={index}
              style={{ flexShrink: 0, marginRight: '16px', scrollSnapAlign: 'center', textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  width: '240px',
                  transition: 'all 0.5s',
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
                }}
              >
                {/* 封面圖 */}
                <div style={{
                  width: '240px',
                  height: '300px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: isActive ? '0 16px 48px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)',
                  marginBottom: '16px',
                }}>
                  <Image src={track.cover} alt={track.title} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* 文字 — 圖片下方 */}
                <div style={{ paddingLeft: '4px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-zcool" style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 2px', lineHeight: 1.3 }}>
                    {track.title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', fontFamily: 'var(--font-playfair)', margin: 0 }}>
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
          style={{ flexShrink: 0, marginRight: '16px', scrollSnapAlign: 'center', textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            width: '240px',
            transition: 'all 0.5s',
            opacity: activeIndex === tracks.length ? 1 : 0.5,
            transform: activeIndex === tracks.length ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
          }}>
            <div style={{
              width: '240px',
              height: '300px',
              borderRadius: '20px',
              background: '#e5ddd4',
              border: '1px solid #d5ccc2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: activeIndex === tracks.length ? '0 16px 48px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)',
            }}>
              <p style={{ fontSize: '40px', color: '#888', marginBottom: '12px' }}>≡</p>
              <p className="font-playfair" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}>Full Album</p>
              <p style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.1em' }}>{tracks.length} Tracks</p>
            </div>
            <div style={{ paddingLeft: '4px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>
                {String(tracks.length + 1).padStart(2, '0')}
              </p>
              <h2 className="font-zcool" style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 2px' }}>完整曲目</h2>
              <p style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', fontFamily: 'var(--font-playfair)', margin: 0 }}>Full Tracklist</p>
            </div>
          </div>
        </Link>

        <div style={{ flexShrink: 0, width: 'calc(50vw - 130px)' }} />
      </div>

      {/* 底部指示器 */}
      <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '5px',
                borderRadius: '9999px',
                transition: 'all 0.3s',
                width: activeIndex === i ? '18px' : '5px',
                background: activeIndex === i ? '#1a1a1a' : '#ccc',
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase' }}>Swipe to explore</p>
      </div>
    </div>
  )
}
