import express from 'express';
import { routeController } from '../controllers/customerController';

const router = express.Router();

//route for getting all customers
router.get('/', routeController.get);

//route for creating a new customer
router.post('/', routeController.post);

export { router };
