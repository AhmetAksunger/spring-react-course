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