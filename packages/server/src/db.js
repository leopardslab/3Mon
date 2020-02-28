const mongoose = require("mongoose");
import config from "./config.json";

export default callback => {
  mongoose.connect(
    process.env.MONGO_CONNECTION_URL || config.mongoConnectionString,
    { useNewUrlParser: true }
  );
  callback(mongoose);
};
