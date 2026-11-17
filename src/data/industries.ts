export interface EngineeringControl {
  code: string;
  title: string;
  summary: string;
  detail: string;
}

export interface IndustryApplication {
  id: string;
  index: string;
  sector: string;
  headline: string;
  description: string;
  suitability: string[];
  image: string;
  alt: string;
  productSuggestion: string;
}

/**
 * CENTRALIZED ENGINEERING QUALITY & INDUSTRY APPLICATIONS DATA
 */
export const ENGINEERING_CONTROLS: EngineeringControl[] = [
  {
    code: 'EQ-01',
    title: 'Batch Proportioning & Mix Consistency',
    summary: 'Consistent aggregate grading and water-cement control at the Khopoli yard.',
    detail:
      'Every production run follows disciplined proportioning of clean crushed aggregates, sand, and cement to reduce honeycomb voids and preserve uniform concrete density across panels and posts.',
  },
  {
    code: 'EQ-02',
    title: 'Reinforcement Cage Positioning',
    summary: 'Balanced steel cover inside rigid steel moulds prior to pouring.',
    detail:
      'Steel reinforcement bars and mesh grids are spaced accurately inside cleaned steel forms so tensile reinforcement sits protected within the concrete section.',
  },
  {
    code: 'EQ-03',
    title: 'Vibro-Compaction & Mould Accuracy',
    summary: 'Mechanical vibration for crisp chamfers and true groove geometry.',
    detail:
      'High-frequency table compaction expels entrapped air and consolidates concrete cleanly around vertical post slots and panel tongue-and-groove edges.',
  },
  {
    code: 'EQ-04',
    title: 'Controlled Moisture Curing & Pre-Dispatch Checks',
    summary: 'Dedicated curing bays followed by straightness and edge inspection.',
    detail:
      'Demoulded units remain in dedicated water-curing bays before undergoing dimensional, squareness, and visual surface inspection prior to flatbed loading.',
  },
];

export const INDUSTRY_APPLICATIONS: IndustryApplication[] = [
  {
    id: 'industrial',
    index: '01',
    sector: 'Industrial & Logistics',
    headline: 'Factories, Warehouses & MIDC / GIDC Estates',
    description:
      'High-discipline perimeter enclosures designed for manufacturing plants, logistics yards, and utility substations needing fast erection and clean security lines.',
    suitability: [
      'Continuous tall boundary spans',
      'Clean frontage alongside heavy-vehicle roads',
      'Coordinated security gate & cabin tie-ins',
    ],
    image: '/src/assets/images/proj_vadodara_industrial_1794890287908.jpg',
    alt: 'Heavy-duty precast concrete compound wall enclosing an industrial manufacturing complex',
    productSuggestion: 'Industrial Compound Wall',
  },
  {
    id: 'residential',
    index: '02',
    sector: 'Residential Townships',
    headline: 'Plotted Developments & Gated Communities',
    description:
      'Uniform architectural concrete perimeters that define residential layouts, villa plots, and township boundaries without prolonged masonry work on site.',
    suitability: [
      'Phased plot demarcation as layouts expand',
      'Minimal debris near finished internal roads',
      'Smooth surface ready for exterior architectural tones',
    ],
    image: '/src/assets/images/proj_pune_residential_1794890286755.jpg',
    alt: 'Modern precast concrete boundary wall along a residential plotted community',
    productSuggestion: 'Residential Layout Boundary',
  },
  {
    id: 'commercial',
    index: '03',
    sector: 'Commercial & Institutional',
    headline: 'Business Parks, Campuses & Retail Yards',
    description:
      'Crisp geometric boundary systems suited for corporate campuses, educational institutions, automotive yards, and commercial hubs.',
    suitability: [
      'Clean architectural elevation along main roads',
      'Modular bays allowing future gate openings',
      'Consistent alignment across long property lines',
    ],
    image: '/src/assets/images/proj_ahmedabad_commercial_1794890287408.jpg',
    alt: 'Architectural precast concrete perimeter wall surrounding a commercial business park',
    productSuggestion: 'Commercial Complex Enclosure',
  },
  {
    id: 'agricultural',
    index: '04',
    sector: 'Agricultural & Estates',
    headline: 'Farmlands, Orchards & Rural Land Holdings',
    description:
      'Durable RCC post-and-panel boundaries engineered to protect open farmland, vineyards, and rural estates across changing monsoon and summer conditions.',
    suitability: [
      'Long-span rural boundary demarcation',
      'Step-level adaptability on undulating terrain',
      'Low maintenance across seasonal weather shifts',
    ],
    image: '/src/assets/images/proj_nashik_agricultural_1794890286651.jpg',
    alt: 'Precast concrete boundary wall securing an agricultural estate in Maharashtra',
    productSuggestion: 'Agricultural Land Boundary',
  },
];
