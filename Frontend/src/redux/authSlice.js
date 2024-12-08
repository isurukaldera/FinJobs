import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      setToken: (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true; // Assuming the token implies authentication
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      logout: (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      },
    },
  });
  
  export const { setUser, setToken, setLoading, logout } = authSlice.actions;
  export default authSlice.reducer;