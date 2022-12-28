import axios from "axios";

export const etherscanHttpClient = axios.create({
    baseURL: 'https://api.etherscan.io/api',
    headers: {
        "Content-type": "application/json"
    },
})

etherscanHttpClient.interceptors.request.use(request => {
    request.url += `&apiKey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


