import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {

    static async connect(options: ConnectionOptions) {
        try {
            await mongoose.connect(options.mongoUrl, {
                dbName: options.dbName,
            })

            console.log('Database connected');
        }
        catch (error) {
            console.error('Database connection error', error);
        }
    }
}