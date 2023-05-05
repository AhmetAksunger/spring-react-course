import React, { Component } from 'react'

export const Authentication = React.createContext();

class AuthenticationContext extends Component {
  
    
    state = {
        isLoggedIn: false,
        username: null,
        displayName: null,
        image: null,
        password: null
    }

    onLoginSuccess = (authState) => {
        this.setState({
            username: authState.username,
            displayName: authState.displayName,
            image: authState.image,
            password: authState.password,
            isLoggedIn: true
        });
    }

    onLogoutSuccess = () => {
        this.setState({
        isLoggedIn: false,
        username: null
        })
    }


    render() {
    return (
        <Authentication.Provider value={{
            state: {...this.state},
            onLoginSuccess: this.onLoginSuccess,
            onLogoutSuccess: this.onLogoutSuccess
        }}>
            {this.props.children}
        </Authentication.Provider>
    )
  }
}

export default AuthenticationContext;