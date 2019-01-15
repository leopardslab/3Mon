import mongoose from "mongoose";
import taskModel from "./tasks";
import pingModel from "./http";

export default {
  taskModel: taskModel(mongoose),
  pingModel: pingModel(mongoose)
};
