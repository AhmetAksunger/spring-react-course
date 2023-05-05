import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import LanguageSelector from "../components/LanguageSelector";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import { HashRouter,Switch,Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Authentication } from "../shared/AuthenticationContext";

class App extends React.Component {

  static contextType = Authentication;

  render(){

    const {isLoggedIn} = this.context.state;

    const username = undefined;

    return (
      <div>
        <HashRouter>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {!isLoggedIn && 
              <Route path="/login" component={UserLoginPage}/>
            }
            <Route path="/signup" component={UserSignupPage}/>
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        <LanguageSelector />
      </div>
      );

  }
  
}

export default App;
