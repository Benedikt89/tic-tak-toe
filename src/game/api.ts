import axios from "axios";
import {APIerrorLogger} from "../utils/errorLogger";
import {I_dataToSend} from "../types/types";

const instance = axios.create({
    baseURL: "http://localhost:8421/",
    withCredentials: true
});

export const gameDataApi = {
    fetchData () {
        return instance.get('api.user.getstate')
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
    postData (data:I_dataToSend) {
        //stringify data before sending
        let dataAsString = JSON.stringify(data);
        return instance.post('api.user.setstate', dataAsString)
            .then(res => {
                return res.data
            })
            .catch((err)=> {
                APIerrorLogger(err);
                throw err;
            })
    }
};