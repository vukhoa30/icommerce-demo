import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes'

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// CORS
app.use(cors())

// Routes
app.use("/", routes);

// Starting the App
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`) })
