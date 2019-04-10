import mongoose from "mongoose";
import express from "express";
import { router as users } from "./routes/users";
import { router as foods } from "./routes/foods";

const app = express();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/foods", foods);

mongoose
  .connect("mongodb://localhost/food-service", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDb...."));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
