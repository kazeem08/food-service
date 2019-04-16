import mongoose from 'mongoose';
import config from 'config';

//getting the database from environment variable
const db = config.get('db');

//connecting to database
export default mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(async () => await console.log(`connected to ${db}....`));
