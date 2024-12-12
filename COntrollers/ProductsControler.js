const User = require("../Schema/SignupLoginSchema");

const ProductsController = {
    getCategory: async (req, res) => {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');
            if (!response.ok) {
                return res.status(400).send({ message: 'Category fetching error', error: response.statusText });
            }

            const categories = await response.json();
            res.status(200).send({ allCategories: categories });
        } catch (error) {

            res.status(500).send({ message: 'Server error', error });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const allProducts = await fetch('https://dummyjson.com/products');
            if (!allProducts.ok) {
                return res.status(400).send({ message: 'Category fetching error', error: response.statusText });
            }

            const alproducts = await allProducts.json();
            res.status(200).send({ alproducts });

        } catch (er) { throw er }

    },
    getSingleProduct: async (req, res) => {
        const productid = req.params.id;
        try {
            const product = await fetch(`https://dummyjson.com/products/${productid}`);
            if (!product) {
                res.status(400).send({ message: "Product fetching eror" })
            } else {
                const prodct = await product.json();
                res.status(201).send({ product: prodct })
            }
        } catch (er) { throw er }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const categoryName = req.params.name;
            const products = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
            if (!products) {
                res.status(401).send({ message: 'Fetching eror' })
            } else {
                const fnal = await products.json()
                res.status(200).send(fnal);
            }
        } catch (er) { throw er }
    },

    searchProduct: async (req, res) => {
        const querry = req.params.querry
        try {
            const val = await fetch(`https://dummyjson.com/products/search?q=${querry}`)

            if (!val) {
                res.status(401).send({ message: "fetching eror" })
            } else {
                const fnal = await val.json();
                res.status(200).send({ prodyct: fnal })
            }



        } catch (er) { throw er }
    },

    addtoCart: async (req, res) => {
        try {
            const id = req.params.id;
            const finduser = await User.findById({ _id: id });
            if (!finduser) {
                return res.status(401).send({ message: 'User does not exist' });
            }
            console.log(req.body);
            console.log(finduser.cart);


            const productExists = finduser.cart.some(product =>
                product.productId == req.body.productId
            )

            if (productExists) {
                return res.status(400).send({ message: 'Product already in cart' });
            }

            await User.updateOne(
                { _id: id },
                { $push: { cart: req.body } }
            );
            return res.status(200).send({ message: 'Product successfully added to cart' });

        } catch (er) {
            console.error(er);
            return res.status(500).send({ message: 'An error occurred', error: er });
        }
    },

    getcartdata:async(req,res)=>{
        try{
            const userid = req.params.id;
          const user =  await User.findById({_id:userid});
          if(!user){
            res.status(401).send({message:'first login'})
          }else{
            res.status(200).send({products:user.cart})
          }

        }catch(er){throw er}

    },

    increaseOrderQuantity: async (req, res) => {
        try {
            const { userid, productid } = req.params;
            
           
            const userExist = await User.findById(userid);
            if (!userExist) {
                return res.status(404).send({ message: 'User not found' });
            }
            const productInCart = userExist.cart.find(item => item._id == productid);
            productInCart.quentity = req.body.quentity;
            await userExist.save().then(()=>{
                res.status(200).send({message:'updated'})
            })

    
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    deletProuct:async(req,res)=>{
        try{
            const {userid,objectid} =req.params;
            const finduser = await User.findById({_id:userid});
            if(!finduser){
                res.status(404).send({message:'user not found'})
            }else{
                const findndex = finduser.cart.findIndex(item=>item._id == objectid);
                finduser.cart.splice(findndex,1)
                await finduser.save().then(()=>{
                    res.status(200).send({message:"poduct is deleted"})
                })
            }

        }catch(er){throw er}
    }
    


};

module.exports = ProductsController