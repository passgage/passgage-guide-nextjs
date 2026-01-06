import { getQdrantClient, QDRANT_COLLECTION_NAME } from './client';
import { generateEmbedding } from './embeddings';
import { FAQEntry, FAQSearchResult, SearchFilters } from '../faq/types';
import { faqData, getFAQById } from '../faq/faq-data';

/**
 * Search FAQs using vector similarity in Qdrant
 */
export async function searchFAQs(
  query: string,
  filters?: SearchFilters,
  limit: number = 10
): Promise<FAQSearchResult[]> {
  const startTime = Date.now();

  try {
    // Generate embedding for the query
    const queryVector = await generateEmbedding(query);

    // Get Qdrant client
    const client = getQdrantClient();

    // Build filter conditions
    const filterConditions: any[] = [];

    if (filters?.platform) {
      filterConditions.push({
        key: 'platform',
        match: { value: filters.platform },
      });
    }

    if (filters?.category) {
      filterConditions.push({
        key: 'category',
        match: { value: filters.category },
      });
    }

    // Search in Qdrant
    const searchResult = await client.search(QDRANT_COLLECTION_NAME, {
      vector: queryVector,
      limit,
      filter: filterConditions.length > 0 ? { must: filterConditions } : undefined,
      with_payload: true,
      score_threshold: filters?.minScore || 0.7, // Only return results with score >= 0.7
    });

    // Convert to FAQSearchResult
    const results: FAQSearchResult[] = searchResult.map((result) => {
      const faqId = result.payload?.id as string;
      const faq = getFAQById(faqId);

      if (!faq) {
        throw new Error(`FAQ with id ${faqId} not found in local data`);
      }

      return {
        ...faq,
        score: result.score,
      };
    });

    const queryTime = Date.now() - startTime;
    console.log(`Search completed in ${queryTime}ms, found ${results.length} results`);

    return results;
  } catch (error) {
    console.error('Error searching FAQs:', error);
    throw error;
  }
}

/**
 * Fallback client-side search (when Qdrant is unavailable)
 * Uses simple keyword matching
 */
export function searchFAQsClientSide(
  query: string,
  filters?: SearchFilters,
  limit: number = 10
): FAQSearchResult[] {
  const lowerQuery = query.toLowerCase();

  let results = faqData.filter((faq) => {
    // Apply platform filter
    if (filters?.platform && faq.platform !== filters.platform) {
      return false;
    }

    // Apply category filter
    if (filters?.category && faq.category !== filters.category) {
      return false;
    }

    // Keyword matching
    const questionMatch = faq.question.toLowerCase().includes(lowerQuery);
    const answerMatch = faq.answer.toLowerCase().includes(lowerQuery);
    const keywordMatch = faq.keywords.some((keyword) =>
      keyword.toLowerCase().includes(lowerQuery)
    );

    return questionMatch || answerMatch || keywordMatch;
  });

  // Calculate simple relevance score
  const scoredResults: FAQSearchResult[] = results.map((faq) => {
    let score = 0;

    // Question match (highest priority)
    if (faq.question.toLowerCase().includes(lowerQuery)) {
      score += 1.0;
    }

    // Keyword match (medium priority)
    const matchingKeywords = faq.keywords.filter((keyword) =>
      keyword.toLowerCase().includes(lowerQuery)
    );
    score += matchingKeywords.length * 0.5;

    // Answer match (lower priority)
    if (faq.answer.toLowerCase().includes(lowerQuery)) {
      score += 0.3;
    }

    return { ...faq, score };
  });

  // Sort by score and limit
  return scoredResults
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((result) => result.score >= (filters?.minScore || 0.1));
}

/**
 * Smart search that tries Qdrant first, falls back to client-side
 */
export async function smartSearch(
  query: string,
  filters?: SearchFilters,
  limit: number = 10
): Promise<{
  results: FAQSearchResult[];
  method: 'vector' | 'fallback';
  queryTime: number;
}> {
  const startTime = Date.now();

  try {
    const results = await searchFAQs(query, filters, limit);
    return {
      results,
      method: 'vector',
      queryTime: Date.now() - startTime,
    };
  } catch (error) {
    console.warn('Vector search failed, using fallback:', error);
    const results = searchFAQsClientSide(query, filters, limit);
    return {
      results,
      method: 'fallback',
      queryTime: Date.now() - startTime,
    };
  }
}
