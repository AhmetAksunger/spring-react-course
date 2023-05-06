import { legacy_createStore as createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLS = new SecureLS();

const getStateFromStorage = () => {

  const localAuthData = secureLS.get("auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: null,
    displayName: null,
    image: null,
    password: null
  }

  if(localAuthData){
    return localAuthData;
  }
}

const updateStateInStorage = (newState) => {

  secureLS.set("auth",newState);

}
  
const configureStore = () => {

  const stateInLocalStorage = getStateFromStorage();

  const store = createStore(authReducer, stateInLocalStorage,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());  

  // each time the state changes, this method will run
  store.subscribe(() => {
    updateStateInStorage(store.getState());
  })

  return store; 
}

export default configureStore;