const mongoose = require("mongoose");

function mongooseConnect(params) {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected!"));
}

module.exports = {
  mongooseConnect,
};
