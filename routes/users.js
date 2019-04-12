import express from "express";
import { controller as routeController } from "../controllers/userController";
import { validateObjectId } from "../middleware/validateObjectId";

const router = express.Router();

router.get("/", routeController.get);

router.get("/:id", validateObjectId, routeController.getbyId);

router.post("/", routeController.post);

export { router };
