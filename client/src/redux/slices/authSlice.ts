import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  userId: string;
};

type AuthState = {
  userInfo: User | null;
};

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    getUser: (state): any => {
      return state.userInfo;
    },
  },
});

export const {
  setCredentials: setAuthCredentials,
  logout: logoutAuth,
  getUser: getAuthUser,
} = authSlice.actions;

export default authSlice.reducer;
