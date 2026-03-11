'use client'

import {IconBrandWhatsapp, IconMapPin, IconPhone} from '@tabler/icons-react'
import {CONTACT, SATELLITE_CLINIC} from '../../helpers/constants'

export default function FindUsSection() {
  return (
    <section className="bg-[#008AD8]">
      <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-2">
        <div className="px-6 py-12 lg:px-20 lg:py-16">
          <p className="text-xs font-semibold tracking-widest text-white/60">FIND US</p>
          <h2 className="mt-3 text-[24px] font-bold text-white md:text-[28px]">
            HMI Medical Centre
          </h2>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <IconMapPin size={18} stroke={1.5} className="mt-0.5 shrink-0 text-white/60" />
              <p className="text-[14px] leading-relaxed text-white/80">{CONTACT.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30">
                <IconPhone size={14} stroke={1.5} className="text-white/60" />
              </span>
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-[14px] text-white/80 hover:text-white"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30">
                <IconBrandWhatsapp size={14} className="text-white/60" />
              </span>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\s|\+/g, '')}`}
                className="text-[14px] text-white/80 hover:text-white"
              >
                {CONTACT.whatsapp}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <p className="text-[14px] text-white">
              <span className="font-semibold">General enquiries:</span>
              <br />
              <a href={`mailto:${CONTACT.generalEmail}`} className="text-white/80 hover:text-white">
                {CONTACT.generalEmail}
              </a>
            </p>
            <p className="text-[14px] text-white">
              <span className="font-semibold">Feedback:</span>
              <br />
              <a
                href={`mailto:${CONTACT.feedbackEmail}`}
                className="text-white/80 hover:text-white"
              >
                {CONTACT.feedbackEmail}
              </a>
            </p>
          </div>

          <div className="mt-8 border-t border-white/20 pt-6">
            <h3 className="text-[18px] font-bold text-white">Satellite Clinic</h3>
            <div className="mt-3 flex items-start gap-3">
              <IconMapPin size={18} stroke={1.5} className="mt-0.5 shrink-0 text-white/60" />
              <p className="text-[14px] leading-relaxed text-white/80">
                {SATELLITE_CLINIC.address}
              </p>
            </div>
          </div>
        </div>

        <div className="pb-8 lg:pb-0">
          <iframe
            src="https://maps.google.com/maps?q=12+Farrer+Park+Station+Road,+Singapore+217565&z=15&output=embed"
            title="HMI Medical Centre Location"
            className="aspect-square w-full lg:aspect-auto lg:h-full lg:min-h-[500px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
