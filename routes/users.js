import express from 'express';
import { routeController } from '../controllers/userController';
import { validateObjectId } from '../middleware/validateObjectId';
import { auth } from '../middleware/auth';
import { admin } from '../middleware/admin';

const router = express.Router();

//route to get all users
router.get('/', [auth, admin], routeController.get);

//route for user to view his profile
router.get('/me', auth, routeController.getMe);

//route to uget use by iD
router.get('/:id', validateObjectId, [auth, admin], routeController.getbyId);

//route to create a user
router.post('/', routeController.post);

export { router };
