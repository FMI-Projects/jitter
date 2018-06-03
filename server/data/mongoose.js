const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const mongooseUrl = process.env.MONGODB_URI;
module.exports = mongoose.connect(mongooseUrl);
