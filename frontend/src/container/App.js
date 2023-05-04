import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";

function App() {
  return (
  <div className="row">
    <div className="col">
      <ApiProgress path="/api/1.0/users">
        <UserSignupPage/>
      </ApiProgress>
    </div>
    <div className="col">
      <ApiProgress path="/api/1.0/auth">
        <UserLoginPage/>
      </ApiProgress>
    </div>
  </div>
  )
}

export default App;
