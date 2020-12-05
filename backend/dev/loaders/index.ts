import env from '../config/env';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import errorLoader from './errors';
import middlewareLoader from './middleware';
import loggerLoader from './logger';
import { Application } from 'express';
import logger from '../config/winston';
import { initio } from '../Socket';

export default async ({ app }:{ app:Application }) => {
    await loggerLoader({ app });
    logger.info('Logger initialized');

    await mongooseLoader(function () {
        const server = app.listen(env.port);
        initio(server);
    });
    logger.info('MongoDB Intialized');
    
    await expressLoader({ app });
    logger.info('Express Intialized');

    await errorLoader({ app });
    logger.info('Error middleware initialized');

    await middlewareLoader({ app });
    logger.info('Middleware initialized');

}