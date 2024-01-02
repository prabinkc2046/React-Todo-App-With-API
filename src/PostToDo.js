import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Form from './Form';
import ListTask from './ListTask';

export default function PostToDo() {
    const [isListUpdated, setIsListUpdated] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const taskNameRef = useRef();

    const postTask = async (newTask) => {
        try {
            const endpoint = "http://192.168.0.112:5000/todos";
            const response = await axios.post(endpoint, newTask, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status){
                console.log("Task is being added");
                setIsListUpdated(!isListUpdated);

            }
            
        } catch (error){
            console.error(error)
        }
        
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const task_name = taskNameRef.current.value;
        const newTask = {
            task_name: task_name
        };
        taskNameRef.current.value = null;
        postTask(newTask);
    };

    const fetchTask = async () => {
        const endpoint = "http://192.168.0.112:5000/todos";
        const response = await axios.get(endpoint);
        const newTaskList = response.data.tasks;
        setTaskList(newTaskList);
      };
    
    const updateTask = async (id, updatedTask) => {
        const endpoint = `http://192.168.0.112:5000/todos/${id}`;
        const response = await axios.put(endpoint, updatedTask, {
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200){
            console.log("data is updated successfully.");
            setIsChecked(!isChecked);
        }
    }
    
    const handleTaskCompleteStatus = (id) => {
        taskList.map((task) => {
            if (task.task_id === id){
                // const taskIndex = taskList.findIndex(task => task.task_id === id);
                // const updatedTaskList = [...taskList];
                // updatedTaskList[taskIndex] = {...updatedTaskList[taskIndex], completed: !task.completed}
                // setTaskList(updatedTaskList);
                const updatedTask = {...task, completed: !task.completed}
                console.log("checked status before click is", isChecked);
                updateTask(task.task_id, updatedTask);
                console.log("checked status after click is", isChecked)
            }
        })
    };
    
  return (
    <>
    <Form onSubmit={handleSubmitForm} 
    taskNameRef={taskNameRef}/> 
    
    <p></p>

    <ListTask updateList={isListUpdated}
    fetchTask={fetchTask}
    taskList={taskList}
    completed={completed}
    handleTaskCompleteStatus={handleTaskCompleteStatus}
    checked={isChecked}
    />
    </>
  );
};