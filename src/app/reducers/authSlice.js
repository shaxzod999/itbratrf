import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

const initialState = {
  currentUser: undefined,
  isLoading: false,
  errors: {},
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    console.log(userData)
    try {
      const response = await axios.post(`${baseURL}/user/register/`, {
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        confirm_password: userData.confirm_password,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({
        message: error,
      });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/user/login/`, {
        username: userData.username,
        password: userData.password,
      });
      console.log(response);
      return response.data.access;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const response = await axios.get(`${baseURL}/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "auth/updateCurrentUser",
  async (data, thunkAPI) => {
    try {
      console.log(data.role);
      const roleList = [data.role];
      const token = localStorage.getItem("accessToken") ?? "";
      const response = await axios.put(
        `${baseURL}/user/profile/`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          groups: roleList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      }).addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
