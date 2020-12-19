const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const ImageUploadController = require("../controllers/ImageUploadController");
const { getInstance } = require("../shared/sharedFunctions.js");
const { verifyToken, HasRole } = require("../middlewares/Auth");

// Get base url
const baseURL =
  process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

// File upload logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    let id = req.query.id;
    let type = req.query.type;
    if (!id && !type) {
      id = req.user._id
      type = req.user.__userType
    }

    // Get user instance for model
    const Instance = getInstance(type)
    if(!Instance){
      return cb(new Error("No such user found"));
    }
    // Get user from database
    Instance.findOne({ _id: id }, (err, User) => {
      if (err) {
        return cb(new Error("Error While getting User"));
      }
      if (!User) {
        return cb(new Error("User not found"));
      }
      //   Set file to be uploaded
      const fileName = id + "_profile" + path.extname(file.originalname);
      //   Save file path in database
      User.profilePicture = `${baseURL}/assets/images/${fileName}`;
      User.save();

      cb(null, fileName);
    });
  },
});
// file filter to check format
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    return cb(new Error("Invalid file format"));
  }
};

// Upload file middleware 
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000 * 1000 * 5 }, // Maximum file size to be upload 5MB
});
/*
 * POST
 */
router.post("/uploadPic", verifyToken, HasRole(['Admin', 'Clinic', 'Client', 'Doctor']), upload.single("profilePic"), (req, res) => {
  ImageUploadController.upload(req, res);
});

module.exports = router;
