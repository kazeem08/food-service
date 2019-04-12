import express from "express";
import { routeController } from "../controllers/customerController";

const router = express.Router();

router.get("/", routeController.get);

router.post("/", routeController.post);

export { router };
