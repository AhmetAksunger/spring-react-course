import React from "react";

class UserSignupPage extends React.Component{

    //each class component must override render
    
    state = {
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null
    };

    onChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    };


    /*
    onChangeUsername = event => {
        console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    };

    onChangeDisplayName = event =>{
        this.setState({
            displayName: event.target.value
        })
    };


    onChangePassword = event =>{
        this.setState({
            password: event.target.value
        })
    };

    
    onChangeConfirmPassword = event =>{
        this.setState({
            confirmPassword: event.target.value
        })
    };
    */

    /*
    onChangeUsername(event){
        console.log(event.target.value)
    }
    */

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
                <button>Sign Up</button>
            </form>
        );
    }

}

export default UserSignupPage;