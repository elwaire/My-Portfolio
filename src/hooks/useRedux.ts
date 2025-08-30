import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'

// Hook dùng dispatch với type
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Hook dùng selector với type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
