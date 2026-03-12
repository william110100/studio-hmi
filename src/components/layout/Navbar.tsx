'use client'

import {IconArrowRight, IconChevronDown, IconChevronLeft, IconChevronRight, IconMenu2, IconSearch, IconWorld, IconX} from '@tabler/icons-react'
import Button from '../cores/Button'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useRef, useState} from 'react'
import {MOBILE_NAV_LINKS, MOBILE_SECONDARY_LINKS, NAV_LINKS} from '../../helpers/constants'
import {SPECIALTIES_LIST} from '../../helpers/specialties'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submenu, setSubmenu] = useState<string | null>(null)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  const closeMobile = () => {
    setMobileOpen(false)
    setSubmenu(null)
  }

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (currentScrollY < 10) {
      setNavVisible(true)
    } else if (currentScrollY > lastScrollY.current) {
      setNavVisible(false)
    } else {
      setNavVisible(true)
    }
    lastScrollY.current = currentScrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <div
        className="sticky top-0 z-40 w-full"
        style={{
          transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="hidden border-b border-hmi-gray-200 bg-white desktop:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-20">
            <Button className="flex items-center gap-1.5 py-2 text-sm text-hmi-gray-500 hover:text-hmi-gray-700" aria-label="Select language">
              <IconWorld size={18} stroke={1.5} />
              <span>EN</span>
              <IconChevronDown size={14} stroke={2} />
            </Button>
            <div className="flex items-center gap-6">
              <Link
                href="/about-us"
                className="py-2 text-sm text-hmi-gray-500 hover:text-hmi-gray-900"
              >
                About Us
              </Link>
              <Link
                href="/news-resources"
                className="py-2 text-sm text-hmi-gray-500 hover:text-hmi-gray-900"
              >
                News &amp; Resources
              </Link>
              <Link
                href="/contact-us"
                className="py-2 text-sm text-hmi-gray-500 hover:text-hmi-gray-900"
              >
                Contact Us
              </Link>
              <Button
                className="py-2 text-hmi-gray-500 hover:text-hmi-gray-900"
                aria-label="Search"
              >
                <IconSearch size={20} stroke={2} />
              </Button>
            </div>
          </div>
        </div>

        <nav className="relative hidden border-b border-hmi-gray-200 bg-white desktop:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-20 py-4">
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/logo/hmi-logo.svg"
                alt="HMI Medical"
                width={102}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.label === 'Specialty Care' ? (
                  <SpecialtyCareDropdown
                    key={link.href}
                    href={link.href}
                    isActive={pathname === link.href}
                  />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium leading-none transition-colors ${
                      pathname === link.href
                        ? 'text-primary after:absolute after:bottom-[-24px] after:left-0 after:h-[3px] after:w-full after:bg-primary'
                        : 'text-hmi-gray-700 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <Link
              href="/make-appointment"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Make Appointment
            </Link>
          </div>
        </nav>

        <nav className="flex items-center justify-between border-b border-hmi-gray-200 bg-white px-6 py-3 desktop:hidden">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo/hmi-logo.svg"
              alt="HMI Medical"
              width={102}
              height={48}
              className="h-9 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Button className="p-2 text-hmi-gray-700" aria-label="Search">
              <IconSearch size={20} stroke={2} />
            </Button>
            <Button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-hmi-gray-700"
              aria-label="Open menu"
            >
              <IconMenu2 size={24} stroke={2} />
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 desktop:hidden"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <div className="absolute inset-0 bg-black/20" onClick={closeMobile} />

            <motion.div
              className="absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-xl"
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'spring', damping: 25, stiffness: 200}}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <Link href="/" onClick={closeMobile}>
                  <img
                    src="/images/logo/hmi-logo.svg"
                    alt="HMI Medical"
                    width={102}
                    height={48}
                    className="h-9 w-auto"
                  />
                </Link>
                <Button
                  onClick={closeMobile}
                  className="p-2 text-hmi-gray-500"
                  aria-label="Close menu"
                >
                  <IconX size={24} stroke={2} />
                </Button>
              </div>

              <Link
                href="/make-appointment"
                onClick={closeMobile}
                className="flex items-center justify-between bg-primary px-5 py-4 text-base font-semibold text-white"
              >
                Make Appointment
                <IconChevronRight size={20} stroke={2} />
              </Link>

              <div className="flex flex-1 flex-col justify-between overflow-y-auto">
                <div className="py-2">
                  {MOBILE_NAV_LINKS.map((link) => (
                    <div key={link.href}>
                      {link.hasSubmenu ? (
                        <Button
                          onClick={() => setSubmenu(link.label)}
                          className="flex w-full items-center justify-between px-5 py-4 text-base text-hmi-gray-900 hover:bg-hmi-gray-50"
                        >
                          {link.label}
                          <IconChevronRight size={20} stroke={2} className="text-hmi-gray-400" />
                        </Button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          className="block px-5 py-4 text-base text-hmi-gray-900 hover:bg-hmi-gray-50"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-hmi-gray-200 bg-hmi-gray-50">
                  <Button className="flex w-full items-center gap-2 px-5 py-4 text-base text-hmi-gray-500 hover:bg-hmi-gray-100" aria-label="Select language">
                    <IconWorld size={18} stroke={1.5} />
                    <span>English</span>
                    <IconChevronRight size={20} stroke={2} className="ml-auto text-hmi-gray-400" />
                  </Button>
                  {MOBILE_SECONDARY_LINKS.map((link) => (
                    <div key={link.href}>
                      {link.hasSubmenu ? (
                        <Button
                          onClick={() => setSubmenu(link.label)}
                          className="flex w-full items-center justify-between px-5 py-4 text-base text-hmi-gray-500 hover:bg-hmi-gray-100"
                        >
                          {link.label}
                          <IconChevronRight size={20} stroke={2} className="text-hmi-gray-400" />
                        </Button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMobile}
                          className="block px-5 py-4 text-base text-hmi-gray-500 hover:bg-hmi-gray-100"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {submenu === 'Specialities & Treatments' && (
                  <motion.div
                    className="absolute inset-0 flex flex-col bg-white"
                    initial={{x: '100%'}}
                    animate={{x: 0}}
                    exit={{x: '100%'}}
                    transition={{type: 'spring', damping: 25, stiffness: 200}}
                  >
                    <div className="flex items-center justify-between border-b border-hmi-gray-200 px-5 py-4">
                      <Button
                        onClick={() => setSubmenu(null)}
                        className="flex items-center gap-2 text-sm text-hmi-gray-700"
                      >
                        <IconChevronLeft size={20} stroke={2} />
                        <span>Specialities &amp; Treatments</span>
                      </Button>
                      <Button
                        onClick={closeMobile}
                        className="p-2 text-hmi-gray-500"
                        aria-label="Close"
                      >
                        <IconX size={24} stroke={2} />
                      </Button>
                    </div>

                    <div className="relative mx-5 mt-4 h-[180px] overflow-hidden rounded-lg">
                      <Image
                        src="/images/navbar/operating-room.png"
                        alt="Operating Room"
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>

                    <Link
                      href="/specialty-care"
                      onClick={closeMobile}
                      className="mx-5 mt-3 flex items-center gap-2 text-sm font-medium text-hmi-gray-900 underline"
                    >
                      See all specialties
                      <IconArrowRight size={16} stroke={2} />
                    </Link>

                    <div className="mx-5 mt-4 border-t border-hmi-gray-200" />

                    <p className="mx-5 mt-4 text-xs font-semibold tracking-widest text-hmi-gray-500">
                      SPECIALITIES &amp; TREATMENTS
                    </p>

                    <div className="mt-2 flex-1 overflow-y-auto px-5 pb-6">
                      {SPECIALTIES_LIST.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/specialty-care/${s.slug}`}
                          onClick={closeMobile}
                          className="block py-3 text-base text-hmi-gray-900 hover:text-primary"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---- Specialty Care Dropdown ---- */

interface SpecialtyCareDropdownProps {
  readonly href: string
  readonly isActive: boolean
}

function SpecialtyCareDropdown({href, isActive}: SpecialtyCareDropdownProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  // Split specialties into 3 columns
  const colSize = Math.ceil(SPECIALTIES_LIST.length / 3)
  const col1 = SPECIALTIES_LIST.slice(0, colSize)
  const col2 = SPECIALTIES_LIST.slice(colSize, colSize * 2)
  const col3 = SPECIALTIES_LIST.slice(colSize * 2)

  return (
    <div className="static" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Button
        className={`relative cursor-pointer text-sm font-medium leading-none transition-colors ${
          isActive
            ? 'text-primary after:absolute after:bottom-[-24px] after:left-0 after:h-[3px] after:w-full after:bg-primary'
            : open
              ? 'text-primary'
              : 'text-hmi-gray-700 hover:text-primary'
        }`}
      >
        Specialty Care
      </Button>

      {open && (
        <div
          className="absolute inset-x-0 top-full z-50 border-t border-hmi-gray-200 bg-white shadow-lg"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div className="mx-auto flex max-w-[1440px]">
            <div className="flex-1 px-20 py-8">
              <p className="hmi-gradient-text mb-5 text-xs font-semibold tracking-[0.15em]">
                SPECIALTY CARE
              </p>
              <div className="grid grid-cols-3 gap-x-8 gap-y-0.5">
                <div className="flex flex-col">
                  {col1.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/specialty-care/${s.slug}`}
                      className="py-1.5 text-[13px] text-hmi-gray-700 hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col">
                  {col2.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/specialty-care/${s.slug}`}
                      className="py-1.5 text-[13px] text-hmi-gray-700 hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col">
                  {col3.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/specialty-care/${s.slug}`}
                      className="py-1.5 text-[13px] text-hmi-gray-700 hover:text-primary"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-[430px] shrink-0 flex-col bg-[#F9F9F9] px-[60px] py-[72px]">
              <div className="relative h-[157px] overflow-hidden rounded-lg">
                <Image
                  src="/images/specialty-care/doctor-sidebar.png"
                  alt="Medical Specialties"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="mt-3 text-[13px] font-semibold text-primary">Medical Specialties</h4>
              <p className="mt-1 text-[12px] leading-relaxed text-hmi-gray-500">
                Choosing the right type of specialist, depends on your condition. Begin your journey
                by selecting from our 16 specialty types of care.
              </p>
              <Link
                href="/specialty-care"
                className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-hmi-gray-900 hover:text-primary"
              >
                See all specialties
                <IconArrowRight size={14} stroke={2} />
              </Link>
            </div>
          </div>

          <div className="border-t border-hmi-gray-200 bg-hmi-gray-50">
            <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-20 py-3 text-[13px] text-hmi-gray-500">
              <Link href="/news" className="hover:text-primary">
                In the News
              </Link>
              <Link href="/health-tips" className="hover:text-primary">
                Health Tips
              </Link>
              <span className="flex items-center gap-2">
                Download HMI One App
                <span className="text-hmi-gray-300">|</span>
                <Link href="#" className="hover:text-primary">
                  iOS
                </Link>
                <span className="text-hmi-gray-300">|</span>
                <Link href="#" className="hover:text-primary">
                  Android
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
