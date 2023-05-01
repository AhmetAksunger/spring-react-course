import React from "react";
import axios from "axios";

class UserSignupPage extends React.Component{

    //each class component must override render
    
    state = {
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null
    };

    onChange = event =>{

        const {name, value} = event.target
        //const name = event.target.name;
        //const value = event.target.value;
        this.setState({
            [name]: value
        })
    };

    onClickSignup = event =>{
        event.preventDefault()
        
        const {username,displayName,password} = this.state

        const body = {
            "username": username,
            "displayName": displayName,
            "password": password
        }

        axios.post("/api/1.0/users",body)
    };

    render(){
        return(
            <form> 
                <h1>Sign up</h1>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Display Name</label>
                    <input type="text" name="displayName" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.onChange}/>
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type="password" name="confirmPassword" onChange={this.onChange}/>
                </div>
                <button onClick={this.onClickSignup}>Sign Up</button>
            </form>
        );
    }

}

export default UserSignupPage;