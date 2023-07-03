const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ConnectDB = require("./Helpers/DBHelper/ConnectMongoDB");


const app = express();

//env kullan
dotenv.config();
//db baglan
ConnectDB(process.env.DB_CONNECTION_STRING, process.env.PORT, app);


//routes



