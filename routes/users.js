import express from "express";
import { controller as routeController } from "../controllers/userController";

const router = express.Router();

router.get("/", routeController.get);

router.get("/:id", routeController.getbyId);

router.post("/", routeController.post);

export { router };
