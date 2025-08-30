import { createSlice } from '@reduxjs/toolkit'

interface BlogsState {
  loading: boolean
}

const initialState: BlogsState = {
  loading: false,
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = blogsSlice.actions
export default blogsSlice.reducer
