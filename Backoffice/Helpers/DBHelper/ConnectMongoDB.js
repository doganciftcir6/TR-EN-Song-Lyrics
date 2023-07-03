const mongoose = require("mongoose");

const ConnectDB = (connectionString, port, app) => {
    mongoose.connect(connectionString)
    .then(() => {
        app.listen(port, () => {
            console.log(`${port} Portlu Server Ayaga Kalkmis Durumda ve DB Baglantisi Basirili...`);
        });
    }).catch((err) => console.log(err));
}

module.exports = ConnectDB;

