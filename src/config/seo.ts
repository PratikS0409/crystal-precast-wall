import { COMPANY } from './company';

export interface SectionSeoMeta {
  title: string;
  description: string;
  breadcrumbName: string;
}

/**
 * CENTRALIZED SEO CONFIGURATION
 * -----------------------------------------------------------------------------
 * Manage titles, meta descriptions, local keywords, Open Graph defaults,
 * canonical behavior, and Google Search Console verification from one file.
 */
export const SEO_CONFIG = {
  businessName: COMPANY.legalName,
  businessLocation: 'Khopoli, Maharashtra, India',
  siteUrl: import.meta.env.VITE_SITE_URL || '',
  defaultTitle: 'Crystal Precast Wall | RCC Precast Boundary Wall Manufacturer in Maharashtra',
  defaultDescription:
    'Crystal Precast Wall manufactures and installs RCC precast boundary wall panels and vertical support posts from Khopoli, Maharashtra for industrial and residential plots.',
  keywords: [
    'Precast Wall Manufacturer in Maharashtra',
    'RCC Precast Boundary Wall',
    'Precast Compound Wall Manufacturer',
    'RCC Boundary Wall Panels',
    'Precast Wall Installation',
    'Precast Concrete Wall in Khopoli',
    'Precast Wall Manufacturer near Mumbai',
    'Precast Boundary Wall in Maharashtra',
  ],
  defaultOgImage: '/src/assets/images/hero_precast_wall_1794890278689.jpg',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
  googleVerificationCode: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',

  sectionMeta: {
    home: {
      title: 'Crystal Precast Wall | RCC Precast Boundary Wall Manufacturer in Maharashtra',
      description:
        'Engineered RCC precast concrete boundary wall panels and vertical support posts manufactured in Khopoli and installed across Maharashtra.',
      breadcrumbName: 'Home',
    },
    about: {
      title: 'About Crystal Precast Wall | Precast Concrete Wall in Khopoli',
      description:
        'Learn about Crystal Precast Wall, a precast concrete boundary wall manufacturing and installation company based in Mankivalli Village, Khopoli, Maharashtra.',
      breadcrumbName: 'About Us',
    },
    products: {
      title: 'RCC Boundary Wall Panels & Precast Systems | Crystal Precast Wall',
      description:
        'Explore RCC precast boundary wall panels, vertical support posts, compound wall systems, and custom precast concrete solutions.',
      breadcrumbName: 'Products',
    },
    manufacturing: {
      title: 'Precast Wall Manufacturing & Installation Process | Crystal Precast Wall',
      description:
        'See our 7-stage RCC precast manufacturing and on-site installation process from aggregate preparation and steel reinforcement to erection.',
      breadcrumbName: 'Manufacturing',
    },
    'engineering-quality': {
      title: 'Engineering & Quality Process | Crystal Precast Wall Maharashtra',
      description:
        'Controlled concrete proportioning, reinforcement positioning, vibro-compaction, water curing, and dimensional checks before dispatch.',
      breadcrumbName: 'Engineering & Quality',
    },
    projects: {
      title: 'Precast Compound Wall Projects Gallery | Crystal Precast Wall',
      description:
        'Browse industrial, residential, commercial, and agricultural precast compound wall layouts and installations near Mumbai and across Maharashtra.',
      breadcrumbName: 'Our Projects',
    },
    locations: {
      title: 'Project Locations Across India | Precast Wall Manufacturer near Mumbai',
      description:
        'Interactive India map showcasing our Khopoli manufacturing anchor in Maharashtra and regional precast boundary wall locations.',
      breadcrumbName: 'Locations',
    },
    applications: {
      title: 'Industrial & Residential Applications | Crystal Precast Wall',
      description:
        'Precast concrete boundary walls tailored for industrial estates, plotted residential townships, commercial parks, and agricultural properties.',
      breadcrumbName: 'Applications',
    },
    testimonials: {
      title: 'Client Perspectives | Crystal Precast Wall',
      description:
        'Feedback from industrial, commercial, and residential property teams working with Crystal Precast Wall.',
      breadcrumbName: 'Testimonials',
    },
    contact: {
      title: 'Request a Precast Wall Quote | Crystal Precast Wall Khopoli',
      description:
        'Contact Crystal Precast Wall in Khopoli, Maharashtra on +91 8237260198 or +91 9586660198 for RCC boundary wall enquiries and site quotes.',
      breadcrumbName: 'Contact',
    },
  } as Record<string, SectionSeoMeta>,
};
