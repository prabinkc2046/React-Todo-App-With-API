import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Form from './Form';

export default function PostToDo() {

    const [task, setTask] = useState({});
    const taskIdRef = useRef();
    const taskNameRef = useRef();

    const postTask = async () => {
        try {
            const endpoint = "http://192.168.0.112:5000/todos";
            const response = await axios.post(endpoint, task, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status){
                console.log("Task is being added")
            }
            
        } catch (error){
            console.error(error)
        }
        
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const task_id = taskIdRef.current.value;
        const task_name = taskNameRef.current.value;
        const newTask = {
            task_id: task_id,
            task_name: task_name
        };
        taskIdRef.current.value = null;
        taskNameRef.current.value = null;
        setTask(newTask);
        postTask();
    }

  return (
    <Form
    onSubmit={handleSubmitForm}
    taskIdRef={taskIdRef}
    taskNameRef={taskNameRef}
    />
  );
};