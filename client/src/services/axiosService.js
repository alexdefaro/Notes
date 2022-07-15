import axios from "axios";
import { parseCookies } from 'nookies'

export function configureAxiosService(context) {
    const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
    const { "notes-token": token } = parseCookies(context);

    const axiosAPI = axios.create({
        withCredentials: true,
        baseURL: API_URL
    })

    if (token) {
        const parsedToken = JSON.parse(token);
        axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.jwtToken}`;        
    }

    axiosAPI.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return axiosAPI;
}

export const axiosService = configureAxiosService(); 