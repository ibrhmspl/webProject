import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from '../Services/authService';

const user = JSON.parse(localStorage.getItem("user"));
export const getUser = createAsyncThunk(
  "getUser",
  async () => {
    const res = await authService.getuser();
    return res;
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password,key }, thunkAPI) => {
    try {
      const response = await authService.register({name, email, password,key});
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login({email, password});
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});


const initialState = {
  user : (user ? user : null),
  isLoggedIn : (user ? true : false),
 users : []

}
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;