import Axios from "axios";

import {
    USER_INFO, USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
} from "./Constrants";

export const listUser = () => async (dispatch) => {
    dispatch({
        type: USER_LIST_REQUEST,
    });
    try {
        const { data } = await Axios.get("https://jsonplaceholder.typicode.com/users");
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.message,
        });
    }
};

export const userInfo = (data) => {
    return {
        type: USER_INFO,
        payload: data,
    };

};