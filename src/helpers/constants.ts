export interface FooterLink {
  label: string
  href: string
}

export const SITE_NAME = 'HMI Medical'

export const NAV_LINKS = [
  { label: 'Find a Doctor', href: '/find-a-doctor' },
  { label: 'Find a Clinic', href: '/find-a-clinic' },
  { label: 'Our Services', href: '/our-services' },
  { label: 'Specialty Care', href: '/specialty-care' },
  { label: 'Health Screening', href: '/health-screening' },
  { label: 'Medical Travel', href: '/medical-travel' },
]

export const MOBILE_NAV_LINKS = [
  { label: 'Find a Doctor', href: '/find-a-doctor' },
  { label: 'Find a Clinic', href: '/find-a-clinic' },
  { label: 'Centres & Services', href: '/our-services', hasSubmenu: true },
  { label: 'Specialities & Treatments', href: '/specialty-care', hasSubmenu: true },
  { label: 'Health Screening', href: '/health-screening' },
  { label: 'Medical Travel', href: '/medical-travel', hasSubmenu: true },
]

export const MOBILE_SECONDARY_LINKS = [
  { label: 'About Us', href: '/about-us', hasSubmenu: true },
  { label: 'News & Resources', href: '/news-resources', hasSubmenu: true },
  { label: 'Contact Us', href: '/contact-us' },
]

export const CONTACT = {
  address: '12 Farrer Park Station Road, #05-01, Singapore 217565',
  phone: '+65 6322 6333',
  whatsapp: '+65 9655 2101',
  generalEmail: 'info.hmimedicalcentre@hmimedical.com',
  feedbackEmail: 'concierge.hmimedicalcentre@hmimedical.com',
  corporateEmail: 'askus@hmimedical.com.sg',
}

export const SATELLITE_CLINIC = {
  address: '3 Mount Elizabeth, #12-14, Mount Elizabeth Medical Centre, Singapore 228510',
}

export const HQ = {
  name: 'Health Management International Pte Ltd',
  address: '320 Serangoon Road, #18-08 Centrium Square, Singapore 218108',
  email: 'askus@hmimedical.com',
}

export const FOOTER_EXPLORE: FooterLink[] = [
  { label: 'Find a Doctor', href: '/find-a-doctor' },
  { label: 'Find a Clinic', href: '/find-a-clinic' },
  { label: 'Medical Travel', href: '/medical-travel' },
  { label: 'Corporate Healthcare', href: '/corporate-healthcare' },
  { label: 'Healthcare Education', href: '/healthcare-education' },
  { label: 'HMI One', href: '/hmi-one' },
]

export const FOOTER_SERVICES: FooterLink[] = [
  { label: 'Health Screening', href: '/health-screening' },
  { label: 'Medical Specialties', href: '/specialty-care' },
  { label: 'Day Surgery', href: '/day-surgery' },
  { label: 'GP Services', href: '/gp-services' },
  { label: 'Healthier SG', href: '/healthier-sg' },
  { label: 'Radiology', href: '/radiology' },
  { label: 'Vaccination', href: '/vaccination' },
  { label: 'Home Care Services', href: '/home-care-services' },
  { label: 'Aesthetics Treatments', href: '/aesthetics' },
]

export const FOOTER_ABOUT: FooterLink[] = [
  { label: 'About HMI Medical', href: '/about-us' },
  { label: 'Mission & Values', href: '/mission-values' },
  { label: 'Model', href: '/model' },
  { label: 'Governance', href: '/governance' },
  { label: 'Milestones', href: '/milestones' },
  { label: 'Careers', href: '/careers' },
]

export const FOOTER_NEWS: FooterLink[] = [
  { label: 'Latest Events', href: '/events' },
  { label: 'In the News', href: '/news' },
  { label: 'Health Tips', href: '/health-tips' },
]
