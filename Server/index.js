import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectMongo, mongoose } from './Config/Mongodb.js';
import { pgPool } from './Config/Postgresqldb.js';
import authRoutes from './Routes/authRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // HTTP request logger

// Connect to databases
connectMongo();

// PostgreSQL test route
app.get('/pg-test', async (req, res) => {
  try {
    const result = await pgPool.query('SELECT NOW()');
    res.json({
      message: 'PostgreSQL query successful',
      time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB test route
app.get('/mongo-test', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    res.json({
      message: 'MongoDB query successful',
      dbStats: stats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
