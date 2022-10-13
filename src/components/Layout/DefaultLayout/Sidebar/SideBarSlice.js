import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlide = createSlice({
  name: "SidebarSlide",
  initialState: {
    status: "idle",
    selectedMusic: true,
  },
  reducers: {
    setSelectedMusic: (state, action) => {
      state.selectedMusic = action.payload;
    },
  },
});
export default SidebarSlide;
