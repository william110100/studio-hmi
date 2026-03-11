'use client'

import {IconArrowRight, IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import Button from '../cores/Button'
import {motion} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import Container from '../cores/Container'
import {SPECIALIST_CARDS, type SpecialistCard} from '../../helpers/specialists'

export default function OurSpecialistsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const overflowRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({view: 0, scroll: 0})

  const maxIndex = Math.max(0, SPECIALIST_CARDS.length - 3)
  const prev = () => setCurrentIndex((i) => (i > 0 ? i - 1 : 0))
  const next = () => setCurrentIndex((i) => (i < maxIndex ? i + 1 : maxIndex))

  useEffect(() => {
    const container = overflowRef.current
    const track = trackRef.current
    if (!container || !track) return
    const update = () => setDims({view: container.clientWidth, scroll: track.scrollWidth})
    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const maxOffset = Math.max(0, dims.scroll - dims.view)
  const offset = currentIndex >= maxIndex ? maxOffset : maxIndex > 0 ? (maxOffset * currentIndex) / maxIndex : 0

  const getScrollAmount = () => {
    const card = scrollRef.current?.querySelector('[data-card]') as HTMLElement | null
    return card ? card.offsetWidth + 16 : 280
  }
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({left: -getScrollAmount(), behavior: 'smooth'})
  }
  const scrollRight = () => {
    scrollRef.current?.scrollBy({left: getScrollAmount(), behavior: 'smooth'})
  }

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="specialists-bg absolute left-0 top-0 z-0 h-[75%] bg-[#F1F6FF]" />

      <Container className="specialists-container relative z-10 py-12 lg:py-16">
        <div className="specialists-header flex flex-col gap-4">
          <div>
            <p className="hmi-gradient-text text-xs font-semibold tracking-widest">
              OUR SPECIALISTS
            </p>
            <h2 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
              Find specialist care <br className="hidden md:block" />
              to your needs
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:max-w-md md:pt-6.5">
            <p className="text-sm leading-relaxed text-hmi-gray-500">
              From heart-care to aging gracefully, HMI Medical has a diverse and experienced group
              of doctors ready to help you in your journey to a healthier tomorrow.
            </p>
            <Link
              href="/find-a-doctor"
              className="inline-flex items-center gap-2 text-sm font-semibold text-hmi-gray-900 hover:text-primary"
            >
              Our network of specialists
              <IconArrowRight size={16} stroke={2} />
            </Link>
          </div>
        </div>

        <div className="relative mt-10 hidden lg:block">
          <div ref={overflowRef} className="overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex gap-6"
              animate={{x: -offset}}
              transition={{type: 'spring', stiffness: 300, damping: 30}}
            >
              {SPECIALIST_CARDS.map((card) => (
                <div key={card.slug} className="w-98 shrink-0">
                  <SpecialistCardItem card={card} />
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            onClick={prev}
            className="absolute -left-5 top-56 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hmi-gray-500 shadow-md transition-colors hover:text-hmi-gray-900"
            aria-label="Previous"
          >
            <IconChevronLeft size={18} stroke={2} />
          </Button>
          <Button
            onClick={next}
            className="absolute -right-5 top-56 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hmi-gray-500 shadow-md transition-colors hover:text-hmi-gray-900"
            aria-label="Next"
          >
            <IconChevronRight size={18} stroke={2} />
          </Button>
        </div>

        <div className="relative mt-8 lg:hidden">
          <div
            ref={scrollRef}
            className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide"
          >
            {SPECIALIST_CARDS.map((card) => (
              <div key={card.slug} className="w-57.5 md:w-98 shrink-0" data-card>
                <SpecialistCardItem card={card} />
              </div>
            ))}
          </div>

          <Button
            onClick={scrollLeft}
            className="absolute -left-1 top-[130px] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hmi-gray-500 shadow-md"
            aria-label="Previous"
          >
            <IconChevronLeft size={16} stroke={2} />
          </Button>
          <Button
            onClick={scrollRight}
            className="absolute -right-1 top-[130px] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-hmi-gray-500 shadow-md"
            aria-label="Next"
          >
            <IconChevronRight size={16} stroke={2} />
          </Button>
        </div>
      </Container>
    </section>
  )
}

interface SpecialistCardItemProps {
  readonly card: SpecialistCard
}

function SpecialistCardItem({card}: SpecialistCardItemProps) {
  return (
    <Link href={`/specialty-care/${card.slug}`} className="group block">
      <div className="relative h-65.75 w-57.5 overflow-hidden rounded-xl md:h-112 md:w-98">
        <Image
          src={card.image}
          alt={card.name}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-hmi-gray-900 group-hover:text-primary">
          {card.name}
        </h3>
        <IconArrowRight size={16} stroke={2} className="text-hmi-gray-400 group-hover:text-primary" />
      </div>
      <p className="mt-1 text-sm leading-relaxed text-hmi-gray-500">{card.description}</p>
    </Link>
  )
}
