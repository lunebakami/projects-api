import Project from '../models/Project';

export default async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({ where: { id } });

    if (!project) {
      throw new Error("Project doesn't exists");
    }

    req.project = project;

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
