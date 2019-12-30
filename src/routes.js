import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

routes.post('/projects/:id/tasks', TaskController.store);

export default routes;
