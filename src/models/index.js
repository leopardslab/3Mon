import mongoose from "mongoose";
import taskModel from "./tasks";
import httpModel from "./http";

export default {
  taskModel: taskModel(mongoose),
  httpModel: httpModel(mongoose)
};
