const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_HOST,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
