const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../util/validations");
const generateToken = require("../util/generateTokens");
const jwt = require("jsonwebtoken");

const getInfo = async (req, res) => {
  const authHeader = req.headers["authorization"]; // Extract token from Authorization header
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  console.log(token, " the token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, "tokenpassword", async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired." });
      }
      return res.status(400).json({ message: "Invalid token." });
    }
    const userId = decoded.useId;
    const user = await userModel.find({ userId });

    res.json(user);
  });
};

async function registUser(req, res) {
  const { name, email, password } = await req.body;

  let user = await userModel.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ message: "user with this email is already exist " });
    }

    if (!name && !email && !password) {
      return res.status(400).json({ message: "all failds are require" });
    }

    const { error } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // set user in database
    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return res.status(200).json({ message: "Registeration is succesful  " });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

const loginUser = async (req, res) => {
  const { email, password } = await req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email or password " });
    }
    const { name, _id } = user;

    const isValidPasswor = await bcrypt.compare(password, user.password);
    if (!isValidPasswor) {
      return res.status(400).json({ message: "invalid Password" });
    }
    //  generte token
    const { token, refreshToken } = generateToken(user);
    return res.status(200).json({
      message: "login Sucsess",
      data: { token, refreshToken, name, email, _id },
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const findUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = { registUser, loginUser, findUser, getUsers, getInfo };
