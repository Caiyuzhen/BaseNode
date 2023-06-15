var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', '*')
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	// res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	res.send('respond with a resource');
});

module.exports = router;
