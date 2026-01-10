/**
 * Category to Guide Page Mapping
 * Maps Cloudflare FAQ Bot categories to specific guide page sections
 */

export interface GuideLink {
  page: string;
  section: string;
  label: string;
}

/**
 * Mapping from FAQ category to guide page sections
 * Categories from Cloudflare FAQ Bot: giriş, geçiş-kontrol, modüller
 */
export const categoryToGuideMapping: Record<string, GuideLink> = {
  // Login issues → iOS Step 3 (Login)
  'giriş': {
    page: '/ios',
    section: '#step3',
    label: 'iOS Kurulumu - Adım 3: Giriş Yapma'
  },

  // Check-in/QR issues → iOS Step 4 (QR Scan)
  'geçiş-kontrol': {
    page: '/ios',
    section: '#step4',
    label: 'iOS Kurulumu - Adım 4: QR Kod Okutma'
  },

  // Modules → General (no specific page)
  'modüller': {
    page: '/',
    section: '',
    label: 'Ana Sayfa'
  }
};

/**
 * Get guide link for a specific FAQ category
 * @param category FAQ category from Cloudflare response
 * @returns Guide link object or null if no mapping exists
 */
export function getGuideLinkForCategory(category: string): GuideLink | null {
  return categoryToGuideMapping[category] || null;
}

/**
 * Format answer text with guide link appended
 * @param answer Original answer text from Cloudflare
 * @param category FAQ category
 * @returns Formatted answer with guide link markdown
 */
export function formatAnswerWithGuideLink(
  answer: string,
  category: string
): string {
  const guideLink = getGuideLinkForCategory(category);

  // If no guide mapping or it's the homepage, return answer as-is
  if (!guideLink || guideLink.page === '/') {
    return answer;
  }

  // Append guide link
  const linkText = `\n\n**Detaylı bilgi için:** ${guideLink.label}`;
  return answer + linkText;
}

/**
 * Get full URL for guide link (page + section)
 * @param category FAQ category
 * @returns Full URL string or null
 */
export function getFullGuideLinkUrl(category: string): string | null {
  const guideLink = getGuideLinkForCategory(category);
  if (!guideLink || guideLink.page === '/') return null;

  return `${guideLink.page}${guideLink.section}`;
}
