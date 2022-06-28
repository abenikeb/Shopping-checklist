const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

// const dbUrl =
//   "mongodb+srv://abenik:FBc2MF4BS2wyI0W2@cluster0.x8nd1vz.mongodb.net/?retryWrites=true&w=majority";

// const dbUrl =
//   "mongodb://abenik:FBc2MF4BS2wyI0W2@ac-whyt8vq-shard-00-00.x8nd1vz.mongodb.net:27017,ac-whyt8vq-shard-00-01.x8nd1vz.mongodb.net:27017,ac-whyt8vq-shard-00-02.x8nd1vz.mongodb.net:27017/?ssl=true&replicaSet=atlas-o4xykg-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = function () {
  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
