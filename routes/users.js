import express from "express";
import { controller } from "../controllers/userController";

const router = express.Router();

router.get("/", controller.get);

router.get("/:id", controller.getbyId);

router.post("/", controller.post);

export { router };
