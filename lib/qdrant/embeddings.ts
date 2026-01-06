import OpenAI from 'openai';
import { FAQEntry } from '../faq/types';

// Initialize OpenAI client
export function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/**
 * Generate embedding for a single text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts (batch processing)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const openai = getOpenAIClient();

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts,
      encoding_format: 'float',
    });

    return response.data.map((item) => item.embedding);
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}

/**
 * Prepare FAQ text for embedding
 * Combines question, answer, and keywords for better semantic search
 */
export function prepareFAQText(faq: FAQEntry): string {
  return `${faq.question}\n\n${faq.answer}\n\nKeywords: ${faq.keywords.join(', ')}`;
}

/**
 * Generate embedding for an FAQ entry
 */
export async function generateFAQEmbedding(faq: FAQEntry): Promise<number[]> {
  const text = prepareFAQText(faq);
  return generateEmbedding(text);
}

/**
 * Generate embeddings for multiple FAQ entries
 */
export async function generateFAQEmbeddings(faqs: FAQEntry[]): Promise<number[][]> {
  const texts = faqs.map(prepareFAQText);
  return generateEmbeddings(texts);
}

/**
 * Calculate cost estimate for generating embeddings
 * text-embedding-3-small costs $0.00002 per 1K tokens
 */
export function estimateEmbeddingCost(texts: string[]): number {
  // Rough estimate: 1 token ≈ 4 characters
  const totalChars = texts.reduce((sum, text) => sum + text.length, 0);
  const totalTokens = totalChars / 4;
  const costPerThousandTokens = 0.00002;
  return (totalTokens / 1000) * costPerThousandTokens;
}
