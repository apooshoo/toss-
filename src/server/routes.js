module.exports = (app, db) => {

  const toss = require('./controllers/toss')(db);

  app.post('/users/login', toss.login);
  app.post('/users/register', toss.register);

  app.get('/users/:userId/groups', toss.getUsersGroups);

  app.post('/groups/new', toss.newGroup);
  app.post('/groups/user/new', toss.newGroupUser);

  app.get('/users/:userId/friends', toss.getUsersFriends)
};