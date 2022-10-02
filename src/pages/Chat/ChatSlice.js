import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    status: "idle",
    allMessage: [],
  },
  reducers: {
    setAllMessage: (state, action) => {
      state.allMessage = action.payload;
    },
    addMessage: (state, action) => {
      console.log(action.payload);
      state.allMessage.push(action.payload);
    },
  },
});
export default chatSlice;
