
import {
    LOADER,
    USER_INFO
} from "../Constrants";

const userInfoReducer = (
    state = { userInfo: {} },
    action
) => {
    switch (action.type) {
        case USER_INFO:
            return { userInfo: action.payload };
        default:
            return state;
    }
};
const loaderReducer = (
    state = { loading: false },
    action
) => {
    switch (action.type) {
        case LOADER:
            return { loading: action.payload };
        default:
            return state;
    }
};
export {
    userInfoReducer,
    loaderReducer
}