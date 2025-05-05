import { useState } from "react";


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
export default TaskForm;