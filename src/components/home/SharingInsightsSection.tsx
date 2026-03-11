'use client'

import {IconArrowRight} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import Container from '../cores/Container'
import {INSIGHT_CARDS} from '../../helpers/insights'

export default function SharingInsightsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-[#F1F6FF]">
      <Container className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20 lg:py-16">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">Sharing more insights</h2>

        <div className="insights-desktop mt-10 h-100 gap-4">
          {INSIGHT_CARDS.map((card, i) => {
            const isActive = activeIndex === i
            return (
              <Link
                key={card.slug}
                href={`/news-resources/${card.slug}`}
                className="group relative overflow-hidden rounded-2xl"
                style={{
                  flex: isActive ? 2 : 1,
                  transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <div
                    style={{
                      maxHeight: isActive ? 200 : 0,
                      opacity: isActive ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    }}
                  >
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{card.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="insights-mobile mt-8 flex-col gap-3">
          {INSIGHT_CARDS.map((card, i) => {
            const isActive = activeIndex === i
            return (
              <Link
                key={card.slug}
                href={`/news-resources/${card.slug}`}
                className="relative block overflow-hidden rounded-2xl"
                style={{
                  height: isActive ? 350 : 80,
                  transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault()
                    setActiveIndex(i)
                  }
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div
                  className={
                    isActive
                      ? 'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                      : 'absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/20'
                  }
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{card.description}</p>
                </div>
                <div
                  className="absolute inset-0 flex items-center px-5"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: isActive ? 'none' : 'auto',
                  }}
                >
                  <h3 className="text-sm font-bold text-white">{card.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/news-resources"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            View more
            <IconArrowRight size={16} stroke={2} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
