const jwt = require("jsonwebtoken");

function generateToken(user) {
  console.log(user);
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    "tokenpassword",
    {
      // expiresIn: "20m",
    }
  );
  const refreshToken = jwt.sign({ _id: user._id }, "tokenpassword", {
    // expiresIn: "60m",
  });

  return { token, refreshToken };
}
module.exports = generateToken;
