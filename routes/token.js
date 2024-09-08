var express = require('express');
var router = express.Router();
var schoolware = require('@schoolware/schoolware-lib');


router.post('/microsoft', async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const domain = req.body.domain;
    if (typeof (username) != 'string' || typeof (password) != 'string' || typeof (username) != 'string') {
      res.status(400).send(`send user and password and domain`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(username, password, domain);
    let token, succes, status = await Schoolware.getTokenMicrosoft();
    if(succes){
      var success = await Schoolware.checkToken()
    }
    res.json({ "token": token, "success": success, "status": status });
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false , "status": 500});
  }
});


router.post('/schoolware', async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const domain = req.body.domain;
    if (typeof (username) != 'string' || typeof (password) != 'string' || typeof (username) != 'string') {
      res.status(400).send(`send user and password and domain`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(username, password, domain);
    let token, succes, status = await Schoolware.getTokenSchoolware();
    if(succes){
      succes = await Schoolware.checkToken()
    }
    res.json({ "token": token, "success": success, "status": status });
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false , "status": 500});
  }
});

module.exports = router;
