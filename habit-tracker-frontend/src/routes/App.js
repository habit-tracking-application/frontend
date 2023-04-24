import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchHabitsAsync } from "../slices/habitListSlice";
import app from "../styles/app.css"

function App({params}) {
  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <Outlet />
    </div>
  );
}

export default App;
