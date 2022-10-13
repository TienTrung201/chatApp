import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlide = createSlice({
  name: "SidebarSlide",
  initialState: {
    status: "idle",
    isSelectedMusic: false,
  },
  reducers: {
    setSelectedMusic: (state, action) => {
      state.isSelectedMusic = action.payload;
    },
  },
});
export default SidebarSlide;
