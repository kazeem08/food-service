import express from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { routeController } from "../controllers/orderController";

const router = express.Router();

router.get("/", [auth, admin], routeController.get);

router.get("/:id", auth, routeController.getById);

router.post("/", auth, routeController.post);

router.put("/:id", [auth, admin], routeController.put);

export { router };
