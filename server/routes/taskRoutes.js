// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskControllers');

// Get all tasks
router.get('/tasks', taskController.getTasks);

// Create a new task
router.post('/tasks', taskController.createTask);

router.put('/tasks/:id', taskController.updateTask);

// Update a task's title by ID
router.put('/tasks/:id', taskController.updateTaskTitle);


// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
