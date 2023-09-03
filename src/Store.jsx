import { configureStore } from '@reduxjs/toolkit'
import IncomeReducer from './ReduxSlices/IncomeGetSlice'
import SigninReducer from './ReduxSlices/SigninSlice'
import RecentEarningsReducer from './ReduxSlices/RecentEarningsSlice'
import RentInformationReducer from './ReduxSlices/RentInformationSlice'
import RentStatusReducer from './ReduxSlices/RentStatusSlice'
import UserInformationReducer from './ReduxSlices/UserInformationSlice'
export const Store = configureStore({
  reducer: {
    IncomeData:IncomeReducer,
    UserData:SigninReducer,
    RentStatus:RentStatusReducer,
    RecentEarnings:RecentEarningsReducer,
    RentInformation:RentInformationReducer,
    UserInformationData:UserInformationReducer
  },
})