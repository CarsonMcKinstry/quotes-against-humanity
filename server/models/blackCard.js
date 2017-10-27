const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlackCard = new Schema({
  text: String,
  pick: Number
});

module.exports = mongoose.model("BlackCard", BlackCard);
