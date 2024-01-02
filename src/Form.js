import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function 
({onSubmit, taskIdRef, taskNameRef}) {
  return (
  <form onSubmit={onSubmit} className="row g-3">
    <div className="col-12">
      <label htmlFor="inputTaskName" className="form-label">Task</label>
      <input ref={taskNameRef} type="text" className="form-control" id="inputTaskName" placeholder="type your task" required/>
    </div>

    <div className="col-12">
    <button  type="submit" className="btn btn-secondary">Add new task</button>
    </div>
</form>

  )
}
