// AddTask.js
import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    onAddTask(newTask);
    setNewTask('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
       <button className="add-button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}

export default AddTask;
