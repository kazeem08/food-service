import mongoose from "mongoose";
import express from "express";
import { router as users } from "./routes/users";
import { router as foods } from "./routes/foods";
import { router as customers } from "./routes/customers";
import { router as orders } from "./routes/orders";

const app = express();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/foods", foods);
app.use("/api/customers", customers);
app.use("/api/orders", orders);

mongoose
  .connect("mongodb://localhost/food-service", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDb...."));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
