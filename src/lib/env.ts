import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Provides specifications on how environmental variables should be defined
 * Uses Zod for type validation
 */
export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        DATABASE_URL: z.string().min(1),
        AI_GATEWAY_API_KEY: z.string().min(1),
    },
    client: {},
    experimental__runtimeEnv: process.env,
});
