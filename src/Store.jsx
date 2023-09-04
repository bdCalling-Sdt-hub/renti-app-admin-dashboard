import { configureStore } from '@reduxjs/toolkit'
import IncomeReducer from './ReduxSlices/IncomeGetSlice'
import SigninReducer from './ReduxSlices/SigninSlice'
import RecentEarningsReducer from './ReduxSlices/RecentEarningsSlice'
import RentInformationReducer from './ReduxSlices/RentInformationSlice'
import RentStatusReducer from './ReduxSlices/RentStatusSlice'
import UserInformationReducer from './ReduxSlices/UserInformationSlice'
import HostInformationWithKycReducer from './ReduxSlices/HostInformationWithKycSlice'
import UserInformationWithKycReducer from './ReduxSlices/UserInformationWithKycSlice'
import CarInformationWithKycReducer from './ReduxSlices/CarInformationWithKycSlice'
export const Store = configureStore({
  reducer: {
    IncomeData:IncomeReducer,
    UserData:SigninReducer,
    RentStatus:RentStatusReducer,
    RecentEarnings:RecentEarningsReducer,
    RentInformation:RentInformationReducer,
    UserInformationData:UserInformationReducer,
    HostInfoData:HostInformationWithKycReducer,
    UserInfoData:UserInformationWithKycReducer,
    CarInfoData:CarInformationWithKycReducer
  },
})