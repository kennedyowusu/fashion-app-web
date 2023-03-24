import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../../../utils/axiosInstance'
import produce from 'immer'

export const loginUser = createAsyncThunk('login', async (payload, thunkAPI) => {
  try {
    const response = await post('/login', payload)
    console.log('response:', response)
    if (response.status === 200) {
      return response
    } else {
      return thunkAPI.rejectWithValue(response.data)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const initialState = {
  loading: false,
  success: false,
  user: {},
  errorMessage: '',
  errorStrings: [],
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        produce(state, (draftState) => {
          draftState.loading = true
          draftState.success = false
          draftState.errorMessage = ''
          draftState.errorStrings = []
        })
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        produce(state, (draftState) => {
          draftState.loading = false
          draftState.success = true
          draftState.user = action.payload.user
          draftState.errorMessage = ''
          draftState.errorStrings = []
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
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

export default loginSlice.reducer

export const selectLoginLoading = (state) => state.login.loading
export const selectLoginSuccess = (state) => state.login.success
export const selectLoginUser = (state) => state.login.user
export const selectLoginErrorMessage = (state) => state.login.errorMessage
export const selectLoginErrorStrings = (state) => state.login.errorStrings

export const selectLoginError = (state) => {
  return {
    errorMessage: selectLoginErrorMessage(state),
    errorStrings: selectLoginErrorStrings(state),
  }
}

export const loginActions = loginSlice.actions


/*

This code defines a Redux slice that manages the state of a login form, with the ability to make an API request to authenticate a user.

The createSlice function from the @reduxjs/toolkit library is used to create the slice. The createAsyncThunk function is used to define an asynchronous thunk called loginUser, which sends a login request to the server using the post function from ../../../utils/axiosInstance. The thunk returns either the response or an error message, depending on the outcome of the request.

The initial state of the login slice has properties for loading, success, user, errorMessage, and errorStrings. The extraReducers field is used to define reducer functions that handle the state changes in response to the different action types (pending, fulfilled, and rejected) that are dispatched when the loginUser thunk is run. These reducer functions are created using the addCase method of the builder object.

When the loginUser.pending action is dispatched, the loading state is set to true. When loginUser.fulfilled is dispatched, loading is set to false and success is set to true, along with the user property being set to the payload of the action (which contains the authenticated user's information). Finally, when loginUser.rejected is dispatched, loading is set to false, success is set to false, and errorMessage and errorStrings are populated with the error message returned by the server.

The code also exports various selectors to access specific fields of the state, such as selectLoginLoading, selectLoginSuccess, selectLoginUser, selectLoginErrorMessage, and selectLoginErrorStrings. A selectLoginError selector combines the errorMessage and errorStrings fields into a single object. Finally, the loginActions object is exported, which contains the action creators for the slice.

*/ 
