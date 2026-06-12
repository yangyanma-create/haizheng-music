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
        className="flex items-center justify-center gap-2 bg-[#1DB954] text-black font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>▶</span> 在 Spotify 收聽
      </a>
      <a
        href={appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>♪</span> 在 Apple Music 收聽
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#FF0000] text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition"
      >
        <span>▶</span> 在 YouTube 收聽
      </a>
    </div>
  )
}
