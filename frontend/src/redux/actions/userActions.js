import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8002/user/signup', userData);
      console.log(response.data, "5676");
      return response.data; 
    } catch (error) {
      console.log(error, "5676");
      // Check if it's a MongoDB error (duplicate email)
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.includes('duplicate key error')
          ? 'Email is already in use. Please use a different email.'
          : error.response.data.error ? error.response.data.error  : 'An error occurred. Please try again later.';
        
        return thunkAPI.rejectWithValue(errorMessage);  // Return a user-friendly error message
      }
      
      return thunkAPI.rejectWithValue('Something went wrong. Please try again later.');
    }
  }
);


export const LogInUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8002/user/login', userData);
      return response.data;  // Return data if login is successful
    } catch (error) {
      console.log(error.message, "56t76");
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message || 'please check username or password');
      }
    }
  }
);


export const GetAllUsers = createAsyncThunk(
  'user/list',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8002/user/list', userData);
      console.log("dwqdqd",response.data.data)// Return data if login is successful
      return response.data;
    } catch (error) {
      console.log(error.message, "56t76");

      // Check if Axios error has a response
      if (error.response) {
    
        return thunkAPI.rejectWithValue('please check username or password');
      }
    }
  }
);




export const UpdateUser = createAsyncThunk(
  '/user/update',
  async ({userId, userData, thunkAPI}) => {
    try {
      const response = await axios.put(`http://localhost:8002/user/update/${userId}`, userData);
      await localStorage.setItem('authToken', response.data.token);
      return response.data;  // Return data if login is successful
    } catch (error) {
      console.log(error.message, "56t76");

      // Check if Axios error has a response
      if (error.response) {
    
        return thunkAPI.rejectWithValue('please check username or password');
      }
    }
  }
);




