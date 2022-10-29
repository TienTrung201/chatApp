import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    user: {},
    users: [],
    userSelect: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserSelect: (state, action) => {
      state.userSelect = action.payload;
    },
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
  },
});
export default userSlice;
