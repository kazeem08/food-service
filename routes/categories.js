import express from "express";
import { Category, validateCategory as validate } from "../models/category";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { routeController } from "../controllers/categoryController";
const router = express.Router();

router.get("/", routeController.get);

router.post("/", [auth, admin], routeController.post);

router.put("/:id", [auth, admin], routeController.put);

router.delete("/:id", [auth, admin], routeController.delete);

export { router };
