import { configureStore } from "@reduxjs/toolkit";
import habitListReducer from "./slices/habitListSlice";
import userReducer from "./slices/userSlice"; 

export default configureStore({
    reducer: {
        habitList: habitListReducer,
        user: userReducer
    }
})