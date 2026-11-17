export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/**
 * CENTRALIZED NAVIGATION DATA
 * -----------------------------------------------------------------------------
 * Edit primary header and footer navigation items from one place.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'manufacturing', label: 'Manufacturing', href: '#manufacturing' },
  { id: 'projects', label: 'Our Projects', href: '#projects' },
  { id: 'locations', label: 'Locations', href: '#locations' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
