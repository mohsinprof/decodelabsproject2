import { Router } from "express";
import { validateCreateTask } from "../validators/task.js";

const router = Router();

let tasks = [
  { id: "1", title: "Build GET /tasks endpoint", priority: "high", done: false },
  { id: "2", title: "Add validation for POST /tasks", priority: "medium", done: false },
];

router.get("/", (req, res) => {
  res.json({ data: tasks });
});

router.post("/", validateCreateTask, (req, res) => {
  const { title, priority } = req.body;

  const newTask = {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    done: false,
  };

  tasks.unshift(newTask);
  res.status(201).json({ message: "Task created", data: newTask });
});

router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ data: task });
});

router.put("/:id", validateCreateTask, (req, res) => {
  const { title, priority } = req.body;
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  const updated = { ...tasks[idx], title: title.trim(), priority };
  tasks[idx] = updated;
  res.json({ message: "Task updated", data: updated });
});

router.delete("/:id", (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = tasks.splice(idx, 1)[0];
  res.json({ message: "Task deleted", data: deleted });
});

export default router;