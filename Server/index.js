const express = require('express');
const { connectMongo, mongoose } = require('./Config/Mongodb');
const { pgPool } = require('./Config/Postgresqldb')

const app = express();
app.use(express.json());

// Connect to databases
connectMongo();
// Example route using PostgreSQL
app.get('/pg-test', async (req, res) => {
  try {
    const result = await pgPool.query('SELECT NOW()');
    res.json({ message: 'PostgreSQL query successful', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route using MongoDB (simple in-memory test, no model needed)
app.get('/mongo-test', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    res.json({ message: 'MongoDB query successful', dbStats: stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});