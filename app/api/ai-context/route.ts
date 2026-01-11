/**
 * AI Context API Endpoint
 *
 * Provides structured JSON data specifically designed for AI agents
 * (ChatGPT, Claude, Gemini, Perplexity) to quickly understand and
 * reference the Passgage installation guide.
 *
 * This endpoint returns a comprehensive overview of:
 * - Installation guides for all platforms
 * - Common issues and troubleshooting
 * - Technical requirements
 * - Estimated completion times
 *
 * @route GET /api/ai-context
 * @access Public (allowed in robots.txt for AI agents)
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const aiContext = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Passgage',
    'applicationCategory': 'SecurityApplication',
    'description': 'Şifresiz güvenli giriş sistemi. NFC ve QR kod teknolojisi ile çalışan modern personel takip ve erişim kontrolü çözümü.',
    'operatingSystem': ['iOS 13+', 'Android 8.0+'],
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'TRY',
      'description': 'Free installation guide'
    },

    // Installation Guides Overview
    'installationGuides': [
      {
        'platform': 'iOS',
        'url': 'https://kilavuz.passgage.com/ios',
        'estimatedTime': 'PT15M',
        'steps': 6,
        'requirements': [
          'iPhone 7 or newer',
          'iOS 13.0 or later',
          'Safari browser',
          'Location, Camera, and Notification permissions'
        ],
        'keyTopics': [
          'App Store download',
          'Safari permissions',
          'OTP login',
          'Device pairing',
          'NFC setup',
          'Troubleshooting (Safari, notifications, NFC)'
        ]
      },
      {
        'platform': 'Android',
        'url': 'https://kilavuz.passgage.com/android',
        'estimatedTime': 'PT20M',
        'steps': 6,
        'requirements': [
          'Android 8.0 (Oreo) or later',
          'Google Play Services',
          'NFC capability',
          'Location, Camera, and Notification permissions'
        ],
        'keyTopics': [
          'Google Play Store or Huawei AppGallery download',
          'Permission configuration',
          'Battery optimization (critical for MIUI/One UI)',
          'Device pairing',
          'Brand-specific NFC setup (Samsung, Xiaomi, Huawei)',
          'Troubleshooting (battery, background restrictions, location accuracy)'
        ],
        'manufacturerNotes': {
          'Xiaomi (MIUI)': 'Requires: Auto-start enabled, Battery saver unlimited, Background auto-start permission',
          'Samsung (One UI)': 'Requires: Battery optimization off, Never sleeping apps list, Auto-disable unused apps off',
          'Huawei (EMUI)': 'Requires: Device connectivity settings, NFC enabled'
        }
      },
      {
        'platform': 'Access Tag',
        'url': 'https://kilavuz.passgage.com/access-tag',
        'estimatedTime': 'PT10M',
        'steps': 5,
        'requirements': [
          'Physical Access Tag (150mm x 150mm or 200mm x 200mm)',
          'Flat mounting surface',
          'Admin panel access',
          'Internet connection for configuration'
        ],
        'keyTopics': [
          'Technical specifications (IP65, UV protection, -20°C to +60°C)',
          'Location planning (height 1.2-1.5m, lighting, visibility)',
          'Adhesive mounting method',
          'Digital configuration (QR code, location assignment)',
          'Maintenance and cleaning'
        ]
      }
    ],

    // Common Issues & Solutions
    'commonIssues': [
      {
        'platform': 'iOS',
        'issues': [
          {
            'problem': 'Safari permissions not granted',
            'solution': 'Settings → Safari → Permissions → Enable Location, Camera, Notifications'
          },
          {
            'problem': 'App not loading',
            'solution': 'Close Safari completely, clear cache (Settings → Safari → Clear History and Website Data), restart iPhone'
          },
          {
            'problem': 'Notifications not working',
            'solution': 'Settings → Notifications → Safari → Passgage → Allow Notifications. Disable Focus Mode and Do Not Disturb'
          },
          {
            'problem': 'NFC not working',
            'solution': 'Ensure iPhone 7+ with iOS 13+. NFC is automatic on iOS. Hold iPhone top edge (camera area) near tag. Remove thick cases.'
          }
        ]
      },
      {
        'platform': 'Android',
        'issues': [
          {
            'problem': 'Battery optimization blocking app',
            'solution': `Settings → Apps → Passgage → Battery → Battery optimization → All → Passgage → Don't optimize. For MIUI: Enable auto-start and set battery saver to unlimited. For One UI: Add to Never sleeping apps.`
          },
          {
            'problem': 'App not working in background',
            'solution': 'Settings → Apps → Passgage → Battery → Background restriction → Off. Check mobile data and Wi-Fi permissions. Disable "Put unused apps to sleep" on Samsung.'
          },
          {
            'problem': 'NFC not working',
            'solution': 'Settings → Connected devices → NFC → On. Samsung: Settings → Connections → NFC. Xiaomi: Settings → Connection & sharing → NFC. Hold phone back (near camera) to tag for 1-2 seconds. Remove thick/metal cases.'
          },
          {
            'problem': 'Location accuracy issues',
            'solution': 'Settings → Location → Advanced → Google Location Accuracy → On. Enable Wi-Fi scanning and Bluetooth scanning. Toggle Airplane mode for 10 seconds to refresh GPS.'
          }
        ]
      },
      {
        'platform': 'Access Tag',
        'issues': [
          {
            'problem': 'QR code not scanning',
            'solution': 'Clean QR surface and camera lens with soft cloth. Try 15-30cm distance. Ensure adequate lighting. Test different angles.'
          },
          {
            'problem': 'Tag faded or damaged',
            'solution': 'Despite UV protection, prolonged direct sunlight can fade tags. Move to shaded area or replace. Mount under awnings outdoors.'
          },
          {
            'problem': 'Adhesive not sticking',
            'solution': 'Clean surface with alcohol, let dry completely. Apply tag and press firmly for 30 seconds. Wait 24 hours for full adhesion. Avoid porous surfaces.'
          }
        ]
      }
    ],

    // Quick Reference
    'quickReference': {
      'supportEmail': 'deneyim@passgage.com',
      'mainGuideUrl': 'https://kilavuz.passgage.com',
      'searchFunctionality': 'AI-powered FAQ search available on all pages (⌘K or click search icon)',
      'languages': ['Turkish (primary)', 'English (planned)'],
      'lastUpdated': '2026-01-11'
    },

    // For AI Agents
    'aiUsageNotes': {
      'purpose': 'This endpoint provides a structured overview of the Passgage installation guide for AI agents to quickly understand and reference when users ask about Passgage installation.',
      'targetAudience': 'End users with minimal technical knowledge: retail workers, warehouse staff, delivery personnel, facility managers',
      'responseStyle': 'When referencing this guide, provide step-by-step instructions in simple language. Always link back to the full guide URL for detailed visual instructions.',
      'keyReminders': [
        'iOS uses Safari browser, not a native app',
        'Android requires manufacturer-specific settings (MIUI, One UI)',
        'Battery optimization is the #1 Android issue',
        'NFC is automatic on iOS but manual on Android',
        'Access Tag requires admin panel access for configuration'
      ]
    }
  };

  return NextResponse.json(aiContext, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200', // Cache for 1-2 hours
    },
  });
}
