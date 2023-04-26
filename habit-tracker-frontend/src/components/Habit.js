import React, { useState } from "react";
import "../styles/habit.css";
import { completeHabitAsync, removeHabitAsync, editHabitAsync } from "../slices/habitListSlice";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";

function Habit(props) {
    const dispatch = useDispatch();
    const user_id = useLoaderData();

    const [isEditMode, setIsEditMode] = useState(false);
    const [habitName, setHabitName] = useState(props.name);
    const [habitDescription, setHabitDescription] = useState(props.description);

    // complete habit

    // handles the change of the checkmark and executes a funtion which changes the value of the isChecked and changes the data stored in the db
    function handleChange() {
        dispatch(completeHabitAsync({ user_id: user_id, habit_name: props.name }))
    }

    // delete habit

    // handles the removal of habits
    function handleClick() {
        var confirmation = window.confirm("Are you sure you want to delete habit: " + props.name);
        if (confirmation) {
            dispatch(removeHabitAsync({ user_id: user_id, habit_name: props.name }))
        }
    }

    // edit habit
    
    // handle the change of habitName hook
    const handleHabitNameChange = (event) => {
        setHabitName(event.target.value);
    }

    // handle the change of habitDescription hook
    const  handleHabitDescriptionChange = (event) => {
        setHabitDescription(event.target.value);
    }

    // dispatches the Edit Habit Async to react reducer, changes the specified habit, and leaves edit mode
    const handleEditClick = () => {
        setIsEditMode(false);
        dispatch(editHabitAsync({user_id: user_id, habit_name: props.name, new_habit_name: habitName, new_description: habitDescription}));
    }

    // enter the edit mode
    const enterEditMode = () => {
        setIsEditMode(true);
    }


    if (isEditMode) {
        return(
            <div>
                <div className="container">
                    <div className="habit">
                        <div className="habit_unused_space"></div>
                        <button className="delete_button" onClick={handleEditClick}>Save</button>
                        <div className="edit_component">
                            <input className="edit_input" type="text" value={habitName} onChange={handleHabitNameChange} />
                            <br/>
                            <textarea className="edit_input" value={habitDescription} onChange={handleHabitDescriptionChange} />
                        </div>
                        <div className="habit_unused_space"></div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>

                <div className="container">
                    <div className="habit">
                        <div className="habit_unused_space"></div>
                        <button onClick={enterEditMode}>Edit</button>
                        <button className="delete_button" onClick={handleClick}>Delete</button>
                        <div className="habit_component">
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
                        <div className="habit_unused_space"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Habit;