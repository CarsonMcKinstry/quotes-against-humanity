const BlackCard = require("../models/blackCard");
const WhiteCard = require("../models/whiteCard");
const _ = require("lodash");

module.exports.getFullText = (req, res) => {
  BlackCard.aggregate([{ $sample: { size: 1 } }], (err, blackCard) => {
    if (err) return res.status(500).send({ error: "Internal Server Error" });
    const pick = blackCard[0].pick;
    const question = blackCard[0].text.split("_").map(text => text);
    WhiteCard.aggregate([{ $sample: { size: pick } }], (err, whiteCards) => {
      if (err) return res.status(500).send({ error: "Internal Server Error" });
      const fullText = [];
      question.forEach((o, i) => {
        if (_.endsWith(o, "?") && whiteCards[i]) {
          o = o + " ";
          fullText.push(o);
          fullText.push(whiteCards[i].text);
        } else {
          fullText.push(o);
          if (whiteCards[i]) {
            let answer = whiteCards[i].text.replace(/\.$/g, "");
            answer = answer.charAt(0).toLowerCase() + answer.slice(1);
            fullText.push(answer);
          }
        }
      });

      let answer = fullText.join("");
      answer = answer.replace(/\<\/?(br|i)\>|\&(reg|trade)\;/g, " ").trim();
      if (answer.charAt(0).toLowerCase()) {
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);
      }
      if (
        !_.endsWith(answer, ".") &&
        !_.endsWith(answer, "!") &&
        !_.endsWith(answer, "?") &&
        !_.endsWith(answer, '"')
      ) {
        answer = answer + ".";
      }
      res.json({
        answer: answer,
        blackCard: blackCard,
        whiteCards: whiteCards
      });
    });
  });
};

module.exports.getWhiteCards = (req, res) => {
  let pick = _.chain(req.query)
    .get("pick")
    .toNumber()
    .value();

  if (!pick) return res.status(400).send({ error: "Bad Request" });
  if (pick > 3)
    return res
      .status(400)
      .send({ error: "Bad request", message: "Too many cards requested" });
  WhiteCard.aggregate([{ $sample: { size: pick } }], (err, whitecards) => {
    if (err) return res.status(500).send({ error: "Internal Server Error" });

    return res.json(whitecards);
  });
};

module.exports.getBlackCard = (req, res) => {
  BlackCard.aggregate([{ $sample: { size: 1 } }], (err, blackcard) => {
    if (err) return res.status(500).send({ error: "Internal Server Error" });

    return res.json(blackcard);
  });
};
