const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const adminController = require('../controllers/admin-controllers');

router.post('/login',[
    check('email').notEmpty().isEmail(),
    check('password').isString().notEmpty()
],adminController.authenticate);

router.post('/signUp',[
    check('name').notEmpty().isString(),
    check('password').isString().notEmpty(),
    check('email').isEmail().notEmpty()
],adminController.create);

module.exports = router;
