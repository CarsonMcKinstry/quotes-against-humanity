const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3030;
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const connectionString = `mongodb://${process.env.MONGODB_USER}:${process.env
  .MONGODB_PASS}@${process.env.MONGODB_URI}`;

mongoose.connect(connectionString, { useMongoClient: true });

app.use(express.static(path.resolve(__dirname, "../build/")));
app.use(cors());

require("./routes/")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
