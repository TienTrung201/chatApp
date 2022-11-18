// npm install reselect
export const userLogin = (state) => state.user.user;
export const users = (state) => state.user.users;
export const userSelect = (state) => state.user.userSelect;
export const currentUserGroup = (state) => state.user.currentUserGroup;
export const userChat = (state) => state.userChat.userChat;
export const allMessage = (state) => state.allMessage.allMessage;
export const typeModalGroupAndEmoji = (state) =>
  state.allMessage.typeModalGroupAndEmoji;
export const emojiMessage = (state) => state.allMessage.emojiMessage;
export const isSelectedMusic = (state) => state.sideBar.isSelectedMusic;
export const isRainy = (state) => state.sideBar.isRainy;
export const isNight = (state) => state.sideBar.isNight;
export const isPlayMusic = (state) => state.sideBar.isPlayMusic;
export const volumeRain = (state) => state.sideBar.volumeRain;
export const volumeMusic = (state) => state.sideBar.volumeMusic;
export const replaceName = (state) => state.editProfile.name;
export const replaceEmail = (state) => state.editProfile.email;
export const replaceContact = (state) => state.editProfile.contact;
export const isSendMessageTogle = (state) => state.userChat.isSendMessageTogle;
export const isReplyMessage = (state) => state.userChat.isReplyMessage;
export const userNameAnswered = (state) => state.userChat.userNameAnswered;
export const messageAnswered = (state) => state.userChat.messageAnswered;
export const urlImageAnsered = (state) => state.userChat.urlImageAnsered;
export const typeSticker = (state) => state.sticker.typeSticker;
export const listSticker = (state) => state.sticker.stickers;
export const isOpenSticker = (state) => state.sticker.isOpenSticker;
