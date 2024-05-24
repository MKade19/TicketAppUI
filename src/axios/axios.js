import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const setupInterceptors = navigate => {
    instance.interceptors.request.use(request => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
        request.headers.setAuthorization(`Bearer ${accessToken}`);
        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use(response => {
        // console.log(response);
        return response;
    }, async error => {
        const originalRequest = error.config;
        // console.log(error);
        if (error.response.status === 401) {
            try {
                const tokens = JSON.parse(localStorage.getItem('authTokens'));
    
                const response = await axios.post(BASE_URL + 'token/refresh/', tokens);
                localStorage.setItem('authTokens', JSON.stringify(response.data));
    
                return instance.request(originalRequest);
            } catch (e) {
                console.log('You are not authorized!');
                localStorage.removeItem('authTokens');
                localStorage.removeItem('user');
                navigate('auth/sign-in');
            }
        }
    
        return Promise.reject(error);
    });
  }



export default instance;