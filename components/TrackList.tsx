'use client'

import Link from 'next/link'
import { Track } from '@/lib/tracks'

type Props = {
  tracks: Track[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <ol className="w-full max-w-md space-y-1">
      {tracks.map((track, index) => (
        <li key={track.slug}>
          <Link
            href={`/track/${track.slug}`}
            className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all group"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(123,94,167,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
          >
            <span className="w-5 text-right text-xs" style={{ color: '#6b6080' }}>{index + 1}</span>
            <span className="flex-1 text-sm font-medium text-white group-hover:text-purple-200 transition-colors">{track.title}</span>
            <span className="text-xs" style={{ color: '#6b6080' }}>›</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
