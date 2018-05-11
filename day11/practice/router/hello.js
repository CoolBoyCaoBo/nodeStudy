const express = require('express');
const router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res, next) {
    res.render('index');
});
  
module.exports = router;