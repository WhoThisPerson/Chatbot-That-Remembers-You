
import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, customType } from "drizzle-orm/pg-core";

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
