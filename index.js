import mongoose from 'mongoose';
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

const port = process.env.PORT || 3000; //Making the port dynamic

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`listening on port ${port}`));
}

export { app };
