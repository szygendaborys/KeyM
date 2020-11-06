import bluebird from 'bluebird';
const redisPort = process.env.BACKEND_REDIS_PORT || '4001';
let redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
let client:any;

let createRedisClient = function() {
    if(!client) {
        client = redis.createClient();
    }
    console.info("Redis client connected");
    return client;
}

let getRedisClient = function() {
    if(!client) throw new Error('Error: Redis client does not exist.');
    return client;
}

export {
    createRedisClient, getRedisClient
}

/*

if value is of type string -> GET <key>
if value is of type hash -> HGETALL <key>
if value is of type lists -> lrange <key> <start> <end>
if value is of type sets -> smembers <key>
if value is of type sorted sets -> ZRANGEBYSCORE <key> <min> <max>



*/