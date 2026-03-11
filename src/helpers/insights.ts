export interface InsightCard {
  title: string
  slug: string
  image: string
  description: string
}

export const INSIGHT_CARDS: InsightCard[] = [
  {
    title: 'HealthierSG for Pioneers',
    slug: 'healthiersg-for-pioneers',
    image: '/images/insights/healthy.png',
    description:
      'Healthy habits and preventive care can help older people to stay active and maintain a good quality of life.',
  },
  {
    title: 'Using MediSave in our Malaysia Hospital',
    slug: 'medisave-malaysia-hospital',
    image: '/images/insights/healthy.png',
    description:
      'Learn how you can utilise your MediSave benefits for medical treatments at our partner hospitals in Malaysia, making quality healthcare more accessible.',
  },
  {
    title: 'HMI Medical as an alternative',
    slug: 'hmi-medical-alternative',
    image: '/images/insights/healthy.png',
    description:
      'Discover how HMI Medical provides accessible and affordable healthcare alternatives, with a comprehensive network of specialists and clinics across Singapore.',
  },
]
