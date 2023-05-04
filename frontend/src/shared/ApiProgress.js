import React, { Component } from 'react'
import axios from 'axios'

export default class ApiProgress extends Component {
  
    state = {
        pendingApiCall: false
    }
  
    componentDidMount(){
        axios.interceptors.request.use((request) => {
            if(request.url === this.props.path){
                this.setState({
                    pendingApiCall: true
                })
            }
            return request;
        })

        axios.interceptors.response.use((response) => {
            if(response.config.url === this.props.path){
                this.setState({
                    pendingApiCall: false
                })
            }
            return response;
        }, (error) => {

            if(error.config.url === this.props.path){
                this.setState({
                    pendingApiCall: false
                })
            }
            throw error;
        })
    }

    render() {
    return <div>{React.cloneElement(this.props.children, {pendingApiCall: this.state.pendingApiCall})}</div>
  }
}