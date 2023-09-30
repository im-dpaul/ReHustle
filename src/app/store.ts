import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import addServicesReducer from "../features/authentication/redux/addServicesSlice";
import aboutYouReducer from "../features/authentication/redux/aboutYouSlice";
import signInReducer from "../features/authentication/redux/signInSlice";
import createAccountReducer from '../features/authentication/redux/createAccountSlice';
import getYourInfoReducer from '../features/authentication/redux/getYourInfoSlice';
import splashReducer from '../features/splash/redux/splashSlice';
import finishAccountCreationReducer from '../features/authentication/redux/finishAccountCreationSlice';
import servicesReducer from "../features/home/redux/servicesSlice";

export const store = configureStore({
    reducer: {
        splash: splashReducer,
        addServices: addServicesReducer,
        aboutYou: aboutYouReducer,
        signIn: signInReducer,
        createAccount: createAccountReducer,
        getYourInfo: getYourInfoReducer,
        finishAccountCreation: finishAccountCreationReducer,
        services: servicesReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 