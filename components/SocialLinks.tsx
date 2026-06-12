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

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-white/30 text-white/70 rounded-full text-sm hover:border-white hover:text-white transition"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
