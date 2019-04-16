import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { routeController } from '../controllers/orderController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = express.Router();

//route to get all orders
router.get('/', [auth, admin], routeController.get);

//route to get all orders of a user
router.get('/user/:id', [auth, admin], routeController.getOrders);

//route for a customer to view all his orders
router.get('/myorders', auth, routeController.getMyOrder);

//route to get order(s) for a customer
router.get('/:id', validateObjectId, [auth, admin], routeController.getById);

//route to create an order
router.post('/', auth, routeController.post);

//route to update orddr status
router.put('/:id', validateObjectId, [auth, admin], routeController.put);

export { router };
