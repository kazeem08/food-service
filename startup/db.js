import mongoose from 'mongoose';
import config from 'config';

//getting the database from environment variable
let db = process.env.db;
if (process.env.NODE_ENV === 'test') db = process.env.db_test;

// connecting to database
export default mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(async () => await console.log(`connected to ${db}....`));
