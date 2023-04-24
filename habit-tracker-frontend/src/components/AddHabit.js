import { addHabitAsync } from "../slices/habitListSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
        dispatch(addHabitAsync({userId: user_id, habit_name: formData.habit_name, description: formData.description}))

        setFormData({habit_name: "", description: ""})
    }


    return (
        <div>
            <form >
                <label>
                    Name:
                    <input
                        type="text"
                        name="habit_name"
                        value={formData.habit_name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
            </form>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default AddHabit;