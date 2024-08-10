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
    let succes = await Schoolware.checkToken();
    res.json({ "succes": succes });
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
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
    let points = await Schoolware.points();
    res.json(points);
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
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
    let agenda = await Schoolware.agenda(date);
    res.json(agenda);
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
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
    let tasks = await Schoolware.tasks();
    tasks = [{"vak":"mb","title":"test","type":"hertoets","comment":"veel commentaar","deadline":"2024-08-05T17:30:16.392Z"}]
    res.json(tasks);
  }
  catch (e) {
    //console.log(e)
    res.json({ "token": "", "success": false });
  }
});


module.exports = router;