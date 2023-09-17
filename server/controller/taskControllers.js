// controllers/taskController.js
const fs = require('fs');
const tasksFile = 'tasks.json';

// Read existing tasks from the JSON file
let tasks = [];
if (fs.existsSync(tasksFile)) {
  const data = fs.readFileSync(tasksFile, 'utf8');
  tasks = JSON.parse(data);
}

// Get all tasks
exports.getTasks = (req, res) => {
  res.json(tasks);
};

// Create a new task
exports.createTask = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  updateTasksFile();
  res.status(201).json(newTask);
};

// Delete a task by ID
exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  updateTasksFile();
  res.sendStatus(204);
};

// Update a task's completed status by ID
exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;

  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = completed;
  updateTasksFile();
  res.json(task);
};

// Update a task's title by ID
exports.updateTaskTitle = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title } = req.body;

  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = title;
  updateTasksFile();
  res.json(task);
};


// Function to update the tasks JSON file
function updateTasksFile() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}
