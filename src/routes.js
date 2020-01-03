import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';

import checkProjectMiddleware from './app/middlewares/checkProjectExists';
import logRequests from './app/middlewares/logRequests';

const routes = new Router();

routes.use(logRequests);

routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);

routes.put('/projects/:id', checkProjectMiddleware, ProjectController.update);
routes.delete(
  '/projects/:id',
  checkProjectMiddleware,
  ProjectController.delete
);

routes.post(
  '/projects/:id/tasks',
  checkProjectMiddleware,
  TaskController.store
);

export default routes;
