const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/totoSchema");
const userSchema = require("../schema/userSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middleware/checkLogin");

//Get active todo using instance methods
router.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Using active todo using callback instance methods
router.get("/active-callback", (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    }
  });
});

//GET ACTIVE TODO USING STATIC METHODS
router.get("/js", async (req, res) => {
  try {
    const data = await Todo.findByJS();
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side errors",
    });
  }
});

//GET ACTIVE TODO USING query helpers
router.get("/language", async (req, res) => {
  try {
    const data = await Todo.find().byLanguages("react");
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side errors",
    });
  }
});

// GET ALL THE TODO
router.get("/", checkLogin, async (req, res) => {
  // use async await to get data
  try {
    const data = await Todo.find({}).populate("user", "name username");
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// GET A TODO by ID
router.get("/:id", (req, res) => {
  // callback to get data from servers
  Todo.find({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    }
  });
});

// POST A TODO
router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.userId,
  });
  try {
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );
    res.status(200).json({ message: "Todo was inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error" });
  }
});

// POST MULTIPLE TODO
router.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({ message: "Todos were inserted successfully" });
    }
  });
});

// PUT TODO
router.put("/:id", (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({ error: "There was a server side error" });
      } else {
        res.status(200).json({ message: "Todos were updated successfully" });
      }
    }
  );
});

// DELETE TODO
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({ message: "Todos were Deleted successfully" });
    }
  });
});

module.exports = router;
