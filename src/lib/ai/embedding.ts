import { embedMany } from "ai";

const embeddingModel = "openai/text-embedding-3-small";

/**
 * Generates vector embeddings for a list of facts
 * @param facts - list of facts regarding user dialogue
 * @returns list of mapping between facts and vector embeddings
 */
export const generateEmbeddings = async (facts: string[]): Promise<Array<{ embedding: number[]; content: string }>> => {

    if (facts.length === 0) return [];

    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: facts,
    });

    return facts.map((content, i) => ({
        content,
        embedding: embeddings[i],
    }))
}
