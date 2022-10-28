import { createSlice } from "@reduxjs/toolkit";

export const boxChatSlice = createSlice({
  name: "boxChatSlice",
  initialState: {
    status: "idle",
    userChat: {
      chatId: "",
      user: {},
      isSendMessageTogle: true,
    },
  },
  reducers: {
    setUserSelect: (state, action) => {
      state.userChat = action.payload;
    },
    setIsSendMessageTogle: (state, action) => {
      state.isSendMessageTogle = action.payload;
    },
  },
});
export default boxChatSlice;
