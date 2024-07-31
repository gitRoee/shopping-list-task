import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from "postgres";

//const connectionString = process.env.DATABASE_URL;

export const client = postgres("key here", {
    max: 1,
});

export const db = drizzle(client);
