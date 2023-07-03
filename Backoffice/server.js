const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app = express();

//env kullan
dotenv.config();
//db baglan
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`${process.env.PORT} Portlu Server Ayaga Kalkmis Durumda ve DB Baglantisi Basirili...`);
        });
    }).catch((err) => console.log(err));

//routes


