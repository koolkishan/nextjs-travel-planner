import Redis from "ioredis";

// You can get the REDIS_URL from your environment variables
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const connection = new Redis(REDIS_URL);

export { connection };
