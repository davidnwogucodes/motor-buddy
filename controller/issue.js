const Mech = require("../models/issue.models");

module.exports = {
  mechanic: async (req, res) => {
    try {
      const { nameOfMech, issueSpec, contact } = req.body;
      if (!nameOfMech || !issueSpec || !contact) {
        return res.status("401").json({
            status:false,
          message: "please input fields",
        });
      }
      let mechanic = await Mech.findOne({ nameOfMech });
      if (mechanic) {
        return res.status(400).json({
            status:false,
          message: "user already exists",
        });
      }

      mechanic = new Mech({
        nameOfMech,
        issueSpec,
        contact,
      });
      const isSaved = await mechanic.save();
      if (!isSaved) {
        throw new Error("could not save new mechanic");
      }
      res.json({
        message: "saved new mechanic",
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  Issues: async (req, res) => {
    try {
      const { name, issue } = req.body;
      if (!name || !issue) {
        return res.json({ message: "please input fields" });
      }
      const issueMech = await Mech.find({ issueSpec: issue });
      if (!issueMech) {
        return res.json({
          message: "Could not find a mechanic that solves this problem",
        });
      }
      return res.json({ issueMech });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
