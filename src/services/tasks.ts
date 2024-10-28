export const fetchTasks = async () => {
  const response = await fetch("http://localhost:3001/tasks");

  if (!response.ok) {
    console.log("Error fetching data from the server");
  }

  const tasks = await response.json();

  return tasks;
};

interface TaskPayload {
  title: string;
  description: string;
}

export const postTask = async (payload: TaskPayload) => {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  if (!response.ok) {
    console.log("Error posting a new task to the server");
  }

  const enteredtask = await response.json();

  return enteredtask;
  
};
