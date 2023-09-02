import { configureStore } from '@reduxjs/toolkit'
import IncomeReducer from './ReduxSlices/IncomeGetSlice'
import SigninReducer from './ReduxSlices/SigninSlice'
import RecentEarningsReducer from './ReduxSlices/RecentEarningsSlice'

import RentStatusReducer from './ReduxSlices/RentStatusSlice'
export const Store = configureStore({
  reducer: {
    IncomeData:IncomeReducer,
    UserData:SigninReducer,
    RentStatus:RentStatusReducer,
    RecentEarnings:RecentEarningsReducer
  },
})