import React, {useEffect} from "react";
import "./App.css";
import Todo from "./Todo";

function App() {

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

  return (
    <div className="App container mx-auto">
      <Todo />
    </div>
  );
}

export default App;
