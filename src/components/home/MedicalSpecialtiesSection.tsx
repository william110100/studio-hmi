'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import Button from '../cores/Button'
import Container from '../cores/Container'
import {HOMEPAGE_SPECIALTIES, HomepageSpecialty} from '../../helpers/specialties'

const MOBILE_INITIAL_COUNT = 6

export default function MedicalSpecialtiesSection() {
  const [showAll, setShowAll] = useState(false)

  return (
    <Container className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20 lg:py-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-[22px] font-bold leading-tight text-primary md:text-[28px]">
          Medical Specialties
        </h2>
        <p className="max-w-xl text-[14px] leading-relaxed text-hmi-gray-500">
          We prioritise reducing healthcare hassles &ndash; from department transitions to staff
          knowing your name.
        </p>
      </div>

      <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {HOMEPAGE_SPECIALTIES.map((specialty) => (
          <DesktopSpecialtyCard key={specialty.slug} specialty={specialty} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:hidden">
        {HOMEPAGE_SPECIALTIES.slice(
          0,
          showAll ? HOMEPAGE_SPECIALTIES.length : MOBILE_INITIAL_COUNT,
        ).map((specialty) => (
          <MobileSpecialtyCard key={specialty.slug} specialty={specialty} />
        ))}

        {!showAll && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-[13px] text-primary">
              Showing {MOBILE_INITIAL_COUNT} of {HOMEPAGE_SPECIALTIES.length} results
            </p>
            <Button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-hmi-gray-300 px-8 py-2.5 text-[14px] font-medium text-hmi-gray-700 transition-colors hover:border-primary hover:text-primary"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}

interface SpecialtyCardProps {
  readonly specialty: HomepageSpecialty
}

function DesktopSpecialtyCard({specialty}: SpecialtyCardProps) {
  return (
    <Link
      href={`/specialty-care/${specialty.slug}`}
      className="flex items-start gap-4 rounded-2xl border border-hmi-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary-light">
        <Image
          src={specialty.icon}
          alt={specialty.name}
          width={52}
          height={52}
          loading="lazy"
          className="h-13 w-13"
        />
      </div>
      <div className="flex flex-col gap-1 pt-0.5">
        <h3 className="text-[14px] font-semibold leading-snug text-hmi-gray-900">
          {specialty.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-hmi-gray-500">{specialty.description}</p>
      </div>
    </Link>
  )
}

function MobileSpecialtyCard({specialty}: SpecialtyCardProps) {
  return (
    <Link
      href={`/specialty-care/${specialty.slug}`}
      className="flex items-center gap-4 rounded-2xl bg-hmi-gray-50 px-5 py-5 shadow-sm transition-colors hover:bg-hmi-gray-100"
    >
      <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-primary-light">
        <Image
          src={specialty.icon}
          alt={specialty.name}
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[15px] font-semibold leading-snug text-hmi-gray-900">
          {specialty.name}
        </h3>
        <p className="text-[13px] leading-relaxed text-hmi-gray-500">{specialty.description}</p>
      </div>
    </Link>
  )
}
