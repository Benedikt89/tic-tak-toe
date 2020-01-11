import axios from "axios";
import {APIerrorLogger} from "../utils/errorLogger";
import {I_logInData} from "./actions";

const instance = axios.create({
    baseURL: "http://localhost:8421/",
    withCredentials: true
});

class LoginError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
    }
}

export const authorisationAPI = {
    async logIn(data: I_logInData) {
        try {
            let res = await instance.post('api.authentication.signin', data);
            return res.data;
        } catch (error) {
            APIerrorLogger(error);
            console.warn(error.config);
            throw error;
        }
    },
    async logOut() {
        try {
            let res = await instance.get('api.authentication.signout');
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            }
        } catch (err) {
            APIerrorLogger(err);
            throw new Error('unknown Error');
        }
    },
    checkAuth() {
        return instance.get('api.authentication.check')
            .then((res) => {
                return res.statusText;
            }).catch(err => {
                if (err.response.status === 401){
                    throw new LoginError(err.response.statusText, 401);
                } else {
                    APIerrorLogger(err);
                    throw new Error("Some Error Occurred");
                }
            })
    }
};