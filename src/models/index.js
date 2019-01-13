import mongoose from "mongoose";
import taskModel from "./tasks";
import pingModel from "./pings";

export default {
  taskModel: taskModel(mongoose),
  pingModel: pingModel(mongoose)
};
