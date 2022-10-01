import { createSlice } from "@reduxjs/toolkit";

export const boxChatSlice = createSlice({
  name: "boxChatSlice",
  initialState: {
    status: "idle",
    userChat: {
      chatId: "",
      user: {},
    },
  },
  reducers: {
    setUserSelect: (state, action) => {
      state.userChat = action.payload;
    },
  },
});
export default boxChatSlice;
