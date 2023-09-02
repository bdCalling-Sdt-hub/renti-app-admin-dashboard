import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./ReduxSlices/CarsSlice";
import HostReducer from "./ReduxSlices/HostsSlice";
import IncomeReducer from "./ReduxSlices/IncomeGetSlice";
import adminReducer from "./ReduxSlices/ProfileUpdatedSlice";
import RecentEarningsReducer from "./ReduxSlices/RecentEarningsSlice";
import RentInformationReducer from "./ReduxSlices/RentInformationSlice";
import RentStatusReducer from "./ReduxSlices/RentStatusSlice";
import SigninReducer from "./ReduxSlices/SigninSlice";

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
  },
});
