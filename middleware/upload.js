const multer = require('multer');

const upload = multer({
    limits: { fileSize: 500000 }, // 500 KB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('File must be an image'));
    }
});

module.exports = upload;