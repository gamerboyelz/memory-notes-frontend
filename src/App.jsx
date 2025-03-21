import { useState } from "react";
import { useEffect } from "react";
import "./App.scss";

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
        try {
            fetch("http://localhost:4000/get-tasks") // Fetch data from Express server with the rout /get-data
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

        
    }, [])
    
    return (
        <>
            <div className="tasksContainer">
                <div className="title">Task List </div>
                <div className="tasks">
                     {tasks.map((taskObject) =>{
                        return(
                            <div key={taskObject._id}>
                                {taskObject.task}
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
