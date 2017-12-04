var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    username: 'lisuh'
  }, {
    id: 2,
    username: 'kewan'
  }]);
});

router.get('/login', function(req, res) {
  res.json({me: 'you'})
})
module.exports = router;
