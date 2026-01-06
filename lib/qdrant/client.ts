import { QdrantClient } from '@qdrant/js-client-rest';

// Configuration
export const QDRANT_COLLECTION_NAME = 'passgage_faq';
export const VECTOR_SIZE = 1536; // OpenAI text-embedding-3-small dimension

// Initialize Qdrant client
export function getQdrantClient(): QdrantClient {
  if (!process.env.QDRANT_URL) {
    throw new Error('QDRANT_URL environment variable is not set');
  }

  if (!process.env.QDRANT_API_KEY) {
    throw new Error('QDRANT_API_KEY environment variable is not set');
  }

  return new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });
}

/**
 * Create the FAQ collection in Qdrant
 * This should be run once during initial setup
 */
export async function createCollection(): Promise<void> {
  const client = getQdrantClient();

  try {
    // Check if collection already exists
    const collections = await client.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === QDRANT_COLLECTION_NAME
    );

    if (exists) {
      console.log(`Collection "${QDRANT_COLLECTION_NAME}" already exists`);
      return;
    }

    // Create collection with cosine similarity
    await client.createCollection(QDRANT_COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: 'Cosine',
      },
      optimizers_config: {
        default_segment_number: 2,
      },
      replication_factor: 2,
    });

    console.log(`✅ Created collection "${QDRANT_COLLECTION_NAME}"`);
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
}

/**
 * Delete the collection (for development/testing)
 */
export async function deleteCollection(): Promise<void> {
  const client = getQdrantClient();

  try {
    await client.deleteCollection(QDRANT_COLLECTION_NAME);
    console.log(`🗑️  Deleted collection "${QDRANT_COLLECTION_NAME}"`);
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
}

/**
 * Get collection info
 */
export async function getCollectionInfo() {
  const client = getQdrantClient();

  try {
    const info = await client.getCollection(QDRANT_COLLECTION_NAME);
    return info;
  } catch (error) {
    console.error('Error getting collection info:', error);
    throw error;
  }
}
