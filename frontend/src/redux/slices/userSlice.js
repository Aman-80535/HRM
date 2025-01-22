import { createSlice } from '@reduxjs/toolkit';
import { signUpUser, LogInUser, GetAllUsers, UpdateUser } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  signUpUserDetail: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;  
      state.loading = false;
      state.error = null;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpUserDetail = action.payload; 
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log("dwqd" ,state.payload)
        state.loading = false;
        state.error = action.payload;
      })

      // Handle logInUser actions
      .addCase(LogInUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(LogInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(LogInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      })

      

      .addCase(GetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(GetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(GetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  
      })



      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
