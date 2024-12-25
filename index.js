require('dotenv').config()
const express = require("express");
const { default: mongoose } = require('mongoose');
const router = require('./Routes/Routes');
const App = express();
const port = process.env.PORT;
const mongourl = process.env.MONGO_URL;
const cors = require("cors");
const deployurl ='https://josemart.vercel.app';
const localurl = 'http://localhost:5173'




const corsOptions = {
    origin: deployurl,
    methods: ['POST','GET',  'PUT', 'DELETE'],
    credentials:true
};

App.use(cors(corsOptions));

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