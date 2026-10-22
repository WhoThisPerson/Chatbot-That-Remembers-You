import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";

const databaseUrl = env.DATABASE_URL;

const client = postgres(databaseUrl);
export const db = drizzle(client);
