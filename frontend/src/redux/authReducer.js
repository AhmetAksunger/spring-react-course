import * as ACTIONS from "../redux/Constants" 

const defaultState = {
    isLoggedIn: false,
    username: null,
    displayName: null,
    image: null,
    password: null
  }

const authReducer = (state = {...defaultState},action) => {
    if (action.type === ACTIONS.LOGOUT_SUCCESS){
        return defaultState;
    }else if (action.type === ACTIONS.LOGIN_SUCCESS){
        return {
            isLoggedIn: true,
            ...action.data
        }
    }else if(action.type === ACTIONS.UPDATE_SUCCESS){
        return {
            ...state,
            displayName: action.data.displayName,
            image: action.data.image
        }
    }
    return state;
    }

    

export default authReducer;