import React, { useState } from "react";
import "../styles/habit.css";
import { completeHabitAsync, removeHabitAsync } from "../slices/habitListSlice";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";

function Habit(props) {
    const dispatch = useDispatch();
    const user_id = useLoaderData();

    function handleChange(){
        dispatch(completeHabitAsync({userId: user_id, habit_name: props.name}))
    }

    function handleClick(){
        var confirmation = window.confirm("Are you sure you want to delete habit: " + props.name);
        if (confirmation) {
            dispatch(removeHabitAsync({userId: user_id, habit_name: props.name}))
        }
    }

    return (
        <div>

           <div className = "container">
                <div className = "habit">
                    <button className="delete_button" onClick={handleClick}>Delete</button>
                    <div className = "habit_component">
                        <h1>{props.name}</h1>
                        <p>{props.description}</p>
                    </div>
                    <label className="checkbox">
                        <input 
                            type="checkbox" 
                            checked={props.checkboxValue}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Habit;