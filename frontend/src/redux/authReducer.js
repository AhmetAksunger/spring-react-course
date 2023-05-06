import * as ACTIONS from "../redux/Constants" 

const defaultState = {
    isLoggedIn: false,
    username: null,
    displayName: null,
    image: null,
    password: null
  }

const authReducer = (state,action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS){
        return defaultState;
    }else if (action.type === ACTIONS.LOGIN_SUCCESS){
        return {
            isLoggedIn: true,
            ...action.data
        }
    }
    return state;
    }

    

export default authReducer;