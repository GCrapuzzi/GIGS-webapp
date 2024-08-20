const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("./utils/generateToken");

const login = async (req, res) => {
  const { number, otp } = req.body;
  if (!(number && otp)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(otp, user.otp)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    domain: process.env.frontend_url, // Set your domain here
    path: "/", // Cookie is accessible from all paths
    expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true, // Cookie will only be sent over HTTPS
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });

  res.json({ token });
};
module.exports = login;