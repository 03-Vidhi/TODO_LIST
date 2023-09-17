import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddTask = (title) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error(error));
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Send a request to the backend to update the task's completed status
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: updatedTasks.find((task) => task.id === taskId).completed }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update task status');
        }
      })
      .catch((error) => console.error(error));
  };
  
  const handleUpdateTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    // Send a request to the backend to update the task's title
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
      })
      .catch((error) => console.error(error));
  };
  
  
  
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} 
      onDeleteTask={handleDeleteTask} 
      onToggleComplete= {handleToggleComplete}
      onUpdateTask= {handleUpdateTask} />
    </div>
  );
}

export default App;
