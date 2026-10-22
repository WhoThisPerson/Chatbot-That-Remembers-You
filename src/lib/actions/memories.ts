"use server";

import { db } from '../db'
import { generateEmbeddings } from "@/lib/ai/embedding";
import { extractFacts } from "@/lib/ai/memories";

/**
 * Extracts facts from a user message, generates vector embeddings for those facts,
 * and saves the facts/embeddings to the database for future retrieval.
 * @param message - text body received from user
 */
export async function generateMemoryEmbeddings(message: string): Promise<string[]> {

    const facts = await extractFacts(message);

    const embeddings = await generateEmbeddings(facts);

    //TBA
    //UPDATE TO DBA

    return facts;
}
