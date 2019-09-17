module.exports = (app, db) => {

  const toss = require('./controllers/toss')(db);

  app.post('/users/login', toss.login);
  app.post('/users/register', toss.register);
};