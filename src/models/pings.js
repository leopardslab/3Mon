function PingModel(mongoose) {
  const Ping = mongoose.model("Ping", {
    headers: Array,
    body: String,
    statusCode: Number
  });

  return Ping;
}

export default PingModel;
