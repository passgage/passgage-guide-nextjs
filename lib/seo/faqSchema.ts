/**
 * SEO Utility: FAQ Schema Generator
 *
 * Converts AccordionItem components to Schema.org FAQPage JSON-LD format
 * for optimal Google rich snippet support and AI agent indexing.
 *
 * @see https://schema.org/FAQPage
 */

import type { AccordionItem } from '@/components/guide';
import { ReactElement, ReactNode } from 'react';

/**
 * Extracts plain text from React JSX elements
 * Handles nested elements, strings, and arrays
 */
function extractTextFromJSX(node: ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }

  if (typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromJSX).join(' ');
  }

  if (!node || typeof node === 'boolean') {
    return '';
  }

  // Handle React elements
  if (typeof node === 'object' && 'props' in node) {
    const element = node as ReactElement;

    // Extract text from children
    if (element.props && element.props.children) {
      return extractTextFromJSX(element.props.children);
    }
  }

  return '';
}

/**
 * Generates FAQPage Schema from Accordion items
 *
 * @param items - Array of AccordionItem objects
 * @param baseUrl - Base URL for the page (e.g., 'https://kilavuz.passgage.com')
 * @param pageUrl - Full page URL (e.g., 'https://kilavuz.passgage.com/ios')
 * @returns Schema.org FAQPage JSON-LD object
 *
 * @example
 * const schema = generateFAQSchema(
 *   troubleshootingItems,
 *   'https://kilavuz.passgage.com',
 *   'https://kilavuz.passgage.com/ios'
 * );
 */
export function generateFAQSchema(
  items: AccordionItem[],
  baseUrl: string,
  pageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': typeof item.answer === 'string'
          ? item.answer
          : extractTextFromJSX(item.answer)
      }
    }))
  };
}

/**
 * Generates a combined FAQPage Schema from multiple accordion sections
 * Useful for pages with multiple FAQ sections (e.g., iOS guide with general + NFC FAQs)
 *
 * @param sections - Array of accordion item arrays
 * @param baseUrl - Base URL for the page
 * @param pageUrl - Full page URL
 * @returns Combined Schema.org FAQPage JSON-LD object
 *
 * @example
 * const schema = generateCombinedFAQSchema(
 *   [generalTroubleshootingItems, nfcTroubleshootingItems],
 *   'https://kilavuz.passgage.com',
 *   'https://kilavuz.passgage.com/ios'
 * );
 */
export function generateCombinedFAQSchema(
  sections: AccordionItem[][],
  baseUrl: string,
  pageUrl: string
) {
  const allItems = sections.flat();
  return generateFAQSchema(allItems, baseUrl, pageUrl);
}
