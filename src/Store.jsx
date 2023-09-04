import { configureStore } from "@reduxjs/toolkit";
import AllUserReducer from "./ReduxSlices/AllUserSlice";
import CarReducer from "./ReduxSlices/CarsSlice";
import HostInformationWithKycReducer from "./ReduxSlices/HostInformationWithKycSlice";
import HostReducer from "./ReduxSlices/HostsSlice";
import IncomeReducer from "./ReduxSlices/IncomeGetSlice";
import adminReducer from "./ReduxSlices/ProfileUpdatedSlice";
import RecentEarningsReducer from "./ReduxSlices/RecentEarningsSlice";
import RentInformationReducer from "./ReduxSlices/RentInformationSlice";
import RentStatusReducer from "./ReduxSlices/RentStatusSlice";
import SigninReducer from "./ReduxSlices/SigninSlice";
import UserInformationReducer from "./ReduxSlices/UserInformationSlice";
import UserInformationWithKycReducer from "./ReduxSlices/UserInformationWithKycSlice";

export const Store = configureStore({
  reducer: {
    IncomeData: IncomeReducer,
    UserData: SigninReducer,
    RentStatus: RentStatusReducer,
    hostsData: HostReducer,
    carsData: CarReducer,
    adminData: adminReducer,
    RecentEarnings: RecentEarningsReducer,
    RentInformation: RentInformationReducer,
    UserInformationData: UserInformationReducer,
    HostInfoData: HostInformationWithKycReducer,
    UserInfoData: UserInformationWithKycReducer,
    AllUser: AllUserReducer,
  },
});
