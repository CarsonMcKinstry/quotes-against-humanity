const jsonfile = require("jsonfile");
const mongoose = require("mongoose");
const connectString = `mongodb://${process.env.MONGODB_USER}:${process.env
  .MONGODB_PASS}@${process.env.MONGODB_URI}`;

mongoose.connect(connectString, {
  useMongoClient: true
});

const BlackCard = mongoose.model("BlackCard", {
  text: String,
  pick: Number
});

const WhiteCard = mongoose.model("WhiteCard", {
  text: String
});

const handleDeleteCallback = (err, data) => {
  if (err) return err;
  console.log(data.result.n);
};

BlackCard.remove(handleDeleteCallback);
WhiteCard.remove(handleDeleteCallback);

const blackCards = jsonfile.readFileSync("./black-cards.json");

const whiteCards = jsonfile.readFileSync("./white-cards.json");

const mappedWhiteCards = whiteCards.map(card => ({
  text: card
}));

BlackCard.insertMany(blackCards)
  .then(docs => console.log(docs))
  .catch(err => console.log(err));

WhiteCard.insertMany(mappedWhiteCards)
  .then(docs => console.log(docs))
  .catch(err => console.log(err));
