function TaskModel(mongoose) {
  const Task = mongoose.model("Task", {
    name: String,
    type: String,
    data: Object,
    lastModifiedBy: String,
    nextRunAt: Date,
    priority: Number,
    repeatInterval: String,
    repeatTimezone: String,
    pings: Array
  });

  return Task;
}

export default TaskModel;
