import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlide = createSlice({
  name: "SidebarSlide",
  initialState: {
    status: "idle",
    listMusic: [
      {
        id: 1,
        src: "@/assets/audio/Morning Coffee ☕️ [lofi hip hop-study beats].mp3",
      },
      {
        id: 2,
        src: "@/assets/audio/Sleepless Night 🌙 [lofi hip hop-study beats].mp3",
      },
      {
        id: 3,
        src: "@/assets/audio/Cozy Winter ❄️ - [lofi hip hop-study beats].mp3",
      },
    ],
    isSelectedMusic: false,
    isRainy: false,
    isNight: false,
    isPlayMusic: false,
    volumeRain: 4,
    volumeMusic: 4,
  },
  reducers: {
    setSelectedMusic: (state, action) => {
      state.isSelectedMusic = action.payload;
    },
    setIsRain: (state, action) => {
      state.isRainy = action.payload;
    },
    setIsNight: (state, action) => {
      state.isNight = action.payload;
    },
    setVolumeRain: (state, action) => {
      state.volumeRain = action.payload;
    },
    setVolumeMusic: (state, action) => {
      state.volumeMusic = action.payload;
    },
    setIsPlayingMusic: (state, action) => {
      state.isPlayMusic = action.payload;
    },
  },
});
export default SidebarSlide;
