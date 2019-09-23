module.exports = (app, db) => {

  const toss = require('./controllers/toss')(db);

  app.get('/users', toss.getAll);

  app.post('/users/login', toss.login);
  app.post('/users/register', toss.register);

  app.get('/users/:userId/groups', toss.getUsersGroups);

  app.get('/groups/:groupId/users', toss.getGroupUsers);
  app.post('/groups/new', toss.newGroup);
  app.post('/groups/user/new', toss.newGroupUser);
  app.post('/groups/user/entry/new', toss.newGroupEntry);

  app.get('/users/:userId/:friendId/balance', toss.getWinBalance);
  app.post('/users/balance', toss.editWinBalance);
  app.get('/users/:userId/friends', toss.getUsersFriends);
app.get('/users/:userId/friends/received', toss.getInvitesReceived);

  app.post('/users/friends/new', toss.addNewFriend);

};