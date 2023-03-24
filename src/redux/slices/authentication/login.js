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
