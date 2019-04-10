import mongoose from "mongoose";
import express from "express";

const app = express();

mongoose
  .connect("mongodb://localhost/food-service")
  .then(() => console.log("connected to MongoDb...."));

const port = process.env.PORT || 3000;

app.listen(() => console.log(`listening on port ${port}`));
