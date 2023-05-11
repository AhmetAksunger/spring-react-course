import axios from "axios"

export const signup = (body) => {
    //then will be launched if the request is successfull
    //catch will be launched if the request is failed
    return axios.post("/api/1.0/users",body)
}

export const login = creds => {
    return axios.post("/api/1.0/auth", {}, {auth : creds});
}


export const changeLanguage = (language) => {
    axios.defaults.headers["accept-language"] = language;
}

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({username, password}) => {
    const authorizationHeaderValue = `Basic ${window.btoa(username + ":" + password)}`
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
}

export const clearAuthorizationHeader = () => {
    delete axios.defaults.headers["Authorization"];
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username,body) => {
    return axios.put(`/api/1.0/users/${username}`,body);
}