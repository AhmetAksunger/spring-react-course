import { login } from "../api/apiCalls";
import * as ACTIONS from "../redux/Constants" 

export const logoutSuccess = () => {
    const action = {
        type: ACTIONS.LOGOUT_SUCCESS
    };

    return action;
}

export const loginSuccess = (authState) => {
    const action = {
        type: ACTIONS.LOGIN_SUCCESS,
        data: authState
    }

    return action;
}
