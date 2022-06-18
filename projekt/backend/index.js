const express = require("express");
const app = express();
const redis = require("redis");
const util = require("util");
const posts = require("./routes/posts");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/posts", posts);

const dbConnData = {
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || "mongodb",
};

const mongoose = require("mongoose");

const client = redis.createClient({
  legacyMode: true,
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

client.hGet = util.promisify(client.hGet);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (
  options = { time: 10, delete: false }
) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
  this.delete = options.delete;

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  if (this.delete) {
    client.del(this.hashKey);
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
  });
  const cacheValue = await client.hGet(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    console.log("Response from Redis");
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.hSet(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);

  console.log("Response from MongoDB");
  return result;
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    client.connect().then(() => {
      console.log("Connected to Redis");
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
      });
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
