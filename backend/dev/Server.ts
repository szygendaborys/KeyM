import express from 'express';
import loaders from './loaders';
import { createRedisClient } from './Redis';

require('dotenv').config();

export async function startRestServer() {

    createRedisClient();
    const app = express();
    await loaders({ app });

}