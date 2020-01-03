export default (req, res, next) => {
  console.count('Numero de Requisições');

  next();
};
