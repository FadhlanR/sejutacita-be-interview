import express from 'express';
import env from './config/env';
import userController from './controller/user_controller';
import { adminOrRelatedUser, JwtAuth, onlyAdmin } from './middleware/authentication';
const routes = express();

routes.post('/users', JwtAuth, onlyAdmin, userController.add);
routes.post('/users/login', userController.login);
routes.post('/users/generate_access_token', userController.generateAccessToken);
routes.put('/users', JwtAuth, onlyAdmin, userController.update);
routes.get('/users', JwtAuth, adminOrRelatedUser, userController.query);

export default routes;