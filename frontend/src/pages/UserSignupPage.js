import React from "react";
import {signup} from "../api/apiCalls"

class UserSignupPage extends React.Component{

    //each class component must override render
    
    state = {
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null,
        pendingApiCall: false
    };

    onChange = event =>{

        const {name, value} = event.target
        //const name = event.target.name;
        //const value = event.target.value;
        this.setState({
            [name]: value
        })
    };

    onClickSignup = async event =>{
        event.preventDefault()
        
        const {username,displayName,password,pendingApiCall} = this.state

        this.setState({
            pendingApiCall: true
        })

        const body = {
            "username": username,
            "displayName": displayName,
            "password": password
        }

        try {
            const response = await signup(body)
            this.setState({pendingApiCall: false})
            
        } catch (error) {
            this.setState({pendingApiCall: false})
        }
        
        

        /*
        .then(
            (response) => {
                this.setState({
                    pendingApiCall: false
                })
            }
        ).catch((error) => {
            this.setState({
                pendingApiCall: false
            })
        })
        */

    };

    render(){
        return(
            <div className="container">
                <form> 
                    <h1 className="text-center">Sign up</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Display Name</label>
                        <input type="text" className="form-control" name="displayName" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input type="password" className="form-control" name="confirmPassword" onChange={this.onChange}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.onClickSignup} disabled={this.state.pendingApiCall}>
                        {this.state.pendingApiCall ? <span class="spinner-border spinner-border-sm"></span> : ''}
                        {/* {statement ? doThisIfTrue : doThisIfNot} */}
                        Sign Up    
                    </button>
                </form>
            </div>
        );
    }

}

export default UserSignupPage;