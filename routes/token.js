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
    Schoolware = new schoolware.Schoolware(username, password, domain);
    token = await Schoolware.getTokenMicrosoft();
    var success = await Schoolware.checkToken()
    res.json({ "token": token, "success": success });
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
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
    Schoolware = new schoolware.Schoolware(username, password, domain);
    token = await Schoolware.getTokenSchoolware();
    var success = await Schoolware.checkToken()
    res.json({ "token": token, "success": success });
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
  }
});

module.exports = router;
