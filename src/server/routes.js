module.exports = (app, db) => {

  const toss = require('./controllers/toss')(db);

  app.get('/pokemon/:id', toss.get);

  app.get('/api/pokemon/:id', toss.apiget);
};