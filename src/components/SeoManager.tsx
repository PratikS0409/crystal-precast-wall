import { useEffect } from 'react';
import { COMPANY } from '../config/company';
import { SEO_CONFIG } from '../config/seo';

interface SeoManagerProps {
  activeSection?: string;
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (!content) return;
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  if (!href) return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function SeoManager({ activeSection = 'home' }: SeoManagerProps) {
  useEffect(() => {
    const sectionMeta = SEO_CONFIG.sectionMeta[activeSection] || SEO_CONFIG.sectionMeta.home;
    const title = sectionMeta?.title || SEO_CONFIG.defaultTitle;
    const description = sectionMeta?.description || SEO_CONFIG.defaultDescription;

    const origin =
      SEO_CONFIG.siteUrl.trim().replace(/\/$/, '') ||
      (typeof window !== 'undefined' ? window.location.origin : '');
    const canonicalUrl = origin
      ? activeSection === 'home'
        ? `${origin}/`
        : `${origin}/#${activeSection}`
      : '';
    const ogImageUrl = origin
      ? `${origin}${SEO_CONFIG.defaultOgImage}`
      : SEO_CONFIG.defaultOgImage;

    document.title = title;

    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'keywords', SEO_CONFIG.keywords.join(', '));
    upsertMetaTag('name', 'robots', SEO_CONFIG.robots);

    if (SEO_CONFIG.googleVerificationCode.trim()) {
      upsertMetaTag(
        'name',
        'google-site-verification',
        SEO_CONFIG.googleVerificationCode.trim()
      );
    }

    if (canonicalUrl) {
      upsertCanonical(canonicalUrl);
      upsertMetaTag('property', 'og:url', canonicalUrl);
    }

    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', COMPANY.legalName);
    upsertMetaTag('property', 'og:locale', 'en_IN');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', ogImageUrl);

    upsertMetaTag('name', 'twitter:card', SEO_CONFIG.twitterCard);
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', ogImageUrl);

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: origin ? `${origin}/` : '#home',
      },
      ...(activeSection !== 'home' && sectionMeta
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: sectionMeta.breadcrumbName,
              item: origin ? `${origin}/#${activeSection}` : `#${activeSection}`,
            },
          ]
        : []),
    ];

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': origin ? `${origin}/#localbusiness` : '#localbusiness',
          name: COMPANY.legalName,
          description: COMPANY.businessDescription,
          url: origin ? `${origin}/` : undefined,
          image: ogImageUrl,
          telephone: COMPANY.phones.map((p) => p.display),
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY.structuredAddress.streetAddress,
            addressLocality: COMPANY.structuredAddress.addressLocality,
            addressRegion: COMPANY.structuredAddress.addressRegion,
            postalCode: COMPANY.structuredAddress.postalCode,
            addressCountry: COMPANY.structuredAddress.addressCountry,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: COMPANY.geo.latitude,
            longitude: COMPANY.geo.longitude,
          },
          hasMap: COMPANY.googleMapsUrl,
          areaServed: [
            { '@type': 'AdministrativeArea', name: 'Maharashtra' },
            { '@type': 'AdministrativeArea', name: 'Gujarat' },
            { '@type': 'Country', name: 'India' },
          ],
        },
        {
          '@type': 'Organization',
          '@id': origin ? `${origin}/#organization` : '#organization',
          name: COMPANY.legalName,
          url: origin ? `${origin}/` : undefined,
          logo: ogImageUrl,
          contactPoint: COMPANY.phones.map((phone) => ({
            '@type': 'ContactPoint',
            telephone: phone.display,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Marathi'],
          })),
        },
        {
          '@type': 'WebSite',
          '@id': origin ? `${origin}/#website` : '#website',
          name: COMPANY.legalName,
          url: origin ? `${origin}/` : undefined,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': origin ? `${origin}/#breadcrumb` : '#breadcrumb',
          itemListElement: breadcrumbItems,
        },
      ],
    };

    const scriptId = 'crystal-precast-jsonld';
    let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = scriptId;
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }, [activeSection]);

  return null;
}
