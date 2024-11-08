import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice'
import projectsReducer from './reducers/projectsSlice'
import resumesReducer from './reducers/resumeSlice'
import statusReducer from './reducers/statusSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    projects:projectsReducer,
    resumes:resumesReducer,
    status:statusReducer
  },
});