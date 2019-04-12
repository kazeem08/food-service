import express from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { routeController } from "../controllers/categoryController";
import { validateObjectId } from "../middleware/validateObjectId";

const router = express.Router();

router.get("/", routeController.get);

router.post("/", [auth, admin], routeController.post);

router.put("/:id", validateObjectId, [auth, admin], routeController.put);

router.delete("/:id", validateObjectId, [auth, admin], routeController.delete);

export { router };
