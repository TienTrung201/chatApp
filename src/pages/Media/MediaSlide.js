import { createSlice } from "@reduxjs/toolkit";

export const mediaSlide = createSlice({
  name: "mediaSlide",
  initialState: {
    status: "idle",
    currentIndexImage: 0,
    arrayMessageImg: [],
    isOpenMedia: false,
  },
  reducers: {
    setCurrentIndexImage: (state, action) => {
      state.currentIndexImage = action.payload;
    },
    setArrayMessageImg: (state, action) => {
      state.arrayMessageImg = action.payload.reverse();
    },
    setIsOpenMedia: (state, action) => {
      state.isOpenMedia = action.payload;
    },
  },
});
export default mediaSlide;
