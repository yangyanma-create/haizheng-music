type Props = {
  spotify: string
  appleMusic: string
  youtube: string
}

export default function StreamingButtons({ spotify, appleMusic, youtube }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[240px] mx-auto">
      <a
        href={spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-3 px-6 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: '#1DB954', color: '#000' }}
      >
        Spotify
      </a>
      <a
        href={appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-3 px-6 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #fc3c44 0%, #ff6b6b 100%)', color: '#fff' }}
      >
        Apple Music
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center py-3 px-6 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: '#FF0000', color: '#fff' }}
      >
        YouTube
      </a>
    </div>
  )
}
