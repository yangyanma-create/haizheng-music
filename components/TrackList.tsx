'use client'
import Link from 'next/link'
import { Track } from '@/lib/tracks'

type Props = {
  tracks: Track[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <ol className="divide-y divide-white/[0.06]">
      {tracks.map((track, index) => (
        <li key={track.slug}>
          <Link
            href={`/track/${track.slug}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.05] transition-colors"
          >
            <span className="w-5 text-right text-xs text-white/30 flex-shrink-0">{index + 1}</span>
            <span className="flex-1 text-sm text-white/90 font-medium">{track.title}</span>
            <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </li>
      ))}
    </ol>
  )
}
