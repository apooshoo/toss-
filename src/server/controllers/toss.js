module.exports = (db) => {

  let login = (req, res) => {
    console.log('in login ctrlr');
    console.log("body:", req.body);
    db.toss.login(req.body, (err, result) => {
        if(err){
            console.log('err,', err);
        } else if (result === null){
            res.send('null');
        } else {
            console.log('sending:', result[0])
            res.send(result[0]);
        };
    });
  };

  let register = (req, res) => {
    console.log('in register ctrlr');
    console.log("body:", req.body);
    db.toss.register(req.body, (err, result) => {
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

    login : login,
    register : register
  }

};