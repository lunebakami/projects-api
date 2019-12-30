import * as Yup from 'yup';
import Task from '../models/Task';
import Project from '../models/Project';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      project_id: Yup.number().required(),
    });

    const { id } = req.params;
    const { title, description } = req.body;

    const taskSchema = { title, project_id: id, description };

    if (!(await schema.isValid(taskSchema))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const checkProjectExists = await Project.findByPk(id);

    if (!checkProjectExists) {
      return res.status(400).json({ error: "Project doesn't exists." });
    }

    const checkTaskExists = await Task.findOne({ where: { title } });

    if (checkTaskExists) {
      return res.status(400).json({ error: 'Task already exists' });
    }

    const task = await Task.create({
      title,
      description,
      projectId: id,
    });

    return res.json(task);
  }
}

export default new TaskController();
