import axios from "axios"

export const signup = (body) => {
    //then will be launched if the request is successfull
    //catch will be launched if the request is failed
    return axios.post("/api/1.0/users",body)
}

export const login = creds => {
    return axios.post("/api/1.0/auth",creds);
}


export const changeLanguage = (language) => {
    axios.defaults.headers["accept-language"] = language;
}

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({token, isLoggedIn}) => {
    if(isLoggedIn){
        const authorizationHeaderValue = `Bearer ${token}`
        axios.defaults.headers["Authorization"] = authorizationHeaderValue;    
    }else{
        delete axios.defaults.headers["Authorization"];
    }
}


export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username,body) => {
    return axios.put(`/api/1.0/users/${username}`,body);
}

export const postHoax = (hoax) => {
    return axios.post("/api/1.0/hoaxes",hoax);
}

export const getHoaxes = (username = undefined, page = 0, size = 5) => {

    if(username !== undefined){
        return axios.get(`/api/1.0/users/${username}/hoaxes?page=${page}&size=${size}`);
    }
    return axios.get(`/api/1.0/hoaxes?page=${page}&size=${size}`);

}

export const getOldHoaxes = (id,page = 0, size = 5,username = undefined) => {
    if(username !== undefined){
        return axios.get(`/api/1.0/users/${username}/hoaxes/${id}?direction=before&page=${page}&size=${size}`);
    }
    return axios.get(`/api/1.0/hoaxes/${id}?direction=before&page=${page}&size=${size}`);
} 

export const getNewHoaxesCount = (id) => {
    return axios.get(`/api/1.0/hoaxes/count/${id}`)
}

export const postHoaxAttachment = (attachment) => {
    return axios.post("/api/1.0/hoax-attachments",attachment);
}

export const deleteHoax = (id) => {
    return axios.delete(`/api/1.0/hoaxes/${id}`);
}

export const deleteUser = (username) => {
    return axios.delete(`/api/1.0/users/${username}`)
}

export const logout = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.post("/api/1.0/logout",null,config);
}