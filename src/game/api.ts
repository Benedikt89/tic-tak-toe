import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:3000/",
});

interface Icounter {
    data: {
        count: string
    }
}

export const gameDataApi = {
    fetchData () {
        return instance.get('count')
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=> {
                return 0;
            })
    },
    postData (quan:number) {
        return instance.patch('count', {count: quan + 1})
            .then(res => {
                if(res.status >= 200) {
                    return res.data
                }
            })
            .catch(()=> {
                return 0;
            })
    }
};