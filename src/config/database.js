module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'projects-api',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
