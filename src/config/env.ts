import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url(),

    // Server
    PORT: z.string().min(2).max(100),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("Invalid environment variables:", env.error.format());
    process.exit(1);
}

export const config = env.data;
