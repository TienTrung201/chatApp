import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    status: "idle",
    allMessage: [],
    typeModalGroupAndEmoji: "",
    emojiMessage: { haha: [], tym: [], wow: [], like: [], sad: [], angry: [] },
  },
  reducers: {
    setAllMessage: (state, action) => {
      state.allMessage = action.payload;
    },
    addMessage: (state, action) => {
      state.allMessage.push(action.payload);
    },
    setTypeModal: (state, action) => {
      state.typeModalGroupAndEmoji = action.payload;
    },
    setEmojiMessage: (state, action) => {
      state.emojiMessage = action.payload;
    },
  },
});
export default chatSlice;
