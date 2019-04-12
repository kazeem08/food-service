import express from "express";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";
import { routeController } from "../controllers/foodController";

const router = express.Router();

//route to get a particular food
router.get("/:id", routeController.getById);

//route to get all foods
router.get("/", routeController.get);

//route to create a food
router.post("/", [auth, admin], routeController.post);

//route to update a food
router.put("/:id", [auth, admin], routeController.put);

//route to delete a food
router.delete("/:id", [auth, admin], routeController.delete);

export { router };
