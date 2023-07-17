

//!SignUp
module.exports.SignUp = async (req, res) => {
    const {email,password} = req.body;
    res.send("Yeni kullanici");
}

//!Login
module.exports.Login = async (req, res) => {
    const {email,password} = req.body;
    res.send("Kullanici giris");
}
