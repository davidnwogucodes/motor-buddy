// const Bcrypt = require("bcrypt")
const User = require("../models/user.models");

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status("401").json({
          success: false,
          message: "name, password, email are required",
        });
      }

      let user = await User.findOne({ email });

      if (user) {
        return res.status("400").json({
          success: false,
          message: "user already exists",
        });
      }

      // const hashedPassword = await Bcrypt.hash(password, 10);
      user = new User({
        name,
        email,
        password,
      });

      const isSaved = await user.save();
      if (!isSaved) {
        throw new Error("could not save user credentials");
      }
      res.json({
        success: true,
        message: "user saved successfully",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("invalid input");
      }

      const user = await User.findOne({ email });

      if (!user) {
        res.send("user does not exist");
      }
      const isMatchedPassword = await Bcrypt.compare(password, user.password);
      if (isMatchedPassword) {
        return res.status("401").json({ message: "wrong password" });
      }
      req.session.user = {
        Id: user._Id,
        usename: user.name,
      };
      console.log(req.session);

      res.json({
        success: "true",
        message: "user logged in successfully",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
