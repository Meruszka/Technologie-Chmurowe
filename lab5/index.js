const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '123'
};

const { Client } = require('pg');
const client = new Client(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    client.query(`
    CREATE TABLE IF NOT EXISTS wyniki (
      id SERIAL PRIMARY KEY,
      liczba VARCHAR(60) NOT NULL,
    );
    `)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));

app.get('/', async (req, res) => {
    const wyniki = await client.query("SELECT * FROM wyniki");
    res.send(wyniki.rows)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





