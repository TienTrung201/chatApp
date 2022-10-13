import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlide = createSlice({
  name: "SidebarSlide",
  initialState: {
    status: "idle",
    isSelectedMusic: false,
    isRainy: false,
    isNight: false,
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
  },
});
export default SidebarSlide;
