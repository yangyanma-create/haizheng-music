type Props = {
  spotify: string
  appleMusic: string
  youtube: string
}

export default function StreamingButtons({ spotify, appleMusic, youtube }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <a
        href={spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
        style={{ background: '#1DB954', color: '#000' }}
      >
        ▶ 在 Spotify 收聽
      </a>
      <a
        href={appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #fc3c44, #ff6b6b)', color: '#fff' }}
      >
        ♪ 在 Apple Music 收聽
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-opacity hover:opacity-85"
        style={{ background: '#FF0000', color: '#fff' }}
      >
        ▶ 在 YouTube 收聽
      </a>
    </div>
  )
}
