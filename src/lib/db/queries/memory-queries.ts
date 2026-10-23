import { db } from "@/lib/db";
import { memories, insertMemorySchema, NewMemory } from "@/lib/db/schema/memories";
import { eq, desc } from "drizzle-orm";

/**
 * Will insert a new memory into the database
 * @param input - NewMemory object to be inserted into the database
 * @returns - the saved memory
 */
export async function insertMemory(input: NewMemory) {
  const memory = insertMemorySchema.parse(input);

  const [savedMemory] = await db
    .insert(memories)
    .values(memory)
    .returning();

  return savedMemory;
}

/**
 * Will retrieve all of the stored memories in order of creation
 */
export async function getMemories() {

    return db
        .select()
        .from(memories)
        .orderBy(desc(memories.createdAt))
}

/**
 * Will query the database to remove that specific memory
 * @param id - the unique identifier of the specific fact
 */
export async function deleteMemory(id: number) {

    const [deletedMemory] = await db
        .delete(memories)
        .where(eq(memories.id, id))
        .returning()
    
    return deletedMemory;
}
