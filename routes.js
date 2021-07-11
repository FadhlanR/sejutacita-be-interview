import express from 'express';
import env from './config/env';
import userController from './controller/user_controller';
const routes = express();

routes.post('/users', userController.add);
routes.put('/users', userController.update);
routes.get('/users', userController.query);

export default routes;