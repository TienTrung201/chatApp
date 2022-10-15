// npm install reselect
export const userLogin = (state) => state.user.user;
export const users = (state) => state.user.users;
export const userSelect = (state) => state.user.userSelect;
export const userChat = (state) => state.userChat.userChat;
export const allMessage = (state) => state.allMessage.allMessage;
export const isSelectedMusic = (state) => state.sideBar.isSelectedMusic;
export const isRainy = (state) => state.sideBar.isRainy;
export const isNight = (state) => state.sideBar.isNight;
export const volumeRain = (state) => state.sideBar.volumeRain;
export const volumeMusic = (state) => state.sideBar.volumeMusic;
export const replaceName = (state) => state.editProfile.name;
export const replaceEmail = (state) => state.editProfile.email;
export const replaceContact = (state) => state.editProfile.contact;
