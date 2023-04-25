import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dateFormatter from "../helpers/dateFormatterHelper";

export const habitListSlice = createSlice({
    name: "habitList",
    initialState: {
        value: [],
    },
    reducers: {
        addHabit: (state, action) => {
            state.value = [...state.value, {
                habit_name: action.payload.habit_name,
                description: action.payload.description,
                isChecked: false
            }]
        },
        removeHabit: (state, action) => {
            state.value.splice(action.payload, 1);
        },
        fetchHabits: (state, action) => {
            state.value = action.payload;
        },
        editHabit: (state, action) => {
            state.value.splice(action.payload.habitIndex, 1, action.payload.habit);
        },
        completeHabit: (state, action) => {
            state.value[action.payload].isChecked = !state.value[action.payload].isChecked;
        }
    }
})

export const { addHabit, removeHabit, fetchHabits, editHabit,completeHabit } = habitListSlice.actions;

// thunks

// adds habit to the db and to the habitListReducer
export const addHabitAsync = ({ user_id, habit_name, description }) => (dispatch) => {
    axios.post('http://localhost:3200/api/habits/createHabit', {
        habit_name: habit_name,
        description: description,
        user_id: user_id
    })

    dispatch(addHabit({ habit_name, description }))
}


// removes a habit forom db and from the habitListReducer
export const removeHabitAsync = ({ user_id, habit_name }) => (dispatch, getState) => {
    axios.post('http://localhost:3200/api/habits/deleteHabit', {
        user_id: user_id,
        habit_name: habit_name
    })

    const state = getState()

    const indexToDelete = state.habitList.value.findIndex(habit => habit.habit_name === habit_name)

    dispatch(removeHabit(indexToDelete))
}

// fetches all the habits that belong to the user from db and assigns their values to the habitListReducer
export const fetchHabitsAsync = (user_id) => (dispatch) => {
    console.log("fetching data");

    axios.get(`http://localhost:3200/api/habits/${user_id}`)
        .then(function (response) {
            const formattedDate = dateFormatter();

            const transformedHabitList = response.data.habits.map(habit => ({
                habit_name: habit.habit_name,
                description: habit.description,
                isChecked: habit.dates.includes(formattedDate)
            }));

            dispatch(fetchHabits(transformedHabitList));
        })
        .catch(function (error) {
            console.log(error);
        })
}

// edits an existing habit both in the db and habitListReducer
export const editHabitAsync = ({ user_id, habit_name, new_habit_name, new_description }) => (dispatch, getState) => {
    axios.post('http://localhost:3200/api/habits/editHabit', {
        user_id: user_id,
        habit_name: habit_name,
        new_habit_name: new_habit_name,
        new_description: new_description
    })

    const state = getState();

    const indexToEdit = state.habitList.value.findIndex(habit => habit.habit_name === habit_name);

    var habit = state.habitList.value[indexToEdit];

    habit = {
        habit_name: new_habit_name,
        description: new_description,
        isChecked: habit.isChecked
    }

    dispatch(editHabit({ habitIndex: indexToEdit, habit: habit }));
}

// complete or uncomplete the habit, requires user_id and habit_name
export const completeHabitAsync = ({ user_id, habit_name }) => (dispatch, getState) => {
    const formattedDate = dateFormatter();

    const state = getState();

    const indexToEdit = state.habitList.value.findIndex(habit => habit.habit_name === habit_name);

    if (state.habitList.value[indexToEdit].isChecked == false){
        axios.post('http://localhost:3200/api/habits/appendToDates', {
            user_id: user_id,
            habit_name: habit_name
        })
    } else {
        axios.post('http://localhost:3200/api/habits/deleteFromDates', {
            user_id: user_id,
            habit_name: habit_name
        })
    }

    console.log(user_id + " " + habit_name)

    dispatch(completeHabit(indexToEdit));
}

// selectors

// selects the whole habit list object
export const habitListSelector = (state) => {
    return state.habitList.value;
}






export default habitListSlice.reducer