import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../../../utils/axiosInstance'
import produce from 'immer'

export const registerUser = createAsyncThunk(
  'register',
  async (payload, thunkAPI) => {
    try {
      const response = await post('/register', payload)
      console.log('response:', response)
      if (response.status === 200) {
        return response
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  loading: false,
  success: false,
  user: {},
  errorMessage: '',
  errorStrings: [],
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        produce(state, (draftState) => {
          draftState.loading = true
          draftState.success = false
          draftState.errorMessage = ''
          draftState.errorStrings = []
        })
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        produce(state, (draftState) => {
          draftState.loading = false
          draftState.success = true
          draftState.user = action.payload.user
          draftState.errorMessage = ''
          draftState.errorStrings = []
        })
      })
      .addCase(registerUser.rejected, (state, action) => {
        produce(state, (draftState) => {
          draftState.loading = false
          draftState.success = false
          draftState.errorMessage =
            action.payload?.message || 'Something went wrong'
          draftState.errorStrings = Object.values(
            action.payload?.errors || {}
          ).flat()
        })
      })
   },
})

export default registerSlice.reducer


/*

This is a JavaScript code that defines a Redux slice called registerSlice with a single async Redux action called registerUser. The registerUser action is created using the createAsyncThunk function from the @reduxjs/toolkit library.

The registerUser action is an asynchronous action that sends a POST request to a server to register a user. The action takes in a payload object as its first parameter and a thunkAPI object as its second parameter. The payload object contains data about the user to be registered, such as their username, email, and password.

The thunkAPI object is a set of utilities provided by the createAsyncThunk function. It can be used to dispatch other Redux actions, access the current state of the store, and handle errors.

The registerSlice slice has an initial state object that contains four properties: loading, success, user, errorMessage, and errorStrings.

The extraReducers field of registerSlice is an object that defines how the slice should respond to actions dispatched by registerUser. It contains three functions, each of which defines a different response to a different action type: pending, fulfilled, and rejected.

When registerUser dispatches a pending action, the loading property of the state is set to true, and the other properties are reset to their initial values.
When registerUser dispatches a fulfilled action, the loading property of the state is set to false, the success property is set to true, and the user property is set to the response data returned by the registerUser action.
When registerUser dispatches a rejected action, the loading property of the state is set to false, the success property is set to false, and the errorMessage and errorStrings properties are set based on the error response received from the server.
Finally, the registerSlice is exported as the default export of the module.

*/