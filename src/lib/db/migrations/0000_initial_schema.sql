CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS "memories" (
    "id" serial PRIMARY KEY NOT NULL,
    "content" text NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
