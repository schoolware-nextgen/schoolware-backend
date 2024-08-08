var express = require('express');
var router = express.Router();
var schoolware = require('../../schoolware-lib/lib');


router.post('/microsoft', async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (typeof (username) != 'string' || typeof (password) != 'string') {
      res.status(400).send(`send user and password`);
      return;
    }
    Schoolware = new schoolware.Schoolware(username, password);
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
    if (typeof (username) != 'string' || typeof (password) != 'string') {
      res.status(400).send(`send user and password`);
      return;
    }
    Schoolware = new schoolware.Schoolware(username, password)
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
