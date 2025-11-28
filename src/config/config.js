import 'dotenv/config';

/**
 * A centralized configuration module.
 * It reads environment variables and constructs necessary values like DATABASE_URL.
 */
const config = {
  // Application port
  port: process.env.PORT,

  // Database configuration object
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  // Dynamically constructed database URL for Prisma
  databaseUrl: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`,
};

// Validate that all necessary environment variables are set
if (!config.port || !config.db.host || !config.db.port || !config.db.username || !config.db.password || !config.db.name) {
  throw new Error('One or more environment variables are not set. Please check your .env file.');
}

export default config;
