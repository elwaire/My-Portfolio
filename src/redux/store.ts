import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from './features/blogsSlice'

export const store = configureStore({
  reducer: {
    blogs: blogsSlice,
  },
})

// Type cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
