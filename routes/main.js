var express = require('express');
var router = express.Router();
var schoolware = require('schoolware-lib');



router.post('/check', async function (req, res, next) {
  try {
    const token = req.body.token;
    const domain = req.body.domain;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(undefined,undefined,domain);
    Schoolware.token = token;
    let [success, status] = await Schoolware.checkToken();
    res.json({ "success": success , "status": status});
  }
  catch (e) {
    console.log("CHECK ERROR: ", e)
    res.status(500).json({"success": false, "status": 500 });
  }
});

router.post('/points', async function (req, res, next) {
  try {
    const token = req.body.token;
    const domain = req.body.domain;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(undefined,undefined,domain);
    Schoolware.token = token;
    let [points,success,status] = await Schoolware.points();
    res.json({"data" : points, "success": success, "status": status});
  }
  catch (e) {
    console.log("POINTS ERROR: ", e)
    res.status(500).json({ "data": "", "success": false, "status": 500 });
  }
});

router.post('/agenda', async function (req, res, next) {
  try {
    const token = req.body.token;
    const domain = req.body.domain;
    const date = req.body.date;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(undefined,undefined,domain);
    Schoolware.token = token;
    let [agenda,success,status] = await Schoolware.agenda(date);
    res.json({"data" : agenda, "success": success, "status": status});
  }
  catch (e) {
    console.log("AGENDA ERROR: ", e)
    res.status(500).json({ "data": "", "success": false, "status": 500 });
  }
});

router.post('/tasks', async function (req, res, next) {
  try {
    const token = req.body.token;
    const domain = req.body.domain;
    if (typeof (token) != 'string') {
      res.status(400).send(`send token`);
      return;
    }
    let Schoolware = new schoolware.Schoolware(undefined,undefined,domain);
    Schoolware.token = token;
    let [tasks,success,status]  = await Schoolware.tasks();
    console.log(status)
    res.json({"data" : tasks, "success": success, "status": status});
  }
  catch (e) {
    console.log("TASKS ERROR: ", e)
    res.status(500).json({ "data": "", "success": false, "status": 500 });
  }
});


module.exports = router;