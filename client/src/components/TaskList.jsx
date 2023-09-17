// TaskList.js
import React, { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onToggleComplete, onUpdateTask }) {
  const [editedTask, setEditedTask] = useState({ id: null, title: '' });

  const handleEditClick = (task) => {
    setEditedTask({ id: task.id, title: task.title });
  };

  const handleUpdateTask = () => {
    onUpdateTask(editedTask.id, editedTask.title);
    setEditedTask({ id: null, title: '' });
  };

  return (
    <ul className="task-list">
    {tasks.map((task) => (
      <li key={task.id}>
        {task.id === editedTask.id ? (
          <div className="edit-task">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
            <button className="update-button" onClick={handleUpdateTask}>
              Update
            </button>
          </div>
        ) : (
          <div className={`task ${task.completed ? 'completed' : ''}`}>
            <span>{task.title}</span>
            <input
              type="checkbox"
              
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <button className="delete-button" onClick={() => onDeleteTask(task.id)}>
              Delete
            </button>
            <button className="edit-button" onClick={() => handleEditClick(task)}>
              Edit
            </button>
          </div>
        )}
      </li>
    ))}
  </ul>

  );
}

export default TaskList;
