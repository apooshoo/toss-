/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let getAll = (callback) => {
    console.log('in getAll model');
    const query = `SELECT * FROM users`;
    dbPoolInstance.query(query, (err, result)=>{
        if(err){
            callback(err, null);
        } else if (result.rows.length > 0){
            callback(null, result.rows);
        } else {
            callback(null, null);
        }
    });
  };

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

  let getUsersGroups = (data, callback) => {
    console.log('in getUsersGroups model');
    let values = [data.userId];
    console.log('values:', values)

    const query = `SELECT * FROM users_groups INNER JOIN groups ON (users_groups.groupId = groups.id) WHERE users_groups.userId = $1`;
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

  let newGroup = (data, callback) => {
    console.log('in newGroup model');
    let values = [data.inputGroupName];
    console.log('values:', values)

    const query = `INSERT INTO groups (groupname) SELECT $1 WHERE NOT EXISTS (SELECT * FROM groups WHERE groupname = $1) RETURNING *`;
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

  let newGroupUser = (data, callback) => {
    console.log('in newGroupUser model');
    let values = [data.userId, data.groupId];
    console.log('values:', values)

    const query = `INSERT INTO users_groups (userId, groupId) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM users_groups WHERE userId = $1 AND groupId = $2) RETURNING *`;
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

  let getGroupUsers = (data, callback) => {
    console.log('in getGroupUsers model');
    let values = [data.groupId];
    console.log('values:', values)

    const query = `SELECT * FROM users_groups INNER JOIN users ON (users_groups.userId = users.id) WHERE users_groups.groupId = $1`;
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

  let newGroupEntry = (data, callback) => {
    console.log('in newGroupEntry model');
    let values = [data.userId, data.groupId, data.entry];
    console.log('values:', values)
    const query = `UPDATE users_groups SET entry = $3 WHERE userId = $1 AND groupId = $2 RETURNING *`;
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

  let getWinBalance = (data, callback) => {
    console.log('in getWinBalance model');
    let values = [data.userId, data.friendId];
    console.log('values:', values)

    const query = `SELECT * FROM users_friends WHERE userId = $1 AND friendId = $2`;
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

  let editWinBalance = (data, callback) => {
    console.log('in editWinBalance model');
    let values = [data.userId, data.friendId, data.value];
    console.log('values:', values)

    const query = `UPDATE users_friends SET winBalance = winBalance+$3 WHERE userId = $1 AND friendId = $2 RETURNING *`;
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

  let getUsersFriends = (data, callback) => {
    console.log('in getUsersFriends model');
    let values = [data.userId];
    console.log('values:', values)

    const query = `SELECT * FROM users_friends INNER JOIN users ON (users_friends.friendId = users.id) WHERE users_friends.userId = $1`;
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

  let getInvitesReceived = (data, callback) => {
    console.log('in getInvitesReceived model');
    let values = [data.userId];
    console.log('values:', values)

    const query = `SELECT * FROM users_friends INNER JOIN users ON (users_friends.friendId = users.id) WHERE users_friends.friendId = $1`;
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

  let addNewFriend = (data, callback) => {
    console.log('in addNewFriend model');
    let values = [data.userId, data.friendId];
    console.log('values:', values)

    const query = `INSERT INTO users_friends (userId, friendId) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM users_friends WHERE userId = $1 AND friendId = $2) RETURNING *`;
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

  let confirmFriend = (data, callback) => {
    console.log('in confirmfriend model');
    let values = [data.userId, data.friendId];
    console.log('values:', values)

    const query = `UPDATE users_friends SET confirmed = true WHERE userId = $1 AND friendId = $2 RETURNING *`;
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

  let confirmBack = (data, callback) => {
    console.log('in confirmBack model');
    let values = [data.userId, data.friendId, true];
    console.log('values:', values)

    const query = `INSERT INTO users_friends (userId, friendId, confirmed) VALUES ($1, $2, $3)  RETURNING *`;
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

  let deleteFriend = (data, callback) => {
    console.log('in deleteFriend model');
    let values = [data.userId, data.friendId];
    console.log('values:', values)

    const query = `DELETE FROM users_friends WHERE userId = $1 AND friendId = $2 RETURNING *`;
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
    getAll,
    login,
    register,
    getUsersGroups,
    newGroup,
    newGroupUser,
    getGroupUsers,
    newGroupEntry,
    getWinBalance,
    editWinBalance,
    getUsersFriends,
    getInvitesReceived,
    addNewFriend,
    confirmFriend,
    confirmBack,
    deleteFriend
  };
};