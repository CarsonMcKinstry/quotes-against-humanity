const BlackCard = require("../models/blackCard");
const WhiteCard = require("../models/whiteCard");
const _ = require("lodash");

module.exports = app => {
  app.get("/api/build", (req, res) => {
    BlackCard.aggregate([{ $sample: { size: 1 } }], (err, blackCard) => {
      if (err) res.status(403).send(err);
      const pick = blackCard[0].pick;
      const question = blackCard[0].text.split("_").map(text => text);
      WhiteCard.aggregate([{ $sample: { size: pick } }], (err, whiteCards) => {
        if (err) res.status(403).send(err);
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
          blackCard: blackCard[0],
          whiteCards: whiteCards
        });
      });
    });
  });
};
