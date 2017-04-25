var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
  data=req.body;
  console.dir(data);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(data));
  //res.end('{"name":"google"}')
});

module.exports = router;
