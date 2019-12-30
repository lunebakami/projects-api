import Sequelize, { Model } from 'sequelize';

class Project extends Model {
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
}

export default Project;
