import { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";


//working on this componet
const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // await fetch("http://localhost:4000/get-tasks") // Fetch data from Express server with the rout /get-data
        await fetch("https://memorynotes.netlify.app/get-tasks")
          .then((response) => {
            return response.json();
          })
          .then((tasks) => {
            setTasks(tasks);
          });
        console.log(tasks);
      } catch (error) {
        console.error("error fetching tasks:", error);
      }
    };
    fetchTask();
  }, []);

  //working on the delete and update operations----here------>

  // // Fetch Express server route and perform the action in that rout /update-task
  const handleUpdateTask = async () => {
    if (!window.confirm("Are you sure you want to edit this item?")) return;
    console.log("the update task button was clicked");

    //steps 1: Get a single task form mongodb
    //step 2: update form fields with infromation to edit
    //step 3: update form fields with infromation to edit

    
    await fetch("http://localhost:4000/update-task", {
      method: "PATCH",
    });
  };
  // // Fetch Express server route and perform the action in that rout /delete-task
  const handleDeleteTask = async (id) => {
    console.log("the delete task button was clicked");
    if (!window.confirm("Are you sure you want to edit this item?")) return;
    console.log("the update task button was clicked");

    try {
      const response = await fetch(`http://localhost:4000/delete-task/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("an item was deleted");
      }

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };
  //----------------------------------------------------------->

  return (
    <>
      <div className="tasksContainer">
        <div className="title">Task List </div>
        <div className="taskItemContainer">
          {tasks.map((taskObject) => {
            return (
              <div key={taskObject._id} className="taskItem">
                <div>{taskObject.task}</div>
                <div className="taskItemButtons">
                  <div onClick={handleUpdateTask}>
                    <AiOutlineEdit />
                  </div>
                  <div onClick={() => handleDeleteTask(taskObject._id)}>
                    <AiOutlineDelete />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tasks;
