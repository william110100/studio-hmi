export interface HeroSlide {
  image: string
  label: string
  heading: string
  description: string
  tab: string
}

export const SLIDES: HeroSlide[] = [
  {
    image: '/images/hero/hero-banner-1.png',
    label: 'HMI CELEBRATES SG',
    heading: 'HMI CARES FOR ALL SINGAPOREANS',
    description:
      'The event marks the official launch of HMI Cares, our new community health initiative in honour of SG60.',
    tab: 'HMI Cares for all Singaporeans',
  },
  {
    image: '/images/hero/hero-banner-2.png',
    label: '25 YEARS OF CARE',
    heading: '25 YEARS OF CARING FOR YOU',
    description:
      'For 25 years, HMI Medical has been dedicated to providing quality healthcare to Singaporeans and their families.',
    tab: '25 Years of Care',
  },
  {
    image: '/images/hero/hero-banner-3.png',
    label: 'COMMUNITY OUTREACH',
    heading: 'LEADERSHIP IN HEALTHCARE',
    description:
      'Our team of medical professionals is committed to advancing healthcare excellence in Singapore.',
    tab: 'Community outreach',
  },
]
