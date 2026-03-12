'use client'

import {IconChevronDown} from '@tabler/icons-react'
import Link from 'next/link'
import Button from '../cores/Button'
import {useState} from 'react'
import {FooterLink} from '../../helpers/constants'

interface MobileFooterAccordionProps {
  readonly title: string
  readonly links: FooterLink[]
}

export default function MobileFooterAccordion({
  title,
  links,
}: MobileFooterAccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3.5 text-[15px] text-white"
      >
        {title}
        <IconChevronDown size={18} stroke={2} className={`text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>
      {open && (
        <div className="flex flex-col gap-2.5 pb-4 pl-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-white/60 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
