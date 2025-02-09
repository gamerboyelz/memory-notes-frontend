
import "./App.css";

function App() {
    return (
        
            <div id="centerContainer">
                <form id="formContainer">
                    <div class="Title">Enter Tasks</div>
                    <input
                        id="myTask"
                        type="text"
                        name="myTask"
                        placeholder="Enter a task"
                    />
                    <div id="msg"></div>
                    <button id="addTask" type="submit">
                        {" "}
                        Add Task
                    </button>
                </form>

                <div id="tasksContainer">
                    <div class="Title">Task List </div>
                    <div>
                        <p>task 1 to complete</p>
                        <span class="options">
                            <i class="fa-solid fa-file-pen"></i>
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                    <div>
                        <p>task 2 to complete</p>
                        <span class="options">
                            <i class="fa-solid fa-file-pen"></i>
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                </div>
            </div>
    
    );
}

export default App;
