import { router as users } from '../routes/users';
import { router as foods } from '../routes/foods';
import { router as customers } from '../routes/customers';
import { router as orders } from '../routes/orders';
import { router as categories } from '../routes/categories';
import { router as auth } from '../routes/auth';
import { error } from '../middleware/error';

//setting the routes
function routes(app) {
	app.use('/api/users', users);
	app.use('/api/foods', foods);
	app.use('/api/customers', customers);
	app.use('/api/orders', orders);
	app.use('/api/categories', categories);
	app.use('/api/auth', auth);
	app.use(error);
}

export { routes };
