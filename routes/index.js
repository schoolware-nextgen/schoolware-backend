var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(404).send("Use token endpoints"); //TODO add page explaining site
});

module.exports = router;
