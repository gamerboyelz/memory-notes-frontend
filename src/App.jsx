import TaskForm from "./components/formComponent";
import Tasks from "./components/taskComponent"
import "./App.scss";

function App() {
    return (
        <div className ="App">
            <TaskForm/>
            <Tasks />
        </div>
    );
}

export default App;
