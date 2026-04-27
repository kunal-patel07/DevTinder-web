import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name :"feed",
    initialState:null,
    reducers : {
        addFeed :(state , action)=> action.payload,
        appendFeed :(state , action) => {
            return [...(state || []), ...action.payload];
        },
        removeFeed :(state , action) => {
            const newFeed = state.filter((item)=>item._id !== action.payload);
            return newFeed;
        }
    }
})
export const {addFeed, appendFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer