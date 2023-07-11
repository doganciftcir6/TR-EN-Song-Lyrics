const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDB = require("./Helpers/DBHelper/ConnectMongoDB");
const categoryRoutes = require("./routes/CategoryRoutes");
const songRoutes = require("./routes/SongRoutes");
const genderRoutes = require("./routes/GenderRoutes");
const roleRotues = require("./routes/RoleRoutes");
const songCategoryRoutes = require("./routes/SongCategoryRoutes");
const userRoutes = require("./routes/UserRoutes");
const userRoleRoutes = require("./routes/UserRoleRoutes");
const favoriteRoutes = require("./routes/FavoriteRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const artistRoutes = require("./routes/ArtistRoutes");
const songArtistRoutes = require("./routes/SongArtistRoutes");


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
//static dosyaları programa tanıtmak ve çalıştırabilmek için middlewear
app.use(express.static("public"));
//upload için dosya yolu middleware'ini kullan
app.use("/uploads", express.static("uploads"));


//!routes
app.use("/api/categories", categoryRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/genders", genderRoutes);
app.use("/api/roles", roleRotues);
app.use("/api/songcategories", songCategoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userroles", userRoleRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/songartists", songArtistRoutes);
