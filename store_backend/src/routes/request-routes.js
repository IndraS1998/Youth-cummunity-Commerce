let express = require('express');
let {check} = require('express-validator');

let requestController = require('../controllers/request-controller');
let checkAuth = require('../middleware/checkAuth');

let router = express.Router();

//post request to make a purchase
router.post('/purchase',[
    check('cost').isNumeric().notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('numberOfProducts').isNumeric().notEmpty(),
    check('location').isString().notEmpty(),
    check('phoneNumber').isNumeric().notEmpty(),
    check('items').isArray().notEmpty()
],requestController.purchaseItems);

//ok here
router.use(checkAuth);

//get request for all requests
router.get('/',requestController.getRequests);

//editing a request
router.patch('/edit/:reqId',requestController.editRequest);

//deleting requests
router.delete('/:pid',requestController.deleteRequest);

module.exports = router;

