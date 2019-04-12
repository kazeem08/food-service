import express from "express";
import { customerController } from "../controllers/customerController";

const router = express.Router();

router.get("/", customerController.get);

router.post("/", customerController.post);

export { router };
