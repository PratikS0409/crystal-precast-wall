export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  index: string;
  categoryLabel: string;
  title: string;
  shortDescription: string;
  detailedOverview: string;
  specifications: ProductSpecification[];
  benefits: string[];
  useCaseExamples: string[];
  applications: string[];
  structuralHighlights: string[];
  image: string;
  alt: string;
}

/**
 * CENTRALIZED PRODUCTS DATA
 * -----------------------------------------------------------------------------
 * Add, edit, or remove RCC precast boundary wall products here.
 */
export const PRODUCTS: ProductItem[] = [
  {
    id: 'rcc-panels',
    index: '01',
    categoryLabel: 'Core Panel Element',
    title: 'RCC Precast Boundary Wall Panels',
    shortDescription:
      'Reinforced concrete horizontal planks engineered for modular interlocking and uniform architectural surface quality.',
    detailedOverview:
      'Manufactured in controlled steel moulds with reinforced concrete, our precast boundary wall panels interlock cleanly inside vertical support grooves to form continuous, rigid perimeter spans without the mess or delays of brick masonry.',
    specifications: [
      { label: 'Construction Type', value: 'Factory-cast RCC modular plank' },
      { label: 'Edge Profile', value: 'Chamfered joints with interlocking seat' },
      { label: 'Reinforcement', value: 'Embedded steel bar & wire mesh grid' },
      { label: 'Surface Finish', value: 'Dense steel-mould architectural grey' },
    ],
    benefits: [
      'Consistent dimensional profile across long boundary perimeters',
      'Clean modular installation with minimal on-site mortar waste',
      'Individual panels can be unslotted and reused if plot layouts change',
      'Raw concrete face suits both exposed industrial look and exterior coatings',
    ],
    useCaseExamples: [
      'Industrial warehouse perimeter walls requiring uniform security lines',
      'Plotted residential layouts demarcating Phase I and Phase II parcels',
      'Commercial yards seeking clean street-facing concrete elevation',
    ],
    applications: [
      'Industrial & logistics perimeter enclosures',
      'Plotted residential townships & housing layouts',
      'Commercial complexes & institutional campuses',
      'Agricultural estates & farm boundary demarcation',
    ],
    structuralHighlights: [
      'Controlled factory casting for uniform panel thickness and clean bevelled edges',
      'Modular horizontal stacking designed for straightforward replacement or extension',
      'Smooth formwork finish ready for raw architectural concrete look or exterior coatings',
    ],
    image: '/src/assets/images/product_wall_panels_1794890280248.jpg',
    alt: 'Close-up of interlocking RCC precast concrete boundary wall panels with chamfered edges',
  },
  {
    id: 'vertical-posts',
    index: '02',
    categoryLabel: 'Structural Column',
    title: 'RCC Vertical Support Posts',
    shortDescription:
      'Heavy-duty H-profile vertical RCC columns with precision side channels that anchor precast wall panels firmly into site footings.',
    detailedOverview:
      'Designed as the structural backbone of every compound wall span, our vertical RCC posts feature dedicated longitudinal grooves that lock adjacent horizontal panels into steady alignment across straight runs, corners, and elevation steps.',
    specifications: [
      { label: 'Column Geometry', value: 'H-section / grooved vertical RCC post' },
      { label: 'Channel Design', value: 'Dual-side longitudinal panel slots' },
      { label: 'Junction Support', value: 'Inline, L-corner & T-junction ready' },
      { label: 'Foundation Method', value: 'Set into excavated PCC/RCC site footings' },
    ],
    benefits: [
      'Holds stacked horizontal panels securely without lateral shifting',
      'Enables step-down transitions smoothly along sloped Indian terrain',
      'Replaces slow column shuttering and curing cycles on site',
      'Uniform vertical rhythm enhances visual authority along road frontages',
    ],
    useCaseExamples: [
      'Sloped hillside industrial plots requiring stepped perimeter levels',
      'Corner and gate-abutment transitions on large commercial compounds',
      'Long-span highway frontage fencing needing steady lateral stability',
    ],
    applications: [
      'Straight boundary spans and modular bays',
      'Corner junctions and L-turn transitions',
      'T-junction internal plot dividers',
      'Step-level transitions across sloped terrain',
    ],
    structuralHighlights: [
      'Precision-formed side channels for secure panel seating',
      'Reinforced steel cage core suited for long-term vertical load support',
      'Adaptable embedment depth aligned with site soil and footing requirements',
    ],
    image: '/src/assets/images/product_support_posts_1794890281044.jpg',
    alt: 'Aligned heavy-duty vertical RCC precast concrete H-posts with recessed panel grooves',
  },
  {
    id: 'compound-systems',
    index: '03',
    categoryLabel: 'Turnkey Assembly',
    title: 'Precast Compound Wall Systems',
    shortDescription:
      'Complete end-to-end boundary wall assemblies integrating vertical RCC columns, interlocking panels, and coordinated site installation.',
    detailedOverview:
      'Our integrated compound wall system combines matched vertical posts and horizontal precast panels into a unified perimeter package delivered from our Khopoli yard and installed on site by experienced erection teams.',
    specifications: [
      { label: 'System Scope', value: 'Matched posts, panels & site erection' },
      { label: 'Height Options', value: 'Configured to project privacy & security brief' },
      { label: 'Execution Model', value: 'Yard manufacturing + coordinated site crew' },
      { label: 'Site Readiness', value: 'Rapid dry-bay panel lowering into set posts' },
    ],
    benefits: [
      'Single-source accountability from concrete casting to boundary handover',
      'Faster perimeter completion compared to conventional brick-and-plaster walls',
      'Clean site housekeeping with reduced raw material storage on your plot',
      'Consistent architectural finish along the entire property line',
    ],
    useCaseExamples: [
      'New manufacturing units securing boundaries ahead of plant machinery arrival',
      'Residential townships establishing immediate entrance and perimeter definition',
      'Institutional & school campuses enclosing multi-acre grounds cleanly',
    ],
    applications: [
      'Factory & warehouse compound security',
      'Commercial parks & retail yards',
      'Gated residential developments',
      'Highway-facing plot demarcation',
    ],
    structuralHighlights: [
      'Coordinated supply of matched posts and panels from a single facility',
      'Significantly reduced site clutter compared to cast-in-situ brick masonry',
      'Consistent architectural rhythm across long linear perimeters',
    ],
    image: '/src/assets/images/product_compound_system_1794890281697.jpg',
    alt: 'Complete installed RCC precast concrete compound wall enclosing a commercial estate',
  },
  {
    id: 'custom-precast',
    index: '04',
    categoryLabel: 'Bespoke Enclosures',
    title: 'Custom Precast Concrete Solutions',
    shortDescription:
      'Project-specific boundary configurations tailored for elevated perimeter heights, gate transitions, and site-specific architectural needs.',
    detailedOverview:
      'For developments requiring bespoke elevation profiles, architectural coping, or coordinated gate interfaces, we work directly with project engineers and owners to plan custom precast boundary configurations.',
    specifications: [
      { label: 'Configuration', value: 'Tailored to site drawings & boundary length' },
      { label: 'Elevation Style', value: 'Standard, elevated, or stepped terrain bays' },
      { label: 'Architectural Detail', value: 'Optional coping lines & relief accents' },
      { label: 'Logistics Planning', value: 'Phased dispatch aligned to site readiness' },
    ],
    benefits: [
      'Adapts to irregular plot geometry, utility crossings, and gate openings',
      'Maintains unified architectural language across frontages and rear boundaries',
      'Direct planning consultation prior to production scheduling',
      'Scalable dispatch for phased industrial or township expansion',
    ],
    useCaseExamples: [
      'Signature business park frontages pairing clean concrete relief with security gates',
      'Elevated industrial screening walls adjacent to residential zones',
      'Contoured hillside estates along the Mumbai–Pune corridor',
    ],
    applications: [
      'Elevated perimeter screening for industrial facilities',
      'Architectural relief walls for signature developments',
      'Gate abutment & security cabin perimeter tie-ins',
      'Stepped boundary layouts on contoured plots',
    ],
    structuralHighlights: [
      'Direct consultation aligned with site drawings and boundary lengths',
      'Adaptable height configurations and panel arrangements',
      'Coordinated logistics and phased installation scheduling',
    ],
    image: '/src/assets/images/product_custom_precast_1794890282538.jpg',
    alt: 'Custom-engineered precast concrete perimeter wall with architectural relief grooves and coping',
  },
];
