import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';

const routes = new Router();

routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

export default routes;
