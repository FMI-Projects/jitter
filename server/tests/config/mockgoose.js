const mongoose = require("mongoose");

const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);

const prepareDatabase = async () => {
  await mockgoose.prepareStorage();
  await new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("connected", () => {
      resolve();
    });
  });
};

const resetDatabase = async () => {
    await mockgoose.helper.reset();
};

module.exports = {
    prepareDatabase,
    resetDatabase
};
