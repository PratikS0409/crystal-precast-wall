export interface ManufacturingStage {
  step: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

/**
 * CENTRALIZED MANUFACTURING STAGES DATA
 * -----------------------------------------------------------------------------
 * Add, edit, or reorder the 7 precast concrete wall manufacturing steps here.
 */
export const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    step: '01',
    title: 'Material Preparation',
    description:
      'Carefully graded stone aggregates, clean sand, cement, and water are proportioned to maintain consistent concrete workability and mix uniformity across every production batch.',
    image: '/src/assets/images/mfg_material_prep_1794890283067.jpg',
    alt: 'Graded stone aggregates, sand, and automated batching hoppers at Crystal Precast Wall plant',
  },
  {
    step: '02',
    title: 'Reinforcement Setup',
    description:
      'Steel reinforcement bars and mesh grids are cut, positioned, and secured inside cleaned steel moulds to provide structural tensile support across both panels and vertical posts.',
    image: '/src/assets/images/mfg_reinforcement_1794890283518.jpg',
    alt: 'High-tensile steel reinforcement cages arranged inside steel casting moulds',
  },
  {
    step: '03',
    title: 'Concrete Casting',
    description:
      'Fresh concrete is poured into rigid steel moulds and compacted via mechanical vibration to eliminate trapped air pockets and achieve dense edge formation.',
    image: '/src/assets/images/mfg_casting_1794890284467.jpg',
    alt: 'Fresh concrete pouring and vibro-compaction inside steel precast panel moulds',
  },
  {
    step: '04',
    title: 'Curing Process',
    description:
      'After demoulding, precast panels and RCC columns undergo controlled moisture curing in dedicated bays so the concrete develops steady structural strength.',
    image: '/src/assets/images/mfg_curing_1794890284395.jpg',
    alt: 'Rows of cured grey RCC precast concrete wall panels inside a water-curing bay',
  },
  {
    step: '05',
    title: 'Quality Inspection',
    description:
      'Cured components are visually and dimensionally checked for straightness, groove alignment, chamfered edges, and surface soundness prior to yard stacking.',
    image: '/src/assets/images/mfg_inspection_1794890284356.jpg',
    alt: 'Engineer inspecting dimensional alignment and edge finish of cured RCC precast wall panels',
  },
  {
    step: '06',
    title: 'Transportation',
    description:
      'Panels and vertical posts are stacked on timber bearers and strapped onto flatbed transport vehicles for safe highway dispatch from Khopoli to project sites.',
    image: '/src/assets/images/mfg_transport_1794890286056.jpg',
    alt: 'Precast concrete wall panels and vertical posts strapped onto a flatbed transport truck',
  },
  {
    step: '07',
    title: 'On-Site Installation',
    description:
      'At the project site, foundation pits are excavated and vertical RCC posts are plumbed into concrete footings before horizontal panels are lowered into the side channels.',
    image: '/src/assets/images/mfg_installation_1794890286015.jpg',
    alt: 'Site installation crew lowering an RCC precast wall panel into aligned vertical H-posts',
  },
];
