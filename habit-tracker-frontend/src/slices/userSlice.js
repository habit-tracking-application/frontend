import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: ""
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = "";
        }
    }
}) 

export const {login, logout} = userSlice.actions;

// selectors
export const userIdSelector = (state) => {
    return state.user.value;
}





export default userSlice.reducer