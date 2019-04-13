import express from "express";
import { routeController } from "../controllers/authController";

const router = express.Router();

router.post("/", routeController.post);

router.post("/staff", routeController.postStaff);

export { router };
