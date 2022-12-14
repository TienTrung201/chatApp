import boxChatSlice from "@/pages/Chat/BoxChat/BoxChatSlice";
import StickerSlice from "@/pages/Chat/BoxChat/InputChat/StickerSlice";
import chatSlice from "@/pages/Chat/ChatSlice";
import userSlice from "@/pages/Login/UserSlice";
import mediaSlide from "@/pages/Media/MediaSlide";
import editProfileSlice from "@/pages/Profile/EditProfile/EditProfileSlice";
import { configureStore } from "@reduxjs/toolkit";
import SidebarSlide from "../Layout/DefaultLayout/Sidebar/SideBarSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userChat: boxChatSlice.reducer,
    allMessage: chatSlice.reducer,
    sideBar: SidebarSlide.reducer,
    editProfile: editProfileSlice.reducer,
    sticker: StickerSlice.reducer,
    mediaSlide: mediaSlide.reducer,
  },
});

export default store;
