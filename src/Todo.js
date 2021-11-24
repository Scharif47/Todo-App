import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTodo = () => {
    if (input === "") {
      alert("Please provide a task");
    } else {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const handleKeytoDo = (e) => {
    if (e.key === "Enter") {
      if (input === "") {
        alert("Please provide a task");
      } else {
        setTasks([...tasks, input]);
        setInput("");
      }
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((task, i) => task[i] !== task[index]));
  };

  const renderList = tasks.map((task, i) => (
    <li className="shadow-lg p-2 mb-3 text-xl bg-blue-50" key={i}>
      {task} <button onClick={() => removeTask(i)}>✅</button>
    </li>
  ));

  return (
    <div className="App mt-8">
      <h1 className="text-6xl mb-3">Tasks</h1>
      <div
        className={`p-8 shadow-lg pb-8 ${
          tasks.length < 1
            ? "bg-white"
            : tasks.length < 4
            ? "bg-green-400"
            : tasks.length < 6
            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            : "bg-red-800"
        }`}
      >
        <h2 className="text-3xl mb-3">
          You have {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </h2>
        <div className=" flex justify-center">
          <input
            className="border-2 text-xl border-red-800 w-96 h-12 px-1 bg-green-200"
            value={input}
            onKeyPress={handleKeytoDo}
            onChange={onInputChange}
          />
          <button
            onClick={handleTodo}
            className="border-2 border-red-800 px-8 bg-green-600 text-2xl font-bold"
          >
            +
          </button>
        </div>
      </div>

      <div
        className={`w-1/2 mx-auto mt-16 p-3 ${
          tasks.length > 0 && "shadow-2xl"
        }`}
      >
        <ul className="mt-5">{renderList}</ul>
      </div>
    </div>
  );
}

export default Todo;
