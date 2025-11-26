// This file is intentionally simple and dependency-free.
// Environment variables are pre-loaded by the script in package.json.
export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
