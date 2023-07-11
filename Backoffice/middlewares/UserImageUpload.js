const multer = require("multer");

//Dosya nereye kaydedilecek vs ismi vs ne olacak belirt.
const stroge = multer.diskStorage({
    destination: (req, file, cb) => {
        //Dosyayı artistimages klasörüne kaydedelim
        cb(null, "public/images/userimages/")
    },
    filename: (req, file, cb) => {
        //Dosya adını orjinal adıyla kaydedelim
        cb(null, Date.now()+file.originalname);
    },
});

//sadece resim uzantılı dosyaların upload edilmesini sağla
const imageExtFilter = (req, file, cb) => {
    const allowedExtensions = /(\.png|\.jpg|\.jpeg|\.gif)$/i;
    //const filetypes  = /jpeg|jpg|png|gif/; Bu kullanımda olabilirdi yine test ile kontrolü yapılarak.
    const whitelist = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp'
      ]
    const extension = allowedExtensions.test(file.originalname);
  
    if (extension && whitelist.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Invalid file type! Only PNG, JPG, and GIF image files are allowed.");
      error.status = 400;
      // hata yanıtını döndür
      return cb(error.message, false);
    }
  };
  

//Dosya yüklerken istenilen kontrolleri belirtebiliriz, upload nesnesini oluştur.
//5mb a kadar resim yüklenebilsin
const upload = multer({
    storage: stroge,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: imageExtFilter,
    //onError ile hatayı yönet
    onError: (err, next) => {
        next(err);
    },
});

module.exports = upload;