type Props = {
  spotify: string
  appleMusic: string
  youtube: string
}

export default function StreamingButtons({ spotify, appleMusic, youtube }: Props) {
  const buttons = [
    { label: 'Spotify', href: spotify, bg: '#1a1a1a', color: '#fff' },
    { label: 'Apple Music', href: appleMusic, bg: '#fff', color: '#1a1a1a', border: '1px solid #e0d8cf' },
    { label: 'YouTube', href: youtube, bg: '#fff', color: '#1a1a1a', border: '1px solid #e0d8cf' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
      {buttons.map(({ label, href, bg, color, border }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 24px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 600,
            background: bg,
            color,
            border: border ?? 'none',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </a>
      ))}
    </div>
  )
}
