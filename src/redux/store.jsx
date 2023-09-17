import { configureStore } from "@reduxjs/toolkit";
import { loaderReducer, userInfoReducer } from "./Reducers/UserReducer";

const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        loader: loaderReducer,
    },
});

export default store;
