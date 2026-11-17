export interface TestimonialItem {
  id: number;
  clientName: string;
  role: string;
  company: string;
  location: string;
  projectType: string;
  quote: string;
  /**
   * Set to false once replaced with verified published client feedback.
   */
  isEditableSample: boolean;
}

/**
 * Editable Client Testimonials Registry
 * -----------------------------------------------------------------------------
 * Update, add, or remove client quotes directly in this array.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    clientName: 'Vikramaditya Deshmukh',
    role: 'Operations Director',
    company: 'Sahyadri Industrial Logistics Park',
    location: 'Khopoli – Khalapur Corridor, Maharashtra',
    projectType: 'Industrial Compound Wall',
    quote:
      'Crystal Precast Wall brought clear coordination from yard dispatch to vertical post alignment on site. Securing our entire warehousing perimeter without brick-masonry clutter kept our civil schedule moving cleanly.',
    isEditableSample: true,
  },
  {
    id: 2,
    clientName: 'Nitinbhai Patel',
    role: 'Managing Partner',
    company: 'Navkar Commercial Estates',
    location: 'Surat – Vadodara Belt, Gujarat',
    projectType: 'Commercial Perimeter System',
    quote:
      'The concrete finish and straight joint lines gave our commercial yard an architectural frontage right away. Their practical approach to foundation layout and panel installation made boundary execution straightforward.',
    isEditableSample: true,
  },
  {
    id: 3,
    clientName: 'Anjali Kulkarni',
    role: 'Development Lead',
    company: 'Greenridge Plotted Homes',
    location: 'Pune Metropolitan Region, Maharashtra',
    projectType: 'Residential Layout Boundary',
    quote:
      'Consistent panel geometry and disciplined site erection allowed us to enclose phased residential plots rapidly. Working with one manufacturing and installation team simplified every site check.',
    isEditableSample: true,
  },
];
