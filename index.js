require('dotenv').config()
const express = require("express");
const { default: mongoose } = require('mongoose');
const router = require('./Routes/Routes');
const App = express();
const port = process.env.PORT;
const mongourl = process.env.MONGOURL;
const cors = require("cors");
const helmet = require("helmet");



let corsOption = {
    origin:'https://josemart.vercel.app',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}

App.use(cors(corsOption))
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://vercel.live"], 
            objectSrc: ["'none'"], 
            styleSrc: ["'self'", "'unsafe-inline'"],
        }
    }
}));
App.use(express.json())
App.use('/',router)

App.listen(port, () => {
    console.log(`server is running on this port ${port}`);
    mongoose.connect(mongourl).then(() => {
        console.log('mongodb is connect');
    }).catch((er) => {
        console.log(er);
    })
})