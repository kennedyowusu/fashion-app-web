import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
 'authentication/login',
 async (payload, thunkAPI) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await response.json()
  return data
 }
)

const loginSlice = createSlice({
 name: 'authentication/login',
 initialState: {
  status: 'idle',
  error: null,
  data: null
 },
 reducers: {},
 extraReducers: {
  [login.pending]: (state, action) => {
   state.status = 'loading'
  }
 }
})

export default loginSlice.reducer