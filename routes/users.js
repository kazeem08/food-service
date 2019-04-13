import express from "express";
import { routeController } from "../controllers/userController";
import { validateObjectId } from "../middleware/validateObjectId";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";

const router = express.Router();

router.get("/", [auth, admin], routeController.get);

router.get("/me", auth, routeController.getMe);

router.get("/:id", validateObjectId, [auth, admin], routeController.getbyId);

router.post("/", routeController.post);

export { router };
