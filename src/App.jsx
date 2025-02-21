import { useState } from "react";
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
                console.log("sucessful submit");
            }
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

const Tasks = () => {
    return (
        <>
            <div className="tasksContainer">
                <div className="title">Task List </div>
                <div className="tasks">
                    <p>task 1 to complete</p>
                    <p>task 2 to complete</p>
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
