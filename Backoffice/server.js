const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDB = require("./Helpers/DBHelper/ConnectMongoDB");
const categoryRoutes = require("./routes/CategoryRoutes");


const app = express();

//env kullan
dotenv.config();
//db baglan
ConnectDB(process.env.DB_CONNECTION_STRING, process.env.PORT, app);

//!middlewears
//gelen isteklerin gövdesindeki JSON verilerini okuyabilmek. (body verileri)
app.use(express.json());
//tüm isteklere CORS yanıtlarını etkinleştirir yani tüm isteklerin izin verildiği anlamına gelir. (gelen isteklerin izinlerini kontrol etmek için.)
app.use(cors());


//!routes
app.use("/api/categories", categoryRoutes);


