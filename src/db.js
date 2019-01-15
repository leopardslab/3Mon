const mongoose = require("mongoose");

export default callback => {
  mongoose.connect(
    process.env.MONGO_CONNECTION_URL,
    { useNewUrlParser: true }
  );
  callback(mongoose);
};
