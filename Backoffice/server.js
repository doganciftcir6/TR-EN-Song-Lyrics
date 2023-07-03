const express = require("express");

const app = express();

const port = 5000;

app.get("/", (req,res) => {
    res.send("Selamlar");
});

app.listen(port, () => {
    console.log(`${port} Portlu Server Ayaga Kalkmis Durumda...`);
});