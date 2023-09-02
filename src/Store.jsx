import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./ReduxSlices/CarsSlice";
import HostReducer from "./ReduxSlices/HostsSlice";
import IncomeReducer from "./ReduxSlices/IncomeGetSlice";
import adminReducer from "./ReduxSlices/ProfileUpdatedSlice";
import SigninReducer from "./ReduxSlices/SigninSlice";

export const Store = configureStore({
  reducer: {
    IncomeData: IncomeReducer,
    UserData: SigninReducer,
    hostsData: HostReducer,
    carsData: CarReducer,
    adminData: adminReducer,
  },
});
