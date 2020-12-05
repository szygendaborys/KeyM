const dotenv = require('dotenv');
  // config() will read your .env file, parse the contents, assign it to process.env.
  dotenv.config();

  export default {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.BACKEND_PORT || '3001',
    redisPort: process.env.BACKEND_REDIS_PORT || '4001',
    host: process.env.NODE_HOST || '0.0.0.0',
    mongo:{
        key: process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_KEY : process.env.MONGO_DEV_KEY,
    }
  }