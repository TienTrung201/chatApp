import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    user: {},
    users: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export default userSlice;
