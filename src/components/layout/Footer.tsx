import {IconArrowRight, IconBrandLinkedin, IconMail, IconMapPin, IconWorld} from '@tabler/icons-react'
import Link from 'next/link'
import {
  FOOTER_ABOUT,
  FOOTER_EXPLORE,
  FOOTER_NEWS,
  FOOTER_SERVICES,
  HQ,
} from '../../helpers/constants'
import MobileFooterAccordion from './MobileFooterAccordion'

export default function Footer() {
  return (
    <footer className="bg-hmi-footer">
      <div className="mx-auto hidden max-w-[1440px] gap-8 px-20 pb-10 pt-14 desktop:grid desktop:grid-cols-5">
        <div className="flex flex-col items-start">
          <img
            src="/images/logo/hmi-logo-white.svg"
            alt="HMI Medical"
            width={128}
            height={60}
            className="h-[60px] w-auto"
          />
          <div className="mt-8">
            <p className="text-[13px] text-white/50">Download Healthcare app</p>
            <p className="text-[13px] text-white/50">HMI One</p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="#" aria-label="Download on the App Store">
              <img
                src="/images/badges/app-store.svg"
                alt="Download on the App Store"
                width={128}
                height={40}
                className="h-auto w-32"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img
                src="/images/badges/play-store.svg"
                alt="Get it on Google Play"
                width={128}
                height={40}
                className="h-auto w-32"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-[14px] text-white/50">Explore HMI</h4>
          {FOOTER_EXPLORE.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-[14px] text-white/50">Our Services</h4>
          {FOOTER_SERVICES.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-white hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="mb-1 text-[14px] text-white/50">About Us</h4>
          {FOOTER_ABOUT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <h4 className="mb-1 mt-4 text-[14px] text-white/40">News &amp; Resources</h4>
          {FOOTER_NEWS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[14px] font-bold leading-snug text-white">{HQ.name}</h4>
          <div className="flex items-start gap-2">
            <IconMapPin size={18} stroke={1.5} className="mt-0.5 shrink-0 text-white/60" />
            <p className="text-[13px] leading-relaxed text-white/80">{HQ.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconMail size={18} stroke={1.5} className="shrink-0 text-white/60" />
            <a href={`mailto:${HQ.email}`} className="text-[13px] text-white/80 hover:text-white">
              {HQ.email}
            </a>
          </div>
          <Link
            href="/contact-us"
            className="mt-3 inline-flex w-fit items-center gap-3 rounded-full border border-white/80 px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white hover:text-hmi-footer"
          >
            Contact us
            <IconArrowRight size={18} stroke={2} />
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1440px] items-center justify-between border-t border-white/15 px-20 py-5 desktop:flex">
        <div className="flex items-center gap-2.5 text-[14px] text-white/60">
          <Link href="#" className="flex items-center gap-2 hover:text-white" aria-label="LinkedIn">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30">
              <IconBrandLinkedin size={12} />
            </span>
            <span>Linkedin</span>
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span className="text-white/30">&middot;</span>
          <span className="flex items-center gap-1.5">
            <IconWorld size={16} stroke={1.5} />
            English
          </span>
        </div>
        <p className="text-[14px] text-white/60">
          Copyright &copy; {new Date().getFullYear()} HMI Medical. All Rights Reserved.
        </p>
      </div>

      <div className="px-6 pb-8 pt-10 desktop:hidden">
        <div className="mb-10">
          <img
            src="/images/logo/hmi-logo-white.svg"
            alt="HMI Medical"
            width={119}
            height={58}
            className="h-[58px] w-auto"
          />
        </div>

        <div className="flex flex-col">
          <Link href="/find-a-doctor" className="py-3.5 text-[15px] text-white hover:text-white/80">
            Find a Doctor
          </Link>
          <Link href="/find-a-clinic" className="py-3.5 text-[15px] text-white hover:text-white/80">
            Find a Clinic
          </Link>

          <MobileFooterAccordion title="Explore HMI" links={FOOTER_EXPLORE} />
          <MobileFooterAccordion title="Our Services" links={FOOTER_SERVICES} />
          <MobileFooterAccordion title="About Us" links={FOOTER_ABOUT} />
          <MobileFooterAccordion title="News & Resources" links={FOOTER_NEWS} />
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <h4 className="text-[15px] font-bold leading-snug text-white">{HQ.name}</h4>
          <div className="flex items-start gap-2.5">
            <IconMapPin size={18} stroke={1.5} className="mt-0.5 shrink-0 text-white/60" />
            <p className="text-[14px] leading-relaxed text-white/80">{HQ.address}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <IconMail size={18} stroke={1.5} className="shrink-0 text-white/60" />
            <a href={`mailto:${HQ.email}`} className="text-[14px] text-white/80 hover:text-white">
              {HQ.email}
            </a>
          </div>
          <Link
            href="/contact-us"
            className="mt-3 inline-flex w-fit items-center gap-3 rounded-full border border-white/80 px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white hover:text-hmi-footer"
          >
            Contact us
            <IconArrowRight size={18} stroke={2} />
          </Link>
        </div>

        <div className="mt-10 border-t border-white/15 pt-8">
          <p className="text-center text-[14px] text-white">Download HMI One</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href="#" aria-label="Download on the App Store">
              <img
                src="/images/badges/app-store.svg"
                alt="Download on the App Store"
                width={128}
                height={40}
                className="h-auto w-32"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img
                src="/images/badges/play-store.svg"
                alt="Get it on Google Play"
                width={128}
                height={40}
                className="h-auto w-32"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[13px] leading-relaxed text-white/60">
            Copyright &copy; {new Date().getFullYear()} HMI Medical.
            <br />
            All Rights Reserved.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2.5 text-[14px] text-white/60">
          <Link href="#" className="flex items-center gap-2 hover:text-white" aria-label="LinkedIn">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30">
              <IconBrandLinkedin size={12} />
            </span>
            <span>Linkedin</span>
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <span className="text-white/30">&middot;</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
