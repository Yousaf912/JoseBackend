require('dotenv').config()
const express = require("express");
const { default: mongoose } = require('mongoose');
const router = require('./Routes/Routes');
const App = express();
const port = process.env.PORT;
const cors = require("cors");
const deployurl ='https://josemart.vercel.app';





const corsOptions = {
    origin: deployurl, 
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    preflightContinue: false,
    optionsSuccessStatus: 204
};

App.use(cors(corsOptions));

App.use(express.json())
App.use('/',router)

mongoose.connect('mongodb+srv://JoseMart:josemart364855@cluster0.7xkhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('mongodb is connect');
    App.listen(port, () => {
        console.log(`server is running on this port ${port}`);
        
    })
}).catch((er) => {
    console.log(er);
})