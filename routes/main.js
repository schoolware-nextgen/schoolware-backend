var express = require('express');
var router = express.Router();
var schoolware = require('@schoolware/schoolware-lib');



router.post('/check', async function (req, res, next) {
  try {
    const token = req.body.token;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    Schoolware = new schoolware.Schoolware();
    Schoolware.token = token;
    let succes, status = await Schoolware.checkToken();
    res.json({ "succes": succes , "status": status});
  }
  catch (e) {
    //console.log(e)
    res.json({"success": false, "status": 500 });
  }
});

router.post('/points', async function (req, res, next) {
  try {
    const token = req.body.token;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    Schoolware = new schoolware.Schoolware();
    Schoolware.token = token;
    let points,success,status = await Schoolware.points();
    res.json({"data" : points, "success": success, "status": status});
  }
  catch (e) {
    //console.log(e)
    res.json({ "data": "", "success": false, "status": 500 });
  }
});

router.post('/agenda', async function (req, res, next) {
  try {
    const token = req.body.token;
    const date = req.body.date;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    Schoolware = new schoolware.Schoolware();
    Schoolware.token = token;
    let agenda,success,status = await Schoolware.agenda(date);
    res.json({"data" : agenda, "success": success, "status": status});
  }
  catch (e) {
    //console.log(e)
    res.json({ "data": "", "success": false, "status": 500 });
  }
});

router.post('/tasks', async function (req, res, next) {
  try {
    const token = req.body.token;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    Schoolware = new schoolware.Schoolware();
    Schoolware.token = token;
    let tasks,success,status  = await Schoolware.tasks();
    res.json({"data" : tasks, "success": success, "status": status});
  }
  catch (e) {
    //console.log(e)
    res.json({ "data": "", "success": false, "status": 500 });
  }
});


module.exports = router;