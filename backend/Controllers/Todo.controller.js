import { Todo } from "../Models/Todo.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/Apiresponse.js";
import { User } from "../Models/User.model.js";



const addTodo = asyncHandler(async (req, res) => {
  const { userId, msg } = req.body;
  if (!userId || !msg) {
    res.status(400).json({ message: "Some fields are missing" });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const newTodo = await Todo.create({ user: userId, msg });

  res.status(201).json({ todo: newTodo, message: "Todo added successfully" });
});



const updateTodo = asyncHandler(async (req, res) => {
  const { id, msg } = req.body;

  if (!id || !msg) {
    res.status(400).json({ message: "ID and message are required" });
    return;
  }

  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  todo.msg = msg;
  await todo.save();
  res.status(200).json({ message: "Todo updated successfully", todo });
});



const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Some fields are missing" });
    return;
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }
  await Todo.updateOne({ _id: id }, { $set: { toggle: !todo.toggle } });
  res.status(200).json({ message: "Todo toggled successfully" });
});


const getTodos = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  const todos = await Todo.find({ user: userId }).select("-user");

  if (!todos.length) {
    res.status(200).json({ todos: [], message: "No todos found for this user" });
  } else {
    res.status(200).json({ todos });
  }
});





const deleteTodo = asyncHandler(async (req, res) => {

  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "Some fields are missing" });
    return;
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  await Todo.deleteOne({ _id: id });
  res.status(200).json(new ApiResponse(200, null, "Todo deleted successfully"));
});


export { addTodo, updateTodo, deleteTodo, toggleTodo, getTodos };
