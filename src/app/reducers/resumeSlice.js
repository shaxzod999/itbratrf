import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

const initialState = {
  resume: [],
  status: "idle",
  headingResume: [],
  allResume: [],
  currentResume: [],
  clickLike: false,
  selectedResume: [],
  setFavoriteResume: [],
};

export const resumePostLike = createAsyncThunk(
  "resume/resumePostLike",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${baseURL}/favorite/resume/`,
        {
          resume: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resumeDeleteLike = createAsyncThunk(
  "resume/resumeDeleteLike",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`${baseURL}/favorite/resume/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentUserResume = createAsyncThunk(
  "resume/getCurrentUserResume",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/resume/owner/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllResume = createAsyncThunk(
  "resume/getAllResume",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/resume/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHeadingResume = createAsyncThunk(
  "resume/getHeadingResume",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/heading/resume/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addResume = createAsyncThunk(
  "resume/addResume",
  async (resumeData, thunkAPI) => {
    try {
      // Log the formData contents
      for (let pair of resumeData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.post(`${baseURL}/resume/`, resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data", // Ensure the correct content type is set
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateResume = createAsyncThunk(
  "resume/updateResume",
  async ({ id, resumeData }, thunkAPI) => {
    try {
      const response = await axios.put(`${baseURL}/resume/${id}/`, resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteResume = createAsyncThunk(
  "resume/deleteResume",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseURL}/resume/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return { id }; // return the id of the deleted resume
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getResumeById = createAsyncThunk(
  "resume/getResumeById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/resume/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchAllResume = createAsyncThunk(
  "resume/search",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/resume/?resume_owner=${name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchWithFavoriteResume = createAsyncThunk(
  "resume/favoritesearch",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/favorite/resume/?resume_owner=${name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFavoriteResume = createAsyncThunk(
  "resume/getFavoriteResume",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/favorite/resume/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("resumes/clearSelectedResume", (state) => {
      state.selectedResume = null;
    });
    builder.addCase(addResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addResume.fulfilled, (state, action) => {
      state.status = "success";
      state.resume = action.payload;
    });
    builder.addCase(addResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getHeadingResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getHeadingResume.fulfilled, (state, action) => {
      state.status = "success";
      state.headingResume = action.payload;
    });
    builder.addCase(getHeadingResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getAllResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAllResume.fulfilled, (state, action) => {
      state.status = "success";
      state.allResume = action.payload;
    });
    builder.addCase(getAllResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getFavoriteResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getFavoriteResume.fulfilled, (state, action) => {
      state.status = "success";
      state.setFavoriteResume = action.payload;
    });
    builder.addCase(getFavoriteResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(searchWithFavoriteResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(searchWithFavoriteResume.fulfilled, (state, action) => {
      state.status = "success";
      state.setFavoriteResume = action.payload;
    });
    builder.addCase(searchWithFavoriteResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(searchAllResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(searchAllResume.fulfilled, (state, action) => {
      state.status = "success";
      state.allResume = action.payload;
    });
    builder.addCase(searchAllResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getCurrentUserResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCurrentUserResume.fulfilled, (state, action) => {
      state.status = "success";
      state.currentResume = action.payload;
    });
    builder.addCase(getCurrentUserResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(resumePostLike.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(resumePostLike.fulfilled, (state, action) => {
      state.status = "success";
      state.clickLike = action.payload;
    });
    builder.addCase(resumePostLike.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(resumeDeleteLike.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(resumeDeleteLike.fulfilled, (state, action) => {
      state.status = "success";
      state.clickLike = action.payload;
    });
    builder.addCase(resumeDeleteLike.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(updateResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateResume.fulfilled, (state, action) => {
      state.status = "success";
      // Update the resume in state with the edited data
      const updatedResumeIndex = state.currentResume.findIndex(
        (resume) => resume.id === action.payload.id
      );
      if (updatedResumeIndex >= 0) {
        state.currentResume[updatedResumeIndex] = action.payload;
      }
    });
    builder.addCase(updateResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(deleteResume.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteResume.fulfilled, (state, action) => {
      state.status = "success";
      state.currentResume = state.currentResume.filter(
        (resume) => resume.id !== action.payload.id
      );
    });
    builder.addCase(deleteResume.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getResumeById.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getResumeById.fulfilled, (state, action) => {
      state.status = "success";
      state.selectedResume = action.payload;
    });
    builder.addCase(getResumeById.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default resumeSlice.reducer;
