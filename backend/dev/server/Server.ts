import App from './App';
import { HomeController } from './controllers/HomeController';

require('dotenv').config();
let os = require('os');
const port = process.env.BACKEND_PORT || '8000';
let application: App;

export function startRestServer() {
    application = new App([
        new HomeController(),
        // Place other controllers here...
    ]);
    application.initDb(function () {
        application.app.listen(port);
        console.log(`Server is listening on port ${port}`);
        console.log(`Operating system information: `);
        console.log(`Total cpus: ${os.cpus().length}`);
        console.log(`Total memory: ${os.totalmem()}`);
        console.log(`Free memory: ${os.freemem()}`);
    }).catch(err => {
        console.log(err);
    });
}