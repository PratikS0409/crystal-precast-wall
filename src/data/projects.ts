export type ProjectCategory =
  | 'Residential'
  | 'Industrial'
  | 'Agricultural'
  | 'Commercial';

export interface ProjectLocation {
  id: number;
  title: string;
  city: string;
  state: string;
  category: ProjectCategory;
  /** [longitude, latitude] in decimal degrees */
  coordinates: [number, number];
  image: string;
  alt: string;
  description: string;
  scopeSummary: string;
  /**
   * Set to false only for verified, published Crystal Precast Wall installations
   * or the Khopoli headquarters facility. Demo markers remain clearly labeled in the UI.
   */
  isDemo: boolean;
}

/**
 * Editable Project & Location Registry
 * -----------------------------------------------------------------------------
 * Add, edit, or remove project locations directly in this array.
 * Coordinates use [longitude, latitude] and are projected automatically onto
 * the interactive India map.
 */
export const PROJECTS: ProjectLocation[] = [
  {
    id: 1,
    title: 'Khopoli Facility & Industrial Perimeter',
    city: 'Khopoli',
    state: 'Maharashtra',
    category: 'Industrial',
    coordinates: [73.3209, 18.823],
    image: '/src/assets/images/proj_khopoli_industrial_1794890286117.jpg',
    alt: 'RCC precast concrete boundary wall enclosing an industrial facility near Sahyadri hills in Khopoli',
    description:
      'Home base in Mankivalli Village, Khopoli — precast concrete wall manufacturing yard and industrial perimeter showcase.',
    scopeSummary: 'Full RCC H-post and horizontal interlocking panel boundary assembly.',
    isDemo: false,
  },
  {
    id: 2,
    title: 'Plotted Township Perimeter (Demo)',
    city: 'Pune',
    state: 'Maharashtra',
    category: 'Residential',
    coordinates: [73.8567, 18.5204],
    image: '/src/assets/images/proj_pune_residential_1794890286755.jpg',
    alt: 'Sleek grey precast concrete compound wall bordering a plotted residential layout',
    description:
      'Sample residential layout installation illustrating clean architectural boundary lines for plotted townships.',
    scopeSummary: 'Modular precast perimeter panels with aligned vertical support columns.',
    isDemo: true,
  },
  {
    id: 3,
    title: 'Agricultural Estate Boundary (Demo)',
    city: 'Nashik',
    state: 'Maharashtra',
    category: 'Agricultural',
    coordinates: [73.7898, 19.9975],
    image: '/src/assets/images/proj_nashik_agricultural_1794890286651.jpg',
    alt: 'Precast concrete boundary wall along the perimeter of an agricultural farm estate',
    description:
      'Sample agricultural perimeter concept designed for long-span farmland demarcation and weather durability.',
    scopeSummary: 'Long-span RCC post-and-panel boundary system suited for open terrain.',
    isDemo: true,
  },
  {
    id: 4,
    title: 'Commercial Business Park (Demo)',
    city: 'Ahmedabad',
    state: 'Gujarat',
    category: 'Commercial',
    coordinates: [72.5714, 23.0225],
    image: '/src/assets/images/proj_ahmedabad_commercial_1794890287408.jpg',
    alt: 'Architectural precast concrete compound wall around a commercial business complex',
    description:
      'Sample commercial campus boundary demonstration featuring geometric concrete rhythm and clean street frontage.',
    scopeSummary: 'Commercial perimeter enclosure with architectural precast panel finish.',
    isDemo: true,
  },
  {
    id: 5,
    title: 'Industrial Corridor Plant (Demo)',
    city: 'Vadodara',
    state: 'Gujarat',
    category: 'Industrial',
    coordinates: [73.1812, 22.3072],
    image: '/src/assets/images/proj_vadodara_industrial_1794890287908.jpg',
    alt: 'Heavy-duty precast RCC compound wall securing a large industrial plant',
    description:
      'Sample heavy-duty industrial perimeter layout demonstrating continuous tall RCC boundary screening.',
    scopeSummary: 'High-elevation RCC vertical columns and stacked interlocking concrete panels.',
    isDemo: true,
  },
  {
    id: 6,
    title: 'Commercial Logistics Hub (Demo)',
    city: 'Surat',
    state: 'Gujarat',
    category: 'Commercial',
    coordinates: [72.8311, 21.1702],
    image: '/src/assets/images/proj_surat_commercial_1794890287960.jpg',
    alt: 'Tall precast concrete boundary wall along a modern commercial logistics hub',
    description:
      'Sample warehousing and logistics perimeter showing crisp alignment alongside heavy-vehicle service roads.',
    scopeSummary: 'Rapid-erection precast perimeter enclosure for commercial logistics plots.',
    isDemo: true,
  },
];

export const PROJECT_CATEGORIES: Array<'All' | ProjectCategory> = [
  'All',
  'Industrial',
  'Residential',
  'Commercial',
  'Agricultural',
];
