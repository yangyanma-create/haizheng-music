'use client'

import { useRouter } from 'next/navigation'

type Props = {
  dark?: boolean
}

export default function BackButton({ dark }: Props) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.08)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: '#1a1a1a',
        backdropFilter: 'blur(8px)',
      }}
    >
      ‹
    </button>
  )
}
