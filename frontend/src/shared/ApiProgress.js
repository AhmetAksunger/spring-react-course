import React, { Component } from 'react'
import axios from 'axios'

export function withApiProgress(WrappedComponent,apiPath){
    return class extends Component {
  
        state = {
            pendingApiCall: false
        }
      
        componentDidMount(){
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                if(request.url.startsWith(apiPath)){
                    this.setState({
                        pendingApiCall: true
                    })
                }
                return request;
            })
    
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                if(response.config.url.startsWith(apiPath)){
                    this.setState({
                        pendingApiCall: false
                    })
                }
                return response;
            }, (error) => {
    
                if(error.config.url.startsWith(apiPath)){
                    this.setState({
                        pendingApiCall: false
                    })
                }
                throw error;
            })
        }
    
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
            
        }

        render() {
        //return <div>{React.cloneElement(this.props.children, {pendingApiCall: this.state.pendingApiCall})}</div>
        return <WrappedComponent pendingApiCall={this.state.pendingApiCall} {...this.props} />
    }
    } 
}

