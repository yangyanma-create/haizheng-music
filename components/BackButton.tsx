'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="self-start text-xs transition mb-8"
      style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      ← 返回
    </button>
  )
}
