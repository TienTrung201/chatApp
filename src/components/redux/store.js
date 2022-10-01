import boxChatSlice from "@/pages/Chat/BoxChat/BoxChatSlice";
import chatSlice from "@/pages/Chat/ChatSlice";
import userSlice from "@/pages/Login/UserSlice";
import { configureStore } from "@reduxjs/toolkit";

// ý tưởng cho chi tiết tin tức:
//làm như header nhưng chỉ cần truyền API vào children k cần truyền components
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userChat: boxChatSlice.reducer,
    allMessage: chatSlice.reducer,
  },
});

export default store;
