const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["done", "not done"],
    default: "not done",
  },
});

const todosModel = mongoose.model("todo", todoSchema);

module.exports = todosModel;
