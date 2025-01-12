import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import authReducer from "./slices/authSlice";
import insuranceReducer from "./slices/insuranceSlice";
import insurancesReducer from "./slices/insurancesSlice";
import LoginReducer from "./slices/LoginSlice";
import RegisterReducer from "./slices/RegisterSlice";
import ProfilerReducer from "./slices/ProfileSlice";
import DriverReducer from "./slices/driverSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    ourData: dataReducer,
    auth: authReducer,
    insurance: insuranceReducer, // Подключаем редьюсер
    insurances: insurancesReducer,
    login: LoginReducer,
    Register: RegisterReducer,
    Profile: ProfilerReducer,
    Driver: DriverReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
