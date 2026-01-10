import { NextRequest, NextResponse } from 'next/server';
import { SearchRequest, SearchResponse, FAQSearchResult } from '@/lib/faq/types';
import { getFullGuideLinkUrl } from '@/lib/faq/categoryMapping';

// Cloudflare FAQ Bot API configuration
const CLOUDFLARE_FAQ_API_URL = process.env.CLOUDFLARE_FAQ_API_URL;
const CLOUDFLARE_FAQ_API_KEY = process.env.CLOUDFLARE_FAQ_API_KEY;

/**
 * Cloudflare FAQ Bot API Response Interface
 */
interface CloudflareAskResponse {
  success: boolean;
  answer?: string;
  confidence?: number;
  matchedQuestion?: string;
  category?: string;
  suggestions?: Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  message?: string;
}

/**
 * POST /api/search
 * Search FAQs using Cloudflare Workers AI + Vectorize
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body: SearchRequest = await request.json();

    // Validate request
    if (!body.query || typeof body.query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    if (body.query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Check if Cloudflare API is configured
    if (!CLOUDFLARE_FAQ_API_URL) {
      return NextResponse.json(
        {
          error: 'Configuration error',
          message: 'Cloudflare FAQ API URL is not configured',
        },
        { status: 500 }
      );
    }

    // Call Cloudflare Workers FAQ Bot API
    const cloudflareResponse = await fetch(CLOUDFLARE_FAQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CLOUDFLARE_FAQ_API_KEY && { 'X-API-Key': CLOUDFLARE_FAQ_API_KEY }),
      },
      body: JSON.stringify({ question: body.query }),
    });

    if (!cloudflareResponse.ok) {
      throw new Error(`Cloudflare API error: ${cloudflareResponse.status}`);
    }

    const data: CloudflareAskResponse = await cloudflareResponse.json();

    // Handle unsuccessful response
    if (!data.success || !data.answer) {
      return NextResponse.json({
        results: [],
        total: 0,
        queryTime: Date.now() - startTime,
        fallback: true,
        message: data.message || 'Cevap bulunamadı',
      });
    }

    // Convert Cloudflare response to our FAQ result format
    const category = data.category || 'general';
    const guideLink = getFullGuideLinkUrl(category);

    const result: FAQSearchResult = {
      id: `cloudflare-${Date.now()}`,
      platform: 'general',
      category: category as any, // Cloudflare uses different categories
      question: data.matchedQuestion || body.query,
      answer: data.answer,
      keywords: [],
      pageUrl: guideLink || '/',
      metadata: {
        importance: data.confidence && data.confidence > 0.8 ? 'high' : 'medium',
        lastUpdated: new Date().toISOString(),
      },
      score: data.confidence || 0,
      guideLink: guideLink || undefined,
    };

    // Add suggestions as additional results if available
    const allResults: FAQSearchResult[] = [result];
    if (data.suggestions && data.suggestions.length > 0) {
      data.suggestions.forEach((suggestion, index) => {
        const suggestionGuideLink = getFullGuideLinkUrl(suggestion.category);
        allResults.push({
          id: `cloudflare-suggestion-${index}`,
          platform: 'general',
          category: suggestion.category as any,
          question: suggestion.question,
          answer: suggestion.answer,
          keywords: [],
          pageUrl: suggestionGuideLink || '/',
          metadata: {
            importance: 'low',
            lastUpdated: new Date().toISOString(),
          },
          score: 0.5 - (index * 0.1), // Decreasing scores for suggestions
          guideLink: suggestionGuideLink || undefined,
        });
      });
    }

    // Prepare response
    const response: SearchResponse = {
      results: allResults,
      total: allResults.length,
      queryTime: Date.now() - startTime,
    };

    // Add method to response headers for debugging
    const headers = new Headers();
    headers.set('X-Search-Method', 'cloudflare-vectorize');
    headers.set('X-Query-Time', response.queryTime.toString());

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Search API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        results: [],
        total: 0,
        queryTime: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'FAQ Search API is running',
    endpoints: {
      search: 'POST /api/search',
    },
  });
}
