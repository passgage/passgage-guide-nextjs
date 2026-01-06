import { NextRequest, NextResponse } from 'next/server';
import { smartSearch } from '@/lib/qdrant/search';
import { SearchRequest, SearchResponse } from '@/lib/faq/types';

/**
 * POST /api/search
 * Search FAQs using vector similarity or fallback to client-side search
 */
export async function POST(request: NextRequest) {
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

    // Perform search
    const { results, method, queryTime } = await smartSearch(
      body.query,
      body.filters,
      body.limit || 10
    );

    // Prepare response
    const response: SearchResponse = {
      results,
      total: results.length,
      queryTime,
    };

    // Add method to response headers for debugging
    const headers = new Headers();
    headers.set('X-Search-Method', method);
    headers.set('X-Query-Time', queryTime.toString());

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Search API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
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
