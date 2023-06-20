
import { USER_INFO, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "./Constrants";

export const userReducer = (
    state = { loading: true, data: [] },
    action
) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, data: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const userInfoReducer = (
    state = { info: {} },
    action
) => {
    switch (action.type) {
        case USER_INFO:
            return { info: action.payload };
        default:
            return state;
    }
};