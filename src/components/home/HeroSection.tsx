'use client'

import {IconArrowRight, IconChevronLeft, IconChevronRight} from '@tabler/icons-react'
import Button from '../cores/Button'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {useCallback, useEffect, useState} from 'react'
import {SLIDES} from '../../helpers/hero'

const AUTO_PLAY_MS = 5000

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: '0%',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
  }),
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  useEffect(() => {
    const id = setInterval(next, AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [current, next])

  const slide = SLIDES[current]

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative hidden h-[75vh] max-h-192 overflow-hidden lg:block">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.6, ease: [0.45, 0, 0.55, 1]}}
            className="absolute inset-0"
          >
            <Image src={slide.image} alt={slide.heading} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-20">
              <div className="max-w-xl">
                <p className="text-xs font-semibold tracking-widest text-white/80">{slide.label}</p>
                <h1 className="mt-3 text-[42px] font-bold leading-tight text-white">
                  {slide.heading}
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                  {slide.description}
                </p>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-hmi-gray-900 transition-colors hover:bg-hmi-gray-100"
                >
                  Find out more
                  <IconArrowRight size={16} stroke={2} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-20 flex bg-black/30 backdrop-blur-sm">
          {SLIDES.map((s, i) => (
            <Button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-1 py-3.5 text-center text-[14px] transition-colors ${
                i === current
                  ? 'border-b-[3px] border-white font-medium text-white'
                  : 'border-b border-white/20 text-white/50 hover:text-white/80'
              }`}
            >
              {s.tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative h-[70vh] max-h-180 overflow-hidden lg:hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.6, ease: [0.45, 0, 0.55, 1]}}
            className="absolute inset-0"
          >
            <Image src={slide.image} alt={slide.heading} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-14">
              <p className="text-xs font-semibold tracking-widest text-white/80">{slide.label}</p>
              <h1 className="mt-3 text-[28px] font-bold leading-tight text-white">
                {slide.heading}
              </h1>
              <Link
                href="#"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-hmi-gray-900"
              >
                Find out more
                <IconArrowRight size={16} stroke={2} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <Button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Previous slide"
        >
          <IconChevronLeft size={18} stroke={2} className="text-white" />
        </Button>
        <Button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/40"
          aria-label="Next slide"
        >
          <IconChevronRight size={18} stroke={2} className="text-white" />
        </Button>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <Button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
