module.exports = (app, db) => {

  const toss = require('./controllers/toss')(db);

  app.post('/users/login', toss.login);
  app.post('/users/register', toss.register);

  app.post('/groups/new', toss.newGroup);
  app.post('/groups/user/new', toss.newGroupUser)
};