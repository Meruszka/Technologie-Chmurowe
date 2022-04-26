'use strict';

const express = require('express');
const redis = require('redis');
var bodyParser = require('body-parser');


const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;
const redisPort = process.env.REDIS_PORT;

const app = express();
app.use(bodyParser.json())
const client = redis.createClient({
  url: `redis://default:${password}@${host}:${redisPort}`
});
client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));
const PORT = process.env.PGPORT;

app.get('/', async (req, res) => {
  try{
    const all = await client.GET("test");
    res.send(all);
  }catch(err){
    console.log(err);
    res.send("Coś poszło nie tak")
  }
  
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

app.post('/new', async (req, res) => {
  const key = req.body.key
  const val = req.body.value
  await client.set(key, val)
  res.send('Poszło')
})
