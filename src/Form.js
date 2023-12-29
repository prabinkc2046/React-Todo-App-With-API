import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function 
({onSubmit, taskIdRef, taskNameRef}) {
  return (
    <form onSubmit={onSubmit} className="row g-3">
  <div className="col-12">
    <label htmlFor="inputTaskId" className="form-label">Task ID</label>
    <input  ref={taskIdRef}type="number" className="form-control" id="inputTaskId" placeholder="Task ID eg: 1" required/>
  </div>
  <div className="col-12">
    <label htmlFor="inputTaskName" className="form-label">Task Name</label>
    <input ref={taskNameRef} type="text" className="form-control" id="inputTaskName" placeholder="Task name eg: buy milk" required/>
  </div>

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Add new task</button>
  </div>
</form>
  )
}
