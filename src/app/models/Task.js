import Sequelize, { Model } from 'sequelize';

class Task {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Project, {
      foreign_key: 'project_id',
      as: 'project',
    });
  }
}

export default Task;
