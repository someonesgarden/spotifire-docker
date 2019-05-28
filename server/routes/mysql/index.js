let express = require('express');
let router = express.Router();

let usersRouter = require('./users');

//------ ROUTINGS
router.use('/users', usersRouter);

module.exports = router;
