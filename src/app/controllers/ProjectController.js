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
}

export default new ProjectController();
