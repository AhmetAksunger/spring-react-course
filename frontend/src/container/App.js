import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import LanguageSelector from "../components/LanguageSelector";
import UserPage from "../pages/UserPage";
import TopBar from "../components/TopBar";
import { HashRouter, Redirect, Switch, Route } from "react-router-dom";

function App() {
  return (
  <div>
    <HashRouter>
      <TopBar />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={UserLoginPage}/>
        <Route path="/signup" component={UserSignupPage}/>
        <Route path="/user/:username" component={UserPage}/>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
    <LanguageSelector />
  </div>
  )
}

export default App;
