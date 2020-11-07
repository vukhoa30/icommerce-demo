import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import { APP_PORT } from './configs/env';

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// CORS
app.use(cors());

// Routes
app.use("/", routes);

// Starting the App
app.listen(APP_PORT, () => { console.log(`Listening on port: ${APP_PORT}`) });
