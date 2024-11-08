import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

const initialState = {
  projectsCategory: [],
  status: "idle",
  project: [],
  showProjects: [],
  clickLike: false,
  projectInfo: [],
  getFavoriteProjects: [],
};

export const setFavoriteProjects = createAsyncThunk(
  "projects/setFavoriteProjects",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${baseURL}/fovorite/project/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectsCategory = createAsyncThunk(
  "projects/getProjectsCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/category/project/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// get project by id
export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/project/${id}/`, {
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
export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${baseURL}/project/`, {
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

export const addProjects = createAsyncThunk(
  "projects/addProject",
  async (projectData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${baseURL}/project/`,
        {
          image: projectData.image,
          name: projectData.name,
          contact: projectData.contact,
          valuta: projectData.valuta,
          price: projectData.price,
          skils: projectData.skils,
          description: projectData.description,
          category: projectData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // getProjects ni chaqirish
      thunkAPI.dispatch(getProjects());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "projects/deleteLike",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(`${baseURL}/favorite/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const postLike = createAsyncThunk(
  "projects/postLike",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${baseURL}/fovorite/project/`,
        {
          project: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

export const searchWithProjectName = createAsyncThunk("projects/search", async (name, thunkAPI) => {
  try {
    const response =await axios.get(`${baseURL}/project/?name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    return response.data
    
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
});

export const searchWithFavoriteProjectName = createAsyncThunk("projects/favoritesearch", async (name, thunkAPI) => {
  try {
    const response =await axios.get(`${baseURL}/fovorite/project/?project_name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    console.log(response.data);
    
    return response.data
    
    
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
});

export const deleteLikeFavoriteProject = createAsyncThunk("projects/deleteFavoriteProject", async (id, thunkAPI) => {
  try {
    const response =await axios.delete(`${baseURL}/favorite/project/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})
export const getProjectByCategoryId = createAsyncThunk("projects/getProjectByCategoryId", async (id, thunkAPI) => {
  try {
    const response =await axios.get(`${baseURL}/category/${id}/project/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }
})

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProjectsCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProjectsCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.projectsCategory = action.payload;
    });
    builder.addCase(getProjectsCategory.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(addProjects.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addProjects.fulfilled, (state, action) => {
      state.status = "success";
      state.project = action.payload;
    });
    builder.addCase(addProjects.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getProjects.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.status = "success";
      state.showProjects = action.payload;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(searchWithProjectName.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(searchWithProjectName.fulfilled, (state, action) => {
      state.status = "success";
      state.showProjects = action.payload;
    });
    builder.addCase(searchWithProjectName.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getProjectByCategoryId.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProjectByCategoryId.fulfilled, (state, action) => {
      state.status = "success";
      state.showProjects = action.payload;
    });
    builder.addCase(getProjectByCategoryId.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(setFavoriteProjects.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(setFavoriteProjects.fulfilled, (state, action) => {
      state.status = "success";
      state.getFavoriteProjects = action.payload;
    });
    builder.addCase(setFavoriteProjects.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(searchWithFavoriteProjectName.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(searchWithFavoriteProjectName.fulfilled, (state, action) => {
      state.status = "success";
      state.getFavoriteProjects = action.payload;

    });
    builder.addCase(searchWithFavoriteProjectName.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(postLike.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(postLike.fulfilled, (state, action) => {
      state.status = "success";
      state.clickLike = action.payload;
    });
    builder.addCase(postLike.rejected, (state) => {
      state.status = "rejected";
    });

    // get project by id
    builder.addCase(getProjectById.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      state.status = "success";
      state.projectInfo = action.payload;
    });
    builder.addCase(getProjectById.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export default projectsSlice.reducer;
