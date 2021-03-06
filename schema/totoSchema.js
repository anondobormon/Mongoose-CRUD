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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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

// Use static methods
todoSchema.statics = {
  findByJS: function () {
    return this.find({ title: /js/i });
  },
};

// Use query methods
todoSchema.query = {
  byLanguages: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
