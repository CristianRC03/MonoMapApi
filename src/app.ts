import express from 'express';
import { MongoDataBase } from './data/init';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () => await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB
}))();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  emailJob();
});