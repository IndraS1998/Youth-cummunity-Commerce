let express = require('express');
let {check} = require('express-validator');

let itemControllers = require('../controllers/store-controller');
let upload = require('../middleware/fileUpload');
let checkAuth = require('../middleware/checkAuth');

let router = express.Router();

//get request to send all the products
router.get('/',itemControllers.getItems);

//ok here
router.use(checkAuth);

//methods performed only by admin
//post request to create a new item
router.post('/new_product',upload.single('image'),[
    check('name').notEmpty().isString(),
    check('description').notEmpty().isString(),
    check('category').notEmpty().isString(),
    check('price').notEmpty().isString()
],itemControllers.createItem);
//patch request to update an item
router.patch('/edit/:pid',[
    check('description').notEmpty().isString(),
    check('price').isNumeric().notEmpty()
],itemControllers.updateItem);
//delete request to update an item
router.delete('/:pid',itemControllers.deleteItem);

module.exports = router;
