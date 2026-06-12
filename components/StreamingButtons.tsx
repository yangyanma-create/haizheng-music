type Props = {
  spotify: string
  appleMusic: string
  youtube: string
}

export default function StreamingButtons({ spotify, appleMusic, youtube }: Props) {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
      <a
        href={spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: '#1DB954', color: '#000' }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.257 1.072zm.105-2.835C14.692 9.15 9.375 8.977 6.297 9.9a.937.937 0 11-.543-1.795c3.532-1.07 9.404-.863 13.115 1.337a.937.937 0 01-.955 1.425z"/>
        </svg>
        在 Spotify 收聽
      </a>
      <a
        href={appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #fc3c44 0%, #ff6b6b 100%)', color: '#fff' }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208a5.485 5.485 0 00-.36 1.562c-.062.634-.07 1.272-.079 1.909v9.886c.012.766.047 1.532.2 2.29.278 1.365 1.002 2.417 2.122 3.188.81.554 1.71.797 2.68.88.61.052 1.223.073 1.836.073H17.29c.64 0 1.277-.03 1.913-.1 1.151-.129 2.17-.508 3.02-1.258.77-.68 1.279-1.53 1.579-2.505.154-.497.21-1.01.245-1.524.03-.48.035-.962.035-1.443V8.35c0-.747-.013-1.494-.088-2.226zm-5.967 13.04a3.97 3.97 0 01-1.568.61c-.448.067-.903.09-1.357.09H8.883c-.426 0-.852-.014-1.275-.073a3.954 3.954 0 01-1.616-.637c-.76-.518-1.18-1.26-1.338-2.143a8.54 8.54 0 01-.11-1.432V8.42c0-.49.01-.98.076-1.465.1-.73.41-1.35.943-1.84.574-.525 1.255-.78 2.009-.85.44-.04.882-.05 1.322-.05h6.19c.415 0 .83.01 1.244.05.8.074 1.504.335 2.07.886.487.477.77 1.062.87 1.733.07.48.08.966.08 1.45v6.79c0 .49-.01.982-.08 1.468-.105.76-.422 1.395-.987 1.892z"/>
        </svg>
        在 Apple Music 收聽
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
        style={{ background: '#FF0000', color: '#fff' }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        在 YouTube 收聽
      </a>
    </div>
  )
}
