import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    services: [],
    servicesId: [],
}

export const addServicesSlice = createSlice({
    name: 'addServices',
    initialState,
    reducers: {
        addService: (state, action) => {
            const service = {
                id: nanoid(),
                data: action.payload
            };
            state.services.push(service);
            state.servicesId.push(action.payload.ID);
        },
        removeService: (state, action) => {
            state.services = state.services.filter((service) => service.data.ID !== action.payload.ID)
            state.servicesId = state.servicesId.filter((id) => id !== action.payload.ID)
        }
    }
});

export const { addService, removeService } = addServicesSlice.actions;

export default addServicesSlice.reducer;