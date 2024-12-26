require('dotenv').config()
const express = require("express");
const { default: mongoose } = require('mongoose');
const router = require('./Routes/Routes');
const App = express();
const port = process.env.PORT;
const cors = require("cors");
const deployurl ='https://josemart.vercel.app';
const mongourl = process.env.MONGO_URL;




const corsOptions = {
    origin: deployurl, 
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
   
};

App.use(cors(corsOptions));

App.use(express.json())
App.use('/',router)

mongoose.connect(mongourl).then(() => {
    console.log('mongodb is connect');
    App.listen(port, () => {
        console.log(`server is running on this port ${port}`);
        
    })
}).catch((er) => {
    console.log(er);
})