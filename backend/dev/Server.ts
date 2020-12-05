import App from './App';
import { HomeController } from './controllers/HomeController';
import PlayerSearchAlgorithm from './services/playerSearch/PlayerSearchAlgorithm';
import { createRedisClient } from './Redis';
import { initio } from './Socket';
import express from 'express';
import loaders from './loaders';

require('dotenv').config();

export async function startRestServer() {

    createRedisClient();
    const app = express();
    await loaders({ app }).then(() => {
        // run search algorithm after initialization
        PlayerSearchAlgorithm.getInstance().initializeSearch();
    });

}