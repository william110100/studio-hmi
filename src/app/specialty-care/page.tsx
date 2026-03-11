'use client'

import {IconArrowRight} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../../components/cores/Container'
import {SPECIALTIES_LIST} from '../../helpers/specialties'

export default function SpecialtyCare() {
  const col1 = SPECIALTIES_LIST.slice(0, 5)
  const col2 = SPECIALTIES_LIST.slice(5, 10)
  const col3 = SPECIALTIES_LIST.slice(10)

  return (
    <Container className="mx-auto max-w-[1440px] px-4 py-10 md:px-10 lg:px-20 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary">SPECIALTY CARE</p>

          <div className="mt-6 hidden gap-x-12 gap-y-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              {col1.map((s) => (
                <Link
                  key={s.slug}
                  href={`/specialty-care/${s.slug}`}
                  className="text-sm text-hmi-gray-700 hover:text-primary"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {col2.map((s) => (
                <Link
                  key={s.slug}
                  href={`/specialty-care/${s.slug}`}
                  className="text-sm text-hmi-gray-700 hover:text-primary"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {col3.map((s) => (
                <Link
                  key={s.slug}
                  href={`/specialty-care/${s.slug}`}
                  className="text-sm text-hmi-gray-700 hover:text-primary"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 md:hidden">
            {SPECIALTIES_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/specialty-care/${s.slug}`}
                className="text-sm text-hmi-gray-700 hover:text-primary"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-xl border border-hmi-gray-200">
            <div className="relative h-[220px]">
              <Image
                src="/images/specialty-care/doctor-sidebar.png"
                alt="Medical Specialist"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <Link
                href="/specialty-care"
                className="text-lg font-semibold text-primary hover:underline"
              >
                Medical Specialties
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-hmi-gray-500">
                Choosing the right type of specialist, depends on your condition. Begin your journey
                by selecting from our {SPECIALTIES_LIST.length} specialty types of care.
              </p>
              <Link
                href="/specialty-care"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-hmi-gray-900 hover:text-primary"
              >
                See all specialties
                <IconArrowRight size={16} stroke={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-hmi-gray-200 pt-6 text-sm text-hmi-gray-500 md:gap-8">
        <Link href="/news" className="hover:text-primary">
          In the News
        </Link>
        <Link href="/health-tips" className="hover:text-primary">
          Health Tips
        </Link>
        <span className="hidden md:inline text-hmi-gray-300">|</span>
        <span className="text-hmi-gray-500">Download HMI One App</span>
        <Link href="#" className="font-medium text-hmi-gray-700 hover:text-primary">
          IOS
        </Link>
        <Link href="#" className="font-medium text-hmi-gray-700 hover:text-primary">
          Android
        </Link>
      </div>
    </Container>
  )
}
