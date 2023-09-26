import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import addServicesReducer from "../features/authentication/redux/addServicesSlice";
import aboutYouReducer from "../features/authentication/redux/aboutYouSlice";
import signInReducer from "../features/authentication/redux/signInSlice";

export const store = configureStore({
    reducer: {
        addServices: addServicesReducer,
        aboutYou: aboutYouReducer,
        signIn: signInReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 