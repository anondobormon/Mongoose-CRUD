const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/totoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

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

// GET ALL THE TODO
router.get("/", async (req, res) => {
  // use async await to get data
  try {
    const data = await Todo.find({ status: "inactive" });
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
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({ message: "Todo was inserted successfully" });
    }
  });
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
