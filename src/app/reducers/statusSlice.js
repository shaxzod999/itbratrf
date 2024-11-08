// statusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

// Thunk to update the status via the API
export const updateUserStatus = createAsyncThunk(
  "status/updateUserStatus",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/user/profile/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postFeedback = createAsyncThunk(
  "status/postFeedback",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/subscribe/`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFaq = createAsyncThunk(
  "status/getFaq",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/faq/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const statusSlice = createSlice({
  name: "status",
  initialState: {
    faq: [],
    status: {},
    feedback: {},
    loading: false,
    error: null,
  },
  reducers: {
    setLocalStatus(state, action) {
      const { userId, status } = action.payload;
      state.status[userId] = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, status } = action.meta.arg;
        state.status[userId] = status; // Bu qatorni albatta tekshirib ko'ring
      })

      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFaq.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.faq = action.payload;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLocalStatus } = statusSlice.actions;
export default statusSlice.reducer;
