import axios from "axios";


const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/users",
    withCredentials: true
});

export const authorisationAPI = {
    async logIn(data: any) {
        try {
            let res = await instance.post('/login', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.data.message) {
                    return error.response.data
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    },
    async logOut() {
        try {
            let res = await instance.delete('/logout');
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            }
        } catch {
            return new Error('unknown Error');
        }
    },
};