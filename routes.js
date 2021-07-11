import express from 'express';
import env from './config/env';
import userController from './controller/user_controller';
const routes = express();

routes.post('/users', userController.add);
routes.post('/users/login', userController.login);
routes.post('/users/generate_access_token', userController.generateAccessToken);
routes.put('/users', userController.update);
routes.get('/users', userController.query);

export default routes;