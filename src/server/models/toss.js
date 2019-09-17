/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let login = (data, callback) => {
    console.log('in login model');
    let values = [data.inputUsername, data.inputPassword];

    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    dbPoolInstance.query(query, values, (err, result) => {
        if(err){
            callback(err, null);
        } else if (result.rows.length > 0){
            callback(null, result.rows);
        } else {
            callback(null, null);
        }
    });
  };

  let register = (data, callback) => {
    console.log('in register model');
    let values = [data.inputUsername, data.inputPassword];

    const query = `INSERT INTO users (username, password) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM users WHERE username = $1) RETURNING *`;
    dbPoolInstance.query(query, values, (err, result) => {
        if(err){
            callback(err, null);
        } else if (result.rows.length > 0){
            callback(null, result.rows);
        } else {
            callback(null, null);
        }
    });
  };

  return {
    login,
    register
  };
};