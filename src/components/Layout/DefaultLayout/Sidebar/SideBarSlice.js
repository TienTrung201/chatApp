import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlide = createSlice({
  name: "SidebarSlide",
  initialState: {
    status: "idle",
    isSelectedMusic: false,
    isRainy: false,
    isNight: false,
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
  },
});
export default SidebarSlide;
