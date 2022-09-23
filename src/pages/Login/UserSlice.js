import { auth } from "@/firebase/config";
import { createSlice } from "@reduxjs/toolkit";

const user = auth.onAuthStateChanged((user) => {
  console.log({ user });
  if (user) {
    const { displayName, email, uid, photoURL } = user;
    return {
      displayName,
      email,
      uid,
      photoURL,
    };
  }
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    status: "idle",
    user: user,
  },
  reducers: {
    // getUser: (state, action) => {
    //   state.newspapers.push(action.payload);
    // },
  },
});
export default userSlice;
