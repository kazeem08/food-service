import mongoose from 'mongoose';
import 'express-async-errors';
import config from 'dotenv/config';
// import config from 'config';
// dotenv.config();
import express from 'express';
import './startup/validation';
const app = express();
app.use(express.json());

import './startup/db';
import { jwtKey } from './startup/config';
jwtKey();
import { routes } from './startup/routes';
routes(app);

// process.env.jwtPrivateKey;

const port = process.env.PORT; //Making the port dynamic

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`listening on port ${port}`));
}

export { app };
