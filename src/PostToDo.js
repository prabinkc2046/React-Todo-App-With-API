import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Form from './Form';
import ListTask from './ListTask';

export default function PostToDo() {
    const [completedTask, setCompletedTask] = useState([]);
    const [incompletedTask, setInCompletedTask] = useState([]);
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
                fetchTask();
            }
            
        } catch (error){
            console.error(error)
        }
        
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
    };

    const fetchTask = async () => {
        const endpoint = "http://192.168.0.112:5000/todos";
        const response = await axios.get(endpoint);
        const taskList = response.data.tasks;
        
        const incompletedTask = taskList.filter((task) => {
            return !task.completed
        });
        setInCompletedTask(incompletedTask.reverse());

        const completedTask = taskList.filter((task) => {
            return task.completed
        });
        setCompletedTask(completedTask.reverse());

      };
    
    const deleteTask = async (id) => {
        const endpoint = `http://192.168.0.112:5000/todos/${id}`;
        const response = await axios.delete(endpoint, {
            'headers': {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200){
            console.log("Task  is deleted successfully.");
            setIsChecked(!isChecked);
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

    const handleTaskCompleteStatus = (id) => {
        incompletedTask.map((task) => {
            if (task.task_id === id){
                // const taskIndex = taskList.findIndex(task => task.task_id === id);
                // const updatedTaskList = [...taskList];
                // updatedTaskList[taskIndex] = {...updatedTaskList[taskIndex], completed: !task.completed}
                // setTaskList(updatedTaskList);
                const updatedTask = {...task, completed: !task.completed};
                updateTask(task.task_id, updatedTask);
            }
        })
    };

    const handleCompletedTask = (id) => {
        completedTask.map((task) => {
            if (task.task_id === id){
                // const taskIndex = taskList.findIndex(task => task.task_id === id);
                // const updatedTaskList = [...taskList];
                // updatedTaskList[taskIndex] = {...updatedTaskList[taskIndex], completed: !task.completed}
                // setTaskList(updatedTaskList);
                const updatedTask = {...task, completed: !task.completed};
                updateTask(task.task_id, updatedTask);
            }
        })
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
    }
  return (
    <>
    <Form onSubmit={handleSubmitForm} 
    taskNameRef={taskNameRef}/> 
    
    <p></p>

    <ListTask 
    fetchTask={fetchTask}
    handleTaskCompleteStatus={handleTaskCompleteStatus}
    checked={isChecked}
    completedTask={completedTask}
    incompletedTask={incompletedTask}
    handleCompletedTask={handleCompletedTask}
    handleDeleteTask={handleDeleteTask}
    />

    </>
  );
};