import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function ListTask({updateList, fetchTask, handleTaskCompleteStatus, checked, completedTask, incompletedTask, handleCompletedTask, handleDeleteTask}) {
  const [xCordinate, setXCordinate] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  useEffect(() => {
    fetchTask();
  },[updateList]);

  useEffect(() => {
    fetchTask();
  },[checked]);

  
  return (
  <>
    {incompletedTask.map(task => (
      <button key={task.task_id} onClick={() => handleTaskCompleteStatus(task.task_id)}>
        {task.task_name}
      </button>
    ))}

    <div>
      <h2>Completed task</h2>
      {completedTask.map((task) => (
        
          <div key={task.task_id}>
              <button  
              style={{ textDecoration: 'line-through'}}
              onClick={() => handleCompletedTask(task.task_id)}
              >
              {task.task_name}
            </button>

            <button 
            onClick={() => handleDeleteTask(task.task_id)}
            >
            <FontAwesomeIcon icon={faTrash} />
            </button>
            <br/>
        </div>
      )
      )}
    </div>
    
  </>  
  )
};
