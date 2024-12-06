import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: localStorage.getItem("token") || null, // Retrieve token from localStorage
        isAuthenticated: !!localStorage.getItem("token"), // Boolean flag indicating if the user is authenticated
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true; // Set as authenticated when user info is available
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true; // User is authenticated after receiving the token
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false; // Reset state when logging out
        },
    },
});

export const { setLoading, setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
