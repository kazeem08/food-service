import express from 'express';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';
import { routeController } from '../controllers/categoryController';
import { validateObjectId } from '../middleware/validateObjectId';

const router = express.Router();

//route for getting all categories
router.get('/', routeController.get);

//route for getting categoy by ID
router.get('/:id', validateObjectId, routeController.getById);

//route for creating a category
router.post('/', auth, routeController.post);

//route for updating a category
router.put('/:id', validateObjectId, [auth, admin], routeController.put);

//route for deleting a category
router.delete('/:id', validateObjectId, [auth, admin], routeController.delete);

export { router };
