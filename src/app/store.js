import { configureStore } from '@reduxjs/toolkit'
import calculationReducer from '@/src/app/features/calculationSlice'

export const store = configureStore({
  reducer: {
    calculation: calculationReducer,
  },
})
