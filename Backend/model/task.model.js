const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  categoryName: String,
  taskName: String,
  description: String,
  startDate: Date,
  endDate: Date,
  startTime: String,
  endTime: String,
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
