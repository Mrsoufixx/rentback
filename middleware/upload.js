  const multer = require('multer');
  const path = require('path');

  // Set storage engine
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Set the filename to be unique by appending the current timestamp
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // Initialize the upload middleware
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5 // Set the file size limit (e.g., 5MB)
    },
    fileFilter: function (req, file, cb) {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });

  module.exports = upload;
