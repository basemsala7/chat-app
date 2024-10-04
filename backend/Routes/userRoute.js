const express = require("express");
const router = express.Router();
const {
  registUser,
  loginUser,
  findUser,
  getUsers,
  getInfo,
} = require("../Controllers/userController");

router.post("/register", registUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.get("/info", getInfo);

module.exports = router;
