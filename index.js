require('dotenv').config()
const express = require("express");
const { default: mongoose } = require('mongoose');
const router = require('./Routes/Routes');
const App = express();
const port = process.env.PORT;
const mongourl = process.env.MONGOURL;
const cors = require("cors");




let corsOption = {
    origin:'https://josemart.vercel.app',
    methods:['POST','GET', 'PUT', 'DELETE'],
    credentials:true
}

App.use(cors(corsOption))
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