import * as Yup from 'yup';
import Project from '../models/Project';
import Task from '../models/Task';

class ProjectController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { title } = req.body;

    const projectExists = await Project.findOne({ where: { title } });

    if (projectExists) {
      return res.status(400).json({ error: 'Project already exists!' });
    }

    const { id } = await Project.create(req.body);

    return res.json({
      id,
      title,
    });
  }

  async index(req, res) {
    const projects = await Project.findAll({});
    const tasks = await Task.findAll({});

    const projectsWithTasks = projects.map(project => {
      project.dataValues.projectTasks = [];
      tasks.forEach(task => {
        if (task.dataValues.projectId === project.dataValues.id) {
          const projectTask = {
            title: task.dataValues.title,
            description: task.dataValues.description,
          };
          project.dataValues.projectTasks.push(projectTask);
        }
      });

      return project;
    });

    return res.json(projectsWithTasks);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { title } = req.body;

    const { project } = req;

    if (title !== project.title) {
      const projectExists = await Project.findOne({ where: { title } });

      if (projectExists) {
        return res.status(400).json({ error: 'Project already exists.' });
      }
    }

    const projectUpdated = await project.update(req.body);

    return res.json(projectUpdated);
  }

  async delete(req, res) {
    const { project } = req;

    const tasks = await Task.findAll({ where: { project_id: project.id } });

    tasks.forEach(async task => {
      await task.destroy();
    });

    await project.destroy();

    return res.json({ ok: true });
  }
}

export default new ProjectController();
