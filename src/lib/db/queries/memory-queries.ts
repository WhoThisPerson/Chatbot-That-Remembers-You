import { db } from "@/lib/db";
import { memories, insertMemorySchema, NewMemory, Memory } from "@/lib/db/schema/memories";
import { eq, desc } from "drizzle-orm";

/**
 * Will insert a new memory into the database
 * @param input - NewMemory object to be inserted into the database
 * @returns - the saved memory
 */
export async function insertMemory(input: NewMemory): Promise<Memory> {
    const memory = insertMemorySchema.parse(input);

    const [savedMemory] = await db
      .insert(memories)
      .values(memory)
      .returning();

    return savedMemory;
}

/**
 * Will retrieve all of the stored memories in order of creation
 * @returns - List of memories sorted by most recently added
 */
export async function getMemories(): Promise<Memory[]> {

    return db
        .select()
        .from(memories)
        .orderBy(desc(memories.createdAt))
}

/**
 * Will query the database to remove that specific memory
 * @param id - the unique identifier of the specific fact
 * @returns - True if deletedMemory is found and False otherwise
 */
export async function deleteMemory(id: number): Promise<boolean> {

    const [deletedMemory] = await db
        .delete(memories)
        .where(eq(memories.id, id))
        .returning({id: memories.id})
    
    return deletedMemory !== undefined;
}
