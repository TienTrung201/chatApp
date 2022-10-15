import { createSlice } from "@reduxjs/toolkit";

export const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: {
    status: "idle",
    name: false,
    email: false,
    contact: false,
  },
  reducers: {
    setReplaceName: (state, action) => {
      state.name = action.payload;
    },
    setReplaceEmail: (state, action) => {
      state.email = action.payload;
    },
    setReplaceContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});
export default editProfileSlice;
