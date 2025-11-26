import 'dotenv/config';
import express from 'express';
import prisma from './db/client.js';
import userGroupRoutes from './modules/user-groups/user-group.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---
app.use('/user-groups', userGroupRoutes);
// TODO: Add other module routers here

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.send('Server is healthy!');
});

const main = async () => {
  try {
    // Validate database connection
    await prisma.$connect();
    console.log('Database connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  } finally {
    // Gracefully disconnect from the database when the process is terminated
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }
};

main();
