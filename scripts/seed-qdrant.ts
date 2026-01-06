/**
 * Seed Qdrant with FAQ embeddings
 *
 * This script:
 * 1. Creates the Qdrant collection if it doesn't exist
 * 2. Generates embeddings for all FAQ entries using OpenAI
 * 3. Uploads embeddings and payloads to Qdrant
 *
 * Usage:
 *   npm run seed-qdrant
 *
 * Requirements:
 *   - QDRANT_URL environment variable
 *   - QDRANT_API_KEY environment variable
 *   - OPENAI_API_KEY environment variable
 */

import dotenv from 'dotenv';
import { getQdrantClient, createCollection, QDRANT_COLLECTION_NAME } from '../lib/qdrant/client';
import { generateFAQEmbeddings, prepareFAQText, estimateEmbeddingCost } from '../lib/qdrant/embeddings';
import { faqData, faqStats } from '../lib/faq/faq-data';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seed() {
  console.log('🌱 Starting Qdrant seeding process...\n');

  try {
    // Validate environment variables
    if (!process.env.QDRANT_URL) {
      throw new Error('QDRANT_URL environment variable is not set');
    }
    if (!process.env.QDRANT_API_KEY) {
      throw new Error('QDRANT_API_KEY environment variable is not set');
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    console.log('✅ Environment variables validated');
    console.log(`   Qdrant URL: ${process.env.QDRANT_URL}`);
    console.log('');

    // Step 1: Create collection
    console.log('📦 Step 1: Creating Qdrant collection...');
    await createCollection();
    console.log('');

    // Step 2: Prepare FAQ data
    console.log('📝 Step 2: Preparing FAQ data...');
    console.log(`   Total FAQs: ${faqStats.total}`);
    console.log(`   - iOS: ${faqStats.ios}`);
    console.log(`   - Android: ${faqStats.android}`);
    console.log(`   - Access Tag: ${faqStats.accessTag}`);
    console.log('');

    // Estimate cost
    const texts = faqData.map(prepareFAQText);
    const estimatedCost = estimateEmbeddingCost(texts);
    console.log(`💰 Estimated OpenAI cost: $${estimatedCost.toFixed(4)}`);
    console.log('');

    // Step 3: Generate embeddings
    console.log('🧠 Step 3: Generating embeddings with OpenAI...');
    const startTime = Date.now();
    const embeddings = await generateFAQEmbeddings(faqData);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Generated ${embeddings.length} embeddings in ${duration}s`);
    console.log('');

    // Step 4: Prepare points for Qdrant
    console.log('📌 Step 4: Preparing Qdrant points...');
    const points = faqData.map((faq, index) => ({
      id: index + 1,
      vector: embeddings[index],
      payload: {
        id: faq.id,
        platform: faq.platform,
        category: faq.category,
        question: faq.question,
        keywords: faq.keywords,
        importance: faq.metadata.importance,
        lastUpdated: faq.metadata.lastUpdated,
      },
    }));
    console.log(`✅ Prepared ${points.length} points`);
    console.log('');

    // Step 5: Upload to Qdrant
    console.log('☁️  Step 5: Uploading to Qdrant Cloud...');
    const client = getQdrantClient();

    await client.upsert(QDRANT_COLLECTION_NAME, {
      wait: true,
      points,
    });
    console.log(`✅ Uploaded ${points.length} points to Qdrant`);
    console.log('');

    // Step 6: Verify
    console.log('🔍 Step 6: Verifying upload...');
    const collectionInfo = await client.getCollection(QDRANT_COLLECTION_NAME);
    console.log(`✅ Collection points count: ${collectionInfo.points_count}`);
    console.log('');

    console.log('🎉 Seeding completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Test the search API: POST /api/search');
    console.log('2. Try the search UI: Open the app and press ⌘K');
    console.log('');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();
