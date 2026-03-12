export interface Specialty {
  name: string
  slug: string
  description: string
}

export const SPECIALTIES_LIST: Specialty[] = [
  {
    name: 'Bariatric Surgery',
    slug: 'bariatric-surgery',
    description: 'Providing weight management surgical solutions for a healthier life.',
  },
  {
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Treating heart diseases, along with cardiovascular risk factors.',
  },
  {
    name: 'Colorectal',
    slug: 'colorectal',
    description: 'Offering minimally-invasive procedures for colorectal issues.',
  },
  {
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Providing treatment for various skin and cosmetic concerns.',
  },
  {
    name: 'Ear, Nose & Throat',
    slug: 'ear-nose-throat',
    description: 'Receive care for ear, nose, throat, head & neck conditions.',
  },
  {
    name: 'Gastroenterology',
    slug: 'gastroenterology',
    description: 'Adept at treating different cases with minimally invasive techniques.',
  },
  {
    name: 'Gynaecology & Obstetrics',
    slug: 'gynaecology-obstetrics',
    description: 'Comprehensive care for women at every stage of life.',
  },
  {
    name: 'Family Medicine',
    slug: 'family-medicine',
    description: 'Providing holistic primary care for the whole family.',
  },
  {
    name: 'Internal Medicine',
    slug: 'internal-medicine',
    description: 'Diagnosing and treating a wide range of adult diseases.',
  },
  {
    name: 'Orthopaedic',
    slug: 'orthopaedic',
    description: 'Treating sports injuries, age-related muscle and bone conditions.',
  },
  {
    name: 'Paediatrics',
    slug: 'paediatrics',
    description: 'Catering to the needs and health of your babies and children.',
  },
  {
    name: 'Renal Medicine',
    slug: 'renal-medicine',
    description: 'Expert care for kidney-related conditions and treatments.',
  },
  {
    name: 'Respiratory & Intensive Care Medicine',
    slug: 'respiratory-intensive-care',
    description: 'Offering medical care relating to the airways and lungs.',
  },
  {
    name: 'Sleep Medicine',
    slug: 'sleep-medicine',
    description: 'Providing care and treatment for a wide spectrum of sleep disorders.',
  },
  {
    name: 'Urology & Male Subfertility',
    slug: 'urology-male-subfertility',
    description: 'Related to kidneys, bladder, prostate requiring specialized attention.',
  },
]

export interface HomepageSpecialty {
  name: string
  slug: string
  description: string
  icon: string
}

export const HOMEPAGE_SPECIALTIES: HomepageSpecialty[] = [
  {
    name: 'Bones, Muscles & Joints',
    slug: 'orthopaedic',
    description: 'Treating sports injuries, age-related muscle and bone conditions.',
    icon: '/images/specialties/bones-muscles-joints.png',
  },
  {
    name: 'Colon Health',
    slug: 'colorectal',
    description: 'Offering minimally-invasive procedures for colorectal issues.',
    icon: '/images/specialties/colon-health.png',
  },
  {
    name: 'Digestive System',
    slug: 'gastroenterology',
    description: 'Adept at treating different cases with minimally invasive techniques.',
    icon: '/images/specialties/digestive-system.png',
  },
  {
    name: 'Ear, Nose & Throat',
    slug: 'ear-nose-throat',
    description: 'Receive care for ear, nose, throat, head & neck conditions.',
    icon: '/images/specialties/ear-nose-throat.png',
  },
  {
    name: 'Endoscopy',
    slug: 'endoscopy',
    description: 'Providing a range of diagnostic and endoscopic procedures.',
    icon: '/images/specialties/endoscopy.png',
  },
  {
    name: 'General Surgery',
    slug: 'bariatric-surgery',
    description: 'Providing minimally-invasive procedures for speedy recovery.',
    icon: '/images/specialties/general-surgery.png',
  },
  {
    name: 'Heart',
    slug: 'cardiology',
    description: 'Treating heart diseases, along with cardiovascular risk factors.',
    icon: '/images/specialties/heart.png',
  },
  {
    name: "Infant & Children's Health",
    slug: 'paediatrics',
    description: 'Catering to the needs and health of your babies and children.',
    icon: '/images/specialties/infant-children.png',
  },
  {
    name: 'Radiology',
    slug: 'radiology',
    description: 'Offering same-day consultations and imaging tests in the same area.',
    icon: '/images/specialties/radiology.png',
  },
  {
    name: 'Respiratory',
    slug: 'respiratory-intensive-care',
    description: 'Offering medical care relating to the airways and lungs.',
    icon: '/images/specialties/respiratory.png',
  },
  {
    name: 'Skin Health',
    slug: 'skin-health',
    description: 'Providing treatment for various skin and cosmetic concerns.',
    icon: '/images/specialties/skin-health.png',
  },
  {
    name: 'Sleep Medicine',
    slug: 'sleep-medicine',
    description: 'Providing care and treatment for a wide spectrum of sleep disorders.',
    icon: '/images/specialties/sleep-medicine.png',
  },
]
