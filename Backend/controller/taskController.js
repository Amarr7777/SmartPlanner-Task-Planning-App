// taskController.js
const Task = require("../model/task.model");
const User = require("../model/UserDetails");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

exports.createTask = async (req, res) => {
  const {
    categoryName,
    taskName,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    token,
  } = req.body;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken._id;
    const task = await Task.create({
      categoryName,
      taskName,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
    });
    const userInfo = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: task._id } },
      { new: true }
    );
    res.send({ status: "ok", data: "task created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
};

exports.getAllTasks = async (req, res) => {
  const { token } = req.body;
  console.log("Token", token);
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken._id;
    const userInfo = await User.findById(userId).populate("tasks");
    res.send({ status: "ok", data: userInfo.tasks });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
};
