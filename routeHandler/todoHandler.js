const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/totoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODO
router.get("/", async (req, res) => {
  const allTodo = await Todo.find({ status: "inactive" });
  res.send(allTodo);
});

// GET A TODO by ID
router.get("/:id", async (req, res) => {});

// POST A TODO
router.post("/blog", async (req, res) => {
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
router.post("/all", async (req, res) => {});

// PUT TODO
router.put("/:id", async (req, res) => {});

// DELETE TODO
router.delete("/:id", async (req, res) => {});

module.exports = router;
