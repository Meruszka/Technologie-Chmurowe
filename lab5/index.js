const express = require('express')
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '123'
};

const Redis = require('ioredis');
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});
redis.on('connect', () => {
    console.log('Connected to Redis')
})

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
      wynik VARCHAR(60) NOT NULL
    );
    `)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));

app.get('/', async (req, res) => {
    console.log(req.query)
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    try{
        const result = await redis.get(`${num1}|${num2}`);
        console.log(result)
        if(result == null){
            res.send(await client.query("SELECT * FROM wyniki").rows);
        }else{
            res.send(result)
        }
    }catch(err){
        console.log(err)
    }
    var a = req.query.num1;
    var b = req.query.num2;
    while(a != b){
        if (a>b){
            a = a - b;
        }else{
            b = b - a;
        }
    }
    const wynik = a;
    client.query(`INSERT INTO wyniki (wynik) VALUES (${wynik})`);
    try{
        await redis.set(`${num1}|${num2}`, `${wynik}`)
    }catch(err){
        console.log(err)
    }
    res.send("Policzone")
})







