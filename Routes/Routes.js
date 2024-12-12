const express = require("express");
const SignupLoginCOntroller = require("../COntrollers/SignupLoginController");
const ProductsController = require("../COntrollers/ProductsControler");
const router = express.Router();

router.post('/signup',SignupLoginCOntroller.signup);
router.post('/login',SignupLoginCOntroller.login);
router.get('/check',SignupLoginCOntroller.autenticate ,SignupLoginCOntroller.home);
router.get('/getcatagory',ProductsController.getCategory);
router.get('/getallproducts',ProductsController.getAllProducts);
router.get('/getproduct/:id',ProductsController.getSingleProduct);
router.get('/getproductbycategory/:name',ProductsController.getProductsByCategory);
router.get('/searchproduct/:querry',ProductsController.searchProduct);
router.put('/addproduct/:id',ProductsController.addtoCart);
router.get('/getcartdata/:id',ProductsController.getcartdata)
router.put('/increase/:userid/:productid',ProductsController.increaseOrderQuantity)
router.delete('/delete/:userid/:objectid',ProductsController.deletProuct)


module.exports = router;