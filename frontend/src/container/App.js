import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import LanguageSelector from "../components/LanguageSelector";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import { HashRouter,Switch,Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
//import { Authentication } from "../shared/AuthenticationContext";

class App extends React.Component {

  render(){

    const isLoggedIn = this.props.isLoggedIn;

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


const mapStateToProps = (store) => {
  return {
      isLoggedIn: store.isLoggedIn,
  }
}

export default connect(mapStateToProps)(App);
