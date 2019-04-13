import mongoose from "mongoose";

export default mongoose
  .connect("mongodb://localhost/food-service", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDb...."));
