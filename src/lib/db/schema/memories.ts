
import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, customType } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Represents num dimensions of the embedding vector. Should match the dimensions of the embedding model used to generate the embeddings.
const DIMENSIONS = 1536;

// PostgreSQL pgvector column type
const vector = customType<{
  data: number[];
  driverData: string;
}>({
  dataType() {
    return `vector(${DIMENSIONS})`;
  },
});

// Stores the embeddings and content of the memories
export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),

  content: text("content").notNull(),

  embedding: vector("embedding").notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .default(sql`now()`),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .default(sql`now()`),
});

// Schema used for validating a complete memory retrieved from the database
export const selectMemorySchema = createSelectSchema(memories);

// Schema used for validating newly created memories
// Ensures that new memories only contain the text and embedding with specified parameters
export const insertMemorySchema = createInsertSchema(memories, {
  content: z.string().trim().min(1, "Memory content can't be empty"),

  embedding: z
    .array(z.number())
    .length(DIMENSIONS, `Embedding must contain ${DIMENSIONS} dimensions`),
  }).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

// Typescript types inferred from validation schemas
export type Memory = z.infer<typeof selectMemorySchema>;
export type NewMemory = z.infer<typeof insertMemorySchema>;

