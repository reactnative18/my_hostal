import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer, userReducer } from "./reducer";

const store = configureStore({
    reducer: {
        userData: userReducer,
        userInfo: userInfoReducer
    },
});

export default store;
