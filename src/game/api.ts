import axios from "axios";
import {I_DataToStore} from "../types/types";

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
                return err;
            })
    },
    postData (data:string) {
        return instance.post('api.user.setstate', data)
            .then(res => {
                    return res.data
            })
            .catch((e)=> {
                return e;
            })
    }
};