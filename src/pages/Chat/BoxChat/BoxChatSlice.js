import { createSlice } from "@reduxjs/toolkit";

export const boxChatSlice = createSlice({
  name: "boxChatSlice",
  initialState: {
    status: "idle",
    userChat: {
      chatId: "",
      user: {},
      isSendMessageTogle: true,
      userNameAnswered: "",
      messageAnswered: "",
      urlImageAnsered: "",
    },
    isReplyMessage: false,
  },
  reducers: {
    setUserSelect: (state, action) => {
      state.userChat = action.payload;
    },
    setIsSendMessageTogle: (state, action) => {
      state.isSendMessageTogle = action.payload;
    },
    setIsReplyMessage: (state, action) => {
      state.isReplyMessage = action.payload;
    },
    setUserNameAnswered: (state, action) => {
      state.userNameAnswered = action.payload;
    },
    setMessageAnswered: (state, action) => {
      state.messageAnswered = action.payload;
    },
    setUrlImageAnsered: (state, action) => {
      state.urlImageAnsered = action.payload;
    },
  },
});
export default boxChatSlice;
