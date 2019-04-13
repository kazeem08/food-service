import mongoose from "mongoose";
import config from "config";

const db = config.get("db");

export default mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(`connected to ${db}....`));
