import Link from 'next/link'
import { Track } from '@/lib/tracks'

type Props = {
  tracks: Track[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <ol className="w-full max-w-md space-y-2">
      {tracks.map((track, index) => (
        <li key={track.slug}>
          <Link
            href={`/track/${track.slug}`}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition group"
          >
            <span className="text-gray-500 w-6 text-right text-sm">{index + 1}</span>
            <span className="flex-1 text-white group-hover:text-gray-200">{track.title}</span>
            <span className="text-gray-500 text-sm">→</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
