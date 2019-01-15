function HttpModel(mongoose) {
  const Http = mongoose.model("Http", {
    headers: {},
    body: String,
    statusCode: Number
  });

  return Http;
}

export default HttpModel;
