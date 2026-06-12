type Props = {
  lyrics: string
}

export default function Lyrics({ lyrics }: Props) {
  const paragraphs = lyrics.split('\n\n')
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line text-sm text-white leading-7">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
