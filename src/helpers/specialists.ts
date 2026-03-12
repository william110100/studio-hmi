export interface SpecialistCard {
  name: string
  slug: string
  description: string
  image: string
}

export const SPECIALIST_CARDS: SpecialistCard[] = [
  {
    name: 'Colon Health',
    slug: 'colorectal',
    description:
      'Maintaining a healthy colon involves balanced nutrition, regular screenings, and lifestyle choices.',
    image: '/images/specialists/colon-health.png',
  },
  {
    name: 'Urology',
    slug: 'urology',
    description:
      'Expert diagnosis and treatment for conditions affecting the ears, nose, throat, and related structures.',
    image: '/images/specialists/urology.png',
  },
  {
    name: 'Skin Health',
    slug: 'skin-health',
    description:
      'Comprehensive care for skin conditions, from acne and eczema to skin cancer screening and cosmetic treatments.',
    image: '/images/specialists/skin-health.png',
  },
  {
    name: 'Dermatology',
    slug: 'dermatology',
    description:
      'Providing care for your skin - the first layer of defense against the outside world.',
    image: '/images/specialists/dermatology.png',
  },
]
