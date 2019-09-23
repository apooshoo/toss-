module.exports = (db) => {

  let getAll = (req, res) => {
    db.toss.getAll((err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            // console.log('sending:', result[0])
            res.send(result);
        };
    });
  };

  let login = (req, res) => {
    // console.log('in login ctrlr');
    // console.log("body:", req.body);
    db.toss.login(req.body, (err, result) => {
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            // console.log('sending:', result[0])
            res.send(result[0]);
        };
    });
  };

  let register = (req, res) => {
    // console.log('in register ctrlr');
    // console.log("body:", req.body);
    db.toss.register(req.body, (err, result) => {
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            // console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let getUsersGroups = (req, res) => {
    // console.log('in getUsersGroups ctrlr');
    // console.log("params:", req.params);
    db.toss.getUsersGroups(req.params, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result)
            res.send(result);
        };
    });
  };

  let newGroup = (req, res) => {
    // console.log('in newGroup ctrlr');
    // console.log("body:", req.body);
    db.toss.newGroup(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let newGroupUser = (req, res) => {
    // console.log('in newGroupUser ctrlr');
    // console.log("body:", req.body);
    db.toss.newGroupUser(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            console.log('YOO?')
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let getGroupUsers = (req, res) => {
    console.log('in getGroupUsers ctrlr');
    console.log("params:", req.params);
    db.toss.getGroupUsers(req.params, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result)
            res.send(result);
        };
    });
  };

  let newGroupEntry = (req, res) => {
    console.log('in new group entry ctrlr');
    console.log('body:', req.body)

    db.toss.newGroupEntry(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  }

  let getWinBalance = (req, res) => {
    console.log('in getWinBalance ctrlr');
    // console.log("params:", req.params);
    db.toss.getWinBalance(req.params, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let editWinBalance = (req, res) => {
    console.log('in editWinBalance ctrlr');
    // console.log("params:", req.params);
    db.toss.editWinBalance(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let getUsersFriends = (req, res) => {
    // console.log('in getUsersFriends ctrlr');
    // console.log("params:", req.params);
    db.toss.getUsersFriends(req.params, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result)
            res.send(result);
        };
    });
  };

  let getInvitesReceived = (req, res) => {
    console.log('in getInvitesReceived ctrlr');
    // console.log("params:", req.params);
    db.toss.getInvitesReceived(req.params, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result)
            res.send(result);
        };
    });
  };

  let addNewFriend = (req, res) => {
    // console.log("params:", req.params);
    db.toss.addNewFriend(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };

  let confirmFriend = (req, res) => {
    console.log('in confirmFriend ctrlr')
    console.log(req.body)
    // console.log("params:", req.params);
    db.toss.confirmFriend(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('edited', result[0])

            // res.send(result[0]);
            let data = {
                userId: req.body.friendId,
                friendId: req.body.userId
            }
            db.toss.confirmBack(data, (err, result2)=>{
                if(err){
                    console.log('err,', err);
                } else if (result === null){
                    res.send('null');
                } else {
                    console.log('added back:', result2[0])
                    let returnData = {
                        confirmed: result[0],
                        confirmBack: result2[0]
                    };
                    console.log('sending back', returnData)
                    res.send(returnData);
                };
            });
        };
    });
  };

  let deleteFriend = (req, res) => {
    // console.log("params:", req.params);
    db.toss.deleteFriend(req.body, (err, result)=>{
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending back:', result[0])
            res.send(result[0]);
        };
    });
  };



  return {
    getAll : getAll,
    login : login,
    register : register,
    getUsersGroups : getUsersGroups,
    newGroup : newGroup,
    newGroupUser : newGroupUser,
    getGroupUsers : getGroupUsers,
    newGroupEntry : newGroupEntry,
    getWinBalance : getWinBalance,
    editWinBalance : editWinBalance,
    getUsersFriends : getUsersFriends,
    getInvitesReceived : getInvitesReceived,
    addNewFriend : addNewFriend,
    confirmFriend : confirmFriend,
    deleteFriend : deleteFriend
  }

};