const allowedPriorities = new Set(["low", "medium", "high"]);

export function validateCreateTask(req, res, next) {
  const { title, priority } = req.body;

  const errors = [];

  if (typeof title !== "string" || title.trim().length < 3) {
    errors.push("title must be a string with at least 3 characters");
  }

  if (!allowedPriorities.has(priority)) {
    errors.push("priority must be one of: low, medium, high");
  }

  if (errors.length) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }

  next();
}