import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { v4 as uuidv4 } from 'uuid';
export default function ListTask({updateList, fetchTask, taskList, completed, handleTaskCompleteStatus, checked}) {
  useEffect(() => {
    fetchTask();
  },[updateList]);

  useEffect(() => {
    fetchTask();
  },[checked]);
  
  return (
  <>
    {taskList.map(task => (
      <button key={task.task_id}>
        <input
        onChange={() => handleTaskCompleteStatus(task.task_id)}
        type='checkbox'
        checked={task.completed}
        />
        {task.task_name}
      </button>
    ))}
    
  </>  
  )
}
