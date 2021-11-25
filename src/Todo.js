import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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
    <li
      className="shadow-lg p-2 mb-3 text-xl bg-blue-50 dark:bg-blue-200"
      key={i}
    >
      {task} <button onClick={() => removeTask(i)}>✅</button>
    </li>
  ));

  const handleTheme = () => {
    localStorage.theme === "light"
      ? (localStorage.theme = "dark") &&
        document.documentElement.classList.add("dark")
      : (localStorage.theme = "light") &&
        document.documentElement.classList.remove("dark");
  };

  return (
    <div className="App mt-8 dark:bg-gray-800">
      <button
        onClick={handleTheme}
        className="border-2 px-5 py-2 rounded-xl bg-gray-800 dark:bg-gray-400 float-right mt-1 mr-5"
      >
        🌖
      </button>
      <h1 className="text-6xl ml-8 mb-3 mt-10 dark:text-gray-300">Tasks</h1>
      <div
        className={`p-8 shadow-lg pb-8 dark:bg-gray-600 ${
          tasks.length < 1
            ? "bg-white"
            : tasks.length < 4
            ? "bg-gradient-to-r from-yellow-200 via-green-500 to-green-500"
            : tasks.length < 6
            ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            : "bg-gradient-to-r from-yellow-800 via-red-800 to-pink-900"
        }`}
      >
        <h2 className="text-3xl mb-3 dark:text-gray-300">
          You have {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </h2>
        <div className=" flex justify-center">
          <input
            className="border-2 text-xl border-red-800 w-96 h-12 px-1 bg-green-200 dark:bg-green-700 dark:text-gray-300"
            value={input}
            onKeyPress={handleKeytoDo}
            onChange={onInputChange}
          />
          <button
            onClick={handleTodo}
            className="border-2 border-red-800 px-8 bg-green-600 dark:text-gray-300 dark:bg-green-800 text-2xl font-bold"
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
