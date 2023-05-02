import React from "react";
import {signup} from "../api/apiCalls"
import Input from "../components/input"

class UserSignupPage extends React.Component{

    //each class component must override render
    
    state = {
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event =>{

        const {name, value} = event.target
        //const name = event.target.name;
        //const value = event.target.value;
        const errors = {...this.state.errors}; // copy errors
        errors[name] = undefined;

        if(name == "password" || name == "confirmPassword"){
            if(name == "password" && value != this.state.confirmPassword){
                errors.confirmPassword = "Passwords do not match"
            }
            else if(name == "confirmPassword" && value != this.state.password){
                errors.confirmPassword = "Passwords do not match"
            }else{
                errors.confirmPassword = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors: errors
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
            
        } catch (error) {
            
            if(error.response.data.validationErrors != null){
                this.setState({
                    errors: error.response.data.validationErrors 
                })
            }
            
        }
        
        this.setState({
            pendingApiCall: false
        })
        

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

        const {pendingApiCall, errors} = this.state;

        return(
            <div className="container">
                <form> 
                    <h1 className="text-center">Sign up</h1>
                    <Input type="text" name="username" label="Username" error ={errors.username} onChange={this.onChange} />
                    <Input type="text" name="displayName" label="Display Name" error ={errors.displayName} onChange={this.onChange} />
                    <Input type="password" name="password" label="Password" error ={errors.password} onChange={this.onChange} />
                    <Input type="password" name="confirmPassword" label="Confirm Password" error ={errors.confirmPassword} onChange={this.onChange} />
                    
                    {/*
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className={errors.username == null ? "form-control" : "form-control is-invalid"} name="username" onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {errors.username}
                        </div>
                    </div>
                    */}
                    <button className="btn btn-primary" onClick={this.onClickSignup} disabled={this.state.pendingApiCall || errors.confirmPassword != undefined }>
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