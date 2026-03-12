import {IconMail} from '@tabler/icons-react'
import Container from '../cores/Container'
import {CONTACT} from '../../helpers/constants'

export default function CorporateEnquiriesSection() {
  return (
    <Container className="mx-auto max-w-[1440px] px-6 py-12 lg:px-20 lg:py-16">
      <div
        className="rounded-2xl bg-gradient-to-r from-[#0957CB] to-[#00D494] px-8 py-10 md:px-12 md:py-12 lg:px-16"
      >
        <h2 className="text-[24px] font-bold leading-tight text-white md:text-[28px]">
          For corporate
          <br className="md:hidden" />
          {' '}enquiries
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <IconMail size={20} stroke={1.5} className="shrink-0 text-white/80" />
          <a
            href={`mailto:${CONTACT.corporateEmail}`}
            className="text-[15px] text-white/90 hover:text-white hover:underline md:text-[16px]"
          >
            {CONTACT.corporateEmail}
          </a>
        </div>
      </div>
    </Container>
  )
}
