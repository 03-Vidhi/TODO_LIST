// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors'); 
const cron = require('node-cron'); 
const fs = require('fs');

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors()); 

// JSON file for storing tasks
const tasksFile = 'tasks.json';

// Read existing tasks from the JSON file
let tasks = [];
if (fs.existsSync(tasksFile)) {
  const data = fs.readFileSync(tasksFile, 'utf8');
  tasks = JSON.parse(data);
}

// Routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Cron job to delete completed tasks every day at midnight (0 0 * * *)
cron.schedule('0 0 * * *', () => {
  tasks = tasks.filter((task) => !task.completed);
  updateTasksFile();
  console.log('Cron job executed: Deleted completed tasks');
});

// Function to update the tasks JSON file
function updateTasksFile() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

module.exports = server;
