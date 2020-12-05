import env from "../config/env";

require('dotenv').config()
export default class Database {
    private mongoose = require("mongoose");

    public async connectToDb(startServer: Function): Promise<void> {
        const mongoKey = env.mongo.key;
        const connection = await this.mongoose
            .connect(
                mongoKey,
                {
                    useFindAndModify: false,
                    useNewUrlParser: true
                }
            );

        if (connection) {
            startServer();
        }
    };
}