import mongoose from "mongoose";
import taskModel from "./tasks";
import httpModel from "./http";
import configModel from "./config";

export default {
  taskModel: taskModel(mongoose),
  httpModel: httpModel(mongoose),
  configModel: configModel(mongoose)
};
