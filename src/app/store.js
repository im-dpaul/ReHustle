import { configureStore } from "@reduxjs/toolkit";
import addServicesReducer from "../features/authentication/redux/addServicesSlice";
import aboutYouReducer from "../features/authentication/redux/aboutYouSlice";

export const store = configureStore({
    reducer: {
        addServices: addServicesReducer,
        aboutYou: aboutYouReducer,
    },
});