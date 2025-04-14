import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";import "./App.scss";
import { AiOutlineDelete } from "react-icons/ai";

const TaskForm = () => {
    const [formData, setFormData] = useState({
        task: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/submit-form", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("sucessfully submit", response);
            }

            setFormData({task: ""}) /// reset for input field state
            //write function reload react app
            setTimeout(() => {
                window.location.reload()
            }, 500);
             // reload entire page when a task is added after 500ms

        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return (
        <>
            <div id="formContainer" className="formContainer">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="Title">Enter Tasks</div>
                    <input
                        id=""
                        type="text"
                        name="task"
                        placeholder="Enter a task"
                        value={formData.task}
                        onChange={handleChange}
                    />

                    <button id="addTask" type="submit">
                        Add Task
                    </button>
                </form>
            </div>
        </>
    );
};
//working on this componet
const Tasks = () => {

    const [tasks, setTasks] = useState([])

    useEffect( ()=>{
        const fetchTask = async ()=>{
            try {
                await fetch("http://localhost:4000/get-tasks") // Fetch data from Express server with the rout /get-data
            .then((response) => {
                return response.json()
            })
            .then((tasks)=>{
                setTasks(tasks)
            })
            console.log(tasks)
            } catch (error) {
                console.error("error fetching tasks:", error)
                
            }
        }
        fetchTask() 
    }, [])

    //working on the delete and update operations----here------>

    // // Fetch Express server route and perform the action in that rout /update-task
    const handleUpdateTask = async ()=>{
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        console.log("the update task button was clicked")
        await fetch("http://localhost:4000/update-task",{
            method: "PATCH"
        })
    }
    // // Fetch Express server route and perform the action in that rout /delete-task
    const handleDeleteTask = async (id)=>{
        console.log("the delete task button was clicked")

        try {
            const response = await fetch(`http://localhost:4000/delete-task/${id}`,{
                method: 'DELETE',
            })
            if (response.ok) {
                console.log("an item was deleted")
            }

            setTimeout(() => {
                window.location.reload()
            }, 500);
            
        } catch (error) {
            console.error("Error deleting resource:", error); 
        }
        
    }
    //----------------------------------------------------------->

    return (
        <>
            <div className="tasksContainer">
                <div className="title">Task List </div>
                <div className="taskItemContainer">
                     {tasks.map((taskObject) =>{
                        return(
                            <div key={taskObject._id} className="taskItem" >
                                <div>{taskObject.task}</div>
                                <div onClick={handleUpdateTask}><AiOutlineEdit /></div>
                                <div onClick={()=>handleDeleteTask(taskObject._id)}><AiOutlineDelete /></div>
                            </div>
                        )

                     })}
                       
                </div>
            </div>
        </>
    );
};

function App() {
    return (
        <div className ="App">
            <TaskForm/>
            <Tasks/>
        </div>
    );
}

export default App;
