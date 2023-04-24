import Habit from "../components/Habit";
import { useSelector, useDispatch } from "react-redux";
import { habitListSelector, fetchHabitsAsync } from "../slices/habitListSlice";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export async function loader({params}){
    return params.user_id;
}


function HabitList() {
    const habitList = useSelector(habitListSelector);
    const dispatch = useDispatch();
    const user_id = useLoaderData();
    const [linkValue, setLinkValue] = useState("create");
    const location = useLocation();
    

    useEffect(() => {
        dispatch(fetchHabitsAsync(user_id));
        if(location.pathname.includes("create")) setLinkValue("..")
    }, [])

    const handleClick = () => {
        if (linkValue == "create"){
            setLinkValue("..")
        } else {
            setLinkValue("create")
        }
    }

    return (
        <div>
            {habitList && habitList.map(habit => {
                return(
                    <Habit 
                        key={habit.habit_name} 
                        name={habit.habit_name} 
                        description={habit.description} 
                        checkboxValue={habit.isChecked} 
                    />
                )
            }
            )}
            <Link to={linkValue} relative="path" onClick={handleClick}>Create New Habit</Link>
            <Outlet/>
        </div>
    )
}

export default HabitList;