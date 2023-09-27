import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    data: null,
    loading: false,
    error: null,
    socialProfiles: [],
    socialProfileIDs: [],
    customLinks: [{
        ID: nanoid(),
        LINK_TITLE: '',
        LINK_URL: '',
    }]
};

export const aboutYouSlice = createSlice({
    name: 'aboutYou',
    initialState: initialState,
    reducers: {
        addName: (state, action) => {
            state.name = action.payload;
        },
        addSocialProfile: (state, action) => {
            const profile = {
                id: nanoid(),
                data: action.payload
            };
            state.socialProfiles.push(profile);
            state.socialProfileIDs.push(action.payload.ID);
        },
        removeSocialProfile: (state, action) => {
            state.socialProfiles = state.socialProfiles.filter((profile) => profile.data.ID !== action.payload.ID)
            state.socialProfileIDs = state.socialProfileIDs.filter((id) => id !== action.payload.ID)
        },
        addCustomLink: (state, action) => {
            const link = {
                ID: nanoid(),
                LINK_TITLE: '',
                LINK_URL: '',
            }
            state.customLinks.push(link);
        },
        removeCustomLink: (state, action) => {
            state.customLinks = state.customLinks.filter((link) => link.ID !== action.payload.ID)
        }
    }
});

export const { addName, addSocialProfile, removeSocialProfile, addCustomLink, removeCustomLink } = aboutYouSlice.actions;

export default aboutYouSlice.reducer;