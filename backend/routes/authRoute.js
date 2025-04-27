const express = require("express");
const router = express.Router();
const {registerUserCtrl, loginUserCtrl} = require("../controllers/authControllers");
// /api/auth/signup
router.post("/signup", registerUserCtrl);

// /api/auth/login
router.post("/login", loginUserCtrl);



module.exports = router