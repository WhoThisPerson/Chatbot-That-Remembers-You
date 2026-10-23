"use server";

import { generateEmbeddings } from "@/lib/ai/embedding";
import { extractFacts } from "@/lib/ai/memories";
import { insertMemory, getMemories as getMemoriesQuery, deleteMemory as deleteMemoryQuery } from '@/lib/db/queries/memory-queries';
import type { Memory } from "@/lib/db/schema/memories";


/**
 * Extracts facts from a user message, generates vector embeddings for those facts,
 * and saves the facts/embeddings to the database for future retrieval.
 * @param message - text body received from user
 */
export async function generateMemoryEmbeddings(message: string): Promise<string[]> {

    const facts = await extractFacts(message);

    if (facts.length === 0) return []

    const embeddings = await generateEmbeddings(facts);

    for (const item of embeddings) {
        await insertMemory({
            content: item.content,
            embedding: item.embedding,
        });
    }

    return facts;
}

/**
 * Calls memory query function to retrieve all stored memories
 * @returns - List of all the memories currently in the database
 */
export async function getMemories(): Promise<Memory[]>{
    return getMemoriesQuery();
}


/**
 * Calls memory query function to delete specific memory from database
 */
export async function deleteMemory(id: number) {
    
}
