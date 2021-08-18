const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Use instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },

  // use callback function instance methods
  findActiveCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "inactive" }, cb);
  },
};
module.exports = todoSchema;
