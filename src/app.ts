import express from 'express';
import { MongoDataBase } from './data/init';
import { envs } from './config/envs';

const app = express();

(async () => await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB
}))();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});