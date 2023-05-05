import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import LanguageSelector from "../components/LanguageSelector";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import { HashRouter,Switch,Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    username: null
  }

  onLoginSuccess = (username) => {
    this.setState({
      isLoggedIn: true,
      username: username
    })
  }

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      username: null
    })
  }

  render(){
    const { isLoggedIn, username } = this.state;
    return (
      <div>
        <HashRouter>
          <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess} />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {!isLoggedIn && 
              <Route path="/login" component={(reactRouterProps) => {
                return <UserLoginPage {...reactRouterProps} onLoginSuccess={this.onLoginSuccess} />;
              }}/>
            }
            <Route path="/signup" component={UserSignupPage}/>
            <Route path="/user/:username" component={(reactRouterProps => {
              return <UserPage username={username} />
            })}/>
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        <LanguageSelector />
      </div>
      );

  }
  
}

export default App;
