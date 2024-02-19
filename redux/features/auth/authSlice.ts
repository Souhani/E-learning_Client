import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserAuth {
    user: object;
    token: string;
    userLoaded:boolean;
};

const initialState = {token:"", user:{}, userLoaded:false} as UserAuth;

const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
    userRegistration(state, action:PayloadAction<{token:string}>) {
     state.token = action.payload.token;
    },
    userLoggedin(state, action:PayloadAction<{accessToken:string, user:any}>) {
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
    },
    userLoggedOut(state) {
        state.token = "";
        state.user = {};
    },
    userLoading(state, action:PayloadAction<{user:object}>) {
      state.user = action.payload.user;
      state.userLoaded = true;
    }
 }
});

export const {userRegistration, userLoggedin, userLoggedOut, userLoading} = authSlice.actions;
export default authSlice.reducer;