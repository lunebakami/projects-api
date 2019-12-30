import * as Yup from 'yup';
import Project from '../models/Project';

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

    return res.json(projects);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { title } = req.body;

    const project = await Project.findByPk(req.params.id);

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
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: "This project doesn't exists!" });
    }

    await project.destroy();

    return res.json({ ok: true });
  }
}

export default new ProjectController();
