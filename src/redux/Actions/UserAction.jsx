import {
    LOADER,
    USER_INFO,
} from "../Constrants";
const userInfoAction = (data) => async (dispatch) => {
    dispatch({
        type: USER_INFO,
        payload: data
    });
};
const loaderAction = (isLoading) => async (dispatch) => {
    dispatch({
        type: LOADER,
        payload: isLoading
    });
};
export {
    userInfoAction,
    loaderAction
}