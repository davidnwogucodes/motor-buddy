const mongoose = require("mongoose");

const MechSchema = new mongoose.Schema({
  nameOfMech: String,
  issueSpec: String,
  contact: Number,
});

const Mech = mongoose.model("Mech", MechSchema);

module.exports = Mech;
