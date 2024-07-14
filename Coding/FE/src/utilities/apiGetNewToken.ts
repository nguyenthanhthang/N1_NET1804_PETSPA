import axios, { AxiosError } from 'axios';
import { Envs } from './env';

const baseURL = Envs.apiRemote;

const apiRefreshToken = axios.create({
    baseURL,
    withCredentials: true,

});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
apiRefreshToken.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            config.headers.Authorization = `Bearer ${token}`
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.error);
            } else {
                console.log(error);
            }
        }
    }
    return config;
});



export default apiRefreshToken;
