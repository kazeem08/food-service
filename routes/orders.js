import express from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { routeController } from "../controllers/orderController";
import { validateObjectId } from "../middleware/validateObjectId";

const router = express.Router();

router.get("/", [auth, admin], routeController.get);

router.get("/:id", validateObjectId, auth, routeController.getById);

router.post("/", auth, routeController.post);

router.put("/:id", validateObjectId, [auth, admin], routeController.put);

export { router };
