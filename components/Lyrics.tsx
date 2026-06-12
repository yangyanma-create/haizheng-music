type Props = {
  lyrics: string
}

export default function Lyrics({ lyrics }: Props) {
  const paragraphs = lyrics.split('\n\n')

  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line text-sm leading-7" style={{ color: '#c4bdd8' }}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
