import { Album } from '@/lib/tracks'

type Props = {
  social: Album['social']
  buyLink: string
}

export default function SocialLinks({ social, buyLink }: Props) {
  const links = [
    { label: 'Instagram', href: social.instagram },
    { label: 'Facebook', href: social.facebook },
    { label: '官方網站', href: social.website },
    { label: '購買專輯', href: buyLink },
  ].filter((l) => l.href)

  if (links.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full text-xs transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
