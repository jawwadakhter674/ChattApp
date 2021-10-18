const express = require('express');
const router = express.Router();

const {login , signup} = require('../controller/auth');

router.post('/signup' , signup);
router.post('/signin' , login);

module.exports =  router;