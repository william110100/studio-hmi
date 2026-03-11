'use client'

import Link from 'next/link'

export default function TopBanner() {
  return (
    <div className="bg-primary px-4 py-2.5 text-center">
      <Link
        href="/health-screening"
        className="text-xs font-medium text-white hover:underline md:text-sm"
      >
        Discover our range of tailored health screening packages
      </Link>
    </div>
  )
}
