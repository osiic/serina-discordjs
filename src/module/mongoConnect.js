const mongoose = require("mongoose");

async function mongoConnect(params) {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log(err));
}

module.exports = {
  mongoConnect,
};
