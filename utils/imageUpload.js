const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, res, cb) => {
    const [name, ext] = file.originalname.split('.');

    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

//create multer instance
const imageUpload = multer({ storage });
