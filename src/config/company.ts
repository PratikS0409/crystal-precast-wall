export interface SocialLink {
  name: string;
  href: string;
  placeholderNote: string;
}

export interface WhyChooseUsItem {
  id: string;
  index: string;
  title: string;
  description: string;
  iconName: 'layers' | 'factory' | 'compass' | 'building' | 'sliders';
}

/**
 * CENTRALIZED COMPANY CONFIGURATION
 * -----------------------------------------------------------------------------
 * Single source of truth for brand identity, phones, WhatsApp, Khopoli address,
 * Google Maps URL, social links, and Formspree endpoint.
 */
export const COMPANY = {
  name: 'CRYSTAL PRECAST WALL',
  shortName: 'CRYSTAL PRECAST',
  legalName: 'Crystal Precast Wall',
  logoPath: '/src/assets/images/hero_precast_wall_1794890278689.jpg',
  tagline: 'Engineered Precast Boundary Wall Solutions for Modern India.',
  heroLabel: 'PRECAST CONCRETE SOLUTIONS | INDIA',
  businessDescription:
    'Indian RCC precast concrete boundary wall manufacturing and installation company operating from Mankivalli Village, Khopoli, Maharashtra.',
  address: 'Mankivalli Village, Khopoli, Maharashtra – 410201, India',
  structuredAddress: {
    streetAddress: 'Mankivalli Village',
    addressLocality: 'Khopoli',
    addressRegion: 'Maharashtra',
    postalCode: '410201',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 18.8230151,
    longitude: 73.3209018,
  },
  phones: [
    {
      display: '+91 8237260198',
      href: 'tel:+918237260198',
    },
    {
      display: '+91 9586660198',
      href: 'tel:+919586660198',
    },
  ],
  whatsappNumber: '918237260198',
  whatsappDefaultMessage:
    'Hello Crystal Precast Wall team, I would like to enquire about RCC precast boundary wall manufacturing and installation.',
  googleMapsUrl:
    'https://www.google.com/maps/place/Crystal+Precast+Wall/@18.8230151,73.3209018,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7fd0074e5b51b:0xd4d284eed7652fa4!8m2!3d18.8230151!4d73.3209018!16s%2Fg%2F11ygmgz1pb',
  email: import.meta.env.VITE_COMPANY_EMAIL || '',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
  footerIntro:
    'Manufacturing and installing engineered RCC precast concrete boundary wall systems from our facility in Khopoli, Maharashtra for residential, industrial, commercial, and agricultural sites.',
} as const;

// Update placeholder href values with official social URLs when ready.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: '#contact',
    placeholderNote: 'Placeholder — update URL in src/config/company.ts',
  },
  {
    name: 'Instagram',
    href: '#contact',
    placeholderNote: 'Placeholder — update URL in src/config/company.ts',
  },
  {
    name: 'Facebook',
    href: '#contact',
    placeholderNote: 'Placeholder — update URL in src/config/company.ts',
  },
];

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'precast-solutions',
    index: '01',
    title: 'Precast Concrete Solutions',
    description:
      'Factory-cast RCC panels and vertical posts engineered for consistent dimensional profile and clean perimeter alignment across varied Indian site conditions.',
    iconName: 'layers',
  },
  {
    id: 'manufacturing-installation',
    index: '02',
    title: 'Manufacturing and Installation',
    description:
      'Integrated production in Khopoli paired with coordinated dispatch and site erection, simplifying boundary execution under one accountable team.',
    iconName: 'factory',
  },
  {
    id: 'practical-support',
    index: '03',
    title: 'Practical Project Support',
    description:
      'Clear communication on layout planning, footing preparation, material scheduling, and execution timelines from initial site enquiry to handover.',
    iconName: 'compass',
  },
  {
    id: 'applications',
    index: '04',
    title: 'Residential and Industrial Applications',
    description:
      'Adaptable perimeter configurations suited for industrial estates, warehousing corridors, commercial campuses, residential layouts, and agricultural land.',
    iconName: 'building',
  },
  {
    id: 'custom-enquiries',
    index: '05',
    title: 'Custom Project Enquiries',
    description:
      'Direct project consultations for specific wall heights, corner post arrangements, gate openings, and terrain-specific installation requirements.',
    iconName: 'sliders',
  },
];

export function buildWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || COMPANY.whatsappDefaultMessage);
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${message}`;
}
