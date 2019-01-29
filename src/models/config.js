function ConfigModel(mongoose) {
  const Config = mongoose.model("Config", { failtureThreshold: Number });

  return Config;
}

export default ConfigModel;
