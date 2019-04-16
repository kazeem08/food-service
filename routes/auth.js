import express from 'express';
import { routeController } from '../controllers/authController';

const router = express.Router();

//route for customer login
router.post('/', routeController.post);

//route for user login
router.post('/staff', routeController.postStaff);

export { router };
