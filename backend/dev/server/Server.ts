import App from './App';
import { HomeController } from './controllers/HomeController';
import PlayerSearchAlgorithm from './playerSearch/PlayerSearchAlgorithm';
import { createRedisClient } from './Redis';
import { initio } from './Socket';

require('dotenv').config();
let os = require('os');
const port = process.env.BACKEND_PORT || '3001';
let application: App;
// const options = {};

export function startRestServer() {
    createRedisClient();
    application = new App([
        new HomeController(),
        // Place other controllers here...
    ]);
    application.initDb(function () {
        const server = application.app.listen(port);
        // const server = require('https').createServer(options, application.app).listen(port);
        initio(server);

        // searching algorithm
        PlayerSearchAlgorithm.getInstance().initializeSearch();
        console.log(`Server is listening on port ${port}`);
        console.log(`Operating system information: `);
        console.log(`Total cpus: ${os.cpus().length}`);
        console.log(`Total memory: ${os.totalmem()}`);
        console.log(`Free memory: ${os.freemem()}`);
    }).catch(err => {
        console.log(err);
    });
}