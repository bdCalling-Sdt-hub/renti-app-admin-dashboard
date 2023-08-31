import { configureStore } from '@reduxjs/toolkit'
import IncomeReducer from './ReduxSlices/IncomeGetSlice'
export const Store = configureStore({
  reducer: {
    IncomeData:IncomeReducer
  },
})