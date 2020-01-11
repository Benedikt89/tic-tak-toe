import axios from "axios";
import {APIerrorLogger} from "../utils/errorLogger";

const instance = axios.create({
    baseURL: "http://localhost:8421/",
});

export const gameDataApi = {
    fetchData () {
        return instance.get<string>('api.user.getstate')
            .then(res => {
                return res.data
            })
            .catch((err)=> {
                APIerrorLogger(err);
                if (err.response.status === 500) {
                    return null;
                } else {
                    throw err;
                }
            })
    },
    postData (data:string) {
        return instance.post('api.user.setstate', data)
            .then(res => {
                return res.data
            })
            .catch((err)=> {
                APIerrorLogger(err);
                throw err;
            })
    }
};