import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8421/",
    withCredentials: true
});

class APIError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
    }
}

export const authorisationAPI = {
    async logIn(data: any) {
        try {
            let res = await instance.post('api.authentication.signin', data);
            return res.data;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.data.message) {
                    return error.response.data
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            throw error;
        }
    },
    async logOut() {
        try {
            let res = await instance.get('api.authentication.signout');
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            }
        } catch (e) {
            throw new APIError('unknown Error', e.status);
        }
    },
    checkAuth() {
        return instance.get('api.authentication.check')
            .then((res) => {
                debugger;
                return res.data;
            }).catch(res => {
                if (res.status === 401){
                    throw new APIError("Incorrect Credentials", 401);
                } else {
                    throw new Error("Some Error Occurred");
                }
            })
    }
};