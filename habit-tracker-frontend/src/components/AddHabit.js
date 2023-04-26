import { addHabitAsync } from "../slices/habitListSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../styles/addHabit.css"

function AddHabit() {
    const dispatch = useDispatch();
    const user_id = useLoaderData();
    
    const [formData, setFormData] = useState({
        habit_name: "",
        description: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = () => {
        dispatch(addHabitAsync({user_id: user_id, habit_name: formData.habit_name, description: formData.description}))

        setFormData({habit_name: "", description: ""})
    }


    return (
        <div className="add_habit_component">
            <form>
                <label className="add_habit_label">
                    <div className="habit_form_unused"></div>
                    <p className="habit_label">Name:</p>
                    <input
                        className="habit_input"
                        type="text"
                        name="habit_name"
                        value={formData.habit_name}
                        onChange={handleChange}
                    />
                    <div className="habit_form_unused"></div>
                </label>
                <label className="add_habit_label">
                    <div className="habit_form_unused"></div>
                    <p className="habit_label">Description:</p>
                    <input
                        className="habit_input"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <div className="habit_form_unused"></div>
                </label>
                <br />
            </form>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default AddHabit;