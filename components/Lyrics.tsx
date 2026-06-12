type Props = {
  lyrics: string
}

export default function Lyrics({ lyrics }: Props) {
  const paragraphs = lyrics.split('\n\n')

  return (
    <div className="space-y-4 text-gray-300 leading-relaxed">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
