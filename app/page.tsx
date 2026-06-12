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
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '6px', fontFamily: 'var(--font-playfair)' }}>
          Donna Chiu
        </p>
        <h1 className="font-zcool" style={{ fontSize: '32px', color: '#1a1a1a', margin: '0 0 4px' }}>
          非我勇敢
        </h1>
        <p style={{ fontSize: '12px', color: '#bbb', fontStyle: 'italic', fontFamily: 'var(--font-playfair)', marginBottom: '16px' }}>
          I Am Not Brave · 2016
        </p>
        {/* 副標 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', padding: '0 24px' }}>
          {album.taglines.map((tag, i) => (
            <span key={i} className="font-zcool" style={{
              fontSize: '12px',
              color: '#888',
              padding: '3px 10px',
              borderRadius: '999px',
              border: '1px solid #d5ccc2',
              background: 'rgba(255,255,255,0.6)',
            }}>
              {tag}
            </span>
          ))}
        </div>
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
              <div style={{
                width: '240px',
                transition: 'all 0.5s',
                opacity: isActive ? 1 : 0.5,
                transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
              }}>
                {/* 封面圖 */}
                <div style={{
                  width: '240px', height: '300px', borderRadius: '20px', overflow: 'hidden',
                  position: 'relative',
                  boxShadow: isActive ? '0 16px 48px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)',
                  marginBottom: '16px',
                }}>
                  <Image src={track.cover} alt={track.title} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* 文字 */}
                <div style={{ paddingLeft: '4px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#bbb', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-zcool" style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 2px', lineHeight: 1.3 }}>
                    {track.title}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#aaa', fontStyle: 'italic', fontFamily: 'var(--font-playfair)', margin: 0 }}>
                    {track.titleEn}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}

        {/* 最後一張：完整曲目 */}
        <Link href="/tracklist" data-index={tracks.length}
          style={{ flexShrink: 0, marginRight: '16px', scrollSnapAlign: 'center', textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{
            width: '240px',
            transition: 'all 0.5s',
            opacity: activeIndex === tracks.length ? 1 : 0.5,
            transform: activeIndex === tracks.length ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
          }}>
            <div style={{
              width: '240px', height: '300px', borderRadius: '20px',
              background: '#e5ddd4', border: '1px solid #d5ccc2',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: activeIndex === tracks.length ? '0 16px 48px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)',
            }}>
              <p style={{ fontSize: '40px', color: '#aaa', marginBottom: '12px' }}>≡</p>
              <p className="font-zcool" style={{ fontSize: '18px', color: '#1a1a1a', marginBottom: '4px' }}>完整曲目</p>
              <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.1em', fontFamily: 'var(--font-playfair)' }}>Full Album · {tracks.length} Tracks</p>
            </div>
            <div style={{ paddingLeft: '4px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#bbb', textTransform: 'uppercase', marginBottom: '4px' }}>
                {String(tracks.length + 1).padStart(2, '0')}
              </p>
              <h2 className="font-zcool" style={{ fontSize: '20px', color: '#1a1a1a', margin: '0 0 2px' }}>完整曲目</h2>
              <p style={{ fontSize: '12px', color: '#aaa', fontStyle: 'italic', fontFamily: 'var(--font-playfair)', margin: 0 }}>Full Tracklist</p>
            </div>
          </div>
        </Link>

        <div style={{ flexShrink: 0, width: 'calc(50vw - 130px)' }} />
      </div>

      {/* 指示器 */}
      <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
          {Array.from({ length: totalCards }).map((_, i) => (
            <div key={i} style={{
              height: '5px', borderRadius: '9999px', transition: 'all 0.3s',
              width: activeIndex === i ? '18px' : '5px',
              background: activeIndex === i ? '#1a1a1a' : '#ccc',
            }} />
          ))}
        </div>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#ccc', textTransform: 'uppercase' }}>Swipe to explore</p>
      </div>

      {/* 專輯介紹 */}
      <div style={{ padding: '24px 28px 16px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ borderTop: '1px solid #ddd5ca', paddingTop: '28px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase', marginBottom: '16px' }}>
            About the Album
          </p>
          {album.description.split('\n\n').map((para, i) => (
            <p key={i} className="font-zcool" style={{ fontSize: '14px', color: '#555', lineHeight: 2, marginBottom: '12px' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div style={{ padding: '0 28px 48px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ background: '#e8e0d6', borderRadius: '16px', padding: '20px 24px' }}>
          {album.credits.map((c, i) => (
            <p key={i} style={{ fontSize: '12px', color: '#888', lineHeight: 1.8, margin: 0 }}>{c}</p>
          ))}
        </div>
      </div>

    </div>
  )
}
